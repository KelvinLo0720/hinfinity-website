const NOTION_VERSION = "2026-03-11";
const NOTION_BASE = "https://api.notion.com/v1";

type NotionDatabase = {
  id: string;
  data_sources?: Array<{ id: string; name?: string }>;
};

export function getNotionToken() {
  const token = process.env.NOTION_API_KEY;
  if (!token) throw new Error("NOTION_API_KEY is not configured.");
  return token;
}

export function getApplicationsDatabaseId() {
  const databaseId = process.env.NOTION_APPLICATIONS_DATABASE_ID;
  if (!databaseId) throw new Error("NOTION_APPLICATIONS_DATABASE_ID is not configured.");
  return databaseId;
}

export async function notionJson<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getNotionToken();
  const response = await fetch(`${NOTION_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
      ...(init.headers || {})
    },
    cache: "no-store"
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    console.error("Notion API error", response.status, data);
    throw new Error(data?.message || `Notion API error (${response.status})`);
  }

  return data as T;
}

export async function resolveApplicationsDataSourceId() {
  const override = process.env.NOTION_APPLICATIONS_DATA_SOURCE_ID;
  if (override) return override;

  const databaseId = getApplicationsDatabaseId();
  const database = await notionJson<NotionDatabase>(`/databases/${databaseId}`);
  const sources = database.data_sources || [];

  if (sources.length === 0) {
    throw new Error("No data source found under the Applications database.");
  }

  if (sources.length === 1) return sources[0].id;

  const applicationsSource = sources.find((source) =>
    (source.name || "").trim().toLowerCase() === "applications"
  );

  if (applicationsSource) return applicationsSource.id;

  throw new Error(
    "Applications database has multiple data sources. Set NOTION_APPLICATIONS_DATA_SOURCE_ID explicitly."
  );
}

export async function getApplicationsDataSource() {
  const dataSourceId = await resolveApplicationsDataSourceId();
  const schema = await notionJson<any>(`/data_sources/${dataSourceId}`);
  return { dataSourceId, schema };
}

export function richText(content: string) {
  const chunks: any[] = [];
  const value = content || "";

  for (let index = 0; index < value.length; index += 1900) {
    chunks.push({ type: "text", text: { content: value.slice(index, index + 1900) } });
  }

  return chunks.length ? chunks : [{ type: "text", text: { content: "" } }];
}

export function paragraph(content: string) {
  return {
    object: "block",
    type: "paragraph",
    paragraph: { rich_text: richText(content) }
  };
}

export function heading2(content: string) {
  return {
    object: "block",
    type: "heading_2",
    heading_2: { rich_text: richText(content) }
  };
}

export function heading3(content: string) {
  return {
    object: "block",
    type: "heading_3",
    heading_3: { rich_text: richText(content) }
  };
}

export async function uploadPdfToNotion(file: File, filename: string) {
  const token = getNotionToken();

  const createResponse = await fetch(`${NOTION_BASE}/file_uploads`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      mode: "single_part",
      filename,
      content_type: "application/pdf"
    })
  });

  const created = await createResponse.json();

  if (!createResponse.ok) {
    console.error("Notion file upload create error", created);
    throw new Error(created?.message || "Unable to prepare CV upload.");
  }

  const uploadForm = new FormData();
  uploadForm.append("file", file, filename);

  const sendResponse = await fetch(created.upload_url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION
    },
    body: uploadForm
  });

  const uploaded = await sendResponse.json();

  if (!sendResponse.ok || uploaded.status !== "uploaded") {
    console.error("Notion file upload send error", uploaded);
    throw new Error(uploaded?.message || "Unable to upload CV.");
  }

  return { id: uploaded.id as string, filename };
}
