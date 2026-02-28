"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ChevronRight, Calendar as CalendarIcon, Scissors } from "lucide-react";
import Image from "next/image";
import siteContent from "@/data/site-content.json";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const MobileBookingSheet = ({ isOpen, onClose }: Props) => {
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [selectedStylist, setSelectedStylist] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<number | null>(null);

    const { services } = siteContent;
    const stylists = [
        { name: "Elena", avatar: "/salon-hair/avatar_elena.png" },
        { name: "Marcus", avatar: "/salon-hair/avatar_marcus.png" },
        { name: "David", avatar: "/salon-hair/avatar_david.png" },
        { name: "Sarah", avatar: "/salon-hair/avatar_sarah.png" }
    ];

    const days = Array.from({ length: 14 }, (_, i) => i + 1); // Next 14 days

    const nextStep = () => setStep(s => Math.min(s + 1, 3));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-onyx/80 backdrop-blur-sm z-[100] md:hidden"
                    />

                    {/* Bottom Sheet */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed bottom-0 left-0 right-0 h-[85vh] bg-onyx border-t border-alabaster/10 rounded-t-[2rem] z-[101] flex flex-col md:hidden overflow-hidden shadow-[0_-20px_40px_rgba(0,0,0,0.5)]"
                    >
                        {/* Drag Handle & Progress */}
                        <div className="w-full flex flex-col items-center pt-4 pb-2 relative z-20 bg-onyx">
                            <div className="w-12 h-1.5 bg-alabaster/20 rounded-full mb-6"></div>

                            {/* Progress Bar */}
                            <div className="w-full px-8 flex items-center justify-between mb-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className={`h-1 flex-1 mx-1 rounded-full transition-colors duration-500 ${step >= i ? 'bg-gold' : 'bg-alabaster/10'}`} />
                                ))}
                            </div>

                            <div className="w-full px-8 flex justify-between text-[10px] font-sans uppercase tracking-widest text-alabaster/40">
                                <span className={step >= 1 ? 'text-gold' : ''}>Service</span>
                                <span className={step >= 2 ? 'text-gold' : ''}>Stylist</span>
                                <span className={step >= 3 ? 'text-gold' : ''}>Time</span>
                            </div>

                            <button onClick={onClose} className="absolute top-4 right-6 text-alabaster/50 hover:text-white">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto px-6 pt-6 pb-32">
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="flex flex-col gap-6"
                                    >
                                        <h3 className="text-2xl font-serif text-alabaster tracking-wide">Select Service</h3>
                                        <div className="flex flex-col gap-3 pb-8">
                                            {services.map(srv => (
                                                <div
                                                    key={srv.id}
                                                    onClick={() => setSelectedService(srv.id)}
                                                    className={`w-full p-4 rounded-2xl border flex items-center justify-between transition-all duration-300 cursor-pointer ${selectedService === srv.id ? 'border-gold bg-gold/5 shadow-[0_0_15px_rgba(195,163,67,0.15)]' : 'border-alabaster/10 bg-onyx-muted'}`}
                                                >
                                                    <div className="flex items-start gap-4">
                                                        <div className={`flex items-center justify-center w-12 h-12 rounded-full border shrink-0 ${selectedService === srv.id ? 'border-gold text-gold bg-gold/10' : 'border-alabaster/10 text-alabaster/50 bg-onyx'}`}>
                                                            <Scissors className="w-5 h-5" />
                                                        </div>
                                                        <div className="flex flex-col flex-1">
                                                            <div className="flex justify-between items-start mb-1">
                                                                <h4 className="font-serif text-lg text-alabaster">{srv.name}</h4>
                                                                <p className="text-lg font-serif text-gold">{srv.price}</p>
                                                            </div>
                                                            <p className="text-[10px] font-sans text-alabaster/50 uppercase tracking-widest mb-3">{srv.duration}</p>
                                                            <p className="text-xs font-sans text-alabaster/70 leading-relaxed max-w-[90%]">{srv.description}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="flex flex-col gap-6"
                                    >
                                        <h3 className="text-2xl font-serif text-alabaster tracking-wide">Choose Artisan</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            {stylists.map(stylist => (
                                                <div
                                                    key={stylist.name}
                                                    onClick={() => setSelectedStylist(stylist.name)}
                                                    className={`rounded-2xl border p-4 flex items-center gap-4 transition-all duration-300 cursor-pointer ${selectedStylist === stylist.name ? 'border-gold bg-gold/5 shadow-[0_0_15px_rgba(195,163,67,0.15)]' : 'border-alabaster/10 bg-onyx-muted'}`}
                                                >
                                                    <div className={`relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 transition-colors ${selectedStylist === stylist.name ? 'border-gold' : 'border-transparent'}`}>
                                                        <Image
                                                            src={stylist.avatar}
                                                            alt={`${stylist.name} - Master Barber`}
                                                            fill
                                                            className="object-cover"
                                                            sizes="64px"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-serif text-lg tracking-wide text-alabaster">{stylist.name}</span>
                                                        <span className="font-sans uppercase tracking-[0.2em] text-[8px] text-alabaster/40 mt-1">Master Barber</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="flex flex-col gap-6"
                                    >
                                        <h3 className="text-2xl font-serif text-alabaster tracking-wide">Select Date</h3>
                                        <div className="flex flex-col gap-3">
                                            {days.map(day => (
                                                <div
                                                    key={day}
                                                    onClick={() => setSelectedDate(day)}
                                                    className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all ${selectedDate === day ? 'border-gold bg-gold/5' : 'border-alabaster/10 bg-onyx-muted'}`}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <CalendarIcon className={`w-5 h-5 ${selectedDate === day ? 'text-gold' : 'text-alabaster/50'}`} />
                                                        <span className="font-sans text-sm tracking-wider text-alabaster">March {day}, 2026</span>
                                                    </div>
                                                    <span className="font-sans text-xs tracking-widest text-gold opacity-80">10:00 AM</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Sticky Bottom Actions */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-onyx via-onyx to-transparent pt-12">
                            <div className="flex gap-4">
                                {step > 1 && (
                                    <button
                                        onClick={prevStep}
                                        className="w-14 h-14 rounded-full border border-alabaster/20 flex items-center justify-center text-alabaster/50 shrink-0"
                                    >
                                        <ChevronRight className="w-6 h-6 rotate-180" />
                                    </button>
                                )}

                                <button
                                    onClick={() => {
                                        if (step < 3) nextStep();
                                        else onClose(); // Final confirm action
                                    }}
                                    disabled={(step === 1 && !selectedService) || (step === 2 && !selectedStylist) || (step === 3 && !selectedDate)}
                                    className="flex-1 h-14 rounded-full bg-gold text-onyx font-sans uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2 disabled:opacity-50 disabled:bg-alabaster/20 disabled:text-alabaster/50 transition-colors"
                                >
                                    {step === 3 ? "Confirm Booking" : "Continue"}
                                    {step < 3 && <ChevronRight className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
