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
    copyZh: "用設計思維拆解問題，令一個念頭逐步變成可測試、可溝通的構思。",
    copyEn: "Use design thinking to unpack the problem and turn a first thought into an idea that can be tested and communicated."
  },
  {
    number: "02",
    zh: "連結同路人與跨界導師",
    en: "Connect with peers and cross-sector mentors",
    copyZh: "唔需要一個人摸索；你會遇見來自不同背景的同行者、文化工作者與實踐者。",
    copyEn: "You do not have to figure everything out alone. Meet peers, cultural practitioners and people from different fields."
  },
  {
    number: "03",
    zh: "在安全空間測試與修正",
    en: "Test, fail and rebuild in a safe space",
    copyZh: "唔以完成度決定價值，容許試錯、被挑戰、重建，再找出真正可行的方向。",
    copyEn: "Your value is not measured by how finished the idea looks. Experiment, be challenged, rebuild and find what truly works."
  },
  {
    number: "04",
    zh: "由 Bootcamp 走到社區實踐",
    en: "Move from bootcamp to community action",
    copyZh: "透過 Pitching、Mentorship 與種子支援，將構思帶入真實社群並持續落地。",
    copyEn: "Use pitching, mentorship and seed support to bring the idea into real communities and keep it moving."
  }
] as const;

