export function JsonLd() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Asman Tech",
        "legalName": "Asman Tech IT Agency",
        "url": "https://www.asmantech.com",
        "logo": "https://www.asmantech.com/icon.png",
        "image": "https://www.asmantech.com/og-image.png",
        "description": "Разработка инновационных веб-платформ, мобильных приложений, Telegram-ботов и систем автоматизации бизнеса под ключ.",
        "telephone": "+996-XXX-XX-XX-XX", // укажи актуальный рабочий номер
        "email": "contact@asmantech.com", // укажи актуальную почту
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bishkek",
            "addressCountry": "KG",
        },
        "priceRange": "$$",
        "areaServed": [
            { "@type": "Country", "name": "Kyrgyzstan" },
            { "@type": "Country", "name": "Kazakhstan" },
            { "@type": "Country", "name": "United States" },
        ],
        "knowsAbout": [
            "Web Development",
            "Next.js",
            "Full-Stack Development",
            "Process Automation",
            "Telegram Bot Ecosystem",
        ],
        "sameAs": [
            "https://github.com/Nur-strato",
            "https://www.instagram.com/asmantech", // укажи ваши соцсети
            "https://t.me/asmantech",
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
    );
}