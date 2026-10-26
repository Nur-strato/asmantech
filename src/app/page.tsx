"use client";

import { Hero } from "@/components/sections/hero";
import { Partners } from "@/components/sections/partners";
import { Projects } from "@/components/sections/projects";
import { WhyUs } from "@/components/sections/why-us";
import { SocialChannels } from "@/components/sections/social-channels";
import { Footer } from "@/components/sections/footer";

export default function Home() {
    return (
        <main className="w-full pt-24 md:pt-28 pb-0 space-y-24 overflow-x-hidden">
            {/* БЛОК 1: Hero & Partners */}
            <div className="w-full max-w-[1412px] mx-auto px-5 md:px-8 space-y-24">
                {/* 1. HERO SECTION */}
                <Hero />

                {/* 2. OUR PARTNERS & ECOSYSTEM */}
                <Partners />
            </div>

            {/* 3. PROJECTS SECTION (Полноэкранный блок проектов) */}
            <div className="w-full">
                <Projects />
            </div>

            {/* 4. WHY US SECTION (Bento Grid 01—06) */}
            <div className="w-full">
                <WhyUs />
            </div>

            {/* БЛОК 2: Каналы связи */}
            <div className="w-full max-w-[1412px] mx-auto px-5 md:px-8 space-y-24">
                {/* 5. DIRECT CONNECT */}
                <SocialChannels />
            </div>

            {/* 6. FOOTER */}
            <Footer />
        </main>
    );
}