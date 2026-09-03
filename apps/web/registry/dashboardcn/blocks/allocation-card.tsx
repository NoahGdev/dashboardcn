"use client"

import * as React from "react"
import { Info } from "lucide-react"

import { cn } from "@/lib/utils"
import { type NumberFormat } from "@/registry/dashboardcn/lib/format"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { DeltaBadge } from "@/registry/dashboardcn/ui/delta-badge"
import { PeriodTabs, type PeriodOption } from "@/registry/dashboardcn/ui/period-tabs"
import { TickBar } from "@/registry/dashboardcn/ui/tick-bar"
import { MetricValue } from "@/registry/dashboardcn/ui/metric-value"

export interface AllocationCardPerson {
  name: string
  /** Avatar image. Falls back to the first letter of the name. */
  src?: string
}

export interface AllocationCardProps extends React.ComponentProps<typeof Card> {
  title: string
  /** Shown in a tooltip behind an info icon next to the title. */
  description?: string
  /** Share of the whole, e.g. 0.46 for 46%. */
  value: number
  format?: NumberFormat
  currency?: string
  /** Bar fill from 0 to 100. Defaults to value when format is percent. */
  progress?: number
  /** Fractional change vs the prior period, e.g. 0.034 for +3.4%. */
  delta?: number
  /** Text after the delta, e.g. "vs prior period". */
  deltaLabel?: string
  /** Treat a decrease as good. */
  invertDelta?: boolean
  /** Any CSS color for the bar. */
  color?: string
  /** Number of ticks in the bar. */
  segments?: number
  /** Period options for the switcher. Omit to hide it. */
  periods?: PeriodOption[]
  period?: string
  defaultPeriod?: string
  onPeriodChange?: (period: string) => void
  /** Footer stat, e.g. { label: "Equities exposure", value: "$4.7M" }. */
  stat?: { label: string; value: React.ReactNode }
  /** Avatars shown in the footer. */
  people?: AllocationCardPerson[]
  /** Text next to the avatars, e.g. "6 members". */
  peopleLabel?: string
}

/** A share-of-total card with a period switcher, a big percentage with delta, a tick bar, and a footer stat with an avatar stack. */
function AllocationCard({
  title,
  description,
  value,
  format = "percent",
  currency,
  progress,
  delta,
  deltaLabel,
  invertDelta,
  color = "var(--color-emerald-500)",
  segments = 40,
  periods,
  period,
  defaultPeriod,
  onPeriodChange,
  stat,
  people = [],
  peopleLabel,
  className,
  ...props
}: AllocationCardProps) {
  const fill = progress ?? (format === "percent" ? value * 100 : value)

  return (
    <Card data-slot="allocation-card" className={cn("gap-4", className)} {...props}>
      <CardHeader>
        <CardTitle className="flex items-center gap-1.5 text-sm">
          <span className="truncate">{title}</span>
          {description ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="text-muted-foreground hover:text-foreground inline-flex shrink-0 rounded-full"
                  >
                    <Info className="size-3.5" />
                    <span className="sr-only">About {title}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-56">{description}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : null}
        </CardTitle>
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
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <MetricValue
            value={value}
            format={format}
            currency={currency}
            maximumFractionDigits={0}
            className="text-4xl font-semibold tracking-tight"
          />
          {delta !== undefined ? (
            <DeltaBadge delta={delta} invert={invertDelta} variant="text" showIcon={false} className="text-sm" />
          ) : null}
          {deltaLabel ? (
            <span className="text-muted-foreground text-sm">{deltaLabel}</span>
          ) : null}
        </div>
        <TickBar value={fill} segments={segments} color={color} />
      </CardContent>
      {stat || people.length || peopleLabel ? (
        <CardFooter className="justify-between gap-4 text-sm">
          {stat ? (
            <span className="text-muted-foreground min-w-0 truncate">
              {stat.label}:{" "}
              <span className="text-foreground font-semibold tabular-nums">{stat.value}</span>
            </span>
          ) : (
            <span />
          )}
          {people.length || peopleLabel ? (
            <div className="flex shrink-0 items-center gap-2">
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
                <span className="text-muted-foreground whitespace-nowrap">{peopleLabel}</span>
              ) : null}
            </div>
          ) : null}
        </CardFooter>
      ) : null}
    </Card>
  )
}

export { AllocationCard }
