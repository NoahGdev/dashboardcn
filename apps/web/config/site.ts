export const siteConfig = {
  name: "dashboardcn",
  url: process.env.NEXT_PUBLIC_BASE_URL ?? "https://dashboardcn.com",
  description:
    "Dashboard and analytics components for shadcn/ui. KPI cards, charts, funnels, tables, and the pieces around them. Installed with the shadcn CLI, so you own the code.",
  links: {
    github: "https://github.com/NoahGdev/dashboardcn",
    githubRepo: "NoahGdev/dashboardcn",
  },
  navItems: [
    { href: "/", label: "Home" },
    { href: "/docs", label: "Docs" },
    { href: "/docs/components", label: "Components" },
    { href: "/docs/blocks", label: "Blocks" },
  ],
}

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#0a0a0a",
}

/** Public URL a consumer uses to install an item. Always the production URL. */
export function registryItemUrl(name: string) {
  return `https://dashboardcn.com/r/${name}.json`
}
