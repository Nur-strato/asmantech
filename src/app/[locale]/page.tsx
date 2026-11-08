import { Hero } from "@/components/sections/hero";
import { TrustedBy } from "@/components/sections/trusted-by";
import { Services } from "@/components/sections/services";
import { Projects } from "@/components/sections/projects";
import { WhyUs } from "@/components/sections/why-us";
import { GuaranteeSupport } from "@/components/sections/guarantee-support";
import { SocialChannels } from "@/components/sections/social-channels";
import { Footer } from "@/components/sections/footer";
import { useTranslations } from "next-intl";

export default function Home() {
    const t = useTranslations("Home");

    return (
        <main className="w-full pt-20 sm:pt-24 md:pt-28 pb-0 space-y-16 sm:space-y-20 lg:space-y-28 overflow-x-clip selection:bg-neutral-900 selection:text-white">

            {/* БЛОК 1: Hero (+5% ширины) и сразу под ним TrustedBy */}
            <div className="w-full space-y-8 sm:space-y-10">
                <div className="w-full max-w-[1483px] mx-auto px-4 xs:px-5 md:px-8">
                    <Hero />
                </div>
                <div className="w-full">
                    <TrustedBy />
                </div>
            </div>

            {/* 2. SERVICES SECTION (исходные max-w-[1412px]) */}
            <div className="w-full max-w-[1412px] mx-auto px-4 xs:px-5 md:px-8">
                <Services />
            </div>

            {/* 3. PROJECTS SECTION (Полноэкранная 3D-витрина) */}
            <section className="w-full">
                <Projects />
            </section>

            {/* 4. WHY US SECTION (Принципы 01—06) */}
            <section className="w-full">
                <WhyUs />
            </section>

            {/* 5. GUARANTEE & SUPPORT */}
            <section className="w-full">
                <GuaranteeSupport />
            </section>

            {/* 6. DIRECT CONNECT (исходные max-w-[1412px]) */}
            <section aria-label={t("channelsAria")} className="w-full max-w-[1412px] mx-auto px-4 xs:px-5 md:px-8">
                <SocialChannels />
            </section>

            {/* 7. FOOTER */}
            <Footer />
        </main>
    );
}