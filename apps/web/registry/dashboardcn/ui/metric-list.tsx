"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { type NumberFormat } from "@/registry/dashboardcn/lib/format"
import { DeltaBadge, getDeltaDirection } from "@/registry/dashboardcn/ui/delta-badge"
import { Sparkline } from "@/registry/dashboardcn/ui/sparkline"
import { MetricValue } from "@/registry/dashboardcn/ui/metric-value"

export interface MetricListItem {
  label: string
  value: number | string
  delta?: number
  trend?: number[]
  format?: NumberFormat
  currency?: string
  invertDelta?: boolean
  icon?: React.ReactNode
  key?: string
}

export interface MetricListProps extends React.ComponentProps<"div"> {
  items: MetricListItem[]
  /** Sparkline variant. */
  variant?: "area" | "line"
  /** Sparkline area fill. */
  fill?: "gradient" | "dots"
  showDivider?: boolean
}

/** Compact rows of label, sparkline, value, and delta. */
function MetricList({
  items,
  variant = "line",
  fill,
  showDivider = true,
  className,
  ...props
}: MetricListProps) {
  return (
    <div
      data-slot="metric-list"
      className={cn("flex flex-col", showDivider && "divide-y", className)}
      {...props}
    >
      {items.map((item) => {
        const direction = getDeltaDirection(item.delta)
        const positive =
          direction === "flat" ? null : (direction === "up") !== Boolean(item.invertDelta)
        const color =
          positive === true
            ? "var(--color-emerald-500)"
            : positive === false
              ? "var(--color-red-500)"
              : "var(--muted-foreground)"
        return (
          <div
            key={item.key ?? item.label}
            data-slot="metric-list-row"
            className="flex items-center gap-4 py-2.5 text-sm first:pt-0 last:pb-0"
          >
            <div className="flex min-w-0 flex-1 items-center gap-2">
              {item.icon ? (
                <span className="text-muted-foreground shrink-0 [&>svg]:size-4">
                  {item.icon}
                </span>
              ) : null}
              <span className="truncate">{item.label}</span>
            </div>
            {item.trend && item.trend.length > 1 ? (
              <Sparkline
                data={item.trend}
                variant={variant}
                fill={fill}
                color={color}
                className="h-6 w-20 shrink-0"
              />
            ) : null}
            <div className="flex w-28 shrink-0 items-center justify-end gap-2 tabular-nums">
              <MetricValue
                value={item.value}
                format={item.format}
                currency={item.currency}
                className="font-medium"
              />
              {item.delta !== undefined ? (
                <DeltaBadge
                  delta={item.delta}
                  invert={item.invertDelta}
                  variant="text"
                  showIcon={false}
                />
              ) : null}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export { MetricList }
