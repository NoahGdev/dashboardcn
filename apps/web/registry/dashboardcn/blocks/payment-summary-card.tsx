"use client"

import * as React from "react"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { type NumberFormat } from "@/registry/dashboardcn/lib/format"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { MetricValue } from "@/registry/dashboardcn/ui/metric-value"
import { TickBar } from "@/registry/dashboardcn/ui/tick-bar"

export interface PaymentSummaryRow {
  label: string
  value: React.ReactNode
}

export interface PaymentSummaryCardProps extends React.ComponentProps<typeof Card> {
  metricLabel: string
  value: number
  format?: NumberFormat
  currency?: string
  progress: number
  progressLabel?: string
  segments?: number
  legend?: { label: string; color?: string }[]
  title: string
  rows: PaymentSummaryRow[]
  status?: string
  action?: { label: string; href?: string; onClick?: () => void }
}

/** A segmented headline metric paired with a compact payment or record summary. */
function PaymentSummaryCard({
  metricLabel,
  value,
  format,
  currency,
  progress,
  progressLabel,
  segments = 64,
  legend = [],
  title,
  rows,
  status,
  action,
  className,
  ...props
}: PaymentSummaryCardProps) {
  return (
    <Card
      data-slot="payment-summary-card"
      className={cn("gap-0 overflow-hidden py-0", className)}
      {...props}
    >
      <CardHeader className="gap-3 border-b py-5 [.border-b]:pb-5">
        <div className="border-l-2 pl-3">
          <span className="text-muted-foreground block text-sm">{metricLabel}</span>
          <MetricValue
            value={value}
            format={format}
            currency={currency}
            className="text-3xl font-semibold tracking-tight"
          />
        </div>
        <div className="relative pt-1">
          {progressLabel ? (
            <span
              className="absolute -top-4 text-xs font-medium tabular-nums"
              style={{ left: `min(calc(${Math.min(100, Math.max(0, progress))}% - 1rem), calc(100% - 2rem))` }}
            >
              {progressLabel}
            </span>
          ) : null}
          <TickBar
            value={progress}
            segments={segments}
            animate
            animationDuration={800}
            className="h-9 gap-[3px]"
          />
        </div>
        {legend.length ? (
          <div className="flex gap-5">
            {legend.map((item) => (
              <span key={item.label} className="text-muted-foreground flex items-center gap-2 text-xs">
                <span className="size-2 rounded-full" style={{ backgroundColor: item.color ?? "var(--foreground)" }} />
                <span className="border-b border-dotted">{item.label}</span>
              </span>
            ))}
          </div>
        ) : null}
      </CardHeader>
      <CardContent className="grid gap-4 py-5">
        <h3 className="text-muted-foreground text-sm font-medium">{title}</h3>
        <dl className="grid gap-3 text-sm">
          {rows.map((row) => (
            <div key={row.label} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
              <dt className="text-muted-foreground">{row.label}</dt>
              <dd className="font-medium tabular-nums">{row.value}</dd>
            </div>
          ))}
          {status ? (
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
              <dt className="text-muted-foreground">Status</dt>
              <dd><Badge variant="secondary" className="rounded-full">{status}</Badge></dd>
            </div>
          ) : null}
        </dl>
      </CardContent>
      {action ? (
        <CardFooter className="pb-5">
          <Button variant="secondary" className="w-full" asChild={Boolean(action.href)} onClick={action.onClick}>
            {action.href ? <a href={action.href}>{action.label}<ArrowRight /></a> : <>{action.label}<ArrowRight /></>}
          </Button>
        </CardFooter>
      ) : null}
    </Card>
  )
}

export { PaymentSummaryCard }
