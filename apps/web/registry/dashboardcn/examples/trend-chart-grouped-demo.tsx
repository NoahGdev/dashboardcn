"use client"

import { TrendChart } from "@/registry/dashboardcn/ui/trend-chart"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const data = [
  { day: "Mon", current: 118, previous: 88 },
  { day: "Tue", current: 178, previous: 146 },
  { day: "Wed", current: 148, previous: 168 },
  { day: "Thu", current: 208, previous: 138 },
  { day: "Fri", current: 186, previous: 158 },
  { day: "Sat", current: 78, previous: 98 },
  { day: "Sun", current: 58, previous: 68 },
]

export default function TrendChartGroupedDemo() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Weekly Orders</CardTitle>
        <CardDescription>This week vs last week</CardDescription>
      </CardHeader>
      <CardContent>
        <TrendChart
          type="bar"
          data={data}
          xKey="day"
          series={[
            { key: "current", label: "This week", color: "var(--color-blue-500)" },
            { key: "previous", label: "Last week", color: "var(--color-blue-800)" },
          ]}
          barRadius="full"
          barSize={10}
          showYAxis
          showLegend
          legendPosition="top"
          legendAlign="right"
        />
      </CardContent>
    </Card>
  )
}
