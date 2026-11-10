import { after, NextResponse } from "next/server";
import { generateReply, resetConversation } from "@/lib/chatbot/agent";
import { sendMessage, sendTyping, type TelegramUpdate } from "@/lib/chatbot/telegram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Ответ Claude + отправка заявки укладываются с запасом; лимит Vercel Hobby — 60 с.
export const maxDuration = 60;

const GREETING =
    "Здравствуйте! Я AI-консультант Asman Tech. Расскажу о наших услугах — сайты, мобильные приложения, 3D-дизайн, AI-чатботы, аудит безопасности и SEO — и помогу оставить заявку. Чем могу помочь?";

// Telegram повторяет апдейт, если не получил 200 вовремя — отбрасываем дубликаты.
const seenUpdates = new Set<number>();
function alreadySeen(updateId: number): boolean {
    if (seenUpdates.has(updateId)) return true;
    seenUpdates.add(updateId);
    if (seenUpdates.size > 1000) {
        const oldest = seenUpdates.values().next().value;
        if (oldest !== undefined) seenUpdates.delete(oldest);
    }
    return false;
}

// Сообщения одного чата обрабатываем строго по очереди, чтобы не перемешать историю.
const chatQueues = new Map<number, Promise<void>>();
function enqueue(chatId: number, task: () => Promise<void>): Promise<void> {
    const prev = chatQueues.get(chatId) ?? Promise.resolve();
    const next = prev.then(task, task).finally(() => {
        if (chatQueues.get(chatId) === next) chatQueues.delete(chatId);
    });
    chatQueues.set(chatId, next);
    return next;
}

export async function POST(req: Request) {
    const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
    if (!secret || req.headers.get("x-telegram-bot-api-secret-token") !== secret) {
        return NextResponse.json({ ok: false }, { status: 401 });
    }

    const update = (await req.json().catch(() => null)) as TelegramUpdate | null;
    const message = update?.message;
    if (!update || !message?.text || alreadySeen(update.update_id)) {
        return NextResponse.json({ ok: true });
    }

    // Пока отвечаем только в личных сообщениях.
    if (message.chat.type !== "private") {
        return NextResponse.json({ ok: true });
    }

    const chatId = message.chat.id;
    const text = message.text.trim();
    const origin = new URL(req.url).origin;

    // Сразу отвечаем Telegram 200, а сам ответ генерируем после — иначе Telegram будет слать повторы.
    after(() =>
        enqueue(chatId, async () => {
            try {
                if (text === "/start" || text === "/reset") {
                    resetConversation(chatId);
                    await sendMessage(chatId, GREETING);
                    return;
                }

                await sendTyping(chatId);
                const reply = await generateReply(chatId, text.slice(0, 4000), {
                    origin,
                    telegramChatId: chatId,
                    telegramUsername: message.from?.username,
                });
                await sendMessage(chatId, reply);
            } catch (err) {
                console.error("[telegram webhook] failed to handle update", err);
            }
        }),
    );

    return NextResponse.json({ ok: true });
}
