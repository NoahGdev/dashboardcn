"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { CornerDownLeft, FileText, LayoutTemplate, SquareDashed } from "lucide-react"

import { BLOCK_PAGES, COMPONENT_PAGES, SECTIONS } from "@/lib/docs"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

export function CommandMenu({
  navItems,
  ...props
}: React.ComponentProps<typeof Button> & {
  navItems: { href: string; label: string }[]
}) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if ((event.key === "k" && (event.metaKey || event.ctrlKey)) || event.key === "/") {
        const target = event.target as HTMLElement | null
        if (
          target?.isContentEditable ||
          target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement ||
          target instanceof HTMLSelectElement
        ) {
          return
        }
        event.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <Button
        variant="secondary"
        className={cn(
          "bg-surface text-surface-foreground/60 dark:bg-card relative h-8 w-full justify-start pl-2.5 font-normal shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64"
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">Search documentation...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <div className="absolute top-1.5 right-1.5 hidden gap-1 sm:flex">
          <CommandMenuKbd>⌘</CommandMenuKbd>
          <CommandMenuKbd className="aspect-square">K</CommandMenuKbd>
        </div>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search documentation"
        description="Search for a page or component."
        className="rounded-xl border-none bg-clip-padding pb-11 shadow-2xl ring-4 ring-neutral-200/80 dark:bg-neutral-900 dark:ring-neutral-800"
        showCloseButton={false}
      >
        <CommandInput placeholder="Search documentation..." />
        <CommandList className="no-scrollbar min-h-80 scroll-pt-2 scroll-pb-1.5">
          <CommandEmpty className="text-muted-foreground py-12 text-center text-sm">
            No results found.
          </CommandEmpty>
          <CommandGroup heading="Pages">
            {[...navItems, ...SECTIONS.filter((s) => !navItems.some((n) => n.href === s.href)).map((s) => ({ href: s.href, label: s.title }))].map((item) => (
              <CommandItem
                key={item.href}
                value={`page-${item.label}`}
                onSelect={() => runCommand(() => router.push(item.href))}
              >
                <FileText className="text-muted-foreground" />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Components">
            {COMPONENT_PAGES.map((page) => (
              <CommandItem
                key={page.href}
                value={`component-${page.title}`}
                onSelect={() => runCommand(() => router.push(page.href))}
              >
                <SquareDashed className="text-muted-foreground" />
                {page.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Blocks">
            {BLOCK_PAGES.map((page) => (
              <CommandItem
                key={page.href}
                value={`block-${page.title}`}
                onSelect={() => runCommand(() => router.push(page.href))}
              >
                <LayoutTemplate className="text-muted-foreground" />
                {page.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
        <div className="text-muted-foreground absolute inset-x-0 bottom-0 z-20 flex h-10 items-center gap-2 rounded-b-xl border-t border-t-neutral-100 bg-neutral-50 px-4 text-xs font-medium dark:border-t-neutral-700 dark:bg-neutral-800">
          <div className="flex items-center gap-2">
            <CommandMenuKbd>
              <CornerDownLeft />
            </CommandMenuKbd>{" "}
            Go to Page
          </div>
        </div>
      </CommandDialog>
    </>
  )
}

function CommandMenuKbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "bg-background text-muted-foreground pointer-events-none flex h-5 items-center justify-center gap-1 rounded border px-1 font-sans text-[0.7rem] font-medium select-none [&_svg:not([class*='size-'])]:size-3",
        className
      )}
      {...props}
    />
  )
}
