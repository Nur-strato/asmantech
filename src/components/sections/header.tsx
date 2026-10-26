"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

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

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
                scrolled
                    ? "bg-white/90 backdrop-blur-md border-b border-neutral-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)] py-4"
                    : "bg-white/0 py-6"
            }`}
        >
            <div className="max-w-[1412px] mx-auto px-5 md:px-8 flex items-center justify-between w-full">
                {/* Логотип: Home сдвинут правее суммарно на 14% */}
                <Link
                    href="/"
                    aria-label="Asman Tech Home"
                    className="group relative inline-flex items-center select-none active:scale-95 transition-transform font-serif text-[32px] md:text-[36px] font-bold tracking-tight"
                >
                    {/* Asman Tech без затухания */}
                    <span className="text-neutral-900 group-hover:invisible">
                        Asman Tech
                    </span>

                    {/* Home со смещением вправо на 14% */}
                    <span className="absolute inset-0 flex items-center translate-x-[14%] text-[#B91C1C] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        Home
                    </span>
                </Link>

                {/* Навигационное меню */}
                <nav className="flex items-center gap-6 sm:gap-9 text-[16px] md:text-[17px] font-medium tracking-tight text-neutral-800">
                    <Link
                        href="/solutions"
                        className="relative py-1 hover:text-black transition-colors duration-200 group"
                    >
                        Solutions
                        <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-neutral-900 transition-all duration-200 group-hover:w-full" />
                    </Link>

                    <Link
                        href="/projects"
                        className="relative py-1 hover:text-black transition-colors duration-200 group"
                    >
                        Projects
                        <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-neutral-900 transition-all duration-200 group-hover:w-full" />
                    </Link>

                    <Link
                        href="/guarantee"
                        className="relative py-1 hover:text-black transition-colors duration-200 group"
                    >
                        Guarantee
                        <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-neutral-900 transition-all duration-200 group-hover:w-full" />
                    </Link>

                    {/* Разделитель и Contacts */}
                    <div className="pl-6 sm:pl-8 border-l border-neutral-250">
                        <Link
                            href="/contacts"
                            className="group relative py-1 text-neutral-900 hover:text-black transition-colors duration-200 inline-block"
                        >
                            Contacts
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-neutral-900 group-hover:bg-[#B91C1C] group-hover:scale-y-125 transition-all duration-200 origin-bottom" />
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}