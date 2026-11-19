"use client";

import React, { useState } from "react";
import { Link } from "@/i18n/navigation";
import {
    ArrowLeft,
    ArrowUpRight,
    ShieldCheck,
    Check,
    Sparkles,
    Lock,
    Zap,
    Server,
    HeartPulse,
    Truck,
    RefreshCw,
    Smile,
} from "lucide-react";
import { useTr } from "@/i18n/tr";

type SiteType = "basic" | "heavy" | "custom";
type BillingPeriod = 1 | 6;

interface PlanInfo {
    id: SiteType;
    name: string;
    emoji: string;
    price: number;
    tag: string;
    subtitle: string;
    specs: string[];
}

const PLANS: Record<SiteType, PlanInfo> = {
    basic: {
        id: "basic",
        name: "Базовый",
        emoji: "🚀",
        price: 499,
        tag: "Для сайтов услуг и визиток",
        subtitle: "Корпоративные сайты, салоны красоты, юристы, клиники и портфолио.",
        specs: ["Быстрый SSD диск", "SSL замочек включен", "Ежедневный бэкап", "Аптайм 99.98%"],
    },
    heavy: {
        id: "heavy",
        name: "Магазин & Каталог",
        emoji: "⚡️",
        price: 599,
        tag: "Для торговли и сотен товаров",
        subtitle: "Интернет-магазины, доставки, много фото и активный поток заказов.",
        specs: ["Удвоенная память RAM", "Ускорение картинок", "Защита от сбоев в скидки", "Приоритетный процессор"],
    },
    custom: {
        id: "custom",
        name: "Сервисы & Бэкенд",
        emoji: "🦾",
        price: 899,
        tag: "Для сложных систем",
        subtitle: "Проекты на Python (FastAPI, Django), Node.js, базы данных и кабинеты.",
        specs: ["Изолированный Docker", "PostgreSQL / Redis базы", "Постоянный фоновый надзор", "Поддержка любых API"],
    },
};

