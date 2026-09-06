import Link from "next/link";
import { Localized } from "@/components/i18n";
import { PageHero } from "@/components/page-hero";

export const metadata = { title: "合作夥伴" };

const groups = [
  [
    "Funding Partners",
    "提供資金與試錯資源，支援項目由想法逐步成真。",
    "Provide funding and room to experiment, supporting projects as they move from ideas towards reality."
  ],
  [
    "Knowledge Partners",
    "分享經驗，陪青年拆解盲點、釐清方向。",
    "Share experience, helping young people unpack blind spots and clarify their direction."
  ],
  [
    "Community Partners",
    "協助項目走入社區，面對真實受眾。",
    "Help projects move into communities and meet real audiences."
  ],
  [
    "Venue & Production Partners",
    "提供工作坊、拍攝、測試、展示及交流所需的空間或製作支援。",
    "Provide space or production support for workshops, filming, testing, presentation and exchange."
  ],
  [
    "Media & Content Partners",
    "將值得被看見嘅青年文化企劃，帶到更廣泛嘅大眾視野。",
    "Bring youth cultural initiatives worth seeing to a wider public."
  ],
  [
    "School & Youth Partners",
    "打破界限，連結唔同學科背景嘅青年。",
    "Break down boundaries and connect young people from different academic backgrounds."
  ]
] as const;

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="合作夥伴"
        eyebrowEn="PARTNERS"
        title="唔係 Logo 牆，一齊讓一件事真正發生。"
        titleEn="Not a logo wall. Let’s make something real happen together."
        intro="H Infinity 尋找願意與青年一起做、試、改的夥伴。合作不限形式——資源、知識、場地、社區連結、媒體、青年招募，都可以是起點。"
        introEn="H Infinity looks for partners willing to build, test and revise alongside young people. Collaboration can take many forms—resources, knowledge, venues, community connections, media or youth outreach can all be a starting point."
      />

      <section className="section-tight">
        <div className="shell partner-grid">
          {groups.map(([name, zh, en]) => (
            <article className="partner-card motion-card" key={name}>
              <span>OPEN FOR COLLABORATION</span>
              <h3>{name}</h3>
              <Localized as="p" zh={zh} en={en} />
            </article>
          ))}
        </div>

        <div className="shell" style={{ marginTop: 42 }}>
          <Link className="button button-primary" href="/contact">
            <Localized zh="開始傾合作" en="Start a conversation" />
          </Link>
        </div>
      </section>
    </>
  );
}
