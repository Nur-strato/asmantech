"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowUpRight,
    Edit3,
    Sparkles,
    CheckCircle2,
    Clock,
    Layers,
    Smartphone,
    Globe,
} from "lucide-react";

export default function AdminPanelPage() {
    // Интерактивный предпросмотр: пользователь меняет данные в «админке» и сразу видит результат на «сайте»
    const [bannerTitle, setBannerTitle] = useState("Весенняя скидка 20% на все услуги");
    const [servicePrice, setServicePrice] = useState("12 000");
    const [badgeText, setBadgeText] = useState("Хит продаж");
    const [isPublished, setIsPublished] = useState(true);

    return (
        <main className="w-full min-h-screen bg-[#FCFCFD] text-neutral-950 pt-28 sm:pt-36 pb-36 selection:bg-neutral-900 selection:text-white">
            <div className="w-[88vw] max-w-[1240px] mx-auto space-y-28 sm:space-y-40">

                {/* 01. Назад */}
                <div>
                    <Link
                        href="/#solutions"
                        className="inline-flex items-center gap-2 text-neutral-400 hover:text-neutral-950 font-mono text-xs uppercase tracking-[0.2em] transition-colors group"
                    >
                        <ArrowLeft
                            size={15}
                            className="transition-transform group-hover:-translate-x-1.5"
                        />
                        <span>Назад к решениям</span>
                    </Link>
                </div>

                {/* 02. Главный крупный заголовок */}
                <div className="space-y-8 max-w-5xl">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/80 font-mono text-xs uppercase tracking-widest text-neutral-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Управление контентом / CMS
                    </div>

                    <h1 className="font-sans font-black text-6xl sm:text-8xl lg:text-[100px] tracking-[-0.045em] leading-[0.93] text-neutral-950">
                        Меняйте сайт сами. <br />
                        <span className="text-neutral-400 font-normal">Без программистов.</span>
                    </h1>

                    <p className="font-sans text-neutral-500 text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight leading-snug max-w-3xl pt-2">
                        Новый баннер, смена цен, публикация кейса или новости — всё редактируется за 30 секунд прямо с телефона или ноутбука.
                    </p>
                </div>

                {/* 03. ЖИВОЙ ИНТЕРАКТИВНЫЙ МАКЕТ: «Админка слева — Сайт справа» */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-neutral-400">
                        <span>Интерактивный симулятор</span>
                        <span>Попробуйте отредактировать текст слева</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                        {/* ЛЕВАЯ КОЛОНКА: Панель управления (форма ввода) */}
                        <div className="lg:col-span-5 rounded-[36px] bg-white border border-neutral-200/90 p-8 sm:p-10 space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col justify-between">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-xl bg-neutral-950 text-white flex items-center justify-center">
                                            <Edit3 size={15} />
                                        </div>
                                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-900">
                                            Ваша панель управления
                                        </span>
                                    </div>
                                    <span className="font-mono text-[11px] text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-semibold">
                                        Автосохранение
                                    </span>
                                </div>

                                {/* Поле 1: Заголовок акции */}
                                <div className="space-y-2">
                                    <label className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-medium block">
                                        Заголовок на главной
                                    </label>
                                    <input
                                        type="text"
                                        value={bannerTitle}
                                        onChange={(e) => setBannerTitle(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50/70 text-sm font-sans font-medium focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                                    />
                                </div>

                                {/* Поле 2: Стоимость */}
                                <div className="space-y-2">
                                    <label className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-medium block">
                                        Цена товара / услуги (KGS)
                                    </label>
                                    <input
                                        type="text"
                                        value={servicePrice}
                                        onChange={(e) => setServicePrice(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50/70 text-sm font-sans font-medium focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                                    />
                                </div>

                                {/* Поле 3: Бейдж */}
                                <div className="space-y-2">
                                    <label className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-medium block">
                                        Бейдж статуса
                                    </label>
                                    <input
                                        type="text"
                                        value={badgeText}
                                        onChange={(e) => setBadgeText(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50/70 text-sm font-sans font-medium focus:outline-none focus:border-neutral-950 focus:bg-white transition-all"
                                    />
                                </div>
                            </div>

                            <p className="font-sans text-xs text-neutral-400 pt-4 border-t border-neutral-100">
                                💡 Никакого кода. Редактируется так же просто, как написать сообщение в мессенджере.
                            </p>
                        </div>

                        {/* ПРАВАЯ КОЛОНКА: Как это мгновенно отображается на сайте */}
                        <div className="lg:col-span-7 rounded-[36px] bg-neutral-950 text-white p-8 sm:p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                            <div className="space-y-8">
                                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pb-4 border-b border-neutral-800">
                                    <div className="flex items-center gap-2">
                                        <Globe size={14} className="text-emerald-400" />
                                        <span>ваш-сайт.kg (Витрина для клиентов)</span>
                                    </div>
                                    <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Обновлено сейчас
                                    </span>
                                </div>

                                {/* Сам обновляющийся блок */}
                                <div className="p-8 sm:p-10 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-6">
                                    <span className="inline-block px-3 py-1 rounded-md bg-white text-neutral-950 font-mono text-xs font-bold uppercase tracking-wider">
                                        {badgeText || "Новинка"}
                                    </span>

                                    <h3 className="font-sans font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                                        {bannerTitle || "Введите заголовок в поле слева..."}
                                    </h3>

                                    <div className="flex items-baseline gap-3 pt-2">
                                        <span className="font-mono text-3xl sm:text-4xl font-extrabold text-emerald-400">
                                            {servicePrice} KGS
                                        </span>
                                        <span className="font-sans text-sm text-neutral-400">
                                            / актуальная цена на сайте
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 flex items-center gap-2 text-xs font-mono text-neutral-400">
                                <CheckCircle2 size={15} className="text-emerald-400" />
                                <span>Дизайн и верстка защищены: текст никогда не съедет и не сломает страницу.</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 04. 3 ГЛАВНЫХ ПРЕИМУЩЕСТВА С ОГРОМНЫМИ ЦИФРАМИ */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 border-y border-neutral-200 py-16 sm:py-20">
                    <div className="space-y-4">
                        <span className="font-sans font-black text-6xl sm:text-7xl lg:text-8xl tracking-tight text-neutral-950 block">
                            0 минут
                        </span>
                        <h3 className="font-sans font-bold text-2xl text-neutral-900">
                            Ожидания правок
                        </h3>
                        <p className="font-sans text-neutral-500 text-lg leading-relaxed">
                            Не нужно составлять ТЗ, отправлять задачу в чат и ждать, пока программист освободится. Зашли и поменяли сами.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <span className="font-sans font-black text-6xl sm:text-7xl lg:text-8xl tracking-tight text-neutral-950 block">
                            100%
                        </span>
                        <h3 className="font-sans font-bold text-2xl text-neutral-900">
                            Безопасность дизайна
                        </h3>
                        <p className="font-sans text-neutral-500 text-lg leading-relaxed">
                            Мы программируем строгие шаблоны. Какой бы длины текст или фото вы ни загрузили — сайт всегда остаётся идеальным.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <span className="font-sans font-black text-6xl sm:text-7xl lg:text-8xl tracking-tight text-neutral-950 block">
                            С телефона
                        </span>
                        <h3 className="font-sans font-bold text-2xl text-neutral-900">
                            Управление на ходу
                        </h3>
                        <p className="font-sans text-neutral-500 text-lg leading-relaxed">
                            Удобный мобильный интерфейс: можно отключить товар не в наличии или обновить акцию прямо стоя в пробке.
                        </p>
                    </div>
                </div>

                {/* 05. ЧТО ИМЕННО ВЫ СМОЖЕТЕ МЕНЯТЬ САМИ */}
                <div className="space-y-12">
                    <div className="max-w-2xl">
                        <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 block mb-3">
                            Возможности админки
                        </span>
                        <h2 className="font-sans font-extrabold text-3xl sm:text-5xl tracking-tight text-neutral-950">
                            Полный контроль над содержимым
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                title: "Товары и цены",
                                desc: "Меняйте стоимость, добавляйте скидки, скрывайте позиции, которых временно нет на складе.",
                            },
                            {
                                title: "Кейсы и портфолио",
                                desc: "Загружайте фотографии выполненных проектов, описания задач и отзывы довольных клиентов.",
                            },
                            {
                                title: "Баннеры и акции",
                                desc: "Запускайте сезонные предложения и меняйте главные заголовки к праздникам в пару кликов.",
                            },
                            {
                                title: "Контакты и адреса",
                                desc: "Обновляйте номера телефонов WhatsApp, адреса филиалов и график работы без разработчиков.",
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="p-8 rounded-[30px] bg-neutral-50/80 border border-neutral-200/80 space-y-4 hover:border-neutral-400 transition-all"
                            >
                                <h3 className="font-sans font-bold text-xl text-neutral-950">
                                    {item.title}
                                </h3>
                                <p className="font-sans text-neutral-500 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 06. КОНТРАСТ: КАК БЫЛО VS КАК СТАЛО */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="rounded-[40px] bg-neutral-100 p-10 sm:p-14 space-y-6">
                        <span className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-400 block">
                            Без админ-панели
                        </span>
                        <h4 className="font-sans font-bold text-3xl sm:text-4xl text-neutral-950 tracking-tight">
                            Зависимость от разработчика на каждый чих.
                        </h4>
                        <p className="font-sans text-neutral-600 text-lg leading-relaxed">
                            Опечатка в номере телефона? Ждёте 2 дня, пока программист откроет код. Нужно сменить акционную цену? Платите за работу над мелкой правкой.
                        </p>
                    </div>

                    <div className="rounded-[40px] bg-neutral-950 text-white p-10 sm:p-14 space-y-6">
                        <span className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-400 block">
                            С нашей админ-панелью
                        </span>
                        <h4 className="font-sans font-bold text-3xl sm:text-4xl text-white tracking-tight">
                            Полная свобода действий вашей команды.
                        </h4>
                        <p className="font-sans text-neutral-400 text-lg leading-relaxed">
                            Открыли браузер, ввели новый текст или загрузили фото, нажали «Опубликовать». Через 1 секунду клиенты видят свежую информацию.
                        </p>
                    </div>
                </div>

                {/* 07. ФИНАЛЬНЫЙ БЛОК ДЕЙСТВИЯ */}
                <div className="pt-12 border-t border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
                    <div className="space-y-2">
                        <h2 className="font-sans font-extrabold text-3xl sm:text-5xl tracking-tight text-neutral-950">
                            Хотите сайт с понятным управлением?
                        </h2>
                        <p className="font-sans text-neutral-500 text-lg">
                            Сделаем панель, в которой разберётся любой ваш сотрудник за 5 минут.
                        </p>
                    </div>

                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider font-bold transition-all active:scale-95 shrink-0 shadow-xl"
                    >
                        <span>Обсудить сайт с админкой</span>
                        <ArrowUpRight size={16} />
                    </Link>
                </div>

            </div>
        </main>
    );
}