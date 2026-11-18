import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

// Токены дизайн-системы Asman Tech. Источник правды — CSS-переменные в src/app/globals.css
// (те же имена, что у переменных в Figma: «Asman Tech — Design System»).
const token = (name: string) => `rgb(var(--color-${name}) / <alpha-value>)`;

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                ink: {
                    DEFAULT: token("ink"),
                    strong: token("ink-strong"),
                },
                surface: {
                    DEFAULT: token("surface"),
                    subtle: token("surface-subtle"),
                    muted: token("surface-muted"),
                    inverse: token("surface-inverse"),
                },
                content: {
                    DEFAULT: token("text"),
                    secondary: token("text-secondary"),
                    muted: token("text-muted"),
                    subtle: token("text-subtle"),
                    inverse: token("text-inverse"),
                },
                line: {
                    DEFAULT: token("line"),
                    cool: token("line-cool"),
                    strong: token("line-strong"),
                },
                accent: {
                    DEFAULT: token("accent"),
                    soft: token("accent-soft"),
                    bright: token("accent-bright"),
                },
                highlight: token("highlight"),
                danger: token("danger"),
            },
            fontFamily: {
                sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
                serif: ["var(--font-serif)", ...defaultTheme.fontFamily.serif],
                mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
            },
            borderRadius: {
                // Шкала радиусов: radius/sm 6 = rounded-md, md 12 = rounded-xl,
                // lg 16 = rounded-2xl, xl 24 = rounded-3xl, 2xl 32 = rounded-panel, full = rounded-full
                panel: "2rem",
            },
            boxShadow: {
                "ds-xs": "0 1px 2px rgb(10 26 47 / 0.05)",
                "ds-sm": "0 4px 14px rgb(10 26 47 / 0.08)",
                "ds-md": "0 12px 36px rgb(10 26 47 / 0.06)",
                "ds-lg": "0 20px 40px rgb(10 26 47 / 0.12)",
            },
        },
    },
    plugins: [],
};

export default config;
