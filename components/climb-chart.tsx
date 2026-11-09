"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { competitions } from "@/lib/data"

const MONTHS = [
  { m: 5, label: "May" },
  { m: 6, label: "Jun" },
  { m: 7, label: "Jul" },
  { m: 8, label: "Aug" },
  { m: 9, label: "Sep" },
  { m: 10, label: "Oct" },
]
const fill = { 1: "#ffc94d", 2: "#d5dde8", 3: "#e3935c" } as const
const suffix = { 1: "st", 2: "nd", 3: "rd" } as const

// Label placement that stays clear of the line and of the two October dots at any width
const labelPos: Record<string, { dx: number; dy: number; anchor: "start" | "end" | "middle" }> = {
  "mini-datathon": { dx: 12, dy: -12, anchor: "start" },
  "zindi-financial-stress": { dx: 0, dy: -16, anchor: "middle" },
  odyssea: { dx: 10, dy: 24, anchor: "end" },
  synapseon: { dx: 8, dy: -15, anchor: "end" },
}

export function ClimbChart() {
  const boxRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(560)
  const [hover, setHover] = useState<string | null>(null)

  // The SVG is drawn at its real pixel width, so labels keep their size on phones
  useEffect(() => {
    const el = boxRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setWidth(Math.max(260, Math.round(entry.contentRect.width))))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const W = width
  const H = W < 480 ? 240 : 280
  const M = { l: W < 480 ? 40 : 52, r: 24, t: 34, b: 40 }
  const x = (m: number) => M.l + ((m - 5) / 5) * (W - M.l - M.r)
  const y = (rank: number) => M.t + ((rank - 1) / 2) * (H - M.t - M.b)

  // Best finish per month draws the line; every result is a dot.
  const best = MONTHS.map(({ m }) => {
    const ranks = competitions.filter((c) => c.month === m).map((c) => c.rank)
    return ranks.length ? { m, rank: Math.min(...ranks) } : null
  }).filter((p): p is { m: number; rank: 1 | 2 | 3 } => p !== null)
  const linePath = best.map((p, i) => `${i ? "L" : "M"}${x(p.m)} ${y(p.rank)}`).join(" ")
  const areaPath = `${linePath} L${x(best[best.length - 1].m)} ${H - M.b} L${x(best[0].m)} ${H - M.b} Z`

  const active = competitions.find((c) => c.id === hover)

  return (
    <figure className="relative">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="font-semibold">Best finish by month, 2026</span>
        <span className="font-mono text-xs text-muted">rank, 1st at the top</span>
      </figcaption>

      <div ref={boxRef} className="relative mt-4">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full overflow-visible"
          role="img"
          aria-label="Best competition finish by month in 2026: 3rd in May, 2nd in September, 1st in October."
        >
          <defs>
            <linearGradient id="climb-line" x1="0" x2="1">
              <stop offset="0" stopColor="#e3935c" />
              <stop offset="0.55" stopColor="#e0457b" />
              <stop offset="1" stopColor="#ffc94d" />
            </linearGradient>
            <linearGradient id="climb-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.28" />
              <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[1, 2, 3].map((r) => (
            <g key={r}>
              <line x1={M.l} x2={W - M.r} y1={y(r)} y2={y(r)} stroke="rgb(255 255 255 / 0.08)" strokeDasharray="2 6" />
              <text x={M.l - 12} y={y(r) + 4} textAnchor="end" className="fill-muted font-mono text-[11px]">
                {r}
                {suffix[r as 1 | 2 | 3]}
              </text>
            </g>
          ))}
          {MONTHS.map(({ m, label }) => (
            <text key={m} x={x(m)} y={H - 12} textAnchor="middle" className="fill-muted font-mono text-[11px]">
              {label}
            </text>
          ))}

          <motion.path
            key={`area-${W}`}
            d={areaPath}
            fill="url(#climb-area)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.8 }}
          />
          <motion.path
            key={`line-${W}`}
            d={linePath}
            fill="none"
            stroke="url(#climb-line)"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />

          {competitions.map((c, i) => {
            const cx = x(c.month)
            const cy = y(c.rank)
            const lp = labelPos[c.id]
            const on = hover === c.id
            return (
              <motion.g
                key={c.id}
                tabIndex={0}
                role="button"
                aria-label={`${c.rank}${suffix[c.rank]} place, ${c.event}, ${c.date}`}
                onPointerEnter={() => setHover(c.id)}
                onPointerLeave={() => setHover(null)}
                onFocus={() => setHover(c.id)}
                onBlur={() => setHover(null)}
                onClick={() => document.getElementById(c.id)?.scrollIntoView({ behavior: "smooth", block: "center" })}
                className="cursor-pointer outline-none"
                initial={{ opacity: 0, scale: 0.4 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.5 + i * 0.12, type: "spring", stiffness: 260, damping: 18 }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              >
                <circle cx={cx} cy={cy} r={20} fill="transparent" />
                <circle cx={cx} cy={cy} r={on ? 14 : 11} fill={fill[c.rank]} opacity={0.18} className="transition-all duration-300" />
                <circle cx={cx} cy={cy} r={6.5} fill={fill[c.rank]} stroke="#07060c" strokeWidth={2} />
                <text x={cx + lp.dx} y={cy + lp.dy} textAnchor={lp.anchor} className="fill-ink text-[12px] font-semibold">
                  {c.short}
                </text>
              </motion.g>
            )
          })}
        </svg>

        {active && (
          <div
            role="tooltip"
            className="glass pointer-events-none absolute z-10 w-52 -translate-x-1/2 -translate-y-[calc(100%+18px)] rounded-xl p-3 text-sm shadow-2xl"
            style={{
              left: `${Math.min(Math.max((x(active.month) / W) * 100, 22), 78)}%`,
              top: `${(y(active.rank) / H) * 100}%`,
            }}
          >
            <p className="font-semibold">{active.event}</p>
            <p className="mt-0.5 text-muted">
              {active.rank}
              {suffix[active.rank]} place · {active.date}
            </p>
          </div>
        )}
      </div>

      <div className="sr-only">
        <table>
          <caption>Competition results in 2026</caption>
          <thead>
            <tr>
              <th scope="col">Competition</th>
              <th scope="col">Month</th>
              <th scope="col">Rank</th>
            </tr>
          </thead>
          <tbody>
            {competitions.map((c) => (
              <tr key={c.id}>
                <td>{c.event}</td>
                <td>{c.date}</td>
                <td>{c.rank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  )
}
