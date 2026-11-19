"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "@/i18n/navigation";
import { ArrowDown, ArrowUpRight, Check, ShieldCheck, X } from "lucide-react";
import { useTr } from "@/i18n/tr";

type Tr = (text: string) => string;

/* Конец акции Rebranding Offer: 31 декабря 2026, 23:59 по местному времени посетителя */
const DEADLINE = new Date(2026, 11, 31, 23, 59, 59);

/* ───────── Купоны: по одному на каждый тип скидки ───────── */
const TABS = [
    {
        id: "rebranding",
        sub: "До 31 декабря 2026 года",
        name: "Rebranding Offer",
        figure: "50%",
        unit: "OFF",
        stub: "Для новых заказов",
    },
    {
        id: "returning",
        sub: "На все услуги",
        name: "Returning Client",
        figure: "25%",
        unit: "OFF",
        stub: "Для постоянных клиентов",
    },
    {
        id: "programs",
        sub: "Startup, Social Impact, Public Sector",
        name: "Специальные программы",
        figure: "3",
        unit: "программы",
        stub: "Условия под ваш проект",
    },
] as const;
type TabId = (typeof TABS)[number]["id"];

/* ───────── 1. Rebranding Offer ───────── */
type Service = { num: string; name: string; discount: string };

const REBRANDING_GROUPS: { id: string; title: string; services: Service[] }[] = [
    {
        id: "dev",
        title: "Разработка",
        services: [
            { num: "01", name: "Разработка сайтов", discount: "−50%" },
            { num: "02", name: "Мобильные приложения", discount: "−50%" },
            { num: "03", name: "3D-дизайн", discount: "−50%" },
            { num: "04", name: "AI-чатботы", discount: "−50%" },
            { num: "05", name: "Аудит безопасности и качества", discount: "−50%" },
            { num: "06", name: "SEO-оптимизация", discount: "−50%" },
        ],
    },
    {
        id: "infra",
        title: "Инфраструктурные услуги",
        services: [
            { num: "01", name: "Хостинг и сервер", discount: "−50%" },
            { num: "02", name: "Админ-панель", discount: "−50%" },
        ],
    },
];

/* ───────── 2. Returning Client: путь к скидке и условия ───────── */
const RETURNING_STEPS = [
    { title: "Завершаем проект", text: "Вы получаете готовый результат по ТЗ." },
    { title: "Подписываем акт приёмки", text: "С этого момента вы — наш постоянный клиент." },
    { title: "Следующий заказ — 25% OFF", text: "Скидка применяется к любой услуге и фиксируется в договоре." },
];

const RETURNING_NOTES = [
    { title: "На все услуги", text: "Разработка и инфраструктура." },
    { title: "Без ограничения по сроку", text: "Скидка не сгорает между проектами." },
    { title: "Не суммируется с Rebranding Offer", text: "Применяется бо́льшая скидка." },
];

/* ───────── 3. Специальные программы ───────── */
type Program = {
    id: string;
    name: string;
    desc: string;
    terms: string;
    numeric: boolean;
    items: string[];
    conditions?: string[];
};

const SPECIAL_PROGRAMS: Program[] = [
    {
        id: "startup",
        name: "Startup Program",
        desc: "Поддержка перспективных стартапов",
        terms: "Flexible Collaboration",
        numeric: false,
        items: [
            "Специальные цены на разработку.",
            "Гибкие условия оплаты.",
            "Бартер и взаимовыгодное партнёрство.",
            "Разработка MVP.",
        ],
    },
    {
        id: "social",
        name: "Social Impact Program",
        desc: "Поддержка проектов с общественной пользой",
        terms: "Up to 70% OFF",
        numeric: true,
        items: [
            "Благотворительные инициативы.",
            "Образовательные проекты.",
            "Экологические инициативы.",
            "Социальные и инклюзивные проекты.",
        ],
        conditions: [
            "Скидка от 15% до 70%.",
            "Индивидуальная оценка проекта.",
            "Учитывается общественная польза и масштаб инициативы.",
        ],
    },
    {
        id: "public",
        name: "Public Sector Program",
        desc: "Цифровизация государственного сектора",
        terms: "Individual Pricing",
        numeric: false,
        items: [
            "Разработка веб-платформ.",
            "Создание цифровых сервисов.",
            "Автоматизация процессов.",
            "Индивидуальная техническая разработка.",
        ],
        conditions: [
            "Индивидуальный расчёт стоимости.",
            "Оценка технического задания.",
            "Коммерческое предложение под проект.",
        ],
    },
];

