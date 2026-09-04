import { notFound } from "next/navigation"

import { blogHref, blogPosts, getBlogPost } from "@/config/blog"
import { pageMetadata } from "@/lib/seo"
import { BlogPostPage } from "@/components/blog-post"
import { posts } from "@/content/blog"

export const dynamicParams = false

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}
  return {
    ...pageMetadata({ title: post.title, description: post.description, path: blogHref(post) }),
    keywords: post.keywords,
    openGraph: {
      type: "article",
      url: `${blogHref(post)}`,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: ["Noah Gomes"],
    },
  }
}

export default async function BlogPostRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)
  const Post = posts[slug]
  if (!post || !Post) notFound()
  return (
    <BlogPostPage post={post}>
      <Post />
    </BlogPostPage>
  )
}
