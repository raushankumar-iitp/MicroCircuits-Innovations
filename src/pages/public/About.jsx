import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Car, Watch, Wifi, Server, Smartphone } from 'lucide-react';

const IconBox = ({ Icon, label }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Icon size={40} color="#ccc" strokeWidth={1.5} style={{ minWidth: '40px' }} />
        <span style={{ fontSize: '0.75rem', color: '#888', fontWeight: 500, textTransform: 'uppercase', textAlign: 'center' }}>{label}</span>
    </div>
);

const StatCard = ({ number, subtitle, desc, btnText, link, navigate }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div
            style={{
                flex: '1 1 min(350px, 100%)',
                maxWidth: '400px',
                background: 'linear-gradient(145deg, #1a1a1a, #0a0a0a)',
                border: isHovered ? '2px solid #fff' : '1px solid #333',
                borderRadius: '20px',
                padding: 'clamp(2rem, 5vw, 3rem) 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: isHovered ? '0 15px 40px rgba(255,255,255,0.1)' : '0 10px 30px rgba(0,0,0,0.5)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                margin: '1rem',
                minHeight: '400px'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <h4 style={{ fontSize: 'clamp(3rem, 5vw, 4rem)', marginBottom: '0.5rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{number}</h4>
            <h5 style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', marginBottom: '1.5rem', color: '#fff', fontWeight: 600 }}>{subtitle}</h5>
            <p style={{ fontSize: '1rem', color: '#aaa', lineHeight: 1.6, marginBottom: '3rem', width: '100%' }}>{desc}</p>

            <button
                onClick={() => navigate(link)}
                style={{
                    background: '#0056b3',
                    color: '#fff',
                    padding: '12px 0',
                    width: '100%',
                    borderRadius: '0 0 20px 20px',
                    border: 'none',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    transition: 'background 0.3s'
                }}
                onMouseEnter={(e) => { e.target.style.background = '#007bff'; }}
                onMouseLeave={(e) => { e.target.style.background = '#0056b3'; }}
            >
                {btnText}
            </button>
        </div>
    );
};

const About = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const [specCardHover, setSpecCardHover] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            className="about-page"
            style={{
                background: '#000',
                color: '#fff',
                width: '100%',
                minHeight: '100vh',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: isMobile ? '6rem' : '10rem',
                paddingBottom: '50px',
                overflowX: 'hidden'
            }}
        >
            {/* Background/Gradient Effects - Optional subtle glow behind elements could go here */}

            {/* Hero Text */}
            <div style={{ textAlign: 'center', padding: '0 20px 40px 20px', maxWidth: '1200px', width: '100%' }}>
                <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 700, lineHeight: 1.2, color: '#fff' }}>
                    Building Trust at every Milestone — from <span style={{ color: '#00aaff' }}>Spec to Silicon.</span>
                </h1>
            </div>


            {/* Mission Section */}
            <div style={{
                textAlign: 'center',
                padding: '20px 20px 60px 20px',
                maxWidth: '900px',
                width: '100%'
            }}>
                <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', color: '#fff', marginBottom: '1.5rem', fontWeight: 500 }}>
                    At MicroCircuits Innovations, We Began<br />with <span style={{ color: '#00aaff' }}>One Mission:</span>
                </h2>

                <h3 style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', color: '#00aaff', marginBottom: '3rem', fontWeight: 700, lineHeight: 1.3 }}>
                    “To Transform the Future of<br />Custom SoC Design”
                </h3>

                <p style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', color: '#ccc', marginBottom: '1.5rem', lineHeight: 1.8, maxWidth: '800px', margin: '0 auto 1.5rem auto' }}>
                    From Day One, we’ve pursued <span style={{ color: '#00aaff' }}>Excellence</span> — not just in execution, but in relations. Today, we’re a <span style={{ color: '#00aaff' }}>Trusted Partner</span> to the world’s most innovative companies.
                </p>

                <p style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', color: '#ccc', marginBottom: '2.5rem', lineHeight: 1.8, maxWidth: '800px', margin: '0 auto 2.5rem auto' }}>
                    We offer full-spectrum VLSI design services, empowering our clients to go <span style={{ color: '#00aaff' }}>Further, Faster</span> — across AI, Automotive, Connectivity, Mobility, Server, and Wearable platforms.
                </p>

                <p style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', color: '#fff', marginBottom: '3rem', lineHeight: 1.6 }}>
                    With Deep Domain Expertise and <span style={{ color: '#00aaff' }}>Proven</span> Execution, We Don’t Just Design Silicon.
                </p>

                <h4 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#00aaff', fontWeight: 700 }}>
                    “We Help Shape the Future”
                </h4>
            </div>

            {/* Spec To Silicon Center Card */}
            <div
                style={{
                    background: 'linear-gradient(145deg, #111, #050505)',
                    border: specCardHover ? '2px solid #fff' : '1px solid #333',
                    borderRadius: '30px',
                    padding: isMobile ? '30px 20px' : '40px 50px',
                    textAlign: 'center',
                    width: '90%',
                    maxWidth: '600px',
                    boxShadow: specCardHover ? '0 25px 60px rgba(255,255,255,0.1)' : '0 20px 50px rgba(0,0,0,0.6)',
                    marginBottom: '100px',
                    position: 'relative',
                    transition: 'all 0.3s ease'
                }}
                onMouseEnter={() => setSpecCardHover(true)}
                onMouseLeave={() => setSpecCardHover(false)}
            >
                <h3 style={{ fontSize: '2rem', marginBottom: '40px', fontWeight: 700, color: '#fff' }}>
                    Spec. To <span style={{ color: '#aaa' }}>Silicon.</span>
                </h3>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                    gap: isMobile ? '20px' : '40px',
                    margin: '0 auto 50px auto',
                    justifyItems: 'center',
                    maxWidth: '400px'
                }}>
                    <IconBox Icon={Brain} label="AI" />
                    <IconBox Icon={Car} label="Automobiles" />
                    <IconBox Icon={Watch} label="Wearables" />
                    <IconBox Icon={Wifi} label="Wireless" />
                    <IconBox Icon={Server} label="Servers" />
                    <IconBox Icon={Smartphone} label="Smart Devices" />
                </div>

                <button
                    onClick={() => navigate('/expertise')}
                    style={{
                        background: '#0056b3',
                        color: '#fff',
                        padding: '14px 0',
                        width: '100%',
                        borderRadius: '0 0 30px 30px',
                        border: 'none',
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontSize: '1rem',
                        transition: '0.3s',
                        position: 'absolute',
                        bottom: 0,
                        left: 0
                    }}
                    onMouseEnter={(e) => { e.target.style.background = '#007bff'; }}
                    onMouseLeave={(e) => { e.target.style.background = '#0056b3'; }}
                >
                    View Our Expertise
                </button>
            </div>

            {/* Bottom Stats Cards */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '30px',
                width: '100%',
                maxWidth: '1200px',
                padding: '0 20px 100px 20px',
                margin: '0 auto'
            }}>
                <StatCard
                    number="20+"
                    subtitle="Years Experience"
                    desc="Decades of Experience in Analog, Mixed-Signal, and Digital Design — Scaling from 180nm to 1.8nm."
                    btnText="View Our CaseStudy"
                    link="/casestudy"
                    navigate={navigate}
                />
                <StatCard
                    number="100+"
                    subtitle="Customers"
                    desc="Trusted by Global OEMs and Tier-1s — Delivering Precision Silicon at Massive Scale, Year after Year."
                    btnText="Connect With Us"
                    link="/contact"
                    navigate={navigate}
                />
                <StatCard
                    number="50+"
                    subtitle="First Pass Silicon"
                    desc="Custom Silicon Solutions Deployed Across AMS, Signal Processing, and Power Management."
                    btnText="View Our CaseStudy"
                    link="/casestudy"
                    navigate={navigate}
                />
            </div>
        </div>
    );
};

export default About;
