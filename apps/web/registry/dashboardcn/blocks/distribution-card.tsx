"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { type NumberFormat } from "@/registry/dashboardcn/lib/format"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DeltaBadge } from "@/registry/dashboardcn/ui/delta-badge"
import { DistributionBar } from "@/registry/dashboardcn/ui/distribution-bar"
import { MetricValue } from "@/registry/dashboardcn/ui/metric-value"

export interface DistributionCardItem {
  name: string
  value: number
  icon?: React.ReactNode
  /** Any CSS color. Defaults to chart-1 through chart-5 in order. */
  color?: string
}

export interface DistributionCardOption {
  value: string
  label: string
}

export interface DistributionCardProps extends React.ComponentProps<typeof Card> {
  title: string
  items: DistributionCardItem[]
  /** Headline total. Defaults to the sum of the items. */
  total?: number
  /** Absolute change in the total, in the same unit, e.g. 390000 for +$390k. */
  delta?: number
  format?: NumberFormat
  currency?: string
  /** Small label above each item's value, e.g. "Capital in". */
  valueLabel?: string
  /** Options for the header dropdown. Omit to hide it. */
  options?: DistributionCardOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

const defaultColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

const compactFormatters = new Map<string, Intl.NumberFormat>()

/** "$12.4M", or "+$390K" when signed. */
function formatCompact(
  value: number,
  format: NumberFormat,
  currency: string,
  signed = false
) {
  const key = `${format}:${currency}:${signed}`
  let formatter = compactFormatters.get(key)
  if (!formatter) {
    formatter = new Intl.NumberFormat("en-US", {
      ...(format === "currency" ? { style: "currency", currency } : {}),
      notation: "compact",
      signDisplay: signed ? "exceptZero" : "auto",
      // Explicit minimum keeps Node and browsers in agreement ("$390K", not "$390.0K").
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    })
    compactFormatters.set(key, formatter)
  }
  return formatter.format(value)
}

/** A total with delta, a stacked share bar, and a ranked list of the contributors. */
function DistributionCard({
  title,
  items,
  total,
  delta,
  format = "currency",
  currency = "USD",
  valueLabel,
  options,
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}: DistributionCardProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? options?.[0]?.value ?? "")
  const selected = value ?? internal
  const selectedLabel = options?.find((option) => option.value === selected)?.label
  const sum = total ?? items.reduce((acc, item) => acc + item.value, 0)
  const segments = items.map((item, index) => ({
    ...item,
    color: item.color ?? defaultColors[index % defaultColors.length],
  }))

  return (
    <Card data-slot="distribution-card" className={cn("gap-0 py-0", className)} {...props}>
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
      <CardContent className="flex flex-col gap-4 py-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-3xl font-semibold tabular-nums tracking-tight">
            {formatCompact(sum, format, currency)}
          </span>
          {delta !== undefined ? (
            <DeltaBadge delta={delta} variant="soft">
              {formatCompact(delta, format, currency, true)}
            </DeltaBadge>
          ) : null}
        </div>
        <DistributionBar segments={segments} showLegend={false} />
        <ul className="flex flex-col divide-y">
          {segments.map((item) => (
            <li
              key={item.name}
              data-slot="distribution-card-item"
              className="flex items-center gap-3 py-3 last:pb-0"
            >
              {item.icon ? (
                <span className="bg-muted flex size-9 shrink-0 items-center justify-center rounded-lg [&>svg]:size-5">
                  {item.icon}
                </span>
              ) : (
                <span
                  aria-hidden="true"
                  className="size-2.5 shrink-0 rounded-[2px]"
                  style={{ backgroundColor: item.color }}
                />
              )}
              <span className="min-w-0 flex-1 truncate text-sm font-medium">{item.name}</span>
              <div className="flex flex-col items-end">
                {valueLabel ? (
                  <span className="text-muted-foreground text-xs">{valueLabel}</span>
                ) : null}
                <MetricValue
                  value={item.value}
                  format={format}
                  currency={currency}
                  maximumFractionDigits={0}
                  className="text-sm font-semibold"
                />
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export { DistributionCard }
