"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import {
    ArrowLeft,
    ArrowUpRight,
    AppWindow,
    LayoutGrid,
    Boxes,
    Flame,
    Smartphone,
    Zap,
    Search,
    ShieldCheck,
    Check,
    Info,
} from "lucide-react";

// --- КОМПОНЕНТ ДЛЯ 2-ГО ЭКРАНА (МОКАПЫ УСТРОЙСТВ) ---
function DevicePairMockup({ type }: { type: "basic" | "multi" | "platform" }) {
    if (type === "basic") {
        return (
            <div className="relative w-full h-[220px] sm:h-[240px] flex items-end justify-center select-none pt-2">
                <div className="relative w-[78%] sm:w-[74%] aspect-[16/10] mr-[14%] flex flex-col items-center">
                    <div className="w-full h-full bg-[#1A1A1A] rounded-t-[14px] p-1.5 sm:p-2 border-[2px] border-[#2A2A2A] shadow-xl flex flex-col overflow-hidden">
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-800 mx-auto mb-1 shrink-0" />
                        <div className="flex-1 rounded-[6px] bg-[#FAF8F5] p-3 text-neutral-900 overflow-hidden flex flex-col justify-between border border-neutral-200/50">
                            <div className="flex items-center justify-between border-b border-neutral-200/60 pb-1.5 text-[8px] sm:text-[9px] font-sans font-medium text-neutral-500">
                                <span className="font-bold text-neutral-900">Home.</span>
                                <div className="flex gap-2">
                                    <span>Каталог</span>
                                    <span>О нас</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-12 gap-2 items-center my-auto">
                                <div className="col-span-7 space-y-1">
                                    <h4 className="font-bold text-[10px] sm:text-xs text-neutral-900 leading-tight">
                                        Стильные решения <br />для вашего дома
                                    </h4>
                                    <p className="text-[7px] sm:text-[8px] text-neutral-400 line-clamp-2">
                                        Интерьерная мебель и авторский дизайн.
                                    </p>
                                    <span className="inline-block px-2 py-0.5 rounded-sm bg-neutral-900 text-white text-[7px] font-semibold">
                                        Смотреть
                                    </span>
                                </div>
                                <div className="col-span-5 h-14 sm:h-16 rounded bg-[#EAE4DC] flex items-center justify-center text-[8px] text-neutral-400 font-serif">
                                    Interior
                                </div>
                            </div>
                            <div className="text-[6px] text-neutral-400 font-mono">01 // BASIC</div>
                        </div>
                    </div>
                    <div className="w-[108%] h-2 bg-gradient-to-b from-[#D1D5DB] via-[#9CA3AF] to-[#6B7280] rounded-b-md shadow-md flex justify-center">
                        <div className="w-12 h-1 bg-[#4B5563] rounded-b-sm" />
                    </div>
                </div>

                <div className="absolute right-2 sm:right-4 bottom-0 w-[82px] sm:w-[94px] aspect-[9/19] bg-[#161616] rounded-[22px] p-1 border-[2px] border-[#383838] shadow-[0_20px_40px_rgba(0,0,0,0.35)] z-20 flex flex-col">
                    <div className="w-5 h-1.5 bg-black rounded-full mx-auto my-0.5 shrink-0" />
                    <div className="flex-1 rounded-[17px] bg-[#FAF8F5] p-2 text-neutral-900 overflow-hidden flex flex-col justify-between border border-neutral-200/50">
                        <div className="text-[6px] font-bold text-neutral-400 flex justify-between">
                            <span>Home.</span>
                            <span>☰</span>
                        </div>
                        <div className="space-y-1 my-auto">
                            <h5 className="font-bold text-[8px] leading-tight text-neutral-900">
                                Стильные <br />решения
                            </h5>
                            <div className="w-full h-10 rounded bg-[#EAE4DC] flex items-center justify-center text-[7px] text-neutral-400 font-serif">
                                Plant
                            </div>
                        </div>
                        <div className="w-6 h-0.5 bg-neutral-900 rounded-full mx-auto" />
                    </div>
                </div>
            </div>
        );
    }

    if (type === "multi") {
        return (
            <div className="relative w-full h-[220px] sm:h-[240px] flex items-end justify-center select-none pt-2">
                <div className="relative w-[78%] sm:w-[74%] aspect-[16/10] mr-[14%] flex flex-col items-center">
                    <div className="w-full h-full bg-[#1A1A1A] rounded-t-[14px] p-1.5 sm:p-2 border-[2px] border-[#2A2A2A] shadow-xl flex flex-col overflow-hidden">
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-800 mx-auto mb-1 shrink-0" />
                        <div className="flex-1 rounded-[6px] bg-[#0E1726] p-3 text-white overflow-hidden flex flex-col justify-between">
                            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 text-[8px] sm:text-[9px] font-sans text-neutral-300">
                                <span className="font-bold text-white tracking-wider">CONSTRUCTION</span>
                                <div className="flex gap-2">
                                    <span>Услуги</span>
                                    <span>Смета</span>
                                </div>
                            </div>
                            <div className="space-y-1.5 my-auto">
                                <span className="text-[7px] font-mono text-blue-400 uppercase tracking-wider">
                                    ENTERPRISE ARCHITECTURE
                                </span>
                                <h4 className="font-bold text-[10px] sm:text-xs leading-tight">
                                    Технологии для вашего бизнеса
                                </h4>
                                <div className="grid grid-cols-2 gap-1 pt-1">
                                    <div className="p-1 rounded bg-white/5 border border-white/10 text-[6px]">14 Объектов</div>
                                    <div className="p-1 rounded bg-white/5 border border-white/10 text-[6px]">Realtime ERP</div>
                                </div>
                            </div>
                            <div className="text-[6px] text-neutral-400 font-mono">02 // MULTI-PAGE</div>
                        </div>
                    </div>
                    <div className="w-[108%] h-2 bg-gradient-to-b from-[#D1D5DB] via-[#9CA3AF] to-[#6B7280] rounded-b-md shadow-md flex justify-center">
                        <div className="w-12 h-1 bg-[#4B5563] rounded-b-sm" />
                    </div>
                </div>

                <div className="absolute right-2 sm:right-4 bottom-0 w-[82px] sm:w-[94px] aspect-[9/19] bg-[#161616] rounded-[22px] p-1 border-[2px] border-[#383838] shadow-[0_20px_40px_rgba(0,0,0,0.35)] z-20 flex flex-col">
                    <div className="w-5 h-1.5 bg-black rounded-full mx-auto my-0.5 shrink-0" />
                    <div className="flex-1 rounded-[17px] bg-[#0E1726] p-2 text-white overflow-hidden flex flex-col justify-between">
                        <div className="text-[6px] font-bold text-blue-400 flex justify-between">
                            <span>CORP</span>
                            <span>☰</span>
                        </div>
                        <div className="space-y-1.5 my-auto">
                            <h5 className="font-bold text-[8px] leading-tight">
                                Корпоративный <br />портал
                            </h5>
                            <div className="p-1 rounded bg-white/10 text-[6px] text-neutral-300">
                                4 Раздела
                            </div>
                        </div>
                        <div className="w-6 h-0.5 bg-white/40 rounded-full mx-auto" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-[220px] sm:h-[240px] flex items-end justify-center select-none pt-2">
            <div className="relative w-[78%] sm:w-[74%] aspect-[16/10] mr-[14%] flex flex-col items-center">
                <div className="w-full h-full bg-[#1A1A1A] rounded-t-[14px] p-1.5 sm:p-2 border-[2px] border-[#2A2A2A] shadow-xl flex flex-col overflow-hidden">
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-800 mx-auto mb-1 shrink-0" />
                    <div className="flex-1 rounded-[6px] bg-[#0A0D14] p-3 text-white overflow-hidden flex flex-col justify-between">
                        <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5 text-[8px] sm:text-[9px] font-mono text-neutral-400">
                            <span className="font-bold text-purple-400">DASHBOARD</span>
                            <span>LIVE 60FPS</span>
                        </div>
                        <div className="space-y-1 my-auto">
                            <div className="flex justify-between items-baseline">
                                <h4 className="font-bold text-[10px] sm:text-xs">Аналитика и CRM</h4>
                                <span className="text-[8px] text-emerald-400 font-mono">+28.4%</span>
                            </div>
                            <div className="w-full h-7 rounded bg-neutral-900 border border-neutral-800 p-1 flex items-end gap-1">
                                <div className="w-1/5 h-[40%] bg-purple-500 rounded-xs" />
                                <div className="w-1/5 h-[65%] bg-purple-500 rounded-xs" />
                                <div className="w-1/5 h-[50%] bg-purple-500 rounded-xs" />
                                <div className="w-1/5 h-[85%] bg-purple-400 rounded-xs" />
                                <div className="w-1/5 h-[100%] bg-emerald-400 rounded-xs" />
                            </div>
                        </div>
                        <div className="text-[6px] text-neutral-400 font-mono">03 // PLATFORM</div>
                    </div>
                </div>
                <div className="w-[108%] h-2 bg-gradient-to-b from-[#D1D5DB] via-[#9CA3AF] to-[#6B7280] rounded-b-md shadow-md flex justify-center">
                    <div className="w-12 h-1 bg-[#4B5563] rounded-b-sm" />
                </div>
            </div>

            <div className="absolute right-2 sm:right-4 bottom-0 w-[82px] sm:w-[94px] aspect-[9/19] bg-[#161616] rounded-[22px] p-1 border-[2px] border-[#383838] shadow-[0_20px_40px_rgba(0,0,0,0.35)] z-20 flex flex-col">
                <div className="w-5 h-1.5 bg-black rounded-full mx-auto my-0.5 shrink-0" />
                <div className="flex-1 rounded-[17px] bg-[#0A0D14] p-2 text-white overflow-hidden flex flex-col justify-between">
                    <div className="text-[6px] font-bold text-purple-400 flex justify-between">
                        <span>L/K</span>
                        <span className="text-emerald-400">ONLINE</span>
                    </div>
                    <div className="space-y-1.5 my-auto">
                        <div className="w-6 h-6 rounded-full bg-purple-600/30 border border-purple-500/50 mx-auto flex items-center justify-center text-[7px] font-bold">
                            User
                        </div>
                        <div className="p-1 rounded bg-neutral-900 text-[6px] text-center font-mono">
                            $14,250
                        </div>
                    </div>
                    <div className="w-6 h-0.5 bg-white/40 rounded-full mx-auto" />
                </div>
            </div>
        </div>
    );
}

// --- НАПРАВЛЕНИЯ РАЗРАБОТКИ ---
interface ServiceDirection {
    num: string;
    type: "basic" | "multi" | "platform";
    title: string;
    description: string;
    timeline: string;
    express: string;
    icon: React.ElementType;
    iconBg: string;
    iconColor: string;
    examples: string[];
}

const DIRECTIONS: ServiceDirection[] = [
    {
        num: "01",
        type: "basic",
        title: "Базовые сайты",
        description: "Для тех, кому нужно представить бизнес или услугу в интернете.",
        timeline: "до 7 дней",
        express: "3 дня",
        icon: AppWindow,
        iconBg: "bg-blue-50/80 border-blue-100/70",
        iconColor: "text-blue-500",
        examples: [
            "Сайт-визитка",
            "Лендинг для продукта или услуги",
            "Сайт специалиста или небольшого бизнеса",
        ],
    },
    {
        num: "02",
        type: "multi",
        title: "Многостраничные сайты",
        description: "Для компаний, которым нужно больше страниц и возможностей.",
        timeline: "14 дней",
        express: "7 дней",
        icon: LayoutGrid,
        iconBg: "bg-indigo-50/80 border-indigo-100/70",
        iconColor: "text-indigo-500",
        examples: [
            "Корпоративный сайт",
            "Сайт с блогом и новостями",
            "Сайт с формами заявок",
        ],
    },
    {
        num: "03",
        type: "platform",
        title: "Веб-платформы и приложения",
        description: "Для проектов с личными кабинетами, базами данных и сложной логикой.",
        timeline: "до 28 дней",
        express: "14 дней",
        icon: Boxes,
        iconBg: "bg-purple-50/80 border-purple-100/70",
        iconColor: "text-purple-500",
        examples: [
            "Веб-приложения и платформы",
            "Интернет-магазины с дополнительными функциями",
            "Онлайн-системы и панели управления",
        ],
    },
];

export default function WebDevPage() {
    const [viewMode, setViewMode] = useState<"preview" | "info">("preview");
    const [isRebooting, setIsRebooting] = useState(false);
    const [bootText, setBootText] = useState("INFO");

    // Плавная анимация: экран гаснет, показывается надпись, затем экран включается
    const switchModeWithBoot = (target: "preview" | "info") => {
        if (viewMode === target || isRebooting) return;

        setBootText(target === "info" ? "INFO" : "AUCAHACK");
        setIsRebooting(true);

        setTimeout(() => {
            setViewMode(target);
        }, 450);

        setTimeout(() => {
            setIsRebooting(false);
        }, 900);
    };

    return (
        <main className="max-w-[1544px] mx-auto px-6 sm:px-10 pt-28 pb-32 space-y-28 bg-white text-neutral-900 font-sans select-none">

            {/* Навигация */}
            <div className="flex items-center justify-between border-b border-neutral-200/80 pb-6">
                <Link
                    href="/#solutions"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-neutral-950 transition-colors group"
                >
                    <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Solutions // 01</span>
                </Link>

                <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-500 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>PRODUCTION READY</span>
                </div>
            </div>

            {/* ========================================================= */}
            {/* 1-Й ЭКРАН: Слева описание, справа интерактивный ноутбук  */}
            {/* ========================================================= */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center pt-2">

                {/* Левая колонка */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 font-mono text-[11.5px] uppercase tracking-wider">
                        <span>WEB ENGINEERING</span>
                        <span>•</span>
                        <span className="font-bold text-neutral-900">NEXT.JS 15</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-neutral-950 leading-[1.02]">
                        Сайты для продаж.
                    </h1>

                    <p className="text-neutral-600 text-[16.8px] sm:text-[18.9px] leading-relaxed font-normal">
                        Разрабатываем быстрые платформы и сайты на чистом коде. Без конструкторов и мусора: открытие за 1 секунду, высокая конверсия и стабильный прием платежей.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-2 font-mono text-[12.6px] text-neutral-600">
                        <div className="px-3.5 py-1.5 rounded-xl bg-neutral-50 border border-neutral-200">
                            КАЧЕСТВО: <span className="font-bold text-emerald-600">High</span>
                        </div>
                        <div className="px-3.5 py-1.5 rounded-xl bg-neutral-50 border border-neutral-200">
                            ДОГОВОР: <span className="font-bold text-neutral-900">FIXED PRICE</span>
                        </div>
                    </div>

                    <div className="pt-2">
                        <Link
                            href="/contacts"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-white font-mono text-[12.6px] uppercase tracking-wider font-bold transition-all shadow-md active:scale-95"
                        >
                            <span>Обсудить задачу</span>
                            <ArrowUpRight size={15} />
                        </Link>
                    </div>
                </div>

                {/* Правая колонка: ноутбук с эффектом выключения экрана и загрузкой INFO */}
                <div className="lg:col-span-7 flex flex-col items-center">

                    {/* Одиночный переключатель */}
                    <div className="inline-flex items-center gap-2 mb-5 p-2 rounded-2xl bg-neutral-100/90 border border-neutral-200 font-mono text-[12.6px] shadow-2xs">
                        <button
                            type="button"
                            onClick={() => switchModeWithBoot("preview")}
                            className={`px-5 py-2.5 rounded-xl font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                                viewMode === "preview" && !isRebooting
                                    ? "bg-white text-neutral-950 shadow-sm scale-[1.02]"
                                    : "text-neutral-500 hover:text-neutral-900"
                            }`}
                        >
                            AUCAHACK
                        </button>
                        <button
                            type="button"
                            onClick={() => switchModeWithBoot("info")}
                            className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                                viewMode === "info" && !isRebooting
                                    ? "bg-neutral-950 text-white shadow-sm scale-[1.02]"
                                    : "text-neutral-500 hover:text-neutral-900"
                            }`}
                        >
                            <Info size={14} />
                            <span>Info</span>
                        </button>
                    </div>

                    {/* Корпус ноутбука */}
                    <div className="relative w-full max-w-[690px] aspect-[16/10] bg-neutral-900 rounded-[24px] p-2.5 sm:p-3.5 border border-neutral-700/80 shadow-[0_30px_70px_rgba(0,0,0,0.22)] flex flex-col select-none">

                        {/* Верхняя кромка */}
                        <div className="h-4 flex items-center justify-between px-2 shrink-0">
                            <span className="text-[9.5px] font-mono text-neutral-500 uppercase tracking-wider">
                                aucahack.production.live
                            </span>
                            <div className="w-2 h-2 rounded-full bg-neutral-800" />
                            <span className="text-[9.5px] font-mono text-neutral-500">
                                {isRebooting ? "BOOTING..." : "PROD"}
                            </span>
                        </div>

                        {/* Экран дисплея */}
                        <div className="relative flex-1 rounded-[16px] bg-[#0A0D14] overflow-hidden shadow-inner flex flex-col justify-between">

                            {/* ================= ЭКРАН ГАСНЕТ: ЧЁРНЫЙ ФОН + НАДПИСЬ + СПИННЕР ================= */}
                            <div
                                className={`absolute inset-0 bg-[#07090E] z-30 flex flex-col items-center justify-center gap-4 transition-opacity duration-300 pointer-events-none ${
                                    isRebooting ? "opacity-100" : "opacity-0"
                                }`}
                            >
                                <div className="text-2xl sm:text-3xl font-black font-mono tracking-[0.25em] text-white">
                                    {bootText}
                                </div>

                                {/* Вращающийся спиннер увеличен на 20% */}
                                <Loader2 size={26} className="text-neutral-400 animate-spin" />
                            </div>

                            {/* ВИД 1: САЙТ AUCAHACK */}
                            <div
                                className={`absolute inset-0 bg-white text-neutral-900 p-6 sm:p-8 flex flex-col justify-between transition-opacity duration-300 ${
                                    viewMode === "preview" && !isRebooting
                                        ? "opacity-100 z-10 pointer-events-auto"
                                        : "opacity-0 z-0 pointer-events-none"
                                }`}
                            >
                                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                                    <div className="flex items-center gap-2 font-bold text-sm tracking-tight text-neutral-950">
                                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                                        <span>AUCAHACK</span>
                                    </div>
                                    <span className="font-mono text-[10.5px] uppercase text-neutral-400">
                                        Student Portal & Schedule
                                    </span>
                                </div>

                                <div className="space-y-3 py-4">
                                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-neutral-100 font-mono text-[10.5px] text-neutral-600 font-bold uppercase">
                                        4.2 ms response
                                    </span>
                                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-neutral-950">
                                        Цифровой портал университета
                                    </h3>
                                    <p className="text-neutral-500 text-[12.6px] sm:text-[14.7px] max-w-md leading-relaxed">
                                        Рейтинги профессоров, база материалов и умный планировщик расписания.
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-neutral-100 font-mono text-[10.5px]">
                                    {["Next.js 15", "FastAPI", "PostgreSQL"].map((b, i) => (
                                        <span key={i} className="px-2 py-0.5 rounded bg-neutral-50 border border-neutral-200 text-neutral-700">
                                            {b}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* ВИД 2: ОКНО INFO (ВЫПОЛНЕННЫЕ РАБОТЫ) */}
                            <div
                                className={`absolute inset-0 bg-white text-neutral-950 flex flex-col justify-between transition-opacity duration-300 ${
                                    viewMode === "info" && !isRebooting
                                        ? "opacity-100 z-10 pointer-events-auto"
                                        : "opacity-0 z-0 pointer-events-none"
                                }`}
                            >
                                <div className="h-10 bg-neutral-50 border-b border-neutral-200 px-4 sm:px-6 flex items-center justify-between shrink-0">
                                    <span className="text-[11.5px] font-mono font-bold text-neutral-700">
                                        AUCAHACK // Выполненные работы
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => switchModeWithBoot("preview")}
                                        className="text-[13px] font-mono font-bold text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer"
                                    >
                                        Назад ✕
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-4 scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent">
                                    <div>
                                        <div className="flex items-baseline gap-2.5">
                                            <span className="font-mono text-[15px] font-bold text-neutral-400">01</span>
                                            <h4 className="text-[17px] font-bold text-neutral-950 leading-snug">
                                                Умный планировщик расписания
                                            </h4>
                                        </div>
                                        <p className="text-[14px] text-neutral-500 leading-relaxed mt-0.5 pl-7">
                                            Алгоритм автоматической компоновки курсов: исключает пересечения по времени, рассчитывает учебную нагрузку по кредитам и экспортирует готовый календарь.
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-baseline gap-2.5">
                                            <span className="font-mono text-[15px] font-bold text-neutral-400">02</span>
                                            <h4 className="text-[17px] font-bold text-neutral-950 leading-snug">
                                                Система рейтингов профессоров и тьюторов
                                            </h4>
                                        </div>
                                        <p className="text-[14px] text-neutral-500 leading-relaxed mt-0.5 pl-7">
                                            Анонимная верифицированная база оценок преподавателей, детальные отзывы по предметам и рекомендации по учебным ассистентам (WARC).
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-baseline gap-2.5">
                                            <span className="font-mono text-[15px] font-bold text-neutral-400">03</span>
                                            <h4 className="text-[17px] font-bold text-neutral-950 leading-snug">
                                                Мгновенная скорость отклика 4.2 мс
                                            </h4>
                                        </div>
                                        <p className="text-[14px] text-neutral-500 leading-relaxed mt-0.5 pl-7">
                                            Многоуровневое кэширование запросов и оптимизация базы данных для стабильной и плавной работы в пиковые часы выбора курсов.
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-baseline gap-2.5">
                                            <span className="font-mono text-[15px] font-bold text-neutral-400">04</span>
                                            <h4 className="text-[17px] font-bold text-neutral-950 leading-snug">
                                                Централизованная база учебных материалов
                                            </h4>
                                        </div>
                                        <p className="text-[14px] text-neutral-500 leading-relaxed mt-0.5 pl-7">
                                            Каталог лекций, силлабусов и проверочных заданий с быстрым поиском по факультетам, курсам и семестрам.
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-baseline gap-2.5">
                                            <span className="font-mono text-[15px] font-bold text-neutral-400">05</span>
                                            <h4 className="text-[17px] font-bold text-neutral-950 leading-snug">
                                                Интерактивный калькулятор GPA
                                            </h4>
                                        </div>
                                        <p className="text-[14px] text-neutral-500 leading-relaxed mt-0.5 pl-7">
                                            Динамический расчет текущего и целевого среднего балла с учетом шкал оценивания университета и симуляцией будущих оценок.
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-baseline gap-2.5">
                                            <span className="font-mono text-[15px] font-bold text-neutral-400">06</span>
                                            <h4 className="text-[17px] font-bold text-neutral-950 leading-snug">
                                                Персонализация и дизайн-система
                                            </h4>
                                        </div>
                                        <p className="text-[14px] text-neutral-500 leading-relaxed mt-0.5 pl-7">
                                            Поддержка контрастных тем оформления, адаптивная мобильная версия и быстрый доступ к ключевым инструментам без авторизации.
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-baseline gap-2.5">
                                            <span className="font-mono text-[15px] font-bold text-neutral-400">07</span>
                                            <h4 className="text-[17px] font-bold text-neutral-950 leading-snug">
                                                Безопасность и отказоустойчивость
                                            </h4>
                                        </div>
                                        <p className="text-[14px] text-neutral-500 leading-relaxed mt-0.5 pl-7">
                                            Защита от спама и накруток при модерации отзывов, шифрование пользовательских данных и бесперебойная работа серверов.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Выемка */}
                        <div className="h-1.5 w-16 bg-neutral-700 rounded-b-md mx-auto mt-1" />
                    </div>

                    {/* Подставка */}
                    <div className="w-[85%] h-2 bg-gradient-to-b from-neutral-300 to-neutral-400 rounded-b-xl shadow-md" />
                </div>

            </section>

            {/* ========================================================= */}
            {/* 2-Й ЭКРАН: 02 / НАШИ НАПРАВЛЕНИЯ                          */}
            {/* ========================================================= */}
            <section className="space-y-12 pt-4">

                <div className="space-y-3 max-w-3xl">
                    <div className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                        02 / НАШИ НАПРАВЛЕНИЯ
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 leading-[1.15]">
                        Мы создаём сайты <br />
                        любого уровня сложности
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
                    {DIRECTIONS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.num}
                                className="bg-neutral-50/70 hover:bg-neutral-50 rounded-[32px] border border-neutral-200/80 p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:border-neutral-300"
                            >
                                <div className="space-y-5">
                                    <div className="flex items-center justify-between">
                                        <div className={`w-12 h-12 rounded-[18px] border flex items-center justify-center ${item.iconBg} ${item.iconColor}`}>
                                            <Icon size={22} strokeWidth={2} />
                                        </div>
                                        <span className="font-mono text-xs font-bold text-neutral-400">
                                            {item.num}
                                        </span>
                                    </div>

                                    <div className="space-y-1.5">
                                        <h3 className="text-2xl font-bold tracking-tight text-neutral-900">
                                            {item.title}
                                        </h3>
                                        <p className="text-neutral-500 text-[16.2px] leading-relaxed min-h-[46px]">
                                            {item.description}
                                        </p>
                                    </div>

                                    <div className="p-3.5 rounded-xl bg-white border border-neutral-200/80 flex items-center justify-between text-[13.2px] font-mono">
                                        <span className="text-neutral-400">Срок:</span>
                                        <span className="font-bold text-neutral-950">
                                            {item.timeline} <span className="font-normal text-neutral-500">(срочно: {item.express})</span>
                                        </span>
                                    </div>

                                    <div className="pt-2">
                                        <div className="rounded-2xl bg-white border border-neutral-200/90 shadow-xs p-3 overflow-hidden">
                                            <DevicePairMockup type={item.type} />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-neutral-200/70 space-y-3 mt-6">
                                    <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider font-semibold block">
                                        Примеры:
                                    </span>
                                    <ul className="space-y-2 text-[14.5px] sm:text-[15.8px] text-neutral-600">
                                        {item.examples.map((ex, idx) => (
                                            <li key={idx} className="flex items-start gap-2.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60 mt-2 shrink-0" />
                                                <span className="leading-snug">{ex}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="p-5 rounded-2xl bg-neutral-50/70 border border-neutral-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[14.5px] font-mono">
                    <div className="flex items-center gap-2.5 text-neutral-800">
                        <Flame size={18} className="text-amber-500 shrink-0" />
                        <span>Ускоренная разработка без очереди: лендинг — 3 дня, корпоративный — 7 дней, платформа — 14 дней</span>
                    </div>
                    <span className="font-bold text-neutral-950 bg-white border border-neutral-200 px-3.5 py-1.5 rounded-xl w-fit shadow-xs shrink-0">
                        +20% К СТОИМОСТИ
                    </span>
                </div>
            </section>

            {/* ========================================================= */}
            {/* 3-Й ЭКРАН: 03 / ПРЕИМУЩЕСТВА                               */}
            {/* ========================================================= */}
            <section className="space-y-10 pt-4">

                <div className="space-y-3 max-w-3xl">
                    <div className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                        03 / ПРЕИМУЩЕСТВА
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 leading-[1.12]">
                        Что вы получаете
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7">

                    {/* КАРТОЧКА 1: Удобно везде */}
                    <div className="rounded-[28px] bg-neutral-50/70 border border-neutral-200/80 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-neutral-300 transition-all">
                        <div className="space-y-3 flex-1 min-w-[200px]">
                            <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100/80 flex items-center justify-center text-emerald-600">
                                <Smartphone size={22} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-neutral-950">
                                Удобно везде
                            </h3>
                            <p className="text-neutral-500 text-[16.2px] leading-relaxed">
                                Сайт работает на телефонах, планшетах и компьютерах.
                            </p>
                        </div>

                        <div className="relative w-full sm:w-[300px] h-[152px] flex items-end justify-center select-none shrink-0 overflow-visible">
                            <div className="relative w-[178px] aspect-[16/10] -mr-10 mb-0.5 flex flex-col items-center">
                                <div className="w-full h-full bg-[#1A1A1A] rounded-t-md p-1 border border-[#2A2A2A] shadow-sm flex flex-col overflow-hidden">
                                    <div className="flex-1 rounded-xs bg-white p-1.5 flex flex-col justify-between">
                                        <div className="text-[7px] font-bold text-neutral-800">Better Solutions</div>
                                        <div className="h-6.5 rounded-xs bg-neutral-100" />
                                    </div>
                                </div>
                                <div className="w-[106%] h-1.5 bg-neutral-400 rounded-b" />
                            </div>

                            <div className="relative w-[81px] aspect-[3/4] -mr-4.5 z-10 bg-[#1A1A1A] rounded-md p-0.5 border border-neutral-700 shadow-md">
                                <div className="w-full h-full rounded-xs bg-white p-1 flex flex-col justify-between">
                                    <div className="text-[6px] font-bold text-neutral-800">Business</div>
                                    <div className="h-7.5 rounded-xs bg-neutral-100" />
                                </div>
                            </div>

                            <div className="relative w-[51px] aspect-[9/19] z-20 bg-[#1A1A1A] rounded-lg p-0.5 border border-neutral-700 shadow-xl">
                                <div className="w-full h-full rounded-md bg-white p-0.5 flex flex-col justify-between">
                                    <div className="w-2.5 h-0.5 bg-black rounded-full mx-auto" />
                                    <div className="h-6.5 rounded-xs bg-neutral-100 my-auto" />
                                    <div className="w-2.5 h-0.5 bg-neutral-400 rounded-full mx-auto" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* КАРТОЧКА 2: Быстрая работа */}
                    <div className="rounded-[28px] bg-neutral-50/70 border border-neutral-200/80 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-neutral-300 transition-all">
                        <div className="space-y-3 flex-1 min-w-[200px]">
                            <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100/80 flex items-center justify-center text-emerald-600">
                                <Zap size={22} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-neutral-950">
                                Быстрая работа
                            </h3>
                            <p className="text-neutral-500 text-[16.2px] leading-relaxed">
                                Оптимизируем загрузку и работу страниц.
                            </p>
                        </div>

                        <div className="relative w-full sm:w-[300px] h-[152px] flex items-center justify-center gap-3 select-none shrink-0">
                            <div className="p-3.5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm flex flex-col items-center justify-center text-center space-y-1.5 w-[136px] shrink-0 z-10">
                                <div className="relative w-[60px] h-[60px] rounded-full border-4 border-emerald-500 flex items-center justify-center font-extrabold text-[17px] text-emerald-600">
                                    98
                                </div>
                                <span className="text-[10px] font-mono text-neutral-700 leading-tight font-bold">
                                    Высокая скорость загрузки
                                </span>
                            </div>

                            <div className="w-[152px] h-[118px] rounded-xl bg-white border border-neutral-200/90 shadow-2xs p-2.5 flex flex-col justify-between -ml-3.5">
                                <div className="flex items-center gap-1 border-b border-neutral-100 pb-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                </div>
                                <div className="h-17 flex items-end">
                                    <svg viewBox="0 0 100 40" className="w-full h-full text-emerald-500">
                                        <path
                                            d="M0,35 Q25,30 45,18 T90,8 T100,6 L100,40 L0,40 Z"
                                            fill="rgba(16, 185, 129, 0.12)"
                                        />
                                        <path
                                            d="M0,35 Q25,30 45,18 T90,8 T100,6"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* КАРТОЧКА 3: Готовность к Google */}
                    <div className="rounded-[28px] bg-neutral-50/70 border border-neutral-200/80 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-neutral-300 transition-all">
                        <div className="space-y-3 flex-1 min-w-[200px]">
                            <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100/80 flex items-center justify-center text-emerald-600">
                                <Search size={22} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-neutral-950">
                                Готовность к Google
                            </h3>
                            <p className="text-neutral-500 text-[16.2px] leading-relaxed">
                                Заккладываем техническую основу для поискового продвижения.
                            </p>
                        </div>

                        <div className="relative w-full sm:w-[300px] h-[152px] flex items-center justify-center select-none shrink-0">
                            <div className="w-full max-w-[268px] p-4 rounded-2xl bg-white border border-neutral-200/90 shadow-sm space-y-2.5">
                                <span className="text-[13px] font-bold text-[#4285F4]">
                                    G<span className="text-[#EA4335]">o</span><span className="text-[#FBBC05]">o</span><span className="text-[#4285F4]">g</span><span className="text-[#34A853]">l</span><span className="text-[#EA4335]">e</span>
                                </span>
                                <div className="flex items-center justify-between px-3 py-1.5 rounded-full border border-neutral-200 text-[11.5px] text-neutral-600 bg-neutral-50">
                                    <span>ваш сайт</span>
                                    <Search size={12} className="text-neutral-400" />
                                </div>
                                <div className="space-y-1.5">
                                    <div className="w-3/5 h-2 rounded bg-blue-500" />
                                    <div className="w-full h-1.5 rounded bg-neutral-200" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* КАРТОЧКА 4: Контроль качества */}
                    <div className="rounded-[28px] bg-neutral-50/70 border border-neutral-200/80 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-neutral-300 transition-all">
                        <div className="space-y-3 flex-1 min-w-[200px]">
                            <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100/80 flex items-center justify-center text-emerald-600">
                                <ShieldCheck size={22} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-neutral-950">
                                Контроль качества
                            </h3>
                            <p className="text-neutral-500 text-[16.2px] leading-relaxed">
                                Проверяем сайт перед запуском и исправляем выявленные ошибки.
                            </p>
                        </div>

                        <div className="relative w-full sm:w-[300px] h-[152px] flex items-center justify-center select-none shrink-0">
                            <div className="w-full max-w-[258px] p-4 rounded-2xl bg-[#111827] text-white shadow-lg space-y-2">
                                {[
                                    "Адаптивность",
                                    "Скорость",
                                    "SEO",
                                    "Функционал",
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-[12.6px]">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                                                <Check size={9} strokeWidth={3} />
                                            </div>
                                            <span className="text-neutral-300 font-medium">{item}</span>
                                        </div>
                                        {idx === 3 && (
                                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[9.5px]">
                                                Готово
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* ========================================================= */}
            {/* 4-Й ЭКРАН: 04 / ПРОЦЕСС — НА ВСЮ ШИРИНУ                    */}
            {/* ========================================================= */}
            <section className="space-y-8 pt-4">
                <div className="space-y-3 max-w-3xl">
                    <div className="flex items-center gap-2.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-mono text-xs font-semibold">
                            04
                        </span>
                        <span className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">
                            Процесс — как всё происходит
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 leading-[1.12]">
                        От идеи до готового сайта.
                    </h2>
                </div>

                <div className="rounded-[32px] bg-white border border-neutral-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.02)] p-8 sm:p-12 divide-y divide-neutral-100">

                    {/* 01 Обсуждаем */}
                    <div className="pb-8 space-y-1.5">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-neutral-400 font-semibold">01</span>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                                Обсуждаем
                            </h3>
                        </div>
                        <p className="text-neutral-500 text-[15.4px] sm:text-[16.5px] leading-relaxed pl-7">
                            Вы рассказываете, что вам нужно.
                        </p>
                    </div>

                    {/* 02 Планируем */}
                    <div className="py-8 space-y-1.5">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-neutral-400 font-semibold">02</span>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                                Планируем
                            </h3>
                        </div>
                        <p className="text-neutral-500 text-[15.4px] sm:text-[16.5px] leading-relaxed pl-7">
                            Согласовываем дизайн, сроки и стоимость.
                        </p>
                    </div>

                    {/* 03 Разрабатываем */}
                    <div className="py-8 space-y-1.5">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-neutral-400 font-semibold">03</span>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                                Разрабатываем
                            </h3>
                        </div>
                        <p className="text-neutral-500 text-[15.4px] sm:text-[16.5px] leading-relaxed pl-7">
                            Создаём сайт и проверяем его.
                        </p>
                    </div>

                    {/* 04 Запускаем */}
                    <div className="py-8 space-y-1.5">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-neutral-400 font-semibold">04</span>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                                Запускаем
                            </h3>
                        </div>
                        <p className="text-neutral-500 text-[15.4px] sm:text-[16.5px] leading-relaxed pl-7">
                            Публикуем сайт в интернете.
                        </p>
                    </div>

                    {/* 05 Гарантируем */}
                    <div className="pt-8 space-y-1.5">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-emerald-600 font-semibold">05</span>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                                Гарантируем
                            </h3>
                        </div>
                        <p className="text-neutral-500 text-[15.4px] sm:text-[16.5px] leading-relaxed pl-7">
                            30 дней устраняем любые ошибки.
                        </p>
                    </div>

                </div>
            </section>

            {/* ========================================================= */}
            {/* 5-Й ЭКРАН: 05 / НАШИ ГАРАНТИИ (ГОРИЗОНТАЛЬНЫЙ ТЕКСТ)        */}
            {/* ========================================================= */}
            <section className="space-y-10 pt-4">
                <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-mono text-xs font-semibold">
                        05
                    </span>
                    <span className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">
                        Наши гарантии
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 divide-y md:divide-y-0 md:divide-x divide-neutral-200/80">

                    {/* 1 */}
                    <div className="group pt-6 md:pt-0 md:pr-8 transition-transform duration-300">
                        <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-black tracking-tight text-neutral-950 leading-[1.12]">
                            100% качество. <br />
                            <span className="text-neutral-400 font-bold group-hover:text-neutral-600 transition-colors">
                                или вернем всю сумму
                            </span>
                        </h3>
                    </div>

                    {/* 2 */}
                    <div className="group pt-8 md:pt-0 md:px-8 transition-transform duration-300">
                        <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-black tracking-tight text-neutral-950 leading-[1.14]">
                            Передаем вам <br className="hidden lg:inline" />
                            весь исходный код. <br />
                            <span className="text-neutral-400 font-bold group-hover:text-neutral-600 transition-colors">
                                Проект на 100% принадлежит вам.
                            </span>
                        </h3>
                    </div>

                    {/* 3 */}
                    <div className="group pt-8 md:pt-0 md:pl-8 transition-transform duration-300">
                        <h3 className="text-2xl sm:text-3xl lg:text-[28px] font-black tracking-tight text-neutral-950 leading-[1.18]">
                            Мы ошиблись в оценке <br className="hidden lg:inline" />
                            или задача оказалась сложнее — <br />
                            <span className="text-neutral-400 font-bold group-hover:text-neutral-600 transition-colors">
                                цена абсолютно не меняется.
                            </span>
                        </h3>
                    </div>

                </div>
            </section>

            {/* ========================================================= */}
            {/* 6-Й ЭКРАН: Финальный CTA                                 */}
            {/* ========================================================= */}
            <section className="bg-neutral-950 text-white rounded-[32px] p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
                <div className="space-y-2 text-center lg:text-left">
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                        Создадим сайт с гарантией по договору
                    </h2>
                    <p className="text-neutral-400 text-xs sm:text-sm">
                        Фиксированная цена, передача 100% исходного кода и соблюдение сроков.
                    </p>
                </div>

                <Link
                    href="/contacts"
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 font-mono text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 shrink-0"
                >
                    <span>Обсудить разработку</span>
                    <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
            </section>

        </main>
    );
}