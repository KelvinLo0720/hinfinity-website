import Link from "next/link";
import { Localized } from "@/components/i18n";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";

export const metadata = { title: "H Infinity 計劃" };

const features = [
  [
    "01",
    "大膽試錯",
    "Experiment boldly",
    "呢度唔會用勝負論英雄。構思可以被挑戰、推翻、重建，再慢慢搵到真正值得做嘅方向。",
    "This is not a place that defines people by winning or losing. Ideas can be challenged, discarded and rebuilt until a direction becomes genuinely worth pursuing."
  ],
  [
    "02",
    "由一個人到一個團隊",
    "From one person to a team",
    "唔需要一開始就有團隊。計劃會創造認識同路人、交換問題同建立合作嘅機會。",
    "You do not need a team on day one. The programme creates opportunities to meet fellow travellers, exchange questions and build collaborations."
  ],
  [
    "03",
    "前輩指導",
    "Guidance from practitioners",
    "Mentor 唔會一味分享成功經驗，會幫你挖出問題、睇清盲點，拆解假設。",
    "Mentors do more than share success stories. They help uncover the real problem, spot blind spots and challenge assumptions."
  ],
  [
    "04",
    "親手試行",
    "Test it yourself",
    "唔再紙上談兵，落區試水溫、聽反應，邊做邊改。",
    "Move beyond ideas on paper: take it into the community, test the waters, listen to responses and improve it as you go."
  ],
  [
    "05",
    "傳承",
    "Pass it forward",
    "項目可以繼續發展，舊生亦可以回流，將經驗帶返下一屆。",
    "Projects can continue developing, while alumni can return and carry experience into the next cohort."
  ]
] as const;

export default function HInfinityPage() {
  return (
    <>
      <PageHero
        eyebrow="主要計劃"
        eyebrowEn="MAIN PROGRAMME"
        title="唔係商業比賽，不設名次、不評輸贏，只係一個俾你真心做一件事嘅地方。"
        titleEn="Not a business competition: no rankings, no winners or losers—just a place to genuinely make something happen."
        intro="H Infinity 陪你實踐想法。唔需要已經具備周全計劃、組好團隊，只要有諗法、有熱誠，就走出空想，落手落腳將佢變成現實。"
        introEn="H Infinity helps you put ideas into practice. You do not need a complete plan or a ready-made team. If you have an idea and the passion to try, move beyond imagining it and start making it real."
      >
        <div className="button-row">
          <Link className="button button-primary" href="/apply">
            <Localized zh="立即申請" en="Apply now" />
          </Link>

          <Link className="button" href="/first-chapter">
            <Localized zh="首屆項目" en="Explore first-cohort projects" />
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
                zh="只要你關心香港文化、社區，或者各種社會議題，就已經符合條件！"
                en="If you care about Hong Kong culture, community or wider social issues, you already meet the starting point."
              />

              <Localized
                as="p"
                zh="可能你會擔心⋯⋯ 未有正式工作經驗？唔係讀文社科？"
                en="You might be wondering: no formal work experience? Not studying arts, humanities or social sciences?"
              />

              <Localized
                as="p"
                zh="通通唔要緊！你唔需要帶住完整計劃書、現成團隊嚟報名。"
                en="None of that is a problem. You do not need a complete proposal or an existing team to apply."
              />

              <Localized
                as="p"
                zh="只要你心目中有一樣嘢好在意，唔想睇住佢消失，想親手留住佢——咁就即管試咗先！"
                en="If there is something you care deeply about, something you do not want to see disappear and want to help carry forward with your own hands, give it a try."
              />
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
