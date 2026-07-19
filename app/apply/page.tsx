import Link from "next/link";
import { Localized } from "@/components/i18n";
import { StartApplicationForm } from "@/components/start-application-form";

export const metadata = { title: "報名參加" };

export default function ApplyPage() {
  return (
    <>
      <section className="apply-hero">
        <div className="shell">
          <span className="eyebrow" style={{ color: "var(--yellow)" }}>NEXT COHORT / APPLICATION DEMO</span>
          <Localized as="h1" zh={<>唔需要完美計劃。<br />由一個想改變嘅心開始。</>} en={<>No perfect plan required.<br />Start with the desire to make a difference.</>} />
          <Localized as="p" zh="申請者毋須預先建立帳戶。輸入電郵後可開始填寫，系統自動儲存，並可透過安全連結中途繼續。" en="Applicants do not need to create an account. Enter an email address to begin; the form saves automatically and can later be resumed through a secure link." />
        </div>
      </section>
      <section>
        <div className="apply-panel motion-card">
          <div className="apply-facts">
            <div className="apply-fact"><Localized as="b" zh="對象" en="For" /><Localized as="span" zh="大專生及 30 歲以下青年" en="Tertiary students and youth under 30" /></div>
            <div className="apply-fact"><Localized as="b" zh="背景" en="Background" /><Localized as="span" zh="不限學科與項目經驗" en="All disciplines and experience levels" /></div>
            <div className="apply-fact"><Localized as="b" zh="準備" en="Preparation" /><Localized as="span" zh="毋須完整 Proposal" en="No complete proposal required" /></div>
          </div>
          <Localized as="h2" zh="開始你的申請" en="Start your application" />
          <Localized as="p" zh="Demo 表格包含基本資料、個人旅程、關心議題、初步構思、合作方式、文件及同意。" en="The demo form covers basic information, your journey, the issue you care about, an initial idea, collaboration, documents and consent." />
          <StartApplicationForm />
          <hr style={{ border: 0, borderTop: "1px solid var(--line)", margin: "30px 0" }} />
          <Localized as="p" zh={<><strong>已經開始咗？</strong> 正式版本可讓申請者輸入電郵，重新寄出 Resume Link。Demo 可先以瀏覽器歷史返回原本連結。</>} en={<><strong>Already started?</strong> The live version can resend a resume link by email. In the demo, use your browser history to return to the original link.</>} />
          <Link className="text-link" href="/privacy"><Localized zh="閱讀私隱及資料使用說明 →" en="Read the privacy and data-use notes →" /></Link>
        </div>
      </section>
    </>
  );
}
