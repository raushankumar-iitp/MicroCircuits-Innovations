import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, X, ArrowRight } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

// Comprehensive Search Database matching user snippet
const staticPages = [
    { title: "Engineering DFT Design Principles", category: "CaseStudy", pageId: "/casestudy", keywords: "dft soc chip principles" },
    { title: "Voltus AI Insights", category: "CaseStudy", pageId: "/casestudy", keywords: "voltus ai power" },
    { title: "China against US EDA Policies", category: "CaseStudy", pageId: "/casestudy", keywords: "china us eda trade" },
    { title: "Power, Performance, and PPA", category: "CaseStudy", pageId: "/casestudy", keywords: "ppa power performance" },
    { title: "About Us", category: "Page", pageId: "/about", keywords: "company profile who we are" },
    { title: "Our Mission & Vision", category: "About", pageId: "/about", keywords: "goals future mission" },
    { title: "Spec To Silicon", category: "About", pageId: "/about", keywords: "flow timeline silicon" },
    { title: "Our Expertise", category: "Page", pageId: "/expertise", keywords: "skills technology nodes" },
    { title: "Careers & Jobs", category: "Page", pageId: "/careers", keywords: "hiring vacancies positions" },
    { title: "Contact Us", category: "Page", pageId: "/contact", keywords: "email office location help" },
    { title: "Design & Verification", category: "Expertise", pageId: "/expertise?card=dv", keywords: "rtl uvm simulation" },
    { title: "Physical Design", category: "Expertise", pageId: "/expertise?card=pd", keywords: "pnr layout tapeout" },
    { title: "Design For Testability", category: "Expertise", pageId: "/expertise?card=dft", keywords: "scan atpg mbist" }
];

const Search = ({ isOpen, onClose }) => {
    const { vacancies, caseStudies } = useAdmin();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();
    const inputRef = useRef(null);

    // Dynamic search data combining static links and live content
    const searchData = useMemo(() => {
        const dynamicCaseStudies = (caseStudies || []).map(s => ({
            title: s.title,
            category: "Live Case Study",
            pageId: "/casestudy",
            keywords: s.description || ""
        }));

        const dynamicVacancies = (vacancies || []).map(v => ({
            title: v.title,
            category: "Job Opening",
            pageId: "/careers",
            keywords: v.description || ""
        }));

        return [...staticPages, ...dynamicCaseStudies, ...dynamicVacancies];
    }, [vacancies, caseStudies]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        const q = query.toLowerCase().trim();
        if (!q) {
            setResults([]);
            return;
        }

        const matches = searchData.filter(item =>
            item.title.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q) ||
            (item.keywords && item.keywords.toLowerCase().includes(q))
        );
        setResults(matches);
    }, [query, searchData]);

    const handleResultClick = (pageId) => {
        if (!pageId) return;

        // Ensure standard routing
        console.log(`Navigating to: ${pageId}`);
        navigate(pageId);
        onClose();
        setQuery('');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.95)',
                        backdropFilter: 'blur(15px)',
                        zIndex: 2500,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        paddingTop: '12vh',
                        pointerEvents: 'auto'
                    }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 30 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        style={{
                            width: '90%',
                            maxWidth: '750px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem',
                            pointerEvents: 'auto'
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Search Input Box */}
                        <div style={{ position: 'relative' }}>
                            <SearchIcon
                                size={22}
                                color="#00c2ff"
                                style={{ position: 'absolute', left: '25px', top: '50%', transform: 'translateY(-50%)', opacity: 0.8 }}
                            />
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && results.length > 0) {
                                        handleResultClick(results[0].pageId);
                                    }
                                    if (e.key === 'Escape') onClose();
                                }}
                                style={{
                                    width: '100%',
                                    background: 'rgba(255, 255, 255, 0.08)',
                                    border: '1px solid rgba(0, 194, 255, 0.4)',
                                    borderRadius: '50px',
                                    padding: '1.3rem 1.3rem 1.3rem 4rem',
                                    color: '#fff',
                                    fontSize: '1.25rem',
                                    outline: 'none',
                                    boxShadow: '0 0 30px rgba(0, 194, 255, 0.15)',
                                    fontFamily: 'inherit',
                                    transition: 'all 0.3s ease'
                                }}
                            />
                            <button
                                onClick={onClose}
                                style={{
                                    position: 'absolute',
                                    right: '25px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: 'none',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    color: '#888',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Search Results Display Area */}
                        <div style={{
                            maxHeight: '60vh',
                            overflowY: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.6rem',
                            paddingRight: '10px'
                        }} className="search-scrollbar">
                            {query.trim() ? (
                                results.length > 0 ? (
                                    results.map((item, index) => (
                                        <motion.div
                                            key={`${item.title}-${index}`}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.03 }}
                                            onClick={() => handleResultClick(item.pageId)}
                                            style={{
                                                padding: '1.2rem 1.8rem',
                                                background: 'rgba(255, 255, 255, 0.04)',
                                                borderRadius: '20px',
                                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
                                            }}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.background = 'rgba(0, 194, 255, 0.15)';
                                                e.currentTarget.style.borderColor = 'rgba(0, 194, 255, 0.4)';
                                                e.currentTarget.style.transform = 'scale(1.02)';
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                                                e.currentTarget.style.transform = 'scale(1)';
                                            }}
                                        >
                                            <div style={{ flex: 1 }}>
                                                <div style={{ color: '#00c2ff', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                                                    {item.category}
                                                </div>
                                                <div style={{ color: '#fff', fontSize: '1.15rem', fontWeight: 600 }}>
                                                    {item.title}
                                                </div>
                                            </div>
                                            <div style={{
                                                width: '36px',
                                                height: '36px',
                                                borderRadius: '50%',
                                                background: 'rgba(0, 194, 255, 0.1)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <ArrowRight size={18} color="#00c2ff" />
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div style={{ textAlign: 'center', color: '#666', padding: '3rem', fontSize: '1.1rem' }}>
                                        No results found for <span style={{ color: '#00c2ff' }}>"{query}"</span>
                                    </div>
                                )
                            ) : (
                                <div style={{ textAlign: 'center', color: '#444', padding: '3rem', fontSize: '1rem' }}>
                                    Search...
                                </div>
                            )}
                        </div>
                    </motion.div>

                    <style>
                        {`
                        .search-scrollbar::-webkit-scrollbar { width: 6px; }
                        .search-scrollbar::-webkit-scrollbar-track { background: transparent; }
                        .search-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 194, 255, 0.2); borderRadius: 10px; }
                        .search-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0, 194, 255, 0.4); }
                        `}
                    </style>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Search;
