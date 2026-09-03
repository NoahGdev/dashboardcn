import { getComponentDoc } from "@/config/docs"
import { BLOCK_DOCS, COMPONENT_DOCS } from "@/lib/docs"
import { renderItemMarkdown } from "@/lib/markdown"

export const dynamicParams = false

/** `/docs/components/<name>.md` and `/docs/blocks/<name>.md` rewrite here. */
export function generateStaticParams() {
  return [
    ...COMPONENT_DOCS.map((doc) => ({ slug: ["components", doc.name] })),
    ...BLOCK_DOCS.map((doc) => ({ slug: ["blocks", doc.name] })),
  ]
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const [kind, name, ...rest] = (await params).slug
  const doc = name && !rest.length ? getComponentDoc(name) : undefined
  const expectedKind = doc?.kind === "block" ? "blocks" : "components"
  const markdown = doc && kind === expectedKind ? await renderItemMarkdown(doc.name) : null
  if (!markdown) return new Response("Not found", { status: 404 })

  return new Response(markdown, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  })
}
