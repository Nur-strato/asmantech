"use client";

import React, { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Send, AtSign, Copy, Check, X, ArrowUpRight } from "lucide-react";

// Официальный оригинальный вектор WhatsApp (size = 36.8)
function WhatsAppOfficialIcon({ size = 36.8, className = "" }: { size?: number; className?: string }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`shrink-0 overflow-visible ${className}`}
        >
            <path
                d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z"
                fill="#25D366"
            />
            <path
                d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.51 0 1.48 1.08 2.91 1.23 3.11.15.2 2.13 3.25 5.16 4.56.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z"
                fill="#FFFFFF"
            />
        </svg>
    );
}

// Официальный оригинальный вектор Google Workspace Gmail (size = 36.7)
function GmailOfficialIcon({ size = 36.7, className = "" }: { size?: number; className?: string }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`shrink-0 overflow-visible ${className}`}
        >
            <path
                d="M5 20.5h2V10.86L2 7.11V17.5C2 19.16 3.34 20.5 5 20.5z"
                fill="#4285F4"
            />
            <path
                d="M19 20.5h-2V10.86L22 7.11V17.5c0 1.66-1.34 3-3 3z"
                fill="#34A853"
            />
            <path
                d="M17 5.14V10.86L22 7.11V6.5c0-1.88-2.15-2.95-3.66-1.82L17 5.14z"
                fill="#FBBC04"
            />
            <path
                d="M7 5.14V10.86L2 7.11V6.5c0-1.88 2.15-2.95 3.66-1.82L7 5.14z"
                fill="#C5221F"
            />
            <path
                d="M7 5.14v5.72L12 14.5l5-3.64V5.14l-5 3.75-5-3.75z"
                fill="#EA4335"
            />
        </svg>
    );
}

function InstagramIcon({ size = 34, className = "" }: { size?: number; className?: string }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
    );
}

interface SocialChannel {
    name: string;
    handle: string;
    copyValue: string;
    href: string;
    accentClass: string;
    icon: React.ReactNode;
    isUnderDev?: boolean;
}

const channels: SocialChannel[] = [
    {
        name: "Telegram",
        handle: "@AsmanTech",
        copyValue: "@AsmanTech",
        href: "https://t.me/AsmanTech",
        accentClass: "text-[#228BE6]",
        icon: <Send size={34} className="translate-x-0.5 -translate-y-0.5" />,
    },
    {
        name: "WhatsApp",
        handle: "+996 (755) 275-270",
        copyValue: "+996755275270",
        href: "https://wa.me/996755275270",
        accentClass: "",
        icon: <WhatsAppOfficialIcon size={36.8} />,
    },
    {
        name: "Gmail",
        handle: "asmantech.kg@gmail.com",
        copyValue: "asmantech.kg@gmail.com",
        href: "mailto:asmantech.kg@gmail.com",
        accentClass: "",
        icon: <GmailOfficialIcon size={36.7} />,
    },
    {
        name: "Instagram",
        handle: "",
        copyValue: "Under development",
        href: "#",
        accentClass: "text-[#D84C69]",
        icon: <InstagramIcon size={34} />,
        isUnderDev: true,
    },
    {
        name: "Threads",
        handle: "",
        copyValue: "Under development",
        href: "#",
        accentClass: "text-[#18181B]",
        icon: <AtSign size={34} />,
        isUnderDev: true,
    },
];

