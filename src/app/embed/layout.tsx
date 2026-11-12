import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
    title: "Project Preview",
    robots: "noindex, nofollow",
};

export default function EmbedLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru">
        <body className="bg-white text-black antialiased m-0 p-0 overflow-y-auto selection:bg-neutral-900 selection:text-white">
        {children}
        </body>
        </html>
    );
}