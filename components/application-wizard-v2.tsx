"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { useRouter } from "next/navigation";
import { applicationConfig } from "@/lib/application-form-config";
import {
  institutionOptions,
  interviewTimePreferenceOptions,
  yearOfStudyOptions
} from "@/lib/application-options";
import { useLanguage } from "./i18n";

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
  interviewTimePreference: string[];
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
  accuracyDeclaration: boolean;
  privacyConsent: boolean;
};

type FieldErrors = Record<string, string>;

type UploadedCv = {
  index: number;
  id: string;
  filename: string;
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
  interviewTimePreference: [],
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
  ["INTERVIEW AVAILABILITY", "面試時段偏好"],
  ["REVIEW & SUBMIT", "確認及提交"]
] as const;

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    value.trim()
  );
}

function validPhone(value: string) {
  const trimmed = value.trim();

  if (!/^\+?[\d\s()-]+$/.test(trimmed)) {
    return false;
  }

  const digitCount =
    (trimmed.match(/\d/g) || []).length;

  return digitCount >= 8 && digitCount <= 15;
}

function normaliseLoadedData(
  value: unknown
): FormData {
  if (!value || typeof value !== "object") {
    return emptyData;
  }

  const raw = value as Partial<FormData>;

  const applicants =
    Array.isArray(raw.applicants) &&
    raw.applicants.length
      ? raw.applicants
          .slice(
            0,
            applicationConfig.maxTeamSize
          )
          .map((applicant) => {
            const merged = {
              ...emptyApplicant(),
              ...(applicant || {}),
              cvFileName: "",
              cvFileSize: 0
            };

            if (
              !institutionOptions.includes(
                merged.institution as any
              )
            ) {
              merged.institution = "";
            }

            if (
              !yearOfStudyOptions.includes(
                merged.yearOfStudy as any
              )
            ) {
              merged.yearOfStudy = "";
            }

            return merged;
          })
      : [emptyApplicant()];

  const preferences =
    Array.isArray(
      raw.interviewTimePreference
    )
      ? raw.interviewTimePreference.filter(
          (value): value is string =>
            interviewTimePreferenceOptions.includes(
              value as any
            )
        )
      : [];

  return {
    ...emptyData,
    ...raw,
    applicationType:
      raw.applicationType === "team"
        ? "team"
        : "individual",
    applicants,
    interviewTimePreference: preferences
  };
}

async function readApiResponse(
  response: Response
): Promise<any> {
  const text = await response.text();

  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    return {
      error:
        response.status === 413
          ? "檔案大小超出系統可處理範圍。請確認每份 CV 為 4MB 或以下。"
          : text
    };
  }
}

