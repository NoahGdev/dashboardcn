import { AlertTriangle, Boxes, PackageX, Timer } from "lucide-react"

import { KpiRowCard } from "@/registry/dashboardcn/blocks/kpi-row-card"

export default function KpiRowCardDemo() {
  return (
    <KpiRowCard
      className="w-full"
      title="Catalog health"
      description="SKU coverage, replenishment pressure, and aging stock in one pass."
      periods={[
        { value: "week", label: "Week" },
        { value: "month", label: "Month" },
        { value: "year", label: "Year" },
      ]}
      metrics={[
        { icon: <Boxes />, label: "In stock", value: 8_420, delta: 0.054, note: "Rising", trend: [6, 7, 6.5, 7.5, 8, 7.8, 8.4] },
        { icon: <PackageX />, label: "Out of stock", value: 1_245, delta: -0.12, note: "Gaps easing", invertDelta: true, trend: [1.6, 1.5, 1.55, 1.4, 1.3, 1.28, 1.25] },
        { icon: <AlertTriangle />, label: "Pending restock", value: 640, delta: 0.031, note: "Moving", trend: [5.5, 6, 5.8, 6.2, 6.1, 6.3, 6.4] },
        { icon: <Timer />, label: "Slow movers", value: 1_105, delta: 0.006, note: "Stable", invertDelta: true, trend: [1.1, 1.12, 1.09, 1.1, 1.11, 1.1, 1.1] },
      ]}
      footer="12,845 products tracked across categories. 76% currently available in stock."
      action={{ label: "Show full analytics", href: "#" }}
    />
  )
}
