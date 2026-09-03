"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  formatNumber,
  type NumberFormat,
} from "@/registry/dashboardcn/lib/format"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DeltaBadge, getDeltaDirection } from "@/registry/dashboardcn/ui/delta-badge"
import { Sparkline } from "@/registry/dashboardcn/ui/sparkline"

export interface KpiCardProps extends Omit<
  React.ComponentProps<typeof Card>,
  "children"
> {
  /** Metric name, e.g. "Revenue". */
  label: string
  /** Current value. Numbers are formatted with `format`; strings render as-is. */
  value: number | string
  /** Fractional change vs. the previous period, e.g. 0.124 for +12.4%. */
  delta?: number
  /** Context for the delta, e.g. "vs. last 30 days". */
  deltaLabel?: string
  /** Series for the sparkline. Rendered when it has two or more points. */
  trend?: number[]
  format?: NumberFormat
  /** ISO 4217 code, used when `format` is "currency". */
  currency?: string
  /** Treat a decrease as good and an increase as bad (churn, latency, errors). */
  invertDelta?: boolean
  /** Optional icon shown before the label. */
  icon?: React.ReactNode
  children?: React.ReactNode
}

function KpiCard({
  label,
  value,
  delta,
  deltaLabel,
  trend,
  format = "number",
  currency,
  invertDelta = false,
  icon,
  className,
  children,
  ...props
}: KpiCardProps) {
  const direction = getDeltaDirection(delta)
  const isPositive =
    direction === "flat" ? null : (direction === "up") !== invertDelta
  const displayValue =
    typeof value === "number" ? formatNumber(value, { format, currency }) : value
  const trendColor =
    isPositive === true
      ? "var(--color-emerald-500)"
      : isPositive === false
        ? "var(--color-red-500)"
        : "var(--primary)"

  return (
    <Card
      data-slot="kpi-card"
      data-direction={direction}
      className={cn("gap-4 py-5", className)}
      {...props}
    >
      <CardHeader className="px-5">
        <CardDescription className="flex items-center gap-1.5 [&>svg]:size-4">
          {icon}
          {label}
        </CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums tracking-tight">
          {displayValue}
        </CardTitle>
        {delta !== undefined ? (
          <CardAction>
            <DeltaBadge delta={delta} invert={invertDelta} />
          </CardAction>
        ) : null}
      </CardHeader>
      {trend && trend.length > 1 ? (
        <CardContent className="px-5">
          <Sparkline data={trend} color={trendColor} />
        </CardContent>
      ) : null}
      {deltaLabel || children ? (
        <CardContent className="text-muted-foreground flex items-center gap-2 px-5 text-xs">
          {deltaLabel ? <span>{deltaLabel}</span> : null}
          {children}
        </CardContent>
      ) : null}
    </Card>
  )
}

export { KpiCard }