const STEPS = [
    { num: "01", title: "Оставьте заявку", text: "Расскажите о задаче и укажите, какая скидка вам подходит." },
    { num: "02", title: "Получите смету и договор", text: "Скидка записывается в договор вместе с итоговой ценой." },
    { num: "03", title: "Стартуйте, когда удобно", text: "Цена по Rebranding Offer сохранится, даже если работа начнётся в новом году." },
];

/* Дней до конца акции. Считается только на клиенте, чтобы не было рассинхрона гидрации */
function useDaysLeft() {
    const [days, setDays] = useState<number | null>(null);
    useEffect(() => {
        const calc = () => setDays(Math.max(0, Math.ceil((DEADLINE.getTime() - Date.now()) / 86_400_000)));
        calc();
        const id = window.setInterval(calc, 60_000);
        return () => window.clearInterval(id);
    }, []);
    return days;
}

function daysWord(n: number) {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return "день";
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "дня";
    return "дней";
}

function PanelHead({ title, desc, tr, aside }: { title: string; desc: string; tr: Tr; aside?: React.ReactNode }) {
    return (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
            <div>
                <h2 className="text-4xl font-extrabold leading-[1] tracking-[-0.035em] text-content sm:text-6xl">{tr(title)}</h2>
                <p className="mt-4 max-w-[48ch] text-lg leading-relaxed text-content-secondary sm:text-xl">{tr(desc)}</p>
            </div>
            {aside}
        </div>
    );
}