export function ApplicationWizardV2({
  token
}: {
  token: string;
}) {
  const router = useRouter();
  const { language } = useLanguage();
  const zh = language === "zh";

  const t = useCallback(
    (zhText: string, enText: string) =>
      zh ? zhText : enText,
    [zh]
  );

  const [step, setStep] = useState(0);
  const [data, setData] =
    useState<FormData>(emptyData);
  const [status, setStatus] = useState(
    t("尚未儲存", "Not saved yet")
  );
  const [submitting, setSubmitting] =
    useState(false);
  const [cvFiles, setCvFiles] = useState<
    Record<number, File>
  >({});
  const [fieldErrors, setFieldErrors] =
    useState<FieldErrors>({});

  const loaded = useRef(false);
  const storageKey = `hinfinity:draft:${token}`;

  useEffect(() => {
    const local =
      localStorage.getItem(storageKey);
    const storedEmail =
      localStorage.getItem(
        `hinfinity:${token}:email`
      ) || "";

    window.setTimeout(() => {
      if (local) {
        try {
          const parsed = JSON.parse(local);

          setData(
            normaliseLoadedData(parsed.data)
          );

          setStep(
            Number.isInteger(parsed.step)
              ? Math.min(
                  Math.max(parsed.step, 0),
                  steps.length - 1
                )
              : 0
          );

          setStatus(
            t(
              "已從此瀏覽器載入 Draft",
              "Draft loaded from this browser"
            )
          );
        } catch {
          setStatus(
            t(
              "未能載入舊 Draft，已開啟新申請。",
              "Could not load the old draft. A new application was opened."
            )
          );
        }
      } else if (storedEmail) {
        setData((previous) => ({
          ...previous,
          applicants: [
            {
              ...previous.applicants[0],
              email: storedEmail
            }
          ]
        }));
      }

      loaded.current = true;
    }, 0);
  }, [storageKey, token, t]);

  useEffect(() => {
    if (!loaded.current) return;

    setStatus(
      t("正在儲存…", "Saving…")
    );

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
        `${t(
          "已自動儲存到此瀏覽器",
          "Auto-saved to this browser"
        )} · ${new Date().toLocaleTimeString(
          zh ? "zh-HK" : "en-GB",
          {
            hour: "2-digit",
            minute: "2-digit"
          }
        )}`
      );
    }, 450);

    return () =>
      window.clearTimeout(timer);
  }, [data, step, storageKey, zh, t]);

  const progress = useMemo(
    () =>
      ((step + 1) / steps.length) * 100,
    [step]
  );

  function fieldKey(
    index: number,
    key: keyof Applicant
  ) {
    return `applicant-${index}-${key}`;
  }

  function clearFieldError(key: string) {
    setFieldErrors((previous) => {
      if (!previous[key]) return previous;

      const next = { ...previous };
      delete next[key];
      return next;
    });
  }

  function updateApplicant(
    index: number,
    key: keyof Applicant,
    value: string | number
  ) {
    setData((previous) => ({
      ...previous,
      applicants: previous.applicants.map(
        (applicant, i) =>
          i === index
            ? {
                ...applicant,
                [key]: value
              }
            : applicant
      )
    }));

    clearFieldError(fieldKey(index, key));
  }

  function setApplicationType(
    type: "individual" | "team"
  ) {
    setData((previous) => ({
      ...previous,
      applicationType: type,
      applicants:
        type === "individual"
          ? [
              previous.applicants[0] ||
                emptyApplicant()
            ]
          : previous.applicants.length >=
              applicationConfig.minTeamSize
            ? previous.applicants
            : [
                ...previous.applicants,
                emptyApplicant()
              ]
    }));

    if (type === "individual") {
      setCvFiles(
        (previous): Record<number, File> => {
          const first = previous[0];

          return first
            ? { 0: first }
            : {};
        }
      );
    }

    setFieldErrors({});
  }

  function addMember() {
    setData((previous) =>
      previous.applicants.length >=
      applicationConfig.maxTeamSize
        ? previous
        : {
            ...previous,
            applicants: [
              ...previous.applicants,
              emptyApplicant()
            ]
          }
    );
  }

  function removeMember(index: number) {
    if (index === 0) return;

    setData((previous) => ({
      ...previous,
      applicants:
        previous.applicants.filter(
          (_, i) => i !== index
        )
    }));

    setCvFiles((previous) => {
      const next: Record<number, File> = {};

      Object.entries(previous).forEach(
        ([key, file]) => {
          const oldIndex = Number(key);

          if (oldIndex < index) {
            next[oldIndex] = file;
          }

          if (oldIndex > index) {
            next[oldIndex - 1] = file;
          }
        }
      );

      return next;
    });

    setFieldErrors({});
  }

  function answer(
    key:
      | "q1"
      | "q2"
      | "q3"
      | "q4"
      | "q5"
      | "q6",
    value: string
  ) {
    setData((previous) => ({
      ...previous,
      [key]: value
    }));
  }

  function selectCv(
    index: number,
    file?: File
  ) {
    if (!file) {
      setCvFiles((previous) => {
        const next = { ...previous };
        delete next[index];
        return next;
      });

      updateApplicant(
        index,
        "cvFileName",
        ""
      );
      updateApplicant(
        index,
        "cvFileSize",
        0
      );
      return;
    }

    if (
      file.type !== "application/pdf" ||
      !file.name.toLowerCase().endsWith(
        ".pdf"
      )
    ) {
      setStatus(
        t(
          "CV 只接受 PDF 格式。",
          "CV must be a PDF file."
        )
      );
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      setStatus(
        t(
          "CV 請控制在 4MB 或以下。",
          "Please keep the CV at 4MB or below."
        )
      );
      return;
    }

    setCvFiles((previous) => ({
      ...previous,
      [index]: file
    }));

    updateApplicant(
      index,
      "cvFileName",
      file.name
    );
    updateApplicant(
      index,
      "cvFileSize",
      file.size
    );

    setStatus(
      t(
        "CV 已準備好，正式提交時會逐份安全上載。",
        "CV ready. Files will be uploaded individually when you submit."
      )
    );
  }

  function toggleInterviewPreference(
    value: string
  ) {
    setData((previous) => {
      const current =
        previous.interviewTimePreference;

      if (value === "Flexible") {
        return {
          ...previous,
          interviewTimePreference:
            current.includes("Flexible")
              ? []
              : ["Flexible"]
        };
      }

      const withoutFlexible =
        current.filter(
          (item) => item !== "Flexible"
        );

      return {
        ...previous,
        interviewTimePreference:
          withoutFlexible.includes(value)
            ? withoutFlexible.filter(
                (item) => item !== value
              )
            : [...withoutFlexible, value]
      };
    });

    clearFieldError(
      "interviewTimePreference"
    );
  }

  function preferenceLabel(
    value: string
  ) {
    const labels: Record<
      string,
      [string, string]
    > = {
      "Weekday Daytime": [
        "平日日間",
        "Weekday daytime"
      ],
      "Weekday Evening": [
        "平日晚上",
        "Weekday evening"
      ],
      "Weekend Daytime": [
        "週末日間",
        "Weekend daytime"
      ],
      "Weekend Evening": [
        "週末晚上",
        "Weekend evening"
      ],
      Flexible: [
        "時間較彈性／沒有特定偏好",
        "Flexible / no specific preference"
      ]
    };

    return t(
      labels[value]?.[0] || value,
      labels[value]?.[1] || value
    );
  }

  function validateApplicantStep() {
    const errors: FieldErrors = {};

    data.applicants.forEach(
      (applicant, index) => {
        const role =
          data.applicationType === "team"
            ? index === 0
              ? t(
                  "組長",
                  "Team lead"
                )
              : `${t(
                  "組員",
                  "Member"
                )} ${index}`
            : t(
                "申請者",
                "Applicant"
              );

        if (!applicant.chineseName.trim()) {
          errors[
            fieldKey(
              index,
              "chineseName"
            )
          ] = t(
            `${role}：請填寫中文全名`,
            `${role}: enter Chinese full name`
          );
        }

        if (!applicant.englishName.trim()) {
          errors[
            fieldKey(
              index,
              "englishName"
            )
          ] = t(
            `${role}：請填寫英文全名`,
            `${role}: enter English full name`
          );
        }

        if (!validPhone(applicant.phone)) {
          errors[
            fieldKey(index, "phone")
          ] = t(
            `${role}：請輸入有效電話號碼`,
            `${role}: enter a valid phone number`
          );
        }

        if (!validEmail(applicant.email)) {
          errors[
            fieldKey(index, "email")
          ] = t(
            `${role}：請輸入有效電郵地址`,
            `${role}: enter a valid email address`
          );
        }

        if (
          !institutionOptions.includes(
            applicant.institution as any
          )
        ) {
          errors[
            fieldKey(
              index,
              "institution"
            )
          ] = t(
            `${role}：請從名單選擇院校`,
            `${role}: select an institution`
          );
        }

        if (!applicant.programme.trim()) {
          errors[
            fieldKey(
              index,
              "programme"
            )
          ] = t(
            `${role}：請填寫課程／學系全稱`,
            `${role}: enter full programme / department name`
          );
        }

        if (
          !yearOfStudyOptions.includes(
            applicant.yearOfStudy as any
          )
        ) {
          errors[
            fieldKey(
              index,
              "yearOfStudy"
            )
          ] = t(
            `${role}：請選擇就讀年級`,
            `${role}: select year of study`
          );
        }
      }
    );

    setFieldErrors(errors);

    const firstError =
      Object.keys(errors)[0];

    if (firstError) {
      setStatus(errors[firstError]);

      window.setTimeout(() => {
        document
          .getElementById(firstError)
          ?.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
      }, 0);

      return false;
    }

    return true;
  }

  function validateInterviewPreference() {
    if (data.interviewTimePreference.length > 0) {
      clearFieldError("interviewTimePreference");
      return true;
    }

    const message = t(
      "請選擇至少一個較方便的面試時段。",
      "Please select at least one preferred interview time."
    );

    setFieldErrors((previous) => ({
      ...previous,
      interviewTimePreference: message
    }));
    setStatus(message);

    window.setTimeout(() => {
      document
        .getElementById("interviewTimePreference")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
    }, 0);

    return false;
  }

  function validateCurrentStep() {
    if (step === 0) return true;

    if (step === 1) {
      if (
        data.applicationType === "team" &&
        data.applicants.length <
          applicationConfig.minTeamSize
      ) {
        setStatus(
          t(
            "團隊申請最少需要 2 人。",
            "A team application requires at least two people."
          )
        );
        return false;
      }

      return validateApplicantStep();
    }

    if (step === 2) {
      const allFilesSelected =
        data.applicants.every(
          (_, index) =>
            Boolean(cvFiles[index])
        );

      if (
        !allFilesSelected &&
        !applicationConfig.testMode
      ) {
        setStatus(
          t(
            "每位申請者都需要選擇一份 PDF CV。",
            "Each applicant must select a PDF CV."
          )
        );
        return false;
      }

      return true;
    }

    if (
      step === 3 &&
      (!data.q1.trim() ||
        !data.q2.trim())
    ) {
      setStatus(
        t(
          "請完成 Q1 及 Q2。",
          "Please complete Q1 and Q2."
        )
      );
      return false;
    }

    if (
      step === 4 &&
      (!data.q3.trim() ||
        !data.q4.trim())
    ) {
      setStatus(
        t(
          "請完成 Q3 及 Q4。",
          "Please complete Q3 and Q4."
        )
      );
      return false;
    }

    if (
      step === 5 &&
      !data.q5.trim()
    ) {
      setStatus(
        t(
          "請完成 Q5。Q6 為選填。",
          "Please complete Q5. Q6 is optional."
        )
      );
      return false;
    }

    if (step === 6) {
      return validateInterviewPreference();
    }

    return true;
  }

  function next() {
    if (!validateCurrentStep()) return;

    setStep((value) =>
      Math.min(
        steps.length - 1,
        value + 1
      )
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  function previous() {
    setStep((value) =>
      Math.max(0, value - 1)
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  async function uploadCv(
    index: number
  ): Promise<UploadedCv | null> {
    const file = cvFiles[index];

    if (!file) {
      return null;
    }

    const applicant =
      data.applicants[index];

    const role =
      data.applicationType === "team"
        ? index === 0
          ? "Lead"
          : `Member${index}`
        : "Applicant";

    const form = new FormData();
    form.append("file", file, file.name);
    form.append("role", role);
    form.append(
      "applicantName",
      applicant.englishName ||
        applicant.chineseName
    );

    const response = await fetch(
      "/api/application/upload-cv",
      {
        method: "POST",
        body: form
      }
    );

    const result =
      await readApiResponse(response);

    if (!response.ok) {
      throw new Error(
        result.error ||
          t(
            "CV 上載失敗。",
            "CV upload failed."
          )
      );
    }

    return {
      index,
      id: result.uploadId,
      filename: result.filename
    };
  }

  async function submitApplication() {
    if (
      !data.accuracyDeclaration ||
      !data.privacyConsent
    ) {
      setStatus(
        t(
          "請確認資料聲明及私隱同意。",
          "Please confirm the declaration and privacy consent."
        )
      );
      return;
    }

    if (!validateApplicantStep()) {
      setStep(1);
      return;
    }

    if (!validateInterviewPreference()) {
      setStep(6);
      return;
    }

    if (
      !applicationConfig.testMode &&
      !data.applicants.every(
        (_, index) =>
          Boolean(cvFiles[index])
      )
    ) {
      setStatus(
        t(
          "每位申請者都需要選擇 CV 先可以提交。",
          "Each applicant must select their CV before submission."
        )
      );
      setStep(2);
      return;
    }

    setSubmitting(true);

    try {
      const cvUploads: UploadedCv[] =
        [];

      for (
        let index = 0;
        index < data.applicants.length;
        index += 1
      ) {
        if (!cvFiles[index]) continue;

        setStatus(
          t(
            `正在上載 CV ${
              index + 1
            } / ${
              data.applicants.length
            }…`,
            `Uploading CV ${
              index + 1
            } / ${
              data.applicants.length
            }…`
          )
        );

        const uploaded =
          await uploadCv(index);

        if (uploaded) {
          cvUploads.push(uploaded);
        }
      }

      setStatus(
        t(
          "CV 已上載，正在提交申請…",
          "CVs uploaded. Submitting application…"
        )
      );

      const response = await fetch(
        "/api/application/submit",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            payload: data,
            cvUploads
          })
        }
      );

      const result =
        await readApiResponse(response);

      if (!response.ok) {
        throw new Error(
          result.error ||
            t(
              "提交失敗。",
              "Submission failed."
            )
        );
      }

      localStorage.removeItem(storageKey);
      localStorage.removeItem(
        "hinfinity:last-application"
      );

      router.push(
        `/apply/${token}?submitted=${encodeURIComponent(
          result.referenceNumber
        )}`
      );
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : t(
              "提交失敗，請稍後再試。",
              "Submission failed. Please try again later."
            )
      );

      setSubmitting(false);
    }
  }

  function errorStyle(key: string) {
    return fieldErrors[key]
      ? {
          borderColor: "var(--orange)"
        }
      : undefined;
  }

  function renderError(key: string) {
    const message = fieldErrors[key];

    if (!message) return null;

    return (
      <small
        style={{
          color: "var(--orange)",
          fontWeight: 800
        }}
      >
        {message}
      </small>
    );
  }

  function question(
    key:
      | "q1"
      | "q2"
      | "q3"
      | "q4"
      | "q5"
      | "q6",
    index: number
  ) {
    const config =
      applicationConfig.questions[index];

    return (
      <div className="field field-full">
        <label htmlFor={key}>
          Q{index + 1}｜
          {zh ? config.zh : config.en}
        </label>

        <textarea
          id={key}
          value={data[key]}
          onChange={(event) =>
            answer(
              key,
              event.target.value
            )
          }
          placeholder={
            zh
              ? config.helperZh
              : config.helperEn
          }
        />

        <small>
          {zh
            ? config.suggested
            : config.suggested.replace(
                "建議",
                "Suggested"
              )}
        </small>
      </div>
    );
  }

  return (
    <div className="application-shell">
      <div className="shell">
        <div className="application-top">
          <div>
            <span className="eyebrow">
              {
                applicationConfig.cohortLabel
              }
            </span>

            <strong
              style={{
                display: "block",
                color: "var(--navy)",
                fontSize: 20
              }}
            >
              {zh
                ? `${steps[step][0]} / ${steps[step][1]}`
                : steps[step][0]}
            </strong>
          </div>

          <div
            className="form-status"
            role="status"
          >
            {status}
          </div>
        </div>

        <div
          className="application-progress"
          aria-label={`${t(
            "申請進度",
            "Application progress"
          )} ${Math.round(progress)}%`}
        >
          <span
            style={{
              width: `${progress}%`
            }}
          />
        </div>

        <div className="application-card motion-card">
          {step === 0 && (
            <>
              <span className="eyebrow">
                STEP 01
              </span>

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
                  className={`button ${
                    data.applicationType ===
                    "individual"
                      ? "button-primary"
                      : ""
                  }`}
                  onClick={() =>
                    setApplicationType(
                      "individual"
                    )
                  }
                >
                  {t(
                    "個人申請",
                    "Individual"
                  )}
                </button>

                <button
                  type="button"
                  className={`button ${
                    data.applicationType ===
                    "team"
                      ? "button-primary"
                      : ""
                  }`}
                  onClick={() =>
                    setApplicationType("team")
                  }
                >
                  {t(
                    "團隊申請",
                    "Team"
                  )}
                </button>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <span className="eyebrow">
                STEP 02
              </span>

              <h1>
                {data.applicationType ===
                "team"
                  ? t(
                      "介紹你哋。",
                      "Tell us about your team."
                    )
                  : t(
                      "首先，認識你。",
                      "First, tell us about yourself."
                    )}
              </h1>

              {data.applicants.map(
                (applicant, index) => {
                  const role =
                    data.applicationType ===
                    "team"
                      ? index === 0
                        ? t(
                            "組長 / 主要聯絡人",
                            "Team lead / primary contact"
                          )
                        : `${t(
                            "組員",
                            "Member"
                          )} ${index}`
                      : t(
                          "申請者",
                          "Applicant"
                        );

                  return (
                    <div
                      className="review-box"
                      key={index}
                      style={{
                        marginBottom: 22
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent:
                            "space-between",
                          gap: 12,
                          alignItems: "center"
                        }}
                      >
                        <strong>{role}</strong>

                        {index > 0 && (
                          <button
                            className="text-link"
                            type="button"
                            onClick={() =>
                              removeMember(index)
                            }
                          >
                            {t(
                              "移除",
                              "Remove"
                            )}
                          </button>
                        )}
                      </div>

                      <div
                        className="form-grid"
                        style={{
                          marginTop: 14
                        }}
                      >
                        {[
                          [
                            "chineseName",
                            t(
                              "中文全名",
                              "Chinese full name"
                            ),
                            "text"
                          ],
                          [
                            "englishName",
                            t(
                              "英文全名",
                              "English full name"
                            ),
                            "text"
                          ],
                          [
                            "phone",
                            t(
                              "流動電話號碼",
                              "Mobile number"
                            ),
                            "tel"
                          ],
                          [
                            "email",
                            t(
                              "電郵地址",
                              "Email address"
                            ),
                            "email"
                          ]
                        ].map(
                          ([
                            key,
                            label,
                            type
                          ]) => {
                            const errorKey =
                              fieldKey(
                                index,
                                key as keyof Applicant
                              );

                            return (
                              <div
                                className="field"
                                key={key}
                              >
                                <label
                                  htmlFor={
                                    errorKey
                                  }
                                >
                                  {label}
                                </label>

                                <input
                                  id={errorKey}
                                  type={type}
                                  value={
                                    applicant[
                                      key as keyof Applicant
                                    ] as string
                                  }
                                  onChange={(
                                    event
                                  ) =>
                                    updateApplicant(
                                      index,
                                      key as keyof Applicant,
                                      event.target
                                        .value
                                    )
                                  }
                                  aria-invalid={
                                    Boolean(
                                      fieldErrors[
                                        errorKey
                                      ]
                                    )
                                  }
                                  style={errorStyle(
                                    errorKey
                                  )}
                                  placeholder={
                                    key === "englishName"
                                      ? "CHAN Tai Man"
                                      : key === "phone"
                                        ? "+852 9123 4567"
                                        : undefined
                                  }
                                />

                                {renderError(
                                  errorKey
                                )}
                              </div>
                            );
                          }
                        )}

                        <div className="field">
                          <label
                            htmlFor={fieldKey(
                              index,
                              "institution"
                            )}
                          >
                            {t(
                              "院校 / 學校",
                              "Institution / school"
                            )}
                          </label>

                          <select
                            id={fieldKey(
                              index,
                              "institution"
                            )}
                            value={
                              applicant.institution
                            }
                            onChange={(
                              event
                            ) =>
                              updateApplicant(
                                index,
                                "institution",
                                event.target
                                  .value
                              )
                            }
                            style={errorStyle(
                              fieldKey(
                                index,
                                "institution"
                              )
                            )}
                          >
                            <option value="">
                              {t(
                                "請選擇院校 / 學校",
                                "Select institution / school"
                              )}
                            </option>

                            {institutionOptions.map(
                              (institution) => (
                                <option
                                  key={
                                    institution
                                  }
                                  value={
                                    institution
                                  }
                                >
                                  {
                                    institution
                                  }
                                </option>
                              )
                            )}
                          </select>

                          {renderError(
                            fieldKey(
                              index,
                              "institution"
                            )
                          )}
                        </div>

                        <div className="field">
                          <label
                            htmlFor={fieldKey(
                              index,
                              "programme"
                            )}
                          >
                            {t(
                              "課程 / 學系全稱",
                              "Full programme / department name"
                            )}
                          </label>

                          <input
                            id={fieldKey(
                              index,
                              "programme"
                            )}
                            value={
                              applicant.programme
                            }
                            onChange={(
                              event
                            ) =>
                              updateApplicant(
                                index,
                                "programme",
                                event.target
                                  .value
                              )
                            }
                            style={errorStyle(
                              fieldKey(
                                index,
                                "programme"
                              )
                            )}
                            placeholder={t(
                              "例如：文學士（比較文學）、BBA (Acc&Fin)",
                              "e.g. BA (Comparative Literature), BBA (Acc&Fin)"
                            )}
                          />

                          {renderError(
                            fieldKey(
                              index,
                              "programme"
                            )
                          )}
                        </div>

                        <div className="field">
                          <label
                            htmlFor={fieldKey(
                              index,
                              "yearOfStudy"
                            )}
                          >
                            {t(
                              "就讀年級",
                              "Year of study"
                            )}
                          </label>

                          <select
                            id={fieldKey(
                              index,
                              "yearOfStudy"
                            )}
                            value={
                              applicant.yearOfStudy
                            }
                            onChange={(
                              event
                            ) =>
                              updateApplicant(
                                index,
                                "yearOfStudy",
                                event.target
                                  .value
                              )
                            }
                            style={errorStyle(
                              fieldKey(
                                index,
                                "yearOfStudy"
                              )
                            )}
                          >
                            <option value="">
                              {t(
                                "請選擇就讀年級",
                                "Select year of study"
                              )}
                            </option>

                            {yearOfStudyOptions.map(
                              (year) => (
                                <option
                                  key={year}
                                  value={year}
                                >
                                  {year ===
                                    "Year 5 or above" &&
                                  zh
                                    ? "Year 5 或以上"
                                    : year}
                                </option>
                              )
                            )}
                          </select>

                          {renderError(
                            fieldKey(
                              index,
                              "yearOfStudy"
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }
              )}

              {data.applicationType ===
                "team" &&
                data.applicants.length <
                  applicationConfig.maxTeamSize && (
                  <button
                    className="button"
                    type="button"
                    onClick={addMember}
                  >
                    {t(
                      "＋ 新增組員",
                      "+ Add team member"
                    )}
                  </button>
                )}

            </>
          )}

          {step === 2 && (
            <>
              <span className="eyebrow">
                STEP 03
              </span>

              <h1>
                {t(
                  "每位申請者，準備一份 CV。",
                  "Prepare one CV for each applicant."
                )}
              </h1>

              <p>
                {t(
                  "每份 CV 必須為 PDF，4MB 或以下。正式提交時會逐份上載，避免團隊申請因總檔案大小而失敗。",
                  "Each CV must be a PDF of 4MB or below. Files are uploaded one by one during final submission to avoid team submissions failing because of combined file size."
                )}
              </p>

              {data.applicants.map(
                (applicant, index) => (
                  <div
                    className="field field-full"
                    key={index}
                  >
                    <label>
                      {data.applicationType ===
                      "team"
                        ? index === 0
                          ? t(
                              "組長 CV",
                              "Team lead CV"
                            )
                          : `${t(
                              "組員",
                              "Member"
                            )} ${index} CV`
                        : t(
                            "CV",
                            "CV"
                          )}
                    </label>

                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={(
                        event
                      ) =>
                        selectCv(
                          index,
                          event.target
                            .files?.[0]
                        )
                      }
                    />

                    <small>
                      {applicant.cvFileName
                        ? `${t(
                            "已選擇",
                            "Selected"
                          )}: ${
                            applicant.cvFileName
                          }`
                        : t(
                            "PDF only · 4MB 或以下",
                            "PDF only · max 4MB"
                          )}
                    </small>
                  </div>
                )
              )}
            </>
          )}

          {step === 3 && (
            <>
              <span className="eyebrow">
                STEP 04
              </span>
              <h1>
                {t(
                  "你點理解香港文化？",
                  "How do you see Hong Kong culture?"
                )}
              </h1>
              {question("q1", 0)}
              {question("q2", 1)}
            </>
          )}

          {step === 4 && (
            <>
              <span className="eyebrow">
                STEP 05
              </span>
              <h1>
                {t(
                  "未完整，都可以講。",
                  "It is okay if the idea is not complete."
                )}
              </h1>
              {question("q3", 2)}
              {question("q4", 3)}
            </>
          )}

          {step === 5 && (
            <>
              <span className="eyebrow">
                STEP 06
              </span>
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
              <span className="eyebrow">
                STEP 07
              </span>

              <h1>
                {t(
                  "你通常邊啲時間比較方便做面試？",
                  "When are you generally available for an interview?"
                )}
              </h1>

              <div
                id="interviewTimePreference"
                className="review-box"
              >
                <strong>
                  {t(
                    "面試時段偏好（必須）",
                    "Preferred interview time (required)"
                  )}
                </strong>

                <p>
                  {data.applicationType === "team"
                    ? t(
                        "請以整隊都較方便嘅時段作答，可選多於一項。",
                        "Please select times that generally work for the whole team. You may choose more than one."
                      )
                    : t(
                        "請選擇你較方便嘅時段，可選多於一項。",
                        "Select the times that work best for you. You may choose more than one."
                      )}
                </p>

                <small>
                  {t(
                    "只作排期及分類參考；實際面試日期及時間將另行通知，未必能安排所選時段。",
                    "Used for scheduling and grouping reference only. Actual interview dates and times will be confirmed separately, and preferred slots cannot be guaranteed."
                  )}
                </small>

                <div
                  style={{
                    display: "grid",
                    gap: 10,
                    marginTop: 16
                  }}
                >
                  {interviewTimePreferenceOptions.map(
                    (value) => (
                      <label
                        className="checkbox-line"
                        key={value}
                      >
                        <input
                          type="checkbox"
                          checked={data.interviewTimePreference.includes(
                            value
                          )}
                          onChange={() =>
                            toggleInterviewPreference(
                              value
                            )
                          }
                        />

                        <span>
                          {preferenceLabel(value)}
                        </span>
                      </label>
                    )
                  )}
                </div>

                {renderError(
                  "interviewTimePreference"
                )}
              </div>
            </>
          )}

          {step === 7 && (
            <>
              <span className="eyebrow">
                FINAL REVIEW
              </span>

              <h1>
                {t(
                  "提交前，再望一次。",
                  "One last look before you submit."
                )}
              </h1>

              <dl className="review-box">
                <dt>
                  {t(
                    "申請形式",
                    "Application type"
                  )}
                </dt>
                <dd>
                  {data.applicationType ===
                  "team"
                    ? t(
                        `團隊申請（${data.applicants.length} 人）`,
                        `Team (${data.applicants.length} people)`
                      )
                    : t(
                        "個人申請",
                        "Individual"
                      )}
                </dd>
              </dl>

              {data.applicants.map(
                (applicant, index) => (
                  <dl
                    className="review-box"
                    key={index}
                  >
                    <dt>
                      {data.applicationType ===
                      "team"
                        ? index === 0
                          ? t(
                              "組長",
                              "Team lead"
                            )
                          : `${t(
                              "組員",
                              "Member"
                            )} ${index}`
                        : t(
                            "申請者",
                            "Applicant"
                          )}
                    </dt>
                    <dd>
                      {applicant.chineseName} /{" "}
                      {applicant.englishName}
                      <br />
                      {applicant.phone} ·{" "}
                      {applicant.email}
                      <br />
                      {applicant.institution}
                      <br />
                      {applicant.programme} ·{" "}
                      {
                        applicant.yearOfStudy
                      }
                      <br />
                      CV:{" "}
                      {applicant.cvFileName ||
                        t(
                          "未提供",
                          "Not provided"
                        )}
                    </dd>
                  </dl>
                )
              )}

              <dl className="review-box">
                <dt>
                  {t(
                    "面試時段偏好",
                    "Preferred interview time"
                  )}
                </dt>
                <dd>
                  {data.interviewTimePreference
                    .map(
                      preferenceLabel
                    )
                    .join(" / ")}
                </dd>
              </dl>

              {[
                ["Q1", data.q1],
                ["Q2", data.q2],
                ["Q3", data.q3],
                ["Q4", data.q4],
                ["Q5", data.q5],
                [
                  "Q6",
                  data.q6 ||
                    t(
                      "沒有補充",
                      "No additional note"
                    )
                ]
              ].map(([label, value]) => (
                <dl
                  className="review-box"
                  key={label}
                >
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </dl>
              ))}

              <label className="checkbox-line">
                <input
                  type="checkbox"
                  checked={
                    data.accuracyDeclaration
                  }
                  onChange={(event) =>
                    setData(
                      (previous) => ({
                        ...previous,
                        accuracyDeclaration:
                          event.target
                            .checked
                      })
                    )
                  }
                />
                <span>
                  <strong>
                    {t(
                      "必須：",
                      "Required: "
                    )}
                  </strong>
                  {t(
                    "我確認以上提供的資料均屬真實及準確。",
                    "I confirm that the information provided above is true and accurate."
                  )}
                </span>
              </label>

              <label className="checkbox-line">
                <input
                  type="checkbox"
                  checked={
                    data.privacyConsent
                  }
                  onChange={(event) =>
                    setData(
                      (previous) => ({
                        ...previous,
                        privacyConsent:
                          event.target
                            .checked
                      })
                    )
                  }
                />
                <span>
                  <strong>
                    {t(
                      "必須：",
                      "Required: "
                    )}
                  </strong>
                  {t(
                    "我已閱讀並同意香港籽鷂文化就本次申請、甄選及計劃行政需要使用以上資料。",
                    "I have read and agree that Hong Kong Culture Limited may use the information above for this application, selection and programme administration."
                  )}
                </span>
              </label>
            </>
          )}

          <div
            className="button-row"
            style={{
              marginTop: 28
            }}
          >
            {step > 0 && (
              <button
                className="button"
                type="button"
                onClick={previous}
              >
                {t(
                  "← 上一步",
                  "← Back"
                )}
              </button>
            )}

            {step <
              steps.length - 1 && (
              <button
                className="button button-primary"
                type="button"
                onClick={next}
              >
                {t(
                  "下一步 →",
                  "Continue →"
                )}
              </button>
            )}

            {step ===
              steps.length - 1 && (
              <button
                className="button button-primary"
                type="button"
                disabled={submitting}
                onClick={
                  submitApplication
                }
              >
                {submitting
                  ? t(
                      "處理中…",
                      "Processing…"
                    )
                  : applicationConfig.testMode
                    ? t(
                        "提交測試申請 →",
                        "Submit test application →"
                      )
                    : t(
                        "正式提交申請 →",
                        "Submit application →"
                      )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
