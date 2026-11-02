import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/sections/header";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";

export const metadata: Metadata = {
    title: "Asman-Tech | IT & Product Studio",
    description: "Разработка масштабируемых веб-сервисов, цифровых продуктов и высоконагруженных систем.",
    keywords: ["IT-компания", "веб-разработка", "Next.js", "создание сайтов", "Asman-Tech"],
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" className="scroll-smooth">
        <body className="min-h-screen flex flex-col bg-white text-black antialiased selection:bg-neutral-950 selection:text-white">
        <SmoothScrollProvider>
            <Header />
            <div className="flex-1">
                {children}
            </div>
        </SmoothScrollProvider>
        </body>
        </html>
    );
}