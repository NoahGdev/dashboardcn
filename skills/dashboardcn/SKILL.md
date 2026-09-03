---
name: dashboardcn
description: Build dashboards and analytics UI in React with dashboardcn, a shadcn/ui registry of KPI cards, trend, bar, donut, and composed charts, funnels, ranked lists, gauges, heatmaps, data tables, and composed cards. Use when asked for a dashboard, analytics page, metrics, KPI tiles, charts, or data tables in a project that uses shadcn/ui and Tailwind.
---

# dashboardcn

Dashboard components for shadcn/ui, distributed as a shadcn registry. Nothing
is published to npm. Each item is copied into the project with the shadcn CLI,
so the code is the user's to edit.

Docs: https://dashboardcn.com. Every docs page is also Markdown: append `.md`
to its URL. The index is https://dashboardcn.com/llms.txt.

## Where files land

| Registry type | Lands in | Examples |
| --- | --- | --- |
| Component (primitive) | `components/ui/<name>.tsx` | `kpi-card`, `trend-chart`, `data-table` |
| Block (composed card) | `components/<name>.tsx` | `kpi-row-card`, `data-table-card` |
| Lib | `lib/format.ts` | `formatNumber`, `formatDelta`, `computeDelta` |

Blocks pull in the primitives they are built from, plus the shadcn/ui items
they need (`card`, `tabs`, `tooltip`, `table`, ...) and npm dependencies
(`recharts`, `@tanstack/react-table`, `lucide-react`).

## Workflow

1. **Check the project is a shadcn/ui project.** It needs a `components.json`.
   If missing, run `npx shadcn@latest init` first.
2. **Pick items from the catalog below.** Prefer a block when its layout
   matches the request. Drop to primitives when composing something custom.
3. **Install everything in one command.**
   ```bash
   npx shadcn@latest add https://dashboardcn.com/r/kpi-row-card.json https://dashboardcn.com/r/trend-chart.json
   ```
   Or register the namespace once in `components.json` and use short names:
   ```json
   { "registries": { "@dashboardcn": "https://dashboardcn.com/r/{name}.json" } }
   ```
   ```bash
   npx shadcn@latest add @dashboardcn/kpi-row-card @dashboardcn/trend-chart
   ```
4. **Read the docs for anything unfamiliar.** `references/api.md` in this
   skill summarizes every prop. The full page with examples and source is at
   `https://dashboardcn.com/docs/components/<name>.md` or
   `https://dashboardcn.com/docs/blocks/<name>.md`.
5. **Compose the page.** When a prop is missing, edit the installed file
   rather than wrapping it. That is the point of the registry model.

## Catalog

| Need | Reach for |
| --- | --- |
| One headline number with a delta | `kpi-card`; `metric-value` for the number alone |
| A row of numbers in one card | `kpi-row-card` (sparklines), `ring-kpi-card` (rings), `tick-kpi-card` (progress out of a whole), `metric-list` (compact rows) |
| Trend over time | `trend-chart` (area, line, bar, stacked, horizontal); `sparkline` inline |
| Current vs previous period, switchable metrics | `metric-tabs-chart-card` |
| A balance or price with a chart | `balance-chart-card` |
| Bars with one period highlighted, range switcher | `period-bar-chart-card`; `bar-chart` alone |
| Mixed series, dual axes, reference lines | `composed-chart` |
| Part of a whole | `donut-chart`, `distribution-bar`; as cards: `distribution-card`, `breakdown-card`, `allocation-card` |
| Two metrics side by side with meters | `dual-metric-card` |
| Conversion steps and drop-off | `funnel-chart` |
| Ranked list (top pages, referrers) | `bar-list` |
| Progress toward a goal or capacity | `tick-bar`, `progress-card`, `radial-gauge`, `status-gauge-card`, `segmented-meter` (zones) |
| Distribution or histogram | `dot-plot`, `dot-plot-card` |
| Daily activity calendar | `activity-heatmap` |
| Tabular data (sort, filter, paginate, select) | `data-table`; in a card: `data-table-card` |
| Audit log, activity feed, version history | `timeline` |
| A hero number with a takeaway sentence | `insight-card` |
| Week/month/year switcher | `period-tabs` |
| Signed percentage change | `delta-badge` |

## Data conventions

