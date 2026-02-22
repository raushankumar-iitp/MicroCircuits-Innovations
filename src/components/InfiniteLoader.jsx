import React from 'react';
import { motion } from 'framer-motion';

const InfiniteLoader = ({ size = 120, color = "#00c2ff" }) => {
    return (
        <div className="relative flex flex-col items-center justify-center">
            <svg
                width={size}
                height={size / 2}
                viewBox="0 0 100 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="filter drop-shadow-[0_0_8px_rgba(0,194,255,0.8)]"
            >
                {/* Static background path for subtle ghost effect */}
                <path
                    d="M 25 25 C 25 5, 45 5, 50 25 C 55 45, 75 45, 75 25 C 75 5, 55 5, 50 25 C 45 45, 25 45, 25 25 Z"
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeWidth="3"
                    strokeLinecap="round"
                />

                {/* Animated glowing path */}
                <motion.path
                    d="M 25 25 C 25 5, 45 5, 50 25 C 55 45, 75 45, 75 25 C 75 5, 55 5, 50 25 C 45 45, 25 45, 25 25 Z"
                    stroke={color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, pathOffset: 0 }}
                    animate={{
                        pathLength: [0.2, 0.5, 0.2],
                        pathOffset: [0, 1]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Pulsing glow point at the head of the path */}
                <motion.circle
                    r="2"
                    fill={color}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: [0.4, 1, 0.4],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <animateMotion
                        dur="2s"
                        repeatCount="indefinite"
                        path="M 25 25 C 25 5, 45 5, 50 25 C 55 45, 75 45, 75 25 C 75 5, 55 5, 50 25 C 45 45, 25 45, 25 25 Z"
                    />
                </motion.circle>
            </svg>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4"
            >
                <span className="text-white/40 text-xs font-medium tracking-[0.3em] uppercase animate-pulse">
                    Initializing Secure Session
                </span>
            </motion.div>
        </div>
    );
};

export default InfiniteLoader;
