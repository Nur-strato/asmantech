"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    RefreshCw,
    Search,
    PhoneCall,
    Trash2,
    Lock,
    Clock,
    Inbox,
    FolderKanban,
    Settings,
    LayoutTemplate,
    Compass,
    Plus,
    ExternalLink,
    X,
    Maximize2,
    Monitor,
    LogOut,
    Globe,
    AlertTriangle,
} from "lucide-react";

// ── Типы для заявок ──────────────────────────────────────────
interface Lead {
    id: string;
    serviceId?: string;
    serviceName?: string;
    clientName?: string;
    aboutDetails?: string;
    countryCode?: string;
    phoneNumber?: string;
    fullPhone?: string;
    contactPreference?: "message" | "call";
    createdAt?: string;
    status?: "new" | "in_progress" | "closed";
}

// ── Типы для архива проектов ──────────────────────────────────
export interface ArchiveProject {
    id: string;
    title: string;
    category: string;
    tagline: string;
    viewedAt: string;
    imageUrl: string;
    embedUrl: string;
    externalLink: string;
    accent: string;
}

const DEFAULT_ARCHIVE_PROJECTS: ArchiveProject[] = [
    {
        id: "aucahack",
        title: "AUCAHACK",
        category: "AUCA Student Hub",
        tagline: "Academic ecosystem for schedule planning, tutor evaluations, and GPA forecasting.",
        viewedAt: "Viewed 22 minutes ago",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
        embedUrl: "/embed/aucahack",
        externalLink: "https://aucahack.com",
        accent: "#FACC15",
    },
    {
        id: "konurat",
        title: "Konurat Construction",
        category: "Сайт Строительной компании",
        tagline: "Architecting high-end digital presence and enterprise acquisition system.",
        viewedAt: "Viewed 1 hour ago",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
        embedUrl: "/embed/konurat",
        externalLink: "https://Konurat-Construction.kg",
        accent: "#22C55E",
    },
    {
        id: "proquiz",
        title: "ProQuizKG",
        category: "Сайт для Межвузовской лиги",
        tagline: "Real-time tournament engine and live scoring across 20+ universities.",
        viewedAt: "Viewed 2 hours ago",
        imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
        embedUrl: "/embed/proquiz",
        externalLink: "https://proquiz.kg",
        accent: "#3B82F6",
    },
    {
        id: "knopka",
        title: "Knopka",
        category: "Бухгалтерская компания",
        tagline: "Comprehensive accounting automation and financial reporting infrastructure.",
        viewedAt: "Viewed 1 day ago",
        imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop",
        embedUrl: "/embed/knopka",
        externalLink: "https://knopka.kg",
        accent: "#B28CFF",
    },
];

function WhatsAppIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.44 19.65L5.27 16.61L5.07 16.3C4.24 14.98 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.69 12.04 3.69C14.24 3.69 16.31 4.55 17.86 6.11C19.42 7.66 20.27 9.73 20.27 11.93C20.27 16.47 16.58 20.15 12.04 20.15ZM16.56 14.41C16.31 14.29 15.1 13.69 14.88 13.61C14.65 13.53 14.49 13.49 14.32 13.74C14.16 13.99 13.69 14.54 13.54 14.71C13.4 14.87 13.25 14.9 13 14.77C12.75 14.65 11.95 14.39 11 13.54C10.26 12.88 9.76 12.06 9.61 11.81C9.47 11.56 9.6 11.43 9.72 11.31C9.83 11.2 9.97 11.02 10.1 10.87C10.22 10.72 10.26 10.61 10.34 10.45C10.42 10.29 10.38 10.14 10.32 10.02C10.26 9.9 9.77 8.69 9.56 8.2C9.36 7.72 9.16 7.79 9.01 7.78L8.54 7.77C8.37 7.77 8.1 7.83 7.87 8.08C7.65 8.33 7 8.94 7 10.17C7 11.4 7.9 12.59 8.02 12.75C8.15 12.92 9.78 15.42 12.27 16.5C12.86 16.76 13.32 16.91 13.68 17.02C14.28 17.21 14.82 17.18 15.25 17.12C15.73 17.05 16.73 16.52 16.94 15.93C17.15 15.34 17.15 14.84 17.09 14.74C17.02 14.63 16.82 14.54 16.56 14.41Z"
            />
        </svg>
    );
}

