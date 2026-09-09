import Link from "next/link";
import { ApplicationWizardV2 } from "@/components/application-wizard-v2";
import { Localized } from "@/components/i18n";

export const metadata = {
  title: "H Infinity Cohort 02｜申請",
  robots: {
    index: false,
    follow: false
  }
};

const CONTACT_EMAIL = "info@hinfinityhk.com";

export default async function ApplicationPage({
  params,
  searchParams
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ submitted?: string }>;
}) {
  const { token } = await params;
  const { submitted } = await searchParams;

  if (submitted) {
    const emailSubject = encodeURIComponent(
      `H Infinity application enquiry｜${submitted}`
    );

    return (
      <section className="application-shell">
        <div className="shell">
          <div
            className="application-card motion-card"
            style={{ textAlign: "center" }}
          >
            <span className="eyebrow">
              APPLICATION SUBMITTED
            </span>

            <Localized
              as="h1"
              zh="收到。你已經踏出第一步。"
              en="Received. You have taken the first step."
            />

            <Localized
              as="p"
              zh="你的申請已成功寫入 H Infinity 系統。請保留以下參考編號。"
              en="Your application has been successfully submitted to H Infinity. Please keep this reference number."
            />

            <p
              style={{
                fontSize: 30,
                color: "var(--blue)",
                fontWeight: 900
              }}
            >
              {submitted}
            </p>

            <div
              style={{
                margin: "22px auto",
                maxWidth: 640,
                padding: "20px 18px",
                border:
                  "1px solid var(--line)",
                borderRadius: 14
              }}
            >
              <Localized
                as="p"
                zh={
                  <>
                    <strong>
                      確認電郵：
                    </strong>
                    我哋會將申請確認電郵發送到你／你哋於申請表填寫嘅電郵地址。請留意收件箱，並檢查 Spam／Junk 郵件。
                  </>
                }
                en={
                  <>
                    <strong>
                      Confirmation email:
                    </strong>
                    we will send an application confirmation email to the email address(es) provided in your application. Please check your inbox as well as your Spam/Junk folder.
                  </>
                }
              />

              <Localized
                as="p"
                zh={
                  <>
                    如果仍然未收到確認電郵，請聯絡我哋，並提供以上申請參考編號。
                  </>
                }
                en={
                  <>
                    If you still do not receive the confirmation email, please contact us and include the application reference above.
                  </>
                }
              />

              <div
                style={{
                  marginTop: 16,
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <a
                  className="button button-secondary"
                  href={`mailto:${CONTACT_EMAIL}?subject=${emailSubject}`}
                  aria-label={`Email H Infinity at ${CONTACT_EMAIL}`}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      display: "inline-flex",
                      marginRight: 8,
                      verticalAlign: "middle"
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M4 6h16v12H4V6Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <path
                        d="m4 7 8 6 8-6"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>

                  <span>{CONTACT_EMAIL}</span>
                </a>
              </div>
            </div>

            <div
              style={{
                margin: "22px auto",
                maxWidth: 640,
                padding: 16,
                border:
                  "1px solid var(--line)",
                borderRadius: 14
              }}
            >
              <Localized
                as="p"
                zh={
                  <>
                    <strong>
                      下一步：
                    </strong>
                    H Infinity 團隊會按甄選流程處理你嘅申請。如有需要，我哋會透過申請表所提供嘅電郵聯絡你。
                  </>
                }
                en={
                  <>
                    <strong>
                      Next:
                    </strong>
                    the H Infinity team will process your application according to the selection workflow and contact you through the email address provided in your application if needed.
                  </>
                }
              />
            </div>

            <Link
              className="button button-primary"
              href="/apply"
            >
              <Localized
                zh="返回申請頁"
                en="Back to application page"
              />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <ApplicationWizardV2 token={token} />
  );
}
