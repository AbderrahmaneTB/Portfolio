"use client"

import { useEffect, useRef } from "react"
import { buildMagmaLUT } from "@/components/colormap"
import { useMotionOn } from "@/components/motion"

type Emitter = {
  kind: "chirp" | "tone" | "hop"
  f: number
  rate: number
  accel: number
  life: number
  amp: number
  age: number
  hopEvery: number
}

/**
 * A live spectrogram waterfall: time flows right to left, frequency runs bottom to top.
 * Random chirps, tones and frequency hops drift through a noise floor, and the pointer
 * acts as a transmitter, so moving it draws your own chirp into the field.
 */
export function SpectrogramField({
  className,
  noise = 1,
  maxEmitters = 4,
  locked = false,
}: {
  className?: string
  /** Scales the noise floor: below 1 reads as a cleaner signal */
  noise?: number
  /** How many chirps, tones and hops can run at once */
  maxEmitters?: number
  /** A clean, repeating train of identical chirps (a radar pulse train) instead of random traffic */
  locked?: boolean
}) {
  const ref = useRef<HTMLCanvasElement>(null)
  const on = useMotionOn()

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    // Match the field's pixel grid to the shape it fills, so streaks are not stretched on tall phone screens
    const small = window.innerWidth < 768
    const box = canvas.getBoundingClientRect()
    const aspect = box.width > 0 ? box.height / box.width : 0.6
    const W = small ? 180 : 340
    const H = Math.round(Math.min(small ? 420 : 300, Math.max(56, W * aspect)))
    canvas.width = W
    canvas.height = H
    const img = ctx.createImageData(W, H)
    const field = new Float32Array(W * H)
    const col = new Float32Array(H)
    const lut = buildMagmaLUT()
    const emitters: Emitter[] = []
    const pointer = { active: false, f: 0.5, prev: 0.5 }

    const PERIOD = 46
    const PULSE = 38
    let tick = 0

    // A quieter field keeps its signals longer and sweeps them slower, so they draw long, steady ridges
    const calm = noise < 1
    const lifeScale = calm ? 2.8 : 1
    const sweepScale = calm ? 0.45 : 1
    const spawn = () => {
      const r = Math.random()
      const base = { f: 0.12 + Math.random() * 0.76, age: 0, accel: 0, rate: 0, hopEvery: 14 }
      if (r < 0.55) {
        emitters.push({
          ...base,
          kind: "chirp",
          rate: (Math.random() * 2 - 1) * 0.007 * sweepScale,
          accel: (Math.random() * 2 - 1) * 0.00005 * sweepScale,
          life: (90 + Math.random() * 140) * lifeScale,
          amp: 0.42 + Math.random() * 0.33,
        })
      } else if (r < 0.8) {
        emitters.push({ ...base, kind: "tone", life: (50 + Math.random() * 100) * lifeScale, amp: 0.36 + Math.random() * 0.28 })
      } else {
        emitters.push({
          ...base,
          kind: "hop",
          life: (80 + Math.random() * 100) * lifeScale,
          amp: 0.4 + Math.random() * 0.3,
          hopEvery: (10 + Math.floor(Math.random() * 10)) * (calm ? 2 : 1),
        })
      }
    }

    const addGauss = (center: number, amp: number, sigma: number) => {
      const c = center * (H - 1)
      const reach = Math.ceil(sigma * 3)
      const lo = Math.max(0, Math.floor(c - reach))
      const hi = Math.min(H - 1, Math.ceil(c + reach))
      for (let y = lo; y <= hi; y++) {
        const z = (y - c) / sigma
        col[y] += amp * Math.exp(-0.5 * z * z)
      }
    }

    const step = () => {
      for (let y = 0; y < H; y++) col[y] = (Math.random() * 0.11 + Math.random() * Math.random() * 0.1) * noise
      if (locked) {
        // Locked: one clean up-chirp every PERIOD columns, the same each time, like a radar pulse train
        if (tick % PERIOD === 0) {
          emitters.push({ kind: "chirp", f: 0.16, rate: 0.66 / PULSE, accel: 0, life: PULSE, amp: 0.9, age: 0, hopEvery: 14 })
        }
        tick++
      } else if (emitters.length < maxEmitters && Math.random() < 0.05) spawn()
      for (let i = emitters.length - 1; i >= 0; i--) {
        const e = emitters[i]
        const fade = Math.min(1, e.age / 10, e.life / 10)
        addGauss(e.f, e.amp * fade, 1.4)
        if (e.kind === "chirp") {
          e.rate += e.accel
          e.f += e.rate
          if (e.f < 0.03 || e.f > 0.97) e.life = 0
        } else if (e.kind === "hop" && e.age > 0 && e.age % e.hopEvery === 0) {
          e.f = 0.12 + Math.random() * 0.76
        }
        e.age++
        e.life--
        if (e.life <= 0) emitters.splice(i, 1)
      }
      if (pointer.active) {
        const n = Math.max(1, Math.ceil(Math.abs(pointer.f - pointer.prev) * H))
        for (let s = 0; s <= n; s++) {
          addGauss(pointer.prev + (pointer.f - pointer.prev) * (s / n), 1.05 / Math.sqrt(n), 1.6)
        }
        pointer.prev = pointer.f
      }
      for (let y = 0; y < H; y++) {
        const row = y * W
        field.copyWithin(row, row + 1, row + W)
        field[row + W - 1] = col[H - 1 - y]
      }
    }

    const render = () => {
      const data = img.data
      for (let i = 0; i < W * H; i++) {
        const v = field[i]
        const k = (v >= 1 ? 255 : v <= 0 ? 0 : (v * 255) | 0) * 4
        const o = i * 4
        data[o] = lut[k]
        data[o + 1] = lut[k + 1]
        data[o + 2] = lut[k + 2]
        data[o + 3] = lut[k + 3]
      }
      ctx.putImageData(img, 0, 0)
    }

    for (let i = 0; i < W; i++) step()
    render()
    if (!on) return

    let raf = 0
    let last = 0
    let visible = true
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop)
      if (!visible || document.hidden || t - last < 33) return
      last = t
      step()
      render()
    }
    raf = requestAnimationFrame(loop)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(canvas)

    const host = canvas.parentElement ?? canvas
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.f = Math.min(0.98, Math.max(0.02, 1 - (e.clientY - rect.top) / rect.height))
      if (!pointer.active) {
        pointer.prev = pointer.f
        pointer.active = true
      }
    }
    const onLeave = () => {
      pointer.active = false
    }
    host.addEventListener("pointermove", onMove)
    host.addEventListener("pointerleave", onLeave)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      host.removeEventListener("pointermove", onMove)
      host.removeEventListener("pointerleave", onLeave)
    }
  }, [on, noise, maxEmitters, locked])

  return <canvas ref={ref} aria-hidden="true" className={className} />
}
