import Link from "next/link";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-wave" aria-hidden="true" />
      <div className="shell footer-grid">
        <div>
          <Logo inverted />
          <p className="footer-note">H Infinity is a programme by Hong Kong Culture Limited.</p>
          <p className="footer-note">香港籽鷂文化｜讓青年文化構思由想法走到行動。</p>
        </div>
        <div>
          <h3>探索</h3>
          <Link href="/h-infinity">計劃理念</Link>
          <Link href="/first-chapter">第一個章節</Link>
          <Link href="/projects">青年項目</Link>
          <Link href="/stories">真實故事</Link>
        </div>
        <div>
          <h3>參與</h3>
          <Link href="/apply">報名參加</Link>
          <Link href="/support">支持我們</Link>
          <Link href="/partners">合作夥伴</Link>
          <Link href="/contact">聯絡我們</Link>
        </div>
        <div>
          <h3>資料</h3>
          <Link href="/privacy">私隱政策</Link>
          <span>Instagram @hinfinity.hk</span>
          <span>hello@hinfinity.hk</span>
        </div>
      </div>
      <div className="shell footer-bottom">© {new Date().getFullYear()} Hong Kong Culture Limited. Demo website.</div>
    </footer>
  );
}
