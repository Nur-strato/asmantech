import { useCallback } from "react";
import { useMessages } from "next-intl";

type Dict = Record<string, string>;

// Перевод по исходной фразе для больших контентных страниц.
// Ключ — текст как он написан в коде (обычно русский), значение — перевод из messages/<locale>.json → "Tr".
// Нестроковые значения (числа, элементы, иконки) возвращаются как есть, поэтому tr можно оборачивать вокруг любого {item.field}.
export function translate(dict: Dict | undefined, value: unknown) {
    if (typeof value !== "string" || !dict) return value;
    return dict[value] ?? dict[value.replace(/\s+/g, " ").trim()] ?? value;
}

export function useTr() {
    const dict = useMessages().Tr as Dict | undefined;
    return useCallback(<T,>(value: T): T => translate(dict, value) as T, [dict]);
}
