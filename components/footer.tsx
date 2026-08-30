"use client";

import Link from "next/link";
import { useLanguage } from "./i18n";
import { Logo } from "./logo";

const INSTAGRAM_URL = "https://www.instagram.com/hinfinity.hk/";
const CONTACT_EMAIL = "info@hinfinityhk.com";

export function Footer() {
  const { language } = useLanguage();
  const isZh = language === "zh";

  return (
    <footer className="site-footer">
      <div className="footer-wave" aria-hidden="true" />

      <div className="shell footer-grid">
        <div>
          <Logo inverted />
          <p className="footer-note">
            H Infinity is a programme by Hong Kong Culture Limited.
          </p>
          <p className="footer-note">
            {isZh
              ? "香港籽鷂文化｜文化唔只係一樣要被保存嘅嘢，而係一樣要有人繼續做落去嘅嘢。"
              : "Hong Kong Culture Limited｜Culture continues when people keep making, practising and reinterpreting it."}
          </p>
        </div>

        <div>
          <h3>{isZh ? "探索" : "Explore"}</h3>
          <Link href="/h-infinity">
            {isZh ? "計劃理念" : "The Programme"}
          </Link>
          <Link href="/first-chapter">
            {isZh ? "第一屆" : "Our First Chapter"}
          </Link>
          <Link href="/projects">
            {isZh ? "青年項目" : "Youth Projects"}
          </Link>
          <Link href="/stories">
            {isZh ? "故事" : "Stories"}
          </Link>
        </div>

        <div>
          <h3>{isZh ? "參與" : "Join"}</h3>
          <Link href="/apply">
            {isZh ? "立即申請" : "Apply"}
          </Link>
          <Link href="/support">
            {isZh ? "支持我們" : "Support Us"}
          </Link>
          <Link href="/partners">
            {isZh ? "合作" : "Collaborate"}
          </Link>
          <Link href="/contact">
            {isZh ? "聯絡我們" : "Contact"}
          </Link>
        </div>

        <div>
          <h3>{isZh ? "資料" : "Information"}</h3>

          <Link href="/privacy">
            {isZh ? "私隱及資料使用" : "Privacy & Data Use"}
          </Link>

          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
          >
            Instagram @hinfinity.hk
          </a>
        </div>
      </div>

      <div className="shell footer-bottom">
        © {new Date().getFullYear()} Hong Kong Culture Limited. All rights reserved.
      </div>
    </footer>
  );
}
