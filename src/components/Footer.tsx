"use client";

import { motion } from "framer-motion";
import siteContent from "@/data/site-content.json";
import { MagneticButton } from "./MagneticButton";
import Link from "next/link";

export const Footer = () => {
    const { footer } = siteContent;

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="w-full relative bg-onyx min-h-[80vh] flex flex-col justify-end overflow-hidden pb-8 pt-32 snap-start">

            {/* 4-Column Info Grid */}
            <div className="max-w-screen-2xl w-full mx-auto px-4 sm:px-8 xl:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-32 relative z-20">
                {/* Brand / Meta */}
                <div className="flex flex-col gap-6">
                    <h3 className="text-xl font-serif text-gold">Los Domi</h3>
                    <p className="font-sans text-alabaster/50 text-sm max-w-[200px]">
                        Architecting modern legacy through precision grooming.
                    </p>
                </div>

                {/* Navigation */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-xs font-sans tracking-[0.2em] uppercase text-alabaster/40 mb-2">Navigation</h4>
                    {footer.navigation.map((nav, i) => (
                        <Link
                            key={i}
                            href={nav.url}
                            className="text-sm font-sans text-alabaster/80 hover:text-gold transition-colors w-fit"
                        >
                            {nav.name}
                        </Link>
                    ))}
                </div>

                {/* Hours & Location */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-xs font-sans tracking-[0.2em] uppercase text-alabaster/40 mb-2">Visit Us</h4>
                    <p className="text-sm font-sans text-alabaster/80">
                        {footer.location.address}<br />
                        {footer.location.city}
                    </p>
                    <div className="mt-2 text-sm font-sans text-alabaster/60 flex flex-col gap-1">
                        <span>M-F: {footer.hours.weekdays}</span>
                        <span>S-S: {footer.hours.weekends}</span>
                    </div>
                </div>

                {/* Socials & Back to Top */}
                <div className="flex flex-col justify-between items-start lg:items-end h-full">
                    <div className="flex flex-col gap-4 lg:text-right">
                        <h4 className="text-xs font-sans tracking-[0.2em] uppercase text-alabaster/40 mb-2">Connect</h4>
                        {footer.socials.map((social, i) => (
                            <a
                                key={i}
                                href={social.url}
                                className="text-sm font-sans text-alabaster/80 hover:text-gold transition-colors"
                            >
                                {social.name}
                            </a>
                        ))}
                    </div>

                    <div className="mt-12 lg:mt-0">
                        <MagneticButton
                            className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-[#1a1a1a] hover:bg-gold/10 hover:border-gold/30 transition-colors cursor-pointer group"
                            onClick={handleScrollToTop}
                        >
                            <svg className="w-5 h-5 text-alabaster group-hover:text-gold transition-colors transform group-hover:-translate-y-1 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                        </MagneticButton>
                    </div>
                </div>
            </div>

            {/* Massive Cinematic Type Background */}
            <div className="w-full flex justify-center items-end absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden">
                <h1 className="text-[18vw] font-serif leading-[0.75] tracking-tighter text-alabaster opacity-[0.03] translate-y-8">
                    LOS DOMI
                </h1>
            </div>

        </footer>
    );
};
