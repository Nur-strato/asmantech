"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { useTr } from "@/i18n/tr";

interface ProjectItem {
    id: string;
    title: string;
    subtitle: string;
    category: "websites" | "applications" | "branding";
    image: string;
    href: string;
    aspectRatio?: string;
}

const PROJECTS: ProjectItem[] = [
    {
        id: "punto-pago",
        title: "Punto Pago",
        subtitle: "Building a connected ecosystem where discovering, learning and buying feels effortless.",
        category: "applications",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
        href: "/projects/punto-pago",
        aspectRatio: "aspect-[4/3.8]",
    },
    {
        id: "lumiere-residence",
        title: "Lumière Real Estate",
        subtitle: "Architectural visual storytelling and high-converting investment platform for premium residences.",
        category: "websites",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
        href: "/projects/lumiere",
        aspectRatio: "aspect-[4/4.2]",
    },
    {
        id: "aurora-fintech",
        title: "Aurora Banking",
        subtitle: "Next-generation digital banking experience with biometric security and automated cashflows.",
        category: "applications",
        image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=85",
        href: "/projects/aurora",
        aspectRatio: "aspect-[4/4.4]",
    },
    {
        id: "zenith-atelier",
        title: "Zenith Identity",
        subtitle: "Complete brand design system, physical stationery, and minimalist digital guidelines.",
        category: "branding",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=85",
        href: "/projects/zenith",
        aspectRatio: "aspect-[4/3.7]",
    },
    {
        id: "strato-cloud",
        title: "Strato Platform",
        subtitle: "High-load cloud orchestration and developer analytics portal with sub-second response times.",
        category: "websites",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85",
        href: "/projects/strato",
        aspectRatio: "aspect-[4/3.9]",
    },
    {
        id: "kura-living",
        title: "Kura Studio",
        subtitle: "Tactile identity, custom typography and 3D product rendering for Scandinavian furniture lab.",
        category: "branding",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85",
        href: "/projects/kura",
        aspectRatio: "aspect-[4/4.1]",
    },
];

export default function ProjectsPage() {
    const tr = useTr();
    const cursorRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);

    // 120 FPS Lerp Loop на GPU без React-ререндеров
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

    const leftColumn = PROJECTS.filter((_, idx) => idx % 2 === 0);
    const rightColumn = PROJECTS.filter((_, idx) => idx % 2 === 1);

    return (
        <main className="w-full min-h-screen bg-white text-black pt-28 sm:pt-36 lg:pt-44 pb-36">
            {/* Глобальный аппаратный курсор */}
            <div
                ref={cursorRef}
                className="pointer-events-none fixed top-0 left-0 z-50 hidden md:block will-change-transform"
                style={{ transform: "translate3d(-100px, -100px, 0)" }}
            >
                {/*
                    Эффект оптической линзы-тепловизора (Thermal Optical Scope):
                    - Круг абсолютно прозрачный, без размытия (пиксели не мылятся)
                    - contrast(240%) + saturate(300%): глубокий гиперконтраст исходных текстур под кругом
                    - hue-rotate(180deg): переворачивает цветовой спектр (тёплые тона переходят в ультрафиолет/кобальт, холодные — в оранжевый/терракотовый)
                    - Двойной контур (белый 1.8px + черный ринг 1px): курсор отчётливо очерчен на любом фоне
                */}
                <div
                    ref={badgeRef}
                    className="flex items-center justify-center w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full
                               bg-transparent border-[1.8px] border-white/95 ring-1 ring-black/40
                               shadow-[0_8px_32px_rgba(0,0,0,0.35)]
                               transition-all duration-200 ease-out opacity-0 scale-50"
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

            <div className="w-full max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
                {/* Заголовок и подзаголовок */}
                <div className="text-center max-w-4xl mx-auto space-y-4 sm:space-y-5">
                    <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[96px] font-bold tracking-[-0.045em] leading-[0.98] text-black">
                        {tr("Our projects")}
                    </h1>
                    <p className="text-black text-[22px] sm:text-[25px] lg:text-[26.5px] tracking-[-0.015em] font-normal max-w-3xl mx-auto leading-relaxed">
                        {tr("We help bring ideas to life and create digital products that work.")}
                    </p>
                </div>

                {/* Таб All Projects */}
                <div className="flex justify-center items-center pt-12 sm:pt-16 pb-16 sm:pb-24">
                    <span className="relative pb-3 text-[22px] sm:text-[23.5px] font-normal tracking-[-0.015em] text-black">
                        {tr("All Projects")}
                        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-black" />
                    </span>
                </div>

                {/* Асимметричная сетка */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-14 items-start">
                    <div className="space-y-12 sm:space-y-16">
                        {leftColumn.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onEnter={onCardEnter}
                                onLeave={onCardLeave}
                            />
                        ))}
                    </div>

                    <div className="space-y-12 sm:space-y-16 md:pt-24 lg:pt-36">
                        {rightColumn.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onEnter={onCardEnter}
                                onLeave={onCardLeave}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

function ProjectCard({
                         project,
                         onEnter,
                         onLeave,
                     }: {
    project: ProjectItem;
    onEnter: () => void;
    onLeave: () => void;
}) {
    const tr = useTr();
    return (
        <article className="group block">
            <Link
                href={project.href}
                className="block"
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
            >
                <div className="relative overflow-hidden rounded-[26px] sm:rounded-[34px] bg-neutral-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:cursor-none group-hover:scale-[0.985]">
                    <div className={`w-full relative ${project.aspectRatio || "aspect-[4/3]"} overflow-hidden bg-neutral-100`}>
                        <Image
                            src={project.image}
                            alt={tr(project.title)}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                        />

                        {/* Мобильная кнопка для тачскринов */}
                        <div
                            className="md:hidden absolute top-4 right-4 w-10 h-10 rounded-full border border-white/90 ring-1 ring-black/30 text-white flex items-center justify-center shadow-md"
                            style={{
                                backdropFilter: "contrast(240%) saturate(300%) hue-rotate(180deg)",
                                WebkitBackdropFilter: "contrast(240%) saturate(300%) hue-rotate(180deg)",
                            }}
                        >
                            <ArrowUpRight size={18} strokeWidth={2.4} className="drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" />
                        </div>
                    </div>
                </div>
            </Link>

            {/* Описание под карточкой */}
            <div className="pt-4 sm:pt-5 px-0.5">
                <p className="text-[17px] sm:text-[18.5px] md:text-[20px] leading-[1.38] tracking-[-0.018em] text-neutral-900">
                    <span className="font-bold text-black">{tr(project.title)}</span>
                    <span className="font-normal text-neutral-900"> – {project.subtitle}</span>
                </p>
            </div>
        </article>
    );
}