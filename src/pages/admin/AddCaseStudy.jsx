import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Save, UploadCloud, FileText, X } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { supabase } from '../../lib/supabase'; // Import Supabase client

const AddCaseStudy = () => {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        pdfUrl: ''
    });

    // State for the file itself
    const [pdfFile, setPdfFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const { addCaseStudy } = useAdmin();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // Handle File Selection
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

            // 1. If a file is selected, upload it to Supabase Storage
            if (pdfFile) {
                // Generate a unique file name
                const fileName = `${Date.now()}_${pdfFile.name.replace(/\s+/g, '-')}`;

                // Upload to Supabase bucket 'case-studies'
                const { data, error: uploadError } = await supabase.storage
                    .from('case-studies') // Make sure this bucket exists in Supabase
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
            } else if (!finalPdfUrl) {
                // If no file AND no URL provided
                // throw new Error("Please upload a PDF document.");
                console.log("No PDF attached, proceeding without it.");
            }

            // 2. Prepare the final data object
            const submissionData = {
                ...formData,
                pdfUrl: finalPdfUrl, // Save the generated Supabase link
                date: new Date().toISOString()
            };

            // 3. Save to Firestore Database (via AdminContext)
            await addCaseStudy(submissionData);

            setMessage({ type: 'success', text: 'Case study published successfully!' });

            // Reset form
            setFormData({ title: '', category: '', description: '', pdfUrl: '' });
            setPdfFile(null);

            setTimeout(() => navigate('/admin/dashboard'), 2000);

        } catch (error) {
            console.error("Submit Error:", error);
            setMessage({ type: 'error', text: `Failed: ${error.message || 'Unknown error'}` });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', color: '#fff', paddingBottom: '100px' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'clamp(1.5rem, 5vh, 2rem)', gap: '1rem' }}>
                <button
                    onClick={() => navigate('/admin/dashboard')}
                    style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer' }}
                >
                    <ChevronLeft size={20} />
                </button>
                <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700 }}>Publish Case Study</h1>
            </div>

            {/* Notification Message */}
            {message.text && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        padding: '1rem',
                        borderRadius: '12px',
                        marginBottom: '2rem',
                        background: message.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                        border: message.type === 'error' ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid rgba(34, 197, 94, 0.2)',
                        color: message.type === 'error' ? '#ef4444' : '#22c55e',
                        textAlign: 'center'
                    }}
                >
                    {message.text}
                </motion.div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '2rem' }}>

                {/* --- DETAILS SECTION --- */}
                <div style={{ background: '#111', padding: 'clamp(1.5rem, 5vw, 2rem)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '4px', height: '20px', background: '#00c2ff', borderRadius: '2px' }}></div>
                        Study Details
                    </h3>

                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Case Study Title</label>
                            <input
                                type="text"
                                placeholder="e.g. 5nm Automotive SoC Success"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                style={inputStyle}
                            />
                        </div>

                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Category / Industry</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                style={inputStyle}
                            >
                                <option value="" disabled>Select Category</option>
                                <option value="Automotive">Automotive</option>
                                <option value="HPC">HPC (High Performance Computing)</option>
                                <option value="AI/ML">AI / Machine Learning</option>
                                <option value="IoT">IoT & Edge</option>
                                <option value="Consumer">Consumer Electronics</option>
                            </select>
                        </div>

                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Executive Summary</label>
                            <textarea
                                rows="5"
                                placeholder="Brief overview of the challenge and solution..."
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                style={{ ...inputStyle, resize: 'vertical' }}
                            />
                        </div>
                    </div>
                </div>

                {/* --- PDF UPLOAD SECTION (SUPABASE) --- */}
                <div style={{ background: '#111', padding: 'clamp(1.5rem, 5vw, 2rem)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '4px', height: '20px', background: '#a855f7', borderRadius: '2px' }}></div>
                        Documentation
                    </h3>

                    {/* Hidden Native Input */}
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
                                padding: 'clamp(2rem, 6vw, 3rem)',
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
                                width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(0, 194, 255, 0.1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: '#00c2ff'
                            }}>
                                <UploadCloud size={28} />
                            </div>
                            <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff', marginBottom: '0.5rem' }}>Click to upload PDF</p>
                            <p style={{ color: '#666', fontSize: '0.9rem' }}>Max file size: 10MB (Supabase)</p>
                        </div>
                    ) : (
                        <div style={{
                            background: 'rgba(34, 197, 94, 0.05)',
                            border: '1px solid rgba(34, 197, 94, 0.2)',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ background: 'rgba(34, 197, 94, 0.1)', padding: '10px', borderRadius: '8px', color: '#22c55e' }}>
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <p style={{ fontWeight: 600, color: '#fff' }}>{pdfFile.name}</p>
                                    <p style={{ fontSize: '0.85rem', color: '#22c55e' }}>Ready to upload</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setPdfFile(null)}
                                style={{ background: 'transparent', border: 'none', color: '#666', cursor: 'pointer' }}
                            >
                                <X size={20} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                            padding: '1rem 3rem',
                            background: isSubmitting ? '#222' : 'linear-gradient(90deg, #a855f7 0%, #7c3aed 100%)',
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
                            boxShadow: '0 10px 30px rgba(168, 85, 247, 0.2)'
                        }}
                    >
                        <Save size={20} />
                        {isSubmitting ? 'Uploading & Publishing...' : 'Publish Case Study'}
                    </button>
                </div>
            </form>
        </div>
    );
};

