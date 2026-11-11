import Image from "next/image"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { ProfileIcon } from "@/components/icons"
import { Magnetic, Tilt } from "@/components/interactive"
import { SpectrogramField } from "@/components/spectrogram-field"
import { LetterReveal, TypedGreeting } from "@/components/text-effects"
import { competitions, profiles, site } from "@/lib/data"

const suffix = { 1: "st", 2: "nd", 3: "rd" } as const
const ledClass = { 1: "led-gold", 2: "led-silver", 3: "led-bronze" } as const

// Where each medal badge floats around the photo. Beside a centred photo (phones to tablets) and on wide
// screens they float outside it; in the two-column layout at 1024px they stay inside, clear of the text.
const badgeSpots = [
  "top-[7%] left-2 sm:-left-16 lg:left-2 xl:-left-16",
  "top-[31%] right-2 sm:-right-14 lg:right-2 xl:-right-14",
  "bottom-[31%] left-2 sm:-left-20 lg:left-2 xl:-left-20",
]

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 lg:flex lg:min-h-svh lg:flex-col"
    >
      <SpectrogramField className="absolute inset-0 -z-10 h-full w-full opacity-80 blur-[1px] [mask-image:radial-gradient(ellipse_62%_70%_at_76%_44%,#000_22%,transparent_74%)] max-lg:[mask-image:linear-gradient(to_bottom,transparent_38%,#000_62%,#000_80%,transparent)]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-bg" />

      {/* On desktop the hero owns the first screen: the content centres in it and the topics band waits below the fold */}
      <div className="wrap grid grid-cols-1 items-center gap-16 lg:my-auto lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p data-hero className="font-mono text-sm text-muted" style={{ "--d": "80ms" } as React.CSSProperties}>
            <span className="text-violet-soft">›</span> <TypedGreeting />, I’m
          </p>

          <h1
            id="hero-title"
            aria-label={site.name}
            className="mt-5 font-display text-[clamp(3rem,8.2vw,6.6rem)] leading-[0.9] font-[760] tracking-[-0.022em]"
          >
            <LetterReveal text={site.firstName} className="block" delay={280} />{" "}
            <LetterReveal text={site.lastName} className="block pb-[0.06em]" gradient delay={560} />
          </h1>

          <p data-hero className="mt-7 text-[clamp(1.25rem,2.3vw,1.75rem)] leading-snug font-medium" style={{ "--d": "260ms" } as React.CSSProperties}>
            Machine learning enthusiast and <span className="whitespace-nowrap">full-stack developer</span>
          </p>

          <p data-hero className="mt-5 max-w-[34rem] text-muted" style={{ "--d": "360ms" } as React.CSSProperties}>
            I build <strong className="font-semibold text-ink">machine learning models</strong> that hold up on hidden test
            data, and the <strong className="font-semibold text-ink">full-stack products</strong> that put them to work.
            Computer science student at <strong className="font-semibold text-ink">ESI</strong>, based in Algeria.
          </p>

          <p data-hero className="mt-8 flex items-center gap-2.5 text-[0.95rem] font-medium" style={{ "--d": "430ms" } as React.CSSProperties}>
            <span className="live-dot" aria-hidden="true" />
            <span>
              Open to machine learning and <span className="whitespace-nowrap">full-stack internships</span>
            </span>
          </p>

          <div data-hero className="mt-5 flex flex-wrap items-center gap-3" style={{ "--d": "500ms" } as React.CSSProperties}>
            <Magnetic>
              <a href={`mailto:${site.email}`} className="btn btn-signal btn-lg group">
                Email me
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#projects" className="btn btn-quiet btn-lg">
                See my work
                <ArrowDownRight className="size-4" aria-hidden="true" />
              </a>
            </Magnetic>
            <ul className="flex items-center gap-2">
              {profiles.map((p) => (
                <li key={p.name}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={p.name}
                    className="grid size-11 place-items-center rounded-full border border-white/12 bg-raised text-muted transition-colors hover:border-white/30 hover:text-ink"
                  >
                    <ProfileIcon name={p.name} className="size-[1.05rem]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div data-hero className="lg:col-span-5" style={{ "--d": "300ms" } as React.CSSProperties}>
          <Tilt className="relative mx-auto w-full max-w-[24rem] sm:max-w-[25rem]">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-panel shadow-[0_40px_120px_-40px_rgb(139_92_246/0.6)]">
              <Image
                src="/images/abderrahmane-hero.webp"
                alt="Abderrahmane Tayeb Boudjema standing with arms crossed in front of a palm-lined campus building"
                width={941}
                height={1176}
                preload
                sizes="(min-width: 1024px) 25rem, 90vw"
                className="h-auto w-full"
              />
              <div className="scanline" aria-hidden="true" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-4">
                <span className="absolute top-0 left-0 size-5 border-t-2 border-l-2 border-white/70" />
                <span className="absolute top-0 right-0 size-5 border-t-2 border-r-2 border-white/70" />
                <span className="absolute bottom-0 left-0 size-5 border-b-2 border-l-2 border-white/70" />
                <span className="absolute right-0 bottom-0 size-5 border-r-2 border-b-2 border-white/70" />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent px-6 pt-20 pb-6">
                <p className="text-sm text-white/85">Based in Algeria</p>
                <p className="font-display text-xl font-bold tracking-tight">ML × full-stack</p>
              </div>
            </div>

            {/* Only 1st and 2nd places float on the photo; the full list lives in Experience */}
            {competitions.filter((c) => c.rank < 3).map((c, i) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className={`bob-once absolute z-10 flex items-center gap-3 rounded-2xl border border-white/12 bg-[#0e0b18]/90 py-2 pr-4 pl-3 shadow-[0_18px_40px_-12px_rgb(0_0_0/0.8)] backdrop-blur-md transition-colors hover:border-white/30 ${badgeSpots[i]}`}
                style={{ animationDelay: `${1.4 + i * 0.25}s` }}
              >
                <span className={`led text-3xl ${ledClass[c.rank]}`} aria-hidden="true">
                  {c.rank}
                </span>
                <span className="leading-tight">
                  <span className="sr-only">
                    {c.rank}
                    {suffix[c.rank]} place,{" "}
                  </span>
                  <span className="block text-[0.85rem] font-semibold">{c.short}</span>
                  <span className="block text-xs text-muted">{c.teaser}</span>
                </span>
              </a>
            ))}
          </Tilt>
        </div>
      </div>

      <p className="motion-only wrap mt-14 hidden font-mono text-xs text-muted [@media(pointer:fine)]:md:block" aria-hidden="true">
        <span className="text-violet-soft">●</span> Live spectrogram in the background. Move your cursor to transmit a chirp.
      </p>
    </section>
  )
}
