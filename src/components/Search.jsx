import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, X, ArrowRight } from 'lucide-react';

const searchData = [
    { title: "Engineering DFT Design Principles", category: "CaseStudy", pageId: "/casestudy" },
    { title: "Voltus AI Insights", category: "CaseStudy", pageId: "/casestudy" },
    { title: "China against US EDA Policies", category: "CaseStudy", pageId: "/casestudy" },
    { title: "Power, Performance, and PPA", category: "CaseStudy", pageId: "/casestudy" },
    { title: "About Us", category: "Page", pageId: "/about" },
    { title: "Our Mission & Vision", category: "About", pageId: "/about" },
    { title: "Spec To Silicon", category: "About", pageId: "/about" },
    { title: "Our Expertise", category: "Page", pageId: "/expertise" },
    { title: "Careers & Jobs", category: "Page", pageId: "/careers" },
    { title: "Contact Us", category: "Page", pageId: "/contact" },
    { title: "Design & Verification", category: "Expertise", pageId: "/expertise" },
    { title: "Physical Design", category: "Expertise", pageId: "/expertise" },
    { title: "Design For Testability", category: "Expertise", pageId: "/expertise" }
];

const Search = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const q = query.toLowerCase().trim();
        const matches = searchData.filter(item =>
            item.title.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q)
        );
        setResults(matches);
    }, [query]);

    const handleResultClick = (pageId) => {
        navigate(pageId);
        onClose();
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
                        backdropFilter: 'blur(10px)',
                        zIndex: 2000,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        paddingTop: 'clamp(5rem, 15vh, 10rem)',
                        paddingLeft: '1rem',
                        paddingRight: '1rem'
                    }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            width: '100%',
                            maxWidth: 'min(700px, 95vw)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'clamp(1rem, 5vh, 2rem)'
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Search Input Container */}
                        <div style={{ position: 'relative' }}>
                            <SearchIcon
                                size={24}
                                color="#00c2ff"
                                style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', opacity: 0.7 }}
                            />
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search Case studies, Expertise, Pages..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                style={{
                                    width: '100%',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(0, 194, 255, 0.3)',
                                    borderRadius: '30px',
                                    padding: '1.2rem 1.2rem 1.2rem 3.5rem',
                                    color: '#fff',
                                    fontSize: '1.2rem',
                                    outline: 'none',
                                    boxShadow: '0 0 20px rgba(0, 194, 255, 0.1)',
                                    fontFamily: 'inherit'
                                }}
                            />
                            <button
                                onClick={onClose}
                                style={{
                                    position: 'absolute',
                                    right: '20px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#888'
                                }}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Results Area */}
                        <div style={{
                            maxHeight: '50vh',
                            overflowY: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.8rem',
                            padding: '0.5rem'
                        }} className="custom-scrollbar">
                            {query.trim() && results.length > 0 ? (
                                results.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => handleResultClick(item.pageId)}
                                        style={{
                                            padding: '1rem 1.5rem',
                                            background: 'rgba(255, 255, 255, 0.03)',
                                            borderRadius: '15px',
                                            border: '1px solid rgba(255, 255, 255, 0.05)',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.background = 'rgba(0, 194, 255, 0.1)';
                                            e.currentTarget.style.borderColor = 'rgba(0, 194, 255, 0.3)';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                                        }}
                                    >
                                        <div>
                                            <div style={{ color: '#00c2ff', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
                                                {item.category}
                                            </div>
                                            <div style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 500 }}>
                                                {item.title}
                                            </div>
                                        </div>
                                        <ArrowRight size={18} color="#00c2ff" />
                                    </motion.div>
                                ))
                            ) : query.trim() ? (
                                <div style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
                                    No results found for "{query}"
                                </div>
                            ) : null}
                        </div>
                    </motion.div>

                    <style>
                        {`
                        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 194, 255, 0.2); borderRadius: 10px; }
                        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0, 194, 255, 0.4); }
                        `}
                    </style>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Search;
