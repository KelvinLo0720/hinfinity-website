import Image from "next/image";
import Link from "next/link";
import { Localized } from "@/components/i18n";
import { PhotoCollage } from "@/components/photo-collage";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { MobileSectionNav } from "@/components/mobile-section-nav";
import { SnapRail } from "@/components/snap-rail";
import { programmeSteps, projects } from "@/lib/content";

const solutions = [
  {
    number: "01",
    zh: "由模糊想法變成清晰方向",
    en: "Turn a vague idea into a clear direction",
    copyZh: "拆開真正問題，令一個念頭逐步變成可測試、可溝通的構思。",
    copyEn: "Unpack the real problem and turn a first thought into an idea that can be tested and communicated."
  },
  {
    number: "02",
    zh: "連結同路人與跨界導師",
    en: "Connect with peers and cross-sector mentors",
    copyZh: "唔需要一個人摸索；你會遇見唔同背景的同行者同實踐者。",
    copyEn: "You do not have to figure everything out alone. Meet peers and practitioners from different backgrounds."
  },
  {
    number: "03",
    zh: "安全試錯，反覆修正",
    en: "Test, fail and rebuild",
    copyZh: "構思可以被挑戰、推翻、重建，再搵到真正值得做的方向。",
    copyEn: "Ideas can be challenged, discarded and rebuilt until a direction becomes worth pursuing."
  },
  {
    number: "04",
    zh: "由構思走到真實實踐",
    en: "Move ideas into practice",
    copyZh: "將構思帶入真實地方、受眾與社群，再根據回應繼續改。",
    copyEn: "Bring the idea into real places, audiences and communities, then keep revising in response."
  }
] as const;

