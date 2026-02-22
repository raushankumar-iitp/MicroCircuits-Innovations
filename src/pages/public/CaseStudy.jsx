import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';


import { useAdmin } from '../../context/AdminContext';

const CaseStudy = () => {
    const { caseStudies: contextStudies, loading: adminLoading } = useAdmin();
    const [sortBy, setSortBy] = useState('Newest');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [direction, setDirection] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const studiesPerPage = 8;
    const [showIntro, setShowIntro] = useState(true);
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Intro Timer
        const timer = setTimeout(() => {
            setShowIntro(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const scrollToSection = (direction) => {
        const sections = ['hero-section', 'studies-section'];
        const currentPos = window.scrollY;

        const sectionOffsets = sections.map(id => {
            const el = document.getElementById(id);
            return el ? el.offsetTop : 0;
        });

        if (direction === 'down') {
            const next = sectionOffsets.find(offset => offset > currentPos + 50);
            if (next !== undefined) window.scrollTo({ top: next, behavior: 'smooth' });
        } else {
            const prev = [...sectionOffsets].reverse().find(offset => offset < currentPos - 50);
            if (prev !== undefined) window.scrollTo({ top: prev, behavior: 'smooth' });
        }
    };

    // Use all studies without pre-sorting since we'll sort during pagination
    // Use studies from AdminContext
    const allStudies = (contextStudies || []).map(s => ({
        ...s,
        id: s._id || s.id,
        date: s.date || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    }));

    // Sort studies based on current sort order
    const sortedStudies = allStudies.sort((a, b) => {
        // Helper function to parse date string
        const parseDate = (dateStr) => {
            try {
                // Remove ordinal suffixes (st, nd, rd, th) and convert to date
                const cleanDate = dateStr.replace(/(\d+)(st|nd|rd|th)/, '$1');
                return new Date(cleanDate);
            } catch (e) {
                console.warn('Date parsing error:', e);
                // If parsing fails, return a default date
                return new Date(0); // Epoch time for invalid dates
            }
        };

        if (sortBy === 'Newest') {
            return parseDate(b.date) - parseDate(a.date);
        } else {
            return parseDate(a.date) - parseDate(b.date);
        }
    });

    // Pagination logic
    const totalPages = Math.ceil(sortedStudies.length / studiesPerPage);
    const indexOfFirstStudy = (currentPage - 1) * studiesPerPage;
    const indexOfLastStudy = indexOfFirstStudy + studiesPerPage;
    const studies = sortedStudies.slice(indexOfFirstStudy, indexOfLastStudy);

    const paginate = (newDirection) => {
        setDirection(newDirection);
        setCurrentPage(prev => {
            if (newDirection === 1) return Math.min(totalPages, prev + 1);
            return Math.max(1, prev - 1);
        });
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
            scale: 0.98,
            filter: 'blur(10px)'
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)'
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0,
            scale: 0.98,
            filter: 'blur(10px)'
        })
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
                padding: 'clamp(2rem, 8vh, 4rem) clamp(1rem, 5vw, 2rem)',
                minHeight: '100vh',
                background: '#000',
                color: '#fff',
                fontFamily: '"Outfit", sans-serif',
                width: '100%',
                maxWidth: '100vw',
                boxSizing: 'border-box'
            }}
        >
            <div className="container mobile-responsive-padding" style={{ maxWidth: '1400px', margin: '0 auto' }}>

                {/* ... (keep Intro AnimatePresence) */}
                <AnimatePresence mode="popLayout">
                    {showIntro && (
                        <motion.div
                            key="intro-bg"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            style={{
                                position: 'fixed',
                                inset: 0,
                                zIndex: 90,
                                background: 'black'
                            }}
                        />
                    )}
                </AnimatePresence>

                {showIntro ? (
                    // ... (Keep Intro Content)
                    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', padding: '2rem' }}>
                        <motion.div layoutId="hero-text" style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: '0.5rem', color: '#fff' }}>
                                From RTL to Tape-Out:
                            </p>
                            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.1, margin: 0 }}>
                                <span style={{
                                    background: 'linear-gradient(90deg, #00c2ff 0%, #007bff 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    marginRight: '0.8rem'
                                }}>Real</span>
                                stories from the ASIC Frontlines
                            </h1>
                        </motion.div>
                    </div>
                ) : (
                    // FINAL CONTENT STATE
                    <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '6rem 1.5rem 2rem' : '10rem 2rem 4rem' }}>
                        {/* ... (Keep Header) */}
                        <header id="hero-section" style={{ textAlign: 'center', marginBottom: '3rem', position: 'relative' }}>
                            <motion.div
                                layoutId="hero-text"
                                transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
                                style={{ display: 'inline-block', textAlign: 'center' }}
                            >
                                <p style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: '0.5rem', color: '#fff' }}>
                                    From RTL to Tape-Out:
                                </p>
                                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.1, margin: 0 }}>
                                    <span style={{
                                        background: 'linear-gradient(90deg, #00c2ff 0%, #007bff 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        marginRight: '0.8rem'
                                    }}>Real</span>
                                    stories from the ASIC Frontlines
                                </h1>
                            </motion.div>

                            {/* Sort Section */}
                            <div style={{ position: 'relative', width: '100%', marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
                            </div>
                        </header>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            {/* ... (Keep Sort Row) */}
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', position: 'relative', width: '100%' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888' }}>
                                    <span style={{ fontSize: '1rem', fontWeight: 500 }}>Sort By:</span>
                                    <div style={{ position: 'relative' }}>
                                        <button
                                            onClick={() => setIsSortOpen(!isSortOpen)}
                                            style={{
                                                background: 'transparent',
                                                border: '1px solid #333',
                                                color: '#fff',
                                                padding: '6px 12px',
                                                borderRadius: '20px',
                                                fontSize: '0.9rem',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.background = 'rgba(255,255,255,0.1)';
                                                e.target.style.borderColor = '#00c2ff';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.background = 'transparent';
                                                e.target.style.borderColor = '#333';
                                            }}
                                        >
                                            <span>{sortBy === 'Newest' ? 'Newest' : 'Oldest'}</span>
                                            <ChevronDown
                                                size={16}
                                                style={{
                                                    transform: isSortOpen ? 'rotate(180deg)' : 'none',
                                                    transition: 'transform 0.3s ease'
                                                }}
                                            />
                                        </button>

                                        {isSortOpen && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '100%',
                                                left: 0,
                                                backgroundColor: '#1a1a1a',
                                                border: '1px solid #333',
                                                borderRadius: '20px',
                                                padding: '0.5rem 0',
                                                minWidth: '100%',
                                                zIndex: 10,
                                                boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                                            }}>
                                                <div
                                                    onClick={() => {
                                                        setSortBy('Newest');
                                                        setIsSortOpen(false);
                                                        if (currentPage !== 1) paginate(1 - currentPage); // Reset 
                                                        else setCurrentPage(1);
                                                    }}
                                                    style={{
                                                        padding: '0.5rem 1rem',
                                                        cursor: 'pointer',
                                                        color: sortBy === 'Newest' ? '#00c2ff' : '#fff',
                                                        backgroundColor: sortBy === 'Newest' ? 'rgba(0,194,255,0.1)' : 'transparent',
                                                        transition: 'all 0.2s ease',
                                                        textAlign: 'left',
                                                        borderRadius: '20px',
                                                        margin: '0 0.2rem'
                                                    }}
                                                    onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                                                    onMouseLeave={(e) => {
                                                        if (sortBy !== 'Newest') {
                                                            e.target.style.backgroundColor = 'transparent';
                                                        }
                                                    }}
                                                >
                                                    Newest
                                                </div>
                                                <div
                                                    onClick={() => {
                                                        setSortBy('Oldest');
                                                        setIsSortOpen(false);
                                                        if (currentPage !== 1) paginate(1 - currentPage); // Reset
                                                        else setCurrentPage(1);
                                                    }}
                                                    style={{
                                                        padding: '0.5rem 1rem',
                                                        cursor: 'pointer',
                                                        color: sortBy === 'Oldest' ? '#00c2ff' : '#fff',
                                                        backgroundColor: sortBy === 'Oldest' ? 'rgba(0,194,255,0.1)' : 'transparent',
                                                        transition: 'all 0.2s ease',
                                                        textAlign: 'left',
                                                        borderRadius: '20px',
                                                        margin: '0 0.2rem'
                                                    }}
                                                    onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                                                    onMouseLeave={(e) => {
                                                        if (sortBy !== 'Oldest') {
                                                            e.target.style.backgroundColor = 'transparent';
                                                        }
                                                    }}
                                                >
                                                    Oldest
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Grid with Animation */}
                            <div style={{ position: 'relative', minHeight: '400px', overflow: 'hidden' }}>
                                <AnimatePresence initial={false} custom={direction} mode="wait">
                                    <motion.div
                                        key={currentPage}
                                        custom={direction}
                                        variants={variants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{
                                            x: { type: "spring", stiffness: 200, damping: 25, mass: 0.8 },
                                            opacity: { duration: 0.4, ease: "circOut" },
                                            scale: { duration: 0.4, ease: "circOut" },
                                            filter: { duration: 0.4, ease: "circOut" }
                                        }}
                                        id="studies-section"
                                        style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            justifyContent: 'center',
                                            gap: '1.5rem',
                                            marginBottom: '2rem',
                                            width: '100%'
                                        }}
                                    >
                                        {studies.map((study, index) => (
                                            <motion.div
                                                key={study.id || study.title}
                                                initial={{ opacity: 0, y: 50 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                whileHover={{ borderColor: '#ffffff', borderWidth: '2px', boxShadow: '0 15px 40px rgba(255,255,255,0.1)' }}
                                                transition={{ duration: 0.6, ease: "easeOut" }}
                                                viewport={{ once: false, amount: 0.2 }}
                                                style={{
                                                    background: 'linear-gradient(180deg, rgba(20,20,20,0.8) 0%, rgba(5,5,5,0.95) 100%)',
                                                    borderRadius: '24px',
                                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                                    padding: 'clamp(1.5rem, 5vw, 3rem) clamp(1rem, 3vw, 2rem) clamp(4rem, 10vw, 5rem)',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    textAlign: 'center',
                                                    backdropFilter: 'blur(10px)',
                                                    position: 'relative',
                                                    minHeight: 'clamp(350px, 50vh, 450px)',
                                                    overflow: 'hidden',
                                                    boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                                                    width: 'clamp(280px, 40vw, 350px)',
                                                    maxWidth: '100%'
                                                }}
                                            >
                                                {/* Glass highlight effect at top */}
                                                <div style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: '15%',
                                                    right: '15%',
                                                    height: '1px',
                                                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                                                }} />

                                                <p style={{
                                                    fontSize: '0.85rem',
                                                    color: '#ccc',
                                                    marginBottom: '1.5rem',
                                                    fontWeight: 500,
                                                    letterSpacing: '0.5px'
                                                }}>
                                                    {study.category}
                                                </p>

                                                <h3 style={{
                                                    fontSize: '1.8rem',
                                                    fontWeight: 700,
                                                    lineHeight: 1.25,
                                                    marginBottom: '1rem',
                                                    color: '#fff',
                                                    flex: 1,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    {study.title}
                                                </h3>

                                                <p style={{ fontSize: '0.8rem', color: '#888', margin: '0 0 2rem', fontWeight: 500 }}>
                                                    {study.date}
                                                </p>

                                                {/* Download Button */}
                                                <motion.a
                                                    href={study.pdfUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    download={`CaseStudy_${study.title.replace(/\s+/g, '_')}.pdf`}
                                                    whileHover={{ height: '55px' }}
                                                    style={{
                                                        height: '48px',
                                                        background: 'linear-gradient(90deg, #0076fe 0%, #0056b1 100%)',
                                                        position: 'absolute',
                                                        bottom: 0,
                                                        left: 0,
                                                        right: 0,
                                                        width: '100%',
                                                        borderRadius: '0 0 24px 24px',
                                                        border: 'none',
                                                        color: '#fff',
                                                        fontWeight: 600,
                                                        fontSize: '1rem',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        transition: 'height 0.3s ease',
                                                        textDecoration: 'none'
                                                    }}
                                                >
                                                    Download
                                                </motion.a>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Functional Pagination */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: isMobile ? '0.5rem' : '1.5rem',
                                marginTop: isMobile ? '2rem' : '3rem',
                                color: '#666',
                                fontSize: isMobile ? '0.9rem' : '1.2rem',
                                fontWeight: 500
                            }}>
                                <button
                                    onClick={() => paginate(-1)}
                                    disabled={currentPage === 1}
                                    style={{
                                        background: currentPage === 1 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        color: currentPage === 1 ? '#444' : '#fff',
                                        padding: '8px 16px',
                                        borderRadius: '8px',
                                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.3s ease',
                                        fontWeight: 500
                                    }}
                                    onMouseEnter={(e) => {
                                        if (currentPage > 1) {
                                            e.target.style.background = 'rgba(255,255,255,0.2)';
                                            e.target.style.borderColor = '#00c2ff';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (currentPage > 1) {
                                            e.target.style.background = 'rgba(255,255,255,0.1)';
                                            e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                                        }
                                    }}
                                >
                                    Previous
                                </button>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ color: '#00c2ff' }}>{indexOfFirstStudy + 1}-</span>
                                    <span>{Math.min(indexOfLastStudy, sortedStudies.length)}</span>
                                    <span style={{ margin: '0 10px', color: '#444' }}>of</span>
                                    <span>{sortedStudies.length}</span>
                                </div>

                                <button
                                    onClick={() => paginate(1)}
                                    disabled={currentPage === totalPages}
                                    style={{
                                        background: currentPage === totalPages ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        color: currentPage === totalPages ? '#444' : '#fff',
                                        padding: '8px 16px',
                                        borderRadius: '8px',
                                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.3s ease',
                                        fontWeight: 500
                                    }}
                                    onMouseEnter={(e) => {
                                        if (currentPage < totalPages) {
                                            e.target.style.background = 'rgba(255,255,255,0.2)';
                                            e.target.style.borderColor = '#00c2ff';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (currentPage < totalPages) {
                                            e.target.style.background = 'rgba(255,255,255,0.1)';
                                            e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                                        }
                                    }}
                                >
                                    Next
                                </button>
                            </div>
                        </motion.div>

                        {/* Down/Up arrows */}
                        <div style={{
                            position: 'fixed',
                            bottom: 'clamp(1rem, 5vw, 2rem)',
                            right: 'clamp(1rem, 5vw, 2rem)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.8rem',
                            zIndex: 100
                        }}>
                            <div
                                onClick={() => scrollToSection('up')}
                                style={{
                                    width: 'min(50px, 12vw)',
                                    height: 'min(50px, 12vw)',
                                    borderRadius: '50%',
                                    background: 'rgba(0, 194, 255, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    border: '1px solid rgba(0, 194, 255, 0.2)',
                                    backdropFilter: 'blur(10px)',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(0, 194, 255, 0.2)';
                                    e.currentTarget.style.borderColor = '#00c2ff';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(0, 194, 255, 0.1)';
                                    e.currentTarget.style.borderColor = 'rgba(0, 194, 255, 0.2)';
                                }}
                            >
                                <ChevronDown size={24} color="#00c2ff" style={{ transform: 'rotate(180deg)', width: '60%', height: '60%' }} />
                            </div>
                            <div
                                onClick={() => scrollToSection('down')}
                                style={{
                                    width: 'min(50px, 12vw)',
                                    height: 'min(50px, 12vw)',
                                    borderRadius: '50%',
                                    background: 'rgba(0, 194, 255, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    border: '1px solid rgba(0, 194, 255, 0.2)',
                                    backdropFilter: 'blur(10px)',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(0, 194, 255, 0.2)';
                                    e.currentTarget.style.borderColor = '#00c2ff';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(0, 194, 255, 0.1)';
                                    e.currentTarget.style.borderColor = 'rgba(0, 194, 255, 0.2)';
                                }}
                            >
                                <ChevronDown size={24} color="#00c2ff" style={{ width: '60%', height: '60%' }} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

const arrowCircleStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease'
};

export default CaseStudy;
