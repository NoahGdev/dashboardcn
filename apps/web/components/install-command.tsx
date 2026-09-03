import { registryItemUrl } from "@/config/site"
import { CodeBlockCommand } from "@/components/code-block-command"

/** Package-manager tabs for a `shadcn add` command, in shadcn's code figure. */
export function InstallCommand({ name }: { name: string }) {
  const url = registryItemUrl(name)
  return (
    <ShellCommand
      npm={`npx shadcn@latest add ${url}`}
      yarn={`yarn dlx shadcn@latest add ${url}`}
      pnpm={`pnpm dlx shadcn@latest add ${url}`}
      bun={`bunx --bun shadcn@latest add ${url}`}
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
