"use client"

import { ComposedChart } from "@/registry/dashboardcn/ui/composed-chart"
import { formatNumber } from "@/registry/dashboardcn/lib/format"

const data = [
  { month: "Jan", sales: 42_000, goal: 40_000 },
  { month: "Feb", sales: 38_500, goal: 41_000 },
  { month: "Mar", sales: 47_200, goal: 42_000 },
  { month: "Apr", sales: 51_800, goal: 43_000 },
  { month: "May", sales: 49_100, goal: 44_000 },
  { month: "Jun", sales: 56_400, goal: 45_000 },
  { month: "Jul", sales: 61_900, goal: 46_000 },
  { month: "Aug", sales: 58_300, goal: 47_000 },
]

export default function ComposedChartDemo() {
  return (
    <ComposedChart
      data={data}
      xKey="month"
      series={[
        { key: "sales", label: "Sales", type: "area", highlightMax: true },
        { key: "goal", label: "Goal", type: "line", dashed: true, color: "var(--muted-foreground)" },
      ]}
      referenceLines={[{ y: 50_000, label: "Target" }]}
      yFormatter={(v) => formatNumber(v, { format: "compact" })}
      showYAxis
      showLegend
    />
  )
}
