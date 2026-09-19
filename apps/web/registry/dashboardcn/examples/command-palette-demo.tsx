"use client"

import * as React from "react"
import { FileText, LayoutDashboard, Moon, Plus, Search, Settings, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  CommandPalette,
  CommandPaletteKbd,
  CommandPaletteShortcutKeys,
  type CommandPaletteGroup,
  useCommandPaletteShortcut,
} from "@/registry/dashboardcn/ui/command-palette"

const groups: CommandPaletteGroup[] = [
  {
    heading: "Jump to",
    items: [
      { id: "overview", label: "Overview", description: "Revenue and activity", icon: <LayoutDashboard />, shortcut: <CommandPaletteShortcutKeys keys={["G", "O"]} label="Press G then O" /> },
      { id: "customers", label: "Customers", description: "Profiles and segments", icon: <Users />, shortcut: <CommandPaletteShortcutKeys keys={["G", "C"]} label="Press G then C" /> },
      { id: "reports", label: "Reports", description: "Saved and scheduled reports", icon: <FileText /> },
    ],
  },
  {
    heading: "Actions",
    items: [
      { id: "new", label: "Create customer", icon: <Plus />, shortcut: <CommandPaletteShortcutKeys keys={["C"]} label="Press C" /> },
      { id: "theme", label: "Switch appearance", icon: <Moon /> },
      { id: "settings", label: "Open settings", icon: <Settings /> },
    ],
  },
]

export default function CommandPaletteDemo() {
  const [open, setOpen] = React.useState(false)
  useCommandPaletteShortcut(setOpen)

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <Search />
        Search commands
        <span className="ml-3 flex gap-1"><CommandPaletteKbd>⌘</CommandPaletteKbd><CommandPaletteKbd>K</CommandPaletteKbd></span>
      </Button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        groups={groups}
        onSelect={() => setOpen(false)}
        footer={<><span>Navigate with ↑↓</span><span>dashboardcn</span></>}
      />
    </>
  )
}
