import Link from "next/link";
import { Localized } from "@/components/i18n";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";

export const metadata = { title: "關於我們" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="關於香港籽鷂文化"
        eyebrowEn="ABOUT HONG KONG CULTURE LIMITED"
        title="播下文化的種子，讓青年自由飛。"
        titleEn="Sow the seeds of culture. Give young people room to fly."
        intro="香港籽鷂文化是一間以青年為核心的初創文化 NGO。我們透過導師、平台及資源，讓青年共同參與香港文化與社區的塑造。"
        introEn="Hong Kong Culture Limited is a youth-centred cultural NGO. Through mentorship, platforms and resources, we enable young people to help shape Hong Kong’s cultural and community landscape."
      />
      <section className="section-tight">
        <div className="shell content-grid">
          <Reveal className="content-main prose">
            <Localized as="h2" zh="點解叫「籽鷂」？" en="Why the name 籽鷂?" />
            <Localized as="p" zh="「籽」代表播下香港文化的種子；「鷂」像風箏，代表青年在得到支援、信任與空間之後，可以按自己的方向飛得更遠。" en="籽 means seed: the seed of Hong Kong culture. 鷂 evokes a kite: young people flying further in their own direction once they have support, trust and space." />
            <Localized as="blockquote" zh="我哋唔只想替青年安排活動，而係希望青年成為文化景觀的共同創作者。" en="We do not only want to organise activities for young people. We want young people to become co-creators of the cultural landscape." />
            <Localized as="h2" zh="使命" en="Mission" />
            <Localized as="p" zh="透過 mentorship-driven approach，提供指導、平台與資源，釋放本地青年的潛能，推動文化倡議及社區參與；同時讓文化節目更易接觸，鼓勵更廣泛的公眾參與。" en="Through a mentorship-driven approach, we provide guidance, platforms and resources that unlock local youth potential, advance cultural action and community participation, and make cultural programmes more accessible." />
            <Localized as="h2" zh="我們相信" en="What we believe" />
            <Localized as="p" zh="文化唔只屬於專家或機構。當青年有方法將自己的觀察、創意與社區關懷轉化成行動，城市文化先會真正持續生長。" en="Culture does not belong only to experts or institutions. A city’s culture keeps growing when young people can turn observation, creativity and community care into action." />
            <Localized as="h2" zh="組織與 H Infinity" en="The organisation and H Infinity" />
            <Localized as="p" zh="香港籽鷂文化是組織平台；H Infinity 是目前的旗艦青年文化實踐計劃。未來組織可在同一品牌架構下發展其他文化及社區項目。" en="Hong Kong Culture Limited is the organisational platform; H Infinity is its current flagship youth cultural practice programme. The same brand structure can support future cultural and community initiatives." />
          </Reveal>
          <Reveal className="content-side" delay={0.12}>
            <aside className="sticky-note motion-card">
              <Localized as="h3" zh="現在的我們" en="Where we are now" />
              <Localized as="p" zh="一個完成首屆 H Infinity、準備建立長期制度與每年 Cohort 的初創 NGO。" en="An early-stage NGO that has completed its first H Infinity cohort and is building a long-term annual programme." />
              <Localized as="p" zh={<><strong>網站 Demo 重點：</strong><br />品牌、Portfolio、年度招募、申請者 Database。</>} en={<><strong>Website demo focus:</strong><br />Brand, portfolio, annual recruitment and applicant database.</>} />
              <Link className="text-link" href="/support"><Localized zh="成為合作夥伴 →" en="Become a partner →" /></Link>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
