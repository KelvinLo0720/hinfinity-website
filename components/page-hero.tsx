import type { ReactNode } from "react";
import { Localized } from "./i18n";

export function PageHero({ eyebrow, title, intro, eyebrowEn, titleEn, introEn, children }: {
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  eyebrowEn?: string;
  titleEn?: ReactNode;
  introEn?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="shell page-hero-grid">
        <div>
          <Localized as="span" className="eyebrow" zh={eyebrow} en={eyebrowEn || eyebrow} />
          <Localized as="h1" zh={title} en={titleEn || title} />
          <Localized as="p" zh={intro} en={introEn || intro} />
          {children}
        </div>
        <div className="page-hero-mark" aria-hidden="true">∞</div>
      </div>
    </section>
  );
}
