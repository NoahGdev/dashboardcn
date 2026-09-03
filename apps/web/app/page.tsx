import Link from "next/link"
import { ArrowRight, Ellipsis, Gem, Hexagon, Triangle } from "lucide-react"

import { registryItemUrl } from "@/config/site"
import { buildAgentPrompt } from "@/lib/agent-prompt"
import { BLOCK_DOCS, COMPONENT_DOCS, docHref } from "@/lib/docs"
import { Button } from "@/components/ui/button"
import { BlockShowcase } from "@/components/block-showcase"
import { ShellCommand } from "@/components/install-command"
import { OpenInAgent } from "@/components/open-in-agent"
import { AllocationCard } from "@/registry/dashboardcn/blocks/allocation-card"
import { BreakdownCard } from "@/registry/dashboardcn/blocks/breakdown-card"
import { DistributionCard } from "@/registry/dashboardcn/blocks/distribution-card"
import { DotPlotCard } from "@/registry/dashboardcn/blocks/dot-plot-card"
import { DualMetricCard } from "@/registry/dashboardcn/blocks/dual-metric-card"
import { InsightCard } from "@/registry/dashboardcn/blocks/insight-card"

const url = registryItemUrl("kpi-card")

const menu = (
  <Button variant="outline" size="icon-sm" className="text-muted-foreground rounded-full">
    <Ellipsis />
    <span className="sr-only">More</span>
  </Button>
)

const showcase = [
  {
    name: "allocation-card",
    preview: (
      <AllocationCard
        title="Portfolio allocation"
        description="Share of assets under management currently held in equities."
        value={0.46}
        delta={0.034}
        deltaLabel="vs prior period"
        periods={[
          { value: "week", label: "Week" },
          { value: "month", label: "Month" },
          { value: "year", label: "Year" },
        ]}
        stat={{ label: "Equities exposure", value: "$4.7M" }}
        people={[
          { name: "shadcn", src: "https://github.com/shadcn.png" },
          { name: "Evil Rabbit", src: "https://github.com/evilrabbit.png" },
          { name: "Kai" },
        ]}
        peopleLabel="6 members"
      />
    ),
  },
  {
    name: "breakdown-card",
    preview: (
      <BreakdownCard
        title="Gross volume"
        action={menu}
        total={41_540}
        delta={0.15}
        items={[
          { name: "Online payments", value: 26_800, color: "var(--color-emerald-500)" },
          { name: "Subscriptions", value: 10_400, color: "var(--color-blue-500)" },
          { name: "In-store sales", value: 4_340, color: "var(--color-pink-500)" },
        ]}
      />
    ),
  },
  {
    name: "distribution-card",
    preview: (
      <DistributionCard
        title="Capital inflows"
        total={12_400_000}
        delta={390_000}
        valueLabel="Capital in"
        items={[
          { name: "WaveMark Capital", value: 7_928_400, icon: <Gem className="text-teal-500" />, color: "var(--color-teal-500)" },
          { name: "Envato Finances", value: 3_214_900, icon: <Hexagon className="text-amber-500" />, color: "var(--color-amber-500)" },
          { name: "QBridge Tech", value: 1_246_300, icon: <Triangle className="text-orange-500" />, color: "var(--color-orange-500)" },
        ]}
        options={[
          { value: "3", label: "Top 3 funds" },
          { value: "5", label: "Top 5 funds" },
        ]}
        defaultValue="3"
      />
    ),
  },
  {
    name: "dot-plot-card",
    preview: (
      <DotPlotCard
        title="Transactions"
        value={106_000}
        format="compact"
        data={[1, 1, 2, 1, 2, 4, 6, 4, 2, 1, 2, 1, 1, 1]}
        labels={["Sat", "Sun", "Mon", "Tue", "Tue", "Wed", "Wed", "Wed", "Thu", "Thu", "Fri", "Fri", "Sat", "Sat"]}
        delta={34_002}
        deltaLabel="vs last period"
        color="var(--color-green-600)"
        action={menu}
      />
    ),
  },
  {
    name: "dual-metric-card",
    preview: (
      <DualMetricCard
        title="Leads overview"
        options={[
          { value: "month", label: "This month" },
          { value: "quarter", label: "This quarter" },
          { value: "year", label: "This year" },
        ]}
        defaultValue="month"
        metrics={[
          {
            label: "New leads",
            value: 54,
            showShare: true,
            meter: "bar",
            color: "var(--color-violet-500)",
            detail: { label: "Top source", value: "LinkedIn" },
          },
          {
            label: "Returning leads",
            value: 198,
            meter: "ticks",
            color: "var(--color-emerald-500)",
            detail: { label: "Conversion rate", value: "12.8%" },
          },
        ]}
      />
    ),
  },
  {
    name: "insight-card",
    preview: (
      <InsightCard
        badge="Insights"
        size="md"
        interval={6000}
        items={[
          {
            value: 0.75,
            format: "percent",
            headline: "Authorization rate increased by 4% compared to last week.",
            description:
              "This improvement reduced failed transactions by 950 and is projected to recover $12,400.",
          },
          {
            value: 2.1,
            format: "currency",
            headline: "Average order value is up $2.10 since the checkout redesign.",
            description:
              "Bundled add-ons account for most of the lift, led by extended warranties.",
          },
          {
            value: 38,
            headline: "38 high-value customers have not ordered in 60 days.",
            description:
              "Together they made up 11% of revenue last quarter. A win-back offer is recommended.",
          },
        ]}
      />
    ),
  },
]

