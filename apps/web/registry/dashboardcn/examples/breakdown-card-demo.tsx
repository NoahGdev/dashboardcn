import { Ellipsis } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BreakdownCard } from "@/registry/dashboardcn/blocks/breakdown-card"

export default function BreakdownCardDemo() {
  return (
    <BreakdownCard
      className="w-full max-w-sm"
      title="Gross volume"
      action={
        <Button variant="outline" size="icon-sm" className="text-muted-foreground rounded-full">
          <Ellipsis />
          <span className="sr-only">More</span>
        </Button>
      }
      total={41_540}
      delta={0.15}
      items={[
        { name: "Online payments", value: 26_800, color: "var(--color-emerald-500)" },
        { name: "Subscriptions", value: 10_400, color: "var(--color-blue-500)" },
        { name: "In-store sales", value: 4_340, color: "var(--color-pink-500)" },
      ]}
    />
  )
}
