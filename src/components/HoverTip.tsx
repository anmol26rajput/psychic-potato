"use client";

import { useRef, useState } from "react";

/** Orange pill that tracks the cursor while a link is hovered. Same transform
 * trick as the project cards: position and scale ride on one transform, so a
 * single transition gives both the pop-in and the trailing lag. */
export default function HoverTip({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hover, setHover] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const track = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <span
      ref={ref}
      className={`relative inline-block ${className}`}
      onMouseEnter={(e) => {
        track(e);
        setHover(true);
      }}
      onMouseMove={track}
      onMouseLeave={() => setHover(false)}
    >
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-30 whitespace-nowrap rounded-[96px] bg-orange px-4 py-2 text-[12px] font-medium leading-none text-white shadow-[0_8px_20px_-6px_rgba(249,71,6,0.55)]"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -190%) scale(${hover ? 1 : 0.6})`,
          opacity: hover ? 1 : 0,
          transition:
            "transform 340ms cubic-bezier(0.22, 1, 0.36, 1), opacity 200ms ease-out",
        }}
      >
        {label}
      </span>
    </span>
  );
}
