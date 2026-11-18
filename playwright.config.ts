import { defineConfig, devices } from "@playwright/test";

// Отдельный порт, чтобы не конфликтовать с `npm run dev` на 3000
const PORT = Number(process.env.E2E_PORT ?? 3100);
const BASE_URL = `http://localhost:${PORT}`;

// E2E_SKIP_BUILD=1 — не пересобирать, если `next build` уже сделан
const serverCommand = process.env.E2E_SKIP_BUILD
    ? `npx next start -p ${PORT}`
    : `npx next build && npx next start -p ${PORT}`;

export default defineConfig({
    testDir: "./e2e",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
    timeout: 45_000,
    use: {
        baseURL: BASE_URL,
        trace: "retain-on-failure",
        screenshot: "only-on-failure",
    },
    projects: [
        {
            name: "desktop",
            use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
        },
        {
            // Телефон в Chromium (размер iPhone 13 mini / 375×812), чтобы ставить один браузер
            name: "mobile",
            use: {
                ...devices["Desktop Chrome"],
                viewport: { width: 375, height: 812 },
                deviceScaleFactor: 3,
                isMobile: true,
                hasTouch: true,
            },
        },
    ],
    webServer: {
        command: serverCommand,
        url: BASE_URL,
        timeout: 300_000,
        reuseExistingServer: !process.env.CI,
        stdout: "ignore",
        stderr: "pipe",
    },
});
