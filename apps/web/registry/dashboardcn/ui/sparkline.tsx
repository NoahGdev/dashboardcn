"use client"

import * as React from "react"
import {
  Area,
  AreaChart,
  AreaRevealShape,
  Line,
  LineChart,
  ResponsiveContainer,
  type AreaRevealShapeProps,
} from "recharts"

import { cn } from "@/lib/utils"

export interface SparklineProps extends React.ComponentProps<"div"> {
  /** Series to plot, oldest first. */
  data: number[]
  variant?: "area" | "line"
  /** Area fill: a plain gradient, or a dot grid that fades out toward the line. */
  fill?: "gradient" | "dots"
  /** Any CSS color. Defaults to the theme primary. */
  color?: string
  curve?: "monotone" | "linear" | "step"
  strokeWidth?: number
}

/** Area shape that masks the fill to a dot grid while keeping the stroke solid. */
function DotGridAreaShape({
  maskId,
  ...props
}: AreaRevealShapeProps & { maskId: string }) {
  return (
    <>
      <g mask={`url(#${maskId})`}>
        <AreaRevealShape {...props} stroke="none" />
      </g>
      <AreaRevealShape {...props} id={undefined} fill="none" />
    </>
  )
}

function Sparkline({
  data,
  variant = "area",
  fill = "gradient",
  color = "var(--primary)",
  curve = "monotone",
  strokeWidth = 1.5,
  className,
  ...props
}: SparklineProps) {
  const id = React.useId()
  const dots = variant === "area" && fill === "dots"
  const points = React.useMemo(() => data.map((y, i) => ({ i, y })), [data])
  const margin = { top: 2, right: 0, bottom: 0, left: 0 }

  return (
    <div
      data-slot="sparkline"
      aria-hidden="true"
      className={cn("h-10 w-full", className)}
      {...props}
    >
      <ResponsiveContainer width="100%" height="100%">
        {variant === "line" ? (
          <LineChart data={points} margin={margin}>
            <Line
              type={curve}
              dataKey="y"
              stroke={color}
              strokeWidth={strokeWidth}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        ) : (
          <AreaChart data={points} margin={margin}>
            <defs>
              <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={dots ? 0.08 : 0.3} />
                <stop offset="100%" stopColor={color} stopOpacity={dots ? 0.9 : 0} />
              </linearGradient>
              {dots ? (
                <>
                  <pattern
                    id={`${id}-dots`}
                    patternUnits="userSpaceOnUse"
                    width={4}
                    height={4}
                  >
                    <circle cx={2} cy={2} r={0.9} fill="#fff" />
                  </pattern>
                  <mask
                    id={`${id}-mask`}
                    maskUnits="userSpaceOnUse"
                    x={0}
                    y={0}
                    width="100%"
                    height="100%"
                  >
                    <rect width="100%" height="100%" fill={`url(#${id}-dots)`} />
                  </mask>
                </>
              ) : null}
            </defs>
            <Area
              type={curve}
              dataKey="y"
              stroke={color}
              strokeWidth={strokeWidth}
              fill={`url(#${id})`}
              fillOpacity={dots ? 1 : undefined}
              dot={false}
              isAnimationActive={false}
              shape={
                dots
                  ? (shapeProps: AreaRevealShapeProps) => (
                      <DotGridAreaShape {...shapeProps} maskId={`${id}-mask`} />
                    )
                  : undefined
              }
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}

export { Sparkline }
