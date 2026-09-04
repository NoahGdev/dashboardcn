"use client"

import { SankeyChart } from "@/registry/dashboardcn/ui/sankey-chart"

// Sources carry a color; the activities on the right inherit it from their largest inflow.
const nodes = [
  { name: "Focus", color: "var(--color-violet-500)" },
  { name: "Meetings", color: "var(--color-sky-500)" },
  { name: "Breaks", color: "var(--color-lime-500)" },
  { name: "Admin", color: "var(--color-amber-500)" },
  { name: "Learning", color: "var(--color-pink-500)" },
  { name: "Browsing" },
  { name: "Writing" },
  { name: "Coding" },
  { name: "Calls" },
  { name: "Email" },
  { name: "Reading" },
  { name: "Planning" },
]

// Hours per week, sources on the left flowing into activities on the right.
const links = [
  { source: "Focus", target: "Coding", value: 8 },
  { source: "Focus", target: "Writing", value: 7 },
  { source: "Focus", target: "Browsing", value: 3 },
  { source: "Focus", target: "Planning", value: 2 },
  { source: "Meetings", target: "Calls", value: 7 },
  { source: "Meetings", target: "Planning", value: 2 },
  { source: "Meetings", target: "Email", value: 1 },
  { source: "Breaks", target: "Browsing", value: 5 },
  { source: "Breaks", target: "Reading", value: 1 },
  { source: "Admin", target: "Email", value: 5 },
  { source: "Admin", target: "Browsing", value: 2 },
  { source: "Admin", target: "Writing", value: 1 },
  { source: "Learning", target: "Reading", value: 4 },
  { source: "Learning", target: "Browsing", value: 1 },
  { source: "Learning", target: "Writing", value: 1 },
]

export default function SankeyChartDemo() {
  return (
    <div className="w-full max-w-lg">
      <SankeyChart nodes={nodes} links={links} valueFormatter={(value) => `${value}h`} />
    </div>
  )
}
