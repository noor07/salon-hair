"use client";

import Image from "next/image";
import { ServiceList } from "./ServiceList";

export const ServicesSection = () => {
    return (
        <section
            id="services"
            className="w-full min-h-screen relative bg-gradient-to-b from-[#0a0a0a] to-[#121212] flex items-center justify-center pt-24 pb-32 snap-start"
        >
            <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-8 xl:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* Left Column: High Res Image Asset */}
                    <div className="w-full h-[60vh] lg:h-[80vh] relative rounded-2xl overflow-hidden shadow-2xl bg-onyx-muted">
                        <Image
                            src="/salon_station_closeup_1772169197334.png"
                            alt="Precision Barbering"
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover object-center transform scale-105"
                        />
                        {/* 0.05 Noise overlay for texture consistency */}
                        <Image
                            src="/noise.svg"
                            alt=""
                            fill
                            className="opacity-[0.03] pointer-events-none mix-blend-overlay object-cover"
                        />
                    </div>

                    {/* Right Column: The interactive Service List */}
                    <div className="w-full flex flex-col justify-center">
                        <div className="mb-12">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-alabaster tracking-tight mb-4">
                                Precision &<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold/50 italic">Craftsmanship</span>
                            </h2>
                            <p className="font-sans text-alabaster/60 max-w-md text-sm md:text-base leading-relaxed">
                                Every service is executed with unparalleled attention to detail, designed to elevate your personal style in a cinematic atmosphere.
                            </p>
                        </div>

                        <ServiceList />
                    </div>

                </div>
            </div>
        </section>
    );
};
