import type { Metadata, Viewport } from "next";

import "./globals.css";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
    metadataBase: new URL(SITE.url),

    title: SITE.title,
    description: SITE.description,

    alternates: {
        canonical: "/",
    },

    openGraph: {
        title: SITE.title,
        description: SITE.description,
        url: SITE.url,
        siteName: SITE.name,
        type: "website",
        images: [
            {
                url: "/images/sharma-billing-solutions-og-image.jpg",
                width: 1200,
                height: 630,
                alt: SITE.name,
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: SITE.title,
        description: SITE.description,
        images: ["/images/sharma-billing-solutions-og-image.jpg"],
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    themeColor: "#0C172A",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                {/* Enable CSS reveal animations when JavaScript runs. */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: "document.documentElement.classList.add('js')",
                    }}
                />
            </head>

            <body>
                <a
                    href="#hero"
                    className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-navy focus:shadow-card"
                >
                    Skip to content
                </a>

                {children}
            </body>
        </html>
    );
}
