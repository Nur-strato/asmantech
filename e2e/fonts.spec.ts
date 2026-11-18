import fs from "node:fs";
import path from "node:path";
import { test, expect } from "./fixtures";

const FONTS = ["Onest", "Source Serif 4", "JetBrains Mono"];

// Тест включится сам, когда ветка дизайн-системы (feat/design-system) попадёт в main
function designSystemMerged() {
    const files = ["src/app/fonts.ts", "src/app/[locale]/layout.tsx", "src/app/layout.tsx", "src/app/globals.css"].map((f) => path.join(process.cwd(), f));
    const src = files
        .filter((f) => fs.existsSync(f))
        .map((f) => fs.readFileSync(f, "utf8"))
        .join("\n");
    return /Onest/.test(src);
}

test("шрифты дизайн-системы загружаются", async ({ page }) => {
    test.skip(!designSystemMerged(), "дизайн-система ещё не в main — шрифтов Onest/Source Serif 4/JetBrains Mono нет");

    await page.goto("/");
    const loaded = await page.evaluate(async (families) => {
        await document.fonts.ready;
        // next/font даёт имена вида "__Onest_abc123" или "Onest Fallback"
        const all = [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family.replace(/["']/g, ""));
        return families.filter((name) =>
            all.some((fam) => fam.replace(/_/g, " ").includes(name) && !/fallback/i.test(fam)),
        );
    }, FONTS);
    expect(loaded.sort()).toEqual([...FONTS].sort());
});
