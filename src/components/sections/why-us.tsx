"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
    ArrowUpRight,
    Clock,
    X,
    Sparkles,
    CheckCircle2,
    Lock,
    Code2,
    Zap,
    Scale,
    Send,
    ShieldAlert,
    Cpu,
} from "lucide-react";

const WA_LINK =
    "https://wa.me/996500000000?text=" +
    encodeURIComponent("Здравствуйте! Хочу запросить образец договора Asman Tech с условиями гарантии.");

type Tone = "blue" | "indigo" | "emerald" | "amber" | "purple";
const TONES: Record<Tone, { text: string; chip: string; glow: string }> = {
    blue: { text: "text-blue-400", chip: "bg-blue-500/15 ring-blue-400/30", glow: "rgba(59,130,246,0.18)" },
    indigo: { text: "text-indigo-400", chip: "bg-indigo-500/15 ring-indigo-400/30", glow: "rgba(99,102,241,0.18)" },
    emerald: { text: "text-emerald-400", chip: "bg-emerald-500/15 ring-emerald-400/30", glow: "rgba(16,185,129,0.16)" },
    amber: { text: "text-amber-400", chip: "bg-amber-500/15 ring-amber-400/30", glow: "rgba(245,158,11,0.16)" },
    purple: { text: "text-purple-400", chip: "bg-purple-500/15 ring-purple-400/30", glow: "rgba(168,85,247,0.16)" },
};

const STACK_GROUPS = [
    {
        icon: Sparkles,
        tone: "blue" as Tone,
        title: "Frontend и интерфейсы",
        text: "Серверные компоненты, строгая типизация и изолированные песочницы для предпросмотра без конфликтов скролла.",
        tags: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS"],
    },
    {
        icon: Zap,
        tone: "indigo" as Tone,
        title: "Backend, API и автоматизация",
        text: "Быстрые асинхронные микросервисы, оптимизированная база данных и интеграции CRM под ключ.",
        tags: ["Python", "FastAPI", "PostgreSQL", "Redis"],
    },
    {
        icon: Code2,
        tone: "emerald" as Tone,
        title: "ИИ-пайплайны и медиа",
        text: "Интеллектуальные ассистенты для обработки лидов и генеративные пайплайны.",
        tags: ["AI-ассистенты", "Python", "FFmpeg"],
    },
];

const TERMS = [
    { icon: Lock, tone: "emerald" as Tone, title: "Никаких предоплат до NDA и твёрдой сметы", text: "Работа начинается после подписания соглашения о конфиденциальности и утверждения фиксированной сметы." },
    { icon: ShieldAlert, tone: "emerald" as Tone, title: "100% качество. Или вернём всю сумму", text: "Если результат не соответствует утверждённому ТЗ и критериям приёмки, мы возвращаем оплату в полном объёме." },
    { icon: Clock, tone: "amber" as Tone, title: "Опоздали — платите меньше", text: "Проект на 3 дня позже — скидка 10%. Ещё на 3 дня позже — скидка уже 20%." },
    { icon: CheckCircle2, tone: "blue" as Tone, title: "Цена в договоре — окончательная", text: "Ошиблись в оценке или задача оказалась сложнее — все переработки оплачиваем мы, а не вы." },
    { icon: Zap, tone: "purple" as Tone, title: "Безусловная гарантия 45 дней", text: "Любые дефекты и отклонения от ТЗ устраняем вне очереди, в день обращения." },
    { icon: Code2, tone: "emerald" as Tone, title: "100% исходного кода и доступов", text: "После завершения работы передаём весь код и все доступы. Права на проект полностью ваши." },
];

/* ───────── Карточка с градиентной рамкой и подсветкой за курсором ───────── */
function Card({ children }: { children: React.ReactNode }) {
    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    return (
        <div
            onMouseMove={onMove}
            className="group relative rounded-[32px] bg-gradient-to-b from-white/[0.2] via-white/[0.06] to-white/[0.02] p-px shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] transition-shadow duration-500 hover:shadow-[0_40px_90px_-35px_rgba(59,130,246,0.4)]"
        >
            <div className="relative flex h-full min-h-[560px] flex-col overflow-hidden rounded-[31px] bg-[#0A0C12]">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                        background:
                            "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgba(96,140,255,0.11), transparent 60%)",
                    }}
                />
                {children}
            </div>
        </div>
    );
}

