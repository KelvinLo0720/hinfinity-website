import { Resend } from "resend";

type ApplicationNotificationArgs = {
  reference: string;
  applicationType: "individual" | "team";
  teamSize: number;
  primaryContactName: string;
  submittedAt: Date;
  testMode: boolean;
};

export type ApplicationNotificationResult = {
  sent: number;
  failed: number;
  skipped: boolean;
};

const DEFAULT_FROM =
  "H Infinity <info@hinfinityhk.com>";

const REPLY_TO = "info@hinfinityhk.com";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatSubmittedAt(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Hong_Kong",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(date);
}

function getRecipients() {
  return Array.from(
    new Set(
      (process.env.APPLICATION_NOTIFICATION_RECIPIENTS || "")
        .split(",")
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean)
    )
  );
}

function buildNotificationContent({
  reference,
  applicationType,
  teamSize,
  primaryContactName,
  submittedAt
}: Omit<ApplicationNotificationArgs, "testMode">) {
  const typeLabel =
    applicationType === "team"
      ? `Team Application (${teamSize} members)`
      : "Individual Application";

  const submittedLabel =
    `${formatSubmittedAt(submittedAt)} HKT`;

  const subject =
    `[New Application] H Infinity Cohort 02｜${reference}`;

  const text = `H Infinity Cohort 02 收到一份新申請。

Application Reference
${reference}

Application Type
${typeLabel}

Team Size
${teamSize}

Primary Contact
${primaryContactName}

Submitted At
${submittedLabel}

請到 H Infinity restricted Applications database 查看完整申請內容。

此電郵只作新申請通知。完整申請資料、答案、CV 及聯絡資料以 Applications database 為 source of truth。

—
H Infinity Website
Automated Notification`;

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f4f1e8;font-family:Arial,'PingFang HK','Microsoft JhengHei',sans-serif;color:#12264a;">
    <div style="max-width:640px;margin:0 auto;padding:30px 18px;">
      <div style="overflow:hidden;border:1px solid #dce1ea;border-radius:20px;background:#ffffff;">
        <div style="padding:26px 30px;background:#0d1b35;color:#ffffff;">
          <div style="font-size:12px;font-weight:700;letter-spacing:.15em;color:#d9ff3f;">
            H INFINITY · INTERNAL
          </div>
          <h1 style="margin:10px 0 0;font-size:26px;line-height:1.25;">
            New application received
          </h1>
        </div>

        <div style="padding:28px 30px;">
          <p style="margin:0 0 20px;font-size:16px;line-height:1.7;">
            H Infinity Cohort 02 收到一份新申請。
          </p>

          <div style="padding:18px 20px;border-radius:15px;background:#f4f1e8;">
            <table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.7;">
              <tr>
                <td style="padding:5px 15px 5px 0;color:#687188;vertical-align:top;">Reference</td>
                <td style="padding:5px 0;font-weight:700;">${escapeHtml(reference)}</td>
              </tr>
              <tr>
                <td style="padding:5px 15px 5px 0;color:#687188;vertical-align:top;">Type</td>
                <td style="padding:5px 0;">${escapeHtml(typeLabel)}</td>
              </tr>
              <tr>
                <td style="padding:5px 15px 5px 0;color:#687188;vertical-align:top;">Team size</td>
                <td style="padding:5px 0;">${teamSize}</td>
              </tr>
              <tr>
                <td style="padding:5px 15px 5px 0;color:#687188;vertical-align:top;">Primary contact</td>
                <td style="padding:5px 0;">${escapeHtml(primaryContactName)}</td>
              </tr>
              <tr>
                <td style="padding:5px 15px 5px 0;color:#687188;vertical-align:top;">Submitted</td>
                <td style="padding:5px 0;">${escapeHtml(submittedLabel)}</td>
              </tr>
            </table>
          </div>

          <p style="margin:22px 0 0;font-size:14px;line-height:1.75;color:#3d475b;">
            請到 H Infinity restricted Applications database 查看完整申請內容。
            此電郵只作新申請通知；完整申請資料、答案、CV 及聯絡資料以 Applications database 為 source of truth。
          </p>
        </div>

        <div style="padding:18px 30px;background:#0d1b35;color:#ffffff;font-size:12px;line-height:1.7;">
          H Infinity Website · Automated Notification
        </div>
      </div>
    </div>
  </body>
</html>`;

  return {
    subject,
    text,
    html
  };
}

export async function sendInternalApplicationNotifications({
  reference,
  applicationType,
  teamSize,
  primaryContactName,
  submittedAt,
  testMode
}: ApplicationNotificationArgs): Promise<ApplicationNotificationResult> {
  if (testMode) {
    return {
      sent: 0,
      failed: 0,
      skipped: true
    };
  }

  const recipients = getRecipients();

  if (recipients.length === 0) {
    console.warn(
      "APPLICATION_NOTIFICATION_RECIPIENTS is empty. Internal application notification skipped."
    );

    return {
      sent: 0,
      failed: 0,
      skipped: true
    };
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error(
      "RESEND_API_KEY is not configured."
    );
  }

  const resend = new Resend(apiKey);

  const from =
    process.env.APPLICATION_CONFIRMATION_FROM ||
    DEFAULT_FROM;

  const content = buildNotificationContent({
    reference,
    applicationType,
    teamSize,
    primaryContactName,
    submittedAt
  });

  const results = await Promise.allSettled(
    recipients.map(async (recipient, index) => {
      const { error } = await resend.emails.send(
        {
          from,
          to: recipient,
          replyTo: REPLY_TO,
          subject: content.subject,
          text: content.text,
          html: content.html
        },
        {
          idempotencyKey:
            `internal-application-notification/${reference}/${index}`
        }
      );

      if (error) {
        throw new Error(
          `Internal notification failed for ${recipient}: ${error.message}`
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
      console.error(
        "Internal application notification error",
        result.reason
      );
    }
  });

  return {
    sent,
    failed,
    skipped: false
  };
}
