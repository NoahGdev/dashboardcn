"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { type NumberFormat } from "@/registry/dashboardcn/lib/format"
import { Card, CardContent } from "@/components/ui/card"
import { TickBar } from "@/registry/dashboardcn/ui/tick-bar"
import { MetricValue } from "@/registry/dashboardcn/ui/metric-value"

export interface TickKpiMetric {
  label: string
  value: number
  /** The whole the value is measured against, shown as "of 691". */
  max: number
  format?: NumberFormat
  currency?: string
  /** Suffix after the max, e.g. "units". */
  unit?: string
  /** Any CSS color. Defaults to chart-1 through chart-5 in order. */
  color?: string
  icon?: React.ReactNode
  /** Slot in the top-right corner, e.g. a menu button. */
  action?: React.ReactNode
}

export interface TickKpiCardProps extends React.ComponentProps<typeof Card> {
  metrics: TickKpiMetric[]
  /** Number of ticks in each bar. */
  segments?: number
}

const defaultColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

/** A card with a row of KPI tiles, each with a value out of a whole and a tick bar showing how far along it is. */
function TickKpiCard({ metrics, segments = 40, className, ...props }: TickKpiCardProps) {
  return (
    <Card
      data-slot="tick-kpi-card"
      className={cn("overflow-hidden py-0", className)}
      {...props}
    >
      <CardContent className="px-0">
        {/* Tiles wrap to fit and stretch to fill their row; the gap shows the border color as hairline dividers. */}
        <div className="bg-border flex flex-wrap gap-px">
          {metrics.map((metric, index) => {
            const color = metric.color ?? defaultColors[index % defaultColors.length]
            const options = { format: metric.format, currency: metric.currency }
            return (
              <div
                key={metric.label}
                data-slot="tick-kpi-metric"
                className="bg-card flex min-w-0 flex-[1_1_14rem] flex-col gap-4 p-5"
              >
                <div className="flex items-center gap-3">
                  {metric.icon ? (
                    <span className="bg-muted/50 flex size-9 shrink-0 items-center justify-center rounded-lg border [&>svg]:size-4">
                      {metric.icon}
                    </span>
                  ) : null}
                  <span className="min-w-0 flex-1 truncate text-sm font-medium">
                    {metric.label}
                  </span>
                  {metric.action ? <span className="shrink-0">{metric.action}</span> : null}
                </div>
                <div className="flex flex-wrap items-baseline gap-x-1.5">
                  <MetricValue
                    value={metric.value}
                    {...options}
                    className="text-2xl font-semibold tracking-tight"
                  />
                  <span className="text-muted-foreground text-sm tabular-nums">
                    of{" "}
                    <MetricValue
                      value={metric.max}
                      {...options}
                      suffix={metric.unit ? ` ${metric.unit}` : undefined}
                    />
                  </span>
                </div>
                <TickBar
                  value={metric.value}
                  max={metric.max}
                  segments={segments}
                  color={color}
                  className="h-5"
                />
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export { TickKpiCard }
