"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    RefreshCw,
    Search,
    PhoneCall,
    Trash2,
    Lock,
    Clock,
    Inbox,
} from "lucide-react";

interface Lead {
    id: string;
    serviceId: string;
    serviceName: string;
    clientName: string;
    aboutDetails?: string;
    countryCode: string;
    phoneNumber: string;
    fullPhone: string;
    contactPreference: "message" | "call";
    createdAt: string;
    status: "new" | "in_progress" | "closed";
}

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

const DEFAULT_ADMIN_PIN = "2026";

export default function AdminPage() {
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [pinInput, setPinInput] = useState<string>("");
    const [pinError, setPinError] = useState<boolean>(false);

    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<"all" | "new" | "in_progress" | "closed">("all");

    // Предотвращение Hydration Mismatch
    useEffect(() => {
        setIsMounted(true);
        const storedAuth = sessionStorage.getItem("vt_admin_auth");
        if (storedAuth === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    // Стабильная функция загрузки
    const fetchLeads = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/leads");
            if (!res.ok) throw new Error("Ошибка ответа сервера");
            const data = await res.json();
            if (data.success) {
                setLeads(data.leads || []);
            }
        } catch (err) {
            console.error("Ошибка загрузки заявок:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchLeads();
        }
    }, [isAuthenticated, fetchLeads]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (pinInput.trim() === DEFAULT_ADMIN_PIN) {
            sessionStorage.setItem("vt_admin_auth", "true");
            setIsAuthenticated(true);
            setPinError(false);
        } else {
            setPinError(true);
            setPinInput("");
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem("vt_admin_auth");
        setIsAuthenticated(false);
        setPinInput("");
    };

    const handleStatusChange = async (id: string, newStatus: "new" | "in_progress" | "closed") => {
        try {
            const res = await fetch("/api/leads", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: newStatus }),
            });
            const data = await res.json();
            if (data.success) {
                setLeads((prev) =>
                    prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
                );
            } else {
                alert("Не удалось изменить статус");
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
            if (data.success) {
                setLeads((prev) => prev.filter((l) => l.id !== id));
            } else {
                alert("Ошибка при удалении заявки");
            }
        } catch (err) {
            console.error("Ошибка удаления:", err);
        }
    };

    const filteredLeads = useMemo(() => {
        return leads.filter((item) => {
            const matchesStatus = statusFilter === "all" || item.status === statusFilter;
            const q = searchQuery.toLowerCase().trim();
            if (!q) return matchesStatus;

            const matchesQuery =
                item.clientName.toLowerCase().includes(q) ||
                item.phoneNumber.includes(q) ||
                item.serviceName.toLowerCase().includes(q) ||
                Boolean(item.aboutDetails && item.aboutDetails.toLowerCase().includes(q));

            return matchesStatus && matchesQuery;
        });
    }, [leads, statusFilter, searchQuery]);

    const stats = useMemo(() => {
        return {
            total: leads.length,
            newCount: leads.filter((l) => l.status === "new").length,
            inProgress: leads.filter((l) => l.status === "in_progress").length,
            whatsappPreference: leads.filter((l) => l.contactPreference === "message").length,
        };
    }, [leads]);

    if (!isMounted) {
        return <div className="min-h-screen bg-neutral-950" />;
    }

    // Экран ввода пароля
    if (!isAuthenticated) {
        return (
            <main className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 text-white font-sans select-none">
                <div className="w-full max-w-sm rounded-[32px] bg-neutral-900 border border-neutral-800 p-8 space-y-6 shadow-2xl text-center">
                    <div className="w-14 h-14 rounded-2xl bg-neutral-800 border border-neutral-700 mx-auto flex items-center justify-center text-neutral-300">
                        <Lock size={24} />
                    </div>

                    <div className="space-y-1">
                        <h2 className="text-xl font-bold tracking-tight text-white uppercase font-mono">
                            Vital Tech Admin
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
                                onChange={(e) => {
                                    setPinInput(e.target.value);
                                    if (pinError) setPinError(false);
                                }}
                                placeholder="••••"
                                className="w-full text-center tracking-[0.4em] text-2xl font-mono py-3.5 px-4 rounded-xl bg-neutral-950 border border-neutral-700 text-white placeholder:text-neutral-600 focus:outline-hidden focus:border-white transition-colors"
                            />
                        </div>

                        {pinError && (
                            <div className="text-xs font-mono text-rose-500 font-medium">
                                Неверный PIN-код
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-3.5 rounded-xl bg-white text-neutral-950 font-mono text-xs uppercase font-bold tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
                        >
                            Войти
                        </button>
                    </form>

                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 hover:text-neutral-300 transition-colors"
                    >
                        <ArrowLeft size={13} />
                        <span>Вернуться на главную</span>
                    </Link>
                </div>
            </main>
        );
    }

    // Экран дашборда
    return (
        <main className="min-h-screen bg-[#F8FAFD] text-neutral-900 font-sans pb-24 select-none">
            <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-neutral-200/90 px-6 sm:px-12 py-4">
                <div className="max-w-[1544px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-neutral-950 transition-colors group"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            <span>На сайт</span>
                        </Link>
                        <span className="text-neutral-300">/</span>
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-xs uppercase font-bold tracking-wider text-neutral-950">
                                Vital Tech Control
                            </span>
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={fetchLeads}
                            title="Обновить список"
                            className="p-2.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 transition-colors cursor-pointer shadow-2xs"
                        >
                            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
                        </button>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="px-3.5 py-2 rounded-xl text-xs font-mono uppercase font-semibold border border-neutral-200 hover:bg-neutral-100 text-neutral-600 transition-colors cursor-pointer"
                        >
                            Выйти
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-[1544px] mx-auto px-6 sm:px-12 pt-8 space-y-8">
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-neutral-950">
                            Входящие заявки
                        </h1>
                        <p className="text-sm font-mono text-neutral-500 mt-1">
                            Все запросы, отправленные через форму контактов
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-1">
                            <div className="text-xs font-mono uppercase text-neutral-400 font-semibold flex items-center justify-between">
                                <span>Всего заявок</span>
                                <Inbox size={15} />
                            </div>
                            <div className="text-3xl font-bold font-mono text-neutral-950">
                                {stats.total}
                            </div>
                        </div>

                        <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-1">
                            <div className="text-xs font-mono uppercase text-rose-500 font-semibold flex items-center justify-between">
                                <span>Новые</span>
                                <span className="w-2 h-2 rounded-full bg-rose-500" />
                            </div>
                            <div className="text-3xl font-bold font-mono text-neutral-950">
                                {stats.newCount}
                            </div>
                        </div>

                        <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-1">
                            <div className="text-xs font-mono uppercase text-amber-600 font-semibold flex items-center justify-between">
                                <span>В обработке</span>
                                <Clock size={15} />
                            </div>
                            <div className="text-3xl font-bold font-mono text-neutral-950">
                                {stats.inProgress}
                            </div>
                        </div>

                        <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-1">
                            <div className="text-xs font-mono uppercase text-emerald-600 font-semibold flex items-center justify-between">
                                <span>Через WhatsApp</span>
                                <WhatsAppIcon size={15} className="text-[#25D366]" />
                            </div>
                            <div className="text-3xl font-bold font-mono text-neutral-950">
                                {stats.whatsappPreference}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div className="relative flex-1">
                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Поиск по имени, номеру телефона или услуге..."
                            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-hidden focus:border-neutral-900 focus:bg-white transition-colors"
                        />
                    </div>

                    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-100 border border-neutral-200/80 text-xs font-medium self-start sm:self-auto">
                        <button
                            type="button"
                            onClick={() => setStatusFilter("all")}
                            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                                statusFilter === "all" ? "bg-white text-neutral-950 font-bold shadow-2xs" : "text-neutral-500 hover:text-neutral-900"
                            }`}
                        >
                            Все ({leads.length})
                        </button>
                        <button
                            type="button"
                            onClick={() => setStatusFilter("new")}
                            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                                statusFilter === "new" ? "bg-white text-neutral-950 font-bold shadow-2xs" : "text-neutral-500 hover:text-neutral-900"
                            }`}
                        >
                            Новые ({stats.newCount})
                        </button>
                        <button
                            type="button"
                            onClick={() => setStatusFilter("in_progress")}
                            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                                statusFilter === "in_progress" ? "bg-white text-neutral-950 font-bold shadow-2xs" : "text-neutral-500 hover:text-neutral-900"
                            }`}
                        >
                            В работе
                        </button>
                        <button
                            type="button"
                            onClick={() => setStatusFilter("closed")}
                            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                                statusFilter === "closed" ? "bg-white text-neutral-950 font-bold shadow-2xs" : "text-neutral-500 hover:text-neutral-900"
                            }`}
                        >
                            Закрытые
                        </button>
                    </div>
                </div>

                <div className="rounded-[28px] bg-white border border-neutral-200/90 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-400 font-mono text-[11px] uppercase tracking-wider">
                            <tr>
                                <th className="py-4 px-6 font-semibold">Клиент</th>
                                <th className="py-4 px-6 font-semibold">Услуга</th>
                                <th className="py-4 px-6 font-semibold">Контакт / Предпочтение</th>
                                <th className="py-4 px-6 font-semibold">Дата</th>
                                <th className="py-4 px-6 font-semibold">Статус</th>
                                <th className="py-4 px-6 text-right font-semibold">Действия</th>
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
                                    // Надежная санитизация телефонных ссылок
                                    const cleanDigits = lead.phoneNumber.replace(/\D/g, "");
                                    const cleanCountry = lead.countryCode.replace(/\D/g, "");
                                    const fullPhoneClean = cleanCountry ? `${cleanCountry}${cleanDigits}` : cleanDigits;
                                    const waLink = `https://wa.me/${fullPhoneClean}`;
                                    const telLink = `tel:+${fullPhoneClean}`;

                                    return (
                                        <tr key={lead.id} className="hover:bg-neutral-50/70 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="font-bold text-neutral-950 text-[15px]">
                                                    {lead.clientName}
                                                </div>
                                                {lead.aboutDetails && (
                                                    <div className="text-xs text-neutral-500 max-w-xs truncate mt-0.5" title={lead.aboutDetails}>
                                                        {lead.aboutDetails}
                                                    </div>
                                                )}
                                            </td>

                                            <td className="py-4 px-6">
                                                    <span className="inline-block px-3 py-1 rounded-lg bg-neutral-100 text-neutral-800 text-xs font-semibold">
                                                        {lead.serviceName}
                                                    </span>
                                            </td>

                                            <td className="py-4 px-6">
                                                <div className="font-mono font-medium text-neutral-950">
                                                    {lead.countryCode} {lead.phoneNumber}
                                                </div>
                                                <div className="flex items-center gap-1.5 mt-1">
                                                    {lead.contactPreference === "message" ? (
                                                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                                                                <WhatsAppIcon size={12} className="text-[#25D366]" />
                                                                <span>Ждёт сообщение</span>
                                                            </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                                                                <PhoneCall size={11} />
                                                                <span>Ждёт телефонный звонок</span>
                                                            </span>
                                                    )}
                                                </div>
                                            </td>

                                            <td className="py-4 px-6 font-mono text-xs text-neutral-500">
                                                {new Date(lead.createdAt).toLocaleDateString("ru-RU", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </td>

                                            <td className="py-4 px-6">
                                                <select
                                                    value={lead.status}
                                                    onChange={(e) =>
                                                        handleStatusChange(
                                                            lead.id,
                                                            e.target.value as "new" | "in_progress" | "closed"
                                                        )
                                                    }
                                                    className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border focus:outline-hidden cursor-pointer ${
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

                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <a
                                                        href={waLink}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        title="Написать в WhatsApp"
                                                        className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors cursor-pointer"
                                                    >
                                                        <WhatsAppIcon size={16} />
                                                    </a>

                                                    <a
                                                        href={telLink}
                                                        title="Позвонить"
                                                        className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors cursor-pointer"
                                                    >
                                                        <PhoneCall size={16} />
                                                    </a>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteLead(lead.id)}
                                                        title="Удалить заявку"
                                                        className="p-2 rounded-xl hover:bg-rose-50 text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
                                                    >
                                                        <Trash2 size={16} />
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
        </main>
    );
}