import Link from "next/link";
import { Localized } from "@/components/i18n";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";

export const metadata = { title: "H Infinity 計劃" };

const features = [
  [
    "01",
    "安全試錯",
    "Safe experimentation",
    "唔以勝負做中心。構思可以被挑戰、推翻、重建，再慢慢搵到真正值得做嘅方向。",
    "The programme is not centred on winning. Ideas can be challenged, discarded and rebuilt until a direction becomes worth pursuing."
  ],
  [
    "02",
    "由一個人到一隊人",
    "From one person to a team",
    "你未需要一開始就有 team。計劃會創造認識同路人、交換問題同建立合作嘅機會。",
    "You do not need a team on day one. The programme creates opportunities to meet peers, exchange questions and build collaborations."
  ],
  [
    "03",
    "有人 Challenge 你",
    "People who challenge you",
    "Mentor 唔只係分享成功經驗，而係幫你問清楚問題、拆假設、睇見盲點。",
    "Mentors do more than share success stories. They help sharpen the question, challenge assumptions and expose blind spots."
  ],
  [
    "04",
    "真實測試",
    "Real-world testing",
    "由紙上構思走出去，接觸真實受眾、地方與社群，再根據回應修正。",
    "Move beyond the page, test with real audiences, places and communities, and revise in response."
  ],
  [
    "05",
    "唔喺 Finale 完結",
    "Beyond the finale",
    "項目可以繼續發展，舊生亦可以回流，將經驗帶返下一屆。",
    "Projects can continue developing, while alumni can return and carry experience into the next cohort."
  ]
] as const;

export default function HInfinityPage() {
  return (
    <>
      <PageHero
        eyebrow="旗艦計劃"
        eyebrowEn="THE FLAGSHIP PROGRAMME"
        title="唔係商業比賽。係一個俾你真係做一件事嘅地方。"
        titleEn="Not a business competition. A place to actually make something happen."
        intro="H Infinity 俾青年由「我對某樣嘢有感覺」，走到「我真係做咗一件事」。你未需要有完整 idea、team 或 Proposal。"
        introEn="H Infinity helps young people move from “I care about something” to “I actually made something happen.” You do not need a complete idea, team or proposal to begin."
      >
        <div className="button-row">
          <Link className="button button-primary" href="/apply">
            <Localized zh="立即申請" en="Apply now" />
          </Link>

          <Link className="button" href="/first-chapter">
            <Localized zh="睇第一屆" en="Explore the first cohort" />
          </Link>
        </div>
      </PageHero>

      <section className="section-tight">
        <div className="shell content-grid">
          <Reveal className="content-main">
            <div className="feature-list">
              {features.map(([n, zhTitle, enTitle, zhCopy, enCopy]) => (
                <article className="feature-row motion-card" key={n}>
                  <b>{n}</b>
                  <div>
                    <Localized as="h3" zh={zhTitle} en={enTitle} />
                    <Localized as="p" zh={zhCopy} en={enCopy} />
                  </div>
                </article>
              ))}
            </div>
          </Reveal>

          <Reveal className="content-side" delay={0.12}>
            <aside className="sticky-note motion-card">
              <Localized as="h3" zh="適合邊啲人？" en="Who is it for?" />

              <Localized
                as="p"
                zh="關心香港文化、城市、社區、人、故事或社會議題，但未必有完整計劃、正式經驗或特定學科背景嘅青年。"
                en="Young people who care about Hong Kong culture, the city, community, people, stories or social issues, even without a complete plan, formal experience or a specific academic background."
              />

              <Localized
                as="p"
                zh={
                  <>
                    <strong>唔需要：</strong>
                    完整 Proposal、現成 team、文化相關學位、所有答案。
                  </>
                }
                en={
                  <>
                    <strong>You do not need:</strong>
                    a complete proposal, an existing team, a culture-related degree or all the answers.
                  </>
                }
              />

              <Localized
                as="p"
                zh={
                  <>
                    <strong>由一樣嘢開始：</strong>
                    你真係在意。
                  </>
                }
                en={
                  <>
                    <strong>Start with one thing:</strong>
                    something you genuinely care about.
                  </>
                }
              />
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
