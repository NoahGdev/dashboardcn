import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import { Logo } from "@/components/logo"

const columns = [
  {
    label: "Product",
    links: [
      { href: "/docs/components", label: "Components" },
      { href: "/docs/blocks", label: "Blocks" },
      { href: "/blocks/dashboard", label: "Dashboards" },
      { href: "/blocks/sidebar", label: "Sidebars" },
    ],
  },
  {
    label: "Docs",
    links: [
      { href: "/docs", label: "Introduction" },
      { href: "/docs/installation", label: "Installation" },
      { href: "/#faq", label: "Questions" },
      { href: "/llms.txt", label: "llms.txt" },
    ],
  },
  {
    label: "Resources",
    links: [
      { href: "/blog", label: "Blog" },
      { href: siteConfig.links.github, label: "GitHub", external: true },
      { href: "https://ui.shadcn.com", label: "shadcn/ui", external: true },
      { href: "https://ui.shadcn.com/docs/registry", label: "Registries", external: true },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="group-has-[.docs-nav]/body:pb-20 group-has-[[data-slot=docs]]/body:hidden group-has-[.docs-nav]/body:sm:pb-0 relative">
      <div className="container-page">
        <div className="grid gap-10 py-14 sm:grid-cols-2 sm:gap-8 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Logo />
              <span className="text-base font-medium tracking-tight">{siteConfig.name}</span>
            </Link>
            <p className="text-muted-foreground mt-3 max-w-xs text-sm leading-6">
              Dashboard and analytics components for shadcn/ui. Installed with
              the CLI, so you own the code.
            </p>
            <div className="mt-4 flex flex-col items-start gap-2.5">
              <div className="flex items-center gap-2">
                <a
                  aria-label={`${siteConfig.name} on GitHub`}
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border bg-card text-muted-foreground hover:bg-accent/40 hover:text-foreground inline-flex size-8 items-center justify-center rounded-full border shadow-xs transition-colors"
                >
                  <Icons.gitHub className="size-4" />
                </a>
              </div>
              <span className="border-border bg-card text-muted-foreground inline-flex h-8 items-center gap-2 rounded-full border px-3 text-xs shadow-xs">
                <span className="relative flex size-2">
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                MIT licensed, free forever
              </span>
            </div>
          </div>
          {columns.map((column) => (
            <nav key={column.label} aria-label={column.label}>
              <h3 className="text-foreground text-sm font-medium tracking-tight">{column.label}</h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href} className="flex items-center gap-2">
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="border-border text-muted-foreground flex flex-col items-start justify-between gap-2 border-t py-5 text-xs sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Proudly open source.</p>
          <p>
            Built on{" "}
            <a href="https://ui.shadcn.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
              shadcn/ui
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
