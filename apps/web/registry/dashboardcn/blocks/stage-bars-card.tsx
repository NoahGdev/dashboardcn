"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { formatNumber, type NumberFormat } from "@/registry/dashboardcn/lib/format"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DeltaBadge } from "@/registry/dashboardcn/ui/delta-badge"
import { MetricValue } from "@/registry/dashboardcn/ui/metric-value"

export interface StageBarsStage {
  name: string
  value: number
  /** Any CSS color. Defaults to chart-1 through chart-5 in order. */
  color?: string
  /** Small icon drawn at the left end of the bar. */
  icon?: React.ReactNode
}

export interface StageBarsRange {
  value: string
  label: string
  /** Top of the funnel first. */
  stages: StageBarsStage[]
  /** Change in the first stage vs the previous range, as a fraction. */
  delta?: number
}

export interface StageBarsCardProps
  extends Omit<React.ComponentProps<typeof Card>, "children"> {
  title: string
  /** Top of the funnel first. Ignored when `ranges` is set. */
  stages?: StageBarsStage[]
  /** Change in the first stage, as a fraction. Ignored when `ranges` is set. */
  delta?: number
  /** Context for the delta, e.g. "vs last week". */
  deltaLabel?: string
  invertDelta?: boolean
  /** Static text in the header, e.g. "Last 30 days". Replaced by the picker when `ranges` is set. */
  caption?: string
  /** Ranges for the header picker. Each carries its own stages. */
  ranges?: StageBarsRange[]
  range?: string
  defaultRange?: string
  onRangeChange?: (value: string) => void
  format?: NumberFormat
  currency?: string
  /** Any CSS color. Paints every bar in it, in place of the per-stage palette. */
  color?: string
  /** Show a tile with the name and value for each stage under the bars. */
  showTiles?: boolean
  /** Show the icons inside the bars. */
  showIcons?: boolean
}

const defaultColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

/** The funnel as a list: a rounded bar per stage with its name, value, and share of the first stage. Hovering a stage swaps the headline. */
function StageBarsCard({
  title,
  stages: stagesProp = [],
  delta: deltaProp,
  deltaLabel,
  invertDelta,
  caption,
  ranges,
  range: rangeProp,
  defaultRange,
  onRangeChange,
  format = "number",
  currency,
  color,
  showTiles = true,
  showIcons = true,
  className,
  ...props
}: StageBarsCardProps) {
  const [rangeState, setRangeState] = React.useState(defaultRange ?? ranges?.[0]?.value)
  const range = rangeProp ?? rangeState
  const setRange = (value: string) => {
    setRangeState(value)
    onRangeChange?.(value)
  }
  const current = ranges?.find((option) => option.value === range) ?? ranges?.[0]
  const delta = current ? current.delta : deltaProp

  const first = (current?.stages ?? stagesProp)[0]
  const stages = (current?.stages ?? stagesProp).map((stage, index) => ({
    ...stage,
    share: first && first.value > 0 ? Math.min(1, Math.max(0, stage.value / first.value)) : 0,
    fill: stage.color ?? color ?? defaultColors[index % defaultColors.length],
    opacity: color && !stage.color ? 1 - index * (0.6 / Math.max(stagesProp.length - 1, 1)) : 1,
  }))

  const [active, setActive] = React.useState<number | null>(null)
  const hovered = active !== null ? stages[active] : undefined
  const headline = hovered ?? stages[0]
  const percent = (share: number) =>
    formatNumber(share, { format: "percent", maximumFractionDigits: 0 })

  return (
    <Card
      data-slot="stage-bars-card"
      className={cn("@container/card gap-4", className)}
      {...props}
    >
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-3xl font-semibold tabular-nums tracking-tight">
          <MetricValue value={headline?.value ?? 0} format={format} currency={currency} />
        </CardTitle>
        <div className="flex h-5 items-center gap-1.5 text-sm">
          {hovered ? (
            <span className="text-muted-foreground truncate">
              {hovered.name}
              {hovered !== stages[0] ? (
                <>
                  {" · "}
                  <span className="text-foreground font-medium tabular-nums">
                    {percent(hovered.share)}
                  </span>{" "}
                  of {stages[0]?.name}
                </>
              ) : null}
            </span>
          ) : (
            <>
              {delta !== undefined ? (
                <DeltaBadge delta={delta} invert={invertDelta} variant="soft" />
              ) : null}
              {deltaLabel ? <span className="text-muted-foreground">{deltaLabel}</span> : null}
            </>
          )}
        </div>
        {ranges?.length ? (
          <CardAction>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {current?.label}
                  <ChevronDown className="text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup value={range} onValueChange={setRange}>
                  {ranges.map((option) => (
                    <DropdownMenuRadioItem key={option.value} value={option.value}>
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardAction>
        ) : caption ? (
          <CardAction>
            <span className="text-muted-foreground text-sm">{caption}</span>
          </CardAction>
        ) : null}
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {/* Subgrid keeps the label column as wide as the longest name across every row. */}
        <div
          data-slot="stage-bars"
          role="list"
          className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-y-1"
          onMouseLeave={() => setActive(null)}
        >
          {stages.map((stage, index) => (
            <div
              key={stage.name}
              role="listitem"
              data-active={active === index || undefined}
              onMouseEnter={() => setActive(index)}
              className={cn(
                "col-span-3 grid grid-cols-subgrid items-center gap-x-3 rounded-md px-1 py-1 transition-opacity duration-200 -mx-1",
                active !== null && active !== index && "opacity-40"
              )}
            >
              <span className="text-muted-foreground truncate text-right text-sm">
                {stage.name}
              </span>
              <div className="bg-muted relative h-4 overflow-hidden rounded-full">
                <div
                  className="relative h-full rounded-full transition-[width] duration-500 ease-out"
                  style={{
                    width: `${Math.round(stage.share * 1000) / 10}%`,
                    minWidth: stage.icon && showIcons ? 16 : 4,
                    backgroundColor: stage.fill,
                    opacity: stage.opacity,
                  }}
                >
                  {stage.icon && showIcons ? (
                    <span className="text-background absolute inset-y-0 left-0 flex w-4 items-center justify-center [&>svg]:size-3">
                      {stage.icon}
                    </span>
                  ) : null}
                </div>
              </div>
              <span className="flex items-baseline justify-end gap-2 text-sm tabular-nums">
                <span className="font-medium">
                  {formatNumber(stage.value, { format, currency })}
                </span>
                <span className="text-muted-foreground w-9 text-right text-xs">
                  {percent(stage.share)}
                </span>
              </span>
            </div>
          ))}
        </div>
        {showTiles ? (
          <div className="grid grid-cols-2 gap-2 @xs/card:grid-cols-3">
            {stages.map((stage, index) => (
              <div
                key={stage.name}
                data-active={active === index || undefined}
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
                className={cn(
                  "flex min-w-0 flex-col gap-0.5 rounded-lg border px-2.5 py-2 transition-[opacity,border-color] duration-200",
                  active !== null && active !== index && "opacity-50",
                  active === index && "border-foreground/20"
                )}
              >
                <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
                  <span
                    aria-hidden="true"
                    className="size-2 shrink-0 rounded-full"
                    style={{ backgroundColor: stage.fill, opacity: stage.opacity }}
                  />
                  <span className="truncate">{stage.name}</span>
                </span>
                <span className="truncate text-sm font-semibold tabular-nums">
                  {formatNumber(stage.value, { format, currency })}
                </span>
              </div>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

export { StageBarsCard }
