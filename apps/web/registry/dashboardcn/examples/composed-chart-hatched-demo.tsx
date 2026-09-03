"use client"

import { ComposedChart } from "@/registry/dashboardcn/ui/composed-chart"
import { formatNumber } from "@/registry/dashboardcn/lib/format"

const data = [
  { region: "NA", air: 420, sea: 1_280 },
  { region: "EU", air: 380, sea: 1_040 },
  { region: "APAC", air: 610, sea: 1_720 },
  { region: "LATAM", air: 140, sea: 460 },
  { region: "MEA", air: 90, sea: 310 },
]

export default function ComposedChartHatchedDemo() {
  return (
    <ComposedChart
      data={data}
      xKey="region"
      series={[
        { key: "sea", label: "Sea freight", type: "bar" },
        { key: "air", label: "Air freight", type: "bar", pattern: "hatched", color: "var(--chart-4)" },
      ]}
      yFormatter={(v) => `${formatNumber(v)} t`}
      showYAxis
      showLegend
    />
  )
}
