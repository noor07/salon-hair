"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export const CustomCursor = () => {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [cursorType, setCursorType] = useState("default");

    // Smooth out cursor movement
    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const cursorX = useSpring(position.x, springConfig);
    const cursorY = useSpring(position.y, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });

            // Look for data-cursor attributes on elements being hovered
            const target = e.target as HTMLElement;
            const cursorTarget = target.closest('[data-cursor]');

            if (cursorTarget) {
                setCursorType(cursorTarget.getAttribute("data-cursor") || "default");
            } else {
                setCursorType("default");
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Use a completely hidden default cursor, and only show when explicitly requested,
    // or show a persistent small dot. For 2026 polish, a persistent small inverted dot is high-end.
    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference hidden md:flex"
            style={{
                x: cursorX,
                y: cursorY,
                translateX: "-50%",
                translateY: "-50%"
            }}
        >
            <motion.div
                animate={{
                    width: cursorType === "view" ? 80 : cursorType === "link" ? 40 : 12,
                    height: cursorType === "view" ? 80 : cursorType === "link" ? 40 : 12,
                    backgroundColor: cursorType === "view" ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 1)",
                    backdropFilter: cursorType === "view" ? "blur(4px)" : "none",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="rounded-full flex items-center justify-center text-black font-sans text-xs tracking-widest uppercase overflow-hidden"
            >
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: cursorType === "view" ? 1 : 0 }}
                    className="whitespace-nowrap font-semibold"
                >
                    {cursorType === "view" ? "VIEW" : ""}
                </motion.span>

                {cursorType === "link" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3" /><path d="M8.12 8.12 12 12" /><path d="M20 4 8.12 15.88" /><circle cx="6" cy="18" r="3" /><path d="M14.8 14.8 20 20" /></svg>
                )}
            </motion.div>
        </motion.div>
    );
};
