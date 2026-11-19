"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import {
    ArrowUpRight,
    Check,
    ChevronDown,
    Code2,
    Smartphone,
    Box,
    Bot,
    ShieldCheck,
    Search,
    Layers,
    PhoneCall,
    Loader2,
} from "lucide-react";

// Крупная векторная иконка WhatsApp без круглого фона
function WhatsAppIcon({ size = 22, className = "" }: { size?: number; className?: string }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden="true"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.44 19.65L5.27 16.61L5.07 16.3C4.24 14.98 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.69 12.04 3.69C14.24 3.69 16.31 4.55 17.86 6.11C19.42 7.66 20.27 9.73 20.27 11.93C20.27 16.47 16.58 20.15 12.04 20.15ZM16.56 14.41C16.31 14.29 15.1 13.69 14.88 13.61C14.65 13.53 14.49 13.49 14.32 13.74C14.16 13.99 13.69 14.54 13.54 14.71C13.4 14.87 13.25 14.9 13 14.77C12.75 14.65 11.95 14.39 11 13.54C10.26 12.88 9.76 12.06 9.61 11.81C9.47 11.56 9.6 11.43 9.72 11.31C9.83 11.2 9.97 11.02 10.1 10.87C10.22 10.72 10.26 10.61 10.34 10.45C10.42 10.29 10.38 10.14 10.32 10.02C10.26 9.9 9.77 8.69 9.56 8.2C9.36 7.72 9.16 7.79 9.01 7.78L8.54 7.77C8.37 7.77 8.1 7.83 7.87 8.08C7.65 8.33 7 8.94 7 10.17C7 11.4 7.9 12.59 8.02 12.75C8.15 12.92 9.78 15.42 12.27 16.5C12.86 16.76 13.32 16.91 13.68 17.02C14.28 17.21 14.82 17.18 15.25 17.12C15.73 17.05 16.73 16.52 16.94 15.93C17.15 15.34 17.15 14.84 17.09 14.74C17.02 14.63 16.82 14.54 16.56 14.41Z"
            />
        </svg>
    );
}

// Чёткая векторная иконка Telegram
function TelegramIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden="true"
        >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
        </svg>
    );
}

// Официальный оригинальный вектор Google Workspace Gmail
function GmailOfficialIcon({ size = 22, className = "" }: { size?: number; className?: string }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`shrink-0 overflow-visible ${className}`}
            aria-hidden="true"
        >
            <path d="M5 20.5h2V10.86L2 7.11V17.5C2 19.16 3.34 20.5 5 20.5z" fill="#4285F4" />
            <path d="M19 20.5h-2V10.86L22 7.11V17.5c0 1.66-1.34 3-3 3z" fill="#34A853" />
            <path d="M17 5.14V10.86L22 7.11V6.5c0-1.88-2.15-2.95-3.66-1.82L17 5.14z" fill="#FBBC04" />
            <path d="M7 5.14V10.86L2 7.11V6.5c0-1.88 2.15-2.95 3.66-1.82L7 5.14z" fill="#C5221F" />
            <path d="M7 5.14v5.72L12 14.5l5-3.64V5.14l-5 3.75-5-3.75z" fill="#EA4335" />
        </svg>
    );
}

const FLAG = "w-6 h-4 rounded-[3px] shrink-0 ring-1 ring-black/10";

function FlagKG() {
    return (
        <svg className={FLAG} viewBox="0 0 600 400" aria-hidden="true">
            <rect width="600" height="400" fill="#E8112D" />
            <circle cx="300" cy="200" r="70" fill="#FFE600" />
            <circle cx="300" cy="200" r="54" fill="#E8112D" />
            <circle cx="300" cy="200" r="42" fill="#FFE600" />
        </svg>
    );
}

function FlagKZ() {
    return (
        <svg className={FLAG} viewBox="0 0 600 400" aria-hidden="true">
            <rect width="600" height="400" fill="#00AFCA" />
            <circle cx="300" cy="200" r="45" fill="#FFE600" />
        </svg>
    );
}

function FlagUZ() {
    return (
        <svg className={FLAG} viewBox="0 0 600 400" aria-hidden="true">
            <rect width="600" height="133.3" fill="#1EB53A" />
            <rect y="133.3" width="600" height="133.3" fill="#FFFFFF" />
            <rect y="266.6" width="600" height="133.3" fill="#0099B5" />
        </svg>
    );
}

