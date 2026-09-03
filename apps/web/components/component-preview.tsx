import * as React from "react"

import { ComponentPreviewTabs } from "@/components/component-preview-tabs"
import { ComponentSource } from "@/components/component-source"
import { examples, type ExampleName } from "@/registry/dashboardcn/examples"

export function ComponentPreview({
  name,
  className,
  previewClassName,
  align = "center",
  hideCode = false,
  ...props
}: React.ComponentProps<"div"> & {
  name: ExampleName
  align?: "center" | "start" | "end"
  hideCode?: boolean
  previewClassName?: string
}) {
  const example = examples[name]
  const Component = example.component

  return (
    <ComponentPreviewTabs
      className={className}
      previewClassName={previewClassName}
      align={align}
      hideCode={hideCode}
      component={<Component />}
      source={<ComponentSource src={example.path} collapsible={false} />}
      sourcePreview={
        <ComponentSource src={example.path} collapsible={false} maxLines={3} />
      }
      {...props}
    />
  )
}
