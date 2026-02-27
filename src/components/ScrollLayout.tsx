"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { LenisProvider } from "./LenisProvider";
import { CustomCursor } from "./CustomCursor";

export const ScrollLayout = ({ children }: { children: React.ReactNode }) => {
    const { scrollYProgress } = useScroll();

    // Interpolate from deep gray (Hero) to a slightly warmer dark tone (Atmosphere)
    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.4],
        ["#121212", "#181818"]
    );

    return (
        <LenisProvider>
            <motion.div style={{ backgroundColor }} className="min-h-screen relative transition-colors duration-1000 ease-out">
                <CustomCursor />
                {children}
            </motion.div>
        </LenisProvider>
    );
};
