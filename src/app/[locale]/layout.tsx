import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/sections/header";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { fontVariables } from "@/app/fonts";

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

const BASE_URL = "https://www.asmantech.com";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Metadata" });

    // Автоматическая генерация hreflang-ссылок для всех локалей из routing
    const languages: Record<string, string> = {};
    routing.locales.forEach((loc) => {
        languages[loc] = `${BASE_URL}/${loc}`;
    });
    languages["x-default"] = `${BASE_URL}/${routing.defaultLocale || "ru"}`;

    const ogLocaleMap: Record<string, string> = {
        ru: "ru_RU",
        en: "en_US",
        ky: "ky_KG",
    };

    return {
        metadataBase: new URL(BASE_URL),
        title: {
            default: `${t("title")} | Asman Tech`,
            template: "%s | Asman Tech",
        },
        description: t("description"),
        keywords: t("keywords").split(", "),
        applicationName: "Asman Tech",
        authors: [{ name: "Asman Tech", url: BASE_URL }],
        creator: "Asman Tech",
        publisher: "Asman Tech",
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },
        alternates: {
            canonical: `${BASE_URL}/${locale}`,
            languages,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        openGraph: {
            type: "website",
            locale: ogLocaleMap[locale] || "ru_RU",
            url: `${BASE_URL}/${locale}`,
            siteName: "Asman Tech",
            title: `${t("title")} | Asman Tech`,
            description: t("description"),
            images: [
                {
                    url: "/og-image.png",
                    width: 1200,
                    height: 630,
                    alt: "Asman Tech — IT Solutions & Business Automation",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${t("title")} | Asman Tech`,
            description: t("description"),
            images: ["/og-image.png"],
        },
        icons: {
            icon: [
                { url: "/favicon.ico", sizes: "any" },
                { url: "/icon.png", sizes: "512x512", type: "image/png" },
            ],
            apple: [
                { url: "/icon.png", sizes: "512x512", type: "image/png" },
            ],
        },
    };
}

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: "Metadata" });

    // Структурированные данные Schema.org (JSON-LD)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Asman Tech",
        legalName: "Asman Tech IT Agency",
        url: BASE_URL,
        logo: `${BASE_URL}/icon.png`,
        image: `${BASE_URL}/og-image.png`,
        description: t("description"),
        address: {
            "@type": "PostalAddress",
            addressLocality: "Bishkek",
            addressCountry: "KG",
        },
        priceRange: "$$",
        areaServed: [
            { "@type": "Country", "name": "Kyrgyzstan" },
            { "@type": "Country", "name": "Kazakhstan" },
            { "@type": "Country", "name": "United States" },
        ],
        knowsAbout: [
            "Web Development",
            "Next.js & React Ecosystem",
            "Full-Stack Engineering",
            "Business Process Automation",
            "Telegram Bot Ecosystem",
        ],
        sameAs: [
            "https://github.com/Nur-strato",
            "https://t.me/asmantech",
        ],
    };

    return (
        <html lang={locale} className={`scroll-smooth ${fontVariables}`}>
        <head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </head>
        <body className="min-h-screen flex flex-col bg-surface text-content font-sans antialiased selection:bg-ink selection:text-white">
        <NextIntlClientProvider>
            <SmoothScrollProvider>
                <Header />
                <div className="flex-1">
                    {children}
                </div>
            </SmoothScrollProvider>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}