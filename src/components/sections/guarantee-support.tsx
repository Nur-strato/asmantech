"use client";

import React from "react";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

// Тексты пунктов берутся из словаря: Guarantee.clauses.<key>
const CLAUSES = ["late", "fixedPrice", "warranty", "sourceCode"] as const;

export function GuaranteeSupport() {
    const t = useTranslations("Guarantee");
    return (
        <section
            id="guarantee"
            aria-label={t("ariaLabel")}
            className="w-full py-12 sm:py-20 md:py-24 overflow-x-clip"
        >
            <div className="w-full max-w-[1412px] mx-auto px-4 xs:px-5 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

                    {/* ЛЕВАЯ КОЛОНКА */}
                    <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start space-y-6 sm:space-y-8">
                        <div className="space-y-5">
                            {/* Бейдж */}
                            <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-neutral-50/90 border border-line/90 shadow-2xs">
                                <ShieldCheck size={18} className="text-accent shrink-0" strokeWidth={2.2} />
                                <span className="text-xs sm:text-[13.5px] font-normal text-neutral-800 tracking-tight">
                                    {t("badge")}
                                </span>
                            </div>

                            {/* Заголовок */}
                            <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-content leading-[1.02]">
                                {t("titleLine1")} <br className="hidden sm:inline" />
                                {t("titleLine2")}
                            </h2>
                        </div>

                        <div className="pt-2">
                            <Link
                                href="/contacts"
                                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-ink hover:bg-ink-strong text-white text-xs uppercase tracking-wider font-semibold transition-all active:scale-95"
                            >
                                <span>{t("requestContract")}</span>
                                <ArrowUpRight
                                    size={15}
                                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                            </Link>
                        </div>
                    </div>

                    {/* ПРАВАЯ КОЛОНКА */}
                    <div className="lg:col-span-7 divide-y divide-line/90 border-y border-line/90">
                        {CLAUSES.map((item) => (
                            <div
                                key={item}
                                className="py-7 sm:py-9 transition-colors duration-200 hover:bg-neutral-50/50 px-2 sm:px-4 -mx-2 sm:-mx-4 rounded-xl"
                            >
                                <div className="space-y-2.5 sm:space-y-3">
                                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-content leading-snug">
                                        {t(`clauses.${item}.title`)}
                                    </h3>

                                    <p className="text-content-secondary text-sm sm:text-base leading-relaxed font-normal">
                                        {t(`clauses.${item}.text`)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}

export default GuaranteeSupport;