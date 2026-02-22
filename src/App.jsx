import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary';
import Navbar from './components/navigation/Navbar';
import Home from './pages/public/Home';
import Expertise from './pages/public/Expertise';
import Careers from './pages/public/Careers';
import CaseStudy from './pages/public/CaseStudy';
import Contact from './pages/public/Contact';
import About from './pages/public/About';
import LoadingOverlay from './components/common/LoadingOverlay';
import { AnimatePresence } from 'framer-motion';
import { AdminProvider } from './context/AdminContext';
import './index.css';
import './App.css';
import AdminRegister from './pages/admin/AdminRegister';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLayout from './components/admin/AdminLayout';
import ManageVacancies from './pages/admin/ManageVacancies';
import ManageCaseStudies from './pages/admin/ManageCaseStudies';
import ApplicationsList from './pages/admin/ApplicationsList';
import ContactMessagesList from './pages/admin/ContactMessagesList';
import AddCaseStudy from './pages/admin/AddCaseStudy';
import AddVacancy from './pages/admin/AddVacancy';
import ManageLayout from './pages/admin/ManageLayout';
import AdminSettings from './pages/admin/AdminSettings';
import CustomCursor from './components/common/CustomCursor';
import ProtectedRoute from './components/auth/ProtectedRoute';
import IntroLoader from './components/common/IntroLoader';
import InfiniteLogoPreloader from './components/common/InfiniteLogoPreloader';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import { UIProvider } from './context/UIContext';
import GlobalModal from './components/common/GlobalModal';

const InitialLoaderManager = () => {
    const { startLoading, stopLoading } = useLoading();

    React.useEffect(() => {
        // Initial load simulation (2s)
        startLoading();
        const timer = setTimeout(() => {
            stopLoading();
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return <InfiniteLogoPreloader />;
};

const AppContent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isPathAdmin = location.pathname.startsWith('/admin');
    const [globalLoading, setGlobalLoading] = React.useState(!isPathAdmin);

    React.useEffect(() => {
        if (isPathAdmin) {
            setGlobalLoading(false);
        }
    }, [isPathAdmin]);

    const { isLoading } = useLoading();

    return (
        <div className="App">
            <GlobalModal />
            <InfiniteLogoPreloader />
            <AnimatePresence>
                {(!isPathAdmin && globalLoading) && (
                    <IntroLoader
                        key="intro-loader-global"
                        onComplete={() => {
                            setGlobalLoading(false);
                            if (location.pathname === '/') {
                                navigate('/expertise');
                            }
                        }}
                    />
                )}
            </AnimatePresence>

            {!globalLoading && <Navbar />}
            <main>
                <AnimatePresence>
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<Home />} />
                        <Route path="/expertise" element={<Expertise />} />
                        <Route path="/casestudy" element={<CaseStudy />} />
                        <Route path="/careers" element={<Careers />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />

                        {/* Admin Routes */}
                        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin/register" element={<AdminRegister />} />

                        <Route path="/admin/dashboard" element={
                            <ProtectedRoute>
                                <AdminLayout>
                                    <AdminDashboard />
                                </AdminLayout>
                            </ProtectedRoute>
                        } />


                        <Route path="/admin/vacancies" element={
                            <ProtectedRoute>
                                <AdminLayout>
                                    <ManageVacancies />
                                </AdminLayout>
                            </ProtectedRoute>
                        } />

                        <Route path="/admin/add-vacancy" element={
                            <ProtectedRoute>
                                <AdminLayout>
                                    <AddVacancy />
                                </AdminLayout>
                            </ProtectedRoute>
                        } />

                        <Route path="/admin/case-studies" element={
                            <ProtectedRoute>
                                <AdminLayout>
                                    <ManageCaseStudies />
                                </AdminLayout>
                            </ProtectedRoute>
                        } />

                        <Route path="/admin/add-case-study" element={
                            <ProtectedRoute>
                                <AdminLayout>
                                    <AddCaseStudy />
                                </AdminLayout>
                            </ProtectedRoute>
                        } />

                        <Route path="/admin/applications" element={
                            <ProtectedRoute>
                                <AdminLayout>
                                    <ApplicationsList />
                                </AdminLayout>
                            </ProtectedRoute>
                        } />

                        <Route path="/admin/inquiries" element={
                            <ProtectedRoute>
                                <AdminLayout>
                                    <ContactMessagesList />
                                </AdminLayout>
                            </ProtectedRoute>
                        } />

                        <Route path="/admin/layout" element={
                            <ProtectedRoute>
                                <AdminLayout>
                                    <ManageLayout />
                                </AdminLayout>
                            </ProtectedRoute>
                        } />

                        <Route path="/admin/settings" element={
                            <ProtectedRoute>
                                <AdminLayout>
                                    <AdminSettings />
                                </AdminLayout>
                            </ProtectedRoute>
                        } />

                        <Route path="*" element={<Expertise />} />
                    </Routes>
                </AnimatePresence>
            </main>
            <footer style={{
                padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 5vw, 2rem)',
                textAlign: 'center',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                marginTop: 'clamp(2rem, 8vw, 6rem)',
                width: '100%'
            }}>
                <p style={{ color: '#666', fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)', lineHeight: 1.5 }}>
                    Copyright © 2025 MicroCircuits Innovations Pvt. Ltd. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

function App() {
    return (
        <Router>
            <ErrorBoundary>
                <LoadingProvider>
                    <UIProvider>
                        <AdminProvider>
                            <div>
                                {/* <InitialLoaderManager /> */}
                                <CustomCursor />
                                <AppContent />
                            </div>
                        </AdminProvider>
                    </UIProvider>
                </LoadingProvider>
            </ErrorBoundary>
        </Router>
    );
}

export default App;
