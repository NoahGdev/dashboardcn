import Image from "next/image"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export function Logo({
  className,
  size = 28,
}: {
  className?: string
  size?: number
}) {
  return (
    <Image
      src={siteConfig.logo}
      alt=""
      width={size}
      height={size}
      className={cn("size-7 rounded-md", className)}
      priority
    />
  )
}
