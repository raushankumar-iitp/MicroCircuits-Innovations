import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [phase, setPhase] = useState(-2);
    const [blueFill, setBlueFill] = useState(false);
    const [yellowFill, setYellowFill] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // ... (keeping existing timers from IntroLoader)
        const timerEnd = setTimeout(() => {
            setPhase(13); // Cleanup
            navigate('/expertise');
        }, 18800);
        const timerLogo = setTimeout(() => setPhase(-1), 1500); // Show logo for 1.5s

        // Phase 0-2: MicroCircuits Innovations (approx 2s)
        const timerText1 = setTimeout(() => setPhase(0), 1500);

        // Phase 3-8: Design. Great. Engineering.
        const timerText2 = setTimeout(() => setPhase(3), 4000); // Design shows
        const timer4 = setTimeout(() => setPhase(4), 5400); // Great shows
        const timer5 = setTimeout(() => setPhase(5), 7000); // Design hides
        const timer6 = setTimeout(() => setPhase(6), 8000); // Great moves (Design width -> 0)
        const timer7 = setTimeout(() => setPhase(7), 9200); // Engineering shows
        const timer8 = setTimeout(() => setPhase(8), 10800); // Slogan appears
        const timerYellow = setTimeout(() => setYellowFill(true), 11200);

        // Phase 9-12: Design. Develop. Deliver. -> Next Chip
        const timer9 = setTimeout(() => setPhase(9), 13800);
        const timer10 = setTimeout(() => setPhase(10), 14000); // Develop
        const timer11 = setTimeout(() => setPhase(11), 15200); // Deliver
        const timer12 = setTimeout(() => setPhase(12), 16400); // Your Next Chip
        const timerBlue = setTimeout(() => setBlueFill(true), 17400);


        return () => {
            clearTimeout(timerLogo);
            clearTimeout(timerText1);
            clearTimeout(timerText2);
            clearTimeout(timer4);
            clearTimeout(timer5);
            clearTimeout(timer6);
            clearTimeout(timer7);
            clearTimeout(timer8);
            clearTimeout(timerYellow);
            clearTimeout(timer9);
            clearTimeout(timer10);
            clearTimeout(timer11);
            clearTimeout(timer12);
            clearTimeout(timerBlue);
            clearTimeout(timerEnd);
        };
    }, [navigate]);

    return (
        <motion.div
            className={`fixed inset-0 z-[2000] flex items-center justify-center select-none overflow-hidden ${phase >= 13 ? 'pointer-events-none' : 'pointer-events-auto'}`}
        >
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: phase >= 13 ? 0 : 1 }}
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
                            initial={{ opacity: 0, scale: 0.8, x: '-50%', y: '-50%', left: '50%', top: '50%' }}
                            animate={{
                                opacity: 1,
                                scale: phase === -2 ? 1 : 0.1,
                                left: phase === -2 ? '50%' : '3rem',
                                top: phase === -2 ? '50%' : '20px',
                                x: phase === -2 ? '-50%' : '0',
                                y: phase === -2 ? '-50%' : '0',
                            }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="flex items-center justify-center fixed z-[4000]"
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
                                scale: phase >= 3 ? 0.49 : 1,
                                filter: "blur(0px)",
                                top: phase >= 3 ? '24px' : '50%',
                                left: phase >= 3 ? 'auto' : '50%',
                                right: phase >= 3 ? '3rem' : 'auto',
                                x: phase >= 3 ? 0 : '-50%',
                                y: phase >= 3 ? 0 : '-50%',
                            }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className={`flex ${phase >= 3 ? 'flex-row items-baseline space-x-2' : 'flex-col items-center justify-center'} z-[3999] fixed`}
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
                {/* ... (rest of the phases) */}


                <AnimatePresence>
                    {phase >= 3 && phase < 9 && (
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
                                    layout
                                    className="flex items-center justify-center font-sans z-20 relative px-4"
                                >
                                    <AnimatePresence>
                                        {phase >= 3 && phase < 6 && (
                                            <motion.span
                                                key="design-text"
                                                initial={{ clipPath: 'inset(0 50% 0 50%)', opacity: 0 }}
                                                animate={{
                                                    clipPath: phase >= 5 ? 'inset(0 50% 0 50%)' : 'inset(0 0% 0 0%)',
                                                    opacity: phase >= 5 ? 0 : 1
                                                }}
                                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                                className="text-4xl md:text-5xl font-medium text-white px-2 md:px-4 leading-tight inline-block whitespace-nowrap"
                                            >
                                                Design.
                                            </motion.span>
                                        )}

                                        {phase >= 4 && (
                                            <motion.span
                                                key="great-text"
                                                layout
                                                initial={{ clipPath: 'inset(0 50% 0 50%)', opacity: 0 }}
                                                animate={{
                                                    clipPath: 'inset(0 0% 0 0%)',
                                                    opacity: 1,
                                                    color: phase >= 7 ? "#00c2ff" : "#ffffff"
                                                }}
                                                transition={{
                                                    clipPath: { duration: 0.8, ease: "easeInOut" },
                                                    opacity: { duration: 0.4 },
                                                    layout: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                                                    color: { duration: 0.8 }
                                                }}
                                                className="text-4xl md:text-5xl font-medium px-2 md:px-4 leading-tight inline-block whitespace-nowrap"
                                            >
                                                Great.
                                            </motion.span>
                                        )}

                                        {phase >= 7 && (
                                            <motion.span
                                                key="engineering-text"
                                                initial={{ clipPath: 'inset(0 50% 0 50%)', opacity: 0 }}
                                                animate={{ clipPath: 'inset(0 0% 0 0%)', opacity: 1 }}
                                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                                className="text-4xl md:text-5xl font-medium text-white px-2 md:px-4 leading-tight inline-block whitespace-nowrap"
                                            >
                                                Engineering.
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                <AnimatePresence>
                                    {phase >= 8 && phase < 9 && (
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
                    {phase >= 9 && phase < 13 && (
                        <motion.div
                            key="intro-develop-deliver"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, filter: "blur(10px)" }}
                            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-[2002]"
                        >
                            <motion.div
                                animate={{ y: phase >= 12 ? -40 : 0 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className="flex space-x-4 md:space-x-8"
                            >
                                <motion.span
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="text-3xl md:text-6xl font-bold tracking-tighter text-white"
                                >
                                    Design.
                                </motion.span>
                                {phase >= 10 && (
                                    <motion.span
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6 }}
                                        className="text-3xl md:text-6xl font-bold tracking-tighter text-white"
                                    >
                                        Develop.
                                    </motion.span>
                                )}
                                {phase >= 11 && (
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
                                {phase >= 12 && (
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

export default Home;

