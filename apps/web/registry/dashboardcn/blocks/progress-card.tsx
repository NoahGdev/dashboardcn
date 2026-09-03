"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { formatNumber } from "@/registry/dashboardcn/lib/format"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TickBar } from "@/registry/dashboardcn/ui/tick-bar"

export interface ProgressCardProps extends React.ComponentProps<typeof Card> {
  title: string
  icon?: React.ReactNode
  /** Slot in the top-right corner, e.g. a menu button. */
  action?: React.ReactNode
  value: number
  max: number
  /** Noun after the count, e.g. "checks passing" renders "16/24 checks passing". */
  label?: string
  /** Secondary stat on the right of the footer, e.g. "67% assigned". */
  detail?: React.ReactNode
  /** Any CSS color for the filled ticks. Defaults to the foreground color. */
  color?: string
  /** Number of ticks in the bar. */
  segments?: number
  shape?: "tick" | "pill"
}

/** A compact progress card with an icon title, a pill tick bar, and a count with a secondary stat. */
function ProgressCard({
  title,
  icon,
  action,
  value,
  max,
  label,
  detail,
  color = "var(--foreground)",
  segments = 24,
  shape = "pill",
  className,
  ...props
}: ProgressCardProps) {
  return (
    <Card data-slot="progress-card" className={cn("gap-4", className)} {...props}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm [&>svg]:size-4">
          {icon}
          <span className="truncate">{title}</span>
        </CardTitle>
        {action ? <CardAction>{action}</CardAction> : null}
      </CardHeader>
      <CardContent>
        <TickBar value={value} max={max} segments={segments} shape={shape} color={color} />
      </CardContent>
      {label || detail ? (
        <CardFooter className="justify-between gap-4 text-sm">
          <span className="text-muted-foreground tabular-nums">
            {formatNumber(value)}/{formatNumber(max)}
            {label ? ` ${label}` : null}
          </span>
          {detail ? <span className="shrink-0 font-semibold">{detail}</span> : null}
        </CardFooter>
      ) : null}
    </Card>
  )
}

export { ProgressCard }
