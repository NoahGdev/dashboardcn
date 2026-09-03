import { Flame, Sparkles, Waves } from "lucide-react"

import { InsightCard } from "@/registry/dashboardcn/blocks/insight-card"

export default function InsightCardVariantsDemo() {
  return (
    <div className="grid w-full gap-4 md:grid-cols-3">
      <InsightCard
        variant="sunset"
        badge="Trending"
        icon={<Flame />}
        size="md"
        items={[
          {
            value: 12400,
            format: "compact",
            headline: "Signups from social doubled this week.",
            description: "Most came from a single launch thread on Thursday.",
          },
        ]}
      />
      <InsightCard
        variant="ocean"
        badge="Forecast"
        icon={<Waves />}
        size="md"
        items={[
          {
            value: 1.28,
            format: "currency",
            headline: "Cost per lead is projected to fall 9% next month.",
            description: "Driven by improving quality scores on the top three campaigns.",
          },
        ]}
      />
      <InsightCard
        variant="graphite"
        badge="Anomaly"
        icon={<Sparkles />}
        size="md"
        items={[
          {
            value: "3.2s",
            headline: "Checkout latency spiked at 02:14 UTC.",
            description: "Traced to a cold cache after the nightly deploy. Now recovered.",
          },
        ]}
      />
    </div>
  )
}
