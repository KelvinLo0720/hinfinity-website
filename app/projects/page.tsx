import Image from "next/image";
import Link from "next/link";
import { Localized } from "@/components/i18n";
import { PageHero } from "@/components/page-hero";
import { projects } from "@/lib/content";

export const metadata = { title: "青年項目" };

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="項目檔案"
        eyebrowEn="PROJECT ARCHIVE"
        title="一個項目，唔只係最後成果。"
        titleEn="A project is more than its final outcome."
        intro="我哋記錄每個項目點樣由問題出發、經過測試同修正，再一步一步走入真實世界。"
        introEn="We document how each project starts from a question, moves through testing and revision, and gradually enters the real world."
      />

      <section className="section-tight">
        <div className="shell">
          <div className="project-grid">
            {projects.map((project) => (
              <Link
                className="project-card motion-card"
                href={`/projects/${project.slug}`}
                key={project.slug}
              >
                <div className="project-image">
                  <Image
                    src={project.image}
                    alt={`H Infinity Cohort 01｜${project.title}`}
                    fill
                    sizes="360px"
                  />

                  <Localized
                    as="span"
                    className="project-tag"
                    zh={project.category}
                    en={project.categoryEn}
                  />
                </div>

                <div className="project-meta">
                  <span>COHORT 01</span>
                  <span>VIEW ↗</span>
                </div>

                <Localized
                  as="h3"
                  zh={project.title}
                  en={project.englishTitle}
                />

                <Localized
                  as="p"
                  zh={project.summary}
                  en={project.summaryEn}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
