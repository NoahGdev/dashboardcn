import { getComponentDoc } from "@/config/docs"
import { COMPONENT_DOCS } from "@/lib/docs"
import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og"

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export function generateStaticParams() {
  return COMPONENT_DOCS.map((doc) => ({ slug: doc.name }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getComponentDoc(slug)
  return ogImage({
    eyebrow: "Component",
    title: doc?.title ?? slug,
    description: doc?.description,
  })
}
