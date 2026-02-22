import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Briefcase, FileText, LogOut, Layout, User, Bell } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const AdminDashboard = () => {
    const { user, vacancies, caseStudies, applications, contactMessages } = useAdmin();
    const navigate = useNavigate();

    const stats = [
        { label: 'Case Studies', value: caseStudies?.length || 0, icon: <FileText />, color: '#a855f7', trend: 'Total published', path: '/admin/case-studies' },
        { label: 'Applications', value: applications?.length || 0, icon: <User />, color: '#22c55e', trend: 'Received total', path: '/admin/applications' },
        { label: 'Messages', value: contactMessages?.length || 0, icon: <Bell />, color: '#f59e0b', trend: 'Client inquiries', path: '/admin/inquiries' },
    ];

    const quickActions = [
        { title: 'Post Job', path: '/admin/add-vacancy', icon: <Briefcase size={20} />, color: '#a855f7' },
        { title: 'New Case Study', path: '/admin/add-case-study', icon: <FileText size={20} />, color: '#a855f7' },
    ];

    return (
        <div>
            <style>
                {`
                @media (max-width: 1024px) {
                    .dashboard-split-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .dashboard-title {
                        font-size: 2rem !important;
                    }
                    .stats-grid {
                        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)) !important;
                    }
                }
                @media (max-width: 768px) {
                    .dashboard-quick-actions {
                        flex-direction: column;
                    }
                }
                `}
            </style>
            <div style={{ marginBottom: '3rem' }}>
                <h1 className="dashboard-title" style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>
                    Dashboard Overview
                </h1>
                <p style={{ color: '#666', fontSize: '1.1rem' }}>
                    Welcome back, {user?.username || 'Administrator'}. Here's what's happening with MIPL content.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1.5rem',
                marginBottom: '3rem'
            }}>
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        onClick={() => navigate(stat.path)}
                        style={{
                            background: 'rgba(15, 15, 15, 0.4)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            borderRadius: '24px',
                            padding: '2rem',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            background: `${stat.color}15`,
                            color: stat.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1.5rem'
                        }}>
                            {stat.icon}
                        </div>
                        <h3 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>{stat.value}</h3>
                        <p style={{ color: '#aaa', margin: '0 0 1rem 0', fontSize: '0.9rem', fontWeight: 500 }}>{stat.label}</p>
                        <div style={{ fontSize: '0.75rem', color: '#666', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: stat.color }}></div>
                            {stat.trend}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions & Recent Activity Section */}
            <div className="dashboard-split-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem' }}>
                <div style={{
                    background: 'rgba(15, 15, 15, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '24px',
                    padding: '2rem'
                }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '2rem' }}>Quick shortcuts</h2>
                    <div className="dashboard-quick-actions" style={{ display: 'flex', gap: '1rem' }}>
                        {quickActions.map((action, i) => (
                            <button
                                key={i}
                                onClick={() => navigate(action.path)}
                                style={{
                                    flex: 1,
                                    padding: '1.5rem',
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    border: '1px solid rgba(255, 255, 255, 0.05)',
                                    borderRadius: '16px',
                                    color: '#fff',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '12px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                                    e.currentTarget.style.borderColor = action.color;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                                }}
                            >
                                <div style={{ color: action.color }}>{action.icon}</div>
                                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{action.title}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{
                    background: 'rgba(15, 15, 15, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '24px',
                    padding: '2rem'
                }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '2rem' }}>System Status</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: '#666', fontSize: '0.9rem' }}>API Server</span>
                            <span style={{ color: '#22c55e', fontSize: '0.8rem', fontWeight: 700 }}>OPERATIONAL</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: '#666', fontSize: '0.9rem' }}>Database</span>
                            <span style={{ color: '#22c55e', fontSize: '0.8rem', fontWeight: 700 }}>CONNECTED</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: '#666', fontSize: '0.9rem' }}>Last Backup</span>
                            <span style={{ color: '#aaa', fontSize: '0.8rem' }}>2 hours ago</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
