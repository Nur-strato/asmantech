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

// <html>/<body> рендерят дочерние layout'ы: src/app/[locale]/layout.tsx (сайт с локалью)
// и src/app/(standalone)/layout.tsx (admin, archive, embed). Здесь только общие стили и метаданные.
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}
