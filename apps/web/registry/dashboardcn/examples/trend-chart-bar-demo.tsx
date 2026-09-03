"use client"

import { TrendChart } from "@/registry/dashboardcn/ui/trend-chart"
import { formatNumber } from "@/registry/dashboardcn/lib/format"

const data = [
  { month: "Jan", starter: 18400, pro: 26200, enterprise: 31800 },
  { month: "Feb", starter: 19100, pro: 27900, enterprise: 33500 },
  { month: "Mar", starter: 20600, pro: 30400, enterprise: 35200 },
  { month: "Apr", starter: 20100, pro: 31800, enterprise: 38900 },
  { month: "May", starter: 21700, pro: 34100, enterprise: 41600 },
  { month: "Jun", starter: 22900, pro: 36500, enterprise: 44300 },
]

export default function TrendChartBarDemo() {
  return (
    <TrendChart
      type="bar"
      stacked
      data={data}
      xKey="month"
      series={[
        { key: "enterprise", label: "Enterprise", color: "var(--chart-4)" },
        { key: "pro", label: "Pro", color: "var(--chart-2)" },
        { key: "starter", label: "Starter", color: "var(--chart-1)" },
      ]}
      yFormatter={(value) =>
        formatNumber(value, { format: "currency", compact: true, maximumFractionDigits: 0 })
      }
      showLegend
      showYAxis
    />
  )
}
