import Link from "next/link";
import { PageHero } from "@/components/page-hero";

export const metadata = { title: "支持我們" };
const items = [
  ["資助與 Seed Support", "支持教育活動、導師安排、參加者實踐及合資格項目的種子資金。"],
  ["成為導師或講者", "用跨界經驗陪青年拆解問題，不只是分享成功故事。"],
  ["場地與製作支援", "提供工作坊、測試、拍攝、展覽或 Finale 所需空間與服務。"],
  ["學校及青年合作", "協助接觸不同學科與背景的青年，建立更開放的參與入口。"],
  ["媒體及內容合作", "把真實過程、青年觀點與文化項目帶到更廣泛的公眾。"]
];
export default function SupportPage() {
  return <><PageHero eyebrow="SUPPORT THE ECOSYSTEM" title="你的支持，唔只成就一次活動。" intro="它可以變成年輕人手中的種子資源、身邊的導師，以及一次敢於行動的機會。"><div className="button-row"><Link className="button button-primary" href="/contact">開始傾合作</Link></div></PageHero><section className="section-tight"><div className="shell feature-list">{items.map(([title, copy], index) => <article className="feature-row" key={title}><b>0{index + 1}</b><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></section></>;
}
