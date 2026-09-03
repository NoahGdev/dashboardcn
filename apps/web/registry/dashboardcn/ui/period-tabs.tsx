"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export interface PeriodOption {
  value: string
  label: string
}

export const defaultPeriods: PeriodOption[] = [
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
]

export interface PeriodTabsProps
  extends Omit<React.ComponentProps<typeof Tabs>, "children"> {
  options?: PeriodOption[]
  size?: "sm" | "default"
}

/** Small segmented control for switching a chart's time range. */
function PeriodTabs({
  options = defaultPeriods,
  size = "sm",
  className,
  ...props
}: PeriodTabsProps) {
  return (
    <Tabs data-slot="period-tabs" className={cn("w-fit", className)} {...props}>
      <TabsList className={cn(size === "sm" && "h-7 p-0.5")}>
        {options.map((option) => (
          <TabsTrigger
            key={option.value}
            value={option.value}
            className={cn(size === "sm" && "h-6 px-2.5 text-xs")}
          >
            {option.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

export { PeriodTabs }
