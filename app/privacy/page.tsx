import { Localized } from "@/components/i18n";
import { PageHero } from "@/components/page-hero";

export const metadata = { title: "私隱及資料使用" };

const EMAIL = "info@hinfinityhk.com";

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="私隱與資料"
        eyebrowEn="PRIVACY & DATA USE"
        title="你交俾我哋的資料，只應該用喺清楚講明的地方。"
        titleEn="The information you give us should only be used for clearly stated purposes."
        intro="呢頁說明 H Infinity 招募及網站現時點樣處理申請者資料。"
        introEn="This page explains how H Infinity currently handles applicant information through recruitment and the website."
      />

      <section className="section-tight">
        <div className="shell prose">
          <Localized as="h2" zh="我哋收集咩資料" en="What we collect" />

          <Localized
            as="p"
            zh="申請時，我哋會收集申請者姓名、流動電話、電郵、院校、課程／學系、就讀年級、CV，以及 Q1–Q6 的申請回答。團隊申請會收集每位成員的基本資料及 CV。"
            en="During application, we collect applicants' names, mobile numbers, email addresses, institutions, programmes or departments, year of study, CVs and responses to Q1–Q6. Team applications collect the basic details and CV of each team member."
          />

          <Localized as="h2" zh="資料用嚟做咩" en="How we use it" />

          <Localized
            as="p"
            zh="資料主要用於處理 H Infinity 申請、甄選、聯絡、面試安排（如適用）、計劃行政，以及獲選後的參加者管理。申請處理同意唔會自動等同 Newsletter、宣傳或拍攝授權。"
            en="Information is primarily used to process H Infinity applications, selection, applicant communication, interview arrangements where applicable, programme administration and participant management after selection. Application-processing consent does not automatically include newsletter, promotional or media consent."
          />

          <Localized as="h2" zh="Draft 點樣儲存" en="How drafts are stored" />

          <Localized
            as="p"
            zh="未正式提交之前，申請 Draft 會儲存在你使用的瀏覽器 local storage，方便你用同一部裝置繼續填寫。重新載入或清除瀏覽器資料可能會令 Draft 消失。"
            en="Before final submission, your application draft is stored in your browser's local storage so you can continue on the same device. Clearing browser data or changing devices may remove that draft."
          />

          <Localized as="h2" zh="正式提交之後" en="After final submission" />

          <Localized
            as="p"
            zh="當你正式提交，資料會經網站伺服器傳送到 H Infinity 的內部 Applications database；CV 亦會附加到同一份申請紀錄。現時 Applications database 以 Notion 作內部營運系統，網站由 Vercel 提供託管及伺服器運行。"
            en="When you submit, the information is sent through the website server to H Infinity's internal Applications database, with CV files attached to the same application record. The Applications database currently uses Notion for internal operations, while the website and server functions are hosted on Vercel."
          />

          <Localized as="h2" zh="邊個可以睇" en="Who can access it" />

          <Localized
            as="p"
            zh="申請資料只供 H Infinity 內部計劃運作及獲授權的團隊成員使用，不會公開畀網站訪客瀏覽，亦唔會因為提交申請而公開你的 CV、電話、電郵或內部甄選資料。"
            en="Application information is used for H Infinity's internal programme operations by authorised team members. Website visitors cannot browse applicant records, and submitting an application does not make your CV, phone number, email address or internal selection information public."
          />

          <Localized as="h2" zh="第三方服務" en="Service providers" />

          <Localized
            as="p"
            zh="為咗運作網站同申請流程，我哋會使用提供託管、資料庫及相關技術服務的第三方平台，例如 Vercel 同 Notion。呢啲服務只應按提供服務所需的範圍處理資料。"
            en="To operate the website and application process, we use third-party platforms that provide hosting, database and related technical services, including Vercel and Notion. These services should process information only as needed to provide those services."
          />

          <Localized as="h2" zh="保留、更正與刪除" en="Retention, correction and deletion" />

          <Localized
            as="p"
            zh="我哋只會喺處理招募、計劃行政及合理紀錄需要的期間保留資料，並會按實際用途定期檢視。你如需要查詢、要求更正或提出刪除申請，可以聯絡我哋。"
            en="We retain information only for as long as reasonably needed for recruitment, programme administration and record-keeping, and review it according to its operational purpose. You may contact us to ask questions, request corrections or make a deletion request."
          />

          <Localized as="h2" zh="聯絡" en="Contact" />

          <p>
            <a className="text-link" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </p>

          <Localized
            as="p"
            zh="最後更新：2026 年 8 月 31 日"
            en="Last updated: 31 August 2026"
          />
        </div>
      </section>
    </>
  );
}
