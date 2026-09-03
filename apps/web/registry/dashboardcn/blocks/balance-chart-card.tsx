"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { formatNumber, type NumberFormat } from "@/registry/dashboardcn/lib/format"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ComposedChart, type ReferenceLineSpec } from "@/registry/dashboardcn/ui/composed-chart"
import { DeltaBadge } from "@/registry/dashboardcn/ui/delta-badge"

export interface BalanceStat {
  label: string
  value: number | string
  delta?: number
  format?: NumberFormat
  /** Any CSS color for the value, e.g. emerald for a high. */
  color?: string
}

export interface BalanceChartCardProps extends React.ComponentProps<typeof Card> {
  title: string
  value: number
  delta?: number
  deltaLabel?: string
  format?: NumberFormat
  currency?: string
  stats?: BalanceStat[]
  data: Record<string, unknown>[]
  xKey: string
  yKey: string
  seriesLabel?: string
  /** Horizontal reference, e.g. previous close. */
  referenceValue?: number
  referenceLabel?: string
  /** Mark the highest point. */
  highlightMax?: boolean
  chartClassName?: string
}

/** A balance or price card with a big value, stat row, and line chart. */
function BalanceChartCard({
  title,
  value,
  delta,
  deltaLabel,
  format = "currency",
  currency,
  stats = [],
  data,
  xKey,
  yKey,
  seriesLabel = "Balance",
  referenceValue,
  referenceLabel,
  highlightMax = true,
  chartClassName,
  className,
  ...props
}: BalanceChartCardProps) {
  const yFormatter = React.useCallback(
    (v: number) => formatNumber(v, { format, currency, maximumFractionDigits: 0 }),
    [format, currency]
  )
  const referenceLines: ReferenceLineSpec[] =
    referenceValue !== undefined
      ? [{ y: referenceValue, label: referenceLabel, dashed: true }]
      : []

  return (
    <Card data-slot="balance-chart-card" className={cn("gap-4", className)} {...props}>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-3xl font-semibold tabular-nums tracking-tight">
          {formatNumber(value, { format, currency })}
          {delta !== undefined ? (
            <span className="flex items-center gap-1.5 text-sm font-normal">
              <DeltaBadge delta={delta} variant="text" />
              {deltaLabel ? (
                <span className="text-muted-foreground">{deltaLabel}</span>
              ) : null}
            </span>
          ) : null}
        </CardTitle>
      </CardHeader>
      {stats.length ? (
        <CardContent className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-1.5">
              <span className="text-muted-foreground">{stat.label}</span>
              <span className="font-medium tabular-nums" style={{ color: stat.color }}>
                {typeof stat.value === "number"
                  ? formatNumber(stat.value, { format: stat.format ?? format, currency })
                  : stat.value}
              </span>
              {stat.delta !== undefined ? (
                <DeltaBadge delta={stat.delta} variant="text" showIcon={false} />
              ) : null}
            </div>
          ))}
        </CardContent>
      ) : null}
      <CardContent>
        <ComposedChart
          data={data}
          xKey={xKey}
          series={[{ key: yKey, label: seriesLabel, type: "line", highlightMax }]}
          referenceLines={referenceLines}
          yFormatter={yFormatter}
          yDomain="auto"
          showYAxis
          className={cn("h-56", chartClassName)}
        />
      </CardContent>
    </Card>
  )
}

export { BalanceChartCard }
