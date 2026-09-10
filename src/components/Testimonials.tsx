"use client";

import { useEffect, useState } from "react";
import { testimonials } from "@/data/content";

/** Text-only testimonial card: the quote carries the section, with the
 * attribution under it. Renders nothing until there is real feedback. */
export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || testimonials.length < 2) return;
    const t = setInterval(
      () => setI((v) => (v + 1) % testimonials.length),
      7000,
    );
    return () => clearInterval(t);
  }, [paused]);

  if (testimonials.length === 0) return null;

  const item = testimonials[Math.min(i, testimonials.length - 1)];

  return (
    <section
      id="testimonials"
      className="section-y"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-x">
        <h2 className="section-title">Kind Words from Clients</h2>

        <div className="mx-auto mt-10 max-w-[900px] 2xl:max-w-[1080px] md:mt-14">
          <div className="panel p-[6px]">
            <blockquote className="card px-7 py-10 text-center md:px-14 md:py-12">
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

          {testimonials.length > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              {testimonials.map((t, idx) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setI(idx)}
                  aria-label={`Show testimonial from ${t.name}`}
                  aria-current={idx === i}
                  className={`size-2 rounded-full transition-colors duration-300 ${
                    idx === i ? "bg-indigo" : "bg-hair"
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
