import { test as base, expect } from "@playwright/test";

export const LOCALES = ["ru", "en", "kg"] as const; // как в src/i18n/routing.ts
export const DEFAULT_LOCALE = "ru";

export const PAGES = [
    "/",
    "/contacts",
    "/offers",
    "/projects",
    "/guarantee",
    "/solutions",
    "/solutions/3d-design",
    "/solutions/ai-chatbots",
    "/solutions/mobile-apps",
    "/solutions/security-audit",
    "/solutions/seo-opt",
    "/solutions/web-dev",
    "/solutions/additional/admin-panel",
    "/solutions/additional/domains",
    "/solutions/additional/hosting-server",
    "/solutions/additional/ssl-certificates",
    "/solutions/additional/technical-maintenance",
];

/** localePrefix: "as-needed" — у русского нет префикса */
export function localized(path: string, locale: string) {
    if (locale === DEFAULT_LOCALE) return path;
    return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/**
 * Известные баги сайта, которые пока не починены. Ошибки консоли, подходящие под эти
 * шаблоны, не валят тест. Когда баг исправлен — удалите строку отсюда.
 */
export const KNOWN_CONSOLE_ERRORS: RegExp[] = [
    // /projects ссылается на несуществующие страницы кейсов (/projects/punto-pago, /lumiere,
    // /aurora, /zenith, /strato, /kura) → 404 при prefetch ссылок
    /\/projects\/[^/?]+\?_rsc=/,
];

/** Известные случаи горизонтальной прокрутки: тест помечается как ожидаемо падающий. */
export const KNOWN_OVERFLOW: { url: string; project: string; reason: string }[] = [
    {
        url: "/kg/solutions/additional/admin-panel",
        project: "desktop",
        reason: "«0 мүнөт» (text-8xl) не влезает в колонку md:grid-cols-3 — scrollWidth 1546 > 1440",
    },
];

type Fixtures = { consoleErrors: string[] };

export const test = base.extend<Fixtures>({
    // Собираем ошибки консоли и необработанные исключения страницы
    consoleErrors: async ({ page }, use) => {
        const errors: string[] = [];
        page.on("console", (msg) => {
            if (msg.type() !== "error") return;
            const { url } = msg.location();
            if (KNOWN_CONSOLE_ERRORS.some((re) => re.test(url))) return;
            errors.push(`console: ${msg.text()}${url ? ` (${url})` : ""}`);
        });
        page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
        await use(errors);
    },
    page: async ({ page }, use) => {
        // Заявки никогда не уходят в настоящий /api/leads
        await page.route("**/api/leads**", (route) =>
            route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' }),
        );
        await use(page);
    },
});

export { expect };
