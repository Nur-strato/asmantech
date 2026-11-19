"use client";

import React, { useState } from "react";
import { Link } from "@/i18n/navigation";
import {
    ArrowLeft,
    ArrowUpRight,
    Bot,
    MessageSquareCode,
    Sparkles,
    Zap,
    Cpu,
    Check,
    Info,
    Flame,
    Loader2,
    Database,
    Share2,
    ShieldCheck,
    BrainCircuit,
    Headset,
} from "lucide-react";
import { useTr } from "@/i18n/tr";

// --- КОМПОНЕНТ ДЛЯ 2-ГО ЭКРАНА (МОКАПЫ УСТРОЙСТВ ДЛЯ AI-ЧАТ-БОТОВ) ---
function AiDevicePairMockup({ type }: { type: "support" | "sales" | "internal" }) {
    const tr = useTr();
    if (type === "support") {
        return (
            <div className="relative w-full h-[220px] sm:h-[240px] flex items-end justify-center  pt-2">
                <div className="relative w-[78%] sm:w-[74%] aspect-[16/10] mr-[14%] flex flex-col items-center">
                    <div className="w-full h-full bg-[#1A1A1A] rounded-t-[14px] p-1.5 sm:p-2 border-[2px] border-[#2A2A2A] shadow-xl flex flex-col overflow-hidden">
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-800 mx-auto mb-1 shrink-0" />
                        <div className="flex-1 rounded-md bg-ink-strong p-3 text-white overflow-hidden flex flex-col justify-between border border-neutral-800">
                            <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5 text-[8px] sm:text-[9px] font-mono text-content-subtle">
                                <span className="font-bold text-accent-bright">{tr("WHATSAPP / TELEGRAM BOT")}</span>
                                <span className="text-accent-bright">{tr("ONLINE 24/7")}</span>
                            </div>
                            <div className="grid grid-cols-12 gap-2 items-center my-auto">
                                <div className="col-span-7 space-y-1">
                                    <span className="text-[7px] font-mono text-blue-400 uppercase tracking-wider">
                                        {tr("RAG ENGINE • NO HALLUCINATIONS")}
                                    </span>
                                    <h4 className="font-bold text-[10px] sm:text-xs text-white leading-tight">
                                        {tr("Поддержка клиентов 24/7")}
                                    </h4>
                                    <p className="text-[7px] sm:text-[8px] text-content-subtle line-clamp-2">
                                        {tr("Ответы строго по регламенту компании, базе знаний и прайсу.")}
                                    </p>
                                </div>
                                <div className="col-span-5 h-14 sm:h-16 rounded bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center">
                                    <span className="text-accent-bright font-mono font-black text-sm sm:text-base">1.2s</span>
                                    <span className="text-[6px] font-mono text-content-subtle">{tr("RESPONSE TIME")}</span>
                                </div>
                            </div>
                            <div className="text-[6px] text-content-muted font-mono">{tr("01 // CUSTOMER SUPPORT")}</div>
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
                            <span>{tr("WHATSAPP")}</span>
                            <span>{tr("AI BOT")}</span>
                        </div>
                        <div className="space-y-1 my-auto">
                            <div className="p-1 rounded bg-neutral-900 text-[6px] text-neutral-300">
                                {tr("Здравствуйте! Чем могу помочь?")}
                            </div>
                            <div className="p-1 rounded bg-accent/20 text-[6px] text-emerald-300 ml-auto w-fit">
                                {tr("Какой у вас прайс?")}
                            </div>
                        </div>
                        <div className="w-6 h-0.5 bg-neutral-600 rounded-full mx-auto" />
                    </div>
                </div>
            </div>
        );
    }

    if (type === "sales") {
        return (
            <div className="relative w-full h-[220px] sm:h-[240px] flex items-end justify-center  pt-2">
                <div className="relative w-[78%] sm:w-[74%] aspect-[16/10] mr-[14%] flex flex-col items-center">
                    <div className="w-full h-full bg-[#1A1A1A] rounded-t-[14px] p-1.5 sm:p-2 border-[2px] border-[#2A2A2A] shadow-xl flex flex-col overflow-hidden">
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-800 mx-auto mb-1 shrink-0" />
                        <div className="flex-1 rounded-md bg-[#0E1726] p-3 text-white overflow-hidden flex flex-col justify-between">
                            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 text-[8px] sm:text-[9px] font-mono text-neutral-300">
                                <span className="font-bold text-blue-400">QUALIFICATION & CRM</span>
                                <span className="text-accent-bright">{tr("AUTO-DEAL CREATED")}</span>
                            </div>
                            <div className="space-y-1 my-auto">
                                <span className="text-[7px] font-mono text-accent-bright uppercase tracking-wider font-semibold">
                                    {tr("CONVERSION RATE +42%")}
                                </span>
                                <div className="p-1.5 rounded bg-white/5 border border-white/10 space-y-0.5">
                                    <div className="text-[8.5px] font-bold text-white leading-tight">
                                        {tr("Квалификация лида и запись в AmoCRM / Bitrix24")}
                                    </div>
                                    <div className="text-[6.5px] text-content-subtle line-clamp-1">
                                        {tr("Сбор номера, бюджета, сроков и моментальная отправка менеджеру.")}
                                    </div>
                                </div>
                            </div>
                            <div className="text-[6px] text-content-subtle font-mono">{tr("02 // SALES PIPELINE")}</div>
                        </div>
                    </div>
                    <div className="w-[108%] h-2 bg-gradient-to-b from-[#D1D5DB] via-[#9CA3AF] to-[#6B7280] rounded-b-md shadow-md flex justify-center">
                        <div className="w-12 h-1 bg-[#4B5563] rounded-b-sm" />
                    </div>
                </div>

                <div className="absolute right-2 sm:right-4 bottom-0 w-[82px] sm:w-[94px] aspect-[9/19] bg-[#161616] rounded-3xl p-1 border-[2px] border-[#383838] shadow-[0_20px_40px_rgba(0,0,0,0.35)] z-20 flex flex-col">
                    <div className="w-5 h-1.5 bg-black rounded-full mx-auto my-0.5 shrink-0" />
                    <div className="flex-1 rounded-2xl bg-[#0E1726] p-2 text-white overflow-hidden flex flex-col justify-between border border-white/10">
                        <div className="text-[6px] font-mono text-blue-400 flex justify-between">
                            <span>{tr("LEAD")}</span>
                            <span>{tr("SYNCED")}</span>
                        </div>
                        <div className="space-y-1.5 my-auto text-center">
                            <div className="text-[12px]">🎯</div>
                            <span className="text-[6.5px] font-mono text-accent-bright">{tr("Deal: $2,800")}</span>
                        </div>
                        <div className="w-6 h-0.5 bg-white/40 rounded-full mx-auto" />
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
                    <div className="flex-1 rounded-md bg-[#111827] p-3 text-white overflow-hidden flex flex-col justify-between">
                        <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5 text-[8px] sm:text-[9px] font-mono text-neutral-300">
                            <span className="font-bold text-purple-400">{tr("CORPORATE AI AGENT")}</span>
                            <span className="text-accent-bright">{tr("LOCAL VECTOR DB")}</span>
                        </div>
                        <div className="space-y-1.5 my-auto">
                            <div className="flex justify-between items-baseline">
                                <h4 className="font-bold text-[10px] sm:text-xs">{tr("Внутренний корпоративный бот")}</h4>
                                <span className="text-[8px] text-accent-bright font-mono">{tr("Private Data")}</span>
                            </div>
                            <div className="p-1.5 rounded bg-black/40 border border-neutral-800 text-[7px] space-y-1">
                                <div className="text-neutral-300 font-medium">{tr("Поиск по договорам, отчетам и документации")}</div>
                                <div className="text-[6.5px] text-content-subtle">{tr("Изолированный контур: данные не передаются наружу")}</div>
                            </div>
                        </div>
                        <div className="text-[6px] text-content-subtle font-mono">{tr("03 // ENTERPRISE AI")}</div>
                    </div>
                </div>
                <div className="w-[108%] h-2 bg-gradient-to-b from-[#D1D5DB] via-[#9CA3AF] to-[#6B7280] rounded-b-md shadow-md flex justify-center">
                    <div className="w-12 h-1 bg-[#4B5563] rounded-b-sm" />
                </div>
            </div>

            <div className="absolute right-2 sm:right-4 bottom-0 w-[82px] sm:w-[94px] aspect-[9/19] bg-[#161616] rounded-3xl p-1 border-[2px] border-[#383838] shadow-[0_20px_40px_rgba(0,0,0,0.35)] z-20 flex flex-col">
                <div className="w-5 h-1.5 bg-black rounded-full mx-auto my-0.5 shrink-0" />
                <div className="flex-1 rounded-2xl bg-[#111827] p-2 text-white overflow-hidden flex flex-col justify-between border border-neutral-800">
                    <div className="text-[6px] font-mono text-purple-400 flex justify-between">
                        <span>{tr("SEARCH")}</span>
                        <span className="text-accent-bright">{tr("EXACT")}</span>
                    </div>
                    <div className="space-y-1.5 my-auto text-center">
                        <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-400/40 mx-auto flex items-center justify-center text-[9px] font-mono text-purple-400">
                            🧠
                        </div>
                        <div className="text-[6px] text-neutral-300 font-mono">
                            {tr("Doc Search")}
                        </div>
                    </div>
                    <div className="w-6 h-0.5 bg-white/40 rounded-full mx-auto" />
                </div>
            </div>
        </div>
    );
}

// --- НАПРАВЛЕНИЯ AI-РАЗРАБОТКИ ---
interface AiDirection {
    num: string;
    type: "support" | "sales" | "internal";
    title: string;
    description: string;
    timeline: string;
    express: string;
    icon: React.ElementType;
    iconBg: string;
    iconColor: string;
    examples: string[];
}

const AI_DIRECTIONS: AiDirection[] = [
    {
        num: "01",
        type: "support",
        title: "ИИ-консультанты поддержки (WhatsApp / Telegram)",
        description: "Круглосуточные ответы клиентам на основе регламентов и базы знаний компании.",
        timeline: "до 7 дней",
        express: "3 дня",
        icon: Headset,
        iconBg: "bg-accent-soft/80 border-accent-soft/70",
        iconColor: "text-accent",
        examples: [
            "Подключение к WhatsApp Business API и Telegram",
            "Ответы на типовые вопросы, расписание, прайс и условия",
            "Бесшовная передача диалога живому оператору при сложных запросах",
        ],
    },
    {
        num: "02",
        type: "sales",
        title: "ИИ-боты продаж и автозапись в CRM",
        description: "Автономная квалификация входящих лидов, расчет смет и выставление счетов.",
        timeline: "14 дней",
        express: "7 дней",
        icon: Bot,
        iconBg: "bg-blue-50/80 border-blue-100/70",
        iconColor: "text-blue-500",
        examples: [
            "Сбор контактов, выявление потребности и запись в AmoCRM / Bitrix24",
            "Автоматическая отправка коммерческих предложений и презентаций",
            "Оповещение отдела продаж о горячих клиентах за 1 секунду",
        ],
    },
    {
        num: "03",
        type: "internal",
        title: "Корпоративные агенты и базы знаний (RAG)",
        description: "Умные поисковые ассистенты для сотрудников по регламентам, 1C и документам.",
        timeline: "до 28 дней",
        express: "14 дней",
        icon: BrainCircuit,
        iconBg: "bg-purple-50/80 border-purple-100/70",
        iconColor: "text-purple-500",
        examples: [
            "Индексация корпоративных PDF, таблиц и баз данных в векторную память",
            "Ассистент HR: адаптация новичков и ответы на внутренние регламенты",
            "Изолированный контур безопасности: ваши данные не утекают в сеть",
        ],
    },
];

export default function AiChatbotsPage() {
    const tr = useTr();
    const [viewMode, setViewMode] = useState<"preview" | "info">("preview");
    const [isRebooting, setIsRebooting] = useState(false);
    const [bootText, setBootText] = useState("INFO");

    const switchModeWithBoot = (target: "preview" | "info") => {
        if (viewMode === target || isRebooting) return;

        setBootText(target === "info" ? "INFO" : "AI ENGINE");
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
                    <span>{tr("Solutions // 04")}</span>
                </Link>

                <div className="flex items-center gap-2 font-mono text-[11px] text-content-muted uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span>{tr("INTELLIGENT AUTOMATION")}</span>
                </div>
            </div>

            {/* ========================================================= */}
            {/* 1-Й ЭКРАН: Слева описание, справа интерактивный чат-бот   */}
            {/* ========================================================= */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center pt-2">

                {/* Левая колонка */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-muted border border-line text-neutral-700 font-mono text-[11.5px] uppercase tracking-wider">
                        <span>AI & LLM INTEGRATION</span>
                        <span>•</span>
                        <span className="font-bold text-content">{tr("RAG ARCHITECTURE")}</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-content leading-[1.02]">
                        {tr("ИИ-боты для бизнеса.")}
                    </h1>

                    <p className="text-content-secondary text-[16.8px] sm:text-[18.9px] leading-relaxed font-normal">
                        {tr("Внедряем умных ассистентов нового поколения на базе LLM. Никаких тупых кнопочных сценариев: бот понимает живую речь, говорит на вашем языке и ведет клиента до сделки 24/7.")}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-2 font-mono text-[12.6px] text-content-secondary">
                        <div className="px-3.5 py-1.5 rounded-xl bg-neutral-50 border border-line">
                            {tr("ТОЧНОСТЬ:")} <span className="font-bold text-accent">{tr("RAG Verified")}</span>
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
                            <span>{tr("Обсудить ИИ-бота")}</span>
                            <ArrowUpRight size={15} />
                        </Link>
                    </div>
                </div>

                {/* Правая колонка: ноутбук с переключением ENGINE / INFO */}
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
                            {tr("AI DIALOGUE")}
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
                                {tr("agent.neural.vitaltech.live")}
                            </span>
                            <div className="w-2 h-2 rounded-full bg-neutral-800" />
                            <span className="text-[9.5px] font-mono text-content-muted">
                                {isRebooting ? "INFERENCING..." : "STREAMING"}
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

                            {/* ВИД 1: AI DIALOGUE */}
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
                                        <span>{tr("AI CONVERSATIONAL AGENT")}</span>
                                    </div>
                                    <span className="font-mono text-[10.5px] uppercase text-content-subtle">
                                        {tr("Multi-Channel Integration")}
                                    </span>
                                </div>

                                <div className="space-y-3 py-4">
                                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-accent-soft font-mono text-[10.5px] text-accent font-bold uppercase border border-emerald-200">
                                        {tr("99.4% Factual Precision")}
                                    </span>
                                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-content">
                                        {tr("Живой диалог и рост конверсии")}
                                    </h3>
                                    <p className="text-content-muted text-[12.6px] sm:text-[14.7px] max-w-md leading-relaxed">
                                        {tr("Бот квалифицирует лида, отвечает на сложные вопросы по спецификациям и сам создает сделку в вашей CRM-системе.")}
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-neutral-100 font-mono text-[10.5px]">
                                    {["OpenAI GPT-4o", "Claude 3.5 Sonnet", "AmoCRM Webhooks"].map((b, i) => (
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
                                        {tr("AI PIPELINE // Регламент разработки")}
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
                                                {tr("Сбор и векторизация базы знаний (RAG)")}
                                            </h4>
                                        </div>
                                        <p className="text-[14px] text-content-muted leading-relaxed mt-0.5 pl-7">
                                            {tr("Загрузка регламентов, каталогов, цен и инструкций в векторную базу данных (ChromaDB / Pinecone) для точных ответов без выдумок.")}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-baseline gap-2.5">
                                            <span className="font-mono text-[15px] font-bold text-content-subtle">02</span>
                                            <h4 className="text-[17px] font-bold text-content leading-snug">
                                                {tr("Проектирование системного промпта и Tone of Voice")}
                                            </h4>
                                        </div>
                                        <p className="text-[14px] text-content-muted leading-relaxed mt-0.5 pl-7">
                                            {tr("Настройка характера, стиля речи, строгих границ компетенций и сценариев вежливого отказа при посторонних темах.")}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-baseline gap-2.5">
                                            <span className="font-mono text-[15px] font-bold text-content-subtle">03</span>
                                            <h4 className="text-[17px] font-bold text-content leading-snug">
                                                {tr("Интеграция с WhatsApp, Telegram и сайтом")}
                                            </h4>
                                        </div>
                                        <p className="text-[14px] text-content-muted leading-relaxed mt-0.5 pl-7">
                                            {tr("Бесперебойное подключение через официальные API. Поддержка входящих аудиосообщений, изображений и файлов.")}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-baseline gap-2.5">
                                            <span className="font-mono text-[15px] font-bold text-content-subtle">04</span>
                                            <h4 className="text-[17px] font-bold text-content leading-snug">
                                                {tr("Двусторонняя синхронизация с CRM (Amo / Bitrix24)")}
                                            </h4>
                                        </div>
                                        <p className="text-[14px] text-content-muted leading-relaxed mt-0.5 pl-7">
                                            {tr("Автоматическое создание контакта, сделки, прикрепление саммари переписки и назначение ответственного менеджера.")}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-baseline gap-2.5">
                                            <span className="font-mono text-[15px] font-bold text-content-subtle">05</span>
                                            <h4 className="text-[17px] font-bold text-content leading-snug">
                                                {tr("Механизм бесшовного перевода на оператора")}
                                            </h4>
                                        </div>
                                        <p className="text-[14px] text-content-muted leading-relaxed mt-0.5 pl-7">
                                            {tr("При фразе «позови человека» или конфликтной ситуации бот мгновенно замолкает и отправляет алерт сотруднику в чат.")}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-baseline gap-2.5">
                                            <span className="font-mono text-[15px] font-bold text-content-subtle">06</span>
                                            <h4 className="text-[17px] font-bold text-content leading-snug">
                                                {tr("Полная передача доступов и ключей API")}
                                            </h4>
                                        </div>
                                        <p className="text-[14px] text-content-muted leading-relaxed mt-0.5 pl-7">
                                            {tr("Все учетные записи, базы данных и кабинеты OpenAI регистрируются на вашу компанию: вы полностью владеете кодом и данными.")}
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
                        {tr("Мы создаем ИИ-решения")} <br />
                        {tr("любого уровня сложности")}
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
                    {AI_DIRECTIONS.map((item) => {
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
                                            <AiDevicePairMockup type={item.type} />
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
                        <span>{tr("Срочное внедрение ИИ: чат-бот поддержки — 3 дня, интеграция с CRM — 7 дней, агент RAG — 14 дней")}</span>
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

                    {/* КАРТОЧКА 1: Мгновенный ответ 24/7 */}
                    <div className="rounded-3xl bg-neutral-50/70 border border-line/80 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-line-strong transition-all">
                        <div className="space-y-3 flex-1 min-w-[200px]">
                            <div className="w-11 h-11 rounded-2xl bg-accent-soft border border-accent-soft/80 flex items-center justify-center text-accent">
                                <Zap size={22} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-content">
                                {tr("Мгновенный ответ")}
                            </h3>
                            <p className="text-content-muted text-[16.2px] leading-relaxed">
                                {tr("Ни один клиент не уйдет к конкуренту из-за долгого ожидания менеджера.")}
                            </p>
                        </div>

                        <div className="relative w-full sm:w-[300px] h-[152px] flex items-center justify-center gap-3
                         shrink-0">
                            <div className="p-3.5 rounded-2xl bg-white border border-line/90 shadow-sm flex flex-col items-center justify-center text-center space-y-1.5 w-[136px] shrink-0 z-10">
                                <div className="relative w-[60px] h-[60px] rounded-full border-4 border-accent flex items-center justify-center font-extrabold text-[17px] text-accent">
                                    1.4s
                                </div>
                                <span className="text-[10px] font-mono text-neutral-700 leading-tight font-bold">
                                    {tr("Среднее время ответа")}
                                </span>
                            </div>

                            <div className="w-[152px] h-[118px] rounded-xl bg-white border border-line/90 shadow-2xs p-2.5 flex flex-col justify-between -ml-3.5">
                                <div className="flex items-center gap-1 border-b border-neutral-100 pb-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent-bright" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent-bright" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent-bright" />
                                </div>
                                <div className="space-y-1.5 my-auto">
                                    <div className="text-[10px] font-mono font-bold text-neutral-800">{tr("24/7 Availability")}</div>
                                    <div className="h-1.5 w-full bg-accent-soft rounded-full overflow-hidden">
                                        <div className="h-full bg-accent w-full" />
                                    </div>
                                    <span className="text-[8px] font-mono text-content-subtle block">{tr("Без перерывов и выходных")}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* КАРТОЧКА 2: Точность без галлюцинаций */}
                    <div className="rounded-3xl bg-neutral-50/70 border border-line/80 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-line-strong transition-all">
                        <div className="space-y-3 flex-1 min-w-[200px]">
                            <div className="w-11 h-11 rounded-2xl bg-accent-soft border border-accent-soft/80 flex items-center justify-center text-accent">
                                <Database size={22} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-content">
                                {tr("Фактическая точность")}
                            </h3>
                            <p className="text-content-muted text-[16.2px] leading-relaxed">
                                {tr("Архитектура RAG заставляет бота отвечать строго по вашей документации.")}
                            </p>
                        </div>

                        <div className="relative w-full sm:w-[300px] h-[152px] flex items-center justify-center  shrink-0">
                            <div className="w-full max-w-[268px] p-3.5 rounded-2xl bg-white border border-line/90 shadow-sm space-y-2">
                                <div className="flex items-center justify-between text-[11px] font-mono">
                                    <span className="text-content-muted">{tr("RAG Semantic Match:")}</span>
                                    <span className="text-accent font-bold">99.8%</span>
                                </div>
                                <div className="p-2 rounded-xl bg-neutral-50 border border-line flex items-center justify-between text-[12px] font-bold">
                                    <span>{tr("Регламент прайса")}</span>
                                    <span className="font-mono text-content">{tr("Проверен")}</span>
                                </div>
                                <div className="text-[9px] font-mono text-content-subtle text-center">
                                    {tr("Выдуманные скидки и условия исключены")}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* КАРТОЧКА 3: Автоматизация рутины */}
                    <div className="rounded-3xl bg-neutral-50/70 border border-line/80 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-line-strong transition-all">
                        <div className="space-y-3 flex-1 min-w-[200px]">
                            <div className="w-11 h-11 rounded-2xl bg-accent-soft border border-accent-soft/80 flex items-center justify-center text-accent">
                                <Share2 size={22} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-content">
                                {tr("Разгрузка команды")}
                            </h3>
                            <p className="text-content-muted text-[16.2px] leading-relaxed">
                                {tr("Бот закрывает до 80% типовых обращений, освобождая время для важных сделок.")}
                            </p>
                        </div>

                        <div className="relative w-full sm:w-[300px] h-[152px] flex items-center justify-center  shrink-0">
                            <div className="w-full max-w-[268px] p-4 rounded-2xl bg-white border border-line/90 shadow-sm space-y-2.5">
                                <div className="flex items-center justify-between font-mono text-xs">
                                    <span className="text-content-muted">{tr("Автоматизация:")}</span>
                                    <span className="font-bold text-accent">{tr("82% обращений")}</span>
                                </div>
                                <div className="w-full bg-surface-muted h-2 rounded-full overflow-hidden">
                                    <div className="bg-accent h-full w-[82%]" />
                                </div>
                                <div className="flex justify-between text-[10px] font-mono text-content-subtle">
                                    <span>{tr("CRM Leads: Auto")}</span>
                                    <span>{tr("Workload: -60%")}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* КАРТОЧКА 4: Безопасность и контроль данных */}
                    <div className="rounded-3xl bg-neutral-50/70 border border-line/80 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-line-strong transition-all">
                        <div className="space-y-3 flex-1 min-w-[200px]">
                            <div className="w-11 h-11 rounded-2xl bg-accent-soft border border-accent-soft/80 flex items-center justify-center text-accent">
                                <ShieldCheck size={22} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-content">
                                {tr("Конфиденциальность")}
                            </h3>
                            <p className="text-content-muted text-[16.2px] leading-relaxed">
                                {tr("Ваши документы и переписки не используются для публичного обучения LLM.")}
                            </p>
                        </div>

                        <div className="relative w-full sm:w-[300px] h-[152px] flex items-center justify-center  shrink-0">
                            <div className="w-full max-w-[258px] p-4 rounded-2xl bg-[#111827] text-white shadow-lg space-y-2">
                                {[
                                    "Шифрование данных",
                                    "OpenAI Enterprise Privacy",
                                    "Ваши ключи API",
                                    "Полный контроль базы",
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
                        {tr("От базы знаний до живых продаж.")}
                    </h2>
                </div>

                <div className="rounded-panel bg-white border border-line/90 shadow-[0_10px_35px_rgba(0,0,0,0.02)] p-8 sm:p-12 divide-y divide-neutral-100">

                    {/* 01 Бриф и база знаний */}
                    <div className="pb-8 space-y-1.5">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-content-subtle font-semibold">01</span>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-content">
                                {tr("Собираем материалы")}
                            </h3>
                        </div>
                        <p className="text-content-muted text-[15.4px] sm:text-[16.5px] leading-relaxed pl-7">
                            {tr("Изучаем регламенты компании, частые вопросы, прайс-листы и скрипты лучших менеджеров.")}
                        </p>
                    </div>

                    {/* 02 Обучение и калибровка */}
                    <div className="py-8 space-y-1.5">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-content-subtle font-semibold">02</span>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-content">
                                {tr("Обучаем нейросеть")}
                            </h3>
                        </div>
                        <p className="text-content-muted text-[15.4px] sm:text-[16.5px] leading-relaxed pl-7">
                            {tr("Настраиваем векторную базу RAG, системный промпт и проводим стресс-тесты на провокации.")}
                        </p>
                    </div>

                    {/* 03 Интеграция */}
                    <div className="py-8 space-y-1.5">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-content-subtle font-semibold">03</span>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-content">
                                {tr("Подключаем каналы")}
                            </h3>
                        </div>
                        <p className="text-content-muted text-[15.4px] sm:text-[16.5px] leading-relaxed pl-7">
                            {tr("Настраиваем стабильный шлюз в WhatsApp Business, Telegram, онлайн-чат на сайте и CRM.")}
                        </p>
                    </div>

                    {/* 04 Тестирование в боевых условиях */}
                    <div className="py-8 space-y-1.5">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-content-subtle font-semibold">04</span>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-content">
                                {tr("Запускаем пилот")}
                            </h3>
                        </div>
                        <p className="text-content-muted text-[15.4px] sm:text-[16.5px] leading-relaxed pl-7">
                            {tr("Тестируем диалоги на реальных обращениях и калибруем формулировки вместе с вашей командой.")}
                        </p>
                    </div>

                    {/* 05 Сдача и гарантия */}
                    <div className="pt-8 space-y-1.5">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-accent font-semibold">05</span>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-content">
                                {tr("Гарантируем")}
                            </h3>
                        </div>
                        <p className="text-content-muted text-[15.4px] sm:text-[16.5px] leading-relaxed pl-7">
                            {tr("30 дней бесплатно дообучаем бота на основе новых диалогов и устраняем неточности.")}
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
                            {tr("100% точность.")} <br />
                            <span className="text-content-subtle font-bold group-hover:text-content-secondary transition-colors">
                                {tr("или дообучаем за наш счет")}
                            </span>
                        </h3>
                    </div>

                    {/* 2 */}
                    <div className="group pt-8 md:pt-0 md:px-8 transition-transform duration-300">
                        <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-black tracking-tight text-content leading-[1.14]">
                            {tr("Все доступы и")} <br className="hidden lg:inline" />
                            {tr("ключи API ваши.")} <br />
                            <span className="text-content-subtle font-bold group-hover:text-content-secondary transition-colors">
                                {tr("Никакой зависимости от подрядчика.")}
                            </span>
                        </h3>
                    </div>

                    {/* 3 */}
                    <div className="group pt-8 md:pt-0 md:pl-8 transition-transform duration-300">
                        <h3 className="text-2xl sm:text-3xl lg:text-[28px] font-black tracking-tight text-content leading-[1.18]">
                            {tr("Фиксируем стоимость")} <br className="hidden lg:inline" />
                            {tr("в договоре —")} <br />
                            <span className="text-content-subtle font-bold group-hover:text-content-secondary transition-colors">
                                {tr("без скрытых ежемесячных переплат.")}
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
                        {tr("Внедрите ИИ-ассистента с гарантией по договору")}
                    </h2>
                    <p className="text-content-subtle text-xs sm:text-sm">
                        {tr("Фиксированная цена, интеграция с вашей CRM и 30 дней бесплатной калибровки.")}
                    </p>
                </div>

                <Link
                    href="/contacts"
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white hover:bg-surface-muted text-content font-mono text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 shrink-0"
                >
                    <span>{tr("Обсудить ИИ-бота")}</span>
                    <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
            </section>

        </main>
    );
}