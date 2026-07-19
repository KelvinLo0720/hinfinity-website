import { PageHero } from "@/components/page-hero";

export const metadata = { title: "聯絡我們" };
export default function ContactPage() {
  return <><PageHero eyebrow="CONTACT" title="由一個對話開始。" intro="以下聯絡資料為 Demo Placeholder。正式上線前請換成組織電郵、社交媒體及私隱查詢聯絡人。" /><section className="section-tight"><div className="shell apply-panel" style={{ marginTop: 0 }}><div className="form-grid"><div className="field"><label htmlFor="name">姓名</label><input id="name" placeholder="你的姓名" /></div><div className="field"><label htmlFor="email">電郵</label><input id="email" type="email" placeholder="name@example.com" /></div><div className="field field-full"><label htmlFor="topic">查詢類型</label><select id="topic"><option>參加 H Infinity</option><option>資助與合作</option><option>成為導師／講者</option><option>媒體查詢</option><option>其他</option></select></div><div className="field field-full"><label htmlFor="message">訊息</label><textarea id="message" placeholder="想同我哋傾啲咩？" /></div><div className="field-full"><button className="button button-primary" type="button">Demo：送出訊息</button></div></div></div></section></>;
}
