"use client"

import * as React from "react"
import { TrendingDown, TrendingUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { formatNumber, type NumberFormat } from "@/registry/dashboardcn/lib/format"
import { Card, CardContent } from "@/components/ui/card"
import { RadialGauge } from "@/registry/dashboardcn/ui/radial-gauge"

export interface RingKpiMetric {
  label: string
  value: number
  /** Previous value, shown as "up from" or "down from". */
  previous?: number
  /** Ring fill from 0 to 100. Defaults to value as a share of max. */
  progress?: number
  /** Upper bound used to fill the ring when progress is not given. */
  max?: number
  format?: NumberFormat
  currency?: string
  /** Suffix after the number, e.g. "ms" or "req/s". */
  unit?: string
  /** Treat a decrease as good (latency, errors). */
  invertDelta?: boolean
  /** Slot in the top-right corner, e.g. a menu button. */
  action?: React.ReactNode
}

export interface RingKpiCardProps extends React.ComponentProps<typeof Card> {
  metrics: RingKpiMetric[]
}

function formatValue(metric: RingKpiMetric, value: number) {
  const text = formatNumber(value, {
    format: metric.format,
    currency: metric.currency,
    maximumFractionDigits: metric.format ? undefined : 1,
  })
  return metric.unit ? `${text} ${metric.unit}` : text
}

/** A card with a row of KPI tiles, each with a segmented ring next to the value and a comparison to the previous value. */
function RingKpiCard({ metrics, className, ...props }: RingKpiCardProps) {
  return (
    <Card
      data-slot="ring-kpi-card"
      className={cn("overflow-hidden py-0", className)}
      {...props}
    >
      <CardContent className="px-0">
        {/* Tiles wrap to fit and stretch to fill their row; the gap shows the border color as hairline dividers. */}
        <div className="bg-border flex flex-wrap gap-px">
          {metrics.map((metric) => {
            const direction =
              metric.previous === undefined || metric.previous === metric.value
                ? "flat"
                : metric.value > metric.previous
                  ? "up"
                  : "down"
            const positive =
              direction === "flat" ? null : (direction === "up") !== Boolean(metric.invertDelta)
            const color =
              positive === false ? "var(--color-red-500)" : "var(--color-emerald-500)"
            const progress =
              metric.progress ??
              (metric.max ? (metric.value / metric.max) * 100 : 0)
            const Icon = direction === "down" ? TrendingDown : TrendingUp
            return (
              <div
                key={metric.label}
                data-slot="ring-kpi-metric"
                className="bg-card flex min-w-0 flex-[1_1_13rem] flex-col gap-4 p-5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-muted-foreground truncate text-sm">{metric.label}</span>
                  {metric.action ? <span className="shrink-0">{metric.action}</span> : null}
                </div>
                <div className="flex items-center gap-3">
                  <RadialGauge
                    value={progress}
                    sweep={360}
                    size={40}
                    thickness={4}
                    segments={14}
                    gap={7}
                    color={color}
                  />
                  <span className="truncate text-2xl font-semibold tabular-nums tracking-tight">
                    {formatValue(metric, metric.value)}
                  </span>
                </div>
                {metric.previous !== undefined ? (
                  <span
                    data-direction={direction}
                    data-positive={positive}
                    className={cn(
                      "text-muted-foreground flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs",
                      positive === true && "[&_[data-accent]]:text-emerald-600 dark:[&_[data-accent]]:text-emerald-400",
                      positive === false && "[&_[data-accent]]:text-red-600 dark:[&_[data-accent]]:text-red-400"
                    )}
                  >
                    {direction !== "flat" ? (
                      <Icon data-accent="" className="size-3.5" aria-hidden="true" />
                    ) : null}
                    {direction === "flat" ? "unchanged from" : direction === "up" ? "up from" : "down from"}{" "}
                    <span data-accent="" className="font-medium tabular-nums">
                      {formatValue(metric, metric.previous)}
                    </span>
                  </span>
                ) : null}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export { RingKpiCard }
