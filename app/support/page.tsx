import Link from "next/link";
import { Localized } from "@/components/i18n";
import { PageHero } from "@/components/page-hero";

export const metadata = { title: "支持我們" };
const items = [
  ["資助與 Seed Support", "Funding & seed support", "支持教育活動、導師安排、參加者實踐及合資格項目的種子資金。", "Support educational activities, mentor arrangements, participant implementation and seed funding for eligible projects."],
  ["成為導師或講者", "Become a mentor or speaker", "用跨界經驗陪青年拆解問題，不只是分享成功故事。", "Use cross-sector experience to help youth unpack problems—not only share success stories."],
  ["場地與製作支援", "Venue & production support", "提供工作坊、測試、拍攝、展覽或 Finale 所需空間與服務。", "Provide space and services for workshops, testing, filming, exhibitions or the finale."],
  ["學校及青年合作", "School & youth partnerships", "協助接觸不同學科與背景的青年，建立更開放的參與入口。", "Help reach young people from different disciplines and backgrounds and create more open entry points."],
  ["媒體及內容合作", "Media & content collaboration", "把真實過程、青年觀點與文化項目帶到更廣泛的公眾。", "Bring real processes, youth perspectives and cultural projects to wider audiences."]
];
export default function SupportPage() {
  return <><PageHero eyebrow="支持生態" eyebrowEn="SUPPORT THE ECOSYSTEM" title="你的支持，唔只成就一次活動。" titleEn="Your support can build more than one event." intro="它可以變成年輕人手中的種子資源、身邊的導師，以及一次敢於行動的機會。" introEn="It can become seed resources in a young person’s hands, a mentor beside them and an opportunity to act with courage."><div className="button-row"><Link className="button button-primary" href="/contact"><Localized zh="開始傾合作" en="Start a conversation" /></Link></div></PageHero><section className="section-tight"><div className="shell feature-list">{items.map(([zhTitle, enTitle, zhCopy, enCopy], index) => <article className="feature-row motion-card" key={zhTitle}><b>0{index + 1}</b><div><Localized as="h3" zh={zhTitle} en={enTitle} /><Localized as="p" zh={zhCopy} en={enCopy} /></div></article>)}</div></section></>;
}
