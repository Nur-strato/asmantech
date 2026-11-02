"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({
                                         children,
                                     }: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        // Инициализация кинематографичного инерционного скролла
        const lenis = new Lenis({
            duration: 1.35, // время инерции (делает ход колесика мягким и премиальным)
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-кривая затухания
            smoothWheel: true,
            touchMultiplier: 1.5,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}