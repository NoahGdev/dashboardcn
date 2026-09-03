import {
  CircleCheck,
  Clock,
  Flag,
  Megaphone,
  Rocket,
  ShieldAlert,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
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

const tones = {
  neutral: "",
  blue: "bg-sky-500/10 text-sky-700 dark:text-sky-400",
  amber: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  green: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
}

const events = [
  {
    icon: Flag,
    title: "Feature flag created",
    badge: "Owner assigned",
    tone: "neutral",
    time: "09:12",
    description: (
      <>
        Created <code className="text-foreground font-medium">checkout-redesign</code>{" "}
        for the billing workspace.
      </>
    ),
  },
  {
    icon: Rocket,
    title: "Canary rollout started",
    badge: "Canary",
    tone: "blue",
    time: "09:34",
    description: (
      <>
        Enabled for <span className="text-foreground font-medium">5% of workspaces</span>{" "}
        with session replay sampling on.
      </>
    ),
  },
  {
    icon: ShieldAlert,
    title: "Regional guardrail tripped",
    badge: "Paused",
    tone: "amber",
    time: "09:51",
    description: (
      <>
        Latency climbed in{" "}
        <span className="text-foreground font-medium">eu-central-1</span>; rollout is
        holding while routing warms.
      </>
    ),
  },
  {
    icon: Megaphone,
    title: "Customer messaging prepared",
    badge: "Docs",
    tone: "neutral",
    time: "10:05",
    description: (
      <>
        Support macro and changelog draft are ready in{" "}
        <span className="text-foreground font-medium">Launch notes</span>.
      </>
    ),
  },
  {
    icon: Clock,
    title: "Launch window scheduled",
    badge: "Queued",
    tone: "neutral",
    time: "10:30",
    description: "Full rollout waits for the next error-budget sweep.",
  },
  {
    icon: CircleCheck,
    title: "Release checklist verified",
    badge: "Ready",
    tone: "green",
    time: "10:42",
    description:
      "Rollback owner and dashboard checks are recorded in the release audit.",
    status: "current" as const,
  },
] satisfies Array<{
  icon: React.ElementType
  title: string
  badge: string
  tone: keyof typeof tones
  time: string
  description: React.ReactNode
  status?: "current"
}>

export default function TimelineDemo() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <div className="flex flex-col gap-0.5">
        <span className="text-muted-foreground text-xs">Rollout audit</span>
        <span className="font-semibold">Checkout redesign</span>
      </div>
      <Timeline>
        {events.map((event) => (
          <TimelineItem key={event.title} status={event.status}>
            <TimelineRail>
              <TimelineMarker>
                <event.icon />
              </TimelineMarker>
              <TimelineConnector />
            </TimelineRail>
            <TimelineContent>
              <TimelineHeader>
                <TimelineTitle>{event.title}</TimelineTitle>
                <Badge variant="secondary" className={tones[event.tone]}>
                  {event.badge}
                </Badge>
                <TimelineTime dateTime={`2026-05-22T${event.time}`}>
                  {event.time}
                </TimelineTime>
              </TimelineHeader>
              <TimelineDescription>{event.description}</TimelineDescription>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  )
}
