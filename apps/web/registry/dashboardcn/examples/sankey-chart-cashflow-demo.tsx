"use client"

import { SankeyChart } from "@/registry/dashboardcn/ui/sankey-chart"
import { formatNumber } from "@/registry/dashboardcn/lib/format"

const nodes = [
  { name: "Salary" },
  { name: "Freelance" },
  { name: "Dividends" },
  { name: "Housing" },
  { name: "Savings" },
  { name: "Leisure" },
  { name: "Groceries" },
  { name: "Insurance" },
  { name: "Transport" },
  { name: "Utilities" },
]

// Monthly cash flow, income on the left and budget categories on the right.
const links = [
  { source: "Salary", target: "Housing", value: 2400 },
  { source: "Salary", target: "Savings", value: 1200 },
  { source: "Salary", target: "Groceries", value: 900 },
  { source: "Salary", target: "Transport", value: 600 },
  { source: "Salary", target: "Utilities", value: 500 },
  { source: "Salary", target: "Insurance", value: 600 },
  { source: "Freelance", target: "Leisure", value: 1100 },
  { source: "Freelance", target: "Savings", value: 500 },
  { source: "Freelance", target: "Insurance", value: 200 },
  { source: "Dividends", target: "Savings", value: 200 },
  { source: "Dividends", target: "Leisure", value: 200 },
]

export default function SankeyChartCashflowDemo() {
  return (
    <div className="w-full max-w-lg">
      <SankeyChart
        nodes={nodes}
        links={links}
        valueFormatter={(value) =>
          formatNumber(value, { format: "currency", maximumFractionDigits: 0 })
        }
        nodePadding={12}
      />
    </div>
  )
}
