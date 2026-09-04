import { Building2, Crown, Eye, UserPlus, Users, Zap } from "lucide-react"

import { StageBarsCard } from "@/registry/dashboardcn/blocks/stage-bars-card"

const icons = {
  visits: <Eye />,
  signup: <UserPlus />,
  active: <Zap />,
  pro: <Crown />,
  team: <Users />,
  enterprise: <Building2 />,
}

const colors = [
  "var(--color-lime-400)",
  "var(--color-blue-500)",
  "var(--color-violet-500)",
  "var(--color-pink-500)",
  "var(--color-amber-400)",
  "var(--color-emerald-500)",
]

function stages(values: number[]) {
  const names = ["Visits", "Sign-up", "Active", "Pro", "Team", "Enterprise"] as const
  const keys = ["visits", "signup", "active", "pro", "team", "enterprise"] as const
  return names.map((name, index) => ({
    name,
    value: values[index]!,
    color: colors[index],
    icon: icons[keys[index]!],
  }))
}

const ranges = [
  { value: "7d", label: "Last 7 days", delta: 0.024, stages: stages([1180, 790, 460, 250, 120, 40]) },
  { value: "30d", label: "Last 30 days", delta: 0.061, stages: stages([4820, 3260, 2010, 1160, 540, 180]) },
  { value: "90d", label: "Last 90 days", delta: -0.012, stages: stages([14200, 9410, 5630, 3120, 1480, 510]) },
]

export default function StageBarsCardDemo() {
  return (
    <StageBarsCard
      className="w-full max-w-lg"
      title="Pipeline"
      deltaLabel="vs previous period"
      ranges={ranges}
    />
  )
}
