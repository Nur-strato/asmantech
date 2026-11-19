import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "./fonts";

export const metadata: Metadata = {
    title: {
        default: "Asman Tech — IT Solutions",
        template: "%s | Asman Tech",
    },
    description: "Разработка высоконагруженных веб-систем, мобильных приложений и автоматизация бизнеса.",
    icons: {
        icon: "/images/logo.png",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" className={fontVariables} suppressHydrationWarning>
        <body className="min-h-screen bg-surface text-content font-sans antialiased selection:bg-ink selection:text-white">
        {children}
        </body>
        </html>
    );
}