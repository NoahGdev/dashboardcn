import { blogPosts, getBlogPost } from "@/config/blog"
import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og"

export const alt = "dashboardcn blog"
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)
  return ogImage({
    title: post?.title ?? "Blog",
    description: post?.description,
    eyebrow: post?.eyebrow ?? "Blog",
  })
}
