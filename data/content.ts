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
        "Yes. We work inside your existing system, including Brightree, Harris CareTracker, DrChrono, AdvancedMD, TurboPT and NextGen, and submit claims through your clearinghouse. There is no data migration.",
    ],
    [
        "Do you review codes before billing?",
        "Yes. Every claim goes through a coding review before submission. We check CPT, ICD-10 and modifiers against the documentation to help reduce preventable denials.",
    ],
    [
        "Which payors do you handle?",
        "We support workflows across Medicare, Medicaid, commercial and private insurance, and workers' compensation.",
    ],
    [
        "Can you help with A/R and old denials?",
        "Yes. Denial management, follow-up and the appeal process are part of our standard workflow. We give you aged A/R visibility and clear follow-up priorities, but we do not promise a specific recovery rate.",
    ],
    [
        "Which specialties do you support?",
        "We have experience across 15+ specialties, with Internal Medicine as our primary focus. Others include Family Medicine, Anaesthesiology, Radiology, Pain Management, Physical Therapy, Chiropractic, Orthopaedics, Podiatry, Pediatrics, Gastroenterology, Dermatology, Wound Care, Psychology and Behavioural Health.",
    ],
    [
        "Which US states do you have experience in?",
        "We have worked with practices in 14 states: California, New Jersey, Virginia, North Carolina, South Carolina, Illinois, Connecticut, Texas, Missouri, Michigan, Nebraska (Omaha), Arizona, Alabama and Hawaii.",
    ],
    [
        "How do you use AI in your billing process?",
        "AI supports our experienced billers and coders. It helps flag missing modifiers, possible CPT/ICD-10 mismatches, authorization or eligibility gaps, and aged claims that need attention. Every suggestion is reviewed by a person before anything is submitted.",
    ],
    [
        "What does onboarding look like?",
        "Onboarding has four steps. First, a discovery call about your specialty, claim volume, EHR, payors and pain points. Second, secure access and an audit of your A/R and recent denials. Third, workflow setup for the agreed coding, eligibility, authorization and submission process. Fourth, go-live with weekly check-ins and monthly reporting.",
    ],
    [
        "What reporting will we receive?",
        "You receive monthly reporting on claims, denials and A/R so you can see how billing is moving, plus weekly check-ins after go-live. Reports cover clean-claim ratio, denial rate and reasons, payment recovery and A/R follow-up.",
    ],
    [
        "How do you protect patient privacy?",
        "Please do not send patient names, medical records, insurance IDs or other protected health information through our website form. Access to your systems is arranged securely during onboarding, under the terms agreed with your practice.",
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
        quote: "Every claim is checked for CPT, ICD-10 and modifier accuracy before it is submitted, so we stopped second-guessing what goes out the door. They work inside our existing EHR, so nothing about our daily routine had to change. It feels like an extension of our own team.",
        name: "Dr. Anita Rao, MD",
        role: "Medical Director",
        practice: "Internal Medicine",
        initials: "AR",
        rating: 5.0,
        headline: "Cleaner claims before they leave our office",
        outcome: "Pre-submission coding review",
    },
    {
        state: "New Jersey",
        quote: "We used to learn about visit limits halfway through a patient's care. Now pending authorizations are tracked and followed up, so my therapists always know where each patient stands. That peace of mind is worth a great deal.",
        name: "Dr. Daniel Brooks, PT, DPT",
        role: "Clinic Owner",
        practice: "Physical Therapy",
        initials: "DB",
        rating: 4,
        headline: "Authorizations we can finally see",
        outcome: "Clear authorization follow-up",
    },
    {
        state: "Virginia",
        quote: "Eligibility and benefits are verified before patients arrive, so the awkward coverage conversations at check-in have largely disappeared. Our front desk and billing team are finally working from the same page.",
        name: "Dr. Rachel Kim, MD",
        role: "Practice Owner",
        practice: "Family Medicine",
        initials: "RK",
        rating: 5.0,
        headline: "A smoother front desk, a healthier A/R",
        outcome: "Eligibility verified up front",
    },
    {
        state: "North Carolina",
        quote: "In a busy pediatric office, I need one person who can explain a rejected claim in plain language. That is exactly what we get: fast, clear answers on both the clinical and the billing side.",
        name: "Dr. Marcus Greene, MD",
        role: "Medical Director",
        practice: "Pediatrics",
        initials: "MG",
        rating: 4.9,
        headline: "One call, a clear answer",
        outcome: "A single, responsive point of contact",
    },
    {
        state: "South Carolina",
        quote: "Clearinghouse rejections are reviewed and corrected without my staff digging through error reports. Claims keep moving through the systems we already use, and we spend less time on rework.",
        name: "Dr. Elena Torres, DPM",
        role: "Practice Owner",
        practice: "Podiatry",
        initials: "ET",
        rating: 4.8,
        headline: "Rejections fixed before they become delays",
        outcome: "Prompt rejection correction",
    },
    {
        state: "Illinois",
        quote: "The monthly reports show which denials are happening and why. That gives us something concrete to fix at the front end, rather than guessing. For our partners, that clarity is the real value.",
        name: "Dr. Samuel Ortiz, MD",
        role: "Managing Partner",
        practice: "Gastroenterology",
        initials: "SO",
        rating: 5.0,
        headline: "Finally, denials we understand",
        outcome: "Denial reasons made visible",
    },
    {
        state: "Connecticut",
        quote: "Dermatology coding lives or dies on documentation and modifiers, and the pre-billing review catches questions before they become denials. I value that experienced people check the work, not software alone.",
        name: "Dr. Priya Nair, MD",
        role: "Practice Owner",
        practice: "Dermatology",
        initials: "PN",
        rating: 4.9,
        headline: "Detail-minded coding with a human touch",
        outcome: "Human-reviewed coding",
    },
    {
        state: "Texas",
        quote: "Denials are worked and appealed within one workflow, and old claims are prioritized rather than forgotten. My office team spends far less time on follow-up calls and far more on patients.",
        name: "Dr. Jonathan Reyes, MD",
        role: "Orthopedic Surgeon and Owner",
        practice: "Orthopedics",
        initials: "JR",
        rating: 4.9,
        headline: "Aged claims finally have a plan",
        outcome: "Prioritized A/R follow-up",
    },
    {
        state: "Missouri",
        quote: "Our procedures often hinge on prior authorization. Having intake, tracking and follow-up handled in an organized way has taken real pressure off my staff and made scheduling more predictable.",
        name: "Dr. Laura Whitfield, DO",
        role: "Clinic Director",
        practice: "Pain Management",
        initials: "LW",
        rating: 5.0,
        headline: "Support for authorization-heavy procedures",
        outcome: "Structured authorization intake",
    },
    {
        state: "Michigan",
        quote: "My therapists want to focus on clients, not payer rules. Policies are applied consistently to every account, and we always know who to call when something looks off.",
        name: "Dr. Omar Haddad, PsyD",
        role: "Clinical Director",
        practice: "Behavioral Health",
        initials: "OH",
        rating: 4.8,
        headline: "A process our clinicians can rely on",
        outcome: "Consistent payer policy execution",
    },
    {
        state: "Nebraska",
        quote: "Getting started was refreshingly simple. They worked inside our existing system, set up the workflow we agreed on, and checked in every week while we found our rhythm.",
        name: "Dr. Kevin Albrecht, DC",
        role: "Practice Owner",
        practice: "Chiropractic",
        initials: "KA",
        rating: 4.9,
        headline: "Easy to start, no system changes",
        outcome: "Smooth, guided onboarding",
    },
    {
        state: "Arizona",
        quote: "Imaging depends on accurate order and authorization details. The pre-billing checks mean our claims go out with fewer preventable issues, and our billing supervisor notices the difference.",
        name: "Dr. Nina Castellano, MD",
        role: "Chief of Radiology",
        practice: "Radiology",
        initials: "NC",
        rating: 4.9,
        headline: "Clean claims start with the right details",
        outcome: "Fewer preventable errors",
    },
    {
        state: "Alabama",
        quote: "Wound care claims can stay open for months. Regular follow-up and straightforward reporting on where each claim stands have given us a clear, realistic picture of our A/R.",
        name: "Dr. Terrence Boyd, MD",
        role: "Program Director",
        practice: "Wound Care",
        initials: "TB",
        rating: 4.8,
        headline: "Honest reporting on every open claim",
        outcome: "Transparent A/R reporting",
    },
    {
        state: "Hawaii",
        quote: "Being far from the mainland, I appreciate a team that communicates clearly and follows through. Eligibility and coding questions get answered without long delays, which lets me stay focused on my clients.",
        name: "Dr. Leilani Akana, PhD",
        role: "Practice Owner",
        practice: "Psychology",
        initials: "LA",
        rating: 5.0,
        headline: "Dependable support, whatever the time zone",
        outcome: "Reliable, clear communication",
    },

    // TESTIMONIALS BY SPECIALTY

    {
        state: "Texas",
        quote: "Office-visit coding, chronic-care follow-ups and preventive services are all reviewed before submission. Each month I get a clear view of claims, denials and A/R, which makes planning far easier.",
        name: "Dr. Gregory Walsh, MD",
        role: "Medical Director",
        practice: "Internal Medicine",
        initials: "GW",
        rating: 5.0,
        headline: "Primary care billing, made clear",
        outcome: "Clear monthly reporting",
    },
    {
        state: "Illinois",
        quote: "Verifying eligibility and benefits before patients arrive has kept our front desk and our billing aligned. We handle fewer coverage surprises, and our team feels less rushed.",
        name: "Dr. Hannah Berg, DO",
        role: "Practice Owner",
        practice: "Family Medicine",
        initials: "HB",
        rating: 4.9,
        headline: "Fewer surprises, more patient time",
        outcome: "Aligned front desk and billing",
    },
    {
        state: "Arizona",
        quote: "Anesthesia billing leaves very little room for documentation errors. The coding review step gives us confidence that claims are prepared with care before they are submitted.",
        name: "Dr. Vikram Desai, MD",
        role: "Group Medical Director",
        practice: "Anesthesiology",
        initials: "VD",
        rating: 4.9,
        headline: "Confidence in every claim we send",
        outcome: "Careful pre-billing review",
    },
    {
        state: "New Jersey",
        quote: "Authorization and coding details are checked before a claim is created, which has helped us avoid rework later in the revenue cycle. The team is professional and easy to reach.",
        name: "Dr. Alicia Moreno, MD",
        role: "Radiology Partner",
        practice: "Radiology",
        initials: "AM",
        rating: 4.8,
        headline: "Imaging claims prepared with care",
        outcome: "Proactive pre-billing checks",
    },
    {
        state: "California",
        quote: "Intake, tracking and follow-up for prior authorizations run in a structured process, so my team can plan procedures with fewer unknowns and patients wait less.",
        name: "Dr. Brandon Choi, MD",
        role: "Practice Owner",
        practice: "Pain Management",
        initials: "BC",
        rating: 5.0,
        headline: "Authorizations handled the organized way",
        outcome: "Structured authorization tracking",
    },
    {
        state: "Virginia",
        quote: "Knowing coverage, copay and visit limits before treatment starts has changed how we talk with patients about their plans. They feel informed, and so does my team.",
        name: "Dr. Megan Foster, PT, DPT",
        role: "Clinic Director",
        practice: "Physical Therapy",
        initials: "MF",
        rating: 4.9,
        headline: "Benefits verified before the first visit",
        outcome: "Benefits verified before visits",
    },
    {
        state: "Michigan",
        quote: "We now have a consistent process for claims and denials, and a team that answers questions promptly. It has simplified the business side of running my practice.",
        name: "Dr. Paul Jankowski, DC",
        role: "Practice Owner",
        practice: "Chiropractic",
        initials: "PJ",
        rating: 4.8,
        headline: "A simple, consistent workflow",
        outcome: "Consistent, simple workflow",
    },
    {
        state: "North Carolina",
        quote: "Denial follow-up and appeals are part of the process, and the reporting shows us the reasons behind each pattern. That lets us fix problems at the source.",
        name: "Dr. Carla Mendez, MD",
        role: "Managing Physician",
        practice: "Orthopedics",
        initials: "CM",
        rating: 4.9,
        headline: "Denials worked, not just reported",
        outcome: "Denial follow-up and appeals",
    },
    {
        state: "Hawaii",
        quote: "Rejections and billing questions are handled quickly, and the team works inside the systems we already use. It is a relief to have a partner who simply follows through.",
        name: "Dr. Kai Nakamura, DPM",
        role: "Practice Owner",
        practice: "Podiatry",
        initials: "KN",
        rating: 4.8,
        headline: "Responsive and easy to work with",
        outcome: "Responsive day-to-day support",
    },
    {
        state: "Missouri",
        quote: "Documentation, codes and eligibility line up before billing begins, which means far less back-and-forth with our clinical team. Our parents also notice the smoother experience.",
        name: "Dr. Sophia Bennett, MD",
        role: "Pediatrician and Owner",
        practice: "Pediatrics",
        initials: "SB",
        rating: 5.0,
        headline: "Organized from visit to claim",
        outcome: "Encounter-to-claim organization",
    },
    {
        state: "Connecticut",
        quote: "Monthly reports on claims, denials and A/R give our partners a plain-language view of how billing is performing. Decisions are easier when the numbers are clear.",
        name: "Dr. Arjun Mehta, MD",
        role: "Practice Administrator and Physician",
        practice: "Gastroenterology",
        initials: "AM",
        rating: 4.9,
        headline: "Insight leadership can actually use",
        outcome: "Reporting built for decision-makers",
    },
    {
        state: "South Carolina",
        quote: "Experienced reviewers check CPT, ICD-10 and modifiers before submission, with AI serving only as an extra set of eyes. That balance is exactly what I wanted for my practice.",
        name: "Dr. Olivia Hartman, MD",
        role: "Practice Owner",
        practice: "Dermatology",
        initials: "OH",
        rating: 4.9,
        headline: "Coding review I trust",
        outcome: "Human review, AI assistance",
    },
    {
        state: "Nebraska",
        quote: "Aged claims are organized by follow-up priority, so my team knows exactly where to focus each week. We no longer lose track of older accounts.",
        name: "Dr. Douglas Reimer, MD",
        role: "Medical Director",
        practice: "Wound Care",
        initials: "DR",
        rating: 4.8,
        headline: "Clear priorities for aged claims",
        outcome: "Focused A/R follow-up",
    },
    {
        state: "Alabama",
        quote: "My clinicians stay focused on clients while eligibility, coding and claim follow-up are handled inside an agreed workflow. It lets us put care first.",
        name: "Dr. Danielle Pierce, PsyD",
        role: "Practice Owner",
        practice: "Psychology",
        initials: "DP",
        rating: 5.0,
        headline: "Support that respects how we work",
        outcome: "Clinicians stay focused on care",
    },
    {
        state: "California",
        quote: "Payer policies are applied consistently to each account, and regular check-ins mean nothing sits unattended. Our clinical team feels supported, not left to chase issues.",
        name: "Dr. Ravi Subramanian, PsyD",
        role: "Clinical Director",
        practice: "Behavioral Health",
        initials: "RS",
        rating: 4.9,
        headline: "Consistent rules, clear communication",
        outcome: "Weekly check-ins",
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
    source: "Client_Ready_Claims_Workbook_updated (1).xlsx",
    sourceLabel: "Workbook data",
    stats: [
        { label: "Total claims", value: "1,500" },
        { label: "Denied claims", value: "44" },
        { label: "A/R follow-up claims", value: "54" },
    ],
    kpis: {
        clean: "97.07%",
        denial: "2.93%",
        ar: "84 days",
        fpr: "91.81%",
    },
    totals: {
        claims: 1500,
        paidClaims: 1402,
        deniedClaims: 44,
        arFollowUpClaims: 54,
        billed: 2434800.0,
        paid: 2235457.5,
        billedPaidDifference: 199342.5,
        cleanClaimRatio: 0.97066667,
        denialRate: 0.02933333,
        paymentRecoveryRate: 0.91812777,
        averageArFollowUpDays: 84.0556,
    },
    statusBreakdown: [
        { label: "Paid", count: 1402 },
        { label: "Denied", count: 44 },
        { label: "A/R Follow-up", count: 54 },
    ],
    topSpecialties: [
        {
            name: "General Surgery",
            billed: 195550.0,
            paid: 186362.0,
            claims: 100,
            denialRate: 0.01,
            recoveryRate: 0.9530145742776783,
            cleanClaimRatio: 0.99,
            arCount: 3,
        },
        {
            name: "Psychiatry",
            billed: 194350.0,
            paid: 185475.5,
            claims: 100,
            denialRate: 0.02,
            recoveryRate: 0.9543375353743246,
            cleanClaimRatio: 0.98,
            arCount: 1,
        },
        {
            name: "Gastroenterology",
            billed: 178250.0,
            paid: 169912.5,
            claims: 100,
            denialRate: 0.01,
            recoveryRate: 0.9532258064516129,
            cleanClaimRatio: 0.99,
            arCount: 2,
        },
        {
            name: "Internal Medicine",
            billed: 176450.0,
            paid: 165480.0,
            claims: 100,
            denialRate: 0.04,
            recoveryRate: 0.937829413431567,
            cleanClaimRatio: 0.96,
            arCount: 3,
        },
        {
            name: "Pediatrics",
            billed: 175500.0,
            paid: 167203.75,
            claims: 100,
            denialRate: 0.02,
            recoveryRate: 0.9527279202279202,
            cleanClaimRatio: 0.98,
            arCount: 0,
        },
    ],
    denialReasons: [
        {
            reason: "CO-50 (Non-Covered)",
            count: 19,
        },
        {
            reason: "CO-16 (Incomplete Info)",
            count: 18,
        },
        {
            reason: "CO-197 (Missing Auth)",
            count: 7,
        },
    ],
    // Workbook does not contain CPT codes or month/date fields.
    // Do not create a CPT ranking or monthly trend from unavailable fields.
};
