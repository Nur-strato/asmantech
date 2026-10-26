"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowUpRight,
    Box,
    Layers,
    Sparkles,
    Eye,
    Cpu,
    Check,
    Info,
    Flame,
    Loader2,
    MonitorPlay,
    Palette,
    Shapes,
} from "lucide-react";

// --- КОМПОНЕНТ ДЛЯ 2-ГО ЭКРАНА (МОКАПЫ УСТРОЙСТВ ДЛЯ 3D ДИЗАЙНА) ---
function ThreeDevicePairMockup({ type }: { type: "product" | "interactive" | "arch" }) {
    if (type === "product") {
        return (
            <div className="relative w-full h-[220px] sm:h-[240px] flex items-end justify-center select-none pt-2">
                <div className="relative w-[78%] sm:w-[74%] aspect-[16/10] mr-[14%] flex flex-col items-center">
                    <div className="w-full h-full bg-[#1A1A1A] rounded-t-[14px] p-1.5 sm:p-2 border-[2px] border-[#2A2A2A] shadow-xl flex flex-col overflow-hidden">
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-800 mx-auto mb-1 shrink-0" />
                        <div className="flex-1 rounded-[6px] bg-[#0A0D14] p-3 text-white overflow-hidden flex flex-col justify-between border border-neutral-800">
                            <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5 text-[8px] sm:text-[9px] font-mono text-neutral-400">
                                <span className="font-bold text-amber-400">CYCLES / RAYTRACING</span>
                                <span className="text-emerald-400">4K UHD READY</span>
                            </div>
                            <div className="grid grid-cols-12 gap-2 items-center my-auto">
                                <div className="col-span-7 space-y-1">
                                    <span className="text-[7px] font-mono text-blue-400 uppercase tracking-wider">
                                        PBR MATERIALS
                                    </span>
                                    <h4 className="font-bold text-[10px] sm:text-xs text-white leading-tight">
                                        Фотореализм для E-Commerce
                                    </h4>
                                    <p className="text-[7px] sm:text-[8px] text-neutral-400 line-clamp-2">
                                        Студийный свет, текстуры металла, стекла, кожи и пластика.
                                    </p>
                                </div>
                                <div className="col-span-5 h-14 sm:h-16 rounded bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500/20 via-orange-500/30 to-amber-400/40 border border-amber-400/30 flex items-center justify-center text-sm shadow-inner">
                                        💎
                                    </div>
                                    <span className="text-[6px] font-mono text-neutral-400 mt-1">PRODUCT RENDER</span>
                                </div>
                            </div>
                            <div className="text-[6px] text-neutral-500 font-mono">01 // COMMERCIAL STILLS</div>
                        </div>
                    </div>
                    <div className="w-[108%] h-2 bg-gradient-to-b from-[#D1D5DB] via-[#9CA3AF] to-[#6B7280] rounded-b-md shadow-md flex justify-center">
                        <div className="w-12 h-1 bg-[#4B5563] rounded-b-sm" />
                    </div>
                </div>

                <div className="absolute right-2 sm:right-4 bottom-0 w-[82px] sm:w-[94px] aspect-[9/19] bg-[#161616] rounded-[22px] p-1 border-[2px] border-[#383838] shadow-[0_20px_40px_rgba(0,0,0,0.35)] z-20 flex flex-col">
                    <div className="w-5 h-1.5 bg-black rounded-full mx-auto my-0.5 shrink-0" />
                    <div className="flex-1 rounded-[17px] bg-[#0A0D14] p-2 text-white overflow-hidden flex flex-col justify-between border border-neutral-800">
                        <div className="text-[6px] font-mono text-amber-400 flex justify-between">
                            <span>STORE</span>
                            <span>360°</span>
                        </div>
                        <div className="space-y-1 my-auto text-center">
                            <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-400/30 mx-auto flex items-center justify-center text-[11px]">
                                📦
                            </div>
                            <span className="text-[6.5px] font-mono block text-neutral-300">Clean Alpha</span>
                        </div>
                        <div className="w-6 h-0.5 bg-neutral-600 rounded-full mx-auto" />
                    </div>
                </div>
            </div>
        );
    }

    if (type === "interactive") {
        return (
            <div className="relative w-full h-[220px] sm:h-[240px] flex items-end justify-center select-none pt-2">
                <div className="relative w-[78%] sm:w-[74%] aspect-[16/10] mr-[14%] flex flex-col items-center">
                    <div className="w-full h-full bg-[#1A1A1A] rounded-t-[14px] p-1.5 sm:p-2 border-[2px] border-[#2A2A2A] shadow-xl flex flex-col overflow-hidden">
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-800 mx-auto mb-1 shrink-0" />
                        <div className="flex-1 rounded-[6px] bg-[#0E1726] p-3 text-white overflow-hidden flex flex-col justify-between">
                            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 text-[8px] sm:text-[9px] font-mono text-neutral-300">
                                <span className="font-bold text-purple-400">THREE.JS / WEBGL</span>
                                <span className="text-emerald-400">STABLE 60 FPS</span>
                            </div>
                            <div className="space-y-1 my-auto">
                                <span className="text-[7px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                                    REALTIME CONFIGURATOR • GLTF 2.0
                                </span>
                                <div className="p-1.5 rounded bg-white/5 border border-white/10 space-y-0.5">
                                    <div className="text-[8.5px] font-bold text-white leading-tight">
                                        Вращение 360°, смена цветов и кастомизация
                                    </div>
                                    <div className="text-[6.5px] text-neutral-400 line-clamp-1">
                                        Оптимизация Draco-компрессией: вес моделей до 2-3 МБ.
                                    </div>
                                </div>
                            </div>
                            <div className="text-[6px] text-neutral-400 font-mono">02 // WEB 3D APPS</div>
                        </div>
                    </div>
                    <div className="w-[108%] h-2 bg-gradient-to-b from-[#D1D5DB] via-[#9CA3AF] to-[#6B7280] rounded-b-md shadow-md flex justify-center">
                        <div className="w-12 h-1 bg-[#4B5563] rounded-b-sm" />
                    </div>
                </div>

                <div className="absolute right-2 sm:right-4 bottom-0 w-[82px] sm:w-[94px] aspect-[9/19] bg-[#161616] rounded-[22px] p-1 border-[2px] border-[#383838] shadow-[0_20px_40px_rgba(0,0,0,0.35)] z-20 flex flex-col">
                    <div className="w-5 h-1.5 bg-black rounded-full mx-auto my-0.5 shrink-0" />
                    <div className="flex-1 rounded-[17px] bg-[#0E1726] p-2 text-white overflow-hidden flex flex-col justify-between border border-white/10">
                        <div className="text-[6px] font-mono text-purple-400 flex justify-between">
                            <span>TOUCH</span>
                            <span>ROTATE</span>
                        </div>
                        <div className="space-y-1 my-auto text-center">
                            <div className="text-[12px]">🔄</div>
                            <span className="text-[6.5px] font-mono text-emerald-400">Mobile Fluid</span>
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
                    <div className="flex-1 rounded-[6px] bg-[#111827] p-3 text-white overflow-hidden flex flex-col justify-between">
                        <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5 text-[8px] sm:text-[9px] font-mono text-neutral-300">
                            <span className="font-bold text-blue-400">ARCHVIZ & INTERIOR</span>
                            <span className="text-emerald-400">EXACT SCALE 1:1</span>
                        </div>
                        <div className="space-y-1.5 my-auto">
                            <div className="flex justify-between items-baseline">
                                <h4 className="font-bold text-[10px] sm:text-xs">Архитектура и промо-анимация</h4>
                                <span className="text-[8px] text-emerald-400 font-mono">Cinematic</span>
                            </div>
                            <div className="p-1.5 rounded bg-black/40 border border-neutral-800 text-[7px] space-y-1">
                                <div className="text-neutral-300 font-medium">Сложные интерьерные сцены и экстерьеры</div>
                                <div className="text-[6.5px] text-neutral-400">Облёты камерой, динамическое естественное освещение</div>
                            </div>
                        </div>
                        <div className="text-[6px] text-neutral-400 font-mono">03 // MOTION & SCENES</div>
                    </div>
                </div>
                <div className="w-[108%] h-2 bg-gradient-to-b from-[#D1D5DB] via-[#9CA3AF] to-[#6B7280] rounded-b-md shadow-md flex justify-center">
                    <div className="w-12 h-1 bg-[#4B5563] rounded-b-sm" />
                </div>
            </div>

            <div className="absolute right-2 sm:right-4 bottom-0 w-[82px] sm:w-[94px] aspect-[9/19] bg-[#161616] rounded-[22px] p-1 border-[2px] border-[#383838] shadow-[0_20px_40px_rgba(0,0,0,0.35)] z-20 flex flex-col">
                <div className="w-5 h-1.5 bg-black rounded-full mx-auto my-0.5 shrink-0" />
                <div className="flex-1 rounded-[17px] bg-[#111827] p-2 text-white overflow-hidden flex flex-col justify-between border border-neutral-800">
                    <div className="text-[6px] font-mono text-blue-400 flex justify-between">
                        <span>RENDER</span>
                        <span className="text-emerald-400">READY</span>
                    </div>
                    <div className="space-y-1.5 my-auto text-center">
                        <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400/40 mx-auto flex items-center justify-center text-[9px] font-mono text-blue-400">
                            🏛️
                        </div>
                        <div className="text-[6px] text-neutral-300 font-mono">
                            Ultra Detail
                        </div>
                    </div>
                    <div className="w-6 h-0.5 bg-white/40 rounded-full mx-auto" />
                </div>
            </div>
        </div>
    );
}

// --- НАПРАВЛЕНИЯ 3D-РАЗРАБОТКИ ---
interface ThreeDirection {
    num: string;
    type: "product" | "interactive" | "arch";
    title: string;
    description: string;
    timeline: string;
    express: string;
    icon: React.ElementType;
    iconBg: string;
    iconColor: string;
    examples: string[];
}

const THREE_DIRECTIONS: ThreeDirection[] = [
    {
        num: "01",
        type: "product",
        title: "Предметный 3D-рендеринг для каталогов",
        description: "Фотореалистичные изображения товаров без затрат на аренду фотостудий.",
        timeline: "до 7 дней",
        express: "3 дня",
        icon: Box,
        iconBg: "bg-amber-50/80 border-amber-100/70",
        iconColor: "text-amber-600",
        examples: [
            "Товары для интернет-магазинов на чистом прозрачном фоне",
            "Детализация фактур: дерево, металл, карбон, ткань",
            "Любые ракурсы, макро-детали и взрыв-схемы (Exploded View)",
        ],
    },
    {
        num: "02",
        type: "interactive",
        title: "Интерактивное 3D для сайтов (Three.js / WebGL)",
        description: "Внедрение 3D-моделей прямо в код сайта с плавным вращением на смартфонах.",
        timeline: "14 дней",
        express: "7 дней",
        icon: MonitorPlay,
        iconBg: "bg-purple-50/80 border-purple-100/70",
        iconColor: "text-purple-500",
        examples: [
            "3D-конфигураторы товаров со сменой цвета и комплектации",
            "Интерактивные герои и промо-сцены для лендингов",
            "Оптимизированные форматы GLTF / GLB с компрессией Draco",
        ],
    },
    {
        num: "03",
        type: "arch",
        title: "Архитектурная визуализация и 3D-моушн",
        description: "Визуализация интерьеров, зданий и кинематографичные рекламные видеоролики.",
        timeline: "до 28 дней",
        express: "14 дней",
        icon: Palette,
        iconBg: "bg-blue-50/80 border-blue-100/70",
        iconColor: "text-blue-500",
        examples: [
            "Экстерьеры зданий, жилых комплексов и коммерческих пространств",
            "Интерьерные решения в масштабе 1:1 по чертежам",
            "Промо-ролики с облётами камеры и бесшовной анимацией",
        ],
    },
];

export default function ThreeDesignPage() {
    const [viewMode, setViewMode] = useState<"preview" | "info">("preview");
    const [isRebooting, setIsRebooting] = useState(false);
    const [bootText, setBootText] = useState("INFO");

    const switchModeWithBoot = (target: "preview" | "info") => {
        if (viewMode === target || isRebooting) return;

        setBootText(target === "info" ? "INFO" : "3D ENGINE");
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
                    <span>Solutions // 03</span>
                </Link>

                <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-500 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>REALTIME 3D EXPERIENCES</span>
                </div>
            </div>

            {/* ========================================================= */}
            {/* 1-Й ЭКРАН: Слева описание, справа интерактивный вьювер    */}
            {/* ========================================================= */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center pt-2">

                {/* Левая колонка */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 font-mono text-[11.5px] uppercase tracking-wider">
                        <span>SPATIAL & PRODUCT 3D</span>
                        <span>•</span>
                        <span className="font-bold text-neutral-900">BLENDER & THREE.JS</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-neutral-950 leading-[1.02]">
                        3D для продуктов.
                    </h1>

                    <p className="text-neutral-600 text-[16.8px] sm:text-[18.9px] leading-relaxed font-normal">
                        Создаем убедительный трехмерный контент: от детализированных рендеров для каталогов до легких интерактивных моделей прямо в браузере с откликом 60 кадров в секунду.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-2 font-mono text-[12.6px] text-neutral-600">
                        <div className="px-3.5 py-1.5 rounded-xl bg-neutral-50 border border-neutral-200">
                            РЕНДЕРИНГ: <span className="font-bold text-amber-600">PBR Photoreal</span>
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
                            <span>Обсудить 3D-проект</span>
                            <ArrowUpRight size={15} />
                        </Link>
                    </div>
                </div>

                {/* Правая колонка: ноутбук с переключением ENGINE / INFO */}
                <div className="lg:col-span-7 flex flex-col items-center">

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
                            3D ENGINE
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

                    <div className="relative w-full max-w-[690px] aspect-[16/10] bg-neutral-900 rounded-[24px] p-2.5 sm:p-3.5 border border-neutral-700/80 shadow-[0_30px_70px_rgba(0,0,0,0.22)] flex flex-col select-none">

                        <div className="h-4 flex items-center justify-between px-2 shrink-0">
                            <span className="text-[9.5px] font-mono text-neutral-500 uppercase tracking-wider">
                                viewport.threejs.vitaltech
                            </span>
                            <div className="w-2 h-2 rounded-full bg-neutral-800" />
                            <span className="text-[9.5px] font-mono text-neutral-500">
                                {isRebooting ? "SHADING..." : "60 FPS"}
                            </span>
                        </div>

                        <div className="relative flex-1 rounded-[16px] bg-[#0A0D14] overflow-hidden shadow-inner flex flex-col justify-between">

                            {/* Экран гаснет: спиннер + надпись */}
                            <div
                                className={`absolute inset-0 bg-[#07090E] z-30 flex flex-col items-center justify-center gap-4 transition-opacity duration-300 pointer-events-none ${
                                    isRebooting ? "opacity-100" : "opacity-0"
                                }`}
                            >
                                <div className="text-2xl sm:text-3xl font-black font-mono tracking-[0.25em] text-white">
                                    {bootText}
                                </div>
                                <Loader2 size={26} className="text-neutral-400 animate-spin" />
                            </div>

                            {/* ВИД 1: 3D ENGINE */}
                            <div
                                className={`absolute inset-0 bg-white text-neutral-900 p-6 sm:p-8 flex flex-col justify-between transition-opacity duration-300 ${
                                    viewMode === "preview" && !isRebooting
                                        ? "opacity-100 z-10 pointer-events-auto"
                                        : "opacity-0 z-0 pointer-events-none"
                                }`}
                            >
                                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                                    <div className="flex items-center gap-2 font-bold text-sm tracking-tight text-neutral-950">
                                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                                        <span>3D SPATIAL LAB</span>
                                    </div>
                                    <span className="font-mono text-[10.5px] uppercase text-neutral-400">
                                        WebGL 2.0 / PBR Shading
                                    </span>
                                </div>

                                <div className="space-y-3 py-4">
                                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-50 font-mono text-[10.5px] text-amber-700 font-bold uppercase border border-amber-200">
                                        Draco Mesh Compressed
                                    </span>
                                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-neutral-950">
                                        Интерактивное окружение без лагов
                                    </h3>
                                    <p className="text-neutral-500 text-[12.6px] sm:text-[14.7px] max-w-md leading-relaxed">
                                        Модели весят считанные мегабайты, быстро загружаются на мобильных устройствах и позволяют клиентам рассматривать товар со всех сторон.
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-neutral-100 font-mono text-[10.5px]">
                                    {["Blender 4.2", "Three.js", "PBR Workflow"].map((b, i) => (
                                        <span key={i} className="px-2 py-0.5 rounded bg-neutral-50 border border-neutral-200 text-neutral-700">
                                            {b}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* ВИД 2: OKHO INFO */}
                            <div
                                className={`absolute inset-0 bg-white text-neutral-950 flex flex-col justify-between transition-opacity duration-300 ${
                                    viewMode === "info" && !isRebooting
                                        ? "opacity-100 z-10 pointer-events-auto"
                                        : "opacity-0 z-0 pointer-events-none"
                                }`}
                            >
                                <div className="h-10 bg-neutral-50 border-b border-neutral-200 px-4 sm:px-6 flex items-center justify-between shrink-0">
                                    <span className="text-[11.5px] font-mono font-bold text-neutral-700">
                                        3D PIPELINE // Регламент разработки
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
                                                Точное полигональное моделирование (1:1)
                                            </h4>
                                        </div>
                                        <p className="text-[14px] text-neutral-500 leading-relaxed mt-0.5 pl-7">
                                            Создание высокоточных SubD-моделей по чертежам, реальным образцам или референсам с правильной топологией сетки.
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-baseline gap-2.5">
                                            <span className="font-mono text-[15px] font-bold text-neutral-400">02</span>
                                            <h4 className="text-[17px] font-bold text-neutral-950 leading-snug">
                                                Фотореалистичные PBR-материалы (4K)
                                            </h4>
                                        </div>
                                        <p className="text-[14px] text-neutral-500 leading-relaxed mt-0.5 pl-7">
                                            Настройка карт шероховатости (Roughness), рельефа (Normal), металличности и подповерхностного рассеивания (SSS).
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-baseline gap-2.5">
                                            <span className="font-mono text-[15px] font-bold text-neutral-400">03</span>
                                            <h4 className="text-[17px] font-bold text-neutral-950 leading-snug">
                                                Оптимизация под WebGL и мобильные платформы
                                            </h4>
                                        </div>
                                        <p className="text-[14px] text-neutral-500 leading-relaxed mt-0.5 pl-7">
                                            Ретопология, бейкинг карт нормалей и компрессия Draco для плавной анимации 60 FPS прямо в окне браузера.
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-baseline gap-2.5">
                                            <span className="font-mono text-[15px] font-bold text-neutral-400">04</span>
                                            <h4 className="text-[17px] font-bold text-neutral-950 leading-snug">
                                                Интерактивные конфигураторы товаров
                                            </h4>
                                        </div>
                                        <p className="text-[14px] text-neutral-500 leading-relaxed mt-0.5 pl-7">
                                            Разработка логики смены деталей, вариантов обшивки, окраски и динамического расчета цены изделия.
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-baseline gap-2.5">
                                            <span className="font-mono text-[15px] font-bold text-neutral-400">05</span>
                                            <h4 className="text-[17px] font-bold text-neutral-950 leading-snug">
                                                Студийная постановка света и рендер сцен
                                            </h4>
                                        </div>
                                        <p className="text-[14px] text-neutral-500 leading-relaxed mt-0.5 pl-7">
                                            Физически корректные HDRI-карты, многоточечный софт-бокс свет и глубина резкости камеры (DoF).
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-baseline gap-2.5">
                                            <span className="font-mono text-[15px] font-bold text-neutral-400">06</span>
                                            <h4 className="text-[17px] font-bold text-neutral-950 leading-snug">
                                                Полная передача исходных исходников
                                            </h4>
                                        </div>
                                        <p className="text-[14px] text-neutral-500 leading-relaxed mt-0.5 pl-7">
                                            Передаем оригинальные файлы проектов (.blend, .fbx, .obj, .gltf) со всеми слоями, текстурами и готовыми рендерами в высоком разрешении.
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
                    <div className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                        02 / НАШИ НАПРАВЛЕНИЯ
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 leading-[1.15]">
                        Мы создаем 3D-графику <br />
                        для презентаций и веба
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
                    {THREE_DIRECTIONS.map((item) => {
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
                                            <ThreeDevicePairMockup type={item.type} />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-neutral-200/70 space-y-3 mt-6">
                                    <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider font-semibold block">
                                        Примеры задач:
                                    </span>
                                    <ul className="space-y-2 text-[14.5px] sm:text-[15.8px] text-neutral-600">
                                        {item.examples.map((ex, idx) => (
                                            <li key={idx} className="flex items-start gap-2.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60 mt-2 shrink-0" />
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
                        <span>Срочное 3D-производство: предметный рендер — 3 дня, 3D для веба — 7 дней, сцена с анимацией — 14 дней</span>
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

                    {/* КАРТОЧКА 1: Фотореализм без студийных затрат */}
                    <div className="rounded-[28px] bg-neutral-50/70 border border-neutral-200/80 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-neutral-300 transition-all">
                        <div className="space-y-3 flex-1 min-w-[200px]">
                            <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-100/80 flex items-center justify-center text-amber-600">
                                <Sparkles size={22} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-neutral-950">
                                Премиальный вид
                            </h3>
                            <p className="text-neutral-500 text-[16.2px] leading-relaxed">
                                Любые ракурсы товара в идеальном качестве без проведения дорогой фотосъемки.
                            </p>
                        </div>

                        <div className="relative w-full sm:w-[300px] h-[152px] flex items-center justify-center gap-3 select-none shrink-0">
                            <div className="p-3.5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm flex flex-col items-center justify-center text-center space-y-1.5 w-[136px] shrink-0 z-10">
                                <div className="relative w-[60px] h-[60px] rounded-full border-4 border-amber-500 flex items-center justify-center font-extrabold text-[17px] text-amber-600">
                                    4K
                                </div>
                                <span className="text-[10px] font-mono text-neutral-700 leading-tight font-bold">
                                    Ultra-HD Stills
                                </span>
                            </div>

                            <div className="w-[152px] h-[118px] rounded-xl bg-white border border-neutral-200/90 shadow-2xs p-2.5 flex flex-col justify-between -ml-3.5">
                                <div className="flex items-center gap-1 border-b border-neutral-100 pb-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                </div>
                                <div className="space-y-1.5 my-auto">
                                    <div className="text-[10px] font-mono font-bold text-neutral-800">Raytraced Lights</div>
                                    <div className="h-1.5 w-full bg-amber-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-amber-500 w-full" />
                                    </div>
                                    <span className="text-[8px] font-mono text-neutral-400 block">Alpha Transparency</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* КАРТОЧКА 2: Высокая конверсия карточек */}
                    <div className="rounded-[28px] bg-neutral-50/70 border border-neutral-200/80 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-neutral-300 transition-all">
                        <div className="space-y-3 flex-1 min-w-[200px]">
                            <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-100/80 flex items-center justify-center text-amber-600">
                                <Eye size={22} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-neutral-950">
                                Рост вовлеченности
                            </h3>
                            <p className="text-neutral-500 text-[16.2px] leading-relaxed">
                                Возможность покрутить предмет на 360° повышает доверие покупателей к товару.
                            </p>
                        </div>

                        <div className="relative w-full sm:w-[300px] h-[152px] flex items-center justify-center select-none shrink-0">
                            <div className="w-full max-w-[268px] p-3.5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm space-y-2">
                                <div className="flex items-center justify-between text-[11px] font-mono">
                                    <span className="text-neutral-500">Interaction Rate:</span>
                                    <span className="text-emerald-600 font-bold">+64% YoY</span>
                                </div>
                                <div className="p-2 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-between text-[12px] font-bold">
                                    <span>Глубина просмотра</span>
                                    <span className="font-mono text-neutral-900">4.2x выше</span>
                                </div>
                                <div className="text-[9px] font-mono text-neutral-400 text-center">
                                    Осознанные покупки с меньшим возвратом
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* КАРТОЧКА 3: Оптимизация для мобильных (60 FPS) */}
                    <div className="rounded-[28px] bg-neutral-50/70 border border-neutral-200/80 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-neutral-300 transition-all">
                        <div className="space-y-3 flex-1 min-w-[200px]">
                            <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-100/80 flex items-center justify-center text-amber-600">
                                <Cpu size={22} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-neutral-950">
                                Плавность в вебе
                            </h3>
                            <p className="text-neutral-500 text-[16.2px] leading-relaxed">
                                Модели не тормозят интерфейс сайта и быстро загружаются даже при слабом 4G.
                            </p>
                        </div>

                        <div className="relative w-full sm:w-[300px] h-[152px] flex items-center justify-center select-none shrink-0">
                            <div className="w-full max-w-[268px] p-4 rounded-2xl bg-white border border-neutral-200/90 shadow-sm space-y-2.5">
                                <div className="flex items-center justify-between font-mono text-xs">
                                    <span className="text-neutral-500">Frame Rate:</span>
                                    <span className="font-bold text-emerald-600">60 FPS Locked</span>
                                </div>
                                <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                                    <div className="bg-amber-500 h-full w-[94%]" />
                                </div>
                                <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                                    <span>Draco: 1.8 MB</span>
                                    <span>Draw Calls: Minimal</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* КАРТОЧКА 4: Полная передача прав и моделей */}
                    <div className="rounded-[28px] bg-neutral-50/70 border border-neutral-200/80 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-neutral-300 transition-all">
                        <div className="space-y-3 flex-1 min-w-[200px]">
                            <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-100/80 flex items-center justify-center text-amber-600">
                                <Shapes size={22} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-neutral-950">
                                Все исходники ваши
                            </h3>
                            <p className="text-neutral-500 text-[16.2px] leading-relaxed">
                                Отдаем открытые файлы проектов для повторного использования в любых целях.
                            </p>
                        </div>

                        <div className="relative w-full sm:w-[300px] h-[152px] flex items-center justify-center select-none shrink-0">
                            <div className="w-full max-w-[258px] p-4 rounded-2xl bg-[#111827] text-white shadow-lg space-y-2">
                                {[
                                    ".BLEND исходники",
                                    "GLTF / GLB форматы",
                                    "4K текстурные карты",
                                    "Коммерческая лицензия",
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-[12.6px]">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                                                <Check size={9} strokeWidth={3} />
                                            </div>
                                            <span className="text-neutral-300 font-medium">{item}</span>
                                        </div>
                                        {idx === 3 && (
                                            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold text-[9.5px]">
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
                        <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-mono text-xs font-semibold">
                            04
                        </span>
                        <span className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">
                            Процесс — как всё происходит
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 leading-[1.12]">
                        От референса до финального рендера.
                    </h2>
                </div>

                <div className="rounded-[32px] bg-white border border-neutral-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.02)] p-8 sm:p-12 divide-y divide-neutral-100">

                    {/* 01 Бриф и референсы */}
                    <div className="pb-8 space-y-1.5">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-neutral-400 font-semibold">01</span>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                                Изучаем задачу
                            </h3>
                        </div>
                        <p className="text-neutral-500 text-[15.4px] sm:text-[16.5px] leading-relaxed pl-7">
                            Получаем фотографии, чертежи или эскизы продукта и согласуем ракурсы.
                        </p>
                    </div>

                    {/* 02 Моделирование */}
                    <div className="py-8 space-y-1.5">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-neutral-400 font-semibold">02</span>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                                Создаем геометрию
                            </h3>
                        </div>
                        <p className="text-neutral-500 text-[15.4px] sm:text-[16.5px] leading-relaxed pl-7">
                            Моделируем точную цифровую форму изделия с правильной сеткой без дефектов.
                        </p>
                    </div>

                    {/* 03 Материалы и свет */}
                    <div className="py-8 space-y-1.5">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-neutral-400 font-semibold">03</span>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                                Текстурируем и выставляем свет
                            </h3>
                        </div>
                        <p className="text-neutral-500 text-[15.4px] sm:text-[16.5px] leading-relaxed pl-7">
                            Настраиваем реалистичные блики, микро-рельеф материалов и студийное окружение.
                        </p>
                    </div>

                    {/* 04 Рендеринг и оптимизация */}
                    <div className="py-8 space-y-1.5">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-neutral-400 font-semibold">04</span>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                                Рендерим или собираем в код
                            </h3>
                        </div>
                        <p className="text-neutral-500 text-[15.4px] sm:text-[16.5px] leading-relaxed pl-7">
                            Просчитываем Ultra-HD кадры или интегрируем модель в веб-интерфейс на Three.js.
                        </p>
                    </div>

                    {/* 05 Сдача и архив */}
                    <div className="pt-8 space-y-1.5">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-emerald-600 font-semibold">05</span>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                                Передаем архив
                            </h3>
                        </div>
                        <p className="text-neutral-500 text-[15.4px] sm:text-[16.5px] leading-relaxed pl-7">
                            Отправляем все исходные файлы моделей, текстурные карты и готовые рендеры.
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
                            100% реализм. <br />
                            <span className="text-neutral-400 font-bold group-hover:text-neutral-600 transition-colors">
                                или дорабатываем до идеала
                            </span>
                        </h3>
                    </div>

                    {/* 2 */}
                    <div className="group pt-8 md:pt-0 md:px-8 transition-transform duration-300">
                        <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-black tracking-tight text-neutral-950 leading-[1.14]">
                            Все исходные <br className="hidden lg:inline" />
                            файлы 3D ваши. <br />
                            <span className="text-neutral-400 font-bold group-hover:text-neutral-600 transition-colors">
                                Без скрытых ограничений по лицензиям.
                            </span>
                        </h3>
                    </div>

                    {/* 3 */}
                    <div className="group pt-8 md:pt-0 md:pl-8 transition-transform duration-300">
                        <h3 className="text-2xl sm:text-3xl lg:text-[28px] font-black tracking-tight text-neutral-950 leading-[1.18]">
                            Фиксируем стоимость <br className="hidden lg:inline" />
                            в договоре — <br />
                            <span className="text-neutral-400 font-bold group-hover:text-neutral-600 transition-colors">
                                цена не вырастет в процессе.
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
                        Создадим 3D-контент с гарантией по договору
                    </h2>
                    <p className="text-neutral-400 text-xs sm:text-sm">
                        Фиксированная цена, передача 100% исходных моделей и фотореалистичный результат.
                    </p>
                </div>

                <Link
                    href="/contacts"
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 font-mono text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 shrink-0"
                >
                    <span>Обсудить 3D</span>
                    <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
            </section>

        </main>
    );
}