function FlagRU() {
    return (
        <svg className={FLAG} viewBox="0 0 600 400" aria-hidden="true">
            <rect width="600" height="133.3" fill="#FFFFFF" />
            <rect y="133.3" width="600" height="133.3" fill="#0039A6" />
            <rect y="266.6" width="600" height="133.3" fill="#D52B1E" />
        </svg>
    );
}

function FlagUS() {
    return (
        <svg className={FLAG} viewBox="0 0 600 400" aria-hidden="true">
            <rect width="600" height="400" fill="#B22234" />
            <rect y="60" width="600" height="30" fill="#FFFFFF" />
            <rect y="120" width="600" height="30" fill="#FFFFFF" />
            <rect y="180" width="600" height="30" fill="#FFFFFF" />
            <rect y="240" width="600" height="30" fill="#FFFFFF" />
            <rect y="300" width="600" height="30" fill="#FFFFFF" />
            <rect width="250" height="190" fill="#3C3B6E" />
        </svg>
    );
}

function FlagBY() {
    return (
        <svg className={FLAG} viewBox="0 0 600 400" aria-hidden="true">
            <rect width="600" height="266.6" fill="#C8313E" />
            <rect y="266.6" width="600" height="133.4" fill="#00965E" />
        </svg>
    );
}

function FlagAM() {
    return (
        <svg className={FLAG} viewBox="0 0 600 400" aria-hidden="true">
            <rect width="600" height="133.3" fill="#D90012" />
            <rect y="133.3" width="600" height="133.3" fill="#0039A0" />
            <rect y="266.6" width="600" height="133.3" fill="#F2A800" />
        </svg>
    );
}

interface CountryConfig {
    id: string;
    code: string;
    flag: React.ReactNode;
    mask: string;
    digitsLength: number;
    format: (digits: string) => string;
}

const COUNTRIES: CountryConfig[] = [
    {
        id: "kg",
        code: "+996",
        flag: <FlagKG />,
        mask: "(700) 000-000",
        digitsLength: 9,
        format: (d) => {
            let res = `(${d.slice(0, 3)}`;
            if (d.length > 3) res += `) ${d.slice(3, 6)}`;
            if (d.length > 6) res += `-${d.slice(6, 9)}`;
            return res;
        },
    },
    {
        id: "kz",
        code: "+7",
        flag: <FlagKZ />,
        mask: "(777) 000-00-00",
        digitsLength: 10,
        format: (d) => {
            let res = `(${d.slice(0, 3)}`;
            if (d.length > 3) res += `) ${d.slice(3, 6)}`;
            if (d.length > 6) res += `-${d.slice(6, 8)}`;
            if (d.length > 8) res += `-${d.slice(8, 10)}`;
            return res;
        },
    },
    {
        id: "uz",
        code: "+998",
        flag: <FlagUZ />,
        mask: "(90) 000-00-00",
        digitsLength: 9,
        format: (d) => {
            let res = `(${d.slice(0, 2)}`;
            if (d.length > 2) res += `) ${d.slice(2, 5)}`;
            if (d.length > 5) res += `-${d.slice(5, 7)}`;
            if (d.length > 7) res += `-${d.slice(7, 9)}`;
            return res;
        },
    },
    {
        id: "ru",
        code: "+7",
        flag: <FlagRU />,
        mask: "(999) 000-00-00",
        digitsLength: 10,
        format: (d) => {
            let res = `(${d.slice(0, 3)}`;
            if (d.length > 3) res += `) ${d.slice(3, 6)}`;
            if (d.length > 6) res += `-${d.slice(6, 8)}`;
            if (d.length > 8) res += `-${d.slice(8, 10)}`;
            return res;
        },
    },
    {
        id: "us",
        code: "+1",
        flag: <FlagUS />,
        mask: "(555) 000-0000",
        digitsLength: 10,
        format: (d) => {
            let res = `(${d.slice(0, 3)}`;
            if (d.length > 3) res += `) ${d.slice(3, 6)}`;
            if (d.length > 6) res += `-${d.slice(6, 10)}`;
            return res;
        },
    },
    {
        id: "by",
        code: "+375",
        flag: <FlagBY />,
        mask: "(29) 000-00-00",
        digitsLength: 9,
        format: (d) => {
            let res = `(${d.slice(0, 2)}`;
            if (d.length > 2) res += `) ${d.slice(2, 5)}`;
            if (d.length > 5) res += `-${d.slice(5, 7)}`;
            if (d.length > 7) res += `-${d.slice(7, 9)}`;
            return res;
        },
    },
    {
        id: "am",
        code: "+374",
        flag: <FlagAM />,
        mask: "(91) 00-00-00",
        digitsLength: 8,
        format: (d) => {
            let res = `(${d.slice(0, 2)}`;
            if (d.length > 2) res += `) ${d.slice(2, 4)}`;
            if (d.length > 4) res += `-${d.slice(4, 6)}`;
            if (d.length > 6) res += `-${d.slice(6, 8)}`;
            return res;
        },
    },
];

