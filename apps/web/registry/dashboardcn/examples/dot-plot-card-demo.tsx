import { Ellipsis } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DotPlotCard } from "@/registry/dashboardcn/blocks/dot-plot-card"

const hours = [
  "Sat", "Sun", "Mon", "Tue", "Tue", "Wed", "Wed", "Wed", "Thu", "Thu", "Fri", "Fri", "Sat", "Sat",
]

const menu = (
  <Button variant="outline" size="icon-sm" className="text-muted-foreground rounded-full">
    <Ellipsis />
    <span className="sr-only">More</span>
  </Button>
)

export default function DotPlotCardDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <DotPlotCard
        title="Transactions"
        value={106_000}
        format="compact"
        data={[1, 1, 2, 1, 2, 4, 6, 4, 2, 1, 2, 1, 1, 1]}
        labels={hours}
        delta={34_002}
        color="var(--color-green-600)"
        action={menu}
      />
      <DotPlotCard
        title="Customers"
        value={1_284}
        data={[1, 1, 2, 1, 2, 3, 4, 6, 4, 3, 2, 1, 2, 1, 1, 1]}
        labels={["Sat", "Sun", "Mon", "Mon", "Tue", "Tue", "Wed", "Thu", "Thu", "Fri", "Fri", "Sat", "Sat", "Sun", "Sun", "Sun"]}
        peakLabel="Highest"
        delta={320}
        color="var(--color-blue-600)"
        action={menu}
      />
    </div>
  )
}
