"use client"

import * as React from "react"
import { type RowData } from "@tanstack/react-table"

import { cn } from "@/lib/utils"
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
  DataTableContent,
  DataTablePagination,
  DataTableSearch,
  DataTableSelectionBar,
  DataTableToolbar,
  DataTableViewOptions,
  useDataTable,
  type DataTableContentProps,
  type UseDataTableOptions,
} from "@/registry/dashboardcn/ui/data-table"

export interface DataTableCardProps<TData extends RowData>
  extends Omit<React.ComponentProps<typeof Card>, "title" | "onSelect">,
    UseDataTableOptions<TData>,
    Pick<
      DataTableContentProps<TData>,
      | "loading"
      | "pending"
      | "skeletonRows"
      | "stickyHeader"
      | "maxHeight"
      | "reorderable"
      | "density"
      | "emptyMessage"
      | "onRowClick"
      | "rowClassName"
      | "rowProps"
      | "renderRow"
    > {
  title: React.ReactNode
  description?: React.ReactNode
  /** Slot in the top-right corner, e.g. a date range or a menu button. */
  action?: React.ReactNode
  /** Column id to filter with the search input. Omit to hide the input. */
  searchKey?: string
  searchPlaceholder?: string
  /** Extra toolbar content, rendered after the search input. */
  toolbar?: React.ReactNode
  showViewOptions?: boolean
  showPagination?: boolean
  pageSizeOptions?: number[]
  /** Actions shown in the bar that appears while rows are selected. */
  selectionActions?: React.ReactNode
  /** Replaces the pagination row, e.g. with a "view all" link. */
  footer?: React.ReactNode
}

/**
 * A card around a data table: title, toolbar, rows, and pagination in the
 * footer. Everything it does is `useDataTable` plus the exported parts, so
 * copy it and rearrange when the shape does not fit.
 */
function DataTableCard<TData extends RowData>({
  columns,
  data,
  pageSize = 10,
  initialSorting,
  initialColumnVisibility,
  pinnedColumns,
  enableRowSelection,
  getRowId,
  onRowSelectionChange,
  title,
  description,
  action,
  searchKey,
  searchPlaceholder = "Filter...",
  toolbar,
  showViewOptions = true,
  showPagination = true,
  pageSizeOptions,
  selectionActions,
  footer,
  loading,
  pending,
  skeletonRows,
  stickyHeader,
  maxHeight,
  reorderable,
  density,
  emptyMessage,
  onRowClick,
  rowClassName,
  rowProps,
  renderRow,
  className,
  ...props
}: DataTableCardProps<TData>) {
  const table = useDataTable({
    columns,
    data,
    pageSize,
    initialSorting,
    initialColumnVisibility,
    pinnedColumns,
    enableRowSelection,
    getRowId,
    onRowSelectionChange,
  })

  const hasToolbar = Boolean(searchKey || toolbar)
  const selectedCount = table.getSelectedRowModel().rows.length
  const showFooter = footer !== undefined || showPagination

  return (
    <Card
      data-slot="data-table-card"
      className={cn("gap-4", className)}
      {...props}
    >
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
        {action || showViewOptions ? (
          <CardAction className="flex items-center gap-2">
            {action}
            {showViewOptions ? (
              <DataTableViewOptions
                table={table}
                reorderable={reorderable}
                disabled={loading}
              />
            ) : null}
          </CardAction>
        ) : null}
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {hasToolbar ? (
          <DataTableToolbar>
            {searchKey ? (
              <DataTableSearch
                table={table}
                column={searchKey}
                placeholder={searchPlaceholder}
                disabled={loading}
              />
            ) : null}
            {toolbar}
          </DataTableToolbar>
        ) : null}
        {selectedCount > 0 ? (
          <DataTableSelectionBar table={table}>
            {selectionActions}
          </DataTableSelectionBar>
        ) : null}
        <DataTableContent
          table={table}
          loading={loading}
          pending={pending}
          skeletonRows={skeletonRows ?? Math.min(pageSize || 10, 10)}
          stickyHeader={stickyHeader}
          maxHeight={maxHeight}
          reorderable={reorderable}
          density={density}
          emptyMessage={emptyMessage}
          onRowClick={onRowClick}
          rowClassName={rowClassName}
          rowProps={rowProps}
          renderRow={renderRow}
        />
      </CardContent>
      {showFooter ? (
        <CardFooter>
          {footer ?? (
            <DataTablePagination
              table={table}
              pageSizeOptions={pageSizeOptions}
              className="w-full"
            />
          )}
        </CardFooter>
      ) : null}
    </Card>
  )
}

export { DataTableCard }
