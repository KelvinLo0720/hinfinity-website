import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";

export const metadata = { title: "H Infinity 計劃" };

const features = [
  ["01", "安全試錯", "不是以勝負或評分為中心，而是容許構思被挑戰、推翻和重新建立。"],
  ["02", "跨界同行", "連結文化工作者、設計師、社會創新實踐者與不同背景青年。"],
  ["03", "由 Idea 到行動", "由設計思維、項目管理及 Pitching，走到持續導師支援與項目實踐。"],
  ["04", "種子支持", "合資格項目可獲得 Seed Grant、專業網絡與可能的媒體曝光。"],
  ["05", "舊生回流", "參加者完成計劃後，可回流成為核心成員、共同設計者或導師。"]
];

export default function HInfinityPage() {
  return (
    <>
      <PageHero eyebrow="THE FLAGSHIP PROGRAMME" title="唔係商業比賽。係一個讓想法安全長大的實驗室。" intro="H Infinity 為大專生及 30 歲以下青年建立一條由構思、學習、實踐到回流的文化行動路徑。">
        <div className="button-row"><Link className="button button-primary" href="/apply">開始申請</Link><Link className="button" href="/first-chapter">睇第一屆</Link></div>
      </PageHero>
      <section className="section-tight">
        <div className="shell content-grid">
          <Reveal className="content-main">
            <div className="feature-list">
              {features.map(([n, title, copy]) => (
                <article className="feature-row" key={n}><b>{n}</b><div><h3>{title}</h3><p>{copy}</p></div></article>
              ))}
            </div>
          </Reveal>
          <Reveal className="content-side" delay={0.12}>
            <aside className="sticky-note">
              <h3>適合邊啲人？</h3>
              <p>關心文化、社區、人文或社會議題，但未必有完整計劃、正式經驗或特定學科背景的青年。</p>
              <p><strong>唔需要：</strong>完整 Proposal、商業背景、藝術學位。</p>
              <p><strong>需要：</strong>願意投入、合作、接受挑戰與持續修正。</p>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
