"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import {
    ArrowRight,
    ArrowUpRight,
    Check,
    Copy,
    PhoneCall,
    ChevronDown,
    AlertCircle,
    Code2,
    Smartphone,
    Box,
    Bot,
    ShieldCheck,
    Search,
    Layers
} from "lucide-react";

interface CountryConfig {
    name: string;
    code: string;
    flag: string;
    mask: string;
    digitsLength: number;
    format: (digits: string) => string;
}

const COUNTRIES: CountryConfig[] = [
    {
        name: "Кыргызстан",
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
        name: "Казахстан",
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
        name: "Узбекистан",
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
        name: "Россия",
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
        name: "США",
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
        name: "Беларусь",
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
        name: "Армения",
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

interface ServiceItem {
    id: string;
    indexStr: string;
    title: string;
    badge: string;
    description: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    accentColor: string;
    iconBg: string;
}

const SERVICES: ServiceItem[] = [
    {
        id: "web-dev",
        indexStr: "01",
        title: "Website Development",
        badge: "Next.js",
        description: "Разработка сайтов на Next.js с продуманной архитектурой, адаптивным дизайном и 100% гарантией качества и скорости.",
        icon: Code2,
        accentColor: "text-blue-600",
        iconBg: "bg-blue-50 border-blue-200/80 shadow-[0_2px_8px_rgba(37,99,235,0.08)]",
    },
    {
        id: "mobile-apps",
        indexStr: "02",
        title: "Mobile Apps",
        badge: "iOS & Android",
        description: "Создание приложений для iOS и Android с плавным интерфейсом и продуманным пользовательским опытом.",
        icon: Smartphone,
        accentColor: "text-emerald-600",
        iconBg: "bg-emerald-50 border-emerald-200/80 shadow-[0_2px_8px_rgba(5,150,105,0.08)]",
    },
    {
        id: "3d-design",
        indexStr: "03",
        title: "3D Design",
        badge: "Ultra Design",
        description: "Инновационный 3D-дизайн и реалистичная графика, не имеющие аналогов в Кыргызстане.",
        icon: Box,
        accentColor: "text-fuchsia-600",
        iconBg: "bg-fuchsia-50 border-fuchsia-200/80 shadow-[0_2px_8px_rgba(192,38,211,0.08)]",
    },
    {
        id: "ai-chatbots",
        indexStr: "04",
        title: "AI Chatbots",
        badge: "Web & WhatsApp",
        description: "AI-ассистенты для круглосуточной поддержки клиентов и автоматизации общения на сайтах и в WhatsApp.",
        icon: Bot,
        accentColor: "text-purple-600",
        iconBg: "bg-purple-50 border-purple-200/80 shadow-[0_2px_8px_rgba(147,51,234,0.08)]",
    },
    {
        id: "security-audit",
        indexStr: "05",
        title: "Security & Quality Audit",
        badge: "Code Audit",
        description: "Аудит безопасности и качества кода для выявления критических ошибок и повышения надёжности сайтов и приложений.",
        icon: ShieldCheck,
        accentColor: "text-rose-600",
        iconBg: "bg-rose-50 border-rose-200/80 shadow-[0_2px_8px_rgba(225,29,72,0.08)]",
    },
    {
        id: "seo-opt",
        indexStr: "06",
        title: "SEO Optimization",
        badge: "Google Rankings",
        description: "SEO-оптимизация и продвижение сайтов для повышения позиций в Google и привлечения новых клиентов.",
        icon: Search,
        accentColor: "text-indigo-600",
        iconBg: "bg-indigo-50 border-indigo-200/80 shadow-[0_2px_8px_rgba(79,70,229,0.08)]",
    },
];

export function Hero() {
    const [mode, setMode] = useState<"callback" | "direct">("callback");
    const [selectedCountry, setSelectedCountry] = useState<CountryConfig>(COUNTRIES[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [rawDigits, setRawDigits] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [isShaking, setIsShaking] = useState(false);
    const [copied, setCopied] = useState(false);

    // 3D-карусель
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [currentRotAngle, setCurrentRotAngle] = useState(0);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const cylinderRef = useRef<HTMLDivElement>(null);

    const animAngleRef = useRef(0);
    const targetAngleRef = useRef(0);
    const isTargetingRef = useRef(false);
    const lastTimestampRef = useRef<number | null>(null);

    const directNumberDisplay = "+996 (500) 275-270";
    const directNumberRaw = "996500275270";
    const isInternational = selectedCountry.code !== "+996";

    const count = SERVICES.length;
    const stepAngle = 360 / count; // 60 deg
    const radius = 195;

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    const selectService = useCallback((index: number) => {
        setActiveIndex(index);
        const desiredTarget = -index * stepAngle;
        const current = animAngleRef.current;
        const diff = ((desiredTarget - current) % 360 + 540) % 360 - 180;
        targetAngleRef.current = current + diff;
        isTargetingRef.current = true;
    }, [stepAngle]);

    useEffect(() => {
        let frameId: number;

        const updateLoop = (timestamp: number) => {
            if (lastTimestampRef.current === null) {
                lastTimestampRef.current = timestamp;
            }
            const dt = Math.min((timestamp - lastTimestampRef.current) / 1000, 0.1);
            lastTimestampRef.current = timestamp;

            if (isTargetingRef.current) {
                const diff = targetAngleRef.current - animAngleRef.current;
                if (Math.abs(diff) < 0.04) {
                    animAngleRef.current = targetAngleRef.current;
                    isTargetingRef.current = false;
                } else {
                    animAngleRef.current += diff * Math.min(dt * 7.2, 1);
                }
            } else if (!isHovered && !prefersReducedMotion) {
                const autoSpeed = 7.0;
                animAngleRef.current -= autoSpeed * dt;

                const normalizedAngle = ((-animAngleRef.current % 360) + 360) % 360;
                const closestIdx = Math.round(normalizedAngle / stepAngle) % count;
                setActiveIndex(closestIdx);
            }

            if (cylinderRef.current) {
                cylinderRef.current.style.transform = `rotateX(${animAngleRef.current}deg)`;
            }

            setCurrentRotAngle(animAngleRef.current);

            frameId = requestAnimationFrame(updateLoop);
        };

        frameId = requestAnimationFrame(updateLoop);
        return () => {
            cancelAnimationFrame(frameId);
            lastTimestampRef.current = null;
        };
    }, [isHovered, prefersReducedMotion, stepAngle, count]);

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
            setErrorMsg("Пожалуйста, укажите полный номер телефона");
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

    const activeService = useMemo(() => SERVICES[activeIndex] || SERVICES[0], [activeIndex]);

    return (
        <section
            aria-label="Hero Section"
            className="relative w-full bg-white text-neutral-900 pt-[15vh] pb-16"
        >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 lg:gap-14 w-full">

                {/* ЛЕВАЯ КОЛОНКА */}
                <div className="w-full lg:max-w-[640px] flex flex-col items-start space-y-10 sm:space-y-12">

                    {/* Заголовок */}
                    <div className="space-y-3.5">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">

                            <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-neutral-600">
                                Asman Tech
                            </span>
                        </div>
                        <h1 className="font-serif text-[64px] sm:text-[84px] md:text-[98px] lg:text-[108px] font-normal text-[#0A1A2F] tracking-[-0.04em] leading-[0.98]">
                            IT-Solutions <br />
                            for you
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
                                className={`relative px-6 py-2.5 rounded-t-[18px] text-[13px] font-medium transition-all duration-150 cursor-pointer flex items-center gap-2 ${
                                    mode === "callback"
                                        ? "bg-[#F3F5FA] text-[#0A1A2F] font-semibold border-t border-x border-[#DFE4F0] z-10 after:absolute after:-bottom-[1px] after:left-0 after:right-0 after:h-[2px] after:bg-[#F3F5FA]"
                                        : "bg-transparent text-neutral-400 hover:text-neutral-700"
                                }`}
                            >
                                <span>Заказать звонок</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setMode("direct");
                                    setErrorMsg(null);
                                }}
                                className={`relative px-6 py-2.5 rounded-t-[18px] text-[13px] font-medium transition-all duration-150 cursor-pointer flex items-center gap-2.5 ${
                                    mode === "direct"
                                        ? "bg-[#F3F5FA] text-[#0A1A2F] font-semibold border-t border-x border-[#DFE4F0] z-10 after:absolute after:-bottom-[1px] after:left-0 after:right-0 after:h-[2px] after:bg-[#F3F5FA]"
                                        : "bg-transparent text-neutral-400 hover:text-neutral-700"
                                }`}
                            >
                                <span>Набрать самому</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            </button>
                        </div>

                        {/* Карточка формы */}
                        <div
                            className={`relative bg-[#F3F5FA] p-2 sm:p-2.5 border border-[#DFE4F0] shadow-[0_12px_36px_rgba(10,26,47,0.04)] transition-all ${
                                mode === "callback"
                                    ? "rounded-b-[24px] rounded-tr-[24px] rounded-tl-none"
                                    : "rounded-[24px] rounded-tl-none"
                            }`}
                        >
                            {mode === "callback" ? (
                                <form onSubmit={handleSubmit} noValidate className="flex items-center justify-between gap-3">
                                    <div
                                        className={`flex items-center gap-2 pl-2 flex-1 bg-white/80 rounded-xl py-1.5 px-3 border transition-all relative ${
                                            errorMsg
                                                ? "border-rose-400 ring-2 ring-rose-100 bg-white"
                                                : "border-[#E3E8F4] focus-within:border-indigo-400 focus-within:bg-white focus-within:shadow-xs"
                                        }`}
                                    >
                                        <div className="relative" ref={dropdownRef}>
                                            <button
                                                type="button"
                                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                className="flex items-center gap-1.5 pr-2 border-r border-neutral-200 select-none cursor-pointer hover:opacity-80 transition-opacity"
                                                aria-label="Выбрать страну"
                                                aria-expanded={isDropdownOpen}
                                            >
                                                <span className="text-base leading-none">{selectedCountry.flag}</span>
                                                <span className="text-[14px] font-mono font-semibold text-[#0A1A2F]">
                                                    {selectedCountry.code}
                                                </span>
                                                <ChevronDown className={`text-neutral-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} size={14} />
                                            </button>

                                            {isDropdownOpen && (
                                                <div className="absolute top-full left-0 mt-3 w-64 bg-white rounded-2xl shadow-[0_16px_40px_rgba(10,26,47,0.14)] border border-[#E2E8F4] p-1.5 z-50 flex flex-col gap-0.5 animate-fadeIn max-h-60 overflow-y-auto">
                                                    {COUNTRIES.map((c) => (
                                                        <button
                                                            key={c.name}
                                                            type="button"
                                                            onClick={() => handleCountrySelect(c)}
                                                            className={`w-full px-3 py-2 rounded-xl text-left flex items-center justify-between text-xs font-medium transition-colors cursor-pointer ${
                                                                selectedCountry.name === c.name
                                                                    ? "bg-[#F3F5FA] text-[#0A1A2F] font-bold"
                                                                    : "text-neutral-700 hover:bg-neutral-50"
                                                            }`}
                                                        >
                                                            <div className="flex items-center gap-2.5">
                                                                <span className="text-base leading-none">{c.flag}</span>
                                                                <span>{c.name}</span>
                                                            </div>
                                                            <span className="font-mono text-neutral-400 font-semibold">{c.code}</span>
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
                                            aria-label="Номер телефона"
                                            className="w-full bg-transparent text-[15px] sm:text-[16px] text-[#0A1A2F] placeholder:text-neutral-300 focus:outline-none font-mono tracking-tight font-medium pl-1"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className={`h-11 px-5 rounded-xl bg-[#0A1A2F] hover:bg-black text-white text-[13px] font-semibold flex items-center gap-2 transition-all shrink-0 cursor-pointer shadow-[0_4px_14px_rgba(10,26,47,0.16)] active:scale-95 group ${
                                            isShaking ? "animate-[shake_0.4s_ease-in-out]" : ""
                                        }`}
                                    >
                                        <span>{isSubmitted ? "Принято" : "Подтвердить"}</span>
                                        {isSubmitted ? (
                                            <Check className="text-emerald-400" size={15} />
                                        ) : (
                                            <ArrowRight className="group-hover:translate-x-0.5 transition-transform text-neutral-300" size={14} />
                                        )}
                                    </button>
                                </form>
                            ) : (
                                <div className="flex items-center justify-between gap-2 p-1 pl-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-white border border-[#DFE4F0] flex items-center justify-center text-emerald-600 shadow-xs shrink-0">
                                            <PhoneCall size={17} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[16px] font-mono font-bold text-[#0A1A2F] tracking-tight">
                                                    {directNumberDisplay}
                                                </span>
                                                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Линия свободна" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={handleCopy}
                                            className="h-10 px-3 rounded-xl bg-white hover:bg-neutral-50 border border-[#DFE4F0] text-neutral-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs active:scale-95"
                                            title="Скопировать номер"
                                        >
                                            {copied ? <Check className="text-emerald-500" size={14} /> : <Copy size={14} />}
                                            <span>{copied ? "Скопировано" : "Копия"}</span>
                                        </button>

                                        <a
                                            href={`https://wa.me/${directNumberRaw}?text=${encodeURIComponent("Здравствуйте! Хочу обсудить проект с Vital Tech.")}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="h-10 px-4 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#128C7E] text-xs font-semibold flex items-center gap-2 transition-all shadow-xs active:scale-95 group"
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

                        {/* Уведомление о звонке через WhatsApp */}
                        {!errorMsg && mode === "callback" && isInternational && !isSubmitted && (
                            <div className="flex items-center gap-2 pl-2 pt-2.5 text-[11px] sm:text-[12px] text-neutral-500 font-medium">
                                <svg className="w-3.5 h-3.5 fill-[#25D366] shrink-0" viewBox="0 0 24 24">
                                    <path d="M12.031 2C6.51 2 2.016 6.494 2.016 12.015c0 1.954.566 3.778 1.545 5.32L2 22.031l4.838-1.527c1.478.89 3.208 1.405 5.193 1.405 5.521 0 10.015-4.494 10.015-10.015C22.046 6.494 17.552 2 12.031 2zm5.82 14.288c-.244.685-1.42 1.309-1.968 1.393-.523.08-1.206.115-1.957-.127-.482-.155-1.103-.36-1.905-.71-3.37-1.464-5.576-4.9-5.744-5.127-.168-.227-1.371-1.824-1.371-3.48 0-1.656.866-2.47 1.173-2.812.308-.342.671-.428.895-.428.224 0 .448.002.643.012.207.01.482-.078.754.576.28.673.957 2.336 1.042 2.508.084.172.14.373.028.598-.112.224-.168.365-.335.565-.168.2-.352.447-.504.6-.168.168-.343.351-.147.688.196.336.872 1.439 1.872 2.33 1.285 1.144 2.368 1.5 2.704 1.668.336.168.532.14.728-.084.196-.224.84-0.98 1.064-1.316.224-.336.448-.28.756-.168.308.112 1.96.924 2.296 1.092.336.168.56.252.644.392.084.14.084.812-.16 1.497z" />
                                </svg>
                                <span>Международный звонок будет произведён через WhatsApp</span>
                            </div>
                        )}

                        {/* Уведомление после отправки */}
                        {isSubmitted && mode === "callback" && (
                            <p className="text-[12px] text-emerald-600 font-medium pl-2 pt-2.5 flex items-center gap-1.5 animate-fadeIn">
                                <Check size={14} /> Заявка принята! Инженер свяжется с вами в течение 10 минут.
                            </p>
                        )}
                    </div>

                </div>

                {/* ПРАВАЯ КОЛОНКА: ИНЖЕНЕРНЫЙ 3D-БАРАБАН */}
                <div
                    className="w-full lg:w-auto flex-1 flex flex-col items-center lg:items-end  pr-1 sm:pr-3"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    role="region"
                    aria-roledescription="carousel"
                    aria-label="Направления разработки Vital Tech"
                >
                    <div className="relative w-full max-w-[480px] flex flex-col items-center">

                        {/* Фоновое свечение */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-sky-400/[0.07] via-indigo-500/[0.05] to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

                        {/* 3D СЦЕНА С ЦИЛИНДРОМ */}
                        <div className="relative w-full h-[430px] flex items-center justify-center [perspective:1400px] overflow-visible">
                            <div
                                ref={cylinderRef}
                                className="relative w-full max-w-[430px] h-[92px] [transform-style:preserve-3d] will-change-transform [transform-origin:center_center]"
                            >
                                {SERVICES.map((service, index) => {
                                    const IconComponent = service.icon;
                                    const cardAngle = stepAngle * index;
                                    const isCurrent = activeIndex === index;

                                    const totalAngle = (cardAngle + currentRotAngle) % 360;
                                    const normalized = ((totalAngle % 360) + 360) % 360;
                                    const angleFromFront = Math.abs(normalized > 180 ? normalized - 360 : normalized);

                                    // Скрываем карточки с обратной стороны
                                    const isVisible = angleFromFront < 85;

                                    return (
                                        <button
                                            key={service.id}
                                            type="button"
                                            onClick={() => selectService(index)}
                                            style={{
                                                transform: `rotateX(${cardAngle}deg) translateZ(${radius}px) translate3d(0,0,0)`,
                                                opacity: isVisible ? (isCurrent ? 1 : 0.82) : 0,
                                                pointerEvents: isVisible ? "auto" : "none",
                                                visibility: isVisible ? "visible" : "hidden",
                                            }}
                                            className={`wheel-panel absolute inset-0 rounded-[22px] px-5 py-4 flex items-center justify-between text-left cursor-pointer transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                                                isCurrent
                                                    ? "bg-white border-t border-x border-white border-b-[5px] border-b-[#94A3B8] shadow-[0_24px_50px_-12px_rgba(10,26,47,0.18)] ring-1 ring-slate-900/[0.08]"
                                                    : "bg-white border-t border-x border-white border-b-[4px] border-b-[#CBD5E1] shadow-[0_12px_28px_-10px_rgba(10,26,47,0.08)] ring-1 ring-slate-900/[0.05]"
                                            }`}
                                            role="group"
                                            aria-selected={isCurrent}
                                            aria-label={`${service.title} — ${service.badge}`}
                                        >
                                            {/* Чёткий индекс */}
                                            <span className="absolute top-2.5 left-3.5 text-[11px] font-mono font-bold tracking-wider text-slate-400 select-none">
                                                {service.indexStr}
                                            </span>

                                            <div className="flex items-center gap-4 min-w-0 pr-2 pt-1.5">
                                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${service.iconBg} ${service.accentColor}`}>
                                                    <IconComponent size={20} className="stroke-[2.2]" />
                                                </div>
                                                <div className="truncate">
                                                    <p className="text-[16px] font-extrabold text-[#0A1A2F] tracking-tight leading-tight truncate">
                                                        {service.title}
                                                    </p>
                                                </div>
                                            </div>

                                            <span className="px-3 py-1.5 rounded-lg bg-neutral-100/90 border border-neutral-200 text-[11px] font-mono font-bold text-neutral-800 shadow-2xs shrink-0 tracking-tight">
                                                {service.badge}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* ДОК ОПИСАНИЯ СПЕЦИФИКАЦИИ */}
                        <div
                            className="w-full mt-2 p-5 sm:p-6 min-h-[150px] sm:min-h-[158px] rounded-2xl bg-neutral-50/95 border border-neutral-200/80 shadow-[0_6px_20px_rgba(0,0,0,0.03)] flex items-center justify-between gap-5 transition-all duration-200"
                            aria-live="polite"
                        >
                            <div className="space-y-2 overflow-hidden flex-1">
                                <div className="flex items-center gap-2">
                                    <Layers size={15} className="text-[#D84C69] shrink-0" />
                                    <span className="text-[13px] sm:text-[14px] font-mono uppercase tracking-wider text-[#0A1A2F] font-bold">
                {activeService.title}
            </span>
                                </div>
                                <div key={activeService.id} className="animate-fadeIn">
                                    <p className="text-[14px] sm:text-[15px] text-neutral-700 leading-relaxed font-medium line-clamp-3">
                                        {activeService.description}
                                    </p>
                                </div>
                            </div>

                            <Link
                                href="/solutions"
                                aria-label={`Подробнее о ${activeService.title}`}
                                className="group/btn shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white hover:bg-neutral-100 border border-neutral-200/90 text-[#0A1A2F] shadow-2xs flex items-center justify-center transition-all active:scale-95 cursor-pointer hover:border-neutral-300"
                            >
                                <ArrowUpRight
                                    size={18}
                                    className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                                />
                            </Link>
                        </div>

                    </div>
                </div>

            </div>

            <style jsx>{`
                .wheel-panel {
                    transform-style: preserve-3d;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                    text-rendering: geometricPrecision;
                }

                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20%, 60% { transform: translateX(-4px); }
                    40%, 80% { transform: translateX(4px); }
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(2px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>
        </section>
    );
}