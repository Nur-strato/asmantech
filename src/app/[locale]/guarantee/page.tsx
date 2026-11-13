"use client";

import React from "react";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, ShieldCheck, FileCheck2 } from "lucide-react";
import { useTr } from "@/i18n/tr";

type Tr = (text: string) => string;

interface GuaranteeRule {
    id: string;
    num: string;
    metric: string;
    title: string;
    // Функция, а не готовый JSX: тексты внутри переводятся через tr на этапе рендера
    legalQuote: (tr: Tr) => React.ReactNode;
    clause: string;
}

/* Ключевые обязательства подчёркнуты акцентной линией */
const HL = "font-semibold text-neutral-950 underline decoration-[#D84C69] decoration-2 underline-offset-[5px]";

const rules: GuaranteeRule[] = [
    {
        id: "time",
        num: "01",
        metric: "-10% / 3 дня",
        title: "Скидка за срыв срока",
        legalQuote: (tr) => (
            <>
                {tr("Получили проект на")} <strong className={HL}>{tr("3 дня позже — скидка 10%")}</strong>{tr(". Опоздали еще на 3 —")} <strong className={HL}>{tr("скидка уже 20%")}</strong>{tr(". Просто платите меньше.")}
            </>
        ),
        clause: "Пункт 6.2 Договора",
    },
    {
        id: "budget",
        num: "02",
        metric: "$0 доплат",
        title: "Твердый Fixed Price",
        legalQuote: (tr) => (
            <>
                {tr("Цена в договоре — окончательная. Если мы ошиблись в оценке или задача оказалась сложнее —")} <strong className={HL}>{tr("все переработки оплачиваем мы")}</strong>{tr(", а не вы.")}
            </>
        ),
        clause: "Пункт 3.4 Договора",
    },
    {
        id: "warranty",
        num: "03",
        metric: "45 дней",
        title: "Гарантия на любой баг",
        legalQuote: (tr) => (
            <>
                {tr("Безусловная гарантия")} <strong className={HL}>{tr("45 календарных дней")}</strong>{tr(". Любые дефекты или отклонения от ТЗ устраняются вне очереди в приоритетном порядке")} <strong className={HL}>{tr("в день обращения")}</strong>.
            </>
        ),
        clause: "Пункт 7.1 Договора",
    },
    {
        id: "ip",
        num: "04",
        metric: "100% IP",
        title: "Полное владение кодом",
        legalQuote: (tr) => (
            <>
                {tr("После завершения работы передаем вам весь исходный код и все доступы. Проект и все права на него на")} <strong className={HL}>{tr("100% принадлежат вам")}</strong>.
            </>
        ),
        clause: "Пункт 8.3 Договора",
    },
];

