"use client"

import { BarChart } from "@/registry/dashboardcn/ui/bar-chart"

const data = Array.from({ length: 14 }, (_, i) => {
  const day = i + 1
  const weekend = new Date(2026, 6, day).getDay() % 6 === 0
  return {
    date: `2026-07-${String(day).padStart(2, "0")}`,
    day,
    sessions: weekend ? 40 + i * 2 : 120 + Math.round(Math.abs(Math.cos(i)) * 90),
    weekend,
  }
})

export default function BarChartStripedDemo() {
  return (
    <BarChart
      data={data}
      xKey="date"
      yKey="sessions"
      variant="striped"
      color="var(--color-blue-500)"
      mutedColor="var(--color-blue-500)"
      barRadius={8}
      highlight={(row) => !row.weekend}
      xFormatter={(value) => String(value).slice(-2).replace(/^0/, "")}
      yFormatter={(value) => `${value} sessions`}
    />
  )
}
