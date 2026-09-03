import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  serverExternalPackages: ["shiki"],
  async rewrites() {
    return [
      { source: "/docs.md", destination: "/llm/index" },
      { source: "/docs/:path*.md", destination: "/llm/:path*" },
    ]
  },
}

export default nextConfig
