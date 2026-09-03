import { COMPONENT_DOCS } from "@/lib/docs"
import { DocsIndexGrid } from "@/components/docs-index-grid"
import { DocsPage } from "@/components/docs-page"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Components",
  description:
    "Dashboard primitives for shadcn/ui. Each one installs with a single command.",
  path: "/docs/components",
})

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
