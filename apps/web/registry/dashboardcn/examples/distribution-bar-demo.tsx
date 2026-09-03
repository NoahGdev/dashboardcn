import { DistributionBar } from "@/registry/dashboardcn/ui/distribution-bar"

const devices = [
  { name: "Desktop", value: 61_400 },
  { name: "Mobile", value: 34_200 },
  { name: "Tablet", value: 4_100 },
  { name: "Other", value: 640 },
]

export default function DistributionBarDemo() {
  return (
    <div className="w-full max-w-lg">
      <DistributionBar segments={devices} showValues />
    </div>
  )
}
