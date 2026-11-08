import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    locales: ["ru", "en", "kg"],
    defaultLocale: "ru",
    // Русский остаётся на старых адресах (/contacts), остальные — /en/contacts, /ky/contacts
    localePrefix: "as-needed",
    // Язык выбирается только адресом, без автоопределения по браузеру
    localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
