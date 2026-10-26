"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Cpu, ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/data/services";

export default function Solutions() {
    const router = useRouter();
    const [activeId, setActiveId] = useState<string>("web-dev");
    const [currentDateStr, setCurrentDateStr] = useState<string>("");

    useEffect(() => {
        const now = new Date();
        const month = now.toLocaleString("en-US", { month: "long" });
        const year = now.getFullYear();
        setCurrentDateStr(`${month} ${year}`);
    }, []);

    const activeService =
        SERVICES.find((s) => s.id === activeId) || SERVICES[0];
    const ActiveIcon = activeService.icon;

    // Секретный переход в админ-панель
    const handleSecretAdminAccess = () => {
        router.push("/admin");
    };

    return (
        <section
            id="solutions"
            className="w-[81vw] max-w-[81vw] mx-auto pt-28 sm:pt-36 pb-12 md:pb-20 scroll-mt-28 select-none text-neutral-900"
        >
            {/* Внешний белый контейнер */}
            <div className="w-full rounded-[36px] sm:rounded-[44px] bg-[#FFFFFF] border border-neutral-200/90 p-8 sm:p-12 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.03)] space-y-10 sm:space-y-12">

                {/* Верхняя статусная строка */}
                <div className="flex items-center justify-between text-neutral-500 font-mono text-xs sm:text-sm">
                    <span className="tracking-wider uppercase font-medium">
                        01 — 06
                    </span>
                    <span className="px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-800 font-bold uppercase tracking-widest text-[11px] sm:text-xs border border-neutral-200/80">
                        {currentDateStr || "OCTOBER 2026"}
                    </span>
                </div>

                {/* Центрированный брендовый блок с секретной кнопкой на иконке Cpu */}
                <div className="flex flex-col items-center justify-center text-center space-y-3 pt-2 pb-6">
                    <button
                        type="button"
                        onClick={handleSecretAdminAccess}
                        aria-label="Engine Status"
                        className="text-neutral-900 mb-1 focus:outline-none transition-transform active:scale-90 cursor-default select-none"
                    >
                        <Cpu size={36} strokeWidth={1.75} />
                    </button>
                    <h2 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-neutral-950 uppercase">
                        ASMAN TECH
                    </h2>
                    <p className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-neutral-400 font-medium">
                        DIGITAL ENGINEERING
                    </p>
                </div>

                {/* Основная сетка: слева кнопки направлений, справа панель с данными и картинкой */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Левая колонка: 6 направлений */}
                    <div className="lg:col-span-7 space-y-4">
                        {SERVICES.map((item) => {
                            const IconComponent = item.icon;
                            const isActive = activeId === item.id;

                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setActiveId(item.id)}
                                    className={`w-full py-5 sm:py-6 px-6 sm:px-8 rounded-[22px] border text-left transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                                        isActive
                                            ? "bg-neutral-950 border-neutral-950 text-white shadow-md"
                                            : "bg-white hover:bg-neutral-50/70 border-neutral-200/90 hover:border-neutral-300 text-neutral-900"
                                    }`}
                                >
                                    <div className="flex items-center gap-5 sm:gap-6">
                                        <span
                                            className={`font-mono text-[15px] sm:text-[17px] font-medium w-6 sm:w-7 ${
                                                isActive ? "text-neutral-400" : "text-neutral-400"
                                            }`}
                                        >
                                            {item.indexStr}
                                        </span>
                                        <div
                                            className={`transition-transform duration-200 group-hover:scale-105 ${
                                                isActive ? "text-white" : "text-neutral-700"
                                            }`}
                                        >
                                            <IconComponent size={22} strokeWidth={1.8} />
                                        </div>
                                        <span
                                            className={`font-sans font-semibold text-lg sm:text-xl md:text-[21px] tracking-tight ${
                                                isActive ? "text-white" : "text-neutral-900"
                                            }`}
                                        >
                                            {item.title}
                                        </span>
                                    </div>

                                    <div
                                        className={`transition-colors pl-2 ${
                                            isActive
                                                ? "text-white"
                                                : "text-neutral-400 group-hover:text-neutral-900"
                                        }`}
                                    >
                                        <ArrowUpRight
                                            size={20}
                                            className={`transition-transform duration-200 ${
                                                isActive
                                                    ? "translate-x-0.5 -translate-y-0.5"
                                                    : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                            }`}
                                        />
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Правая колонка: панель с данными, картинкой и текстом */}
                    <div className="lg:col-span-5 lg:sticky lg:top-28">
                        <div className="rounded-[28px] bg-neutral-50 border border-neutral-200/90 p-6 sm:p-8 space-y-6 shadow-sm">

                            {/* Верх панели: Guarantee for quality + Бейдж */}
                            <div className="flex items-center justify-between pb-4 border-b border-neutral-200/80">
                                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                                    Guarantee for quality
                                </span>
                                <span className="font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-white border border-neutral-200 text-neutral-700 font-medium">
                                    {activeService.badge}
                                </span>
                            </div>

                            {/* Картинка активной услуги с unoptimized */}
                            <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-neutral-200 border border-neutral-200/80">
                                <Image
                                    src={activeService.imageUrl}
                                    alt={activeService.title}
                                    fill
                                    unoptimized
                                    className="object-cover transition-transform duration-500 hover:scale-105"
                                    sizes="(max-width: 1024px) 100vw, 40vw"
                                />
                            </div>

                            {/* Заголовок и подробное описание */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-white border border-neutral-200 text-neutral-800">
                                        <ActiveIcon size={20} strokeWidth={1.8} />
                                    </div>
                                    <h3 className="font-sans font-bold text-2xl text-neutral-950 tracking-tight">
                                        {activeService.title}
                                    </h3>
                                </div>

                                <p className="text-neutral-700 font-sans text-sm sm:text-[15px] leading-relaxed">
                                    {activeService.description}
                                </p>

                                <p className="text-neutral-500 font-sans text-xs sm:text-sm leading-relaxed pt-1">
                                    {activeService.details}
                                </p>
                            </div>

                            {/* Кнопка "Подробнее" с переходом на страницу услуги */}
                            <div className="pt-2">
                                <Link
                                    href={`/solutions/${activeService.id}`}
                                    className="inline-flex items-center justify-center gap-2 w-full py-4 px-6 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all active:scale-[0.99]"
                                >
                                    <span>Подробнее</span>
                                    <ArrowUpRight size={15} />
                                </Link>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}