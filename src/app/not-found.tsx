import Link from "next/link";

// 404 для путей вне локали: корневой layout не рендерит <html>/<body>, поэтому они здесь.
export default function GlobalNotFound() {
    return (
        <html lang="ru">
        <body className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white text-neutral-900 antialiased">
        <h1 className="text-2xl font-semibold">404 — страница не найдена</h1>
        <Link href="/" className="underline">На главную</Link>
        </body>
        </html>
    );
}
