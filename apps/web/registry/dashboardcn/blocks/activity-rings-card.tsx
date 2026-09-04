"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { formatNumber, type NumberFormat } from "@/registry/dashboardcn/lib/format"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ActivityRings, type ActivityRing } from "@/registry/dashboardcn/ui/activity-rings"

export interface ActivityRingsMetric extends ActivityRing {
  /** Text shown for the value, e.g. "1h 45m". Defaults to the formatted value plus `unit`. */
  display?: string
  format?: NumberFormat
  currency?: string
  /** Suffix after the number, e.g. "kcal" or "km". */
  unit?: string
}

export interface ActivityRingsCardProps
  extends Omit<React.ComponentProps<typeof Card>, "children"> {
  title: string
  /** Muted text under the title, e.g. the date. */
  caption?: string
  /** Outermost ring first. */
  metrics: ActivityRingsMetric[]
  /** "stacked" puts the tiles above the rings; "side" puts them next to the rings. */
  layout?: "stacked" | "side"
  /** Ring diameter in pixels. */
  size?: number
  thickness?: number
  gap?: number
  /** Content in the middle of the rings, e.g. a total. */
  center?: React.ReactNode
  /** Slot in the top-right corner, e.g. a menu button. */
  action?: React.ReactNode
}

const defaultColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

function metricText(metric: ActivityRingsMetric) {
  if (metric.display) return metric.display
  const number = formatNumber(metric.value, {
    format: metric.format,
    currency: metric.currency,
    maximumFractionDigits: metric.format ? undefined : 1,
  })
  return metric.unit ? `${number} ${metric.unit}` : number
}

/** A card with concentric goal rings and a tile per ring. Hovering a tile or a ring focuses the pair. */
function ActivityRingsCard({
  title,
  caption,
  metrics,
  layout = "stacked",
  size = 180,
  thickness = 14,
  gap = 4,
  center,
  action,
  className,
  ...props
}: ActivityRingsCardProps) {
  const [active, setActive] = React.useState<number | null>(null)
  const rings = metrics.map((metric, index) => ({
    ...metric,
    color: metric.color ?? defaultColors[index % defaultColors.length],
  }))

  const tiles = (
    <ul
      className="grid gap-2"
      style={{
        gridTemplateColumns: `repeat(${layout === "side" ? 1 : Math.min(rings.length, 3)}, minmax(0, 1fr))`,
      }}
    >
      {rings.map((metric, index) => {
        const max = metric.max ?? 100
        const share = Math.min(1, Math.max(0, metric.value / (max || 1)))
        return (
          <li
            key={metric.label}
            data-active={active === index || undefined}
            onMouseEnter={() => setActive(index)}
            onMouseLeave={() => setActive(null)}
            className={cn(
              "flex min-w-0 flex-col gap-1 rounded-lg border px-3 py-2.5 transition-[opacity,border-color] duration-200",
              active !== null && active !== index && "opacity-50",
              active === index && "border-foreground/20"
            )}
          >
            <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <span
                aria-hidden="true"
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: metric.color }}
              />
              <span className="truncate">{metric.label}</span>
            </span>
            <span className="truncate text-sm font-semibold tabular-nums">
              {metricText(metric)}
            </span>
            <span className="sr-only">{Math.round(share * 100)}% of goal</span>
          </li>
        )
      })}
    </ul>
  )

  return (
    <Card
      data-slot="activity-rings-card"
      className={cn("@container/card gap-4", className)}
      {...props}
    >
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        {caption ? (
          <span className="text-muted-foreground text-sm">{caption}</span>
        ) : null}
        {action ? <CardAction>{action}</CardAction> : null}
      </CardHeader>
      <CardContent
        className={cn(
          "flex gap-5",
          layout === "side"
            ? "flex-col items-center @sm/card:flex-row @sm/card:items-center @sm/card:justify-between"
            : "flex-col"
        )}
      >
        {layout === "side" ? (
          <>
            <ActivityRings
              rings={rings}
              size={size}
              thickness={thickness}
              gap={gap}
              activeIndex={active}
              onActiveIndexChange={setActive}
            >
              {center}
            </ActivityRings>
            <div className="w-full @sm/card:max-w-[14rem]">{tiles}</div>
          </>
        ) : (
          <>
            {tiles}
            <ActivityRings
              rings={rings}
              size={size}
              thickness={thickness}
              gap={gap}
              activeIndex={active}
              onActiveIndexChange={setActive}
              className="self-center"
            >
              {center}
            </ActivityRings>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export { ActivityRingsCard }
