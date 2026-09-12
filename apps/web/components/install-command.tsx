import { registryItemName, registryItemUrl } from "@/config/site"
import { CodeBlockCommand } from "@/components/code-block-command"

/**
 * Package-manager tabs for a `shadcn add` command, in shadcn's code figure.
 * `url` switches from the `@dashboardcn/<name>` form to the full item URL.
 */
export function InstallCommand({ name, url = false }: { name: string; url?: boolean }) {
  const item = url ? registryItemUrl(name) : registryItemName(name)
  return (
    <ShellCommand
      npm={`npx shadcn@latest add ${item}`}
      yarn={`yarn dlx shadcn@latest add ${item}`}
      pnpm={`pnpm dlx shadcn@latest add ${item}`}
      bun={`bunx --bun shadcn@latest add ${item}`}
    />
  )
}

export function NpmInstallCommand({ packages }: { packages: string[] }) {
  const list = packages.join(" ")
  return (
    <ShellCommand
      npm={`npm install ${list}`}
      yarn={`yarn add ${list}`}
      pnpm={`pnpm add ${list}`}
      bun={`bun add ${list}`}
    />
  )
}

export function ShellCommand({
  npm,
  yarn,
  pnpm,
  bun,
}: {
  npm: string
  yarn: string
  pnpm: string
  bun: string
}) {
  return (
    <figure data-rehype-pretty-code-figure="" className="relative">
      <CodeBlockCommand __npm__={npm} __yarn__={yarn} __pnpm__={pnpm} __bun__={bun} />
    </figure>
  )
}
