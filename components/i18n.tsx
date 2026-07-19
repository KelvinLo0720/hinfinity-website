"use client";

import type { ElementType, ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Language = "zh" | "en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("zh");

  useEffect(() => {
    const saved = window.localStorage.getItem("hinfinity:language");
    if (saved === "en" || saved === "zh") window.setTimeout(() => setLanguageState(saved), 0);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-HK" : "en";
    document.documentElement.dataset.language = language;
  }, [language]);

  function setLanguage(next: Language) {
    setLanguageState(next);
    window.localStorage.setItem("hinfinity:language", next);
  }

  const value = useMemo(() => ({ language, setLanguage }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used inside LanguageProvider");
  return value;
}

export function Localized<T extends ElementType = "span">({
  zh,
  en,
  as,
  className
}: {
  zh: ReactNode;
  en: ReactNode;
  as?: T;
  className?: string;
}) {
  const { language } = useLanguage();
  const Component = (as || "span") as ElementType;
  return <Component className={className}>{language === "zh" ? zh : en}</Component>;
}

export function LanguageSwitch({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage } = useLanguage();
  return (
    <div className={`language-switch ${compact ? "language-switch--compact" : ""}`} aria-label="Language switcher">
      <button type="button" className={language === "zh" ? "is-active" : ""} onClick={() => setLanguage("zh")} aria-pressed={language === "zh"}>中</button>
      <span aria-hidden="true">/</span>
      <button type="button" className={language === "en" ? "is-active" : ""} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button>
    </div>
  );
}
