import { MetricList } from "@/registry/dashboardcn/ui/metric-list"

const items = [
  { label: "Orders", value: 2_865, delta: 0.18, trend: [12, 14, 13, 18, 22, 21, 26] },
  { label: "Response time", value: "135 ms", delta: 0.14, invertDelta: true, trend: [140, 130, 128, 135, 150, 142, 135] },
  { label: "Revenue", value: 8_670, format: "currency" as const, delta: 0.15, trend: [5, 6, 6.5, 6, 7.2, 8.1, 8.6] },
  { label: "Users", value: 1_425, delta: 0.15, trend: [900, 950, 1_010, 1_100, 1_180, 1_320, 1_425] },
  { label: "Refunds", value: 42, delta: -0.06, invertDelta: true, trend: [50, 48, 51, 46, 44, 45, 42] },
]

export default function MetricListDemo() {
  return (
    <div className="w-full max-w-md">
      <MetricList items={items} />
    </div>
  )
}
