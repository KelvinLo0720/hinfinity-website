import Link from "next/link";
import { Localized } from "@/components/i18n";
import { PageHero } from "@/components/page-hero";

export const metadata = { title: "支持我們" };

const items = [
  [
    "資源與項目支持",
    "Resources & project support",
    "支持青年由構思走到測試、製作與真實實踐。",
    "Support young people as they move from ideas into testing, production and real-world practice."
  ],
  [
    "成為導師或講者",
    "Become a mentor or speaker",
    "用跨界經驗陪青年拆解問題，而唔只係分享成功故事。",
    "Use cross-sector experience to help young people unpack problems, not only share success stories."
  ],
  [
    "場地與製作支援",
    "Venue & production support",
    "提供工作坊、測試、拍攝、展示或社群交流所需空間與服務。",
    "Provide spaces and services for workshops, testing, filming, presentation or community exchange."
  ],
  [
    "學校及青年合作",
    "School & youth partnerships",
    "協助接觸不同學科與背景的青年，建立更開放的參與入口。",
    "Help reach young people from different disciplines and backgrounds and create more open entry points."
  ],
  [
    "媒體及內容合作",
    "Media & content collaboration",
    "將真實過程、青年觀點與文化項目帶到更廣泛的公眾。",
    "Bring real processes, youth perspectives and cultural projects to wider audiences."
  ]
] as const;

export default function SupportPage() {
  return (
    <>
      <PageHero
        eyebrow="支持生態"
        eyebrowEn="SUPPORT THE ECOSYSTEM"
        title="你的支持，唔只成就一次活動。"
        titleEn="Your support can build more than one event."
        intro="它可以變成年輕人手中的方法、身邊的導師、測試的空間，以及一次真正將想法做出來的機會。"
        introEn="It can become methods in a young person's hands, a mentor beside them, space to test and a real chance to make an idea happen."
      >
        <div className="button-row">
          <Link className="button button-primary" href="/contact">
            <Localized zh="開始傾合作" en="Start a conversation" />
          </Link>
        </div>
      </PageHero>

      <section className="section-tight">
        <div className="shell feature-list">
          {items.map(([zhTitle, enTitle, zhCopy, enCopy], index) => (
            <article className="feature-row motion-card" key={zhTitle}>
              <b>0{index + 1}</b>
              <div>
                <Localized as="h3" zh={zhTitle} en={enTitle} />
                <Localized as="p" zh={zhCopy} en={enCopy} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
