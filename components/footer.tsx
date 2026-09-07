"use client";

import Link from "next/link";
import { useLanguage } from "./i18n";
import { Logo } from "./logo";

const INSTAGRAM_URL = "https://www.instagram.com/hinfinity.hk/";
const CONTACT_EMAIL = "info@hinfinityhk.com";

function EmailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 6h16v12H4V6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m4 7 8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="17.5" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function Footer() {
  const { language } = useLanguage();
  const isZh = language === "zh";

  const contactLinkStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "9px",
    margin: 0,
    width: "fit-content"
  } as const;

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
              ? "香港籽鷂文化｜文化不應鎖進夾萬，要有人去實踐、去傳承。"
              : "Hong Kong Culture Limited｜Culture should not be locked away. It needs people to practise it and pass it on."}
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "10px",
              marginTop: "20px"
            }}
          >
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              aria-label={`${isZh ? "電郵" : "Email"}: ${CONTACT_EMAIL}`}
              style={contactLinkStyle}
            >
              <EmailIcon />
              <span>{CONTACT_EMAIL}</span>
            </a>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram @hinfinity.hk"
              style={contactLinkStyle}
            >
              <InstagramIcon />
              <span>@hinfinity.hk</span>
            </a>
          </div>
        </div>

        <div>
          <h3>{isZh ? "探索" : "Explore"}</h3>

          <Link href="/h-infinity">
            {isZh ? "計劃理念" : "The Programme"}
          </Link>

          <Link href="/projects/cohort-01">
            {isZh ? "第一屆項目" : "Cohort 01"}
          </Link>

          <Link href="/projects">
            {isZh ? "青年項目" : "Youth Projects"}
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
          <h3>{isZh ? "條款及細則" : "Terms & Conditions"}</h3>

          <Link href="/privacy">
            {isZh ? "私隱及資料使用" : "Privacy & Data Use"}
          </Link>
        </div>
      </div>

      <div className="shell footer-bottom">
        © {new Date().getFullYear()} Hong Kong Culture Limited. All rights reserved.
      </div>
    </footer>
  );
}
