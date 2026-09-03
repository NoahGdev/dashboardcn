import { cache } from "react"
import { codeToHtml } from "shiki"

export const highlight = cache(async (code: string, lang = "tsx") => {
  return codeToHtml(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  })
})
