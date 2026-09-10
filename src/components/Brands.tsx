import Image from "next/image";
import { brands } from "@/data/content";
import { tileHues } from "./hues";

/** Favicon service for the brands that have no logo file of their own. */
const favicon = (url: string) =>
  `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=128`;

export default function Brands() {
  const shown = brands.filter((b) => b.logo || b.favicon);

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
              clipped by the marquee's own overflow. */}
          <div className="w-full overflow-hidden py-6">
            <div
              className="marquee-track"
              style={{ "--marquee-duration": "50s" } as React.CSSProperties}
            >
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
                            unoptimized
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
