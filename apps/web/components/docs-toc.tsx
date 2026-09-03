"use client"

import * as React from "react"
import { AlignLeft } from "lucide-react"

import type { TocItem } from "@/lib/docs"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState<string | null>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: "0% 0% -80% 0%" }
    )
    for (const id of itemIds) {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    }
    return () => observer.disconnect()
  }, [itemIds])

  return activeId
}

export function DocsTableOfContents({
  toc,
  variant = "list",
  className,
}: {
  toc: TocItem[]
  variant?: "dropdown" | "list"
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const itemIds = React.useMemo(
    () => toc.map((item) => item.url.replace("#", "")),
    [toc]
  )
  const activeHeading = useActiveItem(itemIds)

  if (!toc.length) return null

  if (variant === "dropdown") {
    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className={cn("h-8 md:h-7", className)}>
            <AlignLeft /> On This Page
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="no-scrollbar max-h-[70svh]">
          {toc.map((item) => (
            <DropdownMenuItem
              key={item.url}
              asChild
              onClick={() => setOpen(false)}
              data-depth={item.depth}
              className="data-[depth=3]:pl-6 data-[depth=4]:pl-8"
            >
              <a href={item.url}>{item.title}</a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <div className={cn("flex flex-col gap-2 p-4 pt-0 text-sm", className)}>
      <p className="bg-background text-muted-foreground h-6 text-xs font-medium">
        On This Page
      </p>
      {toc.map((item) => (
        <a
          key={item.url}
          href={item.url}
          className="text-muted-foreground hover:text-foreground data-[active=true]:text-foreground text-[0.8rem] no-underline transition-colors data-[active=true]:font-medium data-[depth=3]:pl-4 data-[depth=4]:pl-6"
          data-active={item.url === `#${activeHeading}`}
          data-depth={item.depth}
        >
          {item.title}
        </a>
      ))}
    </div>
  )
}
