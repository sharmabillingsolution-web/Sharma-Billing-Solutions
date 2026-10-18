"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
    Check,
    ExternalLink,
    ChartNoAxesCombined,
    TrendingUp,
    ShieldCheck,
} from "lucide-react";

import { Section, Head, Card, DemoBadge, Pill } from "./ui";
import { SITE } from "@/config/site";
import { demo, qualityTargets, specialties } from "@/data/content";

type K = keyof typeof demo.series;

const metricCards = [
    { key: "clean", label: "Clean-claim rate", description: "Sample metric" },
    { key: "denial", label: "Denial rate", description: "Sample metric" },
    { key: "ar", label: "Days in A/R", description: "Sample metric" },
    { key: "fpr", label: "First-pass rate", description: "Sample metric" },
] as const;

const chartGridLines = [26, 49, 72, 95];

const cardClass =
    "rounded-2xl border border-line bg-white shadow-soft transition duration-300 hover:border-line-strong hover:shadow-card motion-reduce:transition-none";

export function Performance() {
    const [k, setK] = useState<K>("denials");
    const [sp, setSp] = useState<string>(
        specialties[0]?.name ?? "Internal Medicine",
    );
    const animationRootRef = useRef<HTMLDivElement | null>(null);

    const chartId = useId().replace(/:/g, "");

    useEffect(() => {
        const root = animationRootRef.current;
        if (!root) return;

        const animatedElements = Array.from(
            root.querySelectorAll<HTMLElement>(".performance-animate"),
        );

        if (!("IntersectionObserver" in window)) {
            animatedElements.forEach((element) =>
                element.classList.add("is-visible"),
            );
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
                rootMargin: "0px 0px -36px 0px",
            },
        );

        animatedElements.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, []);

    if (!SITE.flags.DEMO_DATA && !SITE.flags.SHOW_QUALITY_TARGETS) {
        return null;
    }

    const series = demo.series[k];
    const values = series.data;

    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    const points = values.map((value, index) => {
        const x =
            values.length <= 1 ? 160 : 18 + (index * 284) / (values.length - 1);

        const y = 98 - ((value - min) / range) * 70;

        return [x, y] as const;
    });

    const linePath = points
        .map(([x, y], index) => {
            return `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
        })
        .join(" ");

    const firstPoint = points[0];
    const lastPoint = points[points.length - 1];

    const areaPath =
        firstPoint && lastPoint
            ? `${linePath} L${lastPoint[0].toFixed(2)} 108 L${firstPoint[0].toFixed(2)} 108 Z`
            : "";

    const firstValue = values[0] ?? 0;
    const lastValue = values[values.length - 1] ?? 0;

    const firstMonth = demo.months[0] ?? "Start";
    const lastMonth = demo.months[demo.months.length - 1] ?? "End";

    const kpis = [
        { label: "Clean-claim rate", value: demo.kpis.clean },
        { label: "Denial rate", value: demo.kpis.denial },
        { label: "Days in A/R", value: demo.kpis.ar },
        { label: "First-pass rate", value: demo.kpis.fpr },
    ];

    return (
        <Section id="performance" className="bg-white overflow-hidden">
            <Head
                eyebrow="Performance & quality"
                title="Billing visibility. Clearer insights."
            >
                Explore an example of the reporting experience available to your
                practice. All displayed performance figures and charts are
                illustrative samples, not actual client results.
            </Head>

            <div ref={animationRootRef} className="space-y-7">
                {/* Sample data notice */}
                {SITE.flags.DEMO_DATA && (
                    <>
                        <div className="performance-animate relative overflow-hidden rounded-2xl border border-amber-200 bg-amber-50/70 p-5 sm:p-6">
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -right-12 -top-16 size-40 rounded-full bg-amber-200/30 blur-3xl"
                            />

                            <div className="relative flex items-start gap-3">
                                <div className="grid size-10 shrink-0 place-items-center rounded-xl border border-amber-200 bg-white text-amber-700">
                                    <ShieldCheck
                                        className="size-5"
                                        aria-hidden="true"
                                    />
                                </div>

                                <div className="min-w-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h3 className="text-sm font-semibold text-navy">
                                            Illustrative reporting preview
                                        </h3>
                                        <DemoBadge />
                                    </div>

                                    <p className="mt-2 max-w-3xl text-sm leading-6 text-amber-950/80">
                                        These example metrics, claim counts, and
                                        chart values are for demonstration only.
                                        They do not represent verified practice
                                        performance, guaranteed outcomes, or
                                        actual client data.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Dashboard controls */}
                        <div className="performance-animate flex flex-col gap-4 rounded-2xl border border-line bg-canvas/70 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                                <label
                                    htmlFor="performance-specialty"
                                    className="text-sm font-semibold text-navy"
                                >
                                    Preview specialty
                                </label>

                                <select
                                    id="performance-specialty"
                                    value={sp}
                                    onChange={(event) =>
                                        setSp(event.target.value)
                                    }
                                    className="min-h-11 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm font-medium text-navy outline-none transition hover:border-line-strong focus-visible:border-brand focus-visible:ring-4 focus-visible:ring-brand/10 sm:w-auto sm:min-w-52"
                                >
                                    {specialties.map((specialty) => (
                                        <option
                                            key={specialty.name}
                                            value={specialty.name}
                                        >
                                            {specialty.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <a
                                href="https://www.cms.gov/medicare/physician-fee-schedule/search"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Open CMS Physician Fee Schedule lookup in a new tab"
                                className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-semibold text-navy transition hover:border-brand/30 hover:bg-brand/5 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:self-auto"
                            >
                                CMS Fee Schedule
                                <ExternalLink
                                    className="size-4 shrink-0"
                                    aria-hidden="true"
                                />
                            </a>
                        </div>

                        <p className="performance-animate -mt-4 text-xs leading-5 text-muted">
                            Specialty selection is for interface preview only;
                            the sample figures below are not specialty-specific.
                        </p>

                        {/* Animated KPI cards */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {kpis.map((kpi, index) => (
                                <Card
                                    key={kpi.label}
                                    className={`${cardClass} performance-animate performance-delay-${index} performance-sheen group relative overflow-hidden p-5 sm:p-6 hover:-translate-y-1`}
                                >
                                    <div
                                        aria-hidden="true"
                                        className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-brand/5 blur-2xl transition duration-700 group-hover:scale-150 group-hover:bg-brand/10"
                                    />

                                    <div className="relative z-10 flex items-start justify-between gap-3">
                                        <p className="text-sm font-medium leading-6 text-muted">
                                            {kpi.label}
                                        </p>

                                        <div
                                            aria-hidden="true"
                                            className={`grid size-9 shrink-0 place-items-center rounded-xl ${
                                                index % 2 === 0
                                                    ? "bg-aqua text-[#0b6f62]"
                                                    : "bg-brand/5 text-brand"
                                            } transition duration-300 group-hover:rotate-6 group-hover:scale-110`}
                                        >
                                            {index % 2 === 0 ? (
                                                <ChartNoAxesCombined className="size-4" />
                                            ) : (
                                                <TrendingUp className="size-4" />
                                            )}
                                        </div>
                                    </div>

                                    <p className="relative z-10 mt-4 text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
                                        {kpi.value}
                                    </p>

                                    <div className="relative z-10 mt-4 flex items-center justify-between gap-2 border-t border-line pt-3">
                                        <span className="text-xs text-muted">
                                            {metricCards[index]?.description}
                                        </span>

                                        <Pill tone="gray">Sample</Pill>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* Chart and sample breakdowns */}
                        <div className="grid items-start gap-6 xl:grid-cols-[1.4fr_1fr]">
                            {/* Interactive chart */}
                            <Card className="performance-animate min-w-0 p-4 sm:p-6">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                                            Analytics overview
                                        </p>

                                        <h3 className="mt-2 text-xl font-semibold tracking-tight text-navy">
                                            {series.label}
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-muted">
                                            Illustrative 12-month trend
                                        </p>
                                    </div>

                                    <Pill tone="gray">Sample data</Pill>
                                </div>

                                <div
                                    role="group"
                                    aria-label="Choose sample chart metric"
                                    className="mt-5 flex flex-wrap gap-2"
                                >
                                    {(Object.keys(demo.series) as K[]).map(
                                        (key) => {
                                            const active = k === key;

                                            return (
                                                <button
                                                    key={key}
                                                    type="button"
                                                    aria-pressed={active}
                                                    onClick={() => setK(key)}
                                                    className={`min-h-10 cursor-pointer rounded-xl border px-3 py-2 text-xs font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand motion-reduce:transition-none sm:text-sm ${
                                                        active
                                                            ? "border-brand bg-brand text-white shadow-sm"
                                                            : "border-line bg-white text-muted hover:border-brand/30 hover:bg-brand/5 hover:text-brand"
                                                    }`}
                                                >
                                                    {demo.series[key].label}
                                                </button>
                                            );
                                        },
                                    )}
                                </div>

                                {/* Animated chart */}
                                <div className="performance-chart performance-animate mt-5 rounded-2xl border border-line bg-canvas/50 p-2 sm:p-3">
                                    <svg
                                        key={k}
                                        viewBox="0 0 320 132"
                                        className="w-full overflow-visible"
                                        role="img"
                                        aria-label={`${series.label}, illustrative sample data from ${firstMonth} at ${firstValue}${series.unit} to ${lastMonth} at ${lastValue}${series.unit}`}
                                    >
                                        <defs>
                                            <linearGradient
                                                id={`chart-area-${chartId}`}
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="0%"
                                                    stopColor="#27C2AE"
                                                    stopOpacity="0.28"
                                                />
                                                <stop
                                                    offset="100%"
                                                    stopColor="#27C2AE"
                                                    stopOpacity="0.02"
                                                />
                                            </linearGradient>
                                        </defs>

                                        {/* Grid lines */}
                                        {chartGridLines.map((y) => (
                                            <line
                                                key={y}
                                                x1="16"
                                                x2="304"
                                                y1={y}
                                                y2={y}
                                                stroke="#E3EAF1"
                                                strokeWidth="1"
                                                strokeDasharray="3 5"
                                            />
                                        ))}

                                        {/* Filled chart area */}
                                        {areaPath && (
                                            <path
                                                d={areaPath}
                                                fill={`url(#chart-area-${chartId})`}
                                                className="performance-chart-area"
                                            />
                                        )}

                                        {/* Animated trend line */}
                                        {linePath && (
                                            <path
                                                d={linePath}
                                                fill="none"
                                                stroke="#2F6BFF"
                                                strokeWidth="2.5"
                                                strokeLinejoin="round"
                                                strokeLinecap="round"
                                                className="performance-chart-line"
                                            />
                                        )}

                                        {/* Animated sample points */}
                                        {points.map(([x, y], index) => (
                                            <circle
                                                key={`${demo.months[index] ?? index}-${index}`}
                                                cx={x}
                                                cy={y}
                                                r="3.2"
                                                fill="#27C2AE"
                                                stroke="#FFFFFF"
                                                strokeWidth="1.5"
                                                className="performance-chart-dot"
                                                style={{
                                                    animationDelay: `${index * 45}ms`,
                                                }}
                                            >
                                                <title>
                                                    {`${demo.months[index] ?? `Period ${index + 1}`}: ${values[index] ?? 0}${series.unit}`}
                                                </title>
                                            </circle>
                                        ))}

                                        {/* Month labels */}
                                        {demo.months.map((month, index) =>
                                            index % 2 === 0 ? (
                                                <text
                                                    key={month}
                                                    x={points[index]?.[0] ?? 0}
                                                    y="127"
                                                    fontSize="9"
                                                    textAnchor="middle"
                                                    fill="#5B667A"
                                                >
                                                    {month}
                                                </text>
                                            ) : null,
                                        )}
                                    </svg>
                                </div>

                                {/* Accessible data table */}
                                <table className="sr-only">
                                    <caption>
                                        {series.label} — illustrative sample
                                        values, not actual client results
                                    </caption>
                                    <thead>
                                        <tr>
                                            <th scope="col">Month</th>
                                            <th scope="col">Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {demo.months.map((month, index) => (
                                            <tr key={month}>
                                                <th scope="row">{month}</th>
                                                <td>
                                                    {values[index] ?? 0}
                                                    {series.unit}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="mt-4 flex items-start gap-2 border-t border-line pt-4">
                                    <ShieldCheck
                                        className="mt-0.5 size-4 shrink-0 text-mint"
                                        aria-hidden="true"
                                    />

                                    <p className="text-xs leading-5 text-muted">
                                        Illustrative values only. Actual
                                        reporting metrics and definitions should
                                        be agreed with the practice.
                                    </p>
                                </div>
                            </Card>

                            {/* Example data breakdowns */}
                            <div className="grid min-w-0 gap-6">
                                <Card className="performance-animate p-5 sm:p-6">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <h3 className="text-base font-semibold text-navy">
                                                Top CPT codes
                                            </h3>
                                            <p className="mt-1 text-xs text-muted">
                                                Illustrative breakdown
                                            </p>
                                        </div>

                                        <Pill tone="gray">Sample</Pill>
                                    </div>

                                    <ul className="mt-4 divide-y divide-line">
                                        {demo.topCodes.map(
                                            ([code, title, count]) => (
                                                <li
                                                    key={code}
                                                    className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0"
                                                >
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-semibold text-navy">
                                                            {code}
                                                        </p>

                                                        <p className="mt-1 break-words text-xs leading-5 text-muted">
                                                            {title}
                                                        </p>
                                                    </div>

                                                    <span className="shrink-0 rounded-lg bg-canvas px-2.5 py-1.5 text-sm font-semibold tabular-nums text-navy">
                                                        {count}
                                                    </span>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </Card>

                                <Card className="performance-animate p-5 sm:p-6">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <h3 className="text-base font-semibold text-navy">
                                                Top denial reasons
                                            </h3>
                                            <p className="mt-1 text-xs text-muted">
                                                Illustrative breakdown
                                            </p>
                                        </div>

                                        <Pill tone="gray">Sample</Pill>
                                    </div>

                                    <ul className="mt-4 divide-y divide-line">
                                        {demo.topDenials.map(
                                            ([reason, count]) => (
                                                <li
                                                    key={reason}
                                                    className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0"
                                                >
                                                    <span className="min-w-0 text-sm leading-6 text-muted">
                                                        {reason}
                                                    </span>

                                                    <span className="shrink-0 rounded-lg bg-canvas px-2.5 py-1.5 text-sm font-semibold tabular-nums text-navy">
                                                        {count}
                                                    </span>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </Card>
                            </div>
                        </div>
                    </>
                )}

                {/* Quality targets */}
                {SITE.flags.SHOW_QUALITY_TARGETS && (
                    <Card className="performance-animate overflow-hidden p-5 sm:p-7">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex items-start gap-3">
                                <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-aqua text-[#0b6f62]">
                                    <Check
                                        className="size-5"
                                        aria-hidden="true"
                                    />
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold tracking-tight text-navy">
                                        Operational quality targets
                                    </h3>

                                    <p className="mt-1 max-w-2xl text-sm leading-6 text-muted">
                                        Potential reporting and workflow
                                        priorities to review with the practice
                                        before they are adopted.
                                    </p>
                                </div>
                            </div>

                            <Pill tone="amber">To confirm with client</Pill>
                        </div>

                        <ul className="mt-6 grid gap-3 border-t border-line pt-5 sm:grid-cols-2">
                            {qualityTargets.map((target, index) => (
                                <li
                                    key={target}
                                    className="performance-animate flex items-start gap-3 rounded-xl bg-canvas/70 p-3.5 text-sm leading-6 text-navy transition duration-300 hover:-translate-y-0.5 hover:bg-aqua/30"
                                    style={{
                                        transitionDelay: `${index * 70}ms`,
                                    }}
                                >
                                    <Check
                                        className="mt-1 size-4 shrink-0 text-mint"
                                        aria-hidden="true"
                                    />

                                    <span>{target}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                )}
            </div>
        </Section>
    );
}