export default function GuaranteePage() {
    const tr = useTr();

    return (
        <main className="mx-auto max-w-[1280px] px-5 pb-28 pt-28 sm:px-10 sm:pt-32">
            {/* ── 1. HERO: заголовок и печать ── */}
            <section>

                <div className="mt-10 grid items-center gap-10 sm:mt-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
                    <h1 className="text-[clamp(2.75rem,7.4vw,6.5rem)] font-extrabold leading-[0.95] tracking-[-0.045em] text-neutral-950">
                        <span className="block">{tr("100% качество.")}</span>
                        <span className="block">{tr("Или вернём всю сумму.")}</span>
                    </h1>

                    {/* Печать: обещание до начала работы */}
                    <div className="relative grid size-48 shrink-0 -rotate-[8deg] place-items-center rounded-full border-[3px] border-emerald-600 text-emerald-700 sm:size-56">
                        <span aria-hidden="true" className="absolute inset-2 rounded-full border border-dashed border-emerald-600/60" />
                        <div className="flex flex-col items-center gap-3 px-9 text-center sm:px-10">
                            <ShieldCheck size={30} strokeWidth={1.8} aria-hidden="true" />
                            <p className="text-[13px] font-bold leading-snug sm:text-sm">
                                {tr("Никаких предоплат до NDA и твердой сметы")}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 2. РЕЕСТР: все четыре правила видны сразу ── */}
            <section className="mt-16 border-t-2 border-neutral-950 sm:mt-24">
                {rules.map((rule) => (
                    <article
                        key={rule.id}
                        className="grid gap-x-12 gap-y-5 border-b border-neutral-200 py-10 sm:py-14 lg:grid-cols-[88px_minmax(0,5fr)_minmax(0,6fr)] lg:items-start"
                    >
                        <div className="flex items-baseline gap-2 lg:flex-col lg:gap-1 lg:pt-3">
                            <span className="font-mono text-[11px] font-bold text-neutral-400">{tr("RULE")}</span>
                            <span className="font-mono text-2xl font-bold text-neutral-950">{rule.num}</span>
                        </div>

                        <div className="font-serif text-[clamp(2.5rem,5.4vw,4.75rem)] font-bold leading-[0.95] tracking-tight text-neutral-950">
                            {tr(rule.metric)}
                        </div>

                        <div className="lg:pt-2">
                            <h2 className="text-xl font-bold tracking-tight text-neutral-950 sm:text-2xl">
                                {tr(rule.title)}
                            </h2>
                            <p className="mt-3 max-w-[56ch] text-base leading-[1.7] text-neutral-600 sm:text-lg">
                                {rule.legalQuote(tr)}
                            </p>
                            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-[#FAF6F4] px-3.5 py-1.5 text-xs font-semibold text-neutral-600">
                                <FileCheck2 size={14} aria-hidden="true" />
                                <span>{tr(rule.clause)}</span>
                            </div>
                        </div>
                    </article>
                ))}
            </section>

            {/* ── 3. ФИНАЛ: цена и CTA в одном тёмном блоке ── */}
            <section className="mt-20 overflow-hidden rounded-[40px] bg-neutral-950 text-white sm:mt-28">
                <div className="grid gap-6 border-b border-white/10 p-8 sm:p-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16 lg:p-16">
                    <div className="flex items-center gap-2 self-start text-sm font-semibold text-emerald-400">
                        <ShieldCheck size={17} aria-hidden="true" />
                        <span>{tr("Гарантия лучших цен")}</span>
                    </div>
                    <div>
                        <h2 className="font-serif text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl">
                            {tr("Абсолютное качество за минимальные деньги.")}
                        </h2>
                        <p className="mt-4 max-w-lg text-base leading-relaxed text-neutral-400">
                            {tr("Нашли дешевле с тем же стеком и гарантией? Назовите цену — сделаем выгоднее.")}
                        </p>
                    </div>
                </div>

                <div className="relative flex flex-col gap-10 p-8 sm:p-12 lg:flex-row lg:items-end lg:justify-between lg:p-16">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-40 -left-24 size-[460px] rounded-full bg-[#D84C69]/25 blur-[120px]"
                    />
                    <div className="relative max-w-2xl space-y-4">
                        <h2 className="text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-6xl">
                            {tr("Гарантия качества. Только результат и договор.")}
                        </h2>
                        <p className="max-w-lg text-base leading-relaxed text-neutral-400">
                            {tr("Фиксированная цена, передача 100% прав и жесткие штрафы за срыв сроков с первого дня.")}
                        </p>
                    </div>

                    <Link
                        href="/contacts"
                        className="group relative inline-flex w-full shrink-0 items-center justify-between gap-6 rounded-2xl bg-white py-2 pl-7 pr-2 text-base font-semibold text-neutral-950 transition-colors duration-200 hover:bg-[#F3ECE8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:scale-[0.99] sm:w-auto"
                    >
                        <span>{tr("Начать проект с гарантией")}</span>
                        <span className="grid size-12 place-items-center rounded-xl bg-[#D84C69] text-white transition-transform duration-300 group-hover:rotate-45">
                            <ArrowUpRight size={20} aria-hidden="true" />
                        </span>
                    </Link>
                </div>
            </section>
        </main>
    );
}