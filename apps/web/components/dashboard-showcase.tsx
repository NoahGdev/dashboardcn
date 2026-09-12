"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { layoutBlocks } from "@/config/blocks"
import { cn } from "@/lib/utils"

const dashboards = layoutBlocks.filter((block) => block.category === "dashboard")

/**
 * A full dashboard layout rendered live at desktop size and scaled to fit,
 * with a segmented control to flip between the three layouts.
 */
export function DashboardShowcase() {
  const [active, setActive] = React.useState(dashboards[0]!.name)
  const [width, setWidth] = React.useState(0)
  const ref = React.useRef<HTMLDivElement>(null)
  const viewportWidth = 1280
  const viewportHeight = 860

  React.useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) => {
      if (entry && entry.contentRect.width > 0) setWidth(entry.contentRect.width)
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const scale = width ? width / viewportWidth : 1
  const current = dashboards.find((block) => block.name === active)!

  return (
    <div className="bg-surface rounded-md p-2 sm:p-3">
      <div className="flex flex-col items-center gap-4 px-2 pt-4 pb-2 sm:px-4">
        <div className="bg-ink-dark flex items-center gap-1 rounded-full p-1.5 shadow-[0_1px_1px_rgba(0,0,0,0.2),0_16px_40px_rgba(0,0,0,0.28)] ring-1 ring-white/8">
          {dashboards.map((block) => (
            <button
              key={block.name}
              type="button"
              aria-pressed={block.name === active}
              onClick={() => setActive(block.name)}
              className={cn(
                "relative cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition-colors duration-300",
                block.name === active ? "text-white" : "text-white/55 hover:text-white/85"
              )}
            >
              {block.name === active ? (
                <span className="absolute inset-0 rounded-full bg-white/15" />
              ) : null}
              <span className="relative">{block.title.replace(" dashboard", "")}</span>
            </button>
          ))}
        </div>
        <div className="bg-card w-full rounded-[10px] p-1 shadow-[0_1px_2px_rgba(0,0,0,0.06)] ring-1 ring-black/5 dark:ring-white/10">
          <div
            ref={ref}
            className="bg-background relative w-full overflow-hidden rounded-sm"
            style={{ height: Math.round(viewportHeight * scale) }}
          >
            {width > 0
              ? dashboards.map((block) => (
                  <iframe
                    key={block.name}
                    loading="lazy"
                    src={`/preview/${block.name}`}
                    title={block.title}
                    hidden={block.name !== active}
                    className="absolute top-0 left-0 origin-top-left border-0"
                    style={{ width: viewportWidth, height: viewportHeight, transform: `scale(${scale})` }}
                  />
                ))
              : null}
          </div>
        </div>
        <div className="flex w-full flex-wrap items-center justify-between gap-3 px-1 pt-1">
          <p className="text-muted-foreground text-sm">{current.description}</p>
          <Link
            href={`/blocks/dashboard#${current.name}`}
            className="hover:text-foreground text-muted-foreground inline-flex items-center gap-1 text-sm transition-colors"
          >
            Install this layout <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
