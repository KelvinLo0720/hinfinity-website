"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

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
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(emptyData);
  const [status, setStatus] = useState("尚未儲存");
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
          setStatus("已從此裝置載入 Draft");
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
            setStatus("已從安全連結載入 Draft");
          }
        }).catch(() => undefined);
    }
  }, [storageKey, token]);

  useEffect(() => {
    if (!loaded.current) return;
    setStatus("正在儲存…");
    const timer = window.setTimeout(async () => {
      localStorage.setItem(storageKey, JSON.stringify({ data, step, savedAt: new Date().toISOString() }));
      if (!token.startsWith("demo_")) {
        try {
          await fetch("/api/application/save", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, data, currentStep: step }) });
        } catch { /* local backup still exists */ }
      }
      setStatus(`已自動儲存 · ${new Date().toLocaleTimeString("zh-HK", { hour: "2-digit", minute: "2-digit" })}`);
    }, 600);
    return () => window.clearTimeout(timer);
  }, [data, step, storageKey, token]);

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);
  function update<K extends keyof FormData>(key: K, value: FormData[K]) { setData((previous) => ({ ...previous, [key]: value })); }
  function next() { setStep((value) => Math.min(steps.length - 1, value + 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }
  function previous() { setStep((value) => Math.max(0, value - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }

  async function submit() {
    if (!data.privacyConsent || !data.commitment) {
      setStatus("請確認私隱同意及主要活動投入承諾。");
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch("/api/application/submit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, data }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "提交失敗");
      localStorage.removeItem(storageKey);
      router.push(`/apply/${token}?submitted=${encodeURIComponent(result.referenceNumber)}`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "提交失敗，請稍後再試。");
      setSubmitting(false);
    }
  }

  const field = (key: keyof FormData, label: string, placeholder = "", textarea = false) => (
    <div className="field field-full">
      <label htmlFor={key}>{label}</label>
      {textarea ? <textarea id={key} value={String(data[key])} onChange={(event) => update(key, event.target.value as never)} placeholder={placeholder} /> : <input id={key} value={String(data[key])} onChange={(event) => update(key, event.target.value as never)} placeholder={placeholder} />}
    </div>
  );

  return (
    <div className="application-shell">
      <div className="shell">
        <div className="application-top">
          <div><span className="eyebrow">APPLICATION DEMO</span><strong style={{ display: "block", color: "var(--navy)", fontSize: 20 }}>{steps[step][0]} / {steps[step][1]}</strong></div>
          <div className="form-status" role="status">{status}</div>
        </div>
        <div className="application-progress" aria-label={`申請進度 ${Math.round(progress)}%`}><span style={{ width: `${progress}%` }} /></div>
        <div className="application-card">
          {step === 0 && <><span className="eyebrow">STEP 01</span><h1>首先，認識你。</h1><div className="form-grid">{field("chineseName", "中文姓名", "陳大文")} {field("englishName", "英文姓名", "CHAN Tai Man")} {field("preferredName", "希望我們點稱呼你？", "Tai Man")}<div className="field"><label htmlFor="email">電郵</label><input id="email" type="email" value={data.email} onChange={(event) => update("email", event.target.value)} /></div><div className="field"><label htmlFor="phone">電話</label><input id="phone" value={data.phone} onChange={(event) => update("phone", event.target.value)} /></div><div className="field"><label htmlFor="ageRange">年齡範圍</label><select id="ageRange" value={data.ageRange} onChange={(event) => update("ageRange", event.target.value)}><option value="">請選擇</option><option>18–20</option><option>21–24</option><option>25–29</option><option>30 或以上</option></select></div></div></>}
          {step === 1 && <><span className="eyebrow">STEP 02</span><h1>你由邊度行到嚟？</h1><div className="form-grid">{field("organisation", "學校／院校／工作機構", "可填『自由工作者』或『不適用』")} {field("discipline", "學科／職業／主要興趣", "例如：歷史、設計、社福、工程")} {field("journey", "有邊段經歷最影響你關心文化或社區？", "唔需要寫得正式。講一件真實發生過的事。", true)}</div></>}
          {step === 2 && <><span className="eyebrow">STEP 03</span><h1>你真正關心啲咩？</h1>{field("issue", "在香港文化或社區之中，有邊個問題令你一直放唔低？", "可以係一個地方、一群人、一種被忽略的經驗，或者一個你未有答案的疑問。", true)}</>}
          {step === 3 && <><span className="eyebrow">STEP 04</span><h1>未完整，都可以講。</h1>{field("idea", "你有冇一個初步構思？", "如果未有完整 Idea，可以寫你想探索的方向。", true)}{field("support", "你最希望 H Infinity 提供咩支持？", "例如：導師、團隊、項目方法、測試對象、資源或信心。", true)}</>}
          {step === 4 && <><span className="eyebrow">STEP 05</span><h1>一齊做，先會真正發生。</h1>{field("collaboration", "當團隊意見唔同，你通常會點處理？", "分享一次真實經驗，或者你希望自己點樣合作。", true)}<label className="checkbox-line"><input type="checkbox" checked={data.commitment} onChange={(event) => update("commitment", event.target.checked)} /><span>我明白計劃包括 Bootcamp、Pitching、導師跟進及實踐階段，並願意盡力投入主要活動。</span></label></>}
          {step === 5 && <><span className="eyebrow">STEP 06</span><h1>連結、文件與同意。</h1>{field("portfolioUrl", "Portfolio／作品／補充連結（選填）", "https://")}<label className="checkbox-line"><input type="checkbox" checked={data.privacyConsent} onChange={(event) => update("privacyConsent", event.target.checked)} /><span><strong>必須：</strong>我同意組織為處理申請、甄選及計劃管理而使用以上資料。</span></label><label className="checkbox-line"><input type="checkbox" checked={data.photoConsent} onChange={(event) => update("photoConsent", event.target.checked)} /><span><strong>獨立選項：</strong>如獲錄取，我原則上同意活動拍攝；正式版本會提供更完整授權範圍及撤回方法。</span></label><label className="checkbox-line"><input type="checkbox" checked={data.marketingConsent} onChange={(event) => update("marketingConsent", event.target.checked)} /><span><strong>獨立選項：</strong>我願意接收下一屆及相關文化活動消息。</span></label></>}
          {step === 6 && <><span className="eyebrow">FINAL REVIEW</span><h1>確認後，就踏出第一步。</h1>{Object.entries({ "姓名": data.chineseName || data.englishName, "電郵": data.email, "學科／職業": data.discipline, "關心議題": data.issue, "初步構思": data.idea, "合作方式": data.collaboration, "作品連結": data.portfolioUrl || "沒有提供" }).map(([label, value]) => <dl className="review-box" key={label}><dt>{label}</dt><dd>{value || "尚未填寫"}</dd></dl>)}<p style={{ color: "var(--muted)" }}>Demo 提交後會產生參考編號。連接 Supabase 後，內容會建立不可變 Submission Snapshot。</p></>}
          <div className="form-actions">
            <button className="button" type="button" onClick={previous} disabled={step === 0}>← 上一步</button>
            {step < steps.length - 1 ? <button className="button button-primary" type="button" onClick={next}>儲存並繼續 →</button> : <button className="button button-orange" type="button" onClick={submit} disabled={submitting}>{submitting ? "提交中…" : "正式提交 Demo"}</button>}
          </div>
        </div>
      </div>
    </div>
  );
}
