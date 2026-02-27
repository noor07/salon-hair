"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

export const BookingPortal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [selectedDate, setSelectedDate] = useState<number | null>(null);

    // Generate some mock days for a calendar
    const days = Array.from({ length: 30 }, (_, i) => i + 1);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: "100%", borderRadius: "100%" }}
                    animate={{ opacity: 1, y: 0, borderRadius: "0%", transition: { type: "spring", stiffness: 100, damping: 20 } }}
                    exit={{ opacity: 0, y: "100%", borderRadius: "100%", transition: { type: "spring", stiffness: 100, damping: 20 } }}
                    className="fixed inset-0 z-[100] bg-onyx/90 backdrop-blur-3xl overflow-y-auto"
                >
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 blur-[100px] rounded-full pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 blur-[100px] rounded-full pointer-events-none"></div>

                    <div className="min-h-screen p-8 md:p-24 max-w-5xl mx-auto relative z-10 flex flex-col justify-center">
                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 text-alabaster/50 hover:text-gold transition-colors"
                        >
                            <X size={32} />
                        </button>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                            className="text-5xl md:text-7xl font-serif text-alabaster mb-4 uppercase tracking-wide"
                        >
                            Secure Your Era.
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
                            className="text-sm font-sans tracking-[0.2em] uppercase text-gold mb-16"
                        >
                            Select a Date for Service
                        </motion.p>

                        <div className="grid grid-cols-7 gap-4 md:gap-8">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                                <div key={i} className="text-center text-xs font-sans tracking-widest text-alabaster/30 mb-4">{day}</div>
                            ))}

                            {/* Empty offset days */}
                            <div className="col-span-3"></div>

                            {days.map((day, i) => (
                                <motion.button
                                    key={day}
                                    onClick={() => setSelectedDate(day)}
                                    // Step-based framer motion anomaly (tumbling numbers)
                                    initial={{ opacity: 0, rotateX: 90, y: 20 }}
                                    animate={{
                                        opacity: 1,
                                        rotateX: 0,
                                        y: 0,
                                        transition: { type: "spring", stiffness: 200, delay: 0.4 + (i * 0.02) }
                                    }}
                                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                                    whileTap={{ scale: 0.9 }}
                                    className={`aspect-square flex items-center justify-center rounded-full text-lg font-serif transition-colors ${selectedDate === day
                                            ? "bg-gold text-onyx border-none shadow-[0_0_30px_rgba(195,163,67,0.4)]"
                                            : "border border-white/10 text-alabaster hover:border-gold/30"
                                        }`}
                                >
                                    {day}
                                </motion.button>
                            ))}
                        </div>

                        {/* Animate in confirmation area if date is selected */}
                        <AnimatePresence>
                            {selectedDate && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto", transition: { delay: 0.2 } }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-16 flex justify-between items-center border-t border-white/10 pt-8"
                                >
                                    <div>
                                        <p className="text-sm font-sans text-alabaster/50 uppercase tracking-widest mb-2">Selected Date</p>
                                        <p className="text-3xl font-serif text-gold">February {selectedDate}, 2026</p>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-gold text-onyx px-8 py-4 text-xs font-sans tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-[0_0_40px_rgba(195,163,67,0.6)]"
                                    >
                                        Confirm Era
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
