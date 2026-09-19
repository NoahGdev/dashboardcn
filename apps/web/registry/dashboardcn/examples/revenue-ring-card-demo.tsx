import { RevenueRingCard } from "@/registry/dashboardcn/blocks/revenue-ring-card"

export default function RevenueRingCardDemo() {
  return (
    <RevenueRingCard
      className="w-full max-w-md"
      label="Total revenue"
      value={284920}
      progress={82}
      color="var(--foreground)"
      legend={[
        { label: "Subscriptions", color: "var(--foreground)" },
        { label: "Usage & services", color: "var(--muted-foreground)" },
      ]}
      action={{ label: "View details", href: "#" }}
    />
  )
}
