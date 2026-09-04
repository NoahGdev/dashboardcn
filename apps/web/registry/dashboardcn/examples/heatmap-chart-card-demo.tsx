"use client"

import * as React from "react"

import { HeatmapChartCard } from "@/registry/dashboardcn/blocks/heatmap-chart-card"

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const hours = Array.from({ length: 12 }, (_, i) => String(i * 2).padStart(2, "0"))

// Deterministic sample data with a working-hours peak on weekdays. Longer
// periods accumulate more sessions per bucket and smooth out the noise.
function sampleRows(seed: number, scale: number, noise: number) {
  const random = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296
    return seed / 4294967296
  }
  return days.map((label, d) => {
    const weekend = d >= 5
    return {
      label,
      values: hours.map((_, h) => {
        const hour = h * 2 + 1
        const shape = Math.exp(-((hour - (weekend ? 15 : 14)) ** 2) / (weekend ? 40 : 22))
        const base = (weekend ? 90 : 320) * shape + (weekend ? 6 : 12)
        return Math.round(base * scale * (1 - noise + random() * noise * 2))
      }),
    }
  })
}

const periods = {
  "7d": { rows: sampleRows(7, 1, 0.25), delta: 0.082, deltaLabel: "vs previous 7 days" },
  "30d": { rows: sampleRows(30, 4.2, 0.15), delta: 0.041, deltaLabel: "vs previous 30 days" },
  "90d": { rows: sampleRows(90, 12.5, 0.08), delta: -0.023, deltaLabel: "vs previous 90 days" },
}

type Period = keyof typeof periods

export default function HeatmapChartCardDemo() {
  const [period, setPeriod] = React.useState<Period>("7d")
  const current = periods[period]
  return (
    <HeatmapChartCard
      className="w-full max-w-xl"
      title="Active users"
      rows={current.rows}
      columns={hours}
      unit="sessions"
      delta={current.delta}
      deltaLabel={current.deltaLabel}
      periods={[
        { value: "7d", label: "7D" },
        { value: "30d", label: "30D" },
        { value: "90d", label: "90D" },
      ]}
      period={period}
      onPeriodChange={(next) => setPeriod(next as Period)}
    />
  )
}
