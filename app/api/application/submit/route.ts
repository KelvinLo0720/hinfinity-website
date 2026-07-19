import { NextResponse } from "next/server";
import { z } from "zod";
import { applicationSchemaVersion, hashToken, referenceNumber } from "@/lib/application";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const schema = z.object({ token: z.string().min(20), data: z.record(z.string(), z.unknown()) });

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "申請內容格式不正確。" }, { status: 400 });
  const reference = referenceNumber();

  if (parsed.data.token.startsWith("demo_")) {
    return NextResponse.json({ submitted: true, demo: true, referenceNumber: reference });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase 尚未設定。" }, { status: 503 });

  const tokenHash = hashToken(parsed.data.token);
  const { data: draft, error: draftError } = await supabase
    .from("application_drafts")
    .select("id,person_id,cohort_id,submitted_at")
    .eq("resume_token_hash", tokenHash)
    .maybeSingle();

  if (draftError || !draft) return NextResponse.json({ error: "找不到有效 Draft。" }, { status: 404 });
  if (draft.submitted_at) return NextResponse.json({ error: "此申請已提交。" }, { status: 409 });

  const { error: applicationError } = await supabase.from("applications").insert({
    person_id: draft.person_id,
    cohort_id: draft.cohort_id,
    draft_id: draft.id,
    status: "submitted",
    submitted_at: new Date().toISOString(),
    final_snapshot: parsed.data.data,
    schema_version: applicationSchemaVersion,
    reference_number: reference
  });

  if (applicationError) return NextResponse.json({ error: "未能提交申請。" }, { status: 500 });

  await supabase.from("application_drafts").update({ submitted_at: new Date().toISOString() }).eq("id", draft.id);
  return NextResponse.json({ submitted: true, referenceNumber: reference });
}
