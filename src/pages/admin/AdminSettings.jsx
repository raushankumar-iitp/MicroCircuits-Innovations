import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Lock, User, ShieldCheck, AlertCircle, Save } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useUI } from '../../context/UIContext';

const AdminSettings = () => {
    const { user, updateAdminPassword, updateAdminProfile } = useAdmin();
    const { showAlert } = useUI();

    const [profileData, setProfileData] = useState({
        displayName: user?.displayName || '',
        email: user?.email || ''
    });

    const [passData, setPassData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const [isUpdatingPass, setIsUpdatingPass] = useState(false);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setIsUpdatingProfile(true);
        const res = await updateAdminProfile(profileData.email, profileData.displayName);
        setIsUpdatingProfile(false);
        if (res.success) {
            showAlert('Profile updated successfully!', 'Success');
        } else {
            showAlert(res.error || 'Failed to update profile.', 'Error');
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (passData.newPassword !== passData.confirmPassword) {
            showAlert('Passwords do not match.', 'Warning');
            return;
        }
        setIsUpdatingPass(true);
        const res = await updateAdminPassword(passData.currentPassword, passData.newPassword);
        setIsUpdatingPass(false);
        if (res.success) {
            showAlert('Password changed successfully!', 'Success');
            setPassData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } else {
            showAlert(res.error || 'Failed to change password.', 'Error');
        }
    };

    return (
        <div style={{ color: '#fff' }}>
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                    System <span style={{ color: '#a855f7' }}>Settings</span>
                </h1>
                <p style={{ color: '#666' }}>Manage your admin credentials and security preferences.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem' }}>
                {/* Profile Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={cardStyle}
                >
                    <div style={cardHeaderStyle}>
                        <User size={20} color="#a855f7" />
                        <h3 style={{ margin: 0 }}>Admin Profile</h3>
                    </div>
                    <form onSubmit={handleProfileUpdate} style={formStyle}>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Display Name (Username)</label>
                            <input
                                type="text"
                                value={profileData.displayName}
                                onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
                                style={inputStyle}
                                placeholder="Admin Name"
                            />
                        </div>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Admin Email</label>
                            <input
                                type="email"
                                value={profileData.email}
                                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                style={inputStyle}
                                placeholder="admin@example.com"
                            />
                        </div>
                        <button type="submit" disabled={isUpdatingProfile} style={buttonStyle}>
                            <Save size={18} />
                            {isUpdatingProfile ? 'Updating...' : 'Save Profile Changes'}
                        </button>
                    </form>
                </motion.div>

                {/* Password Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={cardStyle}
                >
                    <div style={cardHeaderStyle}>
                        <Lock size={20} color="#a855f7" />
                        <h3 style={{ margin: 0 }}>Security & Password</h3>
                    </div>
                    <form onSubmit={handlePasswordUpdate} style={formStyle}>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Current Password</label>
                            <input
                                type="password"
                                value={passData.currentPassword}
                                onChange={(e) => setPassData({ ...passData, currentPassword: e.target.value })}
                                style={inputStyle}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div style={inputGroupStyle}>
                                <label style={labelStyle}>New Password</label>
                                <input
                                    type="password"
                                    value={passData.newPassword}
                                    onChange={(e) => setPassData({ ...passData, newPassword: e.target.value })}
                                    style={inputStyle}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <div style={inputGroupStyle}>
                                <label style={labelStyle}>Confirm New Password</label>
                                <input
                                    type="password"
                                    value={passData.confirmPassword}
                                    onChange={(e) => setPassData({ ...passData, confirmPassword: e.target.value })}
                                    style={inputStyle}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" disabled={isUpdatingPass} style={passButtonStyle}>
                            <ShieldCheck size={18} />
                            {isUpdatingPass ? 'Changing...' : 'Update Password'}
                        </button>
                    </form>
                </motion.div>
            </div>

            <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(168, 85, 247, 0.05)', borderRadius: '16px', border: '1px solid rgba(168, 85, 247, 0.1)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <AlertCircle size={24} color="#a855f7" />
                <p style={{ margin: 0, color: '#888', fontSize: '0.9rem' }}>
                    <strong>Note:</strong> Sensitive changes like email or password might require re-authentication for security. If the update fails, please try logging out and logging back in.
                </p>
            </div>
        </div>
    );
};

const cardStyle = {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '24px',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
};

const cardHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    paddingBottom: '1rem',
    marginBottom: '0.5rem'
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
};

const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
};

const labelStyle = {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#666',
    marginLeft: '4px'
};

const inputStyle = {
    padding: '0.9rem 1.2rem',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    color: '#fff',
    outline: 'none',
    transition: 'all 0.3s ease',
    fontSize: '0.95rem'
};

const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    color: '#fff',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '0.5rem'
};

const passButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
    border: 'none',
    boxShadow: '0 4px 15px rgba(168, 85, 247, 0.2)'
};

export default AdminSettings;
