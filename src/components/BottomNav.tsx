"use client";

import { motion } from "framer-motion";
import { Home, Scissors, Image as ImageIcon, Calendar } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { MobileBookingSheet } from "./MobileBookingSheet";

export const BottomNav = () => {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    const navItems = [
        { icon: Home, label: "Home", href: "#hero" },
        { icon: Scissors, label: "Services", href: "#services" },
        { icon: ImageIcon, label: "Gallery", href: "#gallery" },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-sm rounded-[2rem] bg-onyx-muted/80 backdrop-blur-2xl border border-alabaster/10 shadow-2xl px-6 pt-4 pb-4 flex items-end justify-between"
            >
                {navItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <Link key={index} href={item.href}>
                            <motion.div
                                whileTap={{ scale: 0.9 }}
                                className="flex flex-col items-center gap-1 group cursor-pointer"
                            >
                                <Icon className="w-5 h-5 text-alabaster/50 group-hover:text-gold transition-colors" />
                                <span className="text-[10px] font-sans uppercase tracking-widest text-alabaster/50 group-hover:text-gold transition-colors">
                                    {item.label}
                                </span>
                            </motion.div>
                        </Link>
                    );
                })}

                {/* Primary Booking Action */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsBookingOpen(true)}
                    className="flex flex-col items-center gap-1 group cursor-pointer relative"
                >
                    <div className="absolute -inset-4 bg-gold/10 rounded-full blur-xl group-hover:bg-gold/20 transition-colors"></div>
                    <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center relative z-10 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                        <Calendar className="w-4 h-4 text-onyx" />
                    </div>
                    <span className="text-[10px] font-sans uppercase tracking-widest text-gold">
                        Book
                    </span>
                </motion.button>
            </motion.nav>

            <MobileBookingSheet isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
        </>
    );
};
