import { EllipsisVertical } from "lucide-react"

import { Button } from "@/components/ui/button"
import { InsightCard } from "@/registry/dashboardcn/blocks/insight-card"

export default function InsightCardPlainDemo() {
  return (
    <InsightCard
      className="w-full max-w-sm"
      variant="plain"
      badge="Insights"
      action={
        <Button variant="ghost" size="icon-xs" className="text-muted-foreground -mr-1.5">
          <EllipsisVertical />
          <span className="sr-only">More</span>
        </Button>
      }
      items={[
        {
          value: 0.75,
          format: "percent",
          headline: "Authorization rate increased by 4% compared to last week.",
          description:
            "This improvement reduced failed transactions by 950 and is projected to recover $12,400.",
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
