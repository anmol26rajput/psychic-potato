import Link from "next/link";
import { works } from "@/data/content";
import Reveal from "./Reveal";
import ProjectCard from "./ProjectCard";

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
