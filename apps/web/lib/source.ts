import fs from "node:fs/promises"
import path from "node:path"
import { cache } from "react"

import { getComponentDoc, type ComponentDoc } from "@/config/docs"
import registry from "@/registry.json"

const REGISTRY_DIR = path.join(process.cwd(), "registry")

/**
 * Read a file under `registry/`. The path is scoped to that folder so the
 * bundler traces only the registry sources into the server output.
 */
export async function readRegistryFile(relativePath: string) {
  const inRegistry = relativePath.replace(/^registry\//, "")
  return fs.readFile(path.join(REGISTRY_DIR, inRegistry), "utf8")
}

/**
 * Rewrite registry-internal imports to the paths a consumer has after
 * `shadcn add`, so displayed code is copy-pasteable.
 */
export function toConsumerImports(source: string) {
  return source
    .replace(/@\/registry\/dashboardcn\/ui\//g, "@/components/ui/")
    .replace(/@\/registry\/dashboardcn\/lib\//g, "@/lib/")
    .replace(/@\/registry\/dashboardcn\/examples\//g, "@/components/")
}

export const readSource = cache(async (relativePath: string) => {
  return toConsumerImports(await readRegistryFile(relativePath))
})

export type RegistryItem = (typeof registry.items)[number]

export function getRegistryItem(name: string): RegistryItem | undefined {
  return registry.items.find((item) => item.name === name)
}

/** Where a registry file lands in a consumer project. */
export function consumerPath(file: RegistryItem["files"][number]) {
  const base = path.basename(file.path)
  if (file.type === "registry:lib") return `lib/${base}`
  if (file.type === "registry:component") return `components/${base}`
  return `components/ui/${base}`
}

/** The registry primitives a block is composed from, as their docs entries. */
export function getBlockComponentDocs(name: string): ComponentDoc[] {
  const item = getRegistryItem(name)
  if (!item) return []
  return item.files
    .filter((file) => file.type === "registry:ui")
    .map((file) => getComponentDoc(path.basename(file.path, ".tsx")))
    .filter((doc): doc is ComponentDoc => doc !== undefined)
}
