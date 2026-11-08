"use client";

import React from "react";

export function TrustedBy() {
    return (
        <section
            aria-label="Нам доверяют"
            className="w-full border-y border-neutral-200/80 bg-white/60 backdrop-blur-xs py-4 sm:py-5 select-none overflow-x-clip"
        >
            <div className="w-full px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-[48px]">

                {/* Лейбл: жестко выровнен по центру высоты без паразитных отступов шрифта */}
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0A1A2F]/60 shrink-0 inline-flex items-center leading-none">
                    TRUSTED BY COMPANIES
                </span>

                {/* Логотипы компаний по единой центральной оси */}
                <div className="w-full flex flex-wrap items-center justify-between gap-6 sm:gap-8 text-neutral-900">

                    {/* FINCA Bank */}
                    <div className="flex items-center gap-2 leading-none">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-neutral-900 shrink-0">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                            <path d="M12 6v12M8 10l4-4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="font-serif font-black text-lg sm:text-xl text-neutral-900 tracking-tight leading-none inline-flex items-center">
                            FINCA<span className="font-sans font-light text-xs ml-0.5">Bank</span>
                        </span>
                    </div>

                    {/* KICB */}
                    <div className="flex items-center gap-1.5 leading-none">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#0A1A2F] shrink-0">
                            <rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor" />
                            <rect x="13" y="3" width="8" height="8" rx="2" fill="currentColor" opacity="0.6" />
                            <rect x="3" y="13" width="8" height="8" rx="2" fill="currentColor" opacity="0.6" />
                            <rect x="13" y="13" width="8" height="8" rx="2" fill="currentColor" />
                        </svg>
                        <span className="font-sans font-black text-lg sm:text-xl text-neutral-900 tracking-wider leading-none inline-flex items-center">
                            KICB
                        </span>
                    </div>

                    {/* BAY TUR */}
                    <div className="flex items-center gap-2 leading-none">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-neutral-900 shrink-0">
                            <path d="M2 12l20-8-8 20-3-9-9-3z" fill="currentColor" />
                        </svg>
                        <span className="font-sans font-extrabold text-sm sm:text-base text-neutral-900 tracking-widest uppercase leading-none inline-flex items-center">
                            BAY TUR
                        </span>
                    </div>

                    {/* Medex */}
                    <div className="flex items-center gap-1.5 leading-none">
                        <div className="w-5 h-5 rounded-md bg-[#0A1A2F] text-white flex items-center justify-center font-bold text-xs leading-none shrink-0">
                            +
                        </div>
                        <span className="font-sans font-extrabold text-base sm:text-lg text-neutral-900 tracking-tight leading-none inline-flex items-center">
                            Medex
                        </span>
                    </div>

                    {/* mbank */}
                    <div className="flex items-center gap-1 font-sans font-black text-base sm:text-lg text-neutral-900 tracking-tight lowercase leading-none inline-flex items-center">
                        <span className="w-2.5 h-2.5 rounded-xs bg-[#0A1A2F] shrink-0" />
                        <span>mbank</span>
                    </div>

                    {/* DORDOI PLAZA */}
                    <div className="flex items-center gap-2 leading-none">
                        <div className="w-5 h-5 rounded-full border-2 border-neutral-900 flex items-center justify-center shrink-0">
                            <div className="w-2 h-2 rounded-full bg-neutral-900" />
                        </div>
                        <span className="font-sans font-extrabold text-xs sm:text-sm text-neutral-900 tracking-widest uppercase leading-none inline-flex items-center">
                            DORDOI PLAZA
                        </span>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default TrustedBy;