import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { componentDocs } from "@/config/docs"
import { docHref } from "@/lib/docs"
import { registryItemUrl } from "@/config/site"
import { Button } from "@/components/ui/button"
import { ShellCommand } from "@/components/install-command"
import KpiCardDemo from "@/registry/dashboardcn/examples/kpi-card-demo"
import TrendChartDemo from "@/registry/dashboardcn/examples/trend-chart-demo"
import BarListDemo from "@/registry/dashboardcn/examples/bar-list-demo"
import FunnelChartDemo from "@/registry/dashboardcn/examples/funnel-chart-demo"

const url = registryItemUrl("kpi-card")

export default function Home() {
  return (
    <div className="container-wrapper flex flex-1 flex-col">
      <div className="container flex flex-col gap-16 py-12 lg:py-20">
        <section className="flex max-w-2xl flex-col gap-5">
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Dashboard components for shadcn/ui.
          </h1>
          <p className="text-muted-foreground text-lg text-balance">
            KPI cards, charts, funnels, tables, and the pieces around them.
            Built on the same foundations as shadcn/ui and installed the same
            way. You own the code.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" asChild>
              <Link href="/docs">
                Get started <ArrowRight />
              </Link>
            </Button>
            <Button size="sm" variant="ghost" asChild>
              <Link href="/docs/components">Browse components</Link>
            </Button>
          </div>
          <div className="max-w-xl">
            <ShellCommand
              npm={`npx shadcn@latest add ${url}`}
              yarn={`yarn dlx shadcn@latest add ${url}`}
              pnpm={`pnpm dlx shadcn@latest add ${url}`}
              bun={`bunx --bun shadcn@latest add ${url}`}
            />
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <KpiCardDemo />
          <div className="grid gap-6 lg:grid-cols-5">
            <div className="rounded-xl border p-6 lg:col-span-3">
              <h2 className="mb-4 text-sm font-medium">Visitors</h2>
              <TrendChartDemo />
            </div>
            <div className="rounded-xl border p-6 lg:col-span-2">
              <h2 className="mb-4 text-sm font-medium">Top pages</h2>
              <BarListDemo />
            </div>
          </div>
          <div className="rounded-xl border p-6 lg:max-w-2xl">
            <h2 className="mb-4 text-sm font-medium">Signup funnel</h2>
            <FunnelChartDemo />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight">
            {componentDocs.length} components and counting
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[...componentDocs]
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((doc) => (
                <li key={doc.name}>
                  <Link
                    href={docHref(doc)}
                    className="hover:bg-muted/50 flex h-full flex-col gap-1 rounded-lg border p-4 transition-colors"
                  >
                    <span className="font-medium">{doc.title}</span>
                    <span className="text-muted-foreground text-sm">
                      {doc.description}
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
