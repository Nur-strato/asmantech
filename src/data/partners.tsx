import React from "react";

export interface PartnerData {
    slug: string;
    name: string;
    subName?: string;
    category: string;
    websiteUrl: string;
    summary: string;
    history: string[];
    images: string[];
    logo: React.ReactNode;
}

export const PARTNERS_DATA: PartnerData[] = [
    {
        slug: "auca",
        name: "AUCA",
        category: "University",
        websiteUrl: "https://auca.kg",
        summary: "Американский Университет в Центральной Азии — ведущий международный либеральный университет в регионе. В рамках сотрудничества команда Asman Tech разрабатывает и масштабирует внутренние цифровые сервисы, порталы для студентов и модули оценки курсов.",
        history: [
            "2026: Запуск академических модулей и сервисов анализа учебных курсов для студентов бакалавриата.",
            "2026: Интеграция платформ мониторинга расписаний и калькуляторов академического рейтинга (GPA).",
            "2026: Поддержка студенческих инициатив и внедрение внутренних IT-инструментов в университетскую экосистему."
        ],
        images: [
            "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=80"
        ],
        logo: (
            <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none">
                <path d="M32 6L4 20L32 34L60 20L32 6Z" fill="#B91C1C" />
                <path d="M12 24.5V40C12 40 20 48 32 48C44 48 52 40 52 40V24.5L32 34L12 24.5Z" fill="#B91C1C" />
                <path d="M32 38L26 31H38L32 38Z" fill="#ffffff" />
                <circle cx="24" cy="36" r="2.5" fill="#ffffff" />
                <rect x="36" y="34" width="7" height="2" rx="1" fill="#ffffff" />
                <rect x="36" y="38" width="7" height="2" rx="1" fill="#ffffff" />
                <path d="M6 22V38" stroke="#B91C1C" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="6" cy="40" r="2" fill="#B91C1C" />
            </svg>
        )
    },
    {
        slug: "konurat-construction",
        name: "KONURAT",
        subName: "CONSTRUCTION",
        category: "Real Estate",
        websiteUrl: "https://konurat.kg",
        summary: "Konurat Construction — девелоперская компания, возводящая современные жилые комплексы и коммерческие объекты. Asman Tech спроектировал для застройщика интерактивные веб-платформы с интерактивным выбором планировок и сквозной аналитикой обращений.",
        history: [
            "Разработка современного каталога недвижимости с фильтрацией объектов и 3D-планировками.",
            "Интеграция CRM-системы для мгновенной обработки входящих заявок из цифровых каналов.",
            "Технический консалтинг по автоматизации строительного документооборота."
        ],
        images: [
            "https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
        ],
        logo: (
            <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none" stroke="#0A1A2F" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 10V52" />
                <path d="M18 31L38 12" />
                <path d="M26 23.5L46 52" />
                <path d="M12 52H52" strokeWidth="3" />
                <path d="M8 58H56" strokeWidth="2" stroke="#64748B" />
                <path d="M26 12V24" strokeWidth="2.2" stroke="#64748B" />
                <path d="M34 16V22" strokeWidth="2.2" stroke="#64748B" />
            </svg>
        )
    },
    {
        slug: "proquizkg",
        name: "ProQuizKG",
        category: "Education",
        websiteUrl: "https://proquiz.kg",
        summary: "ProQuizKG — межвузовская интеллектуальная турнирная платформа Кыргызстана. Asman Tech разработал серверную архитектуру, панель управления раундами и интерфейс реального времени для синхронного проведения матчей.",
        history: [
            "Разработка масштабируемого бекенда на FastAPI для обработки ответов тысяч участников в реальном времени.",
            "Создание личных кабинетов команд и автоматического подсчёта рейтинговых баллов турнира.",
            "Успешное проведение серий межвузовских сезонов на базе платформы."
        ],
        images: [
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80"
        ],
        logo: (
            <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none">
                <path d="M16 26C14 34 18 44 26 50M48 26C50 34 46 44 38 50" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 4" />
                <path d="M12 28C11 36 15 47 24 53M52 28C53 36 49 47 40 53" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 4" />
                <path d="M24 16H40V30C40 34.4 36.4 38 32 38C27.6 38 24 34.4 24 30V16Z" fill="#B91C1C" />
                <path d="M24 20H18C16.9 20 16 20.9 16 22V24C16 27.3 18.7 30 22 30H24V20Z" stroke="#B91C1C" strokeWidth="2" />
                <path d="M40 20H46C47.1 20 48 20.9 48 22V24C48 27.3 45.3 30 42 30H40V20Z" stroke="#B91C1C" strokeWidth="2" />
                <path d="M30 38V44H34V38" stroke="#B91C1C" strokeWidth="2.5" />
                <path d="M26 44H38" stroke="#B91C1C" strokeWidth="3" strokeLinecap="round" />
                <path d="M32 21L33.2 24.5H37L34 26.6L35.2 30L32 27.8L28.8 30L30 26.6L27 24.5H30.8L32 21Z" fill="#ffffff" />
            </svg>
        )
    },
    {
        slug: "alfapark",
        name: "AlfaPark",
        category: "Taxopark",
        websiteUrl: "https://alfapark.kg",
        summary: "AlfaPark — крупный логистический и таксомоторный парк. Команда Asman Tech автоматизировала процессы регистрации водителей, контроль балансов и вывод выплат.",
        history: [
            "Проектирование и внедрение веб-панели администрирования выплат и комиссий парка.",
            "Интеграция шлюзов мгновенных банковских переводов для снижения кассовых разрывов.",
            "Оптимизация базы данных для быстрой генерации финансовых отчётов за отчётный период."
        ],
        images: [
            "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80"
        ],
        logo: (
            <div className="flex flex-col items-center justify-center">
                <svg viewBox="0 0 72 28" className="w-16 h-7" fill="none">
                    <path
                        d="M6 21C16 19 26 14 34 8C41 3 49 4 58 11C64 16 68 18 70 20"
                        stroke="#B91C1C"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                    />
                    <path
                        d="M20 18C28 14 36 10 44 9C50 8.5 56 11 60 15"
                        stroke="#B91C1C"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        opacity="0.7"
                    />
                </svg>
                <span className="text-[14px] font-sans font-black tracking-tight text-[#0A1A2F] mt-1">
                    Alfa<span className="font-light">Park</span>
                </span>
            </div>
        )
    },
    {
        slug: "knopka",
        name: "KNOPKA",
        category: "Finance",
        websiteUrl: "https://knopka.kg",
        summary: "Knopka — аутсорсинг бухгалтерского и налогового учёта для малого и среднего бизнеса. В рамках сотрудничества Asman Tech выполнил комплексный аудит производительности, оптимизировал фронтенд-архитектуру и поднял показатели конверсии сайта.",
        history: [
            "Проведение глубокого аудита PageSpeed Insights и устранение узких мест производительности.",
            "Рефакторинг компонентов посадочной страницы и ускорение первичной отрисовки интерфейса.",
            "Подключение сквозной аналитики и настройка трекинга лидогенерации."
        ],
        images: [
            "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
        ],
        logo: (
            <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none">
                <path
                    d="M20 12V52M20 32L42 12M28 24L44 52"
                    stroke="#0A1A2F"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M15 12V52M15 32L37 12M23 24L39 52"
                    stroke="#1E293B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.3"
                />
            </svg>
        )
    },
    {
        slug: "auca-quiz-club",
        name: "AUCA QUIZ",
        subName: "CLUB",
        category: "Club",
        websiteUrl: "https://instagram.com/aucaquizclub",
        summary: "AUCA Quiz Club — официальное интеллектуальное студенческое сообщество. Asman Tech обеспечивает технологическую инфраструктуру проведения клубных игр, автоматизирует тайминг раундов и публикацию турнирных таблиц.",
        history: [
            "Разработка веб-табло для отображения текущих счётов в лекционных аудиториях.",
            "Создание Telegram-бота для сбора ответов от капитанов команд во время раунда.",
            "Автоматический экспорт итоговых результатов в сезонный рейтинг клубов."
        ],
        images: [
            "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80"
        ],
        logo: (
            <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none">
                <path
                    d="M32 8L16 14V30C16 42 22.8 51.5 32 56C41.2 51.5 48 42 48 30V14L32 8Z"
                    fill="#991B1B"
                    stroke="#7F1D1D"
                    strokeWidth="2"
                />
                <path
                    d="M32 12L19 17V29C19 39.5 24.6 47.8 32 52C39.4 47.8 45 39.5 45 29V17L32 12Z"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    opacity="0.4"
                />
                <text
                    x="32"
                    y="38"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontFamily="serif"
                    fontSize="24"
                    fontWeight="bold"
                >
                    ?
                </text>
            </svg>
        )
    },
    {
        slug: "all-quiz",
        name: "ALL QUIZ",
        category: "Education",
        websiteUrl: "https://allquiz.org",
        summary: "All Quiz — масштабная экосистема интеллектуальных викторин и турниров. Мы разработали кросс-платформенное приложение и модули мультимедийных вопросов для проведения массовых офлайн- и онлайн-игр.",
        history: [
            "Проектирование медиа-хранилища для быстрой синхронизации аудио- и видео-вопросов.",
            "Внедрение системы защиты от задержек сети и античит-проверок таймингов отправки ответов.",
            "Запуск интерактивного портала с архивом сыгранных сезонов и статистикой участников."
        ],
        images: [
            "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80"
        ],
        logo: (
            <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none">
                <path d="M22 14H42V30C42 35.5 37.5 40 32 40C26.5 40 22 35.5 22 30V14Z" fill="#B91C1C" />
                <path d="M22 18H15C13.3 18 12 19.3 12 21V23C12 27.4 15.6 31 20 31H22V18Z" stroke="#B91C1C" strokeWidth="2.5" />
                <path d="M42 18H49C50.7 18 52 19.3 52 21V23C52 27.4 48.4 31 44 31H42V18Z" stroke="#B91C1C" strokeWidth="2.5" />
                <path d="M29 40V48H35V40" stroke="#B91C1C" strokeWidth="3" />
                <path d="M22 48H42" stroke="#B91C1C" strokeWidth="4" strokeLinecap="round" />
                <path d="M32 20L33.5 24.6H38.3L34.4 27.4L35.9 32L32 29.1L28.1 32L29.6 27.4L25.7 24.6H30.5L32 20Z" fill="#ffffff" />
                <circle cx="16" cy="12" r="1.5" fill="#B91C1C" />
                <circle cx="48" cy="12" r="1.5" fill="#B91C1C" />
                <path d="M46 8L47 10L49 11L47 12L46 14L45 12L43 11L45 10L46 8Z" fill="#B91C1C" />
            </svg>
        )
    }
];