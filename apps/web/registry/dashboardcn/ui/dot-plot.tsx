import * as React from "react"

import { cn } from "@/lib/utils"

export interface DotPlotProps extends React.ComponentProps<"div"> {
  /** One value per column, in order. */
  data: number[]
  /** Optional label per column, used for the tooltip and the accessible name. */
  labels?: string[]
  /** The value that fills a column. Defaults to the largest value in `data`. */
  max?: number
  /** Number of dots in a full column. */
  rows?: number
  /** Any CSS color. Defaults to chart-1. */
  color?: string
  /**
   * Columns at or above this fraction of `max` are drawn at full strength and the
   * rest are faded, so the peak stands out. Set to 0 to draw every column at full strength.
   */
  emphasis?: number
  /** Opacity of the faded columns. */
  fadedOpacity?: number
}

/** A distribution drawn as columns of stacked dots, with the peak columns at full strength. */
function DotPlot({
  data,
  labels,
  max,
  rows = 6,
  color = "var(--chart-1)",
  emphasis = 0.5,
  fadedOpacity = 0.35,
  className,
  ...props
}: DotPlotProps) {
  const top = max ?? Math.max(0, ...data)
  const peak = data.indexOf(Math.max(...data))
  const peakLabel = labels?.[peak]

  return (
    <div
      data-slot="dot-plot"
      role="img"
      aria-label={
        peakLabel !== undefined
          ? `Distribution across ${data.length} points, peaking at ${peakLabel}`
          : `Distribution across ${data.length} points`
      }
      className={cn(
        // Dot size is a variable so it can be tuned from className, e.g. "[--dot-size:0.75rem]".
        "flex w-full items-end justify-center gap-1 [--dot-size:0.625rem]",
        className
      )}
      {...props}
    >
      {data.map((value, index) => {
        const fraction = Math.min(1, Math.max(0, value / (top || 1)))
        // Any non-zero value shows at least one dot so small values still register.
        const count = fraction === 0 ? 0 : Math.max(1, Math.round(fraction * rows))
        const strong = emphasis <= 0 || fraction >= emphasis
        const label = labels?.[index]
        return (
          <div
            key={index}
            data-slot="dot-plot-column"
            data-emphasis={strong}
            title={label !== undefined ? `${label}: ${value}` : String(value)}
            // Columns share the width equally and cap at the dot size, so dots shrink in narrow cards instead of overflowing.
            className="flex min-w-0 flex-1 flex-col-reverse gap-1 max-w-(--dot-size)"
          >
            {Array.from({ length: count }, (_, dot) => (
              <span
                key={dot}
                className="aspect-square w-full rounded-full transition-opacity"
                style={{ backgroundColor: color, opacity: strong ? 1 : fadedOpacity }}
              />
            ))}
          </div>
        )
      })}
    </div>
  )
}

export { DotPlot }
