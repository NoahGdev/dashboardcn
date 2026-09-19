import { PaymentSummaryCard } from "@/registry/dashboardcn/blocks/payment-summary-card"

export default function PaymentSummaryCardDemo() {
  return (
    <PaymentSummaryCard
      className="w-full max-w-md"
      metricLabel="Active customers"
      value={2540}
      progress={78}
      progressLabel="78%"
      legend={[{ label: "Paid" }, { label: "Free", color: "var(--muted)" }]}
      title="Federal income tax"
      rows={[
        { label: "Date", value: "March 24, 2025" },
        { label: "Amount", value: "$1,450.00" },
        { label: "Payment method", value: "•••• 4432" },
      ]}
      status="Completed"
      action={{ label: "View details", href: "#" }}
    />
  )
}
