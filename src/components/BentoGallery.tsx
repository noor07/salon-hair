"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import siteContent from "@/data/site-content.json";
import { GalleryImage } from "@/types";

const shimmerSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <rect width="100%" height="100%" fill="#1a1a1a"/>
</svg>
`;

const toBase64 = (str: string) => typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str);
const blurData = `data:image/svg+xml;base64,${toBase64(shimmerSvg)}`;

export const BentoGallery = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Camera Lens Expansion Mask (Circular Clip Path)
    // Starts at 5% circle centered lower in the section, expands to 150% to reveal everything
    const clipPath = useTransform(scrollYProgress, [0, 0.3], ["circle(5% at 50% 20%)", "circle(150% at 50% 50%)"]);

    // Scroll-Linked Parallax Speeds
    // Enhanced magnitude for Atmosphere parallax stagger to ensure 3D depth illusion
    const parallaxSlow = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const parallaxMedium = useTransform(scrollYProgress, [0, 1], [200, -200]);
    const parallaxFast = useTransform(scrollYProgress, [0, 1], [300, -300]);

    const { gallery } = siteContent;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        setMousePos({
            x: (e.clientX - centerX) / width,
            y: (e.clientY - centerY) / height
        });
    };

    const handleMouseLeave = () => {
        setMousePos({ x: 0, y: 0 });
    };

    const itemVariant: Variants = {
        hidden: { opacity: 0, scale: 0.95 },
        show: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
    };

    return (
        <>
            <motion.section
                id="gallery"
                style={{
                    clipPath,
                    maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)"
                }}
                className="w-full py-32 px-4 sm:px-8 md:px-12 bg-onyx @container/bento will-change-transform snap-start"
            >
                <motion.div
                    ref={containerRef}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.2 } }
                    }}
                    className="max-w-7xl mx-auto flex max-md:flex-row max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory hide-scrollbar md:flex-col gap-6 md:gap-32 py-16 px-0 overflow-visible md:overflow-hidden"
                >
                    {/* Main large image - Asymmetrical Right Aligned */}
                    <motion.div
                        style={{ y: parallaxMedium }}
                        variants={itemVariant}
                        className="w-[85vw] md:w-3/4 max-w-5xl shrink-0 snap-center md:self-end h-[400px] md:h-[600px] max-md:!scale-100 max-md:!transform-none"
                    >
                        <motion.div
                            layoutId={gallery[0].id}
                            whileTap={{ scale: 0.98 }}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            data-cursor="view"
                            className="w-full h-full relative rounded-[2rem] overflow-hidden border-ultra-fine group cursor-pointer"
                            onClick={() => setSelectedImage(gallery[0])}
                        >
                            <motion.div
                                animate={{
                                    x: mousePos.x * -20,
                                    y: mousePos.y * -20,
                                    scale: 1.05
                                }}
                                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={gallery[0].src}
                                    alt={gallery[0].alt}
                                    fill
                                    placeholder="blur"
                                    blurDataURL={blurData}
                                    className="object-cover"
                                />
                            </motion.div>

                            <div className="absolute inset-0 bg-gradient-to-t from-onyx/80 via-transparent to-transparent pointer-events-none"></div>

                            <motion.div
                                animate={{ x: mousePos.x * 20, y: mousePos.y * 20 }}
                                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                className="absolute bottom-8 left-8 pointer-events-none"
                            >
                                <h3 className="text-3xl font-serif text-alabaster">{gallery[0].title}</h3>
                                <p className="text-sm font-sans tracking-widest uppercase text-gold mt-2">{gallery[0].subtitle}</p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                    <motion.div
                        style={{ y: parallaxSlow }}
                        variants={itemVariant}
                        className="w-[85vw] md:w-2/3 max-w-3xl shrink-0 snap-center md:self-center auto-rows-auto h-[400px] md:h-[500px] md:mt-32 max-md:!scale-100 max-md:!transform-none"
                    >
                        <motion.div
                            layoutId={gallery[1].id}
                            whileTap={{ scale: 0.98 }}
                            data-cursor="view"
                            className="w-full h-full relative rounded-[2rem] overflow-hidden border-ultra-fine group cursor-pointer"
                            onClick={() => setSelectedImage(gallery[1])}
                        >
                            <Image
                                src={gallery[1].src}
                                alt={gallery[1].alt}
                                fill
                                placeholder="blur"
                                blurDataURL={blurData}
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-onyx/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
                        </motion.div>
                    </motion.div>

                    {/* Smaller image 2 - Extra Large Parallax Float Left */}
                    <motion.div
                        style={{ y: parallaxFast }}
                        variants={itemVariant}
                        className="w-[85vw] md:w-5/6 max-w-6xl shrink-0 snap-center md:self-start h-[400px] md:h-[700px] md:mt-48 mb-32 max-md:!scale-100 max-md:!transform-none"
                    >
                        <motion.div
                            layoutId={gallery[2].id}
                            whileTap={{ scale: 0.98 }}
                            data-cursor="view"
                            className="w-full h-full relative rounded-[2rem] overflow-hidden border-ultra-fine group cursor-pointer"
                            onClick={() => setSelectedImage(gallery[2])}
                        >
                            <Image
                                src={gallery[2].src}
                                alt={gallery[2].alt}
                                fill
                                placeholder="blur"
                                blurDataURL={blurData}
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-onyx/40 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.section>

            {/* Lightbox Overlay */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-onyx/95 backdrop-blur-2xl cursor-pointer p-4 md:p-12"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            layoutId={selectedImage.id} // Seamless shared-element transition
                            className="relative w-full max-w-6xl aspect-[16/9] rounded-2xl overflow-hidden border-ultra-fine"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                fill
                                placeholder="blur"
                                blurDataURL={blurData}
                                className="object-cover"
                            />

                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-6 right-6 text-alabaster/50 hover:text-white bg-onyx/50 backdrop-blur p-2 rounded-full transition-all"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
