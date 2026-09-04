"use client"

import * as React from "react"

import { GoalChartCard } from "@/registry/dashboardcn/blocks/goal-chart-card"

const week = [
  { day: "Mon", steps: 5_200 },
  { day: "Tue", steps: 3_100 },
  { day: "Wed", steps: 6_800 },
  { day: "Thu", steps: 2_400 },
  { day: "Fri", steps: 4_700 },
  { day: "Sat", steps: 5_600 },
  { day: "Sun", steps: 3_800 },
]

const month = Array.from({ length: 30 }, (_, i) => ({
  day: `2025-06-${String(i + 1).padStart(2, "0")}`,
  steps: 1_800 + ((i * 1_733) % 5_400),
}))

const data = { week, month }

export default function GoalChartCardDemo() {
  const [period, setPeriod] = React.useState<keyof typeof data>("week")

  return (
    <GoalChartCard
      className="w-full max-w-xl"
      title="Steps"
      unit="total steps"
      data={data[period]}
      xKey="day"
      yKey="steps"
      goal={4_000}
      color="var(--color-emerald-500)"
      delta={period === "week" ? 0.12 : 0.04}
      deltaLabel={period === "week" ? "vs last week" : "vs last month"}
      periods={[
        { value: "week", label: "Week" },
        { value: "month", label: "Month" },
      ]}
      period={period}
      onPeriodChange={(next) => setPeriod(next as keyof typeof data)}
    />
  )
}
