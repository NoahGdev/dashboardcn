"use client"

import { TrendChart } from "@/registry/dashboardcn/ui/trend-chart"
import { formatNumber } from "@/registry/dashboardcn/lib/format"

const data = [
  { month: "Jan", new: 4200, expansion: 1800, churned: -900 },
  { month: "Feb", new: 3900, expansion: 2100, churned: -1100 },
  { month: "Mar", new: 5100, expansion: 2400, churned: -800 },
  { month: "Apr", new: 4700, expansion: 2600, churned: -1300 },
  { month: "May", new: 5600, expansion: 3000, churned: -1000 },
  { month: "Jun", new: 6100, expansion: 3300, churned: -1200 },
]

export default function TrendChartBarDemo() {
  return (
    <TrendChart
      type="bar"
      stacked
      data={data}
      xKey="month"
      series={[
        { key: "new", label: "New" },
        { key: "expansion", label: "Expansion" },
        { key: "churned", label: "Churned", color: "var(--color-red-500)" },
      ]}
      yFormatter={(value) => formatNumber(value, { format: "currency", maximumFractionDigits: 0 })}
      showLegend
      showYAxis
    />
  )
}
