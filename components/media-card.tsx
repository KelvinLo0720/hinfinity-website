import { Localized } from "@/components/i18n";
import type { MediaFeature } from "@/lib/content/media";
import styles from "./media-card.module.css";

export function MediaCard({
  feature,
  index,
  compact = false
}: {
  feature: MediaFeature;
  index: number;
  compact?: boolean;
}) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      className={[
        styles.card,
        compact ? styles.compact : ""
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <a
        className={styles.cardLink}
        href={feature.url}
        target="_blank"
        rel="noreferrer"
        aria-label={`${feature.outlet}: ${feature.title}`}
      >
        <div className={styles.topline}>
          <span className={styles.index}>PRESS / {number}</span>
          <span className={styles.cohort}>COHORT {feature.cohort}</span>
        </div>

        <div className={styles.outlet}>
          <strong>{feature.outlet}</strong>
          {feature.outletEn !== feature.outlet ? (
            <span>{feature.outletEn}</span>
          ) : null}
        </div>

        <time className={styles.date} dateTime={feature.date}>
          <Localized zh={feature.dateZh} en={feature.dateEn} />
        </time>

        <Localized
          as="h3"
          className={styles.title}
          zh={feature.title}
          en={feature.titleEn}
        />

        <Localized
          as="p"
          className={styles.excerpt}
          zh={feature.excerpt}
          en={feature.excerptEn}
        />

        <Localized
          as="span"
          className={styles.read}
          zh="閱讀原文 ↗"
          en="Read article ↗"
        />
      </a>
    </article>
  );
}
