"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RadialGauge } from "@/registry/dashboardcn/ui/radial-gauge"
import { TickBar } from "@/registry/dashboardcn/ui/tick-bar"
import { MetricValue } from "@/registry/dashboardcn/ui/metric-value"

export interface ScoreGaugeItem {
  label: string
  /** Text after the label, e.g. "7h 50m" renders "Duration: 7h 50m". */
  detail?: string
  value: number
  max: number
  /** Any CSS color for the bar. Defaults to the card color. */
  color?: string
}

export interface ScoreGaugeStatus {
  /** Lowest score that earns this label. */
  min: number
  label: string
}

/** Applied to the score as a share of max when neither status nor statuses is given. */
const defaultStatuses: ScoreGaugeStatus[] = [
  { min: 0, label: "Poor" },
  { min: 50, label: "Fair" },
  { min: 70, label: "Good" },
  { min: 85, label: "Excellent" },
]

export interface ScoreGaugeCardProps extends React.ComponentProps<typeof Card> {
  title: string
  /** Headline word, e.g. "Excellent". Derived from statuses when omitted. */
  status?: string
  /** Score thresholds used to derive the headline word, e.g. [{ min: 85, label: "Excellent" }]. */
  statuses?: ScoreGaugeStatus[]
  /** Period text under the headline, e.g. "29 Jun - 5 Jul". */
  caption?: string
  score: number
  max?: number
  /** Any CSS color for the gauge and bars. Defaults to chart-1. */
  color?: string
  /** Gauge diameter in pixels. */
  gaugeSize?: number
  /** Gauge stroke width in pixels. */
  thickness?: number
  /** Number of gauge segments. 0 draws a continuous arc. */
  segments?: number
  /** Gap between gauge segments in degrees. */
  segmentGap?: number
  /** Gauge sweep in degrees. 360 draws a ring, 180 a semicircle. */
  sweep?: number
  /** Ticks in each breakdown bar. 0 draws a solid bar. */
  barSegments?: number
  /** Breakdown rows, each with a bar filled to value/max. */
  items: ScoreGaugeItem[]
  /** Slot in the top-right corner, e.g. a menu button. */
  action?: React.ReactNode
}

function deriveStatus(score: number, statuses: ScoreGaugeStatus[]) {
  let match: ScoreGaugeStatus | undefined
  for (const status of statuses) {
    if (score >= status.min && (!match || status.min >= match.min)) match = status
  }
  return match?.label
}

/** A score card with a headline word, a radial gauge around the score, and a breakdown list of labelled bars. */
function ScoreGaugeCard({
  title,
  status,
  statuses,
  caption,
  score,
  max = 100,
  color = "var(--chart-1)",
  gaugeSize = 160,
  thickness = 12,
  segments = 0,
  segmentGap = 2,
  sweep = 360,
  barSegments = 0,
  items,
  action,
  className,
  ...props
}: ScoreGaugeCardProps) {
  const headline =
    status ??
    (statuses
      ? deriveStatus(score, statuses)
      : deriveStatus((score / (max || 1)) * 100, defaultStatuses))

  return (
    <Card
      data-slot="score-gauge-card"
      className={cn("@container/card gap-4", className)}
      {...props}
    >
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        {headline ? (
          <CardTitle className="text-2xl font-semibold tracking-tight">{headline}</CardTitle>
        ) : null}
        {caption ? (
          <div className="text-muted-foreground text-sm tabular-nums">{caption}</div>
        ) : null}
        {action ? <CardAction>{action}</CardAction> : null}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-6 @sm/card:flex-row @sm/card:items-center @sm/card:gap-8">
          <RadialGauge
            value={score}
            max={max}
            size={gaugeSize}
            thickness={thickness}
            segments={segments}
            gap={segmentGap}
            sweep={sweep}
            color={color}
            aria-label={`${title}: ${score} of ${max}`}
            className="shrink-0"
          >
            <MetricValue
              value={score}
              className="text-4xl font-semibold tracking-tight"
            />
          </RadialGauge>
          <ul className="flex w-full min-w-0 flex-1 flex-col gap-4">
            {items.map((item) => {
              const fraction = Math.min(1, Math.max(0, item.value / (item.max || 1)))
              const barColor = item.color ?? color
              return (
                <li key={item.label} className="flex flex-col gap-1.5">
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="min-w-0 truncate">
                      <span className="font-medium">{item.label}</span>
                      {item.detail ? (
                        <span className="text-muted-foreground">: {item.detail}</span>
                      ) : null}
                    </span>
                    <span className="text-muted-foreground shrink-0 tabular-nums">
                      <MetricValue value={item.value} className="text-foreground font-medium" />
                      /
                      <MetricValue value={item.max} />
                    </span>
                  </div>
                  {barSegments > 0 ? (
                    <TickBar
                      value={item.value}
                      max={item.max}
                      segments={barSegments}
                      shape="pill"
                      color={barColor}
                      className="h-2"
                    />
                  ) : (
                    <div
                      role="progressbar"
                      aria-label={item.label}
                      aria-valuemin={0}
                      aria-valuemax={item.max}
                      aria-valuenow={item.value}
                      className="bg-muted h-2 w-full overflow-hidden rounded-full"
                    >
                      <div
                        className="h-full rounded-full transition-[width] duration-500"
                        style={{
                          width: `${Math.round(fraction * 1000) / 10}%`,
                          backgroundColor: barColor,
                        }}
                      />
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

export { ScoreGaugeCard }
