"use client"

import { AnimatePresence, MotionConfig, motion } from "framer-motion"
import { createContext, useContext, useEffect, useRef, useState } from "react"
import { useMotionOn } from "@/components/motion"

type IntroState = {
  /** The intro has finished, or was skipped */
  done: boolean
  /** The intro actually played on this page load, so the hero entrance should run */
  played: boolean
}

const IntroContext = createContext<IntroState>({ done: false, played: false })

/** Hero animations wait for `done`, and only run when the intro `played`. */
export function useIntro() {
  return useContext(IntroContext)
}

const LOADER_MS = 1700

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<IntroState>({ done: false, played: false })
  const [mounted, setMounted] = useState(true)
  const motionAllowed = useMotionOn()

  useEffect(() => {
    if (document.documentElement.dataset.intro === "seen") {
      setMounted(false)
      setState({ done: true, played: false })
      return
    }
    const t = window.setTimeout(() => {
      try {
        localStorage.setItem("intro-seen-at", String(Date.now()))
      } catch {}
      setState({ done: true, played: true })
    }, LOADER_MS)
    return () => window.clearTimeout(t)
  }, [])

  // Lift the hero's hidden state only after the children have rendered their entrance,
  // so nothing flashes in for a frame before it animates.
  useEffect(() => {
    if (state.done) delete document.documentElement.dataset.introPending
  }, [state.done])

  return (
    <MotionConfig reducedMotion={motionAllowed ? "never" : "always"}>
      <IntroContext.Provider value={state}>
        <AnimatePresence>{mounted && !state.done && <IntroLoader key="intro" />}</AnimatePresence>
        {children}
      </IntroContext.Provider>
    </MotionConfig>
  )
}

/** "Acquiring signal": SNR climbs from -30 dB to +30 dB while a noisy trace settles into a clean chirp. */
function IntroLoader() {
  const pathRef = useRef<SVGPathElement>(null)
  const snrRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / (LOADER_MS - 150))
      const e = 1 - Math.pow(1 - p, 3)
      const snr = Math.round(-30 + 60 * e)
      if (snrRef.current) snrRef.current.textContent = `${snr > 0 ? "+" : snr < 0 ? "−" : ""}${Math.abs(snr)} dB`
      if (barRef.current) barRef.current.style.transform = `scaleX(${e})`
      if (pathRef.current) {
        const noise = 22 * (1 - e) + 1.2
        let d = ""
        for (let i = 0; i <= 120; i++) {
          const x = (i / 120) * 400
          const phase = (i / 120) * (6 + 20 * (i / 120)) * Math.PI
          const yv = 40 + Math.sin(phase + now / 180) * 14 * e + (Math.random() - 0.5) * noise
          d += `${i ? "L" : "M"}${x.toFixed(1)} ${yv.toFixed(1)}`
        }
        pathRef.current.setAttribute("d", d)
      }
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <motion.div
      className="intro"
      role="status"
      aria-label="Loading"
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      initial={{ clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="w-[min(26rem,82vw)]">
        <div className="flex items-baseline justify-between font-mono text-xs text-muted">
          <span>Acquiring signal</span>
          <span ref={snrRef} className="text-ink tabular-nums">
            −30 dB
          </span>
        </div>
        <svg viewBox="0 0 400 80" className="mt-4 h-20 w-full overflow-visible" aria-hidden="true">
          <defs>
            <linearGradient id="intro-heat" x1="0" x2="1">
              <stop offset="0" stopColor="#b79cff" />
              <stop offset="0.5" stopColor="#e0457b" />
              <stop offset="1" stopColor="#ffb547" />
            </linearGradient>
          </defs>
          <path ref={pathRef} d="M0 40 L400 40" fill="none" stroke="url(#intro-heat)" strokeWidth="1.6" />
        </svg>
        <div className="mt-4 h-px w-full overflow-hidden bg-line">
          <span
            ref={barRef}
            className="block h-full origin-left scale-x-0 bg-[linear-gradient(90deg,#8b5cf6,#e0457b,#ffb547)]"
          />
        </div>
        <p className="mt-6 font-display text-xl font-semibold tracking-tight text-ink">
          Abderrahmane Tayeb Boudjema
        </p>
      </div>
    </motion.div>
  )
}
