import type { ReactNode } from "react";
import { Localized } from "./i18n";

export function SectionHeading({ eyebrow, title, intro, eyebrowEn, titleEn, introEn }: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  eyebrowEn?: string;
  titleEn?: ReactNode;
  introEn?: ReactNode;
}) {
  return (
    <div className="section-heading">
      {eyebrow ? <Localized as="span" className="eyebrow" zh={eyebrow} en={eyebrowEn || eyebrow} /> : null}
      <Localized as="h2" zh={title} en={titleEn || title} />
      {intro ? <div className="section-intro"><Localized zh={intro} en={introEn || intro} /></div> : null}
    </div>
  );
}
