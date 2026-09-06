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
    copyZh: "用設計思維拆解問題，一個念頭變成試得到、講得明嘅構思。",
    copyEn:
      "Use design thinking to unpack the problem and turn a first thought into an idea that can be tested and explained clearly."
  },
  {
    number: "02",
    zh: "連結同路人與跨界導師",
    en: "Connect with peers and cross-sector mentors",
    copyZh:
      "唔使一個人摸索：呢度有班同路人——有帶導賞團嘅、有做媒體嘅、有做文創嘅、有研究歷史嘅，陪你一齊行。",
    copyEn:
      "You do not have to figure everything out alone. Here you will meet fellow travellers—from tour guides and media makers to creative practitioners and history researchers—who can walk alongside you."
  },
  {
    number: "03",
    zh: "安心試錯，在修正中成長",
    en: "Experiment safely, grow through revision",
    copyZh:
      "唔好以完成度決定價值。你可以試錯、被挑戰、推倒重來，再搵到真正行得通嘅方向。",
    copyEn:
      "Your value is not measured by how finished the idea looks. You can experiment, be challenged, start over and keep revising until you find a direction that genuinely works."
  },
  {
    number: "04",
    zh: "由構思走到落地實踐",
    en: "Move from idea to implementation",
    copyZh:
      "透過 Pitching、Mentorship 同實戰測試，將構思帶入社群並持續修正。",
    copyEn:
      "Use pitching, mentorship and hands-on testing to bring the idea into communities and keep improving it."
  }
] as const;

