import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { projects } from "@/lib/content";

export const metadata = { title: "青年項目" };

export default function ProjectsPage() {
  return (
    <>
      <PageHero eyebrow="PROJECT ARCHIVE" title="Portfolio 唔只係相簿。" intro="每個項目都記錄問題、轉折、測試、成果同反思。未來可按 Cohort、文化範疇、媒介及項目狀態篩選。" />
      <section className="section-tight"><div className="shell"><div className="project-grid">
        {projects.map((project) => <Link className="project-card" href={`/projects/${project.slug}`} key={project.slug}><div className="project-image"><Image src={project.image} alt={project.title} fill sizes="360px" /><span className="project-tag">{project.category}</span></div><div className="project-meta"><span>{project.englishTitle}</span><span>VIEW ↗</span></div><h3>{project.title}</h3><p>{project.summary}</p></Link>)}
      </div></div></section>
    </>
  );
}
