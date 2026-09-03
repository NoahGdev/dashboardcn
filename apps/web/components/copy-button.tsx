"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { copyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function CopyButton({
  value,
  className,
  variant = "ghost",
  ...props
}: React.ComponentProps<typeof Button> & { value: string }) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    if (!hasCopied) return
    const timer = setTimeout(() => setHasCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [hasCopied])

  return (
    <Button
      data-slot="copy-button"
      data-copied={hasCopied}
      size="icon"
      variant={variant}
      className={cn(
        "bg-code absolute top-3 right-2 z-10 size-7 hover:opacity-100 focus-visible:opacity-100",
        className
      )}
      onClick={async () => {
        if (await copyToClipboard(value)) setHasCopied(true)
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <Check /> : <Copy />}
    </Button>
  )
}
