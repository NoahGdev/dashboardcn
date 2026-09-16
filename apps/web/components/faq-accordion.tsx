import { ChevronDown } from "lucide-react"

/**
 * FAQ list in getopen.so's style: one soft rounded surface, each question a
 * full-width row that expands in place. Native details/summary, so it works
 * without JavaScript and the answers are in the page for search engines.
 */
export function FaqAccordion({
  items,
}: {
  items: { question: string; answer: string }[]
}) {
  return (
    <div className="bg-surface text-card-foreground divide-border/60 divide-y overflow-hidden rounded-[28px]">
      {items.map((item, index) => (
        <details key={item.question} name="faq" open={index === 0} className="group">
          <summary className="focus-visible:bg-muted/25 flex min-h-[54px] w-full cursor-pointer list-none items-center gap-4 px-5 py-3 text-left text-base tracking-tight outline-none transition-colors [&::-webkit-details-marker]:hidden">
            <span className="flex-1">{item.question}</span>
            <ChevronDown className="text-muted-foreground size-4 shrink-0 transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <p className="text-muted-foreground px-5 pb-5 text-[15px] leading-6 tracking-tight">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  )
}
