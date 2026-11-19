"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useRouter } from "@/i18n/navigation";
import {
    Cpu,
    ArrowUpRight,
    Server,
    Globe,
    LayoutDashboard,
    Wrench,
} from "lucide-react";
import { Real3DCanvas } from "@/components/Real3DCanvas";
import { SERVICES } from "@/data/services";
import { useTr } from "@/i18n/tr";
import { useLocale } from "next-intl";

// Определение скидки для основных услуг
const getServiceDiscount = (item: { indexStr?: string; title?: string; id?: string }) => {
    const title = item.title?.toLowerCase() || "";
    const id = item.id?.toLowerCase() || "";
    const idx = item.indexStr || "";

    if (idx === "01" || id.includes("web") || title.includes("website")) return "−40%";
    if (idx === "06" || id.includes("seo") || title.includes("seo")) return "−30%";
    if (id.includes("mobile") || title.includes("mobile")) return "−30%";
    if (idx === "05" || id.includes("security") || id.includes("audit") || title.includes("security") || title.includes("audit")) return "−30%";
    return null;
};

// 4 инфраструктурные услуги
const ADDITIONAL_SERVICES = [
    {
        indexStr: "01",
        title: "Hosting & Server",
        href: "/solutions/additional/hosting-server",
        icon: Server,
        delay: "delay-100",
        badge: "−50%",
    },
    {
        indexStr: "02",
        title: "Domains",
        href: "/solutions/additional/domains",
        icon: Globe,
        delay: "delay-150",
    },
    {
        indexStr: "03",
        title: "Admin Panel",
        href: "/solutions/additional/admin-panel",
        icon: LayoutDashboard,
        delay: "delay-200",
        badge: "−20%",
    },
    {
        indexStr: "04",
        title: "Technical Maintenance",
        href: "/solutions/additional/technical-maintenance",
        icon: Wrench,
        delay: "delay-250",
    },
];

