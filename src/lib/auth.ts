import { NextRequest } from "next/server";

export const SESSION_COOKIE_NAME = "asman_admin_session";

export function verifyAdminSession(request: NextRequest): boolean {
    const session = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const secret = process.env.ADMIN_SESSION_SECRET;

    return Boolean(session && secret && session === secret);
}
