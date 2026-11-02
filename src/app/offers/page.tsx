"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, X } from "lucide-react";

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
        <main className="w-full min-h-screen bg-[#FCFCFD] text-neutral-950 pt-28 sm:pt-36 pb-36 selection:bg-neutral-900 selection:text-white">
            <div className="w-[88vw] max-w-[1240px] mx-auto space-y-16 sm:space-y-24">

                {/* Назад */}
                <div>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-neutral-400 hover:text-neutral-950 font-mono text-xs uppercase tracking-[0.2em] transition-colors group"
                    >
                        <ArrowLeft
                            size={15}
                            className="transition-transform group-hover:-translate-x-1.5"
                        />
                        <span>На главную</span>
                    </Link>
                </div>

                {/* Главный заголовок */}
                <div className="space-y-6 max-w-4xl">
                    <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium block">
                        Special Events // 2026
                    </span>

                    <h1 className="font-sans font-black text-6xl sm:text-8xl lg:text-[100px] tracking-[-0.045em] leading-[0.93] text-neutral-950">
                        Спецпредложения.
                    </h1>

                    <p className="font-sans text-neutral-500 text-xl sm:text-2xl lg:text-3xl font-light tracking-tight leading-snug">
                        Актуальные скидки и спецусловия на разработку и инфраструктуру.
                    </p>
                </div>

                {/* ЕДИНСТВЕННАЯ КАРТОЧКА ОБЪЯВЛЕНИЯ С КАРТИНКОЙ */}
                <div className="rounded-[36px] sm:rounded-[44px] bg-white border border-neutral-200/90 p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] space-y-8">

                    {/* Контейнер картинки */}
                    <div className="relative w-full h-[320px] sm:h-[460px] lg:h-[520px] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-neutral-950">
                        <Image
                            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop"
                            alt="Rebranding Sale"
                            fill
                            priority
                            className="object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                        />

                        {/* Плашка поверх картинки слева сверху */}
                        <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
                            <div className="inline-flex items-center justify-center px-4 sm:px-5 py-2 rounded-full bg-white/95 backdrop-blur-md border border-white/40 text-[#058447] font-sans text-xs sm:text-sm font-black tracking-tight shadow-md">
                                <span>Акции до 31 Декабря в честь ребрендинга</span>
                            </div>
                        </div>

                        {/* Крупная надпись поверх картинки слева снизу */}
                        <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 max-w-lg space-y-2 text-white">
                            <div className="font-sans font-black text-2xl sm:text-4xl tracking-tight leading-tight drop-shadow-md">
                                Скидки до −50% на все услуги
                            </div>
                            <p className="font-sans text-xs sm:text-sm text-neutral-200 drop-shadow-sm font-medium">
                                Фиксируем ставку в договоре при бронировании проекта до конца декабря.
                            </p>
                        </div>
                    </div>

                    {/* Нижняя строка: слева статус, справа кнопка "Подробнее" */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-2">
                        <div className="font-mono text-xs text-neutral-400 uppercase tracking-wider">
                            Период действия: до 31.12.2026, 23:59
                        </div>

                        {/* Кнопка снизу справа */}
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider font-bold transition-all active:scale-95 shadow-md cursor-pointer self-start sm:self-auto"
                        >
                            <span>Подробнее</span>
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
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/70 backdrop-blur-md animate-in fade-in duration-200"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="relative w-full max-w-3xl rounded-[36px] bg-white border border-neutral-200 p-7 sm:p-12 shadow-2xl space-y-8 max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Кнопка закрытия */}
                        <button
                            type="button"
                            aria-label="Закрыть"
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-6 right-6 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer"
                        >
                            <X size={18} />
                        </button>

                        {/* Шапка модалки */}
                        <div className="space-y-3 pr-8">
                            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#E7F8EE] border border-[#058447]/20 text-[#058447] font-sans text-xs sm:text-sm font-black tracking-tight">
                                <span>Акции до 31 Декабря в честь ребрендинга</span>
                            </div>
                            <h3 className="font-sans font-black text-3xl sm:text-4xl text-neutral-950 tracking-tight">
                                Все действующие скидки
                            </h3>
                            <p className="font-sans text-neutral-500 text-sm sm:text-base leading-relaxed">
                                Зафиксируйте стоимость сейчас — условия сохраняются даже при старте работ в новом году.
                            </p>
                        </div>

                        {/* РАЗДЕЛ 1: SOLUTIONS */}
                        <div className="space-y-4 pt-2">
                            <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                                <span className="font-mono text-xs uppercase tracking-widest font-bold text-neutral-950">
                                    Solutions
                                </span>
                                <span className="font-mono text-xs text-neutral-400">
                                    01 — 04
                                </span>
                            </div>

                            <div className="divide-y divide-neutral-100">
                                {SOLUTIONS_OFFERS.map((item) => (
                                    <div
                                        key={item.title}
                                        className="py-4 flex items-center justify-between gap-4 font-sans"
                                    >
                                        <div className="space-y-0.5">
                                            <div className="font-bold text-base sm:text-lg text-neutral-950 flex items-center gap-2">
                                                <span className="font-mono text-xs text-neutral-400 font-normal">
                                                    {item.num}
                                                </span>
                                                <span>{item.title}</span>
                                            </div>
                                            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed pl-6">
                                                {item.desc}
                                            </p>
                                        </div>

                                        <span className="inline-flex items-center justify-center px-3.5 py-1 rounded-[10px] bg-[#E7F8EE] text-[#058447] font-sans text-sm sm:text-base font-black tracking-tight shrink-0 shadow-2xs">
                                            {item.discount}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* РАЗДЕЛ 2: INFRASTRUCTURE */}
                        <div className="space-y-4 pt-2">
                            <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                                <span className="font-mono text-xs uppercase tracking-widest font-bold text-neutral-950">
                                    Infrastructure
                                </span>
                                <span className="font-mono text-xs text-neutral-400">
                                    01 — 02
                                </span>
                            </div>

                            <div className="divide-y divide-neutral-100">
                                {INFRASTRUCTURE_OFFERS.map((item) => (
                                    <div
                                        key={item.title}
                                        className="py-4 flex items-center justify-between gap-4 font-sans"
                                    >
                                        <div className="space-y-0.5">
                                            <div className="font-bold text-base sm:text-lg text-neutral-950 flex items-center gap-2">
                                                <span className="font-mono text-xs text-neutral-400 font-normal">
                                                    {item.num}
                                                </span>
                                                <span>{item.title}</span>
                                            </div>
                                            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed pl-6">
                                                {item.desc}
                                            </p>
                                        </div>

                                        <span className="inline-flex items-center justify-center px-3.5 py-1 rounded-[10px] bg-[#E7F8EE] text-[#058447] font-sans text-sm sm:text-base font-black tracking-tight shrink-0 shadow-2xs">
                                            {item.discount}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Подвал модалки с переходом в контакты */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-neutral-100">
                            <span className="font-mono text-xs text-neutral-400">
                                Фиксация скидки в договоре
                            </span>

                            <Link
                                href="/contacts"
                                onClick={() => setIsModalOpen(false)}
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider font-bold transition-all active:scale-95 shadow-md text-center"
                            >
                                <span>Зафиксировать скидку</span>
                                <ArrowUpRight size={15} />
                            </Link>
                        </div>

                    </div>
                </div>
            )}
        </main>
    );
}