const journeyDescriptions = [
  ["由陌生人變成同行者", "Turn strangers into fellow travellers"],
  ["在過程中拆開真正問題", "Unpack the real problem through the process"],
  ["快速測試、修正與再建立", "Test quickly, revise and rebuild"],
  ["用不同語言向不同受眾溝通", "Communicate with different audiences"],
  ["由導師與同儕陪伴落地", "Move forward with mentors and peers"],
  ["把構思帶入真實社群", "Bring the idea into a real community"]
] as const;

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-energy-grid" aria-hidden="true" />
        <div className="shell hero-grid">
          <div className="hero-copy">
            <Reveal>
              <Localized as="span" className="hero-kicker" zh="文化倡議 × 青年社群 × 真實實踐" en="CULTURAL ACTION × YOUTH COMMUNITY × REAL PRACTICE" />
            </Reveal>
            <Reveal delay={0.08}>
              <Localized
                as="h1"
                zh={<>呢度，<br /><em>有想法</em><br />就夠。</>}
                en={<>Here,<br /><em>an idea</em><br />is enough.</>}
              />
            </Reveal>
            <Reveal delay={0.15}>
              <Localized
                as="p"
                className="hero-sub"
                zh="唔需要一份完美 Proposal。由一個你真正關心嘅問題開始，我哋陪你連結同路人、方法同資源。"
                en="You do not need a perfect proposal. Start with a question you genuinely care about, and we will connect you with people, methods and resources."
              />
            </Reveal>
            <Reveal delay={0.22}>
              <div className="button-row">
                <Link className="button button-primary button-kinetic" href="/apply"><Localized zh="預覽 Demo 申請 ↗" en="Preview demo application ↗" /></Link>
                <Link className="button button-light button-kinetic" href="/first-chapter"><Localized zh="了解第一屆" en="Explore our first chapter" /></Link>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <Localized as="p" className="hero-note" zh="H Infinity｜香港籽鷂文化旗下社會文化實踐計劃" en="H Infinity｜A social and cultural practice programme by Hong Kong Culture Limited" />
            </Reveal>
            <span className="hero-sticker" aria-hidden="true">IDEAS<br />IN MOTION</span>
          </div>
          <PhotoCollage />
        </div>
      </section>

      <MobileSectionNav />

      <div className="solution-strip" aria-label="H Infinity support">
        <div className="solution-track">
          {[0, 1].map((set) => (
            <div key={set}>
              <Localized as="span" zh="拆解問題，找到方向" en="UNPACK THE PROBLEM" />
              <Localized as="span" zh="連結同路人與跨界導師" en="CONNECT ACROSS FIELDS" />
              <Localized as="span" zh="安全試錯，反覆修正" en="TEST, FAIL, REBUILD" />
              <Localized as="span" zh="由構思走到社區實踐" en="MOVE IDEAS INTO ACTION" />
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
              zh={<>你未需要有<br /><span className="underline">完整答案。</span></>}
              en={<>You do not need<br /><span className="underline">a complete answer.</span></>}
            />
            <Localized
              as="p"
              zh="H Infinity 唔係要你一開始就交出完美方案，而係提供一條由探索、協作到落地的路，陪你將關心變成行動。"
              en="H Infinity does not ask for a perfect solution on day one. We offer a pathway from exploration and collaboration to implementation, helping you turn what you care about into action."
            />
            <Link className="text-link" href="/h-infinity"><Localized zh="點解要參加 H Infinity →" en="Why join H Infinity →" /></Link>
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
            intro="三日 Bootcamp 只係起點。參加者會拆解問題、建立原型、練習 Pitch、接受導師挑戰，再將構思帶入真實社群測試與實踐。"
            introEn="The three-day bootcamp is only the starting point. Participants unpack problems, build prototypes, practise pitching, respond to mentor challenges and test their ideas in real communities."
          />
          <div className="journey-route" aria-label="H Infinity participant journey">
            {[['遇見','MEET'],['探索','EXPLORE'],['建立','BUILD'],['溝通','PITCH'],['實踐','LAUNCH'],['回流','RETURN']].map(([zh, en], index) => (
              <span className="journey-route-item" key={en}><Localized zh={zh} en={en} />{index < 5 ? <i aria-hidden="true">→</i> : null}</span>
            ))}
          </div>
          <SnapRail className="journey-scroller" count={programmeSteps.length}>
            {programmeSteps.map((step, index) => (
              <Reveal key={step.n} delay={index * 0.06}>
                <article className="journey-card motion-card">
                  <div className="journey-image"><Image src={step.image} alt={step.zh} fill sizes="280px" /></div>
                  <span>{step.n} / {step.en}</span>
                  <Localized as="h3" zh={step.zh} en={step.enTitle} />
                  <Localized as="p" zh={journeyDescriptions[index][0]} en={journeyDescriptions[index][1]} />
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
              title="第一屆，唔係句號；係文化行動開始形成。"
              titleEn="The first cohort was not a full stop. It was the moment a cultural practice community began to take shape."
              intro="我哋記錄嘅唔只係三日活動，而係參加者點樣由模糊構思出發，經歷碰撞、修正與實踐，再將經驗帶返下一屆。"
              introEn="We are documenting more than a three-day event: how participants moved from vague ideas through challenge, revision and practice, and how that experience can return to support the next cohort."
            />
            <div className="chapter-summary" aria-label="First cohort information">
              <div><b>1</b><Localized as="span" zh="已完成首屆" en="first cohort completed" /></div>
              <div><b>3</b><Localized as="span" zh="日 Ideation Bootcamp" en="day ideation bootcamp" /></div>
              <div><b>2</b><Localized as="span" zh="輪 Pitching" en="rounds of pitching" /></div>
              <div><b>∞</b><Localized as="span" zh="舊生回流與延伸可能" en="possibilities for alumni return" /></div>
            </div>
          </Reveal>
          <Reveal className="chapter-photo" delay={0.16}>
            <div className="chapter-photo-main motion-card"><Image src="/images/bootcamp-circle.jpg" alt="H Infinity 首屆參加者圍圈交流" fill sizes="(max-width: 900px) 90vw, 580px" /></div>
            <span className="chapter-stamp" aria-hidden="true">FIRST<br />CHAPTER</span>
          </Reveal>
        </div>
      </section>

      <section id="projects" className="section projects-section">
        <div className="shell">
          <SectionHeading
            eyebrow="SELECTED PROJECTS"
            title="由一個問題，走到一個真正發生嘅項目。"
            titleEn="From one question to a project that actually happens."
            intro="Portfolio 唔只展示最後成果，亦會記錄每個團隊點樣觀察、測試、推翻假設，再將構思帶入社群。"
            introEn="The portfolio records more than outcomes. It shows how each team observes, tests, challenges assumptions and brings an idea into the community."
          />
          <SnapRail className="project-showcase" count={projects.length}>
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.08}>
                <Link className={`project-feature motion-card ${index % 2 ? "project-feature-reverse" : ""}`} href={`/projects/${project.slug}`}>
                  <div className="project-feature-image">
                    <Image src={project.image} alt={project.title} fill sizes="(max-width: 760px) 92vw, 560px" />
                    <Localized as="span" className="project-tag" zh={project.category} en={project.categoryEn} />
                  </div>
                  <div className="project-feature-copy">
                    <span className="project-index">0{index + 1}</span>
                    <p className="project-kicker">FIRST CHAPTER · CASE STUDY</p>
                    <Localized as="h3" zh={project.title} en={project.englishTitle} />
                    <Localized as="p" zh={project.question} en={project.questionEn} />
                    <Localized as="span" className="project-link" zh="閱讀項目故事 ↗" en="Read the project story ↗" />
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
            <Localized as="p" className="quote-text" zh="三日，可以改變好多事。唔只係項目，仲有自己。" en="Three days can change a lot—not only the project, but the way you see yourself." />
            <Localized as="span" className="quote-person" zh="— 第一屆參加者（Demo 引言）" en="— First cohort participant (demo quote)" />
          </Reveal>
          <Reveal className="quote-photo" delay={0.12}>
            <figure className="motion-card"><Image src="/images/participant-pitch.jpg" alt="參加者分享構思" fill sizes="(max-width: 700px) 90vw, 460px" /></figure>
          </Reveal>
        </div>
      </section>

      <section id="next" className="section cta-band">
        <div className="shell cta-grid">
          <Reveal>
            <span className="eyebrow">NEXT COHORT</span>
            <Localized as="h2" zh={<>下一個章節，<br />等緊你一齊寫。</>} en={<>The next chapter<br />is waiting for you.</>} />
            <Localized as="p" zh="不限學科，亦唔需要預先準備完整計劃。你只需要帶住一個真正關心嘅問題，同願意同行嘅心。" en="No specific discipline and no complete plan required. Bring a question you genuinely care about and a willingness to work with others." />
            <div className="button-row">
              <Link className="button button-light button-kinetic" href="/apply"><Localized zh="預覽 Demo 申請" en="Preview demo application" /></Link>
              <Link className="button button-dark button-kinetic" href="/contact"><Localized zh="接收招募消息" en="Get recruitment updates" /></Link>
            </div>
          </Reveal>
          <Reveal className="cta-details" delay={0.14}>
            <dl>
              <div><Localized as="dt" zh="下一屆" en="Next cohort" /><dd>2026 Q4 – 2027 Q3 <Localized zh="（暫定）" en="(tentative)" /></dd></div>
              <div><dt>Bootcamp</dt><Localized as="dd" zh="聖誕假期期間（暫定）" en="Christmas holiday period (tentative)" /></div>
              <div><Localized as="dt" zh="適合對象" en="For" /><Localized as="dd" zh="大專生及 30 歲以下青年" en="Tertiary students and youth under 30" /></div>
              <div><Localized as="dt" zh="現階段" en="Current stage" /><Localized as="dd" zh="招募準備中" en="Recruitment in preparation" /></div>
            </dl>
          </Reveal>
        </div>
      </section>
    </>
  );
}
