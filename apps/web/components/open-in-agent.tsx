"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { AGENTS, type Agent } from "@/lib/agent-prompt"
import { openDeepLink } from "@/lib/open-deep-link"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

const icons: Record<Agent["key"], typeof Icons.claude> = {
  "claude-code": Icons.claude,
  codex: Icons.openai,
  cursor: Icons.cursor,
}

/**
 * Hands a coding agent a prompt for building with the registry. Each button
 * tries that agent's installed apps first, then falls back to its web app, so
 * a visitor without the app — or on a phone, where no scheme resolves — still
 * lands on something that can read the prompt.
 */
export function OpenInAgent({ prompt }: { prompt: string }) {
  const { copyToClipboard, isCopied } = useCopyToClipboard()
  const [pending, setPending] = React.useState<Agent["key"] | null>(null)

  async function open(event: React.MouseEvent, agent: Agent) {
    const schemes = agent.schemes(prompt)
    if (!schemes.length) return

    event.preventDefault()
    setPending(agent.key)
    const launched = await openDeepLink(schemes)
    setPending(null)
    // A popup blocked outside the click gesture would strand the visitor, so
    // the web fallback takes over this tab rather than opening a new one.
    if (!launched) window.location.assign(agent.web(prompt))
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {AGENTS.map((agent) => {
          const Icon = icons[agent.key]
          const schemes = agent.schemes(prompt)
          const isWebOnly = !schemes.length
          return (
            <Button
              key={agent.key}
              size="sm"
              variant="outline"
              asChild
              className={pending === agent.key ? "opacity-60" : undefined}
            >
              <a
                // Without JS this is still a working link to the app or the web.
                href={schemes[0] ?? agent.web(prompt)}
                target={isWebOnly ? "_blank" : undefined}
                rel={isWebOnly ? "noopener noreferrer" : undefined}
                onClick={(event) => open(event, agent)}
              >
                <Icon className="text-muted-foreground" />
                Open in {agent.label}
              </a>
            </Button>
          )
        })}
        <Button
          size="sm"
          variant="ghost"
          className="text-muted-foreground"
          onClick={() => copyToClipboard(prompt)}
        >
          {isCopied ? <CheckIcon /> : <CopyIcon />}
          {isCopied ? "Copied" : "Copy prompt"}
        </Button>
      </div>
      <p className="text-muted-foreground text-xs">
        Opens the app with a prompt ready to send, or the web app if it is not
        installed. Nothing runs until you press enter.
      </p>
    </div>
  )
}
