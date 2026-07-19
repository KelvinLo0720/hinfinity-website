import Image from "next/image";
import { Localized } from "@/components/i18n";
import { PageHero } from "@/components/page-hero";
import { stories } from "@/lib/content";

export const metadata = { title: "故事" };

export default function StoriesPage() {
  return (
    <>
      <PageHero eyebrow="人物故事" eyebrowEn="HUMAN STORIES" title="由人在說話，而唔係由機構說話。" titleEn="People speak—not the institution." intro="迷茫、被挑戰、推翻構思、重新開始、項目落地，以及舊生回流——這些過程比任何口號更有力量。" introEn="Uncertainty, challenge, rebuilding, implementation and alumni return—these moments carry more power than any slogan." />
      <section className="section-tight"><div className="shell story-grid">{stories.map((story) => <article className="story-card motion-card" key={story.slug}><div className="story-image"><Image src={story.image} alt={story.title} fill sizes="360px" /></div><span className="eyebrow">{story.eyebrow}</span><Localized as="h3" zh={story.title} en={story.titleEn} /><Localized as="p" zh={story.excerpt} en={story.excerptEn} /></article>)}</div></section>
    </>
  );
}
