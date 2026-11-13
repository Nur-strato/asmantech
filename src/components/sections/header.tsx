"use client";

import Image from "next/image";
import { usePathname, useRouter, Link } from "@/i18n/navigation";
import { useState, useEffect, useRef, useCallback, type MouseEvent } from "react";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { ArrowUpRight } from "lucide-react";
import { Curtain, type CurtainState } from "@/components/ui/curtain";

// --------------------------------------------------
// CONSTANTS & TYPES
// Акцент — глубокий синий #1E40AF, при наведении темнее #1E3A8A (на чёрном — светлее, #60A5FA).
// Скидка остаётся зелёной.
// --------------------------------------------------

const CURTAIN_TIMINGS = {
    ACTIVE: 350,
    LEAVE: 1250,
    IDLE: 1700,
} as const;

const SCROLL_THRESHOLD = 20;

interface NavItem {
    key: "solutions" | "projects" | "guarantee" | "offers";
    href: string;
    badge?: string;
}

const NAV_LINKS: readonly NavItem[] = [
    { key: "solutions", href: "/solutions" },
    { key: "projects", href: "/projects" },
    { key: "guarantee", href: "/guarantee" },
    { key: "offers", href: "/offers", badge: "−50%" },
];

const MOBILE_MENU_ID = "mobile-navigation";

const FOCUSABLE_SELECTOR = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
].join(",");

// Размеры ссылки навигации: общие для ссылки и её белой копии внутри индикатора
const LINK_BOX =
    "inline-flex h-10 items-center gap-2 whitespace-nowrap px-4 text-[15px] font-semibold tracking-tight xl:px-5 xl:text-base";

// Единый стиль фокуса с клавиатуры
const FOCUS_RING =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]";

// --------------------------------------------------
// SCROLL POSITION
// --------------------------------------------------

function useScrollPosition(threshold: number) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        let frame: number | null = null;

        const update = () => {
            setScrolled(window.scrollY > threshold);
            frame = null;
        };

        update();

        const onScroll = () => {
            if (frame !== null) return;
            frame = window.requestAnimationFrame(update);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            if (frame !== null) window.cancelAnimationFrame(frame);
        };
    }, [threshold]);

    return scrolled;
}

// --------------------------------------------------
// BODY SCROLL LOCK
// --------------------------------------------------

function useBodyScrollLock(isLocked: boolean) {
    useEffect(() => {
        if (!isLocked) return;

        const body = document.body;
        const originalOverflow = body.style.overflow;
        const originalPaddingRight = body.style.paddingRight;

        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        const currentPaddingRight = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;

        body.style.overflow = "hidden";
        if (scrollbarWidth > 0) {
            body.style.paddingRight = `${currentPaddingRight + scrollbarWidth}px`;
        }

        return () => {
            body.style.overflow = originalOverflow;
            body.style.paddingRight = originalPaddingRight;
        };
    }, [isLocked]);
}

// --------------------------------------------------
// MOBILE MENU ACCESSIBILITY
// Капсула и панель — одна область: фокус переходит в панель и не уходит за пределы шапки
// --------------------------------------------------

function useMobileMenuAccessibility(isOpen: boolean, onClose: () => void) {
    const areaRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const visible = (root: HTMLElement | null) =>
            Array.from(root?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? []).filter(
                (el) => !el.hasAttribute("disabled") && el.getClientRects().length > 0
            );

        visible(panelRef.current)[0]?.focus();

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
                onClose();
                return;
            }
            if (event.key !== "Tab") return;

            const focusable = visible(areaRef.current);
            if (focusable.length === 0) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            const active = document.activeElement;

            if (event.shiftKey && (active === first || !areaRef.current?.contains(active))) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && (active === last || !areaRef.current?.contains(active))) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            if (triggerRef.current?.isConnected) triggerRef.current.focus();
        };
    }, [isOpen, onClose]);

    return { areaRef, panelRef, triggerRef };
}

// --------------------------------------------------
// SLIDING INDICATOR
// Капсула едет к ссылке под курсором и возвращается к текущей.
// Первое появление — без «выезда» из левого края; исчезновение — на месте, без съезжания в ноль.
// --------------------------------------------------

