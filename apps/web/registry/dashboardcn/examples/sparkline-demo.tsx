import { Sparkline } from "@/registry/dashboardcn/ui/sparkline"

const data = [12, 18, 14, 22, 26, 21, 30, 34, 28, 40, 44, 52]

export default function SparklineDemo() {
  return (
    <div className="grid w-full max-w-md gap-6">
      <div className="flex flex-col gap-1.5">
        <span className="text-muted-foreground text-xs">Area</span>
        <Sparkline data={data} className="h-12" />
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="text-muted-foreground text-xs">Line</span>
        <Sparkline data={data} variant="line" className="h-12" />
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="text-muted-foreground text-xs">Custom color, step curve</span>
        <Sparkline
          data={data}
          curve="step"
          color="var(--chart-2)"
          className="h-12"
        />
      </div>
    </div>
  )
}
