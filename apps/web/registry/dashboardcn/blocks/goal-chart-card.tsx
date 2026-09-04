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
import { BarChart, type BarChartProps, type BarRow } from "@/registry/dashboardcn/ui/bar-chart"
import { DeltaBadge } from "@/registry/dashboardcn/ui/delta-badge"
import { MetricValue } from "@/registry/dashboardcn/ui/metric-value"
import { PeriodTabs, type PeriodOption } from "@/registry/dashboardcn/ui/period-tabs"

export interface GoalChartCardProps extends React.ComponentProps<typeof Card> {
  title: string
  /** Headline number. Defaults to the sum of the rows. */
  value?: number
  format?: NumberFormat
  currency?: string
  /** Caption after the value, e.g. "total steps". */
  unit?: string
  /** Period text, e.g. "This week". Shown in the top-right corner unless periods is set. */
  caption?: string
  data: BarRow[]
  /** Key of the x-axis value in each row. */
  xKey: string
  /** Key of the bar value in each row. */
  yKey: string
  /** Target drawn as a dashed line. Bars at or above it are drawn in color. */
  goal: number
  goalLabel?: string
  /** Any CSS color for bars that reach the goal. Defaults to chart-1. */
  color?: string
  /** Any CSS color for bars below the goal. Defaults to the muted foreground. */
  mutedColor?: string
  variant?: BarChartProps["variant"]
  grid?: BarChartProps["grid"]
  xFormatter?: BarChartProps["xFormatter"]
  yFormatter?: BarChartProps["yFormatter"]
  chartClassName?: string
  /** Fractional change vs the prior period, e.g. 0.052 for +5.2%. */
  delta?: number
  /** Text after the delta, e.g. "vs last week". */
  deltaLabel?: string
  /** Treat a decrease as good. */
  invertDelta?: boolean
  /** Period options for the switcher. Omit to hide it. */
  periods?: PeriodOption[]
  period?: string
  defaultPeriod?: string
  onPeriodChange?: (period: string) => void
}

function sum(rows: BarRow[], key: string) {
  return rows.reduce((total, row) => total + (Number(row[key]) || 0), 0)
}

/** A card with a total, a period switcher, and a bar chart with a dashed goal line that colors the bars reaching it. */
function GoalChartCard({
  title,
  value,
  format = "number",
  currency,
  unit,
  caption,
  data,
  xKey,
  yKey,
  goal,
  goalLabel = "Goal",
  color,
  mutedColor,
  variant = "solid",
  grid = "none",
  xFormatter,
  yFormatter: yFormatterProp,
  chartClassName,
  delta,
  deltaLabel,
  invertDelta,
  periods,
  period,
  defaultPeriod,
  onPeriodChange,
  className,
  ...props
}: GoalChartCardProps) {
  const total = value ?? sum(data, yKey)
  const yFormatter = React.useCallback(
    (v: number) => formatNumber(v, { format, currency }),
    [format, currency]
  )
  const highlight = React.useCallback(
    (row: BarRow) => Number(row[yKey]) >= goal,
    [yKey, goal]
  )
  const showCaptionInline = Boolean(caption && periods)

  return (
    <Card data-slot="goal-chart-card" className={cn("gap-4", className)} {...props}>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-3xl font-semibold tabular-nums tracking-tight">
          <MetricValue value={total} format={format} currency={currency} />
          {unit ? (
            <span className="text-muted-foreground text-sm font-normal">{unit}</span>
          ) : null}
        </CardTitle>
        {delta !== undefined || showCaptionInline ? (
          <div className="flex flex-wrap items-center gap-1.5 text-sm">
            {delta !== undefined ? (
              <DeltaBadge delta={delta} invert={invertDelta} variant="text" />
            ) : null}
            {deltaLabel || showCaptionInline ? (
              <span className="text-muted-foreground">
                {[deltaLabel, showCaptionInline ? caption : undefined]
                  .filter(Boolean)
                  .join(" · ")}
              </span>
            ) : null}
          </div>
        ) : null}
        {periods ? (
          <CardAction>
            <PeriodTabs
              options={periods}
              value={period}
              defaultValue={defaultPeriod ?? periods[0]?.value}
              onValueChange={onPeriodChange}
            />
          </CardAction>
        ) : caption ? (
          <CardAction>
            <span className="text-muted-foreground text-sm tabular-nums">{caption}</span>
          </CardAction>
        ) : null}
      </CardHeader>
      <CardContent>
        <BarChart
          data={data}
          xKey={xKey}
          yKey={yKey}
          variant={variant}
          color={color}
          mutedColor={mutedColor}
          grid={grid}
          highlight={highlight}
          referenceLines={[{ y: goal, label: goalLabel, dashed: true }]}
          xFormatter={xFormatter}
          yFormatter={yFormatterProp ?? yFormatter}
          className={cn("h-56", chartClassName)}
        />
      </CardContent>
    </Card>
  )
}

export { GoalChartCard }
