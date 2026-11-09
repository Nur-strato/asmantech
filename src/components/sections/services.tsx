"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface ServiceItem {
    num: string;
    href: string;
    visualType: "bars" | "pyramid" | "sphere" | "waves" | "shield" | "radial";
}

const SERVICES: ServiceItem[] = [
    { num: "01", href: "/solutions/web-dev", visualType: "bars" },
    { num: "02", href: "/solutions/mobile-apps", visualType: "pyramid" },
    { num: "03", href: "/solutions/3d-design", visualType: "sphere" },
    { num: "04", href: "/solutions/ai-chatbots", visualType: "waves" },
    { num: "05", href: "/solutions/security-audit", visualType: "shield" },
    { num: "06", href: "/solutions/seo-opt", visualType: "radial" },
];

export function Services() {
    const t = useTranslations("ServicesSection");
    const [openedSet, setOpenedSet] = useState<Set<number>>(new Set([0]));
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const sectionRef = useRef<HTMLElement | null>(null);

    const toggleCard = useCallback((index: number) => {
        setOpenedSet((prev) => {
            const updated = new Set(prev);
            if (updated.has(index)) {
                if (updated.size > 1) updated.delete(index);
            } else {
                updated.add(index);
            }
            return updated;
        });
    }, []);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        const dynamicMargin = isMobile ? "-12% 0px -18% 0px" : "-25% 0px -35% 0px";
        const targetThreshold = isMobile ? 0.15 : 0.2;

        const observer = new IntersectionObserver(
            (entries) => {
                setOpenedSet((prev) => {
                    let updated = new Set(prev);
                    let changed = false;

                    entries.forEach((entry) => {
                        const index = Number(entry.target.getAttribute("data-index"));
                        if (isNaN(index)) return;

                        const rect = entry.boundingClientRect;

                        if (entry.intersectionRatio >= targetThreshold) {
                            if (!updated.has(index)) {
                                updated.add(index);
                                changed = true;
                            }
                        } else if (entry.intersectionRatio === 0 && rect.top > 0 && index !== 0) {
                            if (updated.has(index)) {
                                updated.delete(index);
                                changed = true;
                            }
                        }
                    });

                    return changed ? updated : prev;
                });
            },
            {
                root: null,
                rootMargin: dynamicMargin,
                threshold: [0, targetThreshold],
            }
        );

        itemRefs.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        const sectionEl = sectionRef.current;
        let sectionObserver: IntersectionObserver | null = null;

        if (sectionEl) {
            sectionObserver = new IntersectionObserver(
                ([entry]) => {
                    if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
                        setOpenedSet(new Set([0]));
                    }
                },
                { root: null, threshold: 0 }
            );
            sectionObserver.observe(sectionEl);
        }

        return () => {
            observer.disconnect();
            if (sectionObserver) sectionObserver.disconnect();
        };
    }, []);

    const renderVisual = (type: ServiceItem["visualType"], isOpen: boolean) => {
        return (
            <div
                style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                className={`absolute right-0 top-0 bottom-0 w-[68%] xs:w-[60%] sm:w-[55%] md:w-[48%] overflow-hidden pointer-events-none select-none transition-[transform,opacity] duration-[1000ms] ease-out transform-gpu will-change-[transform,opacity] ${
                    isOpen
                        ? "opacity-35 sm:opacity-100 scale-100 translate-x-0"
                        : "opacity-0 scale-95 translate-x-10 sm:translate-x-14"
                }`}
            >
                {type === "bars" && (
                    <div className="w-full h-full flex justify-end">
                        <div className="w-6 sm:w-12 h-full border-l border-sky-400/20 bg-gradient-to-b from-transparent via-[#0066FF]/20 to-transparent" />
                        <div className="w-6 sm:w-12 h-full border-l border-sky-400/25 bg-gradient-to-b from-transparent via-[#0066FF]/30 to-transparent" />
                        <div className="w-8 sm:w-12 h-full border-l border-sky-400/30 bg-gradient-to-b from-transparent via-[#0284C7]/40 to-transparent" />
                        <div className="w-8 sm:w-12 h-full border-l border-sky-300/40 bg-gradient-to-b from-transparent via-[#38BDF8]/40 to-transparent" />
                        <div className="w-10 sm:w-16 h-full border-l border-sky-400/50 bg-gradient-to-b from-[#0B2545] via-[#0066FF]/50 to-[#08090D]" />
                    </div>
                )}

                {type === "pyramid" && (
                    <div className="relative w-full h-full flex items-center justify-end pr-2 sm:pr-6 lg:pr-12">
                        <svg viewBox="0 0 400 400" className="w-[250px] xs:w-[290px] sm:w-[420px] h-[250px] xs:h-[290px] sm:h-[420px]" fill="none">
                            <path d="M200 40 L370 360 L30 360 Z" fill="url(#blue-pyr-outer)" opacity="0.6" />
                            <path d="M200 110 L330 360 L70 360 Z" fill="url(#blue-pyr-mid)" opacity="0.8" />
                            <path d="M200 180 L290 360 L110 360 Z" fill="url(#blue-pyr-inner)" />
                            <path d="M200 250 L250 360 L150 360 Z" fill="#061224" />
                            <line x1="200" y1="40" x2="200" y2="360" stroke="#38BDF8" strokeWidth="1.8" strokeOpacity="0.7" />
                            <line x1="200" y1="40" x2="370" y2="360" stroke="#0066FF" strokeWidth="1.4" strokeOpacity="0.6" />
                            <line x1="200" y1="40" x2="30" y2="360" stroke="#0284C7" strokeWidth="1.4" strokeOpacity="0.6" />
                            <defs>
                                <linearGradient id="blue-pyr-outer" x1="200" y1="40" x2="200" y2="360" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#0B2545" />
                                    <stop offset="1" stopColor="#040914" />
                                </linearGradient>
                                <linearGradient id="blue-pyr-mid" x1="200" y1="110" x2="200" y2="360" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#134E96" />
                                    <stop offset="1" stopColor="#071836" />
                                </linearGradient>
                                <linearGradient id="blue-pyr-inner" x1="200" y1="180" x2="200" y2="360" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#0066FF" />
                                    <stop offset="1" stopColor="#0B2545" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                )}

                {type === "sphere" && (
                    <div className="relative w-full h-full flex items-center justify-end pr-3 sm:pr-8 lg:pr-14">
                        <svg viewBox="0 0 320 320" className="w-56 h-56 xs:w-64 xs:h-64 sm:w-80 sm:h-80" fill="none">
                            <circle cx="160" cy="160" r="140" stroke="#0066FF" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="4 4" />
                            <circle cx="160" cy="160" r="110" stroke="#0284C7" strokeWidth="1.2" strokeOpacity="0.4" />
                            <circle cx="160" cy="160" r="75" stroke="#38BDF8" strokeWidth="1.6" strokeOpacity="0.6" />
                            <circle cx="160" cy="160" r="40" fill="url(#sphere-core)" />
                            <line x1="20" y1="160" x2="300" y2="160" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.3" />
                            <line x1="160" y1="20" x2="160" y2="300" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.3" />
                            <defs>
                                <radialGradient id="sphere-core" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(160 160) rotate(90) scale(40)">
                                    <stop stopColor="#38BDF8" />
                                    <stop offset="0.6" stopColor="#0066FF" />
                                    <stop offset="1" stopColor="#040914" />
                                </radialGradient>
                            </defs>
                        </svg>
                    </div>
                )}

                {type === "waves" && (
                    <div className="relative w-full h-full flex items-center justify-end pr-3 sm:pr-8 lg:pr-14">
                        <svg viewBox="0 0 320 320" className="w-56 h-56 xs:w-64 xs:h-64 sm:w-80 sm:h-80" fill="none">
                            <path d="M 40 180 Q 90 90, 160 160 T 280 140" stroke="#0066FF" strokeWidth="1.5" strokeOpacity="0.35" />
                            <path d="M 40 160 Q 100 80, 160 150 T 280 130" stroke="#0284C7" strokeWidth="1.8" strokeOpacity="0.5" />
                            <path d="M 40 140 Q 110 70, 160 140 T 280 120" stroke="#38BDF8" strokeWidth="2.2" strokeOpacity="0.75" />
                            <path d="M 40 120 Q 120 60, 160 130 T 280 110" stroke="#60A5FA" strokeWidth="1.6" strokeOpacity="0.5" />
                            <path d="M 40 100 Q 130 50, 160 120 T 280 100" stroke="#93C5FD" strokeWidth="1.2" strokeOpacity="0.3" />
                        </svg>
                    </div>
                )}

                {type === "shield" && (
                    <div className="relative w-full h-full flex items-center justify-end pr-3 sm:pr-8 lg:pr-14">
                        <svg viewBox="0 0 300 300" className="w-52 h-52 xs:w-60 xs:h-60 sm:w-72 sm:h-72" fill="none">
                            <path d="M150 30 L250 70 V160 C250 220 150 270 150 270 C150 270 50 220 50 160 V70 L150 30 Z" stroke="#0066FF" strokeWidth="1.5" strokeOpacity="0.4" fill="#0B2545" fillOpacity="0.3" />
                            <path d="M150 60 L220 90 V155 C220 200 150 235 150 235 C150 235 80 200 80 155 V90 L150 60 Z" stroke="#0284C7" strokeWidth="1.8" strokeOpacity="0.6" fill="#134E96" fillOpacity="0.4" />
                            <path d="M150 90 L190 110 V150 C190 180 150 205 150 205 C150 205 110 180 110 150 V110 L150 90 Z" stroke="#38BDF8" strokeWidth="2" strokeOpacity="0.8" fill="#0066FF" fillOpacity="0.5" />
                        </svg>
                    </div>
                )}

                {type === "radial" && (
                    <div className="relative w-full h-full flex items-center justify-end pr-3 sm:pr-8 lg:pr-14">
                        <svg viewBox="0 0 320 320" className="w-56 h-56 xs:w-64 xs:h-64 sm:w-80 sm:h-80" fill="none">
                            <circle cx="160" cy="160" r="130" stroke="#0066FF" strokeWidth="1.2" strokeOpacity="0.3" />
                            <circle cx="160" cy="160" r="95" stroke="#0284C7" strokeWidth="1.4" strokeOpacity="0.45" />
                            <circle cx="160" cy="160" r="60" stroke="#38BDF8" strokeWidth="1.8" strokeOpacity="0.7" />
                            <circle cx="160" cy="160" r="25" stroke="#60A5FA" strokeWidth="2" strokeOpacity="0.9" fill="#0066FF" fillOpacity="0.3" />
                            <line x1="30" y1="30" x2="290" y2="290" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.3" />
                            <line x1="290" y1="30" x2="30" y2="290" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.3" />
                        </svg>
                    </div>
                )}
            </div>
        );
    };

    return (
        <section ref={sectionRef} id="services" className="w-full py-14 sm:py-20 lg:py-32">
            <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                {SERVICES.map((service, index) => {
                    const isOpen = openedSet.has(index);

                    return (
                        <div
                            key={service.num}
                            data-index={index}
                            ref={(el) => {
                                itemRefs.current[index] = el;
                            }}
                            onClick={() => toggleCard(index)}
                            style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                            className={`relative rounded-[24px] sm:rounded-[32px] lg:rounded-[40px] transition-all duration-[1000ms] ease-out cursor-pointer overflow-hidden border select-none [touch-action:manipulation] transform-gpu ${
                                isOpen
                                    ? "bg-[#08090D] text-white border-neutral-800/90 shadow-[0_30px_70px_rgba(0,102,255,0.08)] scale-[1.002] sm:scale-[1.004]"
                                    : "bg-[#F8F9FA] hover:bg-[#F1F3F5] text-neutral-900 border-neutral-200/80 scale-100"
                            }`}
                        >
                            {renderVisual(service.visualType, isOpen)}

                            <div className="relative z-10 p-6 xs:p-7 sm:p-12 lg:p-14">
                                <div className="flex items-start sm:items-center justify-between gap-4 sm:gap-6">
                                    <h3
                                        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                                        className={`font-sans font-bold tracking-[-0.035em] transition-colors duration-700 leading-[1.12] sm:leading-[1.08] pr-2 ${
                                            isOpen
                                                ? "text-[21px] xs:text-[23px] sm:text-4xl lg:text-[50px] text-white"
                                                : "text-[18px] xs:text-[20px] sm:text-3xl lg:text-[40px] text-neutral-900"
                                        }`}
                                    >
                                        {t(`items.${service.num}.title`)}
                                    </h3>

                                    <span
                                        className={`font-mono text-sm sm:text-xl font-bold select-none shrink-0 transition-colors duration-700 pt-0.5 sm:pt-0 ${
                                            isOpen ? "text-sky-400" : "text-neutral-400"
                                        }`}
                                    >
                                        {service.num}
                                    </span>
                                </div>

                                <div
                                    style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                                    className={`grid transition-[grid-template-rows,opacity] duration-[1000ms] ease-out ${
                                        isOpen
                                            ? "grid-rows-[1fr] opacity-100"
                                            : "grid-rows-[0fr] opacity-0 pointer-events-none"
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <div
                                            style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                                            // ВОЗВРАЩЕН БЛЮР С АППАРАТНЫМ УСКОРЕНИЕМ (transform-gpu + will-change-filter)
                                            className={`pt-5 sm:pt-8 lg:pt-10 space-y-6 sm:space-y-8 max-w-xl transition-all duration-[1000ms] delay-100 transform-gpu will-change-[transform,opacity,filter] ${
                                                isOpen
                                                    ? "translate-y-0 opacity-100 filter blur-0"
                                                    : "translate-y-6 opacity-0 filter blur-[4px]"
                                            }`}
                                        >
                                            <p className="text-neutral-300 text-[13.5px] xs:text-[14.5px] sm:text-base lg:text-[16px] leading-[1.6] sm:leading-[1.65] font-normal tracking-[-0.01em]">
                                                {t(`items.${service.num}.description`)}
                                            </p>

                                            <div className="pt-1">
                                                <Link
                                                    href={service.href}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="inline-flex items-center gap-3 py-1.5 text-sm sm:text-base font-medium text-white hover:text-sky-300 transition-colors group select-none cursor-pointer"
                                                >
                                                    <span className="underline underline-offset-4 decoration-neutral-600 group-hover:decoration-sky-400 transition-colors">
                                                        {t("explore")}
                                                    </span>
                                                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#08090D] group-hover:bg-sky-400 group-hover:text-black flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0 transform-gpu">
                                                        <ArrowUpRight size={16} strokeWidth={2.4} />
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}