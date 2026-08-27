import Link from "next/link";
import { Localized } from "@/components/i18n";
import { StartApplicationForm } from "@/components/start-application-form";

export const metadata = { title: "H Infinity Cohort 02｜申請" };

export default function ApplyPage() {
  return (
    <>
      <section className="apply-hero">
        <div className="shell">
          <span className="eyebrow" style={{ color: "var(--yellow)" }}>
            H INFINITY COHORT 02 / APPLICATIONS
          </span>
          <Localized
            as="h1"
            zh={<>你未需要有答案。<br />由一個你真正關心嘅問題開始。</>}
            en={<>You do not need all the answers.<br />Start with something you genuinely care about.</>}
          />
          <Localized
            as="p"
            zh="H Infinity 唔係想睇一份完美 Proposal。我哋想知道你／你哋點理解香港文化、關心咩，同埋如果有機會落手做，你想試啲乜。"
            en="H Infinity is not looking for a perfect proposal. We want to understand how you see Hong Kong culture, what you care about, and what you would like to try if given the chance to make something happen."
          />
        </div>
      </section>

      <section>
        <div className="apply-panel motion-card">
          <div className="apply-facts">
            <div className="apply-fact">
              <Localized as="b" zh="申請期" en="Application period" />
              <Localized as="span" zh="1 Sep – 31 Oct 2026" en="1 Sep – 31 Oct 2026" />
            </div>
            <div className="apply-fact">
              <Localized as="b" zh="形式" en="Format" />
              <Localized as="span" zh="個人申請 / 團隊申請（最多 4 人）" en="Individual / team application (up to 4 people)" />
            </div>
            <div className="apply-fact">
              <Localized as="b" zh="準備" en="Preparation" />
              <Localized as="span" zh="毋須完整 Proposal，構思可於計劃期間修改" en="No complete proposal required; ideas can evolve during the programme" />
            </div>
          </div>

          <Localized as="h2" zh="開始你的申請" en="Start your application" />
          <Localized
            as="p"
            zh="輸入電郵開始。你可以中途儲存再繼續；正式提交前會有 Review 頁畀你檢查一次。"
            en="Enter your email to begin. You can save and continue later, and review everything before final submission."
          />
          <StartApplicationForm />

          <hr style={{ border: 0, borderTop: "1px solid var(--line)", margin: "30px 0" }} />

          <Localized
            as="p"
            zh={<><strong>申請前提醒：</strong>每位申請者都需要提供基本資料及 PDF CV；團隊申請只需共同回答一份申請問題。</>}
            en={<><strong>Before you apply:</strong> each applicant must provide basic information and a PDF CV; team applicants submit one shared set of application answers.</>}
          />
          <Link className="text-link" href="/privacy">
            <Localized zh="閱讀私隱及資料使用說明 →" en="Read the privacy and data-use notes →" />
          </Link>
        </div>
      </section>
    </>
  );
}
