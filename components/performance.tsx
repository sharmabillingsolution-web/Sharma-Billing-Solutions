"use client";

import { useId, useMemo, useState } from "react";
import {
    Check,
    ChartNoAxesCombined,
    ExternalLink,
    ShieldCheck,
    TrendingUp,
} from "lucide-react";

import { Section, Head, Card, DemoBadge, Pill } from "./ui";
import { SITE } from "@/config/site";
import {
    demo,
    performanceSpecialties,
    qualityTargets,
} from "@/data/performance-data";

type MetricKey = "cleanClaimRatio" | "denialRate" | "recoveryRate" | "arCount";

const metricOptions: {
    key: MetricKey;
    label: string;
    format: "percent" | "count";
}[] = [
    { key: "cleanClaimRatio", label: "Clean claim ratio", format: "percent" },
    { key: "denialRate", label: "Denial rate", format: "percent" },
    { key: "recoveryRate", label: "Payment recovery rate", format: "percent" },
    { key: "arCount", label: "A/R follow-up claims", format: "count" },
];

const money = (value: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(value);

const number = (value: number) =>
    new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);

const percent = (value: number) => `${(value * 100).toFixed(2)}%`;

const cardClass =
    "rounded-2xl border border-line bg-white shadow-soft transition duration-300 hover:border-line-strong hover:shadow-card motion-reduce:transition-none";

