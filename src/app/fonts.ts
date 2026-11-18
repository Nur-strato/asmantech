import { JetBrains_Mono, Onest, Source_Serif_4 } from "next/font/google";

// Шрифты дизайн-системы Asman Tech (Figma: «Asman Tech — Design System»).
// Все три поддерживают кириллицу и кыргызские буквы ө ү ң (подмножество cyrillic-ext).

export const fontSans = Onest({
    subsets: ["latin", "cyrillic", "cyrillic-ext"],
    variable: "--font-sans",
    display: "swap",
});

export const fontSerif = Source_Serif_4({
    subsets: ["latin", "cyrillic", "cyrillic-ext"],
    variable: "--font-serif",
    display: "swap",
});

export const fontMono = JetBrains_Mono({
    subsets: ["latin", "cyrillic", "cyrillic-ext"],
    variable: "--font-mono",
    display: "swap",
});

export const fontVariables = `${fontSans.variable} ${fontSerif.variable} ${fontMono.variable}`;
