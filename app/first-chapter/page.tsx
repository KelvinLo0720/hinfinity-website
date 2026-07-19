import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { programmeSteps, projects } from "@/lib/content";

export const metadata = { title: "第一個章節" };

export default function FirstChapterPage() {
  return (
    <>
      <PageHero eyebrow="OUR FIRST CHAPTER" title="第一次，未必完美。但足以令下一次開始。" intro="目前 H Infinity 只有上一屆。這一頁以真實過程、學習與項目發展為核心，亦為未來每年新增 Cohort 預留完整架構。" />
      <section className="section-tight">
        <div className="shell">
          <div className="chapter-stats">
            <div className="stat-note"><b>1</b><span>首屆已完成</span></div>
            <div className="stat-note"><b>3</b><span>日 Bootcamp</span></div>
            <div className="stat-note"><b>2</b><span>輪 Pitching</span></div>
            <div className="stat-note"><b>∞</b><span>持續回流</span></div>
          </div>
        </div>
      </section>
      <section className="section section-blue">
        <div className="shell">
          <span className="eyebrow">PROGRAMME MOMENTS</span>
          <div className="journey-scroller" style={{ marginTop: 32 }}>
            {programmeSteps.map((step, index) => (
              <Reveal key={step.n} delay={index * .06}>
                <article className="journey-card">
                  <div className="journey-image"><Image src={step.image} alt={step.zh} fill sizes="280px" /></div>
                  <span>{step.n} / {step.en}</span><h3>{step.zh}</h3><p>首屆活動紀錄</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <div className="section-heading"><span className="eyebrow">PROJECTS</span><h2>由構思到可被測試的行動。</h2><p className="section-intro">下列項目為 Demo Case Study。明日可逐一換成真實首屆團隊名稱、成果與相片。</p></div>
          <div className="project-grid">
            {projects.map((project) => (
              <Link className="project-card" href={`/projects/${project.slug}`} key={project.slug}>
                <div className="project-image"><Image src={project.image} alt={project.title} fill sizes="360px" /><span className="project-tag">{project.category}</span></div>
                <div className="project-meta"><span>FIRST CHAPTER</span><span>CASE STUDY</span></div><h3>{project.title}</h3><p>{project.question}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
