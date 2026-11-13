"use client";

import React from "react";
import { useTranslations } from "next-intl";

type TrustedBrand = {
    id: string;
    logo: React.ReactNode;
};

const TRUSTED_BRANDS: TrustedBrand[] = [
    {
        id: "finca",
        logo: (
            <div className="flex items-center gap-2 leading-none">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-neutral-900 shrink-0">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 6v12M8 10l4-4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-serif font-black text-lg sm:text-xl text-neutral-900 tracking-tight leading-none inline-flex items-center">
                    FINCA<span className="font-sans font-light text-xs ml-0.5">Bank</span>
                </span>
            </div>
        ),
    },
    {
        id: "auca",
        logo: (
            <div className="flex items-center gap-2 leading-none">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#B91C1C] shrink-0">
                    <path d="M12 3L2.5 7.5L12 12L21.5 7.5L12 3Z" fill="currentColor" />
                    <path d="M4.5 9.5V15C4.5 15 7.5 18 12 18C16.5 18 19.5 15 19.5 15V9.5L12 13L4.5 9.5Z" fill="currentColor" />
                    <path d="M22 8V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="font-serif font-black text-lg sm:text-xl text-neutral-900 tracking-tight leading-none inline-flex items-center">
                    AUCA
                </span>
            </div>
        ),
    },
    {
        id: "konurat",
        logo: (
            <div className="flex items-center gap-2 leading-none">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-neutral-900 shrink-0">
                    <path d="M4 21V9L12 4L20 9V21" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    <path d="M9 21V14H15V21" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    <path d="M2 21H22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <span className="flex flex-col leading-none">
                    <span className="font-sans font-extrabold text-xs sm:text-sm text-neutral-900 tracking-widest uppercase leading-none">
                        Konurat
                    </span>
                    <span className="font-mono font-medium text-[8px] sm:text-[9px] text-neutral-500 tracking-[0.22em] uppercase leading-none mt-1">
                        Construction
                    </span>
                </span>
            </div>
        ),
    },
    {
        id: "playmatica",
        logo: (
            <div className="flex items-center gap-2 leading-none">
                <div className="w-5 h-5 rounded-md bg-[#0A1A2F] flex items-center justify-center shrink-0">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
                        <path d="M8 5V19L19 12L8 5Z" fill="#ffffff" />
                    </svg>
                </div>
                <span className="font-sans font-bold text-base sm:text-lg text-neutral-900 tracking-tight leading-none inline-flex items-center">
                    Playmatica
                </span>
            </div>
        ),
    },
    {
        id: "concept-clinic",
        logo: (
            <div className="flex items-center gap-2 leading-none">
                <div className="w-5 h-5 rounded-full border-2 border-[#0A1A2F] flex items-center justify-center shrink-0">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-[#0A1A2F]">
                        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
                    </svg>
                </div>
                <span className="font-sans text-base sm:text-lg text-neutral-900 tracking-tight leading-none inline-flex items-center">
                    <span className="font-bold">Concept</span>
                    <span className="font-light ml-1">Clinic</span>
                </span>
            </div>
        ),
    },
    {
        id: "knopka",
        logo: (
            <div className="flex items-center gap-2 leading-none">
                <div className="w-6 h-4 rounded-full bg-[#0A1A2F] flex items-center justify-end px-0.5 shrink-0">
                    <span className="w-3 h-3 rounded-full bg-white" />
                </div>
                <span className="font-sans font-black text-base sm:text-lg text-neutral-900 tracking-tight lowercase leading-none inline-flex items-center">
                    knopka
                </span>
            </div>
        ),
    },
];

export function TrustedBy() {
    const t = useTranslations("TrustedBy");
    return (
        <section
            aria-label={t("ariaLabel")}
            className="w-full border-y border-neutral-200/80 bg-white/60 backdrop-blur-xs py-4 sm:py-5 select-none overflow-x-clip"
        >
            <div className="w-full px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-7 lg:gap-[48px]">

                {/* Лейбл: жестко выровнен по центру высоты без паразитных отступов шрифта */}
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0A1A2F]/60 shrink-0 inline-flex items-center leading-none">
                    {t("title")}
                </span>

                {/* Логотипы компаний по единой центральной оси */}
                <div className="w-full grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-5 lg:gap-x-8 xl:flex xl:flex-wrap xl:items-center xl:justify-between xl:gap-8 text-neutral-900">
                    {TRUSTED_BRANDS.map((brand) => (
                        <React.Fragment key={brand.id}>{brand.logo}</React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TrustedBy;
