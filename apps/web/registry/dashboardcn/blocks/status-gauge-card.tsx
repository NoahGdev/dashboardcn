"use client"

import * as React from "react"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { formatNumber, type NumberFormat } from "@/registry/dashboardcn/lib/format"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadialGauge } from "@/registry/dashboardcn/ui/radial-gauge"

export interface StatusGaugePerson {
  name: string
  /** Avatar image. Falls back to the first letter of the name. */
  src?: string
}

export interface StatusGaugeCardProps extends React.ComponentProps<typeof Card> {
  title: string
  /** Short status word, e.g. "Stable" or "In review". */
  status: string
  /** Metric name shown before the value, e.g. "Server uptime". */
  metricLabel: string
  value: number | string
  format?: NumberFormat
  currency?: string
  /** Gauge fill from 0 to 100. Defaults to value when value is a number. */
  progress?: number
  /** Any CSS color for the gauge. */
  color?: string
  /** Number of ticks in the gauge. 0 draws a continuous arc. */
  segments?: number
  /** Space between ticks in degrees. Larger gaps make thinner ticks. */
  segmentGap?: number
  /** Length of each tick in pixels. */
  thickness?: number
  /** Gauge diameter in pixels. */
  gaugeSize?: number
  /** Avatars shown under the metric. */
  people?: StatusGaugePerson[]
  /** Text next to the avatars, e.g. "6 reviewers". */
  peopleLabel?: string
  /** Header button. On narrow cards only the icon shows. */
  action?: {
    label: string
    href?: string
    onClick?: () => void
    icon?: React.ReactNode
  }
}

/** A status card with a headline word, a metric, an avatar stack, and a segmented gauge. */
function StatusGaugeCard({
  title,
  status,
  metricLabel,
  value,
  format = "percent",
  currency,
  progress,
  color = "var(--color-emerald-500)",
  segments = 40,
  segmentGap = 2.5,
  thickness = 14,
  gaugeSize = 200,
  people = [],
  peopleLabel,
  action,
  className,
  ...props
}: StatusGaugeCardProps) {
  const numeric = typeof value === "number"
  const gauge =
    progress ?? (numeric ? (format === "percent" ? value * 100 : value) : 0)
  const display = numeric ? formatNumber(value, { format, currency }) : value

  return (
    <Card
      data-slot="status-gauge-card"
      className={cn("@container/card gap-0 py-0", className)}
      {...props}
    >
      <CardHeader className="flex items-center justify-between gap-3 border-b py-3 [.border-b]:pb-3">
        <CardTitle className="truncate text-sm">{title}</CardTitle>
        {action ? (
          <Button
            variant="outline"
            size="sm"
            asChild={Boolean(action.href)}
            onClick={action.onClick}
            className="shrink-0"
          >
            {action.href ? (
              <a href={action.href}>
                <span className="@max-xs/card:sr-only">{action.label}</span>
                <span className="@xs/card:hidden [&>svg]:size-4">
                  {action.icon ?? <ArrowUpRight />}
                </span>
              </a>
            ) : (
              <>
                <span className="@max-xs/card:sr-only">{action.label}</span>
                <span className="@xs/card:hidden [&>svg]:size-4">
                  {action.icon ?? <ArrowUpRight />}
                </span>
              </>
            )}
          </Button>
        ) : null}
      </CardHeader>
      <CardContent className="py-5">
        <div className="flex flex-col gap-6 @sm/card:flex-row @sm/card:items-end @sm/card:justify-between">
          <div className="flex min-w-0 flex-col gap-1">
            <span className="text-lg font-semibold">{status}</span>
            <span className="text-muted-foreground text-sm">
              {metricLabel}:{" "}
              <span className="text-foreground font-semibold tabular-nums">
                {display}
              </span>
            </span>
            {people.length || peopleLabel ? (
              <div className="mt-4 flex items-center gap-2">
                {people.length ? (
                  <div
                    className="flex -space-x-2"
                    aria-label={people.map((p) => p.name).join(", ")}
                  >
                    {people.map((person) => (
                      <span
                        key={person.name}
                        title={person.name}
                        className="bg-muted ring-card text-muted-foreground flex size-7 items-center justify-center overflow-hidden rounded-full text-xs font-medium ring-2"
                      >
                        {person.src ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={person.src}
                            alt={person.name}
                            className="size-full object-cover"
                          />
                        ) : (
                          person.name.charAt(0).toUpperCase()
                        )}
                      </span>
                    ))}
                  </div>
                ) : null}
                {peopleLabel ? (
                  <span className="text-muted-foreground text-sm whitespace-nowrap">
                    {peopleLabel}
                  </span>
                ) : null}
              </div>
            ) : null}
          </div>
          <RadialGauge
            value={gauge}
            segments={segments}
            gap={segmentGap}
            size={gaugeSize}
            thickness={thickness}
            color={color}
            className="self-center @sm/card:self-end"
          />
        </div>
      </CardContent>
    </Card>
  )
}

export { StatusGaugeCard }