export function Performance() {
    const [selectedSpecialty, setSelectedSpecialty] =
        useState("All Specialties");
    const [metricKey, setMetricKey] = useState<MetricKey>("cleanClaimRatio");
    const chartId = useId().replace(/:/g, "");

    const selectedData = performanceSpecialties.find(
        (item) => item.name === selectedSpecialty,
    );
    const isAllSpecialties = !selectedData;

    const current = useMemo(() => {
        if (selectedData) {
            return {
                claims: selectedData.claims,
                paidClaims: selectedData.paidClaims,
                deniedClaims: Math.round(
                    selectedData.claims * selectedData.denialRate,
                ),
                arFollowUpClaims: selectedData.arCount,
                billed: selectedData.billed,
                paid: selectedData.paid,
                billedPaidDifference: selectedData.difference,
                cleanClaimRatio: selectedData.cleanClaimRatio,
                denialRate: selectedData.denialRate,
                paymentRecoveryRate: selectedData.recoveryRate,
                averageArFollowUpDays: null as number | null,
            };
        }

        return {
            claims: demo.totals.claims,
            paidClaims: demo.totals.paidClaims,
            deniedClaims: demo.totals.deniedClaims,
            arFollowUpClaims: demo.totals.arFollowUpClaims,
            billed: demo.totals.billed,
            paid: demo.totals.paid,
            billedPaidDifference: demo.totals.billedPaidDifference,
            cleanClaimRatio: demo.totals.cleanClaimRatio,
            denialRate: demo.totals.denialRate,
            paymentRecoveryRate: demo.totals.paymentRecoveryRate,
            averageArFollowUpDays: demo.totals.averageArFollowUpDays,
        };
    }, [selectedData, isAllSpecialties]);

    const chartValues = useMemo(
        () =>
            performanceSpecialties.map((specialty) => ({
                name: specialty.name,
                value: specialty[metricKey],
            })),
        [metricKey],
    );

    const metric = metricOptions.find((item) => item.key === metricKey)!;
    const maxValue = Math.max(...chartValues.map((item) => item.value), 1);
    const minValue = Math.min(...chartValues.map((item) => item.value), 0);
    const range = maxValue - minValue || 1;
    const points = chartValues.map((item, index) => {
        const x =
            chartValues.length <= 1
                ? 160
                : 18 + (index * 284) / (chartValues.length - 1);
        const y = 98 - ((item.value - minValue) / range) * 70;
        return { ...item, x, y };
    });
    const linePath = points
        .map(
            (point, index) =>
                `${index === 0 ? "M" : "L"}${point.x.toFixed(2)} ${point.y.toFixed(2)}`,
        )
        .join(" ");

    const kpis = [
        {
            label: "Clean-claim ratio",
            value: percent(current.cleanClaimRatio),
            description: "Claims not denied ÷ total claims",
            icon: ChartNoAxesCombined,
        },
        {
            label: "Denial rate",
            value: percent(current.denialRate),
            description: `${number(current.deniedClaims)} denied claims`,
            icon: TrendingUp,
        },
        {
            label: "Payment recovery",
            value: percent(current.paymentRecoveryRate),
            description: "Total paid ÷ total billed",
            icon: ChartNoAxesCombined,
        },
        {
            label: "A/R follow-up",
            value: number(current.arFollowUpClaims),
            description: "Claims awaiting follow-up",
            icon: TrendingUp,
        },
    ];

    if (!SITE.flags.DEMO_DATA && !SITE.flags.SHOW_QUALITY_TARGETS) {
        return null;
    }

    return (
        <Section id="performance" className="overflow-hidden bg-white">
            <Head
                eyebrow="Performance & quality"
                title="Billing visibility. Clearer insights."
            >
                Review the revenue-cycle metrics summarized in the provided
                claims workbook. Select a specialty or metric to explore the
                available figures.
            </Head>

            <div className="space-y-7">
                <div className="relative overflow-hidden rounded-2xl border border-amber-200 bg-amber-50/70 p-5 sm:p-6">
                    <div className="flex items-start gap-3">
                        <div className="grid size-10 shrink-0 place-items-center rounded-xl border border-amber-200 bg-white text-amber-700">
                            <ShieldCheck
                                className="size-5"
                                aria-hidden="true"
                            />
                        </div>
                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-sm font-semibold text-navy">
                                    Claims workbook reporting preview
                                </h3>
                                <DemoBadge />
                            </div>
                            <p className="mt-2 max-w-3xl text-sm leading-6 text-amber-950/80">
                                Figures are calculated from the supplied
                                workbook (1,500 claims). Verify the data,
                                reporting period, definitions, and permission to
                                publish before presenting these figures as
                                client results.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 rounded-2xl border border-line bg-canvas/70 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                        <label
                            htmlFor="performance-specialty"
                            className="text-sm font-semibold text-navy"
                        >
                            Select specialty
                        </label>
                        <select
                            id="performance-specialty"
                            value={selectedSpecialty}
                            onChange={(event) =>
                                setSelectedSpecialty(event.target.value)
                            }
                            className="min-h-11 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm font-medium text-navy outline-none transition hover:border-line-strong focus-visible:border-brand focus-visible:ring-4 focus-visible:ring-brand/10 sm:w-auto sm:min-w-60"
                        >
                            <option value="All Specialties">
                                All Specialties
                            </option>
                            {performanceSpecialties.map((specialty) => (
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
                        className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-semibold text-navy transition hover:border-brand/30 hover:bg-brand/5 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:self-auto"
                    >
                        CMS Fee Schedule
                        <ExternalLink
                            className="size-4 shrink-0"
                            aria-hidden="true"
                        />
                    </a>
                </div>

                <p className="-mt-4 text-xs leading-5 text-muted">
                    {selectedSpecialty === "All Specialties"
                        ? "Showing totals across all specialties in the workbook."
                        : `Showing workbook metrics for ${selectedSpecialty}.`}{" "}
                    The workbook has no service-date field, so a dated monthly
                    trend cannot be calculated from the supplied source.
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {kpis.map((kpi, index) => {
                        const Icon = kpi.icon;
                        return (
                            <Card
                                key={kpi.label}
                                className={`${cardClass} group relative overflow-hidden p-5 sm:p-6 hover:-translate-y-1`}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <p className="text-sm font-medium leading-6 text-muted">
                                        {kpi.label}
                                    </p>
                                    <div
                                        className={`grid size-9 shrink-0 place-items-center rounded-xl ${
                                            index % 2 === 0
                                                ? "bg-aqua text-[#0b6f62]"
                                                : "bg-brand/5 text-brand"
                                        } transition duration-300 group-hover:rotate-6 group-hover:scale-110`}
                                    >
                                        <Icon
                                            className="size-4"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </div>
                                <p className="mt-4 text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
                                    {kpi.value}
                                </p>
                                <div className="mt-4 flex items-center justify-between gap-2 border-t border-line pt-3">
                                    <span className="text-xs text-muted">
                                        {kpi.description}
                                    </span>
                                    <Pill tone="gray">Workbook</Pill>
                                </div>
                            </Card>
                        );
                    })}
                </div>

                <div className="grid items-start gap-6 xl:grid-cols-[1.4fr_1fr]">
                    <Card className="min-w-0 p-4 sm:p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                                    Specialty comparison
                                </p>
                                <h3 className="mt-2 text-xl font-semibold tracking-tight text-navy">
                                    {metric.label}
                                </h3>
                                <p className="mt-1 text-sm leading-6 text-muted">
                                    Comparison across specialties in the
                                    workbook
                                </p>
                            </div>
                            <Pill tone="gray">Workbook data</Pill>
                        </div>

                        <div
                            role="group"
                            aria-label="Choose comparison metric"
                            className="mt-5 flex flex-wrap gap-2"
                        >
                            {metricOptions.map((option) => {
                                const active = metricKey === option.key;
                                return (
                                    <button
                                        key={option.key}
                                        type="button"
                                        aria-pressed={active}
                                        onClick={() => setMetricKey(option.key)}
                                        className={`min-h-10 rounded-xl border px-3 py-2 text-xs font-semibold transition sm:text-sm ${
                                            active
                                                ? "border-brand bg-brand text-white shadow-sm"
                                                : "border-line bg-white text-muted hover:border-brand/30 hover:bg-brand/5 hover:text-brand"
                                        }`}
                                    >
                                        {option.label}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mt-5 rounded-2xl border border-line bg-canvas/50 p-2 sm:p-3">
                            <svg
                                key={metricKey}
                                viewBox="0 0 320 132"
                                className="w-full overflow-visible"
                                role="img"
                                aria-label={`${metric.label} comparison across ${chartValues.length} specialties`}
                            >
                                <defs>
                                    <linearGradient
                                        id={`performance-area-${chartId}`}
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="0%"
                                            stopColor="#27C2AE"
                                            stopOpacity="0.24"
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor="#27C2AE"
                                            stopOpacity="0.02"
                                        />
                                    </linearGradient>
                                </defs>
                                {[26, 49, 72, 95].map((y) => (
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
                                {points.length > 1 && (
                                    <path
                                        d={`${linePath} L${points[points.length - 1]!.x.toFixed(2)} 108 L${points[0]!.x.toFixed(2)} 108 Z`}
                                        fill={`url(#performance-area-${chartId})`}
                                    />
                                )}
                                <path
                                    d={linePath}
                                    fill="none"
                                    stroke="#2F6BFF"
                                    strokeWidth="2.5"
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                />
                                {points.map((point) => (
                                    <circle
                                        key={point.name}
                                        cx={point.x}
                                        cy={point.y}
                                        r="3.2"
                                        fill="#27C2AE"
                                        stroke="#fff"
                                        strokeWidth="1.5"
                                    >
                                        <title>{`${point.name}: ${metric.format === "percent" ? percent(point.value) : number(point.value)}`}</title>
                                    </circle>
                                ))}
                                {points.map((point, index) =>
                                    index % 2 === 0 ? (
                                        <text
                                            key={point.name}
                                            x={point.x}
                                            y="124"
                                            fontSize="7"
                                            textAnchor="middle"
                                            fill="#5B667A"
                                        >
                                            {point.name.length > 11
                                                ? `${point.name.slice(0, 10)}…`
                                                : point.name}
                                        </text>
                                    ) : null,
                                )}
                            </svg>
                        </div>

                        <div className="mt-4 flex items-start gap-2 border-t border-line pt-4">
                            <ShieldCheck
                                className="mt-0.5 size-4 shrink-0 text-mint"
                                aria-hidden="true"
                            />
                            <p className="text-xs leading-5 text-muted">
                                This is a cross-specialty comparison, not a
                                monthly trend. The workbook contains no dates
                                for monthly grouping.
                            </p>
                        </div>
                    </Card>

                    <div className="grid min-w-0 gap-6">
                        <Card className="p-5 sm:p-6">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h3 className="text-base font-semibold text-navy">
                                        Highest billed specialties
                                    </h3>
                                    <p className="mt-1 text-xs text-muted">
                                        Ranked by total billed amount
                                    </p>
                                </div>
                                <Pill tone="gray">Workbook</Pill>
                            </div>
                            <ul className="mt-4 divide-y divide-line">
                                {demo.topSpecialties.map((item) => (
                                    <li
                                        key={item.name}
                                        className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0"
                                    >
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-navy">
                                                {item.name}
                                            </p>
                                            <p className="mt-1 text-xs text-muted">
                                                {number(item.claims)} claims ·{" "}
                                                {percent(item.recoveryRate)}{" "}
                                                recovery
                                            </p>
                                        </div>
                                        <span className="shrink-0 rounded-lg bg-canvas px-2.5 py-1.5 text-sm font-semibold tabular-nums text-navy">
                                            {money(item.billed)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        <Card className="p-5 sm:p-6">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h3 className="text-base font-semibold text-navy">
                                        Denial reasons
                                    </h3>
                                    <p className="mt-1 text-xs text-muted">
                                        Counts from coded denial records
                                    </p>
                                </div>
                                <Pill tone="gray">Workbook</Pill>
                            </div>
                            <ul className="mt-4 divide-y divide-line">
                                {demo.denialReasons.map((item) => (
                                    <li
                                        key={item.reason}
                                        className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0"
                                    >
                                        <span className="min-w-0 text-sm leading-6 text-muted">
                                            {item.reason}
                                        </span>
                                        <span className="shrink-0 rounded-lg bg-canvas px-2.5 py-1.5 text-sm font-semibold tabular-nums text-navy">
                                            {item.count}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        <Card className="p-5 sm:p-6">
                            <h3 className="text-base font-semibold text-navy">
                                Financial summary
                            </h3>
                            <dl className="mt-4 space-y-3">
                                <div className="flex items-center justify-between gap-3">
                                    <dt className="text-sm text-muted">
                                        Total billed
                                    </dt>
                                    <dd className="text-sm font-semibold text-navy">
                                        {money(current.billed)}
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <dt className="text-sm text-muted">
                                        Total paid
                                    </dt>
                                    <dd className="text-sm font-semibold text-navy">
                                        {money(current.paid)}
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between gap-3 border-t border-line pt-3">
                                    <dt className="text-sm text-muted">
                                        Billed − paid
                                    </dt>
                                    <dd className="text-sm font-semibold text-navy">
                                        {money(current.billedPaidDifference)}
                                    </dd>
                                </div>
                            </dl>
                            <p className="mt-3 text-xs leading-5 text-muted">
                                The billed-minus-paid difference can include
                                denials, open A/R, contractual adjustments, and
                                other differences; it should not be interpreted
                                as entirely collectible.
                            </p>
                        </Card>
                    </div>
                </div>

                {SITE.flags.SHOW_QUALITY_TARGETS && (
                    <Card className="overflow-hidden p-5 sm:p-7">
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
                                        Proposed workflow targets; confirm
                                        feasibility and definitions with the
                                        practice before adoption.
                                    </p>
                                </div>
                            </div>
                            <Pill tone="amber">To confirm with client</Pill>
                        </div>
                        <ul className="mt-6 grid gap-3 border-t border-line pt-5 sm:grid-cols-2">
                            {qualityTargets.map((target) => (
                                <li
                                    key={target}
                                    className="flex items-start gap-3 rounded-xl bg-canvas/70 p-3.5 text-sm leading-6 text-navy transition duration-300 hover:-translate-y-0.5 hover:bg-aqua/30"
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
