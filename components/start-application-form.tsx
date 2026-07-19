"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function StartApplicationForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function start() {
    if (!email || !email.includes("@")) {
      setStatus("請輸入有效電郵地址。");
      return;
    }
    setLoading(true);
    setStatus("正在建立安全申請連結…");
    try {
      const response = await fetch("/api/application/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "未能開始申請");
      if (result.resumeUrl) {
        localStorage.setItem(`hinfinity:${result.token}:email`, email);
        router.push(result.resumeUrl);
      } else {
        setStatus("安全連結已寄到你的電郵。請按連結繼續申請。");
      }
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "系統暫時未能處理，請稍後再試。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="field">
        <label htmlFor="apply-email">用電郵開始申請</label>
        <input id="apply-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" onKeyDown={(event) => { if (event.key === "Enter") start(); }} />
        <small>毋須建立帳戶。系統會用安全連結識別你的 Draft，並可在其他裝置繼續。</small>
      </div>
      <div className="button-row" style={{ marginTop: 18 }}>
        <button className="button button-primary" type="button" onClick={start} disabled={loading}>{loading ? "處理中…" : "開始 Demo 申請 →"}</button>
      </div>
      <p className="form-status" role="status">{status}</p>
      <p style={{ color: "var(--muted)", fontSize: 13 }}><strong>Demo mode：</strong>未連接 Supabase／Resend 時，系統會直接開啟本機 Draft；連接後則可改為寄出 Resume Link。</p>
    </div>
  );
}
