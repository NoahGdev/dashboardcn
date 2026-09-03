import { ImageResponse } from "next/og"

import { siteConfig } from "@/config/site"

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = "image/png"

/** The social card: site name, page title, and description on a dark ground. */
export function ogImage({
  title,
  description,
  eyebrow,
}: {
  title: string
  description?: string
  eyebrow?: string
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0a0a0a",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28 }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 4,
              background: "#fafafa",
            }}
          />
          <span style={{ fontWeight: 600 }}>{siteConfig.name}</span>
          {eyebrow ? (
            <span style={{ color: "#a1a1a1" }}>/ {eyebrow}</span>
          ) : null}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: title.length > 28 ? 58 : 84,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            {title}
          </div>
          {description ? (
            <div style={{ fontSize: 32, color: "#a1a1a1", lineHeight: 1.35, maxWidth: 1000 }}>
              {description}
            </div>
          ) : null}
        </div>
      </div>
    ),
    OG_SIZE
  )
}
