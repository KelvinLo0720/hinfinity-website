import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { stories } from "@/lib/content";

export const metadata = { title: "故事" };

export default function StoriesPage() {
  return (
    <>
      <PageHero eyebrow="HUMAN STORIES" title="由人在說話，而唔係由機構說話。" intro="迷茫、被挑戰、推翻構思、重新開始、項目落地，以及舊生回流——這些過程比任何口號更有力量。" />
      <section className="section-tight"><div className="shell story-grid">{stories.map((story) => <article className="story-card" key={story.slug}><div className="story-image"><Image src={story.image} alt={story.title} fill sizes="360px" /></div><span className="eyebrow">{story.eyebrow}</span><h3>{story.title}</h3><p>{story.excerpt}</p></article>)}</div></section>
    </>
  );
}
