import Link from "next/link";
import { ApplicationWizard } from "@/components/application-wizard";
import { Localized } from "@/components/i18n";

export default async function ApplicationPage({ params, searchParams }: { params: Promise<{ token: string }>; searchParams: Promise<{ submitted?: string }> }) {
  const { token } = await params;
  const { submitted } = await searchParams;
  if (submitted) {
    return <section className="application-shell"><div className="shell"><div className="application-card motion-card" style={{ textAlign: "center" }}><span className="eyebrow">APPLICATION SUBMITTED</span><Localized as="h1" zh="收到。你已經踏出第一步。" en="Received. You have taken the first step." /><Localized as="p" zh="你的 Demo 申請參考編號：" en="Your demo application reference:" /><p style={{ fontSize: 30, color: "var(--blue)", fontWeight: 900 }}>{submitted}</p><Localized as="p" zh="正式版本會同時寄出確認電郵，並鎖定提交時的答案 Snapshot。" en="The live version will also send a confirmation email and lock the submitted answer snapshot." /><Link className="button button-primary" href="/"><Localized zh="返回首頁" en="Back to home" /></Link></div></div></section>;
  }
  return <ApplicationWizard token={token} />;
}
