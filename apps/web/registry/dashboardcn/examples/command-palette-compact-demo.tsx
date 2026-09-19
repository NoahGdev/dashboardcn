"use client"

import { Bell, CreditCard, UserRound, UsersRound } from "lucide-react"

import {
  CommandPalette,
  CommandPaletteShortcutKeys,
  type CommandPaletteGroup,
} from "@/registry/dashboardcn/ui/command-palette"

const groups: CommandPaletteGroup[] = [
  {
    heading: "Settings",
    items: [
      { id: "profile", label: "Profile", icon: <UserRound />, shortcut: <CommandPaletteShortcutKeys keys={["P"]} /> },
      { id: "team", label: "Team members", icon: <UsersRound />, shortcut: <CommandPaletteShortcutKeys keys={["T"]} /> },
      { id: "billing", label: "Billing", icon: <CreditCard />, shortcut: <CommandPaletteShortcutKeys keys={["B"]} /> },
      { id: "notifications", label: "Notifications", icon: <Bell />, shortcut: <CommandPaletteShortcutKeys keys={["N"]} /> },
    ],
  },
]

export default function CommandPaletteCompactDemo() {
  return (
    <CommandPalette
      variant="inline"
      density="compact"
      groups={groups}
      className="w-full max-w-sm"
      placeholder="Go to settings…"
      footer={null}
    />
  )
}
