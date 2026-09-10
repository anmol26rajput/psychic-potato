"use client";

import { ReactLenis } from "lenis/react";

/** Lenis inertial scrolling — the thing that makes the whole page feel
 * Framer-ish. `root` mounts it on <html> so anchors keep working. */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  // Set NEXT_PUBLIC_NO_LENIS=1 to fall back to native scrolling (screenshot
  // tooling and scroll-position debugging both prefer it).
  if (process.env.NEXT_PUBLIC_NO_LENIS === "1") return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>
      {children}
    </ReactLenis>
  );
}
