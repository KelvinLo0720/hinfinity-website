"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { Localized } from "./i18n";

export function SnapRail({ children, className = "", count }: { children: ReactNode; className?: string; count: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function update() {
    const element = ref.current;
    if (!element) return;
    const items = Array.from(element.children) as HTMLElement[];
    if (!items.length) return;
    const center = element.scrollLeft + element.clientWidth / 2;
    let nearest = 0;
    let distance = Number.POSITIVE_INFINITY;
    items.forEach((item, index) => {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const nextDistance = Math.abs(itemCenter - center);
      if (nextDistance < distance) {
        distance = nextDistance;
        nearest = index;
      }
    });
    setActive(nearest);
  }

  return (
    <div className="snap-rail-shell">
      <div className={className} ref={ref} onScroll={update}>{children}</div>
      <div className="snap-rail-meta" aria-live="polite">
        <div className="snap-rail-dots" aria-hidden="true">
          {Array.from({ length: count }, (_, index) => <i key={index} className={index === active ? "is-active" : ""} />)}
        </div>
        <Localized as="span" zh="左右滑動探索" en="Swipe to explore" />
      </div>
    </div>
  );
}
