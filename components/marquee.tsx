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

const THEMES = ["Machine learning", "Radar signals", "Reinforcement learning", "Gradient boosting", "Full-stack products"]
const TOOLS = ["PyTorch", "LightGBM", "scikit-learn", "Next.js", "React", "FastAPI", "SUMO", "pandas", "Docker"]

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

export function Marquee() {
  return (
    <section
      aria-label="Topics and tools"
      className="relative overflow-hidden border-y border-line py-8 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] md:py-10"
    >
      <VelocityRow baseVelocity={-2.2}>
        {THEMES.map((w) => (
          <span key={w} className="flex items-center">
            <span className="outline-text px-6 font-display text-[clamp(2.4rem,6.4vw,5rem)] leading-none font-extrabold tracking-tight transition-colors duration-300 hover:text-ink">
              {w}
            </span>
            <span aria-hidden="true" className="heat-text text-3xl">
              ✦
            </span>
          </span>
        ))}
      </VelocityRow>
      <div className="mt-4 md:mt-5">
        <VelocityRow baseVelocity={2.8}>
          {TOOLS.map((w) => (
            <span key={w} className="flex items-center">
              <span className="heat-text px-5 font-display text-[clamp(1.4rem,3.2vw,2.4rem)] leading-tight font-bold tracking-tight">
                {w}
              </span>
              <span aria-hidden="true" className="size-1.5 rounded-full bg-white/25" />
            </span>
          ))}
        </VelocityRow>
      </div>
    </section>
  )
}
