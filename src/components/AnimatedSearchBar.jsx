import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AnimatedSearchBar = ({ onClose }) => {
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const searchData = [
        { title: "Engineering DFT Design Principles", category: "CaseStudy", pageId: "casestudy" },
        { title: "Voltus AI Insights", category: "CaseStudy", pageId: "casestudy" },
        { title: "China against US EDA Policies", category: "CaseStudy", pageId: "casestudy" },
        { title: "Power, Performance, and PPA", category: "CaseStudy", pageId: "casestudy" },
        { title: "About Us", category: "Page", pageId: "about" },
        { title: "Our Mission & Vision", category: "About", pageId: "about" },
        { title: "Spec To Silicon", category: "About", pageId: "about" },
        { title: "Our Expertise", category: "Page", pageId: "expertise" },
        { title: "Careers & Jobs", category: "Page", pageId: "careers" },
        { title: "Contact Us", category: "Page", pageId: "contact" },
        { title: "Design & Verification", category: "Expertise", pageId: "expertise" },
        { title: "Physical Design", category: "Expertise", pageId: "expertise" },
        { title: "Design For Testability", category: "Expertise", pageId: "expertise" }
    ];

    const results = query
        ? searchData.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        )
        : [];

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActiveIndex(prev => (prev + 1) % results.length);
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActiveIndex(prev => (prev - 1 + results.length) % results.length);
            }
            if (e.key === 'Enter' && results[activeIndex]) {
                handleSelect(results[activeIndex].pageId);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [results, activeIndex, onClose]);

    const handleSelect = (pageId) => {
        let path = '';
        switch (pageId) {
            case 'main': path = '/'; break;
            case 'dv': path = '/expertise?card=dv'; break;
            case 'pd': path = '/expertise?card=pd'; break;
            case 'dft': path = '/expertise?card=dft'; break;
            default: path = `/${pageId}`;
        }
        navigate(path);
        onClose();
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0,0,0,0.9)',
                backdropFilter: 'blur(20px)',
                zIndex: 10000,
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '15vh'
            }}
            onClick={onClose}
        >
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{
                    width: '90%',
                    maxWidth: '600px',
                    height: 'fit-content'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{
                    background: 'rgba(30,30,30,0.8)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '20px',
                        borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <Search size={20} color="#00c2ff" style={{ marginRight: '15px' }} />
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search MicroCircuits..."
                            value={query}
                            onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); }}
                            style={{
                                flex: 1,
                                background: 'transparent',
                                border: 'none',
                                color: '#fff',
                                fontSize: '1.1rem',
                                outline: 'none'
                            }}
                        />
                        <button
                            onClick={onClose}
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '32px',
                                height: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: '#999',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => { e.target.style.background = 'rgba(255,255,255,0.1)'; e.target.style.color = '#fff'; }}
                            onMouseLeave={(e) => { e.target.style.background = 'rgba(255,255,255,0.05)'; e.target.style.color = '#999'; }}
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {results.length > 0 ? (
                            results.map((item, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => handleSelect(item.pageId)}
                                    style={{
                                        padding: '15px 20px',
                                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                                        background: idx === activeIndex ? 'rgba(0, 194, 255, 0.1)' : 'transparent',
                                        cursor: 'pointer',
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseEnter={() => setActiveIndex(idx)}
                                >
                                    <div style={{ fontSize: '0.7rem', color: '#00c2ff', textTransform: 'uppercase', marginBottom: '4px' }}>
                                        {item.category}
                                    </div>
                                    <div style={{ color: '#fff', fontSize: '0.95rem' }}>
                                        {item.title}
                                    </div>
                                </div>
                            ))
                        ) : query && (
                            <div style={{ padding: '30px', textAlign: 'center', color: '#666' }}>
                                No results found for "{query}"
                            </div>
                        )}
                    </div>
                </div>

                <div style={{
                    marginTop: '15px',
                    display: 'flex',
                    gap: '15px',
                    justifyContent: 'center',
                    color: '#444',
                    fontSize: '0.75rem'
                }}>
                    <span><kbd style={{ background: '#222', padding: '2px 4px', borderRadius: '4px', border: '1px solid #333' }}>ESC</kbd> to close</span>
                    <span><kbd style={{ background: '#222', padding: '2px 4px', borderRadius: '4px', border: '1px solid #333' }}>↵</kbd> to select</span>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AnimatedSearchBar;