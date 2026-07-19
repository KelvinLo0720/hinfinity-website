import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LanguageProvider } from "@/components/i18n";
import { MotionLayer } from "@/components/motion-layer";
import { PageTransition } from "@/components/page-transition";
import { MobileDock } from "@/components/mobile-dock";

export const metadata: Metadata = {
  title: { default: "H Infinity｜社會文化實踐計劃", template: "%s｜H Infinity" },
  description: "由青年共同建立的文化實踐平台，讓有想法但未有方法的人，在導師、同儕及資源支持下由迷茫走到行動。",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-HK" data-language="zh">
      <body>
        <LanguageProvider>
          <a className="skip-link" href="#main">跳到主要內容</a>
          <MotionLayer />
          <Header />
          <main id="main"><PageTransition>{children}</PageTransition></main>
          <MobileDock />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
