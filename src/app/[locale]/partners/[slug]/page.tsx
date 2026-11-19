import { notFound } from "next/navigation";
import { ExternalLink, Calendar, CheckCircle2 } from "lucide-react";
import { PARTNERS_DATA } from "@/data/partners";
import { getMessages, setRequestLocale } from "next-intl/server";
import { translate } from "@/i18n/tr";

interface PageProps {
    params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
    return PARTNERS_DATA.map((partner) => ({
        slug: partner.slug,
    }));
}

export default async function PartnerDetailPage({ params }: PageProps) {
    const { slug, locale } = await params;
    setRequestLocale(locale);
    const dict = (await getMessages()).Tr as Record<string, string> | undefined;
    const tr = <T,>(value: T): T => translate(dict, value) as T;
    const partner = PARTNERS_DATA.find((p) => p.slug === slug);

    if (!partner) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white text-content pt-28 pb-20">
            <div className="max-w-[1412px] mx-auto px-5 md:px-8">

                {/* Главный блок заголовка */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-12 border-b border-neutral-100">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#F8FAFC] border border-[#CBD5E1]/60 flex items-center justify-center p-4 shadow-sm shrink-0">
                            {tr(partner.logo)}
                        </div>
                        <div>
                            <div className="inline-block px-2.5 py-0.5 rounded-md bg-surface-muted text-content-secondary font-mono text-xs uppercase tracking-wider mb-2">
                                {tr(partner.category)}
                            </div>
                            <h1 className="font-serif text-[38px] sm:text-[48px] md:text-[54px] font-bold text-ink leading-none tracking-tight">
                                {tr(partner.name)}{" "}
                                {partner.subName && (
                                    <span className="font-sans font-light text-[24px] sm:text-[32px] text-content-subtle block sm:inline">
                                        {tr(partner.subName)}
                                    </span>
                                )}
                            </h1>
                        </div>
                    </div>

                    {/* Ссылка на официальный сайт партнёра */}
                    <a
                        href={partner.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-ink hover:bg-[#B91C1C] text-white font-medium text-[15px] transition-colors shadow-sm"
                    >
                        <span>{tr("Перейти на сайт партнёра")}</span>
                        <ExternalLink size={16} />
                    </a>
                </div>

                {/* Основное содержание: Описание и История */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-12 border-b border-neutral-100">
                    {/* Описание */}
                    <div className="lg:col-span-6 space-y-4">
                        <h2 className="font-serif text-[24px] sm:text-[28px] font-bold text-ink">
                            {tr("О компании и сотрудничестве")}
                        </h2>
                        <p className="text-content-secondary font-sans text-[16px] sm:text-[17px] leading-relaxed">
                            {tr(partner.summary)}
                        </p>
                    </div>

                    {/* История сотрудничества */}
                    <div className="lg:col-span-6 space-y-4">
                        <div className="flex items-center gap-2">
                            <Calendar size={18} className="text-[#B91C1C]" />
                            <h2 className="font-serif text-[24px] sm:text-[28px] font-bold text-ink">
                                {tr("Хронология и этапы работ")}
                            </h2>
                        </div>
                        <ul className="space-y-3.5 pt-2">
                            {partner.history.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1]/40">
                                    <CheckCircle2 size={18} className="text-[#B91C1C] shrink-0 mt-0.5" />
                                    <span className="text-[14px] sm:text-[15px] text-neutral-700 font-medium leading-normal">
                                        {tr(item)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Галерея: 3 изображения */}
                <div className="py-12">
                    <h2 className="font-serif text-[24px] sm:text-[28px] font-bold text-ink mb-8">
                        {tr("Фотографии и материалы")}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {partner.images.map((imgUrl, idx) => (
                            <div
                                key={idx}
                                className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-surface-muted border border-line"
                            >
                                <img
                                    src={imgUrl}
                                    alt={`${partner.name} ${tr("фото")} ${idx + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </main>
    );
}