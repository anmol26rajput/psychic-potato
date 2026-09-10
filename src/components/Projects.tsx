import Link from "next/link";
import { otherWorks, works } from "@/data/content";
import Reveal from "./Reveal";
import ProjectCard from "./ProjectCard";
import { tileHues } from "./hues";

export default function Projects() {
  return (
    <section id="projects" className="section-y">
      <div className="container-x">
        <h2 className="section-title">Projects</h2>

        {/* Capped narrower than the container so the previews stay a readable
            size instead of ballooning on a wide screen. */}
        <div className="project-grid mx-auto mt-10 grid max-w-[1120px] gap-x-8 gap-y-12 md:mt-14 md:grid-cols-2 2xl:max-w-none 2xl:grid-cols-3">
          {works.map((work, idx) => (
            <Reveal key={work.name} delay={(idx % 2) * 0.06}>
              <ProjectCard work={work} index={idx} />
            </Reveal>
          ))}

          {/* Four projects across three columns leaves two holes on an
              ultrawide screen. Fill them with the top of the archive — same
              tray and caption shape, text instead of a preview, and only ever
              rendered where those holes exist. */}
          {otherWorks.slice(0, 2).map((project, idx) => {
            const hue = tileHues[(works.length + idx) % tileHues.length];
            return (
              <div key={project.name} className="hidden 2xl:block">
                <Reveal delay={(idx % 2) * 0.06}>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                    style={
                      {
                        "--brand-tint": hue.tint,
                        "--brand-glow": hue.glow,
                      } as React.CSSProperties
                    }
                  >
                    <span className="project-tile block rounded-[26px] p-4">
                      <span className="flex aspect-[16/10] flex-col justify-between rounded-[16px] bg-white/70 p-7">
                        <span className="text-[13px] text-muted">
                          {project.year}
                        </span>
                        <span className="body-md text-ink">
                          {project.description}
                        </span>
                      </span>
                    </span>
                    <span className="mt-5 block text-[13px] text-muted">
                      {project.industry}
                    </span>
                    <span className="mt-1 block text-[19px] font-medium leading-snug transition-colors group-hover:text-indigo">
                      {project.name}
                    </span>
                  </a>
                </Reveal>
              </div>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-12 flex justify-center">
            <Link href="/work" className="btn">
              <span>View More</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
