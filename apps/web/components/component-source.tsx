import { readSource } from "@/lib/source"
import { cn } from "@/lib/utils"
import { CodeBlock } from "@/components/code-block"
import { CodeCollapsibleWrapper } from "@/components/code-collapsible-wrapper"

/** Shows a source file from the app root, rewritten for consumers. */
export async function ComponentSource({
  src,
  title,
  language,
  collapsible = true,
  maxLines,
  className,
}: {
  src: string
  title?: string
  language?: string
  collapsible?: boolean
  maxLines?: number
  className?: string
}) {
  let code = await readSource(src)
  if (maxLines) code = code.split("\n").slice(0, maxLines).join("\n")
  const lang = language ?? src.split(".").pop() ?? "tsx"

  if (!collapsible) {
    return (
      <div className={cn("relative", className)}>
        <CodeBlock code={code} language={lang} title={title} />
      </div>
    )
  }

  return (
    <CodeCollapsibleWrapper className={className}>
      <CodeBlock code={code} language={lang} title={title} />
    </CodeCollapsibleWrapper>
  )
}
