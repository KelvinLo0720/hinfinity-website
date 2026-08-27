import Link from "next/link";
import { ApplicationWizard } from "@/components/application-wizard";
import { Localized } from "@/components/i18n";

export default async function ApplicationPage({
  params,
  searchParams
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ submitted?: string }>;
}) {
  const { token } = await params;
  const { submitted } = await searchParams;

  if (submitted) {
    return (
      <section className="application-shell">
        <div className="shell">
          <div className="application-card motion-card" style={{ textAlign: "center" }}>
            <span className="eyebrow">FRONTEND PREVIEW COMPLETE</span>

            <Localized
              as="h1"
              zh="介面測試完成。"
              en="Frontend test complete."
            />

            <Localized
              as="p"
              zh="以下係本機測試參考編號；現階段資料未傳送到 H Infinity 團隊或 Notion database。"
              en="This is a local preview reference. At this stage, no application data has been sent to the H Infinity team or to Notion."
            />

            <p style={{ fontSize: 30, color: "var(--blue)", fontWeight: 900 }}>
              {submitted}
            </p>

            <div
              style={{
                margin: "22px auto",
                maxWidth: 640,
                padding: 16,
                border: "1px solid var(--line)",
                borderRadius: 14
              }}
            >
              <Localized
                as="p"
                zh={<><strong>正式上線前：</strong>我哋會將呢個 Submit flow 接駁至 restricted Notion Applications database，屆時先會真正提交資料。</>}
                en={<><strong>Before launch:</strong> this submit flow will be connected to the restricted Notion Applications database. Only then will submissions be sent to the programme team.</>}
              />
            </div>

            <Link className="button button-primary" href="/apply">
              <Localized zh="返回申請頁" en="Back to application page" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return <ApplicationWizard token={token} />;
}
