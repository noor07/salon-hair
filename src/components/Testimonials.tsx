"use client";

import { useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import siteContent from "@/data/site-content.json";

interface TestimonialProps {
    baseVelocity: number;
}

export const Testimonials = ({ baseVelocity = 1 }: TestimonialProps) => {
    const baseX = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    // Dynamic framer motion marquee
    useAnimationFrame((t, delta) => {
        if (!isHovered) {
            const moveBy = baseVelocity * (delta / 1000);
            baseX.set(baseX.get() + moveBy);
        }
    });

    // We wrap around based on the content width. 
    // Usually this is done via measuring or arbitrary wide numbers.
    // For a simple loop, `wrap` is great for precise % boundaries.
    const x = useMotionValue(0);

    // We bind x to baseX, but wrap it between -100% to 0% if it goes too far.
    // simpler hack: just CSS animate it or rely on a very wide sequence.
    useAnimationFrame((t, d) => {
        if (!isHovered) {
            const current = x.get();
            // move left
            const next = current - 0.05 * d;
            // wrap at -50% assuming we duplicate the array once.
            x.set(next <= -50 ? 0 : next);
        }
    });

    // Duplicate testimonials for the infinite loop
    const loopedTestimonials = [...siteContent.testimonials, ...siteContent.testimonials, ...siteContent.testimonials, ...siteContent.testimonials];

    return (
        <section
            className="w-full py-32 bg-[#121212] overflow-hidden border-t border-ultra-fine relative snap-start"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#121212] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#121212] to-transparent z-10 pointer-events-none"></div>

            <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 mb-16">
                <h3 className="text-sm font-sans tracking-[0.2em] uppercase text-gold">The Client Voice</h3>
            </div>

            <div className="flex w-[400vw] sm:w-[200vw] xl:w-[150vw]">
                <motion.div
                    style={{ x: `${x.get()}%` }} // We bind an inline style dynamically if we want, but better to use template syntax
                    animate={{ x: isHovered ? undefined : ["0%", "-50%"] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30, // 30 seconds to run through -50%
                            ease: "linear",
                        },
                    }}
                    className="flex gap-8 px-4"
                >
                    {loopedTestimonials.map((t, idx) => (
                        <div
                            key={`${t.id}-${idx}`}
                            className="flex-shrink-0 w-[85vw] sm:w-[400px] p-8 md:p-12 border-ultra-fine bg-onyx/30 backdrop-blur-md rounded-2xl flex flex-col justify-between hover:bg-onyx/60 transition-colors duration-500 cursor-default"
                        >
                            <svg className="w-8 h-8 text-gold mt-2 mb-6 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                            <p className="text-lg md:text-xl font-sans text-alabaster/90 leading-relaxed mb-8">
                                &quot;{t.quote}&quot;
                            </p>
                            <h4 className="text-sm font-serif text-gold tracking-widest">{t.name}</h4>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
