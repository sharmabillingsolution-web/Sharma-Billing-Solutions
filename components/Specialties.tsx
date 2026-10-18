"use client";

import { useState } from "react";
import {
    Activity,
    Baby,
    Bone,
    Brain,
    BriefcaseMedical,
    Check,
    Eye,
    HeartPulse,
    Stethoscope,
    Syringe,
} from "lucide-react";

import { Section, Head, Card, Pill } from "./ui";

type CptFocus = {
    code: string;
    label: string;
};

type Specialty = {
    name: string;
    description: string;
    icon: typeof Stethoscope;
    cptFocus: CptFocus[];
};

const specialties: Specialty[] = [
    {
        name: "Internal Medicine",
        description:
            "Common workflows include office evaluation and management, chronic-condition follow-ups, and preventive care.",
        icon: HeartPulse,
        cptFocus: [
            {
                code: "99213",
                label: "Established patient office visit, low level",
            },
            {
                code: "99214",
                label: "Established patient office visit, moderate level",
            },
            {
                code: "99215",
                label: "Established patient office visit, high level",
            },
            { code: "99203", label: "New patient office visit, low level" },
            {
                code: "99204",
                label: "New patient office visit, moderate level",
            },
        ],
    },
    {
        name: "Family Medicine",
        description:
            "Primary-care workflows may include office visits, preventive services, and ongoing care coordination.",
        icon: Stethoscope,
        cptFocus: [
            { code: "99213", label: "Established patient office visit" },
            {
                code: "99214",
                label: "Established patient office visit, moderate level",
            },
            { code: "99395", label: "Preventive visit, age 18–39" },
            { code: "99396", label: "Preventive visit, age 40–64" },
            { code: "99495", label: "Transitional care management" },
        ],
    },
    {
        name: "Pediatrics",
        description:
            "Pediatric billing may involve age-specific preventive visits, sick visits, and immunization administration.",
        icon: Baby,
        cptFocus: [
            { code: "99213", label: "Established patient office visit" },
            { code: "99392", label: "Preventive visit, age 1–4" },
            { code: "99393", label: "Preventive visit, age 5–11" },
            { code: "99394", label: "Preventive visit, age 12–17" },
            {
                code: "90460",
                label: "Immunization administration, when applicable",
            },
        ],
    },
    {
        name: "Cardiology",
        description:
            "Cardiology workflows can include office E/M visits and diagnostic cardiac testing.",
        icon: HeartPulse,
        cptFocus: [
            { code: "99214", label: "Established patient office visit" },
            { code: "93000", label: "Electrocardiogram, complete" },
            { code: "93306", label: "Complete transthoracic echocardiography" },
            { code: "93224", label: "Holter monitoring, complete service" },
        ],
    },
    {
        name: "Endocrinology",
        description:
            "Common workflows include evaluation and management for diabetes, thyroid disorders, and other endocrine conditions.",
        icon: Activity,
        cptFocus: [
            { code: "99213", label: "Established patient office visit" },
            {
                code: "99214",
                label: "Established patient office visit, moderate level",
            },
            { code: "95250", label: "Continuous glucose monitoring, setup" },
            {
                code: "95251",
                label: "Continuous glucose monitoring, interpretation",
            },
        ],
    },
    {
        name: "Gastroenterology",
        description:
            "Gastroenterology billing may include office visits and endoscopic diagnostic or therapeutic services.",
        icon: Activity,
        cptFocus: [
            { code: "99214", label: "Established patient office visit" },
            { code: "43235", label: "Diagnostic upper GI endoscopy" },
            { code: "45378", label: "Diagnostic colonoscopy" },
            { code: "45380", label: "Colonoscopy with biopsy" },
        ],
    },
    {
        name: "Pulmonology",
        description:
            "Workflows may cover respiratory evaluation, pulmonary function testing, and ongoing disease management.",
        icon: Activity,
        cptFocus: [
            { code: "99214", label: "Established patient office visit" },
            { code: "94010", label: "Spirometry" },
            { code: "94726", label: "Plethysmography lung volumes" },
            { code: "94640", label: "Inhalation treatment, when applicable" },
        ],
    },
    {
        name: "Nephrology",
        description:
            "Nephrology workflows may include chronic kidney disease management and evaluation of renal conditions.",
        icon: Activity,
        cptFocus: [
            { code: "99213", label: "Established patient office visit" },
            {
                code: "99214",
                label: "Established patient office visit, moderate level",
            },
            {
                code: "90935",
                label: "Hemodialysis procedure, single evaluation",
            },
        ],
    },
    {
        name: "Rheumatology",
        description:
            "Common workflows include evaluation and management for inflammatory and autoimmune conditions.",
        icon: Activity,
        cptFocus: [
            { code: "99213", label: "Established patient office visit" },
            {
                code: "99214",
                label: "Established patient office visit, moderate level",
            },
            {
                code: "20610",
                label: "Major joint injection or aspiration, when applicable",
            },
        ],
    },
    {
        name: "Dermatology",
        description:
            "Dermatology billing can involve office visits, lesion evaluation, biopsies, and selected skin procedures.",
        icon: Syringe,
        cptFocus: [
            { code: "99213", label: "Established patient office visit" },
            { code: "11102", label: "Tangential skin biopsy, first lesion" },
            {
                code: "17000",
                label: "Destruction of first premalignant lesion",
            },
            { code: "17110", label: "Destruction of benign lesions, up to 14" },
        ],
    },
    {
        name: "Neurology",
        description:
            "Neurology workflows may include office evaluation and selected diagnostic testing for neurological conditions.",
        icon: Brain,
        cptFocus: [
            { code: "99214", label: "Established patient office visit" },
            { code: "95816", label: "Routine EEG, awake and drowsy" },
            { code: "95907", label: "Nerve conduction studies, 1–2 studies" },
        ],
    },
    {
        name: "Orthopedics",
        description:
            "Orthopedic billing may include musculoskeletal evaluations, imaging, and injury-related services.",
        icon: Bone,
        cptFocus: [
            { code: "99213", label: "Established patient office visit" },
            { code: "73562", label: "Knee X-ray, 3 views" },
            { code: "20610", label: "Major joint injection or aspiration" },
            { code: "73030", label: "Shoulder X-ray, 2+ views" },
        ],
    },
    {
        name: "Ophthalmology",
        description:
            "Ophthalmology workflows may include eye examinations and selected diagnostic testing.",
        icon: Eye,
        cptFocus: [
            {
                code: "92004",
                label: "Comprehensive eye examination, new patient",
            },
            {
                code: "92014",
                label: "Comprehensive eye examination, established patient",
            },
            {
                code: "92133",
                label: "Scanning computerized ophthalmic imaging",
            },
        ],
    },
    {
        name: "Psychiatry",
        description:
            "Psychiatry workflows may include psychiatric diagnostic evaluations and medication-management visits.",
        icon: Brain,
        cptFocus: [
            {
                code: "90792",
                label: "Psychiatric diagnostic evaluation with medical services",
            },
            { code: "99214", label: "Office E/M visit, when applicable" },
            {
                code: "90833",
                label: "Psychotherapy add-on with E/M, when applicable",
            },
            { code: "90837", label: "Psychotherapy, 60 minutes" },
        ],
    },
    {
        name: "Obstetrics & Gynecology",
        description:
            "OB/GYN workflows may include preventive visits, problem-oriented visits, and pregnancy-related care.",
        icon: BriefcaseMedical,
        cptFocus: [
            { code: "99395", label: "Preventive visit, age 18–39" },
            { code: "99214", label: "Established patient office visit" },
            {
                code: "59400",
                label: "Routine obstetric care, including delivery",
            },
        ],
    },
    {
        name: "Pain Management",
        description:
            "Pain-management workflows can include office evaluation and selected interventional services.",
        icon: Activity,
        cptFocus: [
            { code: "99214", label: "Established patient office visit" },
            {
                code: "64483",
                label: "Lumbar or sacral transforaminal injection, single level",
            },
            {
                code: "20610",
                label: "Major joint injection or aspiration, when applicable",
            },
        ],
    },
    {
        name: "Anesthesiology",
        description:
            "Anesthesia billing requires careful review of procedure details, time units, modifiers, and payer rules.",
        icon: Syringe,
        cptFocus: [
            {
                code: "00100",
                label: "Anesthesia for procedures on salivary glands",
            },
            { code: "01400", label: "Anesthesia for knee procedures" },
            {
                code: "01996",
                label: "Daily management of epidural or subarachnoid drug administration",
            },
        ],
    },
    {
        name: "Radiology",
        description:
            "Radiology workflows may include diagnostic imaging services, interpretation, and applicable modifiers.",
        icon: Activity,
        cptFocus: [
            { code: "71046", label: "Chest X-ray, 2 views" },
            { code: "72100", label: "Lumbar spine X-ray, 2–3 views" },
            { code: "76700", label: "Complete abdominal ultrasound" },
        ],
    },
    {
        name: "Physical Medicine & Rehabilitation",
        description:
            "Rehabilitation billing may include evaluations, therapeutic procedures, and functional-care services.",
        icon: Activity,
        cptFocus: [
            {
                code: "97161",
                label: "Physical therapy evaluation, low complexity",
            },
            { code: "97110", label: "Therapeutic exercise" },
            { code: "97530", label: "Therapeutic activities" },
        ],
    },
    {
        name: "Urgent Care",
        description:
            "Urgent-care workflows often combine problem-oriented visits with point-of-care tests and minor procedures.",
        icon: BriefcaseMedical,
        cptFocus: [
            { code: "99203", label: "New patient office or outpatient visit" },
            { code: "99213", label: "Established patient office visit" },
            {
                code: "87880",
                label: "Rapid infectious agent test, when applicable",
            },
        ],
    },
];