export default function AdminPage() {
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [pinInput, setPinInput] = useState<string>("");
    const [pinError, setPinError] = useState<boolean>(false);
    const [isSubmittingPin, setIsSubmittingPin] = useState<boolean>(false);

    // Вкладки панели управления: projects, leads, settings, templates, kb
    const [activeTab, setActiveTab] = useState<"projects" | "leads" | "settings" | "templates" | "kb">("projects");

    // ── Стейт заявок ──
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<"all" | "new" | "in_progress" | "closed">("all");

    // ── Стейт архива проектов ──
    const [projects, setProjects] = useState<ArchiveProject[]>(DEFAULT_ARCHIVE_PROJECTS);
    const [previewProject, setPreviewProject] = useState<ArchiveProject | null>(null);
    const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

    // ── Стейт удаления проекта по паролю ──
    const [projectToDelete, setProjectToDelete] = useState<ArchiveProject | null>(null);
    const [deletePinInput, setDeletePinInput] = useState<string>("");
    const [deletePinError, setDeletePinError] = useState<boolean>(false);
    const [isSubmittingDelete, setIsSubmittingDelete] = useState<boolean>(false);

    // Поля формы нового проекта
    const [formTitle, setFormTitle] = useState("");
    const [formId, setFormId] = useState("");
    const [formCategory, setFormCategory] = useState("");
    const [formTagline, setFormTagline] = useState("");
    const [formImageUrl, setFormImageUrl] = useState("");
    const [formExternalLink, setFormExternalLink] = useState("");

    // Загрузка проектов из localStorage
    useEffect(() => {
        const saved = localStorage.getItem("asman_archive_projects");
        if (saved) {
            try {
                setProjects(JSON.parse(saved));
            } catch (e) {
                console.error("Ошибка парсинга архива проектов", e);
            }
        }
    }, []);

    const fetchLeads = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/leads");
            if (res.status === 401) {
                setIsAuthenticated(false);
                setLeads([]);
                return;
            }
            if (!res.ok) throw new Error(`HTTP error ${res.status}`);
            const data = await res.json();
            setIsAuthenticated(true);
            if (data?.success && Array.isArray(data.leads)) {
                setLeads(data.leads);
            } else {
                setLeads([]);
            }
        } catch {
            setLeads([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        setIsMounted(true);
        fetchLeads();
    }, [fetchLeads]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmittingPin(true);
        setPinError(false);

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pin: pinInput.trim() }),
            });

            if (res.ok) {
                setIsAuthenticated(true);
                setPinInput("");
                fetchLeads();
            } else {
                setPinError(true);
                setPinInput("");
            }
        } catch {
            setPinError(true);
        } finally {
            setIsSubmittingPin(false);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch("/api/admin/logout", { method: "POST" });
        } catch {}
        setIsAuthenticated(false);
        setPinInput("");
        setLeads([]);
    };

    const handleStatusChange = async (id: string, newStatus: "new" | "in_progress" | "closed") => {
        try {
            const res = await fetch("/api/leads", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: newStatus }),
            });
            const data = await res.json();
            if (data?.success) {
                setLeads((prev) =>
                    prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
                );
            }
        } catch (err) {
            console.error("Ошибка обновления статуса:", err);
        }
    };

    const handleDeleteLead = async (id: string) => {
        if (!confirm("Вы уверены, что хотите удалить эту заявку?")) return;
        try {
            const res = await fetch(`/api/leads?id=${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data?.success) {
                setLeads((prev) => prev.filter((l) => l.id !== id));
            }
        } catch (err) {
            console.error("Ошибка удаления:", err);
        }
    };

    // Создание проекта
    const handleCreateProject = (e: React.FormEvent) => {
        e.preventDefault();
        const cleanId = formId.toLowerCase().trim().replace(/[^a-z0-9_-]/g, "");
        if (!formTitle || !cleanId) return;

        const newProject: ArchiveProject = {
            id: cleanId,
            title: formTitle.trim(),
            category: formCategory.trim() || "Web Application",
            tagline: formTagline.trim() || "Innovative product engineered by Asman Tech.",
            viewedAt: "Just added",
            imageUrl: formImageUrl.trim() || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
            embedUrl: `/embed/${cleanId}`,
            externalLink: formExternalLink.trim() || "#",
            accent: "#3B82F6",
        };

        const updated = [newProject, ...projects];
        setProjects(updated);
        localStorage.setItem("asman_archive_projects", JSON.stringify(updated));

        setFormTitle("");
        setFormId("");
        setFormCategory("");
        setFormTagline("");
        setFormImageUrl("");
        setFormExternalLink("");
        setIsAddProjectModalOpen(false);
    };

    // Подтверждение удаления проекта через проверку пароля
    const handleConfirmDeleteProject = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!projectToDelete) return;

        setIsSubmittingDelete(true);
        setDeletePinError(false);

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pin: deletePinInput.trim() }),
            });

            if (res.ok) {
                const updated = projects.filter((p) => p.id !== projectToDelete.id);
                setProjects(updated);
                localStorage.setItem("asman_archive_projects", JSON.stringify(updated));
                setProjectToDelete(null);
                setDeletePinInput("");
            } else {
                setDeletePinError(true);
            }
        } catch {
            setDeletePinError(true);
        } finally {
            setIsSubmittingDelete(false);
        }
    };

    const filteredLeads = useMemo(() => {
        return leads.filter((item) => {
            const currentStatus = item?.status || "new";
            const matchesStatus = statusFilter === "all" || currentStatus === statusFilter;
            const q = searchQuery.toLowerCase().trim();
            if (!q) return matchesStatus;

            const name = (item?.clientName || "").toLowerCase();
            const phone = (item?.phoneNumber || "").toLowerCase();
            const service = (item?.serviceName || "").toLowerCase();
            const details = (item?.aboutDetails || "").toLowerCase();

            return (
                matchesStatus &&
                (name.includes(q) || phone.includes(q) || service.includes(q) || details.includes(q))
            );
        });
    }, [leads, statusFilter, searchQuery]);

    const stats = useMemo(() => {
        return {
            total: leads.length,
            newCount: leads.filter((l) => (l?.status || "new") === "new").length,
            inProgress: leads.filter((l) => l?.status === "in_progress").length,
            whatsappPreference: leads.filter((l) => l?.contactPreference === "message").length,
        };
    }, [leads]);

    if (!isMounted) {
        return <div className="min-h-screen bg-neutral-950" />;
    }

    // ── ЭКРАН ВХОДА (PIN) ──────────────────────────────────────
    if (!isAuthenticated) {
        return (
            <main className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 text-white font-sans select-none">
                <div className="w-full max-w-sm rounded-[32px] bg-neutral-900 border border-neutral-800 p-8 space-y-6 shadow-2xl text-center">
                    <div className="w-14 h-14 rounded-2xl bg-neutral-800 border border-neutral-700 mx-auto flex items-center justify-center text-neutral-300">
                        <Lock size={24} />
                    </div>

                    <div className="space-y-1">
                        <h2 className="text-xl font-bold tracking-tight text-white uppercase font-mono">
                            Admin Access
                        </h2>
                        <p className="text-xs text-neutral-400 font-mono">
                            Введите PIN для доступа к панели
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="relative">
                            <input
                                type="password"
                                maxLength={6}
                                autoFocus
                                value={pinInput}
                                disabled={isSubmittingPin}
                                onChange={(e) => {
                                    setPinInput(e.target.value);
                                    if (pinError) setPinError(false);
                                }}
                                placeholder="••••"
                                className="w-full text-center tracking-[0.4em] text-2xl font-mono py-3.5 px-4 rounded-xl bg-neutral-950 border border-neutral-700 text-white placeholder:text-neutral-600 focus:outline-none focus:border-white transition-colors disabled:opacity-50"
                            />
                        </div>

                        {pinError && (
                            <div className="text-xs font-mono text-rose-500 font-medium">
                                Неверный PIN-код
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmittingPin}
                            className="w-full py-3.5 rounded-xl bg-white text-neutral-950 font-mono text-xs uppercase font-bold tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer disabled:opacity-50"
                        >
                            {isSubmittingPin ? "Проверка..." : "Войти"}
                        </button>
                    </form>

                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-neutral-300 transition-colors pt-2"
                    >
                        <Globe size={13} />
                        <span>На главную страницу</span>
                    </Link>
                </div>
            </main>
        );
    }

    // ── ОСНОВНАЯ ПАНЕЛЬ НА ВСЮ ШИРИНУ ─────────────────────────
    return (
        <div className="min-h-screen w-full bg-[#F0F4FA] font-sans text-neutral-900 antialiased flex flex-col relative selection:bg-blue-600 selection:text-white">
            {/* Чертежная сетка на фоне */}
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

            {/* ХЕДЕР: Крупные и четкие кнопки */}
            <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200 px-6 sm:px-10 py-4 shadow-xs">
                <div className="w-full flex items-center justify-between">
                    {/* Левая сторона: Крупная кнопка перехода на сайт */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/"
                            className="px-5 py-2.5 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 text-sm font-bold flex items-center gap-2.5 transition-all shadow-xs cursor-pointer active:scale-95"
                        >
                            <Globe size={17} className="text-blue-600" />
                            <span>Открыть сайт</span>
                        </Link>
                    </div>

                    {/* Правая сторона: Крупные кнопки Обновить и Выйти */}
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={fetchLeads}
                            title="Обновить данные"
                            className="px-5 py-2.5 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 text-sm font-bold flex items-center gap-2.5 transition-all shadow-xs cursor-pointer active:scale-95"
                        >
                            <RefreshCw size={16} className={`text-neutral-600 ${loading ? "animate-spin" : ""}`} />
                            <span>Обновить</span>
                        </button>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="px-5 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-sm font-bold flex items-center gap-2.5 transition-all shadow-xs cursor-pointer active:scale-95"
                        >
                            <LogOut size={16} />
                            <span>Выйти</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* РАБОЧАЯ ОБЛАСТЬ: На всю ширину экрана */}
            <div className="relative z-10 flex-1 flex flex-col md:flex-row gap-6 w-full p-6 sm:p-8">

                {/* ── ЛЕВЫЙ САЙДБАР ── */}
                <aside className="w-full md:w-64 bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-neutral-200/80 p-4 shrink-0 flex flex-col justify-between self-start">
                    <nav className="space-y-2">
                        {/* 1. Архив проектов */}
                        <button
                            type="button"
                            onClick={() => setActiveTab("projects")}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left cursor-pointer ${
                                activeTab === "projects"
                                    ? "bg-[#F3F6FD] text-[#1E40AF]"
                                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <FolderKanban size={19} className={activeTab === "projects" ? "text-blue-600" : "text-neutral-500"} />
                                <span>Проекты</span>
                            </div>
                            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600">
                                {projects.length}
                            </span>
                        </button>

                        {/* 2. Входящие заявки (Leads) */}
                        <button
                            type="button"
                            onClick={() => setActiveTab("leads")}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left cursor-pointer ${
                                activeTab === "leads"
                                    ? "bg-[#F3F6FD] text-[#1E40AF]"
                                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <Inbox size={19} className={activeTab === "leads" ? "text-blue-600" : "text-neutral-500"} />
                                <span>Заявки</span>
                            </div>
                            {stats.newCount > 0 && (
                                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-500 text-white animate-pulse">
                                    {stats.newCount}
                                </span>
                            )}
                        </button>

                        {/* 3. Settings */}
                        <button
                            type="button"
                            onClick={() => setActiveTab("settings")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left cursor-pointer ${
                                activeTab === "settings"
                                    ? "bg-[#F3F6FD] text-[#1E40AF]"
                                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                            }`}
                        >
                            <Settings size={19} className={activeTab === "settings" ? "text-blue-600" : "text-neutral-500"} />
                            <span>Настройки</span>
                        </button>

                        {/* 4. Templates */}
                        <button
                            type="button"
                            onClick={() => setActiveTab("templates")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left cursor-pointer ${
                                activeTab === "templates"
                                    ? "bg-[#F3F6FD] text-[#1E40AF]"
                                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                            }`}
                        >
                            <LayoutTemplate size={19} className={activeTab === "templates" ? "text-blue-600" : "text-neutral-500"} />
                            <span>Шаблоны</span>
                        </button>

                        {/* 5. Knowledge base */}
                        <button
                            type="button"
                            onClick={() => setActiveTab("kb")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left cursor-pointer ${
                                activeTab === "kb"
                                    ? "bg-[#F3F6FD] text-[#1E40AF]"
                                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                            }`}
                        >
                            <Compass size={19} className={activeTab === "kb" ? "text-blue-600" : "text-neutral-500"} />
                            <span>База знаний</span>
                        </button>
                    </nav>

                    <div className="pt-4 mt-8 border-t border-neutral-100">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-xs font-semibold text-neutral-500 hover:text-neutral-900 p-2.5 rounded-xl hover:bg-neutral-50 transition-colors"
                        >
                            <Globe size={15} />
                            <span>Вернуться на сайт</span>
                        </Link>
                    </div>
                </aside>

                {/* ── ОСНОВНОЙ КОНТЕНТ ── */}
                <main className="flex-1 w-full bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-neutral-200/80 p-6 sm:p-10 flex flex-col min-w-0">

                    {/* ══ 1. АРХИВ ПРОЕКТОВ ══ */}
                    {activeTab === "projects" && (
                        <div className="space-y-8 w-full">
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div>
                                    <h1 className="text-3xl font-extrabold text-[#0A2540] tracking-tight">
                                        Все проекты
                                    </h1>
                                    <p className="text-sm text-neutral-500 mt-1">
                                        Управление витриной и песочницами интерактивного портфолио
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsAddProjectModalOpen(true)}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2547F4] hover:bg-[#1C3BD9] text-white font-bold text-sm rounded-xl shadow-xs transition-colors cursor-pointer active:scale-95"
                                >
                                    <Plus size={18} />
                                    <span>Добавить проект</span>
                                </button>
                            </div>

                            {/* Сетка карточек: адаптивная на всю ширину */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                                {/* Штрихованная карточка "+ Новый проект" */}
                                <div
                                    onClick={() => setIsAddProjectModalOpen(true)}
                                    className="group aspect-[16/11] border-2 border-dashed border-[#BCD0ED] rounded-2xl flex flex-col items-center justify-center gap-2 text-neutral-400 hover:text-[#2547F4] hover:border-[#2547F4] hover:bg-blue-50/20 transition-all cursor-pointer select-none"
                                >
                                    <Plus size={24} className="transition-transform group-hover:scale-125" />
                                    <span className="text-xs font-bold tracking-wide uppercase font-mono">Добавить проект</span>
                                </div>

                                {/* Список проектов */}
                                {projects.map((item) => (
                                    <div key={item.id} className="flex flex-col group">
                                        <div
                                            onClick={() => setPreviewProject(item)}
                                            className="relative aspect-[16/11] rounded-2xl overflow-hidden border border-neutral-200/90 bg-neutral-100 shadow-[0_1px_4px_rgba(0,0,0,0.04)] cursor-pointer group-hover:shadow-md transition-shadow"
                                        >
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                                                unoptimized
                                            />
                                            {/* Hover-оверлей */}
                                            <div className="absolute inset-0 bg-neutral-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <span className="px-3.5 py-2 rounded-xl bg-white text-xs font-bold font-mono text-neutral-900 shadow-lg flex items-center gap-2">
                                                    <Maximize2 size={13} />
                                                    <span>Открыть песочницу</span>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="pt-3.5 flex items-start justify-between">
                                            <div className="min-w-0 pr-2">
                                                <h3
                                                    onClick={() => setPreviewProject(item)}
                                                    className="font-bold text-base text-[#0A2540] truncate cursor-pointer hover:text-[#2547F4] transition-colors"
                                                >
                                                    {item.title}
                                                </h3>
                                                <p className="text-xs text-neutral-400 font-normal mt-0.5">
                                                    {item.viewedAt}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-1.5 shrink-0">
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        window.open(item.externalLink, "_blank");
                                                    }}
                                                    className="p-2 rounded-lg text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
                                                    title="Открыть оригинал"
                                                >
                                                    <ExternalLink size={16} />
                                                </button>
                                                {/* Кнопка вызова модалки удаления по паролю */}
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setDeletePinInput("");
                                                        setDeletePinError(false);
                                                        setProjectToDelete(item);
                                                    }}
                                                    className="p-2 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                                    title="Удалить проект (требуется PIN)"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ══ 2. ВХОДЯЩИЕ ЗАЯВКИ ══ */}
                    {activeTab === "leads" && (
                        <div className="space-y-8 w-full">
                            <div className="space-y-6">
                                <div>
                                    <h1 className="text-3xl font-extrabold uppercase tracking-tight text-neutral-950">
                                        Входящие заявки
                                    </h1>
                                    <p className="text-sm font-mono text-neutral-500 mt-1">
                                        Все запросы клиентов, отправленные через формы на сайте
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-1">
                                        <div className="text-xs font-mono uppercase text-neutral-400 font-semibold flex items-center justify-between">
                                            <span>Всего</span>
                                            <Inbox size={14} />
                                        </div>
                                        <div className="text-2xl font-bold font-mono text-neutral-950">
                                            {stats.total}
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200/60 space-y-1">
                                        <div className="text-xs font-mono uppercase text-rose-600 font-semibold flex items-center justify-between">
                                            <span>Новые</span>
                                            <span className="w-2 h-2 rounded-full bg-rose-500" />
                                        </div>
                                        <div className="text-2xl font-bold font-mono text-rose-700">
                                            {stats.newCount}
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/60 space-y-1">
                                        <div className="text-xs font-mono uppercase text-amber-700 font-semibold flex items-center justify-between">
                                            <span>В работе</span>
                                            <Clock size={14} />
                                        </div>
                                        <div className="text-2xl font-bold font-mono text-amber-800">
                                            {stats.inProgress}
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/60 space-y-1">
                                        <div className="text-xs font-mono uppercase text-emerald-700 font-semibold flex items-center justify-between">
                                            <span>WhatsApp</span>
                                            <WhatsAppIcon size={14} className="text-[#25D366]" />
                                        </div>
                                        <div className="text-2xl font-bold font-mono text-emerald-800">
                                            {stats.whatsappPreference}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Поиск и фильтры заявок */}
                            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 w-full">
                                <div className="relative flex-1">
                                    <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Поиск по имени, номеру телефона или услуге..."
                                        className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg bg-white border border-neutral-200 focus:outline-none focus:border-neutral-900 transition-colors"
                                    />
                                </div>

                                <div className="flex items-center gap-1.5 p-1 rounded-lg bg-neutral-200/60 text-xs font-semibold self-start sm:self-auto">
                                    <button
                                        type="button"
                                        onClick={() => setStatusFilter("all")}
                                        className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                                            statusFilter === "all" ? "bg-white text-neutral-950 font-bold shadow-xs" : "text-neutral-600 hover:text-neutral-900"
                                        }`}
                                    >
                                        Все ({leads.length})
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setStatusFilter("new")}
                                        className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                                            statusFilter === "new" ? "bg-white text-neutral-950 font-bold shadow-xs" : "text-neutral-600 hover:text-neutral-900"
                                        }`}
                                    >
                                        Новые ({stats.newCount})
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setStatusFilter("in_progress")}
                                        className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                                            statusFilter === "in_progress" ? "bg-white text-neutral-950 font-bold shadow-xs" : "text-neutral-600 hover:text-neutral-900"
                                        }`}
                                    >
                                        В работе
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setStatusFilter("closed")}
                                        className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                                            statusFilter === "closed" ? "bg-white text-neutral-950 font-bold shadow-xs" : "text-neutral-600 hover:text-neutral-900"
                                        }`}
                                    >
                                        Закрытые
                                    </button>
                                </div>
                            </div>

                            {/* Таблица заявок */}
                            <div className="rounded-xl border border-neutral-200 overflow-hidden w-full">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-400 font-mono text-[11px] uppercase tracking-wider">
                                        <tr>
                                            <th className="py-3.5 px-5 font-semibold">Клиент</th>
                                            <th className="py-3.5 px-5 font-semibold">Услуга</th>
                                            <th className="py-3.5 px-5 font-semibold">Контакт / Предпочтение</th>
                                            <th className="py-3.5 px-5 font-semibold">Дата</th>
                                            <th className="py-3.5 px-5 font-semibold">Статус</th>
                                            <th className="py-3.5 px-5 text-right font-semibold">Действия</th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-neutral-100">
                                        {loading ? (
                                            <tr>
                                                <td colSpan={6} className="py-12 text-center text-neutral-400 font-mono text-xs">
                                                    Загрузка заявок...
                                                </td>
                                            </tr>
                                        ) : filteredLeads.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="py-12 text-center text-neutral-400 font-mono text-xs">
                                                    Заявок не найдено
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredLeads.map((lead) => {
                                                const rawPhone = lead?.phoneNumber || "";
                                                const rawCountry = lead?.countryCode || "";
                                                const cleanDigits = rawPhone.replace(/\D/g, "");
                                                const cleanCountry = rawCountry.replace(/\D/g, "");
                                                const fullPhoneClean = cleanCountry ? `${cleanCountry}${cleanDigits}` : cleanDigits;
                                                const waLink = `https://wa.me/${fullPhoneClean}`;
                                                const telLink = `tel:+${fullPhoneClean}`;

                                                let formattedDate = "—";
                                                if (lead?.createdAt) {
                                                    const d = new Date(lead.createdAt);
                                                    if (!isNaN(d.getTime())) {
                                                        formattedDate = d.toLocaleDateString("ru-RU", {
                                                            day: "2-digit",
                                                            month: "short",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        });
                                                    }
                                                }

                                                return (
                                                    <tr key={lead.id} className="hover:bg-neutral-50/70 transition-colors">
                                                        <td className="py-3.5 px-5">
                                                            <div className="font-bold text-neutral-950 text-sm">
                                                                {lead.clientName || "Без имени"}
                                                            </div>
                                                            {lead.aboutDetails && (
                                                                <div className="text-xs text-neutral-500 max-w-xs truncate mt-0.5" title={lead.aboutDetails}>
                                                                    {lead.aboutDetails}
                                                                </div>
                                                            )}
                                                        </td>

                                                        <td className="py-3.5 px-5">
                                                                <span className="inline-block px-2.5 py-0.5 rounded-md bg-neutral-100 text-neutral-800 text-xs font-semibold">
                                                                    {lead.serviceName || "Консультация"}
                                                                </span>
                                                        </td>

                                                        <td className="py-3.5 px-5">
                                                            <div className="font-mono text-xs font-medium text-neutral-950">
                                                                {rawCountry} {rawPhone || "Нет номера"}
                                                            </div>
                                                            <div className="flex items-center gap-1.5 mt-1">
                                                                {lead.contactPreference === "message" ? (
                                                                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                                                                            <WhatsAppIcon size={11} className="text-[#25D366]" />
                                                                            <span>WhatsApp</span>
                                                                        </span>
                                                                ) : (
                                                                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                                                                            <PhoneCall size={10} />
                                                                            <span>Звонок</span>
                                                                        </span>
                                                                )}
                                                            </div>
                                                        </td>

                                                        <td className="py-3.5 px-5 font-mono text-xs text-neutral-500">
                                                            {formattedDate}
                                                        </td>

                                                        <td className="py-3.5 px-5">
                                                            <select
                                                                value={lead.status || "new"}
                                                                onChange={(e) =>
                                                                    handleStatusChange(
                                                                        lead.id,
                                                                        e.target.value as "new" | "in_progress" | "closed"
                                                                    )
                                                                }
                                                                className={`text-xs font-semibold px-2 py-1 rounded border focus:outline-none cursor-pointer ${
                                                                    lead.status === "new"
                                                                        ? "bg-rose-50 text-rose-700 border-rose-200"
                                                                        : lead.status === "in_progress"
                                                                            ? "bg-amber-50 text-amber-700 border-amber-200"
                                                                            : "bg-neutral-100 text-neutral-600 border-neutral-200"
                                                                }`}
                                                            >
                                                                <option value="new">● Новая</option>
                                                                <option value="in_progress">◐ В работе</option>
                                                                <option value="closed">✓ Закрыта</option>
                                                            </select>
                                                        </td>

                                                        <td className="py-3.5 px-5 text-right">
                                                            <div className="flex items-center justify-end gap-1.5">
                                                                {fullPhoneClean && (
                                                                    <>
                                                                        <a
                                                                            href={waLink}
                                                                            target="_blank"
                                                                            rel="noreferrer"
                                                                            title="Написать в WhatsApp"
                                                                            className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                                                                        >
                                                                            <WhatsAppIcon size={14} />
                                                                        </a>

                                                                        <a
                                                                            href={telLink}
                                                                            title="Позвонить"
                                                                            className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors"
                                                                        >
                                                                            <PhoneCall size={14} />
                                                                        </a>
                                                                    </>
                                                                )}

                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleDeleteLead(lead.id)}
                                                                    title="Удалить заявку"
                                                                    className="p-1.5 rounded-lg hover:bg-rose-50 text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
                                                                >
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ══ Вкладки-заглушки ══ */}
                    {["settings", "templates", "kb"].includes(activeTab) && (
                        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                            <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                                {activeTab} section
                            </span>
                            <p className="text-sm text-neutral-600 mt-2">
                                Данный раздел находится в разработке.
                            </p>
                        </div>
                    )}
                </main>
            </div>

            {/* ── МОДАЛЬНОЕ ОКНО: ПОДТВЕРЖДЕНИЕ УДАЛЕНИЯ ПО ПАРОЛЮ ── */}
            {projectToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
                    <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-neutral-200">
                        <div className="flex items-center gap-3 text-rose-600 mb-3">
                            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100">
                                <AlertTriangle size={22} />
                            </div>
                            <div>
                                <h3 className="font-bold text-base text-neutral-900">Удаление проекта</h3>
                                <p className="text-xs text-neutral-400 truncate max-w-[200px]">{projectToDelete.title}</p>
                            </div>
                        </div>

                        <p className="text-xs text-neutral-600 mb-4">
                            Для подтверждения безвозвратного удаления введите PIN-код администратора:
                        </p>

                        <form onSubmit={handleConfirmDeleteProject} className="space-y-4">
                            <div>
                                <input
                                    type="password"
                                    maxLength={6}
                                    autoFocus
                                    required
                                    value={deletePinInput}
                                    disabled={isSubmittingDelete}
                                    onChange={(e) => {
                                        setDeletePinInput(e.target.value);
                                        if (deletePinError) setDeletePinError(false);
                                    }}
                                    placeholder="••••"
                                    className="w-full text-center tracking-[0.3em] text-xl font-mono py-2.5 px-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-rose-500 transition-colors"
                                />
                                {deletePinError && (
                                    <div className="text-xs font-mono text-rose-500 font-semibold mt-1.5 text-center">
                                        Неверный PIN-код
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-1">
                                <button
                                    type="button"
                                    onClick={() => setProjectToDelete(null)}
                                    className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
                                >
                                    Отмена
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmittingDelete}
                                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs cursor-pointer disabled:opacity-50"
                                >
                                    {isSubmittingDelete ? "Проверка..." : "Удалить проект"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ── МОДАЛЬНОЕ ОКНО: ДОБАВЛЕНИЕ НОВОГО ПРОЕКТА ── */}
            {isAddProjectModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-neutral-200">
                        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                            <div>
                                <h3 className="font-bold text-lg text-neutral-900">Новый проект в архив</h3>
                                <p className="text-xs text-neutral-400">Он сразу станет доступен для превью клиентам</p>
                            </div>
                            <button
                                onClick={() => setIsAddProjectModalOpen(false)}
                                className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleCreateProject} className="space-y-3.5 pt-4">
                            <div>
                                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                                    Название проекта *
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Например, Vital CRM"
                                    value={formTitle}
                                    onChange={(e) => setFormTitle(e.target.value)}
                                    className="w-full px-3 py-2 border border-neutral-300 rounded-xl text-sm focus:outline-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                                    ID песочницы (Slug для /embed/[id]) *
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="vital-crm"
                                    value={formId}
                                    onChange={(e) => setFormId(e.target.value)}
                                    className="w-full px-3 py-2 border border-neutral-300 rounded-xl text-sm font-mono focus:outline-blue-500"
                                />
                                <span className="text-[10px] text-neutral-400 mt-0.5 block font-mono">
                                    URL фрейма: /embed/{formId || "ваш-slug"}
                                </span>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                                    Категория
                                </label>
                                <input
                                    type="text"
                                    placeholder="Fintech & CRM System"
                                    value={formCategory}
                                    onChange={(e) => setFormCategory(e.target.value)}
                                    className="w-full px-3 py-2 border border-neutral-300 rounded-xl text-sm focus:outline-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                                    Краткое описание (Tagline)
                                </label>
                                <input
                                    type="text"
                                    placeholder="Интеллектуальная система автоматизации процессов."
                                    value={formTagline}
                                    onChange={(e) => setFormTagline(e.target.value)}
                                    className="w-full px-3 py-2 border border-neutral-300 rounded-xl text-sm focus:outline-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                                    Ссылка на изображение обложки (Unsplash / URL)
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://images.unsplash.com/..."
                                    value={formImageUrl}
                                    onChange={(e) => setFormImageUrl(e.target.value)}
                                    className="w-full px-3 py-2 border border-neutral-300 rounded-xl text-sm focus:outline-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                                    Ссылка на реальный сайт
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://example.com"
                                    value={formExternalLink}
                                    onChange={(e) => setFormExternalLink(e.target.value)}
                                    className="w-full px-3 py-2 border border-neutral-300 rounded-xl text-sm focus:outline-blue-500"
                                />
                            </div>

                            <div className="pt-2 flex justify-end gap-2 border-t border-neutral-100">
                                <button
                                    type="button"
                                    onClick={() => setIsAddProjectModalOpen(false)}
                                    className="px-4 py-2 rounded-xl text-sm font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors"
                                >
                                    Отмена
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#2547F4] hover:bg-[#1C3BD9] text-white rounded-xl text-sm font-bold transition-colors shadow-xs"
                                >
                                    Сохранить
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ── ТЕСТОВЫЙ ПРЕДПРОСМОТР ПЕСОЧНИЦЫ (/embed/[id]) ── */}
            {previewProject && (
                <div
                    data-lenis-prevent="true"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 sm:p-6 animate-in fade-in duration-150"
                >
                    <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 w-full max-w-6xl h-[85vh] flex flex-col overflow-hidden">
                        <div className="h-12 border-b border-neutral-200 px-4 flex items-center justify-between shrink-0 bg-neutral-50/80">
                            <div className="flex items-center gap-2">
                                <Monitor size={15} className="text-neutral-500" />
                                <span className="font-bold text-sm text-neutral-900">{previewProject.title}</span>
                                <span className="text-xs text-neutral-400 font-mono">({previewProject.embedUrl})</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <a
                                    href={previewProject.externalLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200/60 transition-colors"
                                    title="Открыть сайт"
                                >
                                    <ExternalLink size={16} />
                                </a>
                                <button
                                    type="button"
                                    onClick={() => setPreviewProject(null)}
                                    className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200/60 transition-colors cursor-pointer"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 bg-white overflow-hidden relative">
                            <iframe
                                src={previewProject.embedUrl}
                                title={previewProject.title}
                                className="w-full h-full border-0"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}