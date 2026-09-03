"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  computeDelta,
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
import { BarChart, type BarChartProps, type BarRow } from "@/registry/dashboardcn/ui/bar-chart"
import { DeltaBadge } from "@/registry/dashboardcn/ui/delta-badge"
import { PeriodTabs } from "@/registry/dashboardcn/ui/period-tabs"

export interface RangeOption {
  value: string
  label: string
  /** How many trailing rows of data this range shows. */
  points: number
}

export interface PeriodBarChartCardProps extends React.ComponentProps<typeof Card> {
  title: string
  data: BarRow[]
  xKey: string
  yKey: string
  /** Key that groups bars into selectable periods, e.g. "month" for weekly rows. Defaults to xKey. */
  groupKey?: string
  /** Range options for the switcher. Omit to show every row and hide the switcher. */
  ranges?: RangeOption[]
  defaultRange?: string
  /** Group value drawn in color. Defaults to the last group in view. */
  selected?: string
  defaultSelected?: string
  onSelectedChange?: (group: string) => void
  /** Words after the period in the subtitle, e.g. "spending" renders "March spending". */
  valueLabel?: string
  format?: NumberFormat
  currency?: string
  variant?: BarChartProps["variant"]
  color?: string
  mutedColor?: string
  grid?: BarChartProps["grid"]
  xFormatter?: BarChartProps["xFormatter"]
  tooltipLabel?: BarChartProps["tooltipLabel"]
  chartClassName?: string
}

function sum(rows: BarRow[], key: string) {
  return rows.reduce((total, row) => total + (Number(row[key]) || 0), 0)
}

/** A card with a total for the selected period, a range switcher, and a bar chart. Click a bar to select its period. */
function PeriodBarChartCard({
  title,
  data,
  xKey,
  yKey,
  groupKey = xKey,
  ranges,
  defaultRange,
  selected: selectedProp,
  defaultSelected,
  onSelectedChange,
  valueLabel,
  format = "currency",
  currency,
  variant,
  color,
  mutedColor,
  grid,
  xFormatter,
  tooltipLabel,
  chartClassName,
  className,
  ...props
}: PeriodBarChartCardProps) {
  const [range, setRange] = React.useState(defaultRange ?? ranges?.[0]?.value)
  const points = ranges?.find((option) => option.value === range)?.points
  const rows = React.useMemo(
    () => (points ? data.slice(Math.max(0, data.length - points)) : data),
    [data, points]
  )

  const groups = React.useMemo(() => {
    const order: string[] = []
    for (const row of rows) {
      const group = String(row[groupKey])
      if (order[order.length - 1] !== group) order.push(group)
    }
    return order
  }, [rows, groupKey])

  const [selectedState, setSelectedState] = React.useState(defaultSelected)
  const selected =
    selectedProp ?? (selectedState && groups.includes(selectedState) ? selectedState : groups.at(-1))
  const setSelected = (group: string) => {
    setSelectedState(group)
    onSelectedChange?.(group)
  }

  const selectedRows = rows.filter((row) => String(row[groupKey]) === selected)
  const previousGroup = groups[groups.indexOf(selected ?? "") - 1]
  const previousRows = previousGroup
    ? rows.filter((row) => String(row[groupKey]) === previousGroup)
    : []
  const total = sum(selectedRows, yKey)
  const delta = previousRows.length ? computeDelta(total, sum(previousRows, yKey)) : undefined

  const yFormatter = React.useCallback(
    (value: number) => formatNumber(value, { format, currency }),
    [format, currency]
  )

  return (
    <Card data-slot="period-bar-chart-card" className={cn("gap-4", className)} {...props}>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-3xl font-semibold tabular-nums tracking-tight">
          {yFormatter(total)}
        </CardTitle>
        <div className="flex items-center gap-1.5 text-sm">
          {delta !== undefined ? <DeltaBadge delta={delta} variant="text" /> : null}
          <span className="text-muted-foreground">
            {selected}
            {valueLabel ? ` ${valueLabel}` : null}
            {previousGroup ? ` vs ${previousGroup}` : null}
          </span>
        </div>
        {ranges?.length ? (
          <CardAction>
            <PeriodTabs options={ranges} value={range} onValueChange={setRange} />
          </CardAction>
        ) : null}
      </CardHeader>
      <CardContent>
        <BarChart
          data={rows}
          xKey={xKey}
          yKey={yKey}
          groupKey={groupKey === xKey ? undefined : groupKey}
          variant={variant}
          color={color}
          mutedColor={mutedColor}
          grid={grid}
          highlight={(row) => String(row[groupKey]) === selected}
          yFormatter={yFormatter}
          xFormatter={xFormatter}
          tooltipLabel={tooltipLabel}
          onBarClick={(row) => setSelected(String(row[groupKey]))}
          className={cn("h-56", chartClassName)}
        />
      </CardContent>
    </Card>
  )
}

export { PeriodBarChartCard }
