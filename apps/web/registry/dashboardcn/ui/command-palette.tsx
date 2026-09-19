"use client"

import * as React from "react"
import { CornerDownLeft } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export interface CommandPaletteItem {
  id: string
  label: string
  description?: string
  icon?: React.ReactNode
  shortcut?: React.ReactNode
  keywords?: string[]
  disabled?: boolean
  onSelect?: () => void
}

export interface CommandPaletteGroup {
  heading?: string
  items: CommandPaletteItem[]
}

export interface CommandPaletteProps {
  groups: CommandPaletteGroup[]
  variant?: "dialog" | "inline"
  /** Arrange results as familiar command rows or as an app-launcher grid. */
  layout?: "list" | "grid"
  /** Tighten list rows for dense navigation menus. */
  density?: "compact" | "default"
  size?: "compact" | "default" | "wide"
  open?: boolean
  onOpenChange?: (open: boolean) => void
  placeholder?: string
  emptyLabel?: React.ReactNode
  title?: string
  description?: string
  footer?: React.ReactNode
  className?: string
  onSelect?: (item: CommandPaletteItem) => void
}

const sizeClasses = {
  compact: "sm:max-w-md",
  default: "sm:max-w-xl",
  wide: "sm:max-w-2xl",
}

/** Bind Command/Ctrl+K to a controlled command palette without stealing input shortcuts. */
function useCommandPaletteShortcut(
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>,
  enabled = true
) {
  React.useEffect(() => {
    if (!enabled) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "k") return
      const target = event.target
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        (target instanceof HTMLElement && target.isContentEditable)
      ) return

      event.preventDefault()
      onOpenChange((open) => !open)
    }

    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [enabled, onOpenChange])
}

function CommandPaletteContent({
  groups,
  placeholder,
  emptyLabel,
  footer,
  onSelect,
  layout,
  density,
}: Pick<
  CommandPaletteProps,
  | "groups"
  | "placeholder"
  | "emptyLabel"
  | "footer"
  | "onSelect"
  | "layout"
  | "density"
>) {
  return (
    <>
      <CommandInput placeholder={placeholder} />
      <CommandList className="max-h-[min(420px,60vh)] scroll-py-2">
        <CommandEmpty className="text-muted-foreground px-6 py-12 text-center text-sm">
          {emptyLabel}
        </CommandEmpty>
        {groups.map((group, groupIndex) => (
          <React.Fragment key={group.heading ?? groupIndex}>
            {groupIndex > 0 ? <CommandSeparator /> : null}
            <CommandGroup
              heading={group.heading}
              className={cn(
                layout === "grid" &&
                  "p-2 [&_[cmdk-group-items]]:grid [&_[cmdk-group-items]]:grid-cols-2 [&_[cmdk-group-items]]:gap-2 sm:[&_[cmdk-group-items]]:grid-cols-3"
              )}
            >
              {group.items.map((item) => (
                <CommandItem
                  key={item.id}
                  value={[item.label, item.description, ...(item.keywords ?? [])].filter(Boolean).join(" ")}
                  disabled={item.disabled}
                  onSelect={() => {
                    item.onSelect?.()
                    onSelect?.(item)
                  }}
                  className={cn(
                    "group/item gap-3",
                    density === "compact" ? "py-1.5" : "py-2.5",
                    layout === "grid" &&
                      "h-auto min-h-28 flex-col items-start justify-between gap-4 rounded-lg border bg-card p-3 data-[selected=true]:border-ring data-[selected=true]:bg-accent"
                  )}
                >
                  {item.icon ? (
                    <span
                      className={cn(
                        "bg-muted group-data-[selected=true]/item:bg-background flex shrink-0 items-center justify-center rounded-md border [&>svg]:size-4",
                        density === "compact" ? "size-7" : "size-8",
                        layout === "grid" && "size-9"
                      )}
                    >
                      {item.icon}
                    </span>
                  ) : null}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{item.label}</span>
                    {item.description ? (
                      <span className="text-muted-foreground block truncate text-xs">{item.description}</span>
                    ) : null}
                  </span>
                  {item.shortcut ? <CommandShortcut>{item.shortcut}</CommandShortcut> : null}
                </CommandItem>
              ))}
            </CommandGroup>
          </React.Fragment>
        ))}
      </CommandList>
      {footer !== null ? (
        <div className="text-muted-foreground flex min-h-10 items-center justify-between gap-3 border-t bg-muted/30 px-3 text-xs">
          {footer}
        </div>
      ) : null}
    </>
  )
}

/** A data-driven command menu that renders as a modal palette or an embedded search surface. */
function CommandPalette({
  groups,
  variant = "dialog",
  layout = "list",
  density = "default",
  size = "default",
  open,
  onOpenChange,
  placeholder = "Type a command or search…",
  emptyLabel = "No commands found.",
  title = "Command palette",
  description = "Search for a command to run.",
  footer = (
    <span className="flex items-center gap-2">
      <CommandPaletteKbd><CornerDownLeft /></CommandPaletteKbd>
      Select
    </span>
  ),
  className,
  onSelect,
}: CommandPaletteProps) {
  const content = (
    <CommandPaletteContent
      groups={groups}
      placeholder={placeholder}
      emptyLabel={emptyLabel}
      footer={footer}
      onSelect={onSelect}
      layout={layout}
      density={density}
    />
  )

  if (variant === "inline") {
    return (
      <Command
        data-slot="command-palette"
        className={cn("h-auto rounded-xl border shadow-sm", className)}
      >
        {content}
      </Command>
    )
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      showCloseButton={false}
      className={cn(
        "gap-0 overflow-hidden rounded-xl border bg-popover p-0 shadow-2xl",
        sizeClasses[size],
        className
      )}
    >
      {content}
    </CommandDialog>
  )
}

function CommandPaletteKbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "bg-background text-muted-foreground inline-flex h-5 min-w-5 items-center justify-center rounded border px-1 font-sans text-[10px] font-medium shadow-xs [&_svg]:size-3",
        className
      )}
      {...props}
    />
  )
}

function CommandPaletteShortcutKeys({
  keys,
  label,
  className,
}: {
  keys: string[]
  label?: string
  className?: string
}) {
  return (
    <span
      aria-label={label ?? keys.join(" then ")}
      className={cn("flex items-center gap-1", className)}
    >
      {keys.map((key) => (
        <CommandPaletteKbd key={key}>{key}</CommandPaletteKbd>
      ))}
    </span>
  )
}

export {
  CommandPalette,
  CommandPaletteKbd,
  CommandPaletteShortcutKeys,
  useCommandPaletteShortcut,
}
