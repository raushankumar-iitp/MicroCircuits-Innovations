import React, { createContext, useContext, useState, useCallback } from 'react';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
    const [modal, setModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'alert', // 'alert' or 'confirm'
        resolve: null
    });

    const showAlert = useCallback((message, title = 'System Alert') => {
        setModal({
            isOpen: true,
            title,
            message,
            type: 'alert',
            resolve: null
        });
    }, []);

    const showConfirm = useCallback((message, title = 'Confirm Action') => {
        return new Promise((resolve) => {
            setModal({
                isOpen: true,
                title,
                message,
                type: 'confirm',
                resolve
            });
        });
    }, []);

    const closeModal = useCallback((result = false) => {
        if (modal.resolve) {
            modal.resolve(result);
        }
        setModal(prev => ({ ...prev, isOpen: false, resolve: null }));
    }, [modal]);

    return (
        <UIContext.Provider value={{ showAlert, showConfirm, modal, closeModal }}>
            {children}
        </UIContext.Provider>
    );
};

export const useUI = () => {
    const context = useContext(UIContext);
    if (!context) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
};
