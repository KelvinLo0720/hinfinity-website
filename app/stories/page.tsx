import Image from "next/image";
import { Localized } from "@/components/i18n";
import { PageHero } from "@/components/page-hero";
import { stories } from "@/lib/content";

export const metadata = { title: "故事" };

export default function StoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="項目背後"
        eyebrowEn="BEHIND THE PROJECTS"
        title="由項目自己講：改過、試過，先至行得落去。"
        titleEn="Let the projects speak: testing and rebuilding are part of moving forward."
        intro="H Infinity 想記錄嘅，係每個項目背後嘅故事——構思如何歷經挑戰、反覆重建，最後變成一件有人實踐，有人共鳴嘅事。"
        introEn="H Infinity documents the stories behind each project—how ideas are challenged, repeatedly rebuilt and eventually become work that people put into practice and connect with."
      />

      <section className="section-tight">
        <div className="shell story-grid">
          {stories.map((story) => (
            <article className="story-card motion-card" key={story.slug}>
              <div className="story-image">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  sizes="360px"
                />
              </div>

              <span className="eyebrow">{story.eyebrow}</span>
              <Localized as="h3" zh={story.title} en={story.titleEn} />
              <Localized as="p" zh={story.excerpt} en={story.excerptEn} />
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
