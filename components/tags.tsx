import { ArrowUpRight } from "lucide-react"
import type { Link } from "@/lib/data"

/** The tools a piece of work was built with. */
export function Stack({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Built with">
      {items.map((s) => (
        <li key={s} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[0.8125rem] text-muted">
          {s}
        </li>
      ))}
    </ul>
  )
}

/** Outbound links as one row of secondary buttons; the magma button stays reserved for getting in touch. */
export function LinkPills({ links }: { links: Link[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {links.map((l) => (
        <li key={l.href}>
          <a href={l.href} target="_blank" rel="noopener noreferrer" className="btn btn-quiet">
            {l.label}
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  )
}
