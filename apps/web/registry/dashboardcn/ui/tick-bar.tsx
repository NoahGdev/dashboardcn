import * as React from "react"

import { cn } from "@/lib/utils"

export interface TickBarProps extends React.ComponentProps<"div"> {
  /** Current value, from 0 to max. */
  value: number
  max?: number
  /** Number of ticks. */
  segments?: number
  /** Any CSS color for the filled ticks. Defaults to chart-1. */
  color?: string
  /** Any CSS color for the unfilled ticks. Defaults to muted. */
  trackColor?: string
  /** "tick" draws thin bars; "pill" draws wide rounded ones. */
  shape?: "tick" | "pill"
}

/** A progress bar drawn as a row of ticks, lit up to the current value. */
function TickBar({
  value,
  max = 100,
  segments = 40,
  color = "var(--chart-1)",
  trackColor,
  shape = "tick",
  className,
  ...props
}: TickBarProps) {
  const fraction = Math.min(1, Math.max(0, value / (max || 1)))
  // Any non-zero value lights at least one tick so small values still register.
  const filled = fraction === 0 ? 0 : Math.max(1, Math.round(fraction * segments))

  return (
    <div
      data-slot="tick-bar"
      data-shape={shape}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      className={cn(
        "flex w-full",
        shape === "tick" ? "h-6 gap-[3px]" : "h-4 gap-1.5",
        className
      )}
      {...props}
    >
      {Array.from({ length: segments }, (_, index) => {
        const lit = index < filled
        return (
          <span
            key={index}
            data-filled={lit}
            className={cn(
              "bg-muted h-full min-w-0 flex-1 transition-colors",
              shape === "tick" ? "rounded-[1.5px]" : "rounded-full"
            )}
            style={{ backgroundColor: lit ? color : trackColor }}
          />
        )
      })}
    </div>
  )
}

export { TickBar }
