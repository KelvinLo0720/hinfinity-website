import { Localized } from "@/components/i18n";
import { MediaCard } from "@/components/media-card";
import { PageHero } from "@/components/page-hero";
import { mediaFeatures } from "@/lib/content/media";
import styles from "./page.module.css";

export const metadata = {
  title: "媒體報道｜Media & Features"
};

export default function MediaPage() {
  return (
    <>
      <PageHero
        eyebrow="媒體報道"
        eyebrowEn="MEDIA & FEATURES"
        title="有人繼續記錄，因為故事未完。"
        titleEn="The story continues beyond the programme."
        intro="H Infinity 與參加者的文化實踐，由一個想法開始，走入社區，再被不同媒體繼續記錄。"
        introEn="H Infinity and the cultural practices developed by our participants begin with an idea, move into the community, and continue through the stories documented by the media."
      />

      <section className={`section-tight ${styles.archiveSection}`}>
        <div className="shell">
          <div className={styles.heading}>
            <span className="eyebrow">PRESS ARCHIVE</span>

            <Localized
              as="h2"
              zh="從計劃開始，但唔停喺計劃。"
              en="It starts with the programme, but does not end there."
            />

            <Localized
              as="p"
              zh="呢度整理 H Infinity 及參加者項目的媒體報道。每一篇都係項目離開課室、簡報同活動現場之後，繼續被理解、追問同記錄的一部分。"
              en="This archive brings together media coverage of H Infinity and participant-led projects — part of how these ideas continue to be understood, questioned and documented beyond the programme itself."
            />
          </div>

          <div className={styles.grid}>
            {mediaFeatures.map((feature, index) => (
              <MediaCard
                key={feature.slug}
                feature={feature}
                index={index}
              />
            ))}
          </div>

          <Localized
            as="p"
            className={styles.note}
            zh="文章內容及版權屬相關媒體機構所有；連結將帶你前往相關媒體網站閱讀原文。"
            en="Article content and copyright belong to the respective media organisations. Links open the original articles on their websites."
          />
        </div>
      </section>
    </>
  );
}
