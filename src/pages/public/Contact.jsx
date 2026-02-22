import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SuccessModal from '../../components/common/SuccessModal';
import { useAdmin } from '../../context/AdminContext';

const Contact = () => {
    const { addContactMessage } = useAdmin();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        window.scrollTo(0, 0);
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        email: '',
        phone: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await addContactMessage(formData);
            setSubmitted(true);

            // Reset form
            setFormData({
                name: '',
                subject: '',
                email: '',
                phone: '',
                message: ''
            });
        } catch (error) {
            console.error('Submission error:', error);
            alert(error.message || 'Failed to submit message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            name: '',
            subject: '',
            email: '',
            phone: '',
            message: ''
        });
    };

    const [showLocation, setShowLocation] = useState(false);

    const handleViewLocation = () => {
        setShowLocation(true);
    };

    const handleHideLocation = () => {
        setShowLocation(false);
    };

    const handleDirection = () => {
        window.open('https://maps.app.goo.gl/7nwmhuLDdttLhFVAA?g_st=iw', '_blank');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="contact-page mobile-full-width"
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 'clamp(8rem, 15vh, 12rem) clamp(1rem, 5vw, 2rem) 2rem',
                background: '#000',
                fontFamily: '"Outfit", sans-serif',
                width: '100%',
                maxWidth: '100vw',
                boxSizing: 'border-box'
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ textAlign: 'center', marginBottom: '3rem' }}
            >
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, letterSpacing: '-1px', marginBottom: '1rem', color: '#fff' }}>
                    We'd <span style={{ color: '#00c2ff' }}>Love</span> to hear from you!
                </h1>
                <p style={{ color: '#888', fontSize: '1.1rem' }}>Reach out for collaborations, inquiries, or just to say hello.</p>
            </motion.div>

            <motion.form
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ borderColor: '#fff', boxShadow: '0 25px 50px rgba(255,255,255,0.1)' }}
                transition={{ delay: 0.2, duration: 0.6 }}
                onSubmit={handleSubmit}
                style={{
                    width: '100%',
                    maxWidth: 'min(700px, 95vw)',
                    background: 'linear-gradient(180deg, #1a1a1a 0%, #050505 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '2rem',
                    padding: 'clamp(1.5rem, 5vw, 2.5rem)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                    boxSizing: 'border-box',
                    transition: 'all 0.3s ease'
                }}
            >
                <SuccessModal
                    isOpen={submitted}
                    onClose={() => setSubmitted(false)}
                    title={"Your message\nhas been\nsent!"}
                    message="We'll get back to you soon."
                />

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ color: '#ccc', fontSize: '0.9rem', fontWeight: 500, marginLeft: '10px' }}>Your Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ color: '#ccc', fontSize: '0.9rem', fontWeight: 500, marginLeft: '10px' }}>Subject</label>
                        <input
                            type="text"
                            name="subject"
                            placeholder="Project Inquiry"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ color: '#ccc', fontSize: '0.9rem', fontWeight: 500, marginLeft: '10px' }}>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ color: '#ccc', fontSize: '0.9rem', fontWeight: 500, marginLeft: '10px' }}>Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ color: '#ccc', fontSize: '0.9rem', fontWeight: 500, marginLeft: '10px' }}>Message</label>
                    <textarea
                        name="message"
                        placeholder="Tell us about your project..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        style={{ ...inputStyle, resize: 'vertical', minHeight: '8rem' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>

                    {/* Inline Location Card */}
                    <AnimatePresence>
                        {showLocation && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, scale: 0.95 }}
                                animate={{ opacity: 1, height: 'auto', scale: 1 }}
                                exit={{ opacity: 0, height: 0, scale: 0.95 }}
                                style={{
                                    background: '#fff',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                                    marginBottom: '0.5rem'
                                }}
                            >
                                <button
                                    type="button"
                                    onClick={handleHideLocation}
                                    style={{
                                        width: '100%',
                                        padding: '0.8rem',
                                        background: '#e5e7eb',
                                        border: 'none',
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        color: '#374151',
                                        cursor: 'pointer',
                                        borderBottom: '1px solid #d1d5db',
                                        display: 'block'
                                    }}
                                >
                                    Hide Location
                                </button>

                                <div style={{
                                    padding: '1.5rem 1rem',
                                    background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                                    textAlign: 'center',
                                    color: '#fff'
                                }}>
                                    <p style={{ fontSize: '1rem', lineHeight: 1.5, margin: 0, fontWeight: 500 }}>
                                        #522, Shivam Trade Center,<br />
                                        Nr One World West, Opp Sarswati Hospital,<br />
                                        S P Ring Road, Ambli, Ahmedabad - 380058
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleDirection}
                                    style={{
                                        width: '100%',
                                        padding: '0.8rem',
                                        background: '#0066ff',
                                        border: 'none',
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        color: '#fff',
                                        cursor: 'pointer',
                                        transition: 'background 0.2s',
                                        display: 'block'
                                    }}
                                    onMouseEnter={(e) => e.target.style.background = '#0052cc'}
                                    onMouseLeave={(e) => e.target.style.background = '#0066ff'}
                                >
                                    Directions
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {!showLocation && (
                        <button
                            type="button"
                            onClick={handleViewLocation}
                            style={{ ...inputStyle, padding: '0.8rem', border: '1px solid rgba(255, 255, 255, 0.15)', background: 'rgba(255, 255, 255, 0.05)', color: '#aaa', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.3s ease', borderRadius: '8px' }}
                        >
                            View Location
                        </button>
                    )}

                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                        <button
                            type="button"
                            onClick={handleCancel}
                            style={{ ...inputStyle, flex: 1, padding: '0.8rem', border: '1px solid rgba(255, 255, 255, 0.15)', background: 'rgba(255, 255, 255, 0.05)', color: '#aaa', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.3s ease', borderRadius: '8px' }}
                        >
                            Reset
                        </button>
                        <button
                            type="submit"
                            style={{
                                flex: 1,
                                padding: '0.8rem 1.5rem',
                                background: 'linear-gradient(90deg, #0076fe 0%, #0056b1 100%)',
                                border: 'none',
                                borderRadius: '8px',
                                color: '#fff',
                                fontSize: '1rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 15px rgba(00, 118, 254, 0.3)'
                            }}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </motion.form>
        </motion.div>
    );
};

const inputStyle = {
    padding: '1rem 1.2rem',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease',
    width: '100%',
    fontFamily: 'inherit'
};

const primaryButtonStyle = {
    padding: '1rem 2rem',
    background: 'linear-gradient(90deg, #0076fe 0%, #0056b1 100%)',
    border: 'none',
    borderRadius: '30px',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(00, 118, 254, 0.3)'
};

const secondaryButtonStyle = {
    padding: '1rem 1.5rem',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '30px',
    color: '#aaa',
    fontSize: '0.9rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.3s ease'
};

export default Contact;