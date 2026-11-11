"use client"

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { CopyEmailButton } from "@/components/copy-email-button"
import { MotionToggle } from "@/components/motion"
import { PodiumMark } from "@/components/podium-mark"
import { profiles, site } from "@/lib/data"
import { cn } from "@/lib/utils"

const LINKS = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
]

export function SiteNav() {
  const [active, setActive] = useState("home")
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 })

  // Once the page moves, a blurred band fades in behind the header so content never runs into the nav
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-[linear-gradient(90deg,#8b5cf6,#e0457b,#ffb547)]"
        style={{ scaleX: progress }}
      />
      <header data-scrolled={scrolled ? "" : undefined} className="site-header pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="wrap flex items-center justify-between gap-4 pt-4 pb-3">
          <a
            href="#home"
            aria-label="Abderrahmane Tayeb Boudjema, back to top"
            className="glass pointer-events-auto flex size-12 items-center justify-center rounded-full transition-colors hover:border-white/30"
          >
            <PodiumMark className="size-6" />
          </a>

          <nav aria-label="Primary" className="pointer-events-auto hidden md:block">
            <ul className="glass flex items-center gap-1 rounded-full p-1.5 text-sm">
              {LINKS.map((l) => (
                <li key={l.id} className="relative">
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-white/15"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <a
                    href={`#${l.id}`}
                    aria-current={active === l.id ? "true" : undefined}
                    className={cn(
                      "relative z-10 block rounded-full px-4 py-2 transition-colors",
                      active === l.id ? "text-ink" : "text-muted hover:text-ink",
                    )}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="pointer-events-auto flex items-center gap-2">
            <MotionToggle className="hidden md:inline-flex" />
            <CopyEmailButton className="hidden lg:inline-flex" />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="glass rounded-full px-5 py-3 text-sm font-medium md:hidden"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>{open && <MobileMenu active={active} onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  )
}

function MobileMenu({ active, onClose }: { active: string; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.documentElement.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.documentElement.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [onClose])

  return (
    <motion.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-[80] flex flex-col bg-bg/95 backdrop-blur-xl"
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="wrap flex items-center justify-between pt-4">
        <PodiumMark className="size-6" />
        <button ref={closeRef} type="button" onClick={onClose} className="glass rounded-full px-5 py-3 text-sm font-medium">
          Close
        </button>
      </div>
      <nav aria-label="Primary" className="wrap mt-10 flex-1">
        <ul>
          {LINKS.map((l, i) => (
            <motion.li
              key={l.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href={`#${l.id}`}
                onClick={onClose}
                aria-current={active === l.id ? "true" : undefined}
                className={cn(
                  "block border-b border-line py-4 font-display text-4xl font-bold tracking-tight",
                  active === l.id ? "text-ink" : "text-muted",
                )}
              >
                {l.label}
              </a>
            </motion.li>
          ))}
        </ul>
      </nav>
      <div className="wrap pb-10">
        <MotionToggle className="mb-6" />
        <a href={`mailto:${site.email}`} className="text-link font-mono text-sm">
          {site.email}
        </a>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {profiles.map((p) => (
            <li key={p.name}>
              <a href={p.href} target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-white/20 underline-offset-4">
                {p.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
