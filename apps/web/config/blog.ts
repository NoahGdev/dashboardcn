export interface BlogPost {
  /** URL slug under `/blog/`. */
  slug: string
  title: string
  description: string
  /** ISO date. */
  date: string
  /** Short label shown above the title and in the social card. */
  eyebrow: string
  keywords?: string[]
}

/** Newest first. Every post has a component in `content/blog/<slug>.tsx`. */
export const blogPosts: BlogPost[] = [
  {
    slug: "boardui-alternative",
    title: "A free BoardUI alternative for shadcn/ui dashboards",
    description:
      "BoardUI sells its best dashboard components behind a Pro license. dashboardcn gives you KPI cards, charts, tables, and blocks for shadcn/ui, all MIT, with no paid tier.",
    date: "2026-09-04",
    eyebrow: "Comparison",
    keywords: ["BoardUI alternative", "BoardUI free", "shadcn dashboard components", "React dashboard UI kit"],
  },
  {
    slug: "tremor-alternative",
    title: "Tremor vs dashboardcn: dashboard components that match your shadcn/ui app",
    description:
      "Tremor is a great charting library with its own design system. If your app is already on shadcn/ui, dashboardcn gives you the same kind of components in your existing theme.",
    date: "2026-09-04",
    eyebrow: "Comparison",
    keywords: ["Tremor alternative", "Tremor vs shadcn", "shadcn charts", "shadcn dashboard"],
  },
  {
    slug: "shadcn-charts-for-dashboards",
    title: "Charts for shadcn/ui dashboards, beyond area, bar, line, and pie",
    description:
      "shadcn/ui ships the chart wrapper and a handful of examples. Dashboards need more: trend charts with period switching, funnels, donuts with center labels, heatmaps, and ranked bar lists.",
    date: "2026-09-04",
    eyebrow: "Guide",
    keywords: ["shadcn charts", "shadcn dashboard charts", "recharts shadcn", "shadcn funnel chart", "shadcn donut chart"],
  },
  {
    slug: "ui-code-should-be-free",
    title: "UI code should be free",
    description:
      "Why dashboardcn will never have a Pro tier, and why paying for a KPI card is a bad deal for everyone except the person selling it.",
    date: "2026-09-04",
    eyebrow: "Essay",
    keywords: ["free UI components", "open source dashboard components", "MIT UI kit"],
  },
]

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}

export function blogHref(post: Pick<BlogPost, "slug">) {
  return `/blog/${post.slug}`
}

export function formatPostDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  })
}
