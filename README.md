# dashboardcn

Dashboard and analytics components for shadcn/ui. KPI cards, charts,
funnels, ranked lists, calendar heatmaps, data tables, and the pieces around them. Built on the same foundations as
shadcn/ui: Tailwind v4, Radix primitives, recharts, and TanStack Table.

Every component is distributed through a shadcn-compatible registry, so you own
the code once it lands in your project.

```bash
npx shadcn@latest add https://dashboardcn.com/r/kpi-card.json
```

## Why

This project started from a gap. When building a product dashboard, there was
no obvious place to find components for presenting data well: KPI tiles,
trend charts, funnels, ranked lists, and the cards that combine them. Where
such collections existed, they were sold behind a license.

User interface code should be free. shadcn/ui set that expectation for the
base primitives, and dashboardcn extends it to the data-heavy parts of a
product. Everything here is MIT licensed, copied into your project as source,
and yours to change.

## Documentation

- [Installation](https://dashboardcn.com/docs/installation)
- [Components](https://dashboardcn.com/docs/components)
- [Blocks](https://dashboardcn.com/docs/blocks)

For coding agents: [llms.txt](https://dashboardcn.com/llms.txt) indexes every
page as Markdown, [llms-full.txt](https://dashboardcn.com/llms-full.txt) is all
of it in one file, and any docs page is available as Markdown by appending
`.md` to its URL.

There is also a [skill](./skills/dashboardcn/SKILL.md) that teaches an agent how
to pick, install, and compose the components:

```bash
npx skills add NoahGdev/dashboardcn
```

## License

MIT. The docs site and portions of the components are derived from
[shadcn/ui](https://github.com/shadcn-ui/ui), also MIT. See [LICENSE](./LICENSE).
