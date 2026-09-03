import { TickBar } from "@/registry/dashboardcn/ui/tick-bar"

export default function TickBarDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <TickBar value={46} color="var(--color-emerald-500)" />
      <TickBar value={7_420} max={12_300} color="var(--color-violet-500)" />
      <TickBar value={16} max={24} segments={24} shape="pill" color="var(--foreground)" />
    </div>
  )
}
