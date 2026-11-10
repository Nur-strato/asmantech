import { serviceTitle } from "./knowledge";

export interface BotLeadInput {
    clientName: string;
    countryCode: string;
    phoneNumber: string;
    serviceId: string;
    aboutDetails?: string;
    contactPreference: "message" | "call";
}

export interface BotLeadContext {
    /** Origin текущего запроса, например https://asmantech.kg — используется, если LEADS_API_URL не задан. */
    origin: string;
    telegramUsername?: string;
    telegramChatId: number;
}

/**
 * Отправляет заявку в существующий роут /api/leads (тот же, что использует форма на /contacts),
 * поэтому заявки из бота видны в /admin так же, как заявки с сайта.
 */
export async function submitLeadToApi(
    lead: BotLeadInput,
    ctx: BotLeadContext,
): Promise<{ ok: true; id?: string } | { ok: false; error: string }> {
    const url = process.env.LEADS_API_URL || `${ctx.origin}/api/leads`;

    const source = ctx.telegramUsername
        ? `Telegram-бот, @${ctx.telegramUsername}`
        : `Telegram-бот, chat ${ctx.telegramChatId}`;
    const aboutDetails = [lead.aboutDetails?.trim(), `[Источник: ${source}]`]
        .filter(Boolean)
        .join("\n");

    const serviceId = serviceTitle(lead.serviceId) ? lead.serviceId : "other";

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                serviceId,
                serviceName: serviceTitle(serviceId) ?? "Индивидуальная задача",
                clientName: lead.clientName,
                aboutDetails,
                countryCode: lead.countryCode,
                phoneNumber: lead.phoneNumber,
                contactPreference: lead.contactPreference,
            }),
        });
        const data = (await res.json().catch(() => null)) as
            | { success?: boolean; lead?: { id?: string }; error?: string }
            | null;
        if (!res.ok || !data?.success) {
            return { ok: false, error: data?.error || `HTTP ${res.status}` };
        }
        return { ok: true, id: data.lead?.id };
    } catch (err) {
        return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
}

export function formatLeadForAdmin(lead: BotLeadInput, ctx: BotLeadContext, leadId?: string): string {
    return [
        "🆕 Новая заявка из Telegram-бота",
        `Имя: ${lead.clientName}`,
        `Телефон: ${lead.countryCode} ${lead.phoneNumber}`,
        `Услуга: ${serviceTitle(lead.serviceId) ?? lead.serviceId}`,
        lead.aboutDetails ? `Задача: ${lead.aboutDetails}` : null,
        `Связь: ${lead.contactPreference === "call" ? "звонок" : "сообщение"}`,
        ctx.telegramUsername ? `Telegram: @${ctx.telegramUsername}` : `Chat ID: ${ctx.telegramChatId}`,
        leadId ? `ID заявки: ${leadId}` : "⚠️ В /api/leads не сохранилась — свяжитесь вручную",
    ]
        .filter(Boolean)
        .join("\n");
}
