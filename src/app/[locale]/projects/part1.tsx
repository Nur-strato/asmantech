"use client";

import React, { useState, useRef, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import {
    ArrowLeft,
    ArrowUpRight,
    Monitor,
    Smartphone,
    Play,
    Pause,
    Volume2,
    VolumeX,
} from "lucide-react";
import SplitCinemaModal, { ProjectItem } from "./part2";

type ViewLayout = "grid" | "list";
type DeviceMode = "laptop" | "phone";

const projects: ProjectItem[] = [
    {
        id: "aucahack",
        index: "01",
        title: "AUCAHACK",
        client: "Website & Mobile app",
        category: "Web & Mobile Platform",
        servicesTag: "STUDENT PORTAL — COURSE REGISTRATION — SCHEDULE BUILDER",
        description:
            "Цифровой университетский портал: отзывы о профессорах, агрегатор учебных материалов и умный конструктор расписания без задержек.",
        stack: ["Next.js 15", "FastAPI", "Tailwind CSS", "PostgreSQL", "Redis"],
        bgTone: "from-[#141210] via-[#0c0a09] to-[#050505]",
        glow: "rgba(212, 160, 80, 0.35)",
        curatorQuote:
            "«Мы переосмыслили академический опыт: расписание перестало быть статической таблицей и превратилось в реактивный алгоритм с нулевым трением».",
        statement:
            "В первые 60 секунд открытия регистрации на семестр серверы выдерживают лавинообразный трафик без права на коллизии слотов.",
        challenge:
            "Пиковая нагрузка в 3,200 одновременных запросов в секунду и исключение дублирования мест при параллельных транзакциях.",
        architecture:
            "Асинхронные воркеры FastAPI, шардирование таблиц расписания в PostgreSQL и кэширование матрицы доступности в Redis в памяти.",
        endpoints: [
            "POST /api/v1/matrix/enroll",
            "GET /api/v1/courses/conflicts-check",
            "WS /ws/live-seats-monitor",
        ],
        metrics: [
            { label: "LATENCY", value: "4.2 ms", desc: "Среднее время ответа API" },
            { label: "UPTIME", value: "99.98%", desc: "За весь академический год" },
            { label: "STUDENTS", value: "3,200+", desc: "Активных пользователей в пике" },
            { label: "IP STATUS", value: "100%", desc: "Полная передача исходников" },
        ],
    },
    {
        id: "conurat-construction",
        index: "02",
        title: "Conurat Construction",
        client: "Website",
        category: "Enterprise Web",
        servicesTag: "ARCHITECTURE — LOGISTICS CRM — ERP SYSTEM",
        description:
            "Корпоративный портал и веб-система для управления архитектурными сметами, поставками стройматериалов и контролем строительных бригад.",
        stack: ["React", "TypeScript", "Tailwind CSS", "FastAPI", "PostgreSQL"],
        bgTone: "from-[#0d1511] via-[#080d0a] to-[#040605]",
        glow: "rgba(52, 211, 153, 0.35)",
        curatorQuote:
            "«Связать физический бетон с цифровым интерфейсом: прозрачность каждого кубометра сырья от карьера до монолитного перекрытия».",
        statement:
            "Масштабное строительство страдает от непрозрачности поставок. Система оцифровывает весь логистический цикл, рассчитывая стоимость прямо по чертежам.",
        challenge:
            "Координация 14 стройплощадок, синхронизация счетов поставщиков и исключение простоев техники из-за несвоевременных поставок.",
        architecture:
            "Модульная ERP-система с потоковой обработкой сметных спецификаций, интеграцией реестров 1С и защищенным REST API для прорабов.",
        endpoints: [
            "POST /api/erp/estimate/calculate",
            "GET /api/bim/stream-render",
            "PUT /api/supplies/dispatch-truck",
        ],
        metrics: [
            { label: "SAVINGS", value: "до 18%", desc: "Оптимизация логистики" },
            { label: "SYNC SPEED", value: "Realtime", desc: "Обновление статусов партий" },
            { label: "PROJECTS", value: "14 точек", desc: "Объектов под контролем" },
            { label: "WARRANTY", value: "SLA Договор", desc: "Финансовая ответственность" },
        ],
    },
    {
        id: "proquizkg",
        index: "03",
        title: "ProQuizKG",
        client: "Website & Mobile app",
        category: "Realtime League Engine",
        servicesTag: "LIVE TOURNAMENT ENGINE — WEBSOCKETS — LEADERBOARDS",
        description:
            "Межуниверситетская платформа интеллектуальных соревнований: синхронизация экранов команд в реальном времени, турнирные сетки и live-скоринг.",
        stack: ["Next.js", "FastAPI", "WebSockets", "Redis", "Docker"],
        bgTone: "from-[#0e1322] via-[#080c16] to-[#04060b]",
        glow: "rgba(96, 165, 250, 0.35)",
        curatorQuote:
            "«Киберспортивная точность в интеллектуальной битве: каждый клик на бэззер фиксируется с микросекундной детерминированностью».",
        statement:
            "Турнир не прощает задержек: когда ведущий задает вопрос, 24 команды одновременно нажимают на бэззеры. Система исключает любые арбитражные споры.",
        challenge:
            "Синхронизация сценических экранов, мобильных пультов капитанов и стриминговых оверлеев с нулевым сетевым джиттером.",
        architecture:
            "Специализированный WebSocket-кластер с бинарным протоколом передачи, in-memory состоянием в Redis и автоматическим посевом команд.",
        endpoints: [
            "WS /ws/arena/buzzer-socket",
            "POST /api/tournaments/seed-bracket",
            "GET /api/leaderboard/realtime",
        ],
        metrics: [
            { label: "PING", value: "1.8 ms", desc: "Задержка нажатия бэззера" },
            { label: "LEAGUE", value: "24 ВУЗа", desc: "Университетов в сетке" },
            { label: "CONCURRENCY", value: "1,500+", desc: "Зрителей в live-режиме" },
            { label: "DISPUTES", value: "0", desc: "Спорных ситуаций на сцене" },
        ],
    },
];

// Синтезатор звука (Web Audio API)
function playHapticSound(type: "click" | "toggle" | "zoom" | "close" = "click") {
    if (typeof window === "undefined") return;
    try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const now = ctx.currentTime;

        if (type === "click") {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(160, now + 0.025);
            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
            osc.start(now);
            osc.stop(now + 0.025);
        } else if (type === "toggle") {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.setValueAtTime(320, now);
            osc.frequency.exponentialRampToValueAtTime(740, now + 0.04);
            gain.gain.setValueAtTime(0.03, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
            osc.start(now);
            osc.stop(now + 0.04);
        } else if (type === "zoom") {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.setValueAtTime(140, now);
            osc.frequency.exponentialRampToValueAtTime(520, now + 0.16);
            gain.gain.setValueAtTime(0.06, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
            osc.start(now);
            osc.stop(now + 0.16);
        } else if (type === "close") {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.setValueAtTime(520, now);
            osc.frequency.exponentialRampToValueAtTime(120, now + 0.06);
            gain.gain.setValueAtTime(0.03, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
            osc.start(now);
            osc.stop(now + 0.06);
        }
    } catch {
        // браузер заблокировал аудио
    }
}

// 3D Ноутбук карточки
function CardLaptopMockup({ project }: { project: ProjectItem }) {
    return (
        <div className="relative w-[340px] sm:w-[440px] h-[260px] [transform-style:preserve-3d] flex flex-col items-center">
            <div className="absolute -bottom-8 w-[88%] h-8 bg-black/95 blur-xl rounded-full pointer-events-none [transform:translateZ(-16px)]" />

            <div className="absolute inset-0 [backface-visibility:hidden] bg-neutral-900 rounded-[18px] p-2 border border-neutral-700/80 shadow-[0_30px_70px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden">
                <div className="h-4 bg-neutral-950 px-2.5 flex items-center justify-between border-b border-neutral-800/80 shrink-0">
                    <div className="flex gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]/90" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]/90" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F]/90" />
                    </div>
                    <span className="text-[8px] font-mono text-neutral-500 tracking-wider">
                        {project.id}.production.runtime
                    </span>
                </div>

                <div className="flex-1 bg-black p-3.5 text-white flex flex-col justify-between overflow-hidden select-none">
                    <div className="flex justify-between items-center text-[10px]">
                        <span className="font-semibold text-neutral-300 font-mono tracking-tight">
                            {project.title}
                        </span>
                        <span className="text-white/70 font-mono text-[9px] px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800">
                            4K 60FPS
                        </span>
                    </div>
                    <div className="p-3 bg-neutral-900/90 rounded-xl border border-neutral-800 text-[10px] space-y-1 backdrop-blur-xs">
                        <div className="text-neutral-400 font-mono text-[9px] uppercase tracking-wider">
                            Engineering Runtime
                        </div>
                        <div className="font-bold text-white text-xs sm:text-sm">
                            {project.title} — System Live
                        </div>
                    </div>
                    <div className="text-[9px] font-mono text-neutral-500 flex justify-between pt-1 border-t border-neutral-900">
                        <span>Architecture Fixed Price</span>
                        <span className="text-white/90">● Click Zoom to Interact</span>
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950 rounded-[18px] border border-neutral-600/70 shadow-2xl flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-neutral-800/90 border border-neutral-700/80 flex items-center justify-center shadow-inner">
                    <span className="font-mono font-black text-xs text-neutral-400">P³²</span>
                </div>
                <div className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 mt-3 font-semibold">
                    MacBook Pro Chassis
                </div>
            </div>

            <div className="absolute -bottom-3 w-[375px] sm:w-[475px] h-[13px] bg-gradient-to-b from-neutral-700 via-neutral-800 to-neutral-900 rounded-b-xl border-t border-neutral-500/80 shadow-2xl flex justify-center [transform:translateZ(4px)]">
                <div className="w-16 h-1 bg-neutral-600 rounded-b" />
            </div>
        </div>
    );
}

// 3D Телефон карточки
function CardPhoneMockup({ project }: { project: ProjectItem }) {
    return (
        <div className="relative w-[185px] h-[315px] [transform-style:preserve-3d] flex flex-col items-center">
            <div className="absolute -bottom-6 w-[80%] h-6 bg-black/80 blur-lg rounded-full pointer-events-none [transform:translateZ(-10px)]" />

            <div className="absolute inset-0 [backface-visibility:hidden] bg-neutral-950 rounded-[40px] p-2 border-[2.5px] border-neutral-700/90 shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden">
                <div className="h-4 flex justify-center items-center shrink-0">
                    <div className="w-14 h-2.5 bg-neutral-900 rounded-full border border-neutral-800" />
                </div>
                <div className="flex-1 rounded-[28px] bg-black p-3 text-white flex flex-col justify-between overflow-hidden mt-0.5">
                    <div className="text-[9px] font-mono text-neutral-400 flex justify-between border-b border-neutral-900 pb-1.5">
                        <span>Mobile Studio</span>
                        <span className="text-white/80">SLA 100%</span>
                    </div>
                    <div className="p-2.5 bg-neutral-900/90 rounded-xl border border-neutral-800 text-[10px] space-y-1 my-auto">
                        <div className="text-[8px] text-neutral-400 font-mono uppercase tracking-wider">
                            Project
                        </div>
                        <div className="font-bold text-white text-[11px] leading-snug">
                            {project.title}
                        </div>
                    </div>
                    <div className="text-[8px] font-mono text-neutral-300 text-center bg-white/10 py-1 rounded-lg border border-white/5">
                        Fixed Price Contract
                    </div>
                </div>
                <div className="h-2 flex justify-center items-center shrink-0">
                    <span className="w-14 h-0.5 bg-neutral-600 rounded-full" />
                </div>
            </div>

            <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950 rounded-[40px] border-[2.5px] border-neutral-700/90 shadow-2xl p-4 flex flex-col justify-between">
                <div className="w-14 h-14 rounded-2xl bg-neutral-900/90 border border-neutral-700/80 p-1.5 grid grid-cols-2 gap-1 shadow-md">
                    <div className="rounded-full bg-black border border-neutral-600" />
                    <div className="rounded-full bg-black border border-neutral-600" />
                    <div className="rounded-full bg-black border border-neutral-600 col-span-2 w-4 h-4 mx-auto" />
                </div>
                <div className="mx-auto text-neutral-500 font-mono text-xs font-bold">P³²</div>
                <div className="text-center text-[8px] font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                    Titanium Pro
                </div>
            </div>
        </div>
    );
}

// 360° Сцена в карточке
function Interactive360Stage({
                                 project,
                                 soundEnabled,
                             }: {
    project: ProjectItem;
    soundEnabled: boolean;
}) {
    const [device, setDevice] = useState<DeviceMode>("laptop");
    const [rotationY, setRotationY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isAutoSpin, setIsAutoSpin] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
    const stageRef = useRef<HTMLDivElement | null>(null);
    const startXRef = useRef(0);
    const startRotRef = useRef(0);

    // НЕПРЕРЫВНОЕ ВРАЩЕНИЕ БЕЗ СБРОСА ЧЕРЕЗ % 360 (ИСКЛЮЧАЕТ РЫВОК)
    useEffect(() => {
        if (!isAutoSpin) return;
        const interval = setInterval(() => {
            setRotationY((prev) => prev + 1.2);
        }, 16);
        return () => clearInterval(interval);
    }, [isAutoSpin]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!stageRef.current) return;
        const rect = stageRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });

        if (isDragging) {
            const delta = e.clientX - startXRef.current;
            setRotationY(startRotRef.current + delta * 0.8);
        }
    };

    const handleStart = (clientX: number) => {
        setIsDragging(true);
        setIsAutoSpin(false);
        startXRef.current = clientX;
        startRotRef.current = rotationY;
        if (soundEnabled) playHapticSound("click");
    };

    const handleEnd = () => {
        setIsDragging(false);
    };

    // Отображаем угол 0°..359°
    const currentAngle = Math.round(((rotationY % 360) + 360) % 360);

    return (
        <div
            ref={stageRef}
            className={`relative w-full aspect-[4/3] bg-gradient-to-b ${project.bgTone} border border-neutral-900 rounded-[28px] overflow-hidden flex items-center justify-center select-none [perspective:1400px]`}
            onMouseDown={(e) => handleStart(e.clientX)}
            onMouseMove={handleMouseMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={(e) => handleStart(e.touches[0].clientX)}
            onTouchMove={(e) => {
                if (!isDragging) return;
                const delta = e.touches[0].clientX - startXRef.current;
                setRotationY(startRotRef.current + delta * 0.8);
            }}
            onTouchEnd={handleEnd}
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
            <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                    backgroundSize: "28px 28px",
                }}
            />

            <div
                className="absolute inset-0 blur-3xl pointer-events-none transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${project.glow} 0%, transparent 65%)`,
                }}
            />

            {/* ВЕРХНИЙ HUD */}
            <div className="absolute top-5 inset-x-5 z-30 flex items-center justify-between pointer-events-none">
                <div className="px-3.5 py-1.5 bg-black/60 backdrop-blur-xl rounded-full border border-white/10 text-white font-mono text-[11px] font-bold tabular-nums tracking-wider shadow-lg">
                    {currentAngle}°
                </div>

                <div className="pointer-events-auto flex items-center gap-1 p-1 bg-black/60 backdrop-blur-xl rounded-full border border-white/10 text-white shadow-xl">
                    <button
                        type="button"
                        onClick={() => {
                            setDevice("laptop");
                            setRotationY(0);
                            if (soundEnabled) playHapticSound("toggle");
                        }}
                        className={`px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                            device === "laptop"
                                ? "bg-white text-black font-extrabold shadow-sm"
                                : "text-neutral-400 hover:text-white"
                        }`}
                    >
                        <Monitor size={11} />
                        <span>LAPTOP</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setDevice("phone");
                            setRotationY(0);
                            if (soundEnabled) playHapticSound("toggle");
                        }}
                        className={`px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                            device === "phone"
                                ? "bg-white text-black font-extrabold shadow-sm"
                                : "text-neutral-400 hover:text-white"
                        }`}
                    >
                        <Smartphone size={11} />
                        <span>PHONE</span>
                    </button>
                </div>
            </div>

            {/* 3D МОДЕЛЬ */}
            <div
                style={{
                    transform: `rotateY(${rotationY}deg)`,
                    transition: isDragging ? "none" : "transform 0.15s ease-out",
                }}
                className="z-10 [transform-style:preserve-3d] will-change-transform flex items-center justify-center my-auto"
            >
                {device === "laptop" ? (
                    <CardLaptopMockup project={project} />
                ) : (
                    <CardPhoneMockup project={project} />
                )}
            </div>

            {/* НИЖНИЙ HUD */}
            <div className="absolute bottom-5 z-30 flex items-center gap-3 px-3 py-1.5 bg-black/75 backdrop-blur-xl rounded-full border border-white/15 text-white shadow-2xl">
                <button
                    type="button"
                    onClick={() => {
                        setIsAutoSpin(!isAutoSpin);
                        if (soundEnabled) playHapticSound("toggle");
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isAutoSpin
                            ? "bg-white text-black shadow-xs"
                            : "bg-white/15 hover:bg-white/25 text-white"
                    }`}
                >
                    {isAutoSpin ? <Pause size={12} /> : <Play size={12} />}
                    <span>360° AUTO</span>
                </button>

                <button
                    type="button"
                    onClick={() => {
                        setIsAutoSpin(false);
                        setRotationY(0);
                        if (soundEnabled) playHapticSound("click");
                    }}
                    className="text-[11px] font-mono font-medium tracking-wider text-neutral-400 hover:text-white transition-colors cursor-pointer px-1.5"
                >
                    RESET
                </button>
            </div>
        </div>
    );
}

// Главная часть 1
export default function ProjectsPart1Page() {
    const [layout, setLayout] = useState<ViewLayout>("grid");
    const [selectedCinemaProject, setSelectedCinemaProject] = useState<ProjectItem | null>(null);
    const [soundEnabled, setSoundEnabled] = useState(true);

    return (
        <main className="max-w-[1440px] mx-auto px-6 sm:px-10 pt-28 pb-32 space-y-16 bg-white text-neutral-900 font-sans">
            {/* 1. Навигация и звук */}
            <div className="flex items-center justify-between">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-neutral-500 hover:text-neutral-900 transition-colors group"
                >
                    <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1" />
                    <span>Назад на главную</span>
                </Link>

                <button
                    type="button"
                    onClick={() => {
                        setSoundEnabled(!soundEnabled);
                        if (!soundEnabled) playHapticSound("toggle");
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-200 text-neutral-600 hover:text-black hover:border-neutral-400 text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer"
                    title="Включить/выключить тактильные звуки"
                >
                    {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
                    <span>HAPTICS: {soundEnabled ? "ON" : "OFF"}</span>
                </button>
            </div>

            {/* 2. Заголовок Work³² */}
            <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b-2 border-neutral-900">
                    <div className="flex items-start">
                        <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter uppercase leading-none select-none">
                            Work
                        </h1>
                        <span className="text-xl sm:text-2xl font-mono font-bold tracking-tight ml-1 -mt-1 sm:-mt-2 text-neutral-400 select-none">
                            ³²
                        </span>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-8 pb-1">
                        <span className="text-xs font-mono font-bold tracking-widest text-neutral-800 uppercase">
                            FILTER: ALL WORK +
                        </span>

                        <div className="flex items-center p-1 rounded-full border border-neutral-300 bg-neutral-100/80">
                            <button
                                type="button"
                                onClick={() => {
                                    setLayout("grid");
                                    if (soundEnabled) playHapticSound("click");
                                }}
                                className={`px-4 py-1.5 rounded-full text-[11px] font-mono font-bold tracking-wider transition-all cursor-pointer ${
                                    layout === "grid"
                                        ? "bg-neutral-900 text-white shadow-xs"
                                        : "text-neutral-500 hover:text-neutral-900"
                                }`}
                            >
                                GRID
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setLayout("list");
                                    if (soundEnabled) playHapticSound("click");
                                }}
                                className={`px-4 py-1.5 rounded-full text-[11px] font-mono font-bold tracking-wider transition-all cursor-pointer ${
                                    layout === "list"
                                        ? "bg-neutral-900 text-white shadow-xs"
                                        : "text-neutral-500 hover:text-neutral-900"
                                }`}
                            >
                                LIST
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Сетка карточек */}
            <div className={`grid gap-x-8 gap-y-14 ${layout === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
                {projects.map((item) => (
                    <article
                        key={item.id}
                        className="group flex flex-col justify-between bg-neutral-50/60 hover:bg-neutral-50 rounded-[36px] border border-neutral-200/90 p-4 sm:p-5 transition-all duration-300 hover:border-neutral-400 hover:shadow-[0_24px_50px_rgba(0,0,0,0.06)]"
                    >
                        <div className="rounded-[28px] overflow-hidden shadow-2xs">
                            <Interactive360Stage project={item} soundEnabled={soundEnabled} />
                        </div>

                        <div className="pt-6 pb-2 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-t border-neutral-200/70 mt-5">
                            <div className="space-y-1">
                                <div className="text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                                    {item.index} / {item.client}
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight leading-tight group-hover:text-neutral-700 transition-colors">
                                    {item.title}
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    if (soundEnabled) playHapticSound("zoom");
                                    setSelectedCinemaProject(item);
                                }}
                                className="relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-neutral-900 hover:bg-black text-white text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all duration-200 shadow-md active:scale-95 shrink-0 self-start sm:self-auto group/btn cursor-pointer"
                            >
                                <span>Подробнее</span>
                                <ArrowUpRight
                                    size={17}
                                    className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                                />
                            </button>
                        </div>
                    </article>
                ))}
            </div>

            {/* 4. Вызов части 2 (Split Cinema Modal через Portal) */}
            <SplitCinemaModal
                project={selectedCinemaProject}
                soundEnabled={soundEnabled}
                onClose={() => setSelectedCinemaProject(null)}
                onPlaySound={playHapticSound}
            />

            {/* 5. CTA Блок */}
            <section className="bg-neutral-900 text-white rounded-[36px] p-8 sm:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl mt-24">
                <div className="space-y-2 text-center lg:text-left">
                    <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug">
                        Гарантия качества. Только результат по договору.
                    </h2>
                    <p className="text-neutral-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
                        Фиксированная цена, передача 100% прав и жесткие штрафы за срыв сроков с первого дня.
                    </p>
                </div>

                <Link
                    href="/contacts"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 rounded-2xl bg-white hover:bg-neutral-100 text-neutral-900 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 shadow-md active:scale-95 shrink-0"
                >
                    <span>Начать проект с гарантией</span>
                    <ArrowUpRight size={16} />
                </Link>
            </section>
        </main>
    );
}