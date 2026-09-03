"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DataTableColumnHeader,
  DataTableContent,
  DataTablePagination,
  DataTableSearch,
  DataTableToolbar,
  DataTableViewOptions,
  createDataTableColumnHelper,
  useDataTable,
} from "@/registry/dashboardcn/ui/data-table"

type TicketRow = {
  subject: string
  requester: string
  status: "open" | "waiting" | "closed"
  priority: "urgent" | "high" | "normal"
  age: string
}

const tickets: TicketRow[] = [
  { subject: "Billing address will not save", requester: "R. Okafor", status: "open", priority: "high", age: "2h" },
  { subject: "SAML login loop after rotation", requester: "M. Lindqvist", status: "open", priority: "urgent", age: "4h" },
  { subject: "Export misses the last row", requester: "J. Alvarez", status: "waiting", priority: "normal", age: "1d" },
  { subject: "Webhook retries fire twice", requester: "P. Nakamura", status: "open", priority: "high", age: "1d" },
  { subject: "Invite email lands in spam", requester: "S. Dube", status: "closed", priority: "normal", age: "3d" },
  { subject: "Chart tooltip clipped on mobile", requester: "A. Fontaine", status: "waiting", priority: "normal", age: "3d" },
  { subject: "Seat count off by one", requester: "K. Brennan", status: "closed", priority: "high", age: "5d" },
  { subject: "API key scopes not enforced", requester: "T. Iqbal", status: "open", priority: "urgent", age: "6d" },
  { subject: "Timezone wrong in digest", requester: "L. Moreau", status: "closed", priority: "normal", age: "8d" },
]

const helper = createDataTableColumnHelper<TicketRow>()

const columns = helper.columns([
  helper.accessor("subject", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subject" />
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.original.subject}</span>
    ),
  }),
  helper.accessor("requester", {
    header: "Requester",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.original.requester}</span>
    ),
  }),
  helper.accessor("status", {
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.status === "open" ? "secondary" : "outline"}>
        {row.original.status}
      </Badge>
    ),
  }),
  helper.accessor("priority", {
    header: "Priority",
    cell: ({ row }) => (
      <span
        className={
          row.original.priority === "urgent"
            ? "text-destructive"
            : "text-muted-foreground"
        }
      >
        {row.original.priority}
      </span>
    ),
  }),
  helper.accessor("age", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Age" align="right" />
    ),
    cell: ({ row }) => (
      <div className="text-muted-foreground text-right tabular-nums">
        {row.original.age}
      </div>
    ),
  }),
])

const statuses = ["open", "waiting", "closed"]

export default function DataTableComposedDemo() {
  // Own the instance, then lay the pieces out however the design calls for.
  const table = useDataTable({ columns, data: tickets, pageSize: 5 })

  const status = table.getColumn("status")
  const active = (status?.getFilterValue() as string) ?? ""

  return (
    <Card className="w-full gap-4">
      <CardHeader>
        <CardTitle>Support queue</CardTitle>
        <CardDescription>Unresolved tickets across all plans.</CardDescription>
        <CardAction>
          <DataTableViewOptions table={table} />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <DataTableToolbar>
          <DataTableSearch
            table={table}
            column="subject"
            placeholder="Filter tickets..."
          />
          <div className="ml-auto flex items-center gap-1">
            {statuses.map((value) => (
              <Button
                key={value}
                variant={active === value ? "secondary" : "ghost"}
                size="sm"
                className="h-8 capitalize"
                onClick={() =>
                  status?.setFilterValue(active === value ? "" : value)
                }
              >
                {value}
              </Button>
            ))}
          </div>
        </DataTableToolbar>
        <DataTableContent
          table={table}
          density="compact"
          emptyMessage="No tickets match that filter."
        />
      </CardContent>
      <CardFooter>
        <DataTablePagination
          table={table}
          pageSizeOptions={[5, 10, 25]}
          className="w-full"
        />
      </CardFooter>
    </Card>
  )
}
