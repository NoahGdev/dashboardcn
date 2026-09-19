"use client"

import { FileText, LayoutDashboard, Plus, Users } from "lucide-react"

import { CommandPalette, type CommandPaletteGroup } from "@/registry/dashboardcn/ui/command-palette"

const groups: CommandPaletteGroup[] = [
  {
    heading: "Suggested",
    items: [
      { id: "overview", label: "Overview", description: "Revenue and activity", icon: <LayoutDashboard /> },
      { id: "customers", label: "Customers", description: "Profiles and segments", icon: <Users /> },
      { id: "reports", label: "Reports", description: "Saved and scheduled reports", icon: <FileText /> },
      { id: "new", label: "Create customer", description: "Add a customer record", icon: <Plus /> },
    ],
  },
]

export default function CommandPaletteInlineDemo() {
  return (
    <CommandPalette
      variant="inline"
      groups={groups}
      className="w-full max-w-xl"
      placeholder="Search the workspace…"
      footer={<><span>4 commands</span><span>Type to filter</span></>}
    />
  )
}
