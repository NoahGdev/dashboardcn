import { publicUrl } from "@/config/site"
import { BLOCK_DOCS, COMPONENT_DOCS } from "@/lib/docs"

/**
 * The prompt the hero's "Open in" links hand to a coding agent. It points at
 * the per-item Markdown docs and the registry JSON rather than inlining any
 * source, so it stays well under the tightest deep link ceiling: Claude Code
 * caps `q` at 5,000 characters.
 */
export function buildAgentPrompt() {
  const components = COMPONENT_DOCS.map((doc) => doc.name).join(", ")
  const blocks = BLOCK_DOCS.map((doc) => doc.name).join(", ")

  return [
    "Help me build a dashboard with dashboardcn, a shadcn/ui registry of dashboard components.",
    "",
    "Install any item with the shadcn CLI:",
    `npx shadcn@latest add ${publicUrl}/r/<name>.json`,
    "",
    "Read an item's docs as Markdown before you use it:",
    `${publicUrl}/docs/components/<name>.md`,
    `${publicUrl}/docs/blocks/<name>.md`,
    "",
    `Components (primitives): ${components}`,
    "",
    `Blocks (cards composed from those primitives): ${blocks}`,
    "",
    "Ask me what I want to build, then read the docs for the items you need,",
    "install them, and compose the page. The code is copied into my project,",
    "so edit it freely rather than wrapping it.",
  ].join("\n")
}

export interface Agent {
  key: "claude-code" | "codex" | "cursor"
  label: string
  /**
   * App entry points to try in order. A custom scheme resolves only if that
   * app registered a handler, and never on mobile, so each one falls through
   * to `web` — an https URL that always lands somewhere. None auto-send.
   */
  schemes: (prompt: string) => string[]
  /** Where to go when no app answered. */
  web: (prompt: string) => string
}

export const AGENTS: Agent[] = [
  {
    key: "claude-code",
    label: "Claude Code",
    schemes: (prompt) => [
      // The CLI registers this the first time you send a prompt in a terminal.
      `claude-cli://open?q=${encodeURIComponent(prompt)}`,
      // Claude Desktop registers `claude:` and routes this to Claude Code.
      `claude://code/new?q=${encodeURIComponent(prompt)}`,
    ],
    web: (prompt) => `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
  },
  {
    key: "codex",
    label: "Codex",
    schemes: (prompt) => [
      `codex://threads/new?prompt=${encodeURIComponent(prompt)}`,
    ],
    web: (prompt) => `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`,
  },
  {
    key: "cursor",
    label: "Cursor",
    schemes: () => [],
    web: (prompt) =>
      `https://cursor.com/link/prompt?text=${encodeURIComponent(prompt)}`,
  },
]
