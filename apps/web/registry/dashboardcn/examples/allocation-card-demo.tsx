import { AllocationCard } from "@/registry/dashboardcn/blocks/allocation-card"

export default function AllocationCardDemo() {
  return (
    <AllocationCard
      className="w-full max-w-md"
      title="Portfolio allocation"
      description="Share of assets under management currently held in equities."
      value={0.46}
      delta={0.034}
      deltaLabel="vs prior period"
      periods={[
        { value: "week", label: "Week" },
        { value: "month", label: "Month" },
        { value: "year", label: "Year" },
      ]}
      stat={{ label: "Equities exposure", value: "$4.7M" }}
      people={[
        { name: "shadcn", src: "https://github.com/shadcn.png" },
        { name: "Evil Rabbit", src: "https://github.com/evilrabbit.png" },
        { name: "Kai" },
      ]}
      peopleLabel="6 members"
    />
  )
}
