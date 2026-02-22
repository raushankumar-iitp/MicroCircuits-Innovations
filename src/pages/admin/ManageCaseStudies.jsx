import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Search, Plus, ExternalLink, Download } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useUI } from '../../context/UIContext';
import { useNavigate } from 'react-router-dom';

const ManageCaseStudies = () => {
    const { caseStudies, deleteCaseStudy } = useAdmin();
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const filteredStudies = caseStudies.filter(s =>
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const { showConfirm } = useUI();

    const handleDelete = async (id) => {
        const confirmed = await showConfirm('Are you sure you want to delete this case study? This will remove it from the public list immediately.', 'Delete Case Study');
        if (confirmed) {
            await deleteCaseStudy(id);
        }
    };

    return (
        <div style={{ color: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                        Manage <span style={{ color: '#a855f7' }}>Case Studies</span>
                    </h1>
                    <p style={{ color: '#666' }}>Review technical breakthroughs and project stories.</p>
                </div>
                <button
                    onClick={() => navigate('/admin/add-case-study')}
                    style={{
                        padding: '0.8rem 1.5rem',
                        background: 'linear-gradient(90deg, #a855f7 0%, #7c3aed 100%)',
                        border: 'none',
                        borderRadius: '12px',
                        color: '#fff',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer'
                    }}
                >
                    <Plus size={18} /> Publish New
                </button>
            </div>

            <div style={{ position: 'relative', marginBottom: '2rem' }}>
                <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#444' }} size={20} />
                <input
                    type="text"
                    placeholder="Search studies by title or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '1rem 1rem 1rem 3rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                        color: '#fff',
                        outline: 'none'
                    }}
                />
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1.5rem'
            }}>
                {filteredStudies.map((study) => (
                    <motion.div
                        key={study.id || study._id}
                        layout
                        style={{
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            borderRadius: '20px',
                            padding: '1.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}
                    >
                        <div>
                            <span style={{
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                color: '#a855f7',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}>
                                {study.category}
                            </span>
                            <h3 style={{ margin: '0.5rem 0', fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.3 }}>
                                {study.title}
                            </h3>
                            <p style={{ color: '#666', fontSize: '0.85rem', margin: 0 }}>{study.date}</p>
                        </div>

                        <div style={{
                            marginTop: 'auto',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingTop: '1rem',
                            borderTop: '1px solid rgba(255, 255, 255, 0.05)'
                        }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <a
                                    href={study.pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        color: '#aaa',
                                        textDecoration: 'none',
                                        fontSize: '0.85rem'
                                    }}
                                >
                                    <ExternalLink size={14} /> View Doc
                                </a>
                                <a
                                    href={study.pdfUrl}
                                    download={`CaseStudy_${study.title.replace(/\s+/g, '_')}.pdf`}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        color: '#00c2ff',
                                        textDecoration: 'none',
                                        fontSize: '0.85rem'
                                    }}
                                >
                                    <Download size={14} /> Download
                                </a>
                            </div>
                            <button
                                onClick={() => {
                                    const studyId = study.id || study._id;
                                    handleDelete(studyId);
                                }}
                                style={{
                                    padding: '0.5rem',
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    border: '1px solid rgba(239, 68, 68, 0.2)',
                                    borderRadius: '8px',
                                    color: '#ef4444',
                                    cursor: 'pointer'
                                }}
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ManageCaseStudies;
