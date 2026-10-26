"use client";

import React from "react";
import { Check } from "lucide-react";

export function WhyUs() {
    return (
        <section
            id="why-us"
            className="w-[90vw] max-w-[90vw] mx-auto py-10 md:py-16 text-neutral-900 select-none"
        >
            {/* Главный внешний контейнер-карточка */}
            <div className="w-full rounded-[36px] bg-[#FAF9F6] border border-neutral-300/80 p-6 sm:p-10 md:p-14 space-y-10 shadow-[0_24px_50px_rgba(0,0,0,0.03)]">

                {/* Хедер секции */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
                    <div className="space-y-3 max-w-2xl">
                        <h2 className="font-serif italic text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-neutral-950 leading-none">
                            Почему Asman Tech
                        </h2>
                    </div>

                    <div className="text-left sm:text-right max-w-sm">
                        <p className="font-mono text-[15px] sm:text-[16px] uppercase tracking-wider text-neutral-600 leading-snug font-semibold">
                            ШЕСТЬ ПРИНЦИПОВ, КОТОРЫЕ ДЕЛАЮТ НАШУ РАБОТУ ОСОБЕННОЙ
                        </p>
                    </div>
                </div>

                {/* Сетка принципов */}
                <div className="space-y-5">

                    {/* РЯД 1 */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

                        {/* 01 */}
                        <div className="lg:col-span-7 rounded-[28px] bg-[#111215] text-white p-7 sm:p-9 border border-neutral-800 shadow-md flex flex-col justify-between min-h-[300px] sm:min-h-[340px] relative overflow-hidden group">

                            <div className="relative z-10 space-y-3 max-w-xs sm:max-w-sm">
                                <h3 className="font-serif italic text-[26px] sm:text-[33px] font-normal tracking-tight text-white leading-snug">
                                    Следим за технологиями будущего
                                </h3>
                                <p className="text-neutral-300 text-[14px] sm:text-[17px] leading-[1.7] font-sans font-medium">
                                    Изучаем передовые технологии и мировые тренды, чтобы создавать современные цифровые продукты.
                                </p>
                            </div>

                            <div className="absolute right-[-10px] sm:right-6 bottom-4 sm:bottom-6 w-52 sm:w-64 h-52 sm:h-64 pointer-events-none opacity-90 transition-transform duration-500 group-hover:scale-105">
                                <svg viewBox="0 0 240 240" className="w-full h-full">
                                    <defs>
                                        <radialGradient id="sphereGrad" cx="35%" cy="35%" r="65%">
                                            <stop offset="0%" stopColor="#8E95A5" />
                                            <stop offset="45%" stopColor="#252932" />
                                            <stop offset="100%" stopColor="#0B0C0E" />
                                        </radialGradient>
                                        <linearGradient id="orbitGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                                            <stop offset="100%" stopColor="#4A5568" stopOpacity="0.1" />
                                        </linearGradient>
                                    </defs>
                                    <ellipse cx="120" cy="120" rx="95" ry="38" fill="none" stroke="url(#orbitGlow)" strokeWidth="1.2" transform="rotate(-25 120 120)" />
                                    <ellipse cx="120" cy="120" rx="90" ry="32" fill="none" stroke="#4A5568" strokeDasharray="3 4" strokeWidth="1" transform="rotate(35 120 120)" />
                                    <circle cx="120" cy="120" r="44" fill="url(#sphereGrad)" filter="drop-shadow(0 15px 25px rgba(0,0,0,0.8))" />
                                    <ellipse cx="112" cy="108" rx="36" ry="16" fill="none" stroke="#ffffff" strokeOpacity="0.25" transform="rotate(-30 112 108)" />
                                </svg>
                            </div>

                            <span aria-hidden="true" className="pointer-events-none absolute right-6 top-5 font-serif italic text-[44px] sm:text-[56px] leading-none text-white/10 select-none">
                                01
                            </span>
                        </div>

                        {/* 02 */}
                        <div className="lg:col-span-5 rounded-[28px] bg-white border border-neutral-200/90 p-7 sm:p-9 shadow-2xs flex flex-col justify-between min-h-[300px] sm:min-h-[340px] relative overflow-hidden group">

                            <div className="relative z-10 space-y-3 max-w-xs">
                                <h3 className="font-sans text-[26px] sm:text-[33px] font-bold tracking-tight text-neutral-950 leading-tight">
                                    Внедряем инновации
                                </h3>
                                <p className="text-neutral-600 text-[14px] sm:text-[17px] leading-[1.7] font-sans font-medium">
                                    Не просто следим за новинками — применяем современные технологии там, где они действительно дают преимущество.
                                </p>
                            </div>

                            <div className="absolute right-3 sm:right-6 bottom-4 w-44 sm:w-52 h-44 sm:h-52 pointer-events-none opacity-85 transition-transform duration-500 group-hover:scale-105">
                                <svg viewBox="0 0 200 200" className="w-full h-full">
                                    <defs>
                                        <linearGradient id="cubeTop" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#FFFFFF" />
                                            <stop offset="100%" stopColor="#ECEEF2" />
                                        </linearGradient>
                                        <linearGradient id="cubeLeft" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#E2E5EB" />
                                            <stop offset="100%" stopColor="#CBD0D9" />
                                        </linearGradient>
                                        <linearGradient id="cubeRight" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#B8BFCC" />
                                            <stop offset="100%" stopColor="#9CA5B5" />
                                        </linearGradient>
                                    </defs>
                                    <g transform="translate(30, 20)">
                                        <polygon points="70,15 125,45 70,75 15,45" fill="url(#cubeTop)" stroke="#B8BFCC" strokeWidth="0.75" />
                                        <polygon points="15,45 70,75 70,125 15,95" fill="url(#cubeLeft)" />
                                        <polygon points="70,75 125,45 125,95 70,125" fill="url(#cubeRight)" />
                                        <path d="M70,75 L125,45" stroke="#B91C1C" strokeWidth="1.5" />
                                    </g>
                                </svg>
                            </div>

                            <span aria-hidden="true" className="pointer-events-none absolute right-6 top-5 font-serif italic text-[44px] sm:text-[56px] leading-none text-neutral-900/10 select-none">
                                02
                            </span>
                        </div>

                    </div>

                    {/* РЯД 2 */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

                        {/* 03 */}
                        <div className="lg:col-span-5 rounded-[28px] bg-white border border-neutral-200/90 p-7 sm:p-9 shadow-2xs flex flex-col justify-between min-h-[300px] sm:min-h-[340px] relative overflow-hidden group">

                            <div className="relative z-10 space-y-3 max-w-xs">
                                <h3 className="font-sans text-[26px] sm:text-[33px] font-bold tracking-tight text-neutral-950 leading-tight">
                                    Находим нестандартные решения
                                </h3>
                                <p className="text-neutral-600 text-[14px] sm:text-[17px] leading-[1.7] font-sans font-medium">
                                    Продумываем интеллектуальные решения, которые улучшают функциональность, удобство и эффективность вашего сайта.
                                </p>
                            </div>

                            <div className="absolute right-2 sm:right-6 bottom-4 w-44 sm:w-52 h-44 sm:h-52 pointer-events-none opacity-85 transition-transform duration-500 group-hover:scale-105">
                                <svg viewBox="0 0 200 200" className="w-full h-full">
                                    <defs>
                                        <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#FFFFFF" />
                                            <stop offset="40%" stopColor="#DDE2EC" />
                                            <stop offset="100%" stopColor="#9AA5B5" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d="M40,110 C30,60 80,30 120,45 C160,60 170,110 140,140 C110,170 60,150 40,110 Z"
                                        fill="none"
                                        stroke="url(#ribbonGrad)"
                                        strokeWidth="18"
                                        strokeLinecap="round"
                                        filter="drop-shadow(0 10px 15px rgba(0,0,0,0.06))"
                                    />
                                    <path
                                        d="M75,95 C70,75 95,60 115,70 C135,80 140,105 125,120"
                                        fill="none"
                                        stroke="#B91C1C"
                                        strokeWidth="2"
                                        strokeDasharray="4 4"
                                    />
                                </svg>
                            </div>

                            <span aria-hidden="true" className="pointer-events-none absolute right-6 top-5 font-serif italic text-[44px] sm:text-[56px] leading-none text-neutral-900/10 select-none">
                                03
                            </span>
                        </div>

                        {/* 04 */}
                        <div className="lg:col-span-7 rounded-[28px] bg-[#111215] text-white p-7 sm:p-9 border border-neutral-800 shadow-md flex flex-col justify-between min-h-[300px] sm:min-h-[340px] relative overflow-hidden group">

                            <div className="relative z-10 space-y-3 max-w-xs sm:max-w-sm">
                                <h3 className="font-serif italic text-[26px] sm:text-[33px] font-normal tracking-tight text-white leading-snug">
                                    Гарантируем результат
                                </h3>
                                <p className="text-neutral-300 text-[14px] sm:text-[17px] leading-[1.7] font-sans font-medium">
                                    Предоставляем гарантию на выполненные работы в соответствии с условиями договора.
                                </p>
                            </div>

                            <div className="absolute right-4 sm:right-10 bottom-4 sm:bottom-8 w-44 sm:w-56 h-44 sm:h-56 pointer-events-none flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full flex items-center justify-center">
                                    <div className="absolute inset-0 rounded-full bg-[#B91C1C]/25 blur-2xl" />
                                    <div className="absolute inset-0 rounded-full border border-neutral-700/80" />
                                    <div className="absolute inset-2 rounded-full border-2 border-[#B91C1C]/80 shadow-[0_0_20px_#B91C1C]" />
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-b from-[#202228] to-[#121316] border border-neutral-600 flex items-center justify-center shadow-inner">
                                        <Check size={28} className="text-white stroke-[2.5]" />
                                    </div>
                                </div>
                            </div>

                            <span aria-hidden="true" className="pointer-events-none absolute right-6 top-5 font-serif italic text-[44px] sm:text-[56px] leading-none text-white/10 select-none">
                                04
                            </span>
                        </div>

                    </div>

                    {/* РЯД 3: 05 */}
                    <div className="rounded-[28px] bg-white border border-neutral-200/90 p-7 sm:p-9 shadow-2xs relative overflow-hidden group">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

                            <div className="md:col-span-5 space-y-2">
                                <h3 className="font-serif italic text-[26px] sm:text-[33px] md:text-[39px] font-normal tracking-tight text-neutral-950">
                                    Работаем по договору
                                </h3>
                            </div>

                            <div className="md:col-span-4">
                                <p className="text-neutral-600 text-[14px] sm:text-[17px] leading-[1.7] font-sans max-w-sm font-medium">
                                    Фиксируем стоимость, сроки, объём работ и обязательства сторон до начала проекта.
                                </p>
                            </div>

                            <div className="md:col-span-3 flex justify-end">
                                <div className="relative w-44 h-24 sm:w-56 sm:h-28 rounded-xl bg-gradient-to-tr from-neutral-200 to-neutral-50 border border-neutral-300/80 shadow-sm p-4 flex flex-col justify-between [transform:rotate(-6deg)] group-hover:[transform:rotate(-2deg)] transition-transform duration-300">
                                    <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold">
                                        ASMAN TECH CONTRACT
                                    </span>
                                    <div className="space-y-1.5">
                                        <div className="h-1 bg-neutral-300 rounded w-3/4" />
                                        <div className="h-1 bg-neutral-200 rounded w-1/2" />
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <div className="h-2 w-8 bg-[#B91C1C]/40 rounded" />
                                        <span className="font-mono text-[8px] text-neutral-400">SIGNED</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <span aria-hidden="true" className="pointer-events-none absolute left-7 sm:left-9 bottom-3 font-serif italic text-[36px] sm:text-[44px] leading-none text-neutral-900/10 select-none">
                            05
                        </span>
                    </div>

                    {/* РЯД 4: 06 */}
                    <div className="rounded-[28px] bg-[#111215] text-white border border-neutral-800 p-7 sm:p-9 shadow-md relative overflow-hidden group">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

                            <div className="md:col-span-5 space-y-2">
                                <h3 className="font-serif italic text-[26px] sm:text-[33px] md:text-[39px] font-normal tracking-tight text-white">
                                    Отвечаем за качество
                                </h3>
                            </div>

                            <div className="md:col-span-4">
                                <p className="text-neutral-300 text-[14px] sm:text-[17px] leading-[1.7] font-sans max-w-sm font-medium">
                                    Если результат не соответствует согласованным требованиям и мы не можем устранить недостатки в установленном порядке, возвращаем деньги на условиях договора.
                                </p>
                            </div>

                            <div className="md:col-span-3 flex justify-end">
                                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-neutral-800 flex items-center justify-center relative">
                                    <div className="absolute inset-0 rounded-full border border-dashed border-neutral-700/60" />
                                    <div className="w-16 h-16 rounded-full bg-neutral-900 border border-[#B91C1C]/50 flex items-center justify-center shadow-[0_0_20px_rgba(185,28,28,0.2)]">
                                        <span className="font-mono text-xs font-bold text-white">100%</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <span aria-hidden="true" className="pointer-events-none absolute left-7 sm:left-9 bottom-3 font-serif italic text-[36px] sm:text-[44px] leading-none text-white/10 select-none">
                            06
                        </span>
                    </div>

                </div>

                {/* Аккуратный студийный разделитель с укрупненной надписью VITAL TECH STANDARDS */}
                <div className="pt-2 pb-1 border-t border-neutral-200/80 flex items-center justify-end">
                    <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-neutral-400 font-semibold">
                        ASMAN TECH STANDARDS
                    </span>
                </div>

            </div>
        </section>
    );
}

export default WhyUs;