import {
    Code2,
    Smartphone,
    Box,
    Bot,
    ShieldCheck,
    Search,
    type LucideIcon,
} from "lucide-react";

export interface ServiceItem {
    id: string;
    indexStr: string;
    title: string;
    badge: string;
    description: string;
    details: string;
    imageUrl: string;
    icon: LucideIcon;
    deliverables: string[];
    timeline: string;
}

export const SERVICES: ServiceItem[] = [
    {
        id: "web-dev",
        indexStr: "01",
        title: "Website Development",
        badge: "Next.js",
        description:
            "Разработка сайтов на Next.js с продуманной архитектурой, адаптивным дизайном и 100% гарантией качества и скорости.",
        details:
            "Создаём масштабируемые веб-приложения на Next.js App Router с упором на мгновенный рендеринг, безопасность данных и чистый код без технического долга. От интерактивных коммерческих сайтов до сложных сервисов с личными кабинетами.",
        imageUrl: "/images/website-development.png",
        icon: Code2,
        deliverables: [
            "Next.js App Router & Server Components",
            "Оптимизация Core Web Vitals (95+ баллов)",
            "Интеграция сторонних API и эквайринга",
            "Адаптивная верстка под все типы экранов",
        ],
        timeline: "от 2 недель",
    },
    {
        id: "mobile-apps",
        indexStr: "02",
        title: "Mobile Apps",
        badge: "iOS & Android",
        description:
            "Создание приложений для iOS и Android с плавным интерфейсом и продуманным пользовательским опытом.",
        details:
            "Кроссплатформенная и нативная разработка мобильных решений с плавной анимацией интерфейса, стабильной работой офлайн и прямой интеграцией с серверными API.",
        imageUrl: "/images/mobile-apps.png",
        icon: Smartphone,
        deliverables: [
            "Кроссплатформенная архитектура на React Native / Expo",
            "Синхронизация с сервером и пуш-уведомления",
            "Публикация и релизы в App Store и Google Play",
            "Офлайн-режим и локальная база данных",
        ],
        timeline: "от 3 недель",
    },
    {
        id: "3d-design",
        indexStr: "03",
        title: "3D Design",
        badge: "Ultra Design",
        description:
            "Инновационный 3D-дизайн и реалистичная графика, не имеющие аналогов в Кыргызстане.",
        details:
            "Интерактивные 3D-модели, пространственные визуализации и WebGL-графика для сайтов, привлекающие внимание и выделяющие продукт среди конкурентов.",
        imageUrl:
            "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80",
        icon: Box,
        deliverables: [
            "Интерактивные 3D-сцены на Three.js / WebGL",
            "Оптимизация моделей под стабильные 60 FPS на смартфонах",
            "Кастомные шейдеры и физика освещения",
            "3D-конфигураторы товаров и объектов",
        ],
        timeline: "от 1.5 недель",
    },
    {
        id: "ai-chatbots",
        indexStr: "04",
        title: "AI Chatbots",
        badge: "Web & WhatsApp",
        description:
            "AI-ассистенты для круглосуточной поддержки клиентов и автоматизации общения на сайтах и в WhatsApp.",
        details:
            "Интеграция языковых моделей и интеллектуальных ботов для мгновенной квалификации лидов, консультаций по базе знаний компании и разгрузки службы поддержки.",
        imageUrl: "/images/Ai-chatbots.png",
        icon: Bot,
        deliverables: [
            "Подключение моделей OpenAI, Claude, Gemini, DeepSeek",
            "RAG-поиск по корпоративным документам и регламентам",
            "Интеграция с WhatsApp Business API и Telegram",
            "Прямая передача лидов и сделок в CRM",
        ],
        timeline: "от 1 недели",
    },
    {
        id: "security-audit",
        indexStr: "05",
        title: "Security & Quality Audit",
        badge: "Code Audit",
        description:
            "Аудит безопасности и качества кода для выявления критических ошибок и повышения надёжности сайтов и приложений.",
        details:
            "Комплексный анализ структуры кода, проверка уязвимостей, оптимизация запросов к базе данных и стресс-тестирование на устойчивость к высоким нагрузкам.",
        imageUrl:
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
        icon: ShieldCheck,
        deliverables: [
            "Анализ безопасности по стандарту OWASP Top 10",
            "Профилирование медленных SQL-запросов и узких мест API",
            "Аудит фронтенд-бандла и скорости рендеринга",
            "Детальный технический отчёт с планом исправлений",
        ],
        timeline: "от 3 рабочих дней",
    },
    {
        id: "seo-opt",
        indexStr: "06",
        title: "SEO Optimization",
        badge: "Google Rankings",
        description:
            "SEO-оптимизация и продвижение сайтов для повышения позиций в Google и привлечения новых клиентов.",
        details:
            "Глубокая техническая настройка, семантическая разметка Schema.org, оптимизация скорости первой отрисовки (Core Web Vitals) и индексации в поисковых системах.",
        imageUrl: "/images/seo-optimization.png",
        icon: Search,
        deliverables: [
            "Настройка семантической структуры и микроразметки Schema.org",
            "Устранение просадок Core Web Vitals (LCP, FID, CLS)",
            "Генерация sitemap.xml, robots.txt и канонических ссылок",
            "Подключение и настройка Google Search Console",
        ],
        timeline: "от 5 рабочих дней",
    },
];