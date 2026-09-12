"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function MainNav({
  items,
  className,
  ...props
}: React.ComponentProps<"nav"> & {
  items: { href: string; label: string }[]
}) {
  const pathname = usePathname()

  return (
    <nav aria-label="Main" className={cn("items-center gap-7", className)} {...props}>
      {items
        .filter((item) => item.href !== "/")
        .map((item) => {
          const active =
            item.href === "/docs"
              ? pathname === "/docs" || pathname.startsWith("/docs/installation")
              : pathname.startsWith(item.href) ||
                (item.href === "/docs/blocks" && pathname.startsWith("/blocks"))
          return (
            <Link
              key={item.href}
              href={item.href}
              data-active={active}
              className="text-muted-foreground hover:text-foreground data-[active=true]:text-foreground text-sm font-medium transition-colors"
            >
              {item.label}
            </Link>
          )
        })}
    </nav>
  )
}
