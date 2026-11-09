"use client"

import { useEffect, useRef, useState } from "react"
import { buildMagmaLUT } from "@/components/colormap"
import { useMotionOn } from "@/components/motion"

const W = 168
const H = 96

/**
 * Interactive illustration of the Track B problem: a chirp's spectrogram as noise rises.
 * It sweeps the SNR on its own until someone drags the slider.
 */
export function SnrDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [snr, setSnr] = useState(30)
  const snrRef = useRef(30)
  const touched = useRef(false)
  const on = useMotionOn()
  const redraw = useRef<() => void>(() => {})

  useEffect(() => {
    snrRef.current = snr
    redraw.current()
  }, [snr])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    canvas.width = W
    canvas.height = H
    const img = ctx.createImageData(W, H)
    const lut = buildMagmaLUT(0, 0.02)

    // Chirp ridge: a gently curved sweep from low to high frequency
    const ridge = new Float32Array(W)
    for (let x = 0; x < W; x++) {
      const t = x / (W - 1)
      ridge[x] = (0.86 - 0.72 * (0.25 * t + 0.75 * t * t)) * (H - 1)
    }

    const draw = () => {
      const s = snrRef.current
      const noise = 0.1 + 0.52 * ((30 - s) / 60)
      const amp = (s + 34) / 64
      const d = img.data
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const inPulse = x > W * 0.06 && x < W * 0.94
          const z = (y - ridge[x]) / 1.4
          const sig = inPulse ? amp * Math.exp(-0.5 * z * z) : 0
          const v = Math.min(1, sig + noise * Math.sqrt(-2 * Math.log(Math.random() + 1e-9)) * 0.42)
          const k = ((v * 255) | 0) * 4
          const o = (y * W + x) * 4
          d[o] = lut[k]
          d[o + 1] = lut[k + 1]
          d[o + 2] = lut[k + 2]
          d[o + 3] = 255
        }
      }
      ctx.putImageData(img, 0, 0)
    }

    draw()
    // With motion off the noise stays still, but the slider still redraws the picture
    redraw.current = draw
    if (!on) return

    let raf = 0
    let last = 0
    let lastSweep = 0
    let visible = false
    let dir = -1
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop)
      if (!visible || document.hidden || t - last < 60) return
      last = t
      // Sweep the SNR down and back up on its own until someone uses the slider
      if (!touched.current && t - lastSweep > 900) {
        lastSweep = t
        let next = snrRef.current + dir * 5
        if (next < -30 || next > 30) {
          dir *= -1
          next = snrRef.current + dir * 5
        }
        snrRef.current = next
        setSnr(next)
      }
      draw()
    }
    raf = requestAnimationFrame(loop)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(canvas)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [on])

  const label = `${snr > 0 ? "+" : snr < 0 ? "−" : ""}${Math.abs(snr)} dB`
  const verdict = snr >= 10 ? "chirp clear" : snr >= -5 ? "chirp fading" : snr >= -20 ? "barely there" : "lost in noise"

  return (
    <figure>
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black">
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="block aspect-[7/4] w-full [image-rendering:auto]"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-3 font-mono text-[0.7rem] text-white/80">
          <span className="rounded-full bg-black/50 px-2.5 py-1 backdrop-blur">SNR {label}</span>
          <span className="rounded-full bg-black/50 px-2.5 py-1 backdrop-blur">{verdict}</span>
        </div>
      </div>
      <label className="mt-5 block">
        <span className="flex items-baseline justify-between text-sm">
          <span className="font-medium">Signal-to-noise ratio</span>
          <span className="font-mono text-xs text-muted tabular-nums">{label}</span>
        </span>
        <input
          type="range"
          min={-30}
          max={30}
          step={5}
          value={snr}
          onChange={(e) => {
            touched.current = true
            setSnr(Number(e.target.value))
          }}
          onPointerDown={() => {
            touched.current = true
          }}
          className="mt-3 w-full accent-violet"
          aria-valuetext={`${label}, ${verdict}`}
        />
        <span className="mt-1 flex justify-between font-mono text-[0.7rem] text-dim">
          <span>−30 dB</span>
          <span>0</span>
          <span>+30 dB</span>
        </span>
      </label>
      <figcaption className="mt-4 text-sm text-pretty text-dim">
        Drag to add noise. An illustration of what Track B models face: one chirp pulse, time across, frequency up. Not
        challenge data.
      </figcaption>
    </figure>
  )
}
