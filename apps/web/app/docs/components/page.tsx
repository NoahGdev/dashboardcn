import { COMPONENT_DOCS } from "@/lib/docs"
import { DocsIndexGrid } from "@/components/docs-index-grid"
import { DocsPage } from "@/components/docs-page"

export const metadata = { title: "Components" }

export default function ComponentsPage() {
  return (
    <DocsPage
      title="Components"
      description="The primitives. Each one installs with a single command."
      href="/docs/components"
    >
      <DocsIndexGrid docs={COMPONENT_DOCS} />
    </DocsPage>
  )
}
