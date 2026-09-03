"use client"

import { BarChart } from "@/registry/dashboardcn/ui/bar-chart"
import { formatNumber } from "@/registry/dashboardcn/lib/format"

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]

const data = months.flatMap((month, m) =>
  Array.from({ length: 4 }, (_, w) => ({
    week: `${month} week ${w + 1}`,
    month,
    spend:
      month === "Mar"
        ? 1_900 + w * 470
        : 900 + Math.round(Math.abs(Math.sin(m * 4 + w)) * 500),
  }))
)

export default function BarChartDemo() {
  return (
    <BarChart
      data={data}
      xKey="week"
      yKey="spend"
      groupKey="month"
      color="var(--color-orange-500)"
      grid="none"
      highlight={(row) => row.month === "Mar"}
      yFormatter={(value) => formatNumber(value, { format: "currency" })}
      tooltipLabel={(row) => String(row.week).replace(/^\w+ /, "")}
    />
  )
}
