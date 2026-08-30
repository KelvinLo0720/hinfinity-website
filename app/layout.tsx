import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LanguageProvider } from "@/components/i18n";
import { MotionLayer } from "@/components/motion-layer";
import { PageTransition } from "@/components/page-transition";
import { MobileDock } from "@/components/mobile-dock";

const SITE_URL = "https://hinfinityhk.com";

export const metadata: Metadata = {
  title: {
    default: "H Infinity｜社會文化實踐計劃",
    template: "%s｜H Infinity"
  },
  description:
    "H Infinity 係俾青年由「我有感覺」走到「我真係做咗一件事」嘅文化實踐計劃。",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || SITE_URL),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "H Infinity",
    title: "H Infinity｜社會文化實踐計劃",
    description:
      "你未需要有答案。由一樣你真正關心嘅事開始，將感覺變成一件真正發生嘅事。"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-HK" data-language="zh">
      <body>
        <LanguageProvider>
          <a className="skip-link" href="#main">
            跳到主要內容
          </a>
          <MotionLayer />
          <Header />
          <main id="main">
            <PageTransition>{children}</PageTransition>
          </main>
          <MobileDock />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
