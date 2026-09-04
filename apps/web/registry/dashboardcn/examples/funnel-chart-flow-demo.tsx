import { FunnelChart } from "@/registry/dashboardcn/ui/funnel-chart"

const steps = [
  { name: "Link opened", value: 197, color: "var(--color-lime-400)" },
  { name: "Started", value: 110, color: "var(--color-blue-500)" },
  { name: "Completed", value: 77, color: "var(--color-violet-500)" },
  { name: "Converted", value: 38, color: "var(--color-pink-500)" },
]

export default function FunnelChartFlowDemo() {
  return (
    <div className="w-full max-w-lg">
      <FunnelChart variant="flow" steps={steps} />
    </div>
  )
}
