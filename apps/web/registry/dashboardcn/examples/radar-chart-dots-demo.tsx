"use client"

import { RadarChart } from "@/registry/dashboardcn/ui/radar-chart"
import { formatNumber } from "@/registry/dashboardcn/lib/format"

const data = [
  { skill: "Speed", score: 82 },
  { skill: "Reliability", score: 91 },
  { skill: "Design", score: 68 },
  { skill: "Docs", score: 74 },
  { skill: "Support", score: 88 },
]

export default function RadarChartDotsDemo() {
  return (
    <div className="w-full max-w-lg">
      <RadarChart
        data={data}
        angleKey="skill"
        series={[{ key: "score", label: "Score" }]}
        variant="dots"
        grid="circle"
        domain={[0, 100]}
        showRadiusAxis
        valueFormatter={(v) => formatNumber(v)}
      />
    </div>
  )
}
