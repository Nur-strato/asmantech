"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, X, Monitor, Smartphone } from "lucide-react";

// ── Импорты компонентов проектов ──────────────────────────────
import { AucahackSandbox } from "@/app/[locale]/projects/aucahack/aucahack";
import { ConuratSandbox } from "@/app/[locale]/projects/konurat/konurat";
import { ProQuizSandbox } from "@/app/[locale]/projects/proquiz/proquiz";
// ──────────────────────────────────────────────────────────────

const AUTOPLAY_MS = 8000;

interface CaseItem {
    id: string;
    name: string;
    tagline: string;
    link: string;
    category: string;
    imageUrl: string;
    accent: string;
}

const CASES: CaseItem[] = [
    {
        id: "aucahack",
        name: "AUCAHACK",
        tagline:
            "Building an intelligent academic ecosystem where schedule planning, tutor evaluations, and GPA forecasting feel effortless.",
        link: "https://aucahack.com",
        category: "AUCA Student Hub",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
        accent: "#FACC15",
    },
    {
        id: "konurat",
        name: "Konurat Construction",
        tagline:
            "Architecting a high-end digital presence and enterprise acquisition system for a premier regional development holding.",
        link: "https://Konurat-Construction.kg",
        category: "Сайт Строительной компании",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
        accent: "#22C55E",
    },
    {
        id: "proquiz",
        name: "ProQuizKG",
        tagline:
            "Engineering a real-time tournament engine and live scoring synchronization platform across 20+ universities.",
        link: "https://proquiz.kg",
        category: "Сайт для Межвузовской лиги",
        imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop",
        accent: "#3B82F6",
    },
    {
        id: "knopka",
        name: "Knopka",
        tagline:
            "Comprehensive accounting automation, financial reporting infrastructure, and tax management workflow.",
        link: "https://knopka.kg",
        category: "Бухгалтерская компания",
        imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop",
        accent: "#B28CFF",
    },
];

const pad = (n: number) => String(n).padStart(2, "0");

function renderProjectContent(id: string) {
    switch (id) {
        case "aucahack":
            return <AucahackSandbox isZoomed={true} />;
        case "konurat":
            return <ConuratSandbox isZoomed={true} />;
        case "proquiz":
            return <ProQuizSandbox isZoomed={true} />;
        case "knopka":
        default:
            return (
                <div className="flex h-full flex-col items-center justify-center p-8 text-center font-mono">
                    <span className="text-xs uppercase tracking-wider text-neutral-400">
                        Knopka // Бухгалтерская компания
                    </span>
                    <p className="mt-2 text-sm text-neutral-600">
                        Интерактивный прототип находится в процессе подготовки.
                    </p>
                </div>
            );
    }
}

