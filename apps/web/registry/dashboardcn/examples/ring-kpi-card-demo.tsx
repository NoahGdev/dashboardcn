import { EllipsisVertical } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RingKpiCard } from "@/registry/dashboardcn/blocks/ring-kpi-card"

const menu = (
  <Button variant="ghost" size="icon-xs" className="text-muted-foreground -mr-1.5">
    <EllipsisVertical />
    <span className="sr-only">More</span>
  </Button>
)

export default function RingKpiCardDemo() {
  return (
    <RingKpiCard
      className="w-full"
      metrics={[
        { label: "API response time", value: 132, previous: 148, unit: "ms", max: 200, invertDelta: true, action: menu },
        { label: "Error rate", value: 1.4, previous: 0.9, unit: "%", max: 5, invertDelta: true, action: menu },
        { label: "Request throughput", value: 4300, previous: 3900, format: "compact", unit: "req/s", max: 5000, action: menu },
      ]}
    />
  )
}
