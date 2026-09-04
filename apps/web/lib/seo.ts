import type { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { absoluteUrl } from "@/lib/utils"

/** Per-page metadata with a canonical URL and matching social cards. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): Metadata {
  const url = absoluteUrl(path)
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${title} - ${siteConfig.name}`,
      description,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} - ${siteConfig.name}`,
      description,
    },
  }
}

/** Breadcrumb list from an ordered set of pages, root first. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

/** A registry item as open source code. */
export function registryItemJsonLd({
  name,
  title,
  description,
  path,
}: {
  name: string
  title: string
  description: string
  path: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: title,
    description,
    url: absoluteUrl(path),
    codeRepository: siteConfig.links.github,
    programmingLanguage: "TypeScript",
    runtimePlatform: "React",
    license: "https://opensource.org/licenses/MIT",
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
    installUrl: `https://dashboardcn.com/r/${name}.json`,
  }
}

export function siteJsonLd() {
  const logo = absoluteUrl(siteConfig.logo)
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      image: logo,
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo,
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      name: siteConfig.name,
      description: siteConfig.description,
      url: siteConfig.url,
      image: logo,
      codeRepository: siteConfig.links.github,
      programmingLanguage: "TypeScript",
      runtimePlatform: "React",
      license: "https://opensource.org/licenses/MIT",
    },
  ]
}

/** A blog post as a BlogPosting. */
export function articleJsonLd(post: {
  slug: string
  title: string
  description: string
  date: string
  keywords?: string[]
}) {
  const url = absoluteUrl(`/blog/${post.slug}`)
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: url,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.keywords?.join(", "),
    image: `${url}/opengraph-image`,
    author: { "@type": "Person", name: "Noah Gomes", url: "https://github.com/NoahGdev" },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: { "@type": "ImageObject", url: absoluteUrl(siteConfig.logo) },
    },
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
  }
}

/** Question and answer pairs as an FAQPage. Answers are plain text. */
export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  }
}
