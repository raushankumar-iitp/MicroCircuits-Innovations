import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
    LayoutDashboard,
    Briefcase,
    FileText,
    LogOut,
    Menu,
    X,
    Bell,
    User,
    ChevronRight,
    Settings
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const AdminLayout = ({ children }) => {
    const { logoutAdmin: logout, user, applications, contactMessages } = useAdmin();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            if (mobile) setIsSidebarOpen(false);
            else setIsSidebarOpen(true);
        };
        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const appsCount = (applications || []).filter(a => !a.processed).length;
    const inquiriesCount = (contactMessages || []).filter(m => !m.processed).length;
    const totalNotifications = appsCount + inquiriesCount;

    const navItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Manage Vacancies', path: '/admin/vacancies', icon: <Briefcase size={20} /> },
        { name: 'Manage Case Studies', path: '/admin/case-studies', icon: <FileText size={20} /> },
        {
            name: 'Applications',
            path: '/admin/applications',
            icon: <User size={20} />,
            badge: appsCount
        },
        {
            name: 'Inquiries',
            path: '/admin/inquiries',
            icon: <Bell size={20} />,
            badge: inquiriesCount
        },
        {
            name: 'Settings',
            path: '/admin/settings',
            icon: <Settings size={20} />
        },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            background: '#050505',
            color: '#fff',
            fontFamily: '"Outfit", sans-serif',
            overflow: 'hidden',
            width: '100%'
        }}>
            {/* Sidebar */}
            <aside
                style={{
                    width: isSidebarOpen ? 'clamp(200px, 20vw, 280px)' : (isMobile ? '0px' : '80px'),
                    background: 'rgba(10, 10, 10, 0.95)',
                    borderRight: '1px solid rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: isMobile && !isSidebarOpen ? 0 : '1.5rem clamp(0.5rem, 1vw, 1rem)',
                    position: isMobile ? 'fixed' : 'relative',
                    height: '100vh',
                    top: 0,
                    left: 0,
                    zIndex: 1000,
                    overflow: 'hidden',
                    transition: 'width 0.3s ease, padding 0.3s ease',
                    boxShadow: isMobile && isSidebarOpen ? '0 0 50px rgba(0,0,0,0.5)' : 'none'
                }}
            >
                {/* Logo Section */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    marginBottom: '3.5rem',
                    padding: '0.5rem'
                }}>
                    <img
                        src="/admin_sidebar_logo.png"
                        alt="MIPL Logo"
                        style={{
                            width: '48px',
                            height: '48px',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0 0 12px rgba(168, 85, 247, 0.4))'
                        }}
                    />
                    {isSidebarOpen && (
                        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                            <span style={{
                                fontWeight: 800,
                                fontSize: '1.2rem',
                                letterSpacing: '1px',
                                color: '#fff'
                            }}>
                                MIPL
                            </span>
                            <span style={{
                                fontWeight: 900,
                                fontSize: '0.9rem',
                                letterSpacing: '3px',
                                color: '#a855f7',
                                marginTop: '4px',
                                textTransform: 'uppercase'
                            }}>
                                ADMIN
                            </span>
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '0.8rem 1rem',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                color: isActive(item.path) ? '#fff' : '#666',
                                background: isActive(item.path) ? 'rgba(168, 85, 247, 0.1)' : 'transparent',
                                border: isActive(item.path) ? '1px solid rgba(168, 85, 247, 0.2)' : '1px solid transparent',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden'
                            }}
                        >
                            <span style={{ color: isActive(item.path) ? '#a855f7' : 'inherit', position: 'relative' }}>
                                {item.icon}
                                {item.badge > 0 && !isSidebarOpen && (
                                    <span style={dotBadgeStyle}></span>
                                )}
                            </span>
                            {isSidebarOpen && <span>{item.name}</span>}
                            {isSidebarOpen && item.badge > 0 && (
                                <span style={pillBadgeStyle}>{item.badge}</span>
                            )}
                            {isSidebarOpen && isActive(item.path) && (
                                <ChevronRight size={14} style={{ marginLeft: 'auto', color: '#a855f7' }} />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Bottom Section */}
                <div style={{
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '16px',
                    marginTop: 'auto',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                        <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: '#1a1a1a',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                            <User size={18} color="#a855f7" />
                        </div>
                        {isSidebarOpen && (
                            <div style={{ overflow: 'hidden' }}>
                                <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{user?.username || 'Admin'}</p>
                                <p style={{ margin: 0, fontSize: '0.7rem', color: '#666' }}>System Administrator</p>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={logout}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: isSidebarOpen ? 'flex-start' : 'center',
                            gap: '10px',
                            padding: '0.6rem',
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            borderRadius: '8px',
                            color: '#ef4444',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <LogOut size={16} />
                        {isSidebarOpen && <span>Logout</span>}
                    </button>
                </div>

                {/* Toggle Button */}
            </aside>

            {/* Mobile Toggle Button - Moved Outside Sidebar */}
            {isMobile && (
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    style={{
                        position: 'fixed',
                        right: '20px',
                        top: '20px',
                        width: '40px',
                        height: '40px',
                        background: '#a855f7',
                        border: 'none',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        boxShadow: '0 0 15px rgba(168, 85, 247, 0.4)',
                        zIndex: 1100,
                    }}
                >
                    {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            )}

            {/* Main Content Area */}
            <main style={{
                flex: 1,
                minHeight: '100vh',
                overflowY: 'auto',
                padding: isMobile ? '1rem' : 'clamp(1rem, 3vw, 2rem) clamp(1rem, 5vw, 4rem)',
                position: 'relative',
                width: '100%'
            }}>
                {/* Header Backdrop Blur */}
                <div style={{
                    position: 'sticky',
                    top: isMobile ? '-1rem' : '-2rem',
                    margin: isMobile ? '-1rem -1rem 1rem -1rem' : '-2rem -3rem 2rem -3rem',
                    padding: isMobile ? '1rem' : '1.5rem 3rem',
                    background: 'rgba(5, 5, 5, 0.7)',
                    backdropFilter: 'blur(20px)',
                    zIndex: 50,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '1.5rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                    <button style={{ ...headerIconStyle, position: 'relative' }} onClick={() => navigate('/admin/inquiries')}>
                        <Bell size={18} />
                        {totalNotifications > 0 && (
                            <span style={pillBadgeStyleHeader}>{totalNotifications}</span>
                        )}
                    </button>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '0.4rem 1rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '100px',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }}></div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#aaa' }}>SYSTEM ONLINE</span>
                    </div>
                </div>

                <div
                    style={{ opacity: 1 }}
                >
                    {children}
                </div>
            </main>
        </div>
    );
};

const headerIconStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
};

const dotBadgeStyle = {
    position: 'absolute',
    top: '-2px',
    right: '-2px',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#a855f7',
    border: '2px solid #0a0a0a'
};

const pillBadgeStyle = {
    marginLeft: 'auto',
    background: '#a855f7',
    color: '#fff',
    fontSize: '0.7rem',
    fontWeight: 700,
    padding: '2px 8px',
    borderRadius: '10px',
    minWidth: '20px',
    textAlign: 'center'
};

const pillBadgeStyleHeader = {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    background: '#a855f7',
    color: '#fff',
    fontSize: '0.65rem',
    fontWeight: 800,
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #050505',
    boxShadow: '0 0 10px rgba(168, 85, 247, 0.4)'
};

export default AdminLayout;
