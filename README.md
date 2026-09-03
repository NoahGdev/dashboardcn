# dashboardcn

Dashboard and analytics components for shadcn/ui. KPI cards, charts,
funnels, ranked lists, calendar heatmaps, data tables, and the pieces around them. Built on the same foundations as
shadcn/ui: Tailwind v4, Radix primitives, recharts, and TanStack Table.

Every component is distributed through a shadcn-compatible registry, so you own
the code once it lands in your project.

## Why

This project started from a gap. When building a product dashboard, there was
no obvious place to find components for presenting data well: KPI tiles,
trend charts, funnels, ranked lists, and the cards that combine them. Where
such collections existed, they were sold behind a license.

User interface code should be free. shadcn/ui set that expectation for the
base primitives, and dashboardcn extends it to the data-heavy parts of a
product. Everything here is MIT licensed, copied into your project as source,
and yours to change.

## Install a component

```bash
npx shadcn@latest add https://dashboardcn.com/r/kpi-card.json
```

Or register the namespace once in your `components.json`:

```json
{
  "registries": {
    "@dashboardcn": "https://dashboardcn.com/r/{name}.json"
  }
}
```

and then:

```bash
npx shadcn@latest add @dashboardcn/kpi-card
```

## Components

| Item | What it is |
| --- | --- |
| `kpi-card` | Metric card with value, period-over-period delta, and sparkline |
| `bar-chart` | Single-series bars with gradient or striped fills and highlighted bars |
| `trend-chart` | Area, line, or bar chart over time on shadcn's chart primitives |
| `data-table` | Sortable, filterable, paginated table on TanStack Table v9 |
| `funnel-chart` | Step conversion with drop-off between steps |
| `bar-list` | Ranked list with proportional bars |
| `distribution-bar` | Single stacked bar of category shares |
| `activity-heatmap` | Contribution-graph style calendar heatmap |
| `sparkline` | Tiny inline area or line chart |
| `tick-bar` | Progress bar drawn as a row of ticks |
| `dot-plot` | Distribution as columns of stacked dots with the peak columns at full strength |
| `metric-value` | Formatted number that abbreviates large values and shows the full value on hover |
| `format` | Number, currency, percent, and delta formatters (lib) |

## Blocks

Complete cards composed from the primitives.

| Item | What it is |
| --- | --- |
| `kpi-row-card` | Period switcher, row of KPI tiles with sparklines and deltas, footer summary |
| `period-bar-chart-card` | Total for the selected period, range switcher, and a bar chart highlighting it |
| `metric-tabs-chart-card` | Row of metric tabs with value and delta, and a line chart of the selected one vs the previous period |
| `balance-chart-card` | Big value, delta, stat row, and a line chart with reference line and peak marker |
| `status-gauge-card` | Status word, metric, avatar stack, and a segmented semicircular gauge |
| `ring-kpi-card` | Row of KPI tiles with a segmented ring beside each value and a previous-value comparison |
| `distribution-card` | Total with delta, stacked share bar, and a ranked list of contributors |
| `tick-kpi-card` | Row of KPI tiles, each a value out of a whole with a tick bar |
| `allocation-card` | Period switcher, big percentage with delta, tick bar, footer stat and avatar stack |
| `dual-metric-card` | Two metrics side by side with share badge, meter, and a supporting fact |
| `progress-card` | Icon title, pill tick bar, and a count with a secondary stat |
| `breakdown-card` | Total with delta and a list of contributors, each with a value and a hatched share bar |
| `dot-plot-card` | Big value, dot-plot distribution with its peak called out, and change vs last period |

## Repository layout

```
apps/
  web/                      # docs site (ported from ui.shadcn.com), also serves the registry
    app/docs/               # docs routes; component pages are generated from config/docs.ts
    config/docs.ts          # per-component docs: description, examples, usage snippet
    registry.json           # registry manifest (what `shadcn build` reads)
    registry/dashboardcn/   # component source
      ui/                   # components -> components/ui/* in consumer apps
      lib/                  # helpers    -> lib/* in consumer apps
      examples/             # demos shown on the docs pages
    public/r/               # built registry items (output of `shadcn build`)
packages/
  typescript-config/        # shared tsconfig presets
```

## Development

```bash
pnpm install
pnpm dev            # builds the registry, then starts the site on :3000
pnpm registry:build # rebuild public/r/*.json only
pnpm check          # lint + typecheck
```

To test an item against the local registry from another project:

```bash
npx shadcn@latest add http://localhost:3000/r/kpi-card.json
```

## Adding a component

1. Put the source under `apps/web/registry/dashboardcn/ui/<name>.tsx`.
   Import shadcn primitives from `@/components/ui/*` and helpers from `@/lib/*`;
   the CLI rewrites those aliases for each consumer.
2. Add an item to `apps/web/registry.json` listing its files, npm
   `dependencies`, and `registryDependencies` (shadcn items it needs).
3. Add a demo under `registry/dashboardcn/examples/`, register it in
   `examples/index.tsx`, and describe the page in `config/docs.ts`.
4. Run `pnpm registry:build`.

## License

MIT. The docs site and portions of the components are derived from
[shadcn/ui](https://github.com/shadcn-ui/ui), also MIT. See [LICENSE](./LICENSE).
