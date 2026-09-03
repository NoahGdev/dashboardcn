"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { BLOCK_PAGES, COMPONENT_PAGES, SECTIONS } from "@/lib/docs"
import { DOCS_SIDEBAR_SCROLL_STORAGE_KEY } from "@/lib/docs-sidebar-scroll"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const itemClassName =
  "relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md data-[active=true]:border-accent data-[active=true]:bg-accent"

function readScrollState() {
  try {
    return JSON.parse(
      sessionStorage.getItem(DOCS_SIDEBAR_SCROLL_STORAGE_KEY) ?? ""
    ) as { pathname: string; scrollTop: number }
  } catch {
    return null
  }
}

function saveScrollState(container: HTMLElement) {
  try {
    sessionStorage.setItem(
      DOCS_SIDEBAR_SCROLL_STORAGE_KEY,
      JSON.stringify({ pathname: location.pathname, scrollTop: container.scrollTop })
    )
  } catch {}
}

function getActiveItem(container: HTMLElement) {
  const items = container.querySelectorAll<HTMLElement>('[data-active="true"]')
  let active: HTMLElement | null = null
  let activePathLength = -1
  let activeDistance = Infinity
  const containerRect = container.getBoundingClientRect()
  const containerCenter = containerRect.top + container.clientHeight / 2

  for (const item of items) {
    const link = item.querySelector<HTMLAnchorElement>("a[href]")
    const href = item.getAttribute("href") ?? link?.getAttribute("href")
    const pathLength = href?.length ?? 0
    const itemRect = item.getBoundingClientRect()
    const distance = Math.abs(itemRect.top + itemRect.height / 2 - containerCenter)
    if (
      pathLength > activePathLength ||
      (pathLength === activePathLength && distance < activeDistance)
    ) {
      active = item
      activePathLength = pathLength
      activeDistance = distance
    }
  }
  return active
}

export function DocsSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const contentRef = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    const container = contentRef.current
    if (!container) return
    const scrollState = readScrollState()
    if (scrollState?.pathname === pathname) {
      container.scrollTop = scrollState.scrollTop
    } else {
      const active = getActiveItem(container)
      if (active) {
        const containerRect = container.getBoundingClientRect()
        const activeRect = active.getBoundingClientRect()
        if (
          activeRect.top < containerRect.top ||
          activeRect.bottom > containerRect.bottom
        ) {
          container.scrollTop +=
            activeRect.top -
            containerRect.top -
            (container.clientHeight - activeRect.height) / 2
        }
      }
    }
    saveScrollState(container)
  }, [pathname])

  React.useEffect(() => {
    const container = contentRef.current
    if (!container) return
    const onScroll = () => saveScrollState(container)
    container.addEventListener("scroll", onScroll, { passive: true })
    return () => container.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <Sidebar
      className="sticky top-[calc(var(--header-height)+0.6rem)] z-30 hidden h-[calc(100svh-10rem)] overflow-hidden overscroll-none bg-transparent [--sidebar-menu-width:--spacing(56)] lg:flex"
      collapsible="none"
      {...props}
    >
      <div className="absolute top-12 right-2 bottom-0 hidden h-full w-px bg-[linear-gradient(to_bottom,transparent_0%,var(--border)_10%,var(--border)_90%,transparent_100%)] lg:flex" />
      <SidebarContent
        ref={contentRef}
        data-docs-sidebar-content=""
        className="scroll-fade scrollbar-none w-(--sidebar-menu-width) overflow-x-hidden pl-2.5"
      >
        <SidebarGroup className="pt-12">
          <SidebarGroupLabel className="text-muted-foreground font-medium">
            Sections
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SECTIONS.map(({ title, href }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      href === "/docs"
                        ? pathname === href
                        : href === "/docs/components" || href === "/docs/blocks"
                          ? pathname === href
                          : pathname.startsWith(href)
                    }
                    className={itemClassName}
                  >
                    <Link href={href}>
                      <span className="absolute inset-0 flex w-(--sidebar-menu-width) bg-transparent" />
                      {title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-medium">
            Components
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {COMPONENT_PAGES.map((page) => (
                <SidebarMenuItem key={page.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={page.href === pathname}
                    className={itemClassName}
                  >
                    <Link href={page.href}>
                      <span className="absolute inset-0 flex w-(--sidebar-menu-width) bg-transparent" />
                      {page.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-medium">
            Blocks
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {BLOCK_PAGES.map((page) => (
                <SidebarMenuItem key={page.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={page.href === pathname}
                    className={itemClassName}
                  >
                    <Link href={page.href}>
                      <span className="absolute inset-0 flex w-(--sidebar-menu-width) bg-transparent" />
                      {page.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
