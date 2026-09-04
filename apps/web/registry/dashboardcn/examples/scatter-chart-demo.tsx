"use client"

import { ScatterChart } from "@/registry/dashboardcn/ui/scatter-chart"
import { formatNumber } from "@/registry/dashboardcn/lib/format"

const free = [
  { sessions: 12, revenue: 0 },
  { sessions: 28, revenue: 0 },
  { sessions: 41, revenue: 19 },
  { sessions: 55, revenue: 0 },
  { sessions: 63, revenue: 29 },
  { sessions: 78, revenue: 49 },
  { sessions: 94, revenue: 19 },
  { sessions: 110, revenue: 79 },
]

const pro = [
  { sessions: 68, revenue: 240 },
  { sessions: 95, revenue: 310 },
  { sessions: 132, revenue: 420 },
  { sessions: 148, revenue: 380 },
  { sessions: 176, revenue: 560 },
  { sessions: 203, revenue: 610 },
  { sessions: 231, revenue: 720 },
  { sessions: 258, revenue: 690 },
]

const enterprise = [
  { sessions: 210, revenue: 1_450 },
  { sessions: 265, revenue: 1_820 },
  { sessions: 302, revenue: 1_690 },
  { sessions: 348, revenue: 2_310 },
  { sessions: 390, revenue: 2_640 },
  { sessions: 415, revenue: 2_480 },
]

export default function ScatterChartDemo() {
  return (
    <div className="w-full max-w-lg">
      <ScatterChart
        series={[
          { label: "Free", data: free },
          { label: "Pro", data: pro },
          { label: "Enterprise", data: enterprise },
        ]}
        xKey="sessions"
        yKey="revenue"
        xLabel="Sessions"
        yLabel="Revenue"
        xFormatter={(v) => formatNumber(v)}
        yFormatter={(v) => formatNumber(v, { format: "currency", compact: true })}
        showLegend
      />
    </div>
  )
}
