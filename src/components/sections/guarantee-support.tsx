"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

interface GuaranteeClause {
    title: string;
    text: string;
}

const CLAUSES: GuaranteeClause[] = [
    {
        title: "Опоздали — платите меньше",
        text: "Получили проект на 3 дня позже — скидка 10%. Опоздали еще на 3 — скидка уже 20%. Просто платите меньше.",
    },
    {
        title: "Цена в договоре — окончательная",
        text: "Если мы ошиблись в оценке или задача оказалась сложнее — все переработки оплачиваем мы, а не вы.",
    },
    {
        title: "Безусловная гарантия 45 дней",
        text: "Любые дефекты или отклонения от ТЗ устраняются вне очереди в приоритетном порядке в день обращения.",
    },
    {
        title: "100% исходного кода и доступов",
        text: "После завершения работы передаем вам весь исходный код и все доступы. Проект и все права на него на 100% принадлежат вам.",
    },
];

export function GuaranteeSupport() {
    return (
        <section
            id="guarantee"
            aria-label="Гарантии Asman Tech"
            className="w-full py-12 sm:py-20 md:py-24 overflow-x-clip"
        >
            <div className="w-full max-w-[1412px] mx-auto px-4 xs:px-5 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

                    {/* ЛЕВАЯ КОЛОНКА */}
                    <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start space-y-6 sm:space-y-8">
                        <div className="space-y-5">
                            {/* Бейдж */}
                            <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-neutral-50/90 border border-neutral-200/90 shadow-2xs">
                                <ShieldCheck size={18} className="text-emerald-600 shrink-0" strokeWidth={2.2} />
                                <span className="text-xs sm:text-[13.5px] font-normal text-neutral-800 tracking-tight">
                                    Никаких предоплат до NDA и твердой сметы
                                </span>
                            </div>

                            {/* Заголовок */}
                            <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-neutral-950 leading-[1.02]">
                                100% качество. <br className="hidden sm:inline" />
                                Или вернём всю сумму.
                            </h2>
                        </div>

                        <div className="pt-2">
                            <Link
                                href="/contacts"
                                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs uppercase tracking-wider font-semibold transition-all active:scale-95"
                            >
                                <span>Запросить образец договора</span>
                                <ArrowUpRight
                                    size={15}
                                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                            </Link>
                        </div>
                    </div>

                    {/* ПРАВАЯ КОЛОНКА */}
                    <div className="lg:col-span-7 divide-y divide-neutral-200/90 border-y border-neutral-200/90">
                        {CLAUSES.map((item) => (
                            <div
                                key={item.title}
                                className="py-7 sm:py-9 transition-colors duration-200 hover:bg-neutral-50/50 px-2 sm:px-4 -mx-2 sm:-mx-4 rounded-xl"
                            >
                                <div className="space-y-2.5 sm:space-y-3">
                                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 leading-snug">
                                        {item.title}
                                    </h3>

                                    <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
                                        {item.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}

export default GuaranteeSupport;