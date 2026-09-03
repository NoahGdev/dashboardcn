"use client"

import * as React from "react"
import { Check, Copy, Terminal } from "lucide-react"

import { useConfig } from "@/hooks/use-config"
import { copyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CodeBlockCommand({
  __npm__,
  __yarn__,
  __pnpm__,
  __bun__,
}: {
  __npm__: string
  __yarn__: string
  __pnpm__: string
  __bun__: string
}) {
  const [config, setConfig] = useConfig()
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    if (!hasCopied) return
    const timer = setTimeout(() => setHasCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [hasCopied])

  const packageManager = config.packageManager || "pnpm"
  const tabs = React.useMemo(
    () => ({ pnpm: __pnpm__, npm: __npm__, yarn: __yarn__, bun: __bun__ }),
    [__npm__, __pnpm__, __yarn__, __bun__]
  )

  const copyCommand = React.useCallback(async () => {
    const command = tabs[packageManager]
    if (!command) return
    if (await copyToClipboard(command)) setHasCopied(true)
  }, [packageManager, tabs])

  return (
    <div className="overflow-x-auto">
      <Tabs
        value={packageManager}
        className="gap-0"
        onValueChange={(value) =>
          setConfig({ ...config, packageManager: value as typeof packageManager })
        }
      >
        <div className="border-border/50 flex items-center gap-2 border-b px-3 py-1">
          <div className="bg-foreground flex size-4 items-center justify-center rounded-[1px] opacity-70">
            <Terminal className="text-code size-3" />
          </div>
          <TabsList className="rounded-none bg-transparent p-0">
            {Object.keys(tabs).map((key) => (
              <TabsTrigger
                key={key}
                value={key}
                className="data-[state=active]:border-input data-[state=active]:bg-background! h-7 border border-transparent pt-0.5 shadow-none!"
              >
                {key}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="no-scrollbar overflow-x-auto">
          {Object.entries(tabs).map(([key, value]) => (
            <TabsContent key={key} value={key} className="mt-0 px-4 py-3.5">
              <pre>
                <code
                  className="relative font-mono text-sm leading-none"
                  data-language="bash"
                >
                  {value}
                </code>
              </pre>
            </TabsContent>
          ))}
        </div>
      </Tabs>
      <Button
        data-slot="copy-button"
        size="icon"
        variant="ghost"
        className="absolute top-2 right-2 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100"
        onClick={copyCommand}
      >
        <span className="sr-only">Copy</span>
        {hasCopied ? <Check /> : <Copy />}
      </Button>
    </div>
  )
}
