"use client"

import { Fragment, useEffect, useRef, useState } from "react"
import { useIntro } from "@/components/intro"
import { useMotionOn } from "@/components/motion"

/**
 * A line of display text whose letters rise out of a blur, one after another, when the intro ends.
 * Splitting text into spans drops the font's pair kerning and breaks a clipped gradient, so both
 * are measured and restored: each letter gets its kerning back as a margin, and its own slice
 * of one gradient that spans the whole line.
 * The letters are hidden from assistive tech; give the parent heading an aria-label.
 */
export function LetterReveal({
  text,
  className = "",
  gradient = false,
  delay = 0,
}: {
  text: string
  className?: string
  /** Paint the line with the heat gradient */
  gradient?: boolean
  /** Milliseconds after the intro before the first letter moves */
  delay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const { done, played } = useIntro()
  const [measured, setMeasured] = useState(false)

  useEffect(() => {
    const line = ref.current
    if (!line) return
    const letters = [...line.querySelectorAll<HTMLElement>("[data-ch]")]

    // Measured on a hidden, untransformed copy, so it is exact even while letters are mid-animation
    const kern = () => {
      const range = document.createRange()
      for (const word of line.querySelectorAll<HTMLElement>("[data-word]")) {
        const chars = [...word.querySelectorAll<HTMLElement>("[data-ch]")]
        const probe = document.createElement("span")
        probe.style.cssText = "position:absolute;left:0;top:0;visibility:hidden;white-space:pre"
        word.appendChild(probe)
        const em = parseFloat(getComputedStyle(word).fontSize)
        // Width of each letter on its own, which is how the split spans sit
        const solo = chars.map((c) => {
          probe.textContent = c.textContent
          return probe.getBoundingClientRect().width
        })
        // Pen position of each letter when the whole word is set as one kerned run
        probe.textContent = chars.map((c) => c.textContent).join("")
        const node = probe.firstChild as Text
        const origin = probe.getBoundingClientRect().left
        const pen = chars.map((_, i) => {
          range.setStart(node, i)
          range.setEnd(node, i + 1)
          return range.getBoundingClientRect().left - origin
        })
        chars.forEach((c, i) => {
          const adjust = i > 0 ? pen[i] - pen[i - 1] - solo[i - 1] : 0
          c.style.marginLeft = Math.abs(adjust) > 0.3 ? `${(adjust / em).toFixed(4)}em` : ""
        })
        probe.remove()
      }
    }

    const paint = () => {
      if (!gradient) return
      line.style.setProperty("--line-w", `${line.clientWidth}px`)
      for (const c of letters) c.style.setProperty("--x", `${c.offsetLeft}px`)
    }

    const fit = () => {
      kern()
      paint()
      setMeasured(true)
    }
    fit()
    // Re-fit once the display font replaces its fallback
    document.fonts?.ready.then(fit)
    document.fonts?.addEventListener("loadingdone", fit)
    const ro = new ResizeObserver(paint)
    ro.observe(line)
    return () => {
      ro.disconnect()
      document.fonts?.removeEventListener("loadingdone", fit)
    }
  }, [gradient, text])

  let index = 0
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`name-line relative ${className}`}
      data-gradient={gradient ? "" : undefined}
      data-measured={measured ? "" : undefined}
      data-play={done && played ? "" : undefined}
      style={{ "--line-delay": `${delay}ms` } as React.CSSProperties}
    >
      {text.split(" ").map((word, w) => (
        <Fragment key={w}>
          {w > 0 && " "}
          <span data-word className="inline-block whitespace-nowrap">
            {[...word].map((ch) => {
              const i = index++
              return (
                <span key={i} data-ch className="name-ch" style={{ "--i": i } as React.CSSProperties}>
                  {ch}
                </span>
              )
            })}
          </span>
        </Fragment>
      ))}
    </span>
  )
}

const GREETINGS = ["Hello", "Salam", "Bonjour", "Azul"]

/**
 * Cycles the greeting in English, Arabic, French and Tamazight, typed and erased, without end.
 * Typing a single word and stopping read as a stalled page, so it keeps going. With motion off it
 * holds the current word. Screen readers get one plain "Hello".
 */
export function TypedGreeting() {
  const on = useMotionOn()
  const [i, setI] = useState(0)
  const [n, setN] = useState(GREETINGS[0].length)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = GREETINGS[i]
    if (!on) {
      if (n !== word.length || deleting) {
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
