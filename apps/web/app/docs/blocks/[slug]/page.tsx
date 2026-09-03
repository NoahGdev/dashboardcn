import { getComponentDoc } from "@/config/docs"
import { BLOCK_DOCS } from "@/lib/docs"
import { DocsItemPage } from "@/components/docs-item-page"

export const dynamicParams = false

export function generateStaticParams() {
  return BLOCK_DOCS.map((doc) => ({ slug: doc.name }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getComponentDoc(slug)
  return { title: doc?.title, description: doc?.description }
}

export default async function BlockPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <DocsItemPage slug={slug} />
}
