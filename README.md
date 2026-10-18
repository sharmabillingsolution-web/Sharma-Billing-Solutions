# Sharma Billing Solutions — single-page website

Next.js (App Router) + TypeScript + Tailwind CSS v4 + Resend.

## Run locally
```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
npm run lint                 # type-check
npm run build && npm start   # production
```

## Resend setup
1. Create an API key at resend.com → `RESEND_API_KEY` (server-only; never prefix with `NEXT_PUBLIC_`).
2. Verify a sending domain in Resend, then set `LEADS_FROM_EMAIL` to an address on it. (Without a verified domain Resend only allows limited test sending.)
3. `LEADS_TO_EMAIL` is the inbox for lead notifications. `NEXT_PUBLIC_SITE_URL` sets canonical/OG URLs.

**Behavior:** the form posts JSON to `/api/lead` → Zod validation → honeypot check → rate limit → notification email to you → confirmation email to the lead. Success is shown only after the notification is accepted by Resend. If the confirmation email fails, the lead is still kept (notification already sent), the failure is logged, and the visitor sees success.
**Rate limiting** (`lib/rate-limit.ts`) is in-memory and NOT distributed; on serverless, replace with Upstash/Vercel KV. No lead data is stored or logged.

## Editing content
- `config/site.ts` — name, logo path, contact details, metrics, `DEMO_DATA` and `SHOW_QUALITY_TARGETS` flags, nav.
- `data/content.ts` — services, specialties, 11 process steps (draft), EHR list, clearinghouses, payors, FAQs, resources, testimonials, demo data, quality targets.
- `lib/email.ts` — email templates.

## Before launch, the owner must
- Replace `public/images/logo-placeholder.svg`, `app/icon.svg`, and `public/images/og-image-placeholder.png`.
- Confirm 12 years / 15+ specialties / 14 states, then add approved specialty names, state names, and clearinghouse names.
- Approve or edit the 11 draft process steps.
- Replace or hide all sample dashboard data (`DEMO_DATA=false`), and confirm quality targets before enabling them.
- Add real, permissioned testimonials (the section and nav link stay hidden while empty).
- Set the real `.env.local` / hosting environment variables.
