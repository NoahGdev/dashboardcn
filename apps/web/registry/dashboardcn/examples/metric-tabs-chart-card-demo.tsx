"use client"

import { MetricTabsChartCard } from "@/registry/dashboardcn/blocks/metric-tabs-chart-card"

const noise = (n: number) => {
  const x = Math.sin(n * 12.9898) * 43758.5453
  return x - Math.floor(x) - 0.5
}

const series = (base: number, swing: number, seed: number, drift = 0) =>
  Array.from({ length: 31 }, (_, i) =>
    Math.round(base + drift * i + swing * (0.6 * noise(i + seed) + 0.4 * Math.sin(i / 3 + seed)))
  )

const spend = series(1_380, 260, 1, -4)
const spendPrev = series(1_500, 220, 7)
const revenue = series(5_450, 1_100, 2, -20)
const revenuePrev = series(3_700, 700, 8)
const customers = series(88, 22, 3, -0.4)
const customersPrev = series(60, 14, 9)

const data = Array.from({ length: 31 }, (_, i) => ({
  date: `2025-07-${String(i + 1).padStart(2, "0")}`,
  revenue: revenue[i]!,
  revenuePrev: revenuePrev[i]!,
  spend: spend[i]!,
  spendPrev: spendPrev[i]!,
  roas: revenue[i]! / spend[i]!,
  roasPrev: revenuePrev[i]! / spendPrev[i]!,
  customers: customers[i]!,
  customersPrev: customersPrev[i]!,
  cac: spend[i]! / customers[i]!,
  cacPrev: spendPrev[i]! / customersPrev[i]!,
}))

export default function MetricTabsChartCardDemo() {
  return (
    <MetricTabsChartCard
      className="w-full"
      data={data}
      xKey="date"
      metrics={[
        { key: "revenue", compareKey: "revenuePrev", label: "Revenue", format: "currency", fractionDigits: 0 },
        { key: "spend", compareKey: "spendPrev", label: "Ad spend", format: "currency", fractionDigits: 0, invertDelta: true },
        { key: "roas", compareKey: "roasPrev", label: "ROAS", aggregate: "average", fractionDigits: 2 },
        { key: "customers", compareKey: "customersPrev", label: "New customers" },
        { key: "cac", compareKey: "cacPrev", label: "Cost / new customer", aggregate: "average", format: "currency", invertDelta: true },
      ]}
    />
  )
}
