import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { findNeighbours, type TocItem } from "@/lib/docs"
import { DocsTableOfContents } from "@/components/docs-toc"
import { Button } from "@/components/ui/button"
import { DocsCta } from "@/components/docs-cta"

/** The shadcn docs page shell: title row, typeset body, prev/next, and TOC. */
export function DocsPage({
  title,
  description,
  href,
  toc = [],
  actions,
  children,
}: {
  title: string
  description?: string
  href: string
  toc?: TocItem[]
  actions?: React.ReactNode
  children: React.ReactNode
}) {
  const neighbours = findNeighbours(href)

  return (
    <div
      data-slot="docs"
      className="flex scroll-mt-24 items-stretch pb-8 text-[1.05rem] sm:text-[15px] xl:w-full"
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="h-(--top-spacing) shrink-0" />
        <div className="text-foreground mx-auto flex w-full max-w-160 min-w-0 flex-1 flex-col gap-6 px-4 py-6 md:px-0 lg:py-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between md:items-start">
              <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight sm:text-3xl">
                {title}
              </h1>
              <div className="docs-nav flex items-center gap-2">
                {actions ? <div className="hidden sm:block">{actions}</div> : null}
                <div className="ml-auto flex gap-2">
                  {neighbours.previous && (
                    <Button
                      variant="secondary"
                      size="icon"
                      className="extend-touch-target size-8 shadow-none md:size-7"
                      asChild
                    >
                      <Link href={neighbours.previous.href}>
                        <ArrowLeft />
                        <span className="sr-only">Previous</span>
                      </Link>
                    </Button>
                  )}
                  {neighbours.next && (
                    <Button
                      variant="secondary"
                      size="icon"
                      className="extend-touch-target size-8 shadow-none md:size-7"
                      asChild
                    >
                      <Link href={neighbours.next.href}>
                        <span className="sr-only">Next</span>
                        <ArrowRight />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
            {description && (
              <p className="text-muted-foreground text-[1.05rem] sm:text-base sm:text-balance md:max-w-[80%]">
                {description}
              </p>
            )}
          </div>
          <div className="typeset w-full flex-1 pb-16 *:data-[slot=alert]:first:mt-0 sm:pb-0">
            {children}
          </div>
          <div className="hidden h-16 w-full items-center gap-2 px-4 sm:flex sm:px-0">
            {neighbours.previous && (
              <Button variant="secondary" size="sm" asChild className="shadow-none">
                <Link href={neighbours.previous.href}>
                  <ArrowLeft /> {neighbours.previous.title}
                </Link>
              </Button>
            )}
            {neighbours.next && (
              <Button
                variant="secondary"
                size="sm"
                className="ml-auto shadow-none"
                asChild
              >
                <Link href={neighbours.next.href}>
                  {neighbours.next.title} <ArrowRight />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="sticky top-[calc(var(--header-height)+1px)] z-30 ml-auto hidden h-[90svh] w-(--sidebar-width) flex-col gap-4 overflow-hidden overscroll-none pb-8 xl:flex">
        <div className="h-(--top-spacing) shrink-0" />
        {toc.length ? (
          <div className="scroll-fade scrollbar-none flex flex-col gap-8 overflow-y-auto px-8">
            <DocsTableOfContents toc={toc} />
          </div>
        ) : null}
        <div className="hidden flex-1 flex-col gap-6 px-6 xl:flex">
          <DocsCta />
        </div>
      </div>
    </div>
  )
}
