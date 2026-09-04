"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { formatNumber, type NumberFormat } from "@/registry/dashboardcn/lib/format"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DeltaBadge } from "@/registry/dashboardcn/ui/delta-badge"
import { FunnelChart, type FunnelChartProps, type FunnelStep } from "@/registry/dashboardcn/ui/funnel-chart"
import { MetricValue } from "@/registry/dashboardcn/ui/metric-value"

export interface FunnelRange {
  value: string
  label: string
  /** Top of the funnel first. */
  steps: FunnelStep[]
  /** Change in the first step vs the previous range, as a fraction. */
  delta?: number
}

export interface FunnelChartCardProps
  extends Omit<React.ComponentProps<typeof Card>, "children"> {
  title: string
  /** Top of the funnel first. Ignored when `ranges` is set. */
  steps?: FunnelStep[]
  /** Change in the first step, as a fraction. Ignored when `ranges` is set. */
  delta?: number
  /** Context for the delta, e.g. "vs last week". */
  deltaLabel?: string
  invertDelta?: boolean
  /** Static text in the header, e.g. "Last 30 days". Replaced by the picker when `ranges` is set. */
  caption?: string
  /** Ranges for the header picker. Each carries its own steps. */
  ranges?: FunnelRange[]
  range?: string
  defaultRange?: string
  onRangeChange?: (value: string) => void
  format?: NumberFormat
  currency?: string
  color?: FunnelChartProps["color"]
  shape?: FunnelChartProps["shape"]
  height?: FunnelChartProps["height"]
  neckWidth?: FunnelChartProps["neckWidth"]
  showPercentages?: FunnelChartProps["showPercentages"]
  showLabels?: FunnelChartProps["showLabels"]
  chartClassName?: string
}

/** A conversion card with a flow funnel: headline value, delta, and a range picker. Hovering a stage swaps the headline to that stage. */
function FunnelChartCard({
  title,
  steps: stepsProp = [],
  delta: deltaProp,
  deltaLabel,
  invertDelta,
  caption,
  ranges,
  range: rangeProp,
  defaultRange,
  onRangeChange,
  format = "number",
  currency,
  color,
  shape,
  height,
  neckWidth,
  showPercentages,
  showLabels,
  chartClassName,
  className,
  ...props
}: FunnelChartCardProps) {
  const [rangeState, setRangeState] = React.useState(defaultRange ?? ranges?.[0]?.value)
  const range = rangeProp ?? rangeState
  const setRange = (value: string) => {
    setRangeState(value)
    onRangeChange?.(value)
  }
  const current = ranges?.find((option) => option.value === range) ?? ranges?.[0]
  const steps = current?.steps ?? stepsProp
  const delta = current ? current.delta : deltaProp

  const [active, setActive] = React.useState<number | null>(null)
  const first = steps[0]
  const hovered = active !== null ? steps[active] : undefined
  const headline = hovered ?? first
  const share = hovered && first && first.value > 0 ? hovered.value / first.value : null

  const valueFormatter = React.useCallback(
    (value: number) => formatNumber(value, { format, currency }),
    [format, currency]
  )

  return (
    <Card data-slot="funnel-chart-card" className={cn("gap-4", className)} {...props}>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-3xl font-semibold tabular-nums tracking-tight">
          <MetricValue value={headline?.value ?? 0} format={format} currency={currency} />
        </CardTitle>
        <div className="flex h-5 items-center gap-1.5 text-sm">
          {hovered && share !== null ? (
            <span className="text-muted-foreground truncate">
              {hovered.name}
              {hovered !== first ? (
                <>
                  {" · "}
                  <span className="text-foreground font-medium tabular-nums">
                    {formatNumber(share, { format: "percent", maximumFractionDigits: 0 })}
                  </span>{" "}
                  of {first?.name}
                </>
              ) : null}
            </span>
          ) : (
            <>
              {delta !== undefined ? (
                <DeltaBadge delta={delta} invert={invertDelta} variant="soft" />
              ) : null}
              {deltaLabel ? <span className="text-muted-foreground">{deltaLabel}</span> : null}
            </>
          )}
        </div>
        {ranges?.length ? (
          <CardAction>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {current?.label}
                  <ChevronDown className="text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup value={range} onValueChange={setRange}>
                  {ranges.map((option) => (
                    <DropdownMenuRadioItem key={option.value} value={option.value}>
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardAction>
        ) : caption ? (
          <CardAction>
            <span className="text-muted-foreground text-sm">{caption}</span>
          </CardAction>
        ) : null}
      </CardHeader>
      <CardContent>
        <FunnelChart
          variant="flow"
          steps={steps}
          valueFormatter={valueFormatter}
          color={color}
          shape={shape}
          height={height}
          neckWidth={neckWidth}
          showPercentages={showPercentages}
          showLabels={showLabels}
          activeIndex={active}
          onActiveIndexChange={setActive}
          className={chartClassName}
        />
      </CardContent>
    </Card>
  )
}

export { FunnelChartCard }
