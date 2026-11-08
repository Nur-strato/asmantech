"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
    X,
    Maximize2,
    Minimize2,
} from "lucide-react";
import { InteractiveSandbox } from "./interactive";

export type ModalTab = "story" | "architecture" | "metrics";
type StageLightingMode = "obsidian" | "studio" | "cyber";

export interface ProjectItem {
    id: string;
    index: string;
    title: string;
    client: string;
    category: string;
    servicesTag: string;
    description: string;
    stack: string[];
    bgTone: string;
    glow: string;
    curatorQuote: string;
    statement: string;
    challenge: string;
    architecture: string;
    endpoints: string[];
    metrics: { label: string; value: string; desc: string }[];
}

export interface SplitCinemaModalProps {
    project: ProjectItem | null;
    soundEnabled: boolean;
    onClose: () => void;
    onPlaySound: (type: "click" | "toggle" | "zoom" | "close") => void;
}

// Синтезатор звука
function playLabSound(type: "sub_whoosh" | "relay_click" | "hologram_beep") {
    if (typeof window === "undefined") return;
    try {
        const AudioCtx =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const now = ctx.currentTime;

        if (type === "sub_whoosh") {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = "sine";
            osc.frequency.setValueAtTime(70, now);
            osc.frequency.exponentialRampToValueAtTime(260, now + 0.16);
            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
            osc.start(now);
            osc.stop(now + 0.18);
        } else if (type === "relay_click") {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = "triangle";
            osc.frequency.setValueAtTime(920, now);
            osc.frequency.exponentialRampToValueAtTime(120, now + 0.02);
            gain.gain.setValueAtTime(0.03, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
            osc.start(now);
            osc.stop(now + 0.02);
        } else if (type === "hologram_beep") {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = "sine";
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(1040, now + 0.03);
            gain.gain.setValueAtTime(0.02, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
            osc.start(now);
            osc.stop(now + 0.05);
        }
    } catch {
        // браузер заблокировал аудио
    }
}

// 3D Ноутбук на подиуме
function ExhibitionLaptop({
                              project,
                              isZoomed,
                          }: {
    project: ProjectItem;
    isZoomed: boolean;
}) {
    return (
        <div
            className={`relative transition-all duration-700 ease-out [transform-style:preserve-3d] flex flex-col items-center ${
                isZoomed
                    ? "w-[94vw] max-w-[1140px] h-[68vh] sm:h-[76vh]"
                    : "w-[340px] sm:w-[440px] h-[260px]"
            }`}
        >
            <div
                className={`absolute bg-black/95 blur-2xl rounded-full pointer-events-none transition-all duration-700 [transform:translateZ(-16px)] ${
                    isZoomed ? "-bottom-10 w-[95%] h-14" : "-bottom-8 w-[88%] h-8"
                }`}
            />

            <div className="absolute inset-0 [backface-visibility:hidden] rounded-[22px] p-2.5 sm:p-3 border shadow-[0_40px_100px_rgba(0,0,0,0.98)] flex flex-col overflow-hidden bg-neutral-950 border-neutral-800">
                <div className="h-4 sm:h-5 bg-black px-3 flex items-center justify-between border-b border-neutral-900 shrink-0">
                    <div className="flex gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    </div>
                    <span className="text-[9px] font-mono text-neutral-500 tracking-[0.2em] uppercase">
                        {project.id}.manifest
                    </span>
                </div>

                <InteractiveSandbox project={project} isZoomed={isZoomed} />
            </div>

            <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] bg-gradient-to-br from-neutral-900 via-neutral-950 to-black rounded-[22px] border border-neutral-700/60 shadow-2xl flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-700/80 flex items-center justify-center shadow-inner">
                    <span className="font-mono font-black text-xs text-neutral-400 tracking-wider">A³²</span>
                </div>
                <div className="text-[9px] font-mono uppercase tracking-[0.3em] text-neutral-500 mt-3 font-medium">
                    Atelier Chassis Spec
                </div>
            </div>

            <div
                className={`absolute -bottom-3.5 h-[14px] bg-gradient-to-b from-neutral-800 via-neutral-900 to-black rounded-b-xl border-t border-neutral-600/60 shadow-2xl flex justify-center [transform:translateZ(4px)] transition-all duration-700 ${
                    isZoomed ? "w-[96vw] max-w-[1180px]" : "w-[375px] sm:w-[475px]"
                }`}
            >
                <div className="w-20 h-1 bg-neutral-700 rounded-b" />
            </div>
        </div>
    );
}

// 1. Модули для Konurat Construction
const conuratModules = [
    {
        num: "1",
        title: "Премиальный первый экран",
        desc: "Крупная архитектурная 3D-визуализация жилого комплекса, кинематографичная анимация, элегантная типографика и плавное появление элементов. Минимум лишних кнопок.",
        goal: "с первых секунд создать ощущение надёжного застройщика.",
        preview: (
            <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 flex items-center justify-center p-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-radial from-amber-500/15 via-transparent to-transparent opacity-60" />
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                    <polygon points="20,85 50,75 50,15 20,25" fill="#404040" />
                    <polygon points="50,75 80,85 80,25 50,15" fill="#525252" />
                    <polygon points="20,25 50,15 80,25 50,35" fill="#737373" />
                    <line x1="26" y1="38" x2="45" y2="32" stroke="#fef08a" strokeWidth="1.5" opacity="0.8" />
                    <line x1="26" y1="50" x2="45" y2="44" stroke="#fef08a" strokeWidth="1.5" opacity="0.8" />
                    <line x1="26" y1="62" x2="45" y2="56" stroke="#fef08a" strokeWidth="1.5" opacity="0.8" />
                    <line x1="55" y1="32" x2="74" y2="38" stroke="#fef08a" strokeWidth="1.5" opacity="0.8" />
                    <line x1="55" y1="44" x2="74" y2="50" stroke="#fef08a" strokeWidth="1.5" opacity="0.8" />
                    <line x1="55" y1="56" x2="74" y2="62" stroke="#fef08a" strokeWidth="1.5" opacity="0.8" />
                </svg>
            </div>
        ),
    },
    {
        num: "2",
        title: "Интерактивный выбор квартиры в 3D",
        desc: "Пользователь вращает модель здания, выбирает этаж и квартиру, изучает планировку, площадь, количество комнат и доступность. В идеале — переключается между 2D-планом и 3D-интерьером.",
        goal: "превратить просмотр сайта в цифровой показ недвижимости.",
        preview: (
            <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 flex items-center justify-center p-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-radial from-sky-500/15 via-transparent to-transparent opacity-60" />
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                    <polygon points="15,65 50,85 85,65 50,45" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1.5" />
                    <polygon points="15,65 50,85 50,92 15,72" fill="#0284c7" />
                    <polygon points="50,85 85,65 85,72 50,92" fill="#0369a1" />
                    <line x1="50" y1="45" x2="50" y2="85" stroke="#bae6fd" strokeWidth="2" />
                    <line x1="32" y1="55" x2="68" y2="75" stroke="#bae6fd" strokeWidth="2" />
                    <rect x="25" y="60" width="12" height="8" rx="2" fill="#f8fafc" opacity="0.7" transform="rotate(-15 25 60)" />
                    <circle cx="65" cy="62" r="5" fill="#f8fafc" opacity="0.7" />
                </svg>
            </div>
        ),
    },
    {
        num: "3",
        title: "Интерактивная модель территории",
        desc: "3D-модель участка с корпусами, парковкой, детскими площадками, зелёными зонами и инфраструктурой. При нажатии на объекты открывается дополнительная информация.",
        goal: "показать не только квартиру, но и среду, в которой будет жить покупатель.",
        preview: (
            <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 flex items-center justify-center p-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-radial from-emerald-500/15 via-transparent to-transparent opacity-60" />
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                    <polygon points="15,50 50,70 85,50 50,30" fill="#15803d" stroke="#22c55e" strokeWidth="1.5" />
                    <polygon points="35,62 50,70 65,62 50,54" fill="#166534" />
                    <polygon points="20,40 35,32 35,50 20,58" fill="#e2e8f0" />
                    <polygon points="35,32 45,37 45,55 35,50" fill="#cbd5e1" />
                    <circle cx="60" cy="46" r="6" fill="#4ade80" />
                    <circle cx="70" cy="52" r="5" fill="#22c55e" />
                </svg>
            </div>
        ),
    },
    {
        num: "4",
        title: "Динамический калькулятор рассрочки",
        desc: "Клиент выбирает квартиру, первоначальный взнос и срок рассрочки. Сайт мгновенно показывает первоначальный платёж, ежемесячный платёж, остаток и итоговую стоимость.",
        goal: "дать покупателю понятные цифры ещё до разговора с менеджером.",
        preview: (
            <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 flex items-center justify-center p-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-radial from-amber-500/15 via-transparent to-transparent opacity-60" />
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                    <rect x="20" y="20" width="60" height="60" rx="8" fill="#171717" stroke="#eab308" strokeWidth="1.5" />
                    <rect x="26" y="26" width="48" height="18" rx="4" fill="#262626" />
                    <line x1="30" y1="36" x2="48" y2="36" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="34" cy="54" r="3.5" fill="#737373" />
                    <circle cx="50" cy="54" r="3.5" fill="#737373" />
                    <circle cx="66" cy="54" r="3.5" fill="#facc15" />
                    <circle cx="34" cy="68" r="3.5" fill="#737373" />
                    <circle cx="50" cy="68" r="3.5" fill="#737373" />
                    <circle cx="66" cy="68" r="3.5" fill="#22c55e" />
                </svg>
            </div>
        ),
    },
    {
        num: "5",
        title: "Интеграция 2GIS",
        desc: "Карта с расположением комплекса, дорогами, остановками, школами, магазинами и другой инфраструктурой поблизости. Можно добавить кнопку построения маршрута.",
        goal: "показать реальное расположение объекта и удобство района.",
        preview: (
            <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 flex items-center justify-center p-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-radial from-red-500/15 via-transparent to-transparent opacity-60" />
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                    <path d="M 15 50 Q 50 40 85 60" fill="none" stroke="#525252" strokeWidth="6" />
                    <path d="M 50 15 L 50 85" fill="none" stroke="#525252" strokeWidth="5" />
                    <g transform="translate(50, 48)">
                        <path d="M 0 -22 C -7 -22 -12 -17 -12 -10 C -12 0 0 10 0 10 C 0 10 12 0 12 -10 C 12 -17 7 -22 0 -22 Z" fill="#ef4444" />
                        <circle cx="0" cy="-10" r="4.5" fill="#ffffff" />
                    </g>
                </svg>
            </div>
        ),
    },
];

// 2. Модули для AUCAHACK
const aucahackModules = [
    {
        num: "1",
        title: "Интерактивный каталог курсов и преподавателей",
        desc: "Поиск по курсам, кафедрам и преподавателям, фильтры, отзывы студентов, информация о сложности и нагрузке. Удобные страницы курсов и профили преподавателей с единой системой отображения данных.",
        goal: "помочь студентам принимать более информированные академические решения.",
        preview: (
            <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 flex items-center justify-center p-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-radial from-indigo-500/15 via-transparent to-transparent opacity-60" />
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                    <rect x="20" y="20" width="60" height="60" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <circle cx="36" cy="38" r="8" fill="#818cf8" />
                    <rect x="50" y="32" width="22" height="4" rx="2" fill="#e0e7ff" />
                    <rect x="50" y="40" width="16" height="3" rx="1.5" fill="#a5b4fc" />
                    <line x1="28" y1="54" x2="72" y2="54" stroke="#4338ca" strokeWidth="1" />
                    <circle cx="34" cy="64" r="3" fill="#facc15" />
                    <circle cx="44" cy="64" r="3" fill="#facc15" />
                    <circle cx="54" cy="64" r="3" fill="#facc15" />
                    <circle cx="64" cy="64" r="3" fill="#facc15" />
                </svg>
            </div>
        ),
    },
    {
        num: "2",
        title: "Инструменты для облегчения учебы",
        desc: "GPA Calculator, GPA Goal, Progress Tracker и Deadline Tracker в единой системе. Студент меняет предполагаемые оценки и сразу видит прогноз GPA, необходимый результат для достижения цели и свой академический прогресс.",
        goal: "превратить разрозненные инструменты в персональную систему управления учёбой.",
        preview: (
            <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 flex items-center justify-center p-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-radial from-emerald-500/15 via-transparent to-transparent opacity-60" />
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                    <circle cx="50" cy="50" r="28" fill="none" stroke="#262626" strokeWidth="6" />
                    <circle cx="50" cy="50" r="28" fill="none" stroke="#10b981" strokeWidth="6" strokeDasharray="175" strokeDashoffset="45" strokeLinecap="round" transform="rotate(-90 50 50)" />
                    <text x="50" y="55" textAnchor="middle" fill="#ffffff" fontSize="13" fontFamily="monospace" fontWeight="bold">3.92</text>
                    <text x="50" y="42" textAnchor="middle" fill="#10b981" fontSize="7" fontFamily="monospace" fontWeight="bold">GPA</text>
                </svg>
            </div>
        ),
    },
    {
        num: "3",
        title: "Умный поиск и AI-помощник",
        desc: "Единый поиск по курсам, преподавателям, lifehacks, стипендиям и клубам. В перспективе — AI-помощник, который отвечает на вопросы на основе проверенных данных AUCAHACK и указывает источники информации.",
        goal: "позволить студенту находить нужную информацию за секунды, не переходя между десятками страниц.",
        preview: (
            <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 flex items-center justify-center p-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-radial from-violet-500/15 via-transparent to-transparent opacity-60" />
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                    <circle cx="44" cy="44" r="18" fill="none" stroke="#a855f7" strokeWidth="3" />
                    <line x1="57" y1="57" x2="74" y2="74" stroke="#a855f7" strokeWidth="4" strokeLinecap="round" />
                    <path d="M 44 32 Q 44 44 56 44 Q 44 44 44 56 Q 44 44 32 44 Q 44 44 44 32 Z" fill="#e879f9" />
                </svg>
            </div>
        ),
    },
    {
        num: "4",
        title: "Интерактивная карта AUCA",
        desc: "Карта кампуса с корпусами, аудиториями, офисами и полезными местами. Поиск локаций, описания объектов и удобная навигация. В дальнейшем — этажи и внутренняя карта помещений при наличии точных планов.",
        goal: "сделать навигацию по кампусу простой и доступной для студентов.",
        preview: (
            <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 flex items-center justify-center p-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-radial from-teal-500/15 via-transparent to-transparent opacity-60" />
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                    <polygon points="15,45 50,25 85,45 50,65" fill="#134e4a" stroke="#14b8a6" strokeWidth="1.5" />
                    <polygon points="25,48 45,37 60,45 40,56" fill="#0f766e" />
                    <g transform="translate(50, 42)">
                        <path d="M 0 -18 C -6 -18 -10 -14 -10 -8 C -10 0 0 10 0 10 C 0 10 10 0 10 -8 C 10 -14 6 -18 0 -18 Z" fill="#2dd4bf" />
                        <circle cx="0" cy="-8" r="3.5" fill="#ffffff" />
                    </g>
                </svg>
            </div>
        ),
    },
    {
        num: "5",
        title: "Единая экосистема студенческой жизни",
        desc: "Market, Lost & Found, Clubs, Scholarships, Student Senate и Lifehacks в едином интерфейсе. Поиск, фильтры, публикации и актуальные объявления с удобной модерацией.",
        goal: "объединить академическую жизнь, студенческое сообщество и полезные возможности AUCA на одной платформе.",
        preview: (
            <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 flex items-center justify-center p-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-radial from-rose-500/15 via-transparent to-transparent opacity-60" />
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                    <circle cx="30" cy="35" r="9" fill="#f43f5e" />
                    <circle cx="70" cy="35" r="9" fill="#fb7185" />
                    <circle cx="50" cy="68" r="10" fill="#fda4af" />
                    <line x1="30" y1="35" x2="70" y2="35" stroke="#9f1239" strokeWidth="2" />
                    <line x1="30" y1="35" x2="50" y2="68" stroke="#9f1239" strokeWidth="2" />
                    <line x1="70" y1="35" x2="50" y2="68" stroke="#9f1239" strokeWidth="2" />
                </svg>
            </div>
        ),
    },
    {
        num: "6",
        title: "Полноценная мобильная версия",
        desc: "Быстрый интерфейс для смартфонов, удобная навигация, адаптивные каталоги, работа с дедлайнами и GPA-инструментами без лишних действий. Поддержка светлой и тёмной тем, RU / EN / KG и настроек доступности.",
        goal: "обеспечить одинаково качественный пользовательский опыт на компьютере и смартфоне.",
        preview: (
            <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 flex items-center justify-center p-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-radial from-cyan-500/15 via-transparent to-transparent opacity-60" />
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                    <rect x="30" y="15" width="40" height="70" rx="9" fill="#171717" stroke="#06b6d4" strokeWidth="2" />
                    <line x1="44" y1="20" x2="56" y2="20" stroke="#525252" strokeWidth="1.5" strokeLinecap="round" />
                    <rect x="36" y="27" width="28" height="10" rx="3" fill="#0891b2" />
                    <rect x="36" y="42" width="28" height="6" rx="2" fill="#22d3ee" opacity="0.6" />
                    <rect x="36" y="52" width="28" height="6" rx="2" fill="#22d3ee" opacity="0.6" />
                    <circle cx="50" cy="74" r="3" fill="#525252" />
                </svg>
            </div>
        ),
    },
    {
        num: "7",
        title: "Максимальная производительность и оптимизация",
        desc: "Несмотря на огромный каталог курсов, преподавателей и тьюторов, интерактивную карту кампуса и множество функций, AUCAHACK остаётся быстрым благодаря точечной оптимизации, умному кэшированию, ленивой загрузке и эффективной работе с базой данных.",
        goal: "обеспечить мгновенную загрузку страниц, плавную работу и минимальное потребление ресурсов даже на слабых устройствах.",
        preview: (
            <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 flex items-center justify-center p-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-radial from-amber-500/15 via-transparent to-transparent opacity-60" />
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                    <path d="M 22 65 A 32 32 0 1 1 78 65" fill="none" stroke="#262626" strokeWidth="6" strokeLinecap="round" />
                    <path d="M 22 65 A 32 32 0 1 1 78 65" fill="none" stroke="#eab308" strokeWidth="6" strokeDasharray="140" strokeDashoffset="25" strokeLinecap="round" />
                    <line x1="50" y1="56" x2="68" y2="40" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="50" cy="56" r="4.5" fill="#ffffff" />
                </svg>
            </div>
        ),
    },
];

// 3. Модули для ProQuizKG
const proquizModules = [
    {
        num: "1",
        title: "Интерактивный первый экран с эффектом свечения",
        desc: "Тёмно-синее пространство с логотипом ProQuizKG в центре. При наведении курсора на логотип постепенно появляется свет, освещая окружающее пространство и открывая интересные факты об интеллектуальных играх, знаниях и проекте. Атмосферная анимация, эффект глубины и скрытые интерактивные элементы.",
        goal: "создать уникальный, запоминающийся первый экран, который вызывает любопытство и вовлекает посетителя во взаимодействие с платформой.",
        preview: (
            <div className="w-full h-full bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] flex items-center justify-center p-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-radial from-blue-500/25 via-indigo-500/10 to-transparent opacity-80" />
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]">
                    <circle cx="50" cy="50" r="32" fill="#0f172a" stroke="#3b82f6" strokeWidth="1.5" />
                    <circle cx="50" cy="50" r="22" fill="#1e293b" stroke="#60a5fa" strokeWidth="1" strokeDasharray="4 2" />
                    <text x="50" y="55" textAnchor="middle" fill="#93c5fd" fontSize="14" fontFamily="monospace" fontWeight="900" letterSpacing="1">PQ</text>
                    <line x1="50" y1="12" x2="50" y2="24" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
                    <line x1="50" y1="76" x2="50" y2="88" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
                    <line x1="12" y1="50" x2="24" y2="50" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
                    <line x1="76" y1="50" x2="88" y2="50" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </div>
        ),
    },
    {
        num: "2",
        title: "Личные кабинеты команд и университетов",
        desc: "Профили команд, составы участников, история игр, достижения и статистика. Представители университетов смогут управлять своими командами, отслеживать регистрацию, расписание матчей и результаты соревнований.",
        goal: "объединить участников и университеты в единую цифровую систему интеллектуальной лиги.",
        preview: (
            <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 flex items-center justify-center p-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-radial from-sky-500/15 via-transparent to-transparent opacity-60" />
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                    <rect x="18" y="22" width="64" height="56" rx="8" fill="#0c4a6e" stroke="#0ea5e9" strokeWidth="1.5" />
                    {/* Иконка профиля/герба вуза */}
                    <circle cx="36" cy="42" r="9" fill="#38bdf8" />
                    <rect x="52" y="36" width="22" height="4" rx="2" fill="#f0f9ff" />
                    <rect x="52" y="44" width="16" height="3" rx="1.5" fill="#7dd3fc" />
                    {/* Список участников */}
                    <line x1="26" y1="58" x2="74" y2="58" stroke="#0369a1" strokeWidth="1" />
                    <circle cx="32" cy="67" r="3.5" fill="#38bdf8" />
                    <circle cx="44" cy="67" r="3.5" fill="#38bdf8" />
                    <circle cx="56" cy="67" r="3.5" fill="#38bdf8" />
                    <circle cx="68" cy="67" r="3.5" fill="#38bdf8" />
                </svg>
            </div>
        ),
    },
    {
        num: "3",
        title: "Единая система турниров и рейтингов",
        desc: "Регистрация команд, турнирные сетки, результаты матчей, таблицы лидеров и история соревнований. Автоматическое продвижение команд между этапами — от отборочных игр до финала.",
        goal: "сделать соревнования прозрачными, структурированными и понятными для всех участников.",
        preview: (
            <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 flex items-center justify-center p-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-radial from-amber-500/15 via-transparent to-transparent opacity-60" />
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                    {/* Турнирная сетка (Playoffs Bracket) */}
                    <rect x="15" y="25" width="20" height="10" rx="2" fill="#334155" stroke="#94a3b8" strokeWidth="1" />
                    <rect x="15" y="45" width="20" height="10" rx="2" fill="#334155" stroke="#94a3b8" strokeWidth="1" />
                    <path d="M 35 30 L 45 30 L 45 40 L 55 40" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
                    <path d="M 35 50 L 45 50 L 45 40" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
                    {/* Победитель раунда */}
                    <rect x="55" y="35" width="26" height="12" rx="3" fill="#b45309" stroke="#fbbf24" strokeWidth="1.5" />
                    <polygon points="68,26 71,32 65,32" fill="#facc15" />
                </svg>
            </div>
        ),
    },
    {
        num: "4",
        title: "Профессиональная система управления турнирами",
        desc: "Панель организатора для управления вопросами, таймерами, счётом, участниками и расписанием. Разграничение ролей ведущего, судьи и администратора, журнал изменений и надёжная фиксация результатов.",
        goal: "обеспечить честность, контроль и прозрачность турнирных процедур.",
        preview: (
            <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 flex items-center justify-center p-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-radial from-emerald-500/15 via-transparent to-transparent opacity-60" />
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                    {/* Таймер турнира + панель судейства */}
                    <circle cx="50" cy="50" r="26" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <line x1="50" y1="50" x2="50" y2="34" stroke="#6ee7b7" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="50" y1="50" x2="62" y2="50" stroke="#6ee7b7" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="50" cy="50" r="3.5" fill="#ffffff" />
                    {/* Клавиши счёта */}
                    <circle cx="24" cy="24" r="5" fill="#059669" />
                    <circle cx="76" cy="24" r="5" fill="#059669" />
                </svg>
            </div>
        ),
    },
    {
        num: "5",
        title: "Межуниверситетская лига Кыргызстана",
        desc: "Единый календарь турниров, регистрация университетов, публикация результатов, новости и фотографии соревнований. Возможность отслеживать развитие команд и организовывать регулярные встречи между вузами.",
        goal: "превратить отдельные квизы в устойчивое межуниверситетское движение с едиными правилами и равными возможностями участия.",
        preview: (
            <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 flex items-center justify-center p-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-radial from-red-500/15 via-transparent to-transparent opacity-60" />
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                    {/* Кубок лиги с элементами единства */}
                    <path d="M 32 30 L 68 30 L 62 56 C 58 64 42 64 38 56 Z" fill="#991b1b" stroke="#ef4444" strokeWidth="1.5" />
                    <path d="M 32 34 C 22 34 22 46 34 46" fill="none" stroke="#ef4444" strokeWidth="1.5" />
                    <path d="M 68 34 C 78 34 78 46 66 46" fill="none" stroke="#ef4444" strokeWidth="1.5" />
                    <rect x="47" y="62" width="6" height="12" fill="#dc2626" />
                    <rect x="36" y="74" width="28" height="6" rx="2" fill="#ef4444" />
                </svg>
            </div>
        ),
    },
    {
        num: "6",
        title: "Умная регистрация участников",
        desc: "Удобная система регистрации университетов, команд и отдельных участников с проверкой данных, управлением составами и автоматическим подтверждением заявок. Контроль количества мест, сроков регистрации и статуса каждой команды.",
        goal: "упростить организацию турниров, сократить ручную работу и минимизировать ошибки при регистрации.",
        preview: (
            <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 flex items-center justify-center p-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-radial from-teal-500/15 via-transparent to-transparent opacity-60" />
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                    {/* Чеклист / верификация заявки */}
                    <rect x="24" y="20" width="52" height="60" rx="8" fill="#134e4a" stroke="#14b8a6" strokeWidth="1.5" />
                    <circle cx="36" cy="36" r="4" fill="#2dd4bf" />
                    <line x1="46" y1="36" x2="66" y2="36" stroke="#ccfbf1" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="36" cy="50" r="4" fill="#2dd4bf" />
                    <line x1="46" y1="50" x2="66" y2="50" stroke="#ccfbf1" strokeWidth="2" strokeLinecap="round" />
                    {/* Зеленая галочка верификации */}
                    <path d="M 32 64 L 37 69 L 46 60" fill="none" stroke="#5eead4" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="52" y1="64" x2="66" y2="64" stroke="#ccfbf1" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </div>
        ),
    },
    {
        num: "7",
        title: "Интерактивная карта университетов Бишкека",
        desc: "Интерактивная карта с расположением участвующих университетов, адресами и информацией о площадках проведения турниров. Студенты смогут находить нужный вуз, изучать местоположение и прокладывать маршрут к месту соревнования.",
        goal: "упростить навигацию между университетами и сделать участие в межвузовских турнирах доступнее для студентов.",
        preview: (
            <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 flex items-center justify-center p-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-radial from-orange-500/15 via-transparent to-transparent opacity-60" />
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                    {/* Карта Бишкека с пинами вузов */}
                    <path d="M 18 55 Q 50 42 82 58" fill="none" stroke="#78350f" strokeWidth="5" />
                    <path d="M 46 20 L 54 80" fill="none" stroke="#78350f" strokeWidth="4" />
                    <g transform="translate(50, 44)">
                        <path d="M 0 -20 C -7 -20 -11 -15 -11 -9 C -11 0 0 10 0 10 C 0 10 11 0 11 -9 C 11 -15 7 -20 0 -20 Z" fill="#f97316" />
                        <circle cx="0" cy="-9" r="4" fill="#ffffff" />
                    </g>
                    <circle cx="30" cy="50" r="3.5" fill="#fdba74" />
                    <circle cx="70" cy="54" r="3.5" fill="#fdba74" />
                </svg>
            </div>
        ),
    },
    {
        num: "8",
        title: "Полноценная мобильная версия",
        desc: "Адаптивная платформа для регистрации, просмотра расписания, результатов и турнирных таблиц со смартфона. Удобный интерфейс для участников, организаторов и зрителей без необходимости устанавливать отдельное приложение.",
        goal: "обеспечить доступ к лиге в любое время и с любого устройства.",
        preview: (
            <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 flex items-center justify-center p-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-radial from-cyan-500/15 via-transparent to-transparent opacity-60" />
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                    <rect x="30" y="15" width="40" height="70" rx="9" fill="#171717" stroke="#06b6d4" strokeWidth="2" />
                    <line x1="44" y1="20" x2="56" y2="20" stroke="#525252" strokeWidth="1.5" strokeLinecap="round" />
                    <rect x="36" y="27" width="28" height="12" rx="3" fill="#0891b2" />
                    <rect x="36" y="44" width="28" height="6" rx="2" fill="#22d3ee" opacity="0.6" />
                    <rect x="36" y="54" width="28" height="6" rx="2" fill="#22d3ee" opacity="0.6" />
                    <circle cx="50" cy="74" r="3" fill="#525252" />
                </svg>
            </div>
        ),
    },
    {
        num: "9",
        title: "Максимальная производительность и надёжность",
        desc: "Быстрая загрузка страниц, оптимизированные запросы к базе данных, кэширование и оперативное обновление турнирных результатов. Надёжное хранение данных и защита от случайного изменения результатов во время соревнований.",
        goal: "обеспечить стабильную работу платформы, прозрачность результатов и комфортное использование даже при высокой нагрузке.",
        preview: (
            <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 flex items-center justify-center p-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-radial from-yellow-500/15 via-transparent to-transparent opacity-60" />
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                    <path d="M 22 65 A 32 32 0 1 1 78 65" fill="none" stroke="#262626" strokeWidth="6" strokeLinecap="round" />
                    <path d="M 22 65 A 32 32 0 1 1 78 65" fill="none" stroke="#eab308" strokeWidth="6" strokeDasharray="140" strokeDashoffset="25" strokeLinecap="round" />
                    <line x1="50" y1="56" x2="68" y2="40" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="50" cy="56" r="4.5" fill="#ffffff" />
                </svg>
            </div>
        ),
    },
];

