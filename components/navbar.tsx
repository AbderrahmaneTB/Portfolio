"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Copy, Menu, X } from "lucide-react"
import { socials } from "@/lib/data"

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
]

const EMAIL = socials.email

export function Navbar() {
  const [copied, setCopied] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <motion.nav
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      {/* ── Desktop nav ── */}
      <div className="hidden items-center gap-1 rounded-full border border-border bg-card/70 p-1.5 shadow-lg backdrop-blur-xl sm:flex">
        <ul className="flex items-center">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          onClick={copyEmail}
          className="flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary/70"
        >
          {copied ? (
            <Check className="size-3.5 text-green-500" />
          ) : (
            <Copy className="size-3.5" />
          )}
          {copied ? "Copied!" : "Copy email"}
        </button>
      </div>

      {/* ── Mobile nav ── */}
      <div className="flex w-full flex-col items-end sm:hidden">
        {/* Pill toggle button */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          className="flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2.5 text-sm font-medium text-foreground shadow-lg backdrop-blur-xl"
        >
          {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          Menu
        </button>

        {/* Dropdown panel */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2 w-48 overflow-hidden rounded-2xl border border-border bg-card/90 shadow-xl backdrop-blur-xl"
            >
              <ul className="flex flex-col p-1.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      className="block rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="border-t border-border p-1.5">
                <button
                  onClick={() => { copyEmail(); closeMenu() }}
                  className="flex w-full items-center gap-2 rounded-xl bg-secondary px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary/70"
                >
                  {copied ? (
                    <Check className="size-3.5 text-green-500" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                  {copied ? "Copied!" : "Copy email"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}