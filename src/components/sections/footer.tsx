"use client";

import { Link } from "@/i18n/navigation";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { ArrowUp } from "lucide-react";

// Деликатный микро-индикатор без фоновой плашки
function LiveGlobalIndicator() {
    return (
        <span className="relative flex items-center justify-center h-4 w-4 shrink-0 text-neutral-400">
            <span className="absolute inline-flex h-3 w-3 rounded-full bg-neutral-300 opacity-40 animate-ping" />
            <svg
                className="relative h-3.5 w-3.5 text-neutral-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
            >
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
            </svg>
        </span>
    );
}

export function Footer() {
    const t = useTranslations("Footer");
    const tNav = useTranslations("Nav");
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(
                now.toLocaleTimeString("en-GB", {
                    timeZone: "Asia/Bishkek",
                    hour: "2-digit",
                    minute: "2-digit",
                })
            );
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="w-full mt-24 md:mt-32 pt-8 pb-12 border-t border-neutral-200/70 select-none">
            {/* Контейнер в границах сетки max-w-[1412px] */}
            <div className="w-full max-w-[1412px] mx-auto px-5 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6">

                    {/* 1. Левая зона: Время чистым текстом и копирайт */}
                    <div className="md:col-span-4 flex flex-col items-center md:items-start gap-1">
                        {time && (
                            <div className="inline-flex items-center gap-2 text-[14px] font-mono text-neutral-500">
                                <LiveGlobalIndicator />
                                <span>{t("bishkek")} {time} (UTC+6)</span>
                            </div>
                        )}
                        <span className="text-[12px] text-neutral-400 font-normal">
                            © {new Date().getFullYear()} Asman Tech. {t("rights")}
                        </span>
                    </div>

                    {/* 2. Центральная зона: Навигация с реальными роутами */}
                    <nav className="md:col-span-4 flex items-center justify-center gap-7 sm:gap-8 text-[16px] font-medium text-neutral-600">
                        <Link
                            href="/solutions"
                            className="hover:text-neutral-950 transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[1.5px] after:bg-neutral-950 after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200"
                        >
                            {tNav("solutions")}
                        </Link>
                        <Link
                            href="/projects"
                            className="hover:text-neutral-950 transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[1.5px] after:bg-neutral-950 after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200"
                        >
                            {tNav("projects")}
                        </Link>
                        <Link
                            href="/guarantee"
                            className="hover:text-neutral-950 transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[1.5px] after:bg-neutral-950 after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200"
                        >
                            {tNav("guarantee")}
                        </Link>
                        <Link
                            href="/contacts"
                            className="hover:text-neutral-950 transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[1.5px] after:bg-neutral-950 after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200"
                        >
                            {tNav("contacts")}
                        </Link>
                    </nav>

                    {/* 3. Правая зона: Кнопка наверх */}
                    <div className="md:col-span-4 flex items-center justify-center md:justify-end">
                        <button
                            type="button"
                            onClick={scrollToTop}
                            className="group inline-flex items-center gap-2.5 text-[14.5px] font-medium text-neutral-500 hover:text-neutral-950 transition-colors cursor-pointer"
                        >
                            <span>{t("backToTop")}</span>
                            <span className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200/60 group-hover:bg-neutral-200/80 group-hover:border-neutral-300 flex items-center justify-center transition-all duration-200 group-hover:-translate-y-0.5">
                                <ArrowUp size={14} className="text-neutral-600 group-hover:text-neutral-950 transition-colors" />
                            </span>
                        </button>
                    </div>

                </div>
            </div>
        </footer>
    );
}

export default Footer;