import Link from "next/link"
import {
  Activity,
  ArrowRight,
  BarChart3,
  Filter,
  Gauge,
  Gem,
  Grid3x3,
  Hexagon,
  KeyRound,
  LayoutGrid,
  ListOrdered,
  ScrollText,
  Sparkles,
  Table2,
  TrendingUp,
  Triangle,
  type LucideIcon,
} from "lucide-react"

import { siteConfig } from "@/config/site"
import { buildAgentPrompt } from "@/lib/agent-prompt"
import { faqJsonLd } from "@/lib/seo"
import { BLOCK_DOCS, COMPONENT_DOCS, docHref } from "@/lib/docs"
import { Button } from "@/components/ui/button"
import { BlockShowcase } from "@/components/block-showcase"
import { FaqAccordion } from "@/components/faq-accordion"
import { JsonLd } from "@/components/json-ld"
import { OpenInAgent } from "@/components/open-in-agent"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { AllocationCard } from "@/registry/dashboardcn/blocks/allocation-card"
import { BreakdownCard } from "@/registry/dashboardcn/blocks/breakdown-card"
import { DistributionCard } from "@/registry/dashboardcn/blocks/distribution-card"
import { DotPlotCard } from "@/registry/dashboardcn/blocks/dot-plot-card"
import { DualMetricCard } from "@/registry/dashboardcn/blocks/dual-metric-card"
import { FunnelChartCard } from "@/registry/dashboardcn/blocks/funnel-chart-card"
import { InsightCard } from "@/registry/dashboardcn/blocks/insight-card"
import { PeriodBarChartCard } from "@/registry/dashboardcn/blocks/period-bar-chart-card"
import { KpiCard } from "@/registry/dashboardcn/ui/kpi-card"

const faq = [
  {
    question: "Is dashboardcn free?",
    answer:
      "Yes. Every component and block is MIT licensed, with no Pro tier, no license key, and no account. You can use it in commercial products and redistribute the source.",
  },
  {
    question: "How is it different from shadcn/ui?",
    answer:
      "shadcn/ui covers the base primitives: buttons, dialogs, forms, and the chart wrapper. dashboardcn adds the data components a dashboard needs, such as KPI cards, trend and composed charts, funnels, gauges, heatmaps, and a full data table, built on those same primitives and installed with the same CLI.",
  },
  {
    question: "How is it different from BoardUI or Tremor?",
    answer:
      "BoardUI and Tremor are complete design systems with their own tokens and primitives. dashboardcn only ships dashboard components and uses your existing shadcn/ui theme, so the pieces look like the rest of your app. BoardUI sells its Pro components; dashboardcn is entirely free.",
  },
  {
    question: "Does it work with Base UI as well as Radix?",
    answer:
      "Yes. Components that render only HTML and CSS work with either flavor of shadcn/ui, and components that depend on shadcn primitives pull the flavor your project already uses.",
  },
  {
    question: "Do I need Next.js?",
    answer:
      "No. The components are plain React with Tailwind CSS v4 and work in any project where the shadcn CLI works, including Vite, Remix, and Next.js.",
  },
  {
    question: "Can coding agents use it?",
    answer:
      "Yes. Every docs page is available as Markdown, llms.txt indexes them, and there is a skill that teaches an agent how to pick, install, and compose the components. shadcn's MCP server can install from the registry once the namespace is registered.",
  },
  {
    question: "What happens when a component is updated?",
    answer:
      "Nothing, unless you want it to. The source is copied into your project, so there is no package to bump and nothing changes underneath you. Run the install command again to pull the newer version over the old file.",
  },
]

const menu = (
  <Button variant="outline" size="icon-sm" className="text-muted-foreground">
    <span className="text-lg leading-none">···</span>
    <span className="sr-only">More</span>
  </Button>
)

const funnelColors = {
  opened: "var(--color-lime-400)",
  started: "var(--color-blue-500)",
  completed: "var(--color-violet-500)",
  converted: "var(--color-pink-500)",
}

const funnelRanges = [
  {
    value: "7d",
    label: "Last 7 days",
    delta: 0.052,
    steps: [
      { name: "Link opened", value: 197, color: funnelColors.opened },
      { name: "Started", value: 110, color: funnelColors.started },
      { name: "Completed", value: 77, color: funnelColors.completed },
      { name: "Converted", value: 38, color: funnelColors.converted },
    ],
  },
  {
    value: "30d",
    label: "Last 30 days",
    delta: 0.118,
    steps: [
      { name: "Link opened", value: 842, color: funnelColors.opened },
      { name: "Started", value: 512, color: funnelColors.started },
      { name: "Completed", value: 301, color: funnelColors.completed },
      { name: "Converted", value: 129, color: funnelColors.converted },
    ],
  },
]

