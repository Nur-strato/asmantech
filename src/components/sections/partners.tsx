"use client";

import React from "react";
import Link from "next/link";
import { Handshake, ArrowUpRight } from "lucide-react";
import { PARTNERS_DATA } from "@/data/partners";

export function Partners() {
    return (
        <section
            aria-label="Партнёры и клиенты"
            className="w-full py-16 sm:py-20 border-t border-neutral-200/70 select-none overflow-hidden"
        >
            <div className="max-w-[1412px] mx-auto px-5 md:px-8">
                {/* Хедер секции */}
                <div className="space-y-3 mb-10 sm:mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-neutral-100 border border-neutral-200">
                        <Handshake size={14} className="text-neutral-700" />
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-700">
                            TRUSTED NETWORK
                        </span>
                    </div>
                    <h2 className="font-serif italic text-[44px] sm:text-[56px] md:text-[64px] font-normal text-neutral-950 tracking-[-0.03em] leading-[0.98]">
                        Партнёры и клиенты
                    </h2>
                </div>
            </div>

            {/* Контейнер ленты с бесконечной авто-прокруткой и плавной фокусировкой на активной карточке */}
            <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] group/track">
                <div className="flex w-max marquee-track group-hover/track:[animation-play-state:paused] py-2">
                    {[...PARTNERS_DATA, ...PARTNERS_DATA].map((partner, idx) => (
                        <Link
                            key={`${partner.slug}-${idx}`}
                            href={`/partners/${partner.slug}`}
                            className="group/card relative flex flex-col justify-between items-center mx-2 sm:mx-2.5 p-4 sm:p-5 w-[150px] sm:w-[165px] md:w-[178px] h-[210px] sm:h-[224px] shrink-0 rounded-[20px] bg-white hover:bg-neutral-50/60 border border-neutral-200/80 hover:border-neutral-400/80 transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 cursor-pointer group-hover/track:opacity-50 hover:!opacity-100"
                        >
                            {/* Верхний ряд: категория + плавная стрелочка перехода */}
                            <div className="w-full flex justify-between items-center">
                                <span className="text-[10px] font-mono text-neutral-400 group-hover/card:text-neutral-600 font-medium tracking-tight">
                                    {partner.category}
                                </span>
                                <ArrowUpRight
                                    size={13}
                                    className="text-neutral-400 opacity-0 -translate-x-1 translate-y-1 group-hover/card:opacity-100 group-hover/card:translate-x-0 group-hover/card:translate-y-0 transition-all duration-200"
                                />
                            </div>

                            {/* Логотип по центру */}
                            <div className="my-auto flex items-center justify-center filter grayscale opacity-75 group-hover/card:grayscale-0 group-hover/card:opacity-100 transition-all duration-300 group-hover/card:scale-105">
                                {partner.logo}
                            </div>

                            {/* Название внизу */}
                            <div className="w-full text-center mt-auto pt-2">
                                <p className="font-sans font-extrabold text-[15px] sm:text-[16px] text-neutral-900 tracking-tight leading-none uppercase">
                                    {partner.name}
                                </p>
                                {partner.subName && (
                                    <p className="font-sans font-bold text-[10px] sm:text-[11px] text-neutral-500 tracking-widest leading-tight mt-1 uppercase">
                                        {partner.subName}
                                    </p>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                .marquee-track {
                    animation: marquee 26s linear infinite;
                    will-change: transform;
                }
            `}</style>
        </section>
    );
}

export default Partners;