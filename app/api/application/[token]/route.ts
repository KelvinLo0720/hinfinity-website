import { NextResponse } from "next/server";
import { hashToken } from "@/lib/application";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export async function GET(_request: Request, context: { params: Promise<{ token: string }> }) {
  const { token } = await context.params;
  if (token.startsWith("demo_")) return NextResponse.json({ draft: null, demo: true });
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase 尚未設定。" }, { status: 503 });

  const { data, error } = await supabase
    .from("application_drafts")
    .select("draft_data,current_step,last_saved_at,expires_at,submitted_at")
    .eq("resume_token_hash", hashToken(token))
    .maybeSingle();

  if (error || !data) return NextResponse.json({ error: "找不到 Draft 或連結已失效。" }, { status: 404 });
  if (new Date(data.expires_at) < new Date()) return NextResponse.json({ error: "此連結已過期。" }, { status: 410 });
  return NextResponse.json({ draft: data });
}
