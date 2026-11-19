"use client";

import React from "react";
import { Handshake } from "lucide-react";
import { PARTNERS_DATA } from "@/data/partners";

export function Partners() {
    return (
        <section
            aria-label="Партнёры и клиенты"
            className="w-full py-12 sm:py-20 border-t border-line/70 select-none overflow-hidden"
        >
            <div className="max-w-[1412px] mx-auto px-4 xs:px-5 md:px-8">
                {/* Хедер секции */}
                <div className="space-y-2.5 sm:space-y-3 mb-8 sm:mb-12">
                    <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-lg bg-surface-muted border border-line/90 shadow-2xs">
                        <Handshake size={13} className="text-neutral-700 sm:w-3.5 sm:h-3.5" />
                        <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-700">
                            TRUSTED NETWORK
                        </span>
                    </div>

                    <h2 className="font-serif italic text-[34px] xs:text-[42px] sm:text-[56px] md:text-[64px] font-normal text-content tracking-[-0.03em] leading-[0.98]">
                        Партнёры и клиенты
                    </h2>
                </div>
            </div>

            {/* Контейнер ленты с бесконечной авто-прокруткой и аппаратным ускорением */}
            <div className="relative w-full overflow-hidden marquee-mask">
                <div className="flex w-max marquee-track py-1.5 sm:py-2">
                    {[...PARTNERS_DATA, ...PARTNERS_DATA].map((partner, idx) => (
                        <div
                            key={`${partner.slug}-${idx}`}
                            className="relative flex flex-col justify-between items-center mx-1.5 xs:mx-2 sm:mx-2.5 p-3.5 xs:p-4 sm:p-5 w-[138px] xs:w-[150px] sm:w-[165px] md:w-[178px] h-[192px] xs:h-[206px] sm:h-[224px] shrink-0 rounded-[18px] sm:rounded-[20px] bg-white border border-line/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] cursor-default select-none transition-shadow"
                        >
                            {/* Верхний ряд: категория */}
                            <div className="w-full flex justify-start items-center overflow-hidden">
                                <span className="text-[9px] xs:text-[10px] font-mono text-content-subtle font-medium tracking-tight truncate">
                                    {partner.category}
                                </span>
                            </div>

                            {/* Логотип по центру (масштабируется на мобильных без деформации) */}
                            <div className="my-auto flex items-center justify-center filter grayscale opacity-80 pointer-events-none transform scale-90 xs:scale-95 sm:scale-100 transition-transform">
                                {partner.logo}
                            </div>

                            {/* Название внизу */}
                            <div className="w-full text-center mt-auto pt-1.5 sm:pt-2 pointer-events-none min-w-0">
                                <p className="font-sans font-extrabold text-[13.5px] xs:text-[15px] sm:text-[16px] text-content tracking-tight leading-none uppercase truncate">
                                    {partner.name}
                                </p>
                                {partner.subName && (
                                    <p className="font-sans font-bold text-[9px] xs:text-[10px] sm:text-[11px] text-content-muted tracking-widest leading-tight mt-1 uppercase truncate">
                                        {partner.subName}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% {
                        transform: translate3d(0, 0, 0);
                    }
                    100% {
                        transform: translate3d(-50%, 0, 0);
                    }
                }

                .marquee-mask {
                    -webkit-mask-image: linear-gradient(
                            to right,
                            transparent 0%,
                            black 8%,
                            black 92%,
                            transparent 100%
                    );
                    mask-image: linear-gradient(
                            to right,
                            transparent 0%,
                            black 8%,
                            black 92%,
                            transparent 100%
                    );
                }

                .marquee-track {
                    animation: marquee 26s linear infinite;
                    will-change: transform;
                    -webkit-backface-visibility: hidden;
                    backface-visibility: hidden;
                    transform: translate3d(0, 0, 0);
                }

                /* Остановка по ховеру только на устройствах с курсором (без залипания на тачскринах) */
                @media (hover: hover) and (pointer: fine) {
                    .marquee-track:hover {
                        animation-play-state: paused;
                    }
                }

                /* Поддержка системного режима экономии движения */
                @media (prefers-reduced-motion: reduce) {
                    .marquee-track {
                        animation: none;
                        transform: none;
                    }
                    .marquee-mask {
                        overflow-x: auto;
                        -webkit-mask-image: none;
                        mask-image: none;
                    }
                }
            `}</style>
        </section>
    );
}

export default Partners;