// --- Styles ---
const inputGroupStyle = { display: 'flex', flexDirection: 'column', gap: '0.6rem' };
const labelStyle = { color: '#aaa', fontSize: '0.9rem', fontWeight: 500, marginLeft: '4px' };
const inputStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '1rem',
    color: '#fff',
    outline: 'none',
    fontSize: '1rem',
    transition: 'border-color 0.3s'
};

export default AddCaseStudy;










// import React, { useState, useRef } from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { ChevronLeft, Save, UploadCloud, FileText, X } from 'lucide-react';
// import { useAdmin } from '../../context/AdminContext';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { storage } from '../../lib/firebase'; // Import storage
//
// const AddCaseStudy = () => {
//     const [formData, setFormData] = useState({
//         title: '',
//         category: '',
//         description: '',
//         pdfUrl: ''
//     });
//
//     // State for the file itself
//     const [pdfFile, setPdfFile] = useState(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [message, setMessage] = useState({ type: '', text: '' });
//
//     const { addCaseStudy } = useAdmin();
//     const navigate = useNavigate();
//     const fileInputRef = useRef(null);
//
//     // Handle File Selection
//     const handleFileChange = (e) => {
//         if (e.target.files[0]) {
//             const file = e.target.files[0];
//             if (file.type === 'application/pdf') {
//                 setPdfFile(file);
//                 setMessage({ type: '', text: '' });
//             } else {
//                 setMessage({ type: 'error', text: 'Please select a valid PDF file.' });
//             }
//         }
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);
//         setMessage({ type: '', text: '' });
//
//         try {
//             let finalPdfUrl = formData.pdfUrl;
//
//             // 1. If a file is selected, upload it to Firebase Storage first
//             if (pdfFile) {
//                 const fileRef = ref(storage, `case-studies/${Date.now()}_${pdfFile.name}`);
//                 const snapshot = await uploadBytes(fileRef, pdfFile);
//                 finalPdfUrl = await getDownloadURL(snapshot.ref);
//             } else if (!finalPdfUrl) {
//                 // If no file AND no URL provided
//                 throw new Error("Please upload a PDF document.");
//             }
//
//             // 2. Prepare the final data object
//             const submissionData = {
//                 ...formData,
//                 pdfUrl: finalPdfUrl, // Save the generated cloud link
//                 date: new Date().toISOString()
//             };
//
//             // 3. Save to Firestore Database
//             await addCaseStudy(submissionData);
//
//             setMessage({ type: 'success', text: 'Case study published successfully!' });
//
//             // Reset form
//             setFormData({ title: '', category: '', description: '', pdfUrl: '' });
//             setPdfFile(null);
//
//             setTimeout(() => navigate('/admin/dashboard'), 2000);
//
//         } catch (error) {
//             console.error("Submit Error:", error);
//             setMessage({ type: 'error', text: `Failed: ${error.message || 'Unknown error'}` });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };
//
//     return (
//         <div style={{ maxWidth: '900px', margin: '0 auto', color: '#fff', paddingBottom: '100px' }}>
//             {/* Header */}
//             <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
//                 <button
//                     onClick={() => navigate('/admin/dashboard')}
//                     style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer' }}
//                 >
//                     <ChevronLeft size={20} />
//                 </button>
//                 <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Publish Case Study</h1>
//             </div>
//
//             {/* Notification Message */}
//             {message.text && (
//                 <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     style={{
//                         padding: '1rem',
//                         borderRadius: '12px',
//                         marginBottom: '2rem',
//                         background: message.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
//                         border: message.type === 'error' ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid rgba(34, 197, 94, 0.2)',
//                         color: message.type === 'error' ? '#ef4444' : '#22c55e',
//                         textAlign: 'center'
//                     }}
//                 >
//                     {message.text}
//                 </motion.div>
//             )}
//
//             <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '2rem' }}>
//
//                 {/* --- DETAILS SECTION --- */}
//                 <div style={{ background: '#111', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
//                     <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
//                         <div style={{ width: '4px', height: '20px', background: '#00c2ff', borderRadius: '2px' }}></div>
//                         Study Details
//                     </h3>
//
//                     <div style={{ display: 'grid', gap: '1.5rem' }}>
//                         <div style={inputGroupStyle}>
//                             <label style={labelStyle}>Case Study Title</label>
//                             <input
//                                 type="text"
//                                 placeholder="e.g. 5nm Automotive SoC Success"
//                                 value={formData.title}
//                                 onChange={(e) => setFormData({...formData, title: e.target.value})}
//                                 style={inputStyle}
//                                 required
//                             />
//                         </div>
//
//                         <div style={inputGroupStyle}>
//                             <label style={labelStyle}>Vertical Category</label>
//                             <select
//                                 value={formData.category}
//                                 onChange={(e) => setFormData({...formData, category: e.target.value})}
//                                 style={inputStyle}
//                                 required
//                             >
//                                 <option value="" disabled>Select Category</option>
//                                 <option value="Design For Testability">Design For Testability</option>
//                                 <option value="Physical Design">Physical Design</option>
//                                 <option value="Design & Verification">Design & Verification</option>
//                                 <option value="Semiconductor News">Semiconductor News</option>
//                             </select>
//                         </div>
//
//                         <div style={inputGroupStyle}>
//                             <label style={labelStyle}>Executive Summary</label>
//                             <textarea
//                                 rows="5"
//                                 placeholder="Brief overview of the challenge and solution..."
//                                 value={formData.description}
//                                 onChange={(e) => setFormData({...formData, description: e.target.value})}
//                                 style={{...inputStyle, resize: 'vertical'}}
//                                 required
//                             />
//                         </div>
//                     </div>
//                 </div>
//
//                 {/* --- PDF UPLOAD SECTION --- */}
//                 <div style={{ background: '#111', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
//                     <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
//                         <div style={{ width: '4px', height: '20px', background: '#a855f7', borderRadius: '2px' }}></div>
//                         Documentation
//                     </h3>
//
//                     {/* Hidden Native Input */}
//                     <input
//                         type="file"
//                         accept="application/pdf"
//                         ref={fileInputRef}
//                         onChange={handleFileChange}
//                         style={{ display: 'none' }}
//                     />
//
//                     {!pdfFile ? (
//                         <div
//                             onClick={() => fileInputRef.current.click()}
//                             style={{
//                                 border: '2px dashed rgba(255, 255, 255, 0.1)',
//                                 borderRadius: '16px',
//                                 padding: '3rem',
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 cursor: 'pointer',
//                                 transition: 'all 0.2s ease',
//                                 background: 'rgba(255, 255, 255, 0.01)'
//                             }}
//                             onMouseEnter={(e) => {
//                                 e.currentTarget.style.borderColor = '#00c2ff';
//                                 e.currentTarget.style.background = 'rgba(0, 194, 255, 0.05)';
//                             }}
//                             onMouseLeave={(e) => {
//                                 e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
//                                 e.currentTarget.style.background = 'rgba(255, 255, 255, 0.01)';
//                             }}
//                         >
//                             <div style={{
//                                 width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(0, 194, 255, 0.1)',
//                                 display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: '#00c2ff'
//                             }}>
//                                 <UploadCloud size={28} />
//                             </div>
//                             <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff', marginBottom: '0.5rem' }}>Click to upload PDF</p>
//                             <p style={{ color: '#666', fontSize: '0.9rem' }}>Max file size: 10MB</p>
//                         </div>
//                     ) : (
//                         <div style={{
//                             background: 'rgba(34, 197, 94, 0.05)',
//                             border: '1px solid rgba(34, 197, 94, 0.2)',
//                             borderRadius: '16px',
//                             padding: '1.5rem',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'space-between'
//                         }}>
//                             <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
//                                 <div style={{ background: 'rgba(34, 197, 94, 0.1)', padding: '10px', borderRadius: '8px', color: '#22c55e' }}>
//                                     <FileText size={24} />
//                                 </div>
//                                 <div>
//                                     <p style={{ fontWeight: 600, color: '#fff' }}>{pdfFile.name}</p>
//                                     <p style={{ fontSize: '0.85rem', color: '#22c55e' }}>Ready to upload</p>
//                                 </div>
//                             </div>
//                             <button
//                                 type="button"
//                                 onClick={() => setPdfFile(null)}
//                                 style={{ background: 'transparent', border: 'none', color: '#666', cursor: 'pointer' }}
//                             >
//                                 <X size={20} />
//                             </button>
//                         </div>
//                     )}
//                 </div>
//
//                 {/* Footer Actions */}
//                 <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
//                     <button
//                         type="submit"
//                         disabled={isSubmitting}
//                         style={{
//                             padding: '1rem 3rem',
//                             background: isSubmitting ? '#222' : 'linear-gradient(90deg, #a855f7 0%, #7c3aed 100%)',
//                             border: 'none',
//                             borderRadius: '12px',
//                             color: '#fff',
//                             fontWeight: 700,
//                             fontSize: '1rem',
//                             cursor: isSubmitting ? 'not-allowed' : 'pointer',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             gap: '10px',
//                             transition: 'all 0.3s ease',
//                             boxShadow: '0 10px 30px rgba(168, 85, 247, 0.2)'
//                         }}
//                     >
//                         <Save size={20} />
//                         {isSubmitting ? 'Uploading & Publishing...' : 'Publish Case Study'}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };
//
// // --- Styles ---
// const inputGroupStyle = { display: 'flex', flexDirection: 'column', gap: '0.6rem' };
// const labelStyle = { color: '#aaa', fontSize: '0.9rem', fontWeight: 500, marginLeft: '4px' };
// const inputStyle = {
//     background: 'rgba(255, 255, 255, 0.05)',
//     border: '1px solid rgba(255, 255, 255, 0.1)',
//     borderRadius: '12px',
//     padding: '1rem',
//     color: '#fff',
//     outline: 'none',
//     fontSize: '1rem',
//     transition: 'border-color 0.3s'
// };
//
// export default AddCaseStudy;