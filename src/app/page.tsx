"use client";

import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Partners } from "@/components/sections/partners";
import { Projects } from "@/components/sections/projects";
import { WhyUs } from "@/components/sections/why-us";
import { SocialChannels } from "@/components/sections/social-channels";
import { Footer } from "@/components/sections/footer";

export default function Home() {
    return (
        <main className="w-full pt-24 md:pt-28 pb-0 space-y-24 overflow-x-hidden">
            {/* БЛОК 1: Hero, Наши услуги & Партнеры */}
            <div className="w-full max-w-[1412px] mx-auto px-5 md:px-8 space-y-24">
                {/* 1. HERO SECTION */}
                <Hero />

                {/* 2. OUR SERVICES (НАШИ УСЛУГИ) */}
                <Services />

                {/* 3. OUR PARTNERS (ПАРТНЕРЫ СРАЗУ ПОСЛЕ УСЛУГ) */}
                <Partners />
            </div>

            {/* 4. PROJECTS SECTION (Полноэкранный блок проектов) */}
            <div className="w-full">
                <Projects />
            </div>

            {/* 5. WHY US SECTION (Bento Grid 01—06) */}
            <div className="w-full">
                <WhyUs />
            </div>

            {/* БЛОК 2: Каналы связи */}
            <div className="w-full max-w-[1412px] mx-auto px-5 md:px-8 space-y-24">
                {/* 6. DIRECT CONNECT */}
                <SocialChannels />
            </div>

            {/* 7. FOOTER */}
            <Footer />
        </main>
    );
}