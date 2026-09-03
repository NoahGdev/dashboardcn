import { BLOCK_DOCS } from "@/lib/docs"
import { DocsIndexGrid } from "@/components/docs-index-grid"
import { DocsPage } from "@/components/docs-page"

export const metadata = { title: "Blocks" }

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
