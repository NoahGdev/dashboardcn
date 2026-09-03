import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  serverExternalPackages: ["shiki"],
  async rewrites() {
    return [{ source: "/docs/:path*.md", destination: "/llm/:path*" }]
  },
}

export default nextConfig
