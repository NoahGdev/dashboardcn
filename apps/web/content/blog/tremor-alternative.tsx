import Link from "next/link"

import { registryItemUrl, siteConfig } from "@/config/site"
import { BLOCK_DOCS, COMPONENT_DOCS } from "@/lib/docs"
import { CodeBlock } from "@/components/code-block"
import { ComponentPreview } from "@/components/component-preview"
import { H2 } from "@/components/docs-heading"

export default function TremorAlternative() {
  return (
    <>
      <p>
        <a href="https://www.tremor.so" rel="noreferrer" target="_blank">
          Tremor
        </a>{" "}
        is the best known way to put charts in a React and Tailwind app. It
        has 35+ components and 300+ block examples, it is open source, it is
        built on Radix, Tailwind, and Recharts, and it joined Vercel. If you
        are building a dashboard from scratch, it is a fine choice.
      </p>
      <p>
        So why does {siteConfig.name} exist? Because a lot of teams are not
        starting from scratch. They already have a shadcn/ui app with a theme,
        a Card, a Table, and the chart wrapper, and they want dashboard
        components that look like the rest of that app. That is the gap this
        project fills. Here is how the two compare.
      </p>

      <H2>Two design systems or one</H2>
      <p>
        Tremor is a design system. It ships its own Button, Select, Tabs, and
        Card alongside its charts, styled its own way. Drop it into a shadcn/ui
        app and you have two of each, with two sets of spacing, radii, and
        color conventions to keep in line.
      </p>
      <p>
        {siteConfig.name} does not have a Button. It uses yours. Every
        component is built on shadcn/ui primitives and reads its colors from
        the shadcn theme variables, so a KPI card here looks like a card in
        your settings page, in light and dark mode, with the radius you
        picked when you ran <code>shadcn init</code>. Charts go through
        shadcn&apos;s own chart wrapper, so tooltips and legends match the
        examples in the shadcn/ui docs.
      </p>

      <H2>Install, don&apos;t depend</H2>
      <p>
        Tremor offers both an npm package and copy-and-paste components. The
        npm route is convenient until you need to change something the props
        do not expose. {siteConfig.name} only does the copy route, through the
        shadcn CLI, because that is how shadcn/ui works and it means the code
        is yours to edit.
      </p>
      <CodeBlock language="bash" code={`npx shadcn@latest add ${registryItemUrl("trend-chart")}`} />
      <p>
        That command copies <code>trend-chart.tsx</code> into your components
        folder, installs recharts if you do not have it, and adds
        shadcn&apos;s Card and Chart if they are missing. Nothing to upgrade
        against later, and nothing to override.
      </p>

      <H2>What is in the box</H2>
      <p>
        {COMPONENT_DOCS.length} components and {BLOCK_DOCS.length} blocks. The
        components are the primitives a dashboard is made of: KPI card, trend
        chart, composed chart, bar chart, donut, funnel, bar list, distribution
        bar, activity heatmap, sparkline, radial gauge, segmented meter, tick
        bar, dot plot, timeline, period tabs, and a full data table on TanStack
        Table v9. The blocks are finished cards that combine them, the kind of
        thing you see in a Stripe or Linear dashboard, with a period switcher,
        a headline number, and a chart that responds to it.
      </p>
      <ComponentPreview name="metric-tabs-chart-card-demo" align="start" previewClassName="p-4 sm:p-6" />
      <p>
        Tremor has more chart types and far more block examples, and its
        templates are a real head start for a new app. Where{" "}
        {siteConfig.name} spends its effort is on the cards themselves: the
        formatting of big numbers, the delta badges that know whether a
        decrease is good, the sparkline that colors itself by trend, and the
        composition patterns that keep a row of tiles aligned.
      </p>

      <H2>Both are free</H2>
      <p>
        This is not a price comparison. Tremor&apos;s components and blocks are
        open source, and so is everything here, under MIT. The choice is about
        fit. If you want one system for the whole app and are not on shadcn/ui,
        use Tremor. If you are on shadcn/ui and want dashboard components that
        belong there, start with the{" "}
        <Link href="/docs/components">components</Link> or the{" "}
        <Link href="/docs/blocks">blocks</Link>.
      </p>
    </>
  )
}
