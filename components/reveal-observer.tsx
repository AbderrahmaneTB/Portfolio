"use client"

import { useEffect } from "react"
import { MOTION_EVENT, motionOn } from "@/components/motion"

/**
 * Turns on scroll reveals for every element marked data-reveal.
 * Elements only start hidden once this runs and motion is on, so the page stays
 * readable without JavaScript and for people who switch animations off.
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement
    let io: IntersectionObserver | null = null

    const apply = () => {
      io?.disconnect()
      io = null
      if (!motionOn()) {
        delete root.dataset.reveal
        return
      }
      root.dataset.reveal = "on"
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            ;(entry.target as HTMLElement).dataset.shown = ""
            observer.unobserve(entry.target)
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
      )
      document.querySelectorAll("[data-reveal]:not([data-shown])").forEach((el) => observer.observe(el))
      io = observer
    }

    apply()
    window.addEventListener(MOTION_EVENT, apply)
    return () => {
      io?.disconnect()
      window.removeEventListener(MOTION_EVENT, apply)
    }
  }, [])
  return null
}
