"use client";

import React, { useState, useRef, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
    ArrowRight,
    ArrowUpRight,
    Check,
    Copy,
    PhoneCall,
    ChevronDown,
    AlertCircle,
    Clock,
} from "lucide-react";

interface CountryConfig {
    id: string;
    code: string;
    flag: string;
    mask: string;
    digitsLength: number;
    format: (digits: string) => string;
}

const COUNTRIES: CountryConfig[] = [
    {
        id: "kg",
        code: "+996",
        flag: "🇰🇬",
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
        flag: "🇰🇿",
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
        flag: "🇺🇿",
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
        flag: "🇷🇺",
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
        flag: "🇺🇸",
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
        flag: "🇧🇾",
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
        flag: "🇦🇲",
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

// Названия услуг берутся из словаря: ServiceTitles.<id>
const SERVICES = [
    { id: "web-dev", indexStr: "01" },
    { id: "mobile-apps", indexStr: "02" },
    { id: "3d-design", indexStr: "03" },
    { id: "ai-chatbots", indexStr: "04" },
    { id: "security-audit", indexStr: "05" },
    { id: "seo-opt", indexStr: "06" },
];

export function Hero() {
    const t = useTranslations("Hero");
    const tService = useTranslations("ServiceTitles");
    const [mode, setMode] = useState<"callback" | "direct">("callback");
    const [selectedCountry, setSelectedCountry] = useState<CountryConfig>(COUNTRIES[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [rawDigits, setRawDigits] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [isShaking, setIsShaking] = useState(false);
    const [copied, setCopied] = useState(false);

    const [activeTab, setActiveTab] = useState<"services" | "promos">("services");
    const [timeLeft, setTimeLeft] = useState(5);

    const cursorRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const directNumberDisplay = "+996 (755) 275-270";
    const directNumberRaw = "996755275270";
    const isInternational = selectedCountry.code !== "+996";

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        let mouseX = -100;
        let mouseY = -100;
        let currentX = -100;
        let currentY = -100;
        let rafId: number;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const render = () => {
            currentX += (mouseX - currentX) * 0.22;
            currentY += (mouseY - currentY) * 0.22;

            cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
            rafId = requestAnimationFrame(render);
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        rafId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(rafId);
        };
    }, []);

    const onCardEnter = () => {
        if (badgeRef.current) {
            badgeRef.current.style.opacity = "1";
            badgeRef.current.style.transform = "scale(1)";
        }
    };

    const onCardLeave = () => {
        if (badgeRef.current) {
            badgeRef.current.style.opacity = "0";
            badgeRef.current.style.transform = "scale(0.3)";
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (timeLeft === 0) {
            onCardLeave();
            setActiveTab((current) => (current === "services" ? "promos" : "services"));
            setTimeLeft(5);
        }
    }, [timeLeft]);

    const handleTabChange = (tab: "services" | "promos") => {
        onCardLeave();
        setActiveTab(tab);
        setTimeLeft(5);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleCountrySelect = (country: CountryConfig) => {
        setSelectedCountry(country);
        setRawDigits("");
        setErrorMsg(null);
        setIsDropdownOpen(false);
        if (inputRef.current) inputRef.current.focus();
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let digits = e.target.value.replace(/\D/g, "");
        digits = digits.slice(0, selectedCountry.digitsLength);
        setRawDigits(digits);
        if (errorMsg) setErrorMsg(null);
    };

    const getFormattedValue = () => {
        if (!rawDigits) return "";
        return selectedCountry.format(rawDigits);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (rawDigits.length < selectedCountry.digitsLength) {
            setErrorMsg(t("errorPhone"));
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
            if (inputRef.current) inputRef.current.focus();
            return;
        }

        setErrorMsg(null);
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setRawDigits("");
        }, 3500);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(`+${directNumberRaw}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section
            aria-label={t("sectionAria")}
            className="relative w-full bg-white text-content pt-28 sm:pt-36 lg:pt-[15vh] pb-6 overflow-x-clip"
        >
            {/* Глобальный аппаратный оптический курсор-тепловизор */}
            <div
                ref={cursorRef}
                className="pointer-events-none fixed top-0 left-0 z-50 hidden md:block will-change-transform"
                style={{ transform: "translate3d(-100px, -100px, 0)" }}
            >
                <div
                    ref={badgeRef}
                    className="flex items-center justify-center w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-transparent border-[1.8px] border-white/95 ring-1 ring-black/40 shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-200 ease-out opacity-0 scale-50"
                    style={{
                        backdropFilter: "contrast(240%) saturate(300%) hue-rotate(180deg)",
                        WebkitBackdropFilter: "contrast(240%) saturate(300%) hue-rotate(180deg)",
                    }}
                >
                    <ArrowUpRight
                        size={24}
                        strokeWidth={2.5}
                        className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                    />
                </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12 lg:gap-14 w-full">

                {/* ЛЕВАЯ КОЛОНКА */}
                <div className="w-full lg:max-w-[640px] shrink-0 flex flex-col items-start space-y-8 sm:space-y-10 lg:space-y-12">

                    {/* Заголовок */}
                    <div className="space-y-3 sm:space-y-3.5">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-muted border border-line/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                            <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-content-secondary">
                                Asman Tech
                            </span>
                        </div>
                        <h1 className="font-serif text-[46px] xs:text-[54px] sm:text-[84px] md:text-[98px] lg:text-[108px] font-normal text-ink tracking-[-0.04em] leading-[0.96] sm:leading-[0.98]">
                            {t("titleLine1")} <br />
                            {t("titleLine2")}
                        </h1>
                    </div>

                    {/* ПАПКА-ВИДЖЕТ */}
                    <div className="w-full max-w-[510px]">
                        <div className="flex items-end">
                            <button
                                type="button"
                                onClick={() => {
                                    setMode("callback");
                                    setErrorMsg(null);
                                }}
                                className={`relative px-4 sm:px-6 py-2.5 rounded-t-[18px] text-[12px] sm:text-[13px] font-medium transition-all duration-150 cursor-pointer flex items-center gap-2 ${
                                    mode === "callback"
                                        ? "bg-surface-subtle text-ink font-semibold border-t border-x border-line-cool z-10 after:absolute after:-bottom-[1px] after:left-0 after:right-0 after:h-[2px] after:bg-surface-subtle"
                                        : "bg-transparent text-content-subtle hover:text-neutral-700"
                                }`}
                            >
                                <span>{t("tabCallback")}</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setMode("direct");
                                    setErrorMsg(null);
                                }}
                                className={`relative px-4 sm:px-6 py-2.5 rounded-t-[18px] text-[12px] sm:text-[13px] font-medium transition-all duration-150 cursor-pointer flex items-center gap-2 ${
                                    mode === "direct"
                                        ? "bg-surface-subtle text-ink font-semibold border-t border-x border-line-cool z-10 after:absolute after:-bottom-[1px] after:left-0 after:right-0 after:h-[2px] after:bg-surface-subtle"
                                        : "bg-transparent text-content-subtle hover:text-neutral-700"
                                }`}
                            >
                                <span>{t("tabDirect")}</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            </button>
                        </div>

                        {/* Карточка формы */}
                        <div
                            className={`relative bg-surface-subtle p-2 sm:p-2.5 border border-line-cool shadow-ds-md transition-all ${
                                mode === "callback"
                                    ? "rounded-b-[24px] rounded-tr-[24px] rounded-tl-none"
                                    : "rounded-3xl rounded-tl-none"
                            }`}
                        >
                            {mode === "callback" ? (
                                <form onSubmit={handleSubmit} noValidate className="flex items-center justify-between gap-2 sm:gap-3">
                                    <div
                                        className={`flex items-center gap-1.5 sm:gap-2 pl-1.5 sm:pl-2 flex-1 bg-white/80 rounded-xl py-1.5 px-2.5 sm:px-3 border transition-all relative ${
                                            errorMsg
                                                ? "border-rose-400 ring-2 ring-rose-100 bg-white"
                                                : "border-[#E3E8F4] focus-within:border-indigo-400 focus-within:bg-white focus-within:shadow-xs"
                                        }`}
                                    >
                                        <div className="relative" ref={dropdownRef}>
                                            <button
                                                type="button"
                                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                className="flex items-center gap-1 sm:gap-1.5 pr-1.5 sm:pr-2 border-r border-line select-none cursor-pointer hover:opacity-80 transition-opacity"
                                                aria-label={t("chooseCountry")}
                                                aria-expanded={isDropdownOpen}
                                            >
                                                <span className="text-sm sm:text-base leading-none">{selectedCountry.flag}</span>
                                                <span className="text-[13px] sm:text-[14px] font-mono font-semibold text-ink">
                                                    {selectedCountry.code}
                                                </span>
                                                <ChevronDown className={`text-content-subtle transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} size={13} />
                                            </button>

                                            {isDropdownOpen && (
                                                <div className="absolute top-full left-0 mt-3 w-64 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-[0_16px_40px_rgba(10,26,47,0.14)] border border-[#E2E8F4] p-1.5 z-50 flex flex-col gap-0.5 animate-fadeIn max-h-60 overflow-y-auto">
                                                    {COUNTRIES.map((c) => (
                                                        <button
                                                            key={c.id}
                                                            type="button"
                                                            onClick={() => handleCountrySelect(c)}
                                                            className={`w-full px-3 py-2 rounded-xl text-left flex items-center justify-between text-xs font-medium transition-colors cursor-pointer ${
                                                                selectedCountry.id === c.id
                                                                    ? "bg-surface-subtle text-ink font-bold"
                                                                    : "text-neutral-700 hover:bg-neutral-50"
                                                            }`}
                                                        >
                                                            <div className="flex items-center gap-2.5">
                                                                <span className="text-base leading-none">{c.flag}</span>
                                                                <span>{t(`countries.${c.id}`)}</span>
                                                            </div>
                                                            <span className="font-mono text-content-subtle font-semibold">{c.code}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <input
                                            ref={inputRef}
                                            type="tel"
                                            value={getFormattedValue()}
                                            onChange={handlePhoneChange}
                                            placeholder={selectedCountry.mask}
                                            aria-label={t("phoneLabel")}
                                            className="w-full bg-transparent text-[16px] sm:text-[16px] text-ink placeholder:text-neutral-300 focus:outline-none font-mono tracking-tight font-medium pl-1 min-w-0"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className={`h-11 px-3.5 sm:px-5 rounded-xl bg-ink hover:bg-black text-white text-[12px] sm:text-[13px] font-semibold flex items-center gap-1.5 sm:gap-2 transition-all shrink-0 cursor-pointer shadow-ds-sm active:scale-95 group ${
                                            isShaking ? "animate-[shake_0.4s_ease-in-out]" : ""
                                        }`}
                                    >
                                        <span className="hidden xs:inline">{isSubmitted ? t("submitted") : t("submit")}</span>
                                        <span className="xs:hidden">{isSubmitted ? t("submittedShort") : t("submitShort")}</span>
                                        {isSubmitted ? (
                                            <Check className="text-accent-bright" size={15} />
                                        ) : (
                                            <ArrowRight className="group-hover:translate-x-0.5 transition-transform text-neutral-300" size={14} />
                                        )}
                                    </button>
                                </form>
                            ) : (
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-1.5 sm:p-1 sm:pl-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-white border border-line-cool flex items-center justify-center text-accent shadow-xs shrink-0">
                                            <PhoneCall size={17} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[15px] sm:text-[16px] font-mono font-bold text-ink tracking-tight">
                                                    {directNumberDisplay}
                                                </span>
                                                <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" title={t("lineFree")} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 w-full sm:w-auto">
                                        <button
                                            type="button"
                                            onClick={handleCopy}
                                            className="flex-1 sm:flex-initial h-10 px-3 rounded-xl bg-white hover:bg-neutral-50 border border-line-cool text-neutral-700 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs active:scale-95"
                                            title={t("copyTitle")}
                                        >
                                            {copied ? <Check className="text-accent" size={14} /> : <Copy size={14} />}
                                            <span>{copied ? t("copied") : t("copy")}</span>
                                        </button>

                                        <a
                                            href={`https://wa.me/${directNumberRaw}?text=${encodeURIComponent(t("whatsappText"))}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 sm:flex-initial h-10 px-4 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#128C7E] text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs active:scale-95 group"
                                        >
                                            <svg className="w-4 h-4 fill-[#25D366] group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                                <path d="M12.031 2C6.51 2 2.016 6.494 2.016 12.015c0 1.954.566 3.778 1.545 5.32L2 22.031l4.838-1.527c1.478.89 3.208 1.405 5.193 1.405 5.521 0 10.015-4.494 10.015-10.015C22.046 6.494 17.552 2 12.031 2zm5.82 14.288c-.244.685-1.42 1.309-1.968 1.393-.523.08-1.206.115-1.957-.127-.482-.155-1.103-.36-1.905-.71-3.37-1.464-5.576-4.9-5.744-5.127-.168-.227-1.371-1.824-1.371-3.48 0-1.656.866-2.47 1.173-2.812.308-.342.671-.428.895-.428.224 0 .448.002.643.012.207.01.482-.078.754.576.28.673.957 2.336 1.042 2.508.084.172.14.373.028.598-.112.224-.168.365-.335.565-.168.2-.352.447-.504.6-.168.168-.343.351-.147.688.196.336.872 1.439 1.872 2.33 1.285 1.144 2.368 1.5 2.704 1.668.336.168.532.14.728-.084.196-.224.84-0.98 1.064-1.316.224-.336.448-.28.756-.168.308.112 1.96.924 2.296 1.092.336.168.56.252.644.392.084.14.084.812-.16 1.497z" />
                                            </svg>
                                            <span>WhatsApp</span>
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Ошибка */}
                        {errorMsg && mode === "callback" && (
                            <div className="flex items-center gap-1.5 pl-2 pt-2.5 text-[12px] text-rose-500 font-medium animate-fadeIn">
                                <AlertCircle size={14} className="shrink-0" />
                                <span>{errorMsg}</span>
                            </div>
                        )}

                        {/* WhatsApp для международных номеров */}
                        {!errorMsg && mode === "callback" && isInternational && !isSubmitted && (
                            <div className="flex items-center gap-2 pl-2 pt-2.5 text-[11px] sm:text-[12px] text-content-muted font-medium">
                                <svg className="w-3.5 h-3.5 fill-[#25D366] shrink-0" viewBox="0 0 24 24">
                                    <path d="M12.031 2C6.51 2 2.016 6.494 2.016 12.015c0 1.954.566 3.778 1.545 5.32L2 22.031l4.838-1.527c1.478.89 3.208 1.405 5.193 1.405 5.521 0 10.015-4.494 10.015-10.015C22.046 6.494 17.552 2 12.031 2zm5.82 14.288c-.244.685-1.42 1.309-1.968 1.393-.523.08-1.206.115-1.957-.127-.482-.155-1.103-.36-1.905-.71-3.37-1.464-5.576-4.9-5.744-5.127-.168-.227-1.371-1.824-1.371-3.48 0-1.656.866-2.47 1.173-2.812.308-.342.671-.428.895-.428.224 0 .448.002.643.012.207.01.482-.078.754.576.28.673.957 2.336 1.042 2.508.084.172.14.373.028.598-.112.224-.168.365-.335.565-.168.2-.352.447-.504.6-.168.168-.343.351-.147.688.196.336.872 1.439 1.872 2.33 1.285 1.144 2.368 1.5 2.704 1.668.336.168.532.14.728-.084.196-.224.84-0.98 1.064-1.316.224-.336.448-.28.756-.168.308.112 1.96.924 2.296 1.092.336.168.56.252.644.392.084.14.084.812-.16 1.497z" />
                                </svg>
                                <span>{t("international")}</span>
                            </div>
                        )}

                        {/* Уведомление после отправки */}
                        {isSubmitted && mode === "callback" && (
                            <p className="text-[12px] text-accent font-medium pl-2 pt-2.5 flex items-center gap-1.5 animate-fadeIn">
                                <Check size={14} /> {t("success")}
                            </p>
                        )}
                    </div>

                </div>

                {/* ПРАВАЯ КОЛОНКА */}
                <div className="w-full lg:w-auto flex-1 flex flex-col items-center lg:items-end pr-0 sm:pr-1 lg:pr-3">
                    <div
                        className={`relative w-full flex flex-col justify-start transition-all duration-300 ease-out ${
                            activeTab === "promos"
                                ? "max-w-[480px] sm:max-w-[500px] lg:max-w-[520px] lg:-mt-[110px]"
                                : "max-w-[480px] mt-0"
                        }`}
                    >
                        {/* Верхняя строка управления */}
                        <div className="flex items-center justify-between pb-3.5 mb-2.5 border-b border-line/80">
                            <div className="flex items-center gap-1.5 bg-surface-muted p-1 rounded-xl">
                                <button
                                    type="button"
                                    onClick={() => handleTabChange("services")}
                                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                        activeTab === "services"
                                            ? "bg-white text-ink shadow-xs font-bold"
                                            : "bg-transparent text-content-muted hover:text-content"
                                    }`}
                                >
                                    {t("tabServices")}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleTabChange("promos")}
                                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                        activeTab === "promos"
                                            ? "bg-white text-ink shadow-xs font-bold"
                                            : "bg-transparent text-content-muted hover:text-content"
                                    }`}
                                >
                                    {t("tabPromos")}
                                </button>
                            </div>

                            {/* Иконка часов + таймер */}
                            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-content-muted select-none bg-neutral-50 px-2.5 py-1 rounded-lg border border-line/70">
                                <Clock size={13} className="text-content-subtle" />
                                <span>{timeLeft}s</span>
                            </div>
                        </div>

                        {/* ОСНОВНАЯ ОБЛАСТЬ */}
                        <div
                            className={`relative w-full flex flex-col justify-center overflow-hidden transition-all duration-300 ease-out ${
                                activeTab === "promos"
                                    ? "h-[540px] sm:h-[600px] lg:h-[650px]"
                                    : "h-[540px]"
                            }`}
                        >
                            {/* ОКНО 1: НАШИ УСЛУГИ */}
                            {activeTab === "services" && (
                                <div key="tab-services" className="w-full h-full flex flex-col justify-center divide-y divide-line/90 border-y border-line/90 animate-fadeIn">
                                    {SERVICES.map((service) => (
                                        <Link
                                            key={service.id}
                                            href="/solutions"
                                            className="group py-4 xs:py-5 sm:py-[22px] px-2 flex items-center justify-between gap-4 transition-colors duration-200 hover:bg-neutral-50/80"
                                        >
                                            <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                                                <span className="font-mono text-xs sm:text-sm font-bold text-content-subtle group-hover:text-ink transition-colors shrink-0">
                                                    {service.indexStr}
                                                </span>
                                                <span className="text-base sm:text-lg font-extrabold text-ink tracking-tight truncate">
                                                    {tService(service.id)}
                                                </span>
                                            </div>

                                            <ArrowUpRight
                                                size={18}
                                                className="text-neutral-300 group-hover:text-ink transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
                                            />
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* ОКНО 2: АКЦИИ (ЧИСТАЯ КАРТИНКА + ОПТИЧЕСКАЯ ЛИНЗА-КУРСОР) */}
                            {activeTab === "promos" && (
                                <div key="tab-promos" className="w-full h-full flex items-center justify-center animate-fadeIn py-0.5">
                                    <Link
                                        href="/contacts"
                                        onMouseEnter={onCardEnter}
                                        onMouseLeave={onCardLeave}
                                        className="relative h-full aspect-[1/1.4] rounded-2xl overflow-hidden border border-line/90 shadow-[0_12px_36px_rgba(10,26,47,0.08)] hover:shadow-xl transition-all duration-300 block bg-white md:cursor-none select-none"
                                    >
                                        <Image
                                            src="/images/sales.png"
                                            alt={t("promoAlt")}
                                            fill
                                            priority
                                            sizes="(max-width: 640px) 100vw, 520px"
                                            className="object-cover group-hover:scale-[1.015] transition-transform duration-500 ease-out"
                                        />
                                    </Link>
                                </div>
                            )}

                        </div>

                    </div>
                </div>

            </div>

            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20%, 60% { transform: translateX(-4px); }
                    40%, 80% { transform: translateX(4px); }
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(3px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>
        </section>
    );
}

export default Hero;