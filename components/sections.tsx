"use client";
import {
    ArrowUpRight,
    Check,
    ExternalLink,
    Mail,
    Phone,
    MapPin,
    Quote,
} from "lucide-react";
import { Section, Head, Card, Pill, DemoBadge } from "./ui";
import { Reveal } from "./reveal";
import { SITE, NAV } from "@/config/site";
import {
    services,
    specialties,
    internalMedicineTopics,
    ehrSystems,
    clearinghouses,
    payors,
    onboarding,
    resources,
    testimonials,
} from "@/data/content";
import { useState } from "react";
import { statesWorked } from "@/data/content";

export function Metrics() {
    const [selectedState, setSelectedState] = useState("New Jersey");
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <section
            id="snapshot"
            aria-label="Company snapshot"
            className="relative isolate border-y border-line bg-white"
        >
            <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-line md:grid-cols-4">
                {SITE.metrics.map((m, index) => (
                    <div
                        key={`${m.label}-${index}`}
                        className="site-metric-card min-w-0 bg-white px-5 py-7 transition-colors duration-200 hover:bg-canvas/70 sm:px-8 sm:py-9"
                        style={{ animationDelay: `${index * 80}ms` }}
                    >
                        <dt className="text-3xl font-semibold tracking-tight sm:text-4xl">
                            {m.value}{" "}
                            <span className="text-brand">{m.unit}</span>
                        </dt>
                        <dd className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
                            {m.label}
                        </dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}

export function Care() {
    const pts = [
        "Documentation and coding checked before billing.",
        "Eligibility and authorizations prepared before the patient arrives.",
        "One point of contact for clinical and billing questions.",
    ];
    const flow = [
        "Visit documented",
        "Eligibility & auth ready",
        "Codes reviewed",
        "Claim submitted",
    ];
    return (
        <Section id="care">
            <div className="grid items-center gap-12 lg:grid-cols-2">
                <Reveal>
                    <Head
                        eyebrow="Care behind every claim"
                        title="Every clean claim starts with a well-documented visit."
                    >
                        We work alongside doctors, nurses, and front-desk teams
                        so charts, codes, and authorizations line up before
                        billing begins.
                    </Head>
                    <ul className="space-y-3">
                        {pts.map((p, i) => (
                            <li
                                key={p}
                                className="care-point flex gap-3"
                                style={{ animationDelay: `${i * 90}ms` }}
                            >
                                <Check
                                    className="mt-1 size-5 shrink-0 text-mint"
                                    aria-hidden="true"
                                />
                                {p}
                            </li>
                        ))}
                    </ul>
                </Reveal>
                <Reveal delay={120}>
                    <Card className="care-flow-card relative overflow-hidden p-6 sm:p-8">
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -right-12 -top-12 size-36 rounded-full bg-aqua/70 blur-3xl"
                        />
                        <p className="relative mb-5 text-sm font-semibold text-muted">
                            Encounter-to-claim path
                        </p>
                        <ol
                            aria-label="Encounter-to-claim workflow"
                            className="relative space-y-6 before:absolute before:left-[15px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-line"
                        >
                            {flow.map((f, i) => (
                                <li
                                    key={f}
                                    className="care-flow-step relative flex items-center gap-4"
                                    style={{ animationDelay: `${i * 110}ms` }}
                                >
                                    <span className="z-10 grid size-8 place-items-center rounded-full bg-aqua text-sm font-semibold text-[#0b6f62]">
                                        {i + 1}
                                    </span>
                                    <span className="font-medium">{f}</span>
                                </li>
                            ))}
                        </ol>
                    </Card>
                </Reveal>
            </div>
        </Section>
    );
}

export function Services() {
    const front = services.filter((s) => s.group === "front"),
        rcm = services.filter((s) => s.group === "rcm");
    const card = (s: (typeof services)[number], i: number) => (
        <Reveal key={s.title} delay={i * 70}>
            <Card className="service-card h-full transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-card focus-within:border-brand/40">
                <span className="service-icon mb-4 grid size-11 place-items-center rounded-xl bg-aqua">
                    <s.icon className="size-5 text-[#0b6f62]" aria-hidden />
                </span>
                <h4 className="text-lg font-semibold">{s.title}</h4>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                    {s.desc}
                </p>
            </Card>
        </Reveal>
    );
    return (
        <Section id="services" className="bg-white">
            <Head eyebrow="Services" title="Support across the revenue cycle.">
                Many denials begin before the claim exists, so the work starts
                at the front end.
            </Head>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-brand sm:text-sm">
                Front-end revenue protection
            </h3>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {front.map(card)}
            </div>
            <h3 className="mb-4 mt-12 text-xs font-semibold uppercase tracking-[0.16em] text-brand sm:text-sm">
                Core RCM capabilities
            </h3>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {rcm.map(card)}
            </div>
        </Section>
    );
}

export function Specialties() {
    return (
        <Section id="specialties">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
                <Head
                    eyebrow="Specialties"
                    title="Medical Billing Expertise Across Multiple Specialties."
                >
                    Our primary focus is US Internal Medicine billing, with
                    support for a broad range of medical specialties. Our
                    services are designed to help practices streamline billing
                    workflows, improve claim accuracy, and manage revenue cycle
                    operations.
                </Head>

                <Reveal>
                    <Card className="specialty-card relative overflow-hidden border-brand/30 bg-gradient-to-br from-white via-white to-aqua/60 p-6 sm:p-8">
                        <div className="mb-6 flex flex-wrap gap-2">
                            {specialties.map((specialty) => (
                                <Pill
                                    key={specialty.name}
                                    tone={specialty.primary ? "blue" : "gray"}
                                >
                                    {specialty.name}
                                    {specialty.primary ? " · Primary" : ""}
                                </Pill>
                            ))}
                        </div>

                        <div className="rounded-2xl border border-brand/15 bg-white/80 p-5 sm:p-6">
                            <p className="text-sm font-semibold text-muted">
                                Internal Medicine Billing Focus
                            </p>

                            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                                {internalMedicineTopics.map((topic, i) => (
                                    <li
                                        key={topic}
                                        className="specialty-topic flex gap-2 text-[15px]"
                                        style={{
                                            animationDelay: `${i * 65}ms`,
                                        }}
                                    >
                                        <Check
                                            className="mt-1 size-4 shrink-0 text-mint"
                                            aria-hidden="true"
                                        />
                                        <span>{topic}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <p className="mt-5 text-xs leading-5 text-muted">
                            Specialty coverage and billing workflows should be
                            confirmed based on your practice requirements.
                        </p>
                    </Card>
                </Reveal>
            </div>
        </Section>
    );
}

export function Coverage() {
    const stateMetric = SITE.metrics[2];

    return (
        <Section id="coverage">
            <div className="grid items-center gap-10 lg:grid-cols-2">
                <div>
                    <Head
                        eyebrow="Payors & coverage"
                        title="Experience across major payor types."
                    >
                        We support workflows across the payor categories below.
                        State coverage will be confirmed before publication.
                    </Head>

                    <ul className="flex flex-wrap gap-2">
                        {payors.map((p, i) => (
                            <li
                                key={p}
                                className="payor-chip"
                                style={{ animationDelay: `${i * 55}ms` }}
                            >
                                <Pill tone="blue">{p}</Pill>
                            </li>
                        ))}
                    </ul>
                </div>

                <Reveal>
                    <figure className="coverage-figure rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-6">
                        <svg
                            viewBox="0 0 290 180"
                            className="mx-auto w-full max-w-sm"
                            role="img"
                            aria-label="Illustrative outline of the United States"
                        >
                            <path
                                d="M20 20 L140 20 L150 28 L175 22 L195 30 L215 20 L240 28 L252 15 L262 40 L250 70 L262 100 L250 130 L238 160 L225 150 L215 130 L200 150 L180 165 L150 150 L120 150 L100 165 L85 140 L55 130 L35 100 L20 60Z"
                                fill="#F0F5FA"
                                stroke="#B8C6D6"
                                strokeWidth="2"
                                strokeLinejoin="round"
                                className="coverage-map-path"
                            />
                        </svg>

                        <figcaption className="mt-3 text-center text-sm text-muted">
                            {stateMetric
                                ? `${stateMetric.value}-state footprint`
                                : "Coverage footprint"}
                        </figcaption>

                        <div className="mt-6 border-t border-line pt-5">
                            <h3 className="mb-4 text-sm font-semibold text-navy">
                                States worked
                            </h3>

                            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                {statesWorked.map((state, index) => (
                                    <li
                                        key={state}
                                        className="coverage-state-chip rounded-lg border border-line bg-canvas px-3 py-2 text-center text-xs font-medium text-navy"
                                        style={{
                                            animationDelay: `${index * 70}ms`,
                                        }}
                                    >
                                        {state}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </figure>
                </Reveal>
            </div>
        </Section>
    );
}

export function Testimonials() {
    const states = [
        "California",
        "New Jersey",
        "Virginia",
        "North Carolina",
        "South Carolina",
        "Illinois",
        "Connecticut",
        "Texas",
        "Missouri",
        "Michigan",
        "Nebraska (Omaha)",
        "Arizona",
        "Alabama",
        "Hawaii",
    ];

    const [selectedState, setSelectedState] = useState("New Jersey");
    const [activeIndex, setActiveIndex] = useState(0);

    const stateTestimonials = testimonials.filter(
        (t) => t.state === selectedState,
    );

    const activeTestimonial = stateTestimonials[activeIndex];

    return (
        <Section id="testimonials" className="bg-white">
            <Head
                eyebrow="Provider feedback"
                title="Practice providers’ feedback, state by state"
            >
                Physicians, therapists and other practice providers share their
                experiences. Select a state to view sample feedback.
            </Head>

            <div className="flex flex-wrap gap-2">
                {states.map((state) => (
                    <button
                        key={state}
                        type="button"
                        onClick={() => {
                            setSelectedState(state);
                            setActiveIndex(0);
                        }}
                        className={`rounded-full border px-3.5 py-2 text-sm font-medium transition ${
                            selectedState === state
                                ? "border-brand bg-brand text-white"
                                : "border-line bg-white text-navy hover:border-brand/40 hover:bg-canvas"
                        }`}
                    >
                        {state}
                    </button>
                ))}
            </div>

            {activeTestimonial ? (
                <div className="mt-5 flex items-center gap-3 sm:gap-4">
                    <button
                        type="button"
                        aria-label="Previous testimonial"
                        disabled={stateTestimonials.length < 2}
                        onClick={() =>
                            setActiveIndex(
                                (activeIndex - 1 + stateTestimonials.length) %
                                    stateTestimonials.length,
                            )
                        }
                        className="hidden size-11 shrink-0 place-items-center rounded-full border border-line bg-white text-brand disabled:opacity-40 sm:grid"
                    >
                        <span aria-hidden="true">‹</span>
                    </button>

                    <Card
                        key={`${selectedState}-${activeIndex}`}
                        className="testimonial-card min-w-0 flex-1 rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-8"
                    >
                        <Quote className="size-7 text-[#D5E7E4]" />

                        <div className="mt-2 flex flex-wrap items-center gap-3">
                            <div
                                className="flex gap-0.5 text-[#E8A23A]"
                                aria-label="5 out of 5 stars — sample rating"
                            >
                                {"★★★★★".split("").map((star, i) => (
                                    <span key={i}>{star}</span>
                                ))}
                            </div>
                            <span className="text-sm font-bold text-[#245C7A]">
                                {activeTestimonial.headline ??
                                    "Sample provider feedback"}
                            </span>
                        </div>

                        <blockquote className="mt-5 text-base leading-7 text-navy sm:text-lg">
                            {activeTestimonial.quote}
                        </blockquote>

                        <div className="mt-5 inline-flex rounded-full bg-[#E5F5EA] px-3.5 py-2 text-xs font-medium text-brand">
                            ▲{" "}
                            {activeTestimonial.outcome ??
                                "Illustrative workflow benefit"}
                        </div>

                        <div className="mt-5 flex items-center gap-3">
                            <div className="grid size-12 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-white">
                                {activeTestimonial.initials ??
                                    selectedState
                                        .split(" ")
                                        .map((word) => word[0])
                                        .join("")
                                        .slice(0, 2)}
                            </div>

                            <div>
                                <p className="font-semibold text-navy">
                                    {activeTestimonial.name}
                                </p>
                                <p className="text-sm text-muted">
                                    {activeTestimonial.role}
                                </p>
                                <p className="text-sm text-muted">
                                    {activeTestimonial.practice} ·{" "}
                                    {activeTestimonial.state}
                                </p>
                            </div>
                        </div>

                        <p className="mt-4 inline-block rounded-md border border-dashed border-[#E5C879] bg-[#FFF8E3] px-2.5 py-1.5 text-[11px] text-[#82621D]">
                            Sample testimonial. Replace with verified client
                            feedback before publishing.
                        </p>

                        <div className="mt-5 flex items-center justify-between sm:hidden">
                            <button
                                type="button"
                                disabled={stateTestimonials.length < 2}
                                onClick={() =>
                                    setActiveIndex(
                                        (activeIndex -
                                            1 +
                                            stateTestimonials.length) %
                                            stateTestimonials.length,
                                    )
                                }
                                className="rounded-full border border-line px-4 py-2 disabled:opacity-40"
                            >
                                Previous
                            </button>

                            <button
                                type="button"
                                disabled={stateTestimonials.length < 2}
                                onClick={() =>
                                    setActiveIndex(
                                        (activeIndex + 1) %
                                            stateTestimonials.length,
                                    )
                                }
                                className="rounded-full border border-line px-4 py-2 disabled:opacity-40"
                            >
                                Next
                            </button>
                        </div>
                    </Card>

                    <button
                        type="button"
                        aria-label="Next testimonial"
                        disabled={stateTestimonials.length < 2}
                        onClick={() =>
                            setActiveIndex(
                                (activeIndex + 1) % stateTestimonials.length,
                            )
                        }
                        className="hidden size-11 shrink-0 place-items-center rounded-full border border-line bg-white text-brand disabled:opacity-40 sm:grid"
                    >
                        <span aria-hidden="true">›</span>
                    </button>
                </div>
            ) : (
                <div className="mt-5 rounded-2xl border border-line bg-white p-6 text-sm text-muted">
                    No sample feedback is available for {selectedState} yet. Add
                    a testimonial for this state to display it here.
                </div>
            )}
        </Section>
    );
}

export function Onboarding() {
    return (
        <Section id="onboarding">
            <Head eyebrow="Onboarding" title="A clear, four-step start." />
            <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {onboarding.map(([t, d], i) => (
                    <li key={t} className="min-w-0 list-none">
                        <Reveal delay={i * 80}>
                            <div className="onboarding-card group relative h-full overflow-hidden rounded-2xl border border-line bg-white p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-brand/35 hover:shadow-card">
                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -right-5 -top-5 size-20 rounded-full bg-aqua/70 blur-2xl transition-opacity group-hover:opacity-100"
                                />
                                <span className="onboarding-number relative mb-4 grid size-10 place-items-center rounded-full bg-brand text-sm font-semibold text-white shadow-soft">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <h3 className="relative text-lg font-semibold tracking-tight">
                                    {t}
                                </h3>
                                <p className="relative mt-2 text-[15px] leading-relaxed text-muted">
                                    {d}
                                </p>
                            </div>
                        </Reveal>
                    </li>
                ))}
            </ol>
        </Section>
    );
}

export function Resources() {
    return (
        <Section id="resources" className="bg-white">
            <Head
                eyebrow="Resources"
                title="Official CMS & Medicare resources."
            />
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {resources.map(([t, u, d]) => (
                    <li key={u}>
                        <a
                            href={u}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="resource-card group flex h-full flex-col rounded-2xl border border-line bg-canvas p-5 transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-brand/50 hover:bg-white hover:shadow-soft focus-visible:border-brand"
                        >
                            <span className="flex items-center justify-between gap-2 font-semibold group-hover:text-brand">
                                {t}
                                <ExternalLink
                                    className="size-4 shrink-0"
                                    aria-hidden="true"
                                />
                                <span className="sr-only">
                                    (opens in a new tab)
                                </span>
                            </span>
                            <span className="mt-2 text-sm leading-relaxed text-muted">
                                {d}
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
            <p className="mt-6 max-w-3xl text-sm text-muted">
                External resources are provided for convenience and are
                maintained by their respective organizations. Medicare payment
                varies by locality; confirm applicable amounts with the
                appropriate Medicare Administrative Contractor.
            </p>
        </Section>
    );
}

export function Footer() {
    return (
        <footer
            id="footer"
            className="relative overflow-hidden bg-navy text-slate-300"
        >
            <div
                aria-hidden="true"
                className="footer-orb pointer-events-none absolute -right-24 -top-32 size-96 rounded-full bg-brand/10 blur-3xl"
            />
            <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr] md:py-16">
                <div>
                    <div className="flex items-center gap-2.5 text-white">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={SITE.logoSrc}
                            alt={`${SITE.name} logo`}
                            width={36}
                            height={36}
                            className="size-9 shrink-0 object-contain"
                        />
                        <span className="font-semibold">{SITE.name}</span>
                    </div>
                    <p className="mt-4 max-w-sm text-sm leading-7 text-slate-300">
                        Medical billing and revenue cycle management for US
                        Internal Medicine practices.
                    </p>
                </div>
                <nav aria-label="Footer">
                    <p className="mb-3 text-sm font-semibold text-white">
                        Explore
                    </p>
                    <ul className="grid grid-cols-2 gap-2 text-sm">
                        {NAV.map((n) => (
                            <li key={n.href}>
                                <a
                                    className="footer-link transition-colors duration-200 hover:text-white"
                                    href={n.href}
                                >
                                    {n.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="text-sm">
                    <p className="mb-3 font-semibold text-white">Contact</p>
                    <a
                        className="block py-1 transition-colors duration-200 hover:text-white"
                        href={`mailto:${SITE.email}`}
                    >
                        {SITE.email}
                    </a>
                    {SITE.phones.map((p) => (
                        <a
                            key={p.href}
                            className="block py-1 transition-colors duration-200 hover:text-white"
                            href={p.href}
                        >
                            {p.label}: {p.display}
                        </a>
                    ))}
                    <a
                        className="mt-3 inline-flex items-center gap-1 transition-colors duration-200 hover:text-white"
                        href="#resources"
                    >
                        CMS resources{" "}
                        <ArrowUpRight className="size-3.5" aria-hidden />
                    </a>
                </div>
            </div>
            <p className="border-t border-white/10 px-5 py-5 text-center text-xs">
                {SITE.copyright}
            </p>
        </footer>
    );
}

export function ContactInfo() {
    return (
        <div className="contact-info-card relative overflow-hidden rounded-2xl bg-navy p-6 text-white shadow-card sm:p-8">
            <div
                aria-hidden="true"
                className="contact-info-orb pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-brand/20 blur-3xl"
            />

            <h3 className="relative text-xl font-semibold tracking-tight">
                {SITE.founder.name}
            </h3>

            <p className="relative text-slate-300">
                {SITE.founder.role}, {SITE.name}
            </p>

            <ul className="relative mt-6 space-y-4 text-[15px] leading-relaxed">
                <li className="contact-info-item flex gap-3">
                    <MapPin
                        className="mt-0.5 size-5 shrink-0 text-mint"
                        aria-hidden="true"
                    />
                    {SITE.location}
                </li>

                <li className="contact-info-item flex gap-3">
                    <Mail
                        className="mt-0.5 size-5 shrink-0 text-mint"
                        aria-hidden="true"
                    />
                    <a
                        className="break-words underline-offset-4 transition-colors hover:text-white hover:underline"
                        href={`mailto:${SITE.email}`}
                    >
                        {SITE.email}
                    </a>
                </li>

                {SITE.phones.map((p) => (
                    <li key={p.href} className="contact-info-item flex gap-3">
                        <Phone
                            className="mt-0.5 size-5 shrink-0 text-mint"
                            aria-hidden="true"
                        />
                        <a
                            className="underline-offset-4 transition-colors hover:text-white hover:underline"
                            href={p.href}
                        >
                            {p.label}: {p.display}
                        </a>
                    </li>
                ))}

                {/* WhatsApp */}
                <li className="contact-info-item flex gap-3">
                    <MessageCircle
                        className="mt-0.5 size-5 shrink-0 text-mint"
                        aria-hidden="true"
                    />
                    <a
                        className="underline-offset-4 transition-colors hover:text-white hover:underline"
                        href={`${SITE.whatsapp.href}?text=${encodeURIComponent(
                            SITE.whatsapp.message,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Contact us on WhatsApp"
                    >
                        WhatsApp: {SITE.whatsapp.display}
                    </a>
                </li>
            </ul>

            <p className="relative mt-6 border-t border-white/10 pt-5 text-sm leading-relaxed text-slate-300">
                We’ll review the details you provide and follow up with a
                suitable next step.
            </p>
        </div>
    );
}
export { DemoBadge };
