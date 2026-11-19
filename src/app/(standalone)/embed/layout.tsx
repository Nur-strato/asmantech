import type { Metadata } from "next";

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
        <div className="min-h-screen bg-white text-black antialiased m-0 p-0 overflow-y-auto selection:bg-neutral-900 selection:text-white">
            {children}
        </div>
    );
}
