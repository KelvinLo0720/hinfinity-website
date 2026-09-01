import Image from "next/image";
import { Localized } from "@/components/i18n";
import { PageHero } from "@/components/page-hero";
import { stories } from "@/lib/content";

export const metadata = { title: "故事" };

export default function StoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="真實過程"
        eyebrowEn="STORIES FROM THE PROCESS"
        title="由項目自己講：改過、試過，先至行得落去。"
        titleEn="Let the projects speak: testing and rebuilding are part of moving forward."
        intro="H Infinity 想記錄嘅唔只係一張完成相，而係構思點樣被挑戰、重建，最後變成一件真係有人繼續做嘅事。"
        introEn="H Infinity documents more than finished outcomes. We follow how ideas are challenged, rebuilt and turned into work people keep doing."
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
