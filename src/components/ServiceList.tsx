"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import siteContent from "@/data/site-content.json";
import { Service } from "@/types";

export const ServiceList = () => {
    const [availability, setAvailability] = useState("Checking...");
    const [hoveredService, setHoveredService] = useState<Service | null>(null);
    const [aiSummary, setAiSummary] = useState<string | null>(null);
    const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Mock Supabase Fetch
    useEffect(() => {
        const fetchAvailability = async () => {
            // Simulate network latency
            await new Promise(resolve => setTimeout(resolve, 1500));
            setAvailability("3 Slots Available Today");
        };
        fetchAvailability();
    }, []);

    const handleMouseEnter = (service: Service) => {
        setHoveredService(service);

        // 2-second AI Tooltip Delay
        if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = setTimeout(() => {
            setAiSummary(service.description);
        }, 2000);
    };

    const handleMouseLeave = () => {
        setHoveredService(null);
        setAiSummary(null);
        if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };

    return (
        <div className="flex flex-col justify-center relative w-full">
            <div className="flex justify-between items-end mb-12 relative z-10 w-full border-b border-white/5 pb-4">
                <h3 className="text-sm font-sans tracking-[0.2em] uppercase text-gold">Our Services</h3>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[10px] font-sans text-alabaster/60 uppercase tracking-wider">{availability}</span>
                </div>
            </div>

            <ul className="space-y-6 relative z-10 pb-16 group/list">
                {siteContent.services.map((service) => (
                    <li
                        key={service.id}
                        onMouseEnter={() => handleMouseEnter(service)}
                        onMouseLeave={handleMouseLeave}
                        className="flex items-end justify-between pb-6 group cursor-pointer relative transition-all duration-500 group-hover/list:opacity-20 hover:!opacity-100"
                    >
                        {/* 1px Animated Expanding Border */}
                        <motion.div
                            className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-gold/80 to-transparent z-0"
                            initial={{ width: "0%" }}
                            animate={{ width: hoveredService?.id === service.id ? "100%" : "0%" }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        />
                        {/* 2026 Justified Service Line: Name ----- Price */}
                        <motion.span
                            animate={{ fontWeight: hoveredService?.id === service.id ? 700 : 300 }}
                            className="text-sm md:text-base font-sans tracking-widest text-alabaster uppercase transition-colors duration-300 z-10"
                        >
                            {service.name}
                        </motion.span>

                        <div className="flex-grow border-b border-dashed border-white/10 mx-4 mb-2 group-hover:border-gold/50 transition-colors duration-500 z-10"></div>

                        <motion.div
                            animate={{ x: hoveredService?.id === service.id ? 10 : 0 }}
                            className="flex items-baseline gap-3 text-right z-10"
                        >
                            <span className="text-xs font-sans text-alabaster/40 hidden md:inline">{service.duration}</span>
                            <span className="text-sm md:text-base font-serif text-alabaster/60 group-hover:text-gold transition-colors duration-300">
                                {service.price}
                            </span>
                        </motion.div>

                        {/* AI Summary Tooltip remains absolute positioned over the parent container */}
                        <AnimatePresence>
                            {aiSummary && hoveredService?.id === service.id && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                                    className="absolute -top-16 left-0 right-0 bg-onyx/90 backdrop-blur-xl border-ultra-fine p-4 rounded-lg shadow-2xl z-50 pointer-events-none"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold"><path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                                        <span className="text-[10px] uppercase tracking-widest text-gold">Agent Summary</span>
                                    </div>
                                    <p className="text-xs text-alabaster/80 leading-relaxed font-sans">{aiSummary}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </li>
                ))}
            </ul>
        </div>
    );
};