function useSlidingIndicator(highlight: string | null, firstKey: string) {
    const navRef = useRef<HTMLUListElement>(null);
    const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
    const visibleRef = useRef(false);

    // left/width — положение капсулы; origin — где начинается первая ссылка (для белой копии текста)
    const [pos, setPos] = useState<{ left: number; width: number; origin: number } | null>(null);
    const [visible, setVisible] = useState(false);
    const [instant, setInstant] = useState(true);

    const measure = useCallback(() => {
        const nav = navRef.current;
        const el = highlight ? linkRefs.current[highlight] : null;
        const first = linkRefs.current[firstKey];

        if (!nav || !el || !first || el.offsetWidth === 0) {
            visibleRef.current = false;
            setVisible(false);
            return;
        }

        // Считаем от самой дорожки: offsetLeft врёт, если у <li> есть позиционирование
        const base = nav.getBoundingClientRect().left;
        const r = el.getBoundingClientRect();
        const next = {
            left: r.left - base,
            width: r.width,
            origin: first.getBoundingClientRect().left - base,
        };

        if (!visibleRef.current) {
            // Ставим на место мгновенно, затем включаем плавность
            visibleRef.current = true;
            setInstant(true);
            setPos(next);
            setVisible(true);
            requestAnimationFrame(() => requestAnimationFrame(() => setInstant(false)));
        } else {
            setPos(next);
        }
    }, [highlight, firstKey]);

    useEffect(() => {
        measure();
        const nav = navRef.current;
        if (!nav) return;
        const ro = new ResizeObserver(measure);
        ro.observe(nav);
        return () => ro.disconnect();
    }, [measure]);

    // Шрифты догружаются позже первого замера — перемеряем
    useEffect(() => {
        if (typeof document === "undefined" || !document.fonts) return;
        document.fonts.ready.then(measure).catch(() => {});
    }, [measure]);

    return { navRef, linkRefs, pos, visible, instant };
}

// --------------------------------------------------
// HEADER
// --------------------------------------------------

