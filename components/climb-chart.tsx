"use client"

import { useEffect, useRef, useState } from "react"
import { useMotionOn } from "@/components/motion"
import { competitions } from "@/lib/data"

const MONTHS = [
  { m: 5, label: "May" },
  { m: 6, label: "Jun" },
  { m: 7, label: "Jul" },
  { m: 8, label: "Aug" },
  { m: 9, label: "Sep" },
  { m: 10, label: "Oct" },
]
const suffix = { 1: "st", 2: "nd", 3: "rd" } as const
const placeWord = { 1: "First", 2: "Second", 3: "Third" } as const
const ledClass = { 1: "led-gold", 2: "led-silver", 3: "led-bronze" } as const
const LINE_S = 1.8

/**
 * When the drawing line reaches a given share of its length. The line eases with
 * cubic-bezier(0.16, 1, 0.3, 1), whose progress curve is 1 - (1 - s)^3, so the curve parameter
 * has a closed form and the time is its x. The tail is capped: the last 1.5% is invisible.
 */
function reachTime(share: number) {
  const s = 1 - Math.cbrt(1 - Math.min(share, 0.985))
  const u = 1 - s
  return (3 * u * u * s * 0.16 + 3 * u * s * s * 0.3 + s * s * s) * LINE_S
}

/**
 * The season as one instrument: every podium is an LED module plotted by month (across) and rank
 * (up), and the climb line draws through the best finish of each month. The modules sit dim until
 * the line reaches them, then light up. Each one links to that result's entry below.
 */
export function PodiumChart() {
  const boxRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(880)
  const [lit, setLit] = useState(false)
  const on = useMotionOn()

  useEffect(() => {
    const el = boxRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setWidth(Math.max(280, Math.round(entry.contentRect.width))))
    ro.observe(el)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setLit(true)
        io.disconnect()
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => {
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  const W = width
  const small = W < 560
  // Margins leave room for the rank labels on the left and, under the 3rd-place row, its module,
  // its label and the month axis
  const H = small ? 270 : 380
  const M = { l: small ? 64 : 108, r: small ? 30 : 60, t: small ? 40 : 56, b: small ? 66 : 100 }
  const x = (m: number) => M.l + ((m - 5) / 5) * (W - M.l - M.r)
  const y = (rank: number) => M.t + ((rank - 1) / 2) * (H - M.t - M.b)

  // Best finish per month draws the line; every result is a module.
  const best = MONTHS.map(({ m }) => {
    const ranks = competitions.filter((c) => c.month === m).map((c) => c.rank)
    return ranks.length ? { m, rank: Math.min(...ranks) } : null
  }).filter((p): p is { m: number; rank: 1 | 2 | 3 } => p !== null)
  const linePath = best.map((p, i) => `${i ? "L" : "M"}${x(p.m)} ${y(p.rank)}`).join(" ")
  const areaPath = `${linePath} L${x(best[best.length - 1].m)} ${H - M.b} L${x(best[0].m)} ${H - M.b} Z`
  // A module lights when the line reaches it: where the line crosses the module's edge and slips under it,
  // measured along the line's length. A result off the line (a second podium that month) follows a beat later.
  const half = small ? { w: 22, h: 26 } : { w: 30, h: 36 }
  const segments = best.map((p, i) => (i ? Math.hypot(x(p.m) - x(best[i - 1].m), y(p.rank) - y(best[i - 1].rank)) : 0))
  const total = segments.reduce((a, b) => a + b, 0)
  const reached = new Map<number, number>()
  let along = 0
  best.forEach((p, i) => {
    along += segments[i]
    let edge = 0
    if (i && segments[i]) {
      const dx = Math.abs(x(p.m) - x(best[i - 1].m)) / segments[i]
      const dy = Math.abs(y(p.rank) - y(best[i - 1].rank)) / segments[i]
      edge = Math.min(dx ? half.w / dx : Infinity, dy ? half.h / dy : Infinity)
    }
    reached.set(p.m, reachTime(total ? Math.max(0, along - edge) / total : 0))
  })
  // The flicker needs about 0.2s to its first full flash, so it starts just before the line arrives
  // (a negative delay simply starts it part-way through)
  const FLASH_LEAD = 0.15
  const lightAt = (month: number, rank: number) => {
    const onLine = best.some((p) => p.m === month && p.rank === rank)
    return (reached.get(month) ?? 0) + (onLine ? 0 : 0.35) - FLASH_LEAD
  }
  // The line and the LEDs share one trigger (data-lit) and one clock (CSS, see .climb-line in globals.css),
  // so modules light exactly as the line reaches them
  return (
    <figure className="podium" data-lit={lit || !on ? "" : undefined} style={{ "--draw": `${LINE_S}s` } as React.CSSProperties}>
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <span className="font-semibold">Best finish by month, 2026</span>
        <span className="text-sm text-muted">1st at the top. Select a result to read it.</span>
      </figcaption>

      <div ref={boxRef} className="relative mt-6" style={{ height: H }}>
        <svg aria-hidden="true" viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="absolute inset-0 overflow-visible">
          <defs>
            <linearGradient id="podium-line" x1="0" x2="1">
              <stop offset="0" stopColor="#e3935c" />
              <stop offset="0.55" stopColor="#e0457b" />
              <stop offset="1" stopColor="#ffc94d" />
            </linearGradient>
            <linearGradient id="podium-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#e0457b" stopOpacity="0.22" />
              <stop offset="1" stopColor="#e0457b" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[1, 2, 3].map((r) => (
            <g key={r}>
              <line x1={M.l} x2={W - M.r} y1={y(r)} y2={y(r)} stroke="rgb(255 255 255 / 0.1)" strokeDasharray="2 6" />
              <text x={0} y={y(r) + 4} className="fill-muted font-mono text-[12px]">
                {r}
                {suffix[r as 1 | 2 | 3]}
              </text>
            </g>
          ))}
          {MONTHS.map(({ m, label }) => (
            <text key={m} x={x(m)} y={H - 14} textAnchor="middle" className="fill-muted font-mono text-[12px]">
              {label}
            </text>
          ))}

          {/* A dim trace is always there, like an instrument before it powers on; the lit line draws over it */}
          <path d={linePath} fill="none" stroke="rgb(255 255 255 / 0.13)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          <path d={areaPath} fill="url(#podium-area)" className="climb-area" />
          <path
            d={linePath}
            pathLength={1}
            fill="none"
            stroke="url(#podium-line)"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="climb-line"
          />
        </svg>

        {competitions.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className="podium-point group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: x(c.month), top: y(c.rank), "--at": `${lightAt(c.month, c.rank).toFixed(2)}s` } as React.CSSProperties}
          >
            <span
              aria-hidden="true"
              className={`podium-module ${small ? "h-[3.25rem] w-[2.75rem] rounded-xl text-[2.5rem]" : "h-[4.5rem] w-[3.75rem] rounded-2xl text-[3.4rem]"}`}
            >
              <span className={`podium-digit led ${ledClass[c.rank]}`}>{c.rank}</span>
            </span>
            {!small && (
              <span aria-hidden="true" className="podium-label">
                {c.short}
              </span>
            )}
            <span className="sr-only">
              {placeWord[c.rank]} place, {c.event}, {c.date}
            </span>
          </a>
        ))}
      </div>
    </figure>
  )
}
