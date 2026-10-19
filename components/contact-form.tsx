"use client";

import { useState, type FormEvent } from "react";
import {
    ArrowRight,
    AlertCircle,
    CheckCircle2,
    Loader2,
    ShieldCheck,
} from "lucide-react";

import {
    leadSchema,
    SPECIALTY_OPTIONS,
    CHALLENGE_OPTIONS,
} from "@/lib/lead-schema";

import { SITE } from "@/config/site";

type Errs = Record<string, string[] | undefined>;
type FormStatus = "idle" | "submitting" | "success" | "error";

const inputClass =
    "mt-2 block min-h-12 w-full rounded-xl border border-line bg-white px-3.5 py-3 text-sm text-navy outline-none transition placeholder:text-subtle hover:border-line-strong focus-visible:border-brand focus-visible:ring-4 focus-visible:ring-brand/10 aria-[invalid=true]:border-red-500 aria-[invalid=true]:bg-red-50/30 disabled:cursor-not-allowed disabled:opacity-60";

const labelClass = "block text-sm font-semibold tracking-tight text-navy";

const requiredMark = (
    <span className="ml-1 text-brand" aria-hidden="true">
        *
    </span>
);

export function ContactForm() {
    const [status, setStatus] = useState<FormStatus>("idle");
    const [errs, setErrs] = useState<Errs>({});
    const [msg, setMsg] = useState("");

    const err = (name: string) => errs[name]?.[0];

    const clearError = (name: string) => {
        setErrs((current) => {
            if (!current[name]) return current;

            const next = { ...current };
            delete next[name];
            return next;
        });

        if (status === "error") {
            setStatus("idle");
            setMsg("");
        }
    };

    const fieldProps = (name: string, hintId?: string) => {
        const errorId = err(name) ? `${name}-error` : undefined;
        const describedBy = [errorId, hintId].filter(Boolean).join(" ");

        return {
            id: name,
            name,
            "aria-invalid": Boolean(err(name)),
            "aria-describedby": describedBy || undefined,
            onChange: () => clearError(name),
        };
    };

    function FieldError({ name }: { name: string }) {
        const message = err(name);

        if (!message) return null;

        return (
            <p
                id={`${name}-error`}
                className="mt-2 flex items-start gap-1.5 text-sm font-medium leading-5 text-red-600"
            >
                <AlertCircle
                    className="mt-0.5 size-4 shrink-0"
                    aria-hidden="true"
                />
                <span>{message}</span>
            </p>
        );
    }

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (status === "submitting") return;

        const form = e.currentTarget;
        const formData = new FormData(form);

        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            practice: formData.get("practice"),
            phone: formData.get("phone") || "",
            specialty: formData.get("specialty"),
            ehr: formData.get("ehr") || "",
            challenge: formData.get("challenge"),
            message: formData.get("message") || "",
            consent: formData.get("consent") === "on",
            website: formData.get("website") || "",
        };

        const validation = leadSchema.safeParse(data);

        if (!validation.success) {
            const fieldErrors = validation.error.flatten().fieldErrors as Errs;

            setErrs(fieldErrors);
            setStatus("idle");
            setMsg("");

            const firstInvalidField = Object.keys(fieldErrors).find(
                (name) => fieldErrors[name]?.length,
            );

            if (firstInvalidField) {
                document.getElementById(firstInvalidField)?.focus();
            }

            return;
        }

        setErrs({});
        setStatus("submitting");
        setMsg("");

        try {
            const response = await fetch("/api/lead", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const payload = (await response.json().catch(() => null)) as Record<
                string,
                unknown
            > | null;

            if (response.ok && payload?.ok === true) {
                setStatus("success");
                return;
            }

            if (
                response.status === 400 &&
                typeof payload?.fields === "object" &&
                payload.fields !== null
            ) {
                const fieldErrors = payload.fields as Errs;

                setErrs(fieldErrors);
                setStatus("idle");

                const firstInvalidField = Object.keys(fieldErrors).find(
                    (name) => fieldErrors[name]?.length,
                );

                if (firstInvalidField) {
                    document.getElementById(firstInvalidField)?.focus();
                }

                return;
            }

            setMsg(
                typeof payload?.error === "string"
                    ? payload.error
                    : "We couldn't submit your request. Please try again.",
            );

            setStatus("error");
        } catch {
            setMsg(
                "We couldn't reach the server. Please check your connection and try again.",
            );
            setStatus("error");
        }
    }

    const fallbackPhone = SITE.phones[1] ?? SITE.phones[0];

    /* Success state */
    if (status === "success") {
        return (
            <div
                role="status"
                aria-live="polite"
                className="contact-form-success relative overflow-hidden rounded-3xl border border-mint/30 bg-white p-7 shadow-soft sm:p-10"
            >
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-mint/10 blur-3xl"
                />

                <div className="relative">
                    <div className="contact-form-success-icon grid size-14 place-items-center rounded-2xl border border-mint/20 bg-aqua">
                        <CheckCircle2
                            className="size-7 text-[#0b6f62]"
                            aria-hidden="true"
                        />
                    </div>

                    <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#0b8878]">
                        Request received
                    </p>

                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
                        Thank you for reaching out.
                    </h3>

                    <p className="mt-3 max-w-lg text-sm leading-7 text-muted sm:text-base">
                        Your request has been submitted successfully. Our team
                        will follow up using the contact details you provided.
                    </p>

                    <div className="contact-form-success-note mt-6 flex items-start gap-3 rounded-xl border border-line bg-canvas p-4">
                        <ShieldCheck
                            className="mt-0.5 size-5 shrink-0 text-mint"
                            aria-hidden="true"
                        />
                        <p className="text-sm leading-6 text-muted">
                            Please remember not to share patient records or
                            protected health information through general website
                            forms.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <form
            onSubmit={onSubmit}
            noValidate
            aria-label="Request a free medical billing review"
            aria-busy={status === "submitting"}
            className="contact-form-shell surface-card rounded-3xl p-5 shadow-soft sm:p-8 lg:p-9"
        >
            {/* Form heading */}
            <div className="contact-form-heading mb-7 border-b border-line pb-6">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand/5 px-3 py-1.5 text-xs font-semibold text-brand">
                    <span
                        aria-hidden="true"
                        className="size-1.5 rounded-full bg-mint"
                    />
                    Free billing review
                </div>

                <h3 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
                    Tell us about your practice.
                </h3>

                <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
                    Share a few details about your practice and billing needs.
                    We'll use this information to understand how we can help.
                </p>

                <p className="mt-4 text-xs text-muted">
                    Fields marked with{" "}
                    <span className="font-semibold text-brand">*</span> are
                    required.
                </p>
            </div>

            {/* Form fields */}
            <div className="contact-form-fields grid gap-x-5 gap-y-5 sm:grid-cols-2">
                {/* Name */}
                <div className="min-w-0">
                    <label htmlFor="name" className={labelClass}>
                        Full name{requiredMark}
                    </label>

                    <input
                        {...fieldProps("name")}
                        type="text"
                        autoComplete="name"
                        placeholder="Dr. Jane Smith"
                        required
                        disabled={status === "submitting"}
                        className={inputClass}
                    />

                    <FieldError name="name" />
                </div>

                {/* Email */}
                <div className="min-w-0">
                    <label htmlFor="email" className={labelClass}>
                        Work email{requiredMark}
                    </label>

                    <input
                        {...fieldProps("email")}
                        type="email"
                        autoComplete="email"
                        placeholder="you@yourpractice.com"
                        required
                        disabled={status === "submitting"}
                        className={inputClass}
                    />

                    <FieldError name="email" />
                </div>

                {/* Practice */}
                <div className="min-w-0">
                    <label htmlFor="practice" className={labelClass}>
                        Practice / organization{requiredMark}
                    </label>

                    <input
                        {...fieldProps("practice")}
                        type="text"
                        autoComplete="organization"
                        placeholder="Your practice name"
                        required
                        disabled={status === "submitting"}
                        className={inputClass}
                    />

                    <FieldError name="practice" />
                </div>

                {/* Phone */}
                <div className="min-w-0">
                    <label htmlFor="phone" className={labelClass}>
                        Phone number{" "}
                        <span className="font-normal text-muted">
                            (optional)
                        </span>
                    </label>

                    <input
                        {...fieldProps("phone")}
                        type="tel"
                        autoComplete="tel"
                        placeholder="+1 (555) 123-4567"
                        disabled={status === "submitting"}
                        className={inputClass}
                    />

                    <FieldError name="phone" />
                </div>

                {/* Specialty */}
                <div className="min-w-0">
                    <label htmlFor="specialty" className={labelClass}>
                        Primary specialty
                    </label>

                    <select
                        {...fieldProps("specialty")}
                        defaultValue="Internal Medicine"
                        disabled={status === "submitting"}
                        className={inputClass}
                    >
                        {SPECIALTY_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <FieldError name="specialty" />
                </div>

                {/* EHR */}
                <div className="min-w-0">
                    <label htmlFor="ehr" className={labelClass}>
                        Current EHR / practice management
                    </label>

                    <input
                        {...fieldProps("ehr")}
                        type="text"
                        placeholder="e.g. Your current EHR"
                        disabled={status === "submitting"}
                        className={inputClass}
                    />

                    <FieldError name="ehr" />
                </div>

                {/* Challenge */}
                <div className="min-w-0 sm:col-span-2">
                    <label htmlFor="challenge" className={labelClass}>
                        Main billing challenge
                    </label>

                    <select
                        {...fieldProps("challenge")}
                        defaultValue="Denials"
                        disabled={status === "submitting"}
                        className={inputClass}
                    >
                        {CHALLENGE_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <FieldError name="challenge" />
                </div>

                {/* Additional message */}
                <div className="min-w-0 sm:col-span-2">
                    <label htmlFor="message" className={labelClass}>
                        Additional context{" "}
                        <span className="font-normal text-muted">
                            (optional)
                        </span>
                    </label>

                    <textarea
                        {...fieldProps("message", "message-help")}
                        rows={4}
                        maxLength={1500}
                        placeholder="Tell us about your current billing workflow or the challenges you'd like to address."
                        disabled={status === "submitting"}
                        className={`${inputClass} min-h-32 resize-y leading-6`}
                    />

                    <div className="mt-2 flex items-start gap-2 rounded-xl border border-amber-200/80 bg-amber-50 p-3.5">
                        <ShieldCheck
                            className="mt-0.5 size-4 shrink-0 text-amber-700"
                            aria-hidden="true"
                        />

                        <p
                            id="message-help"
                            className="text-xs leading-5 text-amber-950"
                        >
                            <strong className="font-semibold">
                                Protect patient privacy.
                            </strong>{" "}
                            Do not include patient names, medical records,
                            insurance IDs, dates of birth, or other protected
                            health information.
                        </p>
                    </div>

                    <FieldError name="message" />
                </div>

                {/* Honeypot field for basic spam detection */}
                <div
                    aria-hidden="true"
                    className="contact-form-honeypot absolute left-[-9999px] h-0 w-0 overflow-hidden"
                >
                    <label htmlFor="website">
                        Website
                        <input
                            id="website"
                            name="website"
                            type="text"
                            tabIndex={-1}
                            autoComplete="off"
                        />
                    </label>
                </div>

                {/* Consent */}
                <div className="sm:col-span-2">
                    <div className="rounded-xl border border-line bg-canvas/70 p-4">
                        <label
                            htmlFor="consent"
                            className="flex cursor-pointer items-start gap-3"
                        >
                            <input
                                type="checkbox"
                                name="consent"
                                id="consent"
                                required
                                aria-invalid={Boolean(err("consent"))}
                                aria-describedby={
                                    err("consent") ? "consent-error" : undefined
                                }
                                onChange={() => clearError("consent")}
                                disabled={status === "submitting"}
                                className="mt-0.5 size-5 shrink-0 cursor-pointer rounded border-line accent-brand focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-brand"
                            />

                            <span className="text-sm leading-6 text-muted">
                                I agree to be contacted by Sharma Billing
                                Solutions regarding this inquiry.
                                {requiredMark}
                            </span>
                        </label>

                        <FieldError name="consent" />
                    </div>
                </div>
            </div>

            {/* Submission error */}
            {status === "error" && (
                <div
                    role="alert"
                    className="contact-form-error-panel mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
                >
                    <AlertCircle
                        className="mt-0.5 size-5 shrink-0"
                        aria-hidden="true"
                    />

                    <div className="min-w-0">
                        <p className="font-semibold">
                            We couldn't submit your request.
                        </p>

                        <p className="mt-1 leading-6">{msg}</p>

                        <p className="mt-3 leading-6">
                            You can try again or contact us directly at{" "}
                            <a
                                className="font-semibold underline underline-offset-4"
                                href={`mailto:${SITE.email}`}
                            >
                                {SITE.email}
                            </a>
                            {fallbackPhone && (
                                <>
                                    {" "}
                                    or call{" "}
                                    <a
                                        className="font-semibold underline underline-offset-4"
                                        href={fallbackPhone.href}
                                    >
                                        {fallbackPhone.display}
                                    </a>
                                </>
                            )}
                            .
                        </p>
                    </div>
                </div>
            )}

            {/* Submit */}
            <div className="contact-form-submit mt-7">
                <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="contact-form-submit-button group inline-flex cursor-pointer min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-[0_6px_18px_rgb(47_107_255/18%)] transition duration-200 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-[0_10px_24px_rgb(47_107_255/24%)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none sm:w-auto"
                >
                    {status === "submitting" ? (
                        <>
                            <Loader2
                                className="size-4 animate-spin motion-reduce:animate-none"
                                aria-hidden="true"
                            />
                            Sending request...
                        </>
                    ) : (
                        <>
                            Request My Free Billing Review
                            <ArrowRight
                                className="size-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
                                aria-hidden="true"
                            />
                        </>
                    )}
                </button>

                <p className="mt-3 flex items-center gap-2 text-xs leading-5 text-muted">
                    <ShieldCheck
                        className="size-4 shrink-0 text-mint"
                        aria-hidden="true"
                    />
                    Your inquiry is handled with care. Please do not submit
                    protected health information.
                </p>
            </div>
        </form>
    );
}
