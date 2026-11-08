"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, ArrowUpRight, X } from "lucide-react";
import { useTr } from "@/i18n/tr";

const SOLUTIONS_OFFERS = [
    {
        num: "01",
        title: "Website Development",
        discount: "−40%",
        desc: "Сайты для бизнеса под ключ, корпоративные порталы и платформы.",
    },
    {
        num: "02",
        title: "Mobile Apps",
        discount: "−30%",
        desc: "Нативные и кроссплатформенные приложения для iOS и Android.",
    },
    {
        num: "03",
        title: "Security & Quality Audit",
        discount: "−30%",
        desc: "Комплексный аудит безопасности, стресс-тесты и поиск уязвимостей.",
    },
    {
        num: "04",
        title: "SEO Optimization",
        discount: "−30%",
        desc: "Техническая и поисковая оптимизация для вывода в топ Google и Yandex.",
    },
];

const INFRASTRUCTURE_OFFERS = [
    {
        num: "01",
        title: "Hosting & Server",
        discount: "−50%",
        desc: "Отказоустойчивые серверы, включенный SSL и бесплатный перенос сайта.",
    },
    {
        num: "02",
        title: "Admin Panel",
        discount: "−20%",
        desc: "Панель управления для обновления контента без привлечения разработчиков.",
    },
];

