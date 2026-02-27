"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

export const MagneticButton = ({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!ref.current) return;
            const { clientX, clientY } = e;
            const { height, width, left, top } = ref.current.getBoundingClientRect();
            const middleX = left + width / 2;
            const middleY = top + height / 2;

            const distanceX = clientX - middleX;
            const distanceY = clientY - middleY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            // 80px pull radius beyond the button bounds
            const magneticPullRadius = 80 + Math.max(width, height) / 2;

            if (distance < magneticPullRadius) {
                const strength = 1 - (distance / magneticPullRadius);
                setPosition({ x: distanceX * 0.4 * strength, y: distanceY * 0.4 * strength });
            } else {
                setPosition({ x: 0, y: 0 });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const { x, y } = position;
    return (
        <motion.button
            ref={ref}
            animate={{ x, y }}
            whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(195,163,67,0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`relative inline-flex items-center justify-center ${className}`}
        >
            <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
                {children}
            </div>
        </motion.button>
    );
};
