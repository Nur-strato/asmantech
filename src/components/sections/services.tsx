"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ServiceItem {
    num: string;
    title: string;
    description: string;
    href: string;
    visualType: "bars" | "pyramid" | "sphere" | "waves" | "shield" | "radial";
}

const SERVICES: ServiceItem[] = [
    {
        num: "01",
        title: "Website Development",
        description:
            "We design and build digital products from early concepts to scalable systems. Combining product strategy, UX and interface design, we help startups and established companies turn complex ideas into clear, usable experiences.",
        href: "/solutions/web-dev",
        visualType: "bars",
    },
    {
        num: "02",
        title: "Web Design & Development",
        description:
            "We create marketing websites that explain products clearly, strengthen brands and support business growth. From structure and content to responsive design and development, every website is built around a specific goal.",
        href: "/solutions/mobile-apps",
        visualType: "pyramid",
    },
    {
        num: "03",
        title: "3D Design & WebGL",
        description:
            "Фотореалистичные предметные рендеры в 4K и интерактивные 3D-конфигураторы прямо на сайте с плавной частотой 60 кадров в секунду без установки сторонних плагинов.",
        href: "/solutions/3d-design",
        visualType: "sphere",
    },
    {
        num: "04",
        title: "AI Chatbots & Automation",
        description:
            "Умные диалоговые ассистенты для WhatsApp и Telegram на базе современных LLM. Ответы строго по регламенту компании без галлюцинаций (RAG) и автоматическая запись лидов в CRM 24/7.",
        href: "/solutions/ai-chatbots",
        visualType: "waves",
    },
    {
        num: "05",
        title: "Security & Quality Audit",
        description:
            "Глубокий анализ исходного кода, поиск уязвимостей по стандартам OWASP Top 10, стресс-тесты на отказ серверов и выдача готовых патчей безопасности под строгим NDA.",
        href: "/solutions/security-audit",
        visualType: "shield",
    },
    {
        num: "06",
        title: "SEO Optimization",
        description:
            "Комплексная внутренняя оптимизация для выхода в ТОП Google и Яндекс белыми методами. Зеленая зона PageSpeed 95+, чистая семантика и структурированные данные Schema.org.",
        href: "/solutions/seo-optimization",
        visualType: "radial",
    },
];

