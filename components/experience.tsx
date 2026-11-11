import { CertificateButton } from "@/components/certificate-button"
import { PodiumChart } from "@/components/climb-chart"
import { SnrDemo } from "@/components/snr-demo"
import { StressFlow } from "@/components/stress-flow"
import { LinkPills, Stack } from "@/components/tags"
import { competitions, roles, stressProject, type Competition } from "@/lib/data"

const suffix = { 1: "st", 2: "nd", 3: "rd" } as const
const placeWord = { 1: "First", 2: "Second", 3: "Third" } as const
const ledClass = { 1: "led-gold", 2: "led-silver", 3: "led-bronze" } as const

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="wrap pt-28 md:pt-40">
      <h2 id="experience-title" className="section-title">
        Experience
      </h2>

      <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-12">
        <h3 className="subhead lg:col-span-3">Roles</h3>
        <ul className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2 lg:col-span-9">
          {roles.map((r) => (
            <li key={r.title} className="border-t border-line pt-6">
              <h4 className="entry-title">{r.title}</h4>
              <p className="mt-1.5 text-ink/70">{r.org}</p>
              <p className="mt-3 text-muted">{r.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-24 grid grid-cols-1 gap-x-12 gap-y-5 lg:grid-cols-12 md:mt-28">
        <h3 className="subhead lg:col-span-3">Podium finishes</h3>
        <p className="max-w-2xl text-lg text-muted lg:col-span-9">
          Four podiums in 2026, from <span className="font-semibold text-bronze">3rd in May</span> to{" "}
          <span className="font-semibold text-gold">1st in October</span>, on radar signals, financial stress, breast
          cancer detection, river forecasting and AI-text detection.
        </p>
      </div>

      <div className="mt-10 rounded-[1.75rem] border border-line bg-panel/70 p-5 sm:p-7 md:p-9">
        <PodiumChart />
      </div>

      <ol className="mt-8 border-t border-line">
        {competitions.map((c) => (
          <ResultEntry key={c.id} c={c} />
        ))}
      </ol>
    </section>
  )
}

/** One podium and the work behind it: the story beside its evidence (a demo, a pipeline or the certificate). */
function ResultEntry({ c }: { c: Competition }) {
  const evidence =
    c.id === "synapseon" ? (
      <SnrDemo />
    ) : c.id === "zindi-financial-stress" ? (
      <StressFlow />
    ) : c.certificate ? (
      <CertificateButton certificate={c.certificate} />
    ) : null

  return (
    <li
      id={c.id}
      className="grid scroll-mt-24 grid-cols-1 gap-x-10 gap-y-7 border-b border-line py-12 md:py-16 lg:grid-cols-[6.5rem_minmax(0,1fr)_minmax(0,1.08fr)]"
    >
      <div className="flex items-end gap-5 lg:flex-col lg:items-start lg:gap-4">
        <p className="flex items-start">
          <span className="sr-only">{placeWord[c.rank]} place</span>
          <span aria-hidden="true" className={`led text-[5rem] md:text-[6rem] ${ledClass[c.rank]}`}>
            {c.rank}
          </span>
          <span aria-hidden="true" className={`led mt-1 ml-1 text-2xl ${ledClass[c.rank]}`}>
            {suffix[c.rank]}
          </span>
        </p>
        <time dateTime={c.dateTime} className="pb-2 font-mono text-sm text-muted tabular-nums lg:pb-0">
          {c.date}
        </time>
      </div>

      <div className="min-w-0">
        <h4 className="entry-title text-[1.75rem] md:text-[2rem]">{c.event}</h4>
        <p className="mt-2 text-sm text-ink/70">{c.host}</p>
        <p className="mt-5 max-w-[62ch] text-ink/85">{c.summary}</p>

        {c.challenges && (
          <ul className="mt-4 space-y-1 text-sm" aria-label="Challenges">
            {c.challenges.map((ch) => (
              <li key={ch.name} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-2.75 size-1.5 shrink-0 rounded-full bg-magenta" />
                {ch.href ? (
                  <a href={ch.href} target="_blank" rel="noopener noreferrer" className="text-link py-1">
                    {ch.name}
                  </a>
                ) : (
                  <span className="py-1 text-ink/90">{ch.name}</span>
                )}
              </li>
            ))}
          </ul>
        )}

        {c.id === "zindi-financial-stress" && (
          <div className="mt-6">
            <Stack items={stressProject.stack} />
          </div>
        )}

        {(c.links || (c.certificate && c.id === "synapseon")) && (
          <div className="mt-7 flex flex-wrap items-center gap-3">
            {c.links && <LinkPills links={c.links} />}
            {c.certificate && c.id === "synapseon" && <CertificateButton certificate={c.certificate} compact />}
          </div>
        )}
      </div>

      <div className="min-w-0">{evidence}</div>
    </li>
  )
}
