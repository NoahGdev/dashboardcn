"use client"

import * as React from "react"
import { ChevronDown, Info } from "lucide-react"

import { cn } from "@/lib/utils"
import { formatNumber, type NumberFormat } from "@/registry/dashboardcn/lib/format"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { TickBar } from "@/registry/dashboardcn/ui/tick-bar"

export interface DualMetricCardMetric {
  label: string
  value: number
  format?: NumberFormat
  currency?: string
  /** Bar fill from 0 to 100. Defaults to the metric's share of the total across all metrics. */
  progress?: number
  /** Show the metric's share of the total as a badge next to the value. */
  showShare?: boolean
  /** "ticks" draws a tick bar, "bar" a continuous bar. */
  meter?: "ticks" | "bar"
  /** Any CSS color. Defaults to chart-1 through chart-5 in order. */
  color?: string
  /** A supporting fact under the meter, e.g. { label: "Top source", value: "LinkedIn" }. */
  detail?: {
    label: string
    value: React.ReactNode
    /** Shown in a tooltip behind an info icon next to the label. */
    description?: string
  }
}

export interface DualMetricCardOption {
  value: string
  label: string
}

export interface DualMetricCardProps extends React.ComponentProps<typeof Card> {
  title: string
  /** Usually two metrics, shown side by side. */
  metrics: DualMetricCardMetric[]
  /** Options for the header dropdown. Omit to hide it. */
  options?: DualMetricCardOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Number of ticks in each tick bar. */
  segments?: number
}

const defaultColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

/** A card with two metrics side by side, each with a value, share badge, meter, and a supporting fact. */
function DualMetricCard({
  title,
  metrics,
  options,
  value,
  defaultValue,
  onValueChange,
  segments = 30,
  className,
  ...props
}: DualMetricCardProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? options?.[0]?.value ?? "")
  const selected = value ?? internal
  const selectedLabel = options?.find((option) => option.value === selected)?.label
  const total = metrics.reduce((acc, metric) => acc + metric.value, 0)

  return (
    <Card data-slot="dual-metric-card" className={cn("gap-0 py-0", className)} {...props}>
      <CardHeader className="flex items-center justify-between gap-3 border-b py-3 [.border-b]:pb-3">
        <CardTitle className="text-sm">{title}</CardTitle>
        {options?.length ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {selectedLabel}
                <ChevronDown className="text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup
                value={selected}
                onValueChange={(next) => {
                  setInternal(next)
                  onValueChange?.(next)
                }}
              >
                {options.map((option) => (
                  <DropdownMenuRadioItem key={option.value} value={option.value}>
                    {option.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </CardHeader>
      <CardContent className="@container py-5">
        <TooltipProvider>
          <div className="grid gap-6 @xs:grid-cols-2 @xs:gap-0 @xs:divide-x">
            {metrics.map((metric, index) => {
              const color = metric.color ?? defaultColors[index % defaultColors.length]
              const share = total ? metric.value / total : 0
              const fill = metric.progress ?? share * 100
              return (
                <div
                  key={metric.label}
                  data-slot="dual-metric"
                  className="flex min-w-0 flex-col gap-1 @xs:px-5 @xs:first:pl-0 @xs:last:pr-0"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-3xl font-semibold tabular-nums tracking-tight">
                      {formatNumber(metric.value, { format: metric.format, currency: metric.currency })}
                    </span>
                    {metric.showShare ? (
                      <span
                        className="rounded-md px-1.5 py-0.5 text-xs font-medium tabular-nums"
                        style={{
                          color,
                          backgroundColor: `color-mix(in oklab, ${color} 15%, transparent)`,
                        }}
                      >
                        {formatNumber(share, { format: "percent", maximumFractionDigits: 2 })}
                      </span>
                    ) : null}
                  </div>
                  <span className="text-muted-foreground text-sm">{metric.label}</span>
                  <div className="mt-2 flex h-4 items-center">
                    {metric.meter === "bar" ? (
                      <div
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={Math.round(fill)}
                        className="bg-muted h-2 w-full overflow-hidden rounded-full"
                      >
                        <div
                          className="h-full rounded-full transition-[width]"
                          style={{ width: `${Math.min(100, Math.max(0, fill))}%`, backgroundColor: color }}
                        />
                      </div>
                    ) : (
                      <TickBar value={fill} segments={segments} color={color} className="h-4 gap-0.5" />
                    )}
                  </div>
                  {metric.detail ? (
                    <div className="mt-4 flex flex-col gap-0.5">
                      <span className="text-muted-foreground flex items-center gap-1 text-xs">
                        {metric.detail.label}
                        {metric.detail.description ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                className="hover:text-foreground inline-flex rounded-full"
                              >
                                <Info className="size-3.5" />
                                <span className="sr-only">About {metric.detail.label}</span>
                              </button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-56">
                              {metric.detail.description}
                            </TooltipContent>
                          </Tooltip>
                        ) : null}
                      </span>
                      <span className="text-sm font-medium tabular-nums">{metric.detail.value}</span>
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  )
}

export { DualMetricCard }
