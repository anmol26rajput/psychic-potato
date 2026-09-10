"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { tileHues } from "./hues";

type Work = {
  name: string;
  image: string;
  url: string;
  year: string;
  industry: string[];
  services: string[];
};

export default function ProjectCard({
  work,
  index,
}: {
  work: Work;
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hover, setHover] = useState(false);
  /** Pill position in card-local pixels; starts centred so the first frame
   * after a fast entry isn't in the corner. */
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const hue = tileHues[index % tileHues.length];

  const track = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <a
      ref={ref}
      href={work.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={(e) => {
        track(e);
        setHover(true);
      }}
      onMouseMove={track}
      onMouseLeave={() => setHover(false)}
      className="group relative block"
      style={
        {
          "--brand-tint": hue.tint,
          "--brand-glow": hue.glow,
        } as React.CSSProperties
      }
    >
      {/* Tinted tray around the preview, as in the reference. */}
      <span className="project-tile block rounded-[26px] p-3 md:p-4">
        {/* Sources vary in aspect (portrait photo, square logo, 16:9 og image),
            so a blurred copy fills the frame and the real image sits contained
            inside it — identical framing on every card, nothing cropped. */}
        <span className="relative block aspect-[16/10] overflow-hidden rounded-[16px] bg-[#f2f2f2]">
          {/* The backdrop is blurred past recognition, so it only ever needs a
              thumbnail. Both layers go through the optimiser now (AVIF/WebP at
              the right size) instead of shipping the full-size original
              twice. */}
          <Image
            src={work.image}
            alt=""
            aria-hidden
            fill
            sizes="64px"
            className="scale-110 object-cover blur-2xl"
          />
          <Image
            src={work.image}
            alt={work.name}
            fill
            sizes="(max-width: 768px) 92vw, (max-width: 1536px) 46vw, 31vw"
            className="object-contain transition-transform duration-700 group-hover:scale-[1.05]"
          />
        </span>
      </span>

      {/* Cursor-follower. Transform carries both the position and the scale, so
          one transition gives the pill its trailing lag and its pop-in. */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-20 flex items-center gap-3 rounded-[96px] bg-white py-2 pl-6 pr-2 shadow-[0_10px_30px_-6px_rgba(16,16,16,0.25)]"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${hover ? 1 : 0.55})`,
          opacity: hover ? 1 : 0,
          transition:
            "transform 380ms cubic-bezier(0.22, 1, 0.36, 1), opacity 240ms ease-out",
        }}
      >
        <span className="whitespace-nowrap text-[15px] font-medium">
          View Project
        </span>
        <span className="flex size-10 items-center justify-center rounded-full bg-ink">
          <svg
            viewBox="0 0 24 24"
            className="size-[18px]"
            style={{
              transform: `rotate(${hover ? 0 : -135}deg)`,
              transition: "transform 520ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <path
              d="M5 12h13M12 5l7 7-7 7"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>

      <span className="mt-5 block text-[13px] text-muted">
        {work.industry.join(" · ")}
      </span>
      <span className="mt-1 block text-[17px] font-medium leading-snug transition-colors group-hover:text-indigo md:text-[19px]">
        {work.name} — {work.services[0]}
      </span>
    </a>
  );
}
