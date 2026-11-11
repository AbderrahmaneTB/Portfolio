import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { AutoVideo, CountUp } from "@/components/interactive"
import { LinkPills, Stack } from "@/components/tags"
import { chowkpilot, llmLab, site, webProjects } from "@/lib/data"

/** Keeps hyphenated words such as "fine-tuned" or "Qwen2.5-3B" whole, so a title never breaks at the hyphen */
function KeepHyphenated({ text }: { text: string }) {
  return text.split(/(\S*-\S*)/).map((part, i) =>
    part.includes("-") ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  )
}

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="wrap pt-28 md:pt-40">
      <h2 id="projects-title" className="section-title">
        Things I’ve built
      </h2>
      <p className="mt-6 max-w-xl text-lg text-muted">Products I’ve shipped, and models I’ve trained.</p>

      {/* ChowkPilot: the story beside the recording, then the results and the stack with its links across
          the whole card. Phones to small laptops stack it, video first. */}
      <article className="mt-14 grid grid-cols-1 gap-x-12 gap-y-9 rounded-[2rem] border border-line bg-panel/70 p-5 sm:p-7 md:p-10 xl:grid-cols-12">
        <div className="xl:col-span-5 xl:col-start-1 xl:row-start-1">
          <h3 className="subhead">{chowkpilot.name}</h3>
          <p className="mt-2 text-sm text-ink/70">
            {chowkpilot.badge} hackathon. {chowkpilot.context}
          </p>
          <p className="mt-5 max-w-[62ch] text-ink/85">{chowkpilot.description}</p>
        </div>

        {/* The recording reads like the instrument it came from: both controllers labelled over their half */}
        <figure className="order-first xl:order-none xl:col-span-7 xl:col-start-6 xl:row-start-1">
          <div className="overflow-hidden rounded-2xl border border-white/12 bg-[#05040a] shadow-[0_40px_100px_-40px_rgb(224_69_123/0.45)]">
            <div className="grid grid-cols-2 border-b border-white/10 font-mono text-xs">
              <span className="flex items-center gap-2 px-4 py-2.5 text-muted">
                <span aria-hidden="true" className="size-2 rounded-full bg-[#ff5f57]" />
                Fixed-time plan
              </span>
              <span className="flex items-center gap-2 border-l border-white/10 px-4 py-2.5 text-ink">
                <span aria-hidden="true" className="size-2 rounded-full bg-live" />
                ChowkPilot
              </span>
            </div>
            <AutoVideo
              src="/projects/chowkpilot-demo.mp4"
              poster="/projects/chowkpilot-demo-poster.webp"
              label="Recorded SUMO simulation at Hyderabad's Hitech City junction: the same peak-hour vehicles under a fixed-time plan on the left and ChowkPilot on the right, which keeps far fewer vehicles stopped."
              className="block aspect-[1100/518] w-full bg-black"
            />
          </div>
          <figcaption className="mt-3 text-sm text-muted">
            Real SUMO output at Hitech City, a junction the policy never saw in training. Stopped vehicles show in red.
          </figcaption>
        </figure>

        <dl className="grid grid-cols-1 gap-x-8 gap-y-4 border-t border-line pt-8 min-[440px]:grid-cols-3 xl:col-span-12 xl:row-start-2">
          {chowkpilot.metrics.map((m, i) => (
            <div key={m.label} className="flex items-baseline gap-4 min-[440px]:block">
              <dt className="sr-only">{m.label}</dt>
              <dd className="contents">
                <CountUp
                  to={m.value}
                  prefix="−"
                  suffix="%"
                  className={`shrink-0 font-display text-4xl font-extrabold tracking-tight tabular-nums md:text-5xl xl:text-6xl ${i === 0 ? "heat-text" : "text-ink"}`}
                />
                <span aria-hidden="true" className="block max-w-[15rem] text-sm leading-snug text-muted min-[440px]:mt-2">
                  {m.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-col gap-6 xl:col-span-12 xl:row-start-3 xl:flex-row xl:items-center xl:justify-between">
          <Stack items={chowkpilot.stack} />
          <LinkPills links={chowkpilot.links} />
        </div>
      </article>

      {/* Language models: one trained from zero beside one adapted from a 3B base. On wide screens the two
          halves share row tracks (subgrid), so their sizes, spec sheets and links line up across the card. */}
      <article aria-labelledby="llm-title" className="mt-6 rounded-[2rem] border border-line bg-panel/70 p-5 sm:p-7 md:p-10">
        <h3 id="llm-title" className="subhead">
          {llmLab.name}
        </h3>
        <p className="mt-2 max-w-[62ch] text-sm text-ink/70">{llmLab.context}</p>

        <div className="mt-8 grid grid-cols-1 divide-y divide-line lg:grid-cols-2 lg:grid-rows-[repeat(6,auto)] lg:divide-x lg:divide-y-0">
          {llmLab.projects.map((p, i) => (
            <div
              key={p.name}
              className={`lg:row-span-6 lg:grid lg:grid-rows-subgrid ${i === 0 ? "pb-10 lg:pr-10 lg:pb-0" : "pt-10 lg:pt-0 lg:pl-10"}`}
            >
              <h4 className="entry-title">
                <KeepHyphenated text={p.name} />
              </h4>
              <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-display text-5xl font-extrabold tracking-tight md:text-6xl">{p.size.value}</span>
                <span className="text-sm text-muted">{p.size.label}</span>
              </p>
              <p className="mt-5 max-w-[62ch] text-ink/85">{p.description}</p>
              <dl className="mt-6 text-sm">
                {p.specs.map((s) => (
                  <div key={s.label} className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 first:border-t">
                    <dt className="text-muted">{s.label}</dt>
                    <dd className="text-right font-mono text-ink tabular-nums">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6">
                <Stack items={p.stack} />
              </div>
              <div className="mt-6">
                <LinkPills links={p.links} />
              </div>
            </div>
          ))}
        </div>
      </article>

      {/* Web products */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {webProjects.map((p) => (
          <article key={p.name} className="h-full rounded-[2rem] border border-line bg-panel/70 p-5 sm:p-7 md:p-8">
            <div className="grid grid-cols-1 items-center gap-6 min-[440px]:grid-cols-[7.5rem_minmax(0,1fr)] sm:grid-cols-[9.5rem_minmax(0,1fr)]">
              <div className="mx-auto w-36 overflow-hidden rounded-[1.4rem] border-[5px] border-[#1d1a2b] bg-black shadow-[0_30px_60px_-25px_rgb(139_92_246/0.6)] min-[440px]:w-auto">
                <Image src={p.image.src} alt={p.image.alt} width={p.image.width} height={p.image.height} sizes="9.5rem" className="h-auto w-full" />
              </div>
              <div>
                <p className="inline-flex items-center gap-2 text-sm text-muted">
                  <span aria-hidden="true" className={p.status === "Live" ? "live-dot" : "inline-block size-2 rounded-full bg-amber"} />
                  {p.status}
                </p>
                <h3 className="subhead mt-2">{p.name}</h3>
                <p className="mt-2 text-sm text-muted">{p.description}</p>
                <div className="mt-4">
                  <Stack items={p.stack} />
                </div>
                <a href={p.link.href} target="_blank" rel="noopener noreferrer" className="btn btn-quiet mt-5">
                  {p.link.label}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-10 text-center">
        <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn btn-quiet">
          See all my repositories on GitHub
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </p>
    </section>
  )
}