const journeyDescriptions = [
  ["由陌生人變成同行者", "Turn strangers into fellow travellers"],
  ["在過程中拆開真正問題", "Unpack the real problem through the process"],
  ["快速測試、修正與再建立", "Test quickly, revise and rebuild"],
  ["用清楚語言向不同人溝通", "Communicate clearly with different audiences"],
  ["帶入真實情境測試", "Test in real situations"],
  ["令項目繼續行落去", "Keep the project moving"]
] as const;

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-energy-grid" aria-hidden="true" />

        <div className="shell hero-grid">
          <div className="hero-copy">
            <Reveal>
              <Localized
                as="span"
                className="hero-kicker"
                zh="青年 × 香港文化 × 社區實踐"
                en="YOUTH × HONG KONG CULTURE × REAL PRACTICE"
              />
            </Reveal>

            <Reveal delay={0.08}>
              <Localized
                as="h1"
                zh={
                  <>
                    你未需要
                    <br />
                    <em>有答案。</em>
                  </>
                }
                en={
                  <>
                    You do not need
                    <br />
                    <em>all the answers.</em>
                  </>
                }
              />
            </Reveal>

            <Reveal delay={0.15}>
              <Localized
                as="p"
                className="hero-sub"
                zh="由一樣你真正關心嘅事開始。H Infinity 陪你由「我有感覺」，走到「我真係做咗一件事」。"
                en="Start with something you genuinely care about. H Infinity helps you move from “I care about this” to “I actually made something happen.”"
              />
            </Reveal>

            <Reveal delay={0.22}>
              <div className="button-row">
                <Link
                  className="button button-primary button-kinetic"
                  href="/apply"
                >
                  <Localized zh="立即申請 ↗" en="Apply now ↗" />
                </Link>

                <Link
                  className="button button-light button-kinetic"
                  href="/first-chapter"
                >
                  <Localized zh="睇第一屆" en="Explore our first chapter" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <Localized
                as="p"
                className="hero-note"
                zh="H Infinity｜香港籽鷂文化旗下社會文化實踐計劃"
                en="H Infinity｜A social and cultural practice programme by Hong Kong Culture Limited"
              />
            </Reveal>

            <span className="hero-sticker" aria-hidden="true">
              IDEAS
              <br />
              IN MOTION
            </span>
          </div>

          <PhotoCollage />
        </div>
      </section>

      <MobileSectionNav />

      <div className="solution-strip" aria-label="H Infinity support">
        <div className="solution-track">
          {[0, 1].map((set) => (
            <div key={set}>
              <Localized as="span" zh="拆開問題，找到方向" en="UNPACK THE PROBLEM" />
              <Localized as="span" zh="連結同路人與跨界導師" en="CONNECT ACROSS FIELDS" />
              <Localized as="span" zh="安全試錯，反覆修正" en="TEST, FAIL, REBUILD" />
              <Localized as="span" zh="由構思走到真實實踐" en="MOVE IDEAS INTO ACTION" />
            </div>
          ))}
        </div>
      </div>

      <section id="support" className="section solution-section">
        <div className="shell problem-grid">
          <Reveal>
            <span className="eyebrow">HOW WE SUPPORT YOU</span>

            <Localized
              as="p"
              className="big-statement"
              zh={
                <>
                  文化唔只屬於
                  <br />
                  <span className="underline">「文化人」。</span>
                </>
              }
              en={
                <>
                  Culture does not belong
                  <br />
                  <span className="underline">only to “culture people”.</span>
                </>
              }
            />

            <Localized
              as="p"
              zh="你未需要有完整 Proposal、team 或答案。由一個真問題開始，再一路做、一路試、一路改。"
              en="You do not need a complete proposal, team or answer. Start with a real question, then build, test and revise."
            />

            <Link className="text-link" href="/h-infinity">
              <Localized zh="了解 H Infinity →" en="Explore H Infinity →" />
            </Link>
          </Reveal>

          <div className="problem-stack solution-stack">
            {solutions.map((item, index) => (
              <Reveal key={item.number} delay={index * 0.08}>
                <article className="problem-card solution-card motion-card">
                  <span className="problem-number">{item.number}</span>
                  <div>
                    <Localized as="strong" zh={item.zh} en={item.en} />
                    <Localized as="p" zh={item.copyZh} en={item.copyEn} />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="journey" className="section section-blue journey-section">
        <div className="journey-orbit" aria-hidden="true" />

        <div className="shell">
          <SectionHeading
            eyebrow="WHAT HAPPENS HERE"
            title="由遇見，到真正發生。"
            titleEn="From meeting each other to making something real."
            intro="H Infinity 唔係一場 lecture series。參加者會拆問題、建立原型、接受挑戰、測試，再將構思帶入真實情境。"
            introEn="H Infinity is not a lecture series. Participants unpack problems, build prototypes, respond to challenge, test and bring ideas into real situations."
          />

          <SnapRail className="journey-scroller" count={programmeSteps.length}>
            {programmeSteps.map((step, index) => (
              <Reveal key={step.n} delay={index * 0.06}>
                <article className="journey-card motion-card">
                  <div className="journey-image">
                    <Image src={step.image} alt={step.zh} fill sizes="280px" />
                  </div>
                  <span>
                    {step.n} / {step.en}
                  </span>
                  <Localized as="h3" zh={step.zh} en={step.enTitle} />
                  <Localized
                    as="p"
                    zh={journeyDescriptions[index][0]}
                    en={journeyDescriptions[index][1]}
                  />
                </article>
              </Reveal>
            ))}
          </SnapRail>
        </div>
      </section>

      <section id="chapter" className="section section-navy chapter-section">
        <div className="shell chapter-grid">
          <Reveal>
            <SectionHeading
              eyebrow="OUR FIRST CHAPTER"
              title="第一屆，唔係句號。"
              titleEn="The first cohort was not a full stop."
              intro="首屆項目有啲繼續做、有啲轉方向。真正重要嘅係：一班青年由『有感覺』開始，真係行出第一步。"
              introEn="Some first-cohort projects continued, while others changed direction. What matters is that young people moved from caring about something to taking a real first step."
            />

            <Link className="text-link" href="/first-chapter">
              <Localized zh="睇第一屆項目同過程 →" en="Explore the first cohort →" />
            </Link>
          </Reveal>

          <Reveal className="chapter-photo" delay={0.16}>
            <div className="chapter-photo-main motion-card">
              <Image
                src="/images/bootcamp-circle.jpg"
                alt="H Infinity 首屆參加者交流"
                fill
                sizes="(max-width: 900px) 90vw, 580px"
              />
            </div>

            <span className="chapter-stamp" aria-hidden="true">
              FIRST
              <br />
              CHAPTER
            </span>
          </Reveal>
        </div>
      </section>

      <section id="projects" className="section projects-section">
        <div className="shell">
          <SectionHeading
            eyebrow="SELECTED PROJECTS"
            title="一個問題，可以變成好多種做法。"
            titleEn="One question can become many forms of practice."
            intro="由遊戲、地方文化保存、歷史步行到桌遊，首屆項目用唔同方法將香港文化帶入真實世界。"
            introEn="From games and local cultural preservation to historical walking experiences and board games, first-cohort projects brought Hong Kong culture into practice in different ways."
          />

          <SnapRail className="project-showcase" count={projects.length}>
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.08}>
                <Link
                  className={`project-feature motion-card ${
                    index % 2 ? "project-feature-reverse" : ""
                  }`}
                  href={`/projects/${project.slug}`}
                >
                  <div className="project-feature-image">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 760px) 92vw, 560px"
                    />

                    <Localized
                      as="span"
                      className="project-tag"
                      zh={project.category}
                      en={project.categoryEn}
                    />
                  </div>

                  <div className="project-feature-copy">
                    <span className="project-index">0{index + 1}</span>
                    <p className="project-kicker">COHORT 01 · PROJECT STORY</p>

                    <Localized
                      as="h3"
                      zh={project.title}
                      en={project.englishTitle}
                    />

                    <Localized
                      as="p"
                      zh={project.question}
                      en={project.questionEn}
                    />

                    <Localized
                      as="span"
                      className="project-link"
                      zh="閱讀項目故事 ↗"
                      en="Read the project story ↗"
                    />
                  </div>
                </Link>
              </Reveal>
            ))}
          </SnapRail>
        </div>
      </section>

      <section className="section quote-section">
        <div className="shell quote-grid">
          <Reveal>
            <div className="quote-mark">“</div>

            <Localized
              as="p"
              className="quote-text"
              zh="文化唔只係一樣要被保存嘅嘢，而係一樣要有人繼續做落去嘅嘢。"
              en="Culture is not only something to preserve. It continues when people keep doing it."
            />

            <Localized
              as="span"
              className="quote-person"
              zh="— H Infinity"
              en="— H Infinity"
            />
          </Reveal>

          <Reveal className="quote-photo" delay={0.12}>
            <figure className="motion-card">
              <Image
                src="/images/participant-pitch.jpg"
                alt="H Infinity 參加者分享構思"
                fill
                sizes="(max-width: 700px) 90vw, 460px"
              />
            </figure>
          </Reveal>
        </div>
      </section>

      <section id="next" className="section cta-band">
        <div className="shell cta-grid">
          <Reveal>
            <span className="eyebrow">COHORT 02</span>

            <Localized
              as="h2"
              zh={
                <>
                  下一個章節，
                  <br />
                  等緊你一齊寫。
                </>
              }
              en={
                <>
                  The next chapter
                  <br />
                  is waiting for you.
                </>
              }
            />

            <Localized
              as="p"
              zh="你未需要有答案。你甚至未需要有一隊人。由一樣你真正關心嘅事開始。"
              en="You do not need all the answers. You do not even need a team yet. Start with something you genuinely care about."
            />
          </Reveal>

          <Reveal delay={0.12}>
            <div className="button-row">
              <Link className="button button-primary" href="/apply">
                <Localized zh="立即申請 ↗" en="Apply now ↗" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
