import Link from "next/link";
import { Localized } from "@/components/i18n";
import { Reveal } from "@/components/reveal";
import styles from "./programme-snapshot.module.css";

const timeline = [
  {
    dateZh: "12月下旬至1月上旬（週末）",
    dateEn: "Late Dec – early Jan (weekend)",
    titleZh: "簡介會及破冰活動",
    titleEn: "Briefing & icebreaker",
    required: true,
    tentative: false
  },
  {
    dateZh: "1月8至10日（五至日）",
    dateEn: "8–10 Jan (Fri–Sun)",
    titleZh: "三日兩夜訓練營",
    titleEn: "3-day, 2-night training camp",
    required: true,
    tentative: false
  },
  {
    dateZh: "2月",
    dateEn: "February",
    titleZh: "專題前期研究",
    titleEn: "Preliminary thematic research",
    required: false,
    tentative: false
  },
  {
    dateZh: "3月",
    dateEn: "March",
    titleZh: "兩次專案匯報及評估",
    titleEn: "Two project presentations & assessments",
    required: false,
    tentative: false
  },
  {
    dateZh: "4月至9月",
    dateEn: "April – September",
    titleZh: "項目實踐",
    titleEn: "Project implementation",
    required: false,
    tentative: false
  },
  {
    dateZh: "10月",
    dateEn: "October",
    titleZh: "成果分享會（暫定）",
    titleEn: "Outcome sharing (tentative)",
    required: false,
    tentative: true
  }
] as const;

const fundingSteps = [
  {
    n: "01",
    zh: "提交詳細項目計劃書，講清楚理念，以及項目同人文精神嘅關連。",
    en: "Submit a detailed project proposal explaining the idea and its connection to humanistic values."
  },
  {
    n: "02",
    zh: "積極參與計劃活動，並定期匯報項目進度。",
    en: "Take an active part in programme activities and report project progress regularly."
  },
  {
    n: "03",
    zh: "完成兩次專案匯報及評估；獲評審認可嘅計劃，有機會獲得最高 HK$20,000 啟動資金。",
    en: "Complete two project presentations and assessments. Projects endorsed by the judging panel may receive up to HK$20,000 in seed funding."
  },
  {
    n: "04",
    zh: "推展項目，並自我評估實際成效。",
    en: "Carry the project forward and evaluate its real-world impact."
  }
] as const;

type ProgrammeSnapshotProps = {
  variant?: "home" | "detail";
};

