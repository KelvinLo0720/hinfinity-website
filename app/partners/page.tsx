import Link from "next/link";
import { Localized } from "@/components/i18n";
import { PageHero } from "@/components/page-hero";

export const metadata = { title: "合作夥伴" };

const groups = [
  [
    "Funding Partners",
    "將資源變成青年實踐所需的時間、方法、製作與測試空間。",
    "Turn resources into the time, methods, production capacity and testing space youth projects need."
  ],
  [
    "Knowledge Partners",
    "以文化、設計、研究、項目管理或社會實踐經驗，幫青年問得更深。",
    "Bring experience in culture, design, research, project management or social practice to help young people ask better questions."
  ],
  [
    "Community Partners",
    "讓項目走入真實地方與社群，接觸真正受眾，而唔只停留喺房入面。",
    "Help projects enter real places and communities, meeting actual audiences rather than staying inside the room."
  ],
  [
    "Venue & Production Partners",
    "提供工作坊、拍攝、測試、展示及交流所需的空間或製作支援。",
    "Provide space or production support for workshops, filming, testing, presentation and exchange."
  ],
  [
    "Media & Content Partners",
    "將值得被聽見的青年文化實踐帶到更廣泛的公眾。",
    "Bring youth cultural practice worth hearing to wider audiences."
  ],
  [
    "School & Youth Partners",
    "連結不同學科、院校與背景的青年，令入口唔只屬於一小撮『文化人』。",
    "Connect young people across disciplines, institutions and backgrounds, keeping the entry point wider than a small cultural circle."
  ]
] as const;

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="合作"
        eyebrowEn="COLLABORATE"
        title="唔係 Logo 牆。係一齊令一件事真係發生。"
        titleEn="Not a logo wall. A network that helps real work happen."
        intro="H Infinity 尋找願意同青年一齊做、試、改的夥伴。合作可以由資源、知識、場地、社區連結、媒體到青年招募開始。"
        introEn="H Infinity works with partners who are willing to build, test and revise alongside young people. Collaboration can begin with resources, knowledge, venues, community connections, media or youth outreach."
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
