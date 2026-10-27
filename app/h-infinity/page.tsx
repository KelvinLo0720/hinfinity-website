                    className={`${styles.featureCard} motion-card`}
                  >
                    <span
                      className={
                        styles.featureNumber
                      }
                    >
                      {feature.n}
                    </span>

                    <Localized
                      as="h3"
                      zh={feature.titleZh}
                      en={feature.titleEn}
                    />

                    <Localized
                      as="p"
                      zh={feature.copyZh}
                      en={feature.copyEn}
                    />
                  </article>
                </Reveal>
              )
            )}
          </div>
        </div>
      </section>

      <section className={styles.fitSection}>
        <div
          className={`shell ${styles.fitGrid}`}
        >
          <Reveal>
            <div className={styles.fitCopy}>
              <span className={styles.eyebrow}>
                WHO IS IT FOR?
              </span>

              <Localized
                as="h2"
                zh={
                  <>
                    未齊人、未有 Proposal，
                    <br />
                    <em>都可以開始。</em>
                  </>
                }
                en={
                  <>
                    No team yet? No proposal?
                    <br />
                    <em>You can still start.</em>
                  </>
                }
              />

              <Localized
                as="p"
                zh="只要你關心香港文化、社區，或者各種社會議題，並願意認真投入時間去研究、測試同實踐，就已經有一個好嘅起點。"
                en="If you care about Hong Kong culture, communities or wider social issues, and are ready to invest real time in research, testing and practice, you already have a strong starting point."
              />

              <div className={styles.fitTags}>
                <Localized
                  as="span"
                  zh="未有正式工作經驗？可以。"
                  en="No formal work experience? Fine."
                />

                <Localized
                  as="span"
                  zh="唔係讀文社科？可以。"
                  en="Not studying arts or social sciences? Fine."
                />

                <Localized
                  as="span"
                  zh="未有現成團隊？可以。"
                  en="No existing team? Fine."
                />

                <Localized
                  as="span"
                  zh="未有完整計劃書？可以。"
                  en="No complete proposal? Fine."
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <aside
              className={`${styles.startCard} motion-card`}
            >
              <span>START HERE</span>

              <Localized
                as="h3"
                zh="由一樣你好在意、唔想睇住佢消失嘅事開始。"
                en="Start with something you care about and do not want to see disappear."
              />

              <Localized
                as="p"
                zh="你未需要有所有答案。重要嘅係，你願唔願意落手做、接受挑戰，再一路修正。"
                en="You do not need all the answers. What matters is whether you are willing to make something, be challenged and keep revising."
              />

              <div className="button-row">
                <Link
                  className="button button-primary"
                  href="/apply"
                >
                  <Localized
                    zh="立即申請 ↗"
                    en="Apply now ↗"
                  />
                </Link>

                <Link
                  className="button"
                  href="/projects/cohort-01"
                >
                  <Localized
                    zh="睇首屆項目"
                    en="See Cohort 01 projects"
                  />
