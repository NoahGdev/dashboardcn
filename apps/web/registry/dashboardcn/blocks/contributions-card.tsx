"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { formatNumber, type NumberFormat } from "@/registry/dashboardcn/lib/format"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ActivityHeatmap,
  type ActivityHeatmapProps,
} from "@/registry/dashboardcn/ui/activity-heatmap"
import { DeltaBadge } from "@/registry/dashboardcn/ui/delta-badge"
import { MetricValue } from "@/registry/dashboardcn/ui/metric-value"
import { PeriodTabs, type PeriodOption } from "@/registry/dashboardcn/ui/period-tabs"

export interface ContributionsStat {
  label: string
  /** Numbers are formatted with `format`; strings render as-is, e.g. "12h 54m". */
  value: number | string
  format?: NumberFormat
  currency?: string
  /** Suffix after the number, e.g. "days". */
  unit?: string
}

export interface ContributionsCardProps
  extends Omit<React.ComponentProps<typeof Card>, "children"> {
  title: string
  /** Headline number. Defaults to the sum of `data`. */
  value?: number
  format?: NumberFormat
  currency?: string
  /** Change vs the previous period, as a fraction. */
  delta?: number
  deltaLabel?: string
  invertDelta?: boolean
  /** Tiles between the headline and the heatmap. */
  stats?: ContributionsStat[]
  /** Label above the heatmap, e.g. "Activity". */
  heatmapLabel?: string
  /** Options for the switcher next to the heatmap label. Omit to hide it. */
  periods?: PeriodOption[]
  period?: string
  defaultPeriod?: string
  onPeriodChange?: (period: string) => void
  data: ActivityHeatmapProps["data"]
  endDate?: ActivityHeatmapProps["endDate"]
  weeks?: ActivityHeatmapProps["weeks"]
  startDate?: ActivityHeatmapProps["startDate"]
  /** Any CSS color for the heatmap. Defaults to chart-1. */
  color?: ActivityHeatmapProps["color"]
  colors?: ActivityHeatmapProps["colors"]
  scale?: ActivityHeatmapProps["scale"]
  cellSize?: ActivityHeatmapProps["cellSize"]
  gap?: ActivityHeatmapProps["gap"]
  /** Label for the value in the tooltip, e.g. "commits". */
  unit?: ActivityHeatmapProps["unit"]
  weekdayLabels?: ActivityHeatmapProps["weekdayLabels"]
  showLegend?: ActivityHeatmapProps["showLegend"]
  valueFormatter?: ActivityHeatmapProps["valueFormatter"]
  onCellClick?: ActivityHeatmapProps["onCellClick"]
  /** Slot in the top-right corner, e.g. a menu button. */
  action?: React.ReactNode
}

/** A contribution-graph card: a headline total with delta, a row of stat tiles, and a year of daily activity. */
function ContributionsCard({
  title,
  value,
  format = "number",
  currency,
  delta,
  deltaLabel,
  invertDelta,
  stats,
  heatmapLabel = "Activity",
  periods,
  period,
  defaultPeriod,
  onPeriodChange,
  data,
  endDate,
  weeks,
  startDate,
  color,
  colors,
  scale,
  cellSize = 11,
  gap = 3,
  unit = "contributions",
  weekdayLabels = "none",
  showLegend = false,
  valueFormatter,
  onCellClick,
  action,
  className,
  ...props
}: ContributionsCardProps) {
  const total = React.useMemo(
    () => value ?? data.reduce((sum, datum) => sum + datum.value, 0),
    [value, data]
  )

  return (
    <Card
      data-slot="contributions-card"
      className={cn("@container/card gap-5", className)}
      {...props}
    >
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="flex flex-wrap items-center gap-2 text-3xl font-semibold tabular-nums tracking-tight">
          <MetricValue value={total} format={format} currency={currency} />
          {delta !== undefined ? (
            <DeltaBadge delta={delta} invert={invertDelta} variant="soft" className="text-sm" />
          ) : null}
        </CardTitle>
        {deltaLabel ? <CardDescription>{deltaLabel}</CardDescription> : null}
        {action ? <CardAction>{action}</CardAction> : null}
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {stats?.length ? (
          <dl className="grid grid-cols-2 gap-2 @md/card:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex min-w-0 flex-col gap-0.5 rounded-lg border px-3 py-2.5"
              >
                <dd className="order-1 truncate text-lg font-semibold tabular-nums tracking-tight">
                  {typeof stat.value === "number"
                    ? formatNumber(stat.value, {
                        format: stat.format,
                        currency: stat.currency,
                        maximumFractionDigits: stat.format ? undefined : 1,
                      })
                    : stat.value}
                  {stat.unit ? (
                    <span className="text-muted-foreground ml-1 text-sm font-normal">
                      {stat.unit}
                    </span>
                  ) : null}
                </dd>
                <dt className="text-muted-foreground order-2 truncate text-xs">{stat.label}</dt>
              </div>
            ))}
          </dl>
        ) : null}
        <div className="flex flex-col gap-3">
          {heatmapLabel || periods?.length ? (
            <div className="flex items-center justify-between gap-3">
              {heatmapLabel ? (
                <span className="text-sm font-medium">{heatmapLabel}</span>
              ) : null}
              {periods?.length ? (
                <PeriodTabs
                  options={periods}
                  value={period}
                  defaultValue={defaultPeriod}
                  onValueChange={onPeriodChange}
                />
              ) : null}
            </div>
          ) : null}
          <ActivityHeatmap
            data={data}
            endDate={endDate}
            weeks={weeks}
            startDate={startDate}
            color={color}
            colors={colors}
            scale={scale}
            cellSize={cellSize}
            gap={gap}
            unit={unit}
            weekdayLabels={weekdayLabels}
            showLegend={showLegend}
            valueFormatter={valueFormatter}
            onCellClick={onCellClick}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export { ContributionsCard }
