import { NextResponse } from "next/server";
import { Resend } from "resend";
import { leadSchema } from "@/lib/lead-schema";
import { leadNotification, leadConfirmation } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
const MAX_BYTES = 10_000;
const fail = (status: number, error: string, fields?: unknown) => NextResponse.json({ ok: false, error, fields }, { status });

export async function POST(req: Request) {
  if (!req.headers.get("content-type")?.includes("application/json")) return fail(415, "Unsupported request.");
  const raw = await req.text();
  if (raw.length > MAX_BYTES) return fail(413, "Request too large.");
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!rateLimit(ip)) return fail(429, "Too many requests. Please try again later or contact us directly.");

  let body: Record<string, unknown>;
  try { body = JSON.parse(raw); } catch { return fail(400, "Invalid request."); }

  // Honeypot: bots fill the hidden field. Respond as if accepted, send nothing.
  if (typeof body.website === "string" && body.website.length > 0) return NextResponse.json({ ok: true });

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) return fail(400, "Please check the highlighted fields.", parsed.error.flatten().fieldErrors);
  const lead = parsed.data;

  const key = process.env.RESEND_API_KEY, to = process.env.LEADS_TO_EMAIL, from = process.env.LEADS_FROM_EMAIL;
  if (!key || !to || !from) { console.error("[lead] Missing Resend environment variables"); return fail(500, "We couldn’t send your request right now."); }

  const resend = new Resend(key);
  const n = leadNotification(lead);
  try {
    const { error } = await resend.emails.send({ from, to, replyTo: lead.email, subject: n.subject, html: n.html, text: n.text });
    if (error) { console.error("[lead] notification failed:", error.name); return fail(500, "We couldn’t send your request right now."); }
  } catch { console.error("[lead] notification threw"); return fail(500, "We couldn’t send your request right now."); }

  // The lead is already safely delivered; a failed confirmation is logged but does not fail the request.
  try {
    const c = leadConfirmation(lead);
    const { error } = await resend.emails.send({ from, to: lead.email, subject: c.subject, html: c.html, text: c.text });
    if (error) console.error("[lead] confirmation failed:", error.name);
  } catch { console.error("[lead] confirmation threw"); }

  return NextResponse.json({ ok: true });
}
