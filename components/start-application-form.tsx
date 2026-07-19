"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "./i18n";

export function StartApplicationForm() {
  const router = useRouter();
  const { language } = useLanguage();
  const zh = language === "zh";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function start() {
    if (!email || !email.includes("@")) {
      setStatus(zh ? "請輸入有效電郵地址。" : "Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setStatus(zh ? "正在建立安全申請連結…" : "Creating a secure application link…");
    try {
      const response = await fetch("/api/application/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || (zh ? "未能開始申請" : "Unable to start the application"));
      if (result.resumeUrl) {
        localStorage.setItem(`hinfinity:${result.token}:email`, email);
        router.push(result.resumeUrl);
      } else {
        setStatus(zh ? "安全連結已寄到你的電郵。請按連結繼續申請。" : "A secure link has been sent to your email. Use it to continue the application.");
      }
    } catch (error) {
      setStatus(error instanceof Error ? error.message : (zh ? "系統暫時未能處理，請稍後再試。" : "The system is temporarily unavailable. Please try again later."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="field">
        <label htmlFor="apply-email">{zh ? "用電郵開始申請" : "Start with your email"}</label>
        <input id="apply-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" onKeyDown={(event) => { if (event.key === "Enter") start(); }} />
        <small>{zh ? "毋須建立帳戶。Demo 版會將 Draft 儲存在目前瀏覽器；正式接駁 Supabase 及電郵後，才可跨裝置繼續。" : "No account is required. The demo stores the draft in this browser; cross-device continuation will be enabled after Supabase and email are connected."}</small>
      </div>
      <div className="button-row" style={{ marginTop: 18 }}>
        <button className="button button-primary" type="button" onClick={start} disabled={loading}>{loading ? (zh ? "處理中…" : "Working…") : (zh ? "開始 Demo 申請 →" : "Start demo application →")}</button>
      </div>
      <p className="form-status" role="status">{status}</p>
      <p style={{ color: "var(--muted)", fontSize: 13 }}><strong>Demo mode：</strong>{zh ? "未連接 Supabase／Resend 時，系統會直接開啟本機 Draft，並只保存在同一瀏覽器；正式連接後可寄出 Resume Link 並跨裝置繼續。" : "Without Supabase or Resend, the system opens a local draft stored only in this browser. The live version can send a resume link and continue across devices."}</p>
    </div>
  );
}
