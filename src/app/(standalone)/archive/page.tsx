"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    FolderKanban,
    Settings,
    LayoutTemplate,
    Compass,
    Plus,
    MoreHorizontal,
    ExternalLink,
    X,
    Maximize2
} from "lucide-react";

interface ArchiveProject {
    id: string;
    title: string;
    viewedAt: string;
    category: string;
    imageUrl: string;
    embedUrl: string;
    externalLink: string;
}

const ARCHIVE_PROJECTS: ArchiveProject[] = [
    {
        id: "aucahack",
        title: "AUCAHACK",
        viewedAt: "Viewed 22 minutes ago",
        category: "Student Academic Hub",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
        embedUrl: "/embed/aucahack",
        externalLink: "https://aucahack.com",
    },
    {
        id: "konurat",
        title: "Konurat Construction",
        viewedAt: "Viewed 1 hour ago",
        category: "Enterprise BIM 4D",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
        embedUrl: "/embed/konurat",
        externalLink: "https://Konurat-Construction.kg",
    },
    {
        id: "proquiz",
        title: "ProQuizKG",
        viewedAt: "Viewed 2 hours ago",
        category: "Intercollegiate League Platform",
        imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
        embedUrl: "/embed/proquiz",
        externalLink: "https://proquiz.kg",
    },
    {
        id: "knopka",
        title: "Knopka Accounting",
        viewedAt: "Viewed 1 day ago",
        category: "Fintech & Tax Ecosystem",
        imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop",
        embedUrl: "/embed/knopka",
        externalLink: "https://knopka.kg",
    },
    {
        id: "vital-design",
        title: "Interior Studio",
        viewedAt: "Viewed 3 days ago",
        category: "Visual Architecture & 3D",
        imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
        embedUrl: "/embed/aucahack",
        externalLink: "#",
    },
];