export default function Home() {
  return (
    <div className="container-wrapper flex flex-1 flex-col">
      <div className="container flex flex-col gap-16 py-12 lg:py-20">
        <section className="flex max-w-2xl flex-col gap-5">
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Dashboard components for shadcn/ui.
          </h1>
          <p className="text-muted-foreground text-lg text-balance">
            KPI cards, charts, funnels, tables, and the pieces around them.
            Built on the same foundations as shadcn/ui and installed the same
            way. You own the code.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" asChild>
              <Link href="/docs">
                Get started <ArrowRight />
              </Link>
            </Button>
            <Button size="sm" variant="ghost" asChild>
              <Link href="/docs/components">Browse components</Link>
            </Button>
          </div>
          <div className="max-w-xl">
            <ShellCommand
              npm={`npx shadcn@latest add ${url}`}
              yarn={`yarn dlx shadcn@latest add ${url}`}
              pnpm={`pnpm dlx shadcn@latest add ${url}`}
              bun={`bunx --bun shadcn@latest add ${url}`}
            />
          </div>
          <OpenInAgent prompt={buildAgentPrompt()} />
        </section>

        <section className="flex flex-col gap-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex max-w-2xl flex-col gap-1">
              <h2 className="text-xl font-semibold tracking-tight">Featured Blocks</h2>
              <p className="text-muted-foreground text-balance">
                Complete cards composed from the primitives. Drop one in and
                pass your data. Every block links to the components it is built
                from.
              </p>
            </div>
            <Button size="sm" variant="ghost" asChild>
              <Link href="/docs/blocks">
                All {BLOCK_DOCS.length} blocks <ArrowRight />
              </Link>
            </Button>
          </div>
          <BlockShowcase items={showcase} />
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-xl font-semibold tracking-tight">
              {COMPONENT_DOCS.length} components and counting
            </h2>
            <Button size="sm" variant="ghost" asChild>
              <Link href="/docs/components">
                Browse components <ArrowRight />
              </Link>
            </Button>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {COMPONENT_DOCS.map((doc) => (
              <li key={doc.name}>
                <Link
                  href={docHref(doc)}
                  className="hover:bg-muted/50 flex h-full flex-col gap-1 rounded-lg border p-4 transition-colors"
                >
                  <span className="font-medium">{doc.title}</span>
                  <span className="text-muted-foreground text-sm">
                    {doc.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
