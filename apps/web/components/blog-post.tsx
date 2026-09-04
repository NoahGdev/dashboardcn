import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { blogHref, formatPostDate, type BlogPost } from "@/config/blog"
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo"
import { DocsCta } from "@/components/docs-cta"
import { JsonLd } from "@/components/json-ld"

/** Article shell for a blog post: eyebrow, title, date, typeset body, CTA. */
export function BlogPostPage({
  post,
  children,
}: {
  post: BlogPost
  children: React.ReactNode
}) {
  return (
    <div className="container-wrapper flex flex-1 flex-col px-4">
      <JsonLd
        data={[
          articleJsonLd(post),
          breadcrumbJsonLd([
            { name: "Blog", path: "/blog" },
            { name: post.title, path: blogHref(post) },
          ]),
        ]}
      />
      <article className="mx-auto flex w-full max-w-160 flex-col gap-6 py-8 text-[1.05rem] sm:text-[15px] lg:py-12">
        <header className="flex flex-col gap-3">
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-foreground flex w-fit items-center gap-1 text-sm"
          >
            <ArrowLeft className="size-3.5" /> Blog
          </Link>
          <div className="text-muted-foreground text-sm">
            {post.eyebrow} · <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {post.title}
          </h1>
          <p className="text-muted-foreground text-lg text-balance">{post.description}</p>
        </header>
        <div className="typeset w-full">{children}</div>
        <div className="mt-8 max-w-sm">
          <DocsCta />
        </div>
      </article>
    </div>
  )
}
