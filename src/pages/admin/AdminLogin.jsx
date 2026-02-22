import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { loginAdmin } = useAdmin();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        const result = await loginAdmin(username, password);

        if (result.success) {
            navigate('/admin/dashboard');
        } else {
            setError('Invalid credentials. Please try again.');
        }
        setIsSubmitting(false);
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#000',
            position: 'relative',
            overflow: 'hidden',
            padding: '1rem',
            fontFamily: '"Outfit", sans-serif'
        }}>
            {/* Dynamic Background Elements */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{
                    position: 'absolute',
                    top: '-20%',
                    right: '-10%',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    zIndex: 0
                }}
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    rotate: [0, -90, 0],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                style={{
                    position: 'absolute',
                    bottom: '-20%',
                    left: '-10%',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    zIndex: 0
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                    width: '100%',
                    maxWidth: 'min(420px, 95vw)',
                    background: 'rgba(10, 10, 10, 0.7)',
                    backdropFilter: 'blur(30px)',
                    padding: 'clamp(2rem, 8vw, 3.5rem) clamp(1.5rem, 5vw, 2.5rem)',
                    borderRadius: '2rem',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.9)',
                    position: 'relative',
                    zIndex: 1
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <motion.img
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        src="/admin_logo_new.png"
                        alt="MIPL Logo"
                        style={{
                            width: '160px',
                            height: 'auto',
                            display: 'block',
                            margin: '0 auto 2rem',
                            filter: 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.3))'
                        }}
                    />
                    <h2 style={{
                        color: '#fff',
                        fontSize: '2.2rem',
                        fontWeight: 800,
                        marginBottom: '0.75rem',
                        letterSpacing: '-1px'
                    }}>
                        MIPL <span style={{ color: '#a855f7' }}>ADMIN</span>
                    </h2>
                    <p style={{ color: '#666', fontSize: '1rem', fontWeight: 400 }}>
                        Authenticated Access Required
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <label style={{ color: '#aaa', fontSize: '0.9rem', fontWeight: 500, paddingLeft: '4px' }}>Identity</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={inputStyle}
                            placeholder="username or email"
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <label style={{ color: '#aaa', fontSize: '0.9rem', fontWeight: 500, paddingLeft: '4px' }}>Secret Key</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={inputStyle}
                            placeholder="password"
                        />
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{
                                background: 'rgba(239, 68, 68, 0.1)',
                                padding: '10px',
                                borderRadius: '12px',
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                color: '#ff4b4b',
                                fontSize: '0.85rem',
                                textAlign: 'center'
                            }}
                        >
                            {error}
                        </motion.div>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                            marginTop: '1rem',
                            padding: '1.2rem',
                            background: isSubmitting ? '#222' : 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
                            border: 'none',
                            borderRadius: '16px',
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 15px 30px -5px rgba(168, 85, 247, 0.4)'
                        }}
                    >
                        {isSubmitting ? 'Verifying...' : 'Establish Session'}
                    </motion.button>
                </form>

                <div style={{
                    marginTop: '3rem',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                }}>
                    <p style={{
                        color: '#333',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '3px',
                        textTransform: 'uppercase'
                    }}>
                        MIPL Matrix Protocol
                    </p>
                    <div style={{
                        width: '40px',
                        height: '2px',
                        background: 'rgba(168, 85, 247, 0.3)',
                        margin: '0 auto',
                        borderRadius: '2px'
                    }} />
                </div>
            </motion.div>
        </div>
    );
};

const inputStyle = {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    padding: '1.2rem 1.5rem',
    color: '#fff',
    fontSize: '1.1rem',
    outline: 'none',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
};

export default AdminLogin;
