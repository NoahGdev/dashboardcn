import { HeatmapChart } from "@/registry/dashboardcn/ui/heatmap-chart"

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

// Orders per region and month, in thousands. Each region has its own size and
// seasonal shape so the rows read differently instead of as one gradient.
const regions: { label: string; size: number; peak: number }[] = [
  { label: "North America", size: 48, peak: 11 },
  { label: "Europe", size: 36, peak: 10 },
  { label: "Asia Pacific", size: 42, peak: 5 },
  { label: "Latin America", size: 14, peak: 7 },
  { label: "Middle East", size: 9, peak: 2 },
  { label: "Africa", size: 5, peak: 8 },
]

function sampleRows() {
  let seed = 19
  const random = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296
    return seed / 4294967296
  }
  return regions.map((region) => ({
    label: region.label,
    values: months.map((_, m) => {
      const distance = Math.min(Math.abs(m - region.peak), 12 - Math.abs(m - region.peak))
      const season = 0.45 + 0.55 * Math.cos((distance / 6) * Math.PI) ** 2
      return Math.round(region.size * season * (0.85 + random() * 0.3) * 10) / 10
    }),
  }))
}

const rows = sampleRows()

export default function HeatmapChartRegionsDemo() {
  return (
    <div className="w-full max-w-lg">
      <HeatmapChart
        rows={rows}
        columns={months}
        color="var(--color-violet-500)"
        scale="sqrt"
        unit="K orders"
        valueFormatter={(value) => value.toFixed(1)}
      />
    </div>
  )
}
