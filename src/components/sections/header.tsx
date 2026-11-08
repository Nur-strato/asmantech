"use client";

import Image from "next/image";
import { usePathname, useRouter, Link } from "@/i18n/navigation";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { ArrowUpRight, X } from "lucide-react";
import { Curtain, CurtainState } from "@/components/ui/curtain";

const NAV_LINKS = [
    { key: "solutions", href: "/solutions" },
    { key: "projects", href: "/projects" },
    { key: "guarantee", href: "/guarantee" },
    { key: "offers", href: "/offers", badge: "−40%" },
];

export function Header() {
    const t = useTranslations("Header");
    const tNav = useTranslations("Nav");
    const pathname = usePathname();
    const router = useRouter();

    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [curtainState, setCurtainState] = useState<CurtainState>("idle");

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setMobileOpen(false);
        };

        if (mobileOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [mobileOpen]);

    const isContactsActive =
        pathname === "/contacts" || pathname.startsWith("/contacts/");

    const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        if (curtainState !== "idle") return;

        setMobileOpen(false);
        setCurtainState("enter");

        setTimeout(() => {
            setCurtainState("active");

            if (pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                router.push("/");
            }
        }, 350);

        setTimeout(() => {
            setCurtainState("leave");
        }, 1250);

        setTimeout(() => {
            setCurtainState("idle");
        }, 1700);
    };

    return (
        <>
            <Curtain state={curtainState} />

            <header
                className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
                    scrolled
                        ? "bg-white/90 backdrop-blur-md border-b border-neutral-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)] pt-2.5 pb-3.5"
                        : "bg-white/0 pt-3.5 pb-6"
                }`}
            >
                <div className="max-w-[1412px] mx-auto px-5 md:px-8 flex items-center justify-between w-full -translate-y-1">

                    {/* Logo + Curtain animation */}
                    <Link
                        href="/"
                        onClick={handleHomeClick}
                        aria-label={t("homeAria")}
                        className="group relative h-10 w-36 sm:w-40 md:w-44 select-none [perspective:1000px] z-50 flex items-center cursor-pointer"
                    >
                        <div className="absolute inset-0 flex items-center origin-bottom transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-[transform,opacity] [backface-visibility:hidden] pointer-events-none group-hover:opacity-0 group-hover:[transform:rotateX(90deg)_translateY(-6px)]">
                            <div className="relative h-8 sm:h-9 md:h-10 w-32 sm:w-36 md:w-40 flex items-center">
                                <Image
                                    src="/images/logo.png?v=2"
                                    alt="Asman Tech Logo"
                                    fill
                                    priority
                                    sizes="(max-width: 640px) 150px, 170px"
                                    className="object-contain object-left scale-[1.17] sm:scale-[1.26] origin-left"
                                />
                            </div>
                        </div>

                        <div className="absolute inset-0 flex items-center justify-start origin-top transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-[transform,opacity] [backface-visibility:hidden] pointer-events-none opacity-0 [transform:rotateX(-90deg)_translateY(6px)] group-hover:opacity-100 group-hover:[transform:rotateX(0deg)_translateY(0)]">
                            <span className="font-serif text-[26px] sm:text-[30px] md:text-[33px] font-bold tracking-tight text-neutral-900 relative inline-block">
                                {t("home")}
                                <span className="absolute left-0 -bottom-1 w-full h-[2.5px] bg-black rounded-full transition-transform duration-500 ease-out scale-x-0 group-hover:scale-x-100 origin-left" />
                            </span>
                        </div>
                    </Link>

                    {/* Desktop navigation */}
                    <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[19px] xl:text-[21px] font-normal tracking-tight text-neutral-800">
                        {NAV_LINKS.map((item) => {
                            const isActive =
                                pathname === item.href ||
                                pathname.startsWith(item.href + "/");

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`relative py-1 transition-colors duration-200 group inline-flex items-center gap-2 ${
                                        isActive
                                            ? "text-black font-medium"
                                            : "text-neutral-800 hover:text-black font-normal"
                                    }`}
                                >
                                    <span>{tNav(item.key)}</span>

                                    {item.badge && (
                                        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[9px] bg-[#E7F8EE] text-[#058447] font-sans text-[12px] md:text-[13px] font-black tracking-tight leading-none -translate-y-2 select-none shadow-2xs transition-transform duration-200 group-hover:scale-105">
                                            {item.badge}
                                        </span>
                                    )}

                                    <span
                                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] bg-neutral-900 transition-all duration-200 ease-out ${
                                            isActive
                                                ? "w-[40%] group-hover:w-full"
                                                : "w-0 group-hover:w-full"
                                        }`}
                                    />
                                </Link>
                            );
                        })}

                        <LocaleSwitcher />

                        {/* Contacts CTA */}
                        <div className="pl-1 xl:pl-2">
                            <Link
                                href="/contacts"
                                className={`group relative overflow-hidden inline-flex items-center justify-center gap-2.5 border-[1.8px] border-neutral-950 px-8 py-3 rounded-full active:scale-95 transition-all duration-300 shadow-sm ${
                                    isContactsActive
                                        ? "bg-white text-neutral-950"
                                        : "bg-neutral-950 text-white"
                                }`}
                            >
                                {!isContactsActive && (
                                    <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" />
                                )}

                                <span
                                    className={`relative z-10 text-[17px] font-medium tracking-tight leading-none transition-colors duration-300 ${
                                        isContactsActive
                                            ? "text-neutral-950 font-semibold"
                                            : "text-white group-hover:text-neutral-950"
                                    }`}
                                >
                                    {tNav("contacts")}
                                </span>

                                <ArrowUpRight
                                    size={15}
                                    className={`relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                                        isContactsActive
                                            ? "text-neutral-950"
                                            : "text-neutral-300 group-hover:text-neutral-950"
                                    }`}
                                />
                            </Link>
                        </div>
                    </nav>

                    {/* Mobile menu trigger button */}
                    <button
                        type="button"
                        onClick={() => setMobileOpen(true)}
                        aria-label={t("openMenu")}
                        className="lg:hidden relative z-40 p-2.5 -mr-1.5 rounded-full text-neutral-950 hover:bg-neutral-100/80 active:scale-90 transition-all flex flex-col justify-center items-center w-11 h-11 cursor-pointer focus:outline-none"
                    >
                        <span className="w-6 h-[2px] bg-neutral-950 rounded-full -translate-y-1" />
                        <span className="w-6 h-[2px] bg-neutral-950 rounded-full translate-y-1" />
                    </button>
                </div>

                {/* Mobile full-screen overlay */}
                <div
                    className={`lg:hidden fixed inset-0 z-50 bg-[#FAFAFA]/98 backdrop-blur-2xl transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between px-6 sm:px-10 pt-4 pb-8 h-[100dvh] overflow-y-auto ${
                        mobileOpen
                            ? "opacity-100 pointer-events-auto translate-y-0"
                            : "opacity-0 pointer-events-none -translate-y-3"
                    }`}
                >
                    <div className="space-y-6">
                        {/* Mobile Top Bar: Logo on the left, X button on the right */}
                        <div className="flex items-center justify-between pb-4 border-b border-neutral-200/60">
                            <Link
                                href="/"
                                onClick={handleHomeClick}
                                aria-label={t("homeAria")}
                                className="relative h-9 w-36 flex items-center cursor-pointer"
                            >
                                <Image
                                    src="/images/logo.png?v=2"
                                    alt="Asman Tech Logo"
                                    fill
                                    priority
                                    sizes="150px"
                                    className="object-contain object-left scale-[1.18] origin-left"
                                />
                            </Link>

                            <button
                                type="button"
                                onClick={() => setMobileOpen(false)}
                                aria-label={t("closeMenu")}
                                className="w-10 h-10 rounded-full bg-white border border-neutral-200/80 hover:bg-neutral-100 active:scale-90 shadow-2xs flex items-center justify-center text-neutral-900 transition-all cursor-pointer focus:outline-none"
                            >
                                <X size={20} strokeWidth={2.2} />
                            </button>
                        </div>

                        {/* Nav Links */}
                        <div className="flex flex-col space-y-3 pt-2">
                            {NAV_LINKS.map((item) => {
                                const isActive =
                                    pathname === item.href ||
                                    pathname.startsWith(item.href + "/");

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`py-2 text-3xl sm:text-4xl font-serif tracking-tight flex items-center justify-between transition-colors ${
                                            isActive
                                                ? "text-neutral-950 font-bold"
                                                : "text-neutral-500 hover:text-neutral-950"
                                        }`}
                                    >
                                        <span>{tNav(item.key)}</span>

                                        {item.badge && (
                                            <span className="inline-flex items-center justify-center px-3 py-1 rounded-[10px] bg-[#E7F8EE] text-[#058447] font-sans text-sm font-black tracking-tight leading-none shadow-2xs">
                                                {item.badge}
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Mobile footer */}
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
                            onClick={() => setMobileOpen(false)}
                            className={`w-full h-14 rounded-2xl flex items-center justify-between px-6 font-sans text-base font-semibold tracking-tight transition-all shadow-md active:scale-[0.98] ${
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
                                <ArrowUpRight size={17} />
                            </div>
                        </Link>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;