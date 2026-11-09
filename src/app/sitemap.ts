import type { MetadataRoute } from "next";

const BASE_URL = "https://www.asmantech.com";
const LOCALES = ["ru", "en", "ky"] as const; // добавь или оставь свои актуальные языки
const ROUTES = ["", "/solutions", "/projects", "/guarantee", "/offers", "/contacts"];

export default function sitemap(): MetadataRoute.Sitemap {
    const sitemapEntries: MetadataRoute.Sitemap = [];

    ROUTES.forEach((route) => {
        LOCALES.forEach((locale) => {
            const path = `${locale}${route}`;
            const url = `${BASE_URL}/${path}`;

            // Формируем ссылки на альтернативные языковые версии той же страницы
            const languages: Record<string, string> = {};
            LOCALES.forEach((altLocale) => {
                languages[altLocale] = `${BASE_URL}/${altLocale}${route}`;
            });
            languages["x-default"] = `${BASE_URL}/ru${route}`; // Язык по умолчанию

            sitemapEntries.push({
                url,
                lastModified: new Date(),
                changeFrequency: route === "" ? "weekly" : "monthly",
                priority: route === "" ? 1.0 : route === "/solutions" || route === "/projects" ? 0.9 : 0.7,
                alternates: {
                    languages,
                },
            });
        });
    });

    return sitemapEntries;
}