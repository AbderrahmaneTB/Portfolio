import type { SVGProps } from "react"

/** Brand mark: a podium in silver, gold and bronze (2nd, 1st, 3rd). */
export function PodiumMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      <rect x="1.5" y="9.5" width="6.5" height="12.5" rx="0.6" className="fill-silver" />
      <rect x="8.75" y="3" width="6.5" height="19" rx="0.6" className="fill-gold" />
      <rect x="16" y="13" width="6.5" height="9" rx="0.6" className="fill-bronze" />
    </svg>
  )
}
