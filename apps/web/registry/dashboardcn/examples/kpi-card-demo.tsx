import { KpiCard } from "@/registry/dashboardcn/ui/kpi-card"

const revenue = [42, 48, 45, 52, 58, 55, 61, 67, 64, 72, 78, 84]
const users = [1200, 1260, 1250, 1300, 1310, 1290, 1280, 1300, 1295, 1310, 1300, 1305]
const churn = [3.2, 3.1, 3.3, 2.9, 2.8, 2.9, 2.6, 2.5, 2.4, 2.4, 2.2, 2.1]

export default function KpiCardDemo() {
  return (
    <div className="@container w-full">
      <div className="grid gap-4 @lg:grid-cols-2 @3xl:grid-cols-4">
        <KpiCard
          label="Revenue"
          value={84_120}
          format="currency"
          delta={0.124}
          deltaLabel="vs. last 30 days"
          trend={revenue}
        />
        <KpiCard
          label="Active users"
          value={1_305}
          format="compact"
          delta={0.004}
          deltaLabel="vs. last 30 days"
          trend={users}
        />
        <KpiCard
          label="Churn"
          value={0.021}
          format="percent"
          delta={-0.34}
          deltaLabel="vs. last 30 days"
          trend={churn}
          invertDelta
        />
        <KpiCard
          label="Open tickets"
          value={17}
          delta={0}
          deltaLabel="No change this week"
        />
      </div>
    </div>
  )
}
