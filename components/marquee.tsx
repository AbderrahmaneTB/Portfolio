"use client"

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion"
import { useRef } from "react"
import { useMotionOn } from "@/components/motion"
import { SpectrogramField } from "@/components/spectrogram-field"
import { topics } from "@/lib/data"

/**
 * A row that drifts on its own and speeds up with scroll velocity.
 * Scrolling up reverses it, fast scrolling leans it, hovering slows it down.
 */
function VelocityRow({
  children,
  baseVelocity,
  className,
}: {
  children: React.ReactNode
  baseVelocity: number
  className?: string
}) {
  const on = useMotionOn()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const factor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false })
  const skew = useTransform(velocity, [-2500, 2500], [7, -7])
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)
  const direction = useRef(1)
  const slow = useRef(false)

  useAnimationFrame((_, delta) => {
    if (!on) return
    let moveBy = direction.current * baseVelocity * (delta / 1000)
    const f = factor.get()
    if (f < 0) direction.current = -1
    else if (f > 0) direction.current = 1
    moveBy += direction.current * moveBy * f
    if (slow.current) moveBy *= 0.2
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div
      className="flex overflow-hidden whitespace-nowrap"
      onPointerEnter={() => (slow.current = true)}
      onPointerLeave={() => (slow.current = false)}
    >
      <motion.div className={`flex w-max shrink-0 ${className ?? ""}`} style={on ? { x, skewX: skew } : undefined}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div aria-hidden="true" className="flex shrink-0 items-center">
          {children}
        </div>
      </motion.div>
    </div>
  )
}

// A linear chirp drawn once: frequency rises from left to right, like the ridges in the field behind it
const CHIRP = Array.from({ length: 49 }, (_, i) => {
  const t = i / 48
  const y = 14 - 9 * Math.sin(2 * Math.PI * (0.8 * t + 2.4 * t * t))
  return `${i ? "L" : "M"}${(t * 64).toFixed(1)} ${y.toFixed(1)}`
}).join(" ")

function ChirpMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 28" className="mx-5 h-6 w-14 shrink-0 md:mx-7 md:h-7 md:w-16">
      <path d={CHIRP} fill="none" stroke="url(#chirp-mark)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** The fields behind this page, carried across a live spectrogram strip like signals in a waterfall. */
export function Marquee() {
  return (
    <section aria-label="Fields I’ve worked in" className="relative isolate overflow-hidden border-y border-line">
      {/* One gradient shared by every chirp mark in the row */}
      <svg aria-hidden="true" width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="chirp-mark" x1="0" x2="1">
            <stop offset="0" stopColor="#b79cff" />
            <stop offset="0.5" stopColor="#e0457b" />
            <stop offset="1" stopColor="#ffb547" />
          </linearGradient>
        </defs>
      </svg>
      <SpectrogramField
        maxEmitters={3}
        className="absolute inset-0 -z-10 h-full w-full opacity-60 [mask-image:linear-gradient(90deg,transparent,#000_18%,#000_82%,transparent)]"
      />
      <div className="py-9 [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)] md:py-12">
        <VelocityRow baseVelocity={-2}>
          {topics.map((t) => (
            <span key={t} className="flex items-center">
              <span className="font-display text-[clamp(2rem,5.4vw,4.25rem)] leading-none font-extrabold tracking-tight text-ink [text-shadow:0_2px_24px_rgb(7_6_12/0.85)]">
                {t}
              </span>
              <ChirpMark />
            </span>
          ))}
        </VelocityRow>
      </div>
    </section>
  )
}
