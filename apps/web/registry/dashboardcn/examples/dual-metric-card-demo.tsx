import { DualMetricCard } from "@/registry/dashboardcn/blocks/dual-metric-card"

export default function DualMetricCardDemo() {
  return (
    <DualMetricCard
      className="w-full max-w-md"
      title="Leads overview"
      options={[
        { value: "month", label: "This month" },
        { value: "quarter", label: "This quarter" },
        { value: "year", label: "This year" },
      ]}
      metrics={[
        {
          label: "New leads",
          value: 54,
          showShare: true,
          meter: "bar",
          color: "var(--color-violet-500)",
          detail: { label: "Top source", value: "LinkedIn" },
        },
        {
          label: "Returning leads",
          value: 198,
          meter: "ticks",
          color: "var(--color-emerald-500)",
          detail: {
            label: "Conversion rate",
            value: "12.8%",
            description: "Share of returning leads that converted this period.",
          },
        },
      ]}
    />
  )
}
