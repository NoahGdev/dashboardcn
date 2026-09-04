import Link from "next/link"

import { registryItemUrl } from "@/config/site"
import { CodeBlock } from "@/components/code-block"
import { ComponentPreview } from "@/components/component-preview"
import { H2 } from "@/components/docs-heading"

export default function ShadcnChartsForDashboards() {
  return (
    <>
      <p>
        shadcn/ui&apos;s{" "}
        <a href="https://ui.shadcn.com/docs/components/chart" rel="noreferrer" target="_blank">
          Chart
        </a>{" "}
        component is a thin wrapper around Recharts: a container that wires
        your theme colors into CSS variables, plus themed tooltip and legend
        pieces. It ships with examples for area, bar, line, pie, radar, and
        radial charts, and you copy the one you want.
      </p>
      <p>
        That is the right foundation, and it is deliberately not a chart
        library. Once you build a real dashboard you keep writing the same
        things on top of it: a chart that switches between week, month, and
        year; a donut with a number in the middle; a funnel with drop-off
        between steps; a ranked list of top pages; a contribution-style
        heatmap. This post walks through those, with live examples. All of
        them sit on shadcn&apos;s chart wrapper, so they pick up your theme
        and match the examples you already have.
      </p>

      <H2>Trend chart</H2>
      <p>
        The workhorse. Area, line, or bar over time, any number of series,
        stacked or grouped, with the tooltip and legend from shadcn. Set{" "}
        <code>type</code>, pass <code>series</code>, and it handles the rest,
        including a horizontal layout and dot-grid fills for a softer look.
      </p>
      <ComponentPreview name="trend-chart-demo" />
      <CodeBlock language="bash" code={`npx shadcn@latest add ${registryItemUrl("trend-chart")}`} />

      <H2>Composed chart</H2>
      <p>
        When one series is revenue and another is a count, they need
        different axes. The composed chart mixes areas, lines, and bars,
        supports a second y-axis, reference lines, peak markers, and hatched
        bars for forecast or projected values.
      </p>
      <ComponentPreview name="composed-chart-dual-axis-demo" />

      <H2>Donut with a center label</H2>
      <p>
        The shadcn pie example puts a label in the middle with a custom
        Recharts label component. This version makes that a prop, adds a
        legend, and can render as a half donut for a gauge.
      </p>
      <ComponentPreview name="donut-chart-demo" />

      <H2>Funnel</H2>
      <p>
        There is no funnel in Recharts worth using for a conversion funnel.
        This one is plain divs: each step as a bar, the drop-off between steps,
        and overall conversion at the end. It is also the easiest one to
        restyle, because there is no SVG involved.
      </p>
      <ComponentPreview name="funnel-chart-demo" />

      <H2>Bar list</H2>
      <p>
        Top pages, referrers, countries, campaigns. A ranked list with a
        proportional bar behind each row, the pattern Plausible and Vercel
        Analytics use. Also plain HTML, so rows can be links.
      </p>
      <ComponentPreview name="bar-list-demo" />

      <H2>Activity heatmap</H2>
      <p>
        A calendar heatmap of daily activity, like GitHub&apos;s contribution
        graph. Pass dated values and it lays out the year in weeks, with a
        tooltip per day and intensity steps drawn from your theme color.
      </p>
      <ComponentPreview name="activity-heatmap-demo" />

      <H2>Putting them in cards</H2>
      <p>
        On a dashboard, a chart rarely stands alone. It has a title, a
        headline number, a period switcher, and sometimes tabs for switching
        the metric. The <Link href="/docs/blocks">blocks</Link> are those
        cards, already composed: a{" "}
        <Link href="/docs/blocks/balance-chart-card">balance chart</Link> with
        a reference line and peak marker, a{" "}
        <Link href="/docs/blocks/period-bar-chart-card">period bar chart</Link>{" "}
        where clicking a bar selects its period, and a{" "}
        <Link href="/docs/blocks/metric-tabs-chart-card">metric tabs chart</Link>{" "}
        that compares the selected metric against the previous period.
      </p>
      <ComponentPreview name="balance-chart-card-demo" align="start" previewClassName="p-4 sm:p-6" />
      <p>
        Every chart and block here is MIT and installs with the shadcn CLI.
        Browse the full list on the{" "}
        <Link href="/docs/components">components</Link> page.
      </p>
    </>
  )
}
