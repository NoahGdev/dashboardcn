"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { type NumberFormat } from "@/registry/dashboardcn/lib/format"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DeltaBadge } from "@/registry/dashboardcn/ui/delta-badge"
import {
  HeatmapChart,
  type HeatmapCell,
  type HeatmapChartProps,
} from "@/registry/dashboardcn/ui/heatmap-chart"
import { MetricValue } from "@/registry/dashboardcn/ui/metric-value"
import { PeriodTabs, type PeriodOption } from "@/registry/dashboardcn/ui/period-tabs"

export interface HeatmapChartCardProps
  extends Omit<React.ComponentProps<typeof Card>, "children">,
    Pick<
      HeatmapChartProps,
      "rows" | "columns" | "color" | "max" | "scale" | "unit" | "valueFormatter"
    > {
  title: string
  /** Headline value. Defaults to the sum of every cell. Strings render as-is. */
  value?: number | string
  /** Fractional change, e.g. 0.052 for +5.2%. */
  delta?: number
  /** Context under the headline, e.g. "vs previous 7 days". */
  deltaLabel?: string
  /** Treat a decrease as good (churn, latency, errors). */
  invertDelta?: boolean
  format?: NumberFormat
  currency?: string
  /** Period options for the switcher. Omit to hide it. */
  periods?: PeriodOption[]
  period?: string
  defaultPeriod?: string
  onPeriodChange?: (period: string) => void
  chartClassName?: string
}

/**
 * A card with a headline total, a delta, an optional period switcher, and a matrix heatmap.
 * Hovering a cell swaps the headline to that cell's value and names the cell under it.
 */
function HeatmapChartCard({
  title,
  value,
  delta,
  deltaLabel,
  invertDelta,
  format,
  currency,
  unit,
  valueFormatter,
  rows,
  columns,
  color,
  max,
  scale,
  periods,
  period,
  defaultPeriod,
  onPeriodChange,
  chartClassName,
  className,
  ...props
}: HeatmapChartCardProps) {
  const [active, setActive] = React.useState<HeatmapCell | null>(null)

  const total = React.useMemo(
    () =>
      rows.reduce(
        (sum, row) => row.values.reduce((s, v) => s + (Number(v) || 0), sum),
        0
      ),
    [rows]
  )

  const hoveredRow = active ? rows[active.row] : undefined
  const hovered =
    active && hoveredRow
      ? {
          value: hoveredRow.values[active.column] ?? 0,
          label: `${hoveredRow.label} · ${columns[active.column] ?? ""}`,
        }
      : null

  return (
    <Card data-slot="heatmap-chart-card" className={cn("gap-4", className)} {...props}>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="flex items-baseline gap-2 text-3xl font-semibold tabular-nums tracking-tight">
          <MetricValue
            value={hovered ? hovered.value : (value ?? total)}
            format={format}
            currency={currency}
          />
          {delta !== undefined && !hovered ? (
            <DeltaBadge delta={delta} invert={invertDelta} />
          ) : null}
        </CardTitle>
        {/* Reserved even when empty so the caption does not shift the chart while hovering. */}
        <div
          data-slot="heatmap-chart-card-caption"
          className="text-muted-foreground min-h-5 text-sm"
        >
          {hovered ? hovered.label : deltaLabel}
        </div>
        {periods?.length ? (
          <CardAction>
            <PeriodTabs
              options={periods}
              value={period}
              defaultValue={defaultPeriod ?? periods[0]?.value}
              onValueChange={onPeriodChange}
            />
          </CardAction>
        ) : null}
      </CardHeader>
      <CardContent>
        <HeatmapChart
          rows={rows}
          columns={columns}
          color={color}
          max={max}
          scale={scale}
          unit={unit}
          valueFormatter={valueFormatter}
          activeCell={active}
          onActiveCellChange={setActive}
          className={chartClassName}
        />
      </CardContent>
    </Card>
  )
}

export { HeatmapChartCard }
