"use client";

import React, { useState } from "react";
import { Link } from "@/i18n/navigation";
import {
    ArrowLeft,
    ArrowUpRight,
    Search,
    Gauge,
    FileCode2,
    TrendingUp,
    ShieldCheck,
    Check,
    Info,
    Flame,
    Globe2,
    Loader2,
    Layers,
    Cpu,
    Target,
} from "lucide-react";
import { useTr } from "@/i18n/tr";

// --- КОМПОНЕНТ ДЛЯ 2-ГО ЭКРАНА (МОКАПЫ УСТРОЙСТВ ДЛЯ SEO) ---
function SeoDevicePairMockup({ type }: { type: "tech" | "content" | "local" }) {
    const tr = useTr();
    if (type === "tech") {
        return (
            <div className="relative w-full h-[220px] sm:h-[240px] flex items-end justify-center  pt-2">
                <div className="relative w-[78%] sm:w-[74%] aspect-[16/10] mr-[14%] flex flex-col items-center">
                    <div className="w-full h-full bg-[#1A1A1A] rounded-t-[14px] p-1.5 sm:p-2 border-[2px] border-[#2A2A2A] shadow-xl flex flex-col overflow-hidden">
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-800 mx-auto mb-1 shrink-0" />
                        <div className="flex-1 rounded-md bg-ink-strong p-3 text-white overflow-hidden flex flex-col justify-between border border-neutral-800">
                            <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5 text-[8px] sm:text-[9px] font-mono text-content-subtle">
                                <span className="font-bold text-accent-bright">{tr("PAGESPEED CORE")}</span>
                                <span className="text-accent-bright">{tr("PERFORMANCE 100%")}</span>
                            </div>
                            <div className="grid grid-cols-12 gap-2 items-center my-auto">
                                <div className="col-span-7 space-y-1">
                                    <span className="text-[7px] font-mono text-blue-400 uppercase tracking-wider">
                                        {tr("VITALS PASSED")}
                                    </span>
                                    <h4 className="font-bold text-[10px] sm:text-xs text-white leading-tight">
                                        {tr("LCP: 0.8s • CLS: 0.00")}
                                    </h4>
                                    <p className="text-[7px] sm:text-[8px] text-content-subtle line-clamp-2">
                                        {tr("Критический CSS внедрен, бандлы минифицированы, чистый SSR.")}
                                    </p>
                                </div>
                                <div className="col-span-5 h-14 sm:h-16 rounded bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center">
                                    <span className="text-accent-bright font-mono font-black text-sm sm:text-base">100</span>
                                    <span className="text-[6px] font-mono text-content-subtle">{tr("MOBILE AUDIT")}</span>
                                </div>
                            </div>
                            <div className="text-[6px] text-content-muted font-mono">{tr("01 // CORE WEB VITALS")}</div>
                        </div>
                    </div>
                    <div className="w-[108%] h-2 bg-gradient-to-b from-[#D1D5DB] via-[#9CA3AF] to-[#6B7280] rounded-b-md shadow-md flex justify-center">
                        <div className="w-12 h-1 bg-[#4B5563] rounded-b-sm" />
                    </div>
                </div>

                <div className="absolute right-2 sm:right-4 bottom-0 w-[82px] sm:w-[94px] aspect-[9/19] bg-[#161616] rounded-3xl p-1 border-[2px] border-[#383838] shadow-[0_20px_40px_rgba(0,0,0,0.35)] z-20 flex flex-col">
                    <div className="w-5 h-1.5 bg-black rounded-full mx-auto my-0.5 shrink-0" />
                    <div className="flex-1 rounded-2xl bg-ink-strong p-2 text-white overflow-hidden flex flex-col justify-between border border-neutral-800">
                        <div className="text-[6px] font-mono text-accent-bright flex justify-between">
                            <span>{tr("CWV")}</span>
                            <span>{tr("PASS")}</span>
                        </div>
                        <div className="space-y-1 my-auto text-center">
                            <div className="w-8 h-8 rounded-full border-2 border-accent mx-auto flex items-center justify-center font-mono font-bold text-[10px] text-accent-bright">
                                99
                            </div>
                            <span className="text-[6.5px] font-mono block text-neutral-300">{tr("Fast Render")}</span>
                        </div>
                        <div className="w-6 h-0.5 bg-neutral-600 rounded-full mx-auto" />
                    </div>
                </div>
            </div>
        );
    }

    if (type === "content") {
        return (
            <div className="relative w-full h-[220px] sm:h-[240px] flex items-end justify-center  pt-2">
                <div className="relative w-[78%] sm:w-[74%] aspect-[16/10] mr-[14%] flex flex-col items-center">
                    <div className="w-full h-full bg-[#1A1A1A] rounded-t-[14px] p-1.5 sm:p-2 border-[2px] border-[#2A2A2A] shadow-xl flex flex-col overflow-hidden">
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-800 mx-auto mb-1 shrink-0" />
                        <div className="flex-1 rounded-md bg-[#FAF8F5] p-3 text-content overflow-hidden flex flex-col justify-between border border-line/50">
                            <div className="flex items-center justify-between border-b border-line/60 pb-1.5 text-[8px] sm:text-[9px] font-sans text-content-muted">
                                <span className="font-bold text-content">{tr("Google SERP")}</span>
                                <div className="flex gap-1.5 text-blue-600 font-mono">
                                    <span>{tr("TOP-1")}</span>
                                    <span>{tr("TOP-3")}</span>
                                </div>
                            </div>
                            <div className="space-y-1 my-auto">
                                <span className="text-[7px] font-mono text-accent uppercase tracking-wider font-semibold">
                                    {tr("ORGANIC TRAFFIC +340%")}
                                </span>
                                <div className="p-1.5 rounded bg-white border border-line space-y-0.5">
                                    <div className="text-[8.5px] font-bold text-blue-700 leading-tight">
                                        {tr("Разработка CRM систем в Бишкеке | Vital Tech")}
                                    </div>
                                    <div className="text-[6.5px] text-content-muted line-clamp-1">
                                        {tr("https://vitaltech.kg/solutions/crm • Проектирование и запуск веб-платформ...")}
                                    </div>
                                </div>
                            </div>
                            <div className="text-[6px] text-content-subtle font-mono">{tr("02 // SEMANTIC CORE")}</div>
                        </div>
                    </div>
                    <div className="w-[108%] h-2 bg-gradient-to-b from-[#D1D5DB] via-[#9CA3AF] to-[#6B7280] rounded-b-md shadow-md flex justify-center">
                        <div className="w-12 h-1 bg-[#4B5563] rounded-b-sm" />
                    </div>
                </div>

                <div className="absolute right-2 sm:right-4 bottom-0 w-[82px] sm:w-[94px] aspect-[9/19] bg-[#161616] rounded-3xl p-1 border-[2px] border-[#383838] shadow-[0_20px_40px_rgba(0,0,0,0.35)] z-20 flex flex-col">
                    <div className="w-5 h-1.5 bg-black rounded-full mx-auto my-0.5 shrink-0" />
                    <div className="flex-1 rounded-2xl bg-[#FAF8F5] p-2 text-content overflow-hidden flex flex-col justify-between border border-line">
                        <div className="text-[6px] font-bold text-blue-600 flex justify-between">
                            <span>{tr("SERP #1")}</span>
                            <span>★ 5.0</span>
                        </div>
                        <div className="space-y-1 my-auto">
                            <div className="h-2 w-full bg-blue-600 rounded-xs" />
                            <div className="h-1.5 w-4/5 bg-neutral-300 rounded-xs" />
                            <div className="h-1.5 w-3/5 bg-neutral-200 rounded-xs" />
                        </div>
                        <div className="w-6 h-0.5 bg-neutral-900 rounded-full mx-auto" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-[220px] sm:h-[240px] flex items-end justify-center  pt-2">
            <div className="relative w-[78%] sm:w-[74%] aspect-[16/10] mr-[14%] flex flex-col items-center">
                <div className="w-full h-full bg-[#1A1A1A] rounded-t-[14px] p-1.5 sm:p-2 border-[2px] border-[#2A2A2A] shadow-xl flex flex-col overflow-hidden">
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-800 mx-auto mb-1 shrink-0" />
                    <div className="flex-1 rounded-md bg-[#0E1726] p-3 text-white overflow-hidden flex flex-col justify-between">
                        <div className="flex items-center justify-between border-b border-white/10 pb-1.5 text-[8px] sm:text-[9px] font-mono text-neutral-300">
                            <span className="font-bold text-blue-400">{tr("GEO INTENT")}</span>
                            <span className="text-accent-bright">{tr("GOOGLE MAPS VERIFIED")}</span>
                        </div>
                        <div className="space-y-1.5 my-auto">
                            <div className="flex justify-between items-baseline">
                                <h4 className="font-bold text-[10px] sm:text-xs">{tr("Локальное присутствие")}</h4>
                                <span className="text-[8px] text-accent-bright font-mono">{tr("Карты & 2GIS")}</span>
                            </div>
                            <div className="p-1.5 rounded bg-white/5 border border-white/10 text-[7px] space-y-1">
                                <div className="text-neutral-300 font-medium">{tr("Bishkek, Kyrgyzstan • Точный гео-таргет")}</div>
                                <div className="text-[6.5px] text-content-subtle">{tr("Микроразметка LocalBusiness + Schema.org")}</div>
                            </div>
                        </div>
                        <div className="text-[6px] text-content-subtle font-mono">{tr("03 // REGIONAL RANKING")}</div>
                    </div>
                </div>
                <div className="w-[108%] h-2 bg-gradient-to-b from-[#D1D5DB] via-[#9CA3AF] to-[#6B7280] rounded-b-md shadow-md flex justify-center">
                    <div className="w-12 h-1 bg-[#4B5563] rounded-b-sm" />
                </div>
            </div>

            <div className="absolute right-2 sm:right-4 bottom-0 w-[82px] sm:w-[94px] aspect-[9/19] bg-[#161616] rounded-3xl p-1 border-[2px] border-[#383838] shadow-[0_20px_40px_rgba(0,0,0,0.35)] z-20 flex flex-col">
                <div className="w-5 h-1.5 bg-black rounded-full mx-auto my-0.5 shrink-0" />
                <div className="flex-1 rounded-2xl bg-[#0E1726] p-2 text-white overflow-hidden flex flex-col justify-between">
                    <div className="text-[6px] font-mono text-blue-400 flex justify-between">
                        <span>{tr("MAPS")}</span>
                        <span className="text-accent-bright">{tr("#1 PIN")}</span>
                    </div>
                    <div className="space-y-1.5 my-auto text-center">
                        <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400/40 mx-auto flex items-center justify-center text-[8px]">
                            📍
                        </div>
                        <div className="text-[6px] text-neutral-300 font-mono">
                            {tr("Geo-Audience")}
                        </div>
                    </div>
                    <div className="w-6 h-0.5 bg-white/40 rounded-full mx-auto" />
                </div>
            </div>
        </div>
    );
}

// --- НАПРАВЛЕНИЯ SEO-РАЗРАБОТКИ ---
interface SeoDirection {
    num: string;
    type: "tech" | "content" | "local";
    title: string;
    description: string;
    timeline: string;
    express: string;
    icon: React.ElementType;
    iconBg: string;
    iconColor: string;
    examples: string[];
}

const SEO_DIRECTIONS: SeoDirection[] = [
    {
        num: "01",
        type: "tech",
        title: "Техническое SEO и Core Web Vitals",
        description: "Ускорение сайта до 95+ баллов, устранение технических барьеров для роботов.",
        timeline: "до 7 дней",
        express: "3 дня",
        icon: Gauge,
        iconBg: "bg-accent-soft/80 border-accent-soft/70",
        iconColor: "text-accent",
        examples: [
            "Оптимизация LCP, CLS, INP под стандарты Google",
            "Настройка robots.txt, sitemap.xml, canonical",
            "Устранение 404 ошибок и дублей страниц",
        ],
    },
    {
        num: "02",
        type: "content",
        title: "Семантическое ядро и структура",
        description: "Охват целевых поисковых запросов и проектирование посадочных страниц.",
        timeline: "14 дней",
        express: "7 дней",
        icon: Search,
        iconBg: "bg-blue-50/80 border-blue-100/70",
        iconColor: "text-blue-500",
        examples: [
            "Сбор низко- и среднечастотных ключевых фраз",
            "Кластеризация семантики и LSI-копирайтинг",
            "Оптимизация метатегов (Title, Description, H1-H3)",
        ],
    },
    {
        num: "03",
        type: "local",
        title: "Комплексный вывод в ТОП и локальное SEO",
        description: "Доминирование по целевому региону, микроразметка Schema.org и карты.",
        timeline: "до 28 дней",
        express: "14 дней",
        icon: Globe2,
        iconBg: "bg-purple-50/80 border-purple-100/70",
        iconColor: "text-purple-500",
        examples: [
            "Микроразметка Schema.org (JSON-LD Rich Snippets)",
            "Регистрация и оптимизация в Google Maps и 2GIS",
            "Анализ конкурентов и стратегия белых обратных ссылок",
        ],
    },
];

export default function SeoOptimizationPage() {
    const tr = useTr();
    const [viewMode, setViewMode] = useState<"preview" | "info">("preview");
    const [isRebooting, setIsRebooting] = useState(false);
    const [bootText, setBootText] = useState("INFO");

    const switchModeWithBoot = (target: "preview" | "info") => {
        if (viewMode === target || isRebooting) return;

        setBootText(target === "info" ? "INFO" : "AUDIT");
        setIsRebooting(true);

        setTimeout(() => {
            setViewMode(target);
        }, 450);

        setTimeout(() => {
            setIsRebooting(false);
        }, 900);
    };

    return (
        <main className="max-w-[1544px] mx-auto px-6 sm:px-10 pt-28 pb-32 space-y-28 bg-white text-content font-sans ">

            {/* Навигация */}
            <div className="flex items-center justify-between border-b border-line/80 pb-6">
                <Link
                    href="/#solutions"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-content-muted hover:text-content transition-colors group"
                >
                    <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
                    <span>{tr("Solutions // 06")}</span>
                </Link>

                <div className="flex items-center gap-2 font-mono text-[11px] text-content-muted uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span>{tr("ALGORITHM READY")}</span>
                </div>
            </div>

            {/* ========================================================= */}
            {/* 1-Й ЭКРАН: Слева описание, справа интерактивный ноутбук  */}
            {/* ========================================================= */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center pt-2">

                {/* Левая колонка */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-muted border border-line text-neutral-700 font-mono text-[11.5px] uppercase tracking-wider">
                        <span>{tr("SEARCH OPTIMIZATION")}</span>
                        <span>•</span>
                        <span className="font-bold text-content">{tr("WHITE-HAT ONLY")}</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-content leading-[1.02]">
                        {tr("Сайты для топа.")}
                    </h1>

                    <p className="text-content-secondary text-[16.8px] sm:text-[18.9px] leading-relaxed font-normal">
                        {tr("Превращаем ресурс в лидогенератор за счет чистой технической базы и семантики. Никаких серых накруток: загрузка за 0.8с, расширенные сниппеты и реальные заявки из Google.")}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-2 font-mono text-[12.6px] text-content-secondary">
                        <div className="px-3.5 py-1.5 rounded-xl bg-neutral-50 border border-line">
                            {tr("PAGESPEED:")} <span className="font-bold text-accent">95–100</span>
                        </div>
                        <div className="px-3.5 py-1.5 rounded-xl bg-neutral-50 border border-line">
                            {tr("ДОГОВОР:")} <span className="font-bold text-content">{tr("FIXED PRICE")}</span>
                        </div>
                    </div>

                    <div className="pt-2">
                        <Link
                            href="/contacts"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-ink hover:bg-ink-strong text-white font-mono text-[12.6px] uppercase tracking-wider font-bold transition-all shadow-md active:scale-95"
                        >
                            <span>{tr("Заказать аудит")}</span>
                            <ArrowUpRight size={15} />
                        </Link>
                    </div>
                </div>

                {/* Правая колонка: ноутбук с переключением AUDIT / INFO */}
                <div className="lg:col-span-7 flex flex-col items-center">

                    <div className="inline-flex items-center gap-2 mb-5 p-2 rounded-2xl bg-surface-muted/90 border border-line font-mono text-[12.6px] shadow-2xs">
                        <button
                            type="button"
                            onClick={() => switchModeWithBoot("preview")}
                            className={`px-5 py-2.5 rounded-xl font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                                viewMode === "preview" && !isRebooting
                                    ? "bg-white text-content shadow-sm scale-[1.02]"
                                    : "text-content-muted hover:text-content"
                            }`}
                        >
                            {tr("AUDIT PANEL")}
                        </button>
                        <button
                            type="button"
                            onClick={() => switchModeWithBoot("info")}
                            className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                                viewMode === "info" && !isRebooting
                                    ? "bg-ink text-white shadow-sm scale-[1.02]"
                                    : "text-content-muted hover:text-content"
                            }`}
                        >
                            <Info size={14} />
                            <span>{tr("Info")}</span>
                        </button>
                    </div>

                    <div className="relative w-full max-w-[690px] aspect-[16/10] bg-neutral-900 rounded-3xl p-2.5 sm:p-3.5 border border-neutral-700/80 shadow-[0_30px_70px_rgba(0,0,0,0.22)] flex flex-col ">

                        <div className="h-4 flex items-center justify-between px-2 shrink-0">
                            <span className="text-[9.5px] font-mono text-content-muted uppercase tracking-wider">
                                {tr("search-console.audit.live")}
                            </span>
                            <div className="w-2 h-2 rounded-full bg-neutral-800" />
                            <span className="text-[9.5px] font-mono text-content-muted">
                                {isRebooting ? "ANALYZING..." : "LIVE"}
                            </span>
                        </div>

                        <div className="relative flex-1 rounded-[16px] bg-ink-strong overflow-hidden shadow-inner flex flex-col justify-between">

                            {/* Экран гаснет: спиннер + надпись */}
                            <div
                                className={`absolute inset-0 bg-ink-strong z-30 flex flex-col items-center justify-center gap-4 transition-opacity duration-300 pointer-events-none ${
                                    isRebooting ? "opacity-100" : "opacity-0"
                                }`}
                            >
                                <div className="text-2xl sm:text-3xl font-black font-mono tracking-[0.25em] text-white">
                                    {tr(bootText)}
                                </div>
                                <Loader2 size={26} className="text-content-subtle animate-spin" />
                            </div>

                            {/* ВИД 1: AUDIT PANEL */}
                            <div
                                className={`absolute inset-0 bg-white text-content p-6 sm:p-8 flex flex-col justify-between transition-opacity duration-300 ${
                                    viewMode === "preview" && !isRebooting
                                        ? "opacity-100 z-10 pointer-events-auto"
                                        : "opacity-0 z-0 pointer-events-none"
                                }`}
                            >
                                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                                    <div className="flex items-center gap-2 font-bold text-sm tracking-tight text-content">
                                        <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                                        <span>{tr("SEARCH PERFORMANCE")}</span>
                                    </div>
                                    <span className="font-mono text-[10.5px] uppercase text-content-subtle">
                                        {tr("Google Search Console Index")}
                                    </span>
                                </div>

                                <div className="space-y-3 py-4">
                                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-accent-soft font-mono text-[10.5px] text-accent font-bold uppercase border border-emerald-200">
                                        {tr("98/100 Core Web Vitals")}
                                    </span>
                                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-content">
                                        {tr("Органический рост без рисков")}
                                    </h3>
                                    <p className="text-content-muted text-[12.6px] sm:text-[14.7px] max-w-md leading-relaxed">
                                        {tr("Полная адаптивность, структурированные данные Schema.org и максимальная скорость рендеринга.")}
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-neutral-100 font-mono text-[10.5px]">
                                    {["JSON-LD", "Semantic HTML5", "SSR Indexing"].map((b, i) => (
                                        <span key={i} className="px-2 py-0.5 rounded bg-neutral-50 border border-line text-neutral-700">
                                            {tr(b)}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* ВИД 2: OKHO INFO */}
                            <div
                                className={`absolute inset-0 bg-white text-content flex flex-col justify-between transition-opacity duration-300 ${
                                    viewMode === "info" && !isRebooting
                                        ? "opacity-100 z-10 pointer-events-auto"
                                        : "opacity-0 z-0 pointer-events-none"
                                }`}
                            >
                                <div className="h-10 bg-neutral-50 border-b border-line px-4 sm:px-6 flex items-center justify-between shrink-0">
                                    <span className="text-[11.5px] font-mono font-bold text-neutral-700">
                                        {tr("SEO // Выполняемый комплекс работ")}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => switchModeWithBoot("preview")}
                                        className="text-[13px] font-mono font-bold text-content-secondary hover:text-content transition-colors cursor-pointer"
                                    >
                                        {tr("Назад ✕")}
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-4 scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent">
                                    <div>
                                        <div className="flex items-baseline gap-2.5">
                                            <span className="font-mono text-[15px] font-bold text-content-subtle">01</span>
                                            <h4 className="text-[17px] font-bold text-content leading-snug">
                                                {tr("Комплексный технический аудит кода")}
                                            </h4>
                                        </div>
                                        <p className="text-[14px] text-content-muted leading-relaxed mt-0.5 pl-7">
                                            {tr("Устранение битых ссылок, дублей страниц, циклических редиректов и настройка заголовков безопасности.")}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-baseline gap-2.5">
                                            <span className="font-mono text-[15px] font-bold text-content-subtle">02</span>
                                            <h4 className="text-[17px] font-bold text-content leading-snug">
                                                {tr("Максимизация Core Web Vitals")}
                                            </h4>
                                        </div>
                                        <p className="text-[14px] text-content-muted leading-relaxed mt-0.5 pl-7">
                                            {tr("Достижение «зеленой зоны» PageSpeed (LCP < 1.2s, нулевой сдвиг макета CLS и моментальный интерактивный отклик INP).")}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-baseline gap-2.5">
                                            <span className="font-mono text-[15px] font-bold text-content-subtle">03</span>
                                            <h4 className="text-[17px] font-bold text-content leading-snug">
                                                {tr("Внедрение микроразметки Schema.org")}
                                            </h4>
                                        </div>
                                        <p className="text-[14px] text-content-muted leading-relaxed mt-0.5 pl-7">
                                            {tr("Настройка расширенных сниппетов (Rich Snippets) в поисковой выдаче: рейтинг, хлебные крошки, цены и блоки FAQ.")}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-baseline gap-2.5">
                                            <span className="font-mono text-[15px] font-bold text-content-subtle">04</span>
                                            <h4 className="text-[17px] font-bold text-content leading-snug">
                                                {tr("Сбор и кластеризация коммерческой семантики")}
                                            </h4>
                                        </div>
                                        <p className="text-[14px] text-content-muted leading-relaxed mt-0.5 pl-7">
                                            {tr("Отбор конверсионных ключевых запросов с привязкой к конкретным страницам каталога и услуг.")}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-baseline gap-2.5">
                                            <span className="font-mono text-[15px] font-bold text-content-subtle">05</span>
                                            <h4 className="text-[17px] font-bold text-content leading-snug">
                                                {tr("Оптимизация локального поиска (Local SEO)")}
                                            </h4>
                                        </div>
                                        <p className="text-[14px] text-content-muted leading-relaxed mt-0.5 pl-7">
                                            {tr("Оформление профилей Google My Business, Яндекс Бизнес и 2GIS для попадания в первые позиции на картах.")}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-baseline gap-2.5">
                                            <span className="font-mono text-[15px] font-bold text-content-subtle">06</span>
                                            <h4 className="text-[17px] font-bold text-content leading-snug">
                                                {tr("Глубокая веб-аналитика и трекинг конверсий")}
                                            </h4>
                                        </div>
                                        <p className="text-[14px] text-content-muted leading-relaxed mt-0.5 pl-7">
                                            {tr("Подключение Google Search Console и GA4 с фиксацией целей: нажатий на WhatsApp, отправки заявок и прямых звонков.")}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="h-1.5 w-16 bg-neutral-700 rounded-b-md mx-auto mt-1" />
                    </div>

                    <div className="w-[85%] h-2 bg-gradient-to-b from-neutral-300 to-neutral-400 rounded-b-xl shadow-md" />
                </div>

            </section>

            {/* ========================================================= */}
            {/* 2-Й ЭКРАН: 02 / НАШИ НАПРАВЛЕНИЯ                          */}
            {/* ========================================================= */}
            <section className="space-y-12 pt-4">

                <div className="space-y-3 max-w-3xl">
                    <div className="font-mono text-xs uppercase tracking-widest text-content-subtle font-semibold">
                        {tr("02 / НАШИ НАПРАВЛЕНИЯ")}
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-content leading-[1.15]">
                        {tr("Комплексный рост")} <br />
                        {tr("видимости в поисковиках")}
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
                    {SEO_DIRECTIONS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.num}
                                className="bg-neutral-50/70 hover:bg-neutral-50 rounded-panel border border-line/80 p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:border-line-strong"
                            >
                                <div className="space-y-5">
                                    <div className="flex items-center justify-between">
                                        <div className={`w-12 h-12 rounded-[18px] border flex items-center justify-center ${item.iconBg} ${item.iconColor}`}>
                                            <Icon size={22} strokeWidth={2} />
                                        </div>
                                        <span className="font-mono text-xs font-bold text-content-subtle">
                                            {tr(item.num)}
                                        </span>
                                    </div>

                                    <div className="space-y-1.5">
                                        <h3 className="text-2xl font-bold tracking-tight text-content">
                                            {tr(item.title)}
                                        </h3>
                                        <p className="text-content-muted text-[16.2px] leading-relaxed min-h-[46px]">
                                            {tr(item.description)}
                                        </p>
                                    </div>

                                    <div className="p-3.5 rounded-xl bg-white border border-line/80 flex items-center justify-between text-[13.2px] font-mono">
                                        <span className="text-content-subtle">{tr("Срок:")}</span>
                                        <span className="font-bold text-content">
                                            {tr(item.timeline)} <span className="font-normal text-content-muted">{tr("(срочно:")} {tr(item.express)})</span>
                                        </span>
                                    </div>

                                    <div className="pt-2">
                                        <div className="rounded-2xl bg-white border border-line/90 shadow-xs p-3 overflow-hidden">
                                            <SeoDevicePairMockup type={item.type} />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-line/70 space-y-3 mt-6">
                                    <span className="font-mono text-xs text-content-subtle uppercase tracking-wider font-semibold block">
                                        {tr("Примеры задач:")}
                                    </span>
                                    <ul className="space-y-2 text-[14.5px] sm:text-[15.8px] text-content-secondary">
                                        {item.examples.map((ex, idx) => (
                                            <li key={idx} className="flex items-start gap-2.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60 mt-2 shrink-0" />
                                                <span className="leading-snug">{tr(ex)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="p-5 rounded-2xl bg-neutral-50/70 border border-line/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[14.5px] font-mono">
                    <div className="flex items-center gap-2.5 text-neutral-800">
                        <Flame size={18} className="text-amber-500 shrink-0" />
                        <span>{tr("Срочный технический аудит: базовый срез — 3 дня, внедрение структуры — 7 дней, полный запуск — 14 дней")}</span>
                    </div>
                    <span className="font-bold text-content bg-white border border-line px-3.5 py-1.5 rounded-xl w-fit shadow-xs shrink-0">
                        {tr("+20% К СТОИМОСТИ")}
                    </span>
                </div>
            </section>

            {/* ========================================================= */}
            {/* 3-Й ЭКРАН: 03 / ПРЕИМУЩЕСТВА                               */}
            {/* ========================================================= */}
            <section className="space-y-10 pt-4">

                <div className="space-y-3 max-w-3xl">
                    <div className="font-mono text-xs uppercase tracking-widest text-content-subtle font-semibold">
                        {tr("03 / ПРЕИМУЩЕСТВА")}
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-content leading-[1.12]">
                        {tr("Что вы получаете")}
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7">

                    {/* КАРТОЧКА 1: Мгновенный отклик */}
                    <div className="rounded-3xl bg-neutral-50/70 border border-line/80 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-line-strong transition-all">
                        <div className="space-y-3 flex-1 min-w-[200px]">
                            <div className="w-11 h-11 rounded-2xl bg-accent-soft border border-accent-soft/80 flex items-center justify-center text-accent">
                                <Gauge size={22} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-content">
                                {tr("Скорость загрузки")}
                            </h3>
                            <p className="text-content-muted text-[16.2px] leading-relaxed">
                                {tr("Страницы открываются быстрее 1 секунды, снижая показатель отказов.")}
                            </p>
                        </div>

                        <div className="relative w-full sm:w-[300px] h-[152px] flex items-center justify-center gap-3  shrink-0">
                            <div className="p-3.5 rounded-2xl bg-white border border-line/90 shadow-sm flex flex-col items-center justify-center text-center space-y-1.5 w-[136px] shrink-0 z-10">
                                <div className="relative w-[60px] h-[60px] rounded-full border-4 border-accent flex items-center justify-center font-extrabold text-[17px] text-accent">
                                    100
                                </div>
                                <span className="text-[10px] font-mono text-neutral-700 leading-tight font-bold">
                                    {tr("Google PageSpeed")}
                                </span>
                            </div>

                            <div className="w-[152px] h-[118px] rounded-xl bg-white border border-line/90 shadow-2xs p-2.5 flex flex-col justify-between -ml-3.5">
                                <div className="flex items-center gap-1 border-b border-neutral-100 pb-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent-bright" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent-bright" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent-bright" />
                                </div>
                                <div className="h-17 flex items-end">
                                    <svg viewBox="0 0 100 40" className="w-full h-full text-accent">
                                        <path
                                            d="M0,35 Q20,25 45,10 T90,5 T100,4 L100,40 L0,40 Z"
                                            fill="rgba(16, 185, 129, 0.12)"
                                        />
                                        <path
                                            d="M0,35 Q20,25 45,10 T90,5 T100,4"
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

                    {/* КАРТОЧКА 2: Высокая кликабельность (CTR) */}
                    <div className="rounded-3xl bg-neutral-50/70 border border-line/80 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-line-strong transition-all">
                        <div className="space-y-3 flex-1 min-w-[200px]">
                            <div className="w-11 h-11 rounded-2xl bg-accent-soft border border-accent-soft/80 flex items-center justify-center text-accent">
                                <Target size={22} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-content">
                                {tr("Выделение в выдаче")}
                            </h3>
                            <p className="text-content-muted text-[16.2px] leading-relaxed">
                                {tr("Расширенные сниппеты привлекают больше кликов, чем обычные ссылки.")}
                            </p>
                        </div>

                        <div className="relative w-full sm:w-[300px] h-[152px] flex items-center justify-center
                         shrink-0">
                            <div className="w-full max-w-[268px] p-3.5 rounded-2xl bg-white border border-line/90 shadow-sm space-y-1.5">
                                <div className="flex items-center gap-1 text-[9px] font-mono text-accent">
                                    <span>★★★★★ 5.0</span>
                                    <span className="text-content-subtle">{tr("• 48 отзывов")}</span>
                                </div>
                                <div className="text-[12px] font-bold text-blue-600 leading-tight">
                                    {tr("Разработка сайтов и CRM — Vital Tech")}
                                </div>
                                <div className="text-[9.5px] text-content-muted leading-tight">
                                    {tr("Гарантия 30 дней. Исходный код ваш. Срок от 3 дней.")}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* КАРТОЧКА 3: Целевые лиды */}
                    <div className="rounded-3xl bg-neutral-50/70 border border-line/80 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-line-strong transition-all">
                        <div className="space-y-3 flex-1 min-w-[200px]">
                            <div className="w-11 h-11 rounded-2xl bg-accent-soft border border-accent-soft/80 flex items-center justify-center text-accent">
                                <TrendingUp size={22} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-content">
                                {tr("Поток горячих заявок")}
                            </h3>
                            <p className="text-content-muted text-[16.2px] leading-relaxed">
                                {tr("Пользователи находят вас сами в момент готовности заказать.")}
                            </p>
                        </div>

                        <div className="relative w-full sm:w-[300px] h-[152px] flex items-center justify-center  shrink-0">
                            <div className="w-full max-w-[268px] p-4 rounded-2xl bg-white border border-line/90 shadow-sm space-y-2.5">
                                <div className="flex items-center justify-between font-mono text-xs">
                                    <span className="text-content-muted">{tr("Органика:")}</span>
                                    <span className="font-bold text-accent">{tr("+184% MoM")}</span>
                                </div>
                                <div className="w-full bg-surface-muted h-2 rounded-full overflow-hidden">
                                    <div className="bg-accent h-full w-[78%] rounded-full" />
                                </div>
                                <div className="flex justify-between text-[10px] font-mono text-content-subtle">
                                    <span>{tr("CTR: 8.4%")}</span>
                                    <span>{tr("Лиды: Высокий чек")}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* КАРТОЧКА 4: Белые методы */}
                    <div className="rounded-3xl bg-neutral-50/70 border border-line/80 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-line-strong transition-all">
                        <div className="space-y-3 flex-1 min-w-[200px]">
                            <div className="w-11 h-11 rounded-2xl bg-accent-soft border border-accent-soft/80 flex items-center justify-center text-accent">
                                <ShieldCheck size={22} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-content">
                                {tr("Защита от санкций")}
                            </h3>
                            <p className="text-content-muted text-[16.2px] leading-relaxed">
                                {tr("Работаем только по официальным рекомендациям Google Search.")}
                            </p>
                        </div>

                        <div className="relative w-full sm:w-[300px] h-[152px] flex items-center justify-center  shrink-0">
                            <div className="w-full max-w-[258px] p-4 rounded-2xl bg-[#111827] text-white shadow-lg space-y-2">
                                {[
                                    "Чистый код",
                                    "Без накруток",
                                    "Canonical теги",
                                    "SSL безопасность",
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-[12.6px]">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3.5 h-3.5 rounded-full bg-accent/20 text-accent-bright flex items-center justify-center">
                                                <Check size={9} strokeWidth={3} />
                                            </div>
                                            <span className="text-neutral-300 font-medium">{tr(item)}</span>
                                        </div>
                                        {idx === 3 && (
                                            <span className="px-2 py-0.5 rounded bg-accent/20 text-accent-bright font-bold text-[9.5px]">
                                                100%
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
                        <span className="px-2.5 py-0.5 rounded-full bg-surface-muted text-content-secondary font-mono text-xs font-semibold">
                            04
                        </span>
                        <span className="text-base sm:text-lg font-bold text-content tracking-tight">
                            {tr("Процесс — как всё происходит")}
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-content leading-[1.12]">
                        {tr("От аудита до первых позиций.")}
                    </h2>
                </div>

                <div className="rounded-panel bg-white border border-line/90 shadow-[0_10px_35px_rgba(0,0,0,0.02)] p-8 sm:p-12 divide-y divide-neutral-100">

                    {/* 01 Анализируем */}
                    <div className="pb-8 space-y-1.5">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-content-subtle font-semibold">01</span>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-content">
                                {tr("Анализируем")}
                            </h3>
                        </div>
                        <p className="text-content-muted text-[15.4px] sm:text-[16.5px] leading-relaxed pl-7">
                            {tr("Проводим глубокий технический аудит и исследуем конкурентов в вашей нише.")}
                        </p>
                    </div>

                    {/* 02 Собираем семантику */}
                    <div className="py-8 space-y-1.5">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-content-subtle font-semibold">02</span>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-content">
                                {tr("Собираем ядро")}
                            </h3>
                        </div>
                        <p className="text-content-muted text-[15.4px] sm:text-[16.5px] leading-relaxed pl-7">
                            {tr("Формируем список реальных поисковых запросов и проектируем структуру страниц.")}
                        </p>
                    </div>

                    {/* 03 Внедряем */}
                    <div className="py-8 space-y-1.5">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-content-subtle font-semibold">03</span>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-content">
                                {tr("Внедряем код")}
                            </h3>
                        </div>
                        <p className="text-content-muted text-[15.4px] sm:text-[16.5px] leading-relaxed pl-7">
                            {tr("Ускоряем загрузку, добавляем микроразметку Schema.org и настраиваем метатеги.")}
                        </p>
                    </div>

                    {/* 04 Индексируем */}
                    <div className="py-8 space-y-1.5">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-content-subtle font-semibold">04</span>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-content">
                                {tr("Индексируем")}
                            </h3>
                        </div>
                        <p className="text-content-muted text-[15.4px] sm:text-[16.5px] leading-relaxed pl-7">
                            {tr("Отправляем карты в Google Search Console и Яндекс Вебмастер для быстрой переиндексации.")}
                        </p>
                    </div>

                    {/* 05 Контролируем */}
                    <div className="pt-8 space-y-1.5">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-accent font-semibold">05</span>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-content">
                                {tr("Контролируем")}
                            </h3>
                        </div>
                        <p className="text-content-muted text-[15.4px] sm:text-[16.5px] leading-relaxed pl-7">
                            {tr("30 дней отслеживаем позиции и передаем детальный отчет с графиками трафика.")}
                        </p>
                    </div>

                </div>
            </section>

            {/* ========================================================= */}
            {/* 5-Й ЭКРАН: 05 / НАШИ ГАРАНТИИ (ГОРИЗОНТАЛЬНЫЙ ТЕКСТ)        */}
            {/* ========================================================= */}
            <section className="space-y-10 pt-4">
                <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-muted text-content-secondary font-mono text-xs font-semibold">
                        05
                    </span>
                    <span className="text-base sm:text-lg font-bold text-content tracking-tight">
                        {tr("Наши гарантии")}
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 divide-y md:divide-y-0 md:divide-x divide-line/80">

                    {/* 1 */}
                    <div className="group pt-6 md:pt-0 md:pr-8 transition-transform duration-300">
                        <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-black tracking-tight text-content leading-[1.12]">
                            {tr("100% качество.")} <br />
                            <span className="text-content-subtle font-bold group-hover:text-content-secondary transition-colors">
                                {tr("или вернем всю сумму")}
                            </span>
                        </h3>
                    </div>

                    {/* 2 */}
                    <div className="group pt-8 md:pt-0 md:px-8 transition-transform duration-300">
                        <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-black tracking-tight text-content leading-[1.14]">
                            {tr("Только белые")} <br className="hidden lg:inline" />
                            {tr("методы SEO.")} <br />
                            <span className="text-content-subtle font-bold group-hover:text-content-secondary transition-colors">
                                {tr("Без риска фильтров поисковиков.")}
                            </span>
                        </h3>
                    </div>

                    {/* 3 */}
                    <div className="group pt-8 md:pt-0 md:pl-8 transition-transform duration-300">
                        <h3 className="text-2xl sm:text-3xl lg:text-[28px] font-black tracking-tight text-content leading-[1.18]">
                            {tr("Фиксируем стоимость")} <br className="hidden lg:inline" />
                            {tr("в официальном договоре —")} <br />
                            <span className="text-content-subtle font-bold group-hover:text-content-secondary transition-colors">
                                {tr("цена абсолютно не меняется.")}
                            </span>
                        </h3>
                    </div>

                </div>
            </section>

            {/* ========================================================= */}
            {/* 6-Й ЭКРАН: Финальный CTA                                 */}
            {/* ========================================================= */}
            <section className="bg-ink text-white rounded-panel p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
                <div className="space-y-2 text-center lg:text-left">
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                        {tr("Выведем сайт в ТОП с гарантией по договору")}
                    </h2>
                    <p className="text-content-subtle text-xs sm:text-sm">
                        {tr("Фиксированная цена, рост показателей Core Web Vitals и соблюдение сроков.")}
                    </p>
                </div>

                <Link
                    href="/contacts"
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white hover:bg-surface-muted text-content font-mono text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 shrink-0"
                >
                    <span>{tr("Обсудить SEO")}</span>
                    <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
            </section>

        </main>
    );
}