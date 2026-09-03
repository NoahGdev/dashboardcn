"use client"

import { SegmentedMeter } from "@/registry/dashboardcn/ui/segmented-meter"

const zones = [
  { label: "Rest", from: 60, to: 110, color: "var(--color-sky-500)" },
  { label: "Fat burn", from: 110, to: 140, color: "var(--color-emerald-500)" },
  { label: "Cardio", from: 140, to: 170, color: "var(--color-amber-500)" },
  { label: "Peak", from: 170, to: 190, color: "var(--color-red-500)" },
]

export default function SegmentedMeterDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-semibold tabular-nums">142</span>
          <span className="text-muted-foreground">bpm</span>
        </div>
        <span className="text-sm font-medium">Heart rate zone</span>
        <SegmentedMeter value={142} zones={zones} tickFormatter={(v) => `${v}bpm`} />
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium">All zones, with labels</span>
        <SegmentedMeter
          value={142}
          zones={zones}
          highlightActive={false}
          showTicks={false}
          showLabels
        />
      </div>
    </div>
  )
}
