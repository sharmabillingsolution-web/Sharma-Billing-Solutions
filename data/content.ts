import {
    ClipboardCheck,
    ShieldCheck,
    FileSignature,
    Scale,
    Send,
    RefreshCcw,
    Hourglass,
    BarChart3,
    type LucideIcon,
} from "lucide-react";

export type Service = {
    title: string;
    desc: string;
    icon: LucideIcon;
    group: "front" | "rcm";
};
export const services: Service[] = [
    {
        title: "Medical Coding Review",
        desc: "Review CPT, ICD-10, and modifiers for accuracy before billing.",
        icon: ClipboardCheck,
        group: "front",
    },
    {
        title: "Eligibility & Benefits",
        desc: "Verify coverage, copay, deductible, and visit limits before the visit.",
        icon: ShieldCheck,
        group: "front",
    },
    {
        title: "Authorization Intake",
        desc: "Support prior-authorization requests, tracking, and follow-up.",
        icon: FileSignature,
        group: "front",
    },
    {
        title: "Policy Execution",
        desc: "Apply payer policies and guidelines consistently to each account.",
        icon: Scale,
        group: "front",
    },
    {
        title: "Claims Submission & Rejections",
        desc: "Support claim submission through your existing clearinghouse workflow and address rejections.",
        icon: Send,
        group: "rcm",
    },
    {
        title: "Denial Management & Appeals",
        desc: "Work denials, follow-up, and appeal processes as part of the billing workflow.",
        icon: RefreshCcw,
        group: "rcm",
    },
    {
        title: "Accounts Receivable Follow-up",
        desc: "Aged A/R visibility and follow-up priorities, with no promised recovery rate.",
        icon: Hourglass,
        group: "rcm",
    },
    {
        title: "Reporting & Billing Visibility",
        desc: "Monthly reporting on claims, denials, and A/R so you can see how billing is moving.",
        icon: BarChart3,
        group: "rcm",
    },
];

