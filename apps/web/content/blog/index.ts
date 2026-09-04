import type { ComponentType } from "react"

import BoardUiAlternative from "@/content/blog/boardui-alternative"
import ShadcnChartsForDashboards from "@/content/blog/shadcn-charts-for-dashboards"
import TremorAlternative from "@/content/blog/tremor-alternative"
import UiCodeShouldBeFree from "@/content/blog/ui-code-should-be-free"

/** Post body by slug. Keep in sync with `config/blog.ts`. */
export const posts: Record<string, ComponentType> = {
  "boardui-alternative": BoardUiAlternative,
  "tremor-alternative": TremorAlternative,
  "shadcn-charts-for-dashboards": ShadcnChartsForDashboards,
  "ui-code-should-be-free": UiCodeShouldBeFree,
}
