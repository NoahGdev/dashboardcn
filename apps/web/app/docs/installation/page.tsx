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
  { title: "Add a component by URL", url: "#add-a-component-by-url", depth: 2 },
  { title: "Add the registry namespace", url: "#add-the-registry-namespace", depth: 2 },
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

      <H2>Add a component by URL</H2>
      <p>
        Every component page shows its install command. The CLI downloads the
        files, installs any npm dependencies, and pulls in the shadcn/ui
        components it needs.
      </p>
      <InstallCommand name="kpi-card" />
      <p>
        The URL form is <code>{registryItemUrl("<name>")}</code>.
      </p>

      <H2>Add the registry namespace</H2>
      <p>
        To use the shorter <code>@dashboardcn/</code> form, register the
        namespace once in your <code>components.json</code>:
      </p>
      <CodeBlock
        language="json"
        title="components.json"
        code={`{
  "registries": {
    "@dashboardcn": "https://dashboardcn.com/r/{name}.json"
  }
}`}
      />
      <p>Then install by name:</p>
      <ShellCommand
        npm="npx shadcn@latest add @dashboardcn/kpi-card"
        yarn="yarn dlx shadcn@latest add @dashboardcn/kpi-card"
        pnpm="pnpm dlx shadcn@latest add @dashboardcn/kpi-card"
        bun="bunx --bun shadcn@latest add @dashboardcn/kpi-card"
      />

      <H2>Agents</H2>
      <p>
        Every docs page is available as Markdown by appending{" "}
        <code>.md</code> to its URL, and{" "}
        <a href={`${publicUrl}/llms.txt`}>llms.txt</a> indexes them all.
      </p>
      <p>
        A skill teaches a coding agent how to pick, install, and compose the
        components. With the namespace registered, install it into{" "}
        <code>.claude/skills</code> with the shadcn CLI:
      </p>
      <ShellCommand
        npm="npx shadcn@latest add @dashboardcn/skill"
        yarn="yarn dlx shadcn@latest add @dashboardcn/skill"
        pnpm="pnpm dlx shadcn@latest add @dashboardcn/skill"
        bun="bunx --bun shadcn@latest add @dashboardcn/skill"
      />
      <p>Or for any agent, with the skills CLI:</p>
      <CodeBlock language="bash" code={`npx skills add ${siteConfig.links.githubRepo}`} />
      <p>
        shadcn&apos;s MCP server reads every registry in{" "}
        <code>components.json</code>, so once the namespace is registered it
        can search and install from this registry too:
      </p>
      <CodeBlock language="bash" code="npx shadcn@latest mcp init --client claude" />
    </DocsPage>
  )
}
