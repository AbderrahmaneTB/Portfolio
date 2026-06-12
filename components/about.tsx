"use client"

import { motion } from "framer-motion"
import { experiences } from "@/lib/data"
import { fadeUp, staggerContainer } from "@/lib/motion"

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="text-4xl font-semibold tracking-tight md:text-5xl"
      >
        About me
      </motion.h2>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-10 flex flex-col gap-6"
      >
        {/* intro card */}
        <motion.div
          variants={fadeUp}
          className="rounded-3xl border border-border bg-card p-7 md:p-9"
        >
          <p className="text-sm font-medium text-muted-foreground">/ About</p>
          <p className="mt-3 max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            I&apos;m a full-stack developer focused on building reliable,
            production-ready web applications and SaaS products. Alongside that,
            I&apos;m actively growing in the AI and machine learning space,
            applying it hands-on through real projects, hackathons, and ongoing
            research.
          </p>
        </motion.div>

        {/* two columns */}
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            variants={fadeUp}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 transition-colors hover:border-foreground/30"
          >
            <span className="pointer-events-none absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <h3 className="font-semibold text-foreground">My approach</h3>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              My approach lives at the intersection of full-stack development and
              AI, building clean, functional interfaces, robust backend systems,
              and intelligent data-driven features, all under one roof.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 transition-colors hover:border-foreground/30"
          >
            <span className="pointer-events-none absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <h3 className="font-semibold text-foreground">What drives me</h3>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Shipping products that actually work, whether it&apos;s a
              responsive web app, a mobile experience, or a machine learning
              pipeline. I care about clean implementation, smooth integration, and
              code that stays maintainable long after launch.
            </p>
          </motion.div>
        </div>

        {/* experience */}
        <motion.div
          variants={fadeUp}
          className="relative overflow-hidden rounded-3xl border border-border bg-card p-7 md:p-9"
        >
          <div className="pointer-events-none absolute -top-16 left-1/3 size-56 rounded-full bg-foreground/10 blur-3xl" />
          <h3 className="relative text-xl font-semibold text-foreground">
            Professional Experience
          </h3>

          <ol className="relative mt-7 space-y-8 border-l border-border pl-6">
            {experiences.map((exp) => (
              <li key={exp.title} className="relative">
                <span className="absolute -left-[1.85rem] top-1.5 size-3 rounded-full border-2 border-foreground/60 bg-background shadow-[0_0_8px_2px] shadow-foreground/20" />
                <h4 className="font-semibold text-foreground">{exp.title}</h4>
                <p className="text-sm font-medium text-muted-foreground">
                  {exp.org}
                </p>
                <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                  {exp.description}
                </p>
              </li>
            ))}
          </ol>
        </motion.div>
      </motion.div>
    </section>
  )
}
