import * as React from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export function GitHubLink() {
  return (
    <Button asChild size="sm" variant="ghost" className="h-8 shadow-none">
      <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
        <Icons.gitHub />
        <React.Suspense fallback={<Skeleton className="h-4 w-[42px]" />}>
          <StarsCount />
        </React.Suspense>
      </Link>
    </Button>
  )
}

async function getStars(): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${siteConfig.links.githubRepo}`,
      { next: { revalidate: 86400 } }
    )
    if (!response.ok) return null
    const json = (await response.json()) as { stargazers_count?: number }
    const count = json.stargazers_count
    if (typeof count !== "number") return null
    return count >= 1000 ? `${Math.round(count / 1000)}k` : count.toLocaleString()
  } catch {
    return null
  }
}

async function StarsCount() {
  const formatted = await getStars()
  if (!formatted) return null
  return (
    <span className="text-muted-foreground w-fit text-xs tabular-nums">
      {formatted}
    </span>
  )
}
