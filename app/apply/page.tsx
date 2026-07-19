import Link from "next/link";
import { StartApplicationForm } from "@/components/start-application-form";

export const metadata = { title: "報名參加" };

export default function ApplyPage() {
  return (
    <>
      <section className="apply-hero">
        <div className="shell">
          <span className="eyebrow" style={{ color: "var(--yellow)" }}>NEXT COHORT / APPLICATION DEMO</span>
          <h1>唔需要完美計劃。<br />由一個想改變嘅心開始。</h1>
          <p>申請者毋須預先建立帳戶。輸入電郵後可開始填寫，系統自動儲存，並可透過安全連結中途繼續。</p>
        </div>
      </section>
      <section>
        <div className="apply-panel">
          <div className="apply-facts">
            <div className="apply-fact"><b>對象</b><span>大專生及 30 歲以下青年</span></div>
            <div className="apply-fact"><b>背景</b><span>不限學科與項目經驗</span></div>
            <div className="apply-fact"><b>準備</b><span>毋須完整 Proposal</span></div>
          </div>
          <h2 style={{ color: "var(--navy)", fontSize: 36, marginBottom: 8 }}>開始你的申請</h2>
          <p>Demo 表格包含基本資料、個人旅程、關心議題、初步構思、合作方式、文件及同意。</p>
          <StartApplicationForm />
          <hr style={{ border: 0, borderTop: "1px solid var(--line)", margin: "30px 0" }} />
          <p><strong>已經開始咗？</strong> 正式版本可讓申請者輸入電郵，重新寄出 Resume Link。Demo 可先以瀏覽器歷史返回原本連結。</p>
          <Link className="text-link" href="/privacy">閱讀私隱及資料使用說明 →</Link>
        </div>
      </section>
    </>
  );
}
