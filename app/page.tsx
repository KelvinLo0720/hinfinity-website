import Image from "next/image";
import Link from "next/link";
import { HandLine } from "@/components/hand-line";
import { PhotoCollage } from "@/components/photo-collage";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { programmeSteps, projects } from "@/lib/content";

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
              <Link className="button button-primary" href="/apply">立即報名 ↗</Link>
              <Link className="button button-light" href="/first-chapter">了解第一屆</Link>
            </div>
            <p className="hero-note">H Infinity｜香港籽鷂文化旗下社會文化實踐計劃</p>
          </div>
          <PhotoCollage />
        </div>
      </section>

      <div className="question-strip" aria-label="青年常見疑問">
        <div className="question-track">
          {[0, 1].map((set) => (
            <div key={set}>
              <span>讀人文，係咪冇出路？</span>
              <span>未有完整計劃，可唔可以開始？</span>
              <span>搞文化，係咪只可以圍爐？</span>
              <span>有熱血，但下一步係咩？</span>
            </div>
          ))}
        </div>
      </div>

      <section className="section">
        <div className="shell problem-grid">
          <Reveal>
            <span className="eyebrow">WHY WE EXIST</span>
            <p className="big-statement">你未需要有<br /><span className="underline">完整答案。</span></p>
            <p>香港有好多關心文化、社區同人文價值嘅青年，但由學校走到真正實踐，中間往往欠缺入口、同行者同可安全試錯嘅空間。</p>
            <Link className="text-link" href="/h-infinity">點解要做 H Infinity →</Link>
          </Reveal>
          <div className="problem-stack">
            {[
              ["01", "有想法，未有方法", "創意唔缺，缺嘅係將問題拆開、測試同落地嘅過程。"],
              ["02", "有熱血，未有入口", "文化同社區實踐嘅資源分散，青年難以接觸導師同跨界網絡。"],
              ["03", "有同路人，仍然圍爐", "只同熟悉嘅人講同一套語言，項目就難以走入更廣闊社群。"],
              ["04", "未完美，所以唔敢開始", "傳統比賽重成果，我哋更重視試錯、重建同真實成長。"]
            ].map(([number, title, copy], index) => (
              <Reveal key={number} delay={index * 0.08}>
                <article className="problem-card">
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
            <p>三日 Bootcamp 只係開始。構思會經歷拆解、碰撞、Pitch、導師支援、測試同實踐，最後再由舊生將經驗帶回下一屆。</p>
          </SectionHeading>
          <HandLine />
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
            <SectionHeading eyebrow="OUR FIRST CHAPTER" title="每個運動，都有第一個章節。">
              <p>H Infinity 暫時完成咗第一屆。網站唔會假裝我哋已有漫長歷史，而係如實記錄第一次嘗試、第一次碰撞，同一個正在形成嘅青年文化生態。</p>
            </SectionHeading>
            <div className="chapter-stats">
              <div className="stat-note"><b>1</b><span>已完成首屆</span></div>
              <div className="stat-note"><b>3</b><span>日 Ideation Bootcamp</span></div>
              <div className="stat-note"><b>2</b><span>輪 Pitching</span></div>
              <div className="stat-note"><b>∞</b><span>舊生回流與延伸可能</span></div>
            </div>
          </Reveal>
          <Reveal className="chapter-photo" delay={0.16}>
            <div className="chapter-photo-main"><Image src="/images/bootcamp-circle.jpg" alt="H Infinity 首屆參加者圍圈交流" fill sizes="(max-width: 900px) 90vw, 580px" /></div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading eyebrow="SELECTED PROJECTS" title="唔只展示結果，亦展示點樣走到呢一步。">
            <p>每個 Case Study 都由問題、轉折、測試、成果與反思組成。以下內容為網站 Demo 文案，之後可換成首屆真實項目資料。</p>
          </SectionHeading>
          <div className="project-grid">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.1}>
                <Link className="project-card" href={`/projects/${project.slug}`}>
                  <div className="project-image">
                    <Image src={project.image} alt={project.title} fill sizes="(max-width: 700px) 90vw, 360px" />
                    <span className="project-tag">{project.category}</span>
                  </div>
                  <div className="project-meta"><span>FIRST CHAPTER</span><span>VIEW CASE ↗</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.question}</p>
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
              <Link className="button button-light" href="/apply">開始 Demo 申請</Link>
              <Link className="button button-dark" href="/contact">接收招募消息</Link>
            </div>
          </Reveal>
          <Reveal className="cta-details" delay={0.14}>
            <dl>
              <div><dt>下一屆</dt><dd>2026 Q4 – 2027 Q3（暫定）</dd></div>
              <div><dt>Bootcamp</dt><dd>聖誕假期期間（暫定）</dd></div>
              <div><dt>適合對象</dt><dd>大專生及 30 歲以下青年</dd></div>
              <div><dt>現階段</dt><dd>網站及招募系統 Demo</dd></div>
            </dl>
          </Reveal>
        </div>
      </section>
    </>
  );
}
