"use client"

import * as React from "react"
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartsRadarChart,
} from "recharts"

import { cn } from "@/lib/utils"
import { formatNumber } from "@/registry/dashboardcn/lib/format"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export interface RadarSeries {
  /** Key in each data row. */
  key: string
  label: string
  /** Any CSS color. Defaults to chart-1 through chart-5 in order. */
  color?: string
}

export interface RadarChartProps
  extends Omit<React.ComponentProps<typeof ChartContainer>, "config" | "children"> {
  data: Record<string, unknown>[]
  /** Key of the category label in each row, one per spoke. */
  angleKey: string
  series: RadarSeries[]
  /** "filled" shades the area, "line" draws only the outline, "dots" adds a dot at every vertex. */
  variant?: "filled" | "line" | "dots"
  /** Shape of the background grid rings. */
  grid?: "polygon" | "circle" | "none"
  /** Show the category label at the end of each spoke. */
  showAngleLabels?: boolean
  /** Show value ticks along the vertical spoke. */
  showRadiusAxis?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  /** Recharts domain for the value axis, e.g. [0, 100]. Defaults to [0, "auto"]. */
  domain?: React.ComponentProps<typeof PolarRadiusAxis>["domain"]
  valueFormatter?: (value: number) => string
}

/** A radar chart on shadcn's chart primitives: filled, outlined, or dotted, with one polygon per series. */
function RadarChart({
  data,
  angleKey,
  series,
  variant = "filled",
  grid = "polygon",
  showAngleLabels = true,
  showRadiusAxis = false,
  showLegend = false,
  showTooltip = true,
  domain,
  valueFormatter = (value) => formatNumber(value, { format: "compact" }),
  className,
  ...props
}: RadarChartProps) {
  const config = Object.fromEntries(
    series.map((s, index) => [
      s.key,
      { label: s.label, color: s.color ?? `var(--chart-${(index % 5) + 1})` },
    ])
  ) satisfies ChartConfig

  return (
    <ChartContainer
      data-slot="radar-chart"
      config={config}
      className={cn("aspect-auto h-64 w-full", className)}
      {...props}
    >
      <RechartsRadarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
        {grid !== "none" ? <PolarGrid gridType={grid} /> : null}
        <PolarAngleAxis
          dataKey={angleKey}
          tickLine={false}
          axisLine={false}
          tick={showAngleLabels ? { fill: "var(--muted-foreground)" } : false}
        />
        <PolarRadiusAxis
          angle={90}
          domain={domain}
          axisLine={false}
          tick={showRadiusAxis ? { fill: "var(--muted-foreground)" } : false}
          tickFormatter={valueFormatter}
        />
        {showTooltip ? (
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                indicator="dot"
                formatter={(value, name, item) => (
                  <div className="flex w-full items-center gap-2">
                    <span
                      className="size-2 shrink-0 rounded-[2px]"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-muted-foreground flex-1">
                      {config[name as string]?.label ?? name}
                    </span>
                    <span className="font-mono font-medium tabular-nums">
                      {valueFormatter(Number(value))}
                    </span>
                  </div>
                )}
              />
            }
          />
        ) : null}
        {showLegend ? <ChartLegend content={<ChartLegendContent />} /> : null}
        {series.map((s) => {
          const color = `var(--color-${s.key})`
          return (
            <Radar
              key={s.key}
              dataKey={s.key}
              stroke={color}
              strokeWidth={2}
              fill={color}
              fillOpacity={variant === "filled" ? 0.25 : 0}
              dot={variant === "dots" ? { r: 3, fill: color, strokeWidth: 0 } : false}
              activeDot={{ r: 4, fill: color, stroke: "var(--background)", strokeWidth: 2 }}
              isAnimationActive={false}
            />
          )
        })}
      </RechartsRadarChart>
    </ChartContainer>
  )
}

export { RadarChart }
