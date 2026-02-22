import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SuccessModal = ({ isOpen, onClose, title = "Success!", message = "Your message has been sent!" }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 3000,
                    background: 'rgba(0, 0, 0, 0.85)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    backdropFilter: 'blur(8px)'
                }}
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 20 }}
                    style={{
                        background: '#1a1a1a',
                        borderRadius: '24px',
                        padding: '3rem 4rem',
                        textAlign: 'center',
                        maxWidth: '420px',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1.5rem',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                    }}
                >
                    <h2 style={{
                        fontSize: '2rem',
                        fontWeight: 600,
                        color: '#fff',
                        margin: 0,
                        lineHeight: 1.2
                    }}>
                        {title.split('\n').map((line, i) => (
                            <React.Fragment key={i}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))}
                    </h2>
                    <p style={{ color: '#888', margin: 0 }}>{message}</p>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'linear-gradient(90deg, #007bff, #004a99)',
                            color: '#fff',
                            border: 'none',
                            padding: '0.8rem 3rem',
                            borderRadius: '50px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            width: '100%',
                            marginTop: '0.5rem',
                            transition: 'transform 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        Done
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SuccessModal;
