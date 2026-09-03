"use client"

import { Badge } from "@/components/ui/badge"
import { formatNumber } from "@/registry/dashboardcn/lib/format"
import {
  DataTable,
  DataTableColumnHeader,
  createDataTableColumnHelper,
} from "@/registry/dashboardcn/ui/data-table"

type RegionRow = {
  region: string
  tier: "enterprise" | "growth" | "starter"
  accounts: number
  seats: number
  arr: number
  churn: number
}

const regions: RegionRow[] = [
  { region: "North America", tier: "enterprise", accounts: 184, seats: 24_310, arr: 8_420_000, churn: 0.041 },
  { region: "EMEA", tier: "enterprise", accounts: 141, seats: 17_820, arr: 6_180_000, churn: 0.052 },
  { region: "APAC", tier: "growth", accounts: 96, seats: 8_940, arr: 2_740_000, churn: 0.068 },
  { region: "LATAM", tier: "growth", accounts: 62, seats: 4_120, arr: 1_180_000, churn: 0.081 },
  { region: "Nordics", tier: "starter", accounts: 48, seats: 2_060, arr: 486_000, churn: 0.094 },
  { region: "Benelux", tier: "starter", accounts: 39, seats: 1_540, arr: 361_000, churn: 0.077 },
  { region: "ANZ", tier: "growth", accounts: 34, seats: 2_880, arr: 812_000, churn: 0.058 },
]

const helper = createDataTableColumnHelper<RegionRow>()

const columns = helper.columns([
  helper.accessor("region", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Region" />
    ),
    cell: ({ row }) => <span className="font-medium">{row.original.region}</span>,
  }),
  helper.accessor("tier", {
    header: "Tier",
    cell: ({ row }) => (
      <Badge variant={row.original.tier === "enterprise" ? "secondary" : "outline"}>
        {row.original.tier}
      </Badge>
    ),
  }),
  helper.accessor("accounts", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Accounts" align="right" />
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {formatNumber(row.original.accounts)}
      </div>
    ),
  }),
  helper.accessor("seats", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Seats" align="right" />
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {formatNumber(row.original.seats)}
      </div>
    ),
  }),
  helper.accessor("arr", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ARR" align="right" />
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {formatNumber(row.original.arr, { format: "currency", compact: true })}
      </div>
    ),
  }),
  helper.accessor("churn", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Churn" align="right" />
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {formatNumber(row.original.churn, {
          format: "percent",
          maximumFractionDigits: 1,
        })}
      </div>
    ),
  }),
])

export default function DataTableReorderDemo() {
  return (
    <DataTable
      columns={columns}
      data={regions}
      searchKey="region"
      searchPlaceholder="Filter regions..."
      reorderable
      pageSize={0}
      showPagination={false}
      className="w-full"
    />
  )
}
