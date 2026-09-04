import { ActivityRingsCard } from "@/registry/dashboardcn/blocks/activity-rings-card"

export default function ActivityRingsCardDemo() {
  return (
    <ActivityRingsCard
      className="w-full max-w-sm"
      title="Activity"
      caption="Today"
      metrics={[
        { label: "Move", value: 1592, max: 1800, unit: "kcal", color: "var(--color-pink-500)" },
        { label: "Exercise", value: 105, max: 120, display: "1h 45m", color: "var(--color-lime-500)" },
        { label: "Running", value: 5.2, max: 8, unit: "km", color: "var(--color-sky-500)" },
      ]}
    />
  )
}
