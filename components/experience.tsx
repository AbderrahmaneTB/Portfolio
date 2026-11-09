import { ArrowUpRight } from "lucide-react"
import { CertificateButton } from "@/components/certificate-button"
import { ClimbChart } from "@/components/climb-chart"
import { SpotlightCard } from "@/components/interactive"
import { competitions, roles, type Competition } from "@/lib/data"

const suffix = { 1: "st", 2: "nd", 3: "rd" } as const
const placeWord = { 1: "First", 2: "Second", 3: "Third" } as const
const ledClass = { 1: "led-gold", 2: "led-silver", 3: "led-bronze" } as const

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="wrap py-28 md:py-36">
      <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="section-kicker">01 / Experience</p>
          <h2 id="experience-title" className="section-title mt-4">
            Podium finishes
            <br />
            <span className="heat-text">and the work behind them</span>
          </h2>
        </div>
        <p className="max-w-sm text-muted">
          Four podiums in 2026 across Kaggle, Zindi and university datathons. Every certificate opens full size.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <SpotlightCard className="rounded-[1.75rem] p-6 md:p-8 lg:col-span-7">
          <div data-reveal>
            <ClimbChart />
          </div>
        </SpotlightCard>

        <SpotlightCard className="flex flex-col justify-between rounded-[1.75rem] p-6 md:p-8 lg:col-span-5">
          <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
            <p className="font-semibold">Medal table</p>
            <ul className="mt-6 grid grid-cols-4 gap-2">
              {competitions.map((c) => (
                <li key={c.id} className="text-center">
                  <a href={`#${c.id}`} className="group block">
                    <span className={`led block text-[clamp(3.5rem,7vw,5.25rem)] ${ledClass[c.rank]}`} aria-hidden="true">
                      {c.rank}
                    </span>
                    <span className="sr-only">
                      {placeWord[c.rank]} place, {c.event}
                    </span>
                    <span aria-hidden="true" className="mt-3 block text-xs text-muted transition-colors group-hover:text-ink">
                      {c.short}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p data-reveal className="mt-10 text-pretty text-lg leading-snug" style={{ "--d": "220ms" } as React.CSSProperties}>
            From <span className="font-semibold text-bronze">3rd in May</span> to{" "}
            <span className="font-semibold text-gold">1st in October</span>, on radar signals, financial stress, breast
            cancer detection, river forecasting and AI-text detection.
          </p>
        </SpotlightCard>
      </div>

      <ul className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        {competitions.map((c, i) => (
          <li key={c.id} data-reveal style={{ "--d": `${(i % 2) * 120}ms` } as React.CSSProperties}>
            <CompetitionCard competition={c} />
          </li>
        ))}
      </ul>

      <div className="mt-24 grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div data-reveal className="lg:col-span-4">
          <h3 className="font-display text-3xl font-bold tracking-tight">Roles</h3>
          <p className="mt-3 max-w-xs text-muted">Where I ship products alongside the competitions.</p>
        </div>
        <ol className="relative space-y-6 lg:col-span-8">
          {roles.map((r, i) => (
            <li key={r.title} data-reveal style={{ "--d": `${i * 120}ms` } as React.CSSProperties}>
              <SpotlightCard className="rounded-[1.5rem] p-6 md:p-7">
                <div className="flex items-start gap-4">
                  <span aria-hidden="true" className="mt-1.5 size-2.5 shrink-0 rounded-full bg-violet shadow-[0_0_14px_3px_rgb(139_92_246/0.7)]" />
                  <div>
                    <h4 className="font-display text-xl font-bold tracking-tight">{r.title}</h4>
                    <p className="mt-1 text-sm text-violet-soft">{r.org}</p>
                    <p className="mt-3 text-pretty text-muted">{r.description}</p>
                  </div>
                </div>
              </SpotlightCard>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function CompetitionCard({ competition: c }: { competition: Competition }) {
  return (
    <SpotlightCard id={c.id} className="flex h-full flex-col rounded-[1.75rem] p-5 sm:p-6 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <p className="flex items-start">
          <span className="sr-only">{placeWord[c.rank]} place</span>
          <span aria-hidden="true" className={`led text-[5.5rem] ${ledClass[c.rank]}`}>
            {c.rank}
          </span>
          <span aria-hidden="true" className={`led mt-1 ml-1 text-2xl ${ledClass[c.rank]}`}>
            {suffix[c.rank]}
          </span>
        </p>
        <time dateTime={c.dateTime} className="glass rounded-full px-3 py-1 font-mono text-xs text-muted">
          {c.date}
        </time>
      </div>

      <h3 className="mt-6 font-display text-2xl font-bold tracking-tight md:text-[1.7rem]">{c.event}</h3>
      <p className="mt-1.5 text-sm text-violet-soft">{c.host}</p>
      <p className="mt-4 text-pretty text-muted">{c.summary}</p>

      {c.challenges && (
        <ul className="mt-5 space-y-2 text-sm">
          {c.challenges.map((ch) => (
            <li key={ch.name} className="flex items-start gap-3">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-magenta" />
              {ch.href ? (
                <a href={ch.href} target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-white/25 underline-offset-4 hover:decoration-white">
                  {ch.name}
                </a>
              ) : (
                <span className="text-ink/90">{ch.name}</span>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-7">
        {c.certificate && <CertificateButton certificate={c.certificate} />}
        {c.links && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {c.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium hover:border-white/25"
                >
                  {l.label}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </SpotlightCard>
  )
}
