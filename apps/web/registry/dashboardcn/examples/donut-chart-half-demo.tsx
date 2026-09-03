"use client"

import { DonutChart } from "@/registry/dashboardcn/ui/donut-chart"
import { formatNumber } from "@/registry/dashboardcn/lib/format"

const sources = [
  { name: "Institutional", value: 4_200_000, color: "var(--chart-2)" },
  { name: "Retail", value: 2_100_000, color: "var(--chart-1)" },
  { name: "Treasury", value: 900_000, color: "var(--chart-4)" },
]

export default function DonutChartHalfDemo() {
  return (
    <div className="w-full max-w-sm">
      <DonutChart
        data={sources}
        startAngle={180}
        sweep={180}
        innerRadius={0.75}
        centerLabel="Capital inflows"
        valueFormatter={(v) => formatNumber(v, { format: "currency", maximumFractionDigits: 0 })}
        centerValue={formatNumber(7_200_000, { format: "compact" })}
        showLegend
        className="max-h-56"
      />
    </div>
  )
}
