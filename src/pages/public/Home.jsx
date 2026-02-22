import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // App.jsx handles the initial loader.
        // If we are on Home after loading, just go to Expertise.
        navigate('/expertise');
    }, [navigate]);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <p className="text-gray-500">Redirecting...</p>
        </div>
    );
};

export default Home;
