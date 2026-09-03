# dashboardcn API reference

Prop summaries for every registry item. `?` marks optional props. Every
component also accepts the props of its root element (`div`, shadcn `Card`,
or shadcn `ChartContainer`), including `className`. Full docs with examples
and source: `https://dashboardcn.com/docs/components/<name>.md` or
`https://dashboardcn.com/docs/blocks/<name>.md`.

Shared types:

- `NumberFormat = "number" | "compact" | "currency" | "percent"`
- `PeriodOption = { value: string; label: string }`
- Colors are any CSS color string. Defaults cycle `chart-1` to `chart-5`.

## lib/format

```ts
formatNumber(value: number, { format?, currency? = "USD", locale? = "en-US", maximumFractionDigits?, compact? }): string
// formatNumber(1234567) -> "1,234,567"; { format: "compact" } -> "1.2M"
// { format: "currency", compact: true } on 158143 -> "$158K"; { format: "percent" } on 0.124 -> "12.4%"
formatDelta(delta: number, locale?): string   // 0.124 -> "+12.4%", -0.03 -> "-3.0%"
computeDelta(current: number, previous: number): number  // fractional; 0 when previous is 0
```

## Components (`@/components/ui/<name>`)

### kpi-card — `KpiCard`
`label: string`, `value: number | string`, `delta?: number` (fraction), `deltaLabel?: string`, `trend?: number[]`, `format?: NumberFormat`, `currency?: string`, `invertDelta?: boolean`, `icon?: ReactNode`, `children?: ReactNode`. Extends `Card`.

### metric-value — `MetricValue`
`value: number | string`, `format?`, `currency?`, `maximumFractionDigits?: number`, `compactFrom?: number` (default 100000; `Infinity` never abbreviates), `suffix?: ReactNode`. Renders a `span`; abbreviated values get the full value in a tooltip.

### delta-badge — `DeltaBadge`, `getDeltaDirection(delta)`
`delta: number` (fraction), `invert?: boolean`, `variant?: "outline" | "soft" | "text"`, `showIcon?: boolean`.

### sparkline — `Sparkline`
`data: number[]` (oldest first), `variant?: "area" | "line"`, `fill?: "gradient" | "dots"`, `color?`, `curve?: "monotone" | "linear" | "step"`, `strokeWidth?: number`. Size it with `className`, e.g. `h-8 w-24`.

### metric-list — `MetricList`
`items: MetricListItem[]` where item is `{ label, value: number | string, delta?, trend?: number[], format?, currency?, invertDelta?, icon?, key? }`; `variant?: "area" | "line"`, `fill?: "gradient" | "dots"`, `showDivider?: boolean`.

### trend-chart — `TrendChart`
`data: Record<string, unknown>[]`, `xKey: string`, `series: { key, label, color? }[]`, `type?: "area" | "line" | "bar"`, `fill?: "gradient" | "dots"`, `layout?: "vertical" | "horizontal"` (bars), `barRadius?: number | "full"`, `barSize?: number`, `stacked?: boolean`, `showLegend?`, `legendPosition?: "top" | "bottom"`, `legendAlign?: "left" | "center" | "right"`, `showGrid?`, `showYAxis?`, `yDomain?` (recharts domain, default `[0, "auto"]`), `xFormatter?: (value) => string`, `yFormatter?: (value: number) => string`. Default size `h-64 w-full`.

### bar-chart — `BarChart`
`data: Record<string, unknown>[]`, `xKey`, `yKey`, `groupKey?` (coarser label, one tick per group), `variant?: "gradient" | "striped" | "solid"`, `color?`, `mutedColor?`, `highlight?: (row, index) => boolean`, `grid?: "dashed" | "solid" | "none"`, `showYAxis?`, `showTooltip?`, `showActiveMarker?`, `barRadius?: number`, `xFormatter?`, `yFormatter?`, `tooltipLabel?: (row, index) => ReactNode`, `onBarClick?: (row, index) => void`.

### composed-chart — `ComposedChart`
`data`, `xKey`, `series: ComposedSeries[]` where series is `{ key, label, type?: "area" | "line" | "bar", color?, axis?: "left" | "right", stackId?, pattern?: "solid" | "hatched" (bars), dashed?, curve?, dots?, highlightMax? }`; `referenceLines?: { y?, x?, label?, color?, dashed?, axis? }[]`, `showGrid?`, `showYAxis?`, `showLegend?`, `showTooltip?`, `xFormatter?`, `yFormatter?`, `rightYFormatter?`, `barRadius?`, `yDomain?: "zero" | "auto" | [number, number]`.

