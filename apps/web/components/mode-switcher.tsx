"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { useMetaColor } from "@/hooks/use-meta-color"
import { Button } from "@/components/ui/button"

/** Light is the default; this only flips to dark when the visitor asks. */
export function ModeSwitcher({
  variant = "ghost",
  className,
}: {
  variant?: React.ComponentProps<typeof Button>["variant"]
  className?: string
}) {
  const { setTheme, resolvedTheme } = useTheme()
  const { setMetaColor, metaColor } = useMetaColor()

  React.useEffect(() => {
    setMetaColor(metaColor)
  }, [metaColor, setMetaColor])

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }, [resolvedTheme, setTheme])

  return (
    <Button
      variant={variant}
      size="icon-sm"
      className={cn("extend-touch-target text-muted-foreground", className)}
      onClick={toggleTheme}
    >
      <Sun className="size-4 dark:hidden" />
      <Moon className="hidden size-4 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
