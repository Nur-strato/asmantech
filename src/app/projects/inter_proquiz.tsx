"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";

type Lang = "RU" | "EN";

function InstagramIcon({ size = 15 }: { size?: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
    );
}

function LinkedinIcon({ size = 15 }: { size?: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    );
}

function YoutubeIcon({ size = 15 }: { size?: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
            <path d="m10 15 5-3-5-3z" />
        </svg>
    );
}

export function ProQuizSandbox({ isZoomed }: { isZoomed: boolean }) {
    const [lang, setLang] = useState<Lang>("RU");
    const [activeTab, setActiveTab] = useState<"league" | "bio" | "matrix">("league");
    const [activeAction, setActiveAction] = useState<string>("find");
    const [buzzerPing, setBuzzerPing] = useState<number | null>(null);

    const toggleLang = (e: React.MouseEvent) => {
        e.stopPropagation();
        setLang((prev) => (prev === "RU" ? "EN" : "RU"));
    };

    const handlePredict = () => {
        setActiveAction("predict");
        setBuzzerPing(Math.floor(Math.random() * 4) + 2);
    };

    const t = {
        RU: {
            tournaments: "Турниры",
            leaderboard: "Таблица лидеров",
            hallOfFame: "Зал славы",
            universities: "Университеты",
            about: "О нас ▾",
            logout: "Выйти",
            findPlayers: "Find Players",
            predict: "Predict",
            practice: "Practice",
            mainLeague: "MAIN LEAGUE",
            biography: "BIOGRAPHY",
            teamsMatrix: "TEAMS MATRIX",
            leagueTitle: "Main League Hierarchy",
            leagueDesc:
                "This section provides official parameters and insights regarding the Premier League Tournament. Here you can explore structural guidelines, promotion pathways across tiers, official rewards metrics, and the real-time operational calendar of the competitive season.",
            leagueBtn: "VIEW REWARDS & REGULATIONS",
            bioTitle: "Biography of ProQuiz.kg",
            bioDesc:
                "Discover the origin story of our massive intellectual movement. Learn how a local initiative born inside a passionate Quiz Club evolved into a comprehensive digital ecosystem uniting leading academic institutions and the sharpest regional minds.",
            bioBtn: "READ OUR STORY",
            matrixTitle: "Institutional Teams Registry",
            matrixDesc:
                "The official tracking matrix of active intercollegiate rosters. For the duration of the current championship cycle, a strict overall limit of 14 institutional slots is enforced, allocated safely as fixed quotas across participating universities.",
            matrixBtn: "VIEW FULL ROSTERS",
            quotas: [
                { univs: "AUCA / Ala-Too", count: "3 Teams Each" },
                { univs: "Manas / KRSU", count: "2 Teams Each" },
                { univs: "OSCE / KNU / BSU / Salymbekov", count: "1 Team Each" },
            ],
            rights: "Copyright © 2026 ProQuizKG All rights reserved.",
        },
        EN: {
            tournaments: "Tournaments",
            leaderboard: "Leaderboard",
            hallOfFame: "Hall of Fame",
            universities: "Universities",
            about: "About ▾",
            logout: "Log Out",
            findPlayers: "Find Players",
            predict: "Predict",
            practice: "Practice",
            mainLeague: "MAIN LEAGUE",
            biography: "BIOGRAPHY",
            teamsMatrix: "TEAMS MATRIX",
            leagueTitle: "Main League Hierarchy",
            leagueDesc:
                "This section provides official parameters and insights regarding the Premier League Tournament. Here you can explore structural guidelines, promotion pathways across tiers, official rewards metrics, and the real-time operational calendar of the competitive season.",
            leagueBtn: "VIEW REWARDS & REGULATIONS",
            bioTitle: "Biography of ProQuiz.kg",
            bioDesc:
                "Discover the origin story of our massive intellectual movement. Learn how a local initiative born inside a passionate Quiz Club evolved into a comprehensive digital ecosystem uniting leading academic institutions and the sharpest regional minds.",
            bioBtn: "READ OUR STORY",
            matrixTitle: "Institutional Teams Registry",
            matrixDesc:
                "The official tracking matrix of active intercollegiate rosters. For the duration of the current championship cycle, a strict overall limit of 14 institutional slots is enforced, allocated safely as fixed quotas across participating universities.",
            matrixBtn: "VIEW FULL ROSTERS",
            quotas: [
                { univs: "AUCA / Ala-Too", count: "3 Teams Each" },
                { univs: "Manas / KRSU", count: "2 Teams Each" },
                { univs: "OSCE / KNU / BSU / Salymbekov", count: "1 Team Each" },
            ],
            rights: "Copyright © 2026 ProQuizKG All rights reserved.",
        },
    }[lang];

    if (!isZoomed) {
        return (
            <div className="flex-1 bg-[#F8FAFC] p-3 text-neutral-900 flex flex-col justify-between overflow-hidden select-none font-sans">
                <div className="bg-[#050C1F] p-2.5 rounded-xl text-white flex items-center justify-between text-[9px]">
                    <div className="flex items-center gap-2">
                        <span className="text-cyan-400 font-bold font-mono">🌐 {lang} ▾</span>
                        <span className="font-extrabold text-blue-400">ProQuizKG</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-blue-500 text-white font-bold text-[8px]">
                        {t.logout}
                    </span>
                </div>

                <div className="my-auto text-center space-y-1">
                    <h2 className="text-2xl font-black tracking-widest text-[#050C1F] font-mono">
                        PROQUIZKG
                    </h2>
                    <p className="text-[10px] text-neutral-500 font-mono">Premier League Platform</p>
                </div>

                <div className="flex justify-between items-center text-[9px] font-mono text-neutral-500 border-t border-neutral-200 pt-1.5">
                    <span>🏆 {t.mainLeague}</span>
                    <span className="text-blue-600 font-bold">● Zoom & Interact</span>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-white text-neutral-900 flex flex-col overflow-hidden select-text font-sans">
            <header className="h-12 border-b border-white/10 px-4 sm:px-8 flex items-center justify-between shrink-0 bg-[#050C1F] text-white z-30">
                <div className="flex items-center gap-4 sm:gap-6">
                    <button
                        type="button"
                        onClick={toggleLang}
                        className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
                        title="Change Language"
                    >
                        <span>🌐 {lang} ▾</span>
                    </button>

                    <span className="font-extrabold text-sm sm:text-base tracking-wider text-blue-400">
                        ProQuizKG
                    </span>

                    <nav className="hidden lg:flex items-center gap-4 text-xs font-medium text-neutral-300">
                        <span className="hover:text-white cursor-pointer transition-colors">{t.tournaments}</span>
                        <span className="hover:text-white cursor-pointer transition-colors">{t.leaderboard}</span>
                        <span className="hover:text-white cursor-pointer transition-colors">{t.hallOfFame}</span>
                        <span className="hover:text-white cursor-pointer transition-colors">{t.universities}</span>
                        <span className="hover:text-white cursor-pointer transition-colors">{t.about}</span>
                    </nav>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-neutral-300 hidden sm:inline">| Nur</span>
                    <button
                        type="button"
                        className="px-3.5 py-1 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs transition-colors cursor-pointer shadow-sm"
                    >
                        {t.logout}
                    </button>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto [scrollbar-width:thin] flex flex-col justify-between">
                <div>
                    <div className="px-0 sm:px-10 lg:px-16 pt-0 sm:pt-3">
                        <div className="relative bg-[#050C1F] text-white pt-10 sm:pt-14 pb-8 sm:pb-12 px-6 sm:px-12 flex flex-col items-center justify-center text-center overflow-hidden sm:rounded-2xl shadow-md">
                            <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:18px_18px] opacity-25 pointer-events-none" />

                            <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-right font-mono text-[9px] sm:text-[10px] text-blue-400/25 pointer-events-none select-none hidden md:block leading-relaxed">
                                [CINEMA]<br />
                                • Bananas are...<br />
                                [SPORTS] F...<br />
                                • The Pacific...<br />
                                [IT] Python...<br />
                                • Sound travel...<br />
                                [SCIENCE]<br />
                                • An octopus...<br />
                                [ART] V...<br />
                                • Cleopatra...
                            </div>

                            <div className="space-y-5 z-10 my-auto">
                                <h1
                                    className="text-4xl sm:text-6xl md:text-7xl font-black tracking-widest uppercase font-mono select-none"
                                    style={{
                                        color: "transparent",
                                        WebkitTextStroke: "2px rgba(255, 255, 255, 0.95)",
                                        textShadow: "0 0 40px rgba(59, 130, 246, 0.4)",
                                    }}
                                >
                                    PROQUIZKG
                                </h1>

                                <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-neutral-900/90 border border-white/10 backdrop-blur-xl shadow-2xl">
                                    <button
                                        type="button"
                                        onClick={() => setActiveAction("find")}
                                        className={`px-4 py-2 rounded-full text-xs font-bold font-sans transition-all cursor-pointer flex items-center gap-1.5 ${
                                            activeAction === "find"
                                                ? "bg-blue-600 text-white shadow-md"
                                                : "text-neutral-400 hover:text-white"
                                        }`}
                                    >
                                        <span>🔍</span>
                                        <span>{t.findPlayers}</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handlePredict}
                                        className={`px-4 py-2 rounded-full text-xs font-bold font-sans transition-all cursor-pointer flex items-center gap-1.5 ${
                                            activeAction === "predict"
                                                ? "bg-blue-600 text-white shadow-md"
                                                : "text-neutral-400 hover:text-white"
                                        }`}
                                    >
                                        <span>🎯</span>
                                        <span>{t.predict}</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setActiveAction("practice")}
                                        className={`px-4 py-2 rounded-full text-xs font-bold font-sans transition-all cursor-pointer flex items-center gap-1.5 ${
                                            activeAction === "practice"
                                                ? "bg-purple-600 text-white shadow-md"
                                                : "text-neutral-400 hover:text-white"
                                        }`}
                                    >
                                        <span>🎓</span>
                                        <span>{t.practice}</span>
                                    </button>
                                </div>

                                {buzzerPing !== null && (
                                    <div className="text-xs font-mono text-emerald-400 pt-1 animate-pulse">
                                        ✓ SOCKET LATENCY: {buzzerPing} ms // READY TO BUZZ
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-10 space-y-6">
                        <div className="grid grid-cols-3 gap-3">
                            <button
                                type="button"
                                onClick={() => setActiveTab("league")}
                                className={`py-3 px-2 rounded-xl text-xs font-bold font-mono tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 border ${
                                    activeTab === "league"
                                        ? "bg-[#101935] text-white border-[#101935] shadow-md"
                                        : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50"
                                }`}
                            >
                                <span>🏆</span>
                                <span>{t.mainLeague}</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveTab("bio")}
                                className={`py-3 px-2 rounded-xl text-xs font-bold font-mono tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 border ${
                                    activeTab === "bio"
                                        ? "bg-[#101935] text-white border-[#101935] shadow-md"
                                        : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50"
                                }`}
                            >
                                <span>📖</span>
                                <span>{t.biography}</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveTab("matrix")}
                                className={`py-3 px-2 rounded-xl text-xs font-bold font-mono tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 border ${
                                    activeTab === "matrix"
                                        ? "bg-[#101935] text-white border-[#101935] shadow-md"
                                        : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50"
                                }`}
                            >
                                <span>👥</span>
                                <span>{t.teamsMatrix}</span>
                            </button>
                        </div>

                        <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                            {activeTab === "league" && (
                                <>
                                    <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                                        {t.leagueTitle}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                                        {t.leagueDesc}
                                    </p>
                                    <div className="pt-2">
                                        <button
                                            type="button"
                                            className="px-5 py-2.5 bg-[#101935] hover:bg-[#1a2752] text-white rounded-lg text-xs font-bold font-mono tracking-wider active:scale-95 transition-all cursor-pointer shadow-sm"
                                        >
                                            {t.leagueBtn}
                                        </button>
                                    </div>
                                </>
                            )}

                            {activeTab === "bio" && (
                                <>
                                    <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                                        {t.bioTitle}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                                        {t.bioDesc}
                                    </p>
                                    <div className="pt-2">
                                        <button
                                            type="button"
                                            className="px-5 py-2.5 bg-[#101935] hover:bg-[#1a2752] text-white rounded-lg text-xs font-bold font-mono tracking-wider active:scale-95 transition-all cursor-pointer shadow-sm"
                                        >
                                            {t.bioBtn}
                                        </button>
                                    </div>
                                </>
                            )}

                            {activeTab === "matrix" && (
                                <>
                                    <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                                        {t.matrixTitle}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                                        {t.matrixDesc}
                                    </p>

                                    <div className="py-2 divide-y divide-neutral-100 text-xs font-mono">
                                        {t.quotas.map((q) => (
                                            <div
                                                key={q.univs}
                                                className="py-2.5 flex items-center justify-between"
                                            >
                                                <span className="text-neutral-700 font-semibold">{q.univs}</span>
                                                <span className="px-2.5 py-1 bg-neutral-100 rounded text-neutral-700 font-bold border border-neutral-200">
                                                    {q.count}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            type="button"
                                            className="px-5 py-2.5 bg-[#101935] hover:bg-[#1a2752] text-white rounded-lg text-xs font-bold font-mono tracking-wider active:scale-95 transition-all cursor-pointer shadow-sm"
                                        >
                                            {t.matrixBtn}
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <footer className="border-t-2 border-black pt-6 pb-10 px-6 sm:px-12 bg-white">
                    <div className="max-w-4xl mx-auto flex flex-col space-y-5">
                        <div className="flex items-center justify-between text-xs">
                            <div className="font-bold tracking-wider font-mono text-neutral-900">
                                DEV TEAM
                            </div>
                            <div className="text-[11px] text-neutral-400 font-sans">
                                {t.rights}
                            </div>
                        </div>

                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#081329] text-white text-xs font-mono shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                                <span className="font-bold tracking-wider text-cyan-400">PROFILER:</span>
                                <span className="text-neutral-300">Agent: <strong className="text-white">Nur</strong></span>
                                <span className="text-neutral-500">•</span>
                                <span className="px-1.5 py-0.2 rounded bg-neutral-800 text-[10px] font-bold text-neutral-300">
                                    USER
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-1">
                            <a
                                href="#"
                                className="w-8 h-8 rounded-full border border-neutral-300 hover:border-black flex items-center justify-center text-neutral-700 hover:text-black transition-colors"
                            >
                                <InstagramIcon size={15} />
                            </a>
                            <a
                                href="#"
                                className="w-8 h-8 rounded-full border border-neutral-300 hover:border-black flex items-center justify-center text-neutral-700 hover:text-black transition-colors"
                            >
                                <LinkedinIcon size={15} />
                            </a>
                            <a
                                href="#"
                                className="w-8 h-8 rounded-full border border-neutral-300 hover:border-black flex items-center justify-center text-neutral-700 hover:text-black transition-colors"
                            >
                                <YoutubeIcon size={15} />
                            </a>
                            <a
                                href="#"
                                className="w-8 h-8 rounded-full border border-neutral-300 hover:border-black flex items-center justify-center text-neutral-700 hover:text-black transition-colors"
                            >
                                <Send size={14} className="-ml-0.5" />
                            </a>
                            <a
                                href="#"
                                className="w-8 h-8 rounded-full border border-neutral-300 hover:border-black flex items-center justify-center text-neutral-700 hover:text-black font-serif font-black text-xs transition-colors"
                            >
                                M
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}