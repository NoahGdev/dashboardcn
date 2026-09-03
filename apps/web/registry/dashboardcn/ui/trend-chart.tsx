"use client"

import * as React from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts"

import { cn } from "@/lib/utils"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export interface TrendSeries {
  /** Key in each data row. */
  key: string
  label: string
  /** Any CSS color. Defaults to chart-1 through chart-5 in order. */
  color?: string
}

export interface TrendChartProps
  extends Omit<React.ComponentProps<typeof ChartContainer>, "config" | "children"> {
  data: Record<string, unknown>[]
  /** Key of the x-axis value in each row. */
  xKey: string
  series: TrendSeries[]
  type?: "area" | "line" | "bar"
  stacked?: boolean
  showLegend?: boolean
  showGrid?: boolean
  showYAxis?: boolean
  xFormatter?: (value: unknown) => string
  yFormatter?: (value: number) => string
}

function defaultXFormatter(value: unknown) {
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    const [y, m, d] = value.split("-").map(Number)
    return new Date(y!, m! - 1, d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }
  return String(value)
}

/** Round only the outer corners of a stack; mixed-sign stacks stay square. */
function stackedRadius(
  stacked: boolean,
  hasNegative: boolean,
  index: number,
  count: number
): number | [number, number, number, number] {
  if (!stacked) return 4
  if (hasNegative) return 0
  if (count === 1) return 4
  if (index === count - 1) return [4, 4, 0, 0]
  if (index === 0) return [0, 0, 4, 4]
  return 0
}

function TrendChart({
  data,
  xKey,
  series,
  type = "area",
  stacked = false,
  showLegend = false,
  showGrid = true,
  showYAxis = false,
  xFormatter = defaultXFormatter,
  yFormatter,
  className,
  ...props
}: TrendChartProps) {
  const id = React.useId()
  const hasNegative = React.useMemo(
    () =>
      data.some((row) =>
        series.some((s) => {
          const v = row[s.key]
          return typeof v === "number" && v < 0
        })
      ),
    [data, series]
  )
  const config = Object.fromEntries(
    series.map((s, index) => [
      s.key,
      { label: s.label, color: s.color ?? `var(--chart-${(index % 5) + 1})` },
    ])
  ) satisfies ChartConfig

  const axes = (
    <>
      {showGrid ? <CartesianGrid vertical={false} /> : null}
      <XAxis
        dataKey={xKey}
        tickLine={false}
        axisLine={false}
        tickMargin={8}
        minTickGap={32}
        tickFormatter={xFormatter}
      />
      {showYAxis ? (
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width="auto"
          tickFormatter={yFormatter}
        />
      ) : null}
      {hasNegative ? (
        <ReferenceLine y={0} stroke="var(--border)" strokeWidth={1} />
      ) : null}
      <ChartTooltip
        cursor={false}
        content={
          <ChartTooltipContent
            indicator={type === "bar" ? "dashed" : "dot"}
            labelFormatter={(value) => xFormatter(value)}
            formatter={
              yFormatter
                ? (value, name) => (
                    <div className="flex w-full items-center justify-between gap-4">
                      <span className="text-muted-foreground">
                        {config[name as string]?.label ?? name}
                      </span>
                      <span className="font-mono font-medium tabular-nums">
                        {yFormatter(Number(value))}
                      </span>
                    </div>
                  )
                : undefined
            }
          />
        }
      />
      {showLegend ? <ChartLegend content={<ChartLegendContent />} /> : null}
    </>
  )

  const margin = { top: 8, right: 8, bottom: 0, left: showYAxis ? 0 : 8 }

  return (
    <ChartContainer
      data-slot="trend-chart"
      config={config}
      className={cn("aspect-auto h-64 w-full", className)}
      {...props}
    >
      {type === "bar" ? (
        <BarChart
          data={data}
          margin={margin}
          stackOffset={stacked ? "sign" : "none"}
        >
          {axes}
          {series.map((s, index) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              fill={`var(--color-${s.key})`}
              radius={stackedRadius(stacked, hasNegative, index, series.length)}
              stackId={stacked ? "stack" : undefined}
            />
          ))}
        </BarChart>
      ) : type === "line" ? (
        <LineChart data={data} margin={margin}>
          {axes}
          {series.map((s) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              stroke={`var(--color-${s.key})`}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      ) : (
        <AreaChart
          data={data}
          margin={margin}
          stackOffset={stacked ? "sign" : "none"}
        >
          <defs>
            {series.map((s) => (
              <linearGradient
                key={s.key}
                id={`${id}-${s.key}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={`var(--color-${s.key})`}
                  stopOpacity={0.6}
                />
                <stop
                  offset="95%"
                  stopColor={`var(--color-${s.key})`}
                  stopOpacity={0.05}
                />
              </linearGradient>
            ))}
          </defs>
          {axes}
          {series.map((s) => (
            <Area
              key={s.key}
              type="monotone"
              dataKey={s.key}
              stroke={`var(--color-${s.key})`}
              fill={`url(#${id}-${s.key})`}
              strokeWidth={2}
              stackId={stacked ? "stack" : undefined}
            />
          ))}
        </AreaChart>
      )}
    </ChartContainer>
  )
}

export { TrendChart }
