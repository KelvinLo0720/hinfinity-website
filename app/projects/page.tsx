import Image from "next/image";
import Link from "next/link";
import { Localized } from "@/components/i18n";
import { PageHero } from "@/components/page-hero";
import { projects } from "@/lib/content";

export const metadata = { title: "青年項目" };

export default function ProjectsPage() {
  return (
    <>
      <PageHero eyebrow="項目檔案" eyebrowEn="PROJECT ARCHIVE" title="Portfolio 唔只係相簿。" titleEn="A portfolio is more than a photo album." intro="每個項目都記錄問題、轉折、測試、成果同反思。未來可按 Cohort、文化範疇、媒介及項目狀態篩選。" introEn="Each project records the problem, turning points, tests, outcomes and reflections. Future versions can be filtered by cohort, cultural field, medium and project status." />
      <section className="section-tight"><div className="shell"><div className="project-grid">
        {projects.map((project) => <Link className="project-card motion-card" href={`/projects/${project.slug}`} key={project.slug}><div className="project-image"><Image src={project.image} alt={project.title} fill sizes="360px" /><Localized as="span" className="project-tag" zh={project.category} en={project.categoryEn} /></div><div className="project-meta"><span>{project.englishTitle}</span><span>VIEW ↗</span></div><Localized as="h3" zh={project.title} en={project.englishTitle} /><Localized as="p" zh={project.summary} en={project.summaryEn} /></Link>)}
      </div></div></section>
    </>
  );
}
