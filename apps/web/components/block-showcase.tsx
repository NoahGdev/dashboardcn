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
  /** Title tint, cycling through the getopen.so feature palette when omitted. */
  color?: string
}

const palette = ["#e234a2", "#305dde", "#14b8a6", "#f97316", "#8b5cf6", "#10b981"]

/**
 * A grid of live block previews on soft surface tiles. Each tile links to the
 * block's docs page and lists the primitives it is composed from.
 */
export function BlockShowcase({ items }: { items: BlockShowcaseItem[] }) {
  return (
    <ul className="grid gap-4 sm:gap-6 lg:grid-cols-2">
      {items.map(({ name, preview, color }, index) => {
        const doc = getComponentDoc(name)
        if (!doc) return null
        const parts = getBlockComponentDocs(name)
        return (
          <li
            key={name}
            className="group bg-surface relative flex min-w-0 flex-col overflow-hidden rounded-2xl p-6 sm:p-8"
          >
            <div inert className="flex flex-1 items-center">
              <div className="w-full">{preview}</div>
            </div>
            <Link
              href={docHref(doc)}
              className="mt-6 flex items-center gap-1 text-lg font-medium tracking-tight after:absolute after:inset-0 after:content-['']"
              style={{ color: color ?? palette[index % palette.length] }}
            >
              {doc.title}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <p className="text-foreground mt-2 text-lg leading-7 tracking-tight">{doc.description}</p>
            {parts.length ? (
              <p className="text-muted-foreground mt-3 flex flex-wrap items-center gap-1.5 text-xs">
                <span>Built with</span>
                {parts.map((part) => (
                  <Link
                    key={part.name}
                    href={docHref(part)}
                    className="bg-card hover:text-foreground relative z-10 rounded-full px-2 py-0.5 shadow-xs transition-colors"
                  >
                    {part.title}
                  </Link>
                ))}
              </p>
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}
