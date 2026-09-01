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
        intro="香港籽鷂文化是一個以青年為核心的文化實踐平台。我們透過導師、同儕、方法與資源，讓青年由一樣真正關心的事開始，逐步做出自己的文化行動。"
        introEn="Hong Kong Culture Limited is a youth-centred cultural practice platform. Through mentors, peers, methods and resources, we help young people turn something they genuinely care about into cultural action."
      />

      <section className="section-tight">
        <div className="shell content-grid">
          <Reveal className="content-main prose">
            <Localized
              as="h2"
              zh="點解叫「籽鷂」？"
              en="Why the name 籽鷂?"
            />

            <Localized
              as="p"
              zh="「籽」代表文化的種子；「鷂」代表青年得到支援、信任與空間之後，可以按自己的方向飛得更遠。"
              en="籽 means seed: the seed of culture. 鷂 evokes a kite: young people flying further in their own direction once they have support, trust and space."
            />

            <Localized
              as="blockquote"
              zh="文化唔只係一樣要被保存嘅嘢，而係一樣要有人繼續做落去嘅嘢。"
              en="Culture is not only something to preserve. It continues when people keep practising, making and reinterpreting it."
            />

            <Localized as="h2" zh="我哋做緊咩" en="What we do" />

            <Localized
              as="p"
              zh="我哋將青年對香港、文化、社區、人與日常生活的感覺，轉化成一個可以被測試、被挑戰、被實踐的過程。"
              en="We turn young people's observations about Hong Kong, culture, community, people and everyday life into a process that can be tested, challenged and put into practice."
            />

            <Localized
              as="h2"
              zh="組織與 H Infinity"
              en="The organisation and H Infinity"
            />

            <Localized
              as="p"
              zh="香港籽鷂文化是組織平台；H Infinity 是目前的旗艦青年社會文化實踐計劃。"
              en="Hong Kong Culture Limited is the organisational platform; H Infinity is its flagship youth social and cultural practice programme."
            />
          </Reveal>

          <Reveal className="content-side" delay={0.12}>
            <aside className="sticky-note motion-card">
              <Localized
                as="h3"
                zh="由理念走到實踐"
                en="From belief to practice"
              />

              <Localized
                as="p"
                zh="我哋唔只想講文化重要，而係想令更多青年有方法、有同行者、有空間，真係將一樣關心的事做出來。"
                en="We do not only want to say culture matters. We want more young people to have the methods, people and space to turn something they care about into real work."
              />

              <Link className="text-link" href="/h-infinity">
                <Localized
                  zh="了解 H Infinity →"
                  en="Explore H Infinity →"
                />
              </Link>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