- **Deltas are fractions.** `delta={0.124}` renders `+12.4%`. Exceptions:
  `distribution-card` and `dot-plot-card` take an absolute delta in the same
  unit as the value. Use `computeDelta(current, previous)` from `lib/format`.
- **Down can be good.** Set `invertDelta` (or `invert` on `delta-badge`) for
  churn, latency, errors, spend, so a decrease is colored positive.
- **`format`** is `"number" | "compact" | "currency" | "percent"`. Percent
  values are fractions: `value={0.46}` with `format="percent"` shows `46%`.
  `currency` is an ISO 4217 code, default USD. Large numbers abbreviate to
  `$158K` automatically via `metric-value`, with the full value in a tooltip.
- **Trend arrays** (`trend`, `sparkline` `data`) are plain `number[]`, oldest
  first.
- **Chart data** is an array of row objects. `xKey` names the x value and each
  series `key` names a numeric field in the row:
  ```ts
  const data = [
    { date: "2026-08-01", desktop: 186, mobile: 80 },
    { date: "2026-08-02", desktop: 305, mobile: 200 },
  ]
  ```
- **Colors** accept any CSS color. Defaults cycle through the shadcn theme
  tokens `chart-1` to `chart-5`. Prefer tokens: `"var(--chart-2)"` or a
  Tailwind palette variable like `"var(--color-emerald-500)"`.
- **Period and option switchers** on blocks are optional. Omit `periods` or
  `options` to hide them. They work uncontrolled (`defaultPeriod`) or
  controlled (`period` + `onPeriodChange`).

## Layout

Cards extend shadcn `Card`, so `className` works for spans and heights.
Charts default to `h-64 w-full`; override with `className` (`h-48`,
`h-80`). A typical page:

```tsx
export default function Page() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KpiCard label="Revenue" value={84120} format="currency" delta={0.124} trend={revenue} />
      <KpiCard label="Orders" value={2865} delta={0.18} trend={orders} />
      <KpiCard label="Refunds" value={42} delta={-0.06} invertDelta trend={refunds} />
      <KpiCard label="Conversion" value={0.034} format="percent" delta={0.002} />

      <MetricTabsChartCard className="md:col-span-2 lg:col-span-3" data={daily} xKey="date" metrics={tabs} />
      <BreakdownCard title="Gross volume" items={channels} delta={0.15} />

      <DataTableCard className="md:col-span-2 lg:col-span-4" title="Top products" columns={columns} data={products} searchKey="product" pageSize={5} />
    </div>
  )
}
```

Use `lg:col-span-2` for charts and tables, single columns for KPI cards and
gauges, and full width for data tables. Keep one grid per page section.

## Client and server

Components with state or recharts already declare `"use client"`, so a
Server Component page can render them directly and pass data as props. The
page itself needs `"use client"` only when it owns state, such as a
controlled period switcher or `data-table-card` with a `toolbar` that uses
`useState`. Define `data-table` columns in a client module when cells render
interactive elements.

## Data table essentials

```tsx
const helper = createDataTableColumnHelper<Product>()
const columns = helper.columns([
  helper.accessor("name", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Product" />,
  }),
  helper.accessor("revenue", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Revenue" align="right" />,
    cell: ({ row }) => <div className="text-right">{formatNumber(row.original.revenue, { format: "currency" })}</div>,
  }),
])
<DataTable columns={columns} data={products} searchKey="name" pageSize={10} />
```

`enableRowSelection` adds checkboxes (pass `getRowId` for stable ids),
`pinnedColumns` needs a `size` on each pinned column, `reorderable` allows
drag reordering, `loading` swaps rows for a skeleton, `pending` dims them.
For a custom layout use `useDataTable` and lay out `DataTableToolbar`,
`DataTableSearch`, `DataTableViewOptions`, `DataTableContent`, and
`DataTablePagination` yourself.

## Pitfalls

- Do not `npm install dashboardcn`. It does not exist; use the shadcn CLI.
- Do not pass percentages as whole numbers. `delta={12.4}` renders `+1240%`.
- Do not wrap a registry component to add a prop. Edit the installed file.
- A half donut needs both `sweep={180}` and `startAngle={180}`; `sweep`
  alone draws it rotated.
- `activity-heatmap` dates are ISO `YYYY-MM-DD` strings.
- Foundations are Tailwind v4 and the shadcn theme variables. Projects on
  Tailwind v3 need the v4 upgrade first.
