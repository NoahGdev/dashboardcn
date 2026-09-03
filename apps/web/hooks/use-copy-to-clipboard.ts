"use client"

import * as React from "react"

function legacyCopyToClipboard(value: string) {
  const textArea = document.createElement("textarea")
  textArea.value = value
  textArea.setAttribute("readonly", "")
  textArea.style.position = "fixed"
  textArea.style.opacity = "0"
  textArea.style.pointerEvents = "none"
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  textArea.setSelectionRange(0, value.length)
  let hasCopied = false
  try {
    hasCopied = document.execCommand("copy")
  } catch {
    hasCopied = false
  }
  document.body.removeChild(textArea)
  return hasCopied
}

export async function copyToClipboard(value: string) {
  if (typeof window === "undefined" || !value) return false
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value)
      return true
    } catch {
      return legacyCopyToClipboard(value)
    }
  }
  return legacyCopyToClipboard(value)
}

export function useCopyToClipboard({
  timeout = 2000,
  onCopy,
}: { timeout?: number; onCopy?: () => void } = {}) {
  const [isCopied, setIsCopied] = React.useState(false)

  const copy = async (value: string) => {
    const hasCopied = await copyToClipboard(value)
    if (!hasCopied) return false
    setIsCopied(true)
    onCopy?.()
    if (timeout !== 0) setTimeout(() => setIsCopied(false), timeout)
    return true
  }

  return { isCopied, copyToClipboard: copy }
}