export function ProgrammeSnapshot({
  variant = "home"
}: ProgrammeSnapshotProps) {
  const isDetail = variant === "detail";

  return (
    <section
      id={isDetail ? "programme-details" : "journey"}
      className={styles.section}
    >
      <div className={styles.orbit} aria-hidden="true">
        ∞
      </div>

      <div className={`shell ${styles.inner}`}>
        <Reveal>
          <div className={styles.heading}>
            <span className={styles.eyebrow}>
              {isDetail ? "PROGRAMME DETAILS" : "PROGRAMME AT A GLANCE"}
            </span>

            <Localized
              as="h2"
              zh={
                isDetail ? (
                  <>
                    由入選到落地，
                    <br />
                    <em>時間、流程、資金一次睇清楚。</em>
                  </>
                ) : (
                  <>
                    報名之前，先睇清楚
                    <br />
                    <em>你會經歷啲咩。</em>
                  </>
                )
              }
              en={
                isDetail ? (
                  <>
                    From selection to implementation:
                    <br />
                    <em>time, process and funding in one view.</em>
                  </>
                ) : (
                  <>
                    Before you apply, know
                    <br />
                    <em>what the journey involves.</em>
                  </>
                )
              }
            />

            <Localized
              as="p"
              zh={
                isDetail
                  ? "H Infinity 唔係一次性活動。由前期準備、研究、匯報到落手實踐，參加者需要預留時間，亦會一路接受回饋同修正項目。"
                  : "由前期準備、研究、匯報到落手實踐，H Infinity 係一段需要你真正投入時間嘅過程。以下幾個日子，入選參加者需要預先留低。"
              }
              en={
                isDetail
                  ? "H Infinity is not a one-off event. From preparation and research to presentations and implementation, participants need to make time, receive feedback and keep revising their projects."
                  : "From preparation and research to presentations and implementation, H Infinity is a process that needs real commitment. Selected participants should reserve the key dates below in advance."
              }
            />
          </div>
        </Reveal>

        <div className={styles.factGrid}>
          <Reveal>
            <article className={styles.factCard}>
              <span className={styles.factLabel}>WHO</span>
              <Localized as="strong" zh="18–30 歲" en="Age 18–30" />
              <Localized
                as="p"
                zh="對社會、人文精神有抱負嘅年青人"
                en="Young people with aspirations for society and humanistic values"
              />
            </article>
          </Reveal>

          <Reveal delay={0.06}>
            <article className={styles.factCard}>
              <span className={styles.factLabel}>HOW TO JOIN</span>
              <Localized as="strong" zh="個人 / 2–4 人" en="Solo / 2–4 people" />
              <Localized
                as="p"
                zh="可以個人或小組報名；入選後需以小組形式實踐文化計劃"
                en="Apply individually or as a team; selected participants will carry out the cultural project as a team"
              />
            </article>
          </Reveal>

          <Reveal delay={0.12}>
            <article className={`${styles.factCard} ${styles.fundingFact}`}>
              <span className={styles.factLabel}>SEED FUNDING</span>
              <strong>HK$20,000</strong>
              <Localized
                as="p"
                zh="經兩次專案匯報及評估後，獲認可計劃有機會獲得最高啟動資金"
                en="After two project presentations and assessments, endorsed projects may receive up to this amount in seed funding"
              />
            </article>
          </Reveal>
        </div>

        <div className={styles.mainGrid}>
          <Reveal>
            <article className={styles.timelinePanel}>
              <div className={styles.panelHeading}>
                <div>
                  <span>01 / TIME COMMITMENT</span>
                  <Localized
                    as="h3"
                    zh="你要預留嘅時間"
                    en="Dates to reserve"
                  />
                </div>

                <Localized
                  as="span"
                  className={styles.requiredKey}
                  zh="前期活動必須出席"
                  en="Preparation activities are compulsory"
                />
              </div>

              <div className={styles.timeline}>
                {timeline.map((item, index) => (
                  <div
                    className={styles.timelineItem}
                    key={`${item.dateEn}-${item.titleEn}`}
                  >
                    <div className={styles.timelineRail} aria-hidden="true">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                    </div>

                    <div className={styles.timelineCopy}>
                      <div className={styles.timelineDateRow}>
                        <Localized as="b" zh={item.dateZh} en={item.dateEn} />

                        {item.required ? (
                          <Localized
                            as="span"
                            className={styles.requiredBadge}
                            zh="必須出席"
                            en="COMPULSORY"
                          />
                        ) : null}

                        {item.tentative ? (
                          <Localized
                            as="span"
                            className={styles.tentativeBadge}
                            zh="暫定"
                            en="TENTATIVE"
                          />
                        ) : null}
                      </div>

                      <Localized
                        as="p"
                        zh={item.titleZh}
                        en={item.titleEn}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <article className={styles.fundingPanel}>
              <span className={styles.fundingKicker}>
                02 / FROM PLAN TO FUNDING
              </span>

              <Localized
                as="h3"
                zh={
                  <>
                    點樣有機會得到
                    <br />
                    <em>最高 HK$20,000</em>
                    <br />
                    項目啟動資金？
                  </>
                }
                en={
                  <>
                    How can your project be considered for
                    <br />
                    <em>up to HK$20,000</em>
                    <br />
                    in seed funding?
                  </>
                }
              />

              <div className={styles.fundingSteps}>
                {fundingSteps.map((step) => (
                  <div className={styles.fundingStep} key={step.n}>
                    <b>{step.n}</b>
                    <Localized as="p" zh={step.zh} en={step.en} />
                  </div>
                ))}
              </div>

              <Localized
                as="p"
                className={styles.fundingNote}
                zh="啟動資金並非自動獲批；須經兩次專案匯報及評估，並獲評審認可。"
                en="Seed funding is not automatic. It is subject to two project presentations, assessment and endorsement by the judging panel."
              />
            </article>
          </Reveal>
        </div>

        <Reveal>
          <div className={styles.ctaRow}>
            <div>
              <Localized
                as="b"
                zh="申請截止：31 Oct 2026"
                en="Applications close: 31 Oct 2026"
              />
              <Localized
                as="p"
                zh={
                  isDetail
                    ? "如果你願意預留時間，將一個真正關心嘅問題一路做落去，就由申請開始。"
                    : "準備好預留時間，將一個你真正關心嘅問題做落去？"
                }
                en={
                  isDetail
                    ? "If you are ready to make the time and carry a question you genuinely care about into practice, start with the application."
                    : "Ready to make the time and turn something you genuinely care about into action?"
                }
              />
            </div>

            <div className="button-row">
              <Link
                className="button button-light button-kinetic"
                href="/apply"
              >
                <Localized zh="立即申請 ↗" en="Apply now ↗" />
              </Link>

              <Link
                className="button button-dark button-kinetic"
                href={isDetail ? "/projects/cohort-01" : "/h-infinity"}
              >
                <Localized
                  zh={isDetail ? "睇首屆項目" : "了解完整計劃"}
                  en={
                    isDetail
                      ? "See Cohort 01 projects"
                      : "Full programme details"
                  }
                />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
