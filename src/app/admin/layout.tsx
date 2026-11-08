import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Asman-Tech | Admin",
    robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="ru">
        <body className="min-h-screen bg-white text-black antialiased">
        {children}
        </body>
        </html>
    );
}
