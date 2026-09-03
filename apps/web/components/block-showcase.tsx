import * as React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { getComponentDoc } from "@/config/docs"
import { docHref } from "@/lib/docs"
import { getBlockComponentDocs } from "@/lib/source"

export interface BlockShowcaseItem {
  /** Registry name of the block. Title, description, and links come from its docs entry. */
  name: string
  preview: React.ReactNode
}

/**
 * A grid of live block previews. Each tile links to the block's docs page and
 * lists the primitives it is composed from, each linking to their own docs.
 */
export function BlockShowcase({ items }: { items: BlockShowcaseItem[] }) {
  return (
    <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
      {items.map(({ name, preview }) => {
        const doc = getComponentDoc(name)
        if (!doc) return null
        const parts = getBlockComponentDocs(name)
        return (
          <li key={name} className="group relative flex flex-col gap-4">
            <div
              inert
              className="bg-muted/40 group-hover:border-foreground/20 flex flex-1 items-center rounded-xl border p-4 transition-colors sm:p-6"
            >
              <div className="w-full">{preview}</div>
            </div>
            <div className="flex flex-col gap-1.5 px-1">
              <Link
                href={docHref(doc)}
                className="flex items-center gap-1 font-medium after:absolute after:inset-0 after:content-['']"
              >
                {doc.title}
                <ArrowUpRight className="text-muted-foreground size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <p className="text-muted-foreground text-sm">{doc.description}</p>
              {parts.length ? (
                <p className="text-muted-foreground mt-1 flex flex-wrap items-center gap-1.5 text-xs">
                  <span>Built with</span>
                  {parts.map((part) => (
                    <Link
                      key={part.name}
                      href={docHref(part)}
                      className="hover:bg-muted hover:text-foreground relative z-10 rounded-md border px-1.5 py-0.5 transition-colors"
                    >
                      {part.title}
                    </Link>
                  ))}
                </p>
              ) : null}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
