import Image from "next/image";
import Link from "next/link";
import { Localized } from "@/components/i18n";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { programmeSteps, projects } from "@/lib/content";

export const metadata = { title: "第一屆" };

export default function FirstChapterPage() {
  return (
    <>
      <PageHero
        eyebrow="第一屆"
        eyebrowEn="OUR FIRST CHAPTER"
        title="第一次，未必完美。但足以令下一次開始。"
        titleEn="The first attempt may not be perfect. It can still make the next one possible."
        intro="首屆 H Infinity 留低嘅唔只係活動紀錄，而係一批青年點樣由模糊構思出發，經歷碰撞、修正、測試，再將項目繼續做落去。"
        introEn="The first H Infinity cohort left more than event records. It shows how young people moved from rough ideas through challenge, revision and testing, then kept their projects moving."
      />

      <section className="section-tight">
        <div className="shell">
          <div className="chapter-stats">
            <div className="stat-note motion-card">
              <b>01</b>
              <Localized as="span" zh="由一個問題開始" en="start with a question" />
            </div>

            <div className="stat-note motion-card">
              <b>02</b>
              <Localized as="span" zh="反覆測試同修正" en="test and revise" />
            </div>

            <div className="stat-note motion-card">
              <b>03</b>
              <Localized as="span" zh="帶入真實情境" en="move into practice" />
            </div>

            <div className="stat-note motion-card">
              <b>∞</b>
              <Localized as="span" zh="項目繼續行" en="keep it moving" />
            </div>
          </div>
        </div>
      </section>

      <section className="section section-blue">
        <div className="shell">
          <span className="eyebrow">PROGRAMME MOMENTS</span>

          <div className="journey-scroller" style={{ marginTop: 32 }}>
            {programmeSteps.map((step, index) => (
              <Reveal key={step.n} delay={index * 0.06}>
                <article className="journey-card motion-card">
                  <div className="journey-image">
                    <Image
                      src={step.image}
                      alt={step.zh}
                      fill
                      sizes="280px"
                    />
                  </div>
                  <span>
                    {step.n} / {step.en}
                  </span>
                  <Localized as="h3" zh={step.zh} en={step.enTitle} />
                  <Localized
                    as="p"
                    zh="首屆過程紀錄"
                    en="A moment from the first cohort"
                  />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-heading">
            <span className="eyebrow">SELECTED PROJECTS</span>

            <Localized
              as="h2"
              zh="由構思，到一件真係繼續發生嘅事。"
              en="From an idea to something that keeps happening."
            />

            <Localized
              as="p"
              className="section-intro"
              zh="以下係首屆部分項目。重點唔只係最後成果，而係每隊點樣一路試、一路改，再搵到自己下一步。"
              en="These are selected projects from the first cohort. The focus is not only the final outcome, but how each team kept testing, revising and finding its next step."
            />
          </div>

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
                  <span>PROJECT STORY</span>
                </div>

                <Localized
                  as="h3"
                  zh={project.title}
                  en={project.englishTitle}
                />

                <Localized
                  as="p"
                  zh={project.question}
                  en={project.questionEn}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
