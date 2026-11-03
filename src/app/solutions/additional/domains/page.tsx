"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowUpRight,
    Zap,
    Clock,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";

export default function DomainsPage() {
    const [speedMode, setSpeedMode] = useState<"standard" | "express">("standard");
    const [domainQuery] = useState("mybrand");
    const [selectedExt, setSelectedExt] = useState(".com");

    return (
        <main className="w-full min-h-screen bg-[#FCFCFD] text-neutral-950 pt-28 sm:pt-36 pb-36 selection:bg-neutral-900 selection:text-white">
            <div className="w-[88vw] max-w-[1240px] mx-auto space-y-28 sm:space-y-40">

                {/* 01. Назад */}
                <div>
                    <Link
                        href="/#solutions"
                        className="inline-flex items-center gap-2 text-neutral-400 hover:text-neutral-950 font-mono text-xs uppercase tracking-[0.2em] transition-colors group"
                    >
                        <ArrowLeft
                            size={15}
                            className="transition-transform group-hover:-translate-x-1.5"
                        />
                        <span>Назад к решениям</span>
                    </Link>
                </div>

                {/* 02. Главный визуальный заголовок */}
                <div className="space-y-8 max-w-5xl">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/80 font-mono text-xs uppercase tracking-widest text-neutral-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                        Infrastructure / 02
                    </div>

                    <h1 className="font-sans font-black text-6xl sm:text-8xl lg:text-[100px] tracking-[-0.045em] leading-[0.93] text-neutral-950">
                        Домен для бизнеса. <br />
                        <span className="text-neutral-400 font-normal">От 2 часов.</span>
                    </h1>

                    <p className="font-sans text-neutral-500 text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight leading-snug max-w-3xl pt-2">
                        Оформляем международные доменные имена без задержек и бюрократии.
                        Быстрый запуск, защита от перехвата и чистая передача прав.
                    </p>
                </div>

                {/* 03. ИНТЕРАКТИВНЫЙ БЛОК: Выбор режима скорости + Статус зоны */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-neutral-400">
                        <span>Интерактивный конфигуратор</span>
                        <span>Регламент делегирования</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                        {/* ЛЕВАЯ КАРТОЧКА: Скорость + Зоны + Предупреждение по .KG */}
                        <div className="lg:col-span-7 rounded-[36px] bg-white border border-neutral-200/90 p-8 sm:p-12 space-y-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col justify-between">
                            <div className="space-y-6">
                                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block">
                                    Скорость оформления
                                </span>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Стандарт */}
                                    <button
                                        type="button"
                                        onClick={() => setSpeedMode("standard")}
                                        className={`p-6 rounded-2xl border text-left transition-all cursor-pointer ${
                                            speedMode === "standard"
                                                ? "bg-neutral-950 border-neutral-950 text-white shadow-md"
                                                : "bg-neutral-50/70 border-neutral-200/80 hover:border-neutral-300 text-neutral-900"
                                        }`}
                                    >
                                        <div className="flex items-center justify-between pb-3">
                                            <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                                                Стандарт
                                            </span>
                                            <Clock size={16} className={speedMode === "standard" ? "text-white" : "text-neutral-400"} />
                                        </div>
                                        <div className="font-sans font-black text-3xl sm:text-4xl tracking-tight">
                                            6 часов
                                        </div>
                                        <p className={`font-sans text-xs pt-2 ${speedMode === "standard" ? "text-neutral-300" : "text-neutral-500"}`}>
                                            Базовый регламент валидации и регистрации в реестре.
                                        </p>
                                    </button>

                                    {/* Express */}
                                    <button
                                        type="button"
                                        onClick={() => setSpeedMode("express")}
                                        className={`p-6 rounded-2xl border text-left transition-all cursor-pointer ${
                                            speedMode === "express"
                                                ? "bg-neutral-950 border-neutral-950 text-white shadow-md"
                                                : "bg-neutral-50/70 border-neutral-200/80 hover:border-neutral-300 text-neutral-900"
                                        }`}
                                    >
                                        <div className="flex items-center justify-between pb-3">
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono text-xs uppercase tracking-wider text-amber-400 font-bold">
                                                    Express
                                                </span>
                                                <span className="px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-400 font-mono text-[11px] font-bold">
                                                    +1 000 KGS
                                                </span>
                                            </div>
                                            <Zap size={16} className="text-amber-400" />
                                        </div>
                                        <div className="font-sans font-black text-3xl sm:text-4xl tracking-tight">
                                            2 часа
                                        </div>
                                        <p className={`font-sans text-xs pt-2 ${speedMode === "express" ? "text-neutral-300" : "text-neutral-500"}`}>
                                            Приоритетная ручная регистрация вне очереди (+1 000 сом к цене домена).
                                        </p>
                                    </button>
                                </div>
                            </div>

                            {/* Международные зоны + mybrand + Предупреждение .KG */}
                            <div className="pt-6 border-t border-neutral-100 space-y-4">
                                <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                                    <span>Международные зоны в работе:</span>
                                    <span>Мгновенный резерв</span>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {[".com", ".io", ".ai", ".net", ".org", ".dev", ".me"].map((ext) => (
                                        <button
                                            key={ext}
                                            type="button"
                                            onClick={() => setSelectedExt(ext)}
                                            className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all cursor-pointer ${
                                                selectedExt === ext
                                                    ? "bg-neutral-950 text-white shadow-xs"
                                                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                                            }`}
                                        >
                                            {ext}
                                        </button>
                                    ))}
                                </div>

                                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between font-mono text-xs">
                                    <span className="text-neutral-700 font-semibold">
                                        {domainQuery || "brand"}{selectedExt}
                                    </span>
                                    <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                                        <CheckCircle2 size={13} /> Доступен к выпуску ({speedMode === "express" ? "2ч / +1000 KGS" : "6ч"})
                                    </span>
                                </div>

                                {/* Предупреждение по .KG прямо под блоком выбора доменов */}
                                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 space-y-1.5">
                                    <div className="flex items-center gap-2 text-amber-900 font-mono text-xs font-bold uppercase tracking-wider">
                                        <AlertCircle size={14} className="text-amber-600 shrink-0" />
                                        <span>Ограничение по зоне .KG</span>
                                    </div>
                                    <p className="font-sans text-xs text-amber-900/90 leading-relaxed">
                                        Национальную зону <strong>.KG временно не оформляем</strong>.
                                        Регистрируем международные домены любого другого уровня (.com, .io, .ai и др.).
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ПРАВАЯ КАРТОЧКА: Условия и ценообразование */}
                        <div className="lg:col-span-5 rounded-[36px] bg-neutral-950 text-white p-8 sm:p-12 flex flex-col justify-between shadow-2xl space-y-8">
                            <div className="space-y-6">
                                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block">
                                    Услуга подключения
                                </span>

                                <div className="space-y-2">
                                    <div className="flex items-baseline gap-2">
                                        <span className="font-sans font-black text-5xl sm:text-6xl text-white tracking-tight">
                                            от 1 899
                                        </span>
                                        <span className="font-mono text-lg text-neutral-400 uppercase">
                                            KGS
                                        </span>
                                    </div>
                                    <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                                        Domain Setup / Разово
                                    </div>
                                </div>

                                <p className="font-sans text-neutral-400 text-sm sm:text-base leading-relaxed">
                                    Покупка домена обеспечивает только право владения адресом.
                                    Техническая привязка к сайту, хостингу и почте оплачивается отдельно.
                                </p>

                                <div className="space-y-3 pt-2 font-sans text-xs sm:text-sm text-neutral-300">
                                    <div className="flex items-center gap-2.5">
                                        <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                                        <span>Настройка DNS-записей (A, AAAA, CNAME)</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                                        <span>Подключение к хостингу и CDN-шлюзам</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                                        <span>Корпоративная почта (MX, SPF, DKIM, DMARC)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-400 flex items-center justify-between">
                                <span>Гарантия прозрачности</span>
                                <span className="text-white font-bold">Без скрытых комиссий</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 04. 3 ГЛАВНЫХ ФАКТА С КРУПНЫМИ ЦИФРАМИ */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 border-y border-neutral-200 py-16 sm:py-20">
                    <div className="space-y-4">
                        <span className="font-sans font-black text-6xl sm:text-7xl lg:text-8xl tracking-tight text-neutral-950 block">
                            2 часа
                        </span>
                        <h3 className="font-sans font-bold text-2xl text-neutral-900">
                            Экспресс (+1 000 сом)
                        </h3>
                        <p className="font-sans text-neutral-500 text-lg leading-relaxed">
                            Если проект горит к запуску рекламной кампании — регистрируем и передаем управление в приоритетном порядке.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <span className="font-sans font-black text-6xl sm:text-7xl lg:text-8xl tracking-tight text-neutral-950 block">
                            1 899 сом
                        </span>
                        <h3 className="font-sans font-bold text-2xl text-neutral-900">
                            Полный Setup под ключ
                        </h3>
                        <p className="font-sans text-neutral-500 text-lg leading-relaxed">
                            Разовая привязка к серверу, настройка почты и защита от спама. Никаких скрытых ежемесячных платежей.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <span className="font-sans font-black text-6xl sm:text-7xl lg:text-8xl tracking-tight text-neutral-950 block">
                            100%
                        </span>
                        <h3 className="font-sans font-bold text-2xl text-neutral-900">
                            Права на вашей стороне
                        </h3>
                        <p className="font-sans text-neutral-500 text-lg leading-relaxed">
                            Домен регистрируется строго на ваши данные или компанию. Никакого оформления на сторонних лиц.
                        </p>
                    </div>
                </div>

                {/* 05. ПОДРОБНОСТИ: ЧТО ВХОДИТ В DOMAIN SETUP */}
                <div className="space-y-12">
                    <div className="max-w-2xl">
                        <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 block mb-3">
                            Инженерный регламент
                        </span>
                        <h2 className="font-sans font-extrabold text-3xl sm:text-5xl tracking-tight text-neutral-950">
                            Что входит в Domain Setup
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                step: "01",
                                title: "Связка с сервером",
                                desc: "Прописывание A/AAAA записей, настройка CNAME-алиасов и перенаправления www на основной адрес.",
                            },
                            {
                                step: "02",
                                title: "Корпоративная почта",
                                desc: "Конфигурация записей для Google Workspace, Yandex 360 или Proton с защитой от попадания в спам.",
                            },
                            {
                                step: "03",
                                title: "Безопасность (DKIM / SPF)",
                                desc: "Цифровая подпись писем и строгая DMARC-политика для исключения подделки почты от имени компании.",
                            },
                            {
                                step: "04",
                                title: "Edge & CDN роутинг",
                                desc: "Маршрутизация через глобальные Anycast DNS-серверы для отклика домена менее чем за 30 мс.",
                            },
                        ].map((item) => (
                            <div
                                key={item.step}
                                className="p-8 rounded-[30px] bg-neutral-50/80 border border-neutral-200/80 space-y-4 hover:border-neutral-400 transition-all"
                            >
                                <span className="font-mono text-sm font-bold text-neutral-400">
                                    {item.step}
                                </span>
                                <h3 className="font-sans font-bold text-xl text-neutral-950">
                                    {item.title}
                                </h3>
                                <p className="font-sans text-neutral-500 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 06. ФИНАЛЬНЫЙ БЛОК ДЕЙСТВИЯ */}
                <div className="pt-12 border-t border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
                    <div className="space-y-2">
                        <h2 className="font-sans font-extrabold text-3xl sm:text-5xl tracking-tight text-neutral-950">
                            Нужен домен прямо сейчас?
                        </h2>
                        <p className="font-sans text-neutral-500 text-lg">
                            Подберем свободное имя, оформим за 2–6 часов и свяжем с сайтом.
                        </p>
                    </div>

                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider font-bold transition-all active:scale-95 shrink-0 shadow-xl"
                    >
                        <span>Заказать домен</span>
                        <ArrowUpRight size={16} />
                    </Link>
                </div>

            </div>
        </main>
    );
}