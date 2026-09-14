"use client";

import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/data/content";

const n = testimonials.length;
/** A copy of the first card sits after the last one. Scrolling onto it and
 * snapping straight back to the real first card makes the loop seamless. */
const slides = n > 1 ? [...testimonials, testimonials[0]] : testimonials;

/** Text-only testimonial carousel. Swiping is native scroll-snap; autoplay
 * just scrolls the same track, so touch, trackpad and dots all agree on one
 * position. Renders nothing until there is real feedback. */
export default function Testimonials() {
  const track = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = (idx: number) => {
    const el = track.current;
    if (el) el.scrollTo({ left: idx * el.clientWidth, behavior: "smooth" });
  };

  useEffect(() => {
    if (paused || n < 2) return;
    const t = setInterval(() => go(i + 1), 6000);
    return () => clearInterval(t);
  }, [paused, i]);

  if (n === 0) return null;

  return (
    <section
      id="testimonials"
      className="section-y"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="container-x">
        <h2 className="section-title">Kind Words from Clients</h2>

        <div className="mx-auto mt-10 max-w-[900px] 2xl:max-w-[1080px] md:mt-14">
          <div
            ref={track}
            onScroll={(e) => {
              const el = e.currentTarget;
              const idx = Math.round(el.scrollLeft / el.clientWidth);
              // Landed on the copy: jump to the real first card, no animation.
              if (n > 1 && el.scrollLeft >= n * el.clientWidth - 1) {
                el.scrollTo({ left: 0, behavior: "instant" });
                setI(0);
              } else {
                setI(idx);
              }
            }}
            className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
          >
            {slides.map((item, idx) => (
              <div
                key={idx}
                inert={idx === n}
                className="panel w-full shrink-0 snap-center p-[6px]"
              >
                <blockquote className="card flex h-full flex-col justify-center px-7 py-10 text-center md:px-14 md:py-12">
                  <p className="body-lg italic text-ink">
                    &ldquo;{item.quote}&rdquo;
                  </p>

                  <footer className="mt-8">
                    <p className="text-[17px] font-medium not-italic">
                      {item.name}
                    </p>
                    <p className="mt-1 text-[14px] text-muted">{item.role}</p>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block text-[14px] font-medium underline decoration-hair underline-offset-4 transition-colors hover:text-indigo"
                      >
                        Visit the project
                      </a>
                    )}
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>

          {n > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              {testimonials.map((t, idx) => (
                <button
                  key={t.quote}
                  type="button"
                  onClick={() => go(idx)}
                  aria-label={`Show testimonial from ${t.name || t.role}`}
                  aria-current={idx === i % n}
                  className={`size-2 rounded-full transition-colors duration-300 ${
                    idx === i % n ? "bg-indigo" : "bg-hair"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
