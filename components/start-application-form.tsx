"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "./i18n";

function createFrontendToken() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `preview_${crypto.randomUUID().replaceAll("-", "")}`;
  }

  return `preview_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

export function StartApplicationForm() {
  const router = useRouter();
  const { language } = useLanguage();
  const zh = language === "zh";

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  function start() {
    const normalisedEmail = email.trim().toLowerCase();

    if (!normalisedEmail || !normalisedEmail.includes("@")) {
      setStatus(zh ? "請輸入有效電郵地址。" : "Please enter a valid email address.");
      return;
    }

    const token = createFrontendToken();

    localStorage.setItem(`hinfinity:${token}:email`, normalisedEmail);
    localStorage.setItem(
      "hinfinity:last-application",
      JSON.stringify({
        token,
        email: normalisedEmail,
        startedAt: new Date().toISOString()
      })
    );

    router.push(`/apply/${token}`);
  }

  function resumeLast() {
    try {
      const value = localStorage.getItem("hinfinity:last-application");
      if (!value) {
        setStatus(
          zh
            ? "呢個瀏覽器暫時未有已開始嘅申請。"
            : "No previous application was found in this browser."
        );
        return;
      }

      const parsed = JSON.parse(value);
      if (!parsed?.token) throw new Error("Invalid draft");
      router.push(`/apply/${parsed.token}`);
    } catch {
      setStatus(
        zh
          ? "未能載入之前嘅申請 Draft。"
          : "Unable to load the previous draft."
      );
    }
  }

  return (
    <div>
      <div className="field">
        <label htmlFor="apply-email">{zh ? "主要聯絡電郵" : "Primary contact email"}</label>
        <input
          id="apply-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@example.com"
          onKeyDown={(event) => {
            if (event.key === "Enter") start();
          }}
        />
        <small>
          {zh
            ? "團隊申請請先填組長／主要聯絡人電郵。現階段 Draft 只會保存在同一瀏覽器。"
            : "For team applications, start with the team lead / primary contact email. At this stage, drafts are stored only in this browser."}
        </small>
      </div>

      <div className="button-row" style={{ marginTop: 18 }}>
        <button className="button button-primary" type="button" onClick={start}>
          {zh ? "開始申請 →" : "Start application →"}
        </button>

        <button className="button" type="button" onClick={resumeLast}>
          {zh ? "繼續此瀏覽器上次 Draft" : "Resume last draft on this browser"}
        </button>
      </div>

      <p className="form-status" role="status">{status}</p>
    </div>
  );
}
