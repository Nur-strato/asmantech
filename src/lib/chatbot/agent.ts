import Anthropic from "@anthropic-ai/sdk";
import { SERVICE_IDS, SYSTEM_PROMPT } from "./knowledge";
import { formatLeadForAdmin, submitLeadToApi, type BotLeadContext, type BotLeadInput } from "./leads";
import { sendMessage } from "./telegram";

type MessageParam = Anthropic.Beta.BetaMessageParam;
type ContentBlockParam = Anthropic.Beta.BetaContentBlockParam;

// Модель можно переопределить переменной CHATBOT_MODEL, по умолчанию — актуальная Claude Opus.
const MODEL = process.env.CHATBOT_MODEL || "claude-opus-5-5";
const MAX_TOOL_ROUNDS = 3;
const FALLBACK_REPLY =
    "Извините, сейчас не получается ответить. Напишите нам напрямую: Telegram @AsmanTech или WhatsApp +996 755 275 270.";

let client: Anthropic | null = null;
function getClient(): Anthropic {
    // ANTHROPIC_API_KEY читается из окружения автоматически.
    client ??= new Anthropic();
    return client;
}

const SUBMIT_LEAD_TOOL: Anthropic.Beta.BetaTool = {
    name: "submit_lead",
    description:
        "Отправляет заявку клиента менеджерам Asman Tech. Вызывай только после того, как клиент назвал имя и телефон и явно подтвердил данные.",
    strict: true,
    input_schema: {
        type: "object",
        additionalProperties: false,
        required: ["clientName", "countryCode", "phoneNumber", "serviceId", "aboutDetails", "contactPreference"],
        properties: {
            clientName: { type: "string", description: "Имя клиента или название компании" },
            countryCode: { type: "string", description: "Код страны с плюсом, например +996" },
            phoneNumber: { type: "string", description: "Номер телефона без кода страны" },
            serviceId: {
                type: "string",
                enum: [...SERVICE_IDS, "other"],
                description: "id услуги из базы знаний или other, если подходящей нет",
            },
            aboutDetails: { type: "string", description: "Кратко суть задачи клиента; пустая строка, если не указал" },
            contactPreference: { type: "string", enum: ["message", "call"] },
        },
    },
};

// ---------------------------------------------------------------------------
// История диалогов. MVP: хранится в памяти инстанса функции и может теряться
// при холодном старте. Следующий шаг — перенести в Postgres вместе с заявками.
// ---------------------------------------------------------------------------
interface Conversation {
    messages: MessageParam[];
    updatedAt: number;
}
const conversations = new Map<number, Conversation>();
const CONVERSATION_TTL_MS = 24 * 60 * 60 * 1000;
const MAX_MESSAGES = 40;
const KEEP_MESSAGES = 20;

function getConversation(chatId: number): Conversation {
    const now = Date.now();
    for (const [id, c] of conversations) {
        if (now - c.updatedAt > CONVERSATION_TTL_MS) conversations.delete(id);
    }
    let conv = conversations.get(chatId);
    if (!conv) {
        conv = { messages: [], updatedAt: now };
        conversations.set(chatId, conv);
    }
    return conv;
}

export function resetConversation(chatId: number): void {
    conversations.delete(chatId);
}

function isPlainUserTurn(m: MessageParam): boolean {
    if (m.role !== "user") return false;
    if (typeof m.content === "string") return true;
    return !m.content.some((b) => b.type === "tool_result");
}

/**
 * Обрезает длинную историю. Блоки thinking привязаны к полному префиксу диалога,
 * поэтому у оставшихся сообщений мы один раз их убираем (тексты и tool_use остаются).
 */
function trimHistory(conv: Conversation): void {
    if (conv.messages.length <= MAX_MESSAGES) return;
    let start = conv.messages.length - KEEP_MESSAGES;
    while (start < conv.messages.length && !isPlainUserTurn(conv.messages[start])) start++;
    conv.messages = conv.messages.slice(start).map((m) => {
        if (m.role !== "assistant" || typeof m.content === "string") return m;
        return {
            ...m,
            content: m.content.filter((b) => b.type !== "thinking" && b.type !== "redacted_thinking"),
        };
    });
}

// ---------------------------------------------------------------------------

