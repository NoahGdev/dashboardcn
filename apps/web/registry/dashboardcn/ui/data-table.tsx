"use client"

import * as React from "react"
import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  flexRender,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_basic,
  sortFn_datetime,
  sortFn_text,
  tableFeatures,
  useTable,
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnVisibilityState,
  type RowData,
  type SortingState,
  type ReactTable,
} from "@tanstack/react-table"
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Settings2,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

/**
 * TanStack Table v9 is feature-gated: only what is registered here ships in
 * the bundle. Sorting, filtering, pagination, and column visibility cover the
 * usual dashboard table.
 */
const dataTableFeatures = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  rowPaginationFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns: { includesString: filterFn_includesString },
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    basic: sortFn_basic,
    datetime: sortFn_datetime,
    text: sortFn_text,
  },
})

type DataTableFeatures = typeof dataTableFeatures

type DataTableColumnDef<TData extends RowData> = ColumnDef<
  DataTableFeatures,
  TData,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any
>

/** Typed column helper bound to the data table's feature set. */
function createDataTableColumnHelper<TData extends RowData>() {
  return createColumnHelper<DataTableFeatures, TData>()
}

export interface DataTableProps<TData extends RowData>
  extends React.ComponentProps<"div"> {
  columns: ReadonlyArray<DataTableColumnDef<TData>>
  data: TData[]
  /** Column id to filter with the search input. Omit to hide the input. */
  searchKey?: string
  searchPlaceholder?: string
  pageSize?: number
  /** Extra toolbar content, rendered between the search input and view options. */
  toolbar?: React.ReactNode
  showViewOptions?: boolean
  showPagination?: boolean
  emptyMessage?: React.ReactNode
}

function DataTable<TData extends RowData>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Filter...",
  pageSize = 10,
  toolbar,
  showViewOptions = true,
  showPagination = true,
  emptyMessage = "No results.",
  className,
  ...props
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<ColumnVisibilityState>({})

  const table = useTable({
    features: dataTableFeatures,
    data,
    columns: columns as DataTableColumnDef<TData>[],
    initialState: { pagination: { pageIndex: 0, pageSize } },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, columnFilters, columnVisibility },
  })

  const searchColumn = searchKey ? table.getColumn(searchKey) : undefined
  const hasToolbar = Boolean(searchColumn || toolbar || showViewOptions)

  return (
    <div
      data-slot="data-table"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    >
      {hasToolbar ? (
        <div className="flex items-center gap-2">
          {searchColumn ? (
            <Input
              placeholder={searchPlaceholder}
              value={(searchColumn.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                searchColumn.setFilterValue(event.target.value)
              }
              className="h-8 max-w-sm"
            />
          ) : null}
          {toolbar}
          {showViewOptions ? (
            <DataTableViewOptions table={table} className="ml-auto" />
          ) : null}
        </div>
      ) : null}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-muted-foreground h-24 text-center"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {showPagination ? <DataTablePagination table={table} /> : null}
    </div>
  )
}

interface DataTableColumnHeaderProps<TData extends RowData, TValue>
  extends React.ComponentProps<"div"> {
  column: Column<DataTableFeatures, TData, TValue>
  title: string
  align?: "left" | "right"
}

function DataTableColumnHeader<TData extends RowData, TValue>({
  column,
  title,
  align = "left",
  className,
  ...props
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return (
      <div
        className={cn(align === "right" && "text-right", className)}
        {...props}
      >
        {title}
      </div>
    )
  }

  const sorted = column.getIsSorted()
  const Icon = sorted === "asc" ? ArrowUp : sorted === "desc" ? ArrowDown : ArrowUpDown

  return (
    <div
      className={cn("flex", align === "right" && "justify-end", className)}
      {...props}
    >
      <Button
        variant="ghost"
        size="sm"
        className="data-[sorted=true]:text-foreground -ml-2 h-8 gap-1.5 px-2"
        data-sorted={sorted !== false}
        onClick={() => column.toggleSorting(sorted === "asc")}
      >
        {title}
        <Icon className="text-muted-foreground size-3.5" />
      </Button>
    </div>
  )
}

interface DataTableViewOptionsProps<TData extends RowData>
  extends React.ComponentProps<typeof Button> {
  table: ReactTable<DataTableFeatures, TData>
}

function DataTableViewOptions<TData extends RowData>({
  table,
  className,
  ...props
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn("h-8", className)}
          {...props}
        >
          <Settings2 />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface DataTablePaginationProps<TData extends RowData>
  extends React.ComponentProps<"div"> {
  table: ReactTable<DataTableFeatures, TData>
}

function DataTablePagination<TData extends RowData>({
  table,
  className,
  ...props
}: DataTablePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.state.pagination
  const total = table.getFilteredRowModel().rows.length
  const from = total === 0 ? 0 : pageIndex * pageSize + 1
  const to = Math.min((pageIndex + 1) * pageSize, total)

  return (
    <div
      className={cn("flex items-center justify-between gap-4", className)}
      {...props}
    >
      <p className="text-muted-foreground text-sm tabular-nums">
        {from}–{to} of {total}
      </p>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label="First page"
        >
          <ChevronsLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label="Previous page"
        >
          <ChevronLeft />
        </Button>
        <span className="text-muted-foreground px-2 text-sm tabular-nums">
          Page {pageIndex + 1} of {Math.max(table.getPageCount(), 1)}
        </span>
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          aria-label="Next page"
        >
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
          aria-label="Last page"
        >
          <ChevronsRight />
        </Button>
      </div>
    </div>
  )
}

export {
  DataTable,
  DataTableColumnHeader,
  DataTablePagination,
  DataTableViewOptions,
  createDataTableColumnHelper,
  dataTableFeatures,
  type DataTableColumnDef,
  type DataTableFeatures,
}
