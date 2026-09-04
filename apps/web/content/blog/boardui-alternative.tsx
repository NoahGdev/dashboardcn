import Link from "next/link"

import { registryItemUrl, siteConfig } from "@/config/site"
import { BLOCK_DOCS, COMPONENT_DOCS } from "@/lib/docs"
import { CodeBlock } from "@/components/code-block"
import { ComponentPreview } from "@/components/component-preview"
import { H2 } from "@/components/docs-heading"

export default function BoardUiAlternative() {
  return (
    <>
      <p>
        If you searched for dashboard components for React and Tailwind, you
        probably found{" "}
        <a href="https://boardui.com" rel="nofollow noreferrer" target="_blank">
          BoardUI
        </a>
        . It is a well made design system: 72 components, 17 chart cards, 8
        templates, and a Figma file, built on React Aria and Tailwind CSS v4.
        A subset is free under MIT. The rest is BoardUI Pro, sold per
        developer as an annual or lifetime license, with a five-seat plan for
        startups.
      </p>
      <p>
        {siteConfig.name} exists because we think that is the wrong deal for
        UI code. This page is for anyone weighing the two. It is written by the
        people behind {siteConfig.name}, so read it with that in mind, and check
        BoardUI&apos;s own{" "}
        <a href="https://boardui.com/license" rel="nofollow noreferrer" target="_blank">
          license page
        </a>{" "}
        for their current terms.
      </p>

      <H2>The short version</H2>
      <ul>
        <li>
          <strong>Price.</strong> {siteConfig.name} is MIT licensed, all of it.
          There is no Pro tier and there never will be. BoardUI has a free MIT
          subset and a paid Pro source with a license key.
        </li>
        <li>
          <strong>What you get.</strong> {COMPONENT_DOCS.length} data
          components and {BLOCK_DOCS.length} composed blocks today: KPI cards,
          trend and composed charts, donuts, funnels, bar lists, heatmaps,
          gauges, a full data table, and the cards that combine them. BoardUI
          is broader, since it is a whole design system with buttons, inputs,
          and app shells too. We do not ship those, because shadcn/ui already
          does.
        </li>
        <li>
          <strong>How it fits your app.</strong> {siteConfig.name} is built on
          shadcn/ui: its Card, Table, and Chart primitives, its theme variables,
          its CLI. If your app is already on shadcn/ui, the components land in
          your theme with nothing to reconcile. BoardUI is its own system with
          its own 400+ tokens, which is great if you adopt it wholesale and
          awkward if you only want a chart card.
        </li>
        <li>
          <strong>Ownership.</strong> Both copy source into your project. With
          {" "}{siteConfig.name} that source is MIT, so you can fork it, publish
          it, or build a competitor with it. BoardUI Pro source cannot be
          redistributed, and their license says you may not use it to build
          something that competes with BoardUI.
        </li>
      </ul>

      <H2>Same install, no checkout</H2>
      <p>
        Every component installs with the shadcn CLI, the same command you use
        for a shadcn/ui button. The CLI pulls in any shadcn primitives the
        component needs, like Card and Tooltip, and any npm dependencies, like
        recharts.
      </p>
      <CodeBlock language="bash" code={`npx shadcn@latest add ${registryItemUrl("kpi-card")}`} />
      <p>
        Or register the <code>@dashboardcn</code> namespace once and install by
        name. Details are in{" "}
        <Link href="/docs/installation">Installation</Link>.
      </p>

      <H2>What a block looks like</H2>
      <p>
        BoardUI&apos;s strongest feature is its chart cards. Here is one of
        ours: a period switcher, a row of KPI tiles with sparklines and deltas,
        and a footer summary, composed from the KPI card, sparkline, and delta
        badge primitives. Click the code tab for the full source.
      </p>
      <ComponentPreview name="kpi-row-card-demo" align="start" previewClassName="p-4 sm:p-6" />

      <H2>When BoardUI is the better choice</H2>
      <p>
        To be fair about it: if you are starting a product from a blank page,
        want a complete design language with a matching Figma file, and are
        not on shadcn/ui, BoardUI gives you more in one place. Its React Aria
        foundation is also a good reason to pick it if accessibility of
        complex widgets matters more to you than fitting an existing theme.
      </p>
      <p>
        If you already have a shadcn/ui app and need the data-heavy parts,
        KPI rows, charts, tables, and the cards around them, {siteConfig.name}{" "}
        is the smaller, free tool that fits what you have. Start with the{" "}
        <Link href="/docs/blocks">blocks</Link>, or read{" "}
        <Link href="/blog/ui-code-should-be-free">why we will not charge for
        any of it</Link>.
      </p>
    </>
  )
}