export function SocialChannels() {
    const t = useTranslations("Social");
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [activeDevChannel, setActiveDevChannel] = useState<string | null>(null);

    const triggerDevNotice = (name: string) => {
        setActiveDevChannel(name);
        setTimeout(() => {
            setActiveDevChannel((curr) => (curr === name ? null : curr));
        }, 2800);
    };

    const handleChannelClick = (e: React.MouseEvent, channel: SocialChannel) => {
        if (channel.isUnderDev) {
            e.preventDefault();
            triggerDevNotice(channel.name);
        }
    };

    const handleCopy = (e: React.MouseEvent, channel: SocialChannel, index: number) => {
        e.preventDefault();
        e.stopPropagation();

        if (channel.isUnderDev) {
            triggerDevNotice(channel.name);
            return;
        }

        navigator.clipboard.writeText(channel.copyValue);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <section id="connect" className="pt-4 select-none relative overflow-x-clip">
            {/* Лаконичная белая плашка уведомления + полупрозрачный защитный фон */}
            {activeDevChannel && (
                <>
                    <div
                        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] animate-in fade-in duration-200"
                        onClick={() => setActiveDevChannel(null)}
                    />
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[88%] max-w-[340px] sm:max-w-[360px] p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.14)] transition-all duration-200 animate-in fade-in zoom-in-95 text-center">
                        <button
                            type="button"
                            onClick={() => setActiveDevChannel(null)}
                            className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-neutral-900 active:bg-neutral-100 transition-colors cursor-pointer"
                            title={t("close")}
                            aria-label={t("closeNotice")}
                        >
                            <X size={18} />
                        </button>

                        <h4 className="font-sans text-2xl font-black text-neutral-950 tracking-tight">
                            {activeDevChannel}
                        </h4>

                        <p className="mt-2 font-sans text-base font-semibold text-neutral-500">
                            {t("underDev")}
                        </p>
                    </div>
                </>
            )}

            {/* Широкая кнопка-ссылка сверху */}
            <div className="w-full mb-8 sm:mb-10">
                <Link
                    href="/contacts"
                    className="group w-full flex items-center justify-between px-6 sm:px-8 py-4 sm:py-5 rounded-2xl sm:rounded-3xl bg-neutral-900 hover:bg-neutral-800 text-white transition-all active:scale-[0.99] shadow-sm [touch-action:manipulation]"
                >
                    <span className="text-sm sm:text-base md:text-lg text-neutral-300">
                        {t("ctaQuestion")}
                    </span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-white inline-flex items-center gap-2">
                        {t("ctaAction")}
                        <ArrowUpRight size={18} className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                </Link>
            </div>

            {/* Верхний заголовок */}
            <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
                    {t("title")}
                </h3>
            </div>

            {/* Сетка каналов: на мобильных строго в границах экрана, на десктопе вылет 110% с -mx-[5%] сохранен */}
            <div className="w-full max-w-full mx-0 pt-8 sm:pt-[9%] md:pt-20 md:w-[110%] md:max-w-[110%] md:-mx-[5%]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-7 sm:gap-8">
                    {channels.map((channel, index) => (
                        <div
                            key={channel.name}
                            className="flex flex-col items-center text-center p-3 sm:p-0 rounded-2xl sm:rounded-none bg-neutral-50/60 sm:bg-transparent border border-neutral-200/60 sm:border-none"
                        >
                            <a
                                href={channel.href}
                                onClick={(e) => handleChannelClick(e, channel)}
                                target={channel.isUnderDev ? undefined : "_blank"}
                                rel={channel.isUnderDev ? undefined : "noopener noreferrer"}
                                className="group/link inline-flex flex-col items-center cursor-pointer transition-transform duration-300 hover:-translate-y-1.5 active:scale-95 touch-manipulation"
                            >
                                <div className={`${channel.accentClass} flex items-center justify-center transition-transform duration-300 group-hover/link:scale-110`}>
                                    {channel.icon}
                                </div>

                                <h4 className="text-[19px] sm:text-[21px] font-bold text-neutral-900 tracking-tight pt-3 sm:pt-3.5">
                                    {channel.name}
                                </h4>
                            </a>

                            <div className="inline-flex items-center justify-center gap-1.5 max-w-[calc(100vw-4rem)] sm:max-w-full pt-1.5">
                                <span className="font-mono text-[13px] text-neutral-900/50 font-medium truncate select-text">
                                    {channel.handle}
                                </span>

                                {channel.handle && (
                                    <button
                                        type="button"
                                        onClick={(e) => handleCopy(e, channel, index)}
                                        title={t("copy")}
                                        aria-label={`${t("copy")} ${channel.name}`}
                                        className="p-2 sm:p-1.5 rounded-lg text-neutral-900/40 hover:text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200 active:scale-90 transition-all cursor-pointer touch-manipulation"
                                    >
                                        {copiedIndex === index ? (
                                            <Check size={14} className="text-emerald-600 stroke-[2.5]" />
                                        ) : (
                                            <Copy size={14} />
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default SocialChannels;