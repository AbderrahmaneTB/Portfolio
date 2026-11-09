import Image from "next/image"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { ProfileIcon } from "@/components/icons"
import { Magnetic, Tilt } from "@/components/interactive"
import { SpectrogramField } from "@/components/spectrogram-field"
import { DecodeText, RoleRotator, TypedGreeting } from "@/components/text-effects"
import { competitions, profiles, site } from "@/lib/data"

const suffix = { 1: "st", 2: "nd", 3: "rd" } as const
const ledClass = { 1: "led-gold", 2: "led-silver", 3: "led-bronze" } as const

// Where each medal badge floats around the photo (desktop / mobile)
const badgeSpots = [
  "top-[7%] left-2 sm:-left-16",
  "top-[31%] right-2 sm:-right-14",
  "bottom-[31%] left-2 sm:-left-20",
  "bottom-[8%] right-2 sm:-right-10",
]

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <SpectrogramField className="absolute inset-0 -z-10 h-full w-full opacity-80 blur-[1px] [image-rendering:auto] [mask-image:radial-gradient(ellipse_85%_75%_at_70%_42%,#000_25%,transparent_76%)]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-bg" />

      <div className="wrap grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p data-hero className="font-mono text-sm text-muted" style={{ "--d": "80ms" } as React.CSSProperties}>
            <span className="text-violet-soft">›</span> <TypedGreeting />, I’m
          </p>

          <h1
            id="hero-title"
            aria-label={site.name}
            className="mt-5 font-display text-[clamp(3rem,8.2vw,6.6rem)] leading-[0.9] font-[760] tracking-[-0.022em]"
          >
            <DecodeText text={site.firstName} className="block" />
            <DecodeText text={site.lastName} className="heat-text block pb-[0.06em]" delay={180} />
          </h1>

          <p data-hero className="mt-7 text-[clamp(1.25rem,2.3vw,1.75rem)] leading-snug font-medium" style={{ "--d": "260ms" } as React.CSSProperties}>
            I’m a <RoleRotator />
          </p>

          <p data-hero className="mt-5 max-w-[34rem] text-pretty text-muted" style={{ "--d": "360ms" } as React.CSSProperties}>
            I build <strong className="font-semibold text-ink">machine learning models</strong> that hold up on hidden test
            data, and the <strong className="font-semibold text-ink">full-stack products</strong> that put them to work.
            Computer science student at <strong className="font-semibold text-ink">ESI</strong>.
          </p>

          <div data-hero className="mt-9 flex flex-wrap items-center gap-3" style={{ "--d": "460ms" } as React.CSSProperties}>
            <Magnetic>
              <a
                href={`mailto:${site.email}`}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[linear-gradient(100deg,#8b5cf6,#e0457b_55%,#ffb547)] px-7 py-3.5 font-semibold text-white shadow-[0_10px_40px_-10px_rgb(224_69_123/0.7)]"
              >
                Email me
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#projects" className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-ink hover:border-white/25">
                See my work
                <ArrowDownRight className="size-4" />
              </a>
            </Magnetic>
            <ul className="ml-1 flex items-center gap-2">
              {profiles.map((p) => (
                <li key={p.name}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={p.name}
                    className="glass grid size-11 place-items-center rounded-full text-muted transition-colors hover:text-ink"
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
              <div className="absolute top-6 right-6 inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 text-xs font-medium backdrop-blur-md">
                <span className="live-dot" aria-hidden="true" />
                Open to internships
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-6 pt-16 pb-6">
                <p className="font-mono text-[0.7rem] text-white/70">Based in Algeria</p>
                <p className="font-display text-xl font-bold tracking-tight">ML × full-stack</p>
              </div>
            </div>

            {/* Only 1st and 2nd places float on the photo; the full list lives in Experience */}
            {competitions.filter((c) => c.rank < 3).map((c, i) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className={`bob absolute z-10 flex items-center gap-2.5 rounded-2xl border border-white/12 bg-[#0e0b18]/85 py-2 pr-4 pl-3 shadow-[0_18px_40px_-12px_rgb(0_0_0/0.8)] backdrop-blur-md ${badgeSpots[i]}`}
                style={{ animationDelay: `${i * -1.3}s` }}
              >
                <span className={`led text-3xl ${ledClass[c.rank]}`} aria-hidden="true">
                  {c.rank}
                </span>
                <span className="leading-tight">
                  <span className="block text-[0.8rem] font-semibold">
                    {c.rank}
                    {suffix[c.rank]} · {c.short}
                  </span>
                  <span className="block text-[0.7rem] text-muted">{c.teaser}</span>
                </span>
              </a>
            ))}
          </Tilt>
        </div>
      </div>

      <p className="wrap mt-14 hidden font-mono text-xs text-dim md:block" aria-hidden="true">
        <span className="text-violet-soft">●</span> Live spectrogram in the background. Move your cursor to transmit a chirp.
      </p>
    </section>
  )
}
