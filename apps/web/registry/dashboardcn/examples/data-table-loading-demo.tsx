"use client"

import * as React from "react"
import { RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { formatNumber } from "@/registry/dashboardcn/lib/format"
import {
  DataTable,
  DataTableColumnHeader,
  createDataTableColumnHelper,
} from "@/registry/dashboardcn/ui/data-table"
import { PeriodTabs } from "@/registry/dashboardcn/ui/period-tabs"

type ChannelRow = {
  channel: string
  sessions: number
  signups: number
  revenue: number
}

type Period = "week" | "month" | "year"

const byPeriod: Record<Period, ChannelRow[]> = {
  week: [
    { channel: "Organic search", sessions: 18_420, signups: 412, revenue: 24_180 },
    { channel: "Paid search", sessions: 9_310, signups: 288, revenue: 19_640 },
    { channel: "Direct", sessions: 7_860, signups: 154, revenue: 11_200 },
    { channel: "Referral", sessions: 3_240, signups: 96, revenue: 7_480 },
    { channel: "Email", sessions: 2_180, signups: 141, revenue: 9_320 },
  ],
  month: [
    { channel: "Organic search", sessions: 74_910, signups: 1_684, revenue: 98_400 },
    { channel: "Paid search", sessions: 38_260, signups: 1_192, revenue: 81_050 },
    { channel: "Direct", sessions: 31_540, signups: 623, revenue: 45_900 },
    { channel: "Referral", sessions: 13_080, signups: 388, revenue: 30_120 },
    { channel: "Email", sessions: 8_940, signups: 574, revenue: 38_760 },
  ],
  year: [
    { channel: "Organic search", sessions: 892_300, signups: 20_140, revenue: 1_184_000 },
    { channel: "Paid search", sessions: 461_800, signups: 14_320, revenue: 972_500 },
    { channel: "Direct", sessions: 379_400, signups: 7_460, revenue: 551_200 },
    { channel: "Referral", sessions: 156_700, signups: 4_610, revenue: 361_400 },
    { channel: "Email", sessions: 107_200, signups: 6_890, revenue: 465_300 },
  ],
}

const helper = createDataTableColumnHelper<ChannelRow>()

const columns = helper.columns([
  helper.accessor("channel", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Channel" />
    ),
  }),
  helper.accessor("sessions", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sessions" align="right" />
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {formatNumber(row.original.sessions)}
      </div>
    ),
  }),
  helper.accessor("signups", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Signups" align="right" />
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {formatNumber(row.original.signups)}
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

export default function DataTableLoadingDemo() {
  const [period, setPeriod] = React.useState<Period>("month")
  const [data, setData] = React.useState(byPeriod.month)
  const [loading, setLoading] = React.useState(false)
  const [pending, setPending] = React.useState(false)

  // Stand-in for a fetch. A first load has no rows to show, so it swaps in the
  // skeleton; a filter change already has rows, so it dims them instead.
  const load = (next: Period, mode: "loading" | "pending") => {
    const setBusy = mode === "loading" ? setLoading : setPending
    setPeriod(next)
    setBusy(true)
    window.setTimeout(() => {
      setData(byPeriod[next])
      setBusy(false)
    }, 900)
  }

  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey="channel"
      searchPlaceholder="Filter channels..."
      loading={loading}
      pending={pending}
      pageSize={5}
      showPagination={false}
      toolbar={
        <>
          <PeriodTabs
            value={period}
            onValueChange={(next) => load(next as Period, "pending")}
            size="sm"
          />
          <Button
            variant="outline"
            size="sm"
            className="h-8"
            onClick={() => load(period, "loading")}
          >
            <RefreshCw />
            Reload
          </Button>
        </>
      }
      className="w-full"
    />
  )
}
