import Link from "next/link";
import { Localized } from "@/components/i18n";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";

export const metadata = { title: "H Infinity 計劃" };

const features = [
  ["01", "安全試錯", "Safe experimentation", "不是以勝負或評分為中心，而是容許構思被挑戰、推翻和重新建立。", "The programme is not centred on winning or scoring. Ideas can be challenged, discarded and rebuilt."],
  ["02", "跨界同行", "Cross-sector community", "連結文化工作者、設計師、社會創新實踐者與不同背景青年。", "Connect with cultural practitioners, designers, social innovators and young people from different backgrounds."],
  ["03", "由 Idea 到行動", "From idea to action", "由設計思維、項目管理及 Pitching，走到持續導師支援與項目實踐。", "Move from design thinking, project management and pitching into continuing mentorship and implementation."],
  ["04", "種子支持", "Seed support", "合資格項目可獲得 Seed Grant、專業網絡與可能的媒體曝光。", "Eligible projects may receive seed grants, professional networks and potential media exposure."],
  ["05", "舊生回流", "Alumni return", "參加者完成計劃後，可回流成為核心成員、共同設計者或導師。", "Participants can return as core members, co-designers or mentors after completing the programme."]
] as const;

export default function HInfinityPage() {
  return (
    <>
      <PageHero
        eyebrow="旗艦計劃"
        eyebrowEn="THE FLAGSHIP PROGRAMME"
        title="唔係商業比賽。係一個讓想法安全長大的實驗室。"
        titleEn="Not a business competition. A laboratory where ideas can grow safely."
        intro="H Infinity 為大專生及 30 歲以下青年建立一條由構思、學習、實踐到回流的文化行動路徑。"
        introEn="H Infinity creates a pathway for tertiary students and young people under 30 to move from ideation and learning to implementation and alumni return."
      >
        <div className="button-row">
          <Link className="button button-primary" href="/apply"><Localized zh="開始申請" en="Start application" /></Link>
          <Link className="button" href="/first-chapter"><Localized zh="睇第一屆" en="Explore the first cohort" /></Link>
        </div>
      </PageHero>
      <section className="section-tight">
        <div className="shell content-grid">
          <Reveal className="content-main">
            <div className="feature-list">
              {features.map(([n, zhTitle, enTitle, zhCopy, enCopy]) => (
                <article className="feature-row motion-card" key={n}><b>{n}</b><div><Localized as="h3" zh={zhTitle} en={enTitle} /><Localized as="p" zh={zhCopy} en={enCopy} /></div></article>
              ))}
            </div>
          </Reveal>
          <Reveal className="content-side" delay={0.12}>
            <aside className="sticky-note motion-card">
              <Localized as="h3" zh="適合邊啲人？" en="Who is it for?" />
              <Localized as="p" zh="關心文化、社區、人文或社會議題，但未必有完整計劃、正式經驗或特定學科背景的青年。" en="Young people who care about culture, community, the humanities or social issues, even without a complete plan, formal experience or a specific academic background." />
              <Localized as="p" zh={<><strong>唔需要：</strong>完整 Proposal、商業背景、藝術學位。</>} en={<><strong>You do not need:</strong> a complete proposal, a business background or an arts degree.</>} />
              <Localized as="p" zh={<><strong>需要：</strong>願意投入、合作、接受挑戰與持續修正。</>} en={<><strong>You do need:</strong> commitment, collaboration, openness to challenge and willingness to revise.</>} />
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
