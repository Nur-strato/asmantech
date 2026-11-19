import { useCallback, useMemo } from "react";
import { useMessages } from "next-intl";
import type { TrPairs } from "./tr-pack";

type Dict = Record<string, string>;

// Перевод по исходной фразе для больших контентных страниц.
// Ключ — текст как он написан в коде (обычно русский), значение — перевод из messages/<locale>.json → "Tr".
// Нестроковые значения (числа, элементы, иконки) возвращаются как есть, поэтому tr можно оборачивать вокруг любого {item.field}.
export function translate(dict: Dict | undefined, value: unknown) {
    if (typeof value !== "string" || !dict) return value;
    return dict[value] ?? dict[value.replace(/\s+/g, " ").trim()] ?? value;
}

export function useTr() {
    // В next-intl "Tr" приходит массивом пар (см. tr-pack.ts) — собираем обратно в словарь.
    const raw = useMessages().Tr as unknown as TrPairs | Dict | undefined;
    const dict = useMemo<Dict | undefined>(
        () => (Array.isArray(raw) ? Object.fromEntries(raw) : raw),
        [raw],
    );
    return useCallback(<T,>(value: T): T => translate(dict, value) as T, [dict]);
}
