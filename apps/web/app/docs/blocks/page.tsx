import { BLOCK_DOCS } from "@/lib/docs"
import { DocsIndexGrid } from "@/components/docs-index-grid"
import { DocsPage } from "@/components/docs-page"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Blocks",
  description:
    "Complete dashboard cards for shadcn/ui, composed from the primitives.",
  path: "/docs/blocks",
})

export default function BlocksPage() {
  return (
    <DocsPage
      title="Blocks"
      description="Complete cards composed from the primitives. Drop one in and pass your data."
      href="/docs/blocks"
    >
      <DocsIndexGrid docs={BLOCK_DOCS} />
    </DocsPage>
  )
}
