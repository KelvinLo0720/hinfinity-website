import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";

export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const sections = [
    ["01 / CONTEXT", "問題背景", project.context],
    ["02 / THE IDEA", "最初構思", project.summary],
    ["03 / THE SHIFT", "關鍵轉折", project.shift],
    ["04 / THE PROCESS", "測試與修正", project.process],
    ["05 / THE OUTCOME", "目前成果", project.outcome],
    ["06 / REFLECTION", "團隊反思", project.reflection]
  ];
  return (
    <>
      <section className="project-detail-hero"><div className="shell project-detail-grid"><div><span className="eyebrow">FIRST CHAPTER / DEMO CASE</span><h1>{project.title}</h1><p className="section-intro">{project.question}</p><div className="button-row"><Link className="button button-primary" href="/projects">返回項目</Link></div></div><div className="project-detail-image"><Image src={project.image} alt={project.title} fill sizes="(max-width: 700px) 90vw, 560px" /></div></div></section>
      <section className="section-tight"><div className="shell">{sections.map(([label, title, copy]) => <article className="case-study" key={label}><b>{label}</b><div><h2>{title}</h2><p>{copy}</p></div></article>)}</div></section>
    </>
  );
}
