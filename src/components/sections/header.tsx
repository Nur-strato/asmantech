
"use client";

import Image from "next/image";
import { usePathname, useRouter, Link } from "@/i18n/navigation";
import {
    useState,
    useEffect,
    useRef,
    type MouseEvent,
} from "react";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { ArrowUpRight, X } from "lucide-react";
import { Curtain, type CurtainState } from "@/components/ui/curtain";

// --------------------------------------------------
// CONSTANTS
// --------------------------------------------------

const CURTAIN_TIMINGS = {
    ACTIVE: 350,
    LEAVE: 1250,
    IDLE: 1700,
} as const;

const SCROLL_THRESHOLD = 20;

const NAV_LINKS = [
    { key: "solutions", href: "/solutions" },
    { key: "projects", href: "/projects" },
    { key: "guarantee", href: "/guarantee" },
    { key: "offers", href: "/offers", badge: "−40%" },
] as const;

const MOBILE_MENU_ID = "mobile-navigation";

const FOCUSABLE_SELECTOR = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
].join(",");

// --------------------------------------------------
// SCROLL POSITION
// --------------------------------------------------

function useScrollPosition(threshold: number) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        let animationFrame: number | null = null;

        const updateScrollPosition = () => {
            setScrolled(window.scrollY > threshold);
            animationFrame = null;
        };

        // Correct initial state.
        updateScrollPosition();

        const handleScroll = () => {
            if (animationFrame !== null) return;

            animationFrame = window.requestAnimationFrame(
                updateScrollPosition
            );
        };

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);

            if (animationFrame !== null) {
                window.cancelAnimationFrame(animationFrame);
            }
        };
    }, [threshold]);

    return scrolled;
}

// --------------------------------------------------
// BODY SCROLL LOCK
// --------------------------------------------------

function useBodyScrollLock(isLocked: boolean) {
    useEffect(() => {
        if (!isLocked) return;

        const body = document.body;

        // Preserve original inline styles.
        const originalOverflow = body.style.overflow;
        const originalPaddingRight = body.style.paddingRight;

        // Prevent layout shift when the scrollbar disappears.
        const scrollbarWidth =
            window.innerWidth -
            document.documentElement.clientWidth;

        const currentPaddingRight = Number.parseFloat(
            window.getComputedStyle(body).paddingRight
        ) || 0;

        body.style.overflow = "hidden";

        if (scrollbarWidth > 0) {
            body.style.paddingRight =
                `${currentPaddingRight + scrollbarWidth}px`;
        }

        return () => {
            body.style.overflow = originalOverflow;
            body.style.paddingRight = originalPaddingRight;
        };
    }, [isLocked]);
}

// --------------------------------------------------
// MOBILE MENU ACCESSIBILITY
// --------------------------------------------------

function useMobileMenuAccessibility(
    isOpen: boolean,
    onClose: () => void
) {
    const menuRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const previouslyFocused = document.activeElement as
            | HTMLElement
            | null;

        // Move focus inside the menu after it opens.
        closeButtonRef.current?.focus();

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
                onClose();
                return;
            }

            if (event.key !== "Tab") return;

            const focusableElements = Array.from(
                menuRef.current?.querySelectorAll<HTMLElement>(
                    FOCUSABLE_SELECTOR
                ) ?? []
            ).filter(
                (element) =>
                    !element.hasAttribute("disabled") &&
                    element.getClientRects().length > 0
            );

            if (focusableElements.length === 0) {
                event.preventDefault();
                closeButtonRef.current?.focus();
                return;
            }

            const firstElement = focusableElements[0];
            const lastElement =
                focusableElements[focusableElements.length - 1];

            const activeElement = document.activeElement;

            if (
                event.shiftKey &&
                (activeElement === firstElement ||
                    !menuRef.current?.contains(activeElement))
            ) {
                event.preventDefault();
                lastElement.focus();
            } else if (
                !event.shiftKey &&
                (activeElement === lastElement ||
                    !menuRef.current?.contains(activeElement))
            ) {
                event.preventDefault();
                firstElement.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);

            // Restore focus to the menu trigger.
            if (triggerRef.current?.isConnected) {
                triggerRef.current.focus();
            } else if (previouslyFocused?.isConnected) {
                previouslyFocused.focus();
            }
        };
    }, [isOpen, onClose]);

    return {
        menuRef,
        closeButtonRef,
        triggerRef,
    };
}

// --------------------------------------------------
// HEADER
// --------------------------------------------------

