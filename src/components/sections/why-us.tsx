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
    ShieldAlert,
    Cpu,
} from "lucide-react";

type Tone = "blue" | "indigo" | "emerald" | "amber" | "purple";
const TONES: Record<Tone, { text: string; chip: string; glow: string; line: string }> = {
    blue: { text: "text-blue-400", chip: "bg-blue-500/15 ring-blue-400/30", glow: "rgba(59,130,246,0.18)", line: "from-transparent via-blue-400/80 to-transparent" },
    indigo: { text: "text-indigo-400", chip: "bg-indigo-500/15 ring-indigo-400/30", glow: "rgba(99,102,241,0.18)", line: "from-transparent via-indigo-400/80 to-transparent" },
    emerald: { text: "text-accent-bright", chip: "bg-accent/15 ring-accent-bright/30", glow: "rgba(16,185,129,0.16)", line: "from-transparent via-accent-bright/80 to-transparent" },
    amber: { text: "text-amber-400", chip: "bg-amber-500/15 ring-amber-400/30", glow: "rgba(245,158,11,0.16)", line: "from-transparent via-amber-400/80 to-transparent" },
    purple: { text: "text-purple-400", chip: "bg-purple-500/15 ring-purple-400/30", glow: "rgba(168,85,247,0.16)", line: "from-transparent via-purple-400/80 to-transparent" },
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
            className="group relative rounded-panel bg-gradient-to-b from-white/[0.2] via-white/[0.06] to-white/[0.02] p-px shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] transition-shadow duration-500 hover:shadow-[0_40px_90px_-35px_rgba(59,130,246,0.4)]"
        >
            <div className="relative flex h-full min-h-[560px] flex-col overflow-hidden rounded-[31px] bg-ink-strong">
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
                   tone,
                   footer,
                   children,
               }: {
    onClose: () => void;
    titleId: string;
    tone: Tone;
    footer?: React.ReactNode;
    children: React.ReactNode;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const closeRef = useRef(onClose);
    closeRef.current = onClose;
    const t = TONES[tone];

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
            className="wu-fade fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-6"
        >
            <div
                ref={ref}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                className="wu-modal relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-panel border border-white/[0.12] bg-[#0B0F17] text-white shadow-[0_60px_160px_-30px_rgba(0,0,0,0.95)]"
            >
                {/* Акцентная линия сверху и мягкое свечение в цвет модалки */}
                <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r ${t.line}`} />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{ backgroundImage: `radial-gradient(900px circle at 0% 0%, ${t.glow}, transparent 60%)` }}
                />

                <button
                    type="button"
                    data-autofocus
                    onClick={onClose}
                    aria-label="Закрыть"
                    className="absolute right-4 top-4 z-20 grid size-11 cursor-pointer place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-neutral-300 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 sm:right-6 sm:top-6"
                >
                    <X size={20} />
                </button>

                <div className="relative min-h-0 flex-1 overflow-y-auto px-5 pb-8 pt-8 sm:px-12 sm:pb-12 sm:pt-12">
                    {children}
                </div>

                {footer && (
                    <div className="relative flex shrink-0 items-center justify-end border-t border-white/10 bg-[#0B0F17] px-5 py-5 sm:px-12 sm:py-6">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}

function ModalHead({ icon: Icon, tone, id, title, sub }: { icon: React.ElementType; tone: Tone; id: string; title: string; sub: string }) {
    const t = TONES[tone];
    return (
        <div className="mb-8 flex flex-col gap-5 pr-14 sm:mb-12 sm:flex-row sm:items-center sm:gap-7">
            <div className={`grid size-16 shrink-0 place-items-center rounded-[20px] ring-1 sm:size-20 sm:rounded-3xl ${t.chip} ${t.text}`}>
                <Icon size={30} strokeWidth={1.6} />
            </div>
            <div>
                <h3 id={id} className="font-serif text-4xl font-normal italic leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                    {title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-content-subtle sm:text-lg">{sub}</p>
            </div>
        </div>
    );
}

/* ───────── Строка внутри единого блока: слева заголовок, справа описание ───────── */
function Row({ icon: Icon, tone, title, children }: { icon: React.ElementType; tone: Tone; title: string; children: React.ReactNode }) {
    const t = TONES[tone];
    return (
        <div className="grid gap-4 px-5 py-7 sm:px-10 sm:py-9 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12">
            <div className="flex items-start gap-4">
                <div className={`grid size-11 shrink-0 place-items-center rounded-xl ring-1 ${t.chip} ${t.text}`}>
                    <Icon size={20} aria-hidden="true" />
                </div>
                <h4 className="pt-1.5 text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl sm:pt-1">{title}</h4>
            </div>
            <div className="md:pt-2">{children}</div>
        </div>
    );
}

const CLOSE_BTN =
    "cursor-pointer rounded-2xl bg-white px-8 py-3.5 text-[15px] font-semibold text-[#0B0F17] transition-colors hover:bg-neutral-200 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300";

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
                @keyframes wu-pop{from{opacity:0;transform:translateY(16px) scale(.98)}to{opacity:1;transform:none}}
                .wu-ping{animation:wu-ping 2.6s cubic-bezier(.2,.6,.3,1) infinite}
                .wu-fade{animation:wu-fade .2s ease-out}
                .wu-modal{animation:wu-pop .32s cubic-bezier(.2,.8,.2,1)}
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
                <div className="w-full border-b border-white/[0.08] pb-8">
                    <h2 className="bg-gradient-to-b from-white via-white to-white/55 bg-clip-text font-serif text-4xl font-normal italic leading-[1.05] tracking-tight text-transparent sm:text-6xl lg:text-7xl">
                        Why Asman Tech
                    </h2>
                </div>

                {/* ── Сетка из 3 карточек ── */}
                <div className="grid w-full grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Карточка 1: 24/7 Priority Care */}
                    <Card>
                        <div className="relative h-[320px] w-full shrink-0 overflow-hidden bg-ink-strong [mask-image:linear-gradient(to_bottom,black_60%,transparent)]">
                            <Image
                                src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200&auto=format&fit=crop"
                                alt="Две руки тянутся друг к другу: прямая связь с командой"
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="scale-105 object-cover object-center opacity-70 mix-blend-screen contrast-125 transition-transform duration-700 group-hover:scale-110"
                                unoptimized
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-strong via-transparent to-red-950/25" />

                            {/* Точка контакта с волнами */}
                            <div className="pointer-events-none absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2">
                                <span className="wu-ping absolute -inset-3 rounded-full border border-red-400/60" />
                                <span className="wu-ping absolute -inset-3 rounded-full border border-red-400/40 [animation-delay:1.3s]" />
                                <span className="absolute -inset-4 rounded-full bg-red-500/40 blur-xl" />
                                <span className="relative block size-2 rounded-full bg-white shadow-[0_0_18px_#fff]" />
                            </div>
                        </div>

                        <div className="relative z-10 flex flex-1 flex-col justify-end space-y-4 p-7 pt-0 sm:p-9 sm:pt-0">
                            <h3 className="text-2xl font-semibold uppercase tracking-[-0.01em] text-white sm:text-3xl">
                                24/7 Priority Care
                            </h3>
                            <p className="text-sm font-normal leading-relaxed text-content-subtle sm:text-base">
                                Прямой закрытый чат со старшими инженерами и основателями без посредников, тикетов и очередей. Мгновенное решение критических задач и поддержка вашего бизнеса 24/7.
                            </p>
                        </div>
                    </Card>

                    {/* Карточка 2: Технологии 2026 */}
                    <Card>
                        <div className="relative z-10 flex flex-1 flex-col justify-between p-7 sm:p-9">
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
                            </div>

                            <div className="space-y-6 pt-4">
                                <h3 className="text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
                                    Самые прорывные технологии 2026 года
                                </h3>

                                <button
                                    type="button"
                                    onClick={() => setStackOpen(true)}
                                    className="group/btn inline-flex cursor-pointer items-center gap-3 rounded-2xl border border-blue-400/30 bg-blue-500/15 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:border-blue-400/60 hover:bg-blue-500/25 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 sm:text-[15px]"
                                >
                                    <span>Подробнее</span>
                                    <span className="grid size-7 place-items-center rounded-full bg-blue-500/25 transition-transform group-hover/btn:rotate-12">
                                        <ArrowUpRight size={15} />
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
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-strong via-ink-strong/80 to-ink-strong/20" />
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -right-4 top-10 font-serif text-[180px] italic leading-none text-white/[0.04]"
                        >
                            100%
                        </span>

                        <div className="relative z-10 flex flex-1 flex-col justify-between p-7 sm:p-9">
                            <h3 className="my-auto py-6 text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
                                Гарантия качества либо 100% возврат
                            </h3>

                            <div>
                                <button
                                    type="button"
                                    onClick={() => setGuaranteeOpen(true)}
                                    className="group/btn inline-flex cursor-pointer items-center gap-3 rounded-2xl border border-accent-bright/30 bg-accent/15 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:border-accent-bright/60 hover:bg-accent/25 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-bright sm:text-[15px]"
                                >
                                    <span>Подробнее</span>
                                    <span className="grid size-7 place-items-center rounded-full bg-accent/25 transition-transform group-hover/btn:rotate-12">
                                        <ArrowUpRight size={15} />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* ── Модалка: стек ── */}
            {stackOpen && (
                <Modal
                    onClose={() => setStackOpen(false)}
                    titleId="wu-stack-title"
                    tone="blue"
                    footer={
                        <button type="button" onClick={() => setStackOpen(false)} className={CLOSE_BTN}>
                            Закрыть
                        </button>
                    }
                >
                    <ModalHead icon={Cpu} tone="blue" id="wu-stack-title" title="Стек технологий 2026" sub="Архитектура высокой надёжности и масштабируемости" />
                    <div className="divide-y divide-white/[0.08] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                        {STACK_GROUPS.map((g) => (
                            <Row key={g.title} icon={g.icon} tone={g.tone} title={g.title}>
                                <p className="text-base leading-relaxed text-neutral-300 sm:text-lg">{g.text}</p>
                                <div className="mt-5 flex flex-wrap gap-2">
                                    {g.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full border border-white/[0.12] bg-white/[0.05] px-3.5 py-1.5 text-sm font-medium text-neutral-100"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </Row>
                        ))}
                    </div>
                </Modal>
            )}

            {/* ── Модалка: гарантия ── */}
            {guaranteeOpen && (
                <Modal
                    onClose={() => setGuaranteeOpen(false)}
                    titleId="wu-guarantee-title"
                    tone="emerald"
                    footer={
                        <button type="button" onClick={() => setGuaranteeOpen(false)} className={CLOSE_BTN}>
                            Закрыть
                        </button>
                    }
                >
                    <ModalHead icon={Scale} tone="emerald" id="wu-guarantee-title" title="Гарантийный протокол Asman Tech" sub="100% обязательств, зафиксированных юридически в договоре" />
                    <div className="divide-y divide-white/[0.08] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                        {TERMS.map((term) => (
                            <Row key={term.title} icon={term.icon} tone={term.tone} title={term.title}>
                                <p className="text-base leading-relaxed text-neutral-300 sm:text-lg">{term.text}</p>
                            </Row>
                        ))}
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default WhyUs;