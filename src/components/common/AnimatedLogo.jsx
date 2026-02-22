import React from 'react';

const AnimatedLogo = ({ className = "w-[50px] h-[25px]", style = {} }) => {
    return (
        <div className={`relative flex items-center justify-center ${className}`} style={style}>
            <style>
                {`
                .nav-infinity-svg {
                    width: 100%;
                    height: 100%;
                    filter: drop-shadow(0 0 4px #00aaff);
                }

                .nav-infinity-path, .nav-infinity-glow {
                    fill: none;
                    stroke-linecap: round;
                    stroke-dasharray: 200;
                    stroke-dashoffset: 200;
                    animation: nav-draw-infinity 3s linear infinite;
                }

                .nav-infinity-path {
                    stroke: #fff;
                    stroke-width: 4;
                }

                .nav-infinity-glow {
                    stroke: #00aaff;
                    stroke-width: 8;
                    opacity: 0.3;
                }

                @keyframes nav-draw-infinity {
                    0% { stroke-dashoffset: 400; }
                    100% { stroke-dashoffset: 0; }
                }
                `}
            </style>

            <svg className="nav-infinity-svg" viewBox="0 0 100 50">
                <path className="nav-infinity-glow" d="M25,25 c0,-15 25,-15 25,0 0,15 25,15 25,0 0,-15 -25,-15 -25,0 0,15 -25,15 -25,0 z"></path>
                <path className="nav-infinity-path" d="M25,25 c0,-15 25,-15 25,0 0,15 25,15 25,0 0,-15 -25,-15 -25,0 0,15 -25,15 -25,0 z"></path>
            </svg>
        </div>
    );
};

export default AnimatedLogo;
