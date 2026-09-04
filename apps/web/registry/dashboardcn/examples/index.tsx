import type * as React from "react"

import BalanceChartCardDemo from "@/registry/dashboardcn/examples/balance-chart-card-demo"
import BreakdownCardDemo from "@/registry/dashboardcn/examples/breakdown-card-demo"
import ComposedChartDemo from "@/registry/dashboardcn/examples/composed-chart-demo"
import ComposedChartDualAxisDemo from "@/registry/dashboardcn/examples/composed-chart-dual-axis-demo"
import ComposedChartHatchedDemo from "@/registry/dashboardcn/examples/composed-chart-hatched-demo"
import DeltaBadgeDemo from "@/registry/dashboardcn/examples/delta-badge-demo"
import MetricValueDemo from "@/registry/dashboardcn/examples/metric-value-demo"
import DistributionCardDemo from "@/registry/dashboardcn/examples/distribution-card-demo"
import DotPlotCardDemo from "@/registry/dashboardcn/examples/dot-plot-card-demo"
import DotPlotDemo from "@/registry/dashboardcn/examples/dot-plot-demo"
import DonutChartDemo from "@/registry/dashboardcn/examples/donut-chart-demo"
import DonutChartHalfDemo from "@/registry/dashboardcn/examples/donut-chart-half-demo"
import InsightCardDemo from "@/registry/dashboardcn/examples/insight-card-demo"
import InsightCardPlainDemo from "@/registry/dashboardcn/examples/insight-card-plain-demo"
import InsightCardVariantsDemo from "@/registry/dashboardcn/examples/insight-card-variants-demo"
import KpiRowCardDemo from "@/registry/dashboardcn/examples/kpi-row-card-demo"
import MetricListDemo from "@/registry/dashboardcn/examples/metric-list-demo"
import PeriodTabsAnimatedDemo from "@/registry/dashboardcn/examples/period-tabs-animated-demo"
import PeriodTabsDemo from "@/registry/dashboardcn/examples/period-tabs-demo"
import RadialGaugeDemo from "@/registry/dashboardcn/examples/radial-gauge-demo"
import RadialGaugeInlineDemo from "@/registry/dashboardcn/examples/radial-gauge-inline-demo"
import RingKpiCardDemo from "@/registry/dashboardcn/examples/ring-kpi-card-demo"
import SegmentedMeterDemo from "@/registry/dashboardcn/examples/segmented-meter-demo"
import StatusGaugeCardDemo from "@/registry/dashboardcn/examples/status-gauge-card-demo"
import AllocationCardDemo from "@/registry/dashboardcn/examples/allocation-card-demo"
import DualMetricCardDemo from "@/registry/dashboardcn/examples/dual-metric-card-demo"
import ProgressCardDemo from "@/registry/dashboardcn/examples/progress-card-demo"
import TickBarDemo from "@/registry/dashboardcn/examples/tick-bar-demo"
import TickKpiCardDemo from "@/registry/dashboardcn/examples/tick-kpi-card-demo"
import ActivityHeatmapDemo from "@/registry/dashboardcn/examples/activity-heatmap-demo"
import BarChartDemo from "@/registry/dashboardcn/examples/bar-chart-demo"
import BarChartStripedDemo from "@/registry/dashboardcn/examples/bar-chart-striped-demo"
import PeriodBarChartCardDemo from "@/registry/dashboardcn/examples/period-bar-chart-card-demo"
import MetricTabsChartCardDemo from "@/registry/dashboardcn/examples/metric-tabs-chart-card-demo"
import BarListDemo from "@/registry/dashboardcn/examples/bar-list-demo"
import DataTableDemo from "@/registry/dashboardcn/examples/data-table-demo"
import DataTableCardDemo from "@/registry/dashboardcn/examples/data-table-card-demo"
import DataTableCompactDemo from "@/registry/dashboardcn/examples/data-table-compact-demo"
import DataTableComposedDemo from "@/registry/dashboardcn/examples/data-table-composed-demo"
import DataTableLoadingDemo from "@/registry/dashboardcn/examples/data-table-loading-demo"
import DataTableReorderDemo from "@/registry/dashboardcn/examples/data-table-reorder-demo"
import DataTableRowActionsDemo from "@/registry/dashboardcn/examples/data-table-row-actions-demo"
import DataTableSelectionDemo from "@/registry/dashboardcn/examples/data-table-selection-demo"
import DataTableStickyDemo from "@/registry/dashboardcn/examples/data-table-sticky-demo"
import DistributionBarDemo from "@/registry/dashboardcn/examples/distribution-bar-demo"
import FunnelChartDemo from "@/registry/dashboardcn/examples/funnel-chart-demo"
import KpiCardDemo from "@/registry/dashboardcn/examples/kpi-card-demo"
import SparklineDemo from "@/registry/dashboardcn/examples/sparkline-demo"
import TrendChartBarDemo from "@/registry/dashboardcn/examples/trend-chart-bar-demo"
import TrendChartDemo from "@/registry/dashboardcn/examples/trend-chart-demo"
import TrendChartDotsDemo from "@/registry/dashboardcn/examples/trend-chart-dots-demo"
import TrendChartGroupedDemo from "@/registry/dashboardcn/examples/trend-chart-grouped-demo"
import TrendChartHorizontalDemo from "@/registry/dashboardcn/examples/trend-chart-horizontal-demo"
import TrendChartLineDemo from "@/registry/dashboardcn/examples/trend-chart-line-demo"
import TimelineActivityDemo from "@/registry/dashboardcn/examples/timeline-activity-demo"
import TimelineCompactDemo from "@/registry/dashboardcn/examples/timeline-compact-demo"
import TimelineDemo from "@/registry/dashboardcn/examples/timeline-demo"
import TimelineVersionsDemo from "@/registry/dashboardcn/examples/timeline-versions-demo"
import ActivityRingsDemo from "@/registry/dashboardcn/examples/activity-rings-demo"
import ActivityRingsCardDemo from "@/registry/dashboardcn/examples/activity-rings-card-demo"
import ActivityRingsCardSideDemo from "@/registry/dashboardcn/examples/activity-rings-card-side-demo"

