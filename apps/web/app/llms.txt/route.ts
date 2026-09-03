import { renderLlmsIndex } from "@/lib/llms"

export const dynamic = "force-static"

export function GET() {
  return new Response(renderLlmsIndex(), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  })
}
