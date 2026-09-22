import { Resend } from "resend";
import { applicationConfig } from "@/lib/application-form-config";

type ConfirmationApplicant = {
  chineseName: string;
  englishName: string;
  phone: string;
  email: string;
  institution: string;
  programme: string;
  yearOfStudy: string;
  cvFileName: string;
};

type ApplicationAnswers = {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
};

type SendApplicationConfirmationArgs = {
  reference: string;
  applicationType: "individual" | "team";
  applicants: ConfirmationApplicant[];
  interviewTimePreference: string[];
  answers: ApplicationAnswers;
  individualTeamFormationConsent: boolean;
  submittedAt: Date;
  testMode: boolean;
};

export type ApplicationConfirmationResult = {
  sent: number;
  failed: number;
  skipped: boolean;
};

const DEFAULT_FROM = "H Infinity <info@hinfinityhk.com>";
const REPLY_TO = "info@hinfinityhk.com";

const preferenceLabels: Record<string, [string, string]> = {
  "Weekday Daytime": ["平日日間", "Weekday daytime"],
  "Weekday Evening": ["平日晚上", "Weekday evening"],
  "Weekend Daytime": ["週末日間", "Weekend daytime"],
  "Weekend Evening": ["週末晚上", "Weekend evening"],
  Flexible: [
    "時間較彈性／沒有特定偏好",
    "Flexible / no specific preference"
  ]
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function multilineHtml(value: string) {
  return escapeHtml(value || "—").replaceAll("\n", "<br />");
}

function formatSubmittedAt(date: Date, locale: "zh-HK" | "en-GB") {
  return new Intl.DateTimeFormat(locale, {
    timeZone: "Asia/Hong_Kong",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(date);
}

function preferenceLabel(value: string, language: "zh" | "en") {
  const labels = preferenceLabels[value];
  if (!labels) return value;
  return language === "zh" ? labels[0] : labels[1];
}

function applicantDisplayName(applicant: ConfirmationApplicant) {
  return (
    applicant.chineseName ||
    applicant.englishName ||
    applicant.email ||
    "Applicant"
  );
}

function buildEmailContent({
  applicant,
  reference,
  applicationType,
  applicants,
  interviewTimePreference,
  answers,
  individualTeamFormationConsent,
  submittedAt
}: {
  applicant: ConfirmationApplicant;
  reference: string;
  applicationType: "individual" | "team";
  applicants: ConfirmationApplicant[];
  interviewTimePreference: string[];
  answers: ApplicationAnswers;
  individualTeamFormationConsent: boolean;
  submittedAt: Date;
}) {
  const displayNameZh =
    applicant.chineseName || applicant.englishName || "申請者";
  const displayNameEn =
    applicant.englishName || applicant.chineseName || "Applicant";

  const teamSize = applicants.length;
  const primaryContact = applicants[0];

  const typeZh =
    applicationType === "team"
      ? `團隊申請（${teamSize} 人）`
      : "個人申請";
  const typeEn =
    applicationType === "team"
      ? `Team application (${teamSize} members)`
      : "Individual application";

  const primaryNameZh =
    primaryContact.chineseName || primaryContact.englishName;
  const primaryNameEn =
    primaryContact.englishName || primaryContact.chineseName;

  const submittedZh = formatSubmittedAt(submittedAt, "zh-HK");
  const submittedEn = formatSubmittedAt(submittedAt, "en-GB");

  const teamNames = applicants
    .map((member) => applicantDisplayName(member))
    .join("、");

  const interviewZh = interviewTimePreference
    .map((value) => preferenceLabel(value, "zh"))
    .join("／");
  const interviewEn = interviewTimePreference
    .map((value) => preferenceLabel(value, "en"))
    .join(" / ");

  const interviewNoticeZh =
    applicationType === "team"
      ? "如你／你哋嘅申請獲安排進入面試階段，我哋會於提交申請後 14 個工作天內，透過申請表內主要聯絡人提供嘅電話號碼致電或 WhatsApp 聯絡。請留意來電及訊息；如未能成功聯絡，我哋保留不作第二次聯絡嘅權利。"
      : "如你嘅申請獲安排進入面試階段，我哋會於提交申請後 14 個工作天內，透過你喺申請表提供嘅電話號碼致電或 WhatsApp 聯絡你。請留意來電及訊息；如未能成功聯絡，我哋保留不作第二次聯絡嘅權利。";

  const interviewNoticeEn =
    applicationType === "team"
      ? "If your application is selected for the interview stage, we will contact the primary contact within 14 working days of submission by phone call or WhatsApp using the number provided in the application. Please keep an eye on calls and messages. If we are unable to reach the primary contact, we reserve the right not to make a second contact attempt."
      : "If your application is selected for the interview stage, we will contact you within 14 working days of submission by phone call or WhatsApp using the number provided in your application. Please keep an eye on calls and messages. If we are unable to reach you, we reserve the right not to make a second contact attempt.";

  const questionText = applicationConfig.questions
    .map((question, index) => {
      const key = `q${index + 1}` as keyof ApplicationAnswers;
      const answer = answers[key]?.trim() || "—";
      return `Q${index + 1}｜${question.zh}\n${question.en}\n${answer}`;
    })
    .join("\n\n");

  const questionHtml = applicationConfig.questions
    .map((question, index) => {
      const key = `q${index + 1}` as keyof ApplicationAnswers;
      const answer = answers[key]?.trim() || "—";

      return `
        <div style="margin:0 0 18px;padding:16px;border:1px solid #e1e5ed;border-radius:12px;background:#ffffff;">
          <div style="font-size:14px;font-weight:700;line-height:1.6;color:#12264a;">Q${index + 1}｜${escapeHtml(question.zh)}</div>
          <div style="margin-top:3px;font-size:12px;line-height:1.55;color:#687188;">${escapeHtml(question.en)}</div>
          <div style="margin-top:12px;font-size:14px;line-height:1.75;color:#30394b;white-space:normal;">${multilineHtml(answer)}</div>
        </div>`;
    })
    .join("");

  const individualConsentText =
    applicationType === "individual"
      ? `\n個人組隊確認 / Individual team formation consent：${
          individualTeamFormationConsent ? "已同意 / Agreed" : "—"
        }`
      : "";

  const individualConsentHtml =
    applicationType === "individual"
      ? `<tr><td style="padding:5px 16px 5px 0;color:#687188;vertical-align:top;">個人組隊確認<br /><span style="font-size:12px;">Team formation consent</span></td><td style="padding:5px 0;">${individualTeamFormationConsent ? "已同意 / Agreed" : "—"}</td></tr>`
      : "";

  const subject =
    `H Infinity Cohort 02｜申請已成功提交 Application Received｜${reference}`;

  const text = `你好 ${displayNameZh}：

多謝你申請 H Infinity Cohort 02。

我哋已經收到你／你哋嘅申請。以下係今次提交紀錄：

申請編號：${reference}
申請形式：${typeZh}
主要聯絡人：${primaryNameZh}
提交時間：${submittedZh}

${interviewNoticeZh}

—— 你提交的內容副本 / Submitted Response Copy ——

你的資料 / Your details
中文姓名：${applicant.chineseName || "—"}
英文姓名：${applicant.englishName || "—"}
電話：${applicant.phone || "—"}
電郵：${applicant.email || "—"}
院校／學校：${applicant.institution || "—"}
課程／學系：${applicant.programme || "—"}
就讀年級／目前狀況：${applicant.yearOfStudy || "—"}
CV：${applicant.cvFileName || "—"}
${applicationType === "team" ? `團隊成員 / Team members：${teamNames}\n` : ""}面試時段偏好：${interviewZh || "—"}
Preferred interview time: ${interviewEn || "—"}${individualConsentText}

${questionText}

請保留呢封電郵同申請編號，方便日後查詢。如你發現提交資料有誤，或者有任何問題，可以直接回覆呢封電郵，或者聯絡 ${REPLY_TO}。

你未需要有答案。
多謝你願意由一樣真正關心嘅事開始。

H Infinity 團隊
香港籽鷂文化

——

Hello ${displayNameEn},

Thank you for applying to H Infinity Cohort 02. We have successfully received your application.

Application reference: ${reference}
Application type: ${typeEn}
Primary contact: ${primaryNameEn}
Submitted at: ${submittedEn} (Hong Kong time)

${interviewNoticeEn}

A copy of the information and responses you submitted is included above. Please keep this email and your application reference for future enquiries.

If you notice any incorrect information in your submission or have any questions, simply reply to this email or contact ${REPLY_TO}.

H Infinity Team
Hong Kong Culture Limited`;

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f4f1e8;font-family:Arial,'PingFang HK','Microsoft JhengHei',sans-serif;color:#12264a;">
    <div style="max-width:680px;margin:0 auto;padding:32px 18px;">
      <div style="overflow:hidden;border:1px solid #dce1ea;border-radius:22px;background:#ffffff;">
        <div style="padding:30px 32px;background:#0d1b35;color:#ffffff;">
          <div style="font-size:12px;font-weight:700;letter-spacing:.16em;color:#d9ff3f;">H INFINITY · COHORT 02</div>
          <h1 style="margin:12px 0 0;font-size:30px;line-height:1.2;">申請已成功提交</h1>
          <div style="margin-top:6px;font-size:15px;color:#dce5fa;">Application received</div>
        </div>

        <div style="padding:30px 32px;">
          <p style="margin:0 0 18px;font-size:16px;line-height:1.75;">你好 <strong>${escapeHtml(displayNameZh)}</strong>，</p>
          <p style="margin:0 0 20px;font-size:16px;line-height:1.75;">多謝你申請 <strong>H Infinity Cohort 02</strong>。我哋已經收到你／你哋嘅申請。</p>

          <div style="margin:24px 0;padding:20px;border-radius:16px;background:#f4f1e8;">
            <div style="margin-bottom:12px;font-size:12px;font-weight:700;letter-spacing:.1em;color:#2847ff;">SUBMISSION RECORD</div>
            <table role="presentation" style="width:100%;border-collapse:collapse;font-size:15px;line-height:1.65;">
              <tr><td style="padding:5px 16px 5px 0;color:#687188;vertical-align:top;">申請編號</td><td style="padding:5px 0;font-weight:700;">${escapeHtml(reference)}</td></tr>
              <tr><td style="padding:5px 16px 5px 0;color:#687188;vertical-align:top;">申請形式</td><td style="padding:5px 0;">${escapeHtml(typeZh)}</td></tr>
              <tr><td style="padding:5px 16px 5px 0;color:#687188;vertical-align:top;">主要聯絡人</td><td style="padding:5px 0;">${escapeHtml(primaryNameZh)}</td></tr>
              <tr><td style="padding:5px 16px 5px 0;color:#687188;vertical-align:top;">提交時間</td><td style="padding:5px 0;">${escapeHtml(submittedZh)}</td></tr>
            </table>
          </div>

          <div style="margin:24px 0;padding:18px 20px;border-radius:14px;background:#fff4d8;border:1px solid #f0cf7b;">
            <div style="margin-bottom:7px;font-size:13px;font-weight:800;color:#8a5b00;">面試安排｜Interview contact</div>
            <p style="margin:0 0 10px;font-size:14px;line-height:1.75;color:#4a3b22;">${escapeHtml(interviewNoticeZh)}</p>
            <p style="margin:0;font-size:13px;line-height:1.7;color:#655337;">${escapeHtml(interviewNoticeEn)}</p>
          </div>

          <div style="margin:28px 0;padding:20px;border-radius:16px;background:#f7f8fb;border:1px solid #dfe4ed;">
            <div style="font-size:12px;font-weight:800;letter-spacing:.1em;color:#2847ff;">SUBMITTED RESPONSE COPY</div>
            <h2 style="margin:8px 0 6px;font-size:22px;line-height:1.3;color:#12264a;">你提交的內容副本</h2>
            <p style="margin:0 0 18px;font-size:13px;line-height:1.7;color:#687188;">以下內容方便你日後查看今次申請時提交的資料及回答。For your reference, this is a copy of the information and responses submitted with your application.</p>

            <table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.65;margin-bottom:18px;">
              <tr><td style="padding:5px 16px 5px 0;color:#687188;vertical-align:top;">中文姓名</td><td style="padding:5px 0;">${escapeHtml(applicant.chineseName || "—")}</td></tr>
              <tr><td style="padding:5px 16px 5px 0;color:#687188;vertical-align:top;">英文姓名</td><td style="padding:5px 0;">${escapeHtml(applicant.englishName || "—")}</td></tr>
              <tr><td style="padding:5px 16px 5px 0;color:#687188;vertical-align:top;">電話</td><td style="padding:5px 0;">${escapeHtml(applicant.phone || "—")}</td></tr>
              <tr><td style="padding:5px 16px 5px 0;color:#687188;vertical-align:top;">電郵</td><td style="padding:5px 0;">${escapeHtml(applicant.email || "—")}</td></tr>
              <tr><td style="padding:5px 16px 5px 0;color:#687188;vertical-align:top;">院校／學校</td><td style="padding:5px 0;">${escapeHtml(applicant.institution || "—")}</td></tr>
              <tr><td style="padding:5px 16px 5px 0;color:#687188;vertical-align:top;">課程／學系</td><td style="padding:5px 0;">${escapeHtml(applicant.programme || "—")}</td></tr>
              <tr><td style="padding:5px 16px 5px 0;color:#687188;vertical-align:top;">就讀年級／目前狀況</td><td style="padding:5px 0;">${escapeHtml(applicant.yearOfStudy || "—")}</td></tr>
              <tr><td style="padding:5px 16px 5px 0;color:#687188;vertical-align:top;">CV</td><td style="padding:5px 0;">${escapeHtml(applicant.cvFileName || "—")}</td></tr>
              ${applicationType === "team" ? `<tr><td style="padding:5px 16px 5px 0;color:#687188;vertical-align:top;">團隊成員<br /><span style="font-size:12px;">Team members</span></td><td style="padding:5px 0;">${escapeHtml(teamNames)}</td></tr>` : ""}
              <tr><td style="padding:5px 16px 5px 0;color:#687188;vertical-align:top;">面試時段偏好<br /><span style="font-size:12px;">Interview preference</span></td><td style="padding:5px 0;">${escapeHtml(interviewZh || "—")}<br /><span style="font-size:12px;color:#687188;">${escapeHtml(interviewEn || "—")}</span></td></tr>
              ${individualConsentHtml}
            </table>

            ${questionHtml}
          </div>

          <p style="margin:0 0 18px;font-size:15px;line-height:1.75;color:#3d475b;">請保留呢封電郵同申請編號，方便日後查詢。如你發現提交資料有誤，或者有任何問題，可以直接回覆呢封電郵，或者聯絡 <a href="mailto:${REPLY_TO}" style="color:#2847ff;">${REPLY_TO}</a>。</p>

          <div style="margin:26px 0;padding:18px 20px;border-radius:14px;background:#d9ff3f;font-size:16px;font-weight:700;line-height:1.65;color:#0d1b35;">你未需要有答案。<br />多謝你願意由一樣真正關心嘅事開始。</div>

          <hr style="margin:30px 0;border:0;border-top:1px solid #e1e5ed;" />

          <p style="margin:0 0 14px;font-size:15px;line-height:1.7;">Hello <strong>${escapeHtml(displayNameEn)}</strong>,</p>
          <p style="margin:0 0 18px;font-size:14px;line-height:1.75;color:#3d475b;">Thank you for applying to <strong>H Infinity Cohort 02</strong>. We have successfully received your application.</p>

          <div style="margin:20px 0;padding:18px;border-radius:14px;background:#f4f1e8;font-size:14px;line-height:1.75;">
            <strong>Application reference:</strong> ${escapeHtml(reference)}<br />
            <strong>Application type:</strong> ${escapeHtml(typeEn)}<br />
            <strong>Primary contact:</strong> ${escapeHtml(primaryNameEn)}<br />
            <strong>Submitted at:</strong> ${escapeHtml(submittedEn)} (Hong Kong time)
          </div>

          <p style="margin:0;font-size:14px;line-height:1.75;color:#3d475b;">A copy of the information and responses you submitted is included above. If you notice any incorrect information in your submission or have any questions, simply reply to this email or contact <a href="mailto:${REPLY_TO}" style="color:#2847ff;">${REPLY_TO}</a>.</p>
        </div>

        <div style="padding:22px 32px;background:#0d1b35;color:#ffffff;font-size:13px;line-height:1.7;">
          <strong>H Infinity Team</strong><br />
          Hong Kong Culture Limited<br />
          <a href="mailto:${REPLY_TO}" style="color:#d9ff3f;text-decoration:none;">${REPLY_TO}</a>
        </div>
      </div>
    </div>
  </body>
</html>`;

  return { subject, text, html };
}

export async function sendApplicationConfirmationEmails({
  reference,
  applicationType,
  applicants,
  interviewTimePreference,
  answers,
  individualTeamFormationConsent,
  submittedAt,
  testMode
}: SendApplicationConfirmationArgs): Promise<ApplicationConfirmationResult> {
  if (testMode) {
    return { sent: 0, failed: 0, skipped: true };
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const resend = new Resend(apiKey);
  const from = process.env.APPLICATION_CONFIRMATION_FROM || DEFAULT_FROM;

  const uniqueApplicants = Array.from(
    new Map(
      applicants.map((applicant) => [
        applicant.email.trim().toLowerCase(),
        applicant
      ])
    ).values()
  );

  const results = await Promise.allSettled(
    uniqueApplicants.map(async (applicant, index) => {
      const content = buildEmailContent({
        applicant,
        reference,
        applicationType,
        applicants,
        interviewTimePreference,
        answers,
        individualTeamFormationConsent,
        submittedAt
      });

      const { error } = await resend.emails.send(
        {
          from,
          to: applicant.email,
          replyTo: REPLY_TO,
          subject: content.subject,
          text: content.text,
          html: content.html
        },
        {
          idempotencyKey: `application-confirmation/${reference}/${index}`
        }
      );

      if (error) {
        throw new Error(
          `Confirmation email failed for ${applicant.email}: ${error.message}`
        );
      }
    })
  );

  const sent = results.filter(
    (result) => result.status === "fulfilled"
  ).length;
  const failed = results.length - sent;

  results.forEach((result) => {
    if (result.status === "rejected") {
      console.error("Application confirmation email error", result.reason);
    }
  });

  return { sent, failed, skipped: false };
}
