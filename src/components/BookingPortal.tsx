"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Calendar as CalendarIcon, Scissors, ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import siteContent from "@/data/site-content.json";

export const BookingPortal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
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

    const days = Array.from({ length: 30 }, (_, i) => i + 1);

    const handleClose = () => {
        onClose();
        setTimeout(() => {
            setStep(1);
            setSelectedService(null);
            setSelectedStylist(null);
            setSelectedDate(null);
        }, 500);
    };

    const nextStep = () => setStep(s => Math.min(s + 1, 4));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: "100%", borderRadius: "100%" }}
                    animate={{ opacity: 1, y: 0, borderRadius: "0%", transition: { type: "spring", stiffness: 100, damping: 20 } }}
                    exit={{ opacity: 0, y: "100%", borderRadius: "100%", transition: { type: "spring", stiffness: 100, damping: 20 } }}
                    className="fixed inset-0 z-[100] bg-onyx/95 backdrop-blur-3xl overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 blur-[100px] rounded-full pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 blur-[100px] rounded-full pointer-events-none"></div>

                    <div className="h-[100dvh] p-6 md:px-24 md:py-12 max-w-6xl mx-auto relative z-10 flex flex-col">
                        <button
                            onClick={handleClose}
                            className="absolute top-12 right-12 text-alabaster/50 hover:text-gold transition-colors z-50"
                        >
                            <X size={32} />
                        </button>

                        <div className="mb-6 md:mb-8 shrink-0">
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                                className="text-4xl md:text-5xl font-serif text-alabaster mb-2 uppercase tracking-wide"
                            >
                                {step === 1 && "Select Service."}
                                {step === 2 && "Choose Artisan."}
                                {step === 3 && "Secure Your Era."}
                                {step === 4 && "Era Confirmed."}
                            </motion.h2>

                            {step < 4 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, transition: { delay: 0.5 } }}
                                    className="flex items-center gap-4 mt-8"
                                >
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className={`h-1 w-16 rounded-full transition-colors duration-500 ${step >= i ? 'bg-gold' : 'bg-alabaster/20'}`} />
                                    ))}
                                </motion.div>
                            )}
                        </div>

                        <div className="flex-1 flex flex-col justify-start overflow-y-auto min-h-0 pr-4 pb-4 custom-scrollbar" style={{ maskImage: 'linear-gradient(to bottom, black 95%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 95%, transparent 100%)' }}>
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-8"
                                    >
                                        {services.map(srv => (
                                            <div
                                                key={srv.id}
                                                onClick={() => setSelectedService(srv.id)}
                                                className={`w-full p-6 rounded-[1.5rem] border transition-all duration-300 cursor-pointer ${selectedService === srv.id ? 'border-gold bg-gold/10 shadow-[0_0_20px_rgba(195,163,67,0.15)] scale-[1.02]' : 'border-alabaster/10 bg-onyx hover:border-alabaster/30 hover:bg-onyx-muted'}`}
                                            >
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className={`flex items-center justify-center w-12 h-12 rounded-full border ${selectedService === srv.id ? 'border-gold text-gold bg-gold/10' : 'border-alabaster/10 text-alabaster/50'}`}>
                                                        <Scissors className="w-5 h-5" />
                                                    </div>
                                                    <p className="text-2xl font-serif text-gold">{srv.price}</p>
                                                </div>
                                                <h4 className="font-serif text-2xl text-alabaster mb-1">{srv.name}</h4>
                                                <p className="text-[10px] font-sans text-alabaster/50 uppercase tracking-widest mb-3">{srv.duration}</p>
                                                <p className="text-[13px] font-sans text-alabaster/70 leading-relaxed max-w-[95%]">{srv.description}</p>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8"
                                    >
                                        {stylists.map(stylist => (
                                            <div
                                                key={stylist.name}
                                                onClick={() => setSelectedStylist(stylist.name)}
                                                className={`rounded-[2rem] border p-6 flex flex-col items-center gap-6 transition-all duration-300 cursor-pointer ${selectedStylist === stylist.name ? 'border-gold bg-gold/10 shadow-[0_0_20px_rgba(195,163,67,0.15)] scale-[1.05]' : 'border-alabaster/10 bg-onyx hover:border-alabaster/30 hover:bg-onyx-muted'}`}
                                            >
                                                <div className={`relative w-32 h-32 rounded-full overflow-hidden shrink-0 border-[3px] transition-colors ${selectedStylist === stylist.name ? 'border-gold' : 'border-transparent'}`}>
                                                    <Image
                                                        src={stylist.avatar}
                                                        alt={`${stylist.name} - Master Barber`}
                                                        fill
                                                        className="object-cover"
                                                        sizes="128px"
                                                    />
                                                </div>
                                                <div className="flex flex-col items-center text-center">
                                                    <span className="font-serif text-2xl tracking-wide text-alabaster mb-1">{stylist.name}</span>
                                                    <span className="font-sans uppercase tracking-[0.2em] text-[10px] text-alabaster/40">Master Barber</span>
                                                </div>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="w-full max-w-2xl mx-auto pb-8"
                                    >
                                        <div className="grid grid-cols-7 gap-4 md:gap-6">
                                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                                                <div key={i} className="text-center text-[10px] font-sans tracking-widest text-alabaster/30 mb-4">{day}</div>
                                            ))}

                                            {/* Empty offset days */}
                                            <div className="col-span-3"></div>

                                            {days.map((day, i) => (
                                                <motion.button
                                                    key={day}
                                                    onClick={() => setSelectedDate(day)}
                                                    initial={{ opacity: 0, rotateX: 90, y: 20 }}
                                                    animate={{
                                                        opacity: 1,
                                                        rotateX: 0,
                                                        y: 0,
                                                        transition: { type: "spring", stiffness: 200, delay: 0.1 + (i * 0.02) }
                                                    }}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className={`aspect-square flex items-center justify-center rounded-full flex-col gap-1 transition-colors border focus:outline-none ${selectedDate === day
                                                        ? "bg-gold text-onyx border-gold shadow-[0_0_30px_rgba(195,163,67,0.4)]"
                                                        : "border-white/10 text-alabaster hover:border-gold/30 hover:bg-white/10"
                                                        }`}
                                                >
                                                    <span className="text-xl font-serif">{day}</span>
                                                    {selectedDate === day && <span className="text-[8px] font-sans uppercase tracking-widest opacity-80 leading-none">10:00AM</span>}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {step === 4 && (
                                    <motion.div
                                        key="step4"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="flex flex-col items-start justify-center py-8"
                                    >
                                        <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mb-8 border border-gold/20">
                                            <CalendarIcon className="w-8 h-8 text-gold" />
                                        </div>
                                        <p className="font-sans text-xl text-alabaster/70 leading-relaxed max-w-3xl mb-8">
                                            Your appointment with <span className="text-alabaster font-semibold text-2xl">{selectedStylist}</span> for the <span className="text-alabaster font-semibold text-2xl">{services.find(s => s.id === selectedService)?.name}</span> has been completely secured.
                                            We look forward to hosting you on <span className="text-gold font-serif text-2xl">March {selectedDate}, 2026</span>.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Navigation Footer */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}
                            className="mt-6 pt-6 border-t border-alabaster/10 flex items-center justify-between shrink-0"
                        >
                            {step > 1 && step < 4 ? (
                                <button
                                    onClick={prevStep}
                                    className="flex items-center gap-3 text-alabaster/50 hover:text-white transition-colors uppercase tracking-widest text-xs font-sans group"
                                >
                                    <div className="w-14 h-14 rounded-full border border-alabaster/20 flex items-center justify-center group-hover:border-alabaster/50 transition-colors">
                                        <ChevronLeft className="w-5 h-5" />
                                    </div>
                                    Go Back
                                </button>
                            ) : <div></div>}

                            <button
                                onClick={() => {
                                    if (step < 4) nextStep();
                                    if (step === 4) handleClose();
                                }}
                                disabled={
                                    (step === 1 && !selectedService) ||
                                    (step === 2 && !selectedStylist) ||
                                    (step === 3 && !selectedDate)
                                }
                                className="bg-gold text-onyx px-12 h-16 rounded-full text-xs font-sans tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-[0_0_40px_rgba(195,163,67,0.6)] disabled:opacity-50 disabled:bg-alabaster/20 disabled:text-alabaster/50 flex items-center gap-3"
                            >
                                {step === 4 ? "Done" : step === 3 ? "Confirm Booking" : "Continue"}
                                {step < 4 && <ChevronRight className="w-5 h-5" />}
                            </button>
                        </motion.div>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
