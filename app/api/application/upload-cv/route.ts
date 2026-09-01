import { NextResponse } from "next/server";
import { uploadPdfToNotion } from "@/lib/notion-applications";

export const runtime = "nodejs";

const MAX_CV_BYTES = 4 * 1024 * 1024;

function safeFilename(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[^\w.-]+/g, "_")
    .replace(/_+/g, "_")
    .slice(0, 100);
}

function isPdf(file: File) {
  return (
    file.type === "application/pdf" &&
    file.name.toLowerCase().endsWith(".pdf")
  );
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const value = form.get("file");
    const roleRaw = form.get("role");
    const applicantNameRaw = form.get("applicantName");

    if (!(value instanceof File) || value.size === 0) {
      return NextResponse.json(
        { error: "請選擇一份 PDF CV。" },
        { status: 400 }
      );
    }

    if (!isPdf(value)) {
      return NextResponse.json(
        { error: "CV 只接受 PDF 格式。" },
        { status: 415 }
      );
    }

    if (value.size > MAX_CV_BYTES) {
      return NextResponse.json(
        { error: "每份 CV 必須為 4MB 或以下。" },
        { status: 413 }
      );
    }

    const header = new Uint8Array(
      await value.slice(0, 5).arrayBuffer()
    );

    const validHeader =
      header.length >= 5 &&
      header[0] === 0x25 &&
      header[1] === 0x50 &&
      header[2] === 0x44 &&
      header[3] === 0x46 &&
      header[4] === 0x2d;

    if (!validHeader) {
      return NextResponse.json(
        { error: "CV 檔案內容不是有效 PDF。" },
        { status: 415 }
      );
    }

    const role =
      typeof roleRaw === "string" && roleRaw.trim()
        ? safeFilename(roleRaw)
        : "Applicant";

    const applicantName =
      typeof applicantNameRaw === "string" &&
      applicantNameRaw.trim()
        ? safeFilename(applicantNameRaw)
        : "Applicant";

    const filename = `${role}_${applicantName}_CV.pdf`;

    const uploaded = await uploadPdfToNotion(
      value,
      filename
    );

    return NextResponse.json({
      uploaded: true,
      uploadId: uploaded.id,
      filename: uploaded.filename
    });
  } catch (error) {
    console.error("CV upload error", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "CV 上載失敗，請稍後再試。"
      },
      { status: 500 }
    );
  }
}
