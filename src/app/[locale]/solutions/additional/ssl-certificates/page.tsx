"use client";

import React from "react";
import { Link } from "@/i18n/navigation";
import {
    ShieldCheck,
    ArrowLeft,
    ArrowUpRight,
    Lock,
    KeyRound,
    RefreshCw,
    FileCheck,
    Award,
    CheckCircle2,
} from "lucide-react";
import { useTr } from "@/i18n/tr";

const FEATURES = [
    {
        icon: KeyRound,
        title: "Wildcard & Multi-Domain (SAN)",
        description:
            "Защита основного домена и неограниченного числа поддоменов (*.domain.com) единым сертификатом с оптимизацией нагрузки на TLS-хэндшейк.",
    },
    {
        icon: RefreshCw,
        title: "Автоматическое продление (ACME)",
        description:
            "Настройка изолированных фоновых демонов автопродления через протокол ACME без риска внезапного истечения срока действия и падения доверия браузеров.",
    },
    {
        icon: Award,
        title: "Корпоративная валидация (OV / EV)",
        description:
            "Прохождение расширенной проверки юридического лица в международных центрах сертификации (Sectigo, DigiCert) для банковских и e-commerce шлюзов.",
    },
    {
        icon: Lock,
        title: "HSTS Preload & Perfect Forward Secrecy",
        description:
            "Принудительная маршрутизация HTTPS, включение HSTS-заголовков и протокола PFS, гарантирующего невозможность расшифровки перехваченного трафика в будущем.",
    },
];

const SPECS = [
    { label: "Протоколы шифрования", value: "TLS 1.3 / HTTP/3" },
    { label: "Стойкость ключей", value: "RSA 4096 / ECC P-384" },
    { label: "Рейтинг SSL Labs", value: "Grade A+ (Zero-Leak)" },
    { label: "Совместимость", value: "99.9% устройств и ОС" },
];

export default function SSLCertificatesPage() {
    const tr = useTr();
    return (
        <main className="w-full min-h-screen bg-white text-content pt-28 sm:pt-36 pb-24">
            <div className="w-[85vw] max-w-[1240px] mx-auto space-y-12 sm:space-y-16">

                {/* Навигация назад и статус-бар */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line/80 pb-6">
                    <Link
                        href="/#solutions"
                        className="inline-flex items-center gap-2 text-content-muted hover:text-content font-mono text-xs uppercase tracking-wider transition-colors group"
                    >
                        <ArrowLeft
                            size={16}
                            className="transition-transform group-hover:-translate-x-1"
                        />
                        <span>{tr("Назад к решениям")}</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <span className="font-mono text-xs uppercase tracking-widest text-content-subtle font-semibold">
                            {tr("INFRASTRUCTURE 03")}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-accent-soft text-accent font-mono text-[11px] font-semibold border border-emerald-200/60 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            {tr("TLS 1.3 SECURED")}
                        </span>
                    </div>
                </div>

                {/* Заглавный блок */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    <div className="lg:col-span-8 space-y-5">
                        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-surface-muted border border-line/80 text-neutral-800 font-mono text-xs uppercase tracking-wider font-medium">
                            <ShieldCheck size={14} className="text-content" />
                            Encryption & Data Security
                        </div>

                        <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-content leading-[1.08]">
                            {tr("SSL-сертификаты и сквозное шифрование данных")}
                        </h1>

                        <p className="text-content-secondary font-sans text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
                            {tr("Выпускаем, валидируем и интегрируем криптографические сертификаты для защиты платежей, пользовательских сессий и обеспечения максимального рейтинга доверия поисковых систем и браузеров.")}
                        </p>
                    </div>

                    {/* Сводка параметров */}
                    <div className="lg:col-span-4 rounded-3xl bg-neutral-50 border border-line/90 p-6 space-y-5">
                        <span className="font-mono text-xs uppercase tracking-widest text-content-subtle font-semibold block">
                            {tr("Инженерные стандарты")}
                        </span>

                        <div className="space-y-3">
                            {SPECS.map((item) => (
                                <div
                                    key={item.label}
                                    className="flex items-center justify-between py-2 border-b border-line/60 text-sm font-sans"
                                >
                                    <span className="text-content-muted">{tr(item.label)}</span>
                                    <span className="font-mono font-semibold text-content">
                                        {tr(item.value)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <Link
                            href="/#contact"
                            className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-xl bg-ink hover:bg-ink-strong text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all active:scale-[0.99]"
                        >
                            <span>{tr("Подключить шифрование")}</span>
                            <ArrowUpRight size={15} />
                        </Link>
                    </div>
                </div>

                {/* Сетка преимуществ */}
                <div className="space-y-6 pt-4">
                    <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-ink" />
                        <h2 className="font-sans font-bold text-2xl tracking-tight text-content">
                            {tr("Комплекс безопасности передачи данных")}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {FEATURES.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={feature.title}
                                    className="p-7 rounded-[26px] bg-neutral-50/70 border border-line/80 space-y-4 hover:border-line-strong hover:bg-neutral-50 transition-all duration-200"
                                >
                                    <div className="p-3 w-fit rounded-xl bg-white border border-line/90 text-content shadow-xs">
                                        <Icon size={22} strokeWidth={1.8} />
                                    </div>
                                    <h3 className="font-sans font-bold text-xl text-content">
                                        {tr(feature.title)}
                                    </h3>
                                    <p className="font-sans text-content-secondary text-sm sm:text-[15px] leading-relaxed">
                                        {tr(feature.description)}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Процесс выпуска и настройки */}
                <div className="rounded-panel bg-ink text-white p-8 sm:p-12 space-y-8">
                    <div className="space-y-2">
                        <span className="font-mono text-xs uppercase tracking-widest text-content-subtle">
                            {tr("Workflow")}
                        </span>
                        <h2 className="font-sans font-bold text-2xl sm:text-3xl text-white tracking-tight">
                            {tr("Этапы выпуска и интеграции SSL")}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                step: "01",
                                title: "Выбор валидации",
                                text: "Подбор типа проверки (DV для блогов, OV/EV для банков и e-commerce).",
                            },
                            {
                                step: "02",
                                title: "Генерация CSR",
                                text: "Создание приватного ключа и сертификационного запроса на защищенном сервере.",
                            },
                            {
                                step: "03",
                                title: "Верификация центра",
                                text: "DNS-challenge или нотариальное подтверждение организации в центре сертификации.",
                            },
                            {
                                step: "04",
                                title: "Hardening веб-сервера",
                                text: "Тюнинг Nginx/Caddy, отключение устаревших шифров и запуск OCSP Stapling.",
                            },
                        ].map((item) => (
                            <div key={item.step} className="space-y-3">
                                <span className="font-mono text-xl font-bold text-content-muted">
                                    {tr(item.step)}
                                </span>
                                <h4 className="font-sans font-semibold text-lg text-white">
                                    {tr(item.title)}
                                </h4>
                                <p className="font-sans text-sm text-content-subtle leading-relaxed">
                                    {tr(item.text)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </main>
    );
}