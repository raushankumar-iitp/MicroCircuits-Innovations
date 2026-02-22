import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Briefcase, Calendar, Trash2, Search, Download, Check, X } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useUI } from '../../context/UIContext';

const ApplicationsList = () => {
    const { applications, deleteApplication, updateApplication } = useAdmin();
    const [searchTerm, setSearchTerm] = useState('');
    const [showProcessed, setShowProcessed] = useState(false);

    const filteredApps = applications.filter(app => {
        const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = showProcessed ? app.processed : !app.processed;
        return matchesSearch && matchesStatus;
    });

    const { showConfirm } = useUI();

    const handleDelete = async (id) => {
        const confirmed = await showConfirm('Are you sure you want to delete this application? This action cannot be undone.', 'Delete Application');
        if (confirmed) {
            await deleteApplication(id);
        }
    };

    const handleComplete = async (id) => {
        await updateApplication(id, { processed: true });
    };

    return (
        <div style={{ color: '#fff' }}>
            <style>
                {`
                @media (max-width: 768px) {
                    .application-item {
                        display: flex !important;
                        flex-direction: column !important;
                        align-items: flex-start !important;
                        gap: 1rem !important;
                    }
                    .application-item > div {
                        width: 100%;
                        justify-content: flex-start !important;
                    }
                }
                `}
            </style>
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 800, marginBottom: '0.5rem' }}>
                    Job <span style={{ color: '#00c2ff' }}>Applications</span>
                </h1>
                <p style={{ color: '#666', fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>Review candidate profiles and technical backgrounds.</p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#444' }} size={20} />
                    <input
                        type="text"
                        placeholder="Search by name, email or job title..."
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
                <button
                    onClick={() => setShowProcessed(!showProcessed)}
                    style={{
                        padding: '0 1.5rem',
                        borderRadius: '12px',
                        background: showProcessed ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(168, 85, 247, 0.3)',
                        color: showProcessed ? '#a855f7' : '#666',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {showProcessed ? 'View Active' : 'View Completed'}
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredApps.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '5rem', color: '#444' }}>
                        No applications found.
                    </div>
                ) : (
                    filteredApps.map((app) => (
                        <motion.div
                            key={app.id || app._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="application-item"
                            style={{
                                background: 'rgba(255, 255, 255, 0.02)',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                alignItems: 'center',
                                gap: '1rem'
                            }}
                        >
                            <div style={{ fontWeight: 600 }}>{app.name}</div>
                            <div style={{ color: '#888', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                                <Mail size={14} /> {app.email}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#00c2ff' }}>
                                <Briefcase size={14} /> {app.jobTitle}
                            </div>
                            <div style={{ color: '#555', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                                <Calendar size={14} /> {app.date || 'Today'}
                            </div>
                            <div style={{ display: 'flex', gap: '0.6rem' }}>
                                {!app.processed && (
                                    <button
                                        onClick={() => handleComplete(app.id || app._id)}
                                        style={smallIconButtonStyle('#22c55e')}
                                        title="Mark as Completed"
                                    >
                                        <Check size={18} />
                                    </button>
                                )}
                                {app.resumeUrl && (
                                    <a
                                        href={app.resumeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={smallIconButtonStyle('#00c2ff')}
                                        title="View Resume"
                                    >
                                        <Download size={16} />
                                    </a>
                                )}
                                <button
                                    onClick={() => handleDelete(app.id || app._id)}
                                    style={smallIconButtonStyle('#ef4444')}
                                    title="Delete Application"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

const smallIconButtonStyle = (color) => ({
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: `${color}10`,
    border: `1px solid ${color}20`,
    color: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
});

export default ApplicationsList;
