"use client"

import * as React from "react"
import { MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  DataTable,
  DataTableColumnHeader,
  createDataTableColumnHelper,
  type DataTableRow,
} from "@/registry/dashboardcn/ui/data-table"

type KeyRow = {
  name: string
  scope: "read" | "write" | "admin"
  lastUsed: string
}

const keys: KeyRow[] = [
  { name: "Production server", scope: "admin", lastUsed: "2 minutes ago" },
  { name: "Staging server", scope: "write", lastUsed: "1 hour ago" },
  { name: "Analytics export", scope: "read", lastUsed: "Yesterday" },
  { name: "CI pipeline", scope: "write", lastUsed: "3 days ago" },
  { name: "Partner sandbox", scope: "read", lastUsed: "2 weeks ago" },
  { name: "Legacy webhook", scope: "read", lastUsed: "Never" },
]

/** One list of actions, rendered by whichever menu asked for it. */
const actions = [
  { label: "Copy key id" },
  { label: "Edit scope" },
  { label: "Revoke", separated: true, destructive: true },
]

function RowMenu({ row }: { row: DataTableRow<KeyRow> }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-7">
          <MoreHorizontal />
          <span className="sr-only">Open menu for {row.original.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {actions.map((action) => (
          <React.Fragment key={action.label}>
            {action.separated ? <DropdownMenuSeparator /> : null}
            <DropdownMenuItem
              variant={action.destructive ? "destructive" : "default"}
            >
              {action.label}
            </DropdownMenuItem>
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const helper = createDataTableColumnHelper<KeyRow>()

const columns = helper.columns([
  helper.accessor("name", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Key" />
    ),
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  }),
  helper.accessor("scope", {
    header: "Scope",
    cell: ({ row }) => (
      <Badge variant={row.original.scope === "admin" ? "secondary" : "outline"}>
        {row.original.scope}
      </Badge>
    ),
  }),
  helper.accessor("lastUsed", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last used" />
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.original.lastUsed}</span>
    ),
  }),
  helper.display({
    id: "actions",
    size: 48,
    enableHiding: false,
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => (
      <div className="flex justify-end">
        <RowMenu row={row} />
      </div>
    ),
  }),
])

export default function DataTableRowActionsDemo() {
  return (
    <div className="flex w-full flex-col gap-3">
      <DataTable
        columns={columns}
        data={keys}
        searchKey="name"
        searchPlaceholder="Filter keys..."
        pageSize={0}
        showPagination={false}
        // renderRow is the escape hatch: wrap the row in whatever you like.
        // Here it becomes a context menu trigger, so the same actions are a
        // right-click away anywhere in the row.
        renderRow={(row, element) => (
          <ContextMenu>
            <ContextMenuTrigger asChild>{element}</ContextMenuTrigger>
            <ContextMenuContent className="w-40">
              {actions.map((action) => (
                <React.Fragment key={action.label}>
                  {action.separated ? <ContextMenuSeparator /> : null}
                  <ContextMenuItem
                    variant={action.destructive ? "destructive" : "default"}
                  >
                    {action.label}
                  </ContextMenuItem>
                </React.Fragment>
              ))}
            </ContextMenuContent>
          </ContextMenu>
        )}
      />
      <p className="text-muted-foreground text-sm">
        Right-click a row for the same actions as its ⋯ button.
      </p>
    </div>
  )
}
