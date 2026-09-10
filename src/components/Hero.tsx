"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { hero, brands } from "@/data/content";
import { person } from "@/lib/site";
import Shapes from "./Shapes";
import Marquee from "./Marquee";

/** Logos borrowed from the brand list for the social-proof cluster. */
const proofLogos = brands.filter((b) => b.logo).slice(0, 3);

export default function Hero() {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % hero.roles.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[820px] items-center justify-center overflow-hidden py-[120px] lg:h-screen lg:py-0"
    >
      {/* Wordmark runs behind everything, centred on the hero's midline. */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 select-none">
        {/* One "ANMOL RAJPUT" is ~1365px at the 176px cap, so a single copy
            leaves a hole on anything wider; four copies cover a 5K display. */}
        <Marquee duration="34s" repeat={4}>
          <span className="h-display whitespace-pre pr-12 text-ink">
            {hero.wordmark} RAJPUT{" "}
          </span>
        </Marquee>
      </div>

      <Shapes />

      <div className="container-x relative z-20 flex flex-col items-center text-center">
        {/* The visible line is the design; the surname and role ride along in
            the same h1 so the page's only heading actually names what it ranks
            for. Same text a screen reader reads out. */}
        <h1 className="rise h1">
          {hero.greeting}{" "}
          <span className="font-serif italic">{hero.firstName}</span>
          <span className="sr-only"> Rajput, a backend and AI developer</span>!
        </h1>

        {/* Role line cycles in place — fixed height so nothing shifts. */}
        <div className="mt-2 flex h-7 items-center justify-center overflow-hidden">
          <p key={i} className="rise body-md">
            {hero.roles[i]}
          </p>
        </div>

        {/* Flip card: indigo monogram front, rotating scroll cue on the back. */}
        <div
          className="flip-card pop group mt-6 size-[min(280px,68vw)]"
          style={{ animationDelay: "0.12s" }}
          onClick={() => setFlipped((v) => !v)}
        >
          {/* Hover flips it on a mouse; tap does the job where there is no
              hover, so phones can reach the scroll cue at all. */}
          <div className={`flip-inner${flipped ? " is-flipped" : ""}`}>
            <div className="flip-face relative overflow-hidden rounded-[48px] bg-indigo">
              {/* Pre-cropped square (900×900) — the card is square too, so
                  nothing is cut off at runtime. Re-crop the file, not the CSS,
                  if the framing ever needs to change. */}
              <Image
                src="/me.jpg"
                alt={`${person.name} — ${person.jobTitle}`}
                fill
                priority
                sizes="280px"
                className="object-cover"
              />
              {/* Keeps the card reading as a designed object rather than a raw
                  photo, and darkens the base so it still separates from the
                  white hero. */}
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"
              />
            </div>

            <div className="flip-face flip-back flex items-center justify-center rounded-[48px] bg-white shadow-[0_20px_20px_rgba(0,0,0,0.1)]">
              <ScrollDisc />
            </div>
          </div>
        </div>

        <div
          className="rise mt-6 flex items-center gap-3"
          style={{ animationDelay: "0.2s" }}
        >
          <span className="flex -space-x-2">
            {proofLogos.map((b) => (
              <span
                key={b.name}
                className="relative size-8 overflow-hidden rounded-full border-2 border-white bg-indigo-tint"
              >
                <Image
                  src={b.logo as string}
                  alt={b.name}
                  fill
                  sizes="32px"
                  className="object-contain p-1"
                  unoptimized
                />
              </span>
            ))}
          </span>
          <p className="text-[14px] font-medium text-muted">
            {hero.socialProof}
          </p>
        </div>

        <Link
          href="/#contact"
          className="btn btn-cta rise mt-6"
          style={{ animationDelay: "0.28s" }}
        >
          <span>Let&apos;s Work Together!</span>
          {/* Sibling of the pill, not a child: it parks outside the button and
              is clipped by the ring until hover slides it in. */}
          <span aria-hidden className="btn-disc">
            <ArrowDown />
          </span>
        </Link>
      </div>
    </section>
  );
}

/** Chunky down arrow — same shape the reference button uses. */
function ArrowDown({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 256 256"
      width={className ? undefined : size}
      height={className ? undefined : size}
      className={className}
      fill="currentColor"
    >
      <path d="M205.66,149.66l-72,72a8,8,0,0,1-11.32,0l-72-72a8,8,0,0,1,11.32-11.32L120,196.69V40a8,8,0,0,1,16,0V196.69l58.34-58.35a8,8,0,0,1,11.32,11.32Z" />
    </svg>
  );
}

/** Circular text ring — the card's back face in the reference. */
function ScrollDisc() {
  return (
    /* Sized as a share of the card, not in px, so the whole cue — ring, core
       and arrow — scales with the hero on a 320px phone as on a 4K screen. */
    <div className="scroll-disc relative flex size-[65%] items-center justify-center rounded-full">
      <svg
        viewBox="0 0 200 200"
        className="scroll-disc__text size-full spin-slow"
        aria-hidden
      >
        <defs>
          <path
            id="scroll-ring"
            d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0"
          />
        </defs>
        <text
          className="fill-ink/70"
          style={{ fontSize: "15px", fontWeight: 600 }}
        >
          {/* textLength = the ring's circumference (2πr, r=72) minus one word
              gap, started at half that gap — so the text spreads evenly all
              the way round and the seam where it wraps keeps the same spacing
              as every other gap, instead of the leading ✦ butting into the
              last word. */}
          <textPath
            href="#scroll-ring"
            startOffset={5.5}
            textLength={441}
            lengthAdjust="spacing"
          >
            {hero.scrollCue}
          </textPath>
        </text>
      </svg>
      <span
        aria-hidden
        className="scroll-disc__core absolute flex size-[51%] items-center justify-center rounded-full text-ink"
      >
        <span className="bob flex w-[34%] justify-center">
          <ArrowDown className="w-full" />
        </span>
      </span>
    </div>
  );
}
