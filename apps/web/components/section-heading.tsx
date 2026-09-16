import { cn } from "@/lib/utils"

/** Centered section title: the first half in ink, the second half in muted. */
export function SectionHeading({
  children,
  muted,
  className,
}: {
  children: React.ReactNode
  muted?: React.ReactNode
  className?: string
}) {
  return (
    <h2
      className={cn(
        "mx-auto max-w-2xl text-center text-3xl font-normal tracking-tight text-balance sm:text-4xl",
        className
      )}
    >
      {children}
      {muted ? <> <span className="text-muted-foreground">{muted}</span></> : null}
    </h2>
  )
}
