import { MetricValue } from "@/registry/dashboardcn/ui/metric-value"

export default function MetricValueDemo() {
  return (
    <div className="flex flex-col gap-4 text-2xl font-semibold tracking-tight">
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
        <MetricValue value={158143} format="currency" maximumFractionDigits={0} />
        <MetricValue value={1234567} />
        <MetricValue value={0.124} format="percent" />
        <MetricValue value={41194} format="currency" maximumFractionDigits={0} />
      </div>
      <p className="text-muted-foreground text-sm font-normal">
        Values from 100,000 up are abbreviated. Hover one to see the full value, or set
        compactFrom to change the threshold.
      </p>
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
        <MetricValue value={1234567} compactFrom={Infinity} />
        <MetricValue value={41194} format="currency" maximumFractionDigits={0} compactFrom={10_000} />
        <MetricValue value={98} suffix=" ms" compactFrom={10} />
      </div>
    </div>
  )
}
