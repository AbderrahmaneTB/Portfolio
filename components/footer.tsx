"use client"

import { motion } from "framer-motion"
import { Mail } from "lucide-react"
import { SiGithub, SiKaggle } from "react-icons/si"
import { FaLinkedinIn } from "react-icons/fa"
import { socials } from "@/lib/data"
import { fadeUp, staggerContainer } from "@/lib/motion"

const links = [
  {
    name: "Email",
    label: socials.email,
    href: `mailto:${socials.email}`,
    Icon: Mail,
  },
  {
    name: "GitHub",
    label: "AbderrahmaneTB",
    href: socials.github,
    Icon: SiGithub,
  },
  {
    name: "LinkedIn",
    label: "Tayeb Boudjema Abderrahmane",
    href: socials.linkedin,
    Icon: FaLinkedinIn,
  },
  {
    name: "Kaggle",
    label: "tbabderahmane",
    href: socials.kaggle,
    Icon: SiKaggle,
  },
]

export function Footer() {
  return (
    <footer id="footer" className="border-t border-border">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-6xl px-6 py-14"
      >
        <motion.h2
          variants={fadeUp}
          className="text-center text-2xl font-semibold tracking-tight md:text-3xl"
        >
          Let&apos;s connect
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-muted-foreground"
        >
          Open to collaborations, freelance work, and interesting AI or
          full-stack projects.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {links.map(({ name, label, href, Icon }) => (
            <a
              key={name}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="group flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3.5 transition-colors hover:border-foreground/40"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-foreground">
                  {name}
                </span>
                <span className="block truncate text-xs text-muted-foreground">
                  {label}
                </span>
              </span>
            </a>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex justify-center border-t border-border pt-6 text-sm text-muted-foreground"
        >
          <p>© {new Date().getFullYear()} Abderrahmane. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </footer>
  )
}
