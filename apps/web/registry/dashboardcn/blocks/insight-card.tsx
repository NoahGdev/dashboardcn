"use client"

import * as React from "react"
import { Lightbulb } from "lucide-react"

import { cn } from "@/lib/utils"
import { formatNumber, type NumberFormat } from "@/registry/dashboardcn/lib/format"
import { Card } from "@/components/ui/card"

export type InsightCardVariant =
  | "aurora"
  | "sunset"
  | "ocean"
  | "graphite"
  | "plain"

export interface InsightItem {
  /** The big number. Formatted when numeric. */
  value: number | string
  format?: NumberFormat
  currency?: string
  /** One-sentence takeaway under the number. */
  headline: string
  /** Supporting detail under the headline. */
  description?: React.ReactNode
}

export interface InsightCardProps
  extends Omit<React.ComponentProps<typeof Card>, "title"> {
  /** Pill label in the top-left, e.g. "Insights". */
  badge?: string
  /** Icon inside the badge. Defaults to a lightbulb. */
  icon?: React.ReactNode
  /** Slot in the top-right corner, e.g. a menu button. */
  action?: React.ReactNode
  /** Background style. "plain" uses the card colors. */
  variant?: InsightCardVariant
  /** One or more insights. More than one shows a pager at the bottom. */
  items: InsightItem[]
  /** Controlled index of the visible insight. */
  index?: number
  defaultIndex?: number
  onIndexChange?: (index: number) => void
  /** Milliseconds between automatic advances. Omit to disable. */
  interval?: number
  /** Size of the big number. */
  size?: "md" | "lg"
  /** Draws the folded light band and thin stroke over the gradient. */
  decoration?: boolean
}

const variants: Record<
  Exclude<InsightCardVariant, "plain">,
  { background: string; scrim: string }
> = {
  aurora: {
    background: [
      "radial-gradient(90% 55% at 88% 6%, #f7cfa9 0%, transparent 60%)",
      "radial-gradient(70% 55% at 104% 48%, #f4dc95 0%, transparent 60%)",
      "radial-gradient(75% 60% at 52% 34%, #fff5e8 0%, transparent 60%)",
      "radial-gradient(110% 75% at 2% 106%, #2b5ad4 0%, transparent 62%)",
      "linear-gradient(165deg, #d4dcee 0%, #a9bfe9 38%, #5f88df 72%, #3a67d4 100%)",
    ].join(", "),
    scrim: "linear-gradient(to top, rgba(18, 36, 96, 0.45), rgba(18, 36, 96, 0.08) 45%, transparent 70%)",
  },
  sunset: {
    background: [
      "radial-gradient(85% 55% at 90% 8%, #ffe1b8 0%, transparent 60%)",
      "radial-gradient(70% 55% at 100% 50%, #ffb38a 0%, transparent 60%)",
      "radial-gradient(75% 60% at 50% 36%, #fff0e6 0%, transparent 58%)",
      "radial-gradient(110% 75% at 0% 108%, #5a2fb0 0%, transparent 62%)",
      "linear-gradient(165deg, #f8d3c4 0%, #f29a9f 40%, #b9569e 72%, #6c3aa9 100%)",
    ].join(", "),
    scrim: "linear-gradient(to top, rgba(60, 16, 80, 0.45), rgba(60, 16, 80, 0.08) 45%, transparent 70%)",
  },
  ocean: {
    background: [
      "radial-gradient(85% 55% at 90% 8%, #d7f8ef 0%, transparent 60%)",
      "radial-gradient(70% 55% at 102% 50%, #a6ecd6 0%, transparent 60%)",
      "radial-gradient(75% 60% at 50% 36%, #f2fffb 0%, transparent 58%)",
      "radial-gradient(110% 75% at 0% 108%, #0f4c8a 0%, transparent 62%)",
      "linear-gradient(165deg, #cfeee6 0%, #6fd3c0 40%, #2a9cae 72%, #1a5f9c 100%)",
    ].join(", "),
    scrim: "linear-gradient(to top, rgba(8, 40, 72, 0.45), rgba(8, 40, 72, 0.08) 45%, transparent 70%)",
  },
  graphite: {
    background: [
      "radial-gradient(85% 55% at 90% 8%, rgba(255,255,255,0.22) 0%, transparent 60%)",
      "radial-gradient(75% 60% at 52% 34%, rgba(255,255,255,0.16) 0%, transparent 58%)",
      "radial-gradient(110% 75% at 0% 108%, #050506 0%, transparent 62%)",
      "linear-gradient(165deg, #5a5a60 0%, #3a3a40 40%, #232327 72%, #131316 100%)",
    ].join(", "),
    scrim: "linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.08) 45%, transparent 70%)",
  },
}

