import Link from "next/link";
import { PageHero } from "@/components/page-hero";

export const metadata = { title: "合作夥伴" };
const groups = [
  ["Funding Partners", "把資源直接轉化為青年項目、導師支援與安全試錯的空間。"],
  ["Knowledge Partners", "提供文化、設計、項目管理及社會實踐的跨界知識。"],
  ["Community Partners", "讓青年項目進入真實社區，接觸不同受眾與需要。"],
  ["Venue Partners", "提供能容納交流、工作坊、測試與展示的地方。"],
  ["Media Partners", "協助值得被看見的青年文化故事走出原有圈子。"],
  ["School & Youth Partners", "連結大專生、初職青年與多元背景的潛在參加者。"]
];
export default function PartnersPage() {
  return <><PageHero eyebrow="PARTNERS" title="唔係 Logo 牆，而係一個共同投入的網絡。" intro="正式網站會列出每個夥伴的合作角色、參與屆別與具體貢獻，而不只是放置標誌。" /><section className="section-tight"><div className="shell partner-grid">{groups.map(([name, copy]) => <article className="partner-card" key={name}><span>OPEN FOR COLLABORATION</span><h3>{name}</h3><p>{copy}</p></article>)}</div><div className="shell" style={{ marginTop: 42 }}><Link className="button button-primary" href="/support">了解合作方式</Link></div></section></>;
}
