import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUI } from '../../context/UIContext';
import { AlertCircle, HelpCircle, X } from 'lucide-react';

const GlobalModal = () => {
    const { modal, closeModal } = useUI();

    if (!modal.isOpen) return null;

    return (
        <AnimatePresence>
            {modal.isOpen && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 20000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem',
                    pointerEvents: 'none'
                }}>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => modal.type === 'alert' && closeModal()}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.7)',
                            backdropFilter: 'blur(8px)',
                            pointerEvents: 'auto'
                        }}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        style={{
                            width: '100%',
                            maxWidth: '450px',
                            background: 'rgba(15, 15, 15, 0.85)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '24px',
                            padding: '2.5rem',
                            position: 'relative',
                            zIndex: 1,
                            pointerEvents: 'auto',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '18px',
                                background: modal.type === 'confirm' ? 'rgba(0, 194, 255, 0.1)' : 'rgba(255, 215, 0, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.5rem',
                                color: modal.type === 'confirm' ? '#00c2ff' : '#FFD700',
                                border: `1px solid ${modal.type === 'confirm' ? 'rgba(0, 194, 255, 0.2)' : 'rgba(255, 215, 0, 0.2)'}`
                            }}>
                                {modal.type === 'confirm' ? <HelpCircle size={32} /> : <AlertCircle size={32} />}
                            </div>

                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: 700,
                                color: '#fff',
                                marginBottom: '0.75rem',
                                letterSpacing: '-0.5px'
                            }}>
                                {modal.title}
                            </h3>

                            <p style={{
                                fontSize: '1rem',
                                color: '#aaa',
                                lineHeight: 1.6,
                                marginBottom: '2.5rem'
                            }}>
                                {modal.message}
                            </p>

                            <div style={{
                                display: 'flex',
                                gap: '1rem',
                                width: '100%'
                            }}>
                                {modal.type === 'confirm' && (
                                    <button
                                        onClick={() => closeModal(false)}
                                        style={{
                                            flex: 1,
                                            padding: '1rem',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            borderRadius: '12px',
                                            color: '#fff',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                                    >
                                        Cancel
                                    </button>
                                )}
                                <button
                                    onClick={() => closeModal(true)}
                                    style={{
                                        flex: 2,
                                        padding: '1rem',
                                        background: modal.type === 'confirm' ? 'linear-gradient(90deg, #00c2ff 0%, #007bff 100%)' : 'rgba(255, 255, 255, 0.9)',
                                        border: 'none',
                                        borderRadius: '12px',
                                        color: modal.type === 'confirm' ? '#fff' : '#000',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        boxShadow: modal.type === 'confirm' ? '0 10px 20px rgba(0, 194, 255, 0.2)' : 'none'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    {modal.type === 'confirm' ? 'Confirm' : 'Got it'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default GlobalModal;
