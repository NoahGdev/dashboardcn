import { BalanceChartCard } from "@/registry/dashboardcn/blocks/balance-chart-card"

const data = Array.from({ length: 24 }, (_, hour) => ({
  time: `${String(hour).padStart(2, "0")}:00`,
  balance: 22_000 + Math.round(Math.sin(hour / 3.5) * 1_800 + hour * 110 + (hour === 19 ? 900 : 0)),
}))

export default function BalanceChartCardDemo() {
  return (
    <BalanceChartCard
      className="w-full"
      title="Current balance"
      value={24_847.83}
      delta={0.127}
      deltaLabel="Last 24 hours"
      stats={[
        { label: "Today's sales", value: 1_249, delta: 0.08 },
        { label: "High", value: 25_900.08, color: "var(--color-emerald-500)" },
        { label: "Low", value: 20_850.42, color: "var(--color-red-500)" },
        { label: "Change", value: "-0.062%" },
      ]}
      data={data}
      xKey="time"
      yKey="balance"
      referenceValue={23_400}
      referenceLabel="Prev. close"
    />
  )
}
