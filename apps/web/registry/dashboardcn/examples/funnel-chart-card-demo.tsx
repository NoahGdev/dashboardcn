import { FunnelChartCard } from "@/registry/dashboardcn/blocks/funnel-chart-card"

const colors = {
  opened: "var(--color-lime-400)",
  started: "var(--color-blue-500)",
  completed: "var(--color-violet-500)",
  converted: "var(--color-pink-500)",
}

const ranges = [
  {
    value: "7d",
    label: "Last 7 days",
    delta: 0.052,
    steps: [
      { name: "Link opened", value: 197, color: colors.opened },
      { name: "Started", value: 110, color: colors.started },
      { name: "Completed", value: 77, color: colors.completed },
      { name: "Converted", value: 38, color: colors.converted },
    ],
  },
  {
    value: "30d",
    label: "Last 30 days",
    delta: 0.118,
    steps: [
      { name: "Link opened", value: 842, color: colors.opened },
      { name: "Started", value: 512, color: colors.started },
      { name: "Completed", value: 301, color: colors.completed },
      { name: "Converted", value: 129, color: colors.converted },
    ],
  },
  {
    value: "90d",
    label: "Last 90 days",
    delta: -0.021,
    steps: [
      { name: "Link opened", value: 2610, color: colors.opened },
      { name: "Started", value: 1380, color: colors.started },
      { name: "Completed", value: 902, color: colors.completed },
      { name: "Converted", value: 355, color: colors.converted },
    ],
  },
]

export default function FunnelChartCardDemo() {
  return (
    <FunnelChartCard
      className="w-full max-w-xl"
      title="Sign-up funnel"
      deltaLabel="vs previous period"
      ranges={ranges}
    />
  )
}
