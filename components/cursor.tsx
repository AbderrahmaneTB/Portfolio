"use client"

import { useEffect, useRef } from "react"
import { useMotionOn } from "@/components/motion"

/** Reticle cursor: a dot that tracks the pointer and a ring that follows with lag and grows over links. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const on = useMotionOn()

  useEffect(() => {
    if (!on || !window.matchMedia("(pointer: fine)").matches || !dot.current || !ring.current) return
    const d = dot.current
    const r = ring.current
    document.documentElement.classList.add("has-cursor")

    let x = -100
    let y = -100
    let rx = x
    let ry = y
    let raf = 0

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      x = e.clientX
      y = e.clientY
      d.style.transform = `translate3d(${x}px, ${y}px, 0)`
      d.style.opacity = "1"
      r.style.opacity = "1"
    }
    const over = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest<HTMLElement>("a, button, [data-cursor], input, label")
      r.dataset.state = target ? target.dataset.cursor ?? "link" : ""
      const label = target?.dataset.cursorLabel ?? ""
      r.dataset.label = label
    }
    const leave = () => {
      d.style.opacity = "0"
      r.style.opacity = "0"
    }
    const down = () => r.classList.add("scale-75")
    const up = () => r.classList.remove("scale-75")
    const loop = () => {
      rx += (x - rx) * 0.16
      ry += (y - ry) * 0.16
      r.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener("pointermove", move, { passive: true })
    window.addEventListener("pointerover", over, { passive: true })
    document.documentElement.addEventListener("pointerleave", leave)
    window.addEventListener("pointerdown", down)
    window.addEventListener("pointerup", up)
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerover", over)
      document.documentElement.removeEventListener("pointerleave", leave)
      window.removeEventListener("pointerdown", down)
      window.removeEventListener("pointerup", up)
      document.documentElement.classList.remove("has-cursor")
      d.style.opacity = "0"
      r.style.opacity = "0"
    }
  }, [on])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[95] hidden [@media(pointer:fine)]:block">
      <div
        ref={ring}
        className="cursor-ring absolute top-0 left-0 opacity-0 transition-[opacity,scale] duration-200"
      />
      <div
        ref={dot}
        className="absolute top-0 left-0 -mt-[3px] -ml-[3px] size-1.5 rounded-full bg-white opacity-0 mix-blend-difference"
      />
    </div>
  )
}
