"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Copy } from "lucide-react"
import { site } from "@/lib/data"
import { cn } from "@/lib/utils"

export function CopyEmailButton({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    [],
  )

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked: fall back to the mail app.
      window.location.href = `mailto:${site.email}`
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-white/25",
        className,
      )}
    >
      {copied ? (
        <Check className="size-4 text-live" aria-hidden="true" />
      ) : (
        <Copy className="size-4 text-violet-soft" aria-hidden="true" />
      )}
      <span aria-live="polite">{copied ? "Email copied" : "Copy email"}</span>
    </button>
  )
}
