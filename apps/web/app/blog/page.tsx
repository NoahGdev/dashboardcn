import Link from "next/link"

import { blogHref, blogPosts, formatPostDate } from "@/config/blog"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Guides, comparisons, and notes on building dashboards with shadcn/ui: KPI cards, charts, data tables, and why the components should be free.",
  path: "/blog",
})

export default function BlogIndexPage() {
  return (
    <div className="container-wrapper flex flex-1 flex-col px-4">
      <div className="mx-auto flex w-full max-w-160 flex-col gap-8 py-8 lg:py-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
          <p className="text-muted-foreground text-balance">
            Guides and comparisons for building dashboards with shadcn/ui.
          </p>
        </div>
        <ul className="flex flex-col divide-y">
          {blogPosts.map((post) => (
            <li key={post.slug} className="py-6 first:pt-0">
              <Link
                href={blogHref(post)}
                className="group flex flex-col gap-1.5"
              >
                <span className="text-muted-foreground text-xs">
                  {post.eyebrow} · <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                </span>
                <span className="text-lg font-medium tracking-tight underline-offset-4 group-hover:underline">
                  {post.title}
                </span>
                <span className="text-muted-foreground text-sm">{post.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