/** A hero card with a badge, a very large number, a headline, and a paged set of insights over a soft gradient. */
function InsightCard({
  badge = "Insights",
  icon = <Lightbulb />,
  action,
  variant = "aurora",
  items,
  index,
  defaultIndex = 0,
  onIndexChange,
  interval,
  size = "lg",
  decoration = true,
  className,
  ...props
}: InsightCardProps) {
  const id = React.useId()
  const [internal, setInternal] = React.useState(defaultIndex)
  const active = Math.min(items.length - 1, Math.max(0, index ?? internal))
  const [paused, setPaused] = React.useState(false)

  const select = React.useCallback(
    (next: number) => {
      if (index === undefined) setInternal(next)
      onIndexChange?.(next)
    },
    [index, onIndexChange]
  )

  React.useEffect(() => {
    if (!interval || paused || items.length < 2) return
    const timer = window.setInterval(() => {
      select((active + 1) % items.length)
    }, interval)
    return () => window.clearInterval(timer)
  }, [interval, paused, items.length, active, select])

  const item = items[active]
  if (!item) return null
  const plain = variant === "plain"
  const palette = plain ? null : variants[variant]
  const display =
    typeof item.value === "number"
      ? formatNumber(item.value, {
          format: item.format,
          currency: item.currency,
          maximumFractionDigits: item.format === "percent" ? 0 : undefined,
        })
      : item.value

  return (
    <Card
      data-slot="insight-card"
      data-variant={variant}
      className={cn(
        "@container/card relative isolate min-h-96 gap-0 overflow-hidden py-0",
        plain ? "" : "border-transparent text-white",
        className
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      {...props}
    >
      {palette ? (
        <>
          <div
            aria-hidden
            className="absolute inset-0 -z-20"
            style={{ backgroundImage: palette.background }}
          />
          {decoration ? (
            <svg
              aria-hidden
              className="absolute inset-0 -z-10 size-full"
              viewBox="0 0 400 480"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="26" />
                </filter>
              </defs>
              <path
                d="M 250 -40 L 250 200 L 440 400"
                stroke="rgba(255,255,255,0.75)"
                strokeWidth="64"
                strokeLinejoin="round"
                filter={`url(#${id}-blur)`}
              />
              <path
                d="M 250 -40 L 250 200 L 440 400"
                stroke="rgba(255,255,255,0.28)"
                strokeWidth="1"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M 310 -40 L 310 130 L 470 300"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth="1"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          ) : null}
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{ backgroundImage: palette.scrim }}
          />
        </>
      ) : null}

      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="flex items-start justify-between gap-3">
          {badge ? (
            <span
              className={cn(
                "inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-sm font-medium [&>svg]:size-4",
                plain
                  ? "bg-muted text-foreground"
                  : "bg-white/75 text-neutral-900 shadow-sm backdrop-blur-sm"
              )}
            >
              {icon}
              {badge}
            </span>
          ) : (
            <span />
          )}
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>

        <div
          key={active}
          className="mt-auto flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500"
        >
          <span
            className={cn(
              "font-semibold leading-none tracking-tighter tabular-nums",
              size === "lg" ? "text-7xl @sm/card:text-8xl" : "text-5xl @sm/card:text-6xl"
            )}
          >
            {display}
          </span>
          <p className="text-xl leading-snug font-semibold text-balance @sm/card:text-2xl">
            {item.headline}
          </p>
          {item.description ? (
            <p className={cn("text-sm leading-relaxed", plain ? "text-muted-foreground" : "text-white/85")}>
              {item.description}
            </p>
          ) : null}
        </div>

        {items.length > 1 ? (
          <div className="flex gap-1.5" role="tablist" aria-label={badge || "Insights"}>
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Insight ${i + 1} of ${items.length}`}
                onClick={() => select(i)}
                className="group/dot flex h-4 flex-1 cursor-pointer items-center"
              >
                <span
                  className={cn(
                    "h-1 w-full rounded-full transition-colors",
                    plain
                      ? i === active
                        ? "bg-foreground"
                        : "bg-muted-foreground/30 group-hover/dot:bg-muted-foreground/60"
                      : i === active
                        ? "bg-white"
                        : "bg-white/40 group-hover/dot:bg-white/70"
                  )}
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </Card>
  )
}

export { InsightCard }
