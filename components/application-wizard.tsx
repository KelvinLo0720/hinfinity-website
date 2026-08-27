"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "./i18n";
import { applicationConfig } from "@/lib/application-form-config";

type Applicant = {
  chineseName: string;
  englishName: string;
  phone: string;
  email: string;
  institution: string;
  programme: string;
  yearOfStudy: string;
  cvFileName: string;
  cvFileSize: number;
};

type FormData = {
  applicationType: "individual" | "team";
  applicants: Applicant[];
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
  accuracyDeclaration: boolean;
  privacyConsent: boolean;
};

const emptyApplicant = (): Applicant => ({
  chineseName: "",
  englishName: "",
  phone: "",
  email: "",
  institution: "",
  programme: "",
  yearOfStudy: "",
  cvFileName: "",
  cvFileSize: 0
});

const emptyData: FormData = {
  applicationType: "individual",
  applicants: [emptyApplicant()],
  q1: "",
  q2: "",
  q3: "",
  q4: "",
  q5: "",
  q6: "",
  accuracyDeclaration: false,
  privacyConsent: false
};

const steps = [
  ["APPLICATION TYPE", "申請形式"],
  ["ABOUT YOU / YOUR TEAM", "個人／團隊資料"],
  ["CV", "履歷表"],
  ["YOUR VIEW", "你點睇香港文化"],
  ["YOUR IDEA", "你想做啲咩"],
  ["WHY H INFINITY", "你希望得到啲咩"],
  ["REVIEW & SUBMIT", "確認及提交"]
] as const;

function normaliseLoadedData(value: unknown): FormData {
  if (!value || typeof value !== "object") return emptyData;

  const raw = value as Partial<FormData>;
  const applicants =
    Array.isArray(raw.applicants) && raw.applicants.length
      ? raw.applicants.slice(0, applicationConfig.maxTeamSize).map((applicant) => ({
          ...emptyApplicant(),
          ...(applicant || {})
        }))
      : [emptyApplicant()];

  return {
    ...emptyData,
    ...raw,
    applicationType: raw.applicationType === "team" ? "team" : "individual",
    applicants
  };
}

function localReference() {
  const code = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `HI-PREVIEW-${new Date().getFullYear()}-${code}`;
}

