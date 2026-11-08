"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

// Кыргызский показываем как KG — так привычнее посетителям, чем код языка ky
const LABELS: Record<Locale, string> = { ru: "RU", en: "EN", ky: "KG" };

export function LocaleSwitcher({ className = "" }: { className?: string }) {
    const t = useTranslations("Header");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const switchTo = (next: Locale) => {
        if (next === locale) return;
        startTransition(() => {
            router.replace(pathname, { locale: next, scroll: false });
        });
    };

    return (
        <div
            role="group"
            aria-label={t("language")}
            className={`inline-flex items-center gap-0.5 rounded-full border border-neutral-200 bg-white/70 p-0.5 font-mono text-[12px] font-semibold tracking-wider ${
                isPending ? "opacity-60" : ""
            } ${className}`}
        >
            {routing.locales.map((item) => (
                <button
                    key={item}
                    type="button"
                    onClick={() => switchTo(item)}
                    aria-pressed={item === locale}
                    lang={item}
                    className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                        item === locale
                            ? "bg-neutral-950 text-white"
                            : "text-neutral-500 hover:text-neutral-950"
                    }`}
                >
                    {LABELS[item]}
                </button>
            ))}
        </div>
    );
}
