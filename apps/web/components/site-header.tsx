import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { CommandMenu } from "@/components/command-menu"
import { GitHubLink } from "@/components/github-link"
import { Logo } from "@/components/logo"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ModeSwitcher } from "@/components/mode-switcher"
import { SiteHeaderShell } from "@/components/site-header-shell"

export function SiteHeader() {
  return (
    <SiteHeaderShell>
      <div className="relative z-10 flex items-center gap-7">
        <Link href="/" className="flex items-center gap-2 transition-transform active:scale-95">
          <Logo />
          <span className="text-base font-medium tracking-tight">{siteConfig.name}</span>
        </Link>
        <MainNav items={siteConfig.navItems} className="hidden md:flex" />
      </div>
      <div className="relative z-10 flex items-center gap-2">
        <CommandMenu navItems={siteConfig.navItems} className="hidden lg:inline-flex" />
        <GitHubLink className="hidden sm:inline-flex" />
        <ModeSwitcher />
        <Button asChild className="hidden md:flex">
          <Link href="/docs/installation">Get started</Link>
        </Button>
        <MobileNav items={siteConfig.navItems} className="flex md:hidden" />
      </div>
    </SiteHeaderShell>
  )
}
