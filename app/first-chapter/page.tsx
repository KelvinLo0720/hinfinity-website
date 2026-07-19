import Image from "next/image";
import Link from "next/link";
import { Localized } from "@/components/i18n";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { programmeSteps, projects } from "@/lib/content";

export const metadata = { title: "第一個章節" };

export default function FirstChapterPage() {
  return (
    <>
      <PageHero eyebrow="第一個章節" eyebrowEn="OUR FIRST CHAPTER" title="第一次，未必完美。但足以令下一次開始。" titleEn="The first attempt may not be perfect. It can still make the next one possible." intro="目前 H Infinity 只有上一屆。這一頁以真實過程、學習與項目發展為核心，亦為未來每年新增 Cohort 預留完整架構。" introEn="H Infinity currently has one completed cohort. This page focuses on the real process, learning and project development while preparing a structure that can grow year by year." />
      <section className="section-tight"><div className="shell"><div className="chapter-stats">
        <div className="stat-note motion-card"><b>1</b><Localized as="span" zh="首屆已完成" en="first cohort completed" /></div>
        <div className="stat-note motion-card"><b>3</b><Localized as="span" zh="日 Bootcamp" en="day bootcamp" /></div>
        <div className="stat-note motion-card"><b>2</b><Localized as="span" zh="輪 Pitching" en="rounds of pitching" /></div>
        <div className="stat-note motion-card"><b>∞</b><Localized as="span" zh="持續回流" en="continuing return" /></div>
      </div></div></section>
      <section className="section section-blue"><div className="shell"><span className="eyebrow">PROGRAMME MOMENTS</span><div className="journey-scroller" style={{ marginTop: 32 }}>
        {programmeSteps.map((step, index) => <Reveal key={step.n} delay={index * .06}><article className="journey-card motion-card"><div className="journey-image"><Image src={step.image} alt={step.zh} fill sizes="280px" /></div><span>{step.n} / {step.en}</span><Localized as="h3" zh={step.zh} en={step.enTitle} /><Localized as="p" zh="首屆活動紀錄" en="First cohort moment" /></article></Reveal>)}
      </div></div></section>
      <section className="section"><div className="shell"><div className="section-heading"><span className="eyebrow">PROJECTS</span><Localized as="h2" zh="由構思到可被測試的行動。" en="From an idea to an action that can be tested." /><Localized as="p" className="section-intro" zh="下列項目為 Demo Case Study。之後可逐一換成真實首屆團隊名稱、成果與相片。" en="The following projects are demo case studies and can later be replaced with the first cohort’s real team names, outcomes and photographs." /></div><div className="project-grid">
        {projects.map((project) => <Link className="project-card motion-card" href={`/projects/${project.slug}`} key={project.slug}><div className="project-image"><Image src={project.image} alt={project.title} fill sizes="360px" /><Localized as="span" className="project-tag" zh={project.category} en={project.categoryEn} /></div><div className="project-meta"><span>FIRST CHAPTER</span><span>CASE STUDY</span></div><Localized as="h3" zh={project.title} en={project.englishTitle} /><Localized as="p" zh={project.question} en={project.questionEn} /></Link>)}
      </div></div></section>
    </>
  );
}
