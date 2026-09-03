"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { type NumberFormat } from "@/registry/dashboardcn/lib/format"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DotPlot } from "@/registry/dashboardcn/ui/dot-plot"
import { MetricValue } from "@/registry/dashboardcn/ui/metric-value"

export interface DotPlotCardProps extends Omit<React.ComponentProps<typeof Card>, "children"> {
  title: string
  /** Headline value. Numbers are formatted with `format`; strings render as-is. */
  value: number | string
  format?: NumberFormat
  /** ISO 4217 code, used when `format` is "currency". */
  currency?: string
  /** One value per column of the dot plot. */
  data: number[]
  /** Label per column. The peak's label is shown in the pill, e.g. "Wed". */
  labels?: string[]
  /** Text before the peak's label in the pill, e.g. "Peak" for "Peak: Wed". */
  peakLabel?: string
  /** Absolute change vs the previous period, in the same unit as `value`, e.g. 34002 for +34,002. */
  delta?: number
  /** Context for the delta, e.g. "vs last period". */
  deltaLabel?: string
  /** Format for the delta. Defaults to `format`, except a compact value gets a full number so "+34,002" is not lost to "+34K". */
  deltaFormat?: NumberFormat
  /** Any CSS color for the dots. Defaults to chart-1. */
  color?: string
  /** Number of dots in the tallest column. */
  rows?: number
  /** Formats a column's value in the pill while it is hovered. Defaults to a plain grouped number. */
  valueFormatter?: (value: number) => string
  /** Slot in the top-right corner, e.g. a menu button. */
  action?: React.ReactNode
}

const signedFormatters = new Map<string, Intl.NumberFormat>()

/** "+34,002", "-1.2K", or "+$390" depending on the format. */
function formatSigned(value: number, format: NumberFormat, currency: string) {
  const key = `${format}:${currency}`
  let formatter = signedFormatters.get(key)
  if (!formatter) {
    formatter = new Intl.NumberFormat("en-US", {
      ...(format === "currency" ? { style: "currency", currency } : {}),
      ...(format === "percent" ? { style: "percent" } : {}),
      ...(format === "compact" ? { notation: "compact" } : {}),
      signDisplay: "exceptZero",
      maximumFractionDigits: format === "number" ? 0 : 1,
    })
    signedFormatters.set(key, formatter)
  }
  return formatter.format(value)
}

/** A metric card with a big value, a dot-plot distribution with its peak called out, and the change vs the previous period. */
function DotPlotCard({
  title,
  value,
  format = "number",
  currency = "USD",
  data,
  labels,
  peakLabel = "Peak",
  delta,
  deltaLabel = "vs last period",
  deltaFormat = format === "compact" ? "number" : format,
  color = "var(--chart-1)",
  rows = 6,
  valueFormatter = (columnValue) => columnValue.toLocaleString("en-US"),
  action,
  className,
  ...props
}: DotPlotCardProps) {
  const [active, setActive] = React.useState<number | null>(null)
  const peak = labels?.[data.indexOf(Math.max(...data))]
  // The pill doubles as the hover readout: it shows the peak by default and the hovered column's value while hovering.
  const pill =
    active !== null ? (
      <>
        {labels?.[active] !== undefined ? `${labels[active]}: ` : null}
        <span className="text-foreground font-medium">{valueFormatter(data[active] ?? 0)}</span>
      </>
    ) : peak !== undefined ? (
      <>
        {peakLabel}: <span className="text-foreground font-medium">{peak}</span>
      </>
    ) : null
  return (
    <Card data-slot="dot-plot-card" className={cn("gap-4 py-5", className)} {...props}>
      <CardHeader className="px-5">
        <CardTitle className="text-base">{title}</CardTitle>
        {action ? <CardAction>{action}</CardAction> : null}
      </CardHeader>
      <CardContent className="@container px-5">
        {/*
          Narrow: pill, then value and delta side by side, then the plot on its own row.
          From 24rem: value | plot | delta on one row with the pill centered above the plot.
        */}
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 @sm:grid-cols-[auto_minmax(0,1fr)_auto]">
          {pill !== null ? (
            <span className="bg-muted text-muted-foreground col-span-2 justify-self-center rounded-full px-3 py-1.5 text-xs whitespace-nowrap @sm:col-span-1 @sm:col-start-2">
              {pill}
            </span>
          ) : null}
          <MetricValue
            value={value}
            format={format}
            currency={currency}
            className="col-start-1 row-start-2 text-4xl font-semibold tracking-tight"
          />
          <DotPlot
            data={data}
            labels={labels}
            rows={rows}
            color={color}
            showTooltip={false}
            onActiveIndexChange={setActive}
            className="col-span-2 row-start-3 @sm:col-span-1 @sm:col-start-2 @sm:row-start-2"
          />
          {delta !== undefined ? (
            <div className="col-start-2 row-start-2 flex flex-col items-end @sm:col-start-3">
              <span className="text-muted-foreground text-xs">{deltaLabel}</span>
              <span className="text-xl font-semibold tabular-nums tracking-tight">
                {formatSigned(delta, deltaFormat, currency)}
              </span>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}

export { DotPlotCard }
