import React from 'react';
import { motion } from 'framer-motion';

const InfiniteLoader = ({ size = 120, color = "#00c2ff" }) => {
    return (
        <div className="relative flex flex-col items-center justify-center">
            <motion.div
                animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="relative"
            >
                <svg
                    width={size}
                    height={size / 2}
                    viewBox="0 0 100 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="filter drop-shadow-[0_0_15px_rgba(0,194,255,0.3)]"
                >
                    <defs>
                        <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="1.5" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                        <filter id="outer-glow-premium" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="3.5" result="blur" />
                            <feFlood floodColor={color} floodOpacity="0.5" result="color" />
                            <feComposite in="color" in2="blur" operator="in" result="glow" />
                            <feMerge>
                                <feMergeNode in="glow" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <linearGradient id="loader-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#0076fe" />
                            <stop offset="50%" stopColor="#00c2ff" />
                            <stop offset="100%" stopColor="#0076fe" />
                        </linearGradient>
                    </defs>

                    {/* Background ghost path */}
                    <path
                        d="M 25 25 C 25 5, 45 5, 50 25 C 55 45, 75 45, 75 25 C 75 5, 55 5, 50 25 C 45 45, 25 45, 25 25 Z"
                        stroke="rgba(0, 194, 255, 0.08)"
                        strokeWidth="4"
                        strokeLinecap="round"
                    />

                    {/* Primary animated path */}
                    <motion.path
                        d="M 25 25 C 25 5, 45 5, 50 25 C 55 45, 75 45, 75 25 C 75 5, 55 5, 50 25 C 45 45, 25 45, 25 25 Z"
                        stroke="url(#loader-grad)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        filter="url(#outer-glow-premium)"
                        initial={{ pathLength: 0.2, pathOffset: 0 }}
                        animate={{
                            pathLength: [0.2, 0.5, 0.2],
                            pathOffset: [0, 1]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* High-intensity "spark" leading the line */}
                    <motion.path
                        d="M 25 25 C 25 5, 45 5, 50 25 C 55 45, 75 45, 75 25 C 75 5, 55 5, 50 25 C 45 45, 25 45, 25 25 Z"
                        stroke="#fff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        filter="url(#neon-glow)"
                        initial={{ pathLength: 0.05, pathOffset: 0 }}
                        animate={{
                            pathOffset: [0, 1]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </svg>
            </motion.div>
        </div>
    );
};

export default InfiniteLoader;
