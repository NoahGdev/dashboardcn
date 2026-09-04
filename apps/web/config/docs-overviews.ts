/**
 * A short paragraph of prose for each registry item, shown under the preview
 * on its docs page and included in the Markdown rendering. Written for
 * people arriving from a search, so each one says what the thing is for and
 * how it relates to shadcn/ui in plain words.
 */
export const docOverviews: Record<string, string> = {
  "kpi-card":
    "The KPI card is the stat card at the top of most dashboards: a label, a formatted value, a delta badge for the change since last period, and an optional sparkline. It is built from the shadcn/ui Card, so it matches the rest of your app, and it knows that a decrease is good for metrics like churn or latency.",
  "trend-chart":
    "The trend chart is the time-series chart for shadcn/ui dashboards. It renders area, line, or bar series through shadcn's chart wrapper, so tooltips, legends, and colors come from your theme, and it handles stacking, grouping, horizontal layouts, and dot-grid fills without dropping down to Recharts.",
  "bar-chart":
    "A single-series bar chart for shadcn/ui with gradient or striped fills, a highlighted subset of bars, and a hover marker. Use it for spend by week, signups by day, or anything where one series and a highlighted period tell the story.",
  "data-table":
    "A complete data table for shadcn/ui on TanStack Table v9: sorting, filtering, pagination, column visibility, row selection, sticky and reorderable columns, and loading states. It uses the shadcn Table primitives and is the table you would build yourself after the shadcn docs example, finished.",
  "funnel-chart":
    "A conversion funnel for shadcn/ui: each step as a bar, the drop-off between steps, and overall conversion at the end. It is plain HTML rather than SVG, which keeps it easy to restyle and accessible by default.",
  "bar-list":
    "A ranked list with a proportional bar behind each row, the pattern analytics tools use for top pages, referrers, and countries. Rows are plain elements, so they can be links, and the bars pick up your shadcn theme color.",
  "distribution-bar":
    "A single stacked bar that shows how a total splits across categories, with a legend. Use it for storage by type, revenue by plan, or traffic by source when a pie chart would take too much room.",
  "activity-heatmap":
    "A calendar heatmap for shadcn/ui in the style of GitHub's contribution graph. Give it dated values and it lays out the year in weeks, with a tooltip per day and intensity steps drawn from your theme color.",
  sparkline:
    "A tiny inline area or line chart with no axes, for showing a trend next to a number. It is what the KPI card and metric list use, and it is small enough to drop into a table cell.",
  "composed-chart":
    "A composed chart for shadcn/ui that mixes areas, lines, and bars in one plot, with a second y-axis for series on different scales, reference lines, peak markers, and hatched bars for forecast or projected values.",
  "donut-chart":
    "A donut, pie, or half-donut chart for shadcn/ui with a center label, tooltip, and legend, built on shadcn's chart primitives. The half-donut form doubles as a simple gauge.",
  "radial-gauge":
    "A semicircular or ring gauge for a value out of a whole, continuous or segmented, with room for content in the middle. Use it for capacity, health scores, or progress toward a target.",
  "segmented-meter":
    "A bar meter split into zones with a marker at the current value, for heart-rate zones, portfolio allocations, or thresholds where the zone a value falls in matters more than the number.",
  "metric-list":
    "Compact rows of label, sparkline, value, and delta, for listing several metrics in the space of one card. It uses the same formatting and delta conventions as the KPI card.",
  "delta-badge":
    "A small badge showing a signed percentage change with a trend icon, colored by whether the change is good. Every card in this registry uses it, and it can be inverted for metrics where a decrease is the good direction.",
  "metric-value":
    "The number formatter used by every card here. It renders currency, percent, compact, and plain numbers, abbreviates large values to K, M, and B, and shows the full value in a tooltip on hover.",
  "period-tabs":
    "A small segmented control for switching a chart or card between periods like week, month, and year. It is a thin layer over shadcn's Tabs, with an optional animated pill.",
  "tick-bar":
    "A progress bar drawn as a row of ticks lit up to the current value, for a more graphic take on progress toward a goal. Used by several of the KPI blocks.",
  "dot-plot":
    "A distribution drawn as columns of stacked dots, with the peak columns at full strength. It suits counts per day or per bucket where a bar chart would look too heavy.",
  timeline:
    "A vertical timeline for shadcn/ui: a rail, a marker per event, and free-form content beside it. Use it for audit logs, activity feeds, deployment history, and version lists.",
  "kpi-row-card":
    "A single card holding a row of KPI tiles, each with a sparkline and delta, plus a period switcher in the header and a summary in the footer. It is the top-of-dashboard block for shadcn/ui, composed from the KPI card, sparkline, and period tabs.",
  "balance-chart-card":
    "A balance or price card for shadcn/ui: a big value with delta, a row of supporting stats, and a line chart with a reference line and a peak marker. It suits account balances, stock prices, and any headline metric with history.",
  "status-gauge-card":
    "A status card with a headline word, a metric, an avatar stack, and a segmented semicircular gauge. Use it for system health, sleep scores, or any state that is best read as a word first and a number second.",
  "ring-kpi-card":
    "A row of KPI tiles where each value sits next to a small segmented ring showing progress or share, with a comparison to the previous value beneath. Good for targets and quotas.",
  "distribution-card":
    "A total with delta, a stacked bar showing how it splits, and a ranked list of the contributors with their values. Use it for capital inflows, revenue by source, or storage by type.",
  "tick-kpi-card":
    "A row of KPI tiles, each with a value out of a whole and a tick bar showing how far along it is. Suits capacity, budget consumed, and goals with a known ceiling.",
  "allocation-card":
    "A share-of-total card with a period switcher, a big percentage with delta, a tick bar, and a footer stat with an avatar stack. Built for portfolio allocation and similar share metrics.",
  "dual-metric-card":
    "Two metrics side by side in one card, each with a value, a share badge, a meter, and a supporting fact. Use it when two numbers are best read together, like new and returning leads.",
  "period-bar-chart-card":
    "A card with a total for the selected period, a range switcher, and a bar chart that highlights that period. Clicking a bar selects it, which makes it a small interactive report.",
  "progress-card":
    "A compact progress card with an icon title, a pill-style tick bar, and a count with a secondary stat. Good for onboarding steps, task completion, and quotas in a sidebar or grid.",
  "breakdown-card":
    "A total with delta and a list of contributors, each with a value and a hatched bar showing its share. A lighter alternative to a pie chart for gross volume, revenue mix, or cost breakdowns.",
  "dot-plot-card":
    "A metric card with a big value, a dot-plot distribution with its peak called out, and the change versus the previous period. Suits transactions per day and similar counts.",
  "insight-card":
    "A hero card with a badge, a very large number, a headline, and a paged set of insights over a soft gradient. Use it to surface generated or curated findings at the top of a dashboard.",
  "metric-tabs-chart-card":
    "A row of metric tabs, each with a value and delta, above a line chart of the selected metric against the previous period. Clicking a tab switches the chart, the pattern used by Stripe-style overview pages.",
  "data-table-card":
    "A card around the data table: title, description, toolbar, rows, and pagination in the footer. It is the table block for shadcn/ui dashboards, ready for a list of customers, orders, or invoices.",
}