export default function OffersPage() {
    const tr = useTr();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsModalOpen(false);
        };

        if (isModalOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isModalOpen]);

    return (
        <main className="w-full min-h-screen bg-[#FCFCFD] text-neutral-950 pt-24 sm:pt-36 pb-24 sm:pb-36 selection:bg-neutral-900 selection:text-white overflow-x-clip">
            <div className="w-[92vw] sm:w-[88vw] max-w-[1240px] mx-auto space-y-12 sm:space-y-24">

                {/* Назад */}
                <div>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-neutral-400 hover:text-neutral-950 font-mono text-xs uppercase tracking-[0.2em] transition-colors group py-1"
                    >
                        <ArrowLeft
                            size={15}
                            className="transition-transform group-hover:-translate-x-1.5"
                        />
                        <span>{tr("На главную")}</span>
                    </Link>
                </div>

                {/* Главный заголовок */}
                <div className="space-y-4 sm:space-y-6 max-w-4xl">
                    <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.25em] text-neutral-400 font-medium block">
                        {tr("Special Events // 2026")}
                    </span>

                    <h1 className="font-sans font-black text-[34px] xs:text-[44px] sm:text-8xl lg:text-[100px] tracking-[-0.04em] sm:tracking-[-0.045em] leading-[1.02] sm:leading-[0.93] text-neutral-950 break-words">
                        {tr("Спецпредложения.")}
                    </h1>

                    <p className="font-sans text-neutral-500 text-lg sm:text-2xl lg:text-3xl font-light tracking-tight leading-snug">
                        {tr("Актуальные скидки и спецусловия на разработку и инфраструктуру.")}
                    </p>
                </div>

                {/* ЕДИНСТВЕННАЯ КАРТОЧКА ОБЪЯВЛЕНИЯ С КАРТИНКОЙ */}
                <div className="rounded-[28px] xs:rounded-[36px] sm:rounded-[44px] bg-white border border-neutral-200/90 p-4 xs:p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] space-y-6 sm:space-y-8">

                    {/* Контейнер картинки */}
                    <div className="relative w-full h-[360px] xs:h-[400px] sm:h-[460px] lg:h-[520px] rounded-[22px] xs:rounded-[28px] sm:rounded-[36px] overflow-hidden bg-neutral-950">
                        <Image
                            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop"
                            alt={tr("Rebranding Sale")}
                            fill
                            priority
                            className="object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                        />

                        {/* Защитный градиентный слой для читаемости текста на мобильных экранах */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/20 pointer-events-none" />

                        {/* Плашка поверх картинки слева сверху */}
                        <div className="absolute top-4 left-4 xs:top-6 xs:left-6 sm:top-8 sm:left-8 right-4 xs:right-auto">
                            <div className="inline-flex items-center justify-center px-3.5 xs:px-4 sm:px-5 py-2 rounded-full bg-white/95 backdrop-blur-md border border-white/40 text-[#058447] font-sans text-[11px] xs:text-xs sm:text-sm font-black tracking-tight shadow-md max-w-full text-center leading-tight">
                                <span>{tr("Акции до 31 Декабря в честь ребрендинга")}</span>
                            </div>
                        </div>

                        {/* Крупная надпись поверх картинки слева снизу */}
                        <div className="absolute bottom-4 left-4 right-4 xs:bottom-6 xs:left-6 sm:bottom-8 sm:left-8 max-w-lg space-y-1.5 sm:space-y-2 text-white">
                            <div className="font-sans font-black text-xl xs:text-2xl sm:text-4xl tracking-tight leading-tight drop-shadow-md">
                                {tr("Скидки до −50% на все услуги")}
                            </div>
                            <p className="font-sans text-[11px] xs:text-xs sm:text-sm text-neutral-200 drop-shadow-sm font-medium leading-relaxed">
                                {tr("Фиксируем ставку в договоре при бронировании проекта до конца декабря.")}
                            </p>
                        </div>
                    </div>

                    {/* Нижняя строка: слева статус, справа кнопка "Подробнее" */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 pt-1 sm:pt-2">
                        <div className="font-mono text-[11px] sm:text-xs text-neutral-400 uppercase tracking-wider">
                            {tr("Период действия: до 31.12.2026, 23:59")}
                        </div>

                        {/* Кнопка: на смартфонах на всю ширину для легкого тапа пальцем, на десктопе авто-ширина */}
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center justify-center gap-2.5 sm:gap-3 w-full sm:w-auto px-7 sm:px-8 py-4 sm:py-4.5 rounded-xl sm:rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider font-bold transition-all active:scale-95 shadow-md cursor-pointer [touch-action:manipulation]"
                        >
                            <span>{tr("Подробнее")}</span>
                            <ArrowUpRight size={16} />
                        </button>
                    </div>

                </div>

            </div>

            {/* МОДАЛЬНОЕ ОКНО С РАЗДЕЛЕНИЕМ НА SOLUTIONS И INFRASTRUCTURE */}
            {isModalOpen && (
                <div
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-neutral-950/75 backdrop-blur-md animate-in fade-in duration-200"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="relative w-full max-w-3xl rounded-t-[32px] sm:rounded-[36px] bg-white border-t sm:border border-neutral-200 p-5 xs:p-7 sm:p-12 shadow-2xl space-y-6 sm:space-y-8 max-h-[92vh] sm:max-h-[90vh] overflow-y-auto overscroll-contain animate-in slide-in-from-bottom-6 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Мобильный индикатор свайпа */}
                        <div className="w-12 h-1 bg-neutral-300 rounded-full mx-auto -mt-1 mb-2 sm:hidden" />

                        {/* Кнопка закрытия */}
                        <button
                            type="button"
                            aria-label={tr("Закрыть")}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-950 active:scale-90 transition-all cursor-pointer [touch-action:manipulation]"
                        >
                            <X size={18} />
                        </button>

                        {/* Шапка модалки */}
                        <div className="space-y-2.5 sm:space-y-3 pr-8 sm:pr-8">
                            <div className="inline-flex items-center justify-center px-3.5 sm:px-4 py-1.5 rounded-full bg-[#E7F8EE] border border-[#058447]/20 text-[#058447] font-sans text-[11px] sm:text-xs font-black tracking-tight">
                                <span>{tr("Акции до 31 Декабря в честь ребрендинга")}</span>
                            </div>
                            <h3 className="font-sans font-black text-2xl xs:text-3xl sm:text-4xl text-neutral-950 tracking-tight leading-tight">
                                {tr("Все действующие скидки")}
                            </h3>
                            <p className="font-sans text-neutral-500 text-xs xs:text-sm sm:text-base leading-relaxed">
                                {tr("Зафиксируйте стоимость сейчас — условия сохраняются даже при старте работ в новом году.")}
                            </p>
                        </div>

                        {/* РАЗДЕЛ 1: SOLUTIONS */}
                        <div className="space-y-3 sm:space-y-4 pt-1 sm:pt-2">
                            <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                                <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest font-bold text-neutral-950">
                                    {tr("Solutions")}
                                </span>
                                <span className="font-mono text-[11px] sm:text-xs text-neutral-400">
                                    01 — 04
                                </span>
                            </div>

                            <div className="divide-y divide-neutral-100">
                                {SOLUTIONS_OFFERS.map((item) => (
                                    <div
                                        key={item.title}
                                        className="py-3.5 sm:py-4 flex items-start sm:items-center justify-between gap-3 sm:gap-4 font-sans"
                                    >
                                        <div className="space-y-1 min-w-0 pr-1">
                                            <div className="font-bold text-[15px] sm:text-lg text-neutral-950 flex items-center gap-2">
                                                <span className="font-mono text-xs text-neutral-400 font-normal shrink-0">
                                                    {tr(item.num)}
                                                </span>
                                                <span className="leading-snug">{tr(item.title)}</span>
                                            </div>
                                            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed pl-5 sm:pl-6">
                                                {tr(item.desc)}
                                            </p>
                                        </div>

                                        <span className="inline-flex items-center justify-center px-2.5 xs:px-3 sm:px-3.5 py-1 rounded-[8px] sm:rounded-[10px] bg-[#E7F8EE] text-[#058447] font-sans text-xs xs:text-sm sm:text-base font-black tracking-tight shrink-0 shadow-2xs">
                                            {tr(item.discount)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* РАЗДЕЛ 2: INFRASTRUCTURE */}
                        <div className="space-y-3 sm:space-y-4 pt-1 sm:pt-2">
                            <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                                <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest font-bold text-neutral-950">
                                    {tr("Infrastructure")}
                                </span>
                                <span className="font-mono text-[11px] sm:text-xs text-neutral-400">
                                    01 — 02
                                </span>
                            </div>

                            <div className="divide-y divide-neutral-100">
                                {INFRASTRUCTURE_OFFERS.map((item) => (
                                    <div
                                        key={item.title}
                                        className="py-3.5 sm:py-4 flex items-start sm:items-center justify-between gap-3 sm:gap-4 font-sans"
                                    >
                                        <div className="space-y-1 min-w-0 pr-1">
                                            <div className="font-bold text-[15px] sm:text-lg text-neutral-950 flex items-center gap-2">
                                                <span className="font-mono text-xs text-neutral-400 font-normal shrink-0">
                                                    {tr(item.num)}
                                                </span>
                                                <span className="leading-snug">{tr(item.title)}</span>
                                            </div>
                                            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed pl-5 sm:pl-6">
                                                {tr(item.desc)}
                                            </p>
                                        </div>

                                        <span className="inline-flex items-center justify-center px-2.5 xs:px-3 sm:px-3.5 py-1 rounded-[8px] sm:rounded-[10px] bg-[#E7F8EE] text-[#058447] font-sans text-xs xs:text-sm sm:text-base font-black tracking-tight shrink-0 shadow-2xs">
                                            {tr(item.discount)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Подвал модалки */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4 pt-3.5 sm:pt-4 border-t border-neutral-100 pb-2 sm:pb-0">
                            <span className="font-mono text-[11px] sm:text-xs text-neutral-400">
                                {tr("Фиксация скидки в договоре")}
                            </span>

                            <Link
                                href="/contacts"
                                onClick={() => setIsModalOpen(false)}
                                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider font-bold transition-all active:scale-95 shadow-md text-center"
                            >
                                <span>{tr("Зафиксировать скидку")}</span>
                                <ArrowUpRight size={15} />
                            </Link>
                        </div>

                    </div>
                </div>
            )}
        </main>
    );
}