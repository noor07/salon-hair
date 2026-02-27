"use client";

import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import Link from "next/link";
import { Scissors } from "lucide-react";
import { useState } from "react";
import { BookingPortal } from "./BookingPortal";

export const BlurMenu = () => {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const { scrollY } = useScroll();

    const bgOpacity = useTransform(scrollY, [0, 100], [0.1, 0.7]);
    const blurObj = useTransform(scrollY, [0, 100], [10, 20]);
    const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.08]);

    const backgroundColor = useMotionTemplate`rgba(15, 15, 15, ${bgOpacity})`;
    const backdropFilter = useMotionTemplate`blur(${blurObj}px)`;
    const border = useMotionTemplate`1px solid rgba(255, 255, 255, ${borderOpacity})`;

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                style={{
                    backgroundColor,
                    backdropFilter,
                    border
                }}
                className="fixed top-6 md:top-8 left-1/2 -translate-x-1/2 z-40 flex items-center justify-between px-6 py-4 w-[95%] max-w-5xl rounded-full shadow-2xl"
            >
                <div className="flex items-center gap-2 text-alabaster">
                    <Scissors className="w-5 h-5 text-gold" />
                    <span className="font-serif text-lg tracking-wide uppercase">Los Domi</span>
                </div>
                <div className="hidden md:flex items-center gap-8 font-sans text-sm tracking-widest uppercase text-alabaster/80">
                    <Link data-cursor="link" href="#services" className="hover:text-gold transition-colors duration-300">Services</Link>
                    <Link data-cursor="link" href="#gallery" className="hover:text-gold transition-colors duration-300">Gallery</Link>
                    <Link data-cursor="link" href="#reservation" className="hover:text-gold transition-colors duration-300">Reservation</Link>
                </div>
                <motion.button
                    onClick={() => setIsBookingOpen(true)}
                    whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(195,163,67,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="relative overflow-hidden text-xs font-sans tracking-[0.2em] uppercase border border-gold/50 px-6 py-3 hover:bg-gold hover:text-onyx transition-all duration-300 group"
                >
                    <span className="relative z-10">Book Now</span>
                    <motion.div
                        animate={{ x: ["-200%", "300%"] }}
                        transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 5, ease: "easeInOut" }}
                        className="absolute inset-0 z-0 w-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent skew-x-12 group-hover:via-white/50"
                    />
                </motion.button>
            </motion.nav>

            <BookingPortal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
        </>
    );
};
