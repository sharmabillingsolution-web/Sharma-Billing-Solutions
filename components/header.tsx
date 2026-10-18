"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { SITE, NAV } from "@/config/site";

const ctaClass =
    "header-cta group lg:inline-flex min-h-12 hidden items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white shadow-[0_4px_14px_rgb(47_107_255/16%)] transition-colors duration-200 hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand motion-reduce:transition-none";

export function Header() {
    const [open, setOpen] = useState(false);
    const [solid, setSolid] = useState(false);
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    // Change navbar appearance while scrolling.
    useEffect(() => {
        const handleScroll = () => {
            setSolid(window.scrollY > 16);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Close mobile menu with Escape or when entering desktop mode.
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && open) {
                setOpen(false);
                menuButtonRef.current?.focus();
            }
        };

        const desktopQuery = window.matchMedia("(min-width: 1280px)");

        const handleBreakpoint = (event: MediaQueryListEvent) => {
            if (event.matches) {
                setOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        desktopQuery.addEventListener("change", handleBreakpoint);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            desktopQuery.removeEventListener("change", handleBreakpoint);
        };
    }, [open]);

    const closeMenu = () => setOpen(false);

    return (
        <header
            className={`site-header fixed inset-x-0 top-0 z-50 w-full border-b transition-[background-color,border-color,box-shadow] duration-300 motion-reduce:transition-none ${
                solid || open
                    ? "border-line bg-white/95 shadow-soft backdrop-blur-xl is-solid"
                    : "border-transparent bg-white/90 backdrop-blur-lg"
            }`}
        >
            <div className="site-header-inner mx-auto flex h-18 w-full max-w-8xl items-center gap-3 px-4 sm:px-6 lg:px-8">
                {/* Brand */}
                <a
                    href="#top"
                    onClick={closeMenu}
                    aria-label={`${SITE.name} home`}
                    className="header-brand group flex min-w-0 flex-1 items-center gap-2 sm:gap-2.5 xl:flex-none"
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={SITE.logoSrc}
                        alt=""
                        width={36}
                        height={36}
                        className="header-brand-logo size-9 shrink-0 object-contain sm:size-10"
                    />

                    <span className="header-brand-name min-w-0 truncate text-sm font-bold tracking-tight text-navy sm:text-base xl:max-w-none">
                        {SITE.name}
                    </span>
                </a>

                {/* Desktop navigation */}
                <nav
                    aria-label="Primary navigation"
                    className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex 2xl:gap-1"
                >
                    {NAV.map((item, index) => (
                        <a
                            key={item.href}
                            href={item.href}
                            style={{
                                animationDelay: `${index * 45}ms`,
                            }}
                            className="desktop-nav-link whitespace-nowrap rounded-lg px-2.5 py-2 text-xs font-medium text-muted transition-colors hover:bg-brand/5 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand 2xl:px-3 2xl:text-sm motion-reduce:transition-none"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* Desktop CTA */}
                <a
                    href="#contact"
                    className={`${ctaClass} hidden shrink-0 xl:inline-flex`}
                >
                    <span>Free Billing Review</span>
                    <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
                        aria-hidden="true"
                    />
                </a>

                {/* Mobile and tablet menu button */}
                <button
                    ref={menuButtonRef}
                    type="button"
                    aria-expanded={open}
                    aria-controls="mobile-nav"
                    aria-label={
                        open ? "Close navigation menu" : "Open navigation menu"
                    }
                    onClick={() => setOpen((current) => !current)}
                    className={`header-menu-toggle grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-white text-navy shadow-sm transition-colors hover:border-brand/30 hover:bg-brand/5 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand xl:hidden motion-reduce:transition-none ${
                        open ? "is-open" : ""
                    }`}
                >
                    {open ? (
                        <X className="size-5" aria-hidden="true" />
                    ) : (
                        <Menu className="size-5" aria-hidden="true" />
                    )}
                </button>
            </div>

            {/* Mobile navigation dropdown */}
            {open && (
                <nav
                    id="mobile-nav"
                    aria-label="Mobile navigation"
                    className="mobile-nav-panel absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain border-t border-line bg-white px-4 pb-6 pt-3 shadow-card sm:px-6 xl:hidden"
                >
                    <ul className="mx-auto grid w-full max-w-7xl gap-1">
                        {NAV.map((item, index) => (
                            <li key={item.href}>
                                <a
                                    href={item.href}
                                    onClick={closeMenu}
                                    style={{
                                        animationDelay: `${index * 55}ms`,
                                    }}
                                    className="mobile-nav-link flex min-h-12 items-center justify-between gap-3 rounded-xl px-3 py-3 text-sm font-medium text-muted transition-colors hover:bg-brand/5 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand motion-reduce:transition-none"
                                >
                                    <span>{item.label}</span>
                                    <ArrowRight
                                        className="mobile-nav-arrow size-4 shrink-0 opacity-50"
                                        aria-hidden="true"
                                    />
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile contact CTA */}
                    <div className="mobile-nav-cta mx-auto mt-4 w-full max-w-7xl border-t border-line pt-4">
                        <a
                            href="#contact"
                            onClick={closeMenu}
                            className={`${ctaClass} w-full`}
                        >
                            <span>Get a Free Billing Review</span>
                            <ArrowRight
                                className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
                                aria-hidden="true"
                            />
                        </a>

                        <p className="mt-3 text-center text-xs leading-5 text-muted">
                            Let's discuss your medical billing needs.
                        </p>
                    </div>
                </nav>
            )}
        </header>
    );
}
