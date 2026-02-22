import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    // Failsafe: Force stop loading after 8 seconds to prevent stuck screens
    React.useEffect(() => {
        if (isLoading) {
            const timer = setTimeout(() => {
                console.warn("Loading state stuck > 8s. Forcing off.");
                setIsLoading(false);
            }, 8000);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    const startLoading = React.useCallback(() => setIsLoading(true), []);
    const stopLoading = React.useCallback(() => setIsLoading(false), []);

    const value = React.useMemo(() => ({
        isLoading, startLoading, stopLoading, setIsLoading
    }), [isLoading, startLoading, stopLoading]);

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};
