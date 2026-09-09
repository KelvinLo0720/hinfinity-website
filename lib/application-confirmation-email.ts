import { Resend } from "resend";

type ConfirmationApplicant = {
  chineseName: string;
  englishName: string;
  email: string;
};

type SendApplicationConfirmationArgs = {
  reference: string;
  applicationType: "individual" | "team";
  applicants: ConfirmationApplicant[];
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

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
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

function buildEmailContent({
  applicant,
  reference,
  applicationType,
  teamSize,
  primaryContact,
  submittedAt
}: {
  applicant: ConfirmationApplicant;
  reference: string;
  applicationType: "individual" | "team";
  teamSize: number;
  primaryContact: ConfirmationApplicant;
  submittedAt: Date;
}) {
  const displayNameZh =
    applicant.chineseName || applicant.englishName || "申請者";
  const displayNameEn =
    applicant.englishName || applicant.chineseName || "Applicant";

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

  const subject =
    `H Infinity Cohort 02｜申請已成功提交 Application Received｜${reference}`;

  const text = `你好 ${displayNameZh}：

多謝你申請 H Infinity Cohort 02。

我哋已經收到你／你哋嘅申請。以下係今次提交紀錄：

申請編號：${reference}
申請形式：${typeZh}
主要聯絡人：${primaryNameZh}
提交時間：${submittedZh}

請保留呢封電郵同申請編號，方便日後查詢。

有關申請及後續安排，我哋會以申請表內提供嘅電郵再同你聯絡。如你發現提交資料有誤，或者有任何問題，可以直接回覆呢封電郵，或者聯絡 ${REPLY_TO}。

你未需要有答案。
多謝你願意由一樣真正關心嘅事開始。

H Infinity 團隊
香港籽鷂文化

——

Hello ${displayNameEn},

Thank you for applying to H Infinity Cohort 02.

We have successfully received your application. Here is your submission record:

Application reference: ${reference}
Application type: ${typeEn}
Primary contact: ${primaryNameEn}
Submitted at: ${submittedEn} (Hong Kong time)

Please keep this email and your application reference for future enquiries.

We will contact you using the email address provided in your application regarding any next steps. If you notice any incorrect information in your submission or have any questions, simply reply to this email or contact ${REPLY_TO}.

You do not need all the answers yet.
Thank you for starting with something you genuinely care about.

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

          <p style="margin:0 0 18px;font-size:15px;line-height:1.75;color:#3d475b;">請保留呢封電郵同申請編號，方便日後查詢。有關申請及後續安排，我哋會以申請表內提供嘅電郵再同你聯絡。</p>
          <p style="margin:0 0 24px;font-size:15px;line-height:1.75;color:#3d475b;">如你發現提交資料有誤，或者有任何問題，可以直接回覆呢封電郵，或者聯絡 <a href="mailto:${REPLY_TO}" style="color:#2847ff;">${REPLY_TO}</a>。</p>

          <div style="margin:26px 0;padding:18px 20px;border-radius:14px;background:#d9ff3f;font-size:16px;font-weight:700;line-height:1.65;color:#0d1b35;">你未需要有答案。<br />多謝你願意由一樣真正關心嘅事開始。</div>

          <hr style="margin:30px 0;border:0;border-top:1px solid #e1e5ed;" />

          <p style="margin:0 0 14px;font-size:15px;line-height:1.7;">Hello <strong>${escapeHtml(displayNameEn)}</strong>,</p>
          <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#3d475b;">Thank you for applying to <strong>H Infinity Cohort 02</strong>. We have successfully received your application.</p>

          <div style="margin:20px 0;padding:18px;border-radius:14px;background:#f4f1e8;font-size:14px;line-height:1.75;">
            <strong>Application reference:</strong> ${escapeHtml(reference)}<br />
            <strong>Application type:</strong> ${escapeHtml(typeEn)}<br />
            <strong>Primary contact:</strong> ${escapeHtml(primaryNameEn)}<br />
            <strong>Submitted at:</strong> ${escapeHtml(submittedEn)} (Hong Kong time)
          </div>

          <p style="margin:0 0 18px;font-size:14px;line-height:1.75;color:#3d475b;">Please keep this email and your application reference for future enquiries. We will contact you using the email address provided in your application regarding any next steps.</p>
          <p style="margin:0;font-size:14px;line-height:1.75;color:#3d475b;">If you notice any incorrect information in your submission or have any questions, simply reply to this email or contact <a href="mailto:${REPLY_TO}" style="color:#2847ff;">${REPLY_TO}</a>.</p>
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
  const primaryContact = applicants[0];

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
        teamSize: applicants.length,
        primaryContact,
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
