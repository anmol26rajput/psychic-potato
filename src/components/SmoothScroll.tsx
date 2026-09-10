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
   * The browser restores the old offset on refresh, and with Lenis running it
   * has no idea it should not — so take the wheel: opt out of restoration, and
   * jump to the top unless the URL asks for a specific section. */
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (!window.location.hash) window.scrollTo(0, 0);
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
