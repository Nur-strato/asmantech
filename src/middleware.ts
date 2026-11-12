import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Если язык попал перед admin (/ru/admin) или embed (/ru/embed) -> убираем языковой префикс
    if (pathname.match(/^\/(?:en|kg|ru)\/(admin|embed)(?:\/.*)?$/)) {
        const cleanPath = pathname.replace(/^\/(?:en|kg|ru)/, "");
        return NextResponse.redirect(new URL(cleanPath, request.url));
    }

    // 2. Изолированные роуты: admin и embed отдаем напрямую, минуя next-intl
    if (
        pathname === "/admin" ||
        pathname.startsWith("/admin/") ||
        pathname === "/embed" ||
        pathname.startsWith("/embed/")
    ) {
        return NextResponse.next();
    }

    // 3. Для всего остального сайта работает переключение языков
    return handleI18nRouting(request);
}

export const config = {
    // Пропускаем мимо middleware статику, картинки, API, embed и фавиконки
    matcher: ["/((?!api|_next|_vercel|images|embed|.*\\..*).*)"],
};