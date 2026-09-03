import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"

export function DocsCta() {
  return (
    <div className="bg-surface text-surface-foreground group relative flex flex-col gap-2 rounded-lg p-6 text-sm">
      <div className="text-base leading-tight font-semibold text-balance">
        Your dashboard, your code.
      </div>
      <div className="text-muted-foreground">
        Every component is copied into your project with the shadcn CLI. No
        package to upgrade, nothing to override.
      </div>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" className="mt-2" asChild>
          <Link href="/docs/installation">Get started</Link>
        </Button>
        <Button size="sm" variant="outline" className="mt-2" asChild>
          <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </Button>
      </div>
    </div>
  )
}
