import Link from "next/link";
import { Localized } from "@/components/i18n";
import { StartApplicationForm } from "@/components/start-application-form";
import { applicationConfig } from "@/lib/application-form-config";

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
          {applicationConfig.frontendOnly && (
            <div
              style={{
                marginBottom: 26,
                padding: "14px 16px",
                border: "1px solid var(--line)",
                borderRadius: 14,
                background: "color-mix(in srgb, var(--yellow) 16%, transparent)"
              }}
            >
              <strong>FRONTEND PREVIEW</strong>
              <Localized
                as="p"
                zh="申請表介面已可完整測試；現階段資料只會儲存在此瀏覽器，尚未連接正式 Notion Applications database。"
                en="The full application interface is ready for testing. For now, data is stored only in this browser and is not yet connected to the live Notion Applications database."
              />
            </div>
          )}

          <div className="apply-facts">
            <div className="apply-fact">
              <Localized as="b" zh="申請期" en="Application period" />
              <span>{applicationConfig.applicationOpen} – {applicationConfig.applicationClose}</span>
            </div>

            <div className="apply-fact">
              <Localized as="b" zh="申請形式" en="Application format" />
              <Localized
                as="span"
                zh="個人 / 團隊（2–4 人）"
                en="Individual / team (2–4 people)"
              />
            </div>

            <div className="apply-fact">
              <Localized as="b" zh="準備" en="Preparation" />
              <Localized
                as="span"
                zh="毋須完整 Proposal"
                en="No complete proposal required"
              />
            </div>
          </div>

          <Localized as="h2" zh="開始你的申請" en="Start your application" />
          <Localized
            as="p"
            zh="輸入電郵開始。你可以中途離開，再用同一部裝置繼續；正式提交前會有 Review 頁畀你檢查一次。"
            en="Enter your email to begin. You can leave and continue later on the same device, and review everything before submission."
          />

          <StartApplicationForm />

          <hr style={{ border: 0, borderTop: "1px solid var(--line)", margin: "30px 0" }} />

          <Localized
            as="p"
            zh={<><strong>申請前提醒：</strong>每位申請者都需要填寫基本資料及準備一份 PDF CV；團隊申請只需共同回答一份 Q1–Q6。</>}
            en={<><strong>Before you apply:</strong> each applicant needs to provide basic details and prepare one PDF CV; team applicants submit one shared set of Q1–Q6 answers.</>}
          />

          <Link className="text-link" href="/privacy">
            <Localized zh="閱讀私隱及資料使用說明 →" en="Read the privacy and data-use notes →" />
          </Link>
        </div>
      </section>
    </>
  );
}