### donut-chart — `DonutChart`
`data: { name, value, color? }[]`, `innerRadius?: number` (fraction of outer; 0 is a pie), `centerLabel?: ReactNode`, `centerValue?: ReactNode` (default total), `valueFormatter?`, `showLegend?`, `showTooltip?`, `startAngle?: number`, `sweep?: number` (180 for half), `paddingAngle?: number`.

### distribution-bar — `DistributionBar`
`segments: { name, value, color? }[]`, `valueFormatter?`, `showLegend?`, `showValues?`.

### funnel-chart — `FunnelChart`
`steps: { name, value }[]`, `valueFormatter?`, `color?`, `showDropoff?: boolean`.

### bar-list — `BarList`
`data: { name, value, href?, icon?, key? }[]`, `valueFormatter?`, `sortOrder?: "descending" | "ascending" | "none"`, `color?`, `showPercentage?`, `onItemClick?: (item) => void`.

### tick-bar — `TickBar`
`value: number`, `max?: number` (default 100), `segments?: number`, `color?`, `trackColor?`, `shape?: "tick" | "pill"`.

### radial-gauge — `RadialGauge`
`value: number`, `min?`, `max?`, `size?: number` (px diameter), `thickness?: number`, `segments?: number` (0 is continuous), `gap?: number` (degrees), `startAngle?`, `sweep?` (180 semicircle, 360 ring), `color?`, `trackColor?`, `children?` rendered in the middle.

### segmented-meter — `SegmentedMeter`
`value: number`, `zones: { label?, from, to, color? }[]`, `highlightActive?`, `showTicks?`, `showLabels?`, `showMarker?`, `tickFormatter?`.

### dot-plot — `DotPlot`
`data: number[]` (one per column), `labels?: string[]`, `max?`, `rows?: number`, `color?`, `emphasis?: number` (fraction of max at which columns draw at full strength; 0 for all), `fadedOpacity?`, `showTooltip?`, `valueFormatter?`, `activeIndex?: number | null`, `onActiveIndexChange?`. Dot size via `className="[--dot-size:0.875rem]"`.

### activity-heatmap — `ActivityHeatmap`
`data: { date: "YYYY-MM-DD", value }[]`, `endDate?: Date`, `weeks?: number`, `startDate?: Date`, `color?`, `colors?: string[]` (explicit levels), `scale?: "linear" | "sqrt"`, `cellSize?`, `gap?`, `valueFormatter?`, `unit?: string`, `showMonthLabels?`, `weekdayLabels?: "mwf" | "all" | "none"`, `showLegend?`, `scrollToEnd?`, `renderTooltip?`, `onCellClick?`.

### period-tabs — `PeriodTabs`
Extends shadcn `Tabs` (`value`, `defaultValue`, `onValueChange`). `options?: PeriodOption[]` (default week/month/year), `size?: "sm" | "default"`, `animated?: boolean`.

### timeline — `Timeline`, `TimelineItem`, `TimelineRail`, `TimelineMarker`, `TimelineConnector`, `TimelineContent`, `TimelineHeader`, `TimelineTitle`, `TimelineTime`, `TimelineDescription`
Compositional. `TimelineItem` takes `status?: "default" | "current" | "done"`. Put a `TimelineRail` (marker + connector) and a `TimelineContent` inside each item.

### data-table — `DataTable`, `useDataTable`, `createDataTableColumnHelper`, `createSelectionColumn`, `DataTableColumnHeader`, `DataTableToolbar`, `DataTableSearch`, `DataTableViewOptions`, `DataTableContent`, `DataTablePagination`, `DataTableSelectionBar`, `DataTableSkeleton`
`useDataTable({ columns, data, pageSize? (0 for one page), initialSorting?, initialColumnVisibility?, pinnedColumns?, enableRowSelection?, getRowId?, onRowSelectionChange? })`.
`DataTable` takes those options plus `searchKey?`, `searchPlaceholder?`, `toolbar?: ReactNode`, `showViewOptions?`, `showPagination?`, `pageSizeOptions?: number[]`, `emptyMessage?`, `loading?`, `pending?`, `skeletonRows?`, `stickyHeader?`, `maxHeight?: number | string`, `reorderable?: boolean | string[]`, `density?: "compact" | "default" | "relaxed"`, `onRowClick?`, `rowClassName?`, `rowProps?`, `renderRow?`, `selectionActions?: ReactNode`.
`DataTableColumnHeader` takes `column`, `title`, `align?: "left" | "right"`.

## Blocks (`@/components/<name>`)

### kpi-row-card — `KpiRowCard`
`title`, `description?`, `metrics: { label, value, delta?, note?, trend?, format?, currency?, invertDelta?, icon? }[]`, `periods?: PeriodOption[]`, `period?`, `defaultPeriod?`, `onPeriodChange?`, `footer?: ReactNode`, `action?: { label, href }`.

