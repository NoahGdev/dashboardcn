"use client"

import { TrendChart } from "@/registry/dashboardcn/ui/trend-chart"

const data = Array.from({ length: 24 }, (_, hour) => ({
  hour: `${String(hour).padStart(2, "0")}:00`,
  p50: 120 + Math.round(Math.sin(hour / 3) * 30),
  p95: 340 + Math.round(Math.cos(hour / 4) * 90),
}))

export default function TrendChartLineDemo() {
  return (
    <TrendChart
      type="line"
      data={data}
      xKey="hour"
      series={[
        { key: "p50", label: "p50" },
        { key: "p95", label: "p95" },
      ]}
      yFormatter={(value) => `${value} ms`}
      showLegend
      showYAxis
    />
  )
}
