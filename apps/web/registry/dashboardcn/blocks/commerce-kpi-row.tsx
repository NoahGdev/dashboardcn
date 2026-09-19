import * as React from "react"
import { TrendingDown, TrendingUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { type NumberFormat } from "@/registry/dashboardcn/lib/format"
import { CornerFrame } from "@/registry/dashboardcn/ui/corner-frame"
import { MetricValue } from "@/registry/dashboardcn/ui/metric-value"
import { Sparkline } from "@/registry/dashboardcn/ui/sparkline"

export interface CommerceKpiMetric {
  label: string
  value: number
  format?: NumberFormat
  currency?: string
  delta?: number
  deltaLabel?: string
  invertDelta?: boolean
  trend?: number[]
  icon?: React.ReactNode
}

export interface CommerceKpiRowProps extends React.ComponentProps<"div"> {
  metrics: CommerceKpiMetric[]
  cornerColor?: string
}

/** A responsive row of compact commerce metrics with sparklines and registration-mark corners. */
function CommerceKpiRow({ metrics, cornerColor, className, ...props }: CommerceKpiRowProps) {
  return (
    <div
      data-slot="commerce-kpi-row"
      className={cn("grid gap-3 sm:grid-cols-2", className)}
      {...props}
    >
      {metrics.map((metric) => {
        const positive = metric.delta === undefined
          ? null
          : (metric.delta >= 0) !== Boolean(metric.invertDelta)
        const DeltaIcon = metric.delta !== undefined && metric.delta < 0 ? TrendingDown : TrendingUp
        const accent = positive === false ? "var(--color-rose-500)" : "var(--color-emerald-500)"

        return (
          <CornerFrame
            key={metric.label}
            cornerColor={cornerColor ?? "var(--muted-foreground)"}
            className="bg-card min-w-0 p-5"
          >
            <div className="flex min-w-0 items-center gap-2">
              <span className="text-muted-foreground flex min-w-0 items-center gap-1.5 truncate text-sm [&>svg]:size-3.5">
                {metric.icon}
                {metric.label}
              </span>
            </div>
            <div className="mt-2 flex items-end justify-between gap-4">
              <div className="min-w-0">
                <MetricValue
                  value={metric.value}
                  format={metric.format}
                  currency={metric.currency}
                  className="block truncate text-3xl font-semibold tracking-tight"
                />
                {metric.delta !== undefined ? (
                  <div className="text-muted-foreground mt-2 text-xs">
                    <span className="flex items-center gap-1">
                      <DeltaIcon className="size-3.5" style={{ color: accent }} />
                      <span className="font-medium tabular-nums" style={{ color: accent }}>
                        {Math.abs(metric.delta * 100).toFixed(1)}%
                      </span>
                    </span>
                    {metric.deltaLabel ? (
                      <span className="mt-0.5 block truncate">{metric.deltaLabel}</span>
                    ) : null}
                  </div>
                ) : null}
              </div>
              {metric.trend && metric.trend.length > 1 ? (
                <Sparkline
                  data={metric.trend}
                  variant="area"
                  fill="dots"
                  color="var(--muted-foreground)"
                  className="h-12 w-20 shrink-0 opacity-60"
                />
              ) : null}
            </div>
          </CornerFrame>
        )
      })}
    </div>
  )
}

export { CommerceKpiRow }
