"use client";

import Image from "next/image";
import { useState } from "react";
import { tools } from "@/data/content";
import { tileHues } from "./hues";

export default function Stack() {
  /** Hover flips on pointer devices; tap flips on touch. */
  const [flipped, setFlipped] = useState<string | null>(null);

  return (
    <section id="stack" className="section-y relative overflow-hidden">
      <div className="container-x relative">
        <h2 className="section-title">My Stack</h2>

        <div className="relative mt-10 md:mt-14">
          {/* Oversized 3D shape drifting behind the grid, as in the reference. */}
          <BackdropShape />

          {/* Wide column gaps so the shape behind stays visible, as in the
              reference. */}
          <div className="relative z-10 grid grid-cols-2 gap-x-5 gap-y-6 sm:gap-x-8 md:grid-cols-3 md:gap-x-[64px] md:gap-y-10 xl:gap-x-[88px] 2xl:grid-cols-4 2xl:gap-x-[72px]">
            {tools.map((tool, idx) => {
              const isFlipped = flipped === tool.name;
              const hue = tileHues[idx % tileHues.length];
              return (
                <button
                  key={tool.name}
                  type="button"
                  onClick={() =>
                    setFlipped((v) => (v === tool.name ? null : tool.name))
                  }
                  aria-pressed={isFlipped}
                  className="flip-card aspect-square w-full"
                  style={
                    {
                      "--brand-tint": hue.tint,
                      "--brand-glow": hue.glow,
                    } as React.CSSProperties
                  }
                >
                  <span className={`flip-inner ${isFlipped ? "is-flipped" : ""}`}>
                    <span className="flip-face tool-ring rounded-[28px] p-[6px]">
                      <span className="tool-inner flex h-full w-full flex-col items-center justify-center gap-3 rounded-[22px]">
                        <span className="relative size-11 md:size-12">
                          <Image
                            src={tool.icon}
                            alt=""
                            fill
                            sizes="48px"
                            className="object-contain"
                            unoptimized
                          />
                        </span>
                        <span className="text-[15px] font-medium md:text-[16px]">
                          {tool.name}
                        </span>
                        <span className="text-[12px] text-muted">
                          Tap to flip
                        </span>
                      </span>
                    </span>

                    <span className="flip-face flip-back tool-ring rounded-[28px] p-[6px]">
                      <span className="tool-inner tool-inner-back flex h-full w-full items-center justify-center rounded-[22px] px-5 text-center">
                        <span className="text-[13px] leading-snug text-muted md:text-[14px]">
                          {tool.blurb}
                        </span>
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function BackdropShape() {
  return (
    <div
      aria-hidden
      className="floaty pointer-events-none absolute left-1/2 top-1/2 z-0 w-[520px] -translate-x-1/2 -translate-y-1/2 opacity-90"
      style={
        {
          "--float-duration": "16s",
          "--r": "-8deg",
        } as React.CSSProperties
      }
    >
      <svg viewBox="0 0 100 100">
        <defs>
          <linearGradient id="stack-cube-a" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a9f0dc" />
            <stop offset="100%" stopColor="#6fd9bd" />
          </linearGradient>
          <linearGradient id="stack-cube-b" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#63cfb1" />
            <stop offset="100%" stopColor="#3fae90" />
          </linearGradient>
          <linearGradient id="stack-cube-c" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4fbd9e" />
            <stop offset="100%" stopColor="#2f9077" />
          </linearGradient>
        </defs>
        <path d="M50 8 L90 30 L50 52 L10 30 Z" fill="url(#stack-cube-a)" />
        <path d="M10 30 L50 52 L50 94 L10 72 Z" fill="url(#stack-cube-b)" />
        <path d="M90 30 L50 52 L50 94 L90 72 Z" fill="url(#stack-cube-c)" />
      </svg>
    </div>
  );
}
