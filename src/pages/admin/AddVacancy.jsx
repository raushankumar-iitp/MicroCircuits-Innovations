import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Send, UploadCloud, FileText, X } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { supabase } from '../../lib/supabase';

const AddVacancy = () => {
    const [formData, setFormData] = useState({
        title: '',
        exp: '',
        location: '',
        description: '',
        pdfUrl: ''
    });

    const [pdfFile, setPdfFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const { addVacancy } = useAdmin();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            if (file.type === 'application/pdf') {
                setPdfFile(file);
                setMessage({ type: '', text: '' });
            } else {
                setMessage({ type: 'error', text: 'Please select a valid PDF file.' });
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ type: '', text: '' });

        try {
            if (!supabase) {
                console.error("Supabase client is null. Check environment variables.");
                throw new Error("Supabase client is not initialized. Please check your .env configuration.");
            }

            let finalPdfUrl = formData.pdfUrl;

            // Handle PDF Upload to Supabase Storage
            if (pdfFile) {
                // Generate a unique file name
                const fileName = `${Date.now()}_${pdfFile.name.replace(/\s+/g, '-')}`;

                // Upload to Supabase bucket 'case-studies'
                const { data, error: uploadError } = await supabase.storage
                    .from('case-studies') // Using existing bucket
                    .upload(fileName, pdfFile, {
                        cacheControl: '3600',
                        upsert: false
                    });

                if (uploadError) throw uploadError;

                // Get the Public URL
                const { data: { publicUrl } } = supabase.storage
                    .from('case-studies')
                    .getPublicUrl(fileName);

                finalPdfUrl = publicUrl;
            }

            const submissionData = {
                ...formData,
                pdfUrl: finalPdfUrl,
                postedAt: new Date().toISOString()
            };

            await addVacancy(submissionData);
            setMessage({ type: 'success', text: 'Job opportunity posted successfully!' });
            setFormData({ title: '', exp: '', location: '', description: '', pdfUrl: '' });
            setPdfFile(null);
            setTimeout(() => navigate('/admin/dashboard'), 2000);
        } catch (error) {
            console.error("Submit Error:", error);
            setMessage({ type: 'error', text: `Failed to post: ${error.message || 'Unknown error'}` });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ maxWidth: '900px' }}>
            <div style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <button
                    onClick={() => navigate('/admin/dashboard')}
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer' }}
                >
                    <ChevronLeft size={20} />
                </button>
                <div>
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-1.5px' }}>
                        Post <span style={{ color: '#00c2ff' }}>New Vacancy</span>
                    </h1>
                    <p style={{ color: '#666', fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)' }}>Recruit technical excellence for the future of semiconductor design.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} style={{
                background: 'rgba(15, 15, 15, 0.4)',
                padding: 'clamp(1.5rem, 5vw, 3rem)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem'
            }}>
                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Opportunity Title</label>
                    <input
                        type="text"
                        placeholder="e.g. Senior Analog Design Lead"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        style={inputStyle}
                    />
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem'
                }}>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Experience Commitment</label>
                        <input
                            type="text"
                            placeholder="e.g. 8-12 Years"
                            value={formData.exp}
                            onChange={(e) => setFormData({ ...formData, exp: e.target.value })}
                            style={inputStyle}
                        />
                    </div>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Primary Location</label>
                        <input
                            type="text"
                            placeholder="e.g. Bangalore | Remote"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            style={inputStyle}
                        />
                    </div>
                </div>

                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Role Scope & Requirements</label>
                    <textarea
                        placeholder="Detail the technical responsibilities and candidate profile expectations..."
                        rows={6}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        style={{ ...inputStyle, resize: 'vertical' }}
                    />
                </div>

                {/* PDF UPLOAD SECTION */}
                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Detailed Job Description (PDF - Optional)</label>
                    <input
                        type="file"
                        accept="application/pdf"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />

                    {!pdfFile ? (
                        <div
                            onClick={() => fileInputRef.current.click()}
                            style={{
                                border: '2px dashed rgba(255, 255, 255, 0.1)',
                                borderRadius: '16px',
                                padding: '2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                background: 'rgba(255, 255, 255, 0.01)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#00c2ff';
                                e.currentTarget.style.background = 'rgba(0, 194, 255, 0.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.01)';
                            }}
                        >
                            <div style={{
                                width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0, 194, 255, 0.1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.8rem', color: '#00c2ff'
                            }}>
                                <UploadCloud size={20} />
                            </div>
                            <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>Attach detailed JD (PDF)</p>
                        </div>
                    ) : (
                        <div style={{
                            background: 'rgba(34, 197, 94, 0.05)',
                            border: '1px solid rgba(34, 197, 94, 0.2)',
                            borderRadius: '16px',
                            padding: '1rem 1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ background: 'rgba(34, 197, 94, 0.1)', padding: '8px', borderRadius: '8px', color: '#22c55e' }}>
                                    <FileText size={20} />
                                </div>
                                <p style={{ fontWeight: 600, color: '#fff', fontSize: '0.9rem' }}>{pdfFile.name}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setPdfFile(null)}
                                style={{ background: 'transparent', border: 'none', color: '#666', cursor: 'pointer' }}
                            >
                                <X size={18} />
                            </button>
                        </div>
                    )}
                </div>

                {message.text && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                            padding: '1rem',
                            borderRadius: '12px',
                            background: message.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                            border: `1px solid ${message.type === 'success' ? '#22c55e' : '#ef4444'}`,
                            color: message.type === 'success' ? '#22c55e' : '#ef4444',
                            textAlign: 'center',
                            fontWeight: 600
                        }}
                    >
                        {message.text}
                    </motion.div>
                )}

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button
                        type="button"
                        onClick={() => navigate('/admin/dashboard')}
                        style={{
                            padding: '1.2rem 2rem',
                            background: 'transparent',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            color: '#aaa',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                            flex: 1,
                            padding: '1.2rem',
                            background: isSubmitting ? '#222' : 'linear-gradient(90deg, #00c2ff 0%, #007bff 100%)',
                            border: 'none',
                            borderRadius: '12px',
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: '1rem',
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 10px 30px rgba(0, 194, 255, 0.2)'
                        }}
                    >
                        <Send size={20} />
                        {isSubmitting ? 'Posting Opportunity...' : 'Open Vacancy'}
                    </button>
                </div>
            </form>
        </div>
    );
};

const inputGroupStyle = { display: 'flex', flexDirection: 'column', gap: '0.6rem' };
const labelStyle = { color: '#aaa', fontSize: '0.9rem', fontWeight: 500, marginLeft: '4px' };
const inputStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '1rem 1.2rem',
    color: '#fff',
    fontSize: '1rem',
    outline: 'none',
    width: '100%',
    fontFamily: 'inherit'
};

export default AddVacancy;