/* ───────── Доступная модалка: фокус, Esc, клик по фону, блокировка скролла ───────── */
function Modal({
                   onClose,
                   titleId,
                   glow,
                   children,
               }: {
    onClose: () => void;
    titleId: string;
    glow: string;
    children: React.ReactNode;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const closeRef = useRef(onClose);
    closeRef.current = onClose;

    useEffect(() => {
        const prevFocus = document.activeElement as HTMLElement | null;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const root = ref.current;
        root?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") return closeRef.current();
            if (e.key !== "Tab" || !root) return;
            const f = root.querySelectorAll<HTMLElement>("a[href],button:not([disabled])");
            if (!f.length) return;
            const first = f[0];
            const last = f[f.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", onKey);
            prevFocus?.focus();
        };
    }, []);

    return (
        <div
            data-lenis-prevent="true"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
            className="wu-fade fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md sm:p-6"
        >
            <div
                ref={ref}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                className="wu-modal relative w-full max-w-2xl rounded-[28px] bg-gradient-to-b from-white/[0.25] to-white/[0.05] p-px shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)]"
            >
                <button
                    type="button"
                    data-autofocus
                    onClick={onClose}
                    aria-label="Закрыть"
                    className="absolute right-4 top-4 z-10 grid size-9 cursor-pointer place-items-center rounded-xl bg-white/10 text-neutral-300 transition-colors hover:bg-white/20 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400"
                >
                    <X size={17} />
                </button>
                <div
                    className="max-h-[calc(90vh-2px)] overflow-y-auto rounded-[27px] bg-[#0B1019] p-6 text-white sm:p-8"
                    style={{ backgroundImage: `radial-gradient(520px circle at 0% 0%, ${glow}, transparent 70%)` }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

function ModalHead({ icon: Icon, tone, id, title, sub }: { icon: React.ElementType; tone: Tone; id: string; title: string; sub: string }) {
    const t = TONES[tone];
    return (
        <div className="mb-7 flex items-center gap-4 pr-10">
            <div className={`grid size-12 shrink-0 place-items-center rounded-2xl ring-1 ${t.chip} ${t.text}`}>
                <Icon size={22} />
            </div>
            <div>
                <h3 id={id} className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h3>
                <p className="mt-0.5 font-mono text-xs text-neutral-400">{sub}</p>
            </div>
        </div>
    );
}

export function WhyUs() {
    const [stackOpen, setStackOpen] = useState(false);
    const [guaranteeOpen, setGuaranteeOpen] = useState(false);

    return (
        <div id="why-us" className="relative w-full text-white selection:bg-blue-600 selection:text-white">
            <style>{`
                .wu-scene{perspective:1100px}
                .wu-stack{--gap:30px;position:relative;width:190px;height:190px;transform-style:preserve-3d;transform:rotateX(62deg) rotateZ(-40deg)}
                .group:hover .wu-stack{--gap:62px}
                .wu-layer{position:absolute;inset:0;border-radius:22px;transform:translateZ(calc(var(--i)*var(--gap)));transition:transform .8s cubic-bezier(.2,.8,.2,1);
                    background-image:linear-gradient(rgba(255,255,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.07) 1px,transparent 1px);background-size:24px 24px}
                @keyframes wu-ping{0%{transform:scale(.6);opacity:.7}100%{transform:scale(2.6);opacity:0}}
                @keyframes wu-fade{from{opacity:0}to{opacity:1}}
                @keyframes wu-pop{from{opacity:0;transform:translateY(12px) scale(.97)}to{opacity:1;transform:none}}
                .wu-ping{animation:wu-ping 2.6s cubic-bezier(.2,.6,.3,1) infinite}
                .wu-fade{animation:wu-fade .18s ease-out}
                .wu-modal{animation:wu-pop .26s cubic-bezier(.2,.8,.2,1)}
                @media (prefers-reduced-motion:reduce){.wu-layer{transition:none}.wu-ping,.wu-fade,.wu-modal{animation:none}}
            `}</style>

            {/* Фон: свечение и точечная сетка */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/3 h-[700px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-950/25 blur-[180px]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_70%)]"
            />

            <div className="relative w-full space-y-10 sm:space-y-14">
                {/* ── Хедер ── */}
                <div className="flex w-full flex-col justify-between gap-6 border-b border-white/[0.08] pb-8 md:flex-row md:items-end">
                    <div className="max-w-3xl space-y-3">
                        <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.25em] text-blue-500">
                            <span className="h-px w-6 bg-blue-500/70" />
                            Core Principles
                        </span>
                        <h2 className="bg-gradient-to-b from-white via-white to-white/55 bg-clip-text font-serif text-4xl font-normal italic leading-[1.05] tracking-tight text-transparent sm:text-6xl lg:text-7xl">
                            Why Asman Tech
                        </h2>
                    </div>
                    <p className="max-w-md text-left font-mono text-xs font-semibold uppercase leading-relaxed tracking-wider text-neutral-400 sm:text-sm md:text-right">
                        Прямая инженерная ответственность, передовой стек 2026 и абсолютная юридическая гарантия
                    </p>
                </div>

                {/* ── Сетка из 3 карточек ── */}
                <div className="grid w-full grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Карточка 1: 24/7 Priority Care */}
                    <Card>
                        <div className="relative h-[320px] w-full shrink-0 overflow-hidden bg-[#0A0C12] [mask-image:linear-gradient(to_bottom,black_60%,transparent)]">
                            <Image
                                src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200&auto=format&fit=crop"
                                alt="Две руки тянутся друг к другу: прямая связь с командой"
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="scale-105 object-cover object-center opacity-70 mix-blend-screen contrast-125 transition-transform duration-700 group-hover:scale-110"
                                unoptimized
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0C12] via-transparent to-red-950/25" />

                            {/* Точка контакта с волнами */}
                            <div className="pointer-events-none absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2">
                                <span className="wu-ping absolute -inset-3 rounded-full border border-red-400/60" />
                                <span className="wu-ping absolute -inset-3 rounded-full border border-red-400/40 [animation-delay:1.3s]" />
                                <span className="absolute -inset-4 rounded-full bg-red-500/40 blur-xl" />
                                <span className="relative block size-2 rounded-full bg-white shadow-[0_0_18px_#fff]" />
                            </div>

                            <div className="absolute left-6 top-6 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/30 py-1.5 pl-3 pr-3.5 backdrop-blur-md">
                                <span className="relative flex size-2">
                                    <span className="wu-ping absolute inset-0 rounded-full bg-emerald-400/70" />
                                    <span className="relative size-2 rounded-full bg-emerald-400" />
                                </span>
                                <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-neutral-200">
                                    Direct Line
                                </span>
                            </div>
                        </div>

                        <div className="relative z-10 flex flex-1 flex-col justify-end space-y-4 p-7 pt-0 sm:p-9 sm:pt-0">
                            <h3 className="text-2xl font-semibold uppercase tracking-[-0.01em] text-white sm:text-3xl">
                                24/7 Priority Care
                            </h3>
                            <p className="text-sm font-normal leading-relaxed text-neutral-400 sm:text-base">
                                Прямой закрытый чат со старшими инженерами и основателями без посредников, тикетов и очередей. Мгновенное решение критических задач и поддержка вашего бизнеса 24/7.
                            </p>
                        </div>
                    </Card>

                    {/* Карточка 2: Технологии 2026 */}
                    <Card>
                        <div className="relative z-10 flex flex-1 flex-col justify-between p-7 sm:p-9">
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-sm font-bold text-blue-500">02</span>
                                <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 font-mono text-[11px] text-blue-400">
                                    Engineering 2026
                                </span>
                            </div>

                            {/* Разнесённый 3D-стек: при наведении слои расходятся */}
                            <div className="relative my-auto flex h-64 flex-col items-center justify-center" aria-hidden="true">
                                <div className="absolute bottom-10 h-10 w-44 rounded-full bg-blue-600/25 blur-2xl" />
                                <div className="wu-scene">
                                    <div className="wu-stack">
                                        <div
                                            className="wu-layer border border-white/10 bg-[#0E1018]"
                                            style={{ ["--i" as string]: 0 }}
                                        />
                                        <div
                                            className="wu-layer border border-indigo-300/20 bg-[#14172A]"
                                            style={{ ["--i" as string]: 1 }}
                                        />
                                        <div
                                            className="wu-layer border border-blue-300/60 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-500 shadow-[0_0_50px_rgba(59,130,246,0.65)]"
                                            style={{ ["--i" as string]: 2 }}
                                        />
                                    </div>
                                </div>
                                <div className="absolute bottom-0 flex gap-4 font-mono text-[11px] text-neutral-400">
                                    <span className="flex items-center gap-1.5"><i className="size-2 rounded-sm bg-blue-500" />Интерфейс</span>
                                    <span className="flex items-center gap-1.5"><i className="size-2 rounded-sm bg-indigo-400/70" />API</span>
                                    <span className="flex items-center gap-1.5"><i className="size-2 rounded-sm bg-neutral-500" />Данные</span>
                                </div>
                            </div>

                            <div className="space-y-5 pt-4">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
                                        Самые прорывные технологии 2026 года
                                    </h3>
                                    <p className="text-xs leading-relaxed text-neutral-400 sm:text-sm">
                                        Next.js 15 App Router, React 19 Server Components, изолированные песочницы, AI-ассистенты и высокопроизводительный бэкенд на Python FastAPI.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setStackOpen(true)}
                                    className="flex w-full cursor-pointer items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-xs font-semibold text-white transition-all hover:bg-white/15 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400"
                                >
                                    <span>Смотреть весь стек</span>
                                    <span className="grid size-6 place-items-center rounded-full bg-white/20 transition-transform group-hover:rotate-12">
                                        <ArrowUpRight size={13} />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </Card>

                    {/* Карточка 3: Гарантия */}
                    <Card>
                        <Image
                            src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000&auto=format&fit=crop"
                            alt=""
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover object-center opacity-30 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105"
                            unoptimized
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0C12] via-[#0A0C12]/80 to-[#0A0C12]/20" />
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -right-4 top-10 font-serif text-[180px] italic leading-none text-white/[0.04]"
                        >
                            100%
                        </span>

                        <div className="relative z-10 flex flex-1 flex-col justify-between p-7 sm:p-9">
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-sm font-bold text-blue-500">03</span>
                                <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] text-emerald-400">
                                    100% Guaranteed
                                </span>
                            </div>

                            <div className="my-auto space-y-5 py-6">
                                <h3 className="text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
                                    Гарантия качества либо 100% возврат
                                </h3>
                                <ul className="space-y-3 text-xs text-neutral-300 sm:text-sm">
                                    {[
                                        "Никаких предоплат до NDA и твёрдой сметы",
                                        "Опоздали хотя бы на 3 дня — платите на 10–20% меньше",
                                        "Цена в договоре окончательная. Переработки за наш счёт",
                                    ].map((t) => (
                                        <li key={t} className="flex items-start gap-2.5">
                                            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-400" aria-hidden="true" />
                                            <span>{t}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <button
                                    type="button"
                                    onClick={() => setGuaranteeOpen(true)}
                                    className="inline-flex cursor-pointer items-center gap-3 rounded-full border border-white/20 bg-white/10 py-2.5 pl-5 pr-2.5 text-xs font-semibold text-white shadow-xl backdrop-blur-md transition-all hover:bg-white/20 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
                                >
                                    <span>Our formula (Условия)</span>
                                    <span className="grid size-6 place-items-center rounded-full bg-white/20">
                                        <ArrowUpRight size={12} />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* ── Футер ── */}
                <div className="flex w-full items-center justify-between border-t border-white/[0.08] pt-6 font-mono text-[11px] text-neutral-500">
                    <span className="uppercase tracking-widest">Asman Tech Standards</span>
                    <span className="uppercase tracking-[0.2em] text-neutral-400">2026 // Full legal backing</span>
                </div>
            </div>

            {/* ── Модалка: стек ── */}
            {stackOpen && (
                <Modal onClose={() => setStackOpen(false)} titleId="wu-stack-title" glow={TONES.blue.glow}>
                    <ModalHead icon={Cpu} tone="blue" id="wu-stack-title" title="Стек технологий 2026" sub="Архитектура высокой надёжности и масштабируемости" />
                    <div className="space-y-3.5">
                        {STACK_GROUPS.map((g) => {
                            const t = TONES[g.tone];
                            return (
                                <div key={g.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                                    <div className={`flex items-center gap-2 font-mono text-xs font-semibold ${t.text}`}>
                                        <g.icon size={14} aria-hidden="true" />
                                        <span>{g.title}</span>
                                    </div>
                                    <p className="mt-2 text-sm leading-relaxed text-neutral-300">{g.text}</p>
                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                        {g.tags.map((tag) => (
                                            <span key={tag} className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 font-mono text-[11px] text-neutral-200">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-7 flex justify-end border-t border-white/10 pt-5">
                        <button
                            type="button"
                            onClick={() => setStackOpen(false)}
                            className="cursor-pointer rounded-xl bg-blue-600 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
                        >
                            Закрыть
                        </button>
                    </div>
                </Modal>
            )}

            {/* ── Модалка: гарантия ── */}
            {guaranteeOpen && (
                <Modal onClose={() => setGuaranteeOpen(false)} titleId="wu-guarantee-title" glow={TONES.emerald.glow}>
                    <ModalHead icon={Scale} tone="emerald" id="wu-guarantee-title" title="Гарантийный протокол Asman Tech" sub="100% обязательств, зафиксированных юридически в договоре" />
                    <div className="grid gap-3 sm:grid-cols-2">
                        {TERMS.map((term) => {
                            const t = TONES[term.tone];
                            return (
                                <div key={term.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                    <div className={`mb-3 grid size-8 place-items-center rounded-lg ring-1 ${t.chip} ${t.text}`}>
                                        <term.icon size={15} aria-hidden="true" />
                                    </div>
                                    <h4 className="text-sm font-semibold leading-snug text-white">{term.title}</h4>
                                    <p className="mt-1.5 text-xs leading-relaxed text-neutral-400">{term.text}</p>
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-5 sm:flex-row">
                        <span className="font-mono text-xs text-neutral-400">Типовой договор с фиксацией SLA и штрафов</span>
                        <a
                            href={WA_LINK}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-neutral-950 shadow-lg transition-all hover:bg-emerald-400 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 sm:w-auto"
                        >
                            <Send size={13} aria-hidden="true" />
                            <span>Запросить образец договора</span>
                        </a>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default WhyUs;