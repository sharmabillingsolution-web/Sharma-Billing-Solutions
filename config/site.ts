import { testimonials } from "@/data/content";

/** Central, owner-editable configuration. Confirm every figure with the client before launch. */
export const SITE = {
    name: "Sharma Billing Solutions",
    logoSrc: "/images/logo-placeholder.svg", // swap for the final logo
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    title: "Sharma Billing Solutions | Internal Medicine Medical Billing",
    description:
        "Medical billing and revenue cycle management support for US Internal Medicine practices, including coding review, eligibility checks, denial management, A/R follow-up, and AI-assisted billing workflows.",
    founder: { name: "Bhawani Dutt", role: "Founder" },
    location: "Ludhiana, Punjab, India",
    email: "sharma.bhawanis7@gmail.com",
    phones: [
        {
            label: "India",
            display: "+91 89505-25008",
            href: "tel:+918950525008",
        },
        {
            label: "US line",
            display: "+1 626-412-4362",
            href: "tel:+16264124362",
        },
    ],
    copyright: "© 2026 Sharma Billing Solutions. All rights reserved.",
    /** Client-supplied figures — confirm before launch. */
    metrics: [
        {
            value: "12",
            unit: "years",
            label: "Hands-on medical billing and revenue cycle management",
        },
        {
            value: "15+",
            unit: "specialties",
            label: "Specialty experience (names to be confirmed)",
        },
        {
            value: "14",
            unit: "states",
            label: "Geographic experience (states to be confirmed)",
        },
        {
            value: "Human",
            unit: "+ AI",
            label: "Human-reviewed, AI-assisted workflows",
        },
    ],
    flags: {
        /** Show illustrative sample dashboards/panels. Set false to hide them all. */
        DEMO_DATA: true,
        /** Show proposed quality targets. Enable only once the client approves them. */
        SHOW_QUALITY_TARGETS: false,
    },
};

export const NAV = [
    { href: "#hero", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#specialties", label: "Specialties" },
    { href: "#process", label: "Process" },
    { href: "#tech", label: "Technology" },
    { href: "#ai", label: "AI" },
    { href: "#performance", label: "Performance" },
    ...(testimonials.length
        ? [{ href: "#testimonials", label: "Feedback" }]
        : []),
    { href: "#resources", label: "Resources" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
];
