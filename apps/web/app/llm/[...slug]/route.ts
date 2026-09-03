import { getComponentDoc } from "@/config/docs"
import { BLOCK_DOCS, COMPONENT_DOCS } from "@/lib/docs"
import {
  renderInstallationMarkdown,
  renderIntroMarkdown,
  renderItemMarkdown,
} from "@/lib/markdown"

export const dynamicParams = false

const PAGES: Record<string, () => string> = {
  index: renderIntroMarkdown,
  installation: renderInstallationMarkdown,
}

/**
 * `/docs.md`, `/docs/installation.md`, `/docs/components/<name>.md`, and
 * `/docs/blocks/<name>.md` rewrite here.
 */
export function generateStaticParams() {
  return [
    ...Object.keys(PAGES).map((page) => ({ slug: [page] })),
    ...COMPONENT_DOCS.map((doc) => ({ slug: ["components", doc.name] })),
    ...BLOCK_DOCS.map((doc) => ({ slug: ["blocks", doc.name] })),
  ]
}

async function render(slug: string[]) {
  const [kind, name, ...rest] = slug
  const page = name ? undefined : PAGES[kind ?? ""]
  if (page) return page()
  const doc = name && !rest.length ? getComponentDoc(name) : undefined
  const expectedKind = doc?.kind === "block" ? "blocks" : "components"
  return doc && kind === expectedKind ? renderItemMarkdown(doc.name) : null
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const markdown = await render((await params).slug)
  if (!markdown) return new Response("Not found", { status: 404 })

  return new Response(markdown, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  })
}