const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"]
const spending = months.flatMap((month, m) =>
  Array.from({ length: 4 }, (_, w) => ({
    week: `${month} week ${w + 1}`,
    month,
    spend: month === "Mar" ? 1_900 + w * 470 : 800 + Math.round(Math.abs(Math.sin(m * 4 + w)) * 600),
  }))
)

const dotPlotCard = (
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
)

const dualMetricCard = (
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
    name: "funnel-chart-card",
    preview: (
      <FunnelChartCard
        className="w-full"
        title="Sign-up funnel"
        deltaLabel="vs previous period"
        ranges={funnelRanges}
      />
    ),
  },
  {
    name: "period-bar-chart-card",
    preview: (
      <PeriodBarChartCard
        className="w-full"
        title="Spending"
        data={spending}
        xKey="week"
        yKey="spend"
        groupKey="month"
        valueLabel="spending"
        color="var(--color-orange-500)"
        grid="none"
        defaultSelected="Mar"
        ranges={[
          { value: "6m", label: "6M", points: 24 },
          { value: "3m", label: "3M", points: 12 },
          { value: "1m", label: "1M", points: 4 },
        ]}
        defaultRange="6m"
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

/** Icon and tint per component, so the grid reads like a feature list. */
const componentMeta: Record<string, { icon: LucideIcon; color: string }> = {
  "kpi-card": { icon: TrendingUp, color: "#0ea5e9" },
  "trend-chart": { icon: Activity, color: "#f97316" },
  "data-table": { icon: Table2, color: "#8b5cf6" },
  "funnel-chart": { icon: Filter, color: "#10b981" },
  "bar-chart": { icon: BarChart3, color: "#e11d48" },
  "radial-gauge": { icon: Gauge, color: "#6366f1" },
  "activity-heatmap": { icon: Grid3x3, color: "#14b8a6" },
  "bar-list": { icon: ListOrdered, color: "#e234a2" },
  "composed-chart": { icon: LayoutGrid, color: "#f59e0b" },
}

const featured = Object.keys(componentMeta)
  .map((name) => COMPONENT_DOCS.find((doc) => doc.name === name))
  .filter((doc): doc is NonNullable<typeof doc> => Boolean(doc))

const included = [
  `${COMPONENT_DOCS.length} components`,
  `${BLOCK_DOCS.length} composed blocks`,
  "Markdown docs and llms.txt",
  "Radix or Base UI",
  "MIT license, commercial use included",
]

const reasons = [
  {
    icon: KeyRound,
    color: "#e11d48",
    title: "How it usually works",
    text: "Dashboard kits sell the good parts. The free tier is a teaser, the charts and tables sit behind a Pro plan, and the license key decides how many projects you may use them in.",
  },
  {
    icon: ScrollText,
    color: "#10b981",
    title: "Why we bother",
    text: "shadcn/ui set the expectation that user interface code should be free. dashboardcn extends that to the data-heavy parts of a product, which is where the paywalls usually start.",
  },
]

export default function Home() {
  return (
    <div className="container-page flex flex-1 flex-col">
      <JsonLd data={faqJsonLd(faq)} />

      {/* Hero */}
      <div className="relative flex flex-col">
        <div className="relative pt-6 sm:pt-10">
          <div className="mx-auto mt-7 max-w-4xl text-center">
            <Reveal delay={80}>
              <h1 className="text-[#454545] text-3xl leading-[1.1] font-medium tracking-tight text-balance sm:text-6xl sm:leading-[1.06] dark:text-foreground/85">
                Dashboard components,{" "}
                <span className="text-primary">built for shadcn/ui</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-muted-foreground mx-auto mt-5 max-w-2xl text-lg leading-7 text-pretty sm:text-2xl sm:leading-8">
                KPI cards, charts, funnels and tables, installed with the CLI{" "}
                <span className="bg-primary/10 text-primary rounded-2xl px-1 py-0.5 box-decoration-clone">
                  so you own the code
                </span>
                . Free, MIT licensed, no Pro tier.
              </p>
              <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
                <Button size="lg" className="group sm:pr-1.5 sm:pl-4" asChild>
                  <Link href="/docs/installation">
                    Get started
                    <span className="relative ml-1 hidden size-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-2 sm:inline-flex">
                      <ArrowRight className="text-primary size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/docs/components">Browse components</Link>
                </Button>
              </div>
              <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 [&>div>div]:justify-center [&>div>p]:text-center">
                <OpenInAgent prompt={buildAgentPrompt()} />
              </div>
            </Reveal>
          </div>
        </div>

        {/* Hero bento */}
        <Reveal delay={240} className="mt-12 lg:mt-16 xl:-mx-8 min-[90rem]:-mx-24">
          <ul className="grid gap-4 sm:gap-6 lg:grid-cols-3">
            <li className="group bg-surface relative flex min-w-0 flex-col overflow-hidden rounded-2xl p-6 sm:p-8">
              <div inert className="relative flex h-52 flex-col gap-3 overflow-hidden pt-1 mask-[linear-gradient(to_bottom,#000_62%,transparent_97%)] sm:h-60">
                <KpiCard label="Revenue" value={84_120} format="currency" delta={0.124} deltaLabel="vs. last 30 days" trend={[42, 48, 45, 52, 58, 55, 61, 67, 64, 72, 78, 84]} />
                <KpiCard label="Active users" value={1_305} format="compact" delta={0.004} deltaLabel="vs. last 30 days" trend={[1200, 1260, 1250, 1300, 1310, 1290, 1280, 1300, 1295, 1310, 1300, 1305]} />
              </div>
              <p className="mt-3 text-lg font-medium tracking-tight" style={{ color: "#e234a2" }}>KPI cards</p>
              <p className="mt-2.5 text-lg leading-7 tracking-tight">Value, delta and sparkline in one card, formatted for currency, percent or counts.</p>
            </li>
            <li className="group bg-surface relative flex min-w-0 flex-col overflow-hidden rounded-2xl p-6 sm:p-8">
              <div inert className="relative flex h-52 flex-col justify-center overflow-hidden pt-1 sm:h-60">
                {dotPlotCard}
              </div>
              <p className="mt-3 text-lg font-medium tracking-tight" style={{ color: "#305dde" }}>Distribution cards</p>
              <p className="mt-2.5 text-lg leading-7 tracking-tight">A big number, the shape of the week behind it, and the peak called out.</p>
            </li>
            <li className="group bg-surface relative flex min-w-0 flex-col overflow-hidden rounded-2xl p-6 sm:p-8">
              <div inert className="relative flex h-52 flex-col justify-center overflow-hidden pt-1 [mask-image:linear-gradient(to_bottom,#000_75%,transparent_98%)]` can be written as `mask-[linear-gradient(to_bottom,#000_75%,transparent_98%)] sm:h-60">
                {dualMetricCard}
              </div>
              <p className="mt-3 text-lg font-medium tracking-tight" style={{ color: "#14b8a6" }}>Paired metrics</p>
              <p className="mt-2.5 text-lg leading-7 tracking-tight">Two numbers side by side, each with its meter, its share, and one supporting fact.</p>
            </li>
          </ul>
        </Reveal>
      </div>

      {/* Blocks */}
      <section id="blocks" className="scroll-mt-16">
        <div className="py-12 sm:py-16">
          <Reveal className="px-4 sm:px-6">
            <SectionHeading muted="Drop one in and pass your data.">
              Complete cards, composed from the primitives.
            </SectionHeading>
          </Reveal>
          <Reveal delay={120} className="mt-12 sm:mt-16">
            <BlockShowcase items={showcase} />
          </Reveal>
          <Reveal delay={160} className="mt-8 flex justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link href="/docs/blocks">
                All {BLOCK_DOCS.length} blocks <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Components */}
      <section id="components" className="scroll-mt-16">
        <div className="py-12 sm:py-16">
          <Reveal className="px-4 sm:px-6">
            <SectionHeading muted="and none of it costs extra.">
              {COMPONENT_DOCS.length} components and counting,
            </SectionHeading>
          </Reveal>
          <Reveal delay={120} className="mt-12 sm:mt-16">
            <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {featured.map((doc) => {
                const meta = componentMeta[doc.name]!
                const Icon = meta.icon
                return (
                  <li key={doc.name} className="bg-surface relative flex min-w-0 flex-col rounded-2xl p-6 sm:p-8">
                    <span className="bg-card flex size-10 items-center justify-center rounded-full">
                      <Icon className="size-4.5" style={{ color: meta.color }} />
                    </span>
                    <Link
                      href={docHref(doc)}
                      className="mt-3 text-lg font-medium tracking-tight after:absolute after:inset-0 after:content-['']"
                      style={{ color: meta.color }}
                    >
                      {doc.title}
                    </Link>
                    <p className="text-muted-foreground mt-2.5 text-lg leading-7 tracking-tight">{doc.description}</p>
                  </li>
                )
              })}
            </ul>
          </Reveal>
          <Reveal delay={160} className="mt-8 flex justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link href="/docs/components">
                Browse all {COMPONENT_DOCS.length} components <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Why free */}
      <section id="why" className="scroll-mt-16">
        <div className="py-12 sm:py-16">
          <Reveal className="px-4 sm:px-6">
            <SectionHeading muted="All of it.">User interface code should be free.</SectionHeading>
          </Reveal>
          <Reveal delay={120} className="mt-12 sm:mt-16">
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-start">
              <div className="bg-surface flex min-w-0 flex-col justify-between rounded-2xl p-6 sm:p-8">
                <div className="space-y-5 text-xl leading-8 tracking-tight sm:text-2xl sm:leading-9">
                  <p>
                    This project started from a gap. When building a product dashboard, there was no obvious
                    place to find components for presenting data well: KPI tiles, trend charts, funnels, ranked
                    lists, and the cards that combine them.{" "}
                    <span className="bg-primary/10 text-primary rounded-2xl px-1 py-0.5 box-decoration-clone">
                      Where such collections existed, they were sold behind a license.
                    </span>
                  </p>
                  <p className="text-muted-foreground">
                    shadcn/ui set the expectation that the base primitives are free. {siteConfig.name} extends
                    it to the data-heavy parts of a product. Everything here is MIT licensed, copied into your
                    project as source, and yours to change.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-2">
                  <Button asChild>
                    <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
                      Read the source on GitHub
                    </a>
                  </Button>
                  <Button variant="secondary" asChild>
                    <Link href="/docs">Read the docs</Link>
                  </Button>
                </div>
              </div>
              <ul className="grid gap-4 sm:gap-6">
                {reasons.map((reason) => {
                  const Icon = reason.icon
                  return (
                    <li key={reason.title} className="bg-surface flex min-w-0 flex-col rounded-2xl p-6 sm:p-8">
                      <span className="bg-card flex size-10 items-center justify-center rounded-full">
                        <Icon className="size-4.5" style={{ color: reason.color }} />
                      </span>
                      <p className="mt-3 text-lg font-medium tracking-tight" style={{ color: reason.color }}>
                        {reason.title}
                      </p>
                      <p className="text-muted-foreground mt-2.5 text-base leading-6 tracking-tight">{reason.text}</p>
                    </li>
                  )
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-16">
        <div className="py-12 sm:py-16">
          <Reveal className="px-4 sm:px-6">
            <SectionHeading muted="We will never charge for it.">Free forever.</SectionHeading>
          </Reveal>
          <Reveal delay={120} className="mx-auto mt-12 w-full max-w-md sm:mt-16">
            <div className="bg-surface flex flex-col rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-foreground/70">Everything</span>
                <span className="eyebrow">One plan</span>
              </div>
              <p className="mt-6 flex items-baseline gap-1">
                <span className="text-6xl font-medium tracking-tight tabular-nums">$0</span>
                <span className="text-muted-foreground text-sm">forever</span>
              </p>
              <p className="text-muted-foreground mt-3 text-base leading-6 tracking-tight">
                No Pro tier, no license key, no seat count, no account. Not now, not later.
              </p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {included.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="bg-primary size-2 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button className="mt-8 w-full" size="lg" asChild>
                <Link href="/docs/installation">Install a component</Link>
              </Button>
              <p className="text-muted-foreground mt-3 text-center text-xs">
                Star the repo if it saves you a week. That is the whole price.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-16">
        <div className="py-12 sm:py-16">
          <Reveal className="px-4 sm:px-6">
            <SectionHeading muted="before they install.">What people ask</SectionHeading>
          </Reveal>
          <Reveal delay={120} className="mx-auto mt-12 w-full max-w-2xl sm:mt-16">
            <FaqAccordion items={faq} />
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section
        id="get-started"
        className="bg-ink-dark mb-4 scroll-mt-16 overflow-hidden rounded-2xl border border-[#8f8f8f]/25 p-2 sm:p-3"
      >
        <div className="flex flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-14">
          <Reveal>
            <span aria-hidden className="flex size-24 items-center justify-center rounded-full bg-white/8 ring-1 ring-white/10">
              <Sparkles className="size-9 text-white/80" />
            </span>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-8 select-none max-w-4xl text-3xl font-normal tracking-tight text-balance text-white sm:text-4xl">
              Your next dashboard is one command away.{" "}
              <span className="text-white/55">The source is yours to keep.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <Button
              size="lg"
              variant="outline"
              className="bg-ink-dark mt-8 border-white/25 text-white shadow-none hover:bg-[#3a3a3f] hover:text-white"
              asChild
            >
              <Link href="/docs/installation">
                Install your first component <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