// Подпись на экране — из словаря ServiceTitles.<id>; title уходит в заявку и остаётся английским для админки
interface ServiceItem {
    id: string;
    title: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
}

const SERVICES: ServiceItem[] = [
    { id: "web-dev", title: "Website Development", icon: Code2 },
    { id: "mobile-apps", title: "Mobile Apps", icon: Smartphone },
    { id: "3d-design", title: "3D Design", icon: Box },
    { id: "ai-chatbots", title: "AI Chatbots", icon: Bot },
    { id: "security-audit", title: "Security & Quality Audit", icon: ShieldCheck },
    { id: "seo-opt", title: "SEO Optimization", icon: Search },
    { id: "other", title: "Other", icon: Layers },
];

const FIELD =
    "w-full rounded-2xl border-2 border-line bg-white px-5 py-4 text-base text-content placeholder:text-content-subtle transition-colors focus:border-ink focus:outline-hidden sm:text-lg";

/* Заголовок шага формы */
function StepHead({ children, aside }: { children: React.ReactNode; aside?: React.ReactNode }) {
    return (
        <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2 className="text-xl font-extrabold tracking-tight text-content sm:text-2xl">{children}</h2>
            {aside}
        </div>
    );
}

/* Строка прямого контакта */
function Channel({
                     href,
                     external,
                     icon,
                     tint,
                     name,
                     handle,
                 }: {
    href: string;
    external?: boolean;
    icon: React.ReactNode;
    tint: string;
    name: string;
    handle: string;
}) {
    return (
        <a
            href={href}
            {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            className="group flex items-center gap-4 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
        >
            <span className={`grid size-12 shrink-0 place-items-center rounded-full ${tint}`}>{icon}</span>
            <span className="min-w-0 flex-1">
                <span className="block text-lg font-bold tracking-tight text-content sm:text-xl">{name}</span>
                <span className="block truncate text-sm text-content-muted sm:text-base">{handle}</span>
            </span>
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-content-muted transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                <ArrowUpRight size={17} aria-hidden="true" />
            </span>
        </a>
    );
}

export default function ContactsPage() {
    const t = useTranslations("Contacts");
    const tService = useTranslations("ServiceTitles");
    const tCountry = useTranslations("Hero.countries");
    const [countryIndex, setCountryIndex] = useState<number>(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [rawDigits, setRawDigits] = useState<string>("");

    const [selectedServiceId, setSelectedServiceId] = useState<string>("web-dev");
    const [clientName, setClientName] = useState<string>("");
    const [aboutDetails, setAboutDetails] = useState<string>("");

    // Способ связи
    const [contactPreference, setContactPreference] = useState<"message" | "call">("message");

    // Состояния отправки на бэкенд
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    // Обёртка кнопки и списка стран: клик по самой кнопке не считается «кликом снаружи»
    const countryRef = useRef<HTMLDivElement>(null);
    const currentCountry = COUNTRIES[countryIndex];
    const isInternational = currentCountry.code !== "+996";

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        function handleEscape(e: KeyboardEvent) {
            if (e.key === "Escape") setIsDropdownOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputVal = e.target.value;
        const digitsOnly = inputVal.replace(/\D/g, "").slice(0, currentCountry.digitsLength);
        setRawDigits(digitsOnly);
        if (errorMessage) setErrorMessage(null);
    };

    const formattedPhoneNumber = useMemo(() => {
        if (!rawDigits) return "";
        return currentCountry.format(rawDigits);
    }, [rawDigits, currentCountry]);

    // Единая отправка всех данных формы в Route Handler /api/leads
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        if (!clientName.trim()) {
            setErrorMessage(t("errorName"));
            return;
        }

        if (rawDigits.length < currentCountry.digitsLength) {
            setErrorMessage(t("errorPhoneDigits", { count: currentCountry.digitsLength }));
            return;
        }

        const currentService = SERVICES.find((s) => s.id === selectedServiceId);

        const payload = {
            serviceId: selectedServiceId,
            serviceName: currentService?.title || selectedServiceId,
            clientName: clientName.trim(),
            aboutDetails: aboutDetails.trim(),
            countryCode: currentCountry.code,
            phoneNumber: formattedPhoneNumber,
            contactPreference,
        };

        try {
            setIsSubmitting(true);
            const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(t("errorSend"));
            }

            setIsSubmitted(true);
        } catch {
            setErrorMessage(t("errorSend"));
        } finally {
            setIsSubmitting(false);
        }
    };

    const methodBtn = (on: boolean) =>
        `flex h-14 cursor-pointer items-center justify-center gap-2.5 rounded-2xl border-2 px-4 text-[15px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
            on
                ? "border-ink bg-ink text-white"
                : "border-line bg-white text-neutral-700 hover:border-ink"
        }`;

    return (
        <main className="mx-auto max-w-[1280px] px-5 pb-28 pt-28 font-sans text-content sm:px-10 sm:pt-32">
            <style>{`
                @keyframes ct-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
                .ct-in{animation:ct-in .5s cubic-bezier(.2,.8,.2,1)}
                @media (prefers-reduced-motion:reduce){.ct-in{animation:none}}
            `}</style>

            <div className="mt-10 grid gap-x-16 gap-y-12 sm:mt-14 lg:grid-cols-12 lg:grid-rows-[auto_1fr]">
                {/* ── Заголовок ── */}
                <header className="lg:col-span-5 lg:row-start-1">
                    <h1 className="text-[clamp(2.75rem,6.2vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.045em] text-content">
                        {t("title")}
                    </h1>
                    <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-content-secondary sm:text-xl">{t("subtitle")}</p>
                </header>

                {/* ── Форма: один лист, три шага ── */}
                <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
                    {isSubmitted ? (
                        <div className="ct-in rounded-[36px] bg-ink p-8 text-white sm:p-12 lg:p-14">
                            <span className="grid size-16 place-items-center rounded-full bg-[#4ADE80] text-content">
                                <Check size={32} strokeWidth={2.5} aria-hidden="true" />
                            </span>

                            <h2 className="mt-8 text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-6xl">
                                {t("successTitle")}
                            </h2>
                            <p className="mt-4 text-lg leading-relaxed text-content-subtle sm:text-xl">{t("successTeam")}</p>

                            <dl className="mt-10 divide-y divide-white/10 border-y border-white/10">
                                <div className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                                    <dt className="text-base text-content-subtle">{t("successPhone")}</dt>
                                    <dd className="font-mono text-xl font-bold tabular-nums sm:text-2xl">
                                        {currentCountry.code} {formattedPhoneNumber}
                                    </dd>
                                </div>
                                <div className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                                    <dt className="text-base text-content-subtle">{t("successMethod")}</dt>
                                    <dd className="text-xl font-bold sm:text-2xl">
                                        {contactPreference === "message" ? t("methodMessage") : t("methodCall")}
                                    </dd>
                                </div>
                            </dl>

                            <button
                                type="button"
                                onClick={() => {
                                    setIsSubmitted(false);
                                    setRawDigits("");
                                    setClientName("");
                                    setAboutDetails("");
                                }}
                                className="mt-10 cursor-pointer text-base font-semibold text-white underline decoration-white/30 underline-offset-[6px] transition-colors hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                            >
                                {t("sendAnother")}
                            </button>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            noValidate
                            className="rounded-[36px] border border-line bg-white shadow-[0_40px_90px_-50px_rgba(0,0,0,0.35)]"
                        >
                            {/* Шаг 1: услуга */}
                            <fieldset className="min-w-0 p-6 sm:p-10 lg:p-12">
                                <StepHead
                                    aside={
                                        <span className="shrink-0 text-sm font-medium text-content-muted">
                                            <span className="text-rose-500">*</span> {t("required")}
                                        </span>
                                    }
                                >
                                    {t("step1")}
                                </StepHead>

                                <div className="grid gap-3 sm:grid-cols-2">
                                    {SERVICES.map((s) => {
                                        const Icon = s.icon;
                                        const on = selectedServiceId === s.id;
                                        return (
                                            <button
                                                key={s.id}
                                                type="button"
                                                aria-pressed={on}
                                                onClick={() => setSelectedServiceId(s.id)}
                                                className={`flex cursor-pointer items-center gap-3.5 rounded-2xl border-2 p-4 text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                                                    s.id === "other" ? "sm:col-span-2" : ""
                                                } ${
                                                    on
                                                        ? "border-ink bg-ink text-white"
                                                        : "border-line bg-white text-content hover:border-ink"
                                                }`}
                                            >
                                                <span
                                                    className={`grid size-11 shrink-0 place-items-center rounded-xl ${
                                                        on ? "bg-white/10 text-white" : "bg-surface-muted text-neutral-700"
                                                    }`}
                                                >
                                                    <Icon size={20} />
                                                </span>
                                                <span className="min-w-0 flex-1 text-base font-bold leading-snug tracking-tight sm:text-[17px]">
                                                    {tService(s.id)}
                                                </span>
                                                <span
                                                    aria-hidden="true"
                                                    className={`grid size-6 shrink-0 place-items-center rounded-full border-2 transition-colors ${
                                                        on ? "border-[#4ADE80] bg-[#4ADE80] text-content" : "border-line-strong"
                                                    }`}
                                                >
                                                    {on && <Check size={13} strokeWidth={3.5} />}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </fieldset>

                            {/* Шаг 2: имя и описание */}
                            <fieldset className="min-w-0 border-t border-line p-6 sm:p-10 lg:p-12">
                                <StepHead>{t("step2")}</StepHead>

                                <div className="space-y-6">
                                    <div>
                                        <label htmlFor="ct-name" className="mb-2 block text-base font-semibold text-content">
                                            {t("nameLabel")} <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            id="ct-name"
                                            type="text"
                                            required
                                            autoComplete="name"
                                            placeholder={t("namePlaceholder")}
                                            value={clientName}
                                            onChange={(e) => {
                                                setClientName(e.target.value);
                                                if (errorMessage) setErrorMessage(null);
                                            }}
                                            className={FIELD}
                                        />
                                    </div>

                                    <div>
                                        <div className="mb-2 flex items-baseline justify-between gap-4">
                                            <label htmlFor="ct-about" className="block text-base font-semibold text-content">
                                                {t("aboutLabel")}
                                            </label>
                                            <span className="shrink-0 text-sm font-medium text-content-muted">{t("optional")}</span>
                                        </div>
                                        <textarea
                                            id="ct-about"
                                            rows={4}
                                            placeholder={t("aboutPlaceholder")}
                                            value={aboutDetails}
                                            onChange={(e) => setAboutDetails(e.target.value)}
                                            className={`${FIELD} resize-none leading-relaxed`}
                                        />
                                    </div>
                                </div>
                            </fieldset>

                            {/* Шаг 3: телефон и способ связи */}
                            <fieldset className="min-w-0 border-t border-line p-6 sm:p-10 lg:p-12">
                                <StepHead>{t("step3")}</StepHead>

                                {/* Поле телефона со страной */}
                                <div className="flex h-16 items-center rounded-2xl border-2 border-line bg-white pl-2 pr-5 transition-colors focus-within:border-ink">
                                    <div ref={countryRef} className="relative shrink-0">
                                        <button
                                            type="button"
                                            aria-haspopup="listbox"
                                            aria-expanded={isDropdownOpen}
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            className="flex h-12 cursor-pointer items-center gap-2 rounded-xl px-3 transition-colors hover:bg-surface-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                                        >
                                            {currentCountry.flag}
                                            <span className="font-mono text-base font-bold text-content sm:text-lg">{currentCountry.code}</span>
                                            <ChevronDown
                                                size={16}
                                                aria-hidden="true"
                                                className={`text-content-subtle transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                                            />
                                        </button>

                                        {isDropdownOpen && (
                                            <div
                                                role="listbox"
                                                className="absolute left-0 top-[calc(100%+12px)] z-50 max-h-80 w-72 space-y-1 overflow-y-auto rounded-2xl border border-line bg-white p-2 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.35)]"
                                            >
                                                {COUNTRIES.map((item, idx) => {
                                                    const on = countryIndex === idx;
                                                    return (
                                                        <button
                                                            key={item.id}
                                                            type="button"
                                                            role="option"
                                                            aria-selected={on}
                                                            onClick={() => {
                                                                setCountryIndex(idx);
                                                                setRawDigits("");
                                                                setIsDropdownOpen(false);
                                                            }}
                                                            className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl px-3.5 py-3 text-left transition-colors ${
                                                                on ? "bg-ink text-white" : "text-neutral-800 hover:bg-surface-muted"
                                                            }`}
                                                        >
                                                            <span className="flex items-center gap-3">
                                                                {item.flag}
                                                                <span className="text-[15px] font-semibold">{tCountry(item.id)}</span>
                                                            </span>
                                                            <span className={`font-mono text-sm ${on ? "text-neutral-300" : "text-content-muted"}`}>
                                                                {item.code}
                                                            </span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>

                                    <span aria-hidden="true" className="mx-2 h-7 w-px shrink-0 bg-neutral-200" />

                                    <input
                                        type="tel"
                                        required
                                        inputMode="tel"
                                        autoComplete="tel-national"
                                        aria-label={t("step3")}
                                        value={formattedPhoneNumber}
                                        onChange={handlePhoneChange}
                                        placeholder={currentCountry.mask}
                                        className="w-full min-w-0 bg-transparent font-mono text-base text-content placeholder:text-content-subtle focus:outline-hidden sm:text-lg"
                                    />
                                </div>

                                {/* Плашка международного номера */}
                                {isInternational && (
                                    <p className="mt-3 flex items-center gap-2 text-sm text-content-secondary sm:text-base">
                                        <WhatsAppIcon size={18} className="shrink-0 text-[#25D366]" />
                                        <span className="leading-tight">{t("international")}</span>
                                    </p>
                                )}

                                {/* Предпочитаемый способ связи */}
                                <p className="mb-3 mt-8 text-base font-semibold text-content">{t("preferredMethod")}</p>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <button
                                        type="button"
                                        aria-pressed={contactPreference === "message"}
                                        onClick={() => setContactPreference("message")}
                                        className={methodBtn(contactPreference === "message")}
                                    >
                                        <WhatsAppIcon size={20} className="shrink-0 text-[#25D366]" />
                                        <span>{t("writeWhatsapp")}</span>
                                    </button>
                                    <button
                                        type="button"
                                        aria-pressed={contactPreference === "call"}
                                        onClick={() => setContactPreference("call")}
                                        className={methodBtn(contactPreference === "call")}
                                    >
                                        <PhoneCall size={18} strokeWidth={2.2} className="shrink-0" aria-hidden="true" />
                                        <span>{t("callMe")}</span>
                                    </button>
                                </div>
                            </fieldset>

                            {/* Отправка */}
                            <div className="rounded-b-[35px] border-t border-line bg-neutral-50 p-6 sm:p-10 lg:px-12">
                                {errorMessage && (
                                    <p role="alert" className="mb-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 sm:text-base">
                                        {errorMessage}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="group flex w-full cursor-pointer items-center justify-between gap-6 rounded-2xl bg-ink py-2 pl-7 pr-2 text-base font-semibold text-white transition-colors hover:bg-ink-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-neutral-700 sm:text-lg"
                                >
                                    <span>{isSubmitting ? t("sending") : t("submit")}</span>
                                    <span className="grid size-12 place-items-center rounded-xl bg-accent text-white transition-transform duration-300 group-hover:rotate-45 group-disabled:rotate-0">
                                        {isSubmitting ? (
                                            <Loader2 size={20} className="animate-spin" aria-hidden="true" />
                                        ) : (
                                            <ArrowUpRight size={20} aria-hidden="true" />
                                        )}
                                    </span>
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                {/* ── Прямые контакты и конфиденциальность ── */}
                <aside className="lg:col-span-5 lg:row-start-2">
                    <h2 className="border-b-2 border-ink pb-4 text-lg font-bold text-content">{t("directTitle")}</h2>
                    <div className="divide-y divide-line border-b border-line">
                        <Channel
                            href="https://t.me/AsmanTech"
                            external
                            tint="bg-[#2AABEE]/10 text-[#2AABEE]"
                            icon={<TelegramIcon size={24} />}
                            name="Telegram"
                            handle="@AsmanTech"
                        />
                        <Channel
                            href="https://wa.me/996755275270"
                            external
                            tint="bg-[#25D366]/10 text-[#25D366]"
                            icon={<WhatsAppIcon size={24} />}
                            name="WhatsApp"
                            handle="+996 755 275 270"
                        />
                        <Channel
                            href="mailto:Asmantech.kg@gmail.com"
                            tint="bg-surface-muted"
                            icon={<GmailOfficialIcon size={22} />}
                            name={t("email")}
                            handle="Asmantech.kg@gmail.com"
                        />
                    </div>

                    <div className="mt-8 flex gap-4">
                        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                            <ShieldCheck size={20} aria-hidden="true" />
                        </span>
                        <div>
                            <p className="text-base font-bold text-content">{t("privacyTitle")}</p>
                            <p className="mt-1 max-w-[44ch] text-sm leading-relaxed text-content-muted sm:text-base">{t("privacyText")}</p>
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    );
}