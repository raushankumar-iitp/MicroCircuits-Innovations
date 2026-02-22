import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ChevronDown, FileText } from 'lucide-react';
import ApplyModal from '../../components/modals/ApplyModal';
import { useAdmin } from '../../context/AdminContext';
import { useUI } from '../../context/UIContext';

const Careers = () => {
    const { vacancies: contextVacancies, loading: adminLoading } = useAdmin();
    const { showAlert } = useUI();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState('');
    const [showIntro, setShowIntro] = useState(true);
    const [sortOrder, setSortOrder] = useState('newest'); // 'newest' or 'oldest'
    const [currentPage, setCurrentPage] = useState(1);
    const [direction, setDirection] = useState(0); // 1 for next, -1 for prev
    const jobsPerPage = 8; // Number of jobs to display per page (4x2 grid)

    useEffect(() => {
        // Intro Timer
        const timer = setTimeout(() => {
            setShowIntro(false);
        }, 2000); // 2 seconds centered, then move

        return () => clearTimeout(timer);
    }, []);

    const scrollToSection = (direction) => {
        const sections = ['hero-section', 'role-section', 'jobs-section'];
        const currentPos = window.scrollY;

        // Find section positions
        const sectionOffsets = sections.map(id => {
            const el = document.getElementById(id);
            return el ? el.offsetTop : 0;
        });

        if (direction === 'down') {
            const next = sectionOffsets.find(offset => offset > currentPos + 50);
            if (next !== undefined) {
                window.scrollTo({ top: next, behavior: 'smooth' });
            }
        } else {
            const prev = [...sectionOffsets].reverse().find(offset => offset < currentPos - 50);
            if (prev !== undefined) {
                window.scrollTo({ top: prev, behavior: 'smooth' });
            }
        }
    };

    const handleApply = (title) => {
        setSelectedJob(title);
        setIsModalOpen(true);
    };

    // Use vacancies from AdminContext
    const allJobs = (contextVacancies || [])
        .map(v => ({
            id: v._id || v.id,
            title: v.title,
            exp: v.exp,
            loc: v.location,
            pdfUrl: v.pdfUrl,
            date: v.date || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
            featured: v._id === '1' || v.id === 1
        }));

    // Sort jobs based on current sort order
    const sortedJobs = allJobs.sort((a, b) => {
        // Prefer createdAt for sorting, otherwise fallback to date parsing
        if (a.createdAt && b.createdAt) {
            const timeA = new Date(a.createdAt).getTime();
            const timeB = new Date(b.createdAt).getTime();
            return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
        }

        // Helper function to parse date string
        const parseDate = (dateStr) => {
            try {
                // Remove ordinal suffixes (st, nd, rd, th) and convert to date
                const cleanDate = dateStr.replace(/(\d+)(st|nd|rd|th)/, '$1');
                return new Date(cleanDate);
            } catch (e) {
                console.warn('Date parsing error:', e);
                return new Date(0);
            }
        };

        const dateA = parseDate(a.date);
        const dateB = parseDate(b.date);

        if (sortOrder === 'newest') {
            return dateB - dateA;
        } else {
            return dateA - dateB;
        }
    });

    // Pagination logic
    const totalPages = Math.ceil(sortedJobs.length / jobsPerPage);
    const indexOfFirstJob = (currentPage - 1) * jobsPerPage;
    const indexOfLastJob = indexOfFirstJob + jobsPerPage;
    const jobs = sortedJobs.slice(indexOfFirstJob, indexOfLastJob);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="careers-page mobile-full-width"
            style={{ background: '#000', color: '#fff', overflowX: 'hidden', width: '100%', maxWidth: '100vw', boxSizing: 'border-box' }}
        >
            <ApplyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                jobTitle={selectedJob}
            />

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
                // INTRO STATE: Text Centered
                <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                    <motion.h1
                        layoutId="hero-title"
                        style={{
                            fontSize: isMobile ? '2.8rem' : 'clamp(2rem, 5vw, 4rem)',
                            fontWeight: 600,
                            background: 'linear-gradient(90deg, #4f9cf9 0%, #a855f7 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textAlign: 'center',
                            padding: '0 2rem',
                            wordBreak: 'break-word', // Ensure long words break
                            maxWidth: '100%'
                        }}
                    >
                        Join a team and inspire the work.
                    </motion.h1>
                </div>
            ) : (
                // FINAL STATE: Page Content
                <div key="careers-content">
                    {/* Slide 1: Join a team */}
                    <section id="hero-section" style={{
                        minHeight: isMobile ? '40vh' : '70vh', // Changed from height to minHeight
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        padding: isMobile ? '6rem 1rem 2rem' : '10rem 1rem 4rem', // Increased top padding for navbar clearance
                        position: 'relative'
                    }}>
                        <motion.h1
                            layoutId="hero-title"
                            transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
                            style={{
                                fontSize: isMobile ? '2.8rem' : 'clamp(3rem, 7vw, 6rem)',
                                fontWeight: 600,
                                lineHeight: 1.1,
                                background: 'linear-gradient(90deg, #4f9cf9 0%, #a855f7 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                maxWidth: '1200px',
                                margin: '0 auto 1.5rem',
                                letterSpacing: '-1px',
                                padding: '0 1rem'
                            }}
                        >
                            Join a team and inspire the work.
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 1 }}
                        >
                            <p style={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                                maxWidth: '800px',
                                margin: '0 auto',
                                lineHeight: 1.4,
                                fontWeight: 400
                            }}>
                                Discover how you can make an impact. See our areas of work and opportunities
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, y: [0, 10, 0] }}
                            transition={{ delay: 1, duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            style={{
                                marginTop: 'clamp(3rem, 5vw, 5rem)', // Add margin top instead of absolute positioning
                                cursor: 'pointer',
                                zIndex: 10
                            }}
                            onClick={() => scrollToSection('down')}
                        >
                            <ChevronDown size={32} color="#00c2ff" strokeWidth={1.5} />
                        </motion.div>
                    </section>

                    {/* Slide 2: "Role" */}
                    <section id="role-section" style={{
                        minHeight: isMobile ? '20vh' : '30vh', // Increased minHeight
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        background: '#000',
                        padding: 'clamp(2rem, 8vh, 4rem) 1rem' // More generous padding
                    }}>
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            style={{
                                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                                fontWeight: 700,
                                color: 'rgba(255, 255, 255, 0.8)',
                                textTransform: 'none',
                                letterSpacing: 'normal',
                                marginTop: '0',
                                marginBottom: '0.5rem',
                                display: 'block'
                            }}
                        >
                            Find Your Perfect
                        </motion.span>
                        <motion.h2
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            style={{
                                fontSize: 'clamp(3rem, 7vw, 5rem)',
                                fontWeight: 800,
                                margin: 0,
                                lineHeight: 1,
                                letterSpacing: '-0.02em',
                                background: 'linear-gradient(90deg, #ec4899 0%, #06b6d4 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                color: 'transparent',
                                display: 'inline-block'
                            }}
                        >
                            "Role"
                        </motion.h2>
                    </section>

                    {/* Slide 3: Jobs Grid */}
                    <section id="jobs-section" style={{
                        minHeight: 'auto',
                        padding: isMobile ? '2rem 1rem' : '4rem 1rem', // Increased vertical padding
                        marginBottom: '4rem' // Extra space at bottom
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: isMobile ? '1.5rem' : '3.rem', gap: isMobile ? '0.8rem' : '1.5rem' }}>
                            <h3 style={{ fontSize: '2.5rem', fontWeight: 600, margin: 0 }}>
                                Find Your <span style={{ color: '#00c2ff' }}>Perfect Role</span>
                            </h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888' }}>
                                <span style={{ fontSize: '1rem', fontWeight: 500 }}>Sort By:</span>
                                <div style={{ position: 'relative' }}>
                                    <button
                                        onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
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
                                        <span>{sortOrder === 'newest' ? 'Newest' : 'Oldest'}</span>
                                        <ChevronDown
                                            size={16}
                                            style={{
                                                transform: sortOrder === 'newest' ? 'rotate(0deg)' : 'rotate(180deg)',
                                                transition: 'transform 0.3s ease'
                                            }}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div style={{
                            position: 'relative',
                            minHeight: '400px',
                            overflow: 'hidden'
                        }}>
                            <AnimatePresence initial={false} custom={direction} mode="wait">
                                <motion.div
                                    key={currentPage}
                                    custom={direction}
                                    variants={{
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
                                    }}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        x: { type: "spring", stiffness: 200, damping: 25, mass: 0.8 },
                                        opacity: { duration: 0.4, ease: "circOut" },
                                        scale: { duration: 0.4, ease: "circOut" },
                                        filter: { duration: 0.4, ease: "circOut" }
                                    }}
                                    style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        justifyContent: 'center',
                                        gap: '2rem',
                                        width: '100%'
                                    }}
                                >
                                    {jobs.map((job, index) => (
                                        <motion.div
                                            key={job.id || job.title}
                                            whileHover={{ scale: 1.02, borderColor: '#ffffff', borderWidth: '2px', boxShadow: '0 15px 40px rgba(255,255,255,0.1)' }}
                                            whileTap={{ scale: 0.98 }}
                                            className="career-card"
                                            style={{
                                                background: '#111',
                                                borderRadius: '24px',
                                                padding: '3px',
                                                position: 'relative',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                overflow: 'hidden',
                                                border: '1px solid transparent',
                                                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                                width: 'clamp(280px, 90vw, 350px)',
                                                maxWidth: '100%'
                                            }}
                                        >
                                            <motion.div
                                                whileHover={{
                                                    background: 'linear-gradient(135deg, #ff9800 0%, #f44336 100%)',
                                                }}
                                                style={{
                                                    background: '#1a1a1a',
                                                    borderRadius: '22px',
                                                    padding: 'clamp(1.5rem, 5vw, 2.5rem) 1.5rem',
                                                    height: '100%',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    textAlign: 'center',
                                                    transition: 'all 0.3s ease'
                                                }}
                                            >
                                                <div style={{ marginBottom: '1.5rem' }}>
                                                    <Briefcase size={32} color="#fff" strokeWidth={1.5} />
                                                    <div style={{ width: '30px', height: '2px', background: 'rgba(255,255,255,0.3)', margin: '15px auto 0' }} />
                                                </div>

                                                <h4 style={{
                                                    fontSize: '1.5rem',
                                                    fontWeight: 700,
                                                    marginBottom: '1rem',
                                                    color: '#fff',
                                                    lineHeight: 1.2
                                                }}>
                                                    {job.title}
                                                </h4>

                                                <div style={{
                                                    color: '#ccc',
                                                    fontSize: '0.9rem',
                                                    lineHeight: 1.6,
                                                    marginBottom: '2.5rem',
                                                    fontWeight: 400
                                                }}>
                                                    {job.exp}<br />
                                                    {job.loc}<br />
                                                    {job.date}
                                                </div>

                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', width: '100%', marginTop: 'auto' }}>
                                                    <button
                                                        onClick={() => handleApply(job.title)}
                                                        style={{
                                                            width: '100%',
                                                            padding: '0.8rem',
                                                            background: 'linear-gradient(90deg, #0076fe 0%, #0056b1 100%)',
                                                            border: 'none',
                                                            borderRadius: '50px',
                                                            color: '#fff',
                                                            fontWeight: 600,
                                                            fontSize: '0.9rem',
                                                            cursor: 'pointer',
                                                            boxShadow: '0 4px 15px rgba(0, 118, 254, 0.3)'
                                                        }}
                                                    >
                                                        Apply Here
                                                    </button>

                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            if (job.pdfUrl) {
                                                                window.open(job.pdfUrl, '_blank');
                                                            } else {
                                                                showAlert('Detailed Job Description is unavailable for this position.', 'PDF Unavailable');
                                                            }
                                                        }}
                                                        style={{
                                                            width: '100%',
                                                            padding: '0.8rem',
                                                            background: 'rgba(255, 255, 255, 0.05)',
                                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                                            borderRadius: '50px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            gap: '8px',
                                                            color: '#00c2ff',
                                                            transition: 'all 0.3s ease',
                                                            textDecoration: 'none',
                                                            fontSize: '0.85rem',
                                                            fontWeight: 600,
                                                            cursor: 'pointer'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.background = 'rgba(0, 194, 255, 0.1)';
                                                            e.currentTarget.style.borderColor = '#00c2ff';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                                        }}
                                                    >
                                                        <FileText size={18} />
                                                        <span>Job Description</span>
                                                    </button>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: 'clamp(0.5rem, 2vw, 1.5rem)',
                            marginTop: 'clamp(3rem, 10vw, 6rem)',
                            color: '#666',
                            fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                            fontWeight: 500
                        }}>
                            <button
                                onClick={() => {
                                    if (currentPage > 1) {
                                        setDirection(-1);
                                        setCurrentPage(currentPage - 1);
                                    }
                                }}
                                disabled={currentPage === 1}
                                style={{
                                    background: currentPage === 1 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: currentPage === 1 ? '#444' : '#fff',
                                    padding: '0.5rem 1rem',
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
                                <span style={{ color: '#00c2ff' }}>{indexOfFirstJob + 1}-</span>
                                <span>{Math.min(indexOfLastJob, sortedJobs.length)}</span>
                                <span style={{ margin: '0 0.5rem', color: '#444' }}>of</span>
                                <span>{sortedJobs.length}</span>
                            </div>

                            <button
                                onClick={() => {
                                    if (currentPage < totalPages) {
                                        setDirection(1);
                                        setCurrentPage(currentPage + 1);
                                    }
                                }}
                                disabled={currentPage === totalPages}
                                style={{
                                    background: currentPage === totalPages ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: currentPage === totalPages ? '#444' : '#fff',
                                    padding: '0.5rem 1rem',
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
                    </section>

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
        </motion.div>
    );
};

export default Careers;
