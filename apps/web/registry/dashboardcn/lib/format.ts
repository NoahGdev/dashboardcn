export type NumberFormat = "number" | "compact" | "currency" | "percent"

export interface FormatNumberOptions {
  format?: NumberFormat
  /** ISO 4217 code, used when format is "currency". Defaults to USD. */
  currency?: string
  locale?: string
  maximumFractionDigits?: number
}

const formatterCache = new Map<string, Intl.NumberFormat>()

function getFormatter(locale: string, options: Intl.NumberFormatOptions) {
  const key = locale + JSON.stringify(options)
  let formatter = formatterCache.get(key)
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, options)
    formatterCache.set(key, formatter)
  }
  return formatter
}

/**
 * Format a metric value for display.
 *
 * formatNumber(1234567)                          -> "1,234,567"
 * formatNumber(1234567, { format: "compact" })   -> "1.2M"
 * formatNumber(48.2, { format: "currency" })     -> "$48.20"
 * formatNumber(0.124, { format: "percent" })     -> "12.4%"
 */
export function formatNumber(
  value: number,
  {
    format = "number",
    currency = "USD",
    locale = "en-US",
    maximumFractionDigits,
  }: FormatNumberOptions = {}
): string {
  if (!Number.isFinite(value)) return "—"

  switch (format) {
    case "compact":
      return getFormatter(locale, {
        notation: "compact",
        maximumFractionDigits: maximumFractionDigits ?? 1,
      }).format(value)
    case "currency":
      return getFormatter(locale, {
        style: "currency",
        currency,
        maximumFractionDigits: maximumFractionDigits ?? 2,
      }).format(value)
    case "percent":
      return getFormatter(locale, {
        style: "percent",
        maximumFractionDigits: maximumFractionDigits ?? 1,
      }).format(value)
    default:
      return getFormatter(locale, {
        maximumFractionDigits: maximumFractionDigits ?? 0,
      }).format(value)
  }
}

/**
 * Format a fractional change as a signed percentage.
 *
 * formatDelta(0.124)  -> "+12.4%"
 * formatDelta(-0.03)  -> "-3.0%"
 * formatDelta(0)      -> "0.0%"
 */
export function formatDelta(delta: number, locale = "en-US"): string {
  if (!Number.isFinite(delta)) return "—"
  return getFormatter(locale, {
    style: "percent",
    signDisplay: "exceptZero",
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  }).format(delta)
}

/**
 * Fractional change between two values. Returns 0 when there is no baseline.
 */
export function computeDelta(current: number, previous: number): number {
  if (!previous) return 0
  return (current - previous) / Math.abs(previous)
}
