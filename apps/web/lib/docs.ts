import { componentDocs } from "@/config/docs"

export interface DocPage {
  title: string
  href: string
}

export const SECTIONS: DocPage[] = [
  { title: "Introduction", href: "/docs" },
  { title: "Components", href: "/docs/components" },
  { title: "Blocks", href: "/docs/blocks" },
  { title: "Installation", href: "/docs/installation" },
]

const byTitle = (a: { title: string }, b: { title: string }) =>
  a.title.localeCompare(b.title)

export const COMPONENT_DOCS = componentDocs
  .filter((doc) => (doc.kind ?? "component") === "component")
  .sort(byTitle)

export const BLOCK_DOCS = componentDocs
  .filter((doc) => doc.kind === "block")
  .sort(byTitle)

export function docHref(doc: { name: string; kind?: "component" | "block" }) {
  return doc.kind === "block"
    ? `/docs/blocks/${doc.name}`
    : `/docs/components/${doc.name}`
}

export const COMPONENT_PAGES: DocPage[] = COMPONENT_DOCS.map((doc) => ({
  title: doc.title,
  href: docHref(doc),
}))

export const BLOCK_PAGES: DocPage[] = BLOCK_DOCS.map((doc) => ({
  title: doc.title,
  href: docHref(doc),
}))

/** Reading order used for previous/next navigation. */
export const ALL_PAGES: DocPage[] = [
  { title: "Introduction", href: "/docs" },
  { title: "Installation", href: "/docs/installation" },
  { title: "Components", href: "/docs/components" },
  ...COMPONENT_PAGES,
  { title: "Blocks", href: "/docs/blocks" },
  ...BLOCK_PAGES,
]

export function findNeighbours(href: string) {
  const index = ALL_PAGES.findIndex((page) => page.href === href)
  return {
    previous: index > 0 ? ALL_PAGES[index - 1] : null,
    next: index >= 0 && index < ALL_PAGES.length - 1 ? ALL_PAGES[index + 1] : null,
  }
}

export interface TocItem {
  title: string
  url: string
  depth: number
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}
