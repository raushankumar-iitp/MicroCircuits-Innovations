import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Save, RefreshCw, Layout, Type, Image as ImageIcon } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const ManageLayout = () => {
    const { layoutSettings, updateLayoutSettings } = useAdmin();
    const [localSettings, setLocalSettings] = useState(layoutSettings);

    const handleUpdate = (category, key, value) => {
        setLocalSettings(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [key]: value
            }
        }));
    };

    const handleSave = async () => {
        await updateLayoutSettings(localSettings);
        alert('Layout settings saved successfully!');
    };

    const handleReset = () => {
        const defaultSettings = {
            navbar: {
                top: '2rem',
                width: '98%',
                padding: '1rem 3rem',
                background: 'rgba(20, 20, 20, 0.85)',
                blur: '20px'
            },
            branding: {
                top: '2rem',
                left: '7rem',
                scale: 0.35
            },
            hero: {
                textAlign: 'center',
                titleSize: '4rem'
            }
        };
        setLocalSettings(defaultSettings);
    };

    return (
        <div style={{ color: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                        Layout <span style={{ color: '#00c2ff' }}>Manager</span>
                    </h1>
                    <p style={{ color: '#666' }}>Fine-tune the horizontal and vertical positions of website elements.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={handleReset} style={secondaryButtonStyle}>
                        <RefreshCw size={18} /> Reset Defaults
                    </button>
                    <button onClick={handleSave} style={primaryButtonStyle}>
                        <Save size={18} /> Save Changes
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                {/* Navbar Section */}
                <Section icon={<Layout size={20} />} title="Navbar Settings">
                    <Control
                        label="Top Position"
                        value={localSettings.navbar.top}
                        onChange={(val) => handleUpdate('navbar', 'top', val)}
                        type="text"
                        placeholder="e.g. 2rem, 20px"
                    />
                    <Control
                        label="Width"
                        value={localSettings.navbar.width}
                        onChange={(val) => handleUpdate('navbar', 'width', val)}
                        type="text"
                        placeholder="e.g. 98%, 1200px"
                    />
                    <Control
                        label="Horizontal Padding"
                        value={localSettings.navbar.padding}
                        onChange={(val) => handleUpdate('navbar', 'padding', val)}
                        type="text"
                        placeholder="e.g. 1rem 3rem"
                    />
                    <Control
                        label="Background Color"
                        value={localSettings.navbar.background}
                        onChange={(val) => handleUpdate('navbar', 'background', val)}
                        type="text"
                    />
                </Section>

                {/* Branding Section */}
                <Section icon={<ImageIcon size={20} />} title="Branding / Logo Settings">
                    <Control
                        label="Top Position"
                        value={localSettings.branding.top}
                        onChange={(val) => handleUpdate('branding', 'top', val)}
                        type="text"
                    />
                    <Control
                        label="Left Position"
                        value={localSettings.branding.left}
                        onChange={(val) => handleUpdate('branding', 'left', val)}
                        type="text"
                    />
                    <Control
                        label="Logo Scale"
                        value={localSettings.branding.scale}
                        onChange={(val) => handleUpdate('branding', 'scale', parseFloat(val))}
                        type="number"
                        step="0.05"
                    />
                </Section>

                {/* Hero Section */}
                <Section icon={<Type size={20} />} title="Hero Section Settings">
                    <Control
                        label="Text Alignment"
                        value={localSettings.hero.textAlign}
                        onChange={(val) => handleUpdate('hero', 'textAlign', val)}
                        type="select"
                        options={['left', 'center', 'right']}
                    />
                    <Control
                        label="Title Font Size"
                        value={localSettings.hero.titleSize}
                        onChange={(val) => handleUpdate('hero', 'titleSize', val)}
                        type="text"
                    />
                </Section>
            </div>

            <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(0, 194, 255, 0.05)', borderRadius: '12px', border: '1px solid rgba(0, 194, 255, 0.1)' }}>
                <p style={{ margin: 0, color: '#00c2ff', fontSize: '0.9rem' }}>
                    <strong>Note:</strong> Changes are saved to local storage and applied globally. Once you click "Save Changes", the website layout will update for all visitors.
                </p>
            </div>
        </div>
    );
};

const Section = ({ icon, title, children }) => (
    <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '20px', padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: '#00c2ff' }}>
            {icon}
            <h2 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 700 }}>{title}</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {children}
        </div>
    </div>
);

const Control = ({ label, value, onChange, type, placeholder, options, step }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '0.85rem', color: '#888', fontWeight: 500 }}>{label}</label>
        {type === 'select' ? (
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={inputStyle}
            >
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
        ) : (
            <input
                type={type}
                value={value}
                step={step}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                style={inputStyle}
            />
        )}
    </div>
);

const inputStyle = {
    padding: '0.75rem 1rem',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    color: '#fff',
    outline: 'none',
    fontSize: '0.9rem'
};

const primaryButtonStyle = {
    padding: '0.8rem 1.5rem',
    background: 'linear-gradient(90deg, #00c2ff 0%, #0076fe 100%)',
    border: 'none',
    borderRadius: '12px',
    color: '#fff',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer'
};

const secondaryButtonStyle = {
    padding: '0.8rem 1.5rem',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    color: '#fff',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer'
};

export default ManageLayout;
