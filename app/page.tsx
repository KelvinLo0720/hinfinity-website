import Image from "next/image";
import Link from "next/link";
import { PhotoCollage } from "@/components/photo-collage";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { programmeSteps, projects } from "@/lib/content";

const solutions = [
  ["01", "由模糊想法變成清晰方向", "用設計思維拆解問題，令一個念頭逐步變成可測試、可溝通的構思。"],
  ["02", "連結同路人與跨界導師", "唔需要一個人摸索；你會遇見來自不同背景的同行者、文化工作者與實踐者。"],
  ["03", "在安全空間測試與修正", "唔以完成度決定價值，容許試錯、被挑戰、重建，再找出真正可行的方向。"],
  ["04", "由 Bootcamp 走到社區實踐", "透過 Pitching、Mentorship 與種子支援，將構思帶入真實社群並持續落地。"]
] as const;

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <span className="hero-kicker">文化倡議 × 青年社群 × 真實實踐</span>
            <h1>呢度，<br /><em>有想法</em><br />就夠。</h1>
            <p className="hero-sub">唔需要一份完美 Proposal。由一個你真正關心嘅問題開始，我哋陪你連結同路人、方法同資源。</p>
            <div className="button-row">
              <Link className="button button-primary" href="/apply">預覽 Demo 申請 ↗</Link>
              <Link className="button button-light" href="/first-chapter">了解第一屆</Link>
            </div>
            <p className="hero-note">H Infinity｜香港籽鷂文化旗下社會文化實踐計劃</p>
          </div>
          <PhotoCollage />
        </div>
      </section>

      <div className="solution-strip" aria-label="H Infinity 提供的支援">
        <div className="solution-track">
          {[0, 1].map((set) => (
            <div key={set}>
              <span>拆解問題，找到方向</span>
              <span>連結同路人與跨界導師</span>
              <span>安全試錯，反覆修正</span>
              <span>由構思走到社區實踐</span>
            </div>
          ))}
        </div>
      </div>

      <section className="section">
        <div className="shell problem-grid">
          <Reveal>
            <span className="eyebrow">HOW WE SUPPORT YOU</span>
            <p className="big-statement">你未需要有<br /><span className="underline">完整答案。</span></p>
            <p>H Infinity 唔係要你一開始就交出完美方案，而係提供一條由探索、協作到落地的路，陪你將關心變成行動。</p>
            <Link className="text-link" href="/h-infinity">點解要參加 H Infinity →</Link>
          </Reveal>
          <div className="problem-stack solution-stack">
            {solutions.map(([number, title, copy], index) => (
              <Reveal key={number} delay={index * 0.08}>
                <article className="problem-card solution-card">
                  <span className="problem-number">{number}</span>
                  <div><strong>{title}</strong><p>{copy}</p></div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-blue">
        <div className="shell">
          <SectionHeading eyebrow="WHAT HAPPENS HERE" title="由遇見，到真正發生。">
            <p>三日 Bootcamp 只係起點。參加者會拆解問題、建立原型、練習 Pitch、接受導師挑戰，再將構思帶入真實社群測試與實踐。</p>
          </SectionHeading>
          <div className="journey-route" aria-label="H Infinity 參加者歷程">
            <span>遇見</span><i>→</i><span>探索</span><i>→</i><span>建立</span><i>→</i><span>溝通</span><i>→</i><span>實踐</span><i>→</i><span>回流</span>
          </div>
          <div className="journey-scroller">
            {programmeSteps.map((step, index) => (
              <Reveal key={step.n} delay={index * 0.06}>
                <article className="journey-card">
                  <div className="journey-image"><Image src={step.image} alt={step.zh} fill sizes="280px" /></div>
                  <span>{step.n} / {step.en}</span>
                  <h3>{step.zh}</h3>
                  <p>{index === 0 ? "由陌生人變成同行者" : index === 5 ? "把構思帶入真實社群" : "在過程中測試、修正與成長"}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-navy">
        <div className="shell chapter-grid">
          <Reveal>
            <SectionHeading eyebrow="OUR FIRST CHAPTER" title="第一屆，係一個持續發生嘅開始。">
              <p>H Infinity 已完成首屆。我哋想記錄嘅唔只係三日活動，而係參加者點樣由模糊構思出發，經歷碰撞、修正與實踐，再將經驗帶返下一屆。</p>
            </SectionHeading>
            <div className="chapter-summary" aria-label="首屆項目資料">
              <div><b>1</b><span>已完成首屆</span></div>
              <div><b>3</b><span>日 Ideation Bootcamp</span></div>
              <div><b>2</b><span>輪 Pitching</span></div>
              <div><b>∞</b><span>舊生回流與延伸可能</span></div>
            </div>
          </Reveal>
          <Reveal className="chapter-photo" delay={0.16}>
            <div className="chapter-photo-main"><Image src="/images/bootcamp-circle.jpg" alt="H Infinity 首屆參加者圍圈交流" fill sizes="(max-width: 900px) 90vw, 580px" /></div>
          </Reveal>
        </div>
      </section>

      <section className="section projects-section">
        <div className="shell">
          <SectionHeading eyebrow="SELECTED PROJECTS" title="由一個問題，走到一個真正發生嘅項目。">
            <p>Portfolio 唔只展示最後成果，亦會記錄每個團隊點樣觀察、測試、推翻假設，再將構思帶入社群。</p>
          </SectionHeading>
          <div className="project-showcase">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.08}>
                <Link className={`project-feature ${index % 2 ? "project-feature-reverse" : ""}`} href={`/projects/${project.slug}`}>
                  <div className="project-feature-image">
                    <Image src={project.image} alt={project.title} fill sizes="(max-width: 760px) 92vw, 560px" />
                    <span className="project-tag">{project.category}</span>
                  </div>
                  <div className="project-feature-copy">
                    <span className="project-index">0{index + 1}</span>
                    <p className="project-kicker">FIRST CHAPTER · CASE STUDY</p>
                    <h3>{project.title}</h3>
                    <p>{project.question}</p>
                    <span className="project-link">閱讀項目故事 ↗</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section quote-section">
        <div className="shell quote-grid">
          <Reveal>
            <div className="quote-mark">“</div>
            <p className="quote-text">三日，可以改變好多事。唔只係項目，仲有自己。</p>
            <span className="quote-person">— 第一屆參加者（Demo 引言）</span>
          </Reveal>
          <Reveal className="quote-photo" delay={0.12}>
            <figure><Image src="/images/participant-pitch.jpg" alt="參加者分享構思" fill sizes="(max-width: 700px) 90vw, 460px" /></figure>
          </Reveal>
        </div>
      </section>

      <section className="section cta-band">
        <div className="shell cta-grid">
          <Reveal>
            <span className="eyebrow">NEXT COHORT</span>
            <h2>下一個章節，<br />等緊你一齊寫。</h2>
            <p>不限學科，亦唔需要預先準備完整計劃。你只需要帶住一個真正關心嘅問題，同願意同行嘅心。</p>
            <div className="button-row">
              <Link className="button button-light" href="/apply">預覽 Demo 申請</Link>
              <Link className="button button-dark" href="/contact">接收招募消息</Link>
            </div>
          </Reveal>
          <Reveal className="cta-details" delay={0.14}>
            <dl>
              <div><dt>下一屆</dt><dd>2026 Q4 – 2027 Q3（暫定）</dd></div>
              <div><dt>Bootcamp</dt><dd>聖誕假期期間（暫定）</dd></div>
              <div><dt>適合對象</dt><dd>大專生及 30 歲以下青年</dd></div>
              <div><dt>現階段</dt><dd>招募準備中</dd></div>
            </dl>
          </Reveal>
        </div>
      </section>
    </>
  );
}
