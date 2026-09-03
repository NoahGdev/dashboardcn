"use client"

import { PeriodBarChartCard } from "@/registry/dashboardcn/blocks/period-bar-chart-card"

const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"]

const data = months.flatMap((month, m) =>
  Array.from({ length: 4 }, (_, w) => ({
    week: `${month} week ${w + 1}`,
    month,
    spend:
      month === "Mar"
        ? 1_900 + w * 470
        : 800 + Math.round(Math.abs(Math.sin(m * 4 + w)) * 600),
  }))
)

export default function PeriodBarChartCardDemo() {
  return (
    <PeriodBarChartCard
      className="w-full"
      title="Spending"
      data={data}
      xKey="week"
      yKey="spend"
      groupKey="month"
      valueLabel="spending"
      color="var(--color-orange-500)"
      grid="none"
      defaultSelected="Mar"
      ranges={[
        { value: "1y", label: "1Y", points: 48 },
        { value: "6m", label: "6M", points: 24 },
        { value: "3m", label: "3M", points: 12 },
        { value: "1m", label: "1M", points: 4 },
      ]}
      defaultRange="6m"
      tooltipLabel={(row) => String(row.week).replace(/^\w+ /, "")}
    />
  )
}
