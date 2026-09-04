import { EllipsisVertical } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScoreGaugeCard } from "@/registry/dashboardcn/blocks/score-gauge-card"

export default function ScoreGaugeCardDemo() {
  return (
    <ScoreGaugeCard
      className="w-full max-w-md"
      title="Sleep score"
      caption="29 Jun - 5 Jul"
      score={98}
      color="var(--color-violet-500)"
      items={[
        { label: "Duration", detail: "7h 50m", value: 49, max: 50 },
        { label: "Bedtime", detail: "11:12 PM", value: 29, max: 30 },
        { label: "Interruptions", detail: "2 times", value: 20, max: 20 },
      ]}
      action={
        <Button variant="ghost" size="icon-xs" className="text-muted-foreground -mr-1.5">
          <EllipsisVertical />
          <span className="sr-only">More</span>
        </Button>
      }
    />
  )
}
