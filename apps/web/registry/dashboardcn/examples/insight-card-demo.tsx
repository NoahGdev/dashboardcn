import { InsightCard } from "@/registry/dashboardcn/blocks/insight-card"

export default function InsightCardDemo() {
  return (
    <InsightCard
      className="w-full max-w-sm"
      badge="Insights"
      interval={6000}
      items={[
        {
          value: 0.75,
          format: "percent",
          headline: "Authorization rate increased by 4% compared to last week.",
          description:
            "This improvement reduced failed transactions by 950 and is projected to recover $12,400.",
        },
        {
          value: 2.1,
          format: "currency",
          headline: "Average order value is up $2.10 since the checkout redesign.",
          description:
            "Bundled add-ons account for most of the lift, led by extended warranties.",
        },
        {
          value: 38,
          headline: "38 high-value customers have not ordered in 60 days.",
          description:
            "Together they made up 11% of revenue last quarter. A win-back offer is recommended.",
        },
      ]}
    />
  )
}
