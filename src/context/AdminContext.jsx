import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLoading } from './LoadingContext';
import { auth, db } from '../lib/firebase';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    setPersistence,
    browserSessionPersistence,
    updatePassword,
    updateProfile,
    updateEmail,
    EmailAuthProvider,
    reauthenticateWithCredential
} from 'firebase/auth';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc
} from 'firebase/firestore';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    // We are now managing auth state directly here via Firebase, 
    // but preserving the variable names for compatibility.
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState(null); // Add user state
    const { startLoading, stopLoading } = useLoading();

    const [loading, setLoading] = useState(true);

    // Diagnostic Check & Persistence Config
    useEffect(() => {
        const envs = {
            hasApiKey: !!import.meta.env.VITE_FIREBASE_API_KEY,
            hasAuthDomain: !!import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
            projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
            apiUrl: import.meta.env.VITE_API_URL
        };
        console.log("FIREBASE_ENV_CHECK:", envs);

        // Security: Set session-based persistence
        if (auth) {
            setPersistence(auth, browserSessionPersistence)
                .then(() => console.log("Auth persistence set to SESSION (local)"))
                .catch((error) => console.error("Persistence error:", error));
        }
    }, []);

    // Auth Listener
    useEffect(() => {
        if (!auth) {
            console.error("Firebase auth not initialized in AdminContext. Check Vercel Env Vars.");
            setLoading(false);
            stopLoading();
            return;
        }

        startLoading(); // Start global loader for auth check

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("Auth state changed:", currentUser ? "Logged In" : "Not Logged In");
            setUser(currentUser);
            setIsAdmin(!!currentUser);
            setLoading(false);
            stopLoading(); // Stop global loader
        }, (error) => {
            console.error("Auth state error:", error);
            setLoading(false);
            stopLoading();
        });

        // Failsafe: if nothing happens in 4 seconds, stop loading
        const timer = setTimeout(() => {
            if (loading) {
                console.warn("Auth check timed out after 4s. Forcing loading off.");
                setLoading(false);
                stopLoading();
            }
        }, 4000);

        return () => {
            unsubscribe();
            clearTimeout(timer);
        };
    }, []);

    const [vacancies, setVacancies] = useState([]);
    const [caseStudies, setCaseStudies] = useState([]);
    const [applications, setApplications] = useState([]);
    const [contactMessages, setContactMessages] = useState([]);

    const [layoutSettings, setLayoutSettings] = useState({
        navbar: {
            top: '2rem',
            width: 'auto',
            padding: '0.6rem 2rem',
            background: 'rgba(60, 60, 60, 0.4)',
            blur: '15px'
        },
        branding: {
            top: '2rem',
            left: '2rem',
            scale: 0.7
        },
        hero: {
            textAlign: 'center',
            titleSize: '4rem'
        }
    });
    // Initial load for layout settings
    useEffect(() => {
        const savedLayout = localStorage.getItem('miplLayoutSettings');
        if (savedLayout) {
            try {
                setLayoutSettings(JSON.parse(savedLayout));
            } catch (e) {
                console.error("Failed to parse layout settings", e);
            }
        }
    }, []);

    const updateLayoutSettings = async (newSettings) => {
        const updated = { ...layoutSettings, ...newSettings };
        setLayoutSettings(updated);
        localStorage.setItem('miplLayoutSettings', JSON.stringify(updated));
    };

    // Helper to map Firestore docs
    const mapDocs = (snapshot) => {
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    };

    // Usage: Fetch all data on mount (no need to wait for login for public data)
    useEffect(() => {
        const fetchPublicData = async () => {
            if (!db) {
                console.warn("Firebase DB not initialized, skipping public data fetch");
                return;
            }
            startLoading(); // Trigger global loader for first data fetch
            try {
                const vacanciesSnap = await getDocs(collection(db, 'vacancies'));
                setVacancies(mapDocs(vacanciesSnap));

                const caseStudiesSnap = await getDocs(collection(db, 'caseStudies'));
                setCaseStudies(mapDocs(caseStudiesSnap));

            } catch (error) {
                console.error("Error fetching public data:", error);
            } finally {
                stopLoading();
            }
        };

        fetchPublicData();
    }, []);

    // Fetch Admin Data when logged in
    useEffect(() => {
        if (!isAdmin) {
            setApplications([]);
            setContactMessages([]);
            return;
        }

        const fetchAdminData = async () => {
            startLoading();
            try {
                const appsSnap = await getDocs(collection(db, 'applications'));
                setApplications(mapDocs(appsSnap));

                const contactsSnap = await getDocs(collection(db, 'contacts'));
                setContactMessages(mapDocs(contactsSnap));
            } catch (error) {
                console.error("Error fetching admin data:", error);
            } finally {
                stopLoading();
            }
        };

        fetchAdminData();
    }, [isAdmin]);


    const loginAdmin = async (username, password) => {
        const email = username.includes('@') ? username : 'admin@microcircuits.com';
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.code };
        }
    };

    const registerAdmin = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, error: error.message };
        }
    };

    const logoutAdmin = async () => {
        try {
            await signOut(auth);
            setIsAdmin(false);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    // --- CRUD Operations ---
    const addVacancy = async (vacancyData) => {
        try {
            console.log("Attempting to add vacancy to Firestore...", vacancyData);
            if (!db) throw new Error("Firestore (db) is not initialized. Check your Firebase config.");

            const dataWithMeta = {
                ...vacancyData,
                createdAt: new Date().toISOString(),
                date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
            };

            // Timeout after 10 seconds if Firestore doesn't respond
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Firestore write timed out. Check your internet or Firestore rules.")), 10000)
            );

            const docRef = await Promise.race([
                addDoc(collection(db, 'vacancies'), dataWithMeta),
                timeoutPromise
            ]);

            const newVacancy = { id: docRef.id, ...dataWithMeta };
            setVacancies(prev => [...prev, newVacancy]);
            console.log("Vacancy added successfully with ID:", docRef.id);
            return newVacancy;
        } catch (error) {
            console.error('FIRESTORE ERROR (addVacancy):', error);
            throw error;
        }
    };

    const updateVacancy = async (id, updatedData) => {
        try {
            const vacancyRef = doc(db, 'vacancies', id);
            await updateDoc(vacancyRef, updatedData);
            setVacancies(prev => prev.map(v => v.id === id ? { ...v, ...updatedData } : v));
            console.log("Vacancy updated successfully:", id);
        } catch (error) {
            console.error('Error updating vacancy:', error);
            throw error;
        }
    };

    const deleteVacancy = async (id) => {
        try {
            await deleteDoc(doc(db, 'vacancies', id));
            setVacancies(prev => prev.filter(v => v.id !== id));
            console.log("Vacancy deleted successfully:", id);
        } catch (error) {
            console.error('Error deleting vacancy:', error);
            throw error;
        }
    };

    const addCaseStudy = async (studyData) => {
        try {
            console.log("Attempting to add case study to Firestore...", studyData);
            if (!db) throw new Error("Firestore (db) is not initialized. Check your Firebase config.");

            const dataWithMeta = {
                ...studyData,
                createdAt: new Date().toISOString(),
                date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
            };

            // Timeout after 10 seconds if Firestore doesn't respond
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Firestore write timed out. Check your internet or Firestore rules.")), 10000)
            );

            const docRef = await Promise.race([
                addDoc(collection(db, 'caseStudies'), dataWithMeta),
                timeoutPromise
            ]);

            const newStudy = { id: docRef.id, ...dataWithMeta };
            setCaseStudies(prev => [...prev, newStudy]);
            console.log("Case study added successfully with ID:", docRef.id);
            return newStudy;
        } catch (error) {
            console.error('FIRESTORE ERROR (addCaseStudy):', error);
            throw error;
        }
    };

    const updateCaseStudy = async (id, updatedData) => {
        try {
            const studyRef = doc(db, 'caseStudies', id);
            await updateDoc(studyRef, updatedData);
            setCaseStudies(prev => prev.map(s => s.id === id ? { ...s, ...updatedData } : s));
            console.log("Case study updated successfully:", id);
        } catch (error) {
            console.error('Error updating case study:', error);
            throw error;
        }
    };

    const deleteCaseStudy = async (id) => {
        try {
            await deleteDoc(doc(db, 'caseStudies', id));
            setCaseStudies(prev => prev.filter(s => s.id !== id));
            console.log("Case study deleted successfully:", id);
        } catch (error) {
            console.error('Error deleting case study:', error);
            throw error;
        }
    };

    const addApplication = async (appData) => {
        try {
            console.log("Submitting application to Firestore...", appData);
            const dataWithMeta = {
                ...appData,
                createdAt: new Date().toISOString()
            };
            const docRef = await addDoc(collection(db, 'applications'), dataWithMeta);
            setApplications(prev => [...prev, { id: docRef.id, ...dataWithMeta }]);
            return docRef.id;
        } catch (error) {
            console.error('Error adding application:', error);
            throw error;
        }
    };

    const deleteApplication = async (id) => {
        try {
            await deleteDoc(doc(db, 'applications', id));
            setApplications(prev => prev.filter(a => a.id !== id));
        } catch (error) {
            console.error('Error deleting application:', error);
            throw error;
        }
    };

    const updateApplication = async (id, updatedData) => {
        try {
            const appRef = doc(db, 'applications', id);
            await updateDoc(appRef, updatedData);
            setApplications(prev => prev.map(a => a.id === id ? { ...a, ...updatedData } : a));
            console.log("Application updated successfully:", id);
        } catch (error) {
            console.error('Error updating application:', error);
            throw error;
        }
    };

    const addContactMessage = async (messageData) => {
        try {
            console.log("Submitting contact message to Firestore...", messageData);
            const dataWithMeta = {
                ...messageData,
                createdAt: new Date().toISOString()
            };
            const docRef = await addDoc(collection(db, 'contacts'), dataWithMeta);
            setContactMessages(prev => [...prev, { id: docRef.id, ...dataWithMeta }]);
            return docRef.id;
        } catch (error) {
            console.error('Error adding contact message:', error);
            throw error;
        }
    };

    const deleteContactMessage = async (id) => {
        try {
            await deleteDoc(doc(db, 'contacts', id));
            setContactMessages(prev => prev.filter(m => m.id !== id));
        } catch (error) {
            console.error('Error deleting contact message:', error);
            throw error;
        }
    };

    const updateContactMessage = async (id, updatedData) => {
        try {
            const msgRef = doc(db, 'contacts', id);
            await updateDoc(msgRef, updatedData);
            setContactMessages(prev => prev.map(m => m.id === id ? { ...m, ...updatedData } : m));
            console.log("Contact message updated successfully:", id);
        } catch (error) {
            console.error('Error updating contact message:', error);
            throw error;
        }
    };

    const updateAdminPassword = async (currentPassword, newPassword) => {
        try {
            if (!user) throw new Error("No user logged in");
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);
            return { success: true };
        } catch (error) {
            console.error('Password update error:', error);
            return { success: false, error: error.message };
        }
    };

    const updateAdminProfile = async (newEmail, newDisplayName) => {
        try {
            if (!user) throw new Error("No user logged in");
            if (newDisplayName) {
                await updateProfile(user, { displayName: newDisplayName });
            }
            if (newEmail && newEmail !== user.email) {
                await updateEmail(user, newEmail);
            }
            return { success: true };
        } catch (error) {
            console.error('Profile update error:', error);
            return { success: false, error: error.message };
        }
    };

    return (
        <AdminContext.Provider value={{
            user, isAdmin, loginAdmin, logoutAdmin, registerAdmin,
            vacancies, addVacancy, updateVacancy, deleteVacancy,
            caseStudies, addCaseStudy, updateCaseStudy, deleteCaseStudy,
            applications, addApplication, deleteApplication, updateApplication,
            contactMessages, addContactMessage, deleteContactMessage, updateContactMessage,
            layoutSettings, updateLayoutSettings,
            updateAdminPassword, updateAdminProfile,
            loading
        }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => useContext(AdminContext);
