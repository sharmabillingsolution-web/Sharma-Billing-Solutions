import { SITE } from "@/config/site";
import type { LeadInput } from "./lead-schema";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const shell = (title: string, body: string) =>
  `<div style="font-family:Arial,Helvetica,sans-serif;background:#F7FAFC;padding:24px"><div style="max-width:560px;margin:auto;background:#fff;border:1px solid #E3EAF1;border-radius:12px;overflow:hidden"><div style="background:#0C172A;color:#fff;padding:18px 24px;font-size:18px;font-weight:bold">${esc(SITE.name)}</div><div style="padding:24px;color:#0C172A;font-size:15px;line-height:1.6"><h2 style="margin:0 0 12px;font-size:20px">${esc(title)}</h2>${body}</div></div></div>`;

export function leadNotification(l: LeadInput) {
  const rows: [string, string][] = [
    ["Name", l.name], ["Work email", l.email], ["Practice", l.practice], ["Phone", l.phone || "—"],
    ["Specialty", l.specialty], ["EHR / PM system", l.ehr || "—"], ["Main challenge", l.challenge],
    ["Context", l.message || "—"], ["Consent to contact", "Yes"], ["Received (UTC)", new Date().toISOString()],
  ];
  const html = shell("New free billing review request", `<table style="width:100%;border-collapse:collapse">${rows.map(([k, v]) => `<tr><td style="padding:6px 8px;border-bottom:1px solid #E3EAF1;color:#5B667A;width:38%;vertical-align:top">${esc(k)}</td><td style="padding:6px 8px;border-bottom:1px solid #E3EAF1;white-space:pre-wrap">${esc(v)}</td></tr>`).join("")}</table>`);
  return { subject: `New billing review request — ${l.practice}`, html, text: rows.map(([k, v]) => `${k}: ${v}`).join("\n") };
}

export function leadConfirmation(l: LeadInput) {
  const html = shell("Thank you for reaching out", `<p>Hello ${esc(l.name)},</p><p>Thank you for contacting ${esc(SITE.name)}. We’ve received your request for a free billing review and our team will follow up with a suitable next step.</p><p>Please don’t send patient information by email.</p><p>— ${esc(SITE.founder.name)}, ${esc(SITE.founder.role)}<br>${esc(SITE.email)}</p>`);
  return { subject: `We received your request — ${SITE.name}`, html, text: `Hello ${l.name},\n\nThank you for contacting ${SITE.name}. We've received your request and our team will follow up with a suitable next step.\n\nPlease don't send patient information by email.\n\n— ${SITE.founder.name}, ${SITE.founder.role}` };
}