export interface ExampleEntry {
  component: React.ComponentType
  /** Path relative to the app root, used to show the example's source. */
  path: string
}

const base = "registry/dashboardcn/examples"

export const examples = {
  "kpi-card-demo": { component: KpiCardDemo, path: `${base}/kpi-card-demo.tsx` },
  "sparkline-demo": { component: SparklineDemo, path: `${base}/sparkline-demo.tsx` },
  "bar-list-demo": { component: BarListDemo, path: `${base}/bar-list-demo.tsx` },
  "distribution-bar-demo": { component: DistributionBarDemo, path: `${base}/distribution-bar-demo.tsx` },
  "funnel-chart-demo": { component: FunnelChartDemo, path: `${base}/funnel-chart-demo.tsx` },
  "activity-heatmap-demo": { component: ActivityHeatmapDemo, path: `${base}/activity-heatmap-demo.tsx` },
  "bar-chart-demo": { component: BarChartDemo, path: `${base}/bar-chart-demo.tsx` },
  "bar-chart-striped-demo": { component: BarChartStripedDemo, path: `${base}/bar-chart-striped-demo.tsx` },
  "trend-chart-demo": { component: TrendChartDemo, path: `${base}/trend-chart-demo.tsx` },
  "trend-chart-bar-demo": { component: TrendChartBarDemo, path: `${base}/trend-chart-bar-demo.tsx` },
  "trend-chart-line-demo": { component: TrendChartLineDemo, path: `${base}/trend-chart-line-demo.tsx` },
  "trend-chart-dots-demo": { component: TrendChartDotsDemo, path: `${base}/trend-chart-dots-demo.tsx` },
  "trend-chart-grouped-demo": { component: TrendChartGroupedDemo, path: `${base}/trend-chart-grouped-demo.tsx` },
  "trend-chart-horizontal-demo": { component: TrendChartHorizontalDemo, path: `${base}/trend-chart-horizontal-demo.tsx` },
  "data-table-demo": { component: DataTableDemo, path: `${base}/data-table-demo.tsx` },
  "data-table-loading-demo": { component: DataTableLoadingDemo, path: `${base}/data-table-loading-demo.tsx` },
  "data-table-selection-demo": { component: DataTableSelectionDemo, path: `${base}/data-table-selection-demo.tsx` },
  "data-table-row-actions-demo": { component: DataTableRowActionsDemo, path: `${base}/data-table-row-actions-demo.tsx` },
  "data-table-sticky-demo": { component: DataTableStickyDemo, path: `${base}/data-table-sticky-demo.tsx` },
  "data-table-reorder-demo": { component: DataTableReorderDemo, path: `${base}/data-table-reorder-demo.tsx` },
  "data-table-compact-demo": { component: DataTableCompactDemo, path: `${base}/data-table-compact-demo.tsx` },
  "data-table-composed-demo": { component: DataTableComposedDemo, path: `${base}/data-table-composed-demo.tsx` },
  "data-table-card-demo": { component: DataTableCardDemo, path: `${base}/data-table-card-demo.tsx` },
  "delta-badge-demo": { component: DeltaBadgeDemo, path: `${base}/delta-badge-demo.tsx` },
  "metric-value-demo": { component: MetricValueDemo, path: `${base}/metric-value-demo.tsx` },
  "radial-gauge-demo": { component: RadialGaugeDemo, path: `${base}/radial-gauge-demo.tsx` },
  "radial-gauge-inline-demo": { component: RadialGaugeInlineDemo, path: `${base}/radial-gauge-inline-demo.tsx` },
  "donut-chart-demo": { component: DonutChartDemo, path: `${base}/donut-chart-demo.tsx` },
  "donut-chart-half-demo": { component: DonutChartHalfDemo, path: `${base}/donut-chart-half-demo.tsx` },
  "composed-chart-demo": { component: ComposedChartDemo, path: `${base}/composed-chart-demo.tsx` },
  "composed-chart-dual-axis-demo": { component: ComposedChartDualAxisDemo, path: `${base}/composed-chart-dual-axis-demo.tsx` },
  "composed-chart-hatched-demo": { component: ComposedChartHatchedDemo, path: `${base}/composed-chart-hatched-demo.tsx` },
  "segmented-meter-demo": { component: SegmentedMeterDemo, path: `${base}/segmented-meter-demo.tsx` },
  "period-tabs-demo": { component: PeriodTabsDemo, path: `${base}/period-tabs-demo.tsx` },
  "period-tabs-animated-demo": { component: PeriodTabsAnimatedDemo, path: `${base}/period-tabs-animated-demo.tsx` },
  "tick-bar-demo": { component: TickBarDemo, path: `${base}/tick-bar-demo.tsx` },
  "dot-plot-demo": { component: DotPlotDemo, path: `${base}/dot-plot-demo.tsx` },
  "metric-list-demo": { component: MetricListDemo, path: `${base}/metric-list-demo.tsx` },
  "timeline-demo": { component: TimelineDemo, path: `${base}/timeline-demo.tsx` },
  "timeline-compact-demo": { component: TimelineCompactDemo, path: `${base}/timeline-compact-demo.tsx` },
  "timeline-activity-demo": { component: TimelineActivityDemo, path: `${base}/timeline-activity-demo.tsx` },
  "timeline-versions-demo": { component: TimelineVersionsDemo, path: `${base}/timeline-versions-demo.tsx` },
  "kpi-row-card-demo": { component: KpiRowCardDemo, path: `${base}/kpi-row-card-demo.tsx` },
  "balance-chart-card-demo": { component: BalanceChartCardDemo, path: `${base}/balance-chart-card-demo.tsx` },
  "status-gauge-card-demo": { component: StatusGaugeCardDemo, path: `${base}/status-gauge-card-demo.tsx` },
  "ring-kpi-card-demo": { component: RingKpiCardDemo, path: `${base}/ring-kpi-card-demo.tsx` },
  "distribution-card-demo": { component: DistributionCardDemo, path: `${base}/distribution-card-demo.tsx` },
  "tick-kpi-card-demo": { component: TickKpiCardDemo, path: `${base}/tick-kpi-card-demo.tsx` },
  "allocation-card-demo": { component: AllocationCardDemo, path: `${base}/allocation-card-demo.tsx` },
  "dual-metric-card-demo": { component: DualMetricCardDemo, path: `${base}/dual-metric-card-demo.tsx` },
  "period-bar-chart-card-demo": { component: PeriodBarChartCardDemo, path: `${base}/period-bar-chart-card-demo.tsx` },
  "progress-card-demo": { component: ProgressCardDemo, path: `${base}/progress-card-demo.tsx` },
  "insight-card-demo": { component: InsightCardDemo, path: `${base}/insight-card-demo.tsx` },
  "insight-card-variants-demo": { component: InsightCardVariantsDemo, path: `${base}/insight-card-variants-demo.tsx` },
  "insight-card-plain-demo": { component: InsightCardPlainDemo, path: `${base}/insight-card-plain-demo.tsx` },
  "dot-plot-card-demo": { component: DotPlotCardDemo, path: `${base}/dot-plot-card-demo.tsx` },
  "breakdown-card-demo": { component: BreakdownCardDemo, path: `${base}/breakdown-card-demo.tsx` },
  "metric-tabs-chart-card-demo": { component: MetricTabsChartCardDemo, path: `${base}/metric-tabs-chart-card-demo.tsx` },
  "activity-rings-demo": { component: ActivityRingsDemo, path: `${base}/activity-rings-demo.tsx` },
  "activity-rings-card-demo": { component: ActivityRingsCardDemo, path: `${base}/activity-rings-card-demo.tsx` },
  "activity-rings-card-side-demo": { component: ActivityRingsCardSideDemo, path: `${base}/activity-rings-card-side-demo.tsx` },
} satisfies Record<string, ExampleEntry>

export type ExampleName = keyof typeof examples
