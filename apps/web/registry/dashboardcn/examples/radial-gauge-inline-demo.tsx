import { Card, CardContent } from "@/components/ui/card"
import { DeltaBadge } from "@/registry/dashboardcn/ui/delta-badge"
import { RadialGauge } from "@/registry/dashboardcn/ui/radial-gauge"

const metrics = [
  { label: "API response time", value: "132 ms", pct: 66, delta: -0.108, invert: true },
  { label: "Error rate", value: "1.4 %", pct: 28, delta: 0.05, invert: true },
  { label: "Throughput", value: "4.3k req/s", pct: 86, delta: 0.1 },
]

export default function RadialGaugeInlineDemo() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-3">
      {metrics.map((m) => (
        <Card key={m.label} className="py-4">
          <CardContent className="flex flex-col gap-3 px-4">
            <span className="text-muted-foreground text-sm">{m.label}</span>
            <div className="flex items-center gap-3">
              <RadialGauge
                value={m.pct}
                sweep={360}
                size={36}
                thickness={4}
                segments={12}
                gap={6}
                color="var(--color-emerald-500)"
              />
              <span className="text-2xl font-semibold tabular-nums">{m.value}</span>
            </div>
            <DeltaBadge delta={m.delta} invert={m.invert} variant="text" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
