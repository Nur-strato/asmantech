"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
    ArrowLeft,
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
        >
            <path d="M5 20.5h2V10.86L2 7.11V17.5C2 19.16 3.34 20.5 5 20.5z" fill="#4285F4" />
            <path d="M19 20.5h-2V10.86L22 7.11V17.5c0 1.66-1.34 3-3 3z" fill="#34A853" />
            <path d="M17 5.14V10.86L22 7.11V6.5c0-1.88-2.15-2.95-3.66-1.82L17 5.14z" fill="#FBBC04" />
            <path d="M7 5.14V10.86L2 7.11V6.5c0-1.88 2.15-2.95 3.66-1.82L7 5.14z" fill="#C5221F" />
            <path d="M7 5.14v5.72L12 14.5l5-3.64V5.14l-5 3.75-5-3.75z" fill="#EA4335" />
        </svg>
    );
}

function FlagKG() {
    return (
        <svg className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0" viewBox="0 0 600 400">
            <rect width="600" height="400" fill="#E8112D" />
            <circle cx="300" cy="200" r="70" fill="#FFE600" />
            <circle cx="300" cy="200" r="54" fill="#E8112D" />
            <circle cx="300" cy="200" r="42" fill="#FFE600" />
        </svg>
    );
}

function FlagKZ() {
    return (
        <svg className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0" viewBox="0 0 600 400">
            <rect width="600" height="400" fill="#00AFCA" />
            <circle cx="300" cy="200" r="45" fill="#FFE600" />
        </svg>
    );
}

function FlagUZ() {
    return (
        <svg className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0" viewBox="0 0 600 400">
            <rect width="600" height="133.3" fill="#1EB53A" />
            <rect y="133.3" width="600" height="133.3" fill="#FFFFFF" />
            <rect y="266.6" width="600" height="133.3" fill="#0099B5" />
        </svg>
    );
}

function FlagRU() {
    return (
        <svg className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0" viewBox="0 0 600 400">
            <rect width="600" height="133.3" fill="#FFFFFF" />
            <rect y="133.3" width="600" height="133.3" fill="#0039A6" />
            <rect y="266.6" width="600" height="133.3" fill="#D52B1E" />
        </svg>
    );
}

function FlagUS() {
    return (
        <svg className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0" viewBox="0 0 600 400">
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
        <svg className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0" viewBox="0 0 600 400">
            <rect width="600" height="266.6" fill="#C8313E" />
            <rect y="266.6" width="600" height="133.4" fill="#00965E" />
        </svg>
    );
}

