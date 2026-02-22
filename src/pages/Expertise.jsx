import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Cpu, List, LayoutTemplate } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Expertise = ({ onNavigate }) => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const graphSectionRef = useRef(null);

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
            setTimeout(() => {
                graphSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    };

    useEffect(() => {
        if (activeCard) {
            setTimeout(() => {
                graphSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    }, [activeCard]);


    const cards = [
        {
            id: 'dv',
            title: 'Design &\nVerification',
            desc: 'Design. Deliver',
            icon: <Code size={30} strokeWidth={1.5} />,
        },
        {
            id: 'pd',
            title: 'Physical\nDesign\n& Signoff',
            desc: 'Fearless',
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
            <section className="hero-section mobile-centered" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', paddingTop: '100px', width: '100%' }}>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ fontSize: 'clamp(2rem, 8vw, 4rem)', fontWeight: 600, letterSpacing: '-1px', lineHeight: 1.1, marginBottom: '0.5rem', textAlign: 'center' }}
                >
                    Your <span style={{ color: '#00c2ff' }}>Next Chip</span> Starts
                </motion.h1>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ fontSize: 'clamp(2rem, 8vw, 4rem)', fontWeight: 600, letterSpacing: '-1px', lineHeight: 1.1, textAlign: 'center' }}
                >
                    Here
                </motion.h1>
            </section>

            <section className="cards-section mobile-responsive-padding" style={{ padding: '0 2rem', maxWidth: '1400px', margin: '0 auto 150px', width: '100%' }}>
                <style>
                    {`
                    .service-card {
                        width: 260px;
                        height: 380px;
                        background: linear-gradient(180deg, #3c3c3c, #2b2b2b);
                        border-radius: 24px;
                        padding: 28px 28px 60px 28px;
                        color: #fff;
                        position: relative;
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        text-align: left;
                        transition: transform 0.3s ease;
                        cursor: pointer;
                    }
                    @media (hover: hover) {
                        .service-card:hover {
                            transform: translateY(-10px);
                        }
                    }
                    .service-card .icon {
                        margin-bottom: 18px;
                        opacity: 0.9;
                        color: #fff;
                    }
                    .service-card h2 {
                        font-size: 26px;
                        font-weight: 700;
                        line-height: 1.2;
                        margin-bottom: 14px;
                        color: #fff;
                    }
                    .service-card p {
                        font-size: 15px;
                        color: #cfcfcf;
                        margin-bottom: 40px;
                    }
                    .service-card button {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        width: 100%;
                        height: 48px;
                        background: linear-gradient(90deg, #0076fe 0%, #0056b1 100%);
                        border: none;
                        border-radius: 0 0 24px 24px;
                        color: white;
                        padding: 10px 0;
                        font-size: 1rem;
                        font-weight: 600;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        line-height: 1.2;
                        transition: height 0.3s ease;
                    }
                    @media (hover: hover) {
                        .service-card button:hover {
                            height: 55px;
                        }
                    }
                    .expertise-detail-btn {
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 20px;
                        padding: 1.5rem;
                        text-align: center;
                        cursor: pointer;
                        transition: 0.2s;
                    }
                    @media (hover: hover) {
                        .expertise-detail-btn:hover {
                            background: rgba(255, 255, 255, 0.1);
                        }
                    }
                    .casestudy-btn {
                        width: 100%;
                        padding: 1.2rem;
                        background: linear-gradient(90deg, #0066cc 0%, #004499 100%);
                        border: none;
                        border-radius: 50px;
                        color: #fff;
                        font-weight: 700;
                        font-size: 1.2rem;
                        cursor: pointer;
                        box-shadow: 0 4px 15px rgba(0, 102, 204, 0.4);
                        transition: transform 0.2s;
                    }
                    @media (hover: hover) {
                        .casestudy-btn:hover {
                            transform: scale(1.02);
                        }
                    }
                    .node-expertise-btn {
                        margin-top: 50px;
                        background: #333;
                        border-radius: 15px;
                        padding: 10px;
                        text-align: center;
                        cursor: pointer;
                        transition: 0.2s;
                    }
                    @media (hover: hover) {
                        .node-expertise-btn:hover {
                            background: #444;
                        }
                    }
                    @media (max-width: 768px) {
                        .service-card {
                            width: 100%;
                            max-width: 350px;
                            height: auto;
                            min-height: 300px;
                        }
                        .service-card h2 {
                            font-size: 22px;
                        }
                        .service-card p {
                            font-size: 14px;
                        }
                    }
                    @media (max-width: 480px) {
                        .service-card {
                            padding: 20px;
                            margin: 0 10px;
                        }
                        .service-card h2 {
                            font-size: 20px;
                        }
                    }
                    `}
                </style>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '20px',
                    width: '100%'
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
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 25,
                                    delay: isHidden ? 0 : 0.1 * index
                                }}
                                onClick={() => toggleCard(card.id)}
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
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '28px',
                                        left: '28px',
                                        width: 'calc(100% - 56px)',
                                        height: '50px',
                                        background: '#0a78ff',
                                        borderRadius: '25px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '0 5px'
                                    }}>
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
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleCard(card.id);
                                        }}
                                    >
                                        Discover more
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
                            padding: '0 2rem',
                            maxWidth: '1400px',
                            margin: '0 auto 100px',
                            display: 'flex',
                            justifyContent: 'center',
                            overflow: 'hidden'
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
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: '4rem'
                                }}>
                                    {/* Left Text Content */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5 }}
                                        style={{ flex: 1, minWidth: '350px' }}
                                    >
                                        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '2rem', color: '#fff' }}>
                                            Where<br />
                                            Design<br />
                                            Meets Certainty.
                                        </h2>
                                        <p style={{ fontSize: '1.4rem', color: '#3b82f6', lineHeight: 1.5, fontWeight: 500 }}>
                                            From <span style={{ color: '#00c2ff' }}>RTL to Validation</span>, we build and verify complex SoCs with Precision, Predictability, and Performance. Our integrated approach ensures your architecture works — <span style={{ color: '#00c2ff' }}>exactly</span> as imagined.
                                        </p>
                                    </motion.div>

                                    {/* Right Card: DV Signoff */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        style={{
                                            flex: 1,
                                            minWidth: '350px',
                                            background: 'linear-gradient(180deg, #1f1f1f 0%, #111 100%)',
                                            borderRadius: '30px',
                                            padding: '3rem',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            position: 'relative',
                                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                                        }}
                                    >
                                        <h3 style={{ fontSize: '2rem', fontWeight: 600, color: '#aaa', marginBottom: '8px' }}>
                                            DV Signoff
                                        </h3>
                                        <h3 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#fff', marginBottom: '2rem', lineHeight: 1 }}>
                                            Completed
                                        </h3>

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

                                        <div
                                            onClick={() => setShowDetail(true)}
                                            className="expertise-detail-btn"
                                        >
                                            <h4 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>Function.</h4>
                                            <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 400, color: '#aaa', marginTop: '5px' }}>Guaranteed.</h4>
                                        </div>
                                    </motion.div>
                                </div>
                            ) : (
                                // Design View 2: Next-Gen & Turnkeys (Toggled)
                                <div style={{
                                    position: 'relative',
                                    width: '100%',
                                    maxWidth: '1200px',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: '4rem'
                                }}>
                                    {/* Left Text Content */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5 }}
                                        style={{ flex: 1, minWidth: '350px' }}
                                    >
                                        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '2rem', color: '#fff' }}>
                                            Next-Gen<br />
                                            Verification for<br />
                                            Next-Gen Silicon
                                        </h2>
                                        <p style={{ fontSize: '1.4rem', color: '#3b82f6', lineHeight: 1.5, fontWeight: 500 }}>
                                            Our DV Practices evolve with Technology ensuring your chips are ready for <span style={{ color: '#00c2ff' }}>AI, 5G, automotive, and beyond</span>
                                        </p>
                                    </motion.div>

                                    {/* Right Card: DV Turnkeys */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        style={{
                                            flex: 1,
                                            minWidth: '350px',
                                            background: 'linear-gradient(180deg, #1f1f1f 0%, #111 100%)',
                                            borderRadius: '30px',
                                            padding: '3rem',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            position: 'relative',
                                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                                        }}
                                    >
                                        <h3 style={{ fontSize: '2rem', fontWeight: 600, color: '#aaa', marginBottom: '8px' }}>
                                            DV Turnkeys
                                        </h3>
                                        <h3 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#fff', marginBottom: '2rem', lineHeight: 1 }}>
                                            Completed
                                        </h3>

                                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            {[
                                                "10+ First Pass Silicon — Smarter regressions & analysis",
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

                                        <button
                                            onClick={() => navigate('/casestudy')}
                                            className="casestudy-btn"
                                        >
                                            View Our CaseStudy
                                        </button>
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
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: '4rem'
                                }}>
                                    {/* Left Text Content */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5 }}
                                        style={{ flex: 1, minWidth: '350px' }}
                                    >
                                        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '2rem', color: '#fff' }}>
                                            Confidence<br />
                                            Built Into<br />
                                            Every Scan
                                        </h2>
                                        <p style={{ fontSize: '1.4rem', color: '#3b82f6', lineHeight: 1.5, fontWeight: 500 }}>
                                            From <span style={{ color: '#00c2ff' }}>Scan Stitching to ATPG and MBIST</span>, our DFT flows ensure Silicon quality without compromise — at any scale, for <span style={{ color: '#00c2ff' }}>Every Architecture</span>
                                        </p>
                                    </motion.div>

                                    {/* Right Card: DFT Signoff */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        style={{
                                            flex: 1,
                                            minWidth: '350px',
                                            background: 'linear-gradient(180deg, #1f1f1f 0%, #111 100%)',
                                            borderRadius: '30px',
                                            padding: '3rem',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            position: 'relative',
                                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                                        }}
                                    >
                                        <h3 style={{ fontSize: '2rem', fontWeight: 600, color: '#aaa', marginBottom: '8px' }}>
                                            DFT Signoff
                                        </h3>
                                        <h3 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#fff', marginBottom: '2rem', lineHeight: 1 }}>
                                            Completed
                                        </h3>

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
                                                <li key={index} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: '#ccc', fontSize: '1rem', lineHeight: 1.4 }}>
                                                    <div style={{ minWidth: '20px', height: '20px', borderRadius: '50%', background: '#007bff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '3px' }}>
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                    </div>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>

                                        <div
                                            onClick={() => setShowDetail(true)}
                                            className="expertise-detail-btn"
                                        >
                                            <h4 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>Design for Test.</h4>
                                            <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 400, color: '#aaa', marginTop: '5px' }}>Delivered.</h4>
                                        </div>
                                    </motion.div>
                                </div>
                            ) : (
                                // DFT View 2: Smarter & Turnkeys (Toggled)
                                <div style={{
                                    position: 'relative',
                                    width: '100%',
                                    maxWidth: '1200px',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: '4rem'
                                }}>
                                    {/* Left Text Content */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5 }}
                                        style={{ flex: 1, minWidth: '350px' }}
                                    >
                                        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '2rem', color: '#fff' }}>
                                            Smarter.<br />
                                            Faster.<br />
                                            Certain.
                                        </h2>
                                        <p style={{ fontSize: '1.4rem', color: '#3b82f6', lineHeight: 1.5, fontWeight: 500 }}>
                                            <span style={{ color: '#00c2ff' }}>AI-Driven</span> Autonomous DFT with Self-optimizing ATPG, ML fault prediction, controllability-guided DFT, SLM lifecycle analytics, layout-aware autonomous debug — powering the next era of <span style={{ color: '#00c2ff' }}>Silicon innovation</span>
                                        </p>
                                    </motion.div>

                                    {/* Right Card: DFT Turnkeys */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        style={{
                                            flex: 1,
                                            minWidth: '350px',
                                            background: 'linear-gradient(180deg, #1f1f1f 0%, #111 100%)',
                                            borderRadius: '30px',
                                            padding: '3rem',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            position: 'relative',
                                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                                        }}
                                    >
                                        <h3 style={{ fontSize: '2rem', fontWeight: 600, color: '#aaa', marginBottom: '8px' }}>
                                            DFT Turnkeys
                                        </h3>
                                        <h3 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#fff', marginBottom: '2rem', lineHeight: 1 }}>
                                            Completed
                                        </h3>

                                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: '#ccc', fontSize: '1rem', lineHeight: 1.4 }}>
                                                <div style={{ minWidth: '20px', height: '20px', borderRadius: '50%', background: '#007bff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '3px' }}>
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                </div>
                                                Self-Optimizing ATPG — AI-based X-filling
                                            </li>
                                            <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: '#ccc', fontSize: '1rem', lineHeight: 1.4 }}>
                                                <div style={{ minWidth: '20px', height: '20px', borderRadius: '50%', background: '#007bff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '3px' }}>
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                </div>
                                                Pattern generation — ML-driven scan diagnosis
                                            </li>
                                            <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: '#ccc', fontSize: '1rem', lineHeight: 1.4 }}>
                                                <div style={{ minWidth: '20px', height: '20px', borderRadius: '50%', background: '#007bff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '3px' }}>
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                </div>
                                                AI Fault Prediction — Defect correlation
                                            </li>
                                            <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: '#ccc', fontSize: '1rem', lineHeight: 1.4 }}>
                                                <div style={{ minWidth: '20px', height: '20px', borderRadius: '50%', background: '#007bff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '3px' }}>
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                </div>
                                                SLM & Lifecycle Analytics — RTL to ATPG
                                            </li>
                                            <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: '#ccc', fontSize: '1rem', lineHeight: 1.4 }}>
                                                <div style={{ minWidth: '20px', height: '20px', borderRadius: '50%', background: '#007bff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '3px' }}>
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                </div>
                                                In-Field Learning — AI-augmented LBIST/MBIST
                                            </li>
                                        </ul>

                                        <div
                                            onClick={() => setShowDetail(false)} // Toggle back to View 1
                                            className="expertise-detail-btn"
                                        >
                                            <h4 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>AI-Driven.</h4>
                                            <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 400, color: '#aaa', marginTop: '5px' }}>Innovation.</h4>
                                        </div>
                                    </motion.div>
                                </div>
                            )

                        ) : (
                            // Default / Other Cards (Graph & Precision Toggle)
                            <div style={{
                                position: 'relative',
                                width: '100%',
                                maxWidth: (showDetail ? '1200px' : '1000px'), // Adjust width slightly for different layouts
                                transition: 'max-width 0.5s ease',
                                background: (showDetail ? 'transparent' : '#1a1a1a'), // Precision section has its own card bg
                                border: (showDetail ? 'none' : '1px solid #333'),
                                borderRadius: '30px',
                                padding: (showDetail ? '0' : '4rem'),
                                overflow: 'visible' // Allow hover effects to pop out
                            }}>
                                {!showDetail ? (
                                    // 1. Graph Section Content
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem', position: 'relative', zIndex: 2 }}
                                    >
                                        <div style={{ maxWidth: '400px' }}>
                                            <h2 style={{ fontSize: '3.5rem', fontWeight: 700, lineHeight: 1.1, marginBottom: '2rem' }}>
                                                Expertise that<br />scales with<br />every <span style={{ color: '#fff' }}>shrink</span>
                                            </h2>
                                            <p style={{ fontSize: '1.2rem', color: '#aaa', lineHeight: 1.6 }}>
                                                From <span style={{ color: '#00c2ff' }}>180nm to 1.8nm</span>, we deliver across every node.
                                            </p>
                                        </div>

                                        <div
                                            style={{
                                                flex: 1,
                                                minWidth: '300px',
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

                                            <div
                                                onClick={() => setShowDetail(true)}
                                                className="node-expertise-btn"
                                            >
                                                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Scale. <span style={{ color: '#00c2ff' }}>Re-Mastered</span></h3>
                                            </div>
                                        </div>
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
                                            flexWrap: 'wrap',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            gap: '4rem',
                                            width: '100%'
                                        }}
                                    >
                                        <div style={{ flex: 1, minWidth: '350px' }}>
                                            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '2rem', color: '#fff' }}>
                                                Precision in Every<br />
                                                Layer. Innovation<br />
                                                at Every Scale
                                            </h2>
                                            <p style={{ fontSize: '1.4rem', color: '#3b82f6', lineHeight: 1.5, fontWeight: 500 }}>
                                                Full-Chip Placement and Routing. Tuned for<br />
                                                Power, Performance, Area, and Turn-Around-<br />
                                                Time excellence
                                            </p>
                                        </div>

                                        <div style={{
                                            flex: 1,
                                            minWidth: '350px',
                                            background: 'linear-gradient(180deg, #1f1f1f 0%, #111 100%)',
                                            borderRadius: '30px',
                                            padding: '3rem',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            position: 'relative',
                                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                                        }}>
                                            <h3 style={{ fontSize: '2rem', fontWeight: 600, color: '#aaa', marginBottom: '8px' }}>
                                                Silicon Taped-
                                            </h3>
                                            <h3 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#fff', marginBottom: '2rem', lineHeight: 1 }}>
                                                Out
                                            </h3>

                                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: '#ccc', fontSize: '1rem', lineHeight: 1.4 }}>
                                                    <div style={{ minWidth: '20px', height: '20px', borderRadius: '50%', background: '#007bff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '3px' }}>
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                    </div>
                                                    30+ First Pass Silicon with Billion Gates
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

                                            <div
                                                onClick={() => setShowDetail(false)}
                                                style={{
                                                    background: 'rgba(255, 255, 255, 0.05)',
                                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                                    borderRadius: '20px',
                                                    padding: '1.5rem',
                                                    textAlign: 'center',
                                                    cursor: 'pointer',
                                                    transition: '0.2s'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                                                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                                            >
                                                <h4 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>GDSII.</h4>
                                                <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 400, color: '#aaa', marginTop: '5px' }}>Guaranteed</h4>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        )}
                    </motion.section>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Expertise;
