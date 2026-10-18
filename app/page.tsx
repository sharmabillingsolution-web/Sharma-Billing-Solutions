import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import {
    Metrics,
    Care,
    Services,
    Coverage,
    Testimonials,
    Onboarding,
    Resources,
    Footer,
    ContactInfo,
} from "@/components/sections";
import { Process } from "@/components/process";
import { AiSection } from "@/components/ai-demo";
import { Performance } from "@/components/performance";
import { Faq } from "@/components/faq";
import { ContactForm } from "@/components/contact-form";
import { Section, Head } from "@/components/ui";
import { Specialties } from "@/components/Specialties";
import { Technology } from "@/components/Technology";

export default function Page() {
    return (
        <>
            <span id="top" />
            <Header />
            <main>
                <Hero />
                <Metrics />
                <Care />
                <Services />
                <Specialties />
                <Process />
                <Technology />
                <Coverage />
                <AiSection />
                <Performance />
                <Testimonials />
                <Onboarding />
                <Resources />
                <Faq />
                <Section id="contact">
                    <Head
                        eyebrow="Contact"
                        title="Let’s make your billing workflow clearer."
                    >
                        Tell us about your practice and your current billing
                        challenges. We’ll review the details you provide and
                        follow up with a suitable next step.
                    </Head>
                    <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.5fr]">
                        <ContactInfo />
                        <ContactForm />
                    </div>
                </Section>
            </main>
            <Footer />
        </>
    );
}
