"use client";

import { useEffect, useRef, useState } from "react";
import {
    Activity,
    AlertTriangle,
    Bot,
    CheckCircle2,
    Clock,
    FileSearch,
    Play,
    RotateCcw,
    ShieldCheck,
    UserCheck,
} from "lucide-react";
import { Section, Head, DemoBadge } from "./ui";
import { SITE } from "@/config/site";
import { demo } from "@/data/content";

const capabilities = [
    {
        title: "AI Coding Review",
        description:
            "Flags missing modifiers and potentially mismatched CPT/ICD-10 pairs for a qualified coder to review before submission.",
        icon: FileSearch,
    },
    {
        title: "Denial Prediction",
        description:
            "Highlights claims that may need attention due to missing authorizations, eligibility gaps, or other potential issues.",
        icon: AlertTriangle,
    },
    {
        title: "Smart Eligibility & Authorization Checks",
        description:
            "Supports coverage checks and authorization reminders within the practice’s billing workflow.",
        icon: ShieldCheck,
    },
    {
        title: "A/R Prioritization",
        description:
            "Helps organize aged claims by potential recovery priority so billers can focus their follow-up.",
        icon: Activity,
    },
] as const;

const stages = [
    {
        title: "Intake",
        note: "Sample claim DEMO-1042 enters the queue.",
        flag: null,
    },
    {
        title: "Coding review",
        note: "A possible procedure/diagnosis mismatch is flagged for coder review.",
        flag: "Example flag: review code pairing",
    },
    {
        title: "Eligibility & authorization",
        note: "A biller receives a reminder to verify the authorization status.",
        flag: "Example flag: authorization not on file",
    },
    {
        title: "Biller review",
        note: "An experienced biller reviews each suggestion before any action is taken.",
        flag: null,
    },
    {
        title: "Ready to submit",
        note: "After appropriate review and corrections, the sample claim is marked ready for submission.",
        flag: null,
    },
] as const;

