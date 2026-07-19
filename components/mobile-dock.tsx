"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { Localized } from "./i18n";

const links = [
  { href: "/", zh: "首頁", en: "Home", icon: "⌂" },
  { href: "/projects", zh: "項目", en: "Projects", icon: "↗" },
  { href: "/apply", zh: "申請", en: "Apply", icon: "+" }
] as const;

export function MobileDock() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const delta = latest - lastY;
    if (latest < 100) setVisible(true);
    else if (delta > 8) setVisible(false);
    else if (delta < -8) setVisible(true);
    setLastY(latest);
  });

  if (pathname.startsWith("/admin") || /^\/apply\/.+/.test(pathname)) return null;

  return (
    <motion.nav
      className="mobile-dock"
      aria-label="Mobile quick navigation"
      initial={false}
      animate={{ x: "-50%", y: visible ? 0 : 110, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {links.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link key={item.href} href={item.href} className={active ? "is-active" : ""}>
            <span className="mobile-dock-icon" aria-hidden="true">{item.icon}</span>
            <Localized as="span" zh={item.zh} en={item.en} />
          </Link>
        );
      })}
    </motion.nav>
  );
}
