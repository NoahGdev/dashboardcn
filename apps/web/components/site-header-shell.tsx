"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const HeaderMenuContext = React.createContext<(open: boolean) => void>(() => {})

export function useHeaderMenuOpen() {
  return React.useContext(HeaderMenuContext)
}

export function SiteHeaderShell({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const [scrolled, setScrolled] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <HeaderMenuContext.Provider value={setMenuOpen}>
      <header
        data-scrolled={scrolled && !menuOpen}
        className={cn(
          "group sticky top-0 z-50 h-14 w-full px-4 sm:h-16 sm:px-6",
          menuOpen && "bg-background",
          className
        )}
      >
        <div className="relative mx-auto flex h-14 w-full max-w-full items-center justify-between rounded-full border border-transparent px-0 transition-[max-width,height,margin,padding,background-color,border-color,box-shadow] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-data-[scrolled=true]:mt-3 group-data-[scrolled=true]:h-11 group-data-[scrolled=true]:max-w-[calc(100%-1.5rem)] group-data-[scrolled=true]:border-[#8f8f8f]/30 group-data-[scrolled=true]:bg-[#d9d9d9]/50 group-data-[scrolled=true]:px-2 group-data-[scrolled=true]:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(255,255,255,0.12),0_1px_1px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.10)] group-data-[scrolled=true]:backdrop-blur-xl group-data-[scrolled=true]:backdrop-saturate-125 sm:h-16 sm:max-w-4xl sm:px-4 sm:group-data-[scrolled=true]:h-12 sm:group-data-[scrolled=true]:max-w-3xl sm:group-data-[scrolled=true]:px-2.5 dark:group-data-[scrolled=true]:border-white/10 dark:group-data-[scrolled=true]:bg-[#2a2a2a]/60">
          <span
            aria-hidden
            className="glass-noise pointer-events-none absolute inset-0 rounded-full opacity-0 mix-blend-overlay transition-opacity duration-700 group-data-[scrolled=true]:opacity-100"
          />
          {children}
        </div>
      </header>
    </HeaderMenuContext.Provider>
  )
}