export function AiSection() {
    const [step, setStep] = useState(-1);
    const [isRunning, setIsRunning] = useState(false);
    const animationRootRef = useRef<HTMLDivElement | null>(null);

    // Reveal animated elements as they enter the viewport.
    useEffect(() => {
        const root = animationRootRef.current;
        if (!root) return;

        const elements = Array.from(
            root.querySelectorAll<HTMLElement>(".ai-reveal"),
        );

        if (!("IntersectionObserver" in window)) {
            elements.forEach((element) => element.classList.add("is-visible"));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -32px 0px",
            },
        );

        elements.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, []);

    // Preserve the original step-by-step simulation.
    useEffect(() => {
        if (!isRunning) return;

        if (step >= stages.length - 1) {
            setIsRunning(false);
            return;
        }

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        const timeoutId = window.setTimeout(
            () => setStep((current) => current + 1),
            prefersReducedMotion ? 0 : 900,
        );

        return () => window.clearTimeout(timeoutId);
    }, [isRunning, step]);

    const startSimulation = () => {
        setStep(0);
        setIsRunning(true);
    };

    const resetSimulation = () => {
        setIsRunning(false);
        setStep(-1);
    };

    const progress = step < 0 ? 0 : ((step + 1) / stages.length) * 100;

    const currentStage = step >= 0 ? stages[step] : null;

    return (
        <Section id="ai" dark>
            <div ref={animationRootRef} className="ai-section-wrapper">
                <Head
                    dark
                    eyebrow="AI-assisted billing"
                    title="AI that assists experienced billers, never replaces them."
                >
                    Every AI-generated suggestion is intended to support—not
                    replace—review by an experienced biller or coder.
                </Head>

                <div className="ai-section-content grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
                    {/* Capability cards */}
                    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                        {capabilities.map(
                            ({ title, description, icon: Icon }, index) => (
                                <li
                                    key={title}
                                    style={{
                                        transitionDelay: `${index * 90}ms`,
                                    }}
                                    className={`ai-reveal ai-capability-card ai-reveal-delay-${index} group h-full rounded-2xl border border-white/10 bg-white/[0.045] p-5 transition duration-300 hover:-translate-y-1 hover:border-mint/35 hover:bg-white/[0.07]`}
                                >
                                    <div className="ai-capability-icon mb-4 flex size-10 items-center justify-center rounded-xl border border-mint/15 bg-mint/10 text-mint transition duration-300 group-hover:bg-mint/15">
                                        <Icon
                                            className="size-5"
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <h3 className="font-semibold leading-snug text-white">
                                        {title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-relaxed text-slate-300">
                                        {description}
                                    </p>
                                </li>
                            ),
                        )}
                    </ul>

                    {/* Interactive workflow simulation */}
                    <div className="ai-reveal ai-reveal-delay-2 ai-simulation-shell relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.09] via-white/[0.055] to-white/[0.025] p-4 shadow-[0_24px_70px_-38px_rgba(0,0,0,0.7)] sm:p-6">
                        {/* Animated ambient glows */}
                        <div
                            aria-hidden="true"
                            className="ai-orb ai-orb-brand pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-brand/15 blur-3xl"
                        />

                        <div
                            aria-hidden="true"
                            className="ai-orb ai-orb-mint pointer-events-none absolute -bottom-24 -left-20 size-56 rounded-full bg-mint/10 blur-3xl"
                        />

                        <div className="relative">
                            {/* Simulation header */}
                            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="ai-bot-icon grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.07] text-mint">
                                        <Bot
                                            className="size-5"
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-white">
                                            Claims review walkthrough
                                        </h3>

                                        <p className="mt-0.5 text-xs text-slate-300">
                                            Step-by-step simulated workflow
                                        </p>
                                    </div>
                                </div>

                                <span className="ai-demo-badge inline-flex items-center gap-2 rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-amber-200 sm:text-[11px]">
                                    <span
                                        aria-hidden="true"
                                        className="ai-demo-dot size-1.5 rounded-full bg-amber-300"
                                    />
                                    Simulated workflow
                                </span>
                            </div>

                            {/* Progress bar */}
                            <div className="mb-4 rounded-xl border border-white/10 bg-navy/35 p-3">
                                <div className="mb-2 flex items-center justify-between gap-3 text-xs">
                                    <span className="font-medium text-slate-200">
                                        Workflow progress
                                    </span>

                                    <span className="tabular-nums text-slate-300">
                                        {step < 0
                                            ? "Not started"
                                            : `${step + 1} of ${stages.length} stages`}
                                    </span>
                                </div>

                                <div
                                    className="h-1.5 overflow-hidden rounded-full bg-white/10"
                                    role="progressbar"
                                    aria-label="Simulated workflow progress"
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    aria-valuenow={Math.round(progress)}
                                >
                                    <div
                                        className="ai-progress-fill relative h-full rounded-full bg-gradient-to-r from-brand to-mint transition-[width] duration-500 ease-out motion-reduce:transition-none"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>

                            {/* Animated workflow stages */}
                            <ol
                                aria-label="Stages in the simulated claim review"
                                className="ai-stage-list space-y-2"
                            >
                                {stages.map((stage, index) => {
                                    const isComplete = index < step;
                                    const isCurrent = index === step;
                                    const isVisible = index <= step;

                                    return (
                                        <li
                                            key={stage.title}
                                            aria-current={
                                                isCurrent ? "step" : undefined
                                            }
                                            className={`ai-stage-item rounded-xl border p-3.5 transition-colors duration-300 sm:p-4 ${
                                                isCurrent
                                                    ? "ai-stage-current"
                                                    : ""
                                            } ${
                                                isComplete
                                                    ? "ai-stage-complete"
                                                    : ""
                                            } ${
                                                !isVisible
                                                    ? "ai-stage-pending"
                                                    : ""
                                            } ${
                                                isCurrent
                                                    ? "border-mint/60 bg-mint/[0.085] shadow-[inset_0_0_0_1px_rgba(39,194,174,0.06)]"
                                                    : isComplete
                                                      ? "border-white/10 bg-white/[0.045]"
                                                      : "border-white/[0.06] bg-white/[0.02] opacity-60"
                                            }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <span
                                                    className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full ${
                                                        isComplete
                                                            ? "bg-mint/15 text-mint"
                                                            : isCurrent
                                                              ? "bg-mint text-navy"
                                                              : "bg-white/10 text-slate-300"
                                                    }`}
                                                >
                                                    {isComplete ? (
                                                        <CheckCircle2
                                                            className="size-4"
                                                            aria-hidden="true"
                                                        />
                                                    ) : isCurrent &&
                                                      index === 3 ? (
                                                        <UserCheck
                                                            className="size-4"
                                                            aria-hidden="true"
                                                        />
                                                    ) : (
                                                        <span className="text-xs font-bold">
                                                            {index + 1}
                                                        </span>
                                                    )}
                                                </span>

                                                <div className="min-w-0 flex-1">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <h4 className="text-sm font-semibold text-white">
                                                            {stage.title}
                                                        </h4>

                                                        {isCurrent && (
                                                            <span className="rounded-full bg-mint/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-mint">
                                                                Current stage
                                                            </span>
                                                        )}

                                                        {isComplete && (
                                                            <span className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                                                                Reviewed in demo
                                                            </span>
                                                        )}
                                                    </div>

                                                    {isVisible && (
                                                        <p className="ai-stage-copy mt-1.5 text-sm leading-relaxed text-slate-300">
                                                            {stage.note}
                                                        </p>
                                                    )}

                                                    {isVisible &&
                                                        stage.flag && (
                                                            <p className="ai-stage-flag mt-2 inline-flex max-w-full items-start gap-1.5 rounded-lg border border-amber-300/15 bg-amber-300/[0.08] px-2.5 py-1.5 text-xs font-medium leading-relaxed text-amber-100">
                                                                <AlertTriangle
                                                                    className="mt-0.5 size-3.5 shrink-0"
                                                                    aria-hidden="true"
                                                                />
                                                                {stage.flag}
                                                            </p>
                                                        )}
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ol>

                            {/* Simulation controls */}
                            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={startSimulation}
                                    disabled={isRunning}
                                    className="ai-primary-button inline-flex cursor-pointer min-h-11 items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-12px_rgba(47,107,255,0.8)] transition duration-200 hover:bg-brand-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isRunning ? (
                                        <Clock
                                            className="size-4 animate-pulse motion-reduce:animate-none"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <Play
                                            className="size-4"
                                            aria-hidden="true"
                                        />
                                    )}

                                    {isRunning
                                        ? "Review in progress…"
                                        : step >= 0
                                          ? "Run simulation again"
                                          : "Run simulated review"}
                                </button>

                                {step >= 0 && (
                                    <button
                                        type="button"
                                        onClick={resetSimulation}
                                        className="ai-secondary-button inline-flex cursor-pointer min-h-11 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.035] px-4 py-2.5 text-sm font-semibold text-slate-100 transition duration-200 hover:border-white/30 hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
                                    >
                                        <RotateCcw
                                            className="size-4"
                                            aria-hidden="true"
                                        />
                                        Reset demo
                                    </button>
                                )}
                            </div>

                            <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-slate-400">
                                <ShieldCheck
                                    className="mt-0.5 size-4 shrink-0 text-mint"
                                    aria-hidden="true"
                                />
                                Demonstration only. The sample flags and stages
                                do not represent a live platform, actual claims,
                                or clinical or billing advice.
                            </p>

                            <p
                                className="sr-only"
                                role="status"
                                aria-live="polite"
                                aria-atomic="true"
                            >
                                {isRunning && currentStage
                                    ? `Simulation running. Stage ${step + 1} of ${stages.length}: ${currentStage.title}.`
                                    : step === stages.length - 1
                                      ? "Simulation complete. This was an illustrative demo."
                                      : step >= 0
                                        ? `Simulation paused at stage ${step + 1}: ${currentStage?.title}.`
                                        : "Simulation has not started."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sample metrics */}
                {SITE.flags.DEMO_DATA && (
                    <div className="ai-reveal ai-metrics-panel mt-8 rounded-2xl border border-amber-300/25 bg-white/[0.035] p-5 sm:p-6">
                        <dl className="mt-5 grid gap-4 border-white/10 sm:grid-cols-3 sm:gap-6">
                            {demo.stats.map((stat, index) => (
                                <div
                                    key={stat.label}
                                    className={`ai-stat-item ai-stat-delay-${index}`}
                                >
                                    <dd className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                                        {stat.value}
                                    </dd>

                                    <dt className="mt-1 text-sm leading-relaxed text-slate-300">
                                        {stat.label}
                                    </dt>
                                </div>
                            ))}
                        </dl>
                    </div>
                )}
            </div>
        </Section>
    );
}
