"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Fades and lifts its children into place the first time they scroll into
 * view. Purely presentational: the content is in the DOM from the start, and
 * reduced-motion visitors see it immediately.
 */
export function Reveal({
  delay = 0,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & { delay?: number }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [inView, setInView] = React.useState(false)

  React.useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: "0px 0px -5% 0px", threshold: 0.01 }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn("reveal", inView && "is-inview", className)}
      style={{ "--reveal-delay": `${delay}ms`, ...style } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  )
}
