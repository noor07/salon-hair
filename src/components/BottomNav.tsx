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
                className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-sm rounded-[2rem] bg-onyx-muted/80 backdrop-blur-2xl border border-alabaster/10 shadow-2xl px-4 h-[72px] flex items-center justify-between"
            >
                {navItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <Link key={index} href={item.href} className="flex-1">
                            <motion.div
                                whileTap={{ scale: 0.9 }}
                                className="w-full h-16 relative flex justify-center group cursor-pointer"
                            >
                                <div className="absolute top-[8px] flex justify-center items-center w-8 h-8">
                                    <Icon className="w-5 h-5 text-alabaster/50 group-hover:text-gold transition-colors" />
                                </div>
                                <span className="absolute bottom-[4px] text-[10px] font-sans uppercase tracking-widest text-alabaster/50 group-hover:text-gold transition-colors whitespace-nowrap">
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
                    className="flex-1 w-full h-16 relative flex justify-center group cursor-pointer"
                >
                    <div className="absolute top-[4px] w-10 h-10 rounded-full bg-gold/10 blur-xl group-hover:bg-gold/20 transition-colors scale-150"></div>
                    <div className="absolute top-[4px] w-10 h-10 rounded-full bg-gold flex items-center justify-center z-10 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                        <Calendar className="w-4 h-4 text-onyx" />
                    </div>
                    <span className="absolute bottom-[4px] text-[10px] font-sans uppercase tracking-widest text-gold whitespace-nowrap z-10">
                        Book
                    </span>
                </motion.button>
            </motion.nav>

            <MobileBookingSheet isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
        </>
    );
};
