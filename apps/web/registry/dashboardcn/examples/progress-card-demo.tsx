import { EllipsisVertical, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProgressCard } from "@/registry/dashboardcn/blocks/progress-card"

export default function ProgressCardDemo() {
  return (
    <ProgressCard
      className="w-full max-w-sm"
      title="Compliance checks"
      icon={<ShieldCheck />}
      action={
        <Button variant="ghost" size="icon-xs" className="text-muted-foreground -mr-1.5">
          <EllipsisVertical />
          <span className="sr-only">More</span>
        </Button>
      }
      value={16}
      max={24}
      label="checks passing"
      detail="67% assigned"
    />
  )
}
