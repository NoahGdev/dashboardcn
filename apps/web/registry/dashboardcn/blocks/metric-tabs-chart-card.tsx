"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  computeDelta,
  formatNumber,
  type NumberFormat,
} from "@/registry/dashboardcn/lib/format"
import { Card, CardContent } from "@/components/ui/card"
import { ComposedChart, type ComposedChartProps } from "@/registry/dashboardcn/ui/composed-chart"
import { DeltaBadge } from "@/registry/dashboardcn/ui/delta-badge"

export interface MetricTab {
  /** Key of this metric in each data row. */
  key: string
  label: string
  /** Key of the previous-period series in each row, drawn as a dashed line. */
  compareKey?: string
  /** Headline value. Defaults to the aggregate of the metric's series. */
  value?: number | string
  /** Fractional change. Defaults to the aggregate vs the compare series. */
  delta?: number
  /** How to roll the series up into the headline value. */
  aggregate?: "sum" | "average" | "last"
  format?: NumberFormat
  currency?: string
  fractionDigits?: number
  /** Treat a decrease as good and an increase as bad (spend, cost, churn). */
  invertDelta?: boolean
}

export interface MetricTabsChartCardProps extends React.ComponentProps<typeof Card> {
  metrics: MetricTab[]
  data: Record<string, unknown>[]
  xKey: string
  /** Controlled selected metric key. */
  selected?: string
  defaultSelected?: string
  onSelectedChange?: (key: string) => void
  /** Line color for the selected metric. */
  color?: string
  /** Line color for the previous-period series. */
  compareColor?: string
  /** Tooltip label for the previous-period series. */
  compareLabel?: string
  xFormatter?: ComposedChartProps["xFormatter"]
  chartClassName?: string
}

function aggregate(
  data: Record<string, unknown>[],
  key: string,
  mode: MetricTab["aggregate"] = "sum"
) {
  const values = data.map((row) => Number(row[key])).filter(Number.isFinite)
  if (!values.length) return 0
  if (mode === "last") return values[values.length - 1]!
  const total = values.reduce((sum, value) => sum + value, 0)
  return mode === "average" ? total / values.length : total
}

/** A card with a row of metric tabs, each with a value and delta, and a line chart of the selected metric against the previous period. */
function MetricTabsChartCard({
  metrics,
  data,
  xKey,
  selected: selectedProp,
  defaultSelected,
  onSelectedChange,
  color = "var(--chart-2)",
  compareColor = "var(--chart-1)",
  compareLabel = "Previous period",
  xFormatter,
  chartClassName,
  className,
  ...props
}: MetricTabsChartCardProps) {
  const id = React.useId()
  const [selectedState, setSelectedState] = React.useState(
    defaultSelected ?? metrics[0]?.key
  )
  const selectedKey = selectedProp ?? selectedState
  const active = metrics.find((metric) => metric.key === selectedKey) ?? metrics[0]

  const select = (key: string) => {
    setSelectedState(key)
    onSelectedChange?.(key)
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return
    event.preventDefault()
    const index = metrics.findIndex((metric) => metric.key === active?.key)
    const step = event.key === "ArrowRight" ? 1 : -1
    const next = metrics[(index + step + metrics.length) % metrics.length]
    if (!next) return
    select(next.key)
    document.getElementById(`${id}-tab-${next.key}`)?.focus()
  }

  const yFormatter = React.useCallback(
    (value: number) =>
      formatNumber(value, {
        format: active?.format,
        currency: active?.currency,
        maximumFractionDigits: active?.fractionDigits,
      }),
    [active?.format, active?.currency, active?.fractionDigits]
  )

  if (!active) return null

  return (
    <Card
      data-slot="metric-tabs-chart-card"
      className={cn("gap-0 overflow-hidden py-0", className)}
      {...props}
    >
      <div
        role="tablist"
        aria-label="Metrics"
        onKeyDown={onKeyDown}
        className="flex divide-x overflow-x-auto border-b"
      >
        {metrics.map((metric) => {
          const isSelected = metric.key === active.key
          const value =
            metric.value ??
            aggregate(data, metric.key, metric.aggregate)
          const delta =
            metric.delta ??
            (metric.compareKey
              ? computeDelta(
                  aggregate(data, metric.key, metric.aggregate),
                  aggregate(data, metric.compareKey, metric.aggregate)
                )
              : undefined)
          return (
            <button
              key={metric.key}
              id={`${id}-tab-${metric.key}`}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={`${id}-panel`}
              tabIndex={isSelected ? 0 : -1}
              data-slot="metric-tab"
              data-state={isSelected ? "active" : "inactive"}
              onClick={() => select(metric.key)}
              className={cn(
                "flex min-w-36 flex-1 flex-col gap-1.5 border-t-2 px-4 py-3 text-left outline-none transition-colors",
                "focus-visible:ring-ring/50 focus-visible:ring-2 focus-visible:ring-inset",
                isSelected
                  ? "border-t-foreground bg-card"
                  : "hover:bg-muted/50 border-t-transparent"
              )}
            >
              <span className="text-muted-foreground text-sm whitespace-nowrap">{metric.label}</span>
              <span className="flex items-center justify-between gap-3">
                <span className="text-lg font-semibold tabular-nums tracking-tight">
                  {typeof value === "number"
                    ? formatNumber(value, {
                        format: metric.format,
                        currency: metric.currency,
                        maximumFractionDigits: metric.fractionDigits,
                      })
                    : value}
                </span>
                {delta !== undefined ? (
                  <DeltaBadge
                    delta={delta}
                    invert={metric.invertDelta}
                    variant="text"
                    showIcon={false}
                  />
                ) : null}
              </span>
            </button>
          )
        })}
      </div>
      <CardContent id={`${id}-panel`} role="tabpanel" className="pt-4 pb-4">
        <ComposedChart
          data={data}
          xKey={xKey}
          series={[
            ...(active.compareKey
              ? [
                  {
                    key: active.compareKey,
                    label: compareLabel,
                    type: "line" as const,
                    color: compareColor,
                    dashed: true,
                  },
                ]
              : []),
            { key: active.key, label: active.label, type: "line" as const, color },
          ]}
          showGrid={false}
          yDomain="auto"
          xFormatter={xFormatter}
          yFormatter={yFormatter}
          className={cn("h-40", chartClassName)}
        />
      </CardContent>
    </Card>
  )
}

export { MetricTabsChartCard }