export function Services() {
    const [openedSet, setOpenedSet] = useState<Set<number>>(new Set([0]));
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        itemRefs.current.forEach((el, index) => {
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    const rect = entry.boundingClientRect;
                    const isVisibleInFocus = entry.isIntersecting;

                    if (isVisibleInFocus) {
                        // Раскрытие при движении вниз
                        setOpenedSet((prev) => {
                            if (prev.has(index)) return prev;
                            const updated = new Set(prev);
                            updated.add(index);
                            return updated;
                        });
                    } else if (rect.top > 0 && index !== 0) {
                        // Обратный скролл вверх: карточка ушла вниз экрана -> плавно собираем обратно
                        setOpenedSet((prev) => {
                            if (!prev.has(index)) return prev;
                            const updated = new Set(prev);
                            updated.delete(index);
                            return updated;
                        });
                    }
                },
                {
                    root: null,
                    // Зона детекции: -25% сверху и -35% снизу экрана для естественного баланса скролла
                    rootMargin: "-25% 0px -35% 0px",
                    threshold: 0.2,
                }
            );

            observer.observe(el);
            observers.push(observer);
        });

        // Полный сброс, если страница прокручена в самый верх выше блока
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
            observers.forEach((obs) => obs.disconnect());
            if (sectionObserver) sectionObserver.disconnect();
        };
    }, []);

    const toggleCard = (index: number) => {
        setOpenedSet((prev) => {
            const updated = new Set(prev);
            if (updated.has(index)) {
                if (updated.size > 1) updated.delete(index);
            } else {
                updated.add(index);
            }
            return updated;
        });
    };

    const renderVisual = (type: ServiceItem["visualType"], isOpen: boolean) => {
        return (
            <div
                style={{
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className={`absolute right-0 top-0 bottom-0 w-[55%] md:w-[48%] overflow-hidden pointer-events-none select-none transition-all duration-[1000ms] ease-out ${
                    isOpen ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-95 translate-x-14"
                }`}
            >
                {type === "bars" && (
                    <div className="w-full h-full flex justify-end">
                        <div className="w-12 h-full border-l border-sky-400/20 bg-gradient-to-b from-transparent via-[#0066FF]/20 to-transparent" />
                        <div className="w-12 h-full border-l border-sky-400/25 bg-gradient-to-b from-transparent via-[#0066FF]/30 to-transparent" />
                        <div className="w-12 h-full border-l border-sky-400/30 bg-gradient-to-b from-transparent via-[#0284C7]/40 to-transparent" />
                        <div className="w-12 h-full border-l border-sky-300/40 bg-gradient-to-b from-transparent via-[#38BDF8]/40 to-transparent" />
                        <div className="w-16 h-full border-l border-sky-400/50 bg-gradient-to-b from-[#0B2545] via-[#0066FF]/50 to-[#08090D]" />
                    </div>
                )}

                {type === "pyramid" && (
                    <div className="relative w-full h-full flex items-center justify-end pr-6 lg:pr-12">
                        <svg viewBox="0 0 400 400" className="w-[320px] sm:w-[420px] h-[320px] sm:h-[420px]" fill="none">
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
                    <div className="relative w-full h-full flex items-center justify-end pr-8 lg:pr-14">
                        <svg viewBox="0 0 320 320" className="w-72 h-72 sm:w-80 sm:h-80" fill="none">
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
                    <div className="relative w-full h-full flex items-center justify-end pr-8 lg:pr-14">
                        <svg viewBox="0 0 320 320" className="w-72 h-72 sm:w-80 sm:h-80" fill="none">
                            <path d="M 40 180 Q 90 90, 160 160 T 280 140" stroke="#0066FF" strokeWidth="1.5" strokeOpacity="0.35" />
                            <path d="M 40 160 Q 100 80, 160 150 T 280 130" stroke="#0284C7" strokeWidth="1.8" strokeOpacity="0.5" />
                            <path d="M 40 140 Q 110 70, 160 140 T 280 120" stroke="#38BDF8" strokeWidth="2.2" strokeOpacity="0.75" />
                            <path d="M 40 120 Q 120 60, 160 130 T 280 110" stroke="#60A5FA" strokeWidth="1.6" strokeOpacity="0.5" />
                            <path d="M 40 100 Q 130 50, 160 120 T 280 100" stroke="#93C5FD" strokeWidth="1.2" strokeOpacity="0.3" />
                        </svg>
                    </div>
                )}

                {type === "shield" && (
                    <div className="relative w-full h-full flex items-center justify-end pr-8 lg:pr-14">
                        <svg viewBox="0 0 300 300" className="w-64 h-64 sm:w-72 sm:h-72" fill="none">
                            <path d="M150 30 L250 70 V160 C250 220 150 270 150 270 C150 270 50 220 50 160 V70 L150 30 Z" stroke="#0066FF" strokeWidth="1.5" strokeOpacity="0.4" fill="#0B2545" fillOpacity="0.3" />
                            <path d="M150 60 L220 90 V155 C220 200 150 235 150 235 C150 235 80 200 80 155 V90 L150 60 Z" stroke="#0284C7" strokeWidth="1.8" strokeOpacity="0.6" fill="#134E96" fillOpacity="0.4" />
                            <path d="M150 90 L190 110 V150 C190 180 150 205 150 205 C150 205 110 180 110 150 V110 L150 90 Z" stroke="#38BDF8" strokeWidth="2" strokeOpacity="0.8" fill="#0066FF" fillOpacity="0.5" />
                        </svg>
                    </div>
                )}

                {type === "radial" && (
                    <div className="relative w-full h-full flex items-center justify-end pr-8 lg:pr-14">
                        <svg viewBox="0 0 320 320" className="w-72 h-72 sm:w-80 sm:h-80" fill="none">
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
        <section ref={sectionRef} id="services" className="w-full py-20 sm:py-32 ">
            <div className="space-y-5 sm:space-y-6">
                {SERVICES.map((service, index) => {
                    const isOpen = openedSet.has(index);

                    return (
                        <div
                            key={service.num}
                            ref={(el) => {
                                itemRefs.current[index] = el;
                            }}
                            onClick={() => toggleCard(index)}
                            style={{
                                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                            }}
                            className={`relative rounded-[32px] sm:rounded-[40px] transition-all duration-[1000ms] ease-out cursor-pointer overflow-hidden border ${
                                isOpen
                                    ? "bg-[#08090D] text-white border-neutral-800/90 shadow-[0_30px_70px_rgba(0,102,255,0.08)] scale-[1.004]"
                                    : "bg-[#F8F9FA] hover:bg-[#F1F3F5] text-neutral-900 border-neutral-200/80 scale-100"
                            }`}
                        >
                            {renderVisual(service.visualType, isOpen)}

                            <div className="relative z-10 p-8 sm:p-12 lg:p-14">
                                <div className="flex items-center justify-between gap-6">
                                    <h3
                                        style={{
                                            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                                        }}
                                        className={`font-sans font-bold tracking-[-0.035em] transition-all duration-700 leading-[1.08] ${
                                            isOpen
                                                ? "text-2xl sm:text-4xl lg:text-[50px] text-white"
                                                : "text-xl sm:text-3xl lg:text-[40px] text-neutral-900"
                                        }`}
                                    >
                                        {service.title}
                                    </h3>

                                    <span
                                        style={{
                                            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                                        }}
                                        className={`font-mono text-base sm:text-xl font-bold select-none shrink-0 transition-colors duration-700 ${
                                            isOpen ? "text-sky-400" : "text-neutral-400"
                                        }`}
                                    >
                                        {service.num}
                                    </span>
                                </div>

                                <div
                                    style={{
                                        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                                    }}
                                    className={`grid transition-[grid-template-rows,opacity] duration-[1000ms] ease-out ${
                                        isOpen
                                            ? "grid-rows-[1fr] opacity-100"
                                            : "grid-rows-[0fr] opacity-0 pointer-events-none"
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <div
                                            style={{
                                                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                                            }}
                                            className={`pt-8 sm:pt-10 space-y-8 max-w-xl transition-all duration-[1000ms] delay-100 transform ${
                                                isOpen
                                                    ? "translate-y-0 opacity-100 filter blur-0"
                                                    : "translate-y-6 opacity-0 filter blur-[4px]"
                                            }`}
                                        >
                                            <p className="text-neutral-300 text-sm sm:text-base lg:text-[16px] leading-[1.65] font-normal tracking-[-0.01em]">
                                                {service.description}
                                            </p>

                                            <Link
                                                href={service.href}
                                                onClick={(e) => e.stopPropagation()}
                                                className="inline-flex items-center gap-3 text-sm sm:text-base font-medium text-white hover:text-sky-300 transition-colors group"
                                            >
                                                <span className="underline underline-offset-4 decoration-neutral-600 group-hover:decoration-sky-400 transition-colors">
                                                    Explore
                                                </span>
                                                <div className="w-9 h-9 rounded-full bg-white text-[#08090D] group-hover:bg-sky-400 group-hover:text-black flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                                    <ArrowUpRight size={17} strokeWidth={2.4} />
                                                </div>
                                            </Link>
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