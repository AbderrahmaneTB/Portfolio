import { ArrowUpRight } from "lucide-react"
import { CopyEmailButton } from "@/components/copy-email-button"
import { ProfileIcon } from "@/components/icons"
import { Magnetic } from "@/components/interactive"
import { LocalTime } from "@/components/local-time"
import { PodiumMark } from "@/components/podium-mark"
import { SpectrogramField } from "@/components/spectrogram-field"
import { profiles, site } from "@/lib/data"

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden pt-28 md:pt-40">
      {/* The page ends where it began, but the signal is locked: a cleaner field, and the cursor transmits */}
      <SpectrogramField
        noise={0.4}
        locked
        className="absolute inset-0 -z-10 h-full w-full opacity-80 blur-[1px] [mask-image:radial-gradient(ellipse_72%_62%_at_74%_34%,#000_24%,transparent_74%)] max-md:[mask-image:linear-gradient(to_bottom,transparent_30%,#000_55%,transparent_85%)]"
      />

      <div className="wrap">
        <h2 id="contact-title" className="section-title max-w-4xl">
          Have a hard problem?
          <br />
          Let’s find the signal.
        </h2>
        <p className="mt-6 max-w-xl text-lg text-muted">
          Open to machine learning and full-stack internships, research collaborations and freelance projects.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Magnetic>
            {/* On the narrowest phones the address still fits one line; if it ever has to wrap, it breaks after the @ */}
            <a
              href={`mailto:${site.email}`}
              className="btn btn-signal btn-lg max-w-full wrap-anywhere max-[359px]:px-5 max-[359px]:text-[0.9375rem]"
            >
              {site.email.split("@")[0]}@<wbr />
              {site.email.split("@")[1]}
              <ArrowUpRight className="size-5" aria-hidden="true" />
            </a>
          </Magnetic>
          <CopyEmailButton variant="button" />
        </div>
        <p className="motion-only mt-5 hidden font-mono text-xs text-muted [@media(pointer:fine)]:block">
          SNR +30 dB, signal locked. Move your cursor over the field to transmit.
        </p>

        <ul className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {profiles.map((p) => (
            <li key={p.name}>
              <a href={p.href} target="_blank" rel="noopener noreferrer" className="profile-link group">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/5 text-ink">
                  <ProfileIcon name={p.name} className="size-[1.1rem]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{p.name}</span>
                  <span className="block text-sm break-words text-muted">{p.handle}</span>
                </span>
                <ArrowUpRight
                  className="size-5 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <footer className="wrap mt-24 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-line py-6 text-sm text-muted">
        <p className="flex items-center gap-3">
          <PodiumMark className="size-5" />© {new Date().getFullYear()} {site.name}
        </p>
        <p>
          Algeria, local time <LocalTime />
        </p>
        <a href="#home" className="text-link inline-flex min-h-11 items-center">
          Back to top
        </a>
      </footer>
    </section>
  )
}
