import { StatusGaugeCard } from "@/registry/dashboardcn/blocks/status-gauge-card"

export default function StatusGaugeCardDemo() {
  return (
    <div className="@container w-full">
      <div className="grid gap-4 @2xl:grid-cols-2">
        <StatusGaugeCard
          title="Performance metrics"
          status="Stable"
          metricLabel="Server uptime"
          value={0.997}
          color="var(--color-emerald-500)"
          people={[
            { name: "shadcn", src: "https://github.com/shadcn.png" },
            { name: "Kai" },
            { name: "Max Leiter", src: "https://github.com/maxleiter.png" },
          ]}
          peopleLabel="6 reviewers"
          action={{ label: "Details", href: "#" }}
        />
        <StatusGaugeCard
          title="Quality metrics"
          status="In review"
          metricLabel="Code coverage"
          value={0.482}
          color="var(--color-amber-500)"
          people={[
            { name: "Evil Rabbit", src: "https://github.com/evilrabbit.png" },
            { name: "shadcn", src: "https://github.com/shadcn.png" },
            { name: "Kai" },
          ]}
          peopleLabel="9 testers"
          action={{ label: "Details", href: "#" }}
        />
      </div>
    </div>
  )
}
