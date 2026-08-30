import { Localized } from "@/components/i18n";
import { PageHero } from "@/components/page-hero";

export const metadata = { title: "聯絡我們" };

const EMAIL = "info@hinfinityhk.com";
const INSTAGRAM_URL = "https://www.instagram.com/hinfinity.hk/";

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="聯絡"
        eyebrowEn="CONTACT"
        title="由一個對話開始。"
        titleEn="Start with a conversation."
        intro="想參加 H Infinity、傾合作、成為導師／講者、做媒體訪問，或者只係有一個值得我哋知道的想法，都可以直接搵我哋。"
        introEn="Whether you want to join H Infinity, explore a partnership, mentor or speak, make a media enquiry, or simply share an idea worth hearing, you can contact us directly."
      />

      <section className="section-tight">
        <div className="shell content-grid">
          <div className="content-main">
            <div className="feature-list">
              <article className="feature-row motion-card">
                <b>01</b>
                <div>
                  <Localized as="h3" zh="電郵" en="Email" />
                  <a className="text-link" href={`mailto:${EMAIL}`}>
                    {EMAIL}
                  </a>
                  <Localized
                    as="p"
                    zh="一般查詢、申請、合作、媒體及私隱／資料使用查詢都可以用呢個電郵聯絡。"
                    en="Use this email for general enquiries, applications, partnerships, media, and privacy or data-use questions."
                  />
                </div>
              </article>

              <article className="feature-row motion-card">
                <b>02</b>
                <div>
                  <Localized as="h3" zh="Instagram" en="Instagram" />
                  <a
                    className="text-link"
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    @hinfinity.hk
                  </a>
                  <Localized
                    as="p"
                    zh="最新招募、項目過程、人物故事同現場紀錄會喺 Instagram 更新。"
                    en="Follow Instagram for recruitment updates, project process, people stories and field moments."
                  />
                </div>
              </article>
            </div>
          </div>

          <aside className="content-side sticky-note motion-card">
            <Localized
              as="h3"
              zh="合作唔需要由 Proposal 開始"
              en="A collaboration does not need to start with a proposal"
            />

            <Localized
              as="p"
              zh="如果你有場地、專業、社區連結、內容平台、青年網絡，或者一個想同青年一齊試的問題，先寫幾句俾我哋就可以。"
              en="If you have a space, expertise, community connection, content platform, youth network or simply a question worth testing with young people, a few lines are enough to start."
            />
          </aside>
        </div>
      </section>
    </>
  );
}
