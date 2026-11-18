import { test, expect } from "./fixtures";

test.describe("мобильное меню", () => {
    test.skip(({ isMobile }) => !isMobile, "только на телефоне");

    test("открывается по кнопке с aria-controls", async ({ page }) => {
        await page.goto("/");
        const toggle = page.locator("header button[aria-controls]");
        await expect(toggle).toHaveAttribute("aria-expanded", "false");

        const menuId = await toggle.getAttribute("aria-controls");
        const menu = page.locator(`[id="${menuId}"]`);

        await toggle.click();
        await expect(toggle).toHaveAttribute("aria-expanded", "true");
        await expect(menu).toBeVisible();
        await expect(menu).toHaveCSS("opacity", "1");
        await expect(menu.getByRole("link").first()).toBeVisible();
    });
});

test.describe("переключатель языка", () => {
    async function openSwitcher(page: import("@playwright/test").Page, isMobile: boolean, current: string) {
        let scope = page.locator("header");
        if (isMobile) {
            const toggle = page.locator("header button[aria-controls]");
            await toggle.click();
            await expect(toggle).toHaveAttribute("aria-expanded", "true");
            scope = page.locator(`[id="${await toggle.getAttribute("aria-controls")}"]`);
        }
        await scope.getByRole("button", { name: current, exact: true }).click();
        return scope;
    }

    test("ru → en меняет префикс URL", async ({ page, isMobile }) => {
        await page.goto("/contacts");
        const scope = await openSwitcher(page, isMobile, "RU");
        await scope.getByRole("button", { name: "English" }).click();
        await expect(page).toHaveURL(/\/en\/contacts$/);
        await expect(page.locator("html")).toHaveAttribute("lang", "en");
    });

    test("en → kg → ru", async ({ page, isMobile }) => {
        await page.goto("/en/offers");
        let scope = await openSwitcher(page, isMobile, "EN");
        await scope.getByRole("button", { name: "Кыргызча" }).click();
        await expect(page).toHaveURL(/\/kg\/offers$/);

        scope = await openSwitcher(page, isMobile, "KG");
        await scope.getByRole("button", { name: "Русский" }).click();
        await expect(page).toHaveURL(/localhost:\d+\/offers$/);
    });
});
