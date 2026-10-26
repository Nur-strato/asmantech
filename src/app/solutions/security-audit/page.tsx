"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowUpRight,
    ShieldCheck,
    ShieldAlert,
    Terminal,
    Lock,
    Key,
    Bug,
    Server,
    Database,
    Check,
    Info,
    Flame,
    Loader2,
    Fingerprint,
    CheckCircle2,
} from "lucide-react";

// --- КОМПОНЕНТ ДЛЯ 2-ГО ЭКРАНА (МОКАПЫ УСТРОЙСТВ ДЛЯ БЕЗОПАСНОСТИ) ---
function SecurityDevicePairMockup({ type }: { type: "code" | "server" | "pentest" }) {
    if (type === "code") {
        return (
            <div className="relative w-full h-[220px] sm:h-[240px] flex items-end justify-center select-none pt-2">
                <div className="relative w-[78%] sm:w-[74%] aspect-[16/10] mr-[14%] flex flex-col items-center">
                    <div className="w-full h-full bg-[#1A1A1A] rounded-t-[14px] p-1.5 sm:p-2 border-[2px] border-[#2A2A2A] shadow-xl flex flex-col overflow-hidden">
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-800 mx-auto mb-1 shrink-0" />
                        <div className="flex-1 rounded-[6px] bg-[#0A0D14] p-3 text-white overflow-hidden flex flex-col justify-between border border-neutral-800">
                            <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5 text-[8px] sm:text-[9px] font-mono text-neutral-400">
                                <span className="font-bold text-emerald-400">SAST & CODE SCAN</span>
                                <span className="text-emerald-400">0 CRITICAL FLAWS</span>
                            </div>
                            <div className="grid grid-cols-12 gap-2 items-center my-auto">
                                <div className="col-span-7 space-y-1">
                                    <span className="text-[7px] font-mono text-blue-400 uppercase tracking-wider">
                                        DEPENDENCY SHIELD
                                    </span>
                                    <h4 className="font-bold text-[10px] sm:text-xs text-white leading-tight">
                                        SQLi / XSS: Патчи применены
                                    </h4>
                                    <p className="text-[7px] sm:text-[8px] text-neutral-400 line-clamp-2">
                                        Статический анализ зависимостей, санитизация входящих параметров.
                                    </p>
                                </div>
                                <div className="col-span-5 h-14 sm:h-16 rounded bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center">
                                    <span className="text-emerald-400 font-mono font-black text-sm sm:text-base">SECURE</span>
                                    <span className="text-[6px] font-mono text-neutral-400">STATIC AUDIT</span>
                                </div>
                            </div>
                            <div className="text-[6px] text-neutral-500 font-mono">01 // CODEBASE INTEGRITY</div>
                        </div>
                    </div>
                    <div className="w-[108%] h-2 bg-gradient-to-b from-[#D1D5DB] via-[#9CA3AF] to-[#6B7280] rounded-b-md shadow-md flex justify-center">
                        <div className="w-12 h-1 bg-[#4B5563] rounded-b-sm" />
                    </div>
                </div>

                <div className="absolute right-2 sm:right-4 bottom-0 w-[82px] sm:w-[94px] aspect-[9/19] bg-[#161616] rounded-[22px] p-1 border-[2px] border-[#383838] shadow-[0_20px_40px_rgba(0,0,0,0.35)] z-20 flex flex-col">
                    <div className="w-5 h-1.5 bg-black rounded-full mx-auto my-0.5 shrink-0" />
                    <div className="flex-1 rounded-[17px] bg-[#0A0D14] p-2 text-white overflow-hidden flex flex-col justify-between border border-neutral-800">
                        <div className="text-[6px] font-mono text-emerald-400 flex justify-between">
                            <span>AUTH</span>
                            <span>JWT OK</span>
                        </div>
                        <div className="space-y-1 my-auto text-center">
                            <div className="w-8 h-8 rounded-full border-2 border-emerald-500 mx-auto flex items-center justify-center font-mono font-bold text-[10px] text-emerald-400">
                                2FA
                            </div>
                            <span className="text-[6.5px] font-mono block text-neutral-300">Tokens Signed</span>
                        </div>
                        <div className="w-6 h-0.5 bg-neutral-600 rounded-full mx-auto" />
                    </div>
                </div>
            </div>
        );
    }

    if (type === "server") {
        return (
            <div className="relative w-full h-[220px] sm:h-[240px] flex items-end justify-center select-none pt-2">
                <div className="relative w-[78%] sm:w-[74%] aspect-[16/10] mr-[14%] flex flex-col items-center">
                    <div className="w-full h-full bg-[#1A1A1A] rounded-t-[14px] p-1.5 sm:p-2 border-[2px] border-[#2A2A2A] shadow-xl flex flex-col overflow-hidden">
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-800 mx-auto mb-1 shrink-0" />
                        <div className="flex-1 rounded-[6px] bg-[#0E1726] p-3 text-white overflow-hidden flex flex-col justify-between">
                            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 text-[8px] sm:text-[9px] font-mono text-neutral-300">
                                <span className="font-bold text-blue-400">INFRASTRUCTURE</span>
                                <span className="text-emerald-400">FIREWALL ACTIVE</span>
                            </div>
                            <div className="space-y-1 my-auto">
                                <span className="text-[7px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                                    PORTS HARDENED • TLS 1.3
                                </span>
                                <div className="p-1.5 rounded bg-white/5 border border-white/10 space-y-0.5">
                                    <div className="text-[8.5px] font-bold text-white leading-tight">
                                        Nginx / Cloudflare WAF: 0 открытых шлюзов
                                    </div>
                                    <div className="text-[6.5px] text-neutral-400 line-clamp-1">
                                        Rate-limiting, изоляция Docker контейнеров, защита SSH ключей.
                                    </div>
                                </div>
                            </div>
                            <div className="text-[6px] text-neutral-400 font-mono">02 // SERVER HARDENING</div>
                        </div>
                    </div>
                    <div className="w-[108%] h-2 bg-gradient-to-b from-[#D1D5DB] via-[#9CA3AF] to-[#6B7280] rounded-b-md shadow-md flex justify-center">
                        <div className="w-12 h-1 bg-[#4B5563] rounded-b-sm" />
                    </div>
                </div>

                <div className="absolute right-2 sm:right-4 bottom-0 w-[82px] sm:w-[94px] aspect-[9/19] bg-[#161616] rounded-[22px] p-1 border-[2px] border-[#383838] shadow-[0_20px_40px_rgba(0,0,0,0.35)] z-20 flex flex-col">
                    <div className="w-5 h-1.5 bg-black rounded-full mx-auto my-0.5 shrink-0" />
                    <div className="flex-1 rounded-[17px] bg-[#0E1726] p-2 text-white overflow-hidden flex flex-col justify-between border border-white/10">
                        <div className="text-[6px] font-mono text-blue-400 flex justify-between">
                            <span>WAF</span>
                            <span>BLOCK</span>
                        </div>
                        <div className="space-y-1 my-auto text-center">
                            <div className="text-[12px]">🛡️</div>
                            <span className="text-[6.5px] font-mono text-emerald-400">DDoS Filtrated</span>
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
                            <span className="font-bold text-rose-400">BLACK / GREY BOX</span>
                            <span className="text-emerald-400">SIMULATION COMPLETE</span>
                        </div>
                        <div className="space-y-1.5 my-auto">
                            <div className="flex justify-between items-baseline">
                                <h4 className="font-bold text-[10px] sm:text-xs">Имитация атак хакеров</h4>
                                <span className="text-[8px] text-emerald-400 font-mono">100% Защищено</span>
                            </div>
                            <div className="p-1.5 rounded bg-black/40 border border-neutral-800 text-[7px] space-y-1">
                                <div className="text-neutral-300 font-medium">BOLA / IDOR уязвимости проверены</div>
                                <div className="text-[6.5px] text-neutral-400">Логика платежей и разграничения прав доступа протестирована</div>
                            </div>
                        </div>
                        <div className="text-[6px] text-neutral-400 font-mono">03 // PENETRATION TEST</div>
                    </div>
                </div>
                <div className="w-[108%] h-2 bg-gradient-to-b from-[#D1D5DB] via-[#9CA3AF] to-[#6B7280] rounded-b-md shadow-md flex justify-center">
                    <div className="w-12 h-1 bg-[#4B5563] rounded-b-sm" />
                </div>
            </div>

            <div className="absolute right-2 sm:right-4 bottom-0 w-[82px] sm:w-[94px] aspect-[9/19] bg-[#161616] rounded-[22px] p-1 border-[2px] border-[#383838] shadow-[0_20px_40px_rgba(0,0,0,0.35)] z-20 flex flex-col">
                <div className="w-5 h-1.5 bg-black rounded-full mx-auto my-0.5 shrink-0" />
                <div className="flex-1 rounded-[17px] bg-[#111827] p-2 text-white overflow-hidden flex flex-col justify-between border border-neutral-800">
                    <div className="text-[6px] font-mono text-rose-400 flex justify-between">
                        <span>PENTEST</span>
                        <span className="text-emerald-400">PASSED</span>
                    </div>
                    <div className="space-y-1.5 my-auto text-center">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/40 mx-auto flex items-center justify-center text-[8px] font-mono text-emerald-400">
                            ✓
                        </div>
                        <div className="text-[6px] text-neutral-300 font-mono">
                            Zero Leakage
                        </div>
                    </div>
                    <div className="w-6 h-0.5 bg-white/40 rounded-full mx-auto" />
                </div>
            </div>
        </div>
    );
}

// --- НАПРАВЛЕНИЯ АУДИТА БЕЗОПАСНОСТИ ---
interface SecurityDirection {
    num: string;
    type: "code" | "server" | "pentest";
    title: string;
    description: string;
    timeline: string;
    express: string;
    icon: React.ElementType;
    iconBg: string;
    iconColor: string;
    examples: string[];
}

const SECURITY_DIRECTIONS: SecurityDirection[] = [
    {
        num: "01",
        type: "code",
        title: "Аудит исходного кода и архитектуры",
        description: "Поиск скрытых уязвимостей в бизнес-логике, зависимостях и API-методах.",
        timeline: "до 7 дней",
        express: "3 дня",
        icon: Terminal,
        iconBg: "bg-emerald-50/80 border-emerald-100/70",
        iconColor: "text-emerald-600",
        examples: [
            "Проверка на OWASP Top 10 (SQLi, XSS, CSRF, SSRF)",
            "Аудит аутентификации, сессий, токенов JWT и прав доступа",
            "Анализ сторонних пакетов на известные CVE-уязвимости",
        ],
    },
    {
        num: "02",
        type: "server",
        title: "Серверная безопасность и инфраструктура",
        description: "Устранение брешей в настройках ОС, баз данных, веб-серверов и облака.",
        timeline: "14 дней",
        express: "7 дней",
        icon: Server,
        iconBg: "bg-blue-50/80 border-blue-100/70",
        iconColor: "text-blue-500",
        examples: [
            "Харденинг Nginx/Apache, Docker и изоляция сервисов",
            "Настройка защитных заголовков (CSP, HSTS, CORS)",
            "Аудит прав доступа к СУБД (PostgreSQL, MySQL, Redis)",
        ],
    },
    {
        num: "03",
        type: "pentest",
        title: "Пентест: симуляция реальных атак",
        description: "Практическое тестирование на проникновение методами Black Box и Grey Box.",
        timeline: "до 28 дней",
        express: "14 дней",
        icon: Bug,
        iconBg: "bg-purple-50/80 border-purple-100/70",
        iconColor: "text-purple-500",
        examples: [
            "Имитация действий внешнего злоумышленника без доступа",
            "Фаззинг форм ввода, обход валидации и логики платежей",
            "Пошаговый отчет с кодом подтверждения (PoC) и патчами",
        ],
    },
];

export default function SecurityAuditPage() {
    const [viewMode, setViewMode] = useState<"preview" | "info">("preview");
    const [isRebooting, setIsRebooting] = useState(false);
    const [bootText, setBootText] = useState("INFO");

    const switchModeWithBoot = (target: "preview" | "info") => {
        if (viewMode === target || isRebooting) return;

        setBootText(target === "info" ? "INFO" : "SCANNER");
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
                    <span>Solutions // 05</span>
                </Link>

                <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-500 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>ZERO COMPROMISE SECURITY</span>
                </div>
            </div>

            {/* ========================================================= */}
            {/* 1-Й ЭКРАН: Слева описание, справа интерактивный сканер   */}
            {/* ========================================================= */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center pt-2">

                {/* Левая колонка */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 font-mono text-[11.5px] uppercase tracking-wider">
                        <span>OFFENSIVE & DEFENSIVE SEC</span>
                        <span>•</span>
                        <span className="font-bold text-neutral-900">OWASP TOP 10</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-neutral-950 leading-[1.02]">
                        Аудит защиты систем.
                    </h1>

                    <p className="text-neutral-600 text-[16.8px] sm:text-[18.9px] leading-relaxed font-normal">
                        Находим критические дыры в коде и серверах до того, как их найдут злоумышленники. Проводим стресс-тесты, закрываем утечки баз данных и даем готовые патчи для разработчиков.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-2 font-mono text-[12.6px] text-neutral-600">
                        <div className="px-3.5 py-1.5 rounded-xl bg-neutral-50 border border-neutral-200">
                            КОНФИДЕНЦИАЛЬНОСТЬ: <span className="font-bold text-emerald-600">СТРОГИЙ NDA</span>
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
                            <span>Заказать аудит</span>
                            <ArrowUpRight size={15} />
                        </Link>
                    </div>
                </div>

                {/* Правая колонка: ноутбук с переключением SCANNER / INFO */}
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
                            SECURITY SCAN
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
                                sec-audit.vitaltech.internal
                            </span>
                            <div className="w-2 h-2 rounded-full bg-neutral-800" />
                            <span className="text-[9.5px] font-mono text-neutral-500">
                                {isRebooting ? "ANALYZING..." : "LIVE SEC"}
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

                            {/* ВИД 1: SECURITY SCAN */}
                            <div
                                className={`absolute inset-0 bg-white text-neutral-900 p-6 sm:p-8 flex flex-col justify-between transition-opacity duration-300 ${
                                    viewMode === "preview" && !isRebooting
                                        ? "opacity-100 z-10 pointer-events-auto"
                                        : "opacity-0 z-0 pointer-events-none"
                                }`}
                            >
                                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                                    <div className="flex items-center gap-2 font-bold text-sm tracking-tight text-neutral-950">
                                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                        <span>INFRASTRUCTURE REPORT</span>
                                    </div>
                                    <span className="font-mono text-[10.5px] uppercase text-neutral-400">
                                        OWASP ASVS Standard 4.0
                                    </span>
                                </div>

                                <div className="space-y-3 py-4">
                                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-50 font-mono text-[10.5px] text-emerald-700 font-bold uppercase border border-emerald-200">
                                        0 Critical Threats Detected
                                    </span>
                                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-neutral-950">
                                        Защита данных и транзакций
                                    </h3>
                                    <p className="text-neutral-500 text-[12.6px] sm:text-[14.7px] max-w-md leading-relaxed">
                                        Шифрование пользовательских баз, защита от инъекций, предотвращение хищения сессий и взлома API.
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-neutral-100 font-mono text-[10.5px]">
                                    {["OWASP Top 10", "TLS 1.3", "RBAC Verification"].map((b, i) => (
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
                                        SECURITY // Регламент аудита
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
                                                Комплексный анализ кода (SAST / DAST)
                                            </h4>
                                        </div>
                                        <p className="text-[14px] text-neutral-500 leading-relaxed mt-0.5 pl-7">
                                            Поиск скрытых бэкдоров, небезопасных библиотек с открытыми CVE и ошибок санитизации пользовательского ввода.
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-baseline gap-2.5">
                                            <span className="font-mono text-[15px] font-bold text-neutral-400">02</span>
                                            <h4 className="text-[17px] font-bold text-neutral-950 leading-snug">
                                                Тестирование бизнес-логики и IDOR
                                            </h4>
                                        </div>
                                        <p className="text-[14px] text-neutral-500 leading-relaxed mt-0.5 pl-7">
                                            Проверка возможности подмены ID пользователя, несанкционированного доступа к чужим заказам или изменения сумм платежей.
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-baseline gap-2.5">
                                            <span className="font-mono text-[15px] font-bold text-neutral-400">03</span>
                                            <h4 className="text-[17px] font-bold text-neutral-950 leading-snug">
                                                Контроль прав доступа и токенов (RBAC)
                                            </h4>
                                        </div>
                                        <p className="text-[14px] text-neutral-500 leading-relaxed mt-0.5 pl-7">
                                            Аудит алгоритмов хеширования паролей (Argon2/bcrypt), времени жизни JWT-токенов и безопасного хранения сессий в HttpOnly cookies.
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-baseline gap-2.5">
                                            <span className="font-mono text-[15px] font-bold text-neutral-400">04</span>
                                            <h4 className="text-[17px] font-bold text-neutral-950 leading-snug">
                                                Стресс-тесты на отказ (DDoS / Brute-force)
                                            </h4>
                                        </div>
                                        <p className="text-[14px] text-neutral-500 leading-relaxed mt-0.5 pl-7">
                                            Проверка устойчивости авторизационных эндпоинтов к подбору паролей, настройка лимитов запросов (Rate Limiting) и WAF.
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-baseline gap-2.5">
                                            <span className="font-mono text-[15px] font-bold text-neutral-400">05</span>
                                            <h4 className="text-[17px] font-bold text-neutral-950 leading-snug">
                                                Харденинг серверного окружения
                                            </h4>
                                        </div>
                                        <p className="text-[14px] text-neutral-500 leading-relaxed mt-0.5 pl-7">
                                            Изоляция сервисов, закрытие незащищенных системных портов, аудит прав доступа к СУБД и защита SSH-соединений.
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-baseline gap-2.5">
                                            <span className="font-mono text-[15px] font-bold text-neutral-400">06</span>
                                            <h4 className="text-[17px] font-bold text-neutral-950 leading-snug">
                                                Практический отчет и готовые патчи
                                            </h4>
                                        </div>
                                        <p className="text-[14px] text-neutral-500 leading-relaxed mt-0.5 pl-7">
                                            Предоставляем подробный технический документ с шагами воспроизведения уязвимостей и готовыми фрагментами кода для их устранения.
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
                        Комплексный аудит <br />
                        и защита цифровых активов
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
                    {SECURITY_DIRECTIONS.map((item) => {
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
                                            <SecurityDevicePairMockup type={item.type} />
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
                        <span>Экстренный аудит при угрозе утечки: экспресс-анализ — 3 дня, локализация дыр — 7 дней, полный пентест — 14 дней</span>
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

                    {/* КАРТОЧКА 1: Защита от утечек баз данных */}
                    <div className="rounded-[28px] bg-neutral-50/70 border border-neutral-200/80 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-neutral-300 transition-all">
                        <div className="space-y-3 flex-1 min-w-[200px]">
                            <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100/80 flex items-center justify-center text-emerald-600">
                                <Database size={22} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-neutral-950">
                                Защита данных клиентов
                            </h3>
                            <p className="text-neutral-500 text-[16.2px] leading-relaxed">
                                Исключаем кражу клиентских баз, паролей и персональной информации.
                            </p>
                        </div>

                        <div className="relative w-full sm:w-[300px] h-[152px] flex items-center justify-center gap-3 select-none shrink-0">
                            <div className="p-3.5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm flex flex-col items-center justify-center text-center space-y-1.5 w-[136px] shrink-0 z-10">
                                <div className="relative w-[60px] h-[60px] rounded-full border-4 border-emerald-500 flex items-center justify-center font-extrabold text-[17px] text-emerald-600">
                                    AES
                                </div>
                                <span className="text-[10px] font-mono text-neutral-700 leading-tight font-bold">
                                    Шифрование 256-bit
                                </span>
                            </div>

                            <div className="w-[152px] h-[118px] rounded-xl bg-white border border-neutral-200/90 shadow-2xs p-2.5 flex flex-col justify-between -ml-3.5">
                                <div className="flex items-center gap-1 border-b border-neutral-100 pb-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                </div>
                                <div className="space-y-1.5 my-auto">
                                    <div className="text-[10px] font-mono font-bold text-neutral-800">PostgreSQL Strict</div>
                                    <div className="h-1.5 w-full bg-emerald-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 w-full" />
                                    </div>
                                    <span className="text-[8px] font-mono text-neutral-400 block">No open ports</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* КАРТОЧКА 2: Финансовая безопасность */}
                    <div className="rounded-[28px] bg-neutral-50/70 border border-neutral-200/80 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-neutral-300 transition-all">
                        <div className="space-y-3 flex-1 min-w-[200px]">
                            <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100/80 flex items-center justify-center text-emerald-600">
                                <Lock size={22} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-neutral-950">
                                Защита платежей
                            </h3>
                            <p className="text-neutral-500 text-[16.2px] leading-relaxed">
                                Блокируем подмену сумм, обход платежных шлюзов и фрод-транзакции.
                            </p>
                        </div>

                        <div className="relative w-full sm:w-[300px] h-[152px] flex items-center justify-center select-none shrink-0">
                            <div className="w-full max-w-[268px] p-3.5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm space-y-2">
                                <div className="flex items-center justify-between text-[11px] font-mono">
                                    <span className="text-neutral-500">Checkout Signature:</span>
                                    <span className="text-emerald-600 font-bold">HMAC-SHA256</span>
                                </div>
                                <div className="p-2 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-between text-[12px] font-bold">
                                    <span>Сумма транзакции</span>
                                    <span className="font-mono text-neutral-900">$1,450.00</span>
                                </div>
                                <div className="text-[9px] font-mono text-neutral-400 text-center">
                                    Подделка параметров исключена
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* КАРТОЧКА 3: Непрерывная работа (Anti-DDoS) */}
                    <div className="rounded-[28px] bg-neutral-50/70 border border-neutral-200/80 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-neutral-300 transition-all">
                        <div className="space-y-3 flex-1 min-w-[200px]">
                            <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100/80 flex items-center justify-center text-emerald-600">
                                <Server size={22} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-neutral-950">
                                Защита от падений
                            </h3>
                            <p className="text-neutral-500 text-[16.2px] leading-relaxed">
                                Сайт сохраняет стабильность при пиковых нагрузках и целевых спам-атаках.
                            </p>
                        </div>

                        <div className="relative w-full sm:w-[300px] h-[152px] flex items-center justify-center select-none shrink-0">
                            <div className="w-full max-w-[268px] p-4 rounded-2xl bg-white border border-neutral-200/90 shadow-sm space-y-2.5">
                                <div className="flex items-center justify-between font-mono text-xs">
                                    <span className="text-neutral-500">Uptime:</span>
                                    <span className="font-bold text-emerald-600">99.98%</span>
                                </div>
                                <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                                    <div className="bg-emerald-500 h-full w-[99%]" />
                                </div>
                                <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                                    <span>SYN Flood: Filtered</span>
                                    <span>Rate-Limit: Active</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* КАРТОЧКА 4: Готовый план устранения */}
                    <div className="rounded-[28px] bg-neutral-50/70 border border-neutral-200/80 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-neutral-300 transition-all">
                        <div className="space-y-3 flex-1 min-w-[200px]">
                            <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100/80 flex items-center justify-center text-emerald-600">
                                <ShieldCheck size={22} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-neutral-950">
                                Патчи для разработчиков
                            </h3>
                            <p className="text-neutral-500 text-[16.2px] leading-relaxed">
                                Не просто список ошибок, а готовые примеры кода для их мгновенного закрытия.
                            </p>
                        </div>

                        <div className="relative w-full sm:w-[300px] h-[152px] flex items-center justify-center select-none shrink-0">
                            <div className="w-full max-w-[258px] p-4 rounded-2xl bg-[#111827] text-white shadow-lg space-y-2">
                                {[
                                    "Proof of Concept (PoC)",
                                    "Готовые патчи",
                                    "Повторный ре-тест",
                                    "Сертификат защиты",
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
                        От сканирования до устранения уязвимостей.
                    </h2>
                </div>

                <div className="rounded-[32px] bg-white border border-neutral-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.02)] p-8 sm:p-12 divide-y divide-neutral-100">

                    {/* 01 Согласуем */}
                    <div className="pb-8 space-y-1.5">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-neutral-400 font-semibold">01</span>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                                Подписываем NDA
                            </h3>
                        </div>
                        <p className="text-neutral-500 text-[15.4px] sm:text-[16.5px] leading-relaxed pl-7">
                            Юридически фиксируем полную конфиденциальность и границы тестируемых контуров.
                        </p>
                    </div>

                    {/* 02 Сканируем */}
                    <div className="py-8 space-y-1.5">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-neutral-400 font-semibold">02</span>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                                Сканируем код и сервер
                            </h3>
                        </div>
                        <p className="text-neutral-500 text-[15.4px] sm:text-[16.5px] leading-relaxed pl-7">
                            Автоматизированный и ручной реверс-инжиниринг маршрутов, баз данных и авторизации.
                        </p>
                    </div>

                    {/* 03 Симулируем атаки */}
                    <div className="py-8 space-y-1.5">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-neutral-400 font-semibold">03</span>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                                Проводим пентест
                            </h3>
                        </div>
                        <p className="text-neutral-500 text-[15.4px] sm:text-[16.5px] leading-relaxed pl-7">
                            Проверяем устойчивость к реальным векторам вторжения и обхода защитных механизмов.
                        </p>
                    </div>

                    {/* 04 Формируем патчи */}
                    <div className="py-8 space-y-1.5">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-neutral-400 font-semibold">04</span>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                                Передаем решение
                            </h3>
                        </div>
                        <p className="text-neutral-500 text-[15.4px] sm:text-[16.5px] leading-relaxed pl-7">
                            Составляем технический отчет с готовыми патчами кода и помогаем разработчикам их внедрить.
                        </p>
                    </div>

                    {/* 05 Ре-тест */}
                    <div className="pt-8 space-y-1.5">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-emerald-600 font-semibold">05</span>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                                Проводим ре-тест
                            </h3>
                        </div>
                        <p className="text-neutral-500 text-[15.4px] sm:text-[16.5px] leading-relaxed pl-7">
                            Повторно сканируем исправленную систему и выдаем заключение об устранении угроз.
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
                            100% конфиденциальность. <br />
                            <span className="text-neutral-400 font-bold group-hover:text-neutral-600 transition-colors">
                                юридический договор NDA
                            </span>
                        </h3>
                    </div>

                    {/* 2 */}
                    <div className="group pt-8 md:pt-0 md:px-8 transition-transform duration-300">
                        <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-black tracking-tight text-neutral-950 leading-[1.14]">
                            Готовые патчи <br className="hidden lg:inline" />
                            для кода. <br />
                            <span className="text-neutral-400 font-bold group-hover:text-neutral-600 transition-colors">
                                Конкретные шаги закрытия дыр.
                            </span>
                        </h3>
                    </div>

                    {/* 3 */}
                    <div className="group pt-8 md:pt-0 md:pl-8 transition-transform duration-300">
                        <h3 className="text-2xl sm:text-3xl lg:text-[28px] font-black tracking-tight text-neutral-950 leading-[1.18]">
                            Фиксированная цена <br className="hidden lg:inline" />
                            по договору — <br />
                            <span className="text-neutral-400 font-bold group-hover:text-neutral-600 transition-colors">
                                никаких скрытых доплат.
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
                        Защитите ваш проект до инцидента
                    </h2>
                    <p className="text-neutral-400 text-xs sm:text-sm">
                        Строгий NDA, проверка на реальные угрозы и поддержка разработчиков при устранении.
                    </p>
                </div>

                <Link
                    href="/contacts"
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 font-mono text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 shrink-0"
                >
                    <span>Заказать аудит безопасности</span>
                    <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
            </section>

        </main>
    );
}