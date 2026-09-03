"use client"

import * as React from "react"

import { useConfig } from "@/hooks/use-config"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CodeTabs({ children, className, ...props }: React.ComponentProps<typeof Tabs>) {
  const [config, setConfig] = useConfig()

  return (
    <Tabs
      value={config.installationType || "cli"}
      onValueChange={(value) =>
        setConfig({ ...config, installationType: value as "cli" | "manual" })
      }
      className={cn("relative mt-6 w-full", className)}
      {...props}
    >
      {children}
    </Tabs>
  )
}

export function CodeTabsList({ className, ...props }: React.ComponentProps<typeof TabsList>) {
  return (
    <TabsList
      className={cn(
        "h-auto justify-start gap-4 rounded-none bg-transparent p-0",
        className
      )}
      {...props}
    />
  )
}

export function CodeTabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsTrigger>) {
  return (
    <TabsTrigger
      className={cn(
        "text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-foreground dark:data-[state=active]:border-foreground h-9 flex-none rounded-none border-0 border-b-2 border-transparent bg-transparent px-0 pt-2 pb-3 text-base font-medium shadow-none data-[state=active]:bg-transparent data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent",
        className
      )}
      {...props}
    />
  )
}