/* ───────── Раздел 1: Rebranding Offer ───────── */
function RebrandingPanel({ tr }: { tr: Tr }) {
    const days = useDaysLeft();
    const ended = days === 0;

    return (
        <>
            <PanelHead
                title="Rebranding Offer"
                desc="Лимитированная скидка в честь ребрендинга Asman Tech."
                tr={tr}
                aside={
                    <div aria-live="polite" className="w-full rounded-3xl border-2 border-ink p-6 sm:w-72">
                        {ended ? (
                            <p className="text-xl font-extrabold tracking-tight text-content">{tr("Акция завершена")}</p>
                        ) : (
                            <p className="flex items-baseline gap-3 text-content">
                                <span
                                    className={`font-serif text-6xl font-bold leading-none tabular-nums transition-opacity ${
                                        days === null ? "opacity-0" : "opacity-100"
                                    }`}
                                >
                                    {days ?? 0}
                                </span>
                                <span className="text-base font-semibold leading-tight">
                                    {tr(daysWord(days ?? 0))}
                                    <br />
                                    {tr("до конца акции")}
                                </span>
                            </p>
                        )}
                        <p className="mt-4 border-t border-line pt-3 text-sm text-content-muted">
                            {tr("Последний день — 31 декабря 2026, 23:59")}
                        </p>
                    </div>
                }
            />

            <div className="mt-14 grid gap-12 sm:mt-20 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
                {REBRANDING_GROUPS.map((group) => (
                    <div key={group.id}>
                        <h3 className="border-b-2 border-ink pb-4 text-lg font-bold text-content">{tr(group.title)}</h3>
                        <ul className="divide-y divide-line">
                            {group.services.map((s) => (
                                <li key={s.name} className="flex items-center gap-4 py-5">
                                    <span className="w-7 shrink-0 font-mono text-xs text-content-subtle">{s.num}</span>
                                    <span className="min-w-0 flex-1 text-lg font-semibold leading-snug text-content sm:text-xl">
                                        {tr(s.name)}
                                    </span>
                                    <span className="font-serif text-2xl font-bold text-accent tabular-nums sm:text-3xl">
                                        {tr(s.discount)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
}

/* ───────── Раздел 2: Returning Client ───────── */
function ReturningPanel({ tr }: { tr: Tr }) {
    return (
        <>
            <PanelHead
                title="Returning Client"
                desc="Специальная скидка для существующих клиентов на следующий проект."
                tr={tr}
            />

            {/* Путь к скидке: три шага с соединительной линией */}
            <ol className="mt-14 grid gap-10 sm:mt-20 md:grid-cols-3 md:gap-0">
                {RETURNING_STEPS.map((step, i) => {
                    const last = i === RETURNING_STEPS.length - 1;
                    return (
                        <li key={step.title} className="relative pl-16 md:pl-0 md:pr-10 md:pt-16">
                            {!last && (
                                <span
                                    aria-hidden="true"
                                    className="absolute left-5 top-12 h-[calc(100%-1rem)] w-0.5 bg-neutral-200 md:left-12 md:right-0 md:top-5 md:h-0.5 md:w-auto"
                                />
                            )}
                            <span
                                className={`absolute left-0 top-0 grid size-10 place-items-center rounded-full border-2 text-sm font-bold ${
                                    last ? "border-accent bg-accent text-white" : "border-ink bg-white text-content"
                                }`}
                            >
                                {last ? <Check size={18} aria-hidden="true" /> : i + 1}
                            </span>
                            <h3 className={`text-xl font-bold tracking-tight sm:text-2xl ${last ? "text-accent" : "text-content"}`}>
                                {tr(step.title)}
                            </h3>
                            <p className="mt-2 max-w-[30ch] text-base leading-relaxed text-content-secondary">{tr(step.text)}</p>
                        </li>
                    );
                })}
            </ol>

            <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-neutral-200 sm:mt-16 md:grid-cols-3">
                {RETURNING_NOTES.map((n) => (
                    <div key={n.title} className="bg-white p-6 sm:p-7">
                        <p className="text-lg font-bold leading-snug text-content">{tr(n.title)}</p>
                        <p className="mt-1 text-base text-content-muted">{tr(n.text)}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

/* ───────── Окно с подробностями программы ───────── */
function ProgramModal({ program, onClose, tr }: { program: Program; onClose: () => void; tr: Tr }) {
    const ref = useRef<HTMLDivElement>(null);
    const closeRef = useRef(onClose);
    closeRef.current = onClose;
    const titleId = `program-${program.id}-title`;

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

    return createPortal(
        <div
            data-lenis-prevent="true"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
            className="of-fade fixed inset-0 z-50 flex items-end justify-center bg-ink/60 backdrop-blur-sm sm:items-center sm:p-6"
        >
            <div
                ref={ref}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                className="of-pop relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[32px] bg-white text-content shadow-[0_40px_120px_-20px_rgba(0,0,0,0.45)] sm:rounded-[36px]"
            >
                <button
                    type="button"
                    data-autofocus
                    onClick={onClose}
                    aria-label={tr("Закрыть")}
                    className="absolute right-4 top-4 z-10 grid size-11 cursor-pointer place-items-center rounded-full bg-surface-muted text-content-secondary transition-colors hover:bg-neutral-200 hover:text-content focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent sm:right-6 sm:top-6"
                >
                    <X size={20} />
                </button>

                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-8 pt-8 sm:px-12 sm:pb-12 sm:pt-12">
                    {/* Шапка: программа и условия */}
                    <div className="pr-12">
                        <h2 id={titleId} className="text-3xl font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-5xl">
                            {tr(program.name)}
                        </h2>
                        <p className="mt-3 text-lg text-content-secondary sm:text-xl">{tr(program.desc)}</p>
                    </div>
                    <p
                        className={`mt-8 border-b-2 border-ink pb-6 font-serif text-4xl font-bold leading-none tracking-tight sm:text-5xl ${
                            program.numeric ? "text-accent" : "text-content"
                        }`}
                    >
                        {tr(program.terms)}
                    </p>

                    {/* Что входит */}
                    <ul className="divide-y divide-line">
                        {program.items.map((item) => (
                            <li key={item} className="flex items-center gap-4 py-5">
                                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                                    <Check size={16} aria-hidden="true" />
                                </span>
                                <span className="text-lg font-semibold leading-snug sm:text-xl">{tr(item)}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Условия */}
                    {program.conditions && (
                        <div className="mt-6 rounded-3xl bg-ink p-7 text-white sm:p-8">
                            <h3 className="text-sm font-semibold text-content-subtle">{tr("Условия")}</h3>
                            <ul className="mt-4 space-y-3">
                                {program.conditions.map((c) => (
                                    <li key={c} className="flex gap-3 text-base font-semibold leading-snug sm:text-lg">
                                        <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-[#4ADE80]" />
                                        <span>{tr(c)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="flex shrink-0 justify-end border-t border-line px-6 py-5 sm:px-12">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full cursor-pointer rounded-2xl bg-ink px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-ink-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:w-auto"
                    >
                        {tr("Закрыть")}
                    </button>
                </div>
            </div>
        </div>,
        document.body,
    );
}

/* ───────── Раздел 3: Специальные программы ───────── */
function ProgramsPanel({ tr }: { tr: Tr }) {
    const [openId, setOpenId] = useState<string | null>(null);
    const open = SPECIAL_PROGRAMS.find((p) => p.id === openId) ?? null;

    return (
        <>
            <h2 className="text-4xl font-extrabold leading-[1] tracking-[-0.035em] text-content sm:text-6xl">
                {tr("Специальные программы")}
            </h2>

            <div className="mt-12 overflow-x-auto sm:mt-16">
                <table className="w-full min-w-[560px] text-left">
                    <thead>
                    <tr className="border-b-2 border-ink text-sm text-content-muted">
                        <th scope="col" className="pb-4 font-semibold">{tr("Программа")}</th>
                        <th scope="col" className="pb-4 pr-16 text-right font-semibold">{tr("Условия")}</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                    {SPECIAL_PROGRAMS.map((p) => (
                        <tr key={p.id}>
                            <th scope="row" className="py-8 pr-6 align-middle font-normal sm:py-10">
                                <span className="block text-xl font-bold tracking-tight text-content sm:text-3xl">{tr(p.name)}</span>
                                <span className="mt-1.5 block text-base text-content-muted sm:text-lg">{tr(p.desc)}</span>
                            </th>
                            <td className="py-8 align-middle sm:py-10">
                                <div className="flex items-center justify-end gap-4 sm:gap-5">
                                        <span
                                            className={`whitespace-nowrap text-right font-serif text-2xl font-bold tracking-tight sm:text-4xl ${
                                                p.numeric ? "text-accent" : "text-content"
                                            }`}
                                        >
                                            {tr(p.terms)}
                                        </span>
                                    <button
                                        type="button"
                                        onClick={() => setOpenId(p.id)}
                                        aria-haspopup="dialog"
                                        aria-label={`${tr("Подробнее")}: ${tr(p.name)}`}
                                        className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border-2 border-ink text-content transition-colors hover:bg-ink hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                                    >
                                        <ArrowUpRight size={18} aria-hidden="true" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {open && <ProgramModal program={open} onClose={() => setOpenId(null)} tr={tr} />}
        </>
    );
}

export default function OffersPage() {
    const tr = useTr();
    const [active, setActive] = useState<TabId>("rebranding");
    const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

    /* Открываем раздел из ссылки: /offers#returning */
    useEffect(() => {
        const fromHash = window.location.hash.slice(1);
        if (TABS.some((t) => t.id === fromHash)) setActive(fromHash as TabId);
    }, []);

    const select = (id: TabId, focus = false) => {
        setActive(id);
        window.history.replaceState(null, "", `#${id}`);
        if (focus) {
            const el = tabRefs.current[id];
            el?.focus();
            el?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
        }
    };

    /* Стрелки переключают купоны, как в стандартных вкладках */
    const onKeyDown = (e: React.KeyboardEvent) => {
        const i = TABS.findIndex((t) => t.id === active);
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            e.preventDefault();
            select(TABS[(i + 1) % TABS.length].id, true);
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
            e.preventDefault();
            select(TABS[(i - 1 + TABS.length) % TABS.length].id, true);
        }
    };

    return (
        <main className="mx-auto max-w-[1280px] px-5 pb-28 pt-28 sm:px-10 sm:pt-32">
            <style>{`
                /* Купон: вырезы-полукруги по бокам на линии отрыва */
                .of-coupon{
                    --cut: calc(100% - 76px);
                    -webkit-mask:
                        radial-gradient(circle at 0 var(--cut), #0000 13px, #000 13.5px),
                        radial-gradient(circle at 100% var(--cut), #0000 13px, #000 13.5px);
                    -webkit-mask-composite: source-in;
                    mask:
                        radial-gradient(circle at 0 var(--cut), #0000 13px, #000 13.5px),
                        radial-gradient(circle at 100% var(--cut), #0000 13px, #000 13.5px);
                    mask-composite: intersect;
                }
                @keyframes of-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
                .of-in{animation:of-in .5s cubic-bezier(.2,.8,.2,1)}
                @keyframes of-fade{from{opacity:0}to{opacity:1}}
                @keyframes of-pop{from{opacity:0;transform:translateY(16px) scale(.98)}to{opacity:1;transform:none}}
                .of-fade{animation:of-fade .2s ease-out}
                .of-pop{animation:of-pop .32s cubic-bezier(.2,.8,.2,1)}
                @media (prefers-reduced-motion:reduce){.of-in,.of-fade,.of-pop{animation:none}}
            `}</style>

            {/* ── HERO ── */}
            <h1 className="mt-10 text-[clamp(2.75rem,7.4vw,6.5rem)] font-extrabold leading-[0.95] tracking-[-0.045em] text-content sm:mt-14">
                {tr("Спецпредложения.")}
            </h1>

            {/* ── КУПОНЫ: выбор типа скидки ── */}
            <div
                role="tablist"
                aria-label={tr("Виды скидок")}
                onKeyDown={onKeyDown}
                className="-mx-5 mt-12 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mt-16 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden"
            >
                {TABS.map((t) => {
                    const on = t.id === active;
                    return (
                        <button
                            key={t.id}
                            ref={(el) => {
                                tabRefs.current[t.id] = el;
                            }}
                            type="button"
                            role="tab"
                            id={`tab-${t.id}`}
                            aria-selected={on}
                            aria-controls={`panel-${t.id}`}
                            tabIndex={on ? 0 : -1}
                            onClick={() => select(t.id)}
                            className={`group w-[82%] shrink-0 cursor-pointer snap-start rounded-3xl text-left transition-transform duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:w-[60%] md:w-auto ${
                                on ? "md:-translate-y-2" : "hover:-translate-y-1"
                            }`}
                        >
                            <div
                                className={`of-coupon relative flex min-h-[300px] flex-col rounded-3xl transition-colors duration-300 sm:min-h-[330px] ${
                                    on ? "bg-ink text-white" : "bg-surface-muted text-content group-hover:bg-neutral-200/80"
                                }`}
                            >
                                {/* Основная часть купона */}
                                <div className="flex flex-1 flex-col p-7">
                                    <span className={`text-sm font-medium ${on ? "text-content-subtle" : "text-content-muted"}`}>{tr(t.sub)}</span>
                                    <span className="mt-1.5 text-2xl font-bold leading-tight tracking-tight">{tr(t.name)}</span>
                                    <span className={`mt-auto flex items-baseline gap-2 pt-8 ${on ? "text-[#4ADE80]" : "text-accent"}`}>
                                        <span className="font-serif text-7xl font-bold leading-[0.85] tracking-tight tabular-nums sm:text-8xl">
                                            {t.figure}
                                        </span>
                                        <span className="text-xl font-extrabold tracking-tight">{tr(t.unit)}</span>
                                    </span>
                                </div>

                                {/* Линия отрыва */}
                                <span
                                    aria-hidden="true"
                                    className={`absolute inset-x-6 bottom-[76px] border-t-2 border-dashed ${on ? "border-white/20" : "border-line-strong"}`}
                                />

                                {/* Корешок */}
                                <div className="flex h-[76px] shrink-0 items-center justify-between px-7">
                                    <span className={`text-sm font-semibold ${on ? "text-white" : "text-neutral-700"}`}>{tr(t.stub)}</span>
                                    <span
                                        className={`grid size-9 place-items-center rounded-full transition-colors ${
                                            on ? "bg-[#4ADE80] text-content" : "bg-white text-content-muted"
                                        }`}
                                    >
                                        <ArrowDown size={16} aria-hidden="true" className={on ? "" : "-rotate-90"} />
                                    </span>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* ── АКТИВНЫЙ РАЗДЕЛ ── */}
            <section
                key={active}
                role="tabpanel"
                id={`panel-${active}`}
                aria-labelledby={`tab-${active}`}
                tabIndex={0}
                className="of-in mt-16 border-t-2 border-ink pt-12 focus-visible:outline-none sm:mt-20 sm:pt-16"
            >
                {active === "rebranding" && <RebrandingPanel tr={tr} />}
                {active === "returning" && <ReturningPanel tr={tr} />}
                {active === "programs" && <ProgramsPanel tr={tr} />}
            </section>

            {/* ── ФИНАЛ: как зафиксировать скидку ── */}
            <section className="mt-24 overflow-hidden rounded-[40px] bg-ink text-white sm:mt-32">
                <div className="p-8 sm:p-12 lg:p-16">
                    <h2 className="text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-6xl">
                        {tr("Как зафиксировать скидку")}
                    </h2>
                    <ol className="mt-10 grid gap-8 sm:mt-14 md:grid-cols-3 md:gap-10">
                        {STEPS.map((step) => (
                            <li key={step.num} className="border-t border-white/15 pt-6">
                                <span className="font-mono text-sm font-bold text-accent-bright">{step.num}</span>
                                <h3 className="mt-4 text-xl font-bold tracking-tight sm:text-2xl">{tr(step.title)}</h3>
                                <p className="mt-2 text-base leading-relaxed text-content-subtle">{tr(step.text)}</p>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="relative flex flex-col gap-8 border-t border-white/10 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between lg:p-16">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-40 -left-24 size-[460px] rounded-full bg-accent/20 blur-[120px]"
                    />
                    <div className="relative flex items-center gap-3 text-base font-semibold text-neutral-200">
                        <ShieldCheck size={20} className="shrink-0 text-accent-bright" aria-hidden="true" />
                        <span>{tr("Без предоплаты до подписания NDA и сметы.")}</span>
                    </div>
                    <Link
                        href="/contacts"
                        className="group relative inline-flex w-full shrink-0 items-center justify-between gap-6 rounded-2xl bg-white py-2 pl-7 pr-2 text-base font-semibold text-content transition-colors duration-200 hover:bg-accent-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:scale-[0.99] sm:w-auto"
                    >
                        <span>{tr("Зафиксировать скидку")}</span>
                        <span className="grid size-12 place-items-center rounded-xl bg-accent text-white transition-transform duration-300 group-hover:rotate-45">
                            <ArrowUpRight size={20} aria-hidden="true" />
                        </span>
                    </Link>
                </div>
            </section>
        </main>
    );
}