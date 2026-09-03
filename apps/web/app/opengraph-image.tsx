import { siteConfig } from "@/config/site"
import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og"

export const alt = siteConfig.description
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return ogImage({
    title: "Dashboard components for shadcn/ui.",
    description: "KPI cards, charts, funnels, tables, and the pieces around them. Installed with the shadcn CLI, so you own the code.",
  })
}
