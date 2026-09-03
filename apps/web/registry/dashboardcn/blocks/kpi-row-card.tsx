"use client"

import * as React from "react"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { type NumberFormat } from "@/registry/dashboardcn/lib/format"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DeltaBadge, getDeltaDirection } from "@/registry/dashboardcn/ui/delta-badge"
import { PeriodTabs, type PeriodOption } from "@/registry/dashboardcn/ui/period-tabs"
import { Sparkline } from "@/registry/dashboardcn/ui/sparkline"
import { MetricValue } from "@/registry/dashboardcn/ui/metric-value"

export interface KpiRowMetric {
  label: string
  value: number | string
  delta?: number
  /** Short word next to the delta, e.g. "Rising". */
  note?: string
  trend?: number[]
  format?: NumberFormat
  currency?: string
  invertDelta?: boolean
  icon?: React.ReactNode
}

export interface KpiRowCardProps extends React.ComponentProps<typeof Card> {
  title: string
  description?: string
  metrics: KpiRowMetric[]
  /** Period options for the switcher. Omit to hide it. */
  periods?: PeriodOption[]
  period?: string
  defaultPeriod?: string
  onPeriodChange?: (period: string) => void
  /** Text in the footer, e.g. a summary sentence. */
  footer?: React.ReactNode
  /** Footer link. */
  action?: { label: string; href: string }
}

/** A card with a row of KPI tiles, each with a sparkline and delta. */
function KpiRowCard({
  title,
  description,
  metrics,
  periods,
  period,
  defaultPeriod,
  onPeriodChange,
  footer,
  action,
  className,
  ...props
}: KpiRowCardProps) {
  return (
    <Card data-slot="kpi-row-card" className={cn("gap-4", className)} {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
        {periods ? (
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
        <div className="@container">
          <div className="grid gap-6 @lg:grid-cols-2 @3xl:grid-cols-4 @3xl:divide-x">
            {metrics.map((metric) => {
              const direction = getDeltaDirection(metric.delta)
              const positive =
                direction === "flat"
                  ? null
                  : (direction === "up") !== Boolean(metric.invertDelta)
              const color =
                positive === true
                  ? "var(--color-emerald-500)"
                  : positive === false
                    ? "var(--color-red-500)"
                    : "var(--muted-foreground)"
              return (
                <div
                  key={metric.label}
                  data-slot="kpi-row-metric"
                  className="flex flex-col gap-2 @3xl:px-6 @3xl:first:pl-0 @3xl:last:pr-0"
                >
                  <div className="text-muted-foreground flex items-center gap-1.5 text-sm [&>svg]:size-4">
                    {metric.icon}
                    {metric.label}
                  </div>
                  <div className="flex items-end justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <MetricValue
                        value={metric.value}
                        format={metric.format}
                        currency={metric.currency}
                        className="text-2xl font-semibold tracking-tight"
                      />
                      <span className="flex items-center gap-1.5 text-xs">
                        {metric.delta !== undefined ? (
                          <DeltaBadge
                            delta={metric.delta}
                            invert={metric.invertDelta}
                            variant="soft"
                            showIcon={false}
                          />
                        ) : null}
                        {metric.note ? (
                          <span className="text-muted-foreground">{metric.note}</span>
                        ) : null}
                      </span>
                    </div>
                    {metric.trend && metric.trend.length > 1 ? (
                      <Sparkline
                        data={metric.trend}
                        variant="line"
                        color={color}
                        className="h-9 w-20 shrink-0"
                      />
                    ) : null}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
      {footer || action ? (
        <CardFooter className="text-muted-foreground justify-between gap-4 border-t pt-4 text-xs [.border-t]:pt-4">
          <div>{footer}</div>
          {action ? (
            <a
              href={action.href}
              className="text-foreground inline-flex shrink-0 items-center gap-1 font-medium hover:underline"
            >
              {action.label}
              <ArrowRight className="size-3.5" />
            </a>
          ) : null}
        </CardFooter>
      ) : null}
    </Card>
  )
}

export { KpiRowCard }
