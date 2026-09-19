"use client"

import * as React from "react"
import { ArrowRight, WalletCards } from "lucide-react"

import { cn } from "@/lib/utils"
import { type NumberFormat } from "@/registry/dashboardcn/lib/format"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MetricValue } from "@/registry/dashboardcn/ui/metric-value"
import { RadialGauge } from "@/registry/dashboardcn/ui/radial-gauge"

export interface RevenueRingLegendItem {
  label: string
  color?: string
}

export interface RevenueRingCardProps extends React.ComponentProps<typeof Card> {
  label: string
  value: number
  format?: NumberFormat
  currency?: string
  progress: number
  segments?: number
  color?: string
  trackColor?: string
  icon?: React.ReactNode
  legend?: RevenueRingLegendItem[]
  action?: { label: string; href?: string; onClick?: () => void }
}

/** A centered metric inside a dense segmented ring, with a legend and full-width action. */
function RevenueRingCard({
  label,
  value,
  format = "currency",
  currency = "USD",
  progress,
  segments = 56,
  color = "var(--foreground)",
  trackColor = "var(--muted)",
  icon,
  legend = [],
  action,
  className,
  ...props
}: RevenueRingCardProps) {
  return (
    <Card
      data-slot="revenue-ring-card"
      className={cn("@container/card gap-5 overflow-hidden", className)}
      {...props}
    >
      <CardContent className="flex flex-col items-center gap-5">
        <RadialGauge
          value={progress}
          sweep={300}
          startAngle={-150}
          segments={segments}
          gap={2.4}
          thickness={10}
          size={250}
          color={color}
          trackColor={trackColor}
          animate
          animationDuration={800}
          className="max-w-full"
        >
          <span className="bg-muted/70 mb-3 flex size-11 items-center justify-center rounded-full [&>svg]:size-4">
            {icon ?? <WalletCards />}
          </span>
          <span className="text-muted-foreground text-sm">{label}</span>
          <MetricValue
            value={value}
            format={format}
            currency={currency}
            className="mt-0.5 text-xl font-semibold tracking-tight"
          />
        </RadialGauge>

        {legend.length ? (
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {legend.map((item) => (
              <span
                key={item.label}
                className="text-muted-foreground flex items-center gap-2 text-xs"
              >
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: item.color ?? "var(--muted-foreground)" }}
                />
                <span className="border-b border-dotted">{item.label}</span>
              </span>
            ))}
          </div>
        ) : null}

        {action ? (
          <Button className="w-full" asChild={Boolean(action.href)} onClick={action.onClick}>
            {action.href ? (
              <a href={action.href}>
                {action.label}
                <ArrowRight />
              </a>
            ) : (
              <>
                {action.label}
                <ArrowRight />
              </>
            )}
          </Button>
        ) : null}
      </CardContent>
    </Card>
  )
}

export { RevenueRingCard }
