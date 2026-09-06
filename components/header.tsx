"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { LanguageSwitch, useLanguage } from "./i18n";
import { Logo } from "./logo";

const links = [
  { href: "/about", zh: "關於我們", en: "About" },
  { href: "/h-infinity", zh: "H Infinity", en: "H Infinity" },
  {
    href: "/projects",
    zh: "項目",
    en: "Projects",
    children: [
      { href: "/projects", zh: "所有項目", en: "All Projects" },
      { href: "/projects/cohort-01", zh: "第一屆", en: "Cohort 01" }
    ]
  },
  { href: "/stories", zh: "故事", en: "Stories" },
  { href: "/people", zh: "人物", en: "People" }
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/projects") return pathname.startsWith("/projects");
  return pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header className={`site-header ${open ? "menu-is-open" : ""}`}>
      <div className="shell header-inner">
        <Logo />

        <nav
          className="main-nav main-nav-desktop"
          aria-label={language === "zh" ? "主導覽" : "Main navigation"}
        >
          {links.map((item) =>
            "children" in item ? (
              <div className="nav-group" key={item.href}>
                <Link
                  className={`nav-primary-link nav-parent-link ${
                    isActive(pathname, item.href) ? "is-active" : ""
                  }`}
                  href={item.href}
                  aria-haspopup="true"
                >
                  <span>{language === "zh" ? item.zh : item.en}</span>
                  <span className="nav-chevron" aria-hidden="true">⌄</span>
                </Link>

                <div className="nav-dropdown">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      className={pathname === child.href ? "is-active" : ""}
                      href={child.href}
                    >
                      <span>{language === "zh" ? child.zh : child.en}</span>
                      <i aria-hidden="true">↗</i>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                className={`nav-primary-link ${
                  isActive(pathname, item.href) ? "is-active" : ""
                }`}
                href={item.href}
              >
                {language === "zh" ? item.zh : item.en}
              </Link>
            )
          )}

          <LanguageSwitch compact />

          <Link className="nav-apply" href="/apply">
            {language === "zh" ? "立即申請" : "Apply Now"}
          </Link>
        </nav>

        <button
          className={`menu-button ${open ? "is-open" : ""}`}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={
            language === "zh"
              ? open
                ? "關閉選單"
                : "開啟選單"
              : open
                ? "Close menu"
                : "Open menu"
          }
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
            initial={{
              opacity: 0,
              clipPath: "circle(0% at calc(100% - 38px) 34px)"
            }}
            animate={{
              opacity: 1,
              clipPath: "circle(145% at calc(100% - 38px) 34px)"
            }}
            exit={{
              opacity: 0,
              clipPath: "circle(0% at calc(100% - 38px) 34px)"
            }}
            transition={{
              duration: 0.52,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <div className="mobile-menu-topline">
              <span>H INFINITY · MENU</span>
              <LanguageSwitch />
            </div>

            <nav
              className="mobile-menu-links"
              aria-label={
                language === "zh" ? "手機主導覽" : "Mobile navigation"
              }
            >
              {links.map((item, index) => (
                <motion.div
                  className="mobile-menu-group"
                  key={item.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.12 + index * 0.045,
                    duration: 0.34
                  }}
                >
                  <Link
                    className={
                      isActive(pathname, item.href) ? "is-active" : ""
                    }
                    href={item.href}
                    onClick={() => setOpen(false)}
                  >
                    <span>0{index + 1}</span>
                    <b>{language === "zh" ? item.zh : item.en}</b>
                    <i aria-hidden="true">↗</i>
                  </Link>

                  {"children" in item ? (
                    <div className="mobile-menu-submenu">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          className={
                            pathname === child.href ? "is-active" : ""
                          }
                          href={child.href}
                          onClick={() => setOpen(false)}
                        >
                          <span aria-hidden="true">—</span>
                          <b>{language === "zh" ? child.zh : child.en}</b>
                          <i aria-hidden="true">↗</i>
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="mobile-menu-cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42 }}
            >
              <p>
                {language === "zh"
                  ? "呢一刻唔需要答案。由一個你真正關心嘅問題開始。"
                  : "You do not need the answers right now. Start with a question you genuinely care about."}
              </p>

              <Link href="/apply" onClick={() => setOpen(false)}>
                {language === "zh" ? "立即申請" : "Apply now"}
                <span>↗</span>
              </Link>
            </motion.div>

            <span className="mobile-menu-orbit" aria-hidden="true">
              ∞
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
