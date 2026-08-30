import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { applicationSchema } from "@/lib/application-submit-schema";
import {
  getApplicationsDataSource,
  heading2,
  heading3,
  notionJson,
  paragraph,
  richText,
  uploadPdfToNotion
} from "@/lib/notion-applications";

export const runtime = "nodejs";
const MAX_CV_BYTES = 4 * 1024 * 1024;
function referenceNumber() { return `HI-2026-${crypto.randomBytes(3).toString("hex").toUpperCase()}`; }
function safeFilename(value: string) { return value.normalize("NFKD").replace(/[^\w.-]+/g, "_").replace(/_+/g, "_").slice(0, 100); }
function isPdf(file: File) { return file.type === "application/pdf" && file.name.toLowerCase().endsWith(".pdf"); }
function requireProperties(schema: any, names: string[]) {
  const missing = names.filter((name) => !schema.properties?.[name]);
  if (missing.length) throw new Error(`Notion Applications database missing properties: ${missing.join(", ")}`);
}

function optionValue(schema: any, propertyName: string, name: string) {
  const type = schema.properties?.[propertyName]?.type;
  if (type === "status") return { status: { name } };
  if (type === "select") return { select: { name } };
  throw new Error(`${propertyName} must be a Select or Status property in Notion.`);
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const payloadRaw = form.get("payload");
    if (typeof payloadRaw !== "string") return NextResponse.json({ error: "申請資料格式不正確。" }, { status: 400 });
    const parsed = applicationSchema.safeParse(JSON.parse(payloadRaw));
    if (!parsed.success) return NextResponse.json({ error: "請完成所有必填資料、Q1–Q5 及聲明。" }, { status: 400 });

    const data = parsed.data;
    const testMode = process.env.APPLICATION_TEST_MODE === "true";
    const files: Array<File | null> = data.applicants.map((_, index) => { const value = form.get(`cv_${index}`); return value instanceof File && value.size > 0 ? value : null; });
    if (!testMode && files.some((file) => !file)) return NextResponse.json({ error: "每位申請者都需要上載 PDF CV。" }, { status: 400 });

    for (const file of files) {
      if (!file) continue;
      if (!isPdf(file)) return NextResponse.json({ error: "CV 只接受 PDF 格式。" }, { status: 415 });
      if (file.size > MAX_CV_BYTES) return NextResponse.json({ error: "每份 CV 必須為 4MB 或以下。" }, { status: 413 });
      const header = new Uint8Array(await file.slice(0, 5).arrayBuffer());
      const validHeader = header.length >= 5 && header[0] === 0x25 && header[1] === 0x50 && header[2] === 0x44 && header[3] === 0x46 && header[4] === 0x2d;
      if (!validHeader) return NextResponse.json({ error: "CV 檔案內容不是有效 PDF。" }, { status: 415 });
    }

    const { dataSourceId, schema: sourceSchema } = await getApplicationsDataSource();
    const titleProperty = Object.entries(sourceSchema.properties || {}).find(([, property]: any) => property.type === "title")?.[0];
    if (!titleProperty) throw new Error("Cannot find the title property in the Notion Applications database.");

    requireProperties(sourceSchema, [
      "Application Reference", "Application Type", "Team Size", "Submitted At", "Status",
      "Primary Contact — Chinese Name", "Primary Contact — English Name", "Primary Contact — Email", "Primary Contact — Phone",
      "Primary Contact — Institution", "Primary Contact — Programme", "Primary Contact — Year",
      "Q1", "Q2", "Q3", "Q4", "Q5", "Additional Note", "CV Files", "Privacy Consent", "Source"
    ]);

    const reference = referenceNumber();
    const lead = data.applicants[0];
    const uploadedByIndex: Record<number, { id: string; filename: string }> = {};
    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];
      if (!file) continue;
      const applicant = data.applicants[index];
      const role = index === 0 ? "Lead" : `Member${index}`;
      const filename = `${role}_${safeFilename(applicant.englishName || applicant.chineseName)}_CV.pdf`;
      uploadedByIndex[index] = await uploadPdfToNotion(file, filename);
    }
    const uploadedFiles = Object.values(uploadedByIndex);

    const properties: Record<string, any> = {
      [titleProperty]: { title: richText(`${reference}｜${lead.englishName || lead.chineseName}`) },
      "Application Reference": { rich_text: richText(reference) },
      "Application Type": { select: { name: data.applicationType === "team" ? "Team" : "Individual" } },
      "Team Size": { number: data.applicants.length },
      "Submitted At": { date: { start: new Date().toISOString() } },
      "Status": optionValue(sourceSchema, "Status", testMode ? "Test Submission" : "Submitted"),
      "Primary Contact — Chinese Name": { rich_text: richText(lead.chineseName) },
      "Primary Contact — English Name": { rich_text: richText(lead.englishName) },
      "Primary Contact — Email": { email: lead.email },
      "Primary Contact — Phone": { phone_number: lead.phone },
      "Primary Contact — Institution": { rich_text: richText(lead.institution) },
      "Primary Contact — Programme": { rich_text: richText(lead.programme) },
      "Primary Contact — Year": { rich_text: richText(lead.yearOfStudy) },
      "Q1": { rich_text: richText(data.q1) }, "Q2": { rich_text: richText(data.q2) }, "Q3": { rich_text: richText(data.q3) }, "Q4": { rich_text: richText(data.q4) }, "Q5": { rich_text: richText(data.q5) },
      "Additional Note": { rich_text: richText(data.q6) },
      "CV Files": { files: uploadedFiles.map((file) => ({ type: "file_upload", file_upload: { id: file.id }, name: file.filename })) },
      "Privacy Consent": { checkbox: true },
      "Source": { select: { name: "Website" } }
    };

    const cohortPageId = process.env.NOTION_COHORT02_PAGE_ID;
    if (!cohortPageId) {
      throw new Error("NOTION_COHORT02_PAGE_ID is not configured.");
    }

    if (sourceSchema.properties?.Cohort?.type !== "relation") {
      throw new Error("Notion Applications property 'Cohort' is missing or not a relation.");
    }

    properties.Cohort = { relation: [{ id: cohortPageId }] };

    const children: any[] = [heading2("Applicants")];
    data.applicants.forEach((applicant, index) => {
      const role = data.applicationType === "team" ? (index === 0 ? "組長 / Team Lead" : `組員 ${index} / Member ${index}`) : "申請者 / Applicant";
      children.push(heading3(role), paragraph([
        `中文全名：${applicant.chineseName}`, `英文全名：${applicant.englishName}`, `電話：${applicant.phone}`, `電郵：${applicant.email}`,
        `院校 / 學校：${applicant.institution}`, `課程 / 學系：${applicant.programme}`, `年級：${applicant.yearOfStudy}`,
        `CV：${uploadedByIndex[index]?.filename || "Not provided (test mode)"}`
      ].join("\n")));
    });
    children.push(
      heading2("Application Questions"),
      heading3("Q1｜對你而言，甚麼是「香港文化」？"), paragraph(data.q1),
      heading3("Q2｜你認為現時香港最需要甚麼類型的文化項目？為甚麼？"), paragraph(data.q2),
      heading3("Q3｜如果有機會由你／你們發起一個文化項目，你最想做甚麼？"), paragraph(data.q3),
      heading3("Q4｜你認為文化可以如何在當代社會中延續、被重新演繹和實踐？"), paragraph(data.q4),
      heading3("Q5｜你希望在 H Infinity 得到甚麼？"), paragraph(data.q5),
      heading3("Q6｜還有甚麼是你／你們想讓我們知道的？"), paragraph(data.q6 || "—"),
      heading2("Submission Record"), paragraph(`Reference: ${reference}\nSource: Website\nTest Mode: ${testMode ? "Yes" : "No"}`)
    );

    await notionJson("/pages", {
      method: "POST",
      body: JSON.stringify({
        parent: { type: "data_source_id", data_source_id: dataSourceId },
        properties,
        children
      })
    });
    return NextResponse.json({ submitted: true, referenceNumber: reference, testMode });
  } catch (error) {
    console.error("Application submission error", error);
    const testMode = process.env.APPLICATION_TEST_MODE === "true";
    const detail = error instanceof Error ? error.message : "Unknown server error";

    return NextResponse.json(
      {
        error: testMode
          ? `測試提交未能完成：${detail}`
          : "提交暫時未能完成，請稍後再試。如問題持續，請聯絡 H Infinity 團隊。"
      },
      { status: 500 }
    );
  }
}
