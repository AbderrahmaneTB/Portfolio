import { SkillIcon } from "@/components/icons"
import { skills } from "@/lib/data"

const SWEEP = 6 // seconds per revolution
const RADII = [0.33, 0.62, 0.88] // ring radius as a share of the scope radius
const OFFSETS = [24, 4, 14] // starting angle per ring, so blips don't line up
const RING_NAMES = ["Inner ring", "Middle ring", "Outer ring"]

function RadarScope() {
  const blips = skills.flatMap((g) =>
    g.items.map((item, i) => {
      const angle = (OFFSETS[g.ring] + (i * 360) / g.items.length) % 360
      const r = RADII[g.ring] * 50
      const rad = (angle * Math.PI) / 180
      return {
        ...item,
        key: `${g.group}-${item.name}`,
        x: 50 + r * Math.sin(rad),
        y: 50 - r * Math.cos(rad),
        // negative delay starts each blip mid-cycle, so it flashes exactly when the beam passes it
        delay: (angle / 360) * SWEEP - SWEEP,
      }
    }),
  )

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-[34rem]"
      style={{ "--sweep": `${SWEEP}s` } as React.CSSProperties}
    >
      <div className="absolute inset-0 rounded-full border border-white/10 bg-[radial-gradient(circle,rgb(139_92_246/0.1),transparent_70%)]" />
      {RADII.map((r) => (
        <div key={r} className="absolute rounded-full border border-white/[0.07]" style={{ inset: `${50 - r * 50}%` }} />
      ))}
      <div className="absolute inset-y-0 left-1/2 w-px bg-white/[0.06]" />
      <div className="absolute inset-x-0 top-1/2 h-px bg-white/[0.06]" />
      <div className="absolute inset-[14%] rotate-45 rounded-full border border-dashed border-white/[0.04]" />
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <div className="scope-sweep" />
      </div>
      <div className="absolute top-1/2 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-soft shadow-[0_0_16px_4px_rgb(139_92_246/0.8)]" />
      {blips.map((b) => (
        <span
          key={b.key}
          title={b.name}
          className="blip absolute grid size-8 place-items-center rounded-full border border-white/10 bg-[#120f1f]/90 sm:size-11"
          style={
            {
              left: `${b.x}%`,
              top: `${b.y}%`,
              transform: "translate(-50%, -50%)",
              "--delay": `${b.delay}s`,
            } as React.CSSProperties
          }
        >
          <SkillIcon icon={b.icon} className="size-3.5 sm:size-[1.15rem]" />
        </span>
      ))}
    </div>
  )
}

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="wrap py-28 md:py-36">
      <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="section-kicker">03 / Skills</p>
          <h2 id="skills-title" className="section-title mt-4">
            My toolkit, <span className="heat-text">on radar</span>
          </h2>
        </div>
        <p className="max-w-sm text-muted">Machine learning sits at the centre. Web, data and design tools orbit around it.</p>
      </div>

      <div className="mt-14 grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
        <div data-reveal className="lg:col-span-6">
          <RadarScope />
        </div>
        <div className="space-y-9 lg:col-span-6">
          {skills.map((g, i) => (
            <div key={g.group} data-reveal style={{ "--d": `${i * 120}ms` } as React.CSSProperties}>
              <h3 className="flex items-baseline gap-3 font-display text-xl font-bold tracking-tight">
                {g.group}
                <span className="font-mono text-xs font-normal text-violet-soft">{RING_NAMES[g.ring]}</span>
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li
                    key={item.name}
                    className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm transition-colors hover:border-white/25"
                  >
                    <SkillIcon icon={item.icon} className="size-4" />
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
