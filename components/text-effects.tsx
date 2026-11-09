"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useIntroDone } from "@/components/intro"
import { motionOn, useMotionOn } from "@/components/motion"

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const LOWER = "abcdefghijklmnopqrstuvwxyz"

function noiseChar(ch: string) {
  if (ch === " ") return " "
  const set = ch === ch.toUpperCase() ? UPPER : LOWER
  return set[(Math.random() * set.length) | 0]
}


/** Text that resolves out of random letters, left to right, once the intro is done. */
export function DecodeText({
  text,
  className,
  delay = 0,
  duration = 1200,
}: {
  text: string
  className?: string
  delay?: number
  duration?: number
}) {
  const done = useIntroDone()
  const [out, setOut] = useState(text)

  useEffect(() => {
    if (!done || !motionOn()) return
    const chars = [...text]
    let raf = 0
    const start = performance.now() + delay
    const tick = (now: number) => {
      const p = (now - start) / duration
      if (p >= 1) {
        setOut(text)
        return
      }
      setOut(chars.map((ch, i) => (p > 0.25 + (i / chars.length) * 0.75 ? ch : noiseChar(ch))).join(""))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [done, text, delay, duration])

  // Server HTML holds the real text; give the parent element an aria-label so assistive tech
  // reads the name rather than the scrambled frames.
  return <span className={className}>{out}</span>
}

const GREETINGS = ["Hello", "Salam", "Bonjour", "Azul"]

/** Cycles greetings in English, Arabic, French and Tamazight, typed and erased. */
export function TypedGreeting() {
  const [i, setI] = useState(0)
  const [n, setN] = useState(GREETINGS[0].length)
  const [deleting, setDeleting] = useState(false)
  const on = useMotionOn()

  useEffect(() => {
    const word = GREETINGS[i]
    if (!on) {
      // Hold the full word while animations are off
      if (n !== word.length) {
        const t = window.setTimeout(() => {
          setDeleting(false)
          setN(word.length)
        }, 0)
        return () => window.clearTimeout(t)
      }
      return
    }
    let t: number
    if (!deleting && n < word.length) t = window.setTimeout(() => setN(n + 1), 95)
    else if (!deleting) t = window.setTimeout(() => setDeleting(true), 1900)
    else if (n > 0) t = window.setTimeout(() => setN(n - 1), 50)
    else
      t = window.setTimeout(() => {
        setDeleting(false)
        setI((i + 1) % GREETINGS.length)
      }, 220)
    return () => window.clearTimeout(t)
  }, [i, n, deleting, on])

  return (
    <span>
      <span className="sr-only">Hello</span>
      <span aria-hidden="true" className="text-ink">
        {GREETINGS[i].slice(0, n)}
        <span className="ml-0.5 inline-block h-[1em] w-[0.5ch] translate-y-[0.15em] animate-pulse bg-violet-soft" />
      </span>
    </span>
  )
}

const ROLES = ["machine learning enthusiast", "full-stack developer", "datathon winner", "Kaggle competitor"]

/** Rotates through roles with a vertical slide. */
export function RoleRotator() {
  const [i, setI] = useState(0)
  const on = useMotionOn()

  useEffect(() => {
    if (!on) return
    const id = window.setInterval(() => setI((v) => (v + 1) % ROLES.length), 2600)
    return () => window.clearInterval(id)
  }, [on])

  return (
    <span className="relative -mb-[0.15em] inline-block overflow-hidden pb-[0.15em] align-bottom">
      <span className="sr-only">machine learning enthusiast and full-stack developer</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={ROLES[i]}
          aria-hidden="true"
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-110%", opacity: 0 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="heat-text inline-block whitespace-nowrap font-semibold"
        >
          {ROLES[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
