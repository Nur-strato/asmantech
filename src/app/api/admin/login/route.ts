import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { pin } = body;

        const serverPin = process.env.ADMIN_PIN || "0701";
        const secret = process.env.ADMIN_SESSION_SECRET;

        if (!secret) {
            return NextResponse.json(
                { success: false, error: "Ошибка конфигурации сервера" },
                { status: 500 }
            );
        }

        if (pin !== serverPin) {
            return NextResponse.json(
                { success: false, error: "Неверный PIN-код" },
                { status: 401 }
            );
        }

        const response = NextResponse.json({ success: true });

        response.cookies.set({
            name: SESSION_COOKIE_NAME,
            value: secret,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 дней
        });

        return response;
    } catch {
        return NextResponse.json(
            { success: false, error: "Некорректный запрос" },
            { status: 400 }
        );
    }
}
