import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  serverExternalPackages: ["shiki"],
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "*.local"],
  async rewrites() {
    return [
      { source: "/docs.md", destination: "/llm/index" },
      { source: "/docs/:path*.md", destination: "/llm/:path*" },
    ]
  },
}

export default nextConfig
