import { process } from "@/data/content";
import Reveal from "./Reveal";

/** No counterpart in the template — built from its card language: tinted
 * panel, white inner card, centred heading. */
export default function Process() {
  return (
    <section className="section-y">
      <div className="container-x">
        <h2 className="section-title">How I Work</h2>

        <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-3">
          {process.map((step, idx) => (
            <Reveal key={step.step} delay={idx * 0.06}>
              <div className="panel h-full p-[6px]">
                <div className="card flex h-full flex-col items-center px-6 py-8 text-center md:px-7">
                  <span className="flex size-12 items-center justify-center rounded-full bg-indigo text-[16px] font-bold text-white">
                    {step.step}
                  </span>
                  <h3 className="mt-5 text-[17px] font-medium leading-snug">
                    {step.title}
                  </h3>
                  <p className="body-md mt-3">{step.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
