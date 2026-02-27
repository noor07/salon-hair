"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { MagneticButton } from "./MagneticButton";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
    const title1 = "Los Domi";
    const title2 = "Barbershop";
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Kinetic Typography: text scales and stretches as you scroll down
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
    const letterSpacing = useTransform(scrollYProgress, [0, 1], ["-0.05em", "0.05em"]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    // Variable Font Axis Pulsing
    const distanceToCenter = useMotionValue(1);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            const dist = Math.sqrt(Math.pow(e.clientX - cx, 2) + Math.pow(e.clientY - cy, 2));
            const maxDist = Math.max(cx, cy);
            // 0 when exactly at center, 1 when at edges
            distanceToCenter.set(Math.min(dist / maxDist, 1));
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [distanceToCenter]);

    // Interpolate font weight from 800 (bold at center) to 300 (light at edges)
    const fw = useTransform(distanceToCenter, [0, 1], [800, 300]);
    const fontWeight = useSpring(fw, { stiffness: 50, damping: 20 });

    const letterContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.2 },
        },
    };

    // Scramble & Resolve / Blur-to-Clear
    const letterItem = {
        hidden: { opacity: 0, y: 100, rotate: 10, filter: "blur(20px)" },
        show: { opacity: 1, y: 0, rotate: 0, filter: "blur(0px)", transition: { duration: 1.2 } },
    };

    return (
        <section ref={containerRef} className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Background placeholder */}
            <div className="absolute inset-0 bg-onyx z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-onyx space-y-0 z-10"></div>
                {/* Simulating cinematic glow from a conceptual video screen behind */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-gold/10 blur-[120px] rounded-full pointer-events-none"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-6xl mt-20">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.1 }}
                    className="text-gold tracking-[0.2em] uppercase text-xs sm:text-sm font-sans mb-8"
                >
                    A Modern Legacy
                </motion.p>

                <motion.div
                    variants={letterContainer}
                    initial="hidden"
                    animate="show"
                    style={{ scale, letterSpacing, opacity: opacityTransform, fontWeight }}
                    className="font-serif text-5xl sm:text-7xl md:text-[10rem] text-alabaster leading-[0.9] flex flex-wrap justify-center overflow-hidden pb-4 origin-bottom transition-colors"
                >
                    {title1.split("").map((char, index) => (
                        <motion.span key={index} variants={letterItem} className={char === " " ? "w-[0.3em]" : "inline-block"}>
                            {char}
                        </motion.span>
                    ))}
                </motion.div>

                <motion.div
                    variants={letterContainer}
                    initial="hidden"
                    animate="show"
                    style={{ scale, opacity: opacityTransform, fontWeight }}
                    className="font-serif italic text-4xl sm:text-6xl md:text-7xl text-alabaster/60 flex flex-wrap justify-center overflow-hidden mb-16 origin-top transition-colors"
                >
                    {title2.split("").map((char, index) => (
                        <motion.span key={index} variants={letterItem} className={char === " " ? "w-[0.3em]" : "inline-block"}>
                            {char}
                        </motion.span>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    <MagneticButton className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border border-gold/30 bg-onyx/40 backdrop-blur-xl hover:border-gold transition-colors duration-500 group flex items-center justify-center text-alabaster shadow-[0_0_40px_rgba(212,175,55,0.05)] cursor-pointer">
                        <span className="font-sans text-xs sm:text-sm tracking-[0.2em] uppercase flex items-center gap-2 group-hover:text-gold transition-colors duration-300">
                            Explore <ArrowRight className="w-4 h-4" />
                        </span>
                    </MagneticButton>
                </motion.div>
            </div>
        </section>
    );
};
