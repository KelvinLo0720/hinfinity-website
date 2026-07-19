import { NextResponse } from "next/server";
import { z } from "zod";
import { hashToken } from "@/lib/application";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const schema = z.object({ token: z.string().min(20), data: z.record(z.string(), z.unknown()), currentStep: z.number().int().min(0).max(20) });

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "無效 Draft 資料。" }, { status: 400 });
  if (parsed.data.token.startsWith("demo_")) return NextResponse.json({ saved: true, demo: true });

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase 尚未設定。" }, { status: 503 });

  const { error } = await supabase
    .from("application_drafts")
    .update({ draft_data: parsed.data.data, current_step: parsed.data.currentStep, last_saved_at: new Date().toISOString() })
    .eq("resume_token_hash", hashToken(parsed.data.token))
    .is("submitted_at", null);

  if (error) return NextResponse.json({ error: "未能儲存 Draft。" }, { status: 500 });
  return NextResponse.json({ saved: true });
}
