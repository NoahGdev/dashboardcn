import type { ExampleName } from "@/registry/dashboardcn/examples"

export interface ComponentExample {
  name: ExampleName
  title?: string
  description?: string
}

export interface ComponentDoc {
  /** Registry item name and URL slug. */
  name: string
  /** Blocks are composed cards; components are primitives. */
  kind?: "component" | "block"
  title: string
  description: string
  examples: ComponentExample[]
  usage: string
}

export const componentDocs: ComponentDoc[] = [
  {
    name: "kpi-card",
    title: "KPI Card",
    description:
      "A metric card with value, period-over-period delta, and an optional sparkline.",
    examples: [{ name: "kpi-card-demo" }],
    usage: `import { KpiCard } from "@/components/ui/kpi-card"

<KpiCard
  label="Revenue"
  value={84120}
  format="currency"
  delta={0.124}
  deltaLabel="vs. last 30 days"
  trend={[42, 48, 45, 52, 58, 61, 67, 72, 78, 84]}
/>`,
  },
  {
    name: "trend-chart",
    title: "Trend Chart",
    description:
      "Area, line, or bar chart over time with tooltips and legend, built on shadcn's chart primitives.",
    examples: [
      { name: "trend-chart-demo" },
      {
        name: "trend-chart-line-demo",
        title: "Line",
        description: "Set type to \"line\" and show the y-axis with a unit formatter.",
      },
      {
        name: "trend-chart-bar-demo",
        title: "Stacked bars",
        description: "Bars stack when stacked is set. Negative values stack downward.",
      },
    ],
    usage: `import { TrendChart } from "@/components/ui/trend-chart"

<TrendChart
  data={data}
  xKey="date"
  series={[
    { key: "desktop", label: "Desktop" },
    { key: "mobile", label: "Mobile" },
  ]}
  showLegend
/>`,
  },
  {
    name: "bar-chart",
    title: "Bar Chart",
    description:
      "A single-series bar chart with gradient or striped fills, highlighted bars, and a hover marker.",
    examples: [
      { name: "bar-chart-demo" },
      {
        name: "bar-chart-striped-demo",
        title: "Striped",
        description: "Set variant to \"striped\" for diagonal bands. mutedColor defaults to gray; pass the bar color for a tint of the same hue.",
      },
    ],
    usage: `import { BarChart } from "@/components/ui/bar-chart"

<BarChart
  data={data}
  xKey="week"
  yKey="spend"
  groupKey="month"
  color="var(--color-orange-500)"
  highlight={(row) => row.month === "Mar"}
  yFormatter={(value) => formatNumber(value, { format: "currency" })}
/>`,
  },
  {
    name: "data-table",
    title: "Data Table",
    description:
      "A sortable, filterable, paginated table with column visibility, built on TanStack Table v9.",
    examples: [{ name: "data-table-demo" }],
    usage: `import {
  DataTable,
  DataTableColumnHeader,
  createDataTableColumnHelper,
} from "@/components/ui/data-table"

const helper = createDataTableColumnHelper<Row>()

const columns = helper.columns([
  helper.accessor("path", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Page" />,
  }),
  helper.accessor("views", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Views" align="right" />
    ),
    cell: ({ row }) => <div className="text-right">{row.original.views}</div>,
  }),
])

<DataTable columns={columns} data={rows} searchKey="path" />`,
  },
  {
    name: "funnel-chart",
    title: "Funnel Chart",
    description:
      "Step-by-step conversion with drop-off between steps and overall conversion.",
    examples: [{ name: "funnel-chart-demo" }],
    usage: `import { FunnelChart } from "@/components/ui/funnel-chart"

<FunnelChart
  steps={[
    { name: "Visited pricing", value: 12480 },
    { name: "Started signup", value: 4920 },
    { name: "Upgraded to Pro", value: 412 },
  ]}
/>`,
  },
  {
    name: "bar-list",
    title: "Bar List",
    description:
      "A ranked list with proportional bars, for top pages, referrers, or countries.",
    examples: [{ name: "bar-list-demo" }],
    usage: `import { BarList } from "@/components/ui/bar-list"

<BarList
  data={[
    { name: "/", value: 48210, href: "/analytics?page=/" },
    { name: "/pricing", value: 21480 },
  ]}
  showPercentage
/>`,
  },
  {
    name: "distribution-bar",
    title: "Distribution Bar",
    description:
      "A single stacked bar showing how a total splits across categories.",
    examples: [{ name: "distribution-bar-demo" }],
    usage: `import { DistributionBar } from "@/components/ui/distribution-bar"

<DistributionBar
  segments={[
    { name: "Desktop", value: 61400 },
    { name: "Mobile", value: 34200 },
    { name: "Tablet", value: 4100 },
  ]}
/>`,
  },
  {
    name: "activity-heatmap",
    title: "Activity Heatmap",
    description:
      "A calendar heatmap of daily activity, in the style of a contribution graph.",
    examples: [{ name: "activity-heatmap-demo" }],
    usage: `import { ActivityHeatmap } from "@/components/ui/activity-heatmap"

<ActivityHeatmap
  data={[
    { date: "2026-09-01", value: 12 },
    { date: "2026-09-02", value: 3 },
  ]}
  unit="deploys"
/>`,
  },
  {
    name: "sparkline",
    title: "Sparkline",
    description:
      "A tiny inline area or line chart for showing a trend at a glance.",
    examples: [{ name: "sparkline-demo" }],
    usage: `import { Sparkline } from "@/components/ui/sparkline"

<Sparkline data={[12, 18, 14, 22, 26, 21, 30]} className="h-8 w-24" />`,
  },
  {
    name: "composed-chart",
    title: "Composed Chart",
    description:
      "Mix areas, lines, and bars in one chart with dual axes, reference lines, peak markers, and hatched bars.",
    examples: [
      { name: "composed-chart-demo" },
      {
        name: "composed-chart-dual-axis-demo",
        title: "Dual axis",
        description: "Give a series axis: \"right\" to plot it against a second y-axis.",
      },
      {
        name: "composed-chart-hatched-demo",
        title: "Grouped and hatched bars",
        description: "Bars group side by side unless they share a stackId. pattern: \"hatched\" fills a bar with diagonal lines.",
      },
    ],
    usage: `import { ComposedChart } from "@/components/ui/composed-chart"

<ComposedChart
  data={data}
  xKey="month"
  series={[
    { key: "sales", label: "Sales", type: "area", highlightMax: true },
    { key: "goal", label: "Goal", type: "line", dashed: true },
  ]}
  referenceLines={[{ y: 50000, label: "Target" }]}
  showYAxis
/>`,
  },
  {
    name: "donut-chart",
    title: "Donut Chart",
    description:
      "A donut, pie, or half-donut with a center label, tooltip, and legend, on shadcn's chart primitives.",
    examples: [
      { name: "donut-chart-demo" },
      {
        name: "donut-chart-half-demo",
        title: "Half donut",
        description: "Set sweep to 180 and startAngle to 180 for a gauge-like semicircle.",
      },
    ],
    usage: `import { DonutChart } from "@/components/ui/donut-chart"

<DonutChart
  data={[
    { name: "Chrome", value: 58400 },
    { name: "Safari", value: 21300 },
    { name: "Firefox", value: 8900 },
  ]}
  centerLabel="Visitors"
  showLegend
/>`,
  },
  {
    name: "radial-gauge",
    title: "Radial Gauge",
    description:
      "A semicircular or ring gauge, continuous or segmented, with content in the middle.",
    examples: [
      { name: "radial-gauge-demo" },
      {
        name: "radial-gauge-inline-demo",
        title: "Inline in a KPI card",
        description: "A small segmented ring next to a value.",
      },
    ],
    usage: `import { RadialGauge } from "@/components/ui/radial-gauge"

<RadialGauge value={99.7} segments={40} size={180} thickness={12}>
  <span className="text-2xl font-semibold">99.7%</span>
  <span className="text-muted-foreground text-xs">Uptime</span>
</RadialGauge>`,
  },
  {
    name: "segmented-meter",
    title: "Segmented Meter",
    description:
      "A zoned bar meter with a marker at the current value, for heart-rate zones, allocations, or thresholds.",
    examples: [{ name: "segmented-meter-demo" }],
    usage: `import { SegmentedMeter } from "@/components/ui/segmented-meter"

<SegmentedMeter
  value={142}
  zones={[
    { label: "Rest", from: 60, to: 110 },
    { label: "Fat burn", from: 110, to: 140 },
    { label: "Cardio", from: 140, to: 170 },
    { label: "Peak", from: 170, to: 190 },
  ]}
/>`,
  },
  {
    name: "metric-list",
    title: "Metric List",
    description: "Compact rows of label, sparkline, value, and delta.",
    examples: [{ name: "metric-list-demo" }],
    usage: `import { MetricList } from "@/components/ui/metric-list"

<MetricList
  items={[
    { label: "Orders", value: 2865, delta: 0.18, trend: [12, 14, 13, 18, 22, 26] },
    { label: "Refunds", value: 42, delta: -0.06, invertDelta: true, trend: [50, 48, 51, 46, 42] },
  ]}
/>`,
  },
  {
    name: "delta-badge",
    title: "Delta Badge",
    description:
      "A signed percentage change with a trend icon, colored by whether the change is good.",
    examples: [{ name: "delta-badge-demo" }],
    usage: `import { DeltaBadge } from "@/components/ui/delta-badge"

<DeltaBadge delta={0.124} />
<DeltaBadge delta={0.08} invert />
<DeltaBadge delta={-0.032} variant="soft" />`,
  },
  {
    name: "metric-value",
    title: "Metric Value",
    description:
      "A formatted number that abbreviates large values (e.g. $158K) and shows the full value in a tooltip on hover. Every card in this registry renders its numbers through it.",
    examples: [{ name: "metric-value-demo" }],
    usage: `import { MetricValue } from "@/components/ui/metric-value"

<MetricValue value={158143} format="currency" maximumFractionDigits={0} />
<MetricValue value={1234567} />
<MetricValue value={41194} format="currency" maximumFractionDigits={0} />
<MetricValue value={1234567} compactFrom={Infinity} />`,
  },
  {
    name: "period-tabs",
    title: "Period Tabs",
    description:
      "A small segmented control for switching a chart between week, month, and year.",
    examples: [
      { name: "period-tabs-demo" },
      {
        name: "period-tabs-animated-demo",
        title: "Animated",
        description: "Set animated to slide a single pill between tabs instead of swapping backgrounds.",
      },
    ],
    usage: `import { PeriodTabs } from "@/components/ui/period-tabs"

const [period, setPeriod] = React.useState("month")

<PeriodTabs value={period} onValueChange={setPeriod} />`,
  },
  {
    name: "tick-bar",
    title: "Tick Bar",
    description:
      "A progress bar drawn as a row of ticks, lit up to the current value.",
    examples: [{ name: "tick-bar-demo" }],
    usage: `import { TickBar } from "@/components/ui/tick-bar"

<TickBar value={46} color="var(--color-emerald-500)" />
<TickBar value={7420} max={12300} segments={40} />
<TickBar value={16} max={24} segments={24} shape="pill" />`,
  },
  {
    name: "dot-plot",
    title: "Dot Plot",
    description:
      "A distribution drawn as columns of stacked dots, with the peak columns at full strength.",
    examples: [{ name: "dot-plot-demo" }],
    usage: `import { DotPlot } from "@/components/ui/dot-plot"

<DotPlot data={[1, 1, 2, 1, 2, 4, 6, 4, 2, 1, 2, 1, 1, 1]} color="var(--color-green-600)" />
<DotPlot data={[3, 5, 8, 12, 7, 4, 2]} labels={days} rows={6} />
<DotPlot data={[2, 3, 5, 4, 6, 3, 2]} emphasis={0} className="[--dot-size:0.875rem]" />`,
  },
  {
    name: "kpi-row-card",
    kind: "block",
    title: "KPI Row Card",
    description:
      "A card with a period switcher, a row of KPI tiles with sparklines and deltas, and a footer summary.",
    examples: [{ name: "kpi-row-card-demo" }],
    usage: `import { KpiRowCard } from "@/components/kpi-row-card"

<KpiRowCard
  title="Catalog health"
  description="SKU coverage, replenishment pressure, and aging stock."
  periods={[
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
  ]}
  metrics={[
    { label: "In stock", value: 8420, delta: 0.054, note: "Rising", trend: [6, 7, 7.5, 8.4] },
    { label: "Out of stock", value: 1245, delta: -0.12, invertDelta: true, trend: [1.6, 1.5, 1.3, 1.25] },
  ]}
  footer="12,845 products tracked across categories."
  action={{ label: "Show full analytics", href: "/analytics" }}
/>`,
  },
  {
    name: "balance-chart-card",
    kind: "block",
    title: "Balance Chart Card",
    description:
      "A balance or price card with a big value, delta, stat row, and a line chart with reference line and peak marker.",
    examples: [{ name: "balance-chart-card-demo" }],
    usage: `import { BalanceChartCard } from "@/components/balance-chart-card"

<BalanceChartCard
  title="Current balance"
  value={24847.83}
  delta={0.127}
  deltaLabel="Last 24 hours"
  stats={[
    { label: "High", value: 25900.08 },
    { label: "Low", value: 20850.42 },
  ]}
  data={data}
  xKey="time"
  yKey="balance"
  referenceValue={23400}
  referenceLabel="Prev. close"
/>`,
  },
  {
    name: "status-gauge-card",
    kind: "block",
    title: "Status Gauge Card",
    description:
      "A status card with a headline word, a metric, an avatar stack, and a segmented semicircular gauge.",
    examples: [{ name: "status-gauge-card-demo" }],
    usage: `import { StatusGaugeCard } from "@/components/status-gauge-card"

<StatusGaugeCard
  title="Performance metrics"
  status="Stable"
  metricLabel="Server uptime"
  value={0.997}
  color="var(--color-emerald-500)"
  segments={40}
  segmentGap={2.5}
  thickness={14}
  people={[
    { name: "shadcn", src: "https://github.com/shadcn.png" },
    { name: "Kai" },
  ]}
  peopleLabel="6 reviewers"
  action={{ label: "Details", href: "/uptime" }}
/>`,
  },
  {
    name: "ring-kpi-card",
    kind: "block",
    title: "Ring KPI Card",
    description:
      "A card with a row of KPI tiles, each with a segmented ring next to the value and a comparison to the previous value.",
    examples: [{ name: "ring-kpi-card-demo" }],
    usage: `import { RingKpiCard } from "@/components/ring-kpi-card"

<RingKpiCard
  metrics={[
    { label: "API response time", value: 132, previous: 148, unit: "ms", max: 200, invertDelta: true },
    { label: "Error rate", value: 1.4, previous: 0.9, unit: "%", max: 5, invertDelta: true },
    { label: "Request throughput", value: 4300, previous: 3900, format: "compact", unit: "req/s", max: 5000 },
  ]}
/>`,
  },
  {
    name: "distribution-card",
    kind: "block",
    title: "Distribution Card",
    description:
      "A total with delta, a stacked share bar, and a ranked list of the contributors with their values.",
    examples: [{ name: "distribution-card-demo" }],
    usage: `import { DistributionCard } from "@/components/distribution-card"

<DistributionCard
  title="Capital inflows"
  total={12400000}
  delta={390000}
  valueLabel="Capital in"
  items={[
    { name: "WaveMark Capital", value: 7928400, icon: <Gem />, color: "var(--color-teal-500)" },
    { name: "Envato Finances", value: 3214900, icon: <Hexagon />, color: "var(--color-amber-500)" },
    { name: "QBridge Tech", value: 1246300, icon: <Triangle />, color: "var(--color-orange-500)" },
  ]}
  options={[
    { value: "3", label: "Top 3 funds" },
    { value: "5", label: "Top 5 funds" },
  ]}
/>`,
  },
  {
    name: "tick-kpi-card",
    kind: "block",
    title: "Tick KPI Card",
    description:
      "A card with a row of KPI tiles, each with a value out of a whole and a tick bar showing how far along it is.",
    examples: [{ name: "tick-kpi-card-demo" }],
    usage: `import { TickKpiCard } from "@/components/tick-kpi-card"

<TickKpiCard
  metrics={[
    { icon: <FileText />, label: "Open invoices", value: 512, max: 691, color: "var(--color-emerald-500)" },
    { icon: <Package />, label: "Stock replenished", value: 7420, max: 12300, unit: "units", color: "var(--color-violet-500)" },
    { icon: <Landmark />, label: "Budget utilized", value: 103000, max: 2600000, format: "compact", color: "var(--color-amber-500)" },
  ]}
/>`,
  },
  {
    name: "allocation-card",
    kind: "block",
    title: "Allocation Card",
    description:
      "A share-of-total card with a period switcher, a big percentage with delta, a tick bar, and a footer stat with an avatar stack.",
    examples: [{ name: "allocation-card-demo" }],
    usage: `import { AllocationCard } from "@/components/allocation-card"

<AllocationCard
  title="Portfolio allocation"
  description="Share of assets under management held in equities."
  value={0.46}
  delta={0.034}
  deltaLabel="vs prior period"
  periods={[
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
  ]}
  stat={{ label: "Equities exposure", value: "$4.7M" }}
  people={[
    { name: "shadcn", src: "https://github.com/shadcn.png" },
    { name: "Kai" },
  ]}
  peopleLabel="6 members"
/>`,
  },
  {
    name: "dual-metric-card",
    kind: "block",
    title: "Dual Metric Card",
    description:
      "A card with two metrics side by side, each with a value, share badge, meter, and a supporting fact.",
    examples: [{ name: "dual-metric-card-demo" }],
    usage: `import { DualMetricCard } from "@/components/dual-metric-card"

<DualMetricCard
  title="Leads overview"
  options={[
    { value: "month", label: "This month" },
    { value: "quarter", label: "This quarter" },
  ]}
  metrics={[
    { label: "New leads", value: 54, showShare: true, meter: "bar", detail: { label: "Top source", value: "LinkedIn" } },
    { label: "Returning leads", value: 198, meter: "ticks", detail: { label: "Conversion rate", value: "12.8%" } },
  ]}
/>`,
  },
  {
    name: "period-bar-chart-card",
    kind: "block",
    title: "Period Bar Chart Card",
    description:
      "A card with a total for the selected period, a range switcher, and a bar chart that highlights that period. Click a bar to select its period.",
    examples: [{ name: "period-bar-chart-card-demo" }],
    usage: `import { PeriodBarChartCard } from "@/components/period-bar-chart-card"

<PeriodBarChartCard
  title="Spending"
  data={data}
  xKey="week"
  yKey="spend"
  groupKey="month"
  valueLabel="spending"
  color="var(--color-orange-500)"
  ranges={[
    { value: "1y", label: "1Y", points: 48 },
    { value: "6m", label: "6M", points: 24 },
    { value: "3m", label: "3M", points: 12 },
  ]}
  defaultRange="6m"
/>`,
  },
  {
    name: "progress-card",
    kind: "block",
    title: "Progress Card",
    description:
      "A compact progress card with an icon title, a pill tick bar, and a count with a secondary stat.",
    examples: [{ name: "progress-card-demo" }],
    usage: `import { ProgressCard } from "@/components/progress-card"

<ProgressCard
  title="Compliance checks"
  icon={<ShieldCheck />}
  value={16}
  max={24}
  label="checks passing"
  detail="67% assigned"
/>`,
  },
  {
    name: "breakdown-card",
    kind: "block",
    title: "Breakdown Card",
    description:
      "A total with delta and a list of contributors, each with a value and a hatched bar showing its share.",
    examples: [{ name: "breakdown-card-demo" }],
    usage: `import { BreakdownCard } from "@/components/breakdown-card"

<BreakdownCard
  title="Gross volume"
  total={41540}
  delta={0.15}
  items={[
    { name: "Online payments", value: 26800, color: "var(--color-emerald-500)" },
    { name: "Subscriptions", value: 10400, color: "var(--color-blue-500)" },
    { name: "In-store sales", value: 4340, color: "var(--color-pink-500)" },
  ]}
/>`,
  },
  {
    name: "dot-plot-card",
    kind: "block",
    title: "Dot Plot Card",
    description:
      "A metric card with a big value, a dot-plot distribution with its peak called out, and the change vs the previous period.",
    examples: [{ name: "dot-plot-card-demo" }],
    usage: `import { DotPlotCard } from "@/components/dot-plot-card"

<DotPlotCard
  title="Transactions"
  value={106000}
  format="compact"
  data={[1, 1, 2, 1, 2, 4, 6, 4, 2, 1, 2, 1, 1, 1]}
  labels={["Sat", "Sun", "Mon", "Tue", "Tue", "Wed", "Wed", "Wed", "Thu", "Thu", "Fri", "Fri", "Sat", "Sat"]}
  delta={34002}
  deltaLabel="vs last period"
  color="var(--color-green-600)"
  action={<Button variant="outline" size="icon-sm" className="rounded-full"><Ellipsis /></Button>}
/>`,
  },
  {
    name: "insight-card",
    kind: "block",
    title: "Insight Card",
    description:
      "A hero card with a badge, a very large number, a headline, and a paged set of insights over a soft gradient.",
    examples: [
      { name: "insight-card-demo" },
      {
        name: "insight-card-variants-demo",
        title: "Variants",
        description: "variant picks the gradient: aurora, sunset, ocean, or graphite. size=\"md\" shrinks the number for narrower columns.",
      },
      {
        name: "insight-card-plain-demo",
        title: "Plain",
        description: "variant=\"plain\" drops the gradient and uses the card colors, so it sits next to other blocks.",
      },
    ],
    usage: `import { InsightCard } from "@/components/insight-card"

<InsightCard
  badge="Insights"
  variant="aurora"
  interval={6000}
  items={[
    {
      value: 0.75,
      format: "percent",
      headline: "Authorization rate increased by 4% compared to last week.",
      description: "This improvement reduced failed transactions by 950 and is projected to recover $12,400.",
    },
    {
      value: 38,
      headline: "38 high-value customers have not ordered in 60 days.",
    },
  ]}
/>`,
  },
  {
    name: "metric-tabs-chart-card",
    kind: "block",
    title: "Metric Tabs Chart Card",
    description:
      "A row of metric tabs, each with a value and delta, above a line chart of the selected metric against the previous period. Click a tab to switch the chart.",
    examples: [{ name: "metric-tabs-chart-card-demo" }],
    usage: `import { MetricTabsChartCard } from "@/components/metric-tabs-chart-card"

<MetricTabsChartCard
  data={data}
  xKey="date"
  metrics={[
    { key: "revenue", compareKey: "revenuePrev", label: "Revenue", format: "currency", fractionDigits: 0 },
    { key: "spend", compareKey: "spendPrev", label: "Ad spend", format: "currency", fractionDigits: 0, invertDelta: true },
    { key: "roas", compareKey: "roasPrev", label: "ROAS", aggregate: "average", fractionDigits: 2 },
    { key: "customers", compareKey: "customersPrev", label: "New customers" },
  ]}
/>`,
  },
]

export function getComponentDoc(name: string) {
  return componentDocs.find((doc) => doc.name === name)
}
