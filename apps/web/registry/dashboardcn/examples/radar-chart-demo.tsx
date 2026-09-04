"use client"

import { RadarChart } from "@/registry/dashboardcn/ui/radar-chart"

const data = [
  { month: "January", visitors: 186_000 },
  { month: "February", visitors: 305_000 },
  { month: "March", visitors: 237_000 },
  { month: "April", visitors: 273_000 },
  { month: "May", visitors: 209_000 },
  { month: "June", visitors: 214_000 },
]

export default function RadarChartDemo() {
  return (
    <div className="w-full max-w-lg">
      <RadarChart
        data={data}
        angleKey="month"
        series={[{ key: "visitors", label: "Visitors" }]}
      />
    </div>
  )
}
