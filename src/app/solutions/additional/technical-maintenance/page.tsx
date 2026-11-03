"use client";

import React from "react";
import Link from "next/link";
import {
    Wrench,
    ArrowLeft,
    ArrowUpRight,
    Activity,
    ShieldAlert,
    Database,
    Zap,
    Clock,
    HeartPulse,
    AlertTriangle,
} from "lucide-react";

const FEATURES = [
    {
        icon: HeartPulse,
        title: "24/7/365 Мониторинг доступности и метрик",
        description:
            "Непрерывный контроль доступности серверов, утилизации CPU, RAM, свободного места на дисках и времени ответа API с алертами инженерам за секунды.",
    },
    {
        icon: ShieldAlert,
        title: "Аудит уязвимостей и патчи безопасности",
        description:
            "Отслеживание CVE в используемых библиотеках и пакетах ОС, регулярное обновление зависимостей ядра и закрытие потенциальных векторов атак.",
    },
    {
        icon: Database,
        title: "Регулярный тест восстановления из бэкапов",
        description:
            "Плановое тестовое развертывание дампов баз данных на изолированных стендах (Disaster Recovery), исключающее повреждение резервных копий.",
    },
    {
        icon: Zap,
        title: "Оптимизация производительности и баз данных",
        description:
            "Выявление медленных SQL-запросов, профилирование узких мест в коде бэкенда, очистка логов и оптимизация индексов для сохранения скорости.",
    },
];

const SPECS = [
    { label: "Реакция на инциденты", value: "< 15 минут (P1 SLA)" },
    { label: "Интервал проверок", value: "каждые 30 секунд" },
    { label: "Резервное копирование", value: "Daily + Weekly S3" },
    { label: "Отчетность", value: "Ежемесячный аудит" },
];

export default function TechnicalMaintenancePage() {
    return (
        <main className="w-full min-h-screen bg-white text-neutral-900 pt-28 sm:pt-36 pb-24">
            <div className="w-[85vw] max-w-[1240px] mx-auto space-y-12 sm:space-y-16">

                {/* Навигация назад и статус-бар */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200/80 pb-6">
                    <Link
                        href="/#solutions"
                        className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-950 font-mono text-xs uppercase tracking-wider transition-colors group"
                    >
                        <ArrowLeft
                            size={16}
                            className="transition-transform group-hover:-translate-x-1"
                        />
                        <span>Назад к решениям</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                            INFRASTRUCTURE 05
                        </span>
                        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[11px] font-semibold border border-emerald-200/60 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            24/7 SLA GUARANTEED
                        </span>
                    </div>
                </div>

                {/* Заглавный блок */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    <div className="lg:col-span-8 space-y-5">
                        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-neutral-100 border border-neutral-200/80 text-neutral-800 font-mono text-xs uppercase tracking-wider font-medium">
                            <Wrench size={14} className="text-neutral-950" />
                            Site Reliability & DevOps Support
                        </div>

                        <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-950 leading-[1.08]">
                            Техническое сопровождение и непрерывный мониторинг
                        </h1>

                        <p className="text-neutral-600 font-sans text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
                            Берем на себя обслуживание программной и серверной части
                            ваших проектов: предотвращаем сбои до их влияния на пользователей
                            и гарантируем оперативное устранение аварий по регламенту SLA.
                        </p>
                    </div>

                    {/* Сводка параметров */}
                    <div className="lg:col-span-4 rounded-3xl bg-neutral-50 border border-neutral-200/90 p-6 space-y-5">
                        <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block">
                            Инженерные стандарты
                        </span>

                        <div className="space-y-3">
                            {SPECS.map((item) => (
                                <div
                                    key={item.label}
                                    className="flex items-center justify-between py-2 border-b border-neutral-200/60 text-sm font-sans"
                                >
                                    <span className="text-neutral-500">{item.label}</span>
                                    <span className="font-mono font-semibold text-neutral-950">
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <Link
                            href="/#contact"
                            className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all active:scale-[0.99]"
                        >
                            <span>Передать проект на саппорт</span>
                            <ArrowUpRight size={15} />
                        </Link>
                    </div>
                </div>

                {/* Сетка преимуществ */}
                <div className="space-y-6 pt-4">
                    <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-neutral-950" />
                        <h2 className="font-sans font-bold text-2xl tracking-tight text-neutral-950">
                            Комплекс превентивного обслуживания
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {FEATURES.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={feature.title}
                                    className="p-7 rounded-[26px] bg-neutral-50/70 border border-neutral-200/80 space-y-4 hover:border-neutral-300 hover:bg-neutral-50 transition-all duration-200"
                                >
                                    <div className="p-3 w-fit rounded-xl bg-white border border-neutral-200/90 text-neutral-900 shadow-xs">
                                        <Icon size={22} strokeWidth={1.8} />
                                    </div>
                                    <h3 className="font-sans font-bold text-xl text-neutral-950">
                                        {feature.title}
                                    </h3>
                                    <p className="font-sans text-neutral-600 text-sm sm:text-[15px] leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Процесс технического сопровождения */}
                <div className="rounded-[32px] bg-neutral-950 text-white p-8 sm:p-12 space-y-8">
                    <div className="space-y-2">
                        <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                            Workflow
                        </span>
                        <h2 className="font-sans font-bold text-2xl sm:text-3xl text-white tracking-tight">
                            Как организована поддержка 24/7
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                step: "01",
                                title: "Интеграция сенсоров",
                                text: "Подключение Sentry, Grafana, Telegram-ботов оповещения и агентов телеметрии.",
                            },
                            {
                                step: "02",
                                title: "Тюнинг порогов алертов",
                                text: "Калибровка чувствительности предупреждений для исключения ложных срабатываний.",
                            },
                            {
                                step: "03",
                                title: "Автоматизация фиксов",
                                text: "Настройка перезапуска упавших сервисов и превентивной очистки временных файлов.",
                            },
                            {
                                step: "04",
                                title: "Отчетность и аудит",
                                text: "Ежемесячный разбор инцидентов, метрик аптайма и рекомендации по оптимизации.",
                            },
                        ].map((item) => (
                            <div key={item.step} className="space-y-3">
                                <span className="font-mono text-xl font-bold text-neutral-500">
                                    {item.step}
                                </span>
                                <h4 className="font-sans font-semibold text-lg text-white">
                                    {item.title}
                                </h4>
                                <p className="font-sans text-sm text-neutral-400 leading-relaxed">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </main>
    );
}