export function ApplicationWizard({ token }: { token: string }) {
  const router = useRouter();
  const { language } = useLanguage();
  const zh = language === "zh";
  const t = useCallback((zhText: string, enText: string) => zh ? zhText : enText, [zh]);

  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(emptyData);
  const [status, setStatus] = useState(t("尚未儲存", "Not saved yet"));
  const [submitting, setSubmitting] = useState(false);
  const loaded = useRef(false);

  const storageKey = `hinfinity:draft:${token}`;

  useEffect(() => {
    const local = localStorage.getItem(storageKey);
    const storedEmail = localStorage.getItem(`hinfinity:${token}:email`) || "";

    window.setTimeout(() => {
      if (local) {
        try {
          const parsed = JSON.parse(local);
          setData(normaliseLoadedData(parsed.data));
          setStep(
            Number.isInteger(parsed.step)
              ? Math.min(Math.max(parsed.step, 0), steps.length - 1)
              : 0
          );
          setStatus(t("已從此瀏覽器載入 Draft", "Draft loaded from this browser"));
        } catch {
          setStatus(t("未能載入舊 Draft，已開啟新申請。", "Could not load the old draft. A new application was opened."));
        }
      } else if (storedEmail) {
        setData((previous) => ({
          ...previous,
          applicants: [{ ...previous.applicants[0], email: storedEmail }]
        }));
      }

      loaded.current = true;
    }, 0);
  }, [storageKey, token, t]);

  useEffect(() => {
    if (!loaded.current) return;

    setStatus(t("正在儲存…", "Saving…"));

    const timer = window.setTimeout(() => {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          data,
          step,
          savedAt: new Date().toISOString()
        })
      );

      setStatus(
        `${t("已自動儲存到此瀏覽器", "Auto-saved to this browser")} · ${new Date().toLocaleTimeString(
          zh ? "zh-HK" : "en-GB",
          { hour: "2-digit", minute: "2-digit" }
        )}`
      );
    }, 450);

    return () => window.clearTimeout(timer);
  }, [data, step, storageKey, zh, t]);

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);

  function updateApplicant(index: number, key: keyof Applicant, value: string | number) {
    setData((previous) => ({
      ...previous,
      applicants: previous.applicants.map((applicant, i) =>
        i === index ? { ...applicant, [key]: value } : applicant
      )
    }));
  }

  function setApplicationType(type: "individual" | "team") {
    setData((previous) => ({
      ...previous,
      applicationType: type,
      applicants:
        type === "individual"
          ? [previous.applicants[0] || emptyApplicant()]
          : previous.applicants.length >= applicationConfig.minTeamSize
            ? previous.applicants
            : [...previous.applicants, emptyApplicant()]
    }));
  }

  function addMember() {
    setData((previous) =>
      previous.applicants.length >= applicationConfig.maxTeamSize
        ? previous
        : {
            ...previous,
            applicants: [...previous.applicants, emptyApplicant()]
          }
    );
  }

  function removeMember(index: number) {
    if (index === 0) return;

    setData((previous) => ({
      ...previous,
      applicants: previous.applicants.filter((_, i) => i !== index)
    }));
  }

  function answer(key: "q1" | "q2" | "q3" | "q4" | "q5" | "q6", value: string) {
    setData((previous) => ({ ...previous, [key]: value }));
  }

  function selectCv(index: number, file?: File) {
    if (!file) {
      updateApplicant(index, "cvFileName", "");
      updateApplicant(index, "cvFileSize", 0);
      return;
    }

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setStatus(t("CV 只接受 PDF 格式。", "CV must be a PDF file."));
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      setStatus(t("CV 請控制在 4MB 或以下。", "Please keep the CV at 4MB or below."));
      return;
    }

    updateApplicant(index, "cvFileName", file.name);
    updateApplicant(index, "cvFileSize", file.size);
    setStatus(
      t(
        "已選擇 CV。Frontend preview 只記錄檔名；正式 Notion integration 時先會真正上載。",
        "CV selected. The frontend preview stores the filename only; the file will be uploaded once the Notion integration is connected."
      )
    );
  }

  function applicantIsComplete(applicant: Applicant) {
    return Boolean(
      applicant.chineseName.trim() &&
      applicant.englishName.trim() &&
      applicant.phone.trim() &&
      applicant.email.includes("@") &&
      applicant.institution.trim() &&
      applicant.programme.trim() &&
      applicant.yearOfStudy.trim()
    );
  }

  function validateCurrentStep() {
    if (step === 0) return true;

    if (step === 1) {
      if (
        data.applicationType === "team" &&
        data.applicants.length < applicationConfig.minTeamSize
      ) {
        setStatus(t("團隊申請最少需要 2 人。", "A team application requires at least two people."));
        return false;
      }

      if (!data.applicants.every(applicantIsComplete)) {
        setStatus(t("請完成所有申請者嘅必填基本資料。", "Please complete the required details for every applicant."));
        return false;
      }

      return true;
    }

    if (step === 2) {
      if (!data.applicants.every((applicant) => applicant.cvFileName.trim())) {
        setStatus(t("每位申請者都需要選擇一份 PDF CV。", "Each applicant must select a PDF CV."));
        return false;
      }
      return true;
    }

    if (step === 3 && (!data.q1.trim() || !data.q2.trim())) {
      setStatus(t("請完成 Q1 及 Q2。", "Please complete Q1 and Q2."));
      return false;
    }

    if (step === 4 && (!data.q3.trim() || !data.q4.trim())) {
      setStatus(t("請完成 Q3 及 Q4。", "Please complete Q3 and Q4."));
      return false;
    }

    if (step === 5 && !data.q5.trim()) {
      setStatus(t("請完成 Q5。Q6 為選填。", "Please complete Q5. Q6 is optional."));
      return false;
    }

    return true;
  }

  function next() {
    if (!validateCurrentStep()) return;
    setStep((value) => Math.min(steps.length - 1, value + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function previous() {
    setStep((value) => Math.max(0, value - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function submitPreview() {
    if (!data.accuracyDeclaration || !data.privacyConsent) {
      setStatus(t("請確認資料聲明及私隱同意。", "Please confirm the declaration and privacy consent."));
      return;
    }

    setSubmitting(true);

    const reference = localReference();

    localStorage.setItem(
      `hinfinity:preview-submission:${reference}`,
      JSON.stringify({
        data,
        submittedAt: new Date().toISOString()
      })
    );

    localStorage.removeItem(storageKey);

    window.setTimeout(() => {
      router.push(`/apply/${token}?submitted=${encodeURIComponent(reference)}`);
    }, 350);
  }

  const question = (
    key: "q1" | "q2" | "q3" | "q4" | "q5" | "q6",
    questionIndex: number
  ) => {
    const config = applicationConfig.questions[questionIndex];

    return (
      <div className="field field-full">
        <label htmlFor={key}>
          Q{questionIndex + 1}｜{zh ? config.zh : config.en}
        </label>

        <textarea
          id={key}
          value={data[key]}
          onChange={(event) => answer(key, event.target.value)}
          placeholder={zh ? config.helperZh : config.helperEn}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap"
          }}
        >
          <small>{zh ? config.suggested : config.suggested.replace("建議", "Suggested")}</small>
          <small>{data[key].length} {zh ? "字元" : "characters"}</small>
        </div>
      </div>
    );
  };

  return (
    <div className="application-shell">
      <div className="shell">
        <div className="application-top">
          <div>
            <span className="eyebrow">{applicationConfig.cohortLabel}</span>
            <strong
              style={{
                display: "block",
                color: "var(--navy)",
                fontSize: 20
              }}
            >
              {zh ? `${steps[step][0]} / ${steps[step][1]}` : steps[step][0]}
            </strong>
          </div>

          <div className="form-status" role="status">{status}</div>
        </div>

        <div
          className="application-progress"
          aria-label={`${t("申請進度", "Application progress")} ${Math.round(progress)}%`}
        >
          <span style={{ width: `${progress}%` }} />
        </div>

        <div className="application-card motion-card">
          {step === 0 && (
            <>
              <span className="eyebrow">STEP 01</span>

              <h1>
                {t(
                  "你係自己申請，定同隊友一齊？",
                  "Are you applying individually or as a team?"
                )}
              </h1>

              <p>
                {t(
                  "未有 team 都完全可以申請。團隊申請最多 4 人，第一位會視為組長／主要聯絡人。",
                  "You can absolutely apply without a team. Team applications can include up to four people, with the first applicant treated as the team lead / primary contact."
                )}
              </p>

              <div className="button-row">
                <button
                  type="button"
                  className={`button ${data.applicationType === "individual" ? "button-primary" : ""}`}
                  onClick={() => setApplicationType("individual")}
                >
                  {t("個人申請", "Individual")}
                </button>

                <button
                  type="button"
                  className={`button ${data.applicationType === "team" ? "button-primary" : ""}`}
                  onClick={() => setApplicationType("team")}
                >
                  {t("團隊申請", "Team")}
                </button>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <span className="eyebrow">STEP 02</span>

              <h1>
                {data.applicationType === "team"
                  ? t("介紹你哋。", "Tell us about your team.")
                  : t("首先，認識你。", "First, tell us about yourself.")}
              </h1>

              {data.applicants.map((applicant, index) => (
                <div
                  key={index}
                  className="review-box"
                  style={{ marginBottom: 22 }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 12,
                      alignItems: "center"
                    }}
                  >
                    <strong>
                      {data.applicationType === "team"
                        ? index === 0
                          ? t("組長 / 主要聯絡人", "Team lead / primary contact")
                          : `${t("組員", "Member")} ${index}`
                        : t("申請者", "Applicant")}
                    </strong>

                    {index > 0 && (
                      <button
                        className="text-link"
                        type="button"
                        onClick={() => removeMember(index)}
                      >
                        {t("移除", "Remove")}
                      </button>
                    )}
                  </div>

                  <div className="form-grid" style={{ marginTop: 14 }}>
                    <div className="field">
                      <label>{t("中文全名", "Chinese full name")}</label>
                      <input
                        value={applicant.chineseName}
                        onChange={(e) =>
                          updateApplicant(index, "chineseName", e.target.value)
                        }
                      />
                    </div>

                    <div className="field">
                      <label>{t("英文全名", "English full name")}</label>
                      <input
                        value={applicant.englishName}
                        onChange={(e) =>
                          updateApplicant(index, "englishName", e.target.value)
                        }
                        placeholder="CHAN Tai Man"
                      />
                    </div>

                    <div className="field">
                      <label>{t("流動電話號碼", "Mobile number")}</label>
                      <input
                        value={applicant.phone}
                        onChange={(e) =>
                          updateApplicant(index, "phone", e.target.value)
                        }
                        placeholder="+852"
                      />
                    </div>

                    <div className="field">
                      <label>{t("電郵地址", "Email address")}</label>
                      <input
                        type="email"
                        value={applicant.email}
                        onChange={(e) =>
                          updateApplicant(index, "email", e.target.value)
                        }
                      />
                    </div>

                    <div className="field">
                      <label>{t("院校 / 學校", "Institution / school")}</label>
                      <input
                        value={applicant.institution}
                        onChange={(e) =>
                          updateApplicant(index, "institution", e.target.value)
                        }
                      />
                    </div>

                    <div className="field">
                      <label>
                        {t(
                          "課程 / 學系全稱",
                          "Full programme / department name"
                        )}
                      </label>
                      <input
                        value={applicant.programme}
                        onChange={(e) =>
                          updateApplicant(index, "programme", e.target.value)
                        }
                        placeholder={t(
                          "例如：文學士（比較文學）、BBA (Acc&Fin)",
                          "e.g. BA (Comparative Literature), BBA (Acc&Fin)"
                        )}
                      />
                    </div>

                    <div className="field">
                      <label>{t("就讀年級", "Year of study")}</label>
                      <input
                        value={applicant.yearOfStudy}
                        onChange={(e) =>
                          updateApplicant(index, "yearOfStudy", e.target.value)
                        }
                        placeholder={t("例如：Year 2", "e.g. Year 2")}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {data.applicationType === "team" &&
                data.applicants.length < applicationConfig.maxTeamSize && (
                  <button className="button" type="button" onClick={addMember}>
                    {t("＋ 新增組員", "+ Add team member")}
                  </button>
                )}
            </>
          )}

          {step === 2 && (
            <>
              <span className="eyebrow">STEP 03</span>

              <h1>
                {t(
                  "每位申請者，準備一份 CV。",
                  "Prepare one CV for each applicant."
                )}
              </h1>

              <p>
                {t(
                  "未有文化項目經驗亦完全可以申請。CV 可以包括學習、工作／實習、義工、課外活動、創作或其他項目經驗。",
                  "You do not need prior cultural-project experience. Your CV may include education, work, internships, volunteering, extracurricular activities, creative work or other project experience."
                )}
              </p>

              {data.applicants.map((applicant, index) => (
                <div className="field field-full" key={index}>
                  <label>
                    {data.applicationType === "team"
                      ? index === 0
                        ? t("組長 CV", "Team lead CV")
                        : `${t("組員", "Member")} ${index} CV`
                      : t("CV", "CV")}
                  </label>

                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={(event) =>
                      selectCv(index, event.target.files?.[0])
                    }
                  />

                  <small>
                    {applicant.cvFileName
                      ? `${t("已選擇", "Selected")}: ${applicant.cvFileName}`
                      : t(
                          "PDF only · 建議 4MB 或以下。Frontend preview 暫時只記錄檔名。",
                          "PDF only · recommended max 4MB. The frontend preview stores only the filename for now."
                        )}
                  </small>
                </div>
              ))}
            </>
          )}

          {step === 3 && (
            <>
              <span className="eyebrow">STEP 04</span>
              <h1>{t("你點理解香港文化？", "How do you see Hong Kong culture?")}</h1>
              {question("q1", 0)}
              {question("q2", 1)}
            </>
          )}

          {step === 4 && (
            <>
              <span className="eyebrow">STEP 05</span>
              <h1>{t("未完整，都可以講。", "It is okay if the idea is not complete.")}</h1>
              {question("q3", 2)}
              {question("q4", 3)}
            </>
          )}

          {step === 5 && (
            <>
              <span className="eyebrow">STEP 06</span>
              <h1>
                {t(
                  "你希望 H Infinity 同你一齊做啲咩？",
                  "What do you hope H Infinity can do with you?"
                )}
              </h1>
              {question("q5", 4)}
              {question("q6", 5)}
            </>
          )}

          {step === 6 && (
            <>
              <span className="eyebrow">FINAL REVIEW</span>

              <h1>
                {t(
                  "提交前，再望一次。",
                  "One last look before you submit."
                )}
              </h1>

              <div
                style={{
                  padding: 14,
                  marginBottom: 22,
                  border: "1px solid var(--line)",
                  borderRadius: 14
                }}
              >
                <Localized
                  as="p"
                  zh={<><strong>Frontend Preview：</strong>今次撳 Submit 只會喺你部裝置建立一個測試 snapshot，唔會傳送俾 H Infinity。正式 Notion backend 接駁後先會真正提交。</>}
                  en={<><strong>Frontend Preview:</strong> pressing Submit will only create a local test snapshot on this device. Nothing will be sent to H Infinity until the Notion backend is connected.</>}
                />
              </div>

              <dl className="review-box">
                <dt>{t("申請形式", "Application type")}</dt>
                <dd>
                  {data.applicationType === "team"
                    ? t(
                        `團隊申請（${data.applicants.length} 人）`,
                        `Team (${data.applicants.length} people)`
                      )
                    : t("個人申請", "Individual")}
                </dd>
              </dl>

              {data.applicants.map((applicant, index) => (
                <dl className="review-box" key={index}>
                  <dt>
                    {data.applicationType === "team"
                      ? index === 0
                        ? t("組長", "Team lead")
                        : `${t("組員", "Member")} ${index}`
                      : t("申請者", "Applicant")}
                  </dt>

                  <dd>
                    {applicant.chineseName} / {applicant.englishName}
                    <br />
                    {applicant.phone} · {applicant.email}
                    <br />
                    {applicant.institution}
                    <br />
                    {applicant.programme} · {applicant.yearOfStudy}
                    <br />
                    CV: {applicant.cvFileName}
                  </dd>
                </dl>
              ))}

              {[
                ["Q1", data.q1],
                ["Q2", data.q2],
                ["Q3", data.q3],
                ["Q4", data.q4],
                ["Q5", data.q5],
                ["Q6", data.q6 || t("沒有補充", "No additional note")]
              ].map(([label, value]) => (
                <dl className="review-box" key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </dl>
              ))}

              <label className="checkbox-line">
                <input
                  type="checkbox"
                  checked={data.accuracyDeclaration}
                  onChange={(e) =>
                    setData((previous) => ({
                      ...previous,
                      accuracyDeclaration: e.target.checked
                    }))
                  }
                />

                <span>
                  <strong>{t("必須：", "Required: ")}</strong>
                  {t(
                    "我確認以上提供的資料均屬真實及準確。",
                    "I confirm that the information provided above is true and accurate."
                  )}
                </span>
              </label>

              <label className="checkbox-line">
                <input
                  type="checkbox"
                  checked={data.privacyConsent}
                  onChange={(e) =>
                    setData((previous) => ({
                      ...previous,
                      privacyConsent: e.target.checked
                    }))
                  }
                />

                <span>
                  <strong>{t("必須：", "Required: ")}</strong>
                  {t(
                    "我已閱讀並同意香港籽鷂文化就本次申請、甄選及計劃行政需要使用以上資料。",
                    "I have read and agree that Hong Kong Culture Limited may use the information above for this application, selection and programme administration."
                  )}
                </span>
              </label>
            </>
          )}

          <div className="button-row" style={{ marginTop: 28 }}>
            {step > 0 && (
              <button className="button" type="button" onClick={previous}>
                {t("← 上一步", "← Back")}
              </button>
            )}

            {step < steps.length - 1 && (
              <button
                className="button button-primary"
                type="button"
                onClick={next}
              >
                {t("下一步 →", "Continue →")}
              </button>
            )}

            {step === steps.length - 1 && (
              <button
                className="button button-primary"
                type="button"
                disabled={submitting}
                onClick={submitPreview}
              >
                {submitting
                  ? t("處理中…", "Processing…")
                  : t("測試提交 →", "Preview submit →")}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
