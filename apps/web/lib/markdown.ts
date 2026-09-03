import { getComponentDoc } from "@/config/docs"
import { registryItemUrl } from "@/config/site"
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
