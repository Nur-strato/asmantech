"use client";

import React, { useState, useEffect } from "react";
import { Search, Plus, ArrowUpRight } from "lucide-react";

type Lang = "RU" | "EN";
type ThemeMode = "Standard" | "Minimal";

export function AucahackSandbox({ isZoomed }: { isZoomed: boolean }) {
    const [lang, setLang] = useState<Lang>("RU");
    const [theme, setTheme] = useState<ThemeMode>("Standard");
    const [searchQuery, setSearchQuery] = useState("");
    const [activeNav, setActiveNav] = useState("courses");
    const [timeStr, setTimeStr] = useState("04:27:31");

    const [courses, setCourses] = useState([
        { id: "c1", code: "MATH-201", dept: "MAT", nameRu: "Linear Algebra", nameEn: "Linear Algebra" },
        { id: "c2", code: "CS-101", dept: "SFW", nameRu: "Introduction to Computer Science", nameEn: "Introduction to Computer Science" },
        { id: "c3", code: "CS-310", dept: "SFW", nameRu: "Distributed Systems & Raft", nameEn: "Distributed Systems & Raft" },
        { id: "c4", code: "HUM-110", dept: "WARC", nameRu: "Academic Writing & Pedagogy", nameEn: "Academic Writing & Pedagogy" },
    ]);

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setTimeStr(now.toLocaleTimeString("ru-RU", { hour12: false }));
        };
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    const t = {
        RU: {
            portal: "Студенческий портал",
            sub: "Оценки преподавателей, архив материалов и аналитика учебной нагрузки.",
            trading: "Course trading",
            links: "Links",
            searchPlaceholder: "Поиск по коду или названию курса в базе данных...",
            dept: "МОЙ ДЕПАРТАМЕНТ",
            deptBtn: "Департамент",
            quickAccess: "БЫСТРЫЙ ДОСТУП • МОИ КУРСЫ",
            nav: ["Курсы", "Профессоры", "Lifehacks", "Отзывы ▾", "Тулзы ▾", "Ещё ▾"],
            themeLabel: "ТЕМА",
            addBtn: "+ ДОБАВИТЬ",
            legal: "ПРАВОВАЯ ИНФОРМАЦИЯ",
            footerCols: {
                main: "ГЛАВНАЯ",
                mainLinks: ["Добавить", "Курсы", "Профессоры", "Lifehacks"],
                reviews: "ОТЗЫВЫ",
                reviewLinks: ["Courses", "Professors", "WARC Tutors", "Offices"],
                tools: "ИНСТРУМЕНТЫ",
                toolLinks: [
                    "Академ календарь",
                    "Schedule template",
                    "Pomodoro",
                    "GPA Calculator",
                    "GPA Goal",
                    "Progress Tracker",
                    "Deadline Tracker",
                ],
                more: "ЕЩЕ",
                moreLinks: [
                    "Market",
                    "Lost & Found",
                    "Scholarships",
                    "Clubs",
                    "Student Senate",
                    "Карта AUCA",
                    "Студенты",
                ],
            },
        },
        EN: {
            portal: "Student Portal",
            sub: "Professor ratings, course materials archive and academic workload analytics.",
            trading: "Course trading",
            links: "Links",
            searchPlaceholder: "Search by course code or title in database...",
            dept: "MY DEPARTMENT",
            deptBtn: "Department",
            quickAccess: "QUICK ACCESS • MY COURSES",
            nav: ["Courses", "Professors", "Lifehacks", "Reviews ▾", "Tools ▾", "More ▾"],
            themeLabel: "THEME",
            addBtn: "+ ADD",
            legal: "LEGAL INFORMATION",
            footerCols: {
                main: "MAIN",
                mainLinks: ["Add", "Courses", "Professors", "Lifehacks"],
                reviews: "REVIEWS",
                reviewLinks: ["Courses", "Professors", "WARC Tutors", "Offices"],
                tools: "TOOLS",
                toolLinks: [
                    "Academic Calendar",
                    "Schedule template",
                    "Pomodoro",
                    "GPA Calculator",
                    "GPA Goal",
                    "Progress Tracker",
                    "Deadline Tracker",
                ],
                more: "MORE",
                moreLinks: [
                    "Market",
                    "Lost & Found",
                    "Scholarships",
                    "Clubs",
                    "Student Senate",
                    "AUCA Map",
                    "Students",
                ],
            },
        },
    }[lang];

    const removeCourse = (id: string) => {
        setCourses((prev) => prev.filter((c) => c.id !== id));
    };

    const toggleLang = (e: React.MouseEvent) => {
        e.stopPropagation();
        setLang((prev) => (prev === "RU" ? "EN" : "RU"));
    };

    const toggleTheme = (e: React.MouseEvent) => {
        e.stopPropagation();
        setTheme((prev) => (prev === "Standard" ? "Minimal" : "Standard"));
    };

    const isMinimal = theme === "Minimal";

    const filtered = courses.filter((c) => {
        const name = lang === "RU" ? c.nameRu : c.nameEn;
        return `${c.code} ${name} ${c.dept}`.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (!isZoomed) {
        return (
            <div
                className={`flex-1 p-4 flex flex-col justify-between overflow-hidden select-none font-sans transition-colors ${
                    isMinimal ? "bg-[#FAF9F5] text-content" : "bg-[#F8F6F0] text-black"
                }`}
            >
                <div
                    className={`flex items-center justify-between pb-2 ${
                        isMinimal ? "border-b border-line" : "border-b-2 border-black"
                    }`}
                >
                    <div className="flex items-center gap-2">
                        <span className="font-black text-sm tracking-tight">AUCAHACK</span>
                        <span
                            className={`text-[8px] font-mono px-1 rounded-sm uppercase ${
                                isMinimal
                                    ? "border border-line-strong text-content-secondary bg-white"
                                    : "border border-black font-bold text-black"
                            }`}
                        >
                            BETA
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[9px] font-mono text-content-muted">
                        <span>{theme}</span>
                        <span>•</span>
                        <span>{lang}</span>
                    </div>
                </div>
                <div className="my-auto text-center space-y-1">
                    <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
                        {t.portal}<br />
                        <span className={isMinimal ? "text-content-secondary font-extrabold" : "text-neutral-800"}>AUCA</span>
                    </h2>
                    <p className="text-[9px] text-content-muted max-w-xs mx-auto line-clamp-1">{t.sub}</p>
                </div>
                <div
                    className={`flex items-center justify-between pt-2 border-t text-[9px] font-mono ${
                        isMinimal ? "border-line text-content-muted" : "border-black/10 text-content-secondary"
                    }`}
                >
                    <span>Курсов: {courses.length}</span>
                    <span className="font-bold underline">Zoom & Interact</span>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`flex-1 flex flex-col overflow-hidden select-text font-sans transition-colors duration-200 ${
                isMinimal ? "bg-[#FAF9F6] text-content" : "bg-[#F8F6F0] text-black"
            }`}
        >
            <header
                className={`h-12 px-4 sm:px-6 flex items-center justify-between shrink-0 transition-colors ${
                    isMinimal
                        ? "bg-[#FAF9F6] border-b border-line/90"
                        : "bg-[#F8F6F0] border-b-2 border-black"
                }`}
            >
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="font-black text-base sm:text-lg tracking-tight">AUCAHACK</span>
                        <span
                            className={`text-[9px] font-mono px-1.5 py-0.2 rounded-sm font-bold uppercase ${
                                isMinimal
                                    ? "border border-line-strong text-content-secondary bg-white"
                                    : "border-2 border-black text-black"
                            }`}
                        >
                            BETA
                        </span>
                    </div>

                    <div className="hidden lg:flex items-center gap-4 text-xs font-semibold text-neutral-700">
                        <button
                            type="button"
                            className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-sm cursor-pointer transition-all ${
                                isMinimal
                                    ? "border border-line-strong bg-white text-neutral-700 hover:bg-neutral-50"
                                    : "border-2 border-black bg-white text-black shadow-[1.5px_1.5px_0px_#000]"
                            }`}
                        >
                            +
                        </button>
                        {t.nav.map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => setActiveNav(item)}
                                className={`transition-colors cursor-pointer hover:text-black ${
                                    activeNav === item ? "text-black font-black" : "font-medium"
                                }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all ${
                            isMinimal
                                ? "bg-white border border-line text-neutral-700 shadow-2xs hover:border-line-strong"
                                : "bg-white border-2 border-black text-black shadow-[2px_2px_0px_#000]"
                        }`}
                        title="Переключить тему Standard / Minimal"
                    >
                        <span
                            className={`w-2 h-2 rounded-full transition-colors ${
                                isMinimal ? "bg-neutral-400" : "bg-yellow-400 border border-black"
                            }`}
                        />
                        <span>{theme} ▾</span>
                        <span className="text-[8px] text-content-subtle font-normal">{t.themeLabel}</span>
                    </button>

                    <button
                        type="button"
                        onClick={toggleLang}
                        className={`px-2.5 py-1 rounded-lg font-bold text-xs font-mono flex items-center gap-1 cursor-pointer active:scale-95 transition-all ${
                            isMinimal
                                ? "bg-white border border-line text-neutral-700 shadow-2xs hover:border-line-strong"
                                : "bg-white border-2 border-black text-black shadow-[2px_2px_0px_#000]"
                        }`}
                        title="Сменить язык (RU / EN)"
                    >
                        <span>{lang}</span>
                        <span className="text-[9px] opacity-40">⇄</span>
                    </button>

                    <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs transition-all ${
                            isMinimal
                                ? "bg-white border border-line text-content-secondary shadow-2xs"
                                : "bg-white border-2 border-black text-black shadow-[2px_2px_0px_#000]"
                        }`}
                    >
                        👓
                    </div>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto space-y-12 [scrollbar-width:none]">
                <div className="px-4 sm:px-10 pt-6 space-y-6">
                    <div className="text-center space-y-2 py-2">
                        <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none text-content">
                            {t.portal}<br />AUCA
                        </h1>
                        <p className="text-xs sm:text-sm text-content-secondary font-medium max-w-md mx-auto">
                            {t.sub}
                        </p>
                    </div>

                    <div className="flex items-center justify-center gap-3 max-w-xl mx-auto">
                        <button
                            type="button"
                            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer text-center ${
                                isMinimal
                                    ? "bg-white border border-line/90 text-content shadow-xs hover:border-line-strong active:bg-neutral-50"
                                    : "bg-white border-2 border-black text-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000]"
                            }`}
                        >
                            {t.trading}
                        </button>
                        <button
                            type="button"
                            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer text-center ${
                                isMinimal
                                    ? "bg-white border border-line/90 text-content shadow-xs hover:border-line-strong active:bg-neutral-50"
                                    : "bg-white border-2 border-black text-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000]"
                            }`}
                        >
                            {t.links}
                        </button>
                    </div>

                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-content-subtle" size={16} />
                            <input
                                type="text"
                                placeholder={t.searchPlaceholder}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`w-full py-3 pl-11 pr-4 text-xs sm:text-sm font-medium focus:outline-hidden transition-all placeholder:text-content-subtle ${
                                    isMinimal
                                        ? "bg-white border border-line/90 rounded-2xl text-content shadow-xs focus:border-neutral-400"
                                        : "bg-white border-2 border-black rounded-2xl text-black shadow-[3px_3px_0px_#000]"
                                }`}
                            />
                        </div>
                    </div>

                    <div
                        className={`max-w-2xl mx-auto p-4 sm:p-6 space-y-4 transition-all ${
                            isMinimal
                                ? "bg-white border border-line/90 rounded-2xl shadow-xs"
                                : "bg-white/70 border-2 border-black rounded-2xl shadow-[4px_4px_0px_#000]"
                        }`}
                    >
                        <div className="text-center space-y-2">
                            <span className="text-[10px] font-mono font-bold tracking-wider text-content-subtle uppercase">
                                {t.dept}
                            </span>
                            <div>
                                <button
                                    type="button"
                                    className={`px-4 py-2 text-xs font-bold rounded-xl inline-flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer ${
                                        isMinimal
                                            ? "bg-[#1C2430] hover:bg-[#253041] text-white shadow-xs"
                                            : "bg-black text-white shadow-sm"
                                    }`}
                                >
                                    <Plus size={13} />
                                    <span>{t.deptBtn}</span>
                                </button>
                            </div>
                        </div>

                        <div className={`pt-2 ${isMinimal ? "border-t border-neutral-100" : "border-t border-black/10"}`}>
                            <div className="text-[10px] font-mono font-bold tracking-wider text-content-subtle text-center uppercase pb-3">
                                {t.quickAccess} ({courses.length}/4)
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {filtered.map((c) => (
                                    <div
                                        key={c.id}
                                        className={`p-3 rounded-xl flex items-center justify-between transition-all ${
                                            isMinimal
                                                ? "bg-white border border-line/90 text-content hover:border-line-strong shadow-2xs"
                                                : "bg-white border-2 border-black text-black shadow-[2px_2px_0px_#000] hover:bg-neutral-50"
                                        }`}
                                    >
                                        <div>
                                            <div className="text-[10px] font-mono text-content-subtle font-bold">
                                                {c.code} • {c.dept}
                                            </div>
                                            <div className="font-bold text-xs text-content mt-0.5 line-clamp-1">
                                                {lang === "RU" ? c.nameRu : c.nameEn}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                            <button
                                                type="button"
                                                onClick={() => removeCourse(c.id)}
                                                className="w-5 h-5 rounded-full border border-line-strong hover:border-red-500 hover:text-red-500 flex items-center justify-center text-content-subtle transition-colors cursor-pointer text-xs"
                                                title="Удалить курс"
                                            >
                                                ✕
                                            </button>
                                            <ArrowUpRight size={14} className="text-neutral-800" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <footer
                    className={`pt-10 pb-6 px-6 sm:px-12 transition-colors border-t ${
                        isMinimal
                            ? "bg-[#FAF9F6] border-line/80 text-content"
                            : "bg-[#F8F6F0] border-black/10 text-black"
                    }`}
                >
                    <div className="flex items-center justify-between pb-8 border-b border-black/5">
                        <div className="flex items-center gap-3">
                            <span className="font-black text-base sm:text-lg tracking-tight">AUCAHACK</span>
                            <span className="text-[11px] font-mono text-content-muted font-bold uppercase tracking-wider">
                                BISHKEK • {timeStr}
                            </span>
                        </div>

                        <button
                            type="button"
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider cursor-pointer active:scale-95 transition-all ${
                                isMinimal
                                    ? "bg-white border border-line-strong text-neutral-800 hover:border-neutral-400 shadow-2xs"
                                    : "bg-black text-white hover:bg-ink-strong shadow-sm"
                            }`}
                        >
                            {t.addBtn}
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 text-xs">
                        <div className="space-y-3">
                            <div className="font-mono text-[10px] font-bold tracking-widest text-content-subtle uppercase">
                                {t.footerCols.main}
                            </div>
                            <ul className="space-y-2 font-medium">
                                {t.footerCols.mainLinks.map((link) => (
                                    <li key={link}>
                                        <span className="cursor-pointer hover:underline underline-offset-2">{link}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-4">
                                <span className="inline-block px-2 py-0.5 rounded font-mono font-bold text-[10px] tracking-widest bg-yellow-400 text-black cursor-pointer shadow-2xs">
                                    DEV TEAM
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="font-mono text-[10px] font-bold tracking-widest text-content-subtle uppercase">
                                {t.footerCols.reviews}
                            </div>
                            <ul className="space-y-2 font-medium">
                                {t.footerCols.reviewLinks.map((link) => (
                                    <li key={link}>
                                        <span className="cursor-pointer hover:underline underline-offset-2">{link}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <div className="font-mono text-[10px] font-bold tracking-widest text-content-subtle uppercase">
                                {t.footerCols.tools}
                            </div>
                            <ul className="space-y-2 font-medium">
                                {t.footerCols.toolLinks.map((link) => (
                                    <li key={link}>
                                        <span className="cursor-pointer hover:underline underline-offset-2">{link}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <div className="font-mono text-[10px] font-bold tracking-widest text-content-subtle uppercase">
                                {t.footerCols.more}
                            </div>
                            <ul className="space-y-2 font-medium">
                                {t.footerCols.moreLinks.map((link) => (
                                    <li key={link}>
                                        <span className="cursor-pointer hover:underline underline-offset-2">{link}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono text-content-muted">
                        <span>© 2026 AUCAHACK. ALL RIGHTS RESERVED.</span>
                        <span className="font-bold tracking-wider cursor-pointer hover:text-black">
                            {t.legal}
                        </span>
                    </div>
                </footer>
            </div>
        </div>
    );
}