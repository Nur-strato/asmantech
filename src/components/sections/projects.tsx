"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Play, Pause, RotateCcw, MoveHorizontal } from "lucide-react";

interface ExhibitItem {
    id: string;
    num: string;
    title: string;
    shortTitle: string;
    screenTitle: string;
    platformType: string;
    description: string;
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
        platformType: "Website",
        description:
            "Цифровая среда университета: регистрация на курсы с нулевым трением, предиктивный расчет академического рейтинга GPA и бесконфликтная матрица расписания.",
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
        platformType: "Website",
        description:
            "Оцифровка строительного цикла: от сметных чертежей до сквозной координации поставок бетона и 14 действующих стройплощадок столицы.",
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
        platformType: "Website",
        description:
            "Киберспортивный турнирный движок: микросекундная синхронизация бэззеров для 24 университетских команд одновременно без задержек сети.",
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
        platformType: "Веб-сайт + Мобильное приложение",
        description:
            "Высоконагруженная экосистема для таксопарка: автоматические моментальные выплаты сотням водителей и круглосуточный учет парка.",
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
            aria-label="Витрина работ"
            className="w-full bg-[#FAF9F6] text-neutral-900 pt-10 sm:pt-14 pb-20 sm:pb-28 border-t border-neutral-200 select-none overflow-hidden"
        >
            <div className="max-w-[1412px] mx-auto px-5 md:px-8 space-y-8">

