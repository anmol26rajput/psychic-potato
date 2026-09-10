import { services } from "@/data/content";
import Reveal from "./Reveal";
import { ShapeByIndex } from "./Shapes";

export default function Services() {
  return (
    <section id="services" className="section-y">
      <div className="container-x">
        <h2 className="section-title">Services</h2>

        <div className="mt-10 md:mt-14">
          {services.map((service, idx) => (
            <article
              key={service.index}
              className="grid gap-8 border-t border-hair py-10 first:border-t-0 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[320px_minmax(0,1fr)] xl:gap-20 lg:py-14"
            >
              {/* Number + title stay put while the copy scrolls past. */}
              <div className="lg:sticky lg:top-[28vh] lg:self-start">
                <span className="block text-[88px] font-black leading-[0.9] tracking-[-0.04em] text-[#ececec] lg:text-[120px]">
                  {service.index}
                </span>
                <h3 className="-mt-3 text-[17px] font-bold leading-tight lg:-mt-5 lg:text-[20px]">
                  {service.name}
                </h3>
              </div>

              <div>
                <Reveal>
                  <div className="floaty mb-6 w-[92px] lg:w-[112px]">
                    <ShapeByIndex index={idx} />
                  </div>
                </Reveal>

                <Reveal delay={0.05}>
                  <p className="body-md measure leading-relaxed">
                    {service.description}
                  </p>
                </Reveal>

                <Reveal delay={0.1}>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {service.offerings.map((offering) => (
                      <li
                        key={offering}
                        className="rounded-[96px] bg-indigo-tint px-3.5 py-1.5 text-[13px] font-medium"
                      >
                        {offering}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
