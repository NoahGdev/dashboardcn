"use client"

import * as React from "react"
import { Palette, RotateCcw, X } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Development-only accent switcher. Overrides the primary colour on the root
 * element so every button, link and chart picks it up, and remembers the
 * choice in localStorage. Never rendered in production builds.
 */
const PRESETS = [
  { name: "Cobalt", value: "#305dde" },
  { name: "Royal", value: "#2f5bff" },
  { name: "Azure", value: "#0a7cff" },
  { name: "Indigo", value: "#4f46e5" },
  { name: "Violet", value: "#6d5dfc" },
  { name: "Teal", value: "#0f9d8f" },
  { name: "Emerald", value: "#16a34a" },
  { name: "Coral", value: "#ff5a3c" },
  { name: "Tangerine", value: "#f26522" },
  { name: "Ink", value: "#1a1a1a" },
]

const STORAGE_KEY = "dev-accent"
const VARS = ["--primary", "--ring", "--chart-1"] as const

// A tiny external store over localStorage, so the stored accent is read
// during render (via useSyncExternalStore) instead of set from an effect.
const listeners = new Set<() => void>()
function subscribe(listener: () => void) {
  listeners.add(listener)
  window.addEventListener("storage", listener)
  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", listener)
  }
}
function readAccent() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}
function writeAccent(value: string | null) {
  try {
    if (value) localStorage.setItem(STORAGE_KEY, value)
    else localStorage.removeItem(STORAGE_KEY)
  } catch {}
  for (const listener of listeners) listener()
}

export function AccentPicker() {
  const [open, setOpen] = React.useState(false)
  const accent = React.useSyncExternalStore(subscribe, readAccent, () => null)

  React.useEffect(() => {
    const root = document.documentElement
    for (const name of VARS) {
      if (accent) root.style.setProperty(name, accent)
      else root.style.removeProperty(name)
    }
  }, [accent])

  const choose = React.useCallback((value: string | null) => writeAccent(value), [])

  return (
    <div className="fixed right-4 bottom-4 z-[60] flex flex-col items-end gap-2 print:hidden">
      {open ? (
        <div className="bg-popover text-popover-foreground w-64 rounded-2xl border p-3 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Accent (dev only)</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground rounded-full p-1"
            >
              <X className="size-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>
          <div className="mt-3 grid grid-cols-5 gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.value}
                type="button"
                title={`${preset.name} ${preset.value}`}
                onClick={() => choose(preset.value)}
                className={cn(
                  "aspect-square rounded-full ring-2 ring-offset-2 ring-offset-popover transition-transform hover:scale-110",
                  accent === preset.value ? "ring-foreground" : "ring-transparent"
                )}
                style={{ backgroundColor: preset.value }}
              >
                <span className="sr-only">{preset.name}</span>
              </button>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <input
              type="color"
              aria-label="Custom accent"
              value={accent ?? "#305dde"}
              onChange={(event) => choose(event.target.value)}
              className="size-8 cursor-pointer rounded-full border-0 bg-transparent p-0"
            />
            <input
              type="text"
              aria-label="Custom accent hex"
              value={accent ?? "#305dde"}
              onChange={(event) => {
                const value = event.target.value.trim()
                if (/^#[0-9a-f]{6}$/i.test(value)) choose(value)
              }}
              className="bg-muted h-8 flex-1 rounded-full px-3 font-mono text-xs outline-none"
            />
            <button
              type="button"
              onClick={() => choose(null)}
              title="Reset to default"
              className="text-muted-foreground hover:text-foreground rounded-full p-1.5"
            >
              <RotateCcw className="size-4" />
              <span className="sr-only">Reset</span>
            </button>
          </div>
          <p className="text-muted-foreground mt-2 text-[11px] leading-4">
            Sets --primary, --ring and --chart-1. Pick one you like and I will
            bake it into globals.css.
          </p>
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="bg-popover text-foreground flex size-10 items-center justify-center rounded-full border shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-transform hover:scale-105"
      >
        <span className="bg-primary absolute size-4 rounded-full opacity-0" />
        <Palette className="size-4" style={{ color: accent ?? "var(--primary)" }} />
        <span className="sr-only">Accent picker</span>
      </button>
    </div>
  )
}
