"use client";

import { useLanguage } from "@/components/i18n";
import { PageHero } from "@/components/page-hero";

export default function ContactPage() {
  const { language } = useLanguage();
  const zh = language === "zh";
  return <><PageHero eyebrow="聯絡" eyebrowEn="CONTACT" title="由一個對話開始。" titleEn="Start with a conversation." intro="以下聯絡資料為 Demo Placeholder。正式上線前請換成組織電郵、社交媒體及私隱查詢聯絡人。" introEn="The following contact details are demo placeholders. Replace them with the organisation’s email, social channels and privacy contact before launch." /><section className="section-tight"><div className="shell apply-panel motion-card" style={{ marginTop: 0 }}><div className="form-grid"><div className="field"><label htmlFor="name">{zh ? "姓名" : "Name"}</label><input id="name" placeholder={zh ? "你的姓名" : "Your name"} /></div><div className="field"><label htmlFor="email">{zh ? "電郵" : "Email"}</label><input id="email" type="email" placeholder="name@example.com" /></div><div className="field field-full"><label htmlFor="topic">{zh ? "查詢類型" : "Enquiry type"}</label><select id="topic"><option>{zh ? "參加 H Infinity" : "Joining H Infinity"}</option><option>{zh ? "資助與合作" : "Funding & partnership"}</option><option>{zh ? "成為導師／講者" : "Mentoring / speaking"}</option><option>{zh ? "媒體查詢" : "Media enquiry"}</option><option>{zh ? "其他" : "Other"}</option></select></div><div className="field field-full"><label htmlFor="message">{zh ? "訊息" : "Message"}</label><textarea id="message" placeholder={zh ? "想同我哋傾啲咩？" : "What would you like to discuss?"} /></div><div className="field-full"><button className="button button-primary" type="button">{zh ? "Demo：送出訊息" : "Demo: send message"}</button></div></div></div></section></>;
}
