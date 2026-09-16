import Link from "next/link"
import { ArrowDown, ArrowUpRight } from "lucide-react"

import { pageMetadata } from "@/lib/seo"
import { BLOCK_DOCS, docHref } from "@/lib/docs"
import { cn } from "@/lib/utils"
import { examples } from "@/registry/dashboardcn/examples"

export const metadata = pageMetadata({
  title: "Explore blocks",
  description: "Scroll through every dashboardcn block in one live gallery.",
  path: "/explore",
})

const wideBlocks = new Set([
  "balance-chart-card",
  "contributions-card",
  "data-table-card",
  "funnel-chart-card",
  "heatmap-chart-card",
  "kpi-row-card",
  "metric-tabs-chart-card",
  "period-bar-chart-card",
])

const accentColors = [
  "#2f5bff",
  "#e234a2",
  "#14b8a6",
  "#f97316",
  "#8b5cf6",
  "#10b981",
]

export default function ExplorePage() {
  return (
    <div className="container-page flex flex-1 flex-col pb-8 sm:pb-12">
      <header className="border-border/70 grid gap-10 border-b py-14 sm:py-20 lg:grid-cols-[1fr_22rem] lg:items-end lg:py-24">
        <div>
          <p className="eyebrow">
            Block library <span className="text-foreground/35 px-1.5">/</span>{" "}
            {BLOCK_DOCS.length} live previews
          </p>
          <h1 className="mt-5 max-w-4xl text-5xl leading-[0.95] font-medium tracking-[-0.05em] text-balance sm:text-7xl lg:text-[5.5rem]">
            Explore every block.
          </h1>
        </div>
        <div className="lg:pb-1">
          <p className="text-muted-foreground text-lg leading-7 tracking-tight text-pretty">
            The whole collection in one place. No categories to open and no
            pages to step through—just scroll until something fits.
          </p>
          <a
            href="#all-blocks"
            className="group mt-6 inline-flex items-center gap-2 text-sm font-medium"
          >
            Start exploring
            <span className="bg-foreground text-background flex size-7 items-center justify-center rounded-full">
              <ArrowDown className="size-3.5 transition-transform group-hover:translate-y-0.5" />
            </span>
          </a>
        </div>
      </header>

      <main id="all-blocks" className="scroll-mt-20 pt-5 sm:pt-8">
        <div className="mb-5 flex items-center justify-between sm:mb-8">
          <p className="text-sm font-medium">All blocks</p>
          <p className="text-muted-foreground font-mono text-xs tabular-nums">
            {String(BLOCK_DOCS.length).padStart(2, "0")} / {String(BLOCK_DOCS.length).padStart(2, "0")}
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-x-4 gap-y-12 sm:gap-x-6 sm:gap-y-16 lg:grid-cols-12">
          {BLOCK_DOCS.map((doc, index) => {
            const primaryExample = doc.examples[0]
            if (!primaryExample) return null
            const example = examples[primaryExample.name]
            const Preview = example.component
            const wide = wideBlocks.has(doc.name)

            return (
              <li
                key={doc.name}
                id={doc.name}
                className={cn("scroll-mt-24 lg:col-span-6", wide && "lg:col-span-12")}
              >
                <article className="group flex h-full flex-col">
                  <div className="mb-3 flex items-center justify-between gap-4 px-1">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span
                        aria-hidden
                        className="h-1.5 w-5 shrink-0 rounded-full"
                        style={{ backgroundColor: accentColors[index % accentColors.length] }}
                      />
                      <h2 className="truncate text-sm font-medium tracking-tight">{doc.title}</h2>
                    </div>
                    <Link
                      href={docHref(doc)}
                      aria-label={`View ${doc.title} documentation`}
                      className="text-muted-foreground hover:text-foreground relative z-10 flex shrink-0 items-center gap-1 text-xs transition-colors"
                    >
                      View docs
                      <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>

                  <div
                    className={cn(
                      "bg-surface flex min-h-[22rem] flex-1 items-center justify-center overflow-hidden rounded-2xl p-3 sm:p-7",
                      wide && "lg:min-h-[30rem] lg:p-10"
                    )}
                  >
                    <div className={cn("flex w-full justify-center", wide && "mx-auto max-w-5xl")}>
                      <Preview />
                    </div>
                  </div>

                  <p className="text-muted-foreground mt-3 max-w-2xl px-1 text-sm leading-6">
                    {doc.description}
                  </p>
                </article>
              </li>
            )
          })}
        </ul>
      </main>

      <div className="border-border mt-20 flex flex-col items-start justify-between gap-5 border-t pt-7 sm:flex-row sm:items-center">
        <p className="max-w-xl text-xl font-medium tracking-tight">
          Found the right shape? Every block is copied into your project as source.
        </p>
        <Link
          href="/docs/installation"
          className="bg-foreground text-background inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-medium"
        >
          Get started <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </div>
  )
}
