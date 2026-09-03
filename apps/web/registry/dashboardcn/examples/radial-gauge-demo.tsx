import { RadialGauge } from "@/registry/dashboardcn/ui/radial-gauge"

export default function RadialGaugeDemo() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-10">
      <RadialGauge value={99.7} segments={40} size={180} thickness={12} color="var(--color-emerald-500)">
        <span className="text-2xl font-semibold tabular-nums">99.7%</span>
        <span className="text-muted-foreground text-xs">Uptime</span>
      </RadialGauge>
      <RadialGauge value={48} size={180} thickness={12}>
        <span className="text-2xl font-semibold tabular-nums">48%</span>
        <span className="text-muted-foreground text-xs">Coverage</span>
      </RadialGauge>
      <RadialGauge value={72} sweep={360} size={120} thickness={8} color="var(--chart-2)">
        <span className="text-lg font-semibold tabular-nums">72</span>
      </RadialGauge>
    </div>
  )
}
