import { useLoading } from '../../context/LoadingContext';
import { useEffect, useState } from "react";

const InfiniteLogoPreloader = ({ message, active }) => {
    const { isLoading: contextLoading } = useLoading();
    const isLoading = active !== undefined ? active : contextLoading;
    const [isVisible, setIsVisible] = useState(isLoading);
    const [shouldRender, setShouldRender] = useState(isLoading);

    useEffect(() => {
        if (isLoading) {
            setShouldRender(true);
            requestAnimationFrame(() => setIsVisible(true));
        } else {
            setIsVisible(false);
            const timer = setTimeout(() => {
                setShouldRender(false);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);


    if (!shouldRender) return null;

    return (
        <div
            className={`loader-wrapper ${!isVisible ? 'fade-out' : ''}`}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: '#000',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 10000,
                transition: 'opacity 0.8s ease, visibility 0.8s',
                opacity: isVisible ? 1 : 0,
                visibility: isVisible ? 'visible' : 'hidden'
            }}
        >
            <style>
                {`
                .infinity-logo-container {
                    width: 200px;
                    height: 100px;
                    position: relative;
                }

                .infinity-svg {
                    width: 100%;
                    height: 100%;
                    filter: drop-shadow(0 0 8px #00aaff) drop-shadow(0 0 15px #0077ff);
                }

                .infinity-path, .infinity-glow {
                    fill: none;
                    stroke-linecap: round;
                    stroke-dasharray: 200;
                    stroke-dashoffset: 200;
                    animation: draw-infinity 3s linear infinite;
                }

                .infinity-path {
                    stroke: #fff;
                    stroke-width: 4;
                }

                .infinity-glow {
                    stroke: #00aaff;
                    stroke-width: 8;
                    opacity: 0.3;
                }

                @keyframes draw-infinity {
                    0% { stroke-dashoffset: 400; }
                    100% { stroke-dashoffset: 0; }
                }

                .loading-text {
                    margin-top: 20px;
                    font-family: 'Outfit', sans-serif;
                    color: #fff;
                    font-size: 14px;
                    letter-spacing: 4px;
                    text-transform: uppercase;
                    animation: pulse-text 1.5s ease-in-out infinite;
                }

                @keyframes pulse-text {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 1; }
                }
                `}
            </style>

            <div className="infinity-logo-container">
                <svg className="infinity-svg" viewBox="0 0 100 50">
                    <path className="infinity-glow" d="M25,25 c0,-15 25,-15 25,0 0,15 25,15 25,0 0,-15 -25,-15 -25,0 0,15 -25,15 -25,0 z"></path>
                    <path className="infinity-path" d="M25,25 c0,-15 25,-15 25,0 0,15 25,15 25,0 0,-15 -25,-15 -25,0 0,15 -25,15 -25,0 z"></path>
                </svg>
            </div>
            <div className="loading-text">{message || "Loading..."}</div>
        </div>
    );
};

export default InfiniteLogoPreloader;
