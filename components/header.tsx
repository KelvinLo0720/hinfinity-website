"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { LanguageSwitch, useLanguage } from "./i18n";
import { Logo } from "./logo";

const links = [
  ["/about", "關於我們", "About"],
  ["/h-infinity", "H Infinity", "H Infinity"],
  ["/first-chapter", "第一屆", "Our First Chapter"],
  ["/projects", "項目", "Projects"],
  ["/stories", "故事", "Stories"],
  ["/people", "人物", "People"]
] as const;

export function Header() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  return (
    <header className={`site-header ${open ? "menu-is-open" : ""}`}>
      <div className="shell header-inner">
        <Logo />

        <nav className="main-nav main-nav-desktop" aria-label={language === "zh" ? "主導覽" : "Main navigation"}>
          {links.map(([href, zh, en]) => (
            <Link key={href} className={pathname.startsWith(href) ? "is-active" : ""} href={href}>
              {language === "zh" ? zh : en}
            </Link>
          ))}
          <LanguageSwitch compact />
          <Link className="nav-apply" href="/apply">{language === "zh" ? "申請" : "Apply"}</Link>
        </nav>

        <button
          className={`menu-button ${open ? "is-open" : ""}`}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={language === "zh" ? (open ? "關閉選單" : "開啟選單") : (open ? "Close menu" : "Open menu")}
        >
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className="mobile-menu-panel"
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 38px) 34px)" }}
            animate={{ opacity: 1, clipPath: "circle(145% at calc(100% - 38px) 34px)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 38px) 34px)" }}
            transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mobile-menu-topline">
              <span>H INFINITY · MENU</span>
              <LanguageSwitch />
            </div>
            <nav className="mobile-menu-links" aria-label={language === "zh" ? "手機主導覽" : "Mobile navigation"}>
              {links.map(([href, zh, en], index) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + index * 0.045, duration: 0.34 }}
                >
                  <Link className={pathname.startsWith(href) ? "is-active" : ""} href={href} onClick={() => setOpen(false)}>
                    <span>0{index + 1}</span>
                    <b>{language === "zh" ? zh : en}</b>
                    <i aria-hidden="true">↗</i>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div className="mobile-menu-cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}>
              <p>{language === "zh" ? "由一個你真正關心嘅問題開始。" : "Start with a question you genuinely care about."}</p>
              <Link href="/apply" onClick={() => setOpen(false)}>{language === "zh" ? "預覽 Demo 申請" : "Preview demo application"}<span>↗</span></Link>
            </motion.div>
            <span className="mobile-menu-orbit" aria-hidden="true">∞</span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
