import { about } from "@/data/content";
import Reveal from "./Reveal";
import { ShapeByIndex } from "./Shapes";

/** Sticky so the shapes stay with the stack for the whole section, sitting
 * one z-layer below the cards. Blurred, because they are meant to be read
 * through the frosted glass rather than looked at directly. */
function StackBackdrop() {
  const shapes = [
    { index: 2, cls: "left-[19%] top-[1%] w-[112px]", blur: 14, dur: "13s", delay: "0s" },
    { index: 4, cls: "right-[21%] top-[4%] w-[96px]", blur: 16, dur: "15s", delay: "-4s" },
  ];

  return (
    <div
      aria-hidden
      className="pointer-events-none sticky top-[14vh] z-[1] h-0"
    >
      <div className="relative mx-auto h-[60vh] max-w-[1100px]">
        {shapes.map((s) => (
          <div
            key={s.index}
            className={`floaty absolute ${s.cls}`}
            style={
              {
                filter: `blur(${s.blur}px)`,
                opacity: 0.55,
                "--float-duration": s.dur,
                "--float-delay": s.delay,
              } as React.CSSProperties
            }
          >
            <ShapeByIndex index={s.index} idPrefix="about" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** The reference stacks its About paragraphs as sticky cards that pile up as
 * you scroll. Card one is the bio; the rest are the working promises. */
const cards = [
  { title: null as string | null, body: about.heading },
  ...about.approach.map((a) => ({ title: a.title, body: a.description })),
];

export default function About() {
  return (
    <section id="about" className="section-y">
      <div className="container-x">
        <h2 className="section-title">About Me</h2>
      </div>

      {/* Geometry measured off the reference: perspective 1200px on the stack,
          each card tilted ±2° with a ±24px x-offset and 24px of y-offset, the
          sign alternating card to card. Shapes drift behind the frosted cards
          and read through them as soft colour. */}
      <div
        className="container-x relative mt-10 md:mt-14"
        style={{ perspective: "1200px" }}
      >
        <StackBackdrop />

        {cards.map((card, idx) => {
          const sign = idx % 2 === 0 ? 1 : -1;
          const depth = cards.length - 1 - idx;
          return (
            <div
              key={idx}
              className="sticky top-[16vh] mb-[14vh] last:mb-0"
              style={{ zIndex: idx + 2 }}
            >
              <div
                className="stack-card glass-panel mx-auto max-w-[900px] rounded-[48px] p-[6px] transition-transform duration-500 ease-out 2xl:max-w-[1080px]"
                style={
                  {
                    "--sign": sign,
                    transform: `translate(calc(var(--stack-x) * var(--sign)), 24px) rotate(calc(var(--stack-tilt) * var(--sign))) scale(${1 - depth * 0.02})`,
                  } as React.CSSProperties
                }
              >
                <div className="glass rounded-[24px] px-7 py-10 text-center md:px-12 md:py-12">
                  {card.title && <h3 className="h3 mb-3">{card.title}</h3>}
                  <p className="body-lg text-ink">{card.body}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Experience has no counterpart in the template — same card language. */}
      <div className="container-x mt-14 md:mt-20">
        <Reveal>
          <h2 className="section-title">Experience</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="panel mx-auto mt-8 max-w-[900px] 2xl:max-w-[1080px] p-[6px]">
            <div className="card px-6 py-3 md:px-10 md:py-6">
              <ul className="divide-y divide-hair">
                {about.experience.map((job) => (
                  <li
                    key={job.role}
                    className="flex flex-col gap-1 py-4 md:flex-row md:items-baseline md:justify-between md:gap-8"
                  >
                    <span className="text-[15px] font-medium leading-snug md:text-[16px]">
                      {job.role}
                    </span>
                    <span className="shrink-0 text-[14px] text-muted md:text-[16px]">
                      {job.period}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
