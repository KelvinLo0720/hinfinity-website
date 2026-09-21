import { Localized } from "@/components/i18n";
import { PageHero } from "@/components/page-hero";

export const metadata = {
  title: "私隱與個人資料政策"
};

const EMAIL = "info@hinfinityhk.com";

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="私隱與個人資料"
        eyebrowEn="PRIVACY & PERSONAL DATA"
        title="私隱與個人資料政策"
        titleEn="Privacy and Personal Data Notice"
        intro="本政策遵照香港《個人資料（私隱）條例》（第486章）制定，說明 H Infinity 招募計劃及網站如何收集、使用及保護申請者的個人資料。"
        introEn='This Privacy Policy explains how H Infinity ("we", "us" or "our") collects, uses, discloses and protects the personal information of applicants in connection with our recruitment programme and website. We handle personal information in accordance with the Personal Data (Privacy) Ordinance (Cap. 486) of Hong Kong.'
      />

      <section className="section-tight">
        <div className="shell prose">
          <Localized
            as="h2"
            zh="∞ 我們收集的個人資料"
            en="∞ Personal Data We Collect"
          />

          <Localized
            as="div"
            zh={
              <>
                <p>申請時，我們會收集：</p>

                <ul>
                  <li>姓名、流動電話號碼、電郵地址</li>
                  <li>院校、課程／學系、就讀年級</li>
                  <li>個人履歷（CV）</li>
                  <li>申請表格 Q1–Q6 的回答</li>
                </ul>

                <p>
                  團隊申請亦會收集每位成員的基本資料及履歷。
                </p>
              </>
            }
            en={
              <>
                <p>When you apply, we collect:</p>

                <ul>
                  <li>
                    Name, mobile phone number and email address
                  </li>
                  <li>
                    Institution, programme / department, and year of
                    study
                  </li>
                  <li>Your CV</li>
                  <li>
                    Your answers to questions Q1–Q6 in the application
                    form
                  </li>
                </ul>

                <p>
                  For team applications, we also collect the basic
                  information and CV of each team member.
                </p>
              </>
            }
          />

          <Localized
            as="h2"
            zh="∞ 收集資料的目的"
            en="∞ How We Use Your Information"
          />

          <Localized
            as="div"
            zh={
              <>
                <p>個人資料將用於以下用途：</p>

                <ul>
                  <li>處理及甄選申請</li>
                  <li>聯絡申請者</li>
                  <li>安排面試及後續甄選環節（如適用）</li>
                  <li>計劃行政及獲選後的參加者管理</li>
                </ul>

                <p>
                  申請處理的同意，不會自動等同訂閱通訊
                  （Newsletter）、宣傳或拍攝授權。上述用途會另行取得你的明確同意。
                </p>
              </>
            }
            en={
              <>
                <p>
                  We use your personal information for the following
                  purposes:
                </p>

                <ul>
                  <li>Processing and assessing your application</li>
                  <li>Contacting you</li>
                  <li>
                    Arranging interviews and subsequent selection
                    stages (where applicable)
                  </li>
                  <li>
                    Programme administration and managing selected
                    participants
                  </li>
                </ul>

                <p>
                  Your consent to the processing of your application
                  does not automatically extend to newsletter
                  subscription, marketing, filming or photography
                  authorisation. We will seek your separate, explicit
                  consent for such purposes.
                </p>
              </>
            }
          />

          <Localized
            as="h2"
            zh="∞ 草稿（Draft）如何儲存"
            en="∞ How Drafts Are Stored"
          />

          <Localized
            as="p"
            zh="未正式提交前，申請草稿會儲存在你使用的瀏覽器 local storage，方便你用同一部裝置繼續填寫。重新載入頁面或清除瀏覽器資料，可能會令草稿消失。"
            en="Before formal submission, application drafts are stored in your browser's local storage so you can continue completing the form on the same device. Reloading the page or clearing your browser data may cause your draft to be lost."
          />

          <Localized
            as="h2"
            zh="∞ 正式提交後"
            en="∞ After Submission"
          />

          <Localized
            as="p"
            zh="正式提交後，你的資料會經網站伺服器傳送至 H Infinity 的內部資料庫；現時資料庫以 Notion 作內部營運系統，網站與伺服器經 Vercel 運行。"
            en="Once you submit your application, your information is transmitted via our website server to H Infinity's internal database. The database currently runs on Notion as our internal operations system, and the website and server run on Vercel."
          />

          <Localized
            as="h2"
            zh="∞ 誰可以查閱"
            en="∞ Who Can Access"
          />

          <Localized
            as="p"
            zh="申請資料只供 H Infinity 內部計劃運作及獲授權的團隊成員使用，不會公開予網站訪客瀏覽。我們不會因你提交申請而公開你的履歷、電話、電郵或內部甄選資料。"
            en="Application information is accessible only to H Infinity's internal programme operations and authorised team members, and is not made available to website visitors. Submitting an application will not result in your CV, phone number, email address, or internal selection information being publicly disclosed."
          />

          <Localized
            as="h2"
            zh="∞ 資料轉移與第三方服務"
            en="∞ Data Transfer and Third-Party Services"
          />

          <Localized
            as="div"
            zh={
              <>
                <p>
                  為運作網站及申請流程，我們會使用提供託管、資料庫及相關技術服務的第三方平台，包括
                  Vercel（網站託管）及 Notion（內部申請資料庫）。這些平台只會在提供服務所需的範圍內處理資料。
                </p>

                <p>
                  除上述服務供應商外，我們不會向任何第三方披露或轉移你的個人資料。我們不會出售你的個人資料。
                </p>
              </>
            }
            en={
              <>
                <p>
                  To operate the website and application process, we
                  engage third-party service providers that provide
                  hosting, database and related technical services,
                  including Vercel (website hosting) and Notion
                  (internal application database). These providers are
                  authorised to use your personal information only as
                  necessary to provide these services to us.
                </p>

                <p>
                  Apart from the service providers described above, we
                  do not disclose or transfer your personal information
                  to any third party. We do not sell, rent your personal
                  information to any third parties.
                </p>
              </>
            }
          />

          <Localized
            as="h2"
            zh="∞ 資料安全"
            en="∞ Data Security"
          />

          <Localized
            as="p"
            zh="我們採取技術及行政措施保護個人資料，包括只限獲授權成員查閱、以存取控制管理內部系統，並使用第三方平台，例如 Vercel 與 Notion 提供的安全功能（包括加密傳輸及登入驗證）。"
            en="We take technical and administrative measures to protect personal data, including limiting access to authorised members, managing internal systems through access controls, and using the security features provided by third-party platforms such as Vercel and Notion (including encrypted transmission and login authentication)."
          />

          <Localized
            as="h2"
            zh="∞ 資料保留"
            en="∞ Data Retention"
          />

          <Localized
            as="p"
            zh="我們只會在處理招募、計劃行政及合理紀錄所需的期間保留資料，並定期檢視。未獲選申請者的資料，一般會保留 12 個月後銷毀；獲選參加者的資料會保留至計劃完結及合理跟進所需的期間。"
            en="We retain personal data only for as long as necessary to process recruitment, administer the programme and meet legitimate record-keeping needs, and we review this periodically. Personal data of unsuccessful applicants will generally be retained for 12 months before destruction; personal data of selected participants will be retained until the completion of the programme and for such period as is necessary for reasonable follow-up."
          />

          <Localized
            as="h2"
            zh="∞ 查閱、更正與刪除"
            en="∞ Access and Correction of Data"
          />

          <Localized
            as="p"
            zh="根據《個人資料（私隱）條例》，你有權查閱、更正或刪除你的個人資料。如需行使上述權利，或對本政策有任何疑問，可經電郵聯絡我們。"
            en="Under the Personal Data (Privacy) Ordinance, you have the right to request access to, rectification, or erasure of your personal data. To exercise these rights, or if you have any questions about this policy, you may contact us by email."
          />

          <Localized
            as="h2"
            zh="聯絡"
            en="Contact"
          />

          <p>
            <a
              className="text-link"
              href={`mailto:${EMAIL}`}
            >
              {EMAIL}
            </a>
          </p>

          <Localized
            as="p"
            zh="最後更新：2026 年 9 月 20 日"
            en="Last updated: 20 September 2026"
          />

          <Localized
            as="p"
            zh="註：如中、英文版本內容有任何歧異，概以英文版本為準。"
            en="Note: In the event of any inconsistency between the Chinese and English versions, the English version shall prevail."
          />
        </div>
      </section>
    </>
  );
}
