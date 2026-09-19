"use client"

import { CalendarDays, ChartNoAxesCombined, FileText, Inbox, Settings, Users } from "lucide-react"

import { CommandPalette, type CommandPaletteGroup } from "@/registry/dashboardcn/ui/command-palette"

const groups: CommandPaletteGroup[] = [
  {
    heading: "Workspace",
    items: [
      { id: "inbox", label: "Inbox", description: "12 unread", icon: <Inbox /> },
      { id: "calendar", label: "Calendar", description: "3 events today", icon: <CalendarDays /> },
      { id: "customers", label: "Customers", description: "2,540 profiles", icon: <Users /> },
      { id: "reports", label: "Reports", description: "Analytics and exports", icon: <ChartNoAxesCombined /> },
      { id: "documents", label: "Documents", description: "Shared files", icon: <FileText /> },
      { id: "settings", label: "Settings", description: "Workspace preferences", icon: <Settings /> },
    ],
  },
]

export default function CommandPaletteGridDemo() {
  return (
    <CommandPalette
      variant="inline"
      layout="grid"
      groups={groups}
      className="w-full max-w-2xl"
      placeholder="Open an app…"
      footer={<><span>Workspace launcher</span><span>6 apps</span></>}
    />
  )
}
