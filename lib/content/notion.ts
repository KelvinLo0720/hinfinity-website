/**
 * Optional Notion content adapter.
 *
 * Recommended use: public portfolio content such as projects, stories and partners.
 * Do not use Notion as the primary store for applicant personal data. Keep applicant
 * records in Supabase/Postgres and, if useful, sync a minimal operational view to Notion.
 */
const NOTION_VERSION = "2025-09-03";

export async function queryNotionDataSource(dataSourceId: string) {
  const token = process.env.NOTION_TOKEN;
  if (!token) throw new Error("NOTION_TOKEN is not configured");

  const response = await fetch(`https://api.notion.com/v1/data_sources/${dataSourceId}/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ page_size: 100 }),
    next: { revalidate: 300 }
  });

  if (!response.ok) {
    throw new Error(`Notion query failed: ${response.status}`);
  }

  return response.json();
}
