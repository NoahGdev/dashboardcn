import { DeltaBadge } from "@/registry/dashboardcn/ui/delta-badge"

export default function DeltaBadgeDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <DeltaBadge delta={0.124} />
        <DeltaBadge delta={-0.032} />
        <DeltaBadge delta={0} />
        <DeltaBadge delta={0.08} invert />
      </div>
      <div className="flex items-center gap-3">
        <DeltaBadge delta={0.124} variant="soft" />
        <DeltaBadge delta={-0.032} variant="soft" />
        <DeltaBadge delta={0} variant="soft" />
      </div>
      <div className="flex items-center gap-3">
        <DeltaBadge delta={0.124} variant="text" />
        <DeltaBadge delta={-0.032} variant="text" showIcon={false} />
      </div>
    </div>
  )
}
