"use client";

import { ReactLenis } from "lenis/react";
import { useEffect } from "react";

/** Lenis inertial scrolling — the thing that makes the whole page feel
 * Framer-ish. `root` mounts it on <html> so anchors keep working. */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  /** A reload should land on the hero, not wherever the reader happened to be.
   *
   * `scrollRestoration = "manual"` (set in the document head, before anything
   * else runs) is enough for Chrome. Safari — iOS especially — re-applies its
   * remembered offset *after* load, once images have settled the page height,
   * so a single jump at mount gets overruled. Hence the re-assertions below,
   * each cancelled the moment the reader touches the page, so we can never
   * yank someone back who has started scrolling on their own. */
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    /** A refresh means the top, hash or no hash. Tapping a menu item leaves
     * `#about` (or worse) in the address bar, Safari hides it, and every later
     * refresh silently lands mid-page. The head script already stripped it on
     * a reload; a fresh visit to a shared `#section` link is still honoured. */
    const entry = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming | undefined;
    const reloaded = entry?.type === "reload";
    if (window.location.hash && !reloaded) return;

    let theirs = false;
    const yield_ = () => {
      theirs = true;
    };
    const toTop = () => {
      if (!theirs) window.scrollTo(0, 0);
    };

    const opts = { passive: true, once: true } as const;
    window.addEventListener("wheel", yield_, opts);
    window.addEventListener("touchstart", yield_, opts);
    window.addEventListener("keydown", yield_, { once: true });
    window.addEventListener("load", toTop);
    window.addEventListener("pageshow", toTop);
    // Safari can restore late, after the hero image settles the height, so the
    // last of these lands well past load.
    const timers = [0, 120, 400, 900, 1600].map((ms) => setTimeout(toTop, ms));

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("wheel", yield_);
      window.removeEventListener("touchstart", yield_);
      window.removeEventListener("keydown", yield_);
      window.removeEventListener("load", toTop);
      window.removeEventListener("pageshow", toTop);
    };
  }, []);

  // Set NEXT_PUBLIC_NO_LENIS=1 to fall back to native scrolling (screenshot
  // tooling and scroll-position debugging both prefer it).
  if (process.env.NEXT_PUBLIC_NO_LENIS === "1") return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>
      {children}
    </ReactLenis>
  );
}
