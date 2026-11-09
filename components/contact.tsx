import { ArrowUpRight } from "lucide-react"
import { CopyEmailButton } from "@/components/copy-email-button"
import { ProfileIcon } from "@/components/icons"
import { Magnetic, SpotlightCard } from "@/components/interactive"
import { LocalTime } from "@/components/local-time"
import { PodiumMark } from "@/components/podium-mark"
import { profiles, site } from "@/lib/data"

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden pt-28 md:pt-36">
      <div aria-hidden="true" className="absolute inset-x-0 top-1/3 -z-10 mx-auto h-[28rem] max-w-4xl rounded-full bg-[radial-gradient(closest-side,rgb(139_92_246/0.22),transparent)] blur-2xl" />

      <div className="wrap">
        <div data-reveal>
          <p className="section-kicker">04 / Contact</p>
          <h2 id="contact-title" className="section-title mt-4 max-w-4xl">
            Have a hard problem?
            <br />
            <span className="heat-text">Let’s find the signal.</span>
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-lg text-muted">
            Open to machine learning and full-stack internships, research collaborations and freelance projects.
          </p>
        </div>

        <div data-reveal className="mt-10 flex flex-wrap items-center gap-3" style={{ "--d": "120ms" } as React.CSSProperties}>
          <Magnetic>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(100deg,#8b5cf6,#e0457b_55%,#ffb547)] max-w-full px-6 py-3.5 text-base font-semibold text-white wrap-anywhere sm:px-8 sm:py-4 sm:text-lg shadow-[0_12px_50px_-12px_rgb(224_69_123/0.8)]"
            >
              {site.email}
              <ArrowUpRight className="size-5" aria-hidden="true" />
            </a>
          </Magnetic>
          <CopyEmailButton />
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {profiles.map((p, i) => (
            <li key={p.name} data-reveal style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
              <SpotlightCard className="rounded-[1.5rem]">
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-3 p-5">
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/5 text-ink">
                      <ProfileIcon name={p.name} className="size-[1.1rem]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold">{p.name}</span>
                      <span className="block truncate text-sm text-muted">{p.handle}</span>
                    </span>
                  </span>
                  <ArrowUpRight className="size-5 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" aria-hidden="true" />
                </a>
              </SpotlightCard>
            </li>
          ))}
        </ul>
      </div>

      <footer className="wrap mt-24 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-line py-8 text-sm text-muted">
        <p className="flex items-center gap-3">
          <PodiumMark className="size-5" />© {new Date().getFullYear()} {site.name}
        </p>
        <p className="flex items-center gap-2">
          <span className="live-dot" aria-hidden="true" />
          Algeria, local time <LocalTime />
        </p>
        <a href="#home" className="underline decoration-white/20 underline-offset-4 hover:text-ink">
          Back to top
        </a>
      </footer>

      <p
        aria-hidden="true"
        className="pointer-events-none -mb-[0.18em] text-center font-display text-[17vw] leading-none font-extrabold tracking-[-0.06em] text-white/[0.035] select-none"
      >
        Abderrahmane
      </p>
    </section>
  )
}
