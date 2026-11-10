/** Минимальный клиент Telegram Bot API (без внешних зависимостей). */

export interface TelegramUser {
    id: number;
    is_bot: boolean;
    first_name: string;
    username?: string;
    language_code?: string;
}

export interface TelegramMessage {
    message_id: number;
    from?: TelegramUser;
    chat: { id: number; type: "private" | "group" | "supergroup" | "channel" };
    date: number;
    text?: string;
}

export interface TelegramUpdate {
    update_id: number;
    message?: TelegramMessage;
}

const TELEGRAM_MAX_MESSAGE = 4096;

async function callTelegram(method: string, payload: Record<string, unknown>): Promise<void> {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) throw new Error("TELEGRAM_BOT_TOKEN не задан");

    const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        const body = await res.text().catch(() => "");
        // Не логируем URL — в нём токен.
        console.error(`[telegram] ${method} failed: ${res.status} ${body.slice(0, 300)}`);
    }
}

export async function sendMessage(chatId: number | string, text: string): Promise<void> {
    for (let i = 0; i < text.length; i += TELEGRAM_MAX_MESSAGE) {
        await callTelegram("sendMessage", {
            chat_id: chatId,
            text: text.slice(i, i + TELEGRAM_MAX_MESSAGE),
            link_preview_options: { is_disabled: true },
        });
    }
}

export async function sendTyping(chatId: number): Promise<void> {
    await callTelegram("sendChatAction", { chat_id: chatId, action: "typing" });
}
