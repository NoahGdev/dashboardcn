"use client"

import * as React from "react"

import { PeriodTabs } from "@/registry/dashboardcn/ui/period-tabs"

export default function PeriodTabsAnimatedDemo() {
  const [period, setPeriod] = React.useState("month")
  return (
    <div className="flex flex-col items-center gap-3">
      <PeriodTabs animated value={period} onValueChange={setPeriod} />
      <span className="text-muted-foreground text-sm">Showing: {period}</span>
    </div>
  )
}
