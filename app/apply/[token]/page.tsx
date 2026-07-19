import Link from "next/link";
import { ApplicationWizard } from "@/components/application-wizard";

export default async function ApplicationPage({ params, searchParams }: { params: Promise<{ token: string }>; searchParams: Promise<{ submitted?: string }> }) {
  const { token } = await params;
  const { submitted } = await searchParams;
  if (submitted) {
    return <section className="application-shell"><div className="shell"><div className="application-card" style={{ textAlign: "center" }}><span className="eyebrow">APPLICATION SUBMITTED</span><h1>收到。你已經踏出第一步。</h1><p>你的 Demo 申請參考編號：</p><p style={{ fontSize: 30, color: "var(--blue)", fontWeight: 900 }}>{submitted}</p><p>正式版本會同時寄出確認電郵，並鎖定提交時的答案 Snapshot。</p><Link className="button button-primary" href="/">返回首頁</Link></div></div></section>;
  }
  return <ApplicationWizard token={token} />;
}