function parseLeadInput(input: unknown): BotLeadInput | null {
    if (!input || typeof input !== "object") return null;
    const i = input as Record<string, unknown>;
    const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
    const lead: BotLeadInput = {
        clientName: str(i.clientName),
        countryCode: str(i.countryCode) || "+996",
        phoneNumber: str(i.phoneNumber),
        serviceId: str(i.serviceId) || "other",
        aboutDetails: str(i.aboutDetails),
        contactPreference: i.contactPreference === "call" ? "call" : "message",
    };
    if (!lead.clientName || lead.phoneNumber.replace(/\D/g, "").length < 6) return null;
    return lead;
}

async function runSubmitLead(input: unknown, ctx: BotLeadContext): Promise<{ content: string; isError: boolean }> {
    const lead = parseLeadInput(input);
    if (!lead) {
        return { content: "Не хватает данных: нужны имя и корректный номер телефона.", isError: true };
    }

    const result = await submitLeadToApi(lead, ctx);

    // Дублируем заявку в Telegram-чат менеджеров (если задан), чтобы она не потерялась.
    const adminChat = process.env.TELEGRAM_ADMIN_CHAT_ID;
    if (adminChat) {
        await sendMessage(adminChat, formatLeadForAdmin(lead, ctx, result.ok ? result.id : undefined)).catch((e) =>
            console.error("[chatbot] admin notify failed", e),
        );
    }

    if (result.ok) return { content: `Заявка сохранена (id: ${result.id ?? "—"}).`, isError: false };
    console.error("[chatbot] lead submit failed:", result.error);
    if (adminChat) {
        return { content: "Заявка передана менеджерам напрямую в Telegram.", isError: false };
    }
    return { content: `Не удалось сохранить заявку: ${result.error}`, isError: true };
}

function extractText(content: Anthropic.Beta.BetaContentBlock[]): string {
    return content
        .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === "text")
        .map((b) => b.text)
        .join("\n")
        .trim();
}

/** Обрабатывает одно входящее сообщение и возвращает текст ответа для пользователя. */
export async function generateReply(chatId: number, userText: string, ctx: BotLeadContext): Promise<string> {
    const conv = getConversation(chatId);
    conv.messages.push({ role: "user", content: userText });
    conv.updatedAt = Date.now();

    try {
        for (let round = 0; round <= MAX_TOOL_ROUNDS; round++) {
            const response = await getClient().beta.messages.create({
                model: MODEL,
                max_tokens: 16000,
                // Чат-консультант: низкий effort — быстрые и дешёвые ответы.
                output_config: { effort: "low" },
                // Если классификатор безопасности откажет, API сам повторит запрос на подходящей модели.
                betas: ["server-side-fallback-2026-07-01"],
                fallbacks: "default",
                system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
                tools: [SUBMIT_LEAD_TOOL],
                messages: conv.messages,
            });

            // Сохраняем ответ целиком (включая thinking-блоки) — так требует API для следующих ходов.
            conv.messages.push({ role: "assistant", content: response.content as ContentBlockParam[] });

            if (response.stop_reason === "refusal") {
                return FALLBACK_REPLY;
            }

            if (response.stop_reason !== "tool_use") {
                return extractText(response.content) || FALLBACK_REPLY;
            }

            const toolResults: Anthropic.Beta.BetaToolResultBlockParam[] = [];
            for (const block of response.content) {
                if (block.type !== "tool_use") continue;
                if (block.name === "submit_lead") {
                    const r = await runSubmitLead(block.input, ctx);
                    toolResults.push({ type: "tool_result", tool_use_id: block.id, content: r.content, is_error: r.isError });
                } else {
                    toolResults.push({
                        type: "tool_result",
                        tool_use_id: block.id,
                        content: `Неизвестный инструмент: ${block.name}`,
                        is_error: true,
                    });
                }
            }
            conv.messages.push({ role: "user", content: toolResults });
        }
        return FALLBACK_REPLY;
    } catch (err) {
        if (err instanceof Anthropic.RateLimitError) {
            console.error("[chatbot] rate limited");
        } else if (err instanceof Anthropic.APIError) {
            console.error(`[chatbot] Claude API error ${err.status}:`, err.message);
        } else {
            console.error("[chatbot] unexpected error", err);
        }
        // Сбрасываем историю, чтобы недописанный ход не ломал следующие запросы.
        resetConversation(chatId);
        return FALLBACK_REPLY;
    } finally {
        trimHistory(conv);
    }
}
