"use client";

import { useId, useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";

import { Section, Head } from "./ui";
import { faqs } from "@/data/content";

export function Faq() {
    const [open, setOpen] = useState<number | null>(0);
    const id = useId();

    return (
        <Section id="faq">
            <div className="mx-auto max-w-7xl faq-section-root">
                <Head
                    eyebrow="Frequently asked questions"
                    title="Common questions. Clear answers."
                >
                    Learn more about our medical billing services, revenue cycle
                    workflows, and how we work with your practice.
                </Head>

                <div className="mx-auto max-w-3xl">
                    <div className="faq-accordion overflow-hidden rounded-3xl border border-line bg-white shadow-soft">
                        {faqs.map(([question, answer], index) => {
                            const isOpen = open === index;
                            const buttonId = `faq-${id}-button-${index}`;
                            const panelId = `faq-${id}-panel-${index}`;

                            return (
                                <div
                                    key={`${index}-${question}`}
                                    className={`faq-item ${
                                        index !== faqs.length - 1
                                            ? "border-b border-line"
                                            : ""
                                    }`}
                                    style={{
                                        animationDelay: `${index * 65}ms`,
                                    }}
                                >
                                    <h3>
                                        <button
                                            type="button"
                                            id={buttonId}
                                            aria-expanded={isOpen}
                                            aria-controls={panelId}
                                            onClick={() =>
                                                setOpen((current) =>
                                                    current === index
                                                        ? null
                                                        : index,
                                                )
                                            }
                                            className={`faq-question group flex min-h-19 w-full cursor-pointer items-center justify-between gap-4 px-5 py-5 text-left transition-colors duration-200 focus-visible:relative focus-visible:z-10 sm:px-6 ${
                                                isOpen
                                                    ? "is-open bg-brand/4"
                                                    : "bg-white hover:bg-canvas/80"
                                            }`}
                                        >
                                            <span
                                                className={`text-sm font-semibold leading-6 transition-colors sm:text-base ${
                                                    isOpen
                                                        ? "text-brand"
                                                        : "text-navy group-hover:text-brand"
                                                }`}
                                            >
                                                {question}
                                            </span>

                                            <span
                                                aria-hidden="true"
                                                className={`faq-chevron grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-300 motion-reduce:transition-none ${
                                                    isOpen
                                                        ? "rotate-180 border-brand bg-brand text-white"
                                                        : "border-line bg-canvas text-muted group-hover:border-brand/30 group-hover:text-brand"
                                                }`}
                                            >
                                                <ChevronDown className="size-4" />
                                            </span>
                                        </button>
                                    </h3>

                                    <div
                                        id={panelId}
                                        role="region"
                                        aria-labelledby={buttonId}
                                        aria-hidden={!isOpen}
                                        inert={!isOpen}
                                        className={`faq-panel ${
                                            isOpen ? "is-open" : ""
                                        }`}
                                    >
                                        <div className="faq-panel-inner px-5 sm:px-6">
                                            <div className="faq-answer-content max-w-2xl border-l-2 border-mint/60 pb-6 pl-4">
                                                <p className="text-sm leading-7 text-muted sm:text-[15px]">
                                                    {answer}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Contact prompt */}
                    <div className="faq-contact-prompt mt-6 flex flex-col gap-4 rounded-2xl border border-line bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                        <div className="flex items-start gap-3">
                            <div className="faq-contact-icon grid size-10 shrink-0 place-items-center rounded-xl bg-aqua text-[#0b6f62]">
                                <MessageCircleQuestion
                                    className="size-5"
                                    aria-hidden="true"
                                />
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-navy sm:text-base">
                                    Have another question?
                                </h3>

                                <p className="mt-1 text-sm leading-6 text-muted">
                                    Get in touch to discuss your practice's
                                    billing needs.
                                </p>
                            </div>
                        </div>

                        <a
                            href="#contact"
                            className="faq-contact-link inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl border border-line px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-brand hover:bg-brand/5 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                        >
                            Contact our team
                        </a>
                    </div>
                </div>
            </div>
        </Section>
    );
}
