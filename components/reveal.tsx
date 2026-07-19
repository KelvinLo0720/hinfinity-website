"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduceMotion = useReducedMotion();
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 700px)");
    const sync = () => setMobile(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const initial = reduceMotion
    ? { opacity: 1 }
    : mobile
      ? { opacity: 0, y: 36, scale: 0.965, filter: "blur(7px)" }
      : { opacity: 0, y: 28 };

  const visible = reduceMotion
    ? { opacity: 1 }
    : mobile
      ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
      : { opacity: 1, y: 0 };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={visible}
      viewport={{ once: true, margin: mobile ? "-36px" : "-80px" }}
      transition={{ duration: mobile ? 0.72 : 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
