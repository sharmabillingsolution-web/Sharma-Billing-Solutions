"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
    children: ReactNode;
    delay?: number;
    className?: string;
};

export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;

        if (!element) return;

        // Respect the user's accessibility preferences.
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        // Keep content visible if animation isn't appropriate
        // or IntersectionObserver isn't available.
        if (reduceMotion || typeof IntersectionObserver === "undefined") {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];

                if (!entry?.isIntersecting) return;

                setVisible(true);

                // Reveal once instead of observing continuously.
                observer.unobserve(element);
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -32px 0px",
            },
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div
            ref={ref}
            style={{
                transitionDelay:
                    visible && delay > 0 ? `${delay}ms` : undefined,
            }}
            className={["reveal", visible ? "in" : "", className]
                .filter(Boolean)
                .join(" ")}
        >
            {children}
        </div>
    );
}
