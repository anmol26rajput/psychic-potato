import type { Metadata } from "next";
import Link from "next/link";
import { otherWorks, works } from "@/data/content";
import { siteUrl } from "@/lib/site";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Project Archive",
  description:
    "Every project by Anmol Rajput — client work plus the open-source Django, Python, and machine-learning builds behind it.",
  alternates: { canonical: "/work" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/work`,
    title: "Project Archive — Anmol Rajput",
    description:
      "Every project by Anmol Rajput — client work plus the open-source Django, Python, and machine-learning builds behind it.",
  },
};

export default function WorkPage() {
  return (
    <section className="pb-14 pt-[130px] md:pb-20 md:pt-[160px]">
      <JsonLd
        schemas={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Project Archive", path: "/work" },
          ]),
        ]}
      />
      <div className="container-x">
        <Reveal>
          <h1 className="h1">
            The <span className="font-serif italic">Archive</span>
          </h1>
          <p className="body-lg mt-4 max-w-[720px]">
            Featured client work is on the{" "}
            <Link href="/#projects" className="underline underline-offset-4">
              home page
            </Link>
            . Below is everything else — portfolio sites, agency work, and the
            experiments and tools I built to learn something.
          </p>
        </Reveal>

        <div className="panel mt-10 p-4 md:p-8">
          <ul className="flex flex-col gap-3">
            {otherWorks.map((project, idx) => (
              <Reveal key={project.name} delay={Math.min(idx, 6) * 0.03}>
                <li>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card group flex flex-col gap-3 p-5 transition-transform duration-300 hover:-translate-y-0.5 md:flex-row md:items-center md:justify-between md:gap-8 md:p-7"
                  >
                    <span className="min-w-0">
                      <span className="h3 block transition-colors group-hover:text-indigo">
                        {project.name}
                      </span>
                      <span className="body-md mt-2 block">
                        {project.description}
                      </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-4">
                      <span className="rounded-[96px] border border-hair px-3 py-1.5 text-[13px] font-medium md:text-[14px]">
                        {project.industry}
                      </span>
                      <span className="text-[14px] text-muted md:text-[16px]">
                        {project.year}
                      </span>
                    </span>
                  </a>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/#contact" className="btn">
              <span>Let&apos;s Work Together!</span>
            </Link>
            <p className="body-md">
              {works.length} client projects live, {otherWorks.length} in the
              archive.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
