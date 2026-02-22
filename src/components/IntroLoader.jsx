import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const IntroLoader = ({ onComplete }) => {
    const [phase, setPhase] = useState(-2);
    const [blueFill, setBlueFill] = useState(false);
    const [yellowFill, setYellowFill] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if intro has already played in this window session (resets on hard refresh)
        if (window.hasIntroPlayed) {
            setPhase(11);
            if (onComplete) onComplete();
            return;
        }

        // ... (keeping existing timers)
        const timerEnd = setTimeout(() => {
            setPhase(11); // Cleanup
            window.hasIntroPlayed = true;
            if (onComplete) onComplete();
            // Only navigate if we are currently on the homepage or landing
            if (window.location.pathname === '/' || window.location.pathname === '') {
                navigate('/expertise');
            }
        }, 16800);
        const timerLogo = setTimeout(() => setPhase(-1), 1500); // Show logo for 1.5s

        // Phase 0-2: MicroCircuits Innovations (approx 2s)
        const timerText1 = setTimeout(() => setPhase(0), 1500);

        // Phase 3-6: Design. Great. Engineering. -> Breakdown -> Next Chip
        // Phase 3-6: Design. Great. Engineering.
        const timerText2 = setTimeout(() => setPhase(3), 4000); // Start Design. Great. Engineering.
        const timer4 = setTimeout(() => setPhase(4), 5400); // Design
        const timer5 = setTimeout(() => setPhase(5), 5800); // Great
        const timer6 = setTimeout(() => setPhase(6), 7000); // Engineering
        const timerYellow = setTimeout(() => setYellowFill(true), 6200); // Trigger yellow fill when slogan appears

        // Phase 7-10: Design. Develop. Deliver. -> Next Chip
        const timer7 = setTimeout(() => setPhase(7), 11800); // Wait for yellow fill to complete
        const timer8 = setTimeout(() => setPhase(8), 12000); // Develop
        const timer9 = setTimeout(() => setPhase(9), 13200); // Deliver
        const timer10 = setTimeout(() => setPhase(10), 14400); // Your Next Chip
        const timerBlue = setTimeout(() => setBlueFill(true), 15400); // Trigger blue fill


        return () => {
            clearTimeout(timerLogo);
            clearTimeout(timerText1);
            clearTimeout(timerText2);
            clearTimeout(timer4);
            clearTimeout(timer5);
            clearTimeout(timer6);
            clearTimeout(timerYellow);
            clearTimeout(timer7);
            clearTimeout(timer8);
            clearTimeout(timer9);
            clearTimeout(timer10);
            clearTimeout(timerBlue);
            clearTimeout(timerEnd);
        };
    }, [onComplete]);

    return (
        <motion.div
            className={`fixed inset-0 z-[2000] flex items-center justify-center select-none overflow-hidden ${phase >= 11 ? 'pointer-events-none' : 'pointer-events-auto'}`}
        >
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: phase >= 11 ? 0 : 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 bg-black"
            />
            <style>
                {`
                .text-fill { background-size: 200% 100%; background-position: 100% 0; -webkit-background-clip: text; -webkit-text-fill-color: transparent; transition: background-position 1.2s cubic-bezier(0.16, 1, 0.3, 1); }
                .text-fill.active { background-position: 0% 0; }
                .yellow-fill { background-image: linear-gradient(to right, #FFD700 50%, white 50%); }
                .blue-fill { background-image: linear-gradient(to right, #00c2ff 50%, white 50%); }
                .infinity-svg { width: 150px; height: 75px; filter: drop-shadow(0 0 12px #00aaff) drop-shadow(0 0 25px #0077ff); }
                .infinity-path, .infinity-glow { fill: none; stroke-linecap: round; stroke-dasharray: 200; stroke-dashoffset: 200; animation: draw-infinity 2.5s linear infinite; }
                .infinity-path { stroke: #fff; stroke-width: 4; }
                .infinity-glow { stroke: #00aaff; stroke-width: 8; opacity: 0.4; }
                @keyframes draw-infinity { 0% { stroke-dashoffset: 400; } 100% { stroke-dashoffset: 0; } }
                .loading-text { margin-top: 24px; font-family: sans-serif; color: #fff; font-size: 14px; letter-spacing: 5px; text-transform: uppercase; animation: pulse-text 1.5s ease-in-out infinite; }
                @keyframes pulse-text { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
                `}
            </style>

            <div className="relative flex flex-col items-center justify-center w-full">
                <AnimatePresence>
                    {phase >= -2 && (
                        <motion.div
                            key="logo-splash"
                            initial={{ opacity: 0, scale: 0.8, x: 0, y: 0 }}
                            animate={{
                                opacity: 1,
                                scale: phase === -2 ? 1 : 0.5,
                                x: phase === -2 ? 0 : '-42vw',
                                y: phase === -2 ? 0 : '-42vh',
                            }}
                            // Removed exit prop so logo persists
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="flex items-center justify-center fixed z-[2003]"
                        >
                            <img
                                src="/logo_large.png"
                                alt="MIPL Logo"
                                style={{
                                    width: '700px',
                                    height: 'auto',
                                    filter: 'drop-shadow(0 0 50px rgba(0, 194, 255, 0.6))'
                                }}
                            />
                        </motion.div>
                    )}

                </AnimatePresence>

                <AnimatePresence>
                    {phase >= 0 && (
                        <motion.div
                            key="intro-container"
                            initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)", top: '50%', left: '50%', x: '-50%', y: '-50%', position: 'fixed' }}
                            animate={{
                                opacity: 1,
                                scale: phase >= 3 ? 0.35 : 1,
                                filter: "blur(0px)",
                                top: phase >= 3 ? '2rem' : '50%',
                                left: phase >= 3 ? '7rem' : '50%',
                                x: phase >= 3 ? 0 : '-50%',
                                y: phase >= 3 ? 0 : '-50%',
                            }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className={`flex ${phase >= 3 ? 'flex-row items-baseline space-x-2' : 'flex-col items-center justify-center'} z-[2002] fixed`}
                            onClick={() => {
                                if (phase >= 3) {
                                    window.location.reload();
                                }
                            }}
                            style={{
                                cursor: phase >= 3 ? 'pointer' : 'default',
                                pointerEvents: 'auto'
                            }}
                        >
                            <div className={`flex ${phase >= 3 ? 'flex-row items-baseline space-x-2' : 'flex-col items-center text-center'}`}>
                                <motion.h1
                                    className={`${phase >= 3 ? 'text-3xl' : 'text-4xl md:text-6xl'} font-bold text-white tracking-tight leading-tight`}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                                >
                                    MicroCircuits
                                </motion.h1>
                                <motion.h1
                                    className={`${phase >= 3 ? 'text-3xl' : 'text-2xl md:text-5xl'} font-bold text-[#b0bebe] tracking-tight leading-tight`}
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
                                >
                                    Innovations
                                </motion.h1>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {phase >= 3 && phase < 7 && (
                        <motion.div
                            key="intro-design-great"
                            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                            transition={{ duration: 0.8 }}
                            className="relative flex flex-col items-center justify-center w-full z-[2002]"
                        >
                            <div className="relative flex flex-col items-center justify-center">
                                <motion.div
                                    animate={{ y: 0 }}
                                    className="flex items-center justify-center font-sans z-20"
                                >
                                    <AnimatePresence>
                                        <motion.span
                                            key="design-text"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{
                                                opacity: phase >= 3 && phase < 6 ? 1 : 0,
                                                scale: phase >= 3 && phase < 6 ? 1 : 0.5,
                                                width: phase >= 6 ? 0 : 'auto',
                                                marginRight: phase >= 6 ? 0 : '0.75rem'
                                            }}
                                            transition={{ duration: 0.6 }}
                                            className="text-4xl md:text-5xl font-medium text-white overflow-hidden pb-1"
                                        >
                                            Design.
                                        </motion.span>
                                        <motion.span
                                            key="great-text"
                                            layout
                                            initial={{ color: "#ffffff", opacity: 0 }}
                                            animate={{ color: phase >= 5 ? "#00c2ff" : "#ffffff", opacity: phase >= 4 ? 1 : 0 }}
                                            transition={{ color: { duration: 1.2 }, opacity: { duration: 0.6 }, layout: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }}
                                            className="text-4xl md:text-5xl font-medium inline-block"
                                        >
                                            Great.
                                        </motion.span>
                                        {phase >= 6 && (
                                            <motion.span
                                                key="engineering-text"
                                                layout
                                                initial={{ opacity: 0, scale: 0.4, filter: "blur(8px)", width: 0 }}
                                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)", width: 'auto' }}
                                                transition={{ opacity: { duration: 0.6 }, scale: { duration: 0.6 }, width: { duration: 0.6 }, layout: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
                                                className="text-4xl md:text-5xl font-medium text-white ml-3 md:ml-4 whitespace-nowrap inline-block"
                                            >
                                                Engineering
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                <AnimatePresence>
                                    {phase >= 5 && phase < 7 && (
                                        <motion.div
                                            key="slogan-phase"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.8, delay: 0.3 }}
                                            className="absolute top-full mt-24 text-center w-[80vw]"
                                        >
                                            <p className="text-lg md:text-xl font-light text-gray-300 tracking-wider whitespace-nowrap">
                                                We don't just Design Chips. We Engineer <span className={`inline-block font-medium text-fill yellow-fill ${yellowFill ? 'active' : ''}`}>Breakthroughs</span>
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>


                <AnimatePresence>
                    {phase >= 7 && phase < 11 && (
                        <motion.div
                            key="intro-develop-deliver"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, filter: "blur(10px)" }}
                            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-[2002]"
                        >
                            <motion.div
                                animate={{ y: phase >= 10 ? -40 : 0 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className="flex space-x-8 md:space-x-16"
                            >
                                <motion.span
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="text-3xl md:text-6xl font-bold tracking-tighter text-white"
                                >
                                    Design.
                                </motion.span>
                                {phase >= 8 && (
                                    <motion.span
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6 }}
                                        className="text-3xl md:text-6xl font-bold tracking-tighter text-white"
                                    >
                                        Develop.
                                    </motion.span>
                                )}
                                {phase >= 9 && (
                                    <motion.span
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6 }}
                                        className="text-3xl md:text-6xl font-bold tracking-tighter text-[#00c2ff]"
                                    >
                                        Deliver.
                                    </motion.span>
                                )}
                            </motion.div>

                            <AnimatePresence>
                                {phase >= 10 && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        className="text-center absolute mt-24"
                                        style={{ top: '55%' }}
                                    >
                                        <p className="text-lg md:text-2xl font-light tracking-wide text-white opacity-90">
                                            Your <span className={`inline-block font-bold text-fill blue-fill ${blueFill ? 'active' : ''}`}>Next Chip</span> Starts Here
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default IntroLoader;
