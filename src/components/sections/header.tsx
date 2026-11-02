"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const NAV_LINKS = [
    { label: "Solutions", href: "/solutions" },
    { label: "Projects", href: "/projects" },
    { label: "Guarantee", href: "/guarantee" },
    { label: "Offers", href: "/offers", badge: "−40%" },
];

export function Header() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Скрываем хедер на всех страницах админ-панели
    if (pathname.startsWith("/admin")) {
        return null;
    }

    const isContactsActive = pathname === "/contacts" || pathname.startsWith("/contacts/");

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
                scrolled
                    ? "bg-white/90 backdrop-blur-md border-b border-neutral-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)] pt-2.5 pb-3.5"
                    : "bg-white/0 pt-3.5 pb-6"
            }`}
        >
            <div className="max-w-[1412px] mx-auto px-5 md:px-8 flex items-center justify-between w-full -translate-y-1">
                {/* Логотип: 3D Flip-эффект переворота Asman Tech -> Home */}
                <Link
                    href="/"
                    aria-label="Asman Tech Home"
                    className="group relative inline-flex items-center select-none active:scale-95 transition-transform font-serif text-[32px] md:text-[36px] font-bold tracking-tight [perspective:1000px]"
                >
                    {/* Asman Tech */}
                    <span className="text-neutral-900 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-bottom group-hover:opacity-0 group-hover:[transform:rotateX(90deg)_translateY(-8px)]">
                        Asman Tech
                    </span>

                    {/* Home */}
                    <span className="absolute inset-0 flex items-center translate-x-[14%] text-black pointer-events-none">
                        <span className="relative inline-block transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top opacity-0 [transform:rotateX(-90deg)_translateY(8px)] group-hover:opacity-100 group-hover:[transform:rotateX(0deg)_translateY(0)]">
                            Home
                            <span className="absolute left-0 -bottom-1 w-full h-[2.5px] bg-black rounded-full transition-transform duration-500 delay-100 scale-x-0 group-hover:scale-x-100 origin-left" />
                        </span>
                    </span>
                </Link>

                {/* Навигационное меню: Solutions · Projects · Guarantee · Offers · Contacts */}
                <nav className="flex items-center gap-5 sm:gap-7 md:gap-8 lg:gap-9 text-[20px] md:text-[22px] font-normal tracking-tight text-neutral-800">
                    {NAV_LINKS.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`relative py-1 transition-colors duration-200 group inline-flex items-center gap-2 ${
                                    isActive ? "text-black font-medium" : "text-neutral-800 hover:text-black font-normal"
                                }`}
                            >
                                <span>{item.label}</span>

                                {/* Фирменный зеленый бейдж скидки на Offers */}
                                {item.badge && (
                                    <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[9px] bg-[#E7F8EE] text-[#058447] font-sans text-[12px] md:text-[13px] font-black tracking-tight leading-none -translate-y-2 select-none shadow-2xs transition-transform duration-200 group-hover:scale-105">
                                        {item.badge}
                                    </span>
                                )}

                                {/* Активная полоска снизу */}
                                <span
                                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] bg-neutral-900 transition-all duration-200 ease-out ${
                                        isActive ? "w-[40%] group-hover:w-full" : "w-0 group-hover:w-full"
                                    }`}
                                />
                            </Link>
                        );
                    })}

                    {/* Contacts */}
                    <div className="pl-1 sm:pl-3">
                        <Link
                            href="/contacts"
                            className={`group relative overflow-hidden inline-flex items-center justify-center border-[1.8px] border-black px-[26px] md:px-[28.5px] py-[9px] md:py-[10px] rounded-full active:scale-95 transition-transform duration-200 shadow-sm ${
                                isContactsActive ? "bg-white" : "bg-black"
                            }`}
                        >
                            {!isContactsActive && (
                                <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />
                            )}

                            <span
                                className={`relative z-10 text-[19px] md:text-[21px] font-normal transition-colors duration-300 ${
                                    isContactsActive ? "text-black font-medium" : "text-white group-hover:text-black"
                                }`}
                            >
                                Contacts
                            </span>
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}