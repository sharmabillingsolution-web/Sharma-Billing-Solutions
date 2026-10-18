"use client";

import { useState } from "react";
import { Section, Head } from "./ui";

type Platform = {
    name: string;
    domain: string;
};

const clearinghouses: Platform[] = [
    {
        name: "Waystar",
        domain: "https://s45903.pcdn.co/wp-content/uploads/2018/12/logo-full.png",
    },
    {
        name: "TriZetto",
        domain: "https://www.trizettoprovider.com/wp-content/uploads/logo.png",
    },
    {
        name: "Claim.MD",
        domain: "https://www.claim.md/_astro/claim_md_logo.DXBhIfZd.png",
    },
    {
        name: "Availity",
        domain: "https://www.availity.com/wp-content/themes/custom/img/logo.svg",
    },
    {
        name: "Office Ally",
        domain: "https://cdn.prod.website-files.com/6830ce6e8206ddade0c99cae/683507420ad28a1f237a820d_office_ally_pimary_logo.webp",
    },
];

const ehrSystems: Platform[] = [
    {
        name: "Brightree",
        domain: "https://www.brightree.com/wp-content/uploads/2021/11/Asset-1.svg",
    },
    {
        name: "Harris CareTracker",
        domain: "https://cdn.prod.website-files.com/68472e01f4437c169718f13f/684837c01587dd41a2afa5a2_Harris-White-Horizontal.svg",
    },
    { name: "DrChrono", domain: "https://www.drchrono.com" },
    {
        name: "AdvancedMD",
        domain: "https://www.advancedmd.com/wp-content/uploads/2026/03/advancedmd-logo-wordmark.svg",
    },
    {
        name: "TurboPT",
        domain: "https://turbopt.com/assets/images/TurboPT-Logo.svg",
    },
    {
        name: "NextGen",
        domain: "https://nextgen.widen.net/content/rddjpdcnrk/svg/NG_Logo_Final_RGB_White_New.svg",
    },
];

function LogoCard({ platform }: { platform: Platform }) {
    const [imageFailed, setImageFailed] = useState(false);

    return (
        <li className="technology-logo-card">
            {!imageFailed && (
                <img
                    src={`${platform.domain}`}
                    alt={`${platform.name} logo`}
                    loading="lazy"
                    onError={() => setImageFailed(true)}
                    className="technology-logo-image"
                />
            )}

            {imageFailed && (
                <span className="technology-logo-fallback">
                    {platform.name}
                </span>
            )}
        </li>
    );
}

function LogoMarquee({
    items,
    label,
    reverse = false,
}: {
    items: Platform[];
    label: string;
    reverse?: boolean;
}) {
    return (
        <div
            className="technology-marquee"
            role="region"
            aria-label={`${label} platforms`}
        >
            <div
                className={`technology-marquee-track ${
                    reverse ? "technology-marquee-reverse" : ""
                }`}
            >
                {[0, 1].map((group) => (
                    <ul
                        key={group}
                        className="technology-marquee-group"
                        aria-hidden={group === 1 ? true : undefined}
                    >
                        {items.map((platform) => (
                            <LogoCard
                                key={`${group}-${platform.name}`}
                                platform={platform}
                            />
                        ))}
                    </ul>
                ))}
            </div>
        </div>
    );
}

export function Technology() {
    return (
        <Section id="tech" className="bg-white">
            <Head
                eyebrow="Technology"
                title="Designed to fit your existing systems and workflows."
            >
                We work inside your practice’s existing systems and
                clearinghouse workflows, helping streamline billing operations
                without unnecessary data migration.
            </Head>

            <div className="mt-8 space-y-10 sm:mt-10 sm:space-y-12">
                {/* Clearinghouses */}
                <div>
                    <div className="mb-5">
                        <h3 className="text-xl font-semibold tracking-tight text-navy sm:text-2xl">
                            Clearinghouses
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-muted sm:text-base">
                            Claim submission and rejection handling on platforms
                            you already use.
                        </p>
                    </div>

                    <LogoMarquee
                        items={clearinghouses}
                        label="Clearinghouses"
                    />
                </div>

                {/* EHR / EMR systems */}
                <div>
                    <div className="mb-5">
                        <h3 className="text-xl font-semibold tracking-tight text-navy sm:text-2xl">
                            EHR / EMR systems
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-muted sm:text-base">
                            We work inside your existing system, so there is no
                            data migration.
                        </p>
                    </div>

                    <LogoMarquee
                        items={ehrSystems}
                        label="EHR and EMR systems"
                        reverse
                    />
                </div>

                <p className="text-xs leading-5 text-muted">
                    Logos and product names belong to their respective owners
                    and are shown for identification purposes only. No
                    endorsement or affiliation is implied. Confirm supported
                    integrations before publication.
                </p>
            </div>
        </Section>
    );
}
