import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Localized } from "@/components/i18n";
import { projects } from "@/lib/content";

export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const sections = [
    ["01 / CONTEXT", "問題背景", "Context", project.context, project.contextEn],
    ["02 / THE IDEA", "最初構思", "The initial idea", project.summary, project.summaryEn],
    ["03 / THE SHIFT", "關鍵轉折", "The turning point", project.shift, project.shiftEn],
    ["04 / THE PROCESS", "測試與修正", "Testing and revision", project.process, project.processEn],
    ["05 / THE OUTCOME", "目前成果", "Current outcome", project.outcome, project.outcomeEn],
    ["06 / REFLECTION", "團隊反思", "Team reflection", project.reflection, project.reflectionEn]
  ];
  return (
    <>
      <section className="project-detail-hero"><div className="shell project-detail-grid"><div><span className="eyebrow">FIRST CHAPTER / DEMO CASE</span><Localized as="h1" zh={project.title} en={project.englishTitle} /><Localized as="p" className="section-intro" zh={project.question} en={project.questionEn} /><div className="button-row"><Link className="button button-primary" href="/projects"><Localized zh="返回項目" en="Back to projects" /></Link></div></div><div className="project-detail-image motion-card"><Image src={project.image} alt={project.title} fill sizes="(max-width: 700px) 90vw, 560px" /></div></div></section>
      <section className="section-tight"><div className="shell">{sections.map(([label, zhTitle, enTitle, zhCopy, enCopy]) => <article className="case-study motion-card" key={label}><b>{label}</b><div><Localized as="h2" zh={zhTitle} en={enTitle} /><Localized as="p" zh={zhCopy} en={enCopy} /></div></article>)}</div></section>
    </>
  );
}
