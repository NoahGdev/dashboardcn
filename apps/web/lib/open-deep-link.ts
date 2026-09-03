/** How long to wait for an app to take over the page before giving up. */
const LAUNCH_TIMEOUT = 1200

/**
 * Navigating to a custom scheme is silent when no app has registered it: the
 * browser reports neither success nor failure. The only signal is indirect —
 * a launch pulls focus away from the page, either to the app itself or to the
 * browser's own "open this app?" prompt. So fire the URL and watch for focus
 * leaving. A page that was already hidden or unfocused gives us nothing to
 * measure, so it reports success rather than a false "didn't open".
 */
function attempt(url: string) {
  const measurable = !document.hidden && document.hasFocus()

  return new Promise<boolean>((resolve) => {
    let settled = false

    const settle = (launched: boolean) => {
      if (settled) return
      settled = true
      window.removeEventListener("blur", onLeave)
      document.removeEventListener("visibilitychange", onLeave)
      clearTimeout(timer)
      resolve(launched)
    }

    const onLeave = () => settle(true)
    const timer = setTimeout(
      () => settle(!measurable || document.hidden || !document.hasFocus()),
      LAUNCH_TIMEOUT
    )

    if (measurable) {
      window.addEventListener("blur", onLeave)
      document.addEventListener("visibilitychange", onLeave)
    }

    // Assigning a custom scheme hands off to the OS without navigating away.
    window.location.href = url
  })
}

/**
 * Try each URL in turn, stopping at the first one that pulls focus. Returns
 * false when every one was ignored, which means the app is not installed —
 * or the visitor is on mobile, where none of these schemes resolve.
 */
export async function openDeepLink(urls: string[]) {
  for (const url of urls) {
    if (await attempt(url)) return true
  }
  return false
}
