import { slugify } from "@/lib/docs"

function HeadingAnchor({ id, children }: { id?: string; children: React.ReactNode }) {
  if (!id) return children
  return (
    <a className="group no-underline" href={`#${id}`}>
      <span className="underline-offset-4 group-hover:underline">{children}</span>
      <span
        aria-hidden="true"
        className="text-muted-foreground ml-2 opacity-0 group-hover:opacity-100"
      >
        #
      </span>
    </a>
  )
}

function getHeadingId(children: React.ReactNode) {
  return typeof children === "string" ? slugify(children) : undefined
}

export function H2({ children, id, ...props }: React.ComponentProps<"h2">) {
  const headingId = id ?? getHeadingId(children)
  return (
    <h2 id={headingId} {...props}>
      <HeadingAnchor id={headingId}>{children}</HeadingAnchor>
    </h2>
  )
}

export function H3({ children, id, ...props }: React.ComponentProps<"h3">) {
  const headingId = id ?? getHeadingId(children)
  return (
    <h3 id={headingId} {...props}>
      <HeadingAnchor id={headingId}>{children}</HeadingAnchor>
    </h3>
  )
}
