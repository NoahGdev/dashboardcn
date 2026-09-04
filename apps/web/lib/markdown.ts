import { getComponentDoc } from "@/config/docs"
import { docOverviews } from "@/config/docs-overviews"
import { publicUrl, registryItemUrl, siteConfig } from "@/config/site"
import { consumerPath, getRegistryItem, readSource } from "@/lib/source"

function fence(code: string, lang = "tsx") {
  return "```" + lang + "\n" + code.trimEnd() + "\n```"
}

function list(items: string[]) {
  return items.map((item) => "`" + item + "`").join(", ")
}

/**
 * The docs page for one registry item as Markdown: installation, usage,
 * every example's source, and the component source itself. Served at
 * `/docs/{components,blocks}/<name>.md` and used by the Copy Page button.
 */
export async function renderItemMarkdown(name: string) {
  const doc = getComponentDoc(name)
  const item = getRegistryItem(name)
  if (!doc || !item) return null

  const registryDeps = item.registryDependencies ?? []
  const npmDeps = item.dependencies ?? []

  const examples = await Promise.all(
    doc.examples.map(async (example, index) => {
      const source = await readSource(
        `registry/dashboardcn/examples/${example.name}.tsx`
      )
      const title = example.title ?? (index === 0 ? "Default" : example.name)
      return [
        `### ${title}`,
        example.description ?? "",
        fence(source),
      ]
        .filter(Boolean)
        .join("\n\n")
    })
  )

  const files = await Promise.all(
    item.files.map(async (file) => {
      const source = await readSource(file.path)
      const lang = file.path.endsWith(".ts") ? "ts" : "tsx"
      return `### ${consumerPath(file)}\n\n${fence(source, lang)}`
    })
  )

  const sections = [
    `# ${doc.title}`,
    doc.description,
    docOverviews[doc.name] ?? "",
    "## Installation",
    fence(`npx shadcn@latest add ${registryItemUrl(doc.name)}`, "bash"),
    registryDeps.length
      ? `Also installs ${list(registryDeps)} from shadcn/ui if missing.`
      : "",
    npmDeps.length ? `npm dependencies: ${list(npmDeps)}.` : "",
    "## Usage",
    fence(doc.usage),
    "## Examples",
    ...examples,
    "## Source",
    ...files,
  ]

  return sections.filter(Boolean).join("\n\n") + "\n"
}

/**
 * `/docs.md`. Mirrors the prose on `app/docs/page.tsx`; keep the two in sync.
 */
export function renderIntroMarkdown() {
  return [
    "# Introduction",
    "Dashboard and analytics components for shadcn/ui, distributed through a shadcn-compatible registry.",
    "## What it is",
    "dashboardcn is a set of components for the parts of a product that shadcn/ui leaves to you: KPI cards, time series charts, funnels, ranked lists, calendar heatmaps, and data tables.",
    "It is not a component library you install from npm. Each component is copied into your project with the shadcn CLI, exactly like shadcn/ui itself. You get the source, the styling lives in your Tailwind theme, and there is nothing to upgrade against.",
    "## Why",
    "This project started from a gap. When building a product dashboard, there was no obvious place to find components for presenting data well: KPI tiles, trend charts, funnels, ranked lists, and the cards that combine them. Where such collections existed, they were sold behind a license.",
    "User interface code should be free. shadcn/ui set that expectation for the base primitives, and dashboardcn extends it to the data-heavy parts of a product. Everything here is MIT licensed, copied into your project as source, and yours to change.",
    "## Foundations",
    [
      "- Tailwind CSS v4 and the shadcn/ui theme variables.",
      "- shadcn/ui primitives such as Card, Table, and Chart.",
      "- recharts for charts, through shadcn's chart wrapper.",
      "- TanStack Table v9 for data tables.",
    ].join("\n"),
    "## Radix or Base UI",
    "Components that render only HTML and CSS work with either the Radix or Base UI flavor of shadcn/ui. Components that depend on shadcn primitives pull the flavor your project already uses.",
    `Continue to [Installation](${publicUrl}/docs/installation.md).`,
  ].join("\n\n") + "\n"
}

/**
 * `/docs/installation.md`. Mirrors `app/docs/installation/page.tsx`.
 */
export function renderInstallationMarkdown() {
  return [
    "# Installation",
    "Add dashboardcn components to any project that has shadcn/ui set up.",
    "## Prerequisites",
    "You need a project with shadcn/ui initialized. If you do not have one yet, run:",
    fence("npx shadcn@latest init", "bash"),
    "## Add a component by URL",
    "Every component page shows its install command. The CLI downloads the files, installs any npm dependencies, and pulls in the shadcn/ui components it needs.",
    fence(`npx shadcn@latest add ${registryItemUrl("kpi-card")}`, "bash"),
    `The URL form is \`${registryItemUrl("<name>")}\`.`,
    "## Add the registry namespace",
    "To use the shorter `@dashboardcn/` form, register the namespace once in your `components.json`:",
    fence(
      JSON.stringify(
        { registries: { "@dashboardcn": `${publicUrl}/r/{name}.json` } },
        null,
        2
      ),
      "json"
    ),
    "Then install by name:",
    fence("npx shadcn@latest add @dashboardcn/kpi-card", "bash"),
    "## Agents",
    `Every docs page is available as Markdown by appending \`.md\` to its URL, and [llms.txt](${publicUrl}/llms.txt) indexes them all.`,
    "A skill teaches a coding agent how to pick, install, and compose the components. With the namespace registered, install it into `.claude/skills` with the shadcn CLI:",
    fence("npx shadcn@latest add @dashboardcn/skill", "bash"),
    "Or for any agent, with the skills CLI:",
    fence(`npx skills add ${siteConfig.links.githubRepo}`, "bash"),
    "shadcn's MCP server reads every registry in `components.json`, so once the namespace is registered it can search and install from this registry too:",
    fence("npx shadcn@latest mcp init --client claude", "bash"),
  ].join("\n\n") + "\n"
}
