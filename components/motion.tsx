"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

/*
  One switch for every animation on the site.
  The head script in app/layout.tsx sets <html data-motion="on|off"> before paint:
  a saved choice wins, otherwise it follows the system "reduce motion" setting.
  CSS reads the attribute directly; scripts use the helpers below.
*/

export const MOTION_EVENT = "motionchange"
const EVENT = MOTION_EVENT

export function motionOn() {
  return typeof document !== "undefined" && document.documentElement.dataset.motion !== "off"
}

export function setMotion(on: boolean) {
  document.documentElement.dataset.motion = on ? "on" : "off"
  try {
    localStorage.setItem("motion", on ? "on" : "off")
  } catch {}
  window.dispatchEvent(new Event(EVENT))
}

/** Current motion setting; components re-run their effects when it changes. */
export function useMotionOn() {
  const [on, setOn] = useState(true)
  useEffect(() => {
    const read = () => setOn(motionOn())
    read()
    window.addEventListener(EVENT, read)
    return () => window.removeEventListener(EVENT, read)
  }, [])
  return on
}

export function MotionToggle({ className }: { className?: string }) {
  const on = useMotionOn()
  return (
    <button
      type="button"
      onClick={() => setMotion(!on)}
      aria-pressed={on}
      title={on ? "Turn animations off" : "Turn animations on"}
      className={cn(
        "glass inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-ink transition-colors hover:border-white/25",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "relative inline-flex h-4 w-7 items-center rounded-full p-0.5 transition-colors",
          on ? "bg-[linear-gradient(90deg,#8b5cf6,#e0457b)]" : "bg-white/15",
        )}
      >
        <span className={cn("size-3 rounded-full bg-white transition-transform duration-300", on && "translate-x-3")} />
      </span>
      Motion
      <span className="sr-only">{on ? "on" : "off"}</span>
    </button>
  )
}
