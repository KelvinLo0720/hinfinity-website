"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Logo />
        <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label={language === "zh" ? "主導覽" : "Main navigation"}>
          {links.map(([href, zh, en]) => (
            <Link key={href} className={pathname.startsWith(href) ? "is-active" : ""} href={href} onClick={() => setOpen(false)}>
              {language === "zh" ? zh : en}
            </Link>
          ))}
          <LanguageSwitch compact />
          <Link className="nav-apply" href="/apply" onClick={() => setOpen(false)}>{language === "zh" ? "申請" : "Apply"}</Link>
        </nav>
        <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={language === "zh" ? "開啟選單" : "Open menu"}>
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
