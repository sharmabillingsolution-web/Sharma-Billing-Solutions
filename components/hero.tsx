import {
    ArrowRight,
    CheckCircle2,
    Activity,
    FileSearch,
    ShieldCheck,
    Clock,
    ClipboardCheck,
} from "lucide-react";

import { Btn, Pill } from "./ui";
import { HeroMarquee } from "./sections";

const stages = [
    { title: "Review", tone: "mint", status: "Checked" },
    { title: "Ready to submit", tone: "blue", status: "Verified" },
    { title: "Submitted", tone: "blue", status: "Sent" },
    { title: "Follow-up", tone: "amber", status: "Tracked" },
] as const;

const workflowFeatures = [
    "Eligibility checks",
    "Coding review",
    "Denial follow-up",
];

export function Hero() {
    return (
        <section
            id="hero"
            aria-labelledby="hero-title"
            className="hero-section relative isolate overflow-hidden pb-20 pt-28 sm:pt-32 md:pb-28 md:pt-40"
        >
            {/* Animated dot-grid background */}
            <div
                aria-hidden="true"
                className="gridbg pointer-events-none absolute inset-0 z-0 opacity-50 mask-[radial-gradient(ellipse_70%_65%_at_60%_30%,#000,transparent)]"
            />

            {/* Ambient color orbs */}
            <div
                aria-hidden="true"
                className="hero-orb pointer-events-none absolute -right-40 top-0 z-0 size-112 rounded-full bg-mint/20 blur-3xl sm:size-136"
            />

            <div
                aria-hidden="true"
                className="hero-orb-delayed pointer-events-none absolute -left-40 top-48 z-0 size-96 rounded-full bg-brand/10 blur-3xl"
            />

            {/* Main layout */}
            <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
                {/* Hero copy */}
                <div className="min-w-0">
                    <div className="hero-enter hero-delay-1 mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white/85 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand shadow-soft backdrop-blur sm:text-xs">
                        <span
                            aria-hidden="true"
                            className="soft-pulse size-2 rounded-full bg-mint"
                        />
                        Medical Billing · Internal Medicine
                    </div>

                    <h1
                        id="hero-title"
                        className="hero-enter hero-delay-2 max-w-2xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl xl:text-[4.25rem]"
                    >
                        Cleaner claims.{" "}
                        <span className="text-gradient">
                            Stronger revenue cycles.
                        </span>{" "}
                        More time for patient care.
                    </h1>

                    <p className="hero-enter hero-delay-3 mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg">
                        Sharma Billing Solutions helps US internal medicine
                        practices manage medical billing and revenue cycle
                        workflows with experienced human review and AI-assisted
                        coding and denial checks.
                    </p>

                    {/* CTA buttons */}
                    <div className="hero-enter hero-delay-4 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <Btn href="#contact" className="group hero-cta-primary">
                            Get a Free Billing Review
                            <ArrowRight
                                className="size-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
                                aria-hidden="true"
                            />
                        </Btn>

                        <Btn
                            href="#services"
                            variant="ghost"
                            className="hero-cta-secondary"
                        >
                            Explore Our Approach
                        </Btn>
                    </div>

                    {/* Trust statement */}
                    <div className="hero-enter hero-delay-5 mt-6 flex max-w-xl items-start gap-2.5 text-sm leading-6 text-muted">
                        <CheckCircle2
                            className="mt-0.5 size-5 shrink-0 text-mint"
                            aria-hidden="true"
                        />

                        <p>
                            Designed to align with your existing EHR and
                            clearinghouse workflows.
                        </p>
                    </div>

                    {/* Service highlights */}
                    <div className="hero-enter hero-delay-6 mt-9 flex flex-wrap gap-x-5 gap-y-3 border-t border-line pt-6">
                        {workflowFeatures.map((feature) => (
                            <div
                                key={feature}
                                className="flex items-center gap-2 text-xs font-medium text-muted sm:text-sm"
                            >
                                <span
                                    aria-hidden="true"
                                    className="size-1.5 shrink-0 rounded-full bg-mint"
                                />
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Workflow dashboard */}
                <figure
                    aria-labelledby="workflow-title"
                    aria-describedby="workflow-disclaimer"
                    className="hero-enter-right hero-delay-3 relative mx-auto w-full max-w-xl lg:max-w-none"
                >
                    {/* Main dashboard card */}
                    <div className="hero-dashboard surface-card relative z-10 rounded-panel p-4 shadow-float sm:p-5">
                        {/* Dashboard header */}
                        <div className="mb-5 flex items-center justify-between gap-3">
                            <div className="flex min-w-0 items-center gap-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                                    <ClipboardCheck
                                        className="size-5"
                                        aria-hidden="true"
                                    />
                                </div>

                                <div className="min-w-0">
                                    <h2
                                        id="workflow-title"
                                        className="text-sm font-semibold tracking-tight sm:text-base"
                                    >
                                        Claims workflow
                                    </h2>

                                    <p className="mt-0.5 text-xs text-muted">
                                        From review to follow-up
                                    </p>
                                </div>
                            </div>

                            <Pill tone="gray">Illustration</Pill>
                        </div>

                        {/* Workflow stages */}
                        <ol
                            aria-label="Illustrative claims workflow stages"
                            className="grid grid-cols-2 gap-2 sm:grid-cols-4"
                        >
                            {stages.map((stage, index) => (
                                <li
                                    key={stage.title}
                                    className="hero-stage-card group min-w-0 rounded-xl border border-line bg-canvas p-3 transition-colors duration-200 hover:border-brand/30 sm:p-3.5"
                                    style={{
                                        animationDelay: `${index * 90 + 250}ms`,
                                    }}
                                >
                                    <span className="text-[10px] font-medium uppercase tracking-wider text-muted sm:text-[11px]">
                                        Stage {index + 1}
                                    </span>

                                    <p className="mt-1.5 min-h-8 text-xs font-semibold leading-4 sm:text-[13px]">
                                        {stage.title}
                                    </p>

                                    <div className="mt-3">
                                        <Pill tone={stage.tone}>
                                            {stage.status}
                                        </Pill>
                                    </div>
                                </li>
                            ))}
                        </ol>

                        {/* Animated workflow connector */}
                        <div className="my-3 rounded-xl bg-surface-soft/70 px-2 py-1">
                            <svg
                                viewBox="0 0 400 40"
                                className="h-8 w-full overflow-visible sm:h-9"
                                aria-hidden="true"
                            >
                                <path
                                    d="M10 20 H390"
                                    stroke="#2F6BFF"
                                    strokeOpacity="0.45"
                                    strokeWidth="2"
                                    strokeDasharray="6 6"
                                    className="flow hero-flow-line"
                                    fill="none"
                                />

                                {[10, 140, 270, 390].map((x, index) => (
                                    <circle
                                        key={x}
                                        cx={x}
                                        cy="20"
                                        r="5"
                                        fill={
                                            index === 0 ? "#27C2AE" : "#2F6BFF"
                                        }
                                        stroke="white"
                                        strokeWidth="2"
                                    />
                                ))}
                            </svg>
                        </div>

                        {/* Animated illustrative chart */}
                        <div className="hero-chart-card rounded-2xl border border-line bg-white p-4 sm:p-5">
                            <div className="mb-4 flex items-center justify-between gap-3">
                                <div>
                                    <h3 className="text-sm font-semibold">
                                        A/R trend
                                    </h3>

                                    <p className="mt-1 text-xs text-muted">
                                        Visualization
                                    </p>
                                </div>
                            </div>

                            <svg
                                viewBox="0 0 320 100"
                                className="h-24 w-full sm:h-28"
                                role="img"
                                aria-label="Illustrative accounts receivable trend line, not based on actual practice data"
                                preserveAspectRatio="none"
                            >
                                {/* Horizontal guides */}
                                {[20, 45, 70, 95].map((y) => (
                                    <line
                                        key={y}
                                        x1="0"
                                        y1={y}
                                        x2="320"
                                        y2={y}
                                        stroke="#E3EAF1"
                                        strokeWidth="1"
                                        strokeDasharray="3 5"
                                    />
                                ))}

                                {/* Chart area fades in */}
                                <path
                                    className="hero-chart-area"
                                    d="M0 15 C35 17 48 28 80 34 S125 46 160 49 S220 65 250 71 S292 79 320 82 L320 100 L0 100Z"
                                    fill="#DDF8F2"
                                    fillOpacity="0.8"
                                />

                                {/* Chart line draws across */}
                                <path
                                    className="hero-chart-line"
                                    pathLength={1}
                                    d="M0 15 C35 17 48 28 80 34 S125 46 160 49 S220 65 250 71 S292 79 320 82"
                                    fill="none"
                                    stroke="#2F6BFF"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />

                                {/* Endpoint appears after the line */}
                                <circle
                                    className="hero-chart-dot"
                                    cx="320"
                                    cy="82"
                                    r="4"
                                    fill="#27C2AE"
                                    stroke="white"
                                    strokeWidth="2"
                                />
                            </svg>

                            <div className="mt-3 flex items-center gap-2 border-t border-line pt-3 text-[11px] leading-5 text-muted">
                                <Activity
                                    className="size-4 shrink-0 text-mint"
                                    aria-hidden="true"
                                />
                                Illustrative only — not a performance guarantee.
                            </div>
                        </div>

                        <figcaption
                            id="workflow-disclaimer"
                            className="mt-4 text-center text-[10px] leading-5 text-muted sm:text-xs"
                        >
                            Illustrative workflow stages and A/R trend line.
                        </figcaption>
                    </div>

                    {/* Floating callouts */}
                    <div
                        aria-hidden="true"
                        className="hero-floaty floaty absolute -left-2 top-12 z-20 hidden items-center gap-2 rounded-xl border border-line bg-white/95 px-3 py-2.5 text-xs font-semibold shadow-card backdrop-blur sm:flex md:-left-5"
                    >
                        <ShieldCheck className="size-4 shrink-0 text-mint" />
                        Eligibility check
                    </div>

                    <div
                        aria-hidden="true"
                        className="hero-floaty floaty absolute -right-2 top-[34%] z-20 hidden items-center gap-2 rounded-xl border border-line bg-white/95 px-3 py-2.5 text-xs font-semibold shadow-card backdrop-blur sm:flex md:-right-5"
                        style={{ animationDelay: "1.5s" }}
                    >
                        <FileSearch className="size-4 shrink-0 text-brand" />
                        Coding review
                    </div>

                    <div
                        aria-hidden="true"
                        className="hero-floaty floaty absolute -bottom-3 left-5 z-20 hidden items-center gap-2 rounded-xl border border-line bg-white/95 px-3 py-2.5 text-xs font-semibold shadow-card backdrop-blur sm:flex"
                        style={{ animationDelay: "3s" }}
                    >
                        <Activity className="size-4 shrink-0 text-amber-600" />
                        Denial follow-up
                    </div>

                    <div
                        aria-hidden="true"
                        className="hero-floaty floaty absolute -bottom-5 right-5 z-20 hidden items-center gap-2 rounded-xl border border-line bg-white/95 px-3 py-2.5 text-xs font-semibold shadow-card backdrop-blur sm:flex"
                        style={{ animationDelay: "4.5s" }}
                    >
                        <Clock className="size-4 shrink-0 text-brand" />
                        A/R visibility
                    </div>
                </figure>
            </div>
            <HeroMarquee />
        </section>
    );
}
