import { DonutChart } from "@/registry/dashboardcn/ui/donut-chart"

const browsers = [
  { name: "Chrome", value: 58_400 },
  { name: "Safari", value: 21_300 },
  { name: "Firefox", value: 8_900 },
  { name: "Edge", value: 6_100 },
  { name: "Other", value: 2_400 },
]

export default function DonutChartDemo() {
  return (
    <div className="w-full max-w-xs">
      <DonutChart
        data={browsers}
        centerLabel="Visitors"
        showLegend
        className="max-h-72"
      />
    </div>
  )
}
