import { FunnelChart } from "@/registry/dashboardcn/ui/funnel-chart"

const steps = [
  { name: "Visited pricing", value: 12_480 },
  { name: "Started signup", value: 4_920 },
  { name: "Verified email", value: 3_610 },
  { name: "Created workspace", value: 2_140 },
  { name: "Upgraded to Pro", value: 412 },
]

export default function FunnelChartDemo() {
  return (
    <div className="w-full max-w-lg">
      <FunnelChart steps={steps} />
    </div>
  )
}
