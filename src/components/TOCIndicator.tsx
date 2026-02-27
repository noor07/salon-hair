"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export const TOCIndicator = () => {
    const { scrollYProgress } = useScroll();

    // Smooth out the progress for a more "elastic" premium feel
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

    return (
        <motion.div
            style={{ opacity }}
            className="fixed right-6 md:right-12 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-4 pointer-events-none hidden md:flex"
        >
            <span className="text-[10px] font-sans text-alabaster/30 tracking-widest rotate-90 mb-4 uppercase">Scroll</span>
            <div className="relative w-[1px] h-[30vh] bg-white/10 overflow-visible rounded-full my-4">
                <motion.div
                    className="absolute top-0 left-0 right-0 bottom-0 bg-gold origin-top"
                    style={{ scaleY }}
                />

                {/* Section Markers */}
                <div className="absolute -left-1 w-3 h-3 rounded-full bg-onyx border border-white/20 top-0 z-10" />
                <span className="absolute -left-14 top-[-2px] text-[8px] uppercase tracking-widest text-alabaster/40 font-sans">Hero</span>

                <div className="absolute -left-1 w-3 h-3 rounded-full bg-onyx border border-white/20 top-1/2 -translate-y-1/2 z-10" />
                <span className="absolute -left-24 top-1/2 -translate-y-1/2 text-[8px] uppercase tracking-widest text-alabaster/40 font-sans">Atmosphere</span>

                <div className="absolute -left-1 w-3 h-3 rounded-full bg-onyx border border-white/20 bottom-0 z-10" />
                <span className="absolute -left-16 bottom-[-2px] text-[8px] uppercase tracking-widest text-alabaster/40 font-sans">Service</span>
            </div>
            <span className="text-[10px] font-sans text-alabaster/30 tracking-widest rotate-90 mt-4 uppercase">Domi</span>
        </motion.div>
    );
};
