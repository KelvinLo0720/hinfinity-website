import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { hashToken, newResumeToken } from "@/lib/application";

const schema = z.object({ email: z.email().max(320) });

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "請輸入有效電郵地址。" }, { status: 400 });

  const email = parsed.data.email.trim().toLowerCase();
  const token = newResumeToken();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    const demoToken = `demo_${token}`;
    return NextResponse.json({
      demo: true,
      token: demoToken,
      resumeUrl: `/apply/${demoToken}`
    });
  }

  const { data: cohort, error: cohortError } = await supabase
    .from("cohorts")
    .select("id")
    .eq("status", "application_open")
    .order("application_open_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (cohortError || !cohort) {
    return NextResponse.json({ error: "目前未有開放中的 Cohort。請聯絡計劃團隊。" }, { status: 503 });
  }

  const { data: person, error: personError } = await supabase
    .from("people")
    .upsert({ primary_email: email }, { onConflict: "primary_email" })
    .select("id")
    .single();

  if (personError) return NextResponse.json({ error: "未能建立申請者紀錄。" }, { status: 500 });

  const { error: draftError } = await supabase.from("application_drafts").insert({
    person_id: person.id,
    cohort_id: cohort.id,
    verified_email: email,
    resume_token_hash: hashToken(token),
    current_step: 0,
    draft_data: { email },
    expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 120).toISOString()
  });

  if (draftError) return NextResponse.json({ error: "未能建立 Draft。" }, { status: 500 });

  const resumeUrl = `${siteUrl}/apply/${token}`;
  if (process.env.RESEND_API_KEY && process.env.EMAIL_FROM) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "繼續你的 H Infinity 申請",
      html: `<div style="font-family:Arial,sans-serif;line-height:1.6"><h1>你的申請已準備好</h1><p>按以下連結開始或繼續填寫。毋須建立密碼。</p><p><a href="${resumeUrl}">繼續 H Infinity 申請</a></p><p>請不要將此安全連結轉交其他人。</p></div>`
    });
  }

  const showDirectLink = process.env.NEXT_PUBLIC_DEMO_MODE === "true" || !process.env.RESEND_API_KEY;
  return NextResponse.json({ sent: true, token: showDirectLink ? token : undefined, resumeUrl: showDirectLink ? `/apply/${token}` : undefined });
}
