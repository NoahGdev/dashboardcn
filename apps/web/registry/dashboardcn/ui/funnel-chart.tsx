import * as React from "react"

import { cn } from "@/lib/utils"
import { formatNumber } from "@/registry/dashboardcn/lib/format"

export interface FunnelStep {
  name: string
  value: number
}

export interface FunnelChartProps extends React.ComponentProps<"div"> {
  steps: FunnelStep[]
  valueFormatter?: (value: number) => string
  /** Any CSS color. Defaults to chart-1. */
  color?: string
  /** Show the drop-off between consecutive steps. */
  showDropoff?: boolean
}

function FunnelChart({
  steps,
  valueFormatter = (value) => formatNumber(value),
  color = "var(--chart-1)",
  showDropoff = true,
  className,
  ...props
}: FunnelChartProps) {
  const first = steps[0]?.value ?? 0
  const last = steps[steps.length - 1]?.value ?? 0
  const overall = first > 0 ? last / first : 0

  return (
    <div
      data-slot="funnel-chart"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    >
      {steps.map((step, index) => {
        const previous = index > 0 ? steps[index - 1]!.value : step.value
        const ofFirst = first > 0 ? step.value / first : 0
        const ofPrevious = previous > 0 ? step.value / previous : 0
        const dropoff = 1 - ofPrevious

        return (
          <React.Fragment key={step.name}>
            {showDropoff && index > 0 ? (
              <div className="text-muted-foreground flex items-center gap-2 py-1 pl-3 text-xs">
                <span aria-hidden="true" className="bg-border h-3 w-px" />
                <span className="tabular-nums">
                  {formatNumber(dropoff, { format: "percent" })} drop-off
                </span>
              </div>
            ) : null}
            <div data-slot="funnel-step" className="flex flex-col gap-1.5">
              <div className="flex items-baseline justify-between gap-4 text-sm">
                <span className="flex items-center gap-2 truncate">
                  <span className="text-muted-foreground w-4 shrink-0 text-xs tabular-nums">
                    {index + 1}
                  </span>
                  <span className="truncate font-medium">{step.name}</span>
                </span>
                <span className="flex shrink-0 items-baseline gap-2 tabular-nums">
                  <span className="font-medium">{valueFormatter(step.value)}</span>
                  <span className="text-muted-foreground w-12 text-right text-xs">
                    {formatNumber(ofFirst, { format: "percent" })}
                  </span>
                </span>
              </div>
              <div className="bg-muted h-6 w-full overflow-hidden rounded-md pl-6">
                <div
                  className="h-full rounded-md transition-[width] duration-300"
                  style={{
                    width: `${ofFirst * 100}%`,
                    backgroundColor: color,
                    opacity: 1 - index * (0.5 / Math.max(steps.length - 1, 1)),
                  }}
                />
              </div>
            </div>
          </React.Fragment>
        )
      })}
      {steps.length > 1 ? (
        <div className="mt-2 flex items-center justify-between border-t pt-3 text-sm">
          <span className="text-muted-foreground">Overall conversion</span>
          <span className="font-semibold tabular-nums">
            {formatNumber(overall, { format: "percent" })}
          </span>
        </div>
      ) : null}
    </div>
  )
}

export { FunnelChart }