const journeyDescriptions = [
  ["由素未謀面到並肩作戰", "From strangers to working side by side"],
  ["喺實戰中拆解問題關鍵", "Unpack the key problem through practice"],
  ["測試、修正、再建立", "Test, revise and rebuild"],
  ["換位思考，從對方角度開始溝通", "Shift perspective and communicate from the audience’s point of view"],
  ["透過實戰，反覆驗證", "Validate it repeatedly through practice"],
  ["走入社區，持續運作", "Move into the community and keep it going"]
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
                zh="文化倡議 × 青年社群 × 親手實踐"
                en="CULTURAL ACTION × YOUTH COMMUNITY × HANDS-ON PRACTICE"
              />
            </Reveal>

            <Reveal delay={0.08}>
              <Localized
                as="h1"
                zh={
                  <>
                    呢度，
                    <br />
                    <em>有想法</em>
                    <br />
                    就夠。
                  </>
                }
                en={
                  <>
                    Here,
                    <br />
                    <em>an idea</em>
                    <br />
                    is enough.
                  </>
                }
              />
            </Reveal>

            <Reveal delay={0.15}>
              <Localized
                as="p"
                className="hero-sub"
                zh="唔使一份完美 Proposal。由一個你真係關心嘅問題開始，我哋陪你搵同路人、搵方法、搵資源。"
                en="You do not need a perfect proposal. Start with a question you genuinely care about, and we will help you find fellow travellers, methods and resources."
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
                  href="/projects/cohort-01"
                >
                  <Localized
                    zh="了解第一屆"
                    en="Explore our first chapter"
                  />
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
              <Localized
                as="span"
                zh="拆解問題，找到方向"
                en="UNPACK THE PROBLEM"
              />
              <Localized
                as="span"
                zh="結集同伴，請教前輩"
                en="GATHER PEERS, LEARN FROM PRACTITIONERS"
              />
              <Localized
                as="span"
                zh="大膽試錯，小心修正"
                en="TRY BOLDLY, REVISE CAREFULLY"
              />
              <Localized
                as="span"
                zh="由構思到實踐"
                en="MOVE IDEAS INTO PRACTICE"
              />
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
                  我哋一齊
                  <br />
                  <span className="underline">搵答案！</span>
                </>
              }
              en={
                <>
                  Let’s find
                  <br />
                  <span className="underline">the answers together!</span>
                </>
              }
            />

            <Localized
              as="p"
              zh="呢一刻，你唔需要交出一份完美無瑕嘅計劃。"
              en="At this stage, you do not need to present a flawless plan."
            />

            <Localized
              as="p"
              zh="H Infinity 提供一個探索空間，陪你搵同伴、試水溫，將關心社會變成實際行動。"
              en="H Infinity gives you room to explore, find collaborators, test the waters and turn what you care about in society into practical action."
            />

            <Link className="text-link" href="/h-infinity">
              <Localized
                zh="點解要參加 H Infinity →"
                en="Why join H Infinity →"
              />
            </Link>
          </Reveal>

          <div className="problem-stack solution-stack">
            {solutions.map((item, index) => (
              <Reveal key={item.number} delay={index * 0.08}>
                <article className="problem-card solution-card motion-card">
                  <span className="problem-number">{item.number}</span>

                  <div>
                    <Localized as="strong" zh={item.zh} en={item.en} />
                    <Localized
                      as="p"
                      zh={item.copyZh}
                      en={item.copyEn}
                    />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="journey"
        className="section section-blue journey-section"
      >
        <div className="journey-orbit" aria-hidden="true" />

        <div className="shell">
          <SectionHeading
            eyebrow="WHAT HAPPENS HERE"
            title="由一個念頭，到落地成事。"
            titleEn="From a first thought to making it happen."
            intro="透過 H Infinity，參加者會拆解問題、練習 Pitching、建立原型，將構思變成實踐。"
            introEn="Through H Infinity, participants unpack problems, practise pitching, build prototypes and turn ideas into practice."
          />

          <div
            className="journey-route"
            aria-label="H Infinity participant journey"
          >
            {[
              ["相遇", "MEET"],
              ["探索", "EXPLORE"],
              ["建立", "BUILD"],
              ["提倡", "PITCH"],
              ["試驗", "TEST"],
              ["延續", "CONTINUE"]
            ].map(([zh, en], index) => (
              <span className="journey-route-item" key={en}>
                <Localized zh={zh} en={en} />
                {index < 5 ? <i aria-hidden="true">→</i> : null}
              </span>
            ))}
          </div>

          <SnapRail
            className="journey-scroller"
            count={programmeSteps.length}
          >
            {programmeSteps.map((step, index) => (
              <Reveal key={step.n} delay={index * 0.06}>
                <article className="journey-card motion-card">
                  <div className="journey-image">
                    <Image
                      src={step.image}
                      alt={step.zh}
                      fill
                      sizes="280px"
                    />
                  </div>

                  <span>
                    {step.n} / {step.en}
                  </span>

                  <Localized
                    as="h3"
                    zh={step.zh}
                    en={step.enTitle}
                  />

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

      <section
        id="chapter"
        className="section section-navy chapter-section"
      >
        <div className="shell chapter-grid">
          <Reveal>
            <SectionHeading
              eyebrow="OUR FIRST CHAPTER"
              title="第一屆，為推廣文化寫下第一筆。"
              titleEn="The first cohort wrote the opening chapter of putting culture into action."
              intro="我們記錄的，是參加者如何由模糊構思出發，歷經碰撞、修正與實踐，讓項目真正落地。"
              introEn="We document how participants started with rough ideas, moved through challenge, revision and practice, and ultimately brought their projects into reality."
            />

            <div
              className="chapter-summary"
              aria-label="First cohort journey"
            >
              <div>
                <b>01</b>
                <Localized
                  as="span"
                  zh="由問題開始"
                  en="start with a question"
                />
              </div>

              <div>
                <b>02</b>
                <Localized
                  as="span"
                  zh="反覆測試修正"
                  en="test and revise"
                />
              </div>

              <div>
                <b>03</b>
                <Localized
                  as="span"
                  zh="走入真實實踐"
                  en="move into practice"
                />
              </div>

              <div>
                <b>∞</b>
                <Localized
                  as="span"
                  zh="項目繼續行"
                  en="keep it moving"
                />
              </div>
            </div>
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
            title="由一個問題，走到一個真正落地嘅項目。"
            titleEn="From one question to a project that truly takes shape."
            intro="Portfolio 唔只展示最後成果，亦記錄每個團隊點樣觀察、測試、推翻假設，再將構思帶入真實世界。"
            introEn="The portfolio records more than outcomes. It shows how each team observes, tests, challenges assumptions and brings an idea into the real world."
          />

          <SnapRail
            className="project-showcase"
            count={projects.length}
          >
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
                      alt={`H Infinity Cohort ${project.cohort}｜${project.title}`}
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
                    <span className="project-index">
                      0{index + 1}
                    </span>

                    <p className="project-kicker">
                      COHORT {project.cohort} · PROJECT STORY
                    </p>

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
              zh="文化唔應該鎖入夾萬，要活喺人嘅手中。"
              en="Culture should not be locked away. It should stay alive in people’s hands."
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
            <span className="eyebrow">COHORT 02 / APPLICATIONS OPEN</span>

            <Localized
              as="h2"
              zh={
                <>
                  下一個章節，
                  <br />
                  期待你我一同續寫。
                </>
              }
              en={
                <>
                  The next chapter
                  <br />
                  is ours to write together.
                </>
              }
            />

            <Localized
              as="p"
              zh="不限學科背景，亦無需遞交周詳計劃。只要有熱誠，我哋都期待與你相見。"
              en="No specific academic background or detailed plan is required. If you have the passion to try, we look forward to meeting you."
            />

            <div className="button-row">
              <Link
                className="button button-light button-kinetic"
                href="/apply"
              >
                <Localized zh="立即申請" en="Apply now" />
              </Link>

              <Link
                className="button button-dark button-kinetic"
                href="/h-infinity"
              >
                <Localized
                  zh="了解計劃"
                  en="Explore the programme"
                />
              </Link>
            </div>
          </Reveal>

          <Reveal className="cta-details" delay={0.14}>
            <dl>
              <div>
                <Localized
                  as="dt"
                  zh="申請開放"
                  en="Applications open"
                />
                <dd>1 Sep 2026</dd>
              </div>

              <div>
                <Localized
                  as="dt"
                  zh="申請截止"
                  en="Applications close"
                />
                <dd>31 Oct 2026</dd>
              </div>

              <div>
                <Localized
                  as="dt"
                  zh="申請形式"
                  en="Application format"
                />
                <Localized
                  as="dd"
                  zh="個人 / 團隊（2–4 人）"
                  en="Individual / team (2–4 people)"
                />
              </div>

              <div>
                <Localized
                  as="dt"
                  zh="現階段"
                  en="Current stage"
                />
                <Localized
                  as="dd"
                  zh="Cohort 02 現正接受申請"
                  en="Cohort 02 applications are now open"
                />
              </div>
            </dl>
          </Reveal>
        </div>
      </section>
    </>
  );
}
