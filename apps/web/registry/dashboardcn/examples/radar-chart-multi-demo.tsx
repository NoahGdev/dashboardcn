"use client"

import { RadarChart } from "@/registry/dashboardcn/ui/radar-chart"

const data = [
  { month: "January", desktop: 186_000, mobile: 80_000 },
  { month: "February", desktop: 305_000, mobile: 200_000 },
  { month: "March", desktop: 237_000, mobile: 120_000 },
  { month: "April", desktop: 73_000, mobile: 190_000 },
  { month: "May", desktop: 209_000, mobile: 130_000 },
  { month: "June", desktop: 214_000, mobile: 140_000 },
]

export default function RadarChartMultiDemo() {
  return (
    <div className="w-full max-w-lg">
      <RadarChart
        data={data}
        angleKey="month"
        series={[
          { key: "desktop", label: "Desktop" },
          { key: "mobile", label: "Mobile" },
        ]}
        variant="line"
        showLegend
      />
    </div>
  )
}