export const statesWorked = [
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

/** Only list approved specialty names. Internal Medicine is the default. */

export const specialties: {
    name: string;
    primary?: boolean;
}[] = [
    { name: "Internal Medicine", primary: true },
    { name: "Family Medicine" },
    { name: "Anesthesiology" },
    { name: "Radiology" },
    { name: "Pain Management" },
    { name: "Physical Therapy" },
    { name: "Chiropractic" },
    { name: "Orthopedics" },
    { name: "Podiatry" },
    { name: "Pediatrics" },
    { name: "Gastroenterology" },
    { name: "Dermatology" },
    { name: "Wound Care" },
    { name: "Psychology" },
    { name: "Behavioral Health" },
];

export const internalMedicineTopics = [
    "Evaluation and management (E/M) visits",
    "Follow-up visits",
    "Preventive visits",
    "Chronic-condition care",
    "ICD-10-CM diagnosis coding",
    "CPT and HCPCS coding",
    "Claim submission and tracking",
    "Payment posting and reconciliation",
    "Denial management and appeals",
    "Accounts receivable follow-up",
    "Eligibility and benefits verification",
    "Prior authorization coordination",
];

/** DRAFT steps — client must approve before launch. */

export const processSteps: readonly (readonly [string, string])[] = [
    [
        "Medical Coding Review",
        "Review clinical documentation, CPT and ICD-10 code selection, and applicable modifiers to support accurate, compliant claim preparation.",
    ],
    [
        "Eligibility & Benefits",
        "Verify insurance eligibility, coverage, copays, deductibles, and benefit limitations before services are billed.",
    ],
    [
        "Authorization Intake",
        "Collect and review referral and prior authorization requirements, track approval status, and identify missing information before claim submission.",
    ],
    [
        "Policy Execution",
        "Apply documented billing procedures, payer-specific requirements, and established quality checks consistently throughout the revenue cycle.",
    ],
    [
        "Claim Submission & Rejections",
        "Submit claims through the practice's clearinghouse, monitor claim status, and correct rejected claims for timely resubmission.",
    ],
    [
        "Denial Management & Appeals",
        "Investigate denial reasons, identify corrective actions, prepare appeals when appropriate, and track cases through resolution.",
    ],
    [
        "Accounts Receivable Follow-up",
        "Monitor outstanding balances, prioritize aged accounts, follow up on unpaid claims, and support timely payment resolution.",
    ],
    [
        "Reporting & Billing Visibility",
        "Provide billing reports and workflow updates to help practices review claim status, denials, outstanding receivables, and overall revenue cycle performance.",
    ],
] as const;

export const ehrSystems = [
    "Brightree",
    "Harris CareTracker",
    "DrChrono",
    "AdvancedMD",
    "TurboPT",
    "NextGen",
];

export const clearinghouses: string[] = [];
export const payors = [
    "Medicare",
    "Medicaid",
    "Commercial & private insurance",
    "Workers’ compensation",
];

export const onboarding = [
    [
        "Discovery Call",
        "Discuss specialty, claim volume, EHR, payors, and current pain points.",
    ],
    [
        "Access & Audit",
        "Arrange appropriate secure access and review A/R and recent denials.",
    ],
    [
        "Workflow Setup",
        "Configure the agreed coding, eligibility, authorization, and submission workflow.",
    ],
    [
        "Go Live & Report",
        "Start the agreed billing workflow with weekly check-ins and monthly reporting.",
    ],
] as const;

export const resources = [
    [
        "Medicare Physician Fee Schedule",
        "https://www.cms.gov/medicare/medicare-fee-for-service-payment/physicianfeesched/index.html",
        "Official CMS information on how Medicare pays physicians and other providers, including rules and payment files.",
    ],
    [
        "PFS Look-Up Tool",
        "https://www.cms.gov/medicare/physician-fee-schedule/search",
        "Search Medicare payment rates, relative value units, and payment indicators by CPT/HCPCS code and locality.",
    ],
    [
        "PFS Look-Up Tool Overview",
        "https://www.cms.gov/medicare/physician-fee-schedule/search/overview",
        "Explains the lookup tool and notes that official payment files may need to be checked with the local Medicare Administrative Contractor.",
    ],
    [
        "CMS.gov",
        "https://www.cms.gov",
        "Centers for Medicare & Medicaid Services policies, manuals, coverage, and provider resources.",
    ],
    [
        "Medicaid.gov",
        "https://www.medicaid.gov",
        "Federal Medicaid and CHIP program information and state program links.",
    ],
    [
        "Medicare.gov",
        "https://www.medicare.gov",
        "Official Medicare coverage and plan information.",
    ],
] as const;

export const faqs = [
    [
        "Do you work inside our EHR?",
        "Yes. We work in Brightree, Harris CareTracker, DrChrono, AdvancedMD, TurboPT and NextGen, and submit through your clearinghouse.",
    ],
    [
        "Do you review codes before billing?",
        "Yes. Every claim goes through a coding review before submission to help reduce preventable denials.",
    ],
    [
        "Which payors do you handle?",
        "Medicare, Medicaid, commercial and private insurance, and workers’ compensation.",
    ],
    [
        "Can you help with A/R and old denials?",
        "Yes. Denial management and the appeal process are part of our standard workflow.",
    ],
] as const;

/** Approved testimonials only. Leave empty until real, permissioned quotes exist. */

export type Testimonial = {
    quote: string;
    name: string;
    role: string;
    practice: string;
    state: string;
    initials: string;
    rating: number;
    headline: string;
    outcome: string;
};

export const testimonials: Testimonial[] = [
    {
        state: "California",
        quote: "Having a clear process for reviewing claims and tracking outstanding items makes billing workflows easier to understand and manage.",
        name: "Sample Client 1",
        role: "Practice Administrator",
        practice: "Example Medical Practice",
        initials: "CA",
        rating: 5,
        headline: "A clearer billing workflow",
        outcome: "Clearer claim tracking and follow-up",
    },
    {
        state: "New Jersey",
        quote: "Authorization follow-up is an important part of our workflow. A structured process helps our team identify outstanding items before the visit.",
        name: "Sample Client 2",
        role: "Physical Therapist",
        practice: "Example Physical Therapy Practice",
        initials: "NJ",
        rating: 5,
        headline: "Organized authorization follow-up",
        outcome: "Better visibility into pending authorizations",
    },
    {
        state: "Virginia",
        quote: "Consistent communication and a documented review process help our practice understand claim issues and the next steps for resolution.",
        name: "Sample Client 3",
        role: "Practice Manager",
        practice: "Example Healthcare Practice",
        initials: "VA",
        rating: 5,
        headline: "Consistent communication",
        outcome: "Clearer claim issue resolution",
    },
    {
        state: "Texas",
        quote: "A structured approach to reviewing rejected claims gives our team a clearer view of corrections and resubmission priorities.",
        name: "Sample Client 4",
        role: "Billing Coordinator",
        practice: "Example Outpatient Practice",
        initials: "TX",
        rating: 5,
        headline: "A more organized claims process",
        outcome: "Improved visibility into rejections",
    },
    {
        state: "Illinois",
        quote: "Regular reporting makes it easier to review outstanding receivables, understand follow-up priorities, and discuss workflow improvements.",
        name: "Sample Client 5",
        role: "Practice Administrator",
        practice: "Example Medical Group",
        initials: "IL",
        rating: 5,
        headline: "Useful reporting visibility",
        outcome: "Clearer accounts receivable priorities",
    },
];

export const qualityTargets = [
    "Coding review before every claim goes out",
    "Clean-claim rate of 95% or higher",
    "Denial rate under 5%",
    "Claims submitted within 24–48 hours of charge entry",
    "Rejections worked the same day",
    "HIPAA-compliant data handling",
];

/** ILLUSTRATIVE SAMPLE DATA ONLY — replace with verified client data. */
export const demo = {
    stats: [
        { label: "claims scrubbed", value: "1,284" },
        { label: "denials prevented", value: "96" },
        { label: "revenue protected", value: "$48,200" },
    ],
    kpis: { clean: "93.8%", denial: "6.1%", ar: "38 days", fpr: "88.5%" },
    months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ],
    series: {
        denials: {
            label: "Denial volume (claims)",
            unit: "",
            data: [58, 61, 55, 52, 49, 50, 44, 41, 43, 38, 36, 34],
        },
        clean: {
            label: "Clean-claim rate",
            unit: "%",
            data: [89, 90, 90, 91, 92, 92, 93, 93, 94, 94, 94, 95],
        },
        ar: {
            label: "Days in A/R",
            unit: "",
            data: [46, 45, 44, 44, 42, 42, 41, 40, 40, 39, 38, 37],
        },
    },
    topCodes: [
        ["99214", "Established patient visit, moderate complexity", 312],
        ["99213", "Established patient visit, low complexity", 268],
        ["99215", "Established patient visit, high complexity", 97],
        ["99396", "Preventive visit, established, 40–64", 54],
    ] as const,
    topDenials: [
        ["Missing or invalid authorization", 31],
        ["Eligibility / coverage inactive", 24],
        ["Coding or modifier mismatch", 19],
        ["Timely filing", 8],
    ] as const,
};
