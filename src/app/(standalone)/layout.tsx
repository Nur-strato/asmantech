import { fontVariables } from "@/app/fonts";

// Страницы вне локали (/admin, /archive, /embed/...) — свой <html>/<body>, без next-intl.
export default function StandaloneLayout({
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