export default function ArchivePage() {
    const [activeTab, setActiveTab] = useState<"project" | "settings" | "templates" | "kb">("project");
    const [selectedProject, setSelectedProject] = useState<ArchiveProject | null>(null);

    return (
        <div className="min-h-screen bg-[#F0F4FA] p-4 sm:p-6 lg:p-8 font-sans text-neutral-900 flex flex-col antialiased relative selection:bg-blue-600 selection:text-white">
            {/* Тонкая сетка на фоне как на референсе */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.45]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #D8E2F0 1px, transparent 1px),
                        linear-gradient(to bottom, #D8E2F0 1px, transparent 1px)
                    `,
                    backgroundSize: "36px 36px",
                }}
            />

            <div className="relative z-10 flex-1 flex flex-col md:flex-row gap-5 max-w-[1600px] w-full mx-auto">

                {/* ── ЛЕВЫЙ САЙДБАР ── */}
                <aside className="w-full md:w-56 lg:w-64 bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-neutral-200/70 p-3 sm:p-4 shrink-0 flex flex-col justify-between">
                    <nav className="space-y-1.5">
                        <button
                            type="button"
                            onClick={() => setActiveTab("project")}
                            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${
                                activeTab === "project"
                                    ? "bg-[#F3F6FD] text-[#1E40AF] font-semibold"
                                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                            }`}
                        >
                            <FolderKanban size={17} className={activeTab === "project" ? "text-blue-600" : "text-neutral-500"} />
                            <span>Project</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab("settings")}
                            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${
                                activeTab === "settings"
                                    ? "bg-[#F3F6FD] text-[#1E40AF] font-semibold"
                                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                            }`}
                        >
                            <Settings size={17} className={activeTab === "settings" ? "text-blue-600" : "text-neutral-500"} />
                            <span>Setting</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab("templates")}
                            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${
                                activeTab === "templates"
                                    ? "bg-[#F3F6FD] text-[#1E40AF] font-semibold"
                                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                            }`}
                        >
                            <LayoutTemplate size={17} className={activeTab === "templates" ? "text-blue-600" : "text-neutral-500"} />
                            <span>Templates</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab("kb")}
                            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${
                                activeTab === "kb"
                                    ? "bg-[#F3F6FD] text-[#1E40AF] font-semibold"
                                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                            }`}
                        >
                            <Compass size={17} className={activeTab === "kb" ? "text-blue-600" : "text-neutral-500"} />
                            <span>Knowledge base</span>
                        </button>
                    </nav>

                    {/* Ссылка возврата на главное портфолио */}
                    <div className="pt-4 mt-auto border-t border-neutral-100">
                        <Link
                            href="/"
                            className="flex items-center justify-between text-xs font-medium text-neutral-500 hover:text-neutral-900 p-2 rounded-lg hover:bg-neutral-50 transition-colors"
                        >
                            <span>← Back to Portfolio</span>
                        </Link>
                    </div>
                </aside>

                {/* ── ОСНОВНАЯ ОБЛАСТЬ (GRID) ── */}
                <main className="flex-1 bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-neutral-200/70 p-6 sm:p-8 lg:p-10 flex flex-col">
                    {/* Header: Заголовок + Кнопка New Project */}
                    <div className="flex items-center justify-between pb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#0A2540] tracking-tight">
                            All projects
                        </h1>
                        <button
                            type="button"
                            onClick={() => alert("Форма добавления нового проекта")}
                            className="inline-flex items-center justify-center px-4 py-2 bg-[#2547F4] hover:bg-[#1C3BD9] text-white font-medium text-sm rounded-xl shadow-xs transition-colors cursor-pointer"
                        >
                            New project
                        </button>
                    </div>

                    {/* Сетка проектов */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">

                        {/* 1. Карточка создания "+ New project" (Dashed border) */}
                        <div
                            onClick={() => alert("Создание нового проекта")}
                            className="group aspect-[16/11] border-2 border-dashed border-[#BCD0ED] rounded-2xl flex flex-col items-center justify-center gap-2 text-neutral-400 hover:text-[#2547F4] hover:border-[#2547F4] hover:bg-blue-50/20 transition-all cursor-pointer select-none"
                        >
                            <Plus size={20} className="transition-transform group-hover:scale-125" />
                            <span className="text-xs font-semibold tracking-wide">New project</span>
                        </div>

                        {/* 2. Карточки реальных проектов */}
                        {ARCHIVE_PROJECTS.map((item) => (
                            <div key={item.id} className="flex flex-col group">
                                {/* Превью-изображение страницы */}
                                <div
                                    onClick={() => setSelectedProject(item)}
                                    className="relative aspect-[16/11] rounded-2xl overflow-hidden border border-neutral-200/80 bg-neutral-100 shadow-[0_1px_4px_rgba(0,0,0,0.04)] cursor-pointer group-hover:shadow-md transition-shadow"
                                >
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                                        unoptimized
                                    />
                                    {/* Hover оверлей для открытия быстрого превью */}
                                    <div className="absolute inset-0 bg-neutral-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <span className="px-3 py-1.5 rounded-full bg-white text-xs font-bold font-mono text-neutral-900 shadow-lg flex items-center gap-1.5">
                                            <Maximize2 size={12} />
                                            <span>Live Preview</span>
                                        </span>
                                    </div>
                                </div>

                                {/* Заголовок и метаданные под карточкой */}
                                <div className="pt-3 flex items-start justify-between">
                                    <div className="min-w-0 pr-2">
                                        <h3
                                            onClick={() => setSelectedProject(item)}
                                            className="font-bold text-sm sm:text-base text-[#0A2540] truncate cursor-pointer hover:text-[#2547F4] transition-colors"
                                        >
                                            {item.title}
                                        </h3>
                                        <p className="text-[11px] sm:text-xs text-neutral-400 font-normal">
                                            {item.viewedAt}
                                        </p>
                                    </div>

                                    {/* Кнопка "..." меню */}
                                    <div className="relative shrink-0 pt-0.5">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                window.open(item.externalLink, "_blank");
                                            }}
                                            className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
                                            title="Опции / Открыть сайт"
                                        >
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>

            {/* ── МОДАЛЬНОЕ ОКНО ПРЕДПРОСМОТРА С НАШИМ /embed/ ── */}
            {selectedProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-150">
                    <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden">
                        {/* Хедер модалки */}
                        <div className="h-12 border-b border-neutral-200 px-4 flex items-center justify-between shrink-0 bg-neutral-50/80">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-neutral-900">{selectedProject.title}</span>
                                <span className="text-xs text-neutral-400">• {selectedProject.category}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <a
                                    href={selectedProject.externalLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200/60 transition-colors"
                                    title="Open live website"
                                >
                                    <ExternalLink size={16} />
                                </a>
                                <button
                                    type="button"
                                    onClick={() => setSelectedProject(null)}
                                    className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200/60 transition-colors cursor-pointer"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Встроенный интерактивный фрейм из созданной ранее архитектуры */}
                        <div className="flex-1 bg-white overflow-hidden relative">
                            <iframe
                                src={selectedProject.embedUrl}
                                title={selectedProject.title}
                                className="w-full h-full border-0"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}