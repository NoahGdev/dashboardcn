import { ActivityRingsCard } from "@/registry/dashboardcn/blocks/activity-rings-card"

export default function ActivityRingsCardSideDemo() {
  return (
    <ActivityRingsCard
      className="w-full max-w-lg"
      title="Weekly goals"
      caption="Sep 1 – Sep 7"
      layout="side"
      size={150}
      thickness={12}
      metrics={[
        { label: "Deploys", value: 42, max: 50, color: "var(--color-emerald-500)" },
        { label: "Reviews", value: 18, max: 30, color: "var(--color-violet-500)" },
        { label: "Issues closed", value: 27, max: 25, color: "var(--color-amber-500)" },
      ]}
      center={
        <>
          <span className="text-xl font-semibold tabular-nums">87</span>
          <span className="text-muted-foreground text-xs">of 105</span>
        </>
      }
    />
  )
}
