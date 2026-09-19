import { BadgeDollarSign, ShoppingCart } from "lucide-react"

import { CommerceKpiRow } from "@/registry/dashboardcn/blocks/commerce-kpi-row"

export default function CommerceKpiRowDemo() {
  return (
    <CommerceKpiRow
      className="w-full"
      metrics={[
        { label: "Total revenue", value: 284920, format: "currency", delta: 0.082, deltaLabel: "vs prior 30 days", trend: [2, 4, 6, 9, 8, 11, 7], icon: <BadgeDollarSign /> },
        { label: "Orders", value: 1842, delta: 0.041, deltaLabel: "vs prior 30 days", trend: [3, 7, 5, 10, 6, 11, 9], icon: <ShoppingCart /> },
      ]}
    />
  )
}
