import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/sections/header";

// Подключаем чистый современный шрифт
const inter = Inter({
    subsets: ["latin", "cyrillic"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Asman-Tech | IT & Product Studio",
    description: "Разработка масштабируемых веб-сервисов, цифровых продуктов и высоконагруженных систем.",
    keywords: ["IT-компания", "веб-разработка", "Next.js", "создание сайтов", "Vital-Tech"],
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" className="scroll-smooth">
        <body className={`${inter.className} min-h-screen flex flex-col bg-white text-neutral-900 antialiased`}>
        {/* Шапка сайта */}
        <Header />

        {/* Основной контент */}
        <div className="flex-1">
            {children}
        </div>
        </body>
        </html>
    );
}