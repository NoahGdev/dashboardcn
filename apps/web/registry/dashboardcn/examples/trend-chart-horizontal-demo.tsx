"use client"

import { TrendChart } from "@/registry/dashboardcn/ui/trend-chart"
import { formatNumber } from "@/registry/dashboardcn/lib/format"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const data = [
  { product: "Widgets", units: 1850 },
  { product: "Gadgets", units: 1580 },
  { product: "Modules", units: 1230 },
  { product: "Plugins", units: 980 },
  { product: "Add-ons", units: 740 },
]

export default function TrendChartHorizontalDemo() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
        <CardDescription>Units sold this quarter</CardDescription>
      </CardHeader>
      <CardContent>
        <TrendChart
          type="bar"
          layout="horizontal"
          data={data}
          xKey="product"
          series={[{ key: "units", label: "Units", color: "var(--color-blue-500)" }]}
          barRadius="full"
          barSize={14}
          showGrid={false}
          showYAxis
          yFormatter={(value) => formatNumber(value, { format: "compact" })}
          className="h-56"
        />
      </CardContent>
    </Card>
  )
}
