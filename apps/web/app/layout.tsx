import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import { META_THEME_COLORS, siteConfig } from "@/config/site"
import { DOCS_SIDEBAR_SCROLL_RESTORE_SCRIPT } from "@/lib/docs-sidebar-scroll"
import { cn } from "@/lib/utils"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"

import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: ["Next.js", "React", "Tailwind CSS", "Components", "shadcn", "dashboard", "analytics"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        geistSans.variable,
        geistMono.variable,
        "[--header-height:calc(var(--spacing)*14)] lg:[--header-height:calc(var(--spacing)*16)]"
      )}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: DOCS_SIDEBAR_SCROLL_RESTORE_SCRIPT }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `,
          }}
        />
        <meta name="theme-color" content={META_THEME_COLORS.light} />
      </head>
      <body className="group/body overscroll-none antialiased [--footer-height:calc(var(--spacing)*14)] xl:[--footer-height:calc(var(--spacing)*24)]">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TooltipProvider delayDuration={0}>
            <div
              data-slot="layout"
              className="group/layout bg-background relative z-10 flex min-h-svh flex-col"
            >
              <SiteHeader />
              <main className="flex min-h-0 flex-1 flex-col">{children}</main>
              <SiteFooter />
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
