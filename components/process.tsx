"use client";

import { useEffect, useRef, useState } from "react";
import {
    ArrowRight,
    CheckCircle2,
    ClipboardCheck,
    Workflow,
} from "lucide-react";

import { Section, Head, Card, Pill } from "./ui";
import { processSteps } from "@/data/content";

export function Process() {
    const [activeStep, setActiveStep] = useState(0);
    const [visibleSteps, setVisibleSteps] = useState<Set<number>>(
        () => new Set(),
    );
    const animationRootRef = useRef<HTMLDivElement | null>(null);

    // Reveal workflow elements as they enter the viewport.
    // Step visibility is stored in React state so clicking a step cannot
    // remove its visibility class during a re-render.
    useEffect(() => {
        const root = animationRootRef.current;
        if (!root) return;

        const elements = Array.from(
            root.querySelectorAll<HTMLElement>(".process-reveal"),
        );

        const revealAll = () => {
            const indices = elements
                .filter((element) =>
                    element.classList.contains("process-step-button"),
                )
                .map((element) => Number(element.dataset.stepIndex))
                .filter((index) => Number.isInteger(index));

            elements.forEach((element) => {
                if (!element.classList.contains("process-step-button")) {
                    element.classList.add("is-visible");
                }
            });
            setVisibleSteps(new Set(indices));
        };

        if (!("IntersectionObserver" in window)) {
            revealAll();
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const element = entry.target as HTMLElement;

                    if (element.classList.contains("process-step-button")) {
                        const index = Number(element.dataset.stepIndex);
                        if (Number.isInteger(index)) {
                            setVisibleSteps((current) => {
                                if (current.has(index)) return current;
                                const next = new Set(current);
                                next.add(index);
                                return next;
                            });
                        }
                    } else {
                        element.classList.add("is-visible");
                    }

                    observer.unobserve(element);
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

    if (processSteps.length === 0) {
        return null;
    }

    const safeActiveStep = Math.min(
        Math.max(activeStep, 0),
        processSteps.length - 1,
    );
    const currentStep = processSteps[safeActiveStep] ?? processSteps[0];
    const progress = ((safeActiveStep + 1) / processSteps.length) * 100;

    const selectStep = (index: number) => {
        setActiveStep(index);
    };

    return (
        <Section id="process">
            <div ref={animationRootRef} className="process-section-root">
                <Head
                    eyebrow="Revenue-cycle process"
                    title="A clearer path from registration to resolution."
                >
                    Explore our proposed 11-step revenue-cycle workflow. Select
                    a step to understand its purpose and how it fits into the
                    process. Step names and descriptions remain subject to
                    client approval.
                </Head>

                <div className="grid items-start gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
                    {/* Left: Workflow steps */}
                    <div className="process-reveal min-w-0">
                        <div className="process-workflow-heading mb-4 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <div className="process-workflow-icon grid size-9 place-items-center rounded-xl bg-aqua text-[#0b6f62]">
                                    <Workflow
                                        className="size-4"
                                        aria-hidden="true"
                                    />
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-navy">
                                        Workflow overview
                                    </h3>
                                    <p className="text-xs text-muted">
                                        Select a step to explore
                                    </p>
                                </div>
                            </div>

                            <Pill tone="gray">{processSteps.length} steps</Pill>
                        </div>

                        <ol
                            aria-label="Revenue-cycle workflow steps"
                            className="grid gap-3 sm:grid-cols-2"
                        >
                            {processSteps.map(([title], index) => {
                                const isActive = safeActiveStep === index;

                                return (
                                    <li
                                        key={`${index}-${title}`}
                                        className="min-w-0 list-none"
                                    >
                                        <button
                                            type="button"
                                            aria-pressed={isActive}
                                            aria-current={
                                                isActive ? "step" : undefined
                                            }
                                            aria-controls="process-detail"
                                            data-step-index={index}
                                            onClick={() => selectStep(index)}
                                            style={{
                                                animationDelay: `${index * 55}ms`,
                                                transitionDelay: isActive
                                                    ? "0ms"
                                                    : undefined,
                                            }}
                                            className={`process-reveal process-step-button group relative flex min-h-22 w-full cursor-pointer items-center gap-3 overflow-hidden rounded-2xl border p-4 text-left transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand motion-reduce:transition-none ${
                                                visibleSteps.has(index)
                                                    ? "is-visible"
                                                    : ""
                                            } ${
                                                isActive
                                                    ? "is-active border-brand bg-brand/4.5 shadow-[0_4px_18px_rgb(47_107_255/8%)]"
                                                    : "border-line bg-white hover:-translate-y-0.5 hover:border-brand/30 hover:bg-canvas/70 hover:shadow-soft"
                                            }`}
                                        >
                                            {/* Active indicator */}
                                            {isActive && (
                                                <span
                                                    aria-hidden="true"
                                                    className="process-active-indicator absolute inset-y-0 left-0 w-1 rounded-r-full bg-brand"
                                                />
                                            )}

                                            {/* Step number */}
                                            <span
                                                className={`process-step-number grid size-10 shrink-0 place-items-center rounded-xl text-sm font-bold transition duration-300 ${
                                                    isActive
                                                        ? "bg-brand text-white shadow-sm"
                                                        : "border border-line bg-canvas text-muted group-hover:border-brand/20 group-hover:text-brand"
                                                }`}
                                            >
                                                {String(index + 1).padStart(
                                                    2,
                                                    "0",
                                                )}
                                            </span>

                                            {/* Step title */}
                                            <span className="min-w-0 flex-1">
                                                <span
                                                    className={`block text-sm font-semibold leading-5 ${
                                                        isActive
                                                            ? "text-brand"
                                                            : "text-navy"
                                                    }`}
                                                >
                                                    {title}
                                                </span>

                                                <span className="mt-1 block text-xs text-muted">
                                                    Step {index + 1}
                                                </span>
                                            </span>

                                            {/* Selection indicator */}
                                            {isActive ? (
                                                <CheckCircle2
                                                    className="process-selected-icon size-5 shrink-0 text-brand"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <ArrowRight
                                                    className="process-step-arrow size-4 shrink-0 text-subtle transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-brand motion-reduce:transform-none"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </button>
                                    </li>
                                );
                            })}
                        </ol>

                        <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-muted">
                            <ClipboardCheck
                                className="mt-0.5 size-4 shrink-0 text-mint"
                                aria-hidden="true"
                            />
                            This is a proposed workflow for discussion, not a
                            representation of a live client process.
                        </p>
                    </div>

                    {/* Right: Selected step details */}
                    <Card className="process-reveal process-detail-card relative h-fit overflow-hidden rounded-3xl border-brand/15 p-0 shadow-card lg:sticky lg:top-24">
                        {/* Decorative header */}
                        <div
                            aria-hidden="true"
                            className="process-detail-glow absolute inset-x-0 top-0 h-32 bg-linear-to-br from-brand/9 via-aqua/50 to-transparent"
                        />

                        <div className="relative p-5 sm:p-7">
                            {/* Detail header */}
                            <div className="flex items-start justify-between gap-4">
                                <div className="process-detail-icon grid size-12 shrink-0 place-items-center rounded-2xl border border-brand/10 bg-white text-brand shadow-soft">
                                    <ClipboardCheck
                                        className="size-6"
                                        aria-hidden="true"
                                    />
                                </div>

                                <Pill tone="blue">
                                    Step {safeActiveStep + 1} of{" "}
                                    {processSteps.length}
                                </Pill>
                            </div>

                            {/* Progress indicator */}
                            <div className="mt-6">
                                <div className="mb-2 flex items-center justify-between gap-3">
                                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                                        Selected step
                                    </span>

                                    <span className="text-xs font-semibold tabular-nums text-brand">
                                        {Math.round(progress)}%
                                    </span>
                                </div>

                                <div
                                    className="process-progress-track h-1.5 overflow-hidden rounded-full bg-line"
                                    role="progressbar"
                                    aria-label="Selected position in the proposed workflow"
                                    aria-valuemin={1}
                                    aria-valuemax={processSteps.length}
                                    aria-valuenow={safeActiveStep + 1}
                                    aria-valuetext={`Step ${safeActiveStep + 1} of ${processSteps.length} selected`}
                                >
                                    <div
                                        className="process-progress-fill relative h-full rounded-full bg-linear-to-r from-brand to-mint transition-[width] duration-500 ease-out motion-reduce:transition-none"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>

                            {/* Dynamic content remounts when the selected step changes */}
                            <div
                                key={safeActiveStep}
                                id="process-detail"
                                role="region"
                                aria-label={`Details for step ${safeActiveStep + 1}`}
                                aria-live="polite"
                                aria-atomic="true"
                                className="process-detail-copy mt-7"
                            >
                                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand">
                                    Revenue-cycle stage {safeActiveStep + 1}
                                </p>

                                <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-navy sm:text-3xl">
                                    {currentStep[0]}
                                </h3>

                                <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
                                    {currentStep[1]}
                                </p>
                            </div>

                            {/* Navigation */}
                            <div className="mt-7 flex items-center justify-between gap-3 border-t border-line pt-5">
                                <button
                                    type="button"
                                    disabled={safeActiveStep === 0}
                                    onClick={() =>
                                        setActiveStep((step) =>
                                            Math.max(0, step - 1),
                                        )
                                    }
                                    className="process-navigation-button inline-flex min-h-11 cursor-pointer items-center justify-center rounded-xl border border-line bg-white px-4 text-sm font-semibold text-navy transition hover:border-brand/30 hover:bg-canvas disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand motion-reduce:transition-none"
                                >
                                    Previous
                                </button>

                                <button
                                    type="button"
                                    disabled={
                                        safeActiveStep ===
                                        processSteps.length - 1
                                    }
                                    onClick={() =>
                                        setActiveStep((step) =>
                                            Math.min(
                                                processSteps.length - 1,
                                                step + 1,
                                            ),
                                        )
                                    }
                                    className="process-navigation-button group inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand px-4 text-sm font-semibold text-white shadow-[0_4px_14px_rgb(47_107_255/16%)] transition hover:-translate-y-0.5 hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand motion-reduce:transform-none motion-reduce:transition-none"
                                >
                                    Next step
                                    <ArrowRight
                                        className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>

                            {/* Disclaimer */}
                            <p className="mt-5 rounded-xl border border-line bg-canvas/70 p-3 text-xs leading-5 text-muted">
                                <span className="font-semibold text-navy">
                                    Demonstration only.
                                </span>{" "}
                                This interactive overview does not represent a
                                live workflow or confirm that every listed step
                                is included in a contracted service.
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </Section>
    );
}
