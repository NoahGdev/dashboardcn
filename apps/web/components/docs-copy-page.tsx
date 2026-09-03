"use client"

import { CheckIcon, ChevronDownIcon, CopyIcon } from "lucide-react"

import { siteConfig } from "@/config/site"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"

function promptUrl(baseUrl: string, url: string) {
  const prompt = `I'm looking at this ${siteConfig.name} documentation: ${url}.
Help me understand how to use it. Be ready to explain concepts, give examples, or help debug based on it.`
  return `${baseUrl}?q=${encodeURIComponent(prompt)}`
}

function MarkdownIcon() {
  return (
    <svg strokeLinejoin="round" viewBox="0 0 22 16">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.5 2.25H2.5C1.80964 2.25 1.25 2.80964 1.25 3.5V12.5C1.25 13.1904 1.80964 13.75 2.5 13.75H19.5C20.1904 13.75 20.75 13.1904 20.75 12.5V3.5C20.75 2.80964 20.1904 2.25 19.5 2.25ZM2.5 1C1.11929 1 0 2.11929 0 3.5V12.5C0 13.8807 1.11929 15 2.5 15H19.5C20.8807 15 22 13.8807 22 12.5V3.5C22 2.11929 20.8807 1 19.5 1H2.5ZM3 4.5H4H4.25H4.6899L4.98715 4.82428L7 7.02011L9.01285 4.82428L9.3101 4.5H9.75H10H11V5.5V11.5H9V7.79807L7.73715 9.17572L7 9.97989L6.26285 9.17572L5 7.79807V11.5H3V5.5V4.5ZM15 8V4.5H17V8H19.5L17 10.5L16 11.5L15 10.5L12.5 8H15Z"
        fill="currentColor"
      />
    </svg>
  )
}

function V0Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 147 70"
      className="size-4.5 -translate-x-px"
    >
      <path d="M56 50.203V14h14v46.156C70 65.593 65.593 70 60.156 70c-2.596 0-5.158-1-7-2.843L0 14h19.797L56 50.203ZM147 56h-14V23.953L100.953 56H133v14H96.687C85.814 70 77 61.186 77 50.312V14h14v32.156L123.156 14H91V0h36.312C138.186 0 147 8.814 147 19.688V56Z" />
    </svg>
  )
}

function menuItems({ url, registryUrl }: { url: string; registryUrl: string }) {
  return [
    {
      key: "markdown",
      href: `${url}.md`,
      label: "View as Markdown",
      icon: <MarkdownIcon />,
    },
    {
      key: "v0",
      href: `https://v0.dev/chat/api/open?url=${encodeURIComponent(registryUrl)}`,
      label: <span className="-translate-x-[2px]">Open in v0</span>,
      icon: <V0Icon />,
    },
    {
      key: "chatgpt",
      href: promptUrl("https://chatgpt.com", url),
      label: "Open in ChatGPT",
      icon: <Icons.openai />,
    },
    {
      key: "claude",
      href: promptUrl("https://claude.ai/new", url),
      label: "Open in Claude",
      icon: <Icons.claude />,
    },
  ]
}

/**
 * The shadcn docs "Copy Page" split button: copies the page as Markdown,
 * with a menu to view the Markdown or open the page in v0 / ChatGPT / Claude.
 */
export function DocsCopyPage({
  page,
  url,
  registryUrl,
}: {
  /** The page rendered as Markdown. */
  page: string
  /** Absolute URL of the docs page. */
  url: string
  /** Absolute URL of the item's registry JSON, for "Open in v0". */
  registryUrl: string
}) {
  const { copyToClipboard, isCopied } = useCopyToClipboard()
  const items = menuItems({ url, registryUrl })

  const trigger = (
    <Button
      variant="secondary"
      size="sm"
      className="peer -ml-0.5 size-8 shadow-none md:size-7 md:text-[0.8rem]"
    >
      <ChevronDownIcon className="rotate-180 sm:rotate-0" />
      <span className="sr-only">More options</span>
    </Button>
  )

  return (
    <Popover>
      <div className="group/buttons bg-secondary relative flex rounded-lg *:[[data-slot=button]]:focus-visible:relative *:[[data-slot=button]]:focus-visible:z-10">
        <PopoverAnchor />
        <Button
          variant="secondary"
          size="sm"
          className="h-8 shadow-none md:h-7 md:text-[0.8rem]"
          onClick={() => copyToClipboard(page)}
        >
          {isCopied ? <CheckIcon /> : <CopyIcon />}
          Copy Page
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="hidden sm:flex">
            {trigger}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="animate-none! rounded-lg shadow-none"
          >
            {items.map((item) => (
              <DropdownMenuItem key={item.key} asChild>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.icon}
                  {item.label}
                </a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator
          orientation="vertical"
          className="bg-foreground/5! absolute top-1 right-8 z-0 h-6! peer-focus-visible:opacity-0 sm:right-7 sm:h-5!"
        />
        <PopoverTrigger asChild className="flex sm:hidden">
          {trigger}
        </PopoverTrigger>
        <PopoverContent
          className="bg-background/70 dark:bg-background/60 w-52 origin-center! rounded-lg p-1 shadow-none backdrop-blur-sm"
          align="start"
        >
          {items.map((item) => (
            <Button
              variant="ghost"
              size="lg"
              asChild
              key={item.key}
              className="*:[svg]:text-muted-foreground w-full justify-start text-base font-normal"
            >
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                {item.icon}
                {item.label}
              </a>
            </Button>
          ))}
        </PopoverContent>
      </div>
    </Popover>
  )
}
