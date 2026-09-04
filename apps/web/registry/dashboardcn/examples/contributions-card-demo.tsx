import { ContributionsCard } from "@/registry/dashboardcn/blocks/contributions-card"

// Deterministic sample data so the demo is stable between renders.
function sampleData(days: number, end: Date) {
  let seed = 7
  const random = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296
    return seed / 4294967296
  }
  return Array.from({ length: days }, (_, i) => {
    const date = new Date(end)
    date.setDate(end.getDate() - (days - 1 - i))
    const weekend = date.getDay() === 0 || date.getDay() === 6
    const value = random() < (weekend ? 0.6 : 0.2) ? 0 : Math.round(random() * (weekend ? 3 : 9))
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
    return { date: key, value }
  })
}

const end = new Date(2026, 8, 2)
const data = sampleData(365, end)

export default function ContributionsCardDemo() {
  return (
    <ContributionsCard
      className="w-full"
      title="Contributions this year"
      delta={0.148}
      deltaLabel="vs last year"
      stats={[
        { label: "Lifetime tokens", value: 9_000_000_000, format: "compact" },
        { label: "Peak tokens", value: 562_700_000, format: "compact" },
        { label: "Longest task", value: "12h 54m" },
        { label: "Top streak", value: 62, unit: "days" },
      ]}
      periods={[
        { value: "week", label: "Weekly" },
        { value: "month", label: "Monthly" },
        { value: "year", label: "Yearly" },
      ]}
      defaultPeriod="year"
      data={data}
      endDate={end}
      color="var(--color-violet-500)"
      unit="contributions"
    />
  )
}
