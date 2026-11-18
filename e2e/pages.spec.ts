import { test, expect, LOCALES, PAGES, KNOWN_OVERFLOW, localized } from "./fixtures";

for (const locale of LOCALES) {
    test.describe(`страницы [${locale}]`, () => {
        for (const path of PAGES) {
            const url = localized(path, locale);

            test(`${url} — 200, без ошибок в консоли и горизонтальной прокрутки`, async ({
                page,
                consoleErrors,
            }, testInfo) => {
                const known = KNOWN_OVERFLOW.find((k) => k.url === url && k.project === testInfo.project.name);
                test.fail(!!known, `известный баг: ${known?.reason}`);

                const response = await page.goto(url, { waitUntil: "load" });
                expect(response?.status(), `статус ${url}`).toBe(200);
                await expect(page.locator("html")).toHaveAttribute("lang", /.+/);

                // даём клиентским эффектам/анимациям отработать
                await page.waitForTimeout(500);

                const { scrollWidth, innerWidth } = await page.evaluate(() => ({
                    scrollWidth: document.documentElement.scrollWidth,
                    innerWidth: window.innerWidth,
                }));
                expect(scrollWidth, "горизонтальная прокрутка").toBeLessThanOrEqual(innerWidth);

                expect(consoleErrors, "ошибки в консоли").toEqual([]);
            });
        }
    });
}
