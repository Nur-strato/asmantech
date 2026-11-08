import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Если в URL попал язык перед admin (/en/admin или /ky/admin) -> редиректим на чистый /admin
    if (pathname.match(/^\/(?:en|ky|ru)\/admin(?:\/.*)?$/)) {
        return NextResponse.redirect(new URL("/admin", request.url));
    }

    // 2. Если путь /admin -> сразу отдаем его, не трогая интернационализацию
    if (pathname === "/admin" || pathname.startsWith("/admin/")) {
        return NextResponse.next();
    }

    // 3. Для всего остального сайта работает переключение языков
    return handleI18nRouting(request);
}

export const config = {
    // Пропускаем мимо middleware статику, картинки, API и фавиконки
    matcher: ["/((?!api|_next|_vercel|images|.*\\..*).*)"],
};