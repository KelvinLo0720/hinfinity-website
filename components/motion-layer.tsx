"use client";

import { useEffect, useRef } from "react";

export function MotionLayer() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!media.matches) return;

    let raf = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;
      if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      raf = window.requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    tick();

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="energy-cursor" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true"><span ref={progressRef} /></div>
      <div className="ambient-field" aria-hidden="true">
        <i className="ambient-orb ambient-orb-a" />
        <i className="ambient-orb ambient-orb-b" />
        <i className="ambient-orb ambient-orb-c" />
      </div>
    </>
  );
}
