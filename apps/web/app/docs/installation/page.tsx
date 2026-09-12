import { publicUrl, registryItemUrl, siteConfig } from "@/config/site"
import { CodeBlock } from "@/components/code-block"
import { H2 } from "@/components/docs-heading"
import { DocsPage } from "@/components/docs-page"
import { InstallCommand, ShellCommand } from "@/components/install-command"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Installation",
  description:
    "Add dashboardcn components to any project that has shadcn/ui set up.",
  path: "/docs/installation",
})

const toc = [
  { title: "Prerequisites", url: "#prerequisites", depth: 2 },
  { title: "Add a component", url: "#add-a-component", depth: 2 },
  { title: "Add by URL", url: "#add-by-url", depth: 2 },
  { title: "Agents", url: "#agents", depth: 2 },
]

export default function InstallationPage() {
  return (
    <DocsPage
      title="Installation"
      description="Add components to any project that has shadcn/ui set up."
      href="/docs/installation"
      toc={toc}
    >
      <H2>Prerequisites</H2>
      <p>
        You need a project with shadcn/ui initialized. If you do not have one
        yet, run:
      </p>
      <ShellCommand
        npm="npx shadcn@latest init"
        yarn="yarn dlx shadcn@latest init"
        pnpm="pnpm dlx shadcn@latest init"
        bun="bunx --bun shadcn@latest init"
      />

      <H2>Add a component</H2>
      <p>
        Every component page shows its install command. The CLI downloads the
        files, installs any npm dependencies, and pulls in the shadcn/ui
        components it needs.
      </p>
      <InstallCommand name="kpi-card" />
      <p>
        <code>@dashboardcn</code> is listed in the{" "}
        <a href="https://ui.shadcn.com/docs/directory">shadcn registry directory</a>,
        so the CLI resolves the namespace without any setup in{" "}
        <code>components.json</code>.
      </p>

      <H2>Add by URL</H2>
      <p>
        Older versions of the CLI do not know the namespace. Pass the item URL
        instead:
      </p>
      <InstallCommand name="kpi-card" url />
      <p>
        The URL form is <code>{registryItemUrl("<name>")}</code>.
      </p>

      <H2>Agents</H2>
      <p>
        Every docs page is available as Markdown by appending{" "}
        <code>.md</code> to its URL, and{" "}
        <a href={`${publicUrl}/llms.txt`}>llms.txt</a> indexes them all.
      </p>
      <p>
        A skill teaches a coding agent how to pick, install, and compose the
        components. Install it into <code>.claude/skills</code> with the shadcn
        CLI:
      </p>
      <InstallCommand name="skill" />
      <p>Or for any agent, with the skills CLI:</p>
      <CodeBlock language="bash" code={`npx skills add ${siteConfig.links.githubRepo}`} />
      <p>
        shadcn&apos;s MCP server searches the registries in{" "}
        <code>components.json</code>. Add the namespace there to include this
        registry:
      </p>
      <CodeBlock
        language="json"
        title="components.json"
        code={`{
  "registries": {
    "@dashboardcn": "${publicUrl}/r/{name}.json"
  }
}`}
      />
      <CodeBlock language="bash" code="npx shadcn@latest mcp init --client claude" />
    </DocsPage>
  )
}
