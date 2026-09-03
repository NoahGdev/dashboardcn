"use client"

import { ComposedChart } from "@/registry/dashboardcn/ui/composed-chart"
import { formatNumber } from "@/registry/dashboardcn/lib/format"

const data = Array.from({ length: 14 }, (_, i) => ({
  date: `2026-08-${String(i + 4).padStart(2, "0")}`,
  views: 12_000 + Math.round(Math.sin(i / 2) * 3_000 + i * 400),
  sales: 180 + Math.round(Math.cos(i / 3) * 40 + i * 12),
}))

export default function ComposedChartDualAxisDemo() {
  return (
    <ComposedChart
      data={data}
      xKey="date"
      series={[
        { key: "views", label: "Page views", type: "bar", color: "var(--chart-1)" },
        { key: "sales", label: "Sales", type: "line", axis: "right", color: "var(--chart-4)", dots: true },
      ]}
      yFormatter={(v) => formatNumber(v, { format: "compact" })}
      rightYFormatter={(v) => formatNumber(v)}
      showYAxis
      showLegend
    />
  )
}
