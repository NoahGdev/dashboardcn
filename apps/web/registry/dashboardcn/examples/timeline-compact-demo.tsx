import { CircleCheck, CreditCard, FileText, ShieldAlert } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineHeader,
  TimelineItem,
  TimelineMarker,
  TimelineRail,
  TimelineTime,
  TimelineTitle,
} from "@/registry/dashboardcn/ui/timeline"

const events = [
  {
    icon: ShieldAlert,
    title: "Chargeback case opened",
    time: "Mar 6, 10:34 AM",
    dateTime: "2026-03-06T10:34",
    description:
      "The customer disputed a renewal charge, and the finance team has seven days to submit evidence.",
    className: "text-amber-600 dark:text-amber-400",
  },
  {
    icon: CreditCard,
    title: "Payment captured",
    time: "Mar 6, 10:21 AM",
    dateTime: "2026-03-06T10:21",
    className: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: CircleCheck,
    title: "Payment authorized",
    time: "Mar 6, 10:21 AM",
    dateTime: "2026-03-06T10:21",
  },
  {
    icon: FileText,
    title: "Invoice generated",
    time: "Mar 6, 10:20 AM",
    dateTime: "2026-03-06T10:20",
  },
]

export default function TimelineCompactDemo() {
  return (
    <Timeline className="w-full max-w-md">
      {events.map((event) => (
        <TimelineItem key={event.title} className="gap-2">
          <TimelineRail className="w-5">
            <TimelineMarker className={cn("size-5", event.className)}>
              <event.icon />
            </TimelineMarker>
            <TimelineConnector className="my-0.5" />
          </TimelineRail>
          <TimelineContent className="gap-0.5 pt-0 pb-3">
            <TimelineHeader>
              <TimelineTitle>{event.title}</TimelineTitle>
              <TimelineTime dateTime={event.dateTime}>{event.time}</TimelineTime>
            </TimelineHeader>
            {event.description ? (
              <TimelineDescription>{event.description}</TimelineDescription>
            ) : null}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}
