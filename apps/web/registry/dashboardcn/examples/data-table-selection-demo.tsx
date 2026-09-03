"use client"

import * as React from "react"
import { Download, Trash2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatNumber } from "@/registry/dashboardcn/lib/format"
import {
  DataTable,
  DataTableColumnHeader,
  createDataTableColumnHelper,
  createSelectionColumn,
} from "@/registry/dashboardcn/ui/data-table"

type InvoiceRow = {
  id: string
  customer: string
  status: "paid" | "open" | "overdue"
  issued: string
  amount: number
}

const invoices: InvoiceRow[] = [
  { id: "INV-2841", customer: "Northwind Traders", status: "paid", issued: "2026-08-02", amount: 12_400 },
  { id: "INV-2842", customer: "Contoso", status: "open", issued: "2026-08-04", amount: 3_180 },
  { id: "INV-2843", customer: "Fabrikam", status: "overdue", issued: "2026-07-11", amount: 8_960 },
  { id: "INV-2844", customer: "Tailspin Toys", status: "paid", issued: "2026-08-09", amount: 1_240 },
  { id: "INV-2845", customer: "Adventure Works", status: "open", issued: "2026-08-12", amount: 22_500 },
  { id: "INV-2846", customer: "Proseware", status: "paid", issued: "2026-08-14", amount: 640 },
  { id: "INV-2847", customer: "Wide World Importers", status: "overdue", issued: "2026-06-28", amount: 15_820 },
  { id: "INV-2848", customer: "Lucerne Publishing", status: "open", issued: "2026-08-19", amount: 4_075 },
]

const helper = createDataTableColumnHelper<InvoiceRow>()

const columns = helper.columns([
  createSelectionColumn<InvoiceRow>(),
  helper.accessor("id", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Invoice" />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-xs">{row.original.id}</span>
    ),
  }),
  helper.accessor("customer", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
  }),
  helper.accessor("status", {
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.status === "paid"
            ? "secondary"
            : row.original.status === "overdue"
              ? "destructive"
              : "outline"
        }
      >
        {row.original.status}
      </Badge>
    ),
  }),
  helper.accessor("issued", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Issued" />
    ),
    sortFn: "datetime",
    cell: ({ row }) => (
      <span className="text-muted-foreground tabular-nums">
        {row.original.issued}
      </span>
    ),
  }),
  helper.accessor("amount", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" align="right" />
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {formatNumber(row.original.amount, { format: "currency" })}
      </div>
    ),
  }),
])

export default function DataTableSelectionDemo() {
  const [selected, setSelected] = React.useState<string[]>([])

  return (
    <div className="flex w-full flex-col gap-3">
      <DataTable
        columns={columns}
        data={invoices}
        searchKey="customer"
        searchPlaceholder="Filter customers..."
        enableRowSelection
        getRowId={(row) => row.id}
        onRowSelectionChange={(selection) =>
          setSelected(Object.keys(selection))
        }
        selectionActions={
          <>
            <Button variant="outline" size="sm" className="h-8">
              <Download />
              Export
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              <Trash2 />
              Void
            </Button>
          </>
        }
        pageSize={0}
        showPagination={false}
      />
      <p className="text-muted-foreground text-sm">
        Shift-click a checkbox to select a range. Selected:{" "}
        {selected.length ? selected.join(", ") : "none"}
      </p>
    </div>
  )
}
