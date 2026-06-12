"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { skills } from "@/lib/data"
import { scaleIn, staggerContainer, fadeUp } from "@/lib/motion"

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="text-center text-4xl font-semibold tracking-tight md:text-5xl"
      >
        Skills
      </motion.h2>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative mt-12 overflow-hidden rounded-3xl border border-border bg-card/40 p-8 md:p-10"
      >
        {/* ambient LED glow */}
        <div className="pointer-events-none absolute -top-20 left-1/4 size-64 rounded-full bg-foreground/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-1/4 size-64 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative grid grid-cols-4 gap-5 sm:grid-cols-6 md:grid-cols-9">
          {skills.map(({ name, Icon, src, color }) => (
            <motion.div
              key={name}
              variants={scaleIn}
              whileHover={{ y: -6, scale: 1.08 }}
              className="group flex flex-col items-center gap-2"
              title={name}
            >
              <div className="relative flex size-14 items-center justify-center rounded-full border border-border bg-secondary transition-colors group-hover:border-foreground/40">
                {/* LED ring glow on hover */}
                <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 shadow-[0_0_18px_3px] shadow-foreground/30 transition-opacity duration-300 group-hover:opacity-100" />
                {src ? (
                  <Image
                    src={src || "/placeholder.svg"}
                    alt={name}
                    width={28}
                    height={28}
                    className="size-7 object-contain"
                  />
                ) : (
                  Icon && <Icon className="size-7" style={{ color }} />
                )}
              </div>
              <span className="text-center text-[11px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                {name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
