import { BarList } from "@/registry/dashboardcn/ui/bar-list"

const pages = [
  { name: "/", value: 48_210, href: "#" },
  { name: "/pricing", value: 21_480, href: "#" },
  { name: "/docs", value: 18_930, href: "#" },
  { name: "/blog/launch-week", value: 9_120, href: "#" },
  { name: "/changelog", value: 4_305, href: "#" },
  { name: "/careers", value: 1_870, href: "#" },
]

export default function BarListDemo() {
  return (
    <div className="w-full max-w-lg">
      <div className="text-muted-foreground mb-2 flex justify-between text-xs">
        <span>Page</span>
        <span>Visitors</span>
      </div>
      <BarList data={pages} showPercentage />
    </div>
  )
}