export default function SplitCinemaModal({
                                             project,
                                             soundEnabled,
                                             onClose,
                                         }: SplitCinemaModalProps) {
    const [rotationY, setRotationY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);
    const [lightingMode, setLightingMode] = useState<StageLightingMode>("obsidian");
    const [mounted, setMounted] = useState(false);
    const startXRef = useRef(0);
    const startRotRef = useRef(0);

    useEffect(() => {
        setMounted(true);
        if (soundEnabled) playLabSound("sub_whoosh");
    }, [soundEnabled]);

    useEffect(() => {
        if (!project || isZoomed) return;
        const interval = setInterval(() => {
            setRotationY((prev) => prev + 0.7);
        }, 16);
        return () => clearInterval(interval);
    }, [project, isZoomed]);

    useEffect(() => {
        if (!project) return;
        document.body.style.overflow = "hidden";
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                if (isZoomed) {
                    setIsZoomed(false);
                } else {
                    onClose();
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [project, isZoomed, onClose]);

    if (!project || !mounted) return null;

    const handleStart = (clientX: number) => {
        if (isZoomed) return;
        setIsDragging(true);
        startXRef.current = clientX;
        startRotRef.current = rotationY;
        if (soundEnabled) playLabSound("relay_click");
    };

    const handleMove = (clientX: number) => {
        if (!isDragging || isZoomed) return;
        const delta = clientX - startXRef.current;
        setRotationY(startRotRef.current + delta * 0.9);
    };

    const handleEnd = () => {
        setIsDragging(false);
    };

    const toggleZoom = () => {
        if (!isZoomed) {
            setRotationY(0);
        }
        setIsZoomed(!isZoomed);
        if (soundEnabled) playLabSound("hologram_beep");
    };

    const changeLighting = (mode: StageLightingMode) => {
        if (lightingMode === mode) return;
        setLightingMode(mode);
        if (soundEnabled) playLabSound("relay_click");
    };

    const stageGlowStyle =
        lightingMode === "obsidian"
            ? project.glow
            : lightingMode === "studio"
                ? "rgba(255, 255, 255, 0.35)"
                : "rgba(34, 211, 238, 0.35)";

    const displayAngle = Math.round(((rotationY % 360) + 360) % 360);

    // Динамический выбор списка модулей под текущий проект
    const activeModules =
        project.id === "aucahack"
            ? aucahackModules
            : project.id === "proquizkg"
                ? proquizModules
                : conuratModules;

    return createPortal(
        <div className="fixed inset-0 w-screen h-screen z-[999999] overflow-hidden flex flex-col bg-[#050507] text-white animate-in fade-in duration-300 font-sans selection:bg-white selection:text-black">
            {/* ХЕДЕР */}
            <header className="h-16 px-8 sm:px-14 border-b border-white/[0.08] flex items-center justify-between shrink-0 select-none bg-black/90 backdrop-blur-2xl z-50">
                <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                    <span className="text-xs sm:text-sm font-mono tracking-[0.35em] text-neutral-400 uppercase font-medium">
                        PORTFOLIO // {project.index}
                    </span>
                </div>

                <div className="text-xs sm:text-sm font-mono tracking-[0.45em] text-white/90 uppercase text-center truncate max-w-xs sm:max-w-md font-bold">
                    {project.title}
                </div>

                <button
                    type="button"
                    onClick={() => {
                        if (soundEnabled) playLabSound("relay_click");
                        onClose();
                    }}
                    className="text-xs font-mono tracking-[0.3em] text-neutral-400 hover:text-white transition-all duration-300 cursor-pointer flex items-center gap-2.5 uppercase group"
                >
                    <span className="hidden sm:inline">CLOSE</span>
                    <X size={15} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
            </header>

            {/* СПЛИТ-ЭКРАН */}
            <div className="flex-1 w-full h-[calc(100vh-4rem)] flex flex-col lg:flex-row overflow-hidden relative">
                {/* ЛЕВАЯ ПОЛОВИНА: 3D ПОДИУМ */}
                <div
                    className={`transition-all duration-700 ease-out bg-gradient-to-b ${project.bgTone} relative flex flex-col items-center justify-center select-none [perspective:1600px] overflow-hidden ${
                        isZoomed
                            ? "w-full absolute inset-0 z-40 p-4 sm:p-8"
                            : "w-full lg:w-1/2 h-[42vh] lg:h-full border-b lg:border-b-0 lg:border-r border-white/[0.08]"
                    }`}
                    onMouseDown={(e) => handleStart(e.clientX)}
                    onMouseMove={(e) => handleMove(e.clientX)}
                    onMouseUp={handleEnd}
                    onMouseLeave={handleEnd}
                    onTouchStart={(e) => handleStart(e.touches[0].clientX)}
                    onTouchMove={(e) => handleMove(e.touches[0].clientX)}
                    onTouchEnd={handleEnd}
                    style={{ cursor: isZoomed ? "default" : isDragging ? "grabbing" : "grab" }}
                >
                    <div
                        className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{
                            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                            backgroundSize: "40px 40px",
                        }}
                    />

                    <div
                        className="absolute inset-0 blur-3xl opacity-40 pointer-events-none transition-all duration-700"
                        style={{ background: stageGlowStyle }}
                    />

                    <div
                        className={`absolute rounded-full border border-white/[0.08] [transform:rotateX(78deg)] pointer-events-none shadow-[0_0_100px_rgba(255,255,255,0.02)] transition-all duration-700 ${
                            isZoomed ? "w-[850px] h-[850px] opacity-20" : "w-[440px] sm:w-[540px] h-[440px] sm:h-[540px]"
                        }`}
                    />

                    <div className="absolute top-6 left-6 z-20 flex items-center gap-3 font-mono text-[10px]">
                        <div className="flex items-center px-3.5 py-1.5 rounded-full bg-black/70 border border-white/10 backdrop-blur-xl">
                            <span className="text-neutral-300 uppercase tracking-[0.25em] font-medium">
                                {isZoomed ? "EXPANDED WORKSTATION" : `${displayAngle}°`}
                            </span>
                        </div>
                    </div>

                    <div
                        className="absolute top-6 right-6 z-20"
                        onMouseDown={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center gap-1 p-1 rounded-full bg-black/80 border border-white/10 backdrop-blur-xl text-[9px] font-mono tracking-widest shadow-2xl">
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    changeLighting("obsidian");
                                }}
                                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                                    lightingMode === "obsidian" ? "bg-white text-black font-bold shadow-sm" : "text-neutral-400 hover:text-white"
                                }`}
                            >
                                OBSIDIAN
                            </button>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    changeLighting("studio");
                                }}
                                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                                    lightingMode === "studio" ? "bg-white text-black font-bold shadow-sm" : "text-neutral-400 hover:text-white"
                                }`}
                            >
                                STUDIO
                            </button>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    changeLighting("cyber");
                                }}
                                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                                    lightingMode === "cyber" ? "bg-cyan-400 text-black font-bold shadow-sm" : "text-neutral-400 hover:text-white"
                                }`}
                            >
                                CYBER
                            </button>
                        </div>
                    </div>

                    <div
                        style={{
                            transform: `rotateY(${rotationY}deg)`,
                            transition: isDragging ? "none" : "transform 0.15s ease-out",
                        }}
                        className="z-10 [transform-style:preserve-3d] will-change-transform flex items-center justify-center my-auto"
                    >
                        <ExhibitionLaptop project={project} isZoomed={isZoomed} />
                    </div>

                    <div
                        className="absolute bottom-6 inset-x-0 mx-auto w-fit z-30"
                        onMouseDown={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleZoom();
                            }}
                            className={`px-7 py-2.5 rounded-full text-[11px] font-mono font-bold tracking-[0.2em] transition-all flex items-center gap-2.5 cursor-pointer uppercase shadow-2xl active:scale-95 ${
                                isZoomed
                                    ? "bg-white text-black hover:bg-neutral-200"
                                    : "bg-black/85 hover:bg-white text-white hover:text-black border border-white/20 hover:border-white backdrop-blur-xl"
                            }`}
                        >
                            {isZoomed ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                            <span>{isZoomed ? "CLOSE IMMERSION" : "ZOOM & INTERACT"}</span>
                        </button>
                    </div>
                </div>

                {/* ПРАВАЯ ПОЛОВИНА: ПРОСТОРНЫЙ СПИСОК С КРУПНЫМ ТЕКСТОМ И БОЛЬШИМИ ПРЕВЬЮ */}
                <div
                    className={`w-full lg:w-1/2 h-[58vh] lg:h-full p-6 sm:p-12 lg:p-16 bg-[#08080a] border-l border-white/10 overflow-y-auto transition-opacity duration-500 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.1)_transparent] relative ${
                        isZoomed ? "opacity-0 pointer-events-none hidden lg:block" : "opacity-100"
                    }`}
                >
                    <div className="max-w-3xl mx-auto divide-y divide-white/10">
                        {activeModules.map((item) => (
                            <div
                                key={item.num}
                                className="group py-10 sm:py-12 first:pt-4 last:pb-12 flex flex-col sm:flex-row items-start gap-7 sm:gap-9 lg:gap-10 transition-colors"
                            >
                                {/* КАРТИНКА ПРЕВЬЮ СЛЕВА */}
                                <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 shrink-0 rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 shadow-xl">
                                    {item.preview}
                                </div>

                                {/* ТЕКСТ СПРАВА */}
                                <div className="flex-1 space-y-4 pt-1">
                                    {/* Заголовок */}
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-snug">
                                        {item.num}. {item.title}
                                    </h3>

                                    {/* Описание */}
                                    <p className="text-base sm:text-lg text-neutral-200 leading-relaxed font-normal">
                                        {item.desc}
                                    </p>

                                    {/* Цель */}
                                    <div className="pt-1.5 flex items-start gap-2 text-sm sm:text-base leading-relaxed">
                                        <span className="text-neutral-400 font-semibold shrink-0">Цель:</span>
                                        <span className="text-neutral-300 font-normal">
                                            {item.goal}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}