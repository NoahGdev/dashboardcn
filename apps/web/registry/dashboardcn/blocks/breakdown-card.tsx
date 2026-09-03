"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { formatNumber, type NumberFormat } from "@/registry/dashboardcn/lib/format"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DeltaBadge } from "@/registry/dashboardcn/ui/delta-badge"

export interface BreakdownCardItem {
  name: string
  value: number
  /** Any CSS color for the bar. Defaults to chart-1 through chart-5 in order. */
  color?: string
}

export interface BreakdownCardProps extends React.ComponentProps<typeof Card> {
  title: string
  /** Slot in the top-right corner, e.g. a menu button. */
  action?: React.ReactNode
  items: BreakdownCardItem[]
  /** Headline total. Defaults to the sum of the items. */
  total?: number
  /** Fractional change vs the prior period, e.g. 0.15 for +15%. */
  delta?: number
  /** Treat a decrease as good. */
  invertDelta?: boolean
  format?: NumberFormat
  currency?: string
  /** Bars fill relative to this. Defaults to the total. */
  max?: number
  /** Fill the bars with diagonal stripes or a solid color. */
  pattern?: "hatched" | "solid"
}

const defaultColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

/** A total with delta and a list of contributors, each with a value and a hatched bar showing its share. */
function BreakdownCard({
  title,
  action,
  items,
  total,
  delta,
  invertDelta,
  format = "currency",
  currency = "USD",
  max,
  pattern = "hatched",
  className,
  ...props
}: BreakdownCardProps) {
  const sum = total ?? items.reduce((acc, item) => acc + item.value, 0)
  const scale = max ?? sum

  return (
    <Card data-slot="breakdown-card" className={cn("gap-5", className)} {...props}>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        {action ? <CardAction>{action}</CardAction> : null}
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-4xl font-semibold tabular-nums tracking-tight">
            {formatNumber(sum, { format, currency, maximumFractionDigits: 0 })}
          </span>
          {delta !== undefined ? (
            <DeltaBadge delta={delta} invert={invertDelta} variant="soft" className="rounded-full px-2 py-1" />
          ) : null}
        </div>
        <ul className="flex flex-col gap-6 border-t pt-5">
          {items.map((item, index) => {
            const color = item.color ?? defaultColors[index % defaultColors.length]
            const fraction = Math.min(1, Math.max(0, item.value / (scale || 1)))
            return (
              <li key={item.name} data-slot="breakdown-card-item" className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between gap-4 text-sm">
                  <span className="text-muted-foreground min-w-0 truncate">{item.name}</span>
                  <span className="shrink-0 font-semibold tabular-nums">
                    {formatNumber(item.value, { format, currency, maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div
                  role="progressbar"
                  aria-label={item.name}
                  aria-valuemin={0}
                  aria-valuemax={scale}
                  aria-valuenow={item.value}
                  className="bg-muted h-2.5 w-full overflow-hidden rounded-full"
                >
                  <div
                    data-pattern={pattern}
                    className="h-full rounded-full transition-[width]"
                    style={{
                      width: `${fraction * 100}%`,
                      backgroundColor:
                        pattern === "hatched"
                          ? `color-mix(in oklab, ${color} 35%, transparent)`
                          : color,
                      backgroundImage:
                        pattern === "hatched"
                          ? `repeating-linear-gradient(135deg, ${color} 0 2px, transparent 2px 5px)`
                          : undefined,
                    }}
                  />
                </div>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}

export { BreakdownCard }
