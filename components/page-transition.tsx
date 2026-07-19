"use client";

import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 700px)");
    const sync = () => setMobile(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <motion.div
      key={pathname}
      initial={reduceMotion ? false : mobile ? { opacity: 0, x: 18, filter: "blur(5px)" } : { opacity: 0, y: 10 }}
      animate={mobile ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 1, y: 0 }}
      transition={{ duration: mobile ? 0.5 : 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