export function Header() {
    const t = useTranslations("Header");
    const tNav = useTranslations("Nav");

    const pathname = usePathname();
    const router = useRouter();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [curtainState, setCurtainState] = useState<CurtainState>("idle");
    const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

    const scrolled = useScrollPosition(SCROLL_THRESHOLD);

    useBodyScrollLock(mobileOpen);

    // Стабильная функция: иначе эффект доступности перезапускался бы на каждом рендере
    const closeMobileMenu = useCallback(() => setMobileOpen(false), []);

    const { areaRef, panelRef, triggerRef } = useMobileMenuAccessibility(mobileOpen, closeMobileMenu);

    const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
    const isContactsActive = isActive("/contacts");

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (!mobileOpen) return;
        const mq = window.matchMedia("(min-width: 1024px)");
        const onChange = () => mq.matches && setMobileOpen(false);
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, [mobileOpen]);

    // --------------------------------------------------
    // INDICATOR STATE
    // --------------------------------------------------

    const [hoverKey, setHoverKey] = useState<string | null>(null);
    const activeKey = NAV_LINKS.find((item) => isActive(item.href))?.key ?? null;
    const highlight = hoverKey ?? activeKey;
    const { navRef, linkRefs, pos, visible, instant } = useSlidingIndicator(highlight, NAV_LINKS[0].key);

    // --------------------------------------------------
    // CURTAIN TIMER MANAGEMENT
    // --------------------------------------------------

    const clearCurtainTimers = () => {
        timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
        timeoutsRef.current = [];
    };

    useEffect(() => () => clearCurtainTimers(), []);

    // --------------------------------------------------
    // HOME NAVIGATION
    // --------------------------------------------------

    const handleHomeClick = (event: MouseEvent<HTMLAnchorElement>) => {
        const isModifiedClick =
            event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
        const target = event.currentTarget.getAttribute("target");
        const hasDownload = event.currentTarget.hasAttribute("download");

        if (event.defaultPrevented || isModifiedClick || (target && target !== "_self") || hasDownload) {
            return;
        }

        if (curtainState !== "idle") {
            event.preventDefault();
            return;
        }

        event.preventDefault();
        closeMobileMenu();

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion) {
            if (pathname === "/") {
                window.scrollTo({ top: 0, behavior: "auto" });
            } else {
                router.push("/");
            }
            return;
        }

        clearCurtainTimers();
        setCurtainState("enter");

        const activeTimer = setTimeout(() => {
            setCurtainState("active");
            if (pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                router.push("/");
            }
        }, CURTAIN_TIMINGS.ACTIVE);

        const leaveTimer = setTimeout(() => setCurtainState("leave"), CURTAIN_TIMINGS.LEAVE);

        const idleTimer = setTimeout(() => {
            setCurtainState("idle");
            timeoutsRef.current = [];
        }, CURTAIN_TIMINGS.IDLE);

        timeoutsRef.current = [activeTimer, leaveTimer, idleTimer];
    };

    // --------------------------------------------------
    // PIECES: обычные функции, а не компоненты, чтобы ссылки не пересоздавались и не теряли фокус
    // --------------------------------------------------

    // Скидка — зелёная, это единственный зелёный элемент в шапке
    const renderBadge = (value: string, large = false) => (
        <span
            className={`inline-flex items-center rounded-full bg-[#E7F8EE] font-extrabold leading-none tracking-tight text-[#058447] tabular-nums ${
                large ? "px-2.5 py-1.5 text-sm" : "px-2 py-1 text-xs"
            }`}
        >
            {value}
        </span>
    );

    // Содержимое ссылки навигации: одно и то же для настоящей ссылки и для белой копии в капсуле
    const renderLinkContent = (item: NavItem) => (
        <>
            <span>{tNav(item.key)}</span>
            {item.badge && renderBadge(item.badge)}
        </>
    );

    const renderContactsCta = (mobile = false) => (
        <Link
            href="/contacts"
            onClick={mobile ? closeMobileMenu : undefined}
            aria-current={isContactsActive ? "page" : undefined}
            className={`group inline-flex items-center justify-between font-semibold transition-colors duration-200 active:scale-[0.98] motion-reduce:transition-none ${FOCUS_RING} focus-visible:outline-offset-4 ${
                mobile
                    ? "h-16 w-full gap-6 rounded-[20px] pl-6 pr-2 text-lg"
                    : "h-11 gap-3 rounded-full pl-5 pr-1 text-[15px]"
            } ${
                isContactsActive
                    ? "border-2 border-neutral-950 bg-white text-neutral-950"
                    : "bg-neutral-950 text-white hover:bg-neutral-800"
            }`}
        >
            <span>{mobile ? t("contactUs") : tNav("contacts")}</span>
            <span
                className={`grid place-items-center bg-[#1E40AF] text-white transition-[transform,background-color] duration-300 group-hover:rotate-45 group-hover:bg-[#1E3A8A] motion-reduce:transition-none ${
                    mobile ? "size-12 rounded-2xl" : "size-9 rounded-full"
                }`}
            >
                <ArrowUpRight size={mobile ? 20 : 16} aria-hidden="true" />
            </span>
        </Link>
    );

    // --------------------------------------------------
    // RENDER
    // --------------------------------------------------

    return (
        <>
            <Curtain state={curtainState} />

            {/* Затемнение под мобильной панелью */}
            <div
                aria-hidden="true"
                onClick={closeMobileMenu}
                className={`fixed inset-0 z-40 bg-neutral-950/30 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none lg:hidden ${
                    mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
            />

            <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-5 sm:pt-[max(1.25rem,env(safe-area-inset-top))]">
                <div ref={areaRef} className="mx-auto max-w-[1240px]">
                    {/* ── КАПСУЛА ── */}
                    <div
                        className={`pointer-events-auto relative mx-auto flex items-center justify-between gap-4 rounded-full border pl-5 pr-1.5 backdrop-blur-xl backdrop-saturate-150 transition-[max-width,height,box-shadow,border-color,background-color] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none sm:pl-6 lg:pr-2 ${
                            scrolled || mobileOpen
                                ? "h-14 max-w-[1120px] border-neutral-200 bg-white/90 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_18px_50px_-24px_rgba(15,23,42,0.4)] lg:h-[60px]"
                                : "h-16 max-w-[1240px] border-neutral-200/70 bg-white/80 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_10px_40px_-28px_rgba(15,23,42,0.3)] lg:h-[68px]"
                        }`}
                    >
                        {/* Логотип: при наведении переворачивается в «Главная» */}
                        <Link
                            href="/"
                            onClick={handleHomeClick}
                            aria-label={t("homeAria")}
                            className="group relative flex h-9 w-32 shrink-0 cursor-pointer select-none items-center rounded-sm [perspective:1000px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF] focus-visible:ring-offset-4 sm:w-36"
                        >
                            <div className="pointer-events-none absolute inset-0 flex origin-bottom transform-gpu items-center transition-[transform,opacity] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] [backface-visibility:hidden] group-hover:opacity-0 group-hover:[transform:rotateX(90deg)_translateY(-6px)] motion-reduce:transition-none">
                                <div className="relative flex h-7 w-28 items-center sm:h-8 sm:w-32">
                                    <Image
                                        src="/images/logo.png?v=2"
                                        alt=""
                                        fill
                                        priority
                                        sizes="(max-width: 640px) 130px, 150px"
                                        className="origin-left scale-[1.17] object-contain object-left sm:scale-[1.26]"
                                    />
                                </div>
                            </div>
                            <div className="pointer-events-none absolute inset-0 flex origin-top transform-gpu items-center opacity-0 transition-[transform,opacity] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] [backface-visibility:hidden] [transform:rotateX(-90deg)_translateY(6px)] group-hover:opacity-100 group-hover:[transform:rotateX(0deg)_translateY(0)] motion-reduce:transition-none">
                                <span className="text-[22px] font-extrabold tracking-[-0.03em] text-neutral-950 sm:text-[24px]">
                                    {t("home")}
                                </span>
                            </div>
                        </Link>

                        {/* Навигация: сегментированный переключатель со скользящей капсулой */}
                        <nav aria-label="Main navigation" className="hidden lg:block">
                            <ul
                                ref={navRef}
                                onMouseLeave={() => setHoverKey(null)}
                                className="relative m-0 flex list-none items-center rounded-full bg-neutral-100/90 p-1 ring-1 ring-inset ring-neutral-200/60"
                            >
                                {/* Капсула-индикатор. Внутри — белая копия подписей, сдвинутая ровно на столько же,
                                    на сколько сдвинута капсула: белый текст всегда точно под чёрным фоном,
                                    без момента «белое на сером» или «серое на чёрном» во время движения */}
                                <li aria-hidden="true" className="contents">
                                    <span
                                        className={`pointer-events-none absolute bottom-1 top-1 overflow-hidden rounded-full bg-neutral-950 shadow-[0_6px_16px_-8px_rgba(15,23,42,0.6)] ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none ${
                                            instant ? "transition-opacity duration-200" : "transition-[left,width,opacity] duration-300"
                                        }`}
                                        style={{
                                            left: pos?.left ?? 0,
                                            width: pos?.width ?? 0,
                                            opacity: visible ? 1 : 0,
                                        }}
                                    >
                                        <span
                                            className={`absolute inset-y-0 left-0 flex ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none ${
                                                instant ? "" : "transition-transform duration-300"
                                            }`}
                                            style={{ transform: `translateX(${(pos?.origin ?? 0) - (pos?.left ?? 0)}px)` }}
                                        >
                                            {NAV_LINKS.map((item) => (
                                                <span key={item.key} className={`${LINK_BOX} text-white`}>
                                                    {renderLinkContent(item)}
                                                </span>
                                            ))}
                                        </span>
                                    </span>
                                </li>

                                {NAV_LINKS.map((item) => (
                                    <li key={item.key}>
                                        <Link
                                            ref={(el) => {
                                                linkRefs.current[item.key] = el;
                                            }}
                                            href={item.href}
                                            aria-current={activeKey === item.key ? "page" : undefined}
                                            onMouseEnter={() => setHoverKey(item.key)}
                                            onFocus={() => setHoverKey(item.key)}
                                            onBlur={() => setHoverKey(null)}
                                            className={`${LINK_BOX} rounded-full text-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF] focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-100`}
                                        >
                                            {renderLinkContent(item)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Справа */}
                        <div className="flex items-center gap-3">
                            <div className="hidden lg:block">
                                <LocaleSwitcher />
                            </div>
                            <div className="hidden lg:block">{renderContactsCta()}</div>

                            {/* Кнопка меню: две полоски превращаются в крестик */}
                            <button
                                ref={triggerRef}
                                type="button"
                                onClick={() => setMobileOpen((v) => !v)}
                                aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
                                aria-expanded={mobileOpen}
                                aria-controls={MOBILE_MENU_ID}
                                className={`relative grid size-11 cursor-pointer place-items-center rounded-full text-white transition-colors active:scale-95 motion-reduce:transition-none lg:hidden ${FOCUS_RING} ${
                                    mobileOpen ? "bg-[#1E40AF] hover:bg-[#1E3A8A]" : "bg-neutral-950 hover:bg-neutral-800"
                                }`}
                            >
                                <span
                                    aria-hidden="true"
                                    className={`absolute h-[2px] w-[18px] rounded-full bg-current transition-transform duration-300 motion-reduce:transition-none ${
                                        mobileOpen ? "rotate-45" : "-translate-y-[4px]"
                                    }`}
                                />
                                <span
                                    aria-hidden="true"
                                    className={`absolute h-[2px] w-[18px] rounded-full bg-current transition-transform duration-300 motion-reduce:transition-none ${
                                        mobileOpen ? "-rotate-45" : "translate-y-[4px]"
                                    }`}
                                />
                            </button>
                        </div>
                    </div>

                    {/* ── МОБИЛЬНАЯ ПАНЕЛЬ: выпадает из капсулы ── */}
                    <div
                        ref={panelRef}
                        id={MOBILE_MENU_ID}
                        aria-hidden={!mobileOpen}
                        inert={!mobileOpen}
                        data-lenis-prevent="true"
                        className={`mt-3 max-h-[calc(100dvh-100px)] origin-top overflow-y-auto overscroll-contain rounded-[28px] border border-neutral-200 bg-white p-3 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.45)] transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none lg:hidden ${
                            mobileOpen
                                ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                                : "pointer-events-none -translate-y-2 scale-[0.97] opacity-0"
                        }`}
                    >
                        <nav aria-label="Mobile navigation links">
                            <ul className="m-0 grid list-none gap-2 p-0">
                                {NAV_LINKS.map((item, i) => {
                                    const active = isActive(item.href);
                                    return (
                                        <li
                                            key={item.key}
                                            style={{ transitionDelay: mobileOpen ? `${60 + i * 40}ms` : "0ms" }}
                                            className={`transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none ${
                                                mobileOpen ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"
                                            }`}
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={closeMobileMenu}
                                                aria-current={active ? "page" : undefined}
                                                className={`group flex h-[68px] items-center justify-between gap-4 rounded-[20px] px-5 transition-colors motion-reduce:transition-none ${FOCUS_RING} ${
                                                    active
                                                        ? "bg-neutral-950 text-white"
                                                        : "bg-neutral-100 text-neutral-950 hover:bg-neutral-200/80"
                                                }`}
                                            >
                                                <span className="flex min-w-0 items-center gap-3">
                                                    <span className="truncate text-2xl font-extrabold tracking-[-0.03em]">
                                                        {tNav(item.key)}
                                                    </span>
                                                    {item.badge && renderBadge(item.badge, true)}
                                                </span>
                                                {active ? (
                                                    <span aria-hidden="true" className="mr-1.5 size-2.5 shrink-0 rounded-full bg-[#60A5FA]" />
                                                ) : (
                                                    <ArrowUpRight
                                                        size={20}
                                                        aria-hidden="true"
                                                        className="shrink-0 text-neutral-400 transition-[transform,color] duration-300 group-hover:rotate-45 group-hover:text-[#1E40AF] motion-reduce:transition-none"
                                                    />
                                                )}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        <div className="mt-2 flex items-center justify-between gap-4 rounded-[20px] border border-neutral-200 px-5 py-4">
                            <LocaleSwitcher className="text-[15px]" />
                            <span className="text-sm text-neutral-500">{t("itSolutions")}</span>
                        </div>

                        <div className="mt-2">{renderContactsCta(true)}</div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;