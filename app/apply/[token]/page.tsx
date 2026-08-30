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
            <span className="eyebrow">APPLICATION SUBMITTED</span>

            <Localized
              as="h1"
              zh="收到。你已經踏出第一步。"
              en="Received. You have taken the first step."
            />

            <Localized
              as="p"
              zh="你的申請已成功寫入 H Infinity 系統。請保留以下參考編號。"
              en="Your application has been successfully submitted to H Infinity. Please keep this reference number."
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
                zh={<><strong>下一步：</strong>H Infinity 團隊會按甄選流程處理你嘅申請。如有需要，我哋會透過主要聯絡電郵聯絡你。</>}
                en={<><strong>Next:</strong> the H Infinity team will process your application according to the selection workflow and contact you through the primary email if needed.</>}
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
