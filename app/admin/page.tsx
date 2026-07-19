import Link from "next/link";

export const metadata = { title: "Admin Demo" };

const demoRows = [
  ["HI-2026-A13F9C", "Demo Applicant A", "Humanities", "Under review", "Reviewer 01"],
  ["HI-2026-B84D2A", "Demo Applicant B", "Design", "Shortlisted", "Reviewer 02"],
  ["HI-2026-C55E10", "Demo Applicant C", "Engineering", "Submitted", "Unassigned"],
  ["HI-2026-D21A48", "Demo Applicant D", "Community Work", "Interview", "Panel A"]
];

export default function AdminPage() {
  return (
    <section className="admin-shell">
      <div className="shell">
        <div className="admin-header">
          <div><span className="eyebrow">INTERNAL PLATFORM</span><h1>Application Dashboard</h1></div>
          <div className="button-row"><span className="demo-badge">STATIC DEMO DATA</span><Link className="button button-dark" href="/">Public Site</Link></div>
        </div>
        <div className="metric-grid">
          <div className="metric"><b>24</b><span>Submitted</span></div>
          <div className="metric"><b>11</b><span>Under Review</span></div>
          <div className="metric"><b>6</b><span>Shortlisted</span></div>
          <div className="metric"><b>4</b><span>Interviews</span></div>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Reference</th><th>Applicant</th><th>Background</th><th>Status</th><th>Assigned to</th></tr></thead>
            <tbody>{demoRows.map((row) => <tr key={row[0]}>{row.map((value, index) => <td key={value}>{index === 3 ? <span className="status-pill">{value}</span> : value}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <div className="sticky-note" style={{ marginTop: 32, position: "relative", top: "auto", maxWidth: 760 }}>
          <h3>正式版本會加入</h3>
          <p>Admin Auth、Reviewer 權限、申請搜尋／篩選、評分表、內部 Notes、面試安排、CSV 匯出、操作紀錄、Participant／Alumni 轉換與 CMS。</p>
          <p>此 Demo 頁面不會讀取真實申請者資料。</p>
        </div>
      </div>
    </section>
  );
}
