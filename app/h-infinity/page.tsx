import Link from "next/link";
import { Localized } from "@/components/i18n";
import { PageHero } from "@/components/page-hero";
import { ProgrammeSnapshot } from "@/components/programme-snapshot";
import { Reveal } from "@/components/reveal";
import styles from "./page.module.css";

const features = [
  {
    n: "01",
    titleZh: "大膽試錯",
    titleEn: "Experiment boldly",
    copyZh:
      "呢度唔會用勝負論英雄。構思可以被挑戰、推翻、重建，再慢慢搵到真正值得做嘅方向。",
    copyEn:
      "This is not a place that defines people by winning or losing. Ideas can be challenged, discarded and rebuilt until a direction becomes genuinely worth pursuing."
  },
  {
    n: "02",
    titleZh: "由一個人到一個團隊",
    titleEn: "From one person to a team",
    copyZh:
      "唔需要一開始就有團隊。計劃會創造認識同路人、交換問題同建立合作嘅機會。",
    copyEn:
      "You do not need a team on day one. The programme creates opportunities to meet fellow travellers, exchange questions and build collaborations."
  },
  {
    n: "03",
    titleZh: "前輩指導",
    titleEn: "Guidance from practitioners",
    copyZh:
      "Mentor 唔會一味分享成功經驗，會幫你挖出問題、睇清盲點，拆解假設。",
    copyEn:
      "Mentors do more than share success stories. They help uncover the real problem, spot blind spots and challenge assumptions."
  },
  {
    n: "04",
    titleZh: "親手試行",
    titleEn: "Test it yourself",
    copyZh: "唔再紙上談兵，深入社區實踐，邊聽邊做。",
    copyEn:
      "Move beyond ideas on paper: go into the community, put the idea into practice, listen and keep doing."
  },
  {
    n: "05",
    titleZh: "傳承",
    titleEn: "Pass it forward",
    copyZh:
      "項目可以繼續發展，舊生亦可以回流，將經驗帶返下一屆。",
    copyEn:
      "Projects can continue developing, while alumni can return and carry experience into the next cohort."
  }
] as const;

export const metadata = {
  title: "H Infinity 計劃"
};

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

          <Link className="button" href="#programme-details">
            <Localized zh="睇計劃詳情 ↓" en="Programme details ↓" />
          </Link>
        </div>
      </PageHero>

      <ProgrammeSnapshot variant="detail" />

      <section className={styles.supportSection}>
        <div className="shell">
          <Reveal>
            <div className={styles.sectionHeading}>
              <span className={styles.eyebrow}>WHAT YOU GET</span>
              <Localized
                as="h2"
                zh={
                  <>
                    唔只係一筆資金。
                    <br />
                    <em>有人同你一齊拆、試、改。</em>
                  </>
                }
                en={
                  <>
                    More than funding.
                    <br />
                    <em>People to question, test and build with you.</em>
                  </>
                }
              />
              <Localized
                as="p"
                zh="H Infinity 重點唔係幫你包裝一份完美 Proposal，而係陪你將一個未成形嘅念頭，逐步變成可以落地、可以面對真實社群嘅文化實踐。"
                en="H Infinity is not about polishing a perfect proposal. It is about helping a rough idea become a cultural practice that can be tested, implemented and brought into real communities."
              />
            </div>
          </Reveal>

          <div className={styles.featureGrid}>
            {features.map((feature, index) => (
              <Reveal key={feature.n} delay={index * 0.05}>
                <article className={`${styles.featureCard} motion-card`}>
                  <span className={styles.featureNumber}>{feature.n}</span>
                  <Localized
                    as="h3"
                    zh={feature.titleZh}
                    en={feature.titleEn}
                  />
                  <Localized
                    as="p"
                    zh={feature.copyZh}
                    en={feature.copyEn}
                  />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.fitSection}>
        <div className={`shell ${styles.fitGrid}`}>
          <Reveal>
            <div className={styles.fitCopy}>
              <span className={styles.eyebrow}>WHO IS IT FOR?</span>
              <Localized
                as="h2"
                zh={
                  <>
                    未齊人、未有 Proposal，
                    <br />
                    <em>都可以開始。</em>
                  </>
                }
                en={
                  <>
                    No team yet? No proposal?
                    <br />
                    <em>You can still start.</em>
                  </>
                }
              />

              <Localized
                as="p"
                zh="只要你關心香港文化、社區，或者各種社會議題，並願意認真投入時間去研究、測試同實踐，就已經有一個好嘅起點。"
                en="If you care about Hong Kong culture, communities or wider social issues, and are ready to invest real time in research, testing and practice, you already have a strong starting point."
              />

              <div className={styles.fitTags}>
                <Localized as="span" zh="未有正式工作經驗？可以。" en="No formal work experience? Fine." />
                <Localized as="span" zh="唔係讀文社科？可以。" en="Not studying arts or social sciences? Fine." />
                <Localized as="span" zh="未有現成團隊？可以。" en="No existing team? Fine." />
                <Localized as="span" zh="未有完整計劃書？可以。" en="No complete proposal? Fine." />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className={`${styles.startCard} motion-card`}>
              <span>START HERE</span>
              <Localized
                as="h3"
                zh="由一樣你好在意、唔想睇住佢消失嘅事開始。"
                en="Start with something you care about and do not want to see disappear."
              />
              <Localized
                as="p"
                zh="你未需要有所有答案。重要嘅係，你願唔願意落手做、接受挑戰，再一路修正。"
                en="You do not need all the answers. What matters is whether you are willing to make something, be challenged and keep revising."
              />

              <div className="button-row">
                <Link className="button button-primary" href="/apply">
                  <Localized zh="立即申請 ↗" en="Apply now ↗" />
                </Link>
                <Link className="button" href="/projects/cohort-01">
                  <Localized zh="睇首屆項目" en="See Cohort 01 projects" />
                </Link>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
