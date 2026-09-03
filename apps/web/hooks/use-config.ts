"use client"

import * as React from "react"

export type Config = {
  packageManager: "npm" | "yarn" | "pnpm" | "bun"
  installationType: "cli" | "manual"
}

const STORAGE_KEY = "dashboardcn-config"
const DEFAULT_CONFIG: Config = {
  packageManager: "pnpm",
  installationType: "cli",
}

const listeners = new Set<() => void>()
let cached: Config | null = null

function read(): Config {
  if (cached) return cached
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    cached = stored
      ? { ...DEFAULT_CONFIG, ...(JSON.parse(stored) as Partial<Config>) }
      : DEFAULT_CONFIG
  } catch {
    cached = DEFAULT_CONFIG
  }
  return cached
}

function write(next: Config) {
  cached = next
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {}
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useConfig(): [Config, (next: Config) => void] {
  const config = React.useSyncExternalStore(subscribe, read, () => DEFAULT_CONFIG)
  return [config, write]
}
