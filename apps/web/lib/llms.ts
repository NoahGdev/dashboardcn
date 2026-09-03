import { publicUrl, registryItemUrl, siteConfig } from "@/config/site"
import { BLOCK_DOCS, COMPONENT_DOCS, docHref } from "@/lib/docs"
import {
  renderInstallationMarkdown,
  renderIntroMarkdown,
  renderItemMarkdown,
} from "@/lib/markdown"

function entry(title: string, url: string, description: string) {
  return `- [${title}](${url}): ${description}`
}

/**
 * `/llms.txt`, in the llmstxt.org shape shadcn/ui uses: a title, a one-line
 * summary, then sections of Markdown links. Every link points at a Markdown
 * rendering, never an HTML page.
 */
export function renderLlmsIndex() {
  const md = (href: string) => `${publicUrl}${href}.md`

  return [
    `# ${siteConfig.name}`,
    `> ${siteConfig.description}`,
    "Every item installs with the shadcn CLI: `npx shadcn@latest add " +
      registryItemUrl("<name>") +
      "`. The code is copied into the project, so edit it rather than wrapping it. Blocks are cards composed from the component primitives.",
    "## Docs",
    [
      entry("Introduction", md("/docs"), "What dashboardcn is, why it exists, and what it is built on."),
      entry("Installation", md("/docs/installation"), "Prerequisites, install by URL, and the @dashboardcn registry namespace."),
    ].join("\n"),
    "## Components",
    COMPONENT_DOCS.map((doc) => entry(doc.title, md(docHref(doc)), doc.description)).join("\n"),
    "## Blocks",
    BLOCK_DOCS.map((doc) => entry(doc.title, md(docHref(doc)), doc.description)).join("\n"),
    "## Registry",
    [
      entry("registry.json", `${publicUrl}/r/registry.json`, "Index of every item with its files and dependencies."),
      entry("Item JSON", registryItemUrl("<name>"), "The shadcn registry item for one component or block."),
    ].join("\n"),
    "## Optional",
    [
      entry("llms-full.txt", `${publicUrl}/llms-full.txt`, "Every page above concatenated into one file, including all component source."),
      entry("Agent skill", registryItemUrl("skill"), "A skill for coding agents: catalog, data conventions, layout patterns, and a props reference. Install with `npx shadcn@latest add @dashboardcn/skill` or `npx skills add " + siteConfig.links.githubRepo + "`."),
      entry("GitHub", siteConfig.links.github, "Source repository."),
    ].join("\n"),
  ].join("\n\n") + "\n"
}

/** `/llms-full.txt`: every docs page as Markdown, in reading order. */
export async function renderLlmsFull() {
  const items = await Promise.all(
    [...COMPONENT_DOCS, ...BLOCK_DOCS].map((doc) => renderItemMarkdown(doc.name))
  )

  return [
    `# ${siteConfig.name}`,
    `> ${siteConfig.description}`,
    renderIntroMarkdown(),
    renderInstallationMarkdown(),
    "# Components",
    "The primitives. Each one installs with a single command.",
    ...items.slice(0, COMPONENT_DOCS.length),
    "# Blocks",
    "Cards composed from the primitives above.",
    ...items.slice(COMPONENT_DOCS.length),
  ]
    .filter((section): section is string => Boolean(section))
    .map((section) => section.trimEnd())
    .join("\n\n") + "\n"
}
