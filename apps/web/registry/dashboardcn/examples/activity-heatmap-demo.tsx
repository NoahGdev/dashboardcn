import { ActivityHeatmap } from "@/registry/dashboardcn/ui/activity-heatmap"

// Deterministic sample data so the demo is stable between renders.
function sampleData(days: number, end: Date) {
  let seed = 42
  const random = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296
    return seed / 4294967296
  }
  return Array.from({ length: days }, (_, i) => {
    const date = new Date(end)
    date.setDate(end.getDate() - (days - 1 - i))
    const weekend = date.getDay() === 0 || date.getDay() === 6
    const base = weekend ? 2 : 10
    const value = random() < 0.25 ? 0 : Math.round(random() * base * 3)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
    return { date: key, value }
  })
}

const end = new Date(2026, 8, 2)
const data = sampleData(365, end)

export default function ActivityHeatmapDemo() {
  return (
    <div className="w-full">
      <ActivityHeatmap data={data} endDate={end} unit="deploys" />
    </div>
  )
}
