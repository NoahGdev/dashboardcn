"use client"

import * as React from "react"
import { Ellipsis } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatNumber } from "@/registry/dashboardcn/lib/format"
import { DataTableCard } from "@/registry/dashboardcn/blocks/data-table-card"
import {
  DataTableColumnHeader,
  createDataTableColumnHelper,
} from "@/registry/dashboardcn/ui/data-table"
import { PeriodTabs } from "@/registry/dashboardcn/ui/period-tabs"

type ProductRow = {
  product: string
  sku: string
  stock: "in stock" | "low" | "out"
  units: number
  refunds: number
  revenue: number
}

const products: ProductRow[] = [
  { product: "Field Notes — 3 pack", sku: "FN-003", stock: "in stock", units: 1_284, refunds: 12, revenue: 19_260 },
  { product: "Enamel mug", sku: "MG-011", stock: "low", units: 942, refunds: 31, revenue: 14_130 },
  { product: "Canvas tote", sku: "TT-204", stock: "in stock", units: 810, refunds: 8, revenue: 12_150 },
  { product: "Sticker sheet", sku: "ST-088", stock: "in stock", units: 764, refunds: 2, revenue: 3_056 },
  { product: "Hoodie — heather", sku: "HD-450", stock: "out", units: 618, refunds: 44, revenue: 37_080 },
  { product: "Cap — six panel", sku: "CP-120", stock: "low", units: 512, revenue: 12_800, refunds: 19 },
  { product: "Water bottle", sku: "WB-330", stock: "in stock", units: 486, refunds: 6, revenue: 14_580 },
  { product: "Socks — two pack", sku: "SK-021", stock: "in stock", units: 402, refunds: 5, revenue: 4_824 },
  { product: "Desk mat", sku: "DM-900", stock: "low", units: 318, refunds: 11, revenue: 12_720 },
  { product: "Pin set", sku: "PN-012", stock: "in stock", units: 254, refunds: 1, revenue: 2_540 },
]

const helper = createDataTableColumnHelper<ProductRow>()

const columns = helper.columns([
  helper.accessor("product", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.product}</span>
        <span className="text-muted-foreground font-mono text-xs">
          {row.original.sku}
        </span>
      </div>
    ),
  }),
  helper.accessor("stock", {
    header: "Stock",
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.stock === "in stock"
            ? "secondary"
            : row.original.stock === "out"
              ? "destructive"
              : "outline"
        }
      >
        {row.original.stock}
      </Badge>
    ),
  }),
  helper.accessor("units", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Units" align="right" />
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {formatNumber(row.original.units)}
      </div>
    ),
  }),
  helper.accessor("refunds", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Refunds" align="right" />
    ),
    cell: ({ row }) => (
      <div className="text-muted-foreground text-right tabular-nums">
        {formatNumber(row.original.refunds)}
      </div>
    ),
  }),
  helper.accessor("revenue", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Revenue" align="right" />
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {formatNumber(row.original.revenue, { format: "currency", compact: true })}
      </div>
    ),
  }),
])

export default function DataTableCardDemo() {
  const [period, setPeriod] = React.useState("month")

  return (
    <DataTableCard
      className="w-full"
      title="Top products"
      description="Units sold and revenue, ranked."
      action={
        <Button
          variant="outline"
          size="icon-sm"
          className="text-muted-foreground rounded-full"
        >
          <Ellipsis />
          <span className="sr-only">More</span>
        </Button>
      }
      toolbar={
        <PeriodTabs value={period} onValueChange={setPeriod} size="sm" />
      }
      columns={columns}
      data={products}
      searchKey="product"
      searchPlaceholder="Filter products..."
      initialSorting={[{ id: "revenue", desc: true }]}
      density="compact"
      pageSize={5}
      pageSizeOptions={[5, 10, 25]}
    />
  )
}
