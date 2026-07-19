"use client";

import { useEffect, useRef, useState } from "react";
import { Localized } from "./i18n";

const sections = [
  { id: "support", zh: "支援", en: "Support" },
  { id: "journey", zh: "旅程", en: "Journey" },
  { id: "chapter", zh: "第一屆", en: "Chapter" },
  { id: "projects", zh: "項目", en: "Projects" },
  { id: "next", zh: "招募", en: "Next" }
] as const;

export function MobileSectionNav() {
  const [active, setActive] = useState("support");
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0.08, 0.2, 0.4] }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const current = navRef.current?.querySelector<HTMLButtonElement>(`[data-section="${active}"]`);
    current?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  function goTo(id: string) {
    const element = document.getElementById(id);
    if (!element) return;
    const headerOffset = 112;
    const y = element.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  return (
    <div className="mobile-section-nav" ref={navRef} aria-label="Homepage sections">
      {sections.map((section, index) => (
        <button
          type="button"
          key={section.id}
          data-section={section.id}
          className={active === section.id ? "is-active" : ""}
          onClick={() => goTo(section.id)}
        >
          <span>{String(index + 1).padStart(2, "0")}</span>
          <Localized zh={section.zh} en={section.en} />
        </button>
      ))}
    </div>
  );
}
