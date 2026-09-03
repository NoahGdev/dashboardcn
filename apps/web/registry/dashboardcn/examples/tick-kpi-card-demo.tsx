import { EllipsisVertical, FileText, Landmark, Package } from "lucide-react"

import { Button } from "@/components/ui/button"
import { TickKpiCard } from "@/registry/dashboardcn/blocks/tick-kpi-card"

const menu = (
  <Button variant="ghost" size="icon-xs" className="text-muted-foreground -mr-1.5">
    <EllipsisVertical />
    <span className="sr-only">More</span>
  </Button>
)

export default function TickKpiCardDemo() {
  return (
    <TickKpiCard
      className="w-full"
      metrics={[
        { icon: <FileText />, label: "Open invoices", value: 512, max: 691, color: "var(--color-emerald-500)", action: menu },
        { icon: <Package />, label: "Stock replenished", value: 7_420, max: 12_300, unit: "units", color: "var(--color-violet-500)", action: menu },
        { icon: <Landmark />, label: "Budget utilized", value: 103_000, max: 2_600_000, format: "compact", color: "var(--color-amber-500)", action: menu },
      ]}
    />
  )
}
