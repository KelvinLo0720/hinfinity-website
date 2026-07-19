"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "./i18n";

type FormData = {
  chineseName: string;
  englishName: string;
  preferredName: string;
  email: string;
  phone: string;
  ageRange: string;
  organisation: string;
  discipline: string;
  journey: string;
  issue: string;
  idea: string;
  support: string;
  collaboration: string;
  commitment: boolean;
  privacyConsent: boolean;
  photoConsent: boolean;
  marketingConsent: boolean;
  portfolioUrl: string;
};

const emptyData: FormData = {
  chineseName: "", englishName: "", preferredName: "", email: "", phone: "", ageRange: "",
  organisation: "", discipline: "", journey: "", issue: "", idea: "", support: "", collaboration: "",
  commitment: false, privacyConsent: false, photoConsent: false, marketingConsent: false, portfolioUrl: ""
};

const steps = [
  ["ABOUT YOU", "關於你"],
  ["YOUR JOURNEY", "你的旅程"],
  ["WHAT YOU CARE ABOUT", "你關心的事"],
  ["YOUR IDEA", "你的初步構思"],
  ["WORKING TOGETHER", "合作與投入"],
  ["CONSENT", "連結、文件與同意"],
  ["REVIEW", "確認及提交"]
] as const;

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
          setData({ ...emptyData, ...(parsed.data || {}) });
          setStep(parsed.step || 0);
          setStatus(t("已從此裝置載入 Draft", "Draft loaded from this device"));
        } catch { /* ignore invalid demo data */ }
      } else if (storedEmail) {
        setData((previous) => ({ ...previous, email: storedEmail }));
      }
      loaded.current = true;
    }, 0);

    if (!token.startsWith("demo_")) {
      fetch(`/api/application/${encodeURIComponent(token)}`)
        .then((response) => response.ok ? response.json() : null)
        .then((result) => {
          if (result?.draft) {
            setData({ ...emptyData, ...(result.draft.draft_data || {}) });
            setStep(result.draft.current_step || 0);
            setStatus(t("已從安全連結載入 Draft", "Draft loaded from secure link"));
          }
        }).catch(() => undefined);
    }
  }, [storageKey, token, t]);

  useEffect(() => {
    if (!loaded.current) return;
    setStatus(t("正在儲存…", "Saving…"));
    const timer = window.setTimeout(async () => {
      localStorage.setItem(storageKey, JSON.stringify({ data, step, savedAt: new Date().toISOString() }));
      if (!token.startsWith("demo_")) {
        try {
          await fetch("/api/application/save", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, data, currentStep: step }) });
        } catch { /* local backup still exists */ }
      }
      setStatus(`${t("已自動儲存", "Auto-saved")} · ${new Date().toLocaleTimeString(zh ? "zh-HK" : "en-GB", { hour: "2-digit", minute: "2-digit" })}`);
    }, 600);
    return () => window.clearTimeout(timer);
  }, [data, step, storageKey, token, zh, t]);

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);
  function update<K extends keyof FormData>(key: K, value: FormData[K]) { setData((previous) => ({ ...previous, [key]: value })); }
  function next() { setStep((value) => Math.min(steps.length - 1, value + 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }
  function previous() { setStep((value) => Math.max(0, value - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }

  async function submit() {
    if (!data.privacyConsent || !data.commitment) {
      setStatus(t("請確認私隱同意及主要活動投入承諾。", "Please confirm the privacy consent and programme commitment."));
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch("/api/application/submit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, data }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || t("提交失敗", "Submission failed"));
      localStorage.removeItem(storageKey);
      router.push(`/apply/${token}?submitted=${encodeURIComponent(result.referenceNumber)}`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : t("提交失敗，請稍後再試。", "Submission failed. Please try again later."));
      setSubmitting(false);
    }
  }

  const field = (key: keyof FormData, labelZh: string, labelEn: string, placeholderZh = "", placeholderEn = "", textarea = false) => (
    <div className="field field-full">
      <label htmlFor={key}>{t(labelZh, labelEn)}</label>
      {textarea ? <textarea id={key} value={String(data[key])} onChange={(event) => update(key, event.target.value as never)} placeholder={t(placeholderZh, placeholderEn)} /> : <input id={key} value={String(data[key])} onChange={(event) => update(key, event.target.value as never)} placeholder={t(placeholderZh, placeholderEn)} />}
    </div>
  );

  return (
    <div className="application-shell">
      <div className="shell">
        <div className="application-top">
          <div><span className="eyebrow">APPLICATION DEMO</span><strong style={{ display: "block", color: "var(--navy)", fontSize: 20 }}>{zh ? `${steps[step][0]} / ${steps[step][1]}` : steps[step][0]}</strong></div>
          <div className="form-status" role="status">{status}</div>
        </div>
        <div className="application-progress" aria-label={`${t("申請進度", "Application progress")} ${Math.round(progress)}%`}><span style={{ width: `${progress}%` }} /></div>
        <div className="application-card motion-card">
          {step === 0 && <><span className="eyebrow">STEP 01</span><h1>{t("首先，認識你。", "First, tell us about yourself.")}</h1><div className="form-grid">
            {field("chineseName", "中文姓名", "Chinese name", "陳大文", "Optional")}
            {field("englishName", "英文姓名", "English name", "CHAN Tai Man", "Your English name")}
            {field("preferredName", "希望我們點稱呼你？", "What should we call you?", "Tai Man", "Preferred name")}
            <div className="field"><label htmlFor="email">{t("電郵", "Email")}</label><input id="email" type="email" value={data.email} onChange={(event) => update("email", event.target.value)} /></div>
            <div className="field"><label htmlFor="phone">{t("電話", "Phone")}</label><input id="phone" value={data.phone} onChange={(event) => update("phone", event.target.value)} /></div>
            <div className="field"><label htmlFor="ageRange">{t("年齡範圍", "Age range")}</label><select id="ageRange" value={data.ageRange} onChange={(event) => update("ageRange", event.target.value)}><option value="">{t("請選擇", "Please select")}</option><option>18–20</option><option>21–24</option><option>25–29</option><option>{t("30 或以上", "30 or above")}</option></select></div>
          </div></>}
          {step === 1 && <><span className="eyebrow">STEP 02</span><h1>{t("你由邊度行到嚟？", "What has shaped your journey?")}</h1><div className="form-grid">
            {field("organisation", "學校／院校／工作機構", "School / institution / workplace", "可填『自由工作者』或『不適用』", "You may enter freelance or not applicable")}
            {field("discipline", "學科／職業／主要興趣", "Discipline / occupation / main interest", "例如：歷史、設計、社福、工程", "For example: history, design, social work, engineering")}
            {field("journey", "有邊段經歷最影響你關心文化或社區？", "Which experience most shaped your interest in culture or community?", "唔需要寫得正式。講一件真實發生過的事。", "It does not need to sound formal. Tell us about something that really happened.", true)}
          </div></>}
          {step === 2 && <><span className="eyebrow">STEP 03</span><h1>{t("你真正關心啲咩？", "What do you genuinely care about?")}</h1>{field("issue", "在香港文化或社區之中，有邊個問題令你一直放唔低？", "Which issue in Hong Kong culture or community stays with you?", "可以係一個地方、一群人、一種被忽略的經驗，或者一個你未有答案的疑問。", "It may be a place, a group of people, an overlooked experience or a question you cannot yet answer.", true)}</>}
          {step === 3 && <><span className="eyebrow">STEP 04</span><h1>{t("未完整，都可以講。", "It is okay if the idea is not complete.")}</h1>{field("idea", "你有冇一個初步構思？", "Do you have an initial idea?", "如果未有完整 Idea，可以寫你想探索的方向。", "If the idea is incomplete, tell us what you want to explore.", true)}{field("support", "你最希望 H Infinity 提供咩支持？", "What support do you most hope to receive from H Infinity?", "例如：導師、團隊、項目方法、測試對象、資源或信心。", "For example: mentors, a team, project methods, test audiences, resources or confidence.", true)}</>}
          {step === 4 && <><span className="eyebrow">STEP 05</span><h1>{t("一齊做，先會真正發生。", "Working together is how ideas become real.")}</h1>{field("collaboration", "當團隊意見唔同，你通常會點處理？", "How do you respond when a team disagrees?", "分享一次真實經驗，或者你希望自己點樣合作。", "Share a real experience or describe how you hope to collaborate.", true)}<label className="checkbox-line"><input type="checkbox" checked={data.commitment} onChange={(event) => update("commitment", event.target.checked)} /><span>{t("我明白計劃包括 Bootcamp、Pitching、導師跟進及實踐階段，並願意盡力投入主要活動。", "I understand that the programme includes the bootcamp, pitching, mentor follow-up and implementation, and I will make a serious effort to attend the main activities.")}</span></label></>}
          {step === 5 && <><span className="eyebrow">STEP 06</span><h1>{t("連結、文件與同意。", "Links, documents and consent.")}</h1>{field("portfolioUrl", "Portfolio／作品／補充連結（選填）", "Portfolio / work / supporting link (optional)", "https://", "https://")}<label className="checkbox-line"><input type="checkbox" checked={data.privacyConsent} onChange={(event) => update("privacyConsent", event.target.checked)} /><span><strong>{t("必須：", "Required: ")}</strong>{t("我同意組織為處理申請、甄選及計劃管理而使用以上資料。", "I agree that the organisation may use the information above to process the application, selection and programme management.")}</span></label><label className="checkbox-line"><input type="checkbox" checked={data.photoConsent} onChange={(event) => update("photoConsent", event.target.checked)} /><span><strong>{t("獨立選項：", "Separate option: ")}</strong>{t("如獲錄取，我原則上同意活動拍攝；正式版本會提供更完整授權範圍及撤回方法。", "If selected, I agree in principle to event photography. The live version will provide a fuller scope and withdrawal process.")}</span></label><label className="checkbox-line"><input type="checkbox" checked={data.marketingConsent} onChange={(event) => update("marketingConsent", event.target.checked)} /><span><strong>{t("獨立選項：", "Separate option: ")}</strong>{t("我願意接收下一屆及相關文化活動消息。", "I would like to receive news about the next cohort and related cultural activities.")}</span></label></>}
          {step === 6 && <><span className="eyebrow">FINAL REVIEW</span><h1>{t("確認後，就踏出第一步。", "Confirm the details and take the first step.")}</h1>{Object.entries({
            [t("姓名", "Name")]: data.chineseName || data.englishName,
            [t("電郵", "Email")]: data.email,
            [t("學科／職業", "Discipline / occupation")]: data.discipline,
            [t("關心議題", "Issue you care about")]: data.issue,
            [t("初步構思", "Initial idea")]: data.idea,
            [t("合作方式", "Collaboration")]: data.collaboration,
            [t("作品連結", "Portfolio link")]: data.portfolioUrl || t("沒有提供", "Not provided")
          }).map(([label, value]) => <dl className="review-box" key={label}><dt>{label}</dt><dd>{value || t("尚未填寫", "Not completed")}</dd></dl>)}<p style={{ color: "var(--muted)" }}>{t("Demo 提交後會產生參考編號。連接 Supabase 後，內容會建立不可變 Submission Snapshot。", "The demo generates a reference number after submission. Once Supabase is connected, the system will create an immutable submission snapshot.")}</p></>}
          <div className="form-actions">
            <button className="button" type="button" onClick={previous} disabled={step === 0}>{t("← 上一步", "← Previous")}</button>
            {step < steps.length - 1 ? <button className="button button-primary" type="button" onClick={next}>{t("儲存並繼續 →", "Save and continue →")}</button> : <button className="button button-orange" type="button" onClick={submit} disabled={submitting}>{submitting ? t("提交中…", "Submitting…") : t("正式提交 Demo", "Submit demo")}</button>}
          </div>
        </div>
      </div>
    </div>
  );
}
