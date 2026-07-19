"use client";

import Link from "next/link";
import { useLanguage } from "./i18n";
import { Logo } from "./logo";

export function Footer() {
  const { language } = useLanguage();
  const isZh = language === "zh";
  return (
    <footer className="site-footer">
      <div className="footer-wave" aria-hidden="true" />
      <div className="shell footer-grid">
        <div>
          <Logo inverted />
          <p className="footer-note">H Infinity is a programme by Hong Kong Culture Limited.</p>
          <p className="footer-note">{isZh ? "香港籽鷂文化｜讓青年文化構思由想法走到行動。" : "Hong Kong Culture Limited｜Helping youth move cultural ideas into action."}</p>
        </div>
        <div>
          <h3>{isZh ? "探索" : "Explore"}</h3>
          <Link href="/h-infinity">{isZh ? "計劃理念" : "The Programme"}</Link>
          <Link href="/first-chapter">{isZh ? "第一個章節" : "Our First Chapter"}</Link>
          <Link href="/projects">{isZh ? "青年項目" : "Youth Projects"}</Link>
          <Link href="/stories">{isZh ? "真實故事" : "Human Stories"}</Link>
        </div>
        <div>
          <h3>{isZh ? "參與" : "Join"}</h3>
          <Link href="/apply">{isZh ? "報名參加" : "Apply"}</Link>
          <Link href="/support">{isZh ? "支持我們" : "Support Us"}</Link>
          <Link href="/partners">{isZh ? "合作夥伴" : "Partners"}</Link>
          <Link href="/contact">{isZh ? "聯絡我們" : "Contact"}</Link>
        </div>
        <div>
          <h3>{isZh ? "資料" : "Information"}</h3>
          <Link href="/privacy">{isZh ? "私隱政策" : "Privacy"}</Link>
          <span>Instagram @hinfinity.hk</span>
          <span>hello@hinfinity.hk</span>
        </div>
      </div>
      <div className="shell footer-bottom">© {new Date().getFullYear()} Hong Kong Culture Limited. Demo website.</div>
    </footer>
  );
}
