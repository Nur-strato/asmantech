import "./globals.css";

// <html> и <body> рендерятся во вложенных layout: [locale]/layout.tsx (сайт) и admin/layout.tsx
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}
