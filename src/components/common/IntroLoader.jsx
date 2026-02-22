import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroLoader = ({ onComplete }) => {
    // Phases:
    // -1 to 2: Logo and Branding Reveal
    // 3 to 8: User Provided Animation Sequence
    // 9: End
    const [phase, setPhase] = useState(-1);
    const [imgError, setImgError] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const timers = [
            setTimeout(() => setPhase(0), 500),    // Logo Bloom
            setTimeout(() => setPhase(1), 2000),   // Logo Move
            setTimeout(() => setPhase(2), 3500),   // MIPL Text Show

            // New Sequence Starts
            setTimeout(() => setPhase(3), 5500),   // Design. Great. (New Seq P0)
            setTimeout(() => setPhase(4), 7000),   // Slogan + Blue Great (New Seq P1)
            setTimeout(() => setPhase(5), 8500),   // Engineering (New Seq P2)
            setTimeout(() => setPhase(6), 10500),  // Deliver Seq (New Seq P3)
            setTimeout(() => setPhase(7), 12500),  // Next Chip (New Seq P4)
            setTimeout(() => setPhase(8), 14000),  // Zoom/Final (New Seq P5)

            setTimeout(() => {
                setPhase(9);
                if (onComplete) onComplete();
            }, 16500)
        ];

        return () => timers.forEach(clearTimeout);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[2000] flex flex-col items-center justify-center select-none overflow-hidden bg-black"
        >
            <style>
                {`
                .text-fill { background-size: 200% 100%; background-position: 100% 0; -webkit-background-clip: text; -webkit-text-fill-color: transparent; transition: background-position 1.2s cubic-bezier(0.16, 1, 0.3, 1); }
                .text-fill.active { background-position: 0% 0; }
                .yellow-fill { background-image: linear-gradient(to right, #FFD700 50%, white 50%); }
                .blue-fill { background-image: linear-gradient(to right, #00c2ff 50%, white 50%); }
                `}
            </style>

            <AnimatePresence>
                {phase < 9 && (
                    <motion.div
                        key="master-loader-content"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }} // Smooth fade out instead of blur/scale
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="relative w-full h-full flex flex-col items-center justify-center"
                    >
                        {/* 1. Logo Animation (Center -> Top-Left) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: phase >= 0 ? 1 : 0,
                                scale: phase >= 3 ? (isMobile ? 0.35 : 0.384) : (phase >= 1 ? 0.6 : (phase >= 0 ? 1 : 0)),
                                x: phase >= 1 ? (isMobile ? '-35vw' : '-44vw') : 0,
                                y: phase >= 1 ? (isMobile ? '-41vh' : '-44vh') : 0,
                            }}
                            transition={{
                                scale: { type: "spring", stiffness: 100, damping: 15, duration: 1.5 },
                                x: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
                                y: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
                                opacity: { duration: 0.5 }
                            }}
                            style={{ position: 'absolute', zIndex: 4000 }}
                            className="flex items-center justify-center"
                        >
                            {!imgError ? (
                                <img
                                    src="/logo_large.png"
                                    alt="MIPL Logo"
                                    onError={() => setImgError(true)}
                                    style={{
                                        width: '650px',
                                        height: 'auto',
                                        filter: 'drop-shadow(0 0 60px rgba(0, 194, 255, 0.6))'
                                    }}
                                />
                            ) : (
                                <h1 className="text-4xl font-bold text-white tracking-wider">MIPL</h1>
                            )}
                        </motion.div>

                        {/* 2. MicroCircuits Innovations Text (Center -> Top-Left Overlap) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{
                                opacity: phase >= 2 ? 1 : 0,
                                scale: phase >= 3 ? (isMobile ? 0.6 : 0.45) : (phase >= 2 ? (isMobile ? 0.6 : 1) : 0.9),
                                x: phase >= 3 ? (isMobile ? '8vw' : '-28.5vw') : 0,
                                y: phase >= 3 ? (isMobile ? '-41vh' : '-44.5vh') : (phase >= 2 ? 0 : 20),
                            }}
                            transition={{
                                duration: 1.5,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            style={{
                                display: 'flex',
                                gap: '0.6rem',
                                fontSize: phase >= 3 ? (isMobile ? '1.5rem' : '2.5rem') : (isMobile ? '2.4rem' : '4rem'), // Dynamic font size based on phase
                                fontWeight: '600',
                                letterSpacing: '0.02em',
                                whiteSpace: 'nowrap',
                                zIndex: 4001,
                                pointerEvents: 'none',
                                position: 'absolute'
                            }}
                        >
                            <span style={{ color: '#fff' }}>MicroCircuits</span>
                            <span style={{ color: '#b0bebe' }}>Innovations</span>
                        </motion.div>

                        {/* ========================================== */}
                        {/* INTEGRATED ANIMATION SEQUENCE (Phases 3-8) */}
                        {/* ========================================== */}
                        <div className="relative flex flex-col items-center justify-center w-full">

                            {/* Phase 3-5: Design, Great, Engineering Sequence */}
                            <AnimatePresence>
                                {phase >= 3 && phase < 6 && (
                                    <motion.div
                                        key="sequence-1"
                                        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                                        transition={{ duration: 0.8 }}
                                        className="relative flex flex-col items-center justify-center w-full"
                                    >
                                        <motion.div
                                            animate={{ y: phase >= 4 ? -60 : 0 }}
                                            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                                            className="flex items-center justify-center font-sans z-20"
                                        >
                                            <AnimatePresence>
                                                {phase < 5 && (
                                                    <motion.span
                                                        key="design-text-integrated"
                                                        layout
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0, filter: "blur(10px)" }}
                                                        transition={{ duration: 0.4 }}
                                                        className="text-4xl md:text-6xl font-medium text-white mr-3 md:mr-6"
                                                    >
                                                        Design.
                                                    </motion.span>
                                                )}
                                                <motion.span
                                                    key="great-text-integrated"
                                                    layout
                                                    initial={{ color: "#ffffff" }}
                                                    animate={{ color: phase >= 4 ? "#00c2ff" : "#ffffff" }}
                                                    transition={{ color: { duration: 1.2 }, layout: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }}
                                                    className="text-4xl md:text-6xl font-medium inline-block"
                                                >
                                                    Great.
                                                </motion.span>
                                                {phase >= 5 && (
                                                    <motion.span
                                                        key="engineering-text-integrated"
                                                        layout
                                                        initial={{ opacity: 0, scale: 0.4, filter: "blur(8px)" }}
                                                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                                        transition={{ opacity: { duration: 0.6, delay: 0.3 }, scale: { duration: 0.6, delay: 0.3 }, layout: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
                                                        className="text-4xl md:text-6xl font-medium text-white ml-3 md:ml-6 whitespace-nowrap inline-block"
                                                    >
                                                        Engineering.
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>

                                        <AnimatePresence>
                                            {phase >= 4 && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.4 }}
                                                    animate={{ opacity: 1, scale: 1, y: 8 }}
                                                    exit={{ opacity: 0, y: 5 }}
                                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                                    className="text-center z-10 absolute top-[52%] whitespace-nowrap"
                                                >
                                                    <p className="text-lg md:text-2xl font-medium text-white tracking-wide">
                                                        <span className="opacity-60">We don’t just Design Chips. We Engineer </span>
                                                        <span className={`inline-block text-fill yellow-fill ${phase >= 5 ? 'active' : ''}`} style={{ transitionDelay: '0.8s' }}>
                                                            Breakthroughs
                                                        </span>
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Phase 6-8: Deliver, Next Chip Sequence */}
                            <AnimatePresence>
                                {phase >= 6 && (
                                    <motion.div
                                        key="sequence-2"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, filter: "blur(10px)" }}
                                        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                                    >
                                        <motion.div
                                            animate={{
                                                y: phase >= 7 ? -35 : 0,
                                                opacity: phase >= 8 ? 0 : 1,
                                                filter: phase >= 8 ? "blur(10px)" : "blur(0px)"
                                            }}
                                            transition={{ opacity: { duration: 0.8, ease: "easeInOut" }, y: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }, filter: { duration: 0.8 } }}
                                            className="flex space-x-8 md:space-x-20 flex gap-[2.5px] md:gap-[30px] lg:gap-[35.5px]"
                                        >
                                            {["Design.", "Develop.", "Deliver."].map((word, i) => (
                                                <motion.span
                                                    key={word}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0, color: (i === 2 && phase >= 7) ? "#00c2ff" : "#ffffff" }}
                                                    transition={{ color: { duration: 1.2, ease: "easeInOut" }, duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
                                                    className="text-4xl md:text-8xl font-bold tracking-tighter"
                                                >
                                                    {word}
                                                </motion.span>
                                            ))}
                                        </motion.div>

                                        <AnimatePresence>
                                            {phase >= 7 && (
                                                <motion.div
                                                    layoutId="hero-text-wrapper"
                                                    initial={{ opacity: 0, scale: 1 }}
                                                    animate={{
                                                        opacity: 1,
                                                        scale: 1,
                                                        y: 0
                                                    }}
                                                    transition={{
                                                        duration: 1.0,
                                                        ease: [0.16, 1, 0.3, 1]
                                                    }}
                                                    className="text-center mt-8"
                                                >
                                                    <p style={{
                                                        fontSize: 'clamp(1.5rem, 6vw, 3rem)', // Reduced size
                                                        fontWeight: 600,
                                                        letterSpacing: '-1px',
                                                        lineHeight: 1.1,
                                                        color: '#fff',
                                                        display: 'flex',
                                                        flexWrap: 'wrap',
                                                        justifyContent: 'center',
                                                        gap: '0.5rem'
                                                    }}>
                                                        <motion.span layoutId="word-your">Your</motion.span>{" "}
                                                        <motion.span layoutId="word-next-chip" className={`inline-block text-fill blue-fill ${phase >= 8 ? 'active' : ''}`}>Next Chip</motion.span>{" "}
                                                        <motion.span layoutId="word-starts">Starts</motion.span>{" "}
                                                        <motion.span layoutId="word-here">Here</motion.span>
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: phase > 0 ? 0.3 : 0.1 }} className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,194,255,0.15)_0%,transparent_75%)] pointer-events-none" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default IntroLoader;