function FlagAM() {
    return (
        <svg className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0" viewBox="0 0 600 400">
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
    indexStr: string;
    title: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
}

const SERVICES: ServiceItem[] = [
    {
        id: "web-dev",
        indexStr: "01",
        title: "Website Development",
        icon: Code2,
    },
    {
        id: "mobile-apps",
        indexStr: "02",
        title: "Mobile Apps",
        icon: Smartphone,
    },
    {
        id: "3d-design",
        indexStr: "03",
        title: "3D Design",
        icon: Box,
    },
    {
        id: "ai-chatbots",
        indexStr: "04",
        title: "AI Chatbots",
        icon: Bot,
    },
    {
        id: "security-audit",
        indexStr: "05",
        title: "Security & Quality Audit",
        icon: ShieldCheck,
    },
    {
        id: "seo-opt",
        indexStr: "06",
        title: "SEO Optimization",
        icon: Search,
    },
    {
        id: "other",
        indexStr: "07",
        title: "Other",
        icon: Layers,
    },
];

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

    const dropdownRef = useRef<HTMLDivElement>(null);
    const currentCountry = COUNTRIES[countryIndex];
    const isInternational = currentCountry.code !== "+996";

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
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

    return (
        <main className="max-w-[1544px] mx-auto px-6 sm:px-10 pt-28 pb-32 space-y-20 bg-white text-neutral-900 font-sans ">

            {/* Навигация */}
            <div className="flex items-center justify-between border-b border-neutral-200/80 pb-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-neutral-950 transition-colors group"
                >
                    <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
                    <span>{t("backHome")}</span>
                </Link>


            </div>

            {/* Заголовок страницы */}
            <div className="space-y-4 max-w-3xl">
                <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-neutral-950 leading-[1.05]">
                    {t("title")}
                </h1>

                <p className="text-neutral-600 text-[18px] sm:text-[20px] leading-relaxed font-normal">
                    {t("subtitle")}
                </p>
            </div>

            {/* Основная сетка */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                {/* Левая колонка: Форма */}
                <div className="lg:col-span-7 space-y-8">

                    {isSubmitted ? (
                        <div className="p-10 sm:p-14 rounded-[32px] bg-white border-2 border-neutral-900 text-center space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                                <Check size={36} strokeWidth={2.5} />
                            </div>

                            <h3 className="text-3xl font-extrabold text-neutral-950 tracking-tight">
                                {t("successTitle")}
                            </h3>

                            {/* Каждая деталь строго в своем отдельном ряду */}
                            <div className="flex flex-col items-center gap-1.5 text-neutral-600 text-[15px] sm:text-base leading-relaxed">
                                <div>{t("successTeam")}</div>
                                <div>
                                    {t("successPhone")}{" "}
                                    <strong className="font-mono text-neutral-950 font-bold">
                                        {currentCountry.code} {formattedPhoneNumber}
                                    </strong>
                                </div>
                                <div>
                                    {t("successMethod")}{" "}
                                    <strong className="text-neutral-950 font-bold">
                                        {contactPreference === "message"
                                            ? t("methodMessage")
                                            : t("methodCall")}
                                    </strong>
                                </div>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsSubmitted(false);
                                        setRawDigits("");
                                        setClientName("");
                                        setAboutDetails("");
                                    }}
                                    className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-600 hover:text-neutral-950 underline underline-offset-4 cursor-pointer"
                                >
                                    {t("sendAnother")}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8">

                            {/* 01 ВЫБОР УСЛУГИ */}
                            <div className="rounded-[32px] bg-white border border-neutral-300/90 p-6 sm:p-8 space-y-4 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
                                <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
                                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-900 font-bold">
                                        {t("step1")}
                                    </span>
                                    <span className="inline-flex items-center gap-1 text-[12px] font-mono font-bold tracking-wider text-neutral-900 uppercase">
                                        <span className="text-rose-500">*</span>
                                        <span>{t("required")}</span>
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                                    {SERVICES.map((s) => {
                                        const Icon = s.icon;
                                        const isSelected = selectedServiceId === s.id;
                                        const isOther = s.id === "other";

                                        return (
                                            <button
                                                key={s.id}
                                                type="button"
                                                onClick={() => setSelectedServiceId(s.id)}
                                                className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 group ${
                                                    isOther ? "sm:col-span-2" : ""
                                                } ${
                                                    isSelected
                                                        ? "bg-neutral-950 text-white border-neutral-950 shadow-md scale-[1.005]"
                                                        : "bg-neutral-50/70 text-neutral-900 border-neutral-200 hover:border-neutral-400 hover:bg-white"
                                                }`}
                                            >
                                                <div className="flex items-center gap-3.5 min-w-0">
                                                    <span className="font-mono text-sm font-bold shrink-0 text-neutral-400">
                                                        {s.indexStr}
                                                    </span>
                                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                                                        isSelected ? "bg-white/10 border-white/20 text-white" : "bg-white border-neutral-200 text-neutral-700"
                                                    }`}>
                                                        <Icon size={19} />
                                                    </div>
                                                    <span className="text-[15px] sm:text-[16px] font-bold tracking-tight truncate">
                                                        {tService(s.id)}
                                                    </span>
                                                </div>
                                                <ArrowUpRight
                                                    size={16}
                                                    className={`shrink-0 transition-transform ${
                                                        isSelected
                                                            ? "text-white translate-x-0.5 -translate-y-0.5"
                                                            : "text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                                    }`}
                                                />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* 02 ВАШЕ ИМЯ + ОПИСАНИЕ ПРОЕКТА */}
                            <div className="rounded-[32px] bg-white border border-neutral-300/90 p-6 sm:p-8 space-y-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
                                <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
                                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-900 font-bold">
                                        {t("step2")}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-[14px] font-bold text-neutral-900">
                                        {t("nameLabel")} <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder={t("namePlaceholder")}
                                        value={clientName}
                                        onChange={(e) => {
                                            setClientName(e.target.value);
                                            if (errorMessage) setErrorMessage(null);
                                        }}
                                        className="w-full px-5 py-4 rounded-2xl bg-neutral-50/50 border-2 border-neutral-200 text-[15px] sm:text-base text-neutral-950 placeholder:text-neutral-400 focus:outline-hidden focus:border-neutral-950 focus:bg-white transition-all shadow-2xs"
                                    />
                                </div>

                                <div className="space-y-2 pt-1">
                                    <div className="flex items-center justify-between">
                                        <label className="block text-[14px] font-bold text-neutral-900">
                                            {t("aboutLabel")}
                                        </label>
                                        <span className="inline-flex items-center gap-1 text-[12px] font-mono font-bold tracking-wider text-neutral-900 uppercase">
                                            <span className="text-rose-500">*</span>
                                            <span>{t("optional")}</span>
                                        </span>
                                    </div>
                                    <textarea
                                        rows={3}
                                        placeholder={t("aboutPlaceholder")}
                                        value={aboutDetails}
                                        onChange={(e) => setAboutDetails(e.target.value)}
                                        className="w-full px-5 py-4 rounded-2xl bg-neutral-50/50 border-2 border-neutral-200 text-[15px] sm:text-base text-neutral-950 placeholder:text-neutral-400 focus:outline-hidden focus:border-neutral-950 focus:bg-white transition-all resize-none shadow-2xs leading-relaxed"
                                    />
                                </div>
                            </div>

                            {/* 03 НОМЕР ТЕЛЕФОНА / WHATSAPP */}
                            <div className="rounded-[32px] bg-white border border-neutral-300/90 p-6 sm:p-8 space-y-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">

                                {/* Шапка блока */}
                                <div className="pb-1 border-b border-neutral-100">
                                    <label className="text-xs font-mono uppercase tracking-widest text-neutral-900 font-bold">
                                        {t("step3")}
                                    </label>
                                </div>

                                {/* ОСНОВНОЙ ВИДЖЕТ */}
                                <div className="rounded-[24px] bg-white border border-neutral-200/90 p-4 sm:p-5 space-y-3.5 shadow-2xs">

                                    {/* 1. СТРОКА ВВОДА НОМЕРА И КНОПКА ПОДТВЕРЖДЕНИЯ */}
                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

                                        {/* Инпут со страной */}
                                        <div className="relative flex-1 flex items-center bg-white rounded-2xl border border-neutral-300 focus-within:border-neutral-950 focus-within:ring-2 focus-within:ring-neutral-100 transition-all px-3.5 py-2.5 shadow-2xs">

                                            {/* Кнопка флага + кода */}
                                            <button
                                                type="button"
                                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                className="inline-flex items-center gap-2 pr-2.5 hover:opacity-80 transition-opacity cursor-pointer shrink-0"
                                            >
                                                <div className="flex items-center gap-2">
                                                    {currentCountry.flag}
                                                    <span className="font-bold text-[15px] font-mono text-neutral-900">
                                                        {currentCountry.code}
                                                    </span>
                                                </div>
                                                <ChevronDown size={14} className={`text-neutral-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                                            </button>

                                            {/* Вертикальный разделитель */}
                                            <div className="h-6 w-px bg-neutral-200 mx-2 shrink-0" />

                                            {/* Инпут номера */}
                                            <input
                                                type="tel"
                                                required
                                                value={formattedPhoneNumber}
                                                onChange={handlePhoneChange}
                                                placeholder={currentCountry.mask}
                                                className="w-full text-[15px] font-mono text-neutral-900 placeholder:text-neutral-400 bg-transparent focus:outline-hidden"
                                            />

                                            {/* Дропдаун списка стран */}
                                            {isDropdownOpen && (
                                                <div
                                                    ref={dropdownRef}
                                                    className="absolute left-0 top-[115%] w-72 max-h-72 overflow-y-auto bg-white rounded-2xl border border-neutral-200 shadow-2xl p-2 z-50 space-y-1 scrollbar-thin scrollbar-thumb-neutral-200"
                                                >
                                                    {COUNTRIES.map((item, idx) => (
                                                        <button
                                                            key={item.id}
                                                            type="button"
                                                            onClick={() => {
                                                                setCountryIndex(idx);
                                                                setRawDigits("");
                                                                setIsDropdownOpen(false);
                                                            }}
                                                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-sm transition-colors cursor-pointer ${
                                                                countryIndex === idx
                                                                    ? "bg-neutral-100 font-bold text-neutral-950"
                                                                    : "hover:bg-neutral-50 text-neutral-700"
                                                            }`}
                                                        >
                                                            <div className="flex items-center gap-2.5">
                                                                {item.flag}
                                                                <span className="text-[13.5px] font-medium">{tCountry(item.id)}</span>
                                                            </div>
                                                            <span className="font-mono text-xs text-neutral-400 font-semibold">
                                                                {item.code}
                                                            </span>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Кнопка Подтвердить (с индикатором загрузки) */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-neutral-950 hover:bg-neutral-800 disabled:bg-neutral-700 text-white text-[14px] font-medium transition-all shadow-md active:scale-95 cursor-pointer disabled:cursor-not-allowed shrink-0"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 size={16} className="animate-spin" />
                                                    <span>{t("sending")}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>{t("submit")}</span>
                                                    <span className="text-[15px] font-bold">→</span>
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {/* Вывод ошибки валидации или бэкенда */}
                                    {errorMessage && (
                                        <div className="text-xs font-medium text-rose-600 px-1 pt-1">
                                            {errorMessage}
                                        </div>
                                    )}

                                    {/* 2. ПЛАШКА МЕЖДУНАРОДНОГО ЗВОНКА */}
                                    {isInternational && (
                                        <div className="flex items-center gap-2 px-1 pt-0.5 text-[13.5px] text-neutral-600 transition-opacity">
                                            <WhatsAppIcon size={17} className="text-[#25D366] shrink-0" />
                                            <span className="leading-tight">
                                                {t("international")}
                                            </span>
                                        </div>
                                    )}

                                    {/* 3. ПРЕДПОЧИТАЕМЫЙ СПОСОБ СВЯЗИ */}
                                    <div className="pt-1.5 flex flex-col sm:flex-row sm:items-center gap-3">
                                        <span className="text-[11.5px] font-mono uppercase tracking-wider text-neutral-400 font-semibold shrink-0">
                                            {t("preferredMethod")}
                                        </span>

                                        <div className="flex flex-wrap items-center gap-2.5">
                                            {/* Кнопка WhatsApp */}
                                            <button
                                                type="button"
                                                onClick={() => setContactPreference("message")}
                                                className={`h-[39.9px] inline-flex items-center gap-2.5 px-4 rounded-xl text-[12.6px] font-semibold bg-white transition-all duration-200 cursor-pointer  border-2 shrink-0 ${
                                                    contactPreference === "message"
                                                        ? "border-neutral-950 text-neutral-950 shadow-2xs"
                                                        : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                                                }`}
                                            >
                                                <WhatsAppIcon size={16.8} className="text-[#25D366] shrink-0" />
                                                <span>{t("writeWhatsapp")}</span>

                                                <div className={`w-[15.75px] h-[15.75px] rounded-full flex items-center justify-center ml-0.5 border transition-all shrink-0 ${
                                                    contactPreference === "message"
                                                        ? "bg-neutral-950 border-neutral-950 text-white"
                                                        : "border-neutral-300 bg-neutral-50"
                                                }`}>
                                                    {contactPreference === "message" && <Check size={9} strokeWidth={3} />}
                                                </div>
                                            </button>

                                            {/* Кнопка Звонок */}
                                            <button
                                                type="button"
                                                onClick={() => setContactPreference("call")}
                                                className={`h-[39.9px] inline-flex items-center gap-2.5 px-4 rounded-xl text-[12.6px] font-semibold bg-white transition-all duration-200 cursor-pointer  border-2 shrink-0 ${
                                                    contactPreference === "call"
                                                        ? "border-neutral-950 text-neutral-950 shadow-2xs"
                                                        : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                                                }`}
                                            >
                                                <PhoneCall size={14.7} className="text-blue-600 shrink-0" strokeWidth={2.2} />
                                                <span>{t("callMe")}</span>

                                                <div className={`w-[15.75px] h-[15.75px] rounded-full flex items-center justify-center ml-0.5 border transition-all shrink-0 ${
                                                    contactPreference === "call"
                                                        ? "bg-neutral-950 border-neutral-950 text-white"
                                                        : "border-neutral-300 bg-neutral-50"
                                                }`}>
                                                    {contactPreference === "call" && <Check size={9} strokeWidth={3} />}
                                                </div>
                                            </button>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </form>
                    )}

                </div>

                {/* Правая колонка: Прямые мессенджеры и правила */}
                <div className="lg:col-span-5 space-y-6">

                    <div className="rounded-[32px] bg-white border border-neutral-300/90 p-6 sm:p-8 space-y-4 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 block border-b border-neutral-100 pb-2">
                            {t("directTitle")}
                        </span>

                        <div className="space-y-3 pt-1">
                            {/* Telegram */}
                            <a
                                href="https://t.me/AsmanTech"
                                target="_blank"
                                rel="noreferrer"
                                className="group flex items-center justify-between p-4.5 rounded-2xl bg-neutral-50 hover:bg-neutral-100/90 border border-neutral-200 transition-all hover:border-neutral-400"
                            >
                                <div className="flex items-center gap-3.5">
                                    <div className="w-11 h-11 rounded-xl bg-[#2AABEE]/10 border border-[#2AABEE]/20 text-[#2AABEE] flex items-center justify-center shadow-2xs">
                                        <TelegramIcon size={22} className="text-[#2AABEE]" />
                                    </div>
                                    <div>
                                        <div className="text-[15px] font-bold text-neutral-950">Telegram</div>
                                        <div className="text-xs text-neutral-500 font-mono">@AsmanTech</div>
                                    </div>
                                </div>
                                <ArrowUpRight size={17} className="text-neutral-400 group-hover:text-neutral-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                            </a>

                            {/* WhatsApp */}
                            <a
                                href="https://wa.me/996778300405"
                                target="_blank"
                                rel="noreferrer"
                                className="group flex items-center justify-between p-4.5 rounded-2xl bg-neutral-50 hover:bg-neutral-100/90 border border-neutral-200 transition-all hover:border-neutral-400"
                            >
                                <div className="flex items-center gap-3.5">
                                    <div className="w-11 h-11 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center shadow-2xs">
                                        <WhatsAppIcon size={22} className="text-[#25D366]" />
                                    </div>
                                    <div>
                                        <div className="text-[15px] font-bold text-neutral-950">WhatsApp</div>
                                        <div className="text-xs text-neutral-500 font-mono">+996 755 275 270</div>
                                    </div>
                                </div>
                                <ArrowUpRight size={17} className="text-neutral-400 group-hover:text-neutral-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                            </a>

                            {/* Email с векторной иконкой Google Workspace Gmail */}
                            <a
                                href="mailto:Asmantech.kg@gmail.com"
                                className="group flex items-center justify-between p-4.5 rounded-2xl bg-neutral-50 hover:bg-neutral-100/90 border border-neutral-200 transition-all hover:border-neutral-400"
                            >
                                <div className="flex items-center gap-3.5">
                                    <div className="w-11 h-11 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center shadow-2xs">
                                        <GmailOfficialIcon size={22} />
                                    </div>
                                    <div>
                                        <div className="text-[15px] font-bold text-neutral-950">{t("email")}</div>
                                        <div className="text-xs text-neutral-500 font-mono">Asmantech.kg@gmail.com</div>
                                    </div>
                                </div>
                                <ArrowUpRight size={17} className="text-neutral-400 group-hover:text-neutral-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                            </a>
                        </div>
                    </div>

                    <div className="rounded-[32px] bg-neutral-50 border border-neutral-300/80 p-7 space-y-3 text-xs text-neutral-600">
                        <div className="font-mono text-neutral-950 font-bold uppercase tracking-wider flex items-center gap-2 text-[13px]">
                            <ShieldCheck size={18} className="text-neutral-950" />
                            <span>{t("privacyTitle")}</span>
                        </div>
                        <p className="leading-relaxed text-[13px] text-neutral-500">
                            {t("privacyText")}
                        </p>
                    </div>

                </div>

            </div>

        </main>
    );
}