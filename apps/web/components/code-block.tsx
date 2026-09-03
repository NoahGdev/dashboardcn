import { highlightCode } from "@/lib/highlight-code"
import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"
import { getIconForLanguageExtension } from "@/components/icons"

/** A highlighted code figure with line numbers and a copy button. */
export async function CodeBlock({
  code,
  language = "tsx",
  title,
  className,
}: {
  code: string
  language?: string
  title?: string
  className?: string
}) {
  const highlightedCode = await highlightCode(code, language)
  return (
    <figure
      data-rehype-pretty-code-figure=""
      className={cn("[&>pre]:max-h-96", className)}
    >
      {title ? (
        <figcaption
          data-rehype-pretty-code-title=""
          className="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70"
          data-language={language}
        >
          {getIconForLanguageExtension(language)}
          {title}
        </figcaption>
      ) : null}
      <CopyButton value={code} />
      <div data-not-typeset dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    </figure>
  )
}
