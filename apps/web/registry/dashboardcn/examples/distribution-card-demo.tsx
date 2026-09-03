"use client"

import * as React from "react"
import { Gem, Hexagon, Triangle } from "lucide-react"

import { DistributionCard } from "@/registry/dashboardcn/blocks/distribution-card"

const funds = [
  { name: "WaveMark Capital", value: 7_928_400, icon: <Gem className="text-teal-500" />, color: "var(--color-teal-500)" },
  { name: "Envato Finances", value: 3_214_900, icon: <Hexagon className="text-amber-500" />, color: "var(--color-amber-500)" },
  { name: "QBridge Tech", value: 1_246_300, icon: <Triangle className="text-orange-500" />, color: "var(--color-orange-500)" },
  { name: "Northline Partners", value: 612_000, icon: <Gem className="text-sky-500" />, color: "var(--color-sky-500)" },
  { name: "Halyard Ventures", value: 388_500, icon: <Hexagon className="text-violet-500" />, color: "var(--color-violet-500)" },
]

export default function DistributionCardDemo() {
  const [limit, setLimit] = React.useState("3")
  return (
    <DistributionCard
      className="w-full max-w-md"
      title="Capital inflows"
      items={funds.slice(0, Number(limit))}
      total={12_400_000}
      delta={390_000}
      valueLabel="Capital in"
      options={[
        { value: "3", label: "Top 3 funds" },
        { value: "5", label: "Top 5 funds" },
      ]}
      value={limit}
      onValueChange={setLimit}
    />
  )
}
