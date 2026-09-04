import { ActivityRings } from "@/registry/dashboardcn/ui/activity-rings"

export default function ActivityRingsDemo() {
  return (
    <ActivityRings
      rings={[
        { label: "Move", value: 1592, max: 1800, color: "var(--color-pink-500)" },
        { label: "Exercise", value: 105, max: 120, color: "var(--color-lime-500)" },
        { label: "Stand", value: 9, max: 12, color: "var(--color-sky-500)" },
      ]}
    >
      <span className="text-2xl font-semibold tabular-nums">82%</span>
      <span className="text-muted-foreground text-xs">of goals</span>
    </ActivityRings>
  )
}
