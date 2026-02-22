import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Cpu, List, LayoutTemplate, ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Expertise = ({ onNavigate }) => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const graphSectionRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        window.scrollTo(0, 0);
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const activeCard = searchParams.get('card');

    const scrollToGraph = () => {
        graphSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Mock open state for functionality
    const [showDetail, setShowDetail] = useState(false);

    const toggleCard = (id) => {
        if (activeCard === id) {
            setSearchParams({});
        } else {
            setSearchParams({ card: id });
            setShowDetail(false); // Reset detail view when switching cards
            // The scroll is handled by useEffect
        }
    };

    useEffect(() => {
        if (activeCard) {
            const timer = setTimeout(() => {
                graphSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [activeCard]);

    const cardSequence = ['dv', 'pd', 'dft'];
    const currentIndex = cardSequence.indexOf(activeCard);

    const handleNext = () => {
        if (!showDetail) {
            setShowDetail(true);
        } else {
            const nextIndex = (currentIndex + 1) % cardSequence.length;
            setSearchParams({ card: cardSequence[nextIndex] });
            setShowDetail(false);
        }
        setTimeout(() => {
            graphSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const handlePrev = () => {
        if (showDetail) {
            setShowDetail(false);
        } else {
            const prevIndex = (currentIndex - 1 + cardSequence.length) % cardSequence.length;
            setSearchParams({ card: cardSequence[prevIndex] });
            setShowDetail(true);
        }
        setTimeout(() => {
            graphSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const cards = [
        {
            id: 'dv',
            title: 'Design &\nVerification',
            desc: 'Design. Deliver',
            icon: <Code size={30} strokeWidth={1.5} />,
        },
        {
            id: 'pd',
            title: 'Physical Design\n& Signoff',
            desc: 'Fabricate. Fearless',
            icon: <Cpu size={30} strokeWidth={1.5} />,
        },
        {
            id: 'dft',
            title: 'Design For\nTestability',
            desc: 'Built-in. Brilliant',
            icon: <List size={30} strokeWidth={1.5} />,
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="expertise-page"
            style={{ background: '#000', color: '#fff', fontFamily: '"Outfit", sans-serif', paddingBottom: '100px' }}
        >
            <section className="hero-section mobile-centered" style={{
                minHeight: '40vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
                paddingTop: isMobile ? '6rem' : '10rem',
                paddingBottom: 'clamp(2rem, 5vh, 5rem)',
                width: '100%'
            }}>
                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                        fontWeight: 600,
                        letterSpacing: '-0.02em',
                        lineHeight: 1.1,
                        textAlign: 'center',
                        padding: '0 1.5rem',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '0.2em'
                    }}
                >
                    <motion.span layoutId="word-your">Your</motion.span>{" "}
                    <motion.span layoutId="word-next-chip" style={{ color: '#00c2ff' }}>Next Chip</motion.span>{" "}
                    <motion.span layoutId="word-starts">Starts</motion.span>{" "}
                    <motion.span layoutId="word-here">Here</motion.span>
                </motion.h1>
            </section>

            <section className="cards-section mobile-responsive-padding" style={{ padding: '0 2rem', maxWidth: '1400px', margin: '0 auto 150px', width: '100%' }}>
                <style>
                    {`
                    .service-card {
                        flex: 1;
                        min-width: 280px;
                        max-width: 320px;
                        min-height: 400px;
                        background: linear-gradient(180deg, #3c3c3c, #2b2b2b);
                        border-radius: 18px;
                        padding: 2rem;
                        color: #fff;
                        position: relative;
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        text-align: left;
                        cursor: default;
                        border: 1px solid transparent;
                    }
                    .service-card .icon {
                        margin-bottom: 1.5rem;
                        opacity: 0.9;
                        color: #fff;
                    }
                    .service-card h2 {
                        font-size: clamp(1.5rem, 3vw, 1.8rem);
                        font-weight: 700;
                        line-height: 1.2;
                        margin-bottom: 1rem;
                        color: #fff;
                    }
                    .service-card p {
                        font-size: 1rem;
                        color: #cfcfcf;
                        margin-bottom: 3rem;
                    }
                    .service-card button {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        background: linear-gradient(90deg, #0076fe 0%, #0056b1 100%);
                        border: none;
                        border-radius: 0 0 18px 18px;
                        color: white;
                        height: 54px;
                        font-size: 1rem;
                        font-weight: 600;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .service-card button span {
                        display: block;
                        font-size: 0.8rem;
                        font-weight: 400;
                        opacity: 0.9;
                    }
                    @media (max-width: 768px) {
                        .service-card {
                            min-width: 100%;
                            min-height: auto;
                            padding: 1.5rem;
                            padding-bottom: 5rem;
                        }
                    }
                    `}
                </style>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '2rem',
                    width: '100%',
                    padding: '0 1rem'
                }}>
                    {cards.map((card, index) => {
                        const isHidden = activeCard && activeCard !== card.id;

                        return (
                            <motion.div
                                key={card.id}
                                className="service-card"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{
                                    opacity: isHidden ? 0 : 1,
                                    y: isHidden ? -300 : 0
                                }}
                                whileHover={{
                                    y: isHidden ? -300 : -10,
                                    borderColor: '#fff',
                                    boxShadow: '0 15px 40px rgba(255,255,255,0.1)'
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 25,
                                    delay: isHidden ? 0 : 0.1 * index
                                }}
                            >
                                <div className="icon">
                                    {card.icon}
                                </div>

                                <h2>
                                    {card.title.split('\n').map((line, idx) => (
                                        <span key={idx}>{line}<br /></span>
                                    ))}
                                </h2>

                                <p>{card.desc}</p>

                                {activeCard === card.id ? (
                                    <div
                                        onClick={() => toggleCard(card.id)}
                                        style={{
                                            position: 'absolute',
                                            bottom: '28px',
                                            left: '28px',
                                            width: 'calc(100% - 56px)',
                                            height: '50px',
                                            background: '#0a78ff',
                                            borderRadius: '25px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '0 5px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            background: '#fff',
                                            borderRadius: '50%',
                                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                                        }}></div>
                                    </div>
                                ) : (
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onTap={() => toggleCard(card.id)}
                                    >
                                        Discover now
                                    </motion.button>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Content Section: Render based on activeCard */}
            <AnimatePresence mode="wait">
                {activeCard && (
                    <motion.section
                        key="content-section"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5 }}
                        ref={graphSectionRef}
                        style={{
                            padding: isMobile ? '0 1rem' : '0 2rem',
                            maxWidth: '1400px',
                            margin: '0 auto 100px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            position: 'relative',
                            overflow: 'visible',
                            scrollMarginTop: '120px'
                        }}
                    >
                        {activeCard === 'dv' ? (
                            !showDetail ? (
                                // Design View 1: Certainty & Signoff
                                <div style={{
                                    position: 'relative',
                                    width: '100%',
                                    maxWidth: '1200px',
                                    display: 'flex',
                                    flexDirection: isMobile ? 'column' : 'row',
                                    justifyContent: 'space-between',
                                    alignItems: isMobile ? 'stretch' : 'center',
                                    gap: isMobile ? '2rem' : '4rem'
                                }}>
                                    {/* Left Text Content */}
                                    <motion.div
                                        initial={{ opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? 20 : 0 }}
                                        animate={{ opacity: 1, x: 0, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        style={{ flex: 1, minWidth: isMobile ? '100%' : '300px' }}
                                    >
                                        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '2rem', color: '#fff' }}>
                                            Where<br />
                                            Design<br />
                                            Meets Certainty.
                                        </h2>
                                        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)', color: '#3b82f6', lineHeight: 1.5, fontWeight: 500 }}>
                                            From <span style={{ color: '#00c2ff' }}>RTL to Validation</span>, we build and verify complex SoCs with Precision, Predictability, and Performance. Our integrated approach ensures your architecture works — <span style={{ color: '#00c2ff' }}>exactly</span> as imagined.
                                        </p>
                                    </motion.div>

                                    {/* Right Card: DV Signoff */}
                                    <motion.div
                                        initial={{ opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 20 : 0 }}
                                        animate={{ opacity: 1, x: 0, y: 0 }}
                                        whileHover={{ borderColor: '#fff', borderWidth: '2px', boxShadow: '0 15px 40px rgba(255,255,255,0.1)' }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        style={{
                                            flex: 1,
                                            minWidth: isMobile ? '100%' : '350px',
                                            background: 'linear-gradient(180deg, #1f1f1f 0%, #111 100%)',
                                            borderRadius: isMobile ? '20px' : '30px',
                                            padding: isMobile ? '2rem' : '3rem',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            position: 'relative',
                                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                                        }}
                                    >
                                        <h3 style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 600, color: '#aaa', marginBottom: '8px' }}>
                                            DV Signoff
                                        </h3>
                                        <h3 style={{ fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem', lineHeight: 1 }}>
                                            Completed
                                        </h3>
                                        <p style={{ fontSize: '1.1rem', color: '#ccc', fontWeight: 500, marginBottom: '2rem' }}>
                                            5+ First Pass Silicon
                                        </p>

                                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            {[
                                                "UVM-Based Environments — Industry-standard methodology",
                                                "RTL Simulation — VCS, Questa, XSIM",
                                                "Assertion-Based Verification — Early bug detection",
                                                "Coverage-Driven Flows — Full visibility, full control",
                                                "Testbench Development — Reusable and scalable",
                                                "SoC & Subsystem Verification — From IP to full-chip"
                                            ].map((item, index) => (
                                                <li key={index} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: '#ccc', fontSize: '1rem', lineHeight: 1.4 }}>
                                                    <div style={{ minWidth: '20px', height: '20px', borderRadius: '50%', background: '#007bff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '3px' }}>
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                    </div>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>

                                        <motion.div
                                            onTap={(e) => { e.stopPropagation(); setShowDetail(true); }}
                                            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                                            whileTap={{ scale: 0.98 }}
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                borderRadius: '20px',
                                                padding: '1.5rem',
                                                textAlign: 'center',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <h4 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>Function.</h4>
                                            <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 400, color: '#aaa', marginTop: '5px' }}>Guaranteed.</h4>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            ) : (
                                // Design View 2: Next-Gen & Turnkeys (Toggled)
                                <div style={{
                                    position: 'relative',
                                    width: '100%',
                                    maxWidth: '1200px',
                                    display: 'flex',
                                    flexDirection: isMobile ? 'column' : 'row',
                                    justifyContent: 'space-between',
                                    alignItems: isMobile ? 'stretch' : 'center',
                                    gap: isMobile ? '2rem' : '4rem'
                                }}>
                                    {/* Left Text Content */}
                                    <motion.div
                                        initial={{ opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? 20 : 0 }}
                                        animate={{ opacity: 1, x: 0, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        style={{ flex: 1, minWidth: isMobile ? '100%' : '300px' }}
                                    >
                                        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '2rem', color: '#fff' }}>
                                            Next-Gen<br />
                                            Verification for<br />
                                            Next-Gen Silicon
                                        </h2>
                                        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)', color: '#3b82f6', lineHeight: 1.5, fontWeight: 500 }}>
                                            Our DV Practices evolve with Technology ensuring your chips are ready for <span style={{ color: '#00c2ff' }}>AI, 5G, automotive, and beyond</span>
                                        </p>
                                    </motion.div>

                                    {/* Right Card: DV Turnkeys */}
                                    <motion.div
                                        initial={{ opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 20 : 0 }}
                                        animate={{ opacity: 1, x: 0, y: 0 }}
                                        whileHover={{ borderColor: '#fff', borderWidth: '2px', boxShadow: '0 15px 40px rgba(255,255,255,0.1)' }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        style={{
                                            flex: 1,
                                            minWidth: isMobile ? '100%' : '350px',
                                            background: 'linear-gradient(180deg, #1f1f1f 0%, #111 100%)',
                                            borderRadius: isMobile ? '20px' : '30px',
                                            padding: isMobile ? '2rem' : '3rem',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            position: 'relative',
                                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                                        }}
                                    >
                                        <h3 style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 600, color: '#aaa', marginBottom: '8px' }}>
                                            DV Turnkeys
                                        </h3>
                                        <h3 style={{ fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: 700, color: '#fff', marginBottom: '2rem', lineHeight: 1 }}>
                                            Completed
                                        </h3>

                                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            {[
                                                "AI Enhance Verification-smarter regression & analysis",
                                                "AI, 5G & IoT Expertise — Verified at unimaginable scale",
                                                "Autonomous & Automotive SoCs — Safety-critical compliance",
                                                "High-Performance SoCs — Datacenter & aerospace verified"
                                            ].map((item, index) => (
                                                <li key={index} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: '#ccc', fontSize: '1rem', lineHeight: 1.4 }}>
                                                    <div style={{ minWidth: '20px', height: '20px', borderRadius: '50%', background: '#007bff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '3px' }}>
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                    </div>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>

                                        <motion.button
                                            onClick={() => navigate('/casestudy')}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            style={{
                                                width: '100%',
                                                padding: '1.2rem',
                                                background: 'linear-gradient(90deg, #0066cc 0%, #004499 100%)',
                                                border: 'none',
                                                borderRadius: '50px',
                                                color: '#fff',
                                                fontWeight: 700,
                                                fontSize: isMobile ? '1rem' : '1.2rem',
                                                cursor: 'pointer',
                                                boxShadow: '0 4px 15px rgba(0, 102, 204, 0.4)'
                                            }}
                                        >
                                            View Our CaseStudy
                                        </motion.button>
                                    </motion.div>
                                </div>
                            )
                        ) : activeCard === 'dft' ? (
                            !showDetail ? (
                                // DFT View 1: Confidence & Signoff (Initial)
                                <div style={{
                                    position: 'relative',
                                    width: '100%',
                                    maxWidth: '1200px',
                                    display: 'flex',
                                    flexDirection: isMobile ? 'column' : 'row',
                                    justifyContent: 'space-between',
                                    alignItems: isMobile ? 'stretch' : 'center',
                                    gap: isMobile ? '2rem' : '4rem'
                                }}>
                                    {/* Left Text Content */}
                                    <motion.div
                                        initial={{ opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? 20 : 0 }}
                                        animate={{ opacity: 1, x: 0, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        style={{ flex: 1, minWidth: isMobile ? '100%' : '350px' }}
                                    >
                                        <h2 style={{ fontSize: isMobile ? '2.5rem' : 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '2rem', color: '#fff' }}>
                                            Confidence<br />
                                            Built Into<br />
                                            Every Scan
                                        </h2>
                                        <p style={{ fontSize: isMobile ? '1.1rem' : '1.4rem', color: '#3b82f6', lineHeight: 1.5, fontWeight: 500 }}>
                                            From <span style={{ color: '#00c2ff' }}>Scan Stitching to ATPG and MBIST</span>, our DFT flows ensure Silicon quality without compromise — at any scale, for <span style={{ color: '#00c2ff' }}>Every Architecture</span>
                                        </p>
                                    </motion.div>

                                    {/* Right Card: DFT Signoff */}
                                    <motion.div
                                        initial={{ opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 20 : 0 }}
                                        animate={{ opacity: 1, x: 0, y: 0 }}
                                        whileHover={{ borderColor: '#fff', borderWidth: '2px', boxShadow: '0 15px 40px rgba(255,255,255,0.1)' }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        style={{
                                            flex: 1,
                                            minWidth: isMobile ? '100%' : '300px',
                                            background: 'linear-gradient(180deg, #1f1f1f 0%, #111 100%)',
                                            borderRadius: '2rem',
                                            padding: 'clamp(1.5rem, 5vw, 3rem)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            position: 'relative',
                                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                                        }}
                                    >
                                        <h3 style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 600, color: '#aaa', marginBottom: '8px' }}>
                                            DFT Signoff
                                        </h3>
                                        <h3 style={{ fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: 700, color: '#fff', marginBottom: '2rem', lineHeight: 1 }}>
                                            Completed
                                        </h3>
                                        <h5 style={{ fontSize: isMobile ? '1.5rem' : '1.5rem', fontWeight: 500, color: '#fff', marginBottom: '2rem', lineHeight: 1 }}>
                                            15+ First Pass silicon

                                        </h5>

                                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            {[
                                                "Scan Insertion — DFTMAX, Tessent, and more",
                                                "ATPG Generation — High coverage with minimal test time",
                                                "MBIST/Logic BIST — For memory and logic blocks",
                                                "JTAG & Boundary Scan — IEEE 1149.x standard-based",
                                                "Fault Simulation — Report-driven test closure and grading",
                                                "DFT Verification — Tool-driven validation and debug",
                                                "Test Engineering — Yield-aware support to silicon bring-up"
                                            ].map((item, index) => (
                                                <li key={index} style={{ display: 'flex', gap: '100px', alignItems: 'flex-start', color: '#ccc', fontSize: '1rem', lineHeight: 1.4 }}>
                                                    <div style={{ minWidth: '20px', height: '20px', borderRadius: '50%', background: '#007bff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '3px' }}>
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                    </div>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>

                                        <motion.div
                                            onTap={(e) => { e.stopPropagation(); setShowDetail(true); }}
                                            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                                            whileTap={{ scale: 0.98 }}
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                borderRadius: '20px',
                                                padding: '1.5rem',
                                                textAlign: 'center',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <h4 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>Design for Test.</h4>
                                            <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 400, color: '#aaa', marginTop: '5px' }}>Delivered.</h4>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            ) : (
                                // DFT View 2: Smarter & Turnkeys (Toggled)
                                <div style={{
                                    position: 'relative',
                                    width: '100%',
                                    maxWidth: '1200px',
                                    display: 'flex',
                                    flexDirection: isMobile ? 'column' : 'row',
                                    justifyContent: 'space-between',
                                    alignItems: isMobile ? 'stretch' : 'center',
                                    gap: isMobile ? '2rem' : '4rem'
                                }}>
                                    {/* Left Text Content */}
                                    <motion.div
                                        initial={{ opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? 20 : 0 }}
                                        animate={{ opacity: 1, x: 0, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        style={{ flex: 1, minWidth: isMobile ? '100%' : '300px' }}
                                    >
                                        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '2rem', color: '#fff' }}>
                                            Smarter.<br />
                                            Faster.<br />
                                            Certain.
                                        </h2>
                                        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)', color: '#3b82f6', lineHeight: 1.5, fontWeight: 500 }}>
                                            <span style={{ color: '#00c2ff' }}>AI-Driven</span> Autonomous DFT with Self-optimizing ATPG, ML fault prediction, controllability-guided DFT, SLM lifecycle analytics, layout-aware autonomous debug — powering the next era of <span style={{ color: '#00c2ff' }}>Silicon innovation</span>
                                        </p>
                                    </motion.div>

                                    {/* Right Card: DFT Turnkeys */}
                                    <motion.div
                                        initial={{ opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 20 : 0 }}
                                        animate={{ opacity: 1, x: 0, y: 0 }}
                                        whileHover={{ borderColor: '#fff', borderWidth: '2px', boxShadow: '0 15px 40px rgba(255,255,255,0.1)' }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        style={{
                                            flex: 1,
                                            minWidth: isMobile ? '100%' : '350px',
                                            background: 'linear-gradient(180deg, #1f1f1f 0%, #111 100%)',
                                            borderRadius: isMobile ? '20px' : '30px',
                                            padding: isMobile ? '2rem' : '3rem',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            position: 'relative',
                                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                                        }}
                                    >
                                        <h3 style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 600, color: '#aaa', marginBottom: '8px' }}>
                                            DFT Turnkeys
                                        </h3>
                                        <h3 style={{ fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: 700, color: '#fff', marginBottom: '2rem', lineHeight: 1 }}>
                                            Completed
                                        </h3>
                                        <h5 style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 500, color: '#fff', marginBottom: '2rem', lineHeight: 1 }}>
                                            5+ First Pass silicon

                                        </h5>

                                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            {[

                                                "Self-Optimizing ATPG — AI-based X-filling dynamic compaction multi-level compression,adaption pattern generation",
                                                "AI Fault Prediction — ML-driven scan diagnosis,defect correlation,yeild,limiter forecasting",
                                                "SLM & Lifecycle Analytics — RTL-ATPG-ATE-Diagnosis-Yield Dta Fusion ,Adaptive test , coverage closure",
                                                "In-Field Learning — AI-augmented LBIST/MBIST,real time fail,captire,predictive reliablity"
                                            ].map((item, index) => (
                                                <li key={index} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: '#ccc', fontSize: '1rem', lineHeight: 1.4 }}>
                                                    <div style={{ minWidth: '20px', height: '20px', borderRadius: '50%', background: '#007bff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '3px' }}>
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                    </div>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>

                                        <motion.div
                                            onTap={(e) => { e.stopPropagation(); setShowDetail(false); }}
                                            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                                            whileTap={{ scale: 0.98 }}
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                borderRadius: '20px',
                                                padding: '1.5rem',
                                                textAlign: 'center',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <h4 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>AI-Driven.</h4>
                                            <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 400, color: '#aaa', marginTop: '5px' }}>Innovation.</h4>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            )

                        ) : activeCard === 'pd' ? (
                            // Default / Other Cards (Graph & Precision Toggle)
                            <div style={{
                                position: 'relative',
                                width: '100%',
                                maxWidth: (showDetail ? '1200px' : '1000px'), // Adjust width slightly for different layouts
                                background: (showDetail ? 'transparent' : '#1a1a1a'), // Precision section has its own card bg
                                border: (showDetail ? 'none' : '1px solid #333'),
                                borderRadius: isMobile ? '20px' : '30px',
                                padding: (showDetail ? '0' : (isMobile ? '2rem' : '4rem')),
                                overflow: 'visible' // Allow hover effects to pop out
                            }}>
                                {!showDetail ? (
                                    // 1. Graph Section Content
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'stretch' : 'flex-start', flexWrap: 'wrap', gap: '2rem', position: 'relative', zIndex: 2 }}
                                    >
                                        <div style={{ maxWidth: isMobile ? '100%' : '400px' }}>
                                            <h2 style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', fontWeight: 700, lineHeight: 1.1, marginBottom: '2rem' }}>
                                                Expertise that<br />scales with<br />every <span style={{ color: '#fff' }}>shrink</span>
                                            </h2>
                                            <p style={{ fontSize: isMobile ? '1rem' : '1.2rem', color: '#aaa', lineHeight: 1.6 }}>
                                                From <span style={{ color: '#00c2ff' }}>180nm to 1.8nm</span>, we deliver across every node.
                                            </p>
                                        </div>

                                        <motion.div
                                            whileHover={{ borderColor: '#fff', borderWidth: '2px', boxShadow: '0 15px 40px rgba(255,255,255,0.1)' }}
                                            style={{
                                                flex: 1,
                                                minWidth: isMobile ? '100%' : '300px',
                                                background: '#0a0a0a',
                                                borderRadius: '20px',
                                                padding: '2rem',
                                                border: '1px solid #333',
                                                position: 'relative'
                                            }}
                                        >
                                            <h4 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '5px' }}>Node</h4>
                                            <h4 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#00c2ff', marginBottom: '1rem' }}>Expertise</h4>
                                            <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '3rem' }}>TSMC | SAMSUNG | INTEL</p>

                                            <div style={{ position: 'relative', height: '150px', marginTop: '2rem' }}>
                                                <svg viewBox="0 0 400 150" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                                                    <line x1="20" y1="130" x2="380" y2="20" stroke="#00c2ff" strokeWidth="3" />
                                                    <circle cx="20" cy="130" r="10" fill="#ff0000" />
                                                    <text x="20" y="160" fill="#fff" fontSize="12" textAnchor="middle">28 nm</text>
                                                    <text x="20" y="175" fill="#aaa" fontSize="10" textAnchor="middle">+</text>
                                                    <circle cx="110" cy="102" r="12" fill="#ffaa00" />
                                                    <text x="110" y="160" fill="#fff" fontSize="12" textAnchor="middle">10-14</text>
                                                    <text x="110" y="175" fill="#fff" fontSize="12" textAnchor="middle">nm</text>
                                                    <circle cx="200" cy="74" r="14" fill="#44aa00" />
                                                    <text x="200" y="160" fill="#fff" fontSize="12" textAnchor="middle">5-7</text>
                                                    <text x="200" y="175" fill="#fff" fontSize="12" textAnchor="middle">nm</text>
                                                    <circle cx="290" cy="46" r="16" fill="#aa44aa" />
                                                    <text x="290" y="160" fill="#fff" fontSize="12" textAnchor="middle">3-4</text>
                                                    <text x="290" y="175" fill="#fff" fontSize="12" textAnchor="middle">nm</text>
                                                    <circle cx="380" cy="20" r="20" fill="#00ccff" />
                                                    <text x="380" y="160" fill="#fff" fontSize="12" textAnchor="middle">1.8</text>
                                                    <text x="380" y="175" fill="#fff" fontSize="12" textAnchor="middle">nm</text>
                                                </svg>
                                            </div>

                                            <motion.div
                                                onTap={(e) => { e.stopPropagation(); setShowDetail(true); }}
                                                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                                                whileTap={{ scale: 0.98 }}
                                                style={{
                                                    marginTop: '50px',
                                                    background: 'rgba(255, 255, 255, 0.05)',
                                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                                    borderRadius: '15px',
                                                    padding: '10px',
                                                    textAlign: 'center',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Scale. <span style={{ color: '#00c2ff' }}>Re-Mastered</span></h3>
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>
                                ) : (
                                    // 2. Precision / Silicon Taped-Out Section Content
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        style={{
                                            display: 'flex',
                                            flexDirection: isMobile ? 'column' : 'row',
                                            justifyContent: 'space-between',
                                            alignItems: isMobile ? 'stretch' : 'center',
                                            gap: isMobile ? '2rem' : '4rem',
                                            width: '100%'
                                        }}
                                    >
                                        <div style={{ flex: 1, minWidth: isMobile ? '100%' : '300px' }}>
                                            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '2rem', color: '#fff' }}>
                                                Precision in Every<br />
                                                Layer. Innovation<br />
                                                at Every Scale
                                            </h2>
                                            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)', color: '#3b82f6', lineHeight: 1.5, fontWeight: 500 }}>
                                                Full-Chip Placement and Routing. Tuned for<br />
                                                Power, Performance, Area, and Turn-Around-<br />
                                                Time excellence
                                            </p>
                                        </div>

                                        <motion.div
                                            whileHover={{ borderColor: '#fff', borderWidth: '2px', boxShadow: '0 15px 40px rgba(255,255,255,0.1)' }}
                                            style={{
                                                flex: 1,
                                                minWidth: isMobile ? '100%' : '300px',
                                                background: 'linear-gradient(180deg, #1f1f1f 0%, #111 100%)',
                                                borderRadius: '2rem',
                                                padding: 'clamp(1.5rem, 5vw, 3rem)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                position: 'relative',
                                                boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                                            }}
                                        >
                                            <h3 style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 600, color: '#aaa', marginBottom: '8px' }}>
                                                Silicon Taped-
                                            </h3>
                                            <h3 style={{ fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: 700, color: '#fff', marginBottom: '2rem', lineHeight: 1 }}>
                                                Out
                                            </h3>

                                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: '#ccc', fontSize: '1rem', lineHeight: 1.4 }}>
                                                    <div style={{ minWidth: '20px', height: '20px', borderRadius: '50%', background: '#007bff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '3px' }}>
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                    </div>
                                                    25+ First Pass Silicon with Billion Gates
                                                </li>
                                                <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: '#ccc', fontSize: '1rem', lineHeight: 1.4 }}>
                                                    <div style={{ minWidth: '20px', height: '20px', borderRadius: '50%', background: '#007bff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '3px' }}>
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                    </div>
                                                    Bump planning for 2D, 2.5D and 3D ASIC
                                                </li>
                                                <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: '#ccc', fontSize: '1rem', lineHeight: 1.4 }}>
                                                    <div style={{ minWidth: '20px', height: '20px', borderRadius: '50%', background: '#007bff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '3px' }}>
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                    </div>
                                                    Multi-Voltage Domain & Low-Power ASICs
                                                </li>
                                                <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: '#ccc', fontSize: '1rem', lineHeight: 1.4 }}>
                                                    <div style={{ minWidth: '20px', height: '20px', borderRadius: '50%', background: '#007bff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '3px' }}>
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                    </div>
                                                    <span style={{ opacity: 0.8 }}>CPUs, GPUs, WLAN, ARM cores, SerDes, MIPI, LPDDR4, PCIe Gen5, USB, ETHERNET & IP Hardening</span>
                                                </li>
                                            </ul>

                                            <motion.div
                                                onTap={(e) => { e.stopPropagation(); setShowDetail(false); }}
                                                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                                                whileTap={{ scale: 0.98 }}
                                                style={{
                                                    background: 'rgba(255, 255, 255, 0.05)',
                                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                                    borderRadius: '20px',
                                                    padding: '1.5rem',
                                                    textAlign: 'center',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <h4 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>GDSII.</h4>
                                                <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 400, color: '#aaa', marginTop: '5px' }}>Guaranteed</h4>
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </div>
                        ) : null}


                        {/* Navigation Arrows for all cards */}
                        <div style={{
                            position: 'absolute',
                            left: '50%',
                            right: 'auto',
                            top: 'auto',
                            bottom: '-100px',
                            transform: 'translateX(-50%) rotate(-90deg)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            zIndex: 20
                        }}>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handlePrev}
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    border: '2px solid #00c2ff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    background: 'rgba(0,0,0,0.6)',
                                    boxShadow: '0 0 15px rgba(0, 194, 255, 0.3)'
                                }}
                            >
                                <ChevronUp size={28} color="#00c2ff" strokeWidth={2} />
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleNext}
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    border: '2px solid #00c2ff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    background: 'rgba(0,0,0,0.6)',
                                    boxShadow: '0 0 15px rgba(0, 194, 255, 0.3)'
                                }}
                            >
                                <ChevronDown size={28} color="#00c2ff" strokeWidth={2} />
                            </motion.div>
                        </div>

                    </motion.section>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Expertise;
