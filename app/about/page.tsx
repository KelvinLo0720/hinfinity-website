import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";

export const metadata = { title: "關於我們" };

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="ABOUT HONG KONG CULTURE LIMITED" title="播下文化的種子，讓青年自由飛。" intro="香港籽鷂文化是一間以青年為核心的初創文化 NGO。我們透過導師、平台及資源，讓青年共同參與香港文化與社區的塑造。" />
      <section className="section-tight">
        <div className="shell content-grid">
          <Reveal className="content-main prose">
            <h2>點解叫「籽鷂」？</h2>
            <p>「籽」代表播下香港文化的種子；「鷂」像風箏，代表青年在得到支援、信任與空間之後，可以按自己的方向飛得更遠。</p>
            <blockquote>我哋唔只想替青年安排活動，而係希望青年成為文化景觀的共同創作者。</blockquote>
            <h2>使命</h2>
            <p>透過 mentorship-driven approach，提供指導、平台與資源，釋放本地青年的潛能，推動文化倡議及社區參與；同時讓文化節目更易接觸，鼓勵更廣泛的公眾參與。</p>
            <h2>我們相信</h2>
            <p>文化唔只屬於專家或機構。當青年有方法將自己的觀察、創意與社區關懷轉化成行動，城市文化先會真正持續生長。</p>
            <h2>組織與 H Infinity</h2>
            <p>香港籽鷂文化是組織平台；H Infinity 是目前的旗艦青年文化實踐計劃。未來組織可在同一品牌架構下發展其他文化及社區項目。</p>
          </Reveal>
          <Reveal className="content-side" delay={0.12}>
            <aside className="sticky-note">
              <h3>現在的我們</h3>
              <p>一個完成首屆 H Infinity、準備建立長期制度與每年 Cohort 的初創 NGO。</p>
              <p><strong>網站 Demo 重點：</strong><br />品牌、Portfolio、年度招募、申請者 Database。</p>
              <Link className="text-link" href="/support">成為合作夥伴 →</Link>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
