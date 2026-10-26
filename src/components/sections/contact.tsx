"use client";

import React from "react";
import { ArrowRight, MessageSquare, Mail } from "lucide-react";

export function Contact() {
    return (
        <section id="contact" className="space-y-6 pt-2">
            {/* Внешний статус-бар в едином стиле с Partners и Projects */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 px-1">
                <div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
                        Get In Touch
                    </h3>
                </div>
                <span className="text-xs sm:text-sm text-neutral-400 font-medium">
                    Available for select contracts & builds
                </span>
            </div>

            {/* Основная плашка */}
            <div className="bg-[#FAF6F4] rounded-[36px] p-8 md:p-14 border border-neutral-200/60 shadow-xs">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    <div className="lg:col-span-6 space-y-5">
                        <h3 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
                            Готовы запустить ваш следующий цифровой продукт?
                        </h3>
                        <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-md font-normal">
                            Расскажите нам о задаче, платформе или бизнес-цели. Мы проведем бесплатный аудит требований, оценим сроки и предложим архитектуру.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <a
                                href="https://t.me/vitaltech_lab"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-2xs"
                            >
                                <MessageSquare size={15} /> Написать в Telegram
                            </a>
                            <a
                                href="mailto:hello@vital-tech.dev"
                                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-neutral-800 border border-neutral-200/80 text-xs font-semibold hover:bg-neutral-50 transition-colors shadow-2xs"
                            >
                                <Mail size={15} /> hello@vital-tech.dev
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-6 bg-white/95 rounded-[28px] p-6 sm:p-9 border border-neutral-200/70 shadow-sm">
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                                    Ваше имя
                                </label>
                                <input
                                    type="text"
                                    placeholder="Алексей"
                                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF6F4]/40 border border-neutral-200 text-sm focus:outline-hidden focus:border-neutral-900 focus:bg-white transition-all placeholder:text-neutral-400"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                                    Telegram или Email для связи
                                </label>
                                <input
                                    type="text"
                                    placeholder="@username или work@domain.com"
                                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF6F4]/40 border border-neutral-200 text-sm focus:outline-hidden focus:border-neutral-900 focus:bg-white transition-all placeholder:text-neutral-400"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                                    О задаче
                                </label>
                                <textarea
                                    rows={3}
                                    placeholder="Опишите продукт, сроки или технические пожелания..."
                                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF6F4]/40 border border-neutral-200 text-sm focus:outline-hidden focus:border-neutral-900 focus:bg-white transition-all placeholder:text-neutral-400 resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3.5 px-5 rounded-2xl bg-[#D84C69] hover:bg-[#c24058] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.99]"
                            >
                                Отправить заявку <ArrowRight size={15} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}