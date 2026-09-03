import { ArrowUpRight } from "lucide-react"

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

const people = {
  mina: { name: "Mina Sol", gradient: "from-sky-400 to-indigo-500" },
  orin: { name: "Orin Vale", gradient: "from-amber-400 to-rose-500" },
  paz: { name: "Paz Kim", gradient: "from-emerald-400 to-teal-500" },
}

function Avatar({ person }: { person: keyof typeof people }) {
  return (
    <span
      role="img"
      aria-label={people[person].name}
      className={`size-full bg-linear-to-br ${people[person].gradient}`}
    />
  )
}

export default function TimelineActivityDemo() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <div className="flex flex-col gap-0.5">
        <span className="text-muted-foreground text-xs">Studio review</span>
        <span className="font-semibold">Runner launch assets</span>
      </div>
      <Timeline>
        <TimelineItem>
          <TimelineRail>
            <TimelineMarker className="border-0">
              <Avatar person="mina" />
            </TimelineMarker>
            <TimelineConnector />
          </TimelineRail>
          <TimelineContent>
            <TimelineHeader>
              <TimelineTitle>Product asset uploaded</TimelineTitle>
              <Badge
                variant="secondary"
                className="bg-sky-500/10 text-sky-700 dark:text-sky-400"
              >
                Review
              </Badge>
              <TimelineTime dateTime="2026-05-22T10:18">
                <span className="text-foreground/80 font-medium">Mina Sol</span>{" "}
                10:18 AM
              </TimelineTime>
            </TimelineHeader>
            <div className="bg-card mt-1 flex gap-3 rounded-lg border p-3">
              <div className="bg-muted size-20 shrink-0 rounded-md" />
              <div className="flex flex-col gap-2">
                <TimelineDescription>
                  Final hero crop is ready for retouch review with the side profile,
                  lace detail, and marketplace thumbnail queued.
                </TimelineDescription>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="outline">PDP hero</Badge>
                  <Badge variant="outline">4 crops</Badge>
                  <Badge variant="outline" asChild>
                    <a href="#">
                      Open board <ArrowUpRight />
                    </a>
                  </Badge>
                </div>
              </div>
            </div>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineRail>
            <TimelineMarker className="border-0">
              <Avatar person="orin" />
            </TimelineMarker>
            <TimelineConnector />
          </TimelineRail>
          <TimelineContent>
            <TimelineHeader>
              <TimelineTitle>Lighting pass reviewed</TimelineTitle>
              <TimelineTime dateTime="2026-05-22T10:27">
                <span className="text-foreground/80 font-medium">Orin Vale</span>{" "}
                10:27 AM
              </TimelineTime>
            </TimelineHeader>
            <TimelineDescription>
              The side profile reads clearly on the landing page. Keep the outsole
              shadow soft so the sole texture stays visible.
            </TimelineDescription>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineRail>
            <TimelineMarker className="border-0">
              <Avatar person="paz" />
            </TimelineMarker>
            <TimelineConnector />
          </TimelineRail>
          <TimelineContent>
            <TimelineHeader>
              <TimelineTitle>Copy note resolved</TimelineTitle>
              <TimelineTime dateTime="2026-05-22T10:43">
                <span className="text-foreground/80 font-medium">Paz Kim</span>{" "}
                10:43 AM
              </TimelineTime>
            </TimelineHeader>
            <TimelineDescription>
              Updated the launch tile copy and aligned the product badge with the
              approved campaign language.
            </TimelineDescription>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineRail>
            <TimelineMarker className="border-0">
              <Avatar person="mina" />
            </TimelineMarker>
            <TimelineConnector />
          </TimelineRail>
          <TimelineContent>
            <TimelineHeader>
              <TimelineTitle>Review package ready</TimelineTitle>
              <TimelineTime dateTime="2026-05-22T11:06">
                <span className="text-foreground/80 font-medium">Mina Sol</span>{" "}
                11:06 AM
              </TimelineTime>
            </TimelineHeader>
            <TimelineDescription>
              Exported the approved crops and shared the board with the marketplace
              team for final sign-off.
            </TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  )
}
