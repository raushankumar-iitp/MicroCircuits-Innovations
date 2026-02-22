import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Trash2, Search, Plus, X, FileText } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useUI } from '../../context/UIContext';
import { useNavigate } from 'react-router-dom';

const ManageVacancies = () => {
    const { vacancies, updateVacancy, deleteVacancy } = useAdmin();
    const [searchTerm, setSearchTerm] = useState('');
    const [editingVacancy, setEditingVacancy] = useState(null);
    const navigate = useNavigate();

    const filteredVacancies = vacancies.filter(v =>
        v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const { showConfirm } = useUI();

    const handleDelete = async (id) => {
        const confirmed = await showConfirm('Are you sure you want to delete this vacancy? This will remove it from the Careers page immediately.', 'Delete Vacancy');
        if (confirmed) {
            await deleteVacancy(id);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        await updateVacancy(editingVacancy.id || editingVacancy._id, editingVacancy);
        setEditingVacancy(null);
    };

    return (
        <div style={{ color: '#fff' }}>
            <style>
                {`
                @media (max-width: 768px) {
                    .vacancy-header {
                        flex-direction: column;
                        align-items: flex-start !important;
                        gap: 1rem;
                    }
                    .vacancy-item {
                        flex-direction: column;
                        align-items: flex-start !important;
                        gap: 1rem;
                    }
                    .vacancy-meta {
                        flex-wrap: wrap;
                        gap: 1rem !important;
                    }
                    .vacancy-title {
                        font-size: 1.5rem !important;
                    }
                }
                `}
            </style>
            <div className="vacancy-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 className="vacancy-title" style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 800, marginBottom: '0.5rem' }}>
                        Manage <span style={{ color: '#00c2ff' }}>Vacancies</span>
                    </h1>
                    <p style={{ color: '#666', fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>Review, update, or remove job opportunities.</p>
                </div>
                <button
                    onClick={() => navigate('/admin/add-vacancy')}
                    style={{
                        padding: '0.8rem 1.5rem',
                        background: 'linear-gradient(90deg, #00c2ff 0%, #007bff 100%)',
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
                    <Plus size={18} /> Add New
                </button>
            </div>

            <div style={{ position: 'relative', marginBottom: '2rem' }}>
                <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#444' }} size={20} />
                <input
                    type="text"
                    placeholder="Search vacancies by title or location..."
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

            <div style={{ display: 'grid', gap: '1rem' }}>
                {filteredVacancies.map((vacancy) => (
                    <motion.div
                        key={vacancy.id || vacancy._id}
                        layout
                        className="vacancy-item"
                        style={{
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '1rem',
                            width: '100%'
                        }}
                    >
                        <div>
                            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', fontWeight: 600 }}>{vacancy.title}</h3>
                            <div className="vacancy-meta" style={{ display: 'flex', gap: '1.5rem', color: '#666', fontSize: '0.9rem' }}>
                                <span>{vacancy.location}</span>
                                <span>{vacancy.exp}</span>
                                <span>{vacancy.date}</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.8rem' }}>
                            {vacancy.pdfUrl && (
                                <a
                                    href={vacancy.pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={actionButtonStyle('#a855f7')}
                                    title="View Detailed JD"
                                >
                                    <FileText size={18} />
                                </a>
                            )}
                            <button
                                onClick={() => setEditingVacancy(vacancy)}
                                style={actionButtonStyle('#00c2ff')}
                            >
                                <Edit2 size={18} />
                            </button>
                            <button
                                onClick={() => handleDelete(vacancy.id || vacancy._id)}
                                style={actionButtonStyle('#ef4444')}
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Edit Modal */}
            <AnimatePresence>
                {editingVacancy && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={modalOverlayStyle}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            style={modalContentStyle}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Edit Vacancy</h2>
                                <button onClick={() => setEditingVacancy(null)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={inputGroupStyle}>
                                    <label style={labelStyle}>Title</label>
                                    <input
                                        type="text"
                                        value={editingVacancy.title}
                                        onChange={(e) => setEditingVacancy({ ...editingVacancy, title: e.target.value })}
                                        style={inputStyle}
                                    />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div style={inputGroupStyle}>
                                        <label style={labelStyle}>Experience</label>
                                        <input
                                            type="text"
                                            value={editingVacancy.exp}
                                            onChange={(e) => setEditingVacancy({ ...editingVacancy, exp: e.target.value })}
                                            style={inputStyle}
                                        />
                                    </div>
                                    <div style={inputGroupStyle}>
                                        <label style={labelStyle}>Location</label>
                                        <input
                                            type="text"
                                            value={editingVacancy.location}
                                            onChange={(e) => setEditingVacancy({ ...editingVacancy, location: e.target.value })}
                                            style={inputStyle}
                                        />
                                    </div>
                                </div>
                                <div style={inputGroupStyle}>
                                    <label style={labelStyle}>Description</label>
                                    <textarea
                                        rows={5}
                                        value={editingVacancy.description}
                                        onChange={(e) => setEditingVacancy({ ...editingVacancy, description: e.target.value })}
                                        style={inputStyle}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    style={{
                                        padding: '1rem',
                                        background: '#00c2ff',
                                        border: 'none',
                                        borderRadius: '12px',
                                        color: '#000',
                                        fontWeight: 700,
                                        marginTop: '1rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Save Changes
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const actionButtonStyle = (color) => ({
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: `${color}10`,
    border: `1px solid ${color}30`,
    color: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
});

const modalOverlayStyle = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '2rem'
};

const modalContentStyle = {
    background: '#0a0a0a',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '24px',
    width: '100%',
    maxWidth: 'min(600px, 95vw)',
    padding: 'clamp(1.5rem, 5vw, 2.5rem)',
    maxHeight: '90vh',
    overflowY: 'auto'
};

const inputGroupStyle = { display: 'flex', flexDirection: 'column', gap: '0.6rem' };
const labelStyle = { color: '#666', fontSize: '0.85rem', fontWeight: 600, marginLeft: '4px' };
const inputStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '0.8rem 1rem',
    color: '#fff',
    outline: 'none',
    width: '100%',
    fontFamily: 'inherit'
};

export default ManageVacancies;
