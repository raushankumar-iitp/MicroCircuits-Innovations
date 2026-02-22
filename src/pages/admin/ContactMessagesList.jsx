import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Calendar, Trash2, Search, User, UserCheck, ExternalLink, Check, X } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useUI } from '../../context/UIContext';

const ContactMessagesList = () => {
    const { contactMessages, deleteContactMessage, updateContactMessage } = useAdmin();
    const [searchTerm, setSearchTerm] = useState('');
    const [showProcessed, setShowProcessed] = useState(false);

    const filteredMessages = contactMessages.filter(msg => {
        const matchesSearch = msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            msg.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            msg.message.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = showProcessed ? msg.processed : !msg.processed;
        return matchesSearch && matchesStatus;
    });

    const { showConfirm } = useUI();

    const handleDelete = async (id) => {
        const confirmed = await showConfirm('Are you sure you want to delete this message? This action cannot be undone.', 'Delete Message');
        if (confirmed) {
            await deleteContactMessage(id);
        }
    };

    const handleComplete = async (id) => {
        await updateContactMessage(id, { processed: true });
    };

    return (
        <div style={{ color: '#fff' }}>
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                    System <span style={{ color: '#FFD700' }}>Inquiries</span>
                </h1>
                <p style={{ color: '#666' }}>Manage communications and client requests.</p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.2rem' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#444' }} size={20} />
                    <input
                        type="text"
                        placeholder="Search messages..."
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
                        background: showProcessed ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 215, 0, 0.3)',
                        color: showProcessed ? '#FFD700' : '#666',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {showProcessed ? 'View Active' : 'View Completed'}
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.5rem' }}>
                {filteredMessages.length === 0 ? (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '5rem', color: '#444' }}>
                        No inquiries found.
                    </div>
                ) : (
                    filteredMessages.map((msg) => (
                        <motion.div
                            key={msg.id || msg._id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{
                                background: 'rgba(255, 255, 255, 0.02)',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                borderRadius: '20px',
                                padding: '1.8rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.2rem',
                                position: 'relative'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '12px',
                                        background: 'rgba(255, 215, 0, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#FFD700',
                                        border: '1px solid rgba(255, 215, 0, 0.2)'
                                    }}>
                                        <UserCheck size={20} />
                                    </div>
                                    <div>
                                        <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>{msg.name}</h4>
                                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>{msg.email}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    {!msg.processed && (
                                        <button
                                            onClick={() => handleComplete(msg.id || msg._id)}
                                            style={{
                                                padding: '0.5rem',
                                                background: 'rgba(34, 197, 94, 0.05)',
                                                border: '1px solid rgba(34, 197, 94, 0.1)',
                                                borderRadius: '8px',
                                                color: '#22c55e',
                                                cursor: 'pointer'
                                            }}
                                            title="Mark as Completed"
                                        >
                                            <Check size={16} />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => {
                                            const msgId = msg.id || msg._id;
                                            handleDelete(msgId);
                                        }}
                                        style={{
                                            padding: '0.5rem',
                                            background: 'rgba(239, 68, 68, 0.05)',
                                            border: '1px solid rgba(239, 68, 68, 0.1)',
                                            borderRadius: '8px',
                                            color: '#ef4444',
                                            cursor: 'pointer'
                                        }}
                                        title="Delete Message"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>

                            <div style={{
                                padding: '1.2rem',
                                background: 'rgba(255,255,255,0.02)',
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.03)',
                                fontSize: '0.95rem',
                                color: '#eee',
                                lineHeight: 1.6
                            }}>
                                <div style={{
                                    fontWeight: 700,
                                    color: '#FFD700',
                                    marginBottom: '0.5rem',
                                    fontSize: '0.8rem',
                                    textTransform: 'uppercase'
                                }}>
                                    Message Scope:
                                </div>
                                {msg.message}
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                color: '#444',
                                fontSize: '0.8rem'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Calendar size={12} />
                                    {msg.date || 'Jan 22, 2026'}
                                </div>
                                <a
                                    href={`mailto:${msg.email}?subject=Re: Inquiry from MIPL Matrix&body=Hello ${msg.name},%0D%0A%0D%0ARegarding your message: "${msg.message}"%0D%0A%0D%0A`}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        color: '#00c2ff',
                                        textDecoration: 'none',
                                        cursor: 'pointer',
                                        transition: 'opacity 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                                >
                                    <Mail size={12} />
                                    Reply via Email
                                </a>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ContactMessagesList;
