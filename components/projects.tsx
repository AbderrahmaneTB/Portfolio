"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight, Sparkles } from "lucide-react"
import { SiGithub } from "react-icons/si"
import { projects } from "@/lib/data"
import { fadeUp, staggerContainer } from "@/lib/motion"

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="text-4xl font-semibold tracking-tight md:text-5xl"
      >
        Projects
      </motion.h2>

      <div className="mt-12 flex flex-col gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="mt-12 flex justify-center"
      >
        <a
          href="https://github.com/AbderrahmaneTB"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-foreground/40"
        >
          <SiGithub className="size-5" />
          Explore all my projects on GitHub
          <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </motion.div>
    </section>
  )
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const isCompleted = project.status === "Completed"

  return (
    <motion.article
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -4 }}
      className="group relative grid gap-6 overflow-hidden rounded-3xl border border-border bg-card p-5 transition-colors hover:border-foreground/30 md:grid-cols-2 md:p-6"
    >
      {/* LED top light */}
      <span className="pointer-events-none absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-foreground/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <motion.div
        variants={fadeUp}
        className={`relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-secondary/40 ${
          project.reverse ? "md:order-2" : ""
        }`}
      >
        <Image
          src={project.image || "/placeholder.svg"}
          alt={`${project.name} project preview`}
          fill
          className={
            project.reverse
              ? "object-contain p-3"
              : "object-cover transition-transform duration-500 group-hover:scale-105"
          }
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </motion.div>

      <motion.div
        variants={fadeUp}
        className={`flex flex-col justify-center ${
          project.reverse ? "md:order-1" : ""
        }`}
      >
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-semibold">{project.name}</h3>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground">
            <span
              className={`size-1.5 rounded-full shadow-[0_0_6px_1px] ${
                isCompleted
                  ? "bg-success shadow-success/70"
                  : "bg-warning shadow-warning/70"
              }`}
            />
            {project.status}
          </span>
        </div>

        <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <p className="mt-4 text-sm">
          <span className="font-semibold text-foreground">Built With: </span>
          <span className="text-muted-foreground">{project.builtWith}</span>
        </p>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-muted-foreground"
        >
          View Project
          <Sparkles className="size-4 text-accent" />
        </a>
      </motion.div>
    </motion.article>
  )
}