const additionalSpecialties = [
    "Geriatrics",
    "Hematology",
    "Oncology",
    "Infectious Disease",
    "Allergy & Immunology",
    "Sleep Medicine",
    "Palliative Care",
    "General Surgery",
    "Neurosurgery",
    "Cardiothoracic Surgery",
    "Vascular Surgery",
    "Plastic Surgery",
    "Urology",
    "Reproductive Endocrinology",
    "Otolaryngology (ENT)",
    "Emergency Medicine",
    "Pathology",
    "Nuclear Medicine",
    "Occupational Medicine",
    "Sports Medicine",
    "Wound Care",
    "Chiropractic",
    "Podiatry",
    "Behavioral Health",
];

const fallbackSpecialty = (name: string): Specialty => ({
    name,
    description: `Billing workflows for ${name} depend on the services performed, documentation, payer requirements, and applicable coding guidelines.`,
    icon: Stethoscope,
    cptFocus: [],
});

export function Specialties() {
    const [selectedName, setSelectedName] = useState("Internal Medicine");

    // Keep the specialty pills in the same order as the reference design.
    const specialtyDisplayOrder = [
        "Internal Medicine",
        "Family Medicine",
        "Anesthesiology",
        "Radiology",
        "Pain Management",
        "Physical Therapy",
        "Chiropractic",
        "Orthopedics",
        "Podiatry",
        "Pediatrics",
        "Gastroenterology",
        "Dermatology",
        "Wound Care",
        "Psychology",
        "Behavioral Health",
    ];

    const allAvailableSpecialties = [
        ...specialties,
        ...additionalSpecialties.map(fallbackSpecialty),
    ];

    const allSpecialties = specialtyDisplayOrder.map(
        (name) =>
            allAvailableSpecialties.find(
                (specialty) => specialty.name === name,
            ) ?? fallbackSpecialty(name),
    );

    const selected =
        allSpecialties.find((specialty) => specialty.name === selectedName) ??
        allSpecialties[0]!;

    const SelectedIcon = selected.icon;

    return (
        <Section id="specialties">
            <Head
                eyebrow="Specialties"
                title="Specialty-focused billing support."
            >
                Explore the specialties below to preview common billing
                workflows and example CPT focus areas. Internal Medicine is
                highlighted as the primary specialty.
            </Head>

            <div className="mt-8 flex flex-wrap gap-2">
                {allSpecialties.map((specialty) => {
                    const isSelected = selected.name === specialty.name;

                    return (
                        <button
                            key={specialty.name}
                            type="button"
                            onClick={() => setSelectedName(specialty.name)}
                            aria-pressed={isSelected}
                            className={`rounded-full border px-4 py-2 text-sm font-medium transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                                isSelected
                                    ? "border-brand bg-brand text-white shadow-sm"
                                    : "border-line bg-white text-navy hover:border-brand/40 hover:bg-brand/5"
                            }`}
                        >
                            {specialty.name}
                            {specialty.name === "Internal Medicine" ? (
                                <span className="ml-1 opacity-80">
                                    · Primary
                                </span>
                            ) : null}
                        </button>
                    );
                })}
            </div>

            <Card className="specialty-card mt-5 overflow-hidden border-line bg-white p-4 sm:p-6">
                <div className="grid gap-5 sm:grid-cols-[220px_1fr] sm:gap-6">
                    <div className="relative flex min-h-44 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-aqua/70 to-brand/10">
                        <div className="grid size-20 place-items-center rounded-full border border-white/80 bg-white/80 text-brand shadow-sm">
                            <SelectedIcon
                                className="size-10"
                                aria-hidden="true"
                            />
                        </div>
                        <div className="absolute right-3 top-3 grid size-10 place-items-center rounded-full border border-line bg-white text-mint shadow-sm">
                            <Stethoscope
                                className="size-5"
                                aria-hidden="true"
                            />
                        </div>
                    </div>

                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-semibold text-navy">
                                {selected.name}
                            </h3>
                            {selected.name === "Internal Medicine" ? (
                                <Pill tone="blue">Primary specialty</Pill>
                            ) : null}
                        </div>

                        <p className="mt-2 text-sm leading-6 text-muted">
                            {selected.description}
                        </p>

                        <p className="mt-4 text-sm font-semibold text-navy">
                            Typical CPT focus (illustrative)
                        </p>

                        {selected.cptFocus.length > 0 ? (
                            <ul className="mt-3 grid gap-x-5 gap-y-3 md:grid-cols-2">
                                {selected.cptFocus.map((item) => (
                                    <li
                                        key={`${selected.name}-${item.code}-${item.label}`}
                                        className="flex min-w-0 items-start gap-2.5 text-sm leading-5 text-navy"
                                    >
                                        <span className="shrink-0 rounded-lg bg-brand px-2.5 py-1.5 text-xs font-bold text-white">
                                            {item.code}
                                        </span>
                                        <span className="pt-1">
                                            {item.label}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="mt-3 rounded-xl border border-dashed border-line bg-canvas/60 p-4 text-sm leading-6 text-muted">
                                CPT examples for this specialty should be
                                confirmed against the actual services offered,
                                current code set, documentation, and payer
                                requirements before publication.
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-5 flex items-start gap-2 border-t border-line pt-4 text-xs leading-5 text-muted">
                    <Check
                        className="mt-0.5 size-4 shrink-0 text-mint"
                        aria-hidden="true"
                    />
                    <p>
                        CPT examples are for interface demonstration only. They
                        are not a complete coding guide or billing advice;
                        applicable codes depend on documentation, current
                        guidelines, and payer rules.
                    </p>
                </div>
            </Card>
        </Section>
    );
}
