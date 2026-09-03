import { createHash } from "node:crypto"
import { codeToHtml } from "shiki"

// Highlighting is deterministic and CPU-heavy, so cache across requests.
const cache = new Map<string, string>()
const MAX_ENTRIES = 500

export async function highlightCode(code: string, language = "tsx") {
  const key = createHash("sha256").update(`${language}:${code}`).digest("hex")
  const cached = cache.get(key)
  if (cached) return cached

  const html = await codeToHtml(code, {
    lang: language,
    themes: { dark: "github-dark", light: "github-light" },
    transformers: [
      {
        pre(node) {
          node.properties["class"] =
            "no-scrollbar min-w-0 overflow-x-auto overflow-y-auto overscroll-x-contain overscroll-y-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0 !bg-transparent"
        },
        code(node) {
          node.properties["data-line-numbers"] = ""
        },
        line(node) {
          node.properties["data-line"] = ""
        },
      },
    ],
  })

  if (cache.size >= MAX_ENTRIES) {
    const oldest = cache.keys().next().value
    if (oldest) cache.delete(oldest)
  }
  cache.set(key, html)
  return html
}
