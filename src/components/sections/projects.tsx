"use client";

import React, { useState, useRef, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, Play, Pause, RotateCcw, MoveHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";

interface ExhibitItem {
    id: string;
    num: string;
    title: string;
    shortTitle: string;
    screenTitle: string;
    link: string;
    screenTheme: {
        bg: string;
        text: string;
        badgeBg: string;
        badgeText: string;
    };
}

const EXHIBITS: ExhibitItem[] = [
    {
        id: "aucahack",
        num: "01",
        title: "AUCAHACK",
        shortTitle: "AUCAHACK",
        screenTitle: "AUCAHACK",
        link: "https://aucahack.com",
        screenTheme: {
            bg: "bg-[#0A0A0B]",
            text: "text-white",
            badgeBg: "bg-red-500/10 border-red-500/20",
            badgeText: "text-[#B91C1C]",
        },
    },
    {
        id: "conurat",
        num: "02",
        title: "Conurat Construction",
        shortTitle: "Conurat Construction",
        screenTitle: "CONURAT",
        link: "https://Conurat-Construction.kg",
        screenTheme: {
            bg: "bg-[#060D0A]",
            text: "text-emerald-50",
            badgeBg: "bg-emerald-500/10 border-emerald-500/20",
            badgeText: "text-emerald-400",
        },
    },
    {
        id: "proquiz",
        num: "03",
        title: "ProQuizKG",
        shortTitle: "ProQuizKG",
        screenTitle: "PROQUIZKG",
        link: "https://proquiz.kg",
        screenTheme: {
            bg: "bg-[#060A14]",
            text: "text-blue-50",
            badgeBg: "bg-blue-500/10 border-blue-500/20",
            badgeText: "text-blue-400",
        },
    },
    {
        id: "alfapark",
        num: "04",
        title: "AlfaPark",
        shortTitle: "AlfaPark",
        screenTitle: "ALFAPARK",
        link: "https://alfapark.kg",
        screenTheme: {
            bg: "bg-[#100714]",
            text: "text-fuchsia-50",
            badgeBg: "bg-fuchsia-500/10 border-fuchsia-500/20",
            badgeText: "text-fuchsia-400",
        },
    },
];

export function Projects() {
    const t = useTranslations("ProjectsSection");
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [rotationY, setRotationY] = useState(-25);
    const [isAutoSpin, setIsAutoSpin] = useState(true);
    const [isDragging, setIsDragging] = useState(false);

    const startXRef = useRef(0);
    const startRotRef = useRef(0);
    const stageRef = useRef<HTMLDivElement | null>(null);

    const current = EXHIBITS[selectedIdx];

    useEffect(() => {
        if (!isAutoSpin) return;
        const interval = setInterval(() => {
            setRotationY((prev) => prev + 0.65);
        }, 16);
        return () => clearInterval(interval);
    }, [isAutoSpin]);

    const handleStart = (clientX: number) => {
        setIsDragging(true);
        setIsAutoSpin(false);
        startXRef.current = clientX;
        startRotRef.current = rotationY;
    };

    const handleMove = (clientX: number) => {
        if (!isDragging) return;
        const delta = clientX - startXRef.current;
        setRotationY(startRotRef.current + delta * 0.7);
    };

    const handleEnd = () => {
        setIsDragging(false);
    };

    const angleDisplay = Math.round(((rotationY % 360) + 360) % 360);

    return (
        <section
            id="projects"
            aria-label={t("title")}
            className="w-full bg-[#FAF9F6] text-neutral-900 pt-8 sm:pt-14 pb-14 sm:pb-28 border-t border-neutral-200 select-none overflow-x-clip"
        >
            <div className="max-w-[1412px] mx-auto px-4 xs:px-5 md:px-8 space-y-6 sm:space-y-8">

                {/* Хедер секции */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 pb-5 sm:pb-6 border-b border-neutral-300">
                    <div>
                        <h2 className="font-serif italic text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-neutral-900 leading-none">
                            {t("title")}
                        </h2>
                    </div>

                    <div className="flex items-center gap-3 self-start sm:self-auto">
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-neutral-300 hover:border-neutral-900 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-700 hover:text-black transition-all"
                        >
                            <span>{t("allProjects")}</span>
                            <ArrowUpRight size={14} />
                        </Link>
                    </div>
                </div>

                {/* Главный блок */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">

                    {/* ЛЕВАЯ КОЛОНКА */}
                    <div className="lg:col-span-5 flex flex-col justify-between space-y-6 sm:space-y-8 order-2 lg:order-1">

                        {/* Переключатель проектов с защитой от вылета за пределы экрана */}
                        <div className="max-w-full overflow-x-auto no-scrollbar py-0.5">
                            <div className="flex items-center gap-1.5 p-1.5 bg-neutral-200/60 rounded-2xl w-fit shrink-0">
                                {EXHIBITS.map((item, idx) => {
                                    const isActive = selectedIdx === idx;
                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => setSelectedIdx(idx)}
                                            className={`flex items-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 px-3 sm:px-3.5 rounded-xl font-mono text-xs font-bold transition-all duration-300 cursor-pointer shrink-0 ${
                                                isActive
                                                    ? "bg-white text-neutral-900 shadow-sm"
                                                    : "text-neutral-500 hover:text-neutral-900 hover:bg-white/40"
                                            }`}
                                        >
                                            <span className={isActive ? "text-neutral-900" : "text-neutral-400"}>
                                                {item.num}
                                            </span>
                                            {isActive && (
                                                <span className="font-sans text-xs font-semibold tracking-tight text-neutral-900 animate-in fade-in duration-200 whitespace-nowrap">
                                                    {item.shortTitle}
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Название, тип платформы и описание */}
                        <div className="space-y-3.5 sm:space-y-4">
                            <div className="space-y-2">
                                <h3 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-tight">
                                    {current.title}
                                </h3>

                                <div className="inline-block px-2.5 sm:px-3 py-1 rounded-lg bg-neutral-200/70 border border-neutral-300 text-neutral-800 font-mono text-[11px] sm:text-xs font-semibold">
                                    {t(`items.${current.id}.platform`)}
                                </div>
                            </div>

                            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-lg font-sans">
                                {t(`items.${current.id}.description`)}
                            </p>
                        </div>

                        {/* Кнопка перехода к проекту */}
                        <div className="pt-1 sm:pt-2">
                            <a
                                href={current.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-3.5 rounded-xl bg-neutral-900 hover:bg-black text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
                            >
                                <span>{t("openProject")}</span>
                                <ArrowUpRight size={15} />
                            </a>
                        </div>
                    </div>

                    {/* ПРАВАЯ КОЛОНКА: Витрина с подиумом и ноутбуком */}
                    <div className="lg:col-span-7 flex flex-col items-center justify-center order-1 lg:order-2 w-full">

                        <div
                            ref={stageRef}
                            onMouseDown={(e) => handleStart(e.clientX)}
                            onMouseMove={(e) => handleMove(e.clientX)}
                            onMouseUp={handleEnd}
                            onMouseLeave={handleEnd}
                            onTouchStart={(e) => handleStart(e.touches[0].clientX)}
                            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
                            onTouchEnd={handleEnd}
                            className="relative w-full aspect-[4/3] min-h-[330px] xs:min-h-[360px] sm:min-h-0 max-w-[620px] rounded-[28px] sm:rounded-[36px] bg-gradient-to-b from-[#F2EFE9] to-[#E5E0D6] border border-neutral-300/70 p-4 sm:p-6 flex flex-col items-center justify-center select-none shadow-[inset_0_2px_12px_rgba(255,255,255,0.8),0_20px_50px_rgba(0,0,0,0.06)] [perspective:1400px] cursor-grab active:cursor-grabbing touch-pan-y"
                        >
                            {/* Верхний HUD: градус и управление */}
                            <div className="absolute top-3.5 sm:top-5 inset-x-4 sm:inset-x-6 flex items-center justify-between z-20 pointer-events-none">
                                <div className="px-2.5 sm:px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-neutral-300/80 font-mono text-[10px] sm:text-[11px] font-bold text-neutral-700 tabular-nums shadow-xs">
                                    STAGE: {angleDisplay}°
                                </div>

                                <div className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 p-1 rounded-full bg-white/80 backdrop-blur-md border border-neutral-300/80 shadow-xs">
                                    <button
                                        type="button"
                                        onClick={() => setIsAutoSpin(!isAutoSpin)}
                                        className={`px-2.5 sm:px-3 py-1 rounded-full font-mono text-[9px] sm:text-[10px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                            isAutoSpin
                                                ? "bg-neutral-900 text-white"
                                                : "text-neutral-600 hover:text-black"
                                        }`}
                                    >
                                        {isAutoSpin ? <Pause size={10} /> : <Play size={10} />}
                                        <span>360° SPIN</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsAutoSpin(false);
                                            setRotationY(-25);
                                        }}
                                        className="p-1 text-neutral-500 hover:text-black transition-colors cursor-pointer"
                                        title={t("resetAngle")}
                                    >
                                        <RotateCcw size={12} />
                                    </button>
                                </div>
                            </div>

                            {/* 3D НОУТБУК (Адаптивные размеры под мобильные дисплеи) */}
                            <div
                                style={{
                                    transform: `rotateY(${rotationY}deg) rotateX(8deg)`,
                                    transition: isDragging ? "none" : "transform 0.12s ease-out",
                                }}
                                className="relative z-10 [transform-style:preserve-3d] will-change-transform flex items-center justify-center my-auto"
                            >
                                <div className="relative w-[260px] xs:w-[295px] sm:w-[420px] h-[185px] xs:h-[210px] sm:h-[275px] [transform-style:preserve-3d] flex flex-col items-center">

                                    {/* Тень под экраном */}
                                    <div className="absolute -bottom-5 sm:-bottom-6 w-[88%] h-5 sm:h-7 bg-neutral-900/40 blur-lg sm:blur-xl rounded-full pointer-events-none [transform:translateZ(-20px)]" />

                                    {/* Лицевая панель */}
                                    <div className="absolute inset-0 [backface-visibility:hidden] bg-[#121316] rounded-[16px] sm:rounded-[20px] p-2 sm:p-3 border border-neutral-700/80 shadow-[0_30px_70px_rgba(0,0,0,0.45)] flex flex-col overflow-hidden">

                                        <div className="h-2.5 sm:h-3.5 flex justify-center items-center shrink-0">
                                            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-neutral-800 border border-neutral-700" />
                                        </div>

                                        <div className={`flex-1 rounded-[10px] sm:rounded-[12px] ${current.screenTheme.bg} p-3.5 xs:p-4 sm:p-6 flex flex-col justify-between items-center text-center transition-colors duration-500 overflow-hidden relative border border-white/5`}>

                                            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

                                            <div className="w-full flex justify-between items-center relative z-10">
                                                <span className={`font-mono text-[8px] sm:text-[9px] uppercase tracking-widest px-1.5 sm:px-2 py-0.5 rounded-full border ${current.screenTheme.badgeBg} ${current.screenTheme.badgeText}`}>
                                                    ● LIVE EXHIBIT
                                                </span>
                                                <span className="font-mono text-[8px] sm:text-[9px] text-neutral-500">
                                                    {current.num}
                                                </span>
                                            </div>

                                            {/* Заголовок на экране */}
                                            <div className="my-auto space-y-1 relative z-10">
                                                <h4 className={`font-serif italic text-2xl xs:text-3xl sm:text-5xl font-black tracking-tight ${current.screenTheme.text} transition-colors duration-300 leading-none truncate max-w-[210px] xs:max-w-[240px] sm:max-w-none`}>
                                                    {current.screenTitle}
                                                </h4>
                                            </div>

                                            <div className="w-full flex justify-between items-center relative z-10 font-mono text-[7px] sm:text-[8px] text-neutral-500 pt-1.5 sm:pt-2 border-t border-white/10">
                                                <span>Vital Tech Lab</span>
                                                <span>Precision 360°</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Задняя крышка с логотипом */}
                                    <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950 rounded-[16px] sm:rounded-[20px] border border-neutral-700/80 shadow-2xl flex flex-col items-center justify-center">
                                        <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-neutral-900/90 border border-neutral-700/60 flex items-center justify-center shadow-inner">
                                            <span className="font-serif italic text-base sm:text-lg font-bold text-neutral-300">
                                                V
                                            </span>
                                        </div>
                                        <span className="text-[7px] sm:text-[8px] font-mono uppercase tracking-[0.3em] text-neutral-500 mt-2 sm:mt-3">
                                            Space Black Chassis
                                        </span>
                                    </div>

                                    {/* Основание ноутбука */}
                                    <div className="absolute -bottom-2.5 sm:-bottom-3 w-[280px] xs:w-[320px] sm:w-[455px] h-[9px] sm:h-[12px] bg-gradient-to-b from-neutral-700 via-neutral-800 to-neutral-900 rounded-b-xl border-t border-neutral-600/80 shadow-2xl flex justify-center [transform:translateZ(6px)]">
                                        <div className="w-12 sm:w-16 h-1 bg-neutral-500/80 rounded-b" />
                                    </div>
                                </div>
                            </div>

                            {/* Подиум витрины */}
                            <div className="absolute bottom-5 sm:bottom-6 w-[280px] xs:w-[330px] sm:w-[460px] h-[48px] sm:h-[64px] rounded-[100%] bg-gradient-to-b from-white/90 via-white/50 to-neutral-300/40 border border-white/80 shadow-[0_20px_35px_rgba(0,0,0,0.08)] pointer-events-none flex items-center justify-center [transform:rotateX(68deg)]">
                                <div className="w-[82%] h-[82%] rounded-[100%] border border-dashed border-neutral-400/50" />
                            </div>

                            {/* Жестовый индикатор */}
                            <div className="absolute bottom-2.5 sm:bottom-3.5 z-20 flex items-center gap-2 pointer-events-none text-neutral-800">
                                <MoveHorizontal size={13} className="text-neutral-700 animate-pulse sm:w-3.5 sm:h-3.5" />
                                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.24em] font-semibold">
                                    {t("dragToRotate")}
                                </span>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}

export default Projects;