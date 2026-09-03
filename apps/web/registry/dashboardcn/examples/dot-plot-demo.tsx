import { DotPlot } from "@/registry/dashboardcn/ui/dot-plot"

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const hourly = [1, 1, 2, 1, 2, 4, 6, 4, 2, 1, 2, 1, 1, 1]

export default function DotPlotDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8">
      <DotPlot data={hourly} color="var(--color-green-600)" />
      <DotPlot data={[3, 5, 8, 12, 7, 4, 2]} labels={days} color="var(--color-blue-600)" />
      <DotPlot data={[2, 3, 5, 4, 6, 3, 2]} labels={days} rows={4} emphasis={0} color="var(--foreground)" className="[--dot-size:0.875rem]" />
    </div>
  )
}