export function Header() {
    const t = useTranslations("Header");
    const tNav = useTranslations("Nav");

    const pathname = usePathname();
    const router = useRouter();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [curtainState, setCurtainState] =
        useState<CurtainState>("idle");

    const timeoutsRef = useRef<
        ReturnType<typeof setTimeout>[]
    >([]);

    const scrolled = useScrollPosition(SCROLL_THRESHOLD);

    useBodyScrollLock(mobileOpen);

    const closeMobileMenu = () => {
        setMobileOpen(false);
    };

    const {
        menuRef,
        closeButtonRef,
        triggerRef,
    } = useMobileMenuAccessibility(
        mobileOpen,
        closeMobileMenu
    );

    const isContactsActive =
        pathname === "/contacts" ||
        pathname.startsWith("/contacts/");

    // --------------------------------------------------
    // ROUTE CHANGE
    // --------------------------------------------------

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    // --------------------------------------------------
    // CURTAIN TIMER MANAGEMENT
    // --------------------------------------------------

    const clearCurtainTimers = () => {
        timeoutsRef.current.forEach((timeout) => {
            clearTimeout(timeout);
        });

        timeoutsRef.current = [];
    };

    useEffect(() => {
        return () => {
            clearCurtainTimers();
        };
    }, []);

    // --------------------------------------------------
    // HOME NAVIGATION
    // --------------------------------------------------

    const handleHomeClick = (
        event: MouseEvent<HTMLAnchorElement>
    ) => {
        // Preserve native browser link behavior.
        const isModifiedClick =
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey ||
            event.button !== 0;

        const target = event.currentTarget.getAttribute("target");
        const hasDownload =
            event.currentTarget.hasAttribute("download");

        if (
            event.defaultPrevented ||
            isModifiedClick ||
            (target && target !== "_self") ||
            hasDownload
        ) {
            return;
        }

        if (curtainState !== "idle") {
            event.preventDefault();
            return;
        }

        event.preventDefault();
        closeMobileMenu();

        // Respect reduced motion preferences.
        const prefersReducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

        if (prefersReducedMotion) {
            if (pathname === "/") {
                window.scrollTo({
                    top: 0,
                    behavior: "auto",
                });
            } else {
                router.push("/");
            }

            return;
        }

        clearCurtainTimers();

        setCurtainState("enter");

        const activeTimer = setTimeout(() => {
            setCurtainState("active");

            if (pathname === "/") {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            } else {
                router.push("/");
            }
        }, CURTAIN_TIMINGS.ACTIVE);

        const leaveTimer = setTimeout(() => {
            setCurtainState("leave");
        }, CURTAIN_TIMINGS.LEAVE);

        const idleTimer = setTimeout(() => {
            setCurtainState("idle");
            timeoutsRef.current = [];
        }, CURTAIN_TIMINGS.IDLE);

        timeoutsRef.current = [
            activeTimer,
            leaveTimer,
            idleTimer,
        ];
    };

    // --------------------------------------------------
    // NAVIGATION RENDERING
    // --------------------------------------------------

    const renderNavigationLinks = (mobile = false) => (
        NAV_LINKS.map((item) => {
            const isActive =
                pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

            return (
                <li key={item.key}>
                    <Link
                        href={item.href}
                        onClick={
                            mobile
                                ? closeMobileMenu
                                : undefined
                        }
                        aria-current={
                            isActive ? "page" : undefined
                        }
                        className={
                            mobile
                                ? `flex items-center justify-between py-2 text-3xl sm:text-4xl font-serif tracking-tight transition-colors motion-reduce:transition-none ${
                                    isActive
                                        ? "text-neutral-950 font-bold"
                                        : "text-neutral-500 hover:text-neutral-950"
                                }`
                                : `relative inline-flex items-center gap-2 py-1 group transition-colors duration-200 motion-reduce:transition-none ${
                                    isActive
                                        ? "text-black font-medium"
                                        : "text-neutral-800 hover:text-black font-normal"
                                }`
                        }
                    >
                        <span>{tNav(item.key)}</span>

                        {item.badge && (
                            <span
                                className={
                                    mobile
                                        ? "inline-flex items-center justify-center px-3 py-1 rounded-[10px] bg-[#E7F8EE] text-[#058447] font-sans text-sm font-black tracking-tight leading-none shadow-2xs"
                                        : "inline-flex items-center justify-center px-2 py-0.5 rounded-[9px] bg-[#E7F8EE] text-[#058447] font-sans text-[12px] md:text-[13px] font-black tracking-tight leading-none -translate-y-2 select-none shadow-2xs transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none"
                                }
                            >
                                {item.badge}
                            </span>
                        )}

                        {!mobile && (
                            <span
                                aria-hidden="true"
                                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] bg-neutral-900 transition-all duration-200 ease-out motion-reduce:transition-none ${
                                    isActive
                                        ? "w-[40%] group-hover:w-full"
                                        : "w-0 group-hover:w-full"
                                }`}
                            />
                        )}
                    </Link>
                </li>
            );
        })
    );

    // --------------------------------------------------
    // RENDER
    // --------------------------------------------------

    return (
        <>
            <Curtain state={curtainState} />

            <header
                className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 motion-reduce:transition-none ${
                    scrolled
                        ? "bg-white/90 backdrop-blur-md border-b border-neutral-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)] pt-2.5 pb-3.5"
                        : "bg-white/0 pt-3.5 pb-6"
                }`}
            >
                <div className="max-w-[1412px] mx-auto px-5 md:px-8 flex items-center justify-between w-full -translate-y-1">

                    {/* LOGO */}

                    <Link
                        href="/"
                        onClick={handleHomeClick}
                        aria-label={t("homeAria")}
                        className="group relative h-10 w-36 sm:w-40 md:w-44 select-none [perspective:1000px] z-50 flex items-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4 rounded-sm"
                    >
                        <div className="absolute inset-0 flex items-center origin-bottom transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-[transform,opacity] [backface-visibility:hidden] pointer-events-none group-hover:opacity-0 group-hover:[transform:rotateX(90deg)_translateY(-6px)] motion-reduce:transition-none">
                            <div className="relative h-8 sm:h-9 md:h-10 w-32 sm:w-36 md:w-40 flex items-center">
                                <Image
                                    src="/images/logo.png?v=2"
                                    alt=""
                                    fill
                                    priority
                                    sizes="(max-width: 640px) 150px, 170px"
                                    className="object-contain object-left scale-[1.17] sm:scale-[1.26] origin-left"
                                />
                            </div>
                        </div>

                        <div className="absolute inset-0 flex items-center justify-start origin-top transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-[transform,opacity] [backface-visibility:hidden] pointer-events-none opacity-0 [transform:rotateX(-90deg)_translateY(6px)] group-hover:opacity-100 group-hover:[transform:rotateX(0deg)_translateY(0)] motion-reduce:transition-none">
                            <span className="font-serif text-[26px] sm:text-[30px] md:text-[33px] font-bold tracking-tight text-neutral-900 relative inline-block">
                                {t("home")}

                                <span className="absolute left-0 -bottom-1 w-full h-[2.5px] bg-black rounded-full transition-transform duration-500 ease-out scale-x-0 group-hover:scale-x-100 origin-left motion-reduce:transition-none" />
                            </span>
                        </div>
                    </Link>

                    {/* DESKTOP NAVIGATION */}

                    <nav
                        aria-label="Main navigation"
                        className="hidden lg:flex items-center"
                    >
                        <ul className="flex items-center gap-6 xl:gap-8 text-[19px] xl:text-[21px] font-normal tracking-tight text-neutral-800 m-0 p-0 list-none">
                            {renderNavigationLinks()}

                            <li className="pl-2 pr-1 xl:pr-2">
                                <LocaleSwitcher />
                            </li>

                            <li>
                                <Link
                                    href="/contacts"
                                    aria-current={
                                        isContactsActive
                                            ? "page"
                                            : undefined
                                    }
                                    className={`group relative overflow-hidden inline-flex items-center justify-center gap-2.5 border-[1.8px] border-neutral-950 px-8 py-3 rounded-full active:scale-95 transition-all duration-300 shadow-sm motion-reduce:transition-none ${
                                        isContactsActive
                                            ? "bg-white text-neutral-950"
                                            : "bg-neutral-950 text-white"
                                    }`}
                                >
                                    {!isContactsActive && (
                                        <span
                                            aria-hidden="true"
                                            className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none motion-reduce:transition-none"
                                        />
                                    )}

                                    <span
                                        className={`relative z-10 text-[17px] font-medium tracking-tight leading-none transition-colors duration-300 motion-reduce:transition-none ${
                                            isContactsActive
                                                ? "text-neutral-950 font-semibold"
                                                : "text-white group-hover:text-neutral-950"
                                        }`}
                                    >
                                        {tNav("contacts")}
                                    </span>

                                    <ArrowUpRight
                                        size={15}
                                        aria-hidden="true"
                                        className={`relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none ${
                                            isContactsActive
                                                ? "text-neutral-950"
                                                : "text-neutral-300 group-hover:text-neutral-950"
                                        }`}
                                    />
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* MOBILE MENU TRIGGER */}

                    <button
                        ref={triggerRef}
                        type="button"
                        onClick={() => setMobileOpen(true)}
                        aria-label={t("openMenu")}
                        aria-expanded={mobileOpen}
                        aria-controls={MOBILE_MENU_ID}
                        className="lg:hidden relative z-40 p-2.5 -mr-1.5 rounded-full text-neutral-950 hover:bg-neutral-100/80 active:scale-90 transition-all motion-reduce:transition-none flex flex-col justify-center items-center w-11 h-11 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
                    >
                        <span
                            aria-hidden="true"
                            className="w-6 h-[2px] bg-neutral-950 rounded-full -translate-y-1"
                        />
                        <span
                            aria-hidden="true"
                            className="w-6 h-[2px] bg-neutral-950 rounded-full translate-y-1"
                        />
                    </button>
                </div>

                {/* MOBILE MENU */}

                <div
                    ref={menuRef}
                    id={MOBILE_MENU_ID}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Mobile navigation"
                    aria-hidden={!mobileOpen}
                    inert={!mobileOpen}
                    className={`lg:hidden fixed inset-0 z-50 bg-[#FAFAFA]/98 backdrop-blur-2xl transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none flex flex-col justify-between px-6 sm:px-10 pt-4 pb-8 h-[100dvh] overflow-y-auto ${
                        mobileOpen
                            ? "opacity-100 pointer-events-auto translate-y-0"
                            : "opacity-0 pointer-events-none -translate-y-3"
                    }`}
                >
                    <div className="space-y-6">

                        {/* MOBILE MENU HEADER */}

                        <div className="flex items-center justify-between pb-4 border-b border-neutral-200/60">
                            <Link
                                href="/"
                                onClick={handleHomeClick}
                                aria-label={t("homeAria")}
                                className="relative h-9 w-36 flex items-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-sm"
                            >
                                <Image
                                    src="/images/logo.png?v=2"
                                    alt=""
                                    fill
                                    sizes="150px"
                                    className="object-contain object-left scale-[1.18] origin-left"
                                />
                            </Link>

                            <button
                                ref={closeButtonRef}
                                type="button"
                                onClick={closeMobileMenu}
                                aria-label={t("closeMenu")}
                                className="w-10 h-10 rounded-full bg-white border border-neutral-200/80 hover:bg-neutral-100 active:scale-90 shadow-2xs flex items-center justify-center text-neutral-900 transition-all motion-reduce:transition-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
                            >
                                <X
                                    size={20}
                                    strokeWidth={2.2}
                                    aria-hidden="true"
                                />
                            </button>
                        </div>

                        {/* MOBILE LINKS */}

                        <nav aria-label="Mobile navigation links">
                            <ul className="flex flex-col space-y-3 pt-2 m-0 p-0 list-none">
                                {renderNavigationLinks(true)}
                            </ul>
                        </nav>
                    </div>

                    {/* MOBILE FOOTER */}

                    <div className="space-y-5 pt-6 border-t border-neutral-200/60">
                        <LocaleSwitcher className="text-[13px]" />

                        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-neutral-500">
                            <span className="font-medium text-neutral-600">
                                {t("itSolutions")}
                            </span>

                            <span className="font-semibold text-neutral-950">
                                ASMAN TECH 2026
                            </span>
                        </div>

                        <Link
                            href="/contacts"
                            onClick={closeMobileMenu}
                            aria-current={
                                isContactsActive ? "page" : undefined
                            }
                            className={`w-full h-14 rounded-2xl flex items-center justify-between px-6 font-sans text-base font-semibold tracking-tight transition-all motion-reduce:transition-none shadow-md active:scale-[0.98] ${
                                isContactsActive
                                    ? "bg-white text-neutral-950 border-2 border-neutral-950"
                                    : "bg-neutral-950 text-white hover:bg-neutral-900"
                            }`}
                        >
                            <span>{t("contactUs")}</span>

                            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider">
                                <span className="opacity-70">
                                    {tNav("contacts")}
                                </span>

                                <ArrowUpRight
                                    size={17}
                                    aria-hidden="true"
                                />
                            </div>
                        </Link>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
