export interface ArchiveProject {
    id: string;
    title: string;
    category: string;
    tagline: string;
    viewedAt: string;
    imageUrl: string;
    embedUrl: string;
    externalLink: string;
    accent: string;
}

export const INITIAL_PROJECTS: ArchiveProject[] = [
    {
        id: "aucahack",
        title: "AUCAHACK",
        category: "AUCA Student Hub",
        tagline: "Academic ecosystem for schedule planning, tutor reviews, and GPA forecasting.",
        viewedAt: "Viewed 22 minutes ago",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
        embedUrl: "/embed/aucahack",
        externalLink: "https://aucahack.com",
        accent: "#FACC15",
    },
    {
        id: "konurat",
        title: "Konurat Construction",
        category: "Сайт Строительной компании",
        tagline: "Architecting high-end digital presence and enterprise acquisition system.",
        viewedAt: "Viewed 1 hour ago",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
        embedUrl: "/embed/konurat",
        externalLink: "https://Konurat-Construction.kg",
        accent: "#22C55E",
    },
    {
        id: "proquiz",
        title: "ProQuizKG",
        category: "Сайт для Межвузовской лиги",
        tagline: "Real-time tournament engine and live scoring across 20+ universities.",
        viewedAt: "Viewed 2 hours ago",
        imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
        embedUrl: "/embed/proquiz",
        externalLink: "https://proquiz.kg",
        accent: "#3B82F6",
    },
    {
        id: "knopka",
        title: "Knopka",
        category: "Бухгалтерская компания",
        tagline: "Comprehensive accounting automation and financial reporting infrastructure.",
        viewedAt: "Viewed 1 day ago",
        imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop",
        embedUrl: "/embed/knopka",
        externalLink: "https://knopka.kg",
        accent: "#B28CFF",
    },
];