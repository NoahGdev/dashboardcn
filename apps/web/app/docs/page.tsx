import Link from "next/link"

import { siteConfig } from "@/config/site"
import { H2 } from "@/components/docs-heading"
import { DocsPage } from "@/components/docs-page"

export const metadata = { title: "Introduction" }

const toc = [
  { title: "What it is", url: "#what-it-is", depth: 2 },
  { title: "Foundations", url: "#foundations", depth: 2 },
  { title: "Radix or Base UI", url: "#radix-or-base-ui", depth: 2 },
]

export default function IntroductionPage() {
  return (
    <DocsPage
      title="Introduction"
      description="Dashboard and analytics components for shadcn/ui, distributed through a shadcn-compatible registry."
      href="/docs"
      toc={toc}
    >
      <H2>What it is</H2>
      <p>
        {siteConfig.name} is a set of components for the parts of a product
        that shadcn/ui leaves to you: KPI cards, time series charts, funnels,
        ranked lists, calendar heatmaps, and data tables.
      </p>
      <p>
        It is not a component library you install from npm. Each component is
        copied into your project with the shadcn CLI, exactly like shadcn/ui
        itself. You get the source, the styling lives in your Tailwind theme,
        and there is nothing to upgrade against.
      </p>
      <H2>Foundations</H2>
      <ul>
        <li>Tailwind CSS v4 and the shadcn/ui theme variables.</li>
        <li>shadcn/ui primitives such as Card, Table, and Chart.</li>
        <li>recharts for charts, through shadcn&apos;s chart wrapper.</li>
        <li>TanStack Table v9 for data tables.</li>
      </ul>
      <H2>Radix or Base UI</H2>
      <p>
        Components that render only HTML and CSS work with either the Radix or
        Base UI flavor of shadcn/ui. Components that depend on shadcn primitives
        pull the flavor your project already uses.
      </p>
      <p>
        Continue to <Link href="/docs/installation">Installation</Link>.
      </p>
    </DocsPage>
  )
}
