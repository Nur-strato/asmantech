"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    ShieldCheck,
    FileCheck2,
} from "lucide-react";

interface GuaranteeRule {
    id: string;
    num: string;
    metric: string;
    title: string;
    legalQuote: React.ReactNode;
    clause: string;
}

const rules: GuaranteeRule[] = [
    {
        id: "time",
        num: "01",
        metric: "-10% / 3 дня",
        title: "Скидка за срыв срока",
        legalQuote: (
            <>
                Получили проект на <strong className="font-semibold text-neutral-900">3 дня позже — скидка 10%</strong>. Опоздали еще на 3 — <strong className="font-semibold text-neutral-900">скидка уже 20%</strong>. Просто платите меньше.
            </>
        ),
        clause: "Пункт 6.2 Договора",
    },
    {
        id: "budget",
        num: "02",
        metric: "$0 доплат",
        title: "Твердый Fixed Price",
        legalQuote: (
            <>
                Цена в договоре — окончательная. Если мы ошиблись в оценке или задача оказалась сложнее — <strong className="font-semibold text-neutral-900">все переработки оплачиваем мы</strong>, а не вы.
            </>
        ),
        clause: "Пункт 3.4 Договора",
    },
    {
        id: "warranty",
        num: "03",
        metric: "45 дней",
        title: "Гарантия на любой баг",
        legalQuote: (
            <>
                Безусловная гарантия <strong className="font-semibold text-neutral-900">45 календарных дней</strong>. Любые дефекты или отклонения от ТЗ устраняются вне очереди в приоритетном порядке <strong className="font-semibold text-neutral-900">в день обращения</strong>.
            </>
        ),
        clause: "Пункт 7.1 Договора",
    },
    {
        id: "ip",
        num: "04",
        metric: "100% IP",
        title: "Полное владение кодом",
        legalQuote: (
            <>
                После завершения работы передаем вам весь исходный код и все доступы. Проект и все права на него на <strong className="font-semibold text-neutral-900">100% принадлежат вам</strong>.
            </>
        ),
        clause: "Пункт 8.3 Договора",
    },
];

export default function GuaranteePage() {
    const [activeId, setActiveId] = useState<string>("time");
    const detailRef = useRef<HTMLElement | null>(null);

    const selected = rules.find((r) => r.id === activeId) || rules[0];

    const handleSelect = (id: string) => {
        setActiveId(id);
        if (detailRef.current) {
            const rect = detailRef.current.getBoundingClientRect();
            const offsetTop = window.scrollY + rect.top;
            const targetPosition = offsetTop - (window.innerHeight - rect.height) / 2;

            window.scrollTo({
                top: Math.max(0, targetPosition),
                behavior: "smooth",
            });
        }
    };

    return (
        <main className="max-w-[1280px] mx-auto px-6 sm:px-10 pt-32 pb-28 space-y-16">
            {/* 1. УЛЬТРА-КОРОТКИЙ HERO */}
            <section className="space-y-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-neutral-900 transition-colors group"
                >
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    На главную
                </Link>

                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-neutral-200">
                    <div className="space-y-3">
                        <h1 className="text-4xl sm:text-6xl font-extrabold text-neutral-900 tracking-tight leading-[1.05]">
                            100% качество. <br />
                            Или вернём всю сумму.
                        </h1>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#FAF6F4] border border-neutral-200 text-xs font-medium text-neutral-700">
                        <ShieldCheck size={20} className="text-emerald-600 shrink-0" />
                        <span>Никаких предоплат до NDA и твердой сметы</span>
                    </div>
                </div>
            </section>

            {/* 2. ЧЕТЫРЕ ЖЕСТКИХ ПРАВИЛА (СЕТКА) */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {rules.map((rule) => {
                    const isCurrent = activeId === rule.id;
                    return (
                        <div
                            key={rule.id}
                            onClick={() => handleSelect(rule.id)}
                            className={`p-7 rounded-[28px] cursor-pointer transition-all duration-200 border flex flex-col justify-between min-h-[210px] select-none ${
                                isCurrent
                                    ? "bg-neutral-900 text-white border-neutral-900 shadow-xl -translate-y-1"
                                    : "bg-[#FAF6F4] hover:bg-[#F3ECE8] text-neutral-900 border-neutral-200/80"
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <span className={`text-[11px] font-mono font-bold ${isCurrent ? "text-neutral-400" : "text-neutral-400"}`}>
                                    RULE {rule.num}
                                </span>
                                {isCurrent && <span className="w-2 h-2 rounded-full bg-[#D84C69]" />}
                            </div>

                            <div className="space-y-1">
                                <div className="font-serif text-3xl font-bold tracking-tight">
                                    {rule.metric}
                                </div>
                                <div className={`text-sm font-bold ${isCurrent ? "text-white" : "text-neutral-900"}`}>
                                    {rule.title}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>

            {/* 3. ЮРИДИЧЕСКИЙ БЛОК: СЛОВА ИЗ ДОГОВОРА */}
            <section
                ref={detailRef}
                className="bg-white rounded-[32px] border border-neutral-200 p-8 sm:p-12 shadow-xs"
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-neutral-100">
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
                            <FileCheck2 size={16} />
                        </span>
                        <span className="font-serif text-2xl font-bold text-neutral-900">
                            {selected.title}
                        </span>
                    </div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                        {selected.clause}
                    </span>
                </div>

                <div className="text-base sm:text-lg text-neutral-700 leading-relaxed max-w-4xl font-normal">
                    {selected.legalQuote}
                </div>
            </section>

            {/* 4. PRICE MATCH: ГАРАНТИЯ ЛУЧШИХ ЦЕН */}
            <section className="bg-[#FAF6F4] rounded-[32px] border border-neutral-200 p-8 sm:p-10 space-y-2">
                <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                    <ShieldCheck size={13} className="text-neutral-500" />
                    <span>Гарантия лучших цен</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
                    Абсолютное качество за минимальные деньги.
                </h2>
                <p className="text-neutral-600 text-sm max-w-2xl leading-relaxed">
                    Нашли дешевле с тем же стеком и гарантией? Назовите цену — сделаем выгоднее.
                </p>
            </section>

            {/* 5. ФИНАЛЬНЫЙ CTA В ОДИН КЛИК */}
            <section className="bg-neutral-900 text-white rounded-[32px] p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="space-y-2 text-center lg:text-left">
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                        Гарантия качества. Только результат и договор.
                    </h2>
                    <p className="text-neutral-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
                        Фиксированная цена, передача 100% прав и жесткие штрафы за срыв сроков с первого дня.
                    </p>
                </div>

                <Link
                    href="/contacts"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white hover:bg-neutral-100 text-neutral-900 text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md active:scale-95 shrink-0"
                >
                    <span>Начать проект с гарантией</span>
                    <ArrowRight size={15} />
                </Link>
            </section>
        </main>
    );
}