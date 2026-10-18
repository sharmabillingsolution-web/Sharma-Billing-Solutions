import { useId, type AnchorHTMLAttributes, type ReactNode } from "react";
import { FlaskConical } from "lucide-react";

/* ========================================
   SECTION
======================================== */

type SectionProps = {
    id?: string;
    children: ReactNode;
    className?: string;
    dark?: boolean;
};

export function Section({
    id,
    children,
    className = "",
    dark = false,
}: SectionProps) {
    return (
        <section
            id={id}
            className={[
                "relative py-10 md:py-15",
                dark ? "bg-navy text-white" : "",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
                {children}
            </div>
        </section>
    );
}

/* ========================================
   SECTION HEADING
======================================== */

type HeadProps = {
    eyebrow: string;
    title: string;
    children?: ReactNode;
    dark?: boolean;
    center?: boolean;
};

export function Head({
    eyebrow,
    title,
    children,
    dark = false,
    center = false,
}: HeadProps) {
    const titleId = useId();

    return (
        <div
            className={[
                "mb-10 max-w-3xl sm:mb-12",
                center ? "mx-auto text-center" : "",
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <p
                className={[
                    "mb-3 text-[11px] font-bold uppercase tracking-[0.18em] sm:text-xs",
                    dark ? "text-mint" : "text-brand",
                ].join(" ")}
            >
                {eyebrow}
            </p>

            <h2
                id={titleId}
                className="text-balance text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl md:text-[2.65rem] md:leading-[1.1]"
            >
                {title}
            </h2>

            {children && (
                <p
                    className={[
                        "mt-4 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8",
                        dark ? "text-slate-300" : "text-muted",
                        center ? "mx-auto" : "",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                >
                    {children}
                </p>
            )}
        </div>
    );
}

/* ========================================
   BUTTON / LINK
======================================== */

type BtnProps = {
    href: string;
    children: ReactNode;
    variant?: "primary" | "ghost" | "light";
    className?: string;
} & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "className" | "children"
>;

export function Btn({
    href,
    children,
    variant = "primary",
    className = "",
    ...rest
}: BtnProps) {
    const variants = {
        primary:
            "border border-transparent bg-brand text-white shadow-[0_8px_20px_-8px_rgba(47,107,255,0.45)] hover:bg-brand-hover hover:shadow-[0_10px_24px_-8px_rgba(47,107,255,0.50)]",

        ghost: "border border-line bg-white text-navy hover:border-brand/40 hover:bg-brand/[0.035] hover:text-brand",

        light: "border border-white/20 bg-white/[0.04] text-white hover:border-white/40 hover:bg-white/10",
    };

    return (
        <a
            href={href}
            {...rest}
            className={[
                "group inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold",
                "transition-[background-color,border-color,color,box-shadow,transform] duration-200",
                "hover:-translate-y-0.5",
                "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand",
                "active:translate-y-0",
                "motion-reduce:transform-none motion-reduce:transition-none",
                variants[variant],
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            {children}
        </a>
    );
}

/* ========================================
   CARD
======================================== */

type CardProps = {
    children: ReactNode;
    className?: string;
};

export function Card({ children, className = "" }: CardProps) {
    return (
        <div
            className={[
                "rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-6",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            {children}
        </div>
    );
}

/* ========================================
   PILL / STATUS BADGE
======================================== */

type PillProps = {
    children: ReactNode;
    tone?: "mint" | "blue" | "amber" | "gray";
};

export function Pill({ children, tone = "mint" }: PillProps) {
    const tones = {
        mint: "border border-mint/20 bg-aqua text-[#0b6f62]",

        blue: "border border-brand/15 bg-blue-50 text-[#1f4fc7]",

        amber: "border border-amber-200 bg-amber-50 text-amber-800",

        gray: "border border-slate-200 bg-slate-100 text-slate-700",
    };

    return (
        <span
            className={[
                "inline-flex max-w-full items-center justify-center gap-1.5 rounded-full px-2.5 py-1",
                "text-[11px] font-semibold leading-4 sm:text-xs",
                tones[tone],
            ].join(" ")}
        >
            {children}
        </span>
    );
}

/* ========================================
   ILLUSTRATIVE DATA NOTICE
======================================== */

type DemoBadgeProps = {
    children?: ReactNode;
    className?: string;
};

export function DemoBadge({
    children = "Illustrative sample data — not actual client performance",
    className = "",
}: DemoBadgeProps) {
    return (
        <p
            role="note"
            className={[
                "inline-flex max-w-full items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2",
                "text-xs font-semibold leading-5 text-amber-950",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <FlaskConical
                className="mt-0.5 size-4 shrink-0 text-amber-700"
                aria-hidden="true"
            />

            <span>{children}</span>
        </p>
    );
}
