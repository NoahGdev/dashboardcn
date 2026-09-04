import { FunnelChart } from "@/registry/dashboardcn/ui/funnel-chart"

const steps = [
  { name: "Applied", value: 1240 },
  { name: "Screened", value: 420 },
  { name: "Phone", value: 96 },
  { name: "Offer", value: 18 },
  { name: "Hired", value: 11 },
]

export default function FunnelChartSharpDemo() {
  return (
    <div className="w-full max-w-lg">
      <FunnelChart
        variant="flow"
        shape="sharp"
        color="var(--foreground)"
        steps={steps}
        height={128}
      />
    </div>
  )
}
