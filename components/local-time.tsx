"use client"

import { useEffect, useState } from "react"
import { site } from "@/lib/data"

const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: site.timeZone, hour: "2-digit", minute: "2-digit" })

/** Current time in Algeria, filled in after hydration so server and client markup match. */
export function LocalTime() {
  const [now, setNow] = useState<string | null>(null)

  useEffect(() => {
    const tick = () => setNow(fmt.format(new Date()))
    tick()
    const id = window.setInterval(tick, 20_000)
    return () => window.clearInterval(id)
  }, [])

  return <time className="tabular-nums text-ink">{now ?? "--:--"}</time>
}
