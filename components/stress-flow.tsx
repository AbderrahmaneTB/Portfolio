import { CountUp } from "@/components/interactive"

const STEPS = [
  { name: "7 risk factors", detail: "balance and income drops, withdrawals, spending, volatility, inactivity" },
  { name: "Structural probit", detail: "formula" },
  { name: "LightGBM", detail: "learns only the residual from logit(P₀), 5 settings × 50 seeds" },
  { name: "Calibration", detail: "each month’s mean set to the 15% stress rate" },
]

/** The Zindi solution as a pipeline, with data flowing between the stages. */
export function StressFlow() {
  return (
    <figure className="rounded-2xl border border-white/10 bg-black/40 p-4 sm:p-6">
      <ol className="relative">
        {STEPS.map((s, i) => (
          <li key={s.name} className="relative grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-4 pb-6 last:pb-0">
            {i < STEPS.length - 1 && (
              <span aria-hidden="true" className="flow-line absolute top-10 bottom-1 left-[1.0625rem] w-0.5 rounded-full" />
            )}
            <span
              aria-hidden="true"
              className="relative grid size-9 place-items-center rounded-full border border-white/15 bg-raised font-mono text-xs text-violet-soft"
            >
              {i + 1}
            </span>
            <div className="pt-1.5">
              <p className="font-semibold">{s.name}</p>
              {s.detail === "formula" ? (
                <p className="mt-1 font-serif text-[0.95rem] whitespace-nowrap text-ink sm:text-lg">
                  <i>P</i>
                  <sub className="text-[0.7em]">0</sub> = Φ(<i>c</i> + <i>S</i> / 0.35)
                </p>
              ) : (
                <p className="mt-0.5 text-sm text-pretty text-muted">{s.detail}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
      <figcaption className="mt-6 flex flex-wrap items-end justify-between gap-x-4 gap-y-2 border-t border-white/10 pt-5">
        <span className="text-sm text-muted">Private leaderboard score</span>
        <span className="text-right">
          <CountUp to={0.7357} decimals={4} className="font-display text-3xl font-bold tabular-nums" />
          <span className="sr-only">, </span>
          <span className="led led-silver ml-3 text-2xl">
            2nd<span className="sr-only"> place</span>
          </span>
        </span>
      </figcaption>
    </figure>
  )
}
