"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { brands } from "@/data/content";
import { tileHues } from "./hues";

/** Favicon service for the brands that have no logo file of their own. */
const favicon = (url: string) =>
  `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=128`;

/** Seconds for one full copy of the rail to pass — the old CSS marquee's pace. */
const PASS_SECONDS = 50;

export default function Brands() {
  const shown = brands.filter((b) => b.logo || b.favicon);
  const rail = useRef<HTMLDivElement>(null);

  /** The rail is a real scroll container, so a thumb can swipe it (with the
   * platform's own momentum) and a trackpad can flick it. This drives the
   * idle drift by hand instead of a CSS keyframe, because an animated
   * transform and a scroll position cannot both own the same element.
   * The logos are rendered twice, so wrapping at the halfway mark is
   * invisible — in either direction. */
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let paused = false;
    let last = performance.now();
    /** The drift is well under a pixel per frame, and browsers quantise
     * scrollLeft (to 1/dpr — whole pixels on a 1x screen), so `+=` per frame
     * gets rounded away and the rail sits still. Carrying the position as a
     * float here and writing the absolute value keeps the sub-pixel remainder. */
    let pos = el.scrollLeft;
    let written = pos;

    /** Reading scrollWidth or scrollLeft after writing scrollLeft forces the
     * browser to re-lay-out mid-frame, which is what Lighthouse reports as a
     * forced reflow. So the width is measured once (and again on resize), and
     * a scroll the reader caused is picked up from the scroll event rather
     * than by polling the element every frame. */
    let half = el.scrollWidth / 2;
    const measure = () => {
      half = el.scrollWidth / 2;
    };
    const observer = new ResizeObserver(measure);
    observer.observe(el);

    /** Fires for our own writes too, so only a jump we did not make counts. */
    const onScroll = () => {
      if (Math.abs(el.scrollLeft - written) > 1.5) pos = el.scrollLeft;
    };
    el.addEventListener("scroll", onScroll, { passive: true });

    let frame = requestAnimationFrame(function step(now) {
      const dt = Math.min(now - last, 100); // a backgrounded tab shouldn't lurch
      last = now;
      if (half > 0) {
        if (!paused) pos += (dt / 1000) * (half / PASS_SECONDS);
        if (pos >= half) pos -= half;
        else if (pos < 0) pos += half;
        el.scrollLeft = pos;
        written = pos;
      }
      frame = requestAnimationFrame(step);
    });

    const pause = () => {
      paused = true;
    };
    const resume = () => {
      paused = false;
    };
    /** Touch resumes on lift; the browser's momentum carries on regardless,
     * and the drift simply adds to wherever the flick leaves off. */
    const events: [string, () => void][] = [
      ["pointerdown", pause],
      ["pointerup", resume],
      ["pointercancel", resume],
      ["mouseenter", pause],
      ["mouseleave", resume],
    ];
    events.forEach(([type, fn]) => el.addEventListener(type, fn));

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      el.removeEventListener("scroll", onScroll);
      events.forEach(([type, fn]) => el.removeEventListener(type, fn));
    };
  }, []);

  return (
    <section className="py-14 md:py-20">
      <div className="container-x">
        <p className="eyebrow text-center">
          Brands, labs and teams I&apos;ve built for
        </p>
      </div>

      <div className="brand-rail relative mt-10">
        <div className="marquee-mask">
          {/* Extra vertical padding so the hover lift and its shadow are not
              clipped by the rail's own overflow. */}
          <div
            ref={rail}
            className="no-scrollbar w-full overflow-x-auto overflow-y-hidden py-6"
            /* Lenis sets smooth scrolling globally; this one needs instant
               scrollLeft writes or every frame of the drift animates. */
            style={{ scrollBehavior: "auto" }}
          >
            <div className="flex w-max">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0 items-center">
                  {shown.map((b, idx) => {
                    const hue = tileHues[idx % tileHues.length];
                    return (
                      <a
                        key={`${copy}-${b.name}`}
                        href={b.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={b.name}
                        aria-label={b.name}
                        aria-hidden={copy === 1}
                        tabIndex={copy === 1 ? -1 : undefined}
                        draggable={false}
                        className="brand-card mx-3 flex h-[92px] w-[164px] shrink-0 items-center justify-center rounded-[22px] px-6 md:mx-4 md:h-[100px] md:w-[180px]"
                        style={
                          {
                            "--brand-tint": hue.tint,
                            "--brand-glow": hue.glow,
                          } as React.CSSProperties
                        }
                      >
                        <span className="relative h-10 w-full md:h-11">
                          <Image
                            src={b.logo ?? favicon(b.url)}
                            alt={b.name}
                            fill
                            sizes="180px"
                            className="object-contain"
                            draggable={false}
                            /* Rasters go through the optimiser; SVGs cannot,
                               so they pass straight through. */
                            unoptimized={b.logo?.endsWith(".svg")}
                          />
                        </span>
                      </a>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
