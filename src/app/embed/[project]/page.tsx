import React from "react";
import { notFound } from "next/navigation";

// ── Подключение песочниц ──────────────────────────────────────
import { AucahackSandbox } from "@/app/[locale]/projects/aucahack/aucahack";
import { ConuratSandbox } from "@/app/[locale]/projects/konurat/konurat";
import { ProQuizSandbox } from "@/app/[locale]/projects/proquiz/proquiz";
// ──────────────────────────────────────────────────────────────

interface PageProps {
    params: Promise<{ project: string }>;
}

export default async function EmbedPage({ params }: PageProps) {
    const { project } = await params;

    switch (project.toLowerCase()) {
        case "aucahack":
            return <AucahackSandbox isZoomed={true} />;
        case "konurat":
            return <ConuratSandbox isZoomed={true} />;
        case "proquiz":
            return <ProQuizSandbox isZoomed={true} />;
        case "knopka":
            return (
                <div className="flex h-screen flex-col items-center justify-center p-8 text-center font-mono">
                    <span className="text-xs uppercase tracking-wider text-neutral-400">
                        Knopka // Бухгалтерская компания
                    </span>
                    <p className="mt-2 text-sm text-neutral-600">
                        Интерактивный прототип находится в процессе подготовки.
                    </p>
                </div>
            );
        default:
            notFound();
    }
}