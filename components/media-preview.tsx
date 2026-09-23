import Link from "next/link";
import { Localized } from "@/components/i18n";
import { MediaCard } from "@/components/media-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { mediaFeatures } from "@/lib/content/media";
import styles from "./media-preview.module.css";

export function MediaPreview() {
  const preview = mediaFeatures.slice(0, 3);

  return (
    <section className={`section ${styles.section}`}>
      <div className="shell">
        <SectionHeading
          eyebrow="IN THE PRESS"
          title="第一屆之後，故事繼續被寫落去。"
          titleEn="The story keeps moving beyond the first cohort."
          intro="當青年項目真正走入社區，故事亦會離開計劃本身。以下係部分媒體對 H Infinity 及第一屆文化實踐的跟進與記錄。"
          introEn="When youth-led projects move into the real world, their stories travel beyond the programme. Here are selected media features documenting H Infinity and the cultural practices that grew from Cohort 01."
        />

        <div className={styles.grid}>
          {preview.map((feature, index) => (
            <Reveal key={feature.slug} delay={index * 0.07}>
              <MediaCard
                feature={feature}
                index={index}
                compact
              />
            </Reveal>
          ))}
        </div>

        <div className={styles.actions}>
          <Link className="button button-primary" href="/media">
            <Localized
              zh="查看所有媒體報道 →"
              en="View all media coverage →"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
