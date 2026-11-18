"use client";

import React from "react";
import Image from "next/image";

export type CurtainState = "idle" | "enter" | "active" | "leave";

interface CurtainProps {
    state: CurtainState;
}

export function Curtain({ state }: CurtainProps) {
    if (state === "idle") return null;

    const isActive = state === "active";

    return (
        <aside
            aria-hidden="true"
            className={`fixed inset-0 z-[99999] bg-white text-ink flex flex-col items-center justify-center p-6 sm:p-10 pointer-events-auto select-none transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform ${
                state === "enter"
                    ? "-translate-y-full"
                    : isActive
                        ? "translate-y-0"
                        : "-translate-y-full"
            }`}
        >
            <div
                className={`flex flex-col items-center justify-center w-full max-w-2xl text-center space-y-6 sm:space-y-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 translate-y-3"
                }`}
            >
                {/* Логотип компании в оригинальном чёрном цвете */}
                <div className="relative h-14 sm:h-20 md:h-24 w-52 sm:w-72 md:w-80 flex items-center justify-center">
                    <Image
                        src="/images/logo.png?v=2"
                        alt="Asman Tech"
                        fill
                        priority
                        sizes="(max-width: 640px) 240px, 340px"
                        className="object-contain"
                    />
                </div>

                {/* Надпись IT-Solutions for you на всю ширину */}
                <h2 className="w-full font-serif text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ink tracking-[-0.04em] leading-[1.05]">
                    IT-Solutions for you
                </h2>
            </div>
        </aside>
    );
}

export default Curtain;