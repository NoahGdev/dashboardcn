import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"
import { blogHref, blogPosts } from "@/config/blog"
import { ALL_PAGES } from "@/lib/docs"

export default function sitemap(): MetadataRoute.Sitemap {
  const docs = ALL_PAGES.map((page) => ({
    url: `${siteConfig.url}${page.href}`,
    changeFrequency: "weekly" as const,
    priority: page.href.split("/").length > 3 ? 0.7 : 0.8,
  }))

  const blog = blogPosts.map((post) => ({
    url: `${siteConfig.url}${blogHref(post)}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [
    { url: siteConfig.url, changeFrequency: "weekly", priority: 1 },
    ...docs,
    { url: `${siteConfig.url}/blog`, changeFrequency: "weekly", priority: 0.6 },
    ...blog,
  ]
}