### ring-kpi-card — `RingKpiCard`
`metrics: { label, value: number, previous?, progress? (0-100), max?, format?, currency?, unit?, invertDelta?, action? }[]`.

### tick-kpi-card — `TickKpiCard`
`metrics: { label, value: number, max: number, format?, currency?, unit?, color?, icon?, action? }[]`, `segments?`.

### metric-tabs-chart-card — `MetricTabsChartCard`
`metrics: { key, label, compareKey?, value?, delta?, aggregate?: "sum" | "average" | "last", format?, currency?, fractionDigits?, invertDelta? }[]`, `data`, `xKey`, `selected?`, `defaultSelected?`, `onSelectedChange?`, `color?`, `compareColor?`, `compareLabel?`, `xFormatter?`, `chartClassName?`.

### balance-chart-card — `BalanceChartCard`
`title`, `value: number`, `delta?`, `deltaLabel?`, `format?`, `currency?`, `stats?: { label, value, delta?, format?, color? }[]`, `data`, `xKey`, `yKey`, `seriesLabel?`, `referenceValue?`, `referenceLabel?`, `highlightMax?`, `chartClassName?`.

### period-bar-chart-card — `PeriodBarChartCard`
`title`, `data`, `xKey`, `yKey`, `groupKey?`, `ranges?: { value, label, points }[]`, `defaultRange?`, `selected?`, `defaultSelected?`, `onSelectedChange?`, `valueLabel?`, `format?`, `currency?`, `variant?`, `color?`, `mutedColor?`, `grid?`, `xFormatter?`, `tooltipLabel?`, `chartClassName?`.

### distribution-card — `DistributionCard`
`title`, `items: { name, value, icon?, color? }[]`, `total?`, `delta?` (absolute, same unit), `format?`, `currency?`, `valueLabel?`, `options?: { value, label }[]`, `value?`, `defaultValue?`, `onValueChange?`.

### breakdown-card — `BreakdownCard`
`title`, `action?: ReactNode`, `items: { name, value, color? }[]`, `total?`, `delta?` (fraction), `invertDelta?`, `format?`, `currency?`, `max?`, `pattern?: "hatched" | "solid"`.

### allocation-card — `AllocationCard`
`title`, `description?`, `value: number` (share, e.g. 0.46), `format?`, `currency?`, `progress?` (0-100), `delta?`, `deltaLabel?`, `invertDelta?`, `color?`, `segments?`, `periods?`, `period?`, `defaultPeriod?`, `onPeriodChange?`, `stat?: { label, value }`, `people?: { name, src? }[]`, `peopleLabel?`.

### dual-metric-card — `DualMetricCard`
`title`, `metrics: { label, value: number, format?, currency?, progress?, showShare?, meter?: "ticks" | "bar", color?, detail?: { label, value, description? } }[]`, `options?`, `value?`, `defaultValue?`, `onValueChange?`, `segments?`.

### dot-plot-card — `DotPlotCard`
`title`, `value`, `format?`, `currency?`, `data: number[]`, `labels?: string[]`, `peakLabel?`, `delta?` (absolute), `deltaLabel?`, `deltaFormat?`, `color?`, `rows?`, `valueFormatter?`, `action?`.

### progress-card — `ProgressCard`
`title`, `icon?`, `action?`, `value: number`, `max: number`, `label?` (noun after the count), `detail?: ReactNode`, `color?`, `segments?`, `shape?: "tick" | "pill"`.

### status-gauge-card — `StatusGaugeCard`
`title`, `status: string`, `metricLabel: string`, `value`, `format?`, `currency?`, `progress?`, `color?`, `segments?`, `segmentGap?`, `thickness?`, `gaugeSize?`, `people?: { name, src? }[]`, `peopleLabel?`, `action?: { label, href?, onClick?, icon? }`.

### insight-card — `InsightCard`
`badge?`, `icon?`, `action?`, `variant?: "aurora" | "sunset" | "ocean" | "graphite" | "plain"`, `items: { value, format?, currency?, headline, description? }[]`, `index?`, `defaultIndex?`, `onIndexChange?`, `interval?: number` (ms autoplay), `size?: "md" | "lg"`, `decoration?`.

### data-table-card — `DataTableCard`
All `useDataTable` options plus `title`, `description?`, `action?`, `searchKey?`, `searchPlaceholder?`, `toolbar?`, `showViewOptions?`, `showPagination?`, `pageSizeOptions?`, `selectionActions?`, `footer?` (replaces pagination), and the `DataTableContent` display props (`loading`, `pending`, `stickyHeader`, `maxHeight`, `reorderable`, `density`, `emptyMessage`, `onRowClick`, `rowClassName`, `rowProps`, `renderRow`).
