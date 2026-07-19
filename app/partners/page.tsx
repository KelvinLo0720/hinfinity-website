import Link from "next/link";
import { Localized } from "@/components/i18n";
import { PageHero } from "@/components/page-hero";

export const metadata = { title: "合作夥伴" };
const groups = [
  ["Funding Partners", "把資源直接轉化為青年項目、導師支援與安全試錯的空間。", "Turn resources directly into youth projects, mentorship and room for safe experimentation."],
  ["Knowledge Partners", "提供文化、設計、項目管理及社會實踐的跨界知識。", "Contribute cross-sector knowledge in culture, design, project management and social practice."],
  ["Community Partners", "讓青年項目進入真實社區，接觸不同受眾與需要。", "Bring youth projects into real communities and connect them with different audiences and needs."],
  ["Venue Partners", "提供能容納交流、工作坊、測試與展示的地方。", "Provide spaces for exchange, workshops, testing and presentation."],
  ["Media Partners", "協助值得被看見的青年文化故事走出原有圈子。", "Help youth cultural stories move beyond their existing circles."],
  ["School & Youth Partners", "連結大專生、初職青年與多元背景的潛在參加者。", "Connect tertiary students, early-career youth and potential participants from diverse backgrounds."]
];
export default function PartnersPage() {
  return <><PageHero eyebrow="合作夥伴" eyebrowEn="PARTNERS" title="唔係 Logo 牆，而係一個共同投入的網絡。" titleEn="Not a logo wall—a network of shared contribution." intro="正式網站會列出每個夥伴的合作角色、參與屆別與具體貢獻，而不只是放置標誌。" introEn="The live website will show each partner’s role, cohort involvement and concrete contribution—not only a logo." /><section className="section-tight"><div className="shell partner-grid">{groups.map(([name, zh, en]) => <article className="partner-card motion-card" key={name}><span>OPEN FOR COLLABORATION</span><h3>{name}</h3><Localized as="p" zh={zh} en={en} /></article>)}</div><div className="shell" style={{ marginTop: 42 }}><Link className="button button-primary" href="/support"><Localized zh="了解合作方式" en="Explore ways to collaborate" /></Link></div></section></>;
}
