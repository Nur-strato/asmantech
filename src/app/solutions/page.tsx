"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

// 4 инфраструктурные услуги (SSL полностью удален)
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
    const router = useRouter();
    const [activeId, setActiveId] = useState<string>("web-dev");
    const [currentDateStr, setCurrentDateStr] = useState<string>("");

    const [isInfraVisible, setIsInfraVisible] = useState(false);
    const infraRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const now = new Date();
        const month = now.toLocaleString("en-US", { month: "long" });
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
        router.push("/admin");
    };

    return (
        <section
            id="solutions"
            className="w-[81vw] max-w-[81vw] mx-auto pt-28 sm:pt-36 pb-12 md:pb-20 scroll-mt-28 text-neutral-900"
        >
            {/* Внешний белый контейнер */}
            <div className="w-full rounded-[36px] sm:rounded-[44px] bg-[#FFFFFF] border border-neutral-200/90 p-8 sm:p-12 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.03)] space-y-10 sm:space-y-12">

                {/* Верхняя статусная строка */}
                <div className="flex items-center justify-between text-neutral-500 font-mono text-xs sm:text-sm">
                    <span className="tracking-wider uppercase font-medium">
                        01 — 06
                    </span>
                    <span className="px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-800 font-bold uppercase tracking-widest text-[11px] sm:text-xs border border-neutral-200/80">
                        {currentDateStr || "OCTOBER 2026"}
                    </span>
                </div>

                {/* Центрированный брендовый блок с крупной плашкой акции */}
                <div className="flex flex-col items-center justify-center text-center space-y-3 pt-2 pb-6">
                    {/* Крупная плашка акции без точки */}
                    <div className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#E7F8EE] border border-[#058447]/25 text-[#058447] font-sans text-sm sm:text-base font-black tracking-tight mb-2 shadow-xs">
                        <span>Акции до 31 Декабря в честь ребрендинга</span>
                    </div>

                    <button
                        type="button"
                        onClick={handleSecretAdminAccess}
                        aria-label="Engine Status"
                        className="text-neutral-900 mb-1 focus:outline-none transition-transform active:scale-90 cursor-default"
                    >
                        <Cpu size={36} strokeWidth={1.75} />
                    </button>
                    <h2 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-neutral-950 uppercase">
                        ASMAN TECH
                    </h2>
                    <p className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-neutral-400 font-medium">
                        DIGITAL ENGINEERING
                    </p>
                </div>

                {/* Основная сетка: слева направления со скидками, справа панель с деталями */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Левая колонка: 6 направлений */}
                    <div className="lg:col-span-7 space-y-4">
                        {SERVICES.map((item) => {
                            const IconComponent = item.icon;
                            const isActive = activeId === item.id;
                            const discount = getServiceDiscount(item);

                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setActiveId(item.id)}
                                    className={`w-full py-5 sm:py-6 px-6 sm:px-8 rounded-[22px] border text-left transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                                        isActive
                                            ? "bg-neutral-950 border-neutral-950 text-white shadow-md"
                                            : "bg-white hover:bg-neutral-50/70 border-neutral-200/90 hover:border-neutral-300 text-neutral-900"
                                    }`}
                                >
                                    <div className="flex items-center gap-4 sm:gap-6">
                                        <span
                                            className={`font-mono text-[15px] sm:text-[17px] font-medium w-6 sm:w-7 ${
                                                isActive ? "text-neutral-400" : "text-neutral-400"
                                            }`}
                                        >
                                            {item.indexStr}
                                        </span>
                                        <div
                                            className={`transition-transform duration-200 group-hover:scale-105 shrink-0 ${
                                                isActive ? "text-white" : "text-neutral-700"
                                            }`}
                                        >
                                            <IconComponent size={22} strokeWidth={1.8} />
                                        </div>
                                        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                                            <span
                                                className={`font-sans font-semibold text-lg sm:text-xl md:text-[21px] tracking-tight ${
                                                    isActive ? "text-white" : "text-neutral-900"
                                                }`}
                                            >
                                                {item.title}
                                            </span>

                                            {/* Увеличенная зеленая плашка скидки */}
                                            {discount && (
                                                <span className="inline-flex items-center justify-center px-3 sm:px-3.5 py-1 rounded-[10px] bg-[#E7F8EE] text-[#058447] font-sans text-xs sm:text-sm font-black tracking-tight leading-none shrink-0 shadow-xs">
                                                    {discount}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div
                                        className={`transition-colors pl-2 shrink-0 ${
                                            isActive
                                                ? "text-white"
                                                : "text-neutral-400 group-hover:text-neutral-900"
                                        }`}
                                    >
                                        <ArrowUpRight
                                            size={20}
                                            className={`transition-transform duration-200 ${
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
                    <div className="lg:col-span-5 lg:sticky lg:top-28">
                        <div className="rounded-[28px] bg-neutral-50 border border-neutral-200/90 p-6 sm:p-8 space-y-6 shadow-sm">

                            {/* Верх панели */}
                            <div className="flex items-center justify-between pb-4 border-b border-neutral-200/80">
                                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                                    Guarantee for quality
                                </span>
                                <span className="font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-white border border-neutral-200 text-neutral-700 font-medium">
                                    {activeService.badge}
                                </span>
                            </div>

                            {/* Медиа-контейнер */}
                            <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-200/80">
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
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 flex-wrap">
                                    <div className="p-2 rounded-xl bg-white border border-neutral-200 text-neutral-800">
                                        <ActiveIcon size={20} strokeWidth={1.8} />
                                    </div>
                                    <h3 className="font-sans font-bold text-2xl text-neutral-950 tracking-tight">
                                        {activeService.title}
                                    </h3>
                                    {getServiceDiscount(activeService) && (
                                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-[10px] bg-[#E7F8EE] text-[#058447] font-sans text-xs sm:text-sm font-black tracking-tight">
                                            {getServiceDiscount(activeService)}
                                        </span>
                                    )}
                                </div>

                                <p className="text-neutral-700 font-sans text-sm sm:text-[15px] leading-relaxed">
                                    {activeService.description}
                                </p>

                                <p className="text-neutral-500 font-sans text-xs sm:text-sm leading-relaxed pt-1">
                                    {activeService.details}
                                </p>
                            </div>

                            {/* Кнопка "Подробнее" */}
                            <div className="pt-2">
                                <Link
                                    href={`/solutions/${activeService.id}`}
                                    className="inline-flex items-center justify-center gap-2 w-full py-4 px-6 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all active:scale-[0.99]"
                                >
                                    <span>Подробнее</span>
                                    <ArrowUpRight size={15} />
                                </Link>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Infrastructure Services: сетка 2x2 (ровно 4 сервиса) */}
                <div
                    ref={infraRef}
                    className={`mt-20 sm:mt-28 pt-14 sm:pt-16 border-t border-neutral-200/80 space-y-7 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isInfraVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                    }`}
                >

                    {/* Заголовок */}
                    <div className="flex items-center justify-between pb-1">
                        <div className="flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-neutral-950" />
                            <h3 className="font-sans font-bold text-xl sm:text-2xl text-neutral-950 tracking-tight">
                                Infrastructure Services
                            </h3>
                        </div>
                        <span className="px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-800 font-mono text-xs font-bold uppercase tracking-widest border border-neutral-200/80">
                            01 — 04
                        </span>
                    </div>

                    {/* Сетка 2x2 без SSL Certificate */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {ADDITIONAL_SERVICES.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <Link
                                    key={item.indexStr}
                                    href={item.href}
                                    className={`py-5 px-6 sm:px-8 rounded-[22px] bg-neutral-50/70 border border-neutral-200/80 hover:border-neutral-300 hover:bg-neutral-50 transition-all duration-500 flex items-center justify-between group cursor-pointer ${item.delay} ${
                                        isInfraVisible
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-4"
                                    }`}
                                >
                                    <div className="flex items-center gap-4 sm:gap-6">
                                        <span className="font-mono text-[15px] sm:text-[17px] font-medium w-6 sm:w-7 text-neutral-400">
                                            {item.indexStr}
                                        </span>
                                        <div className="p-2 rounded-xl bg-white border border-neutral-200/90 text-neutral-700 group-hover:text-neutral-950 transition-colors">
                                            <IconComponent size={20} strokeWidth={1.8} />
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="font-sans font-semibold text-lg sm:text-xl tracking-tight text-neutral-900">
                                                {item.title}
                                            </span>
                                            {item.badge && (
                                                <span className="inline-flex items-center justify-center px-3 py-1 rounded-[10px] bg-[#E7F8EE] text-[#058447] font-sans text-xs sm:text-sm font-black tracking-tight leading-none shrink-0 shadow-xs">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <ArrowUpRight
                                        size={20}
                                        className="text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
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