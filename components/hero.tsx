"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import {
  SiNodedotjs,
  SiDocker,
  SiPython,
  SiReact,
  SiMongodb,
} from "react-icons/si"
import type { IconType } from "react-icons"
import { fadeUp, staggerContainer } from "@/lib/motion"

function Typewriter({ text }: { text: string }) {
  const [count, setCount] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return

    // Typing forward
    if (!deleting && count < text.length) {
      const id = setTimeout(() => setCount((c) => c + 1), 110)
      return () => clearTimeout(id)
    }

    // Pause at full word before deleting
    if (!deleting && count === text.length) {
      setPaused(true)
      const id = setTimeout(() => {
        setDeleting(true)
        setPaused(false)
      }, 1600)
      return () => clearTimeout(id)
    }

    // Deleting
    if (deleting && count > 0) {
      const id = setTimeout(() => setCount((c) => c - 1), 60)
      return () => clearTimeout(id)
    }

    // Pause at empty before retyping
    if (deleting && count === 0) {
      setPaused(true)
      const id = setTimeout(() => {
        setDeleting(false)
        setPaused(false)
      }, 800)
      return () => clearTimeout(id)
    }
  }, [count, deleting, paused, text.length])

  return (
    <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
      {text.slice(0, count)}
      <span
        className="ml-0.5 inline-block w-[3px] translate-y-1 self-center bg-muted-foreground align-middle animate-pulse"
        style={{ height: "0.85em" }}
        aria-hidden="true"
      />
    </span>
  )
}

type OrbitIcon = {
  Icon?: IconType
  src?: string
  color?: string
  angle: number
  radius: number
}

const orbitIcons: OrbitIcon[] = [
  { Icon: SiNodedotjs, color: "#5FA04E", angle: 0, radius: 168 },
  { Icon: SiDocker, color: "#2496ED", angle: 60, radius: 168 },
  { Icon: SiMongodb, color: "#47A248", angle: 120, radius: 168 },
  { Icon: SiPython, color: "#3776AB", angle: 180, radius: 168 },
  { Icon: SiReact, color: "#61DAFB", angle: 240, radius: 168 },
  { src: "/icons/tensorflow.png", angle: 300, radius: 168 },
]

export function Hero() {
  return (
    <section className="relative mx-auto flex max-w-6xl flex-col-reverse items-center gap-12 px-6 pt-32 pb-16 md:flex-row md:justify-between md:pt-44 md:pb-28">

      {/* Gray glass overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 65% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="w-full max-w-xl text-center md:text-left"
      >
        <motion.h1
          variants={fadeUp}
          className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
        >
          Hi, i&apos;m <br />
          <Typewriter text="Abderrahmane" />
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-md text-pretty text-base leading-relaxed text-muted-foreground md:mx-0 md:text-lg"
        >
          Full-stack developer and AI enthusiast, building web apps, mobile
          experiences, and intelligent solutions.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
          >
            View project
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#footer"
            className="inline-flex items-center rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/70"
          >
            Contact me
          </a>
        </motion.div>
      </motion.div>

      <OrbitGraphic />
    </section>
  )
}

function OrbitGraphic() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex size-[290px] shrink-0 items-center justify-center sm:size-[340px] md:size-[380px]"
    >
      {/* glow */}
      <div className="absolute inset-0 rounded-full bg-foreground/10 blur-3xl" />

      {/* core sphere with profile picture */}
      <div className="relative z-10 size-40 overflow-hidden rounded-full border-2 border-border shadow-2xl shadow-black/40 sm:size-44 md:size-52">
        <Image
          src="/profile.jpg"
          alt="Portrait of Abderrahmane"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 176px, 208px"
        />
      </div>

      {/* rotating ring of icons */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      >
        {orbitIcons.map(({ Icon, src, color, angle, radius }, i) => {
          const rad = (angle * Math.PI) / 180
          const x = Math.round(Math.cos(rad) * radius)
          const y = Math.round(Math.sin(rad) * radius)
          return (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 flex size-11 items-center justify-center rounded-full border border-border bg-card/90 shadow-lg backdrop-blur"
              style={{ x, y, marginLeft: -22, marginTop: -22 }}
              animate={{ rotate: -360 }}
              transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            >
              {src ? (
                <Image
                  src={src || "/placeholder.svg"}
                  alt="TensorFlow"
                  width={22}
                  height={22}
                  className="size-5 object-contain"
                />
              ) : (
                Icon && <Icon className="size-5" style={{ color }} />
              )}
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}