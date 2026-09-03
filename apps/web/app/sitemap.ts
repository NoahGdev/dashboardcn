import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"
import { ALL_PAGES } from "@/lib/docs"

export default function sitemap(): MetadataRoute.Sitemap {
  const docs = ALL_PAGES.map((page) => ({
    url: `${siteConfig.url}${page.href}`,
    changeFrequency: "weekly" as const,
    priority: page.href.split("/").length > 3 ? 0.7 : 0.8,
  }))

  return [
    { url: siteConfig.url, changeFrequency: "weekly", priority: 1 },
    ...docs,
  ]
}
