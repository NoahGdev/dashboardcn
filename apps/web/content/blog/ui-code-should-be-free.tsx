import Link from "next/link"

import { siteConfig } from "@/config/site"
import { H2 } from "@/components/docs-heading"

export default function UiCodeShouldBeFree() {
  return (
    <>
      <p>
        {siteConfig.name} will never have a paid tier. Not a Pro plan, not a
        lifetime license, not a &quot;premium blocks&quot; page. Every
        component that exists or will exist is MIT, and you can do whatever you
        want with it, including selling it. This post is why.
      </p>

      <H2>The gap that started this</H2>
      <p>
        shadcn/ui changed what people expect from UI components. The code is
        free, it is yours, and it lives in your repo where you can read it and
        change it. For buttons, dialogs, and forms, that expectation is now
        the default.
      </p>
      <p>
        It did not extend to dashboards. Go looking for a KPI card with a
        sparkline, a funnel, or a chart card with a period switcher, and the
        polished options are behind a checkout page. You can have a free
        sample, and the twenty components you actually need are in the Pro
        tier, licensed per developer, per year, with a clause that says you
        cannot redistribute the source. The one thing that made shadcn/ui
        good, that the code is yours, gets sold back to you.
      </p>

      <H2>Why paying for UI is a bad deal</H2>
      <p>
        UI components are not hard to write. That sounds dismissive but it is
        the point. A KPI card is a hundred lines. A trend chart is a wrapper
        around Recharts. The value is not in any one of them, it is in
        having them consistent, tested, and composed into cards, and that
        value evaporates the moment the code is locked.
      </p>
      <ul>
        <li>
          <strong>You cannot share it.</strong> Paid UI licenses forbid
          publishing the source. Your open source side project, your
          starter template, your blog post with the code in it, all off the
          table.
        </li>
        <li>
          <strong>You cannot fork it.</strong> When the vendor moves on, and
          UI kits move on constantly, you are left with a snapshot you are not
          allowed to redistribute, and no community to keep it alive.
        </li>
        <li>
          <strong>It compounds.</strong> A per-developer license on a
          growing team is a tax on hiring, for a folder of TSX files.
        </li>
        <li>
          <strong>It makes the ecosystem worse.</strong> Every component sold
          behind a license is one that does not get copied, improved, and
          copied again. shadcn/ui got good because everyone could see and
          build on everyone else&apos;s version.
        </li>
      </ul>

      <H2>What free actually means here</H2>
      <p>
        MIT, no exceptions. Every component and block is in the public
        registry, and the source is on{" "}
        <a href={siteConfig.links.github} rel="noreferrer" target="_blank">
          GitHub
        </a>
        . You can use it in commercial products, put it in a template you
        sell, or build something that competes with this site. We would rather
        that happen than have a single component behind a paywall.
      </p>
      <p>
        There is also no account, no license key, and no email gate. The
        install command on every page works the first time you paste it.
      </p>

      <H2>How it stays free</H2>
      <p>
        By staying small. {siteConfig.name} is a registry, not a company. It
        does not ship a design system, an app shell, or a Figma file, because
        shadcn/ui and its ecosystem already cover those. It ships the data
        components a dashboard needs and the cards that combine them, and it
        is cheap to maintain because the code is simple and other people can
        fix it.
      </p>
      <p>
        If you have a dashboard component you wrote and would like more
        people to use, open a pull request. If you are choosing between this
        and a paid kit, we wrote up{" "}
        <Link href="/blog/boardui-alternative">how the two compare</Link>{" "}
        honestly. And if you just want the components,{" "}
        <Link href="/docs/installation">start here</Link>.
      </p>
    </>
  )
}
