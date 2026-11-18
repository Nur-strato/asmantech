"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { ChevronDown, Check } from "lucide-react";

const LOCALES = [
    { code: "ru", label: "Русский", short: "RU" },
    { code: "en", label: "English", short: "EN" },
    { code: "kg", label: "Кыргызча", short: "KG" },
];

export function LocaleSwitcher({ className = "" }: { className?: string }) {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Текущий активный язык
    const activeLocale = LOCALES.find((l) => l.code === locale) || LOCALES[0];

    // Закрытие меню при клике в любое другое место экрана
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const switchLocale = (newLocale: string) => {
        setIsOpen(false);
        // Заменяем URL на новый язык без перезагрузки страницы
        router.replace(pathname, { locale: newLocale });
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            {/* Главная кнопка */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-surface-muted hover:bg-neutral-200/80 text-content transition-all duration-200 active:scale-95 cursor-pointer"
            >
                <span className="font-bold text-[15px] uppercase tracking-wide">
                    {activeLocale.short}
                </span>
                <ChevronDown
                    size={16}
                    strokeWidth={2.5}
                    className={`transition-transform duration-300 text-content-muted ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {/* Выпадающий список */}
            <div
                className={`absolute right-0 lg:left-1/2 lg:-translate-x-1/2 bottom-full mb-2 lg:bottom-auto lg:top-full lg:mt-2 w-40 bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-neutral-100 p-1.5 transition-all duration-300 z-50 ${
                    isOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 lg:-translate-y-2 translate-y-2 pointer-events-none"
                }`}
            >
                {LOCALES.map((l) => (
                    <button
                        key={l.code}
                        type="button"
                        onClick={() => switchLocale(l.code)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-[15px] transition-colors cursor-pointer ${
                            l.code === locale
                                ? "bg-surface-muted font-bold text-content"
                                : "text-content-muted hover:bg-neutral-50 hover:text-content font-medium"
                        }`}
                    >
                        <span>{l.label}</span>
                        {l.code === locale && <Check size={16} strokeWidth={2.5} className="text-content" />}
                    </button>
                ))}
            </div>
        </div>
    );
}