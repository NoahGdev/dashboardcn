import Link from "next/link"

import type { ComponentDoc } from "@/config/docs"
import { docHref } from "@/lib/docs"

export function DocsIndexGrid({ docs }: { docs: ComponentDoc[] }) {
  return (
    <div data-not-typeset className="mt-6 grid gap-3 sm:grid-cols-2">
      {docs.map((doc) => (
        <Link
          key={doc.name}
          href={docHref(doc)}
          className="hover:bg-muted/50 flex h-full flex-col gap-1 rounded-lg border p-4 text-sm transition-colors"
        >
          <span className="font-medium">{doc.title}</span>
          <span className="text-muted-foreground">{doc.description}</span>
        </Link>
      ))}
    </div>
  )
}
