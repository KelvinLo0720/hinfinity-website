import { PageHero } from "@/components/page-hero";

export const metadata = { title: "私隱政策 Demo" };
export default function PrivacyPage() {
  return <><PageHero eyebrow="PRIVACY & DATA" title="收集資料，亦要清楚交代責任。" intro="以下為網站 Demo 架構，不構成法律意見。正式招募前應由熟悉香港私隱法規的人士審閱。" /><section className="section-tight"><div className="shell prose"><h2>收集目的</h2><p>申請者資料只應用於處理申請、甄選、面試、參加者管理、項目評估及經明確同意的後續聯絡。</p><h2>資料最少化</h2><p>只收集完成甄選與計劃管理所需資料。Newsletter、拍攝授權及申請處理同意應分開處理。</p><h2>存取與保安</h2><p>申請者私人資料儲存在 Supabase/Postgres，並以角色權限及 Row Level Security 限制存取。公開網站內容可選擇由 Notion 或內置 CMS 管理，但不建議把完整申請者個人資料放在 Notion 作主要 Database。</p><h2>保留與刪除</h2><p>未提交 Draft、已拒絕申請、參加者及 Alumni 資料應有不同保留期限，並建立查閱、更正及刪除流程。</p></div></section></>;
}
