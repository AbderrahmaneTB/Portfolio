import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { AutoVideo, CountUp, SpotlightCard, Tilt } from "@/components/interactive"
import { SnrDemo } from "@/components/snr-demo"
import { StressFlow } from "@/components/stress-flow"
import { chowkpilot, radarProject, site, stressProject, webProjects, type Link } from "@/lib/data"

function LinkPills({ links, primaryFirst = false }: { links: Link[]; primaryFirst?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {links.map((l, i) => (
        <li key={l.href}>
          <a
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className={
              primaryFirst && i === 0
                ? "inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
                : "glass inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium hover:border-white/25"
            }
          >
            {l.label}
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  )
}

function Stack({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Built with">
      {items.map((s) => (
        <li key={s} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[0.72rem] text-muted">
          {s}
        </li>
      ))}
    </ul>
  )
}

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="wrap py-28 md:py-36">
      <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="section-kicker">02 / Projects</p>
          <h2 id="projects-title" className="section-title mt-4">
            Things I’ve <span className="heat-text">built</span>
          </h2>
        </div>
        <p className="max-w-sm text-muted">Models that won on hidden data, and the products around them. Try the demos.</p>
      </div>

      {/* ChowkPilot */}
      <div data-reveal className="mt-14">
        <SpotlightCard className="overflow-hidden rounded-[2rem] p-5 sm:p-6 md:p-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-xs text-violet-soft">
                <span className="live-dot" aria-hidden="true" /> {chowkpilot.badge}
              </span>
              <h3 className="mt-5 font-display text-4xl font-extrabold tracking-tight md:text-5xl">{chowkpilot.name}</h3>
              <p className="mt-2 text-sm text-muted">{chowkpilot.context}</p>
              <p className="mt-5 text-pretty text-ink/85">{chowkpilot.description}</p>
              <dl className="mt-7 grid grid-cols-1 gap-2 min-[440px]:grid-cols-3 min-[440px]:gap-3">
                {chowkpilot.metrics.map((m) => (
                  <div key={m.label} className="rounded-2xl border border-white/10 bg-black/30 p-3.5">
                    <dt className="sr-only">{m.label}</dt>
                    <dd className="flex items-center gap-4 min-[440px]:block">
                      <CountUp to={m.value} prefix="−" suffix="%" className="heat-text shrink-0 font-display text-3xl font-extrabold tabular-nums md:text-4xl" />
                      <span className="block text-sm leading-snug text-muted min-[440px]:mt-1 min-[440px]:text-[0.72rem]">{m.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6">
                <Stack items={chowkpilot.stack} />
              </div>
              <div className="mt-6">
                <LinkPills links={chowkpilot.links} primaryFirst />
              </div>
            </div>

            <div className="lg:col-span-7">
              <Tilt max={4}>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d14] shadow-[0_40px_100px_-40px_rgb(139_92_246/0.7)]">
                  <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                    <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="size-2.5 rounded-full bg-[#febc2e]" />
                    <span className="size-2.5 rounded-full bg-[#28c840]" />
                    <span className="ml-3 truncate rounded-md bg-white/5 px-3 py-1 font-mono text-[0.7rem] text-muted">
                      abderrahmanetb.github.io/chowkpilot
                    </span>
                  </div>
                  <AutoVideo
                    src="/projects/chowkpilot-demo.mp4"
                    poster="/projects/chowkpilot-demo-poster.webp"
                    label="Recorded SUMO simulation at Hyderabad's Hitech City junction: the same peak-hour vehicles under a fixed-time plan on the left and ChowkPilot on the right, which keeps far fewer vehicles stopped."
                    className="block aspect-[1100/518] w-full bg-black"
                  />
                </div>
              </Tilt>
              <p className="mt-3 text-sm text-dim">
                Real simulation footage: the same vehicles under a fixed-time plan (left) and ChowkPilot (right).
              </p>
            </div>
          </div>
        </SpotlightCard>
      </div>

      {/* Radar + Zindi */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div data-reveal>
          <SpotlightCard className="flex h-full flex-col rounded-[2rem] p-5 sm:p-6 md:p-8">
            <span className="glass inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 font-mono text-xs text-gold">
              {radarProject.badge}
            </span>
            <h3 className="mt-5 font-display text-3xl font-extrabold tracking-tight">{radarProject.name}</h3>
            <p className="mt-4 text-pretty text-muted">{radarProject.description}</p>
            <div className="mt-7">
              <SnrDemo />
            </div>
            <div className="mt-auto pt-7">
              <LinkPills links={radarProject.links} />
            </div>
          </SpotlightCard>
        </div>

        <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
          <SpotlightCard className="flex h-full flex-col rounded-[2rem] p-5 sm:p-6 md:p-8">
            <span className="glass inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 font-mono text-xs text-silver">
              {stressProject.badge}
            </span>
            <h3 className="mt-5 font-display text-3xl font-extrabold tracking-tight">{stressProject.name}</h3>
            <p className="mt-4 text-pretty text-muted">{stressProject.description}</p>
            <div className="mt-7">
              <StressFlow />
            </div>
            <div className="mt-6">
              <Stack items={stressProject.stack} />
            </div>
            <div className="mt-auto pt-7">
              <LinkPills links={stressProject.links} />
            </div>
          </SpotlightCard>
        </div>
      </div>

      {/* Web products */}
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        {webProjects.map((p, i) => (
          <div key={p.name} data-reveal style={{ "--d": `${i * 120}ms` } as React.CSSProperties}>
            <SpotlightCard className="h-full rounded-[2rem] p-5 sm:p-6 md:p-8">
              <div className="grid grid-cols-1 items-center gap-6 min-[440px]:grid-cols-[7.5rem_minmax(0,1fr)] sm:grid-cols-[9.5rem_minmax(0,1fr)]">
                <Tilt max={10} className="mx-auto w-36 min-[440px]:w-auto">
                  <div className="overflow-hidden rounded-[1.4rem] border-[5px] border-[#1d1a2b] bg-black shadow-[0_30px_60px_-25px_rgb(139_92_246/0.7)]">
                    <Image src={p.image.src} alt={p.image.alt} width={p.image.width} height={p.image.height} sizes="9.5rem" className="h-auto w-full" />
                  </div>
                </Tilt>
                <div>
                  <p className="inline-flex items-center gap-2 font-mono text-xs text-muted">
                    <span aria-hidden="true" className={p.status === "Live" ? "live-dot" : "inline-block size-2 rounded-full bg-amber"} />
                    {p.status}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight">{p.name}</h3>
                  <p className="mt-2 text-sm text-pretty text-muted">{p.description}</p>
                  <div className="mt-4">
                    <Stack items={p.stack} />
                  </div>
                  <a
                    href={p.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline decoration-white/25 underline-offset-4 hover:decoration-white"
                  >
                    {p.link.label}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </SpotlightCard>
          </div>
        ))}
      </div>

      <p data-reveal className="mt-12 text-center">
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="glass inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold hover:border-white/25"
        >
          See all my repositories on GitHub
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </p>
    </section>
  )
}
