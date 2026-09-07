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
        title="播下文化的種子，讓青年自由飛翔。"
        titleEn="Sow the seeds of culture. Let young people take flight."
        intro="讓青年由一件真正關心的事開始，逐步實踐自己的文化項目。"
        introEn="We help young people start with something they genuinely care about and gradually put their own cultural projects into practice."
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
              zh="文化不應鎖進夾萬，要有人去實踐、去傳承。"
              en="Culture should not be locked away. It needs people to practise it and pass it on."
            />

            <Localized as="h2" zh="我哋做緊咩" en="What we do" />

            <Localized
              as="p"
              zh="我們把青年對香港、文化、社區與人的感受，用測試、挑戰與實踐反覆打磨，直至真正落地。"
              en="We take young people’s feelings about Hong Kong, culture, community and people, then refine them through testing, challenge and practice until they can take shape in the real world."
            />

            <Localized
              as="h2"
              zh="組織與 H Infinity"
              en="The organisation and H Infinity"
            />

            <Localized
              as="p"
              zh="香港籽鷂文化是組織平台；H Infinity 是旗下青年社會文化實踐計劃。"
              en="Hong Kong Culture Limited is the organisational platform; H Infinity is a youth social and cultural practice programme under it."
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
                zh="比起反覆強調文化重要，我們更想給予青年方法、同行者與空間，把關心的事真正做出來。"
                en="Rather than repeatedly saying that culture matters, we want to give young people methods, fellow travellers and room to make what they care about real."
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
