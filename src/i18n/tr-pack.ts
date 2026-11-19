// Ключи словаря "Tr" — исходные фразы, в них бывают точки. next-intl считает точку вложенностью
// и ругается INVALID_KEY, поэтому перед передачей в next-intl превращаем объект в массив пар
// [фраза, перевод]: у массива ключи — индексы, без точек. Тексты в messages/*.json не меняются.
export type TrPairs = [string, string][];

export function packTr<M extends Record<string, unknown>>(messages: M): M {
    const tr = messages.Tr;
    if (!tr || typeof tr !== "object" || Array.isArray(tr)) return messages;
    return { ...messages, Tr: Object.entries(tr as Record<string, string>) };
}