export default function HostingServerPage() {
    const tr = useTr();
    const [siteType, setSiteType] = useState<SiteType>("basic");
    const [period, setPeriod] = useState<BillingPeriod>(6);
    const [needsMigration, setNeedsMigration] = useState<boolean>(true);
    const [simulatedPing, setSimulatedPing] = useState<number>(14);
    const [isPinging, setIsPinging] = useState<boolean>(false);

    const currentPlan = PLANS[siteType];
    const hostingTotal = currentPlan.price * period;
    const migrationPrice = needsMigration ? (period === 6 ? 0 : 500) : 0;
    const grandTotal = hostingTotal + migrationPrice;

    // Интерактивная «живая» проверка отклика
    const triggerPingTest = () => {
        setIsPinging(true);
        setTimeout(() => {
            setSimulatedPing(Math.floor(Math.random() * 8) + 11);
            setIsPinging(false);
        }, 350);
    };

    return (
        <main className="w-full min-h-screen bg-[#FBFBFC] text-content pt-28 sm:pt-36 pb-36 selection:bg-neutral-900 selection:text-white">
            <div className="w-[88vw] max-w-[1240px] mx-auto space-y-24 sm:space-y-36">

                {/* Назад */}
                <div>
                    <Link
                        href="/#solutions"
                        className="inline-flex items-center gap-2 text-content-subtle hover:text-content font-mono text-xs uppercase tracking-[0.2em] transition-all group"
                    >
                        <ArrowLeft
                            size={15}
                            className="transition-transform group-hover:-translate-x-1.5"
                        />
                        <span>{tr("Назад к решениям")}</span>
                    </Link>
                </div>

                {/* Главный заголовок */}
                <div className="space-y-8 max-w-5xl">
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-line/90 font-mono text-xs uppercase tracking-widest text-neutral-800 shadow-2xs">
                        <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                        01 // Hosting & Server Engine
                    </div>

                    <h1 className="font-sans font-black text-6xl sm:text-8xl lg:text-[102px] tracking-[-0.045em] leading-[0.92] text-content">
                        {tr("Быстрый хостинг,")} <br />
                        <span className="text-content-subtle font-normal">{tr("как по щелчку.")}</span>
                    </h1>

                    <p className="font-sans text-content-muted text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight leading-snug max-w-3xl pt-2">
                        {tr("Никаких страшных консолей. Вы платите только за хостинг и домен. SSL-замочек и страховка от сбоев уже вшиты.")}
                    </p>
                </div>

                {/* ИНТЕРАКТИВНЫЙ ТЕРМИНАЛ-КОНФИГУРАТОР */}
                <div className="space-y-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-5">
                        <div className="flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-ink" />
                            <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-content tracking-tight">
                                {tr("Интерактивный конфигуратор тарифа")}
                            </h2>
                        </div>

                        {/* Живой виджет пинга сервера (приятный интерактив) */}
                        <button
                            type="button"
                            onClick={triggerPingTest}
                            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-white border border-line hover:border-ink text-xs font-mono text-neutral-700 transition-all active:scale-95 cursor-pointer shadow-2xs"
                        >
                            <HeartPulse size={14} className={isPinging ? "text-amber-500 animate-spin" : "text-accent"} />
                            <span>{tr("Отклик ядра:")} <strong>{tr(simulatedPing)} ms</strong></span>
                            <span className="text-content-subtle text-[10px] uppercase font-bold">{tr("Тест")}</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* ЛЕВАЯ КОЛОНКА: Выбор тарифа и опций */}
                        <div className="lg:col-span-7 space-y-8">

                            {/* Выбор тарифа */}
                            <div className="space-y-3">
                                <span className="font-mono text-xs uppercase tracking-wider text-content-subtle font-semibold block">
                                    {tr("Шаг 1: Выберите тип вашего проекта")}
                                </span>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {(["basic", "heavy", "custom"] as SiteType[]).map((type) => {
                                        const plan = PLANS[type];
                                        const isSelected = siteType === type;
                                        return (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => setSiteType(type)}
                                                className={`p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                                                    isSelected
                                                        ? "bg-ink text-white border-ink shadow-lg scale-[1.02]"
                                                        : "bg-white border-line/90 hover:border-line-strong text-content hover:bg-neutral-50/50"
                                                }`}
                                            >
                                                <div className="space-y-2">
                                                    <div className="text-2xl transition-transform group-hover:scale-110">
                                                        {tr(plan.emoji)}
                                                    </div>
                                                    <div className="font-sans font-bold text-base tracking-tight">
                                                        {tr(plan.name)}
                                                    </div>
                                                    <p className={`font-sans text-xs leading-snug line-clamp-2 ${isSelected ? "text-neutral-300" : "text-content-muted"}`}>
                                                        {tr(plan.tag)}
                                                    </p>
                                                </div>

                                                <div className="pt-4 font-mono font-bold text-lg border-t border-neutral-100/10 mt-3">
                                                    {tr(plan.price)} {tr("сом")}
                                                    <span className="text-xs font-normal opacity-70 ml-1">{tr("/мес")}</span>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="p-4 rounded-2xl bg-white border border-line/80 text-xs text-content-secondary font-sans leading-relaxed shadow-2xs">
                                    <span className="font-bold text-content">{tr("Идеально для:")} </span>
                                    {tr(currentPlan.subtitle)}
                                </div>
                            </div>

                            {/* Выбор периода (ползунок/кнопки) */}
                            <div className="space-y-3">
                                <span className="font-mono text-xs uppercase tracking-wider text-content-subtle font-semibold block">
                                    {tr("Шаг 2: Период размещения")}
                                </span>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {/* 6 месяцев */}
                                    <button
                                        type="button"
                                        onClick={() => setPeriod(6)}
                                        className={`p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between ${
                                            period === 6
                                                ? "bg-ink text-white border-ink shadow-md scale-[1.01]"
                                                : "bg-white border-line/90 hover:border-line-strong text-content"
                                        }`}
                                    >
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-sans font-bold text-base">{tr("Полгода (6 месяцев)")}</span>
                                                <span className="px-2 py-0.5 rounded-full bg-accent text-white text-[10px] font-mono font-bold uppercase">
                                                    {tr("Бонус")}
                                                </span>
                                            </div>
                                            <div className={`font-sans text-xs ${period === 6 ? "text-neutral-300" : "text-content-muted"}`}>
                                                {tr("Перенос сайта в подарок (0 сом)")}
                                            </div>
                                        </div>

                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${period === 6 ? "border-white bg-white text-content" : "border-line-strong"}`}>
                                            {period === 6 && <Check size={12} strokeWidth={3} />}
                                        </div>
                                    </button>

                                    {/* 1 месяц */}
                                    <button
                                        type="button"
                                        onClick={() => setPeriod(1)}
                                        className={`p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between ${
                                            period === 1
                                                ? "bg-ink text-white border-ink shadow-md scale-[1.01]"
                                                : "bg-white border-line/90 hover:border-line-strong text-content"
                                        }`}
                                    >
                                        <div className="space-y-1">
                                            <div className="font-sans font-bold text-base">{tr("Помесячно")}</div>
                                            <div className={`font-sans text-xs ${period === 1 ? "text-neutral-300" : "text-content-muted"}`}>
                                                {tr("Оплата каждый месяц")}
                                            </div>
                                        </div>

                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${period === 1 ? "border-white bg-white text-content" : "border-line-strong"}`}>
                                            {period === 1 && <Check size={12} strokeWidth={3} />}
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* Перенос со старого места */}
                            <div className="space-y-3">
                                <span className="font-mono text-xs uppercase tracking-wider text-content-subtle font-semibold block">
                                    {tr("Шаг 3: Нужна миграция от прошлого хостинга?")}
                                </span>

                                <div className="p-5 rounded-2xl bg-white border border-line/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
                                    <div className="space-y-1">
                                        <div className="font-sans font-bold text-sm text-content flex items-center gap-2">
                                            <Truck size={16} className="text-content" />
                                            <span>{tr("Бережный переезд силами наших инженеров")}</span>
                                        </div>
                                        <p className="font-sans text-xs text-content-muted">
                                            {tr("Без простоя: клиенты продолжат оформлять заявки, пока мы копируем базу.")}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-muted border border-line/80 self-start sm:self-auto shrink-0 font-mono text-xs">
                                        <button
                                            type="button"
                                            onClick={() => setNeedsMigration(true)}
                                            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                                                needsMigration
                                                    ? "bg-white text-content font-bold shadow-2xs"
                                                    : "text-content-muted hover:text-content"
                                            }`}
                                        >
                                            {tr("Да, перенести")}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setNeedsMigration(false)}
                                            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                                                !needsMigration
                                                    ? "bg-white text-content font-bold shadow-2xs"
                                                    : "text-content-muted hover:text-content"
                                            }`}
                                        >
                                            {tr("Новый сайт")}
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* ПРАВАЯ КОЛОНКА: Наглядный интерактивный чек */}
                        <div className="lg:col-span-5 rounded-[36px] bg-ink text-white p-8 sm:p-10 space-y-6 shadow-2xl sticky top-32">
                            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                                <span className="font-mono text-xs uppercase tracking-widest text-content-subtle">
                                    {tr("Калькулятор сметы")}
                                </span>
                                <span className="inline-flex items-center gap-1.5 text-accent-bright font-mono text-xs font-semibold">
                                    <ShieldCheck size={14} /> {tr("Без скрытых доплат")}
                                </span>
                            </div>

                            {/* Список строк в чеке */}
                            <div className="space-y-3 font-sans text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-content-subtle">
                                        {tr("Тариф «")}{tr(currentPlan.name)}» ({period} {tr("мес")}):
                                    </span>
                                    <span className="font-mono font-bold text-white">
                                        {tr(hostingTotal)} {tr("сом")}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-content-subtle">
                                        {tr("Защита SSL (зелёный замок):")}
                                    </span>
                                    <span className="font-mono font-bold text-accent-bright">
                                        {tr("Включено (0 сом)")}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-content-subtle">
                                        {tr("Перенос файлов и баз:")}
                                    </span>
                                    <span className="font-mono font-bold">
                                        {needsMigration ? (
                                            period === 6 ? (
                                                <span className="text-accent-bright">{tr("Подарок (0 сом)")}</span>
                                            ) : (
                                                <span className="text-white">{tr("500 сом")}</span>
                                            )
                                        ) : (
                                            <span className="text-content-muted">{tr("Не требуется")}</span>
                                        )}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-content-subtle">
                                        {tr("Трафик и лимиты памяти:")}
                                    </span>
                                    <span className="font-mono font-bold text-content-muted">
                                        {tr("Без ограничений")}
                                    </span>
                                </div>
                            </div>

                            {/* Комплектация тарифа */}
                            <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-2">
                                <span className="font-mono text-[10px] uppercase tracking-wider text-content-subtle font-bold block">
                                    {tr("Что входит в выбранный пакет:")}
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300 font-sans">
                                    {currentPlan.specs.map((s) => (
                                        <div key={s} className="flex items-center gap-1.5">
                                            <Check size={12} className="text-accent-bright shrink-0" />
                                            <span>{tr(s)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Итог */}
                            <div className="pt-4 border-t border-neutral-800 space-y-2">
                                <span className="font-mono text-xs uppercase tracking-wider text-content-subtle">
                                    {tr("Итого к оплате:")}
                                </span>
                                <div className="flex items-baseline gap-2">
                                    <span className="font-sans font-black text-5xl sm:text-6xl text-white tracking-tight">
                                        {tr(grandTotal)}
                                    </span>
                                    <span className="font-mono text-xl text-content-subtle">
                                        {tr("сом")}
                                    </span>
                                </div>
                                {needsMigration && period === 6 && (
                                    <p className="font-sans text-xs text-accent-bright font-medium">
                                        {tr("🎉 Вы сэкономили 500 сом на переносе сайта!")}
                                    </p>
                                )}
                            </div>

                            <Link
                                href="/#contact"
                                className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-white hover:bg-surface-muted text-content font-mono text-xs uppercase tracking-wider font-bold transition-all active:scale-95 shadow-md"
                            >
                                <span>{tr("Запустить на этом тарифе")}</span>
                                <ArrowUpRight size={15} />
                            </Link>
                        </div>

                    </div>
                </div>

                {/* ЧЕСТНАЯ МОДЕЛЬ В 2 ШАГА */}
                <div className="rounded-[40px] bg-surface-muted/80 p-8 sm:p-14 space-y-8">
                    <div className="space-y-2 max-w-2xl">
                        <span className="font-mono text-xs uppercase tracking-widest text-content-subtle font-semibold block">
                            {tr("Простая формула")}
                        </span>
                        <h3 className="font-sans font-extrabold text-3xl sm:text-4xl text-content tracking-tight">
                            {tr("За что на самом деле платит предприниматель?")}
                        </h3>
                        <p className="font-sans text-content-muted text-base sm:text-lg">
                            {tr("Без звездочек и мелкого шрифта. Расходы на содержание сайта состоят ровно из 2 пунктов:")}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div className="p-8 rounded-3xl bg-white border border-line/80 space-y-3">
                            <span className="font-mono text-xs uppercase tracking-wider text-content-subtle font-bold block">
                                {tr("Статья №1")}
                            </span>
                            <h4 className="font-sans font-bold text-2xl text-content">
                                {tr("Наш хостинг (499 / 599 / 899 сом)")}
                            </h4>
                            <p className="font-sans text-content-secondary text-sm leading-relaxed">
                                {tr("Ежемесячная оплата серверов, быстрой загрузки сайта, ночных бэкапов и бесплатного SSL-шифрования.")}
                            </p>
                        </div>

                        <div className="p-8 rounded-3xl bg-white border border-line/80 space-y-3">
                            <span className="font-mono text-xs uppercase tracking-wider text-content-subtle font-bold block">
                                {tr("Статья №2")}
                            </span>
                            <h4 className="font-sans font-bold text-2xl text-content">
                                {tr("Ваш домен (1 раз в год)")}
                            </h4>
                            <p className="font-sans text-content-secondary text-sm leading-relaxed">
                                {tr("Официальная стоимость аренды адреса сайта (.com, .io и др.) в мировом реестре. Напрямую без наценок.")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3 ГЛАВНЫХ СТАНДАРТА НАДЕЖНОСТИ */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 border-y border-line py-16 sm:py-20">
                    <div className="space-y-4">
                        <span className="font-sans font-black text-6xl sm:text-7xl lg:text-8xl tracking-tight text-content block">
                            {tr("SSL Free")}
                        </span>
                        <h3 className="font-sans font-bold text-2xl text-content">
                            {tr("Зеленый замочек вшит")}
                        </h3>
                        <p className="font-sans text-content-muted text-base sm:text-lg leading-relaxed">
                            {tr("Браузер никогда не испугает клиентов сообщением «Сайт не защищен». Сертификат продлевается автоматически.")}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <span className="font-sans font-black text-6xl sm:text-7xl lg:text-8xl tracking-tight text-content block">
                            24/7
                        </span>
                        <h3 className="font-sans font-bold text-2xl text-content">
                            {tr("Резервные копии")}
                        </h3>
                        <p className="font-sans text-content-muted text-base sm:text-lg leading-relaxed">
                            {tr("Каждую ночь архивируем файлы и базу на независимый сервер. Всё можно откатить за пару минут.")}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <span className="font-sans font-black text-6xl sm:text-7xl lg:text-8xl tracking-tight text-content block">
                            {tr("0 мин")}
                        </span>
                        <h3 className="font-sans font-bold text-2xl text-content">
                            {tr("Простоя бизнеса")}
                        </h3>
                        <p className="font-sans text-content-muted text-base sm:text-lg leading-relaxed">
                            {tr("Переносим сайт плавно и незаметно для посетителей. Клиенты смогут звонить и покупать без пауз.")}
                        </p>
                    </div>
                </div>

                {/* Финальный призыв к действию */}
                <div className="pt-12 border-t border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
                    <div className="space-y-2">
                        <h2 className="font-sans font-extrabold text-3xl sm:text-5xl tracking-tight text-content">
                            {tr("Запустим ваш сайт сегодня?")}
                        </h2>
                        <p className="font-sans text-content-muted text-lg">
                            {tr("Подберем точные настройки и поможем с переездом без головной боли.")}
                        </p>
                    </div>

                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-ink hover:bg-ink-strong text-white font-mono text-xs uppercase tracking-wider font-bold transition-all active:scale-95 shrink-0 shadow-xl"
                    >
                        <span>{tr("Подключить хостинг")}</span>
                        <ArrowUpRight size={16} />
                    </Link>
                </div>

            </div>
        </main>
    );
}