import { getComponentDoc } from "@/config/docs"
import { pageMetadata } from "@/lib/seo"
import { COMPONENT_DOCS, docHref } from "@/lib/docs"
import { DocsItemPage } from "@/components/docs-item-page"

export const dynamicParams = false

export function generateStaticParams() {
  return COMPONENT_DOCS.map((doc) => ({ slug: doc.name }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getComponentDoc(slug)
  if (!doc) return {}
  return pageMetadata({ title: doc.title, description: doc.description, path: docHref(doc) })
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <DocsItemPage slug={slug} />
}
