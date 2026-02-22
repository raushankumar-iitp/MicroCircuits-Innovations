import React from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';

const Branding = ({ onClick }) => {
    const { layoutSettings } = useAdmin();
    const { branding } = layoutSettings;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)", top: '50%', left: '50%', x: '-50%', y: '-50%', position: 'fixed' }}
            animate={{
                opacity: 1,
                scale: branding.scale,
                filter: "blur(0px)",
                top: branding.top,
                left: branding.left,
                x: 0,
                y: 0,
            }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col z-[2002] fixed"
            onClick={onClick}
            style={{
                cursor: onClick ? 'pointer' : 'default',
                pointerEvents: 'auto'
            }}
        >
            <div className="flex flex-col items-start">
                <h1 className="text-6xl font-bold text-white tracking-tighter leading-tight">
                    MicroCircuits
                </h1>
                <h1 className="text-4xl font-bold text-[#b0bebe] tracking-tight leading-tight ml-2">
                    Innovations
                </h1>
            </div>
        </motion.div>
    );
};

export default Branding;