export default function Solutions() {
    const tr = useTr();
    const locale = useLocale();
    const router = useRouter();
    const [activeId, setActiveId] = useState<string>("web-dev");
    const [currentDateStr, setCurrentDateStr] = useState<string>("");

    const [isInfraVisible, setIsInfraVisible] = useState(false);
    const infraRef = useRef<HTMLDivElement>(null);
    const detailPanelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const now = new Date();
        const month = now.toLocaleString(locale, { month: "long" });
        const year = now.getFullYear();
        setCurrentDateStr(`${month} ${year}`);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInfraVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );

        if (infraRef.current) {
            observer.observe(infraRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const activeService =
        SERVICES.find((s) => s.id === activeId) || SERVICES[0];
    const ActiveIcon = activeService.icon;

    const handleSecretAdminAccess = () => {
        window.location.href = "/admin";
    };

    const handleServiceSelect = (id: string) => {
        setActiveId(id);
        // На мобильных устройствах (< 1024px) плавно подтягиваем карточку деталей в зону видимости
        if (window.innerWidth < 1024 && detailPanelRef.current) {
            detailPanelRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    };

    return (
        <section
            id="solutions"
            className="w-[94vw] sm:w-[90vw] lg:w-[81vw] lg:max-w-[81vw] mx-auto pt-24 sm:pt-36 pb-12 md:pb-20 scroll-mt-28 text-content overflow-x-clip"
        >
            {/* Внешний белый контейнер */}
            <div className="w-full rounded-3xl xs:rounded-[36px] sm:rounded-[44px] bg-[#FFFFFF] border border-line/90 p-5 xs:p-7 sm:p-12 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.03)] space-y-8 sm:space-y-12">

                {/* Верхняя статусная строка */}
                <div className="flex items-center justify-between text-content-muted font-mono text-[11px] sm:text-sm">
                    <span className="tracking-wider uppercase font-medium">
                        01 — 06
                    </span>
                    <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-surface-muted text-neutral-800 font-bold uppercase tracking-widest text-[10px] sm:text-xs border border-line/80">
                        {currentDateStr}
                    </span>
                </div>

                {/* Центрированный брендовый блок с крупной плашкой акции */}
                <div className="flex flex-col items-center justify-center text-center space-y-3 pt-1 sm:pt-2 pb-4 sm:pb-6">
                    {/* Крупная плашка акции */}
                    <div className="inline-flex items-center justify-center px-4 xs:px-6 py-2 sm:py-2.5 rounded-full bg-accent-soft border border-accent/25 text-accent font-sans text-xs xs:text-sm sm:text-base font-black tracking-tight mb-1 sm:mb-2 shadow-xs max-w-full text-center leading-snug">
                        <span>{tr("Акции до 31 Декабря в честь ребрендинга")}</span>
                    </div>

                    <button
                        type="button"
                        onClick={handleSecretAdminAccess}
                        aria-label={tr("Engine Status")}
                        className="text-content mb-0.5 sm:mb-1 focus:outline-none transition-transform active:scale-90 cursor-default"
                    >
                        <Cpu size={32} className="sm:w-9 sm:h-9" strokeWidth={1.75} />
                    </button>
                    <h2 className="font-sans font-extrabold text-2xl xs:text-3xl sm:text-4xl md:text-5xl tracking-tight text-content uppercase">
                        {tr("ASMAN TECH")}
                    </h2>
                    <p className="font-mono text-[10px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.25em] uppercase text-content-subtle font-medium">
                        {tr("DIGITAL ENGINEERING")}
                    </p>
                </div>

                {/* Основная сетка: слева направления со скидками, справа панель с деталями */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">

                    {/* Левая колонка: 6 направлений */}
                    <div className="lg:col-span-7 space-y-3 sm:space-y-4">
                        {SERVICES.map((item) => {
                            const IconComponent = item.icon;
                            const isActive = activeId === item.id;
                            const discount = getServiceDiscount(item);

                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => handleServiceSelect(item.id)}
                                    className={`w-full py-4 xs:py-5 sm:py-6 px-4 xs:px-6 sm:px-8 rounded-[18px] sm:rounded-3xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between group active:scale-[0.99] [touch-action:manipulation] ${
                                        isActive
                                            ? "bg-ink border-ink text-white shadow-md"
                                            : "bg-white hover:bg-neutral-50/70 border-line/90 hover:border-line-strong text-content"
                                    }`}
                                >
                                    <div className="flex items-center gap-3 xs:gap-4 sm:gap-6 min-w-0 pr-2">
                                        <span
                                            className={`font-mono text-[13px] xs:text-[15px] sm:text-[17px] font-medium w-5 sm:w-7 shrink-0 ${
                                                isActive ? "text-content-subtle" : "text-content-subtle"
                                            }`}
                                        >
                                            {tr(item.indexStr)}
                                        </span>
                                        <div
                                            className={`transition-transform duration-200 group-hover:scale-105 shrink-0 ${
                                                isActive ? "text-white" : "text-neutral-700"
                                            }`}
                                        >
                                            <IconComponent size={20} className="sm:w-[22px] sm:h-[22px]" strokeWidth={1.8} />
                                        </div>
                                        <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 flex-wrap min-w-0">
                                            <span
                                                className={`font-sans font-semibold text-[15px] xs:text-[17px] sm:text-xl md:text-[21px] tracking-tight leading-tight ${
                                                    isActive ? "text-white" : "text-content"
                                                }`}
                                            >
                                                {tr(item.title)}
                                            </span>

                                            {/* Увеличенная зеленая плашка скидки */}
                                            {discount && (
                                                <span className="inline-flex items-center justify-center px-2 xs:px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-[8px] sm:rounded-[10px] bg-accent-soft text-accent font-sans text-[11px] xs:text-xs sm:text-sm font-black tracking-tight leading-none shrink-0 shadow-xs">
                                                    {tr(discount)}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div
                                        className={`transition-colors pl-1.5 sm:pl-2 shrink-0 ${
                                            isActive
                                                ? "text-white"
                                                : "text-content-subtle group-hover:text-content"
                                        }`}
                                    >
                                        <ArrowUpRight
                                            size={18}
                                            className={`transition-transform duration-200 sm:w-5 sm:h-5 ${
                                                isActive
                                                    ? "translate-x-0.5 -translate-y-0.5"
                                                    : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                            }`}
                                        />
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Правая колонка: панель с данными, 3D / картинкой и текстом */}
                    <div ref={detailPanelRef} className="lg:col-span-5 lg:sticky lg:top-28 w-full pt-2 lg:pt-0">
                        <div className="rounded-3xl sm:rounded-3xl bg-neutral-50 border border-line/90 p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-sm">

                            {/* Верх панели */}
                            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-line/80">
                                <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-content-subtle font-semibold">
                                    {tr("Guarantee for quality")}
                                </span>
                                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-white border border-line text-neutral-700 font-medium">
                                    {tr(activeService.badge)}
                                </span>
                            </div>

                            {/* Медиа-контейнер */}
                            <div className="relative w-full h-48 xs:h-56 sm:h-64 rounded-xl sm:rounded-2xl overflow-hidden bg-ink border border-line/80">
                                {activeService.id === "3d-design" ? (
                                    <Real3DCanvas />
                                ) : (
                                    <Image
                                        src={activeService.imageUrl}
                                        alt={activeService.title}
                                        fill
                                        unoptimized
                                        className="object-cover transition-transform duration-500 hover:scale-105"
                                        sizes="(max-width: 1024px) 100vw, 40vw"
                                    />
                                )}
                            </div>

                            {/* Заголовок и описание */}
                            <div className="space-y-2.5 sm:space-y-3">
                                <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                                    <div className="p-1.5 sm:p-2 rounded-xl bg-white border border-line text-neutral-800">
                                        <ActiveIcon size={18} className="sm:w-5 sm:h-5" strokeWidth={1.8} />
                                    </div>
                                    <h3 className="font-sans font-bold text-xl xs:text-2xl text-content tracking-tight">
                                        {tr(activeService.title)}
                                    </h3>
                                    {getServiceDiscount(activeService) && (
                                        <span className="inline-flex items-center justify-center px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-[8px] sm:rounded-[10px] bg-accent-soft text-accent font-sans text-xs sm:text-sm font-black tracking-tight">
                                            {getServiceDiscount(activeService)}
                                        </span>
                                    )}
                                </div>

                                <p className="text-neutral-700 font-sans text-[13.5px] xs:text-sm sm:text-[15px] leading-relaxed">
                                    {tr(activeService.description)}
                                </p>

                                <p className="text-content-muted font-sans text-xs sm:text-sm leading-relaxed pt-0.5 sm:pt-1">
                                    {tr(activeService.details)}
                                </p>
                            </div>

                            {/* Кнопка "Подробнее" */}
                            <div className="pt-1 sm:pt-2">
                                <Link
                                    href={`/solutions/${activeService.id}`}
                                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 sm:py-4 px-6 rounded-xl bg-ink hover:bg-ink-strong text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all active:scale-[0.99]"
                                >
                                    <span>{tr("Подробнее")}</span>
                                    <ArrowUpRight size={15} />
                                </Link>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Infrastructure Services: сетка 2x2 */}
                <div
                    ref={infraRef}
                    className={`mt-14 sm:mt-28 pt-10 sm:pt-16 border-t border-line/80 space-y-6 sm:space-y-7 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isInfraVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                    }`}
                >

                    {/* Заголовок */}
                    <div className="flex items-center justify-between pb-1">
                        <div className="flex items-center gap-2.5 sm:gap-3">
                            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-ink" />
                            <h3 className="font-sans font-bold text-lg xs:text-xl sm:text-2xl text-content tracking-tight">
                                {tr("Infrastructure Services")}
                            </h3>
                        </div>
                        <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-surface-muted text-neutral-800 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest border border-line/80">
                            01 — 04
                        </span>
                    </div>

                    {/* Сетка 2x2 без SSL Certificate */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                        {ADDITIONAL_SERVICES.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <Link
                                    key={item.indexStr}
                                    href={item.href}
                                    className={`py-4 xs:py-5 px-4 xs:px-6 sm:px-8 rounded-[18px] sm:rounded-3xl bg-neutral-50/70 border border-line/80 hover:border-line-strong hover:bg-neutral-50 transition-all duration-500 flex items-center justify-between group cursor-pointer active:scale-[0.99] [touch-action:manipulation] ${item.delay} ${
                                        isInfraVisible
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-4"
                                    }`}
                                >
                                    <div className="flex items-center gap-3 xs:gap-4 sm:gap-6 min-w-0 pr-2">
                                        <span className="font-mono text-[13px] xs:text-[15px] sm:text-[17px] font-medium w-5 sm:w-7 text-content-subtle shrink-0">
                                            {tr(item.indexStr)}
                                        </span>
                                        <div className="p-1.5 sm:p-2 rounded-xl bg-white border border-line/90 text-neutral-700 group-hover:text-content transition-colors shrink-0">
                                            <IconComponent size={18} className="sm:w-5 sm:h-5" strokeWidth={1.8} />
                                        </div>
                                        <div className="flex items-center gap-2 xs:gap-3 flex-wrap min-w-0">
                                            <span className="font-sans font-semibold text-[15px] xs:text-[17px] sm:text-xl tracking-tight text-content leading-tight">
                                                {tr(item.title)}
                                            </span>
                                            {item.badge && (
                                                <span className="inline-flex items-center justify-center px-2 xs:px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-[8px] sm:rounded-[10px] bg-accent-soft text-accent font-sans text-[11px] xs:text-xs sm:text-sm font-black tracking-tight leading-none shrink-0 shadow-xs">
                                                    {tr(item.badge)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <ArrowUpRight
                                        size={18}
                                        className="text-content-subtle group-hover:text-content group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 sm:w-5 sm:h-5 shrink-0"
                                    />
                                </Link>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}