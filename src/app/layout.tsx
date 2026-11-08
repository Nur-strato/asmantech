import type { Metadata } from "next";
import "./globals.css";

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
        <html lang="ru" suppressHydrationWarning>
        <body className="min-h-screen bg-white text-neutral-900 antialiased selection:bg-neutral-950 selection:text-white">
        {children}
        </body>
        </html>
    );
}