                {/* Хедер секции */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-neutral-300">
                    <div>
                        <h2 className="font-serif italic text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-neutral-900 leading-none">
                            Витрина работ
                        </h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-300 hover:border-neutral-900 font-mono text-xs font-bold uppercase tracking-wider text-neutral-700 hover:text-black transition-all"
                        >
                            <span>Все проекты</span>
                            <ArrowUpRight size={14} />
                        </Link>
                    </div>
                </div>

                {/* Главный блок */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

                    {/* ЛЕВАЯ КОЛОНКА */}
                    <div className="lg:col-span-5 flex flex-col justify-between space-y-8 order-2 lg:order-1">

                        {/* Переключатель [ 01 AUCAHACK ] [ 02 ] [ 03 ] [ 04 ] */}
                        <div className="flex items-center gap-1.5 p-1.5 bg-neutral-200/60 rounded-2xl w-fit">
                            {EXHIBITS.map((item, idx) => {
                                const isActive = selectedIdx === idx;
                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => setSelectedIdx(idx)}
                                        className={`flex items-center gap-2 py-2 px-3.5 rounded-xl font-mono text-xs font-bold transition-all duration-300 cursor-pointer ${
                                            isActive
                                                ? "bg-white text-neutral-900 shadow-sm"
                                                : "text-neutral-500 hover:text-neutral-900 hover:bg-white/40"
                                        }`}
                                    >
                                        <span className={isActive ? "text-neutral-900" : "text-neutral-400"}>
                                            {item.num}
                                        </span>
                                        {isActive && (
                                            <span className="font-sans text-xs font-semibold tracking-tight text-neutral-900 animate-in fade-in duration-200">
                                                {item.shortTitle}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Название, тип платформы и описание */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">
                                    {current.title}
                                </h3>

                                <div className="inline-block px-3 py-1 rounded-lg bg-neutral-200/70 border border-neutral-300 text-neutral-800 font-mono text-xs font-semibold">
                                    {current.platformType}
                                </div>
                            </div>

                            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-lg font-sans">
                                {current.description}
                            </p>
                        </div>

                        {/* Кнопка перехода к проекту */}
                        <div className="pt-2">
                            <a
                                href={current.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-neutral-900 hover:bg-black text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
                            >
                                <span>Открыть проект</span>
                                <ArrowUpRight size={15} />
                            </a>
                        </div>
                    </div>

                    {/* ПРАВАЯ КОЛОНКА: Витрина с подиумом и ноутбуком */}
                    <div className="lg:col-span-7 flex flex-col items-center justify-center order-1 lg:order-2">

                        <div
                            ref={stageRef}
                            onMouseDown={(e) => handleStart(e.clientX)}
                            onMouseMove={(e) => handleMove(e.clientX)}
                            onMouseUp={handleEnd}
                            onMouseLeave={handleEnd}
                            onTouchStart={(e) => handleStart(e.touches[0].clientX)}
                            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
                            onTouchEnd={handleEnd}
                            className="relative w-full aspect-[4/3] max-w-[620px] rounded-[36px] bg-gradient-to-b from-[#F2EFE9] to-[#E5E0D6] border border-neutral-300/70 p-6 flex flex-col items-center justify-center select-none shadow-[inset_0_2px_12px_rgba(255,255,255,0.8),0_20px_50px_rgba(0,0,0,0.06)] [perspective:1400px] cursor-grab active:cursor-grabbing"
                        >
                            {/* Верхний HUD: градус и управление */}
                            <div className="absolute top-5 inset-x-6 flex items-center justify-between z-20 pointer-events-none">
                                <div className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-neutral-300/80 font-mono text-[11px] font-bold text-neutral-700 tabular-nums shadow-xs">
                                    STAGE: {angleDisplay}°
                                </div>

                                <div className="pointer-events-auto flex items-center gap-1.5 p-1 rounded-full bg-white/80 backdrop-blur-md border border-neutral-300/80 shadow-xs">
                                    <button
                                        type="button"
                                        onClick={() => setIsAutoSpin(!isAutoSpin)}
                                        className={`px-3 py-1 rounded-full font-mono text-[10px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
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
                                        title="Сбросить угол"
                                    >
                                        <RotateCcw size={12} />
                                    </button>
                                </div>
                            </div>

                            {/* 3D НОУТБУК */}
                            <div
                                style={{
                                    transform: `rotateY(${rotationY}deg) rotateX(8deg)`,
                                    transition: isDragging ? "none" : "transform 0.12s ease-out",
                                }}
                                className="relative z-10 [transform-style:preserve-3d] will-change-transform flex items-center justify-center my-auto"
                            >
                                <div className="relative w-[320px] sm:w-[420px] h-[230px] sm:h-[275px] [transform-style:preserve-3d] flex flex-col items-center">

                                    {/* Тень под экраном */}
                                    <div className="absolute -bottom-6 w-[88%] h-7 bg-neutral-900/40 blur-xl rounded-full pointer-events-none [transform:translateZ(-20px)]" />

                                    {/* Лицевая панель */}
                                    <div className="absolute inset-0 [backface-visibility:hidden] bg-[#121316] rounded-[20px] p-2.5 sm:p-3 border border-neutral-700/80 shadow-[0_30px_70px_rgba(0,0,0,0.45)] flex flex-col overflow-hidden">

                                        <div className="h-3.5 flex justify-center items-center shrink-0">
                                            <div className="w-2 h-2 rounded-full bg-neutral-800 border border-neutral-700" />
                                        </div>

                                        <div className={`flex-1 rounded-[12px] ${current.screenTheme.bg} p-6 flex flex-col justify-between items-center text-center transition-colors duration-500 overflow-hidden relative border border-white/5`}>

                                            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

                                            <div className="w-full flex justify-between items-center relative z-10">
                                                <span className={`font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full border ${current.screenTheme.badgeBg} ${current.screenTheme.badgeText}`}>
                                                    ● LIVE EXHIBIT
                                                </span>
                                                <span className="font-mono text-[9px] text-neutral-500">
                                                    {current.num}
                                                </span>
                                            </div>

                                            {/* Заголовок на экране */}
                                            <div className="my-auto space-y-1 relative z-10">
                                                <h4 className={`font-serif italic text-3xl sm:text-5xl font-black tracking-tight ${current.screenTheme.text} transition-colors duration-300 leading-none`}>
                                                    {current.screenTitle}
                                                </h4>
                                            </div>

                                            <div className="w-full flex justify-between items-center relative z-10 font-mono text-[8px] text-neutral-500 pt-2 border-t border-white/10">
                                                <span>Vital Tech Lab</span>
                                                <span>Precision 360°</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Задняя крышка с логотипом */}
                                    <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950 rounded-[20px] border border-neutral-700/80 shadow-2xl flex flex-col items-center justify-center">
                                        <div className="w-14 h-14 rounded-full bg-neutral-900/90 border border-neutral-700/60 flex items-center justify-center shadow-inner">
                                            <span className="font-serif italic text-lg font-bold text-neutral-300">
                                                V
                                            </span>
                                        </div>
                                        <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-neutral-500 mt-3">
                                            Space Black Chassis
                                        </span>
                                    </div>

                                    {/* Основание ноутбука */}
                                    <div className="absolute -bottom-3 w-[350px] sm:w-[455px] h-[12px] bg-gradient-to-b from-neutral-700 via-neutral-800 to-neutral-900 rounded-b-xl border-t border-neutral-600/80 shadow-2xl flex justify-center [transform:translateZ(6px)]">
                                        <div className="w-16 h-1 bg-neutral-500/80 rounded-b" />
                                    </div>
                                </div>
                            </div>

                            {/* Подиум витрины */}
                            <div className="absolute bottom-6 w-[360px] sm:w-[460px] h-[64px] rounded-[100%] bg-gradient-to-b from-white/90 via-white/50 to-neutral-300/40 border border-white/80 shadow-[0_20px_35px_rgba(0,0,0,0.08)] pointer-events-none flex items-center justify-center [transform:rotateX(68deg)]">
                                <div className="w-[82%] h-[82%] rounded-[100%] border border-dashed border-neutral-400/50" />
                            </div>

                            {/* Жестовый индикатор */}
                            <div className="absolute bottom-3.5 z-20 flex items-center gap-2.5 pointer-events-none text-neutral-800">
                                <MoveHorizontal size={15} className="text-neutral-700 animate-pulse" />
                                <span className="font-mono text-[10px] uppercase tracking-[0.24em] font-semibold">
                                    Drag to rotate 360°
                                </span>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}

export default Projects;