export function Projects() {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [reduced, setReduced] = useState(false);
    const [modalCase, setModalCase] = useState<CaseItem | null>(null);

    const stageRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const startX = useRef<number | null>(null);

    const go = useCallback((i: number) => setIndex((i + CASES.length) % CASES.length), []);

    // ── Изоляция скролла: фоновый сайт заблокирован, внутри экранов скролл свободен ──
    useEffect(() => {
        if (!modalCase) return;

        const originalBodyOverflow = document.body.style.overflow;
        const originalHtmlOverflow = document.documentElement.style.overflow;
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        const modalEl = modalRef.current;
        if (!modalEl) return;

        const onWheel = (e: WheelEvent) => {
            // Останавливаем всплытие к window, чтобы smooth-scroll провайдеры не двигали страницу
            e.stopPropagation();

            const target = e.target as HTMLElement | null;
            const isOverDevice = target?.closest(".device-screen-frame");

            // Если курсор над темным фоном модалки — блокируем скролл полностью
            if (!isOverDevice) {
                e.preventDefault();
            }
            // Если курсор внутри устройства — НЕ вызываем preventDefault, давая браузеру нативно скроллить
        };

        const onTouchMove = (e: TouchEvent) => {
            e.stopPropagation();
            const target = e.target as HTMLElement | null;
            const isOverDevice = target?.closest(".device-screen-frame");
            if (!isOverDevice) {
                e.preventDefault();
            }
        };

        modalEl.addEventListener("wheel", onWheel, { passive: false });
        modalEl.addEventListener("touchmove", onTouchMove, { passive: false });

        return () => {
            document.body.style.overflow = originalBodyOverflow;
            document.documentElement.style.overflow = originalHtmlOverflow;
            modalEl.removeEventListener("wheel", onWheel);
            modalEl.removeEventListener("touchmove", onTouchMove);
        };
    }, [modalCase]);

    // Закрытие по Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setModalCase(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReduced(mq.matches);
        const onChange = () => setReduced(mq.matches);
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    useEffect(() => {
        if (paused || reduced || modalCase) return;
        const id = window.setTimeout(() => go(index + 1), AUTOPLAY_MS);
        return () => window.clearTimeout(id);
    }, [index, paused, reduced, modalCase, go]);

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (reduced || e.pointerType === "touch") return;
        const el = stageRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.setProperty("--px", px.toFixed(3));
        el.style.setProperty("--py", py.toFixed(3));
        el.style.setProperty("--mx", (((px - 0.5) * 2)).toFixed(3));
        el.style.setProperty("--my", (((py - 0.5) * 2)).toFixed(3));
    };

    const current = CASES[index];
    const words = current.name.split(" ");

    return (
        <section
            id="projects"
            aria-label="SELECTED WORK"
            className="relative w-full overflow-hidden bg-[#070B14] py-20 text-white selection:bg-white selection:text-[#070B14] md:py-32"
        >
            <style>{`
                .pj-stage { --px: .5; --py: .5; --mx: 0; --my: 0; }
                @keyframes pj-rise { from { transform: translateY(110%); } to { transform: none; } }
                @keyframes pj-fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
                @keyframes pj-bar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
                .pj-ch { display: inline-block; animation: pj-rise .8s cubic-bezier(.2,.8,.2,1) both; }
                .pj-fade { animation: pj-fade .7s .25s cubic-bezier(.2,.8,.2,1) both; }
                .pj-bar { transform-origin: left; animation: pj-bar ${AUTOPLAY_MS}ms linear forwards; }
                @media (prefers-reduced-motion: reduce) { .pj-ch, .pj-fade { animation: none; } .pj-bar { animation: none; transform: scaleX(1); } }

                /* Нативная изоляция скролла внутри девайсов */
                .device-screen-frame,
                .device-screen-frame * {
                    overscroll-behavior: contain !important;
                }
                .device-screen-frame *::-webkit-scrollbar {
                    width: 5px !important;
                    height: 5px !important;
                    display: block !important;
                }
                .device-screen-frame *::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.04) !important;
                }
                .device-screen-frame *::-webkit-scrollbar-thumb {
                    background: rgba(0, 0, 0, 0.25) !important;
                    border-radius: 9999px !important;
                }
                .device-screen-frame *::-webkit-scrollbar-thumb:hover {
                    background: rgba(0, 0, 0, 0.45) !important;
                }
            `}</style>

            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-[18%] h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.14] blur-[140px] transition-colors duration-1000"
                style={{ background: current.accent }}
            />

            <div className="relative mx-auto w-full max-w-[1412px] space-y-8 px-4 sm:px-6 md:space-y-10 md:px-8">
                {/* Header */}
                <div className="flex items-end justify-between gap-6">
                    <h2 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl md:text-6xl">
                        SELECTED WORK
                    </h2>
                    <div className="flex items-center gap-3">
                        <span className="mr-1 text-sm tabular-nums text-white/45">
                            {pad(index + 1)} / {pad(CASES.length)}
                        </span>
                        <button
                            type="button"
                            onClick={() => go(index - 1)}
                            aria-label="Previous case"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-colors hover:bg-white hover:text-[#070B14] cursor-pointer"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => go(index + 1)}
                            aria-label="Next case"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-colors hover:bg-white hover:text-[#070B14] cursor-pointer"
                        >
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Stage */}
                <div
                    ref={stageRef}
                    tabIndex={0}
                    role="group"
                    aria-label="SELECTED WORK"
                    onKeyDown={(e) => {
                        if (e.key === "ArrowLeft") go(index - 1);
                        if (e.key === "ArrowRight") go(index + 1);
                    }}
                    onPointerMove={onPointerMove}
                    onPointerDown={(e) => (startX.current = e.clientX)}
                    onPointerUp={(e) => {
                        if (startX.current === null) return;
                        const dx = e.clientX - startX.current;
                        startX.current = null;
                        if (Math.abs(dx) > 60) go(index + (dx < 0 ? 1 : -1));
                    }}
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    className="pj-stage relative aspect-[4/5] min-h-[460px] w-full touch-pan-y overflow-hidden rounded-[28px] border border-white/10 bg-[#0B1120] outline-none sm:aspect-[16/10] md:rounded-[40px] lg:aspect-[21/10]"
                    style={{ ["--accent" as string]: current.accent } as React.CSSProperties}
                >
                    <div
                        className="absolute -inset-6 will-change-transform"
                        style={{
                            transform: reduced
                                ? undefined
                                : "translate3d(calc(var(--mx) * -14px), calc(var(--my) * -14px), 0)",
                            transition: "transform .25s ease-out",
                        }}
                    >
                        {CASES.map((c, i) => (
                            <Image
                                key={c.id}
                                src={c.imageUrl}
                                alt={i === index ? c.name : ""}
                                aria-hidden={i !== index}
                                fill
                                sizes="100vw"
                                priority={i === 0}
                                unoptimized
                                draggable={false}
                                className={`object-cover transition-[opacity,transform] duration-[1100ms] ease-out ${
                                    i === index ? "scale-100 opacity-100" : "scale-110 opacity-0"
                                }`}
                            />
                        ))}
                    </div>

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/35 to-[#070B14]/30" />

                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen transition-opacity duration-500"
                        style={{
                            background:
                                "radial-gradient(520px circle at calc(var(--px) * 100%) calc(var(--py) * 100%), color-mix(in srgb, var(--accent) 40%, transparent), transparent 65%)",
                        }}
                    />

                    <div className="absolute inset-x-7 bottom-7 z-10 flex items-end justify-between gap-6 sm:inset-x-10 sm:bottom-10">
                        <div key={current.id} className="min-w-0">
                            <h3
                                aria-label={current.name}
                                className="text-[clamp(2.25rem,7.65vw,6.75rem)] font-medium leading-[0.95] tracking-[-0.05em]"
                            >
                                {words.map((w, wi) => (
                                    <span key={wi} aria-hidden="true" className="mr-[0.22em] inline-block overflow-hidden align-bottom pb-[0.08em]">
                                        {Array.from(w).map((ch, ci) => (
                                            <span
                                                key={ci}
                                                className="pj-ch"
                                                style={{ animationDelay: `${(wi * 5 + ci) * 28}ms` }}
                                            >
                                                {ch}
                                            </span>
                                        ))}
                                    </span>
                                ))}
                            </h3>
                            <p className="pj-fade mt-3 text-sm text-white/70 sm:text-base">{current.category}</p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setModalCase(current)}
                            aria-label={`Open interactive preview of ${current.name}`}
                            className="group flex h-20 w-20 shrink-0 flex-col items-center justify-center gap-0.5 rounded-full text-sm font-medium text-[#070B14] transition-transform duration-300 hover:scale-105 active:scale-95 md:h-28 md:w-28 md:text-base cursor-pointer shadow-2xl"
                            style={{ background: "var(--accent)" }}
                        >
                            Open
                            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:h-6 md:w-6" />
                        </button>
                    </div>
                </div>

                <p
                    key={`tag-${current.id}`}
                    className="pj-fade max-w-4xl text-xl leading-snug tracking-tight text-white/75 sm:text-2xl md:text-3xl"
                    aria-live="polite"
                >
                    {current.tagline}
                </p>

                <div role="tablist" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                    {CASES.map((c, i) => {
                        const active = i === index;
                        return (
                            <button
                                key={c.id}
                                type="button"
                                role="tab"
                                aria-selected={active}
                                onClick={() => go(i)}
                                className={`relative flex items-center gap-3 overflow-hidden rounded-2xl border p-2.5 text-left transition-colors sm:gap-4 sm:p-3 cursor-pointer ${
                                    active
                                        ? "border-white/25 bg-white/[0.07]"
                                        : "border-white/10 hover:border-white/20 hover:bg-white/[0.03]"
                                }`}
                            >
                                <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl sm:h-14 sm:w-14">
                                    <Image
                                        src={c.imageUrl}
                                        alt=""
                                        fill
                                        sizes="56px"
                                        unoptimized
                                        draggable={false}
                                        className={`object-cover transition-opacity duration-500 ${active ? "opacity-100" : "opacity-50"}`}
                                    />
                                </span>
                                <span className="min-w-0">
                                    <span className={`block truncate text-sm font-medium sm:text-base ${active ? "text-white" : "text-white/60"}`}>
                                        {c.name}
                                    </span>
                                    <span className="hidden truncate text-xs text-white/40 sm:block">{c.category}</span>
                                </span>
                                {active && !paused && !reduced && (
                                    <span
                                        key={`bar-${index}`}
                                        className="pj-bar absolute inset-x-0 bottom-0 h-[2px]"
                                        style={{ background: c.accent }}
                                    />
                                )}
                                {active && (paused || reduced) && (
                                    <span className="absolute inset-x-0 bottom-0 h-[2px]" style={{ background: c.accent }} />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ── МОДАЛЬНЫЙ СТЕНД ── */}
            {modalCase && (
                <div
                    ref={modalRef}
                    data-lenis-prevent="true"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#070B14]/92 backdrop-blur-2xl animate-in fade-in duration-200"
                >
                    {/* Кнопка закрытия [X] */}
                    <button
                        type="button"
                        onClick={() => setModalCase(null)}
                        className="fixed top-5 right-5 sm:top-8 sm:right-8 z-50 p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white/70 hover:text-white border border-white/20 transition-all shadow-2xl backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95"
                        title="Закрыть (Esc)"
                        aria-label="Закрыть"
                    >
                        <X size={22} />
                    </button>

                    <div
                        data-lenis-prevent="true"
                        className="w-full h-full overflow-y-auto px-4 py-12 md:px-12 flex items-center justify-center [scrollbar-width:none]"
                    >
                        <div className="w-full max-w-7xl flex flex-col xl:flex-row items-center justify-center gap-8 md:gap-10 xl:gap-14 my-auto">

                            {/* КОМПЬЮТЕР */}
                            <div className="w-full max-w-[820px] 2xl:max-w-[900px] flex flex-col items-center shrink-0">
                                <div className="w-full bg-[#181B22] p-2.5 sm:p-3.5 rounded-2xl sm:rounded-3xl border border-neutral-700/80 shadow-[0_30px_90px_rgba(0,0,0,0.85)] flex flex-col">
                                    <div className="h-4 sm:h-5 flex items-center justify-center relative">
                                        <span className="w-2 h-2 rounded-full bg-neutral-900 border border-neutral-700/90" />
                                    </div>

                                    {/* Экран монитора */}
                                    <div className="device-screen-frame relative w-full h-[400px] sm:h-[500px] md:h-[540px] bg-white rounded-xl overflow-hidden flex flex-col shadow-inner min-h-0">
                                        {/* Адресная строка */}
                                        <div className="h-8 bg-neutral-100 border-b border-neutral-200 px-3 flex items-center justify-center shrink-0 select-none">
                                            <div className="flex items-center gap-1.5 px-3 py-0.5 rounded bg-white border border-neutral-200 text-[10px] font-mono text-neutral-500 max-w-xs truncate shadow-2xs">
                                                <Monitor size={11} className="text-neutral-400" />
                                                <span>{modalCase.link.replace("https://", "")}</span>
                                            </div>
                                        </div>

                                        {/* Свободно скроллируемый контейнер */}
                                        <div className="flex-1 min-h-0 w-full h-full bg-white flex flex-col overflow-y-auto">
                                            {renderProjectContent(modalCase.id)}
                                        </div>
                                    </div>

                                    <div className="h-6 sm:h-8 flex items-center justify-center">
                                        <span className="w-3.5 h-3.5 rounded-full bg-neutral-700/40" />
                                    </div>
                                </div>

                                <div className="hidden sm:flex flex-col items-center -mt-0.5">
                                    <div className="w-24 h-14 bg-gradient-to-b from-[#2A2E39] to-[#1E2129] shadow-md" />
                                    <div className="w-48 h-3.5 bg-[#2A2E39] rounded-t-sm rounded-b-md shadow-2xl border-t border-neutral-600/40" />
                                </div>
                            </div>

                            {/* ТЕЛЕФОН */}
                            <div className="w-[280px] sm:w-[320px] h-[580px] sm:h-[640px] bg-[#181B22] p-3 rounded-[46px] border-4 border-neutral-700/80 shadow-[0_30px_90px_rgba(0,0,0,0.85)] flex flex-col relative shrink-0">
                                <div className="relative w-full h-6 flex items-center justify-center shrink-0 z-20">
                                    <div className="w-24 h-4.5 bg-black rounded-full flex items-center justify-end px-2 shadow-xs">
                                        <span className="w-2 h-2 rounded-full bg-neutral-900 border border-neutral-800" />
                                    </div>
                                </div>

                                {/* Экран телефона */}
                                <div className="device-screen-frame relative flex-1 min-h-0 bg-white rounded-[34px] overflow-hidden flex flex-col shadow-inner">
                                    <div className="h-6 bg-neutral-100 border-b border-neutral-200 px-4 flex items-center justify-between text-[10px] font-mono text-neutral-500 shrink-0 select-none">
                                        <span className="font-bold text-neutral-700">09:41</span>
                                        <div className="flex items-center gap-1">
                                            <Smartphone size={10} />
                                            <span>Mobile</span>
                                        </div>
                                    </div>

                                    {/* Свободно скроллируемый контейнер */}
                                    <div className="flex-1 min-h-0 w-full h-full bg-white flex flex-col overflow-y-auto">
                                        {renderProjectContent(modalCase.id)}
                                    </div>

                                    <div className="h-4 bg-white/95 backdrop-blur-xs flex items-center justify-center shrink-0 border-t border-neutral-100">
                                        <span className="w-24 h-1 bg-neutral-400 rounded-full" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export { Projects as ProjectsSection };
export default Projects;