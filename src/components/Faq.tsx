import Link from "next/link";
import { faq } from "@/data/content";
import Reveal from "./Reveal";

export default function Faq() {
  return (
    <section id="faq" className="section-y">
      <div className="container-x">
        <h2 className="section-title">Common Questions</h2>

        <div className="mx-auto mt-10 max-w-[900px] 2xl:max-w-[1080px] md:mt-14">
          {/* Native <details> — no accordion state to get wrong, and it works
              before hydration. */}
          {faq.map((item, idx) => (
            <Reveal key={item.question} delay={Math.min(idx, 4) * 0.04}>
              <div className="panel mb-3 p-[6px] last:mb-0">
                <details className="card group px-6 py-4 md:px-8 md:py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
                    <span className="h3">
                      {item.question}
                    </span>
                    <span
                      aria-hidden
                      className="mt-0.5 shrink-0 text-[20px] leading-none text-indigo transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="body-md mt-4">{item.answer}</p>
                </details>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Mirrors the reference's "Need something more?" row. */}
        <Reveal>
          <div className="mx-auto mt-14 flex max-w-[900px] 2xl:max-w-[1080px] flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <h3 className="h3 font-bold">
                Need something more?
              </h3>
              <p className="body-md mt-3 max-w-[460px]">
                Scope that doesn&apos;t fit any of the above? Tell me what
                you&apos;re building and I&apos;ll come back with a plan and a
                quote.
              </p>
            </div>
            <Link href="/#contact" className="btn shrink-0">
              <span>Book a Call</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
