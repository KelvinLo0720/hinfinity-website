import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children?: ReactNode }) {
  return (
    <section className="page-hero">
      <div className="shell page-hero-grid">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{intro}</p>
          {children}
        </div>
        <div className="page-hero-mark" aria-hidden="true">∞</div>
      </div>
    </section>
  );
}
