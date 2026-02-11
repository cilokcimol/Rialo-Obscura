import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BackgroundGrid from '../components/BackgroundGrid';
import Footer from '../components/Footer';

const Landing = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: '🔄',
            title: 'Smart Routing',
            description: 'Hybrid AMM + RFQ routing for best execution on every trade',
            color: 'var(--neon-cyan)'
        },
        {
            icon: '💰',
            title: 'Multi-Asset Support',
            description: 'Trade stablecoins, commodities, and tokenized stocks seamlessly',
            color: 'var(--neon-purple)'
        },
        {
            icon: '📊',
            title: 'Real-Time Markets',
            description: 'Live price feeds and comprehensive market data at your fingertips',
            color: 'var(--neon-cyan)'
        },
        {
            icon: '💎',
            title: 'Staking & Yield',
            description: 'Earn rewards by staking your assets in secure vaults',
            color: 'var(--neon-purple)'
        },
        {
            icon: '📈',
            title: 'Portfolio Tracking',
            description: 'Monitor all your positions and activity history in one place',
            color: 'var(--neon-cyan)'
        },
        {
            icon: '💧',
            title: 'Liquidity Provision',
            description: 'Provide liquidity to pools and earn trading fees',
            color: 'var(--neon-purple)'
        },
    ];

    const assets = [
        { symbol: 'USDO', name: 'USDO', category: 'Stablecoin' },
        { symbol: 'USDT', name: 'Tether USD', category: 'Stablecoin' },
        { symbol: 'USDe', name: 'Ethena USDe', category: 'Stablecoin' },
        { symbol: 'GOLD', name: 'Gold Token', category: 'Commodity' },
        { symbol: 'AAPL', name: 'Apple Stock', category: 'Stock' },
        { symbol: 'MSTR', name: 'MicroStrategy Stock', category: 'Stock' },
    ];

    return (
        <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
            <BackgroundGrid />

            <div style={{ position: 'relative', zIndex: 10 }}>
                <Navbar />

                {/* Hero Section */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    padding: '0 20px',
                    textAlign: 'center',
                    paddingTop: '80px'
                }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src="/Logo 2.jpg"
                            alt="Rialo Obscura"
                            style={{
                                width: '120px',
                                marginBottom: '40px',
                                borderRadius: '50%',
                                border: '3px solid var(--neon-cyan)',
                                boxShadow: '0 0 40px rgba(0, 240, 255, 0.3)',
                            }}
                        />

                        <h1 className="glow-text" style={{
                            fontSize: 'clamp(3rem, 8vw, 6rem)',
                            marginBottom: '20px',
                            letterSpacing: '3px',
                            fontFamily: 'Rajdhani',
                        }}>
                            RIALO OBSCURA
                        </h1>

                        <p style={{
                            color: 'var(--neon-cyan)',
                            fontSize: '1.5rem',
                            marginBottom: '15px',
                            fontFamily: 'JetBrains Mono',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                        }}>
                            The Shadow Layer
                        </p>

                        <p style={{
                            color: 'var(--text-dim)',
                            fontSize: '1.1rem',
                            marginBottom: '60px',
                            maxWidth: '700px',
                            lineHeight: '1.8',
                        }}>
                            Next-generation DeFi platform with smart routing, multi-asset support, and encrypted vaults.
                            <br />
                            Experience the Rialo Network simulation (Deployed on Base Sepolia Testnet).
                        </p>

                        <button
                            className="btn-primary"
                            onClick={() => navigate('/app')}
                            style={{
                                fontSize: '1.1rem',
                                padding: '18px 50px',
                                transform: 'scale(1.1)',
                            }}
                        >
                            LAUNCH APP →
                        </button>

                        <div style={{
                            marginTop: '80px',
                            display: 'flex',
                            gap: '60px',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}>
                            <div>
                                <div style={{ color: 'var(--neon-cyan)', fontSize: '2rem', fontFamily: 'JetBrains Mono', marginBottom: '10px' }}>🔒</div>
                                <div style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Private</div>
                            </div>
                            <div>
                                <div style={{ color: 'var(--neon-purple)', fontSize: '2rem', fontFamily: 'JetBrains Mono', marginBottom: '10px' }}>⚡</div>
                                <div style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Fast</div>
                            </div>
                            <div>
                                <div style={{ color: 'var(--neon-cyan)', fontSize: '2rem', fontFamily: 'JetBrains Mono', marginBottom: '10px' }}>🛡️</div>
                                <div style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Secure</div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Features Section */}
                <div style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: '100px 20px',
                }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ textAlign: 'center', marginBottom: '80px' }}
                    >
                        <h2 className="glow-text" style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            marginBottom: '20px',
                            fontFamily: 'Rajdhani',
                        }}>
                            PLATFORM FEATURES
                        </h2>
                        <p style={{
                            color: 'var(--text-dim)',
                            fontSize: '1.1rem',
                            fontFamily: 'JetBrains Mono',
                        }}>
                            // EVERYTHING YOU NEED FOR ADVANCED DEFI
                        </p>
                    </motion.div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '30px',
                    }}>
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="cyber-card"
                                style={{
                                    padding: '40px 30px',
                                    textAlign: 'center',
                                    cursor: 'default',
                                    borderColor: feature.color,
                                }}
                            >
                                <div style={{
                                    fontSize: '3rem',
                                    marginBottom: '20px',
                                    filter: `drop-shadow(0 0 10px ${feature.color})`,
                                }}>
                                    {feature.icon}
                                </div>
                                <h3 style={{
                                    color: feature.color,
                                    fontSize: '1.3rem',
                                    marginBottom: '15px',
                                    fontFamily: 'Rajdhani',
                                    fontWeight: 'bold',
                                }}>
                                    {feature.title}
                                </h3>
                                <p style={{
                                    color: 'var(--text-dim)',
                                    fontSize: '0.95rem',
                                    lineHeight: '1.6',
                                }}>
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Supported Assets Section */}
                <div style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: '100px 20px',
                }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ textAlign: 'center', marginBottom: '80px' }}
                    >
                        <h2 className="glow-text" style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            marginBottom: '20px',
                            fontFamily: 'Rajdhani',
                        }}>
                            SUPPORTED ASSETS
                        </h2>
                        <p style={{
                            color: 'var(--text-dim)',
                            fontSize: '1.1rem',
                            fontFamily: 'JetBrains Mono',
                        }}>
                            // 6 ASSETS READY FOR TRADING
                        </p>
                    </motion.div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '25px',
                    }}>
                        {assets.map((asset, index) => (
                            <motion.div
                                key={asset.symbol}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                                whileHover={{ scale: 1.05 }}
                                className="cyber-card"
                                style={{
                                    padding: '30px 25px',
                                    textAlign: 'center',
                                    cursor: 'default',
                                }}
                            >
                                <div style={{
                                    fontSize: '2.5rem',
                                    marginBottom: '15px',
                                }}>
                                    {asset.category === 'Stablecoin' ? '💵' : asset.category === 'Commodity' ? '🪙' : '📈'}
                                </div>
                                <h3 style={{
                                    color: 'white',
                                    fontSize: '1.5rem',
                                    marginBottom: '8px',
                                    fontFamily: 'JetBrains Mono',
                                    fontWeight: 'bold',
                                }}>
                                    {asset.symbol}
                                </h3>
                                <p style={{
                                    color: 'var(--text-dim)',
                                    fontSize: '0.9rem',
                                    marginBottom: '12px',
                                }}>
                                    {asset.name}
                                </p>
                                <span style={{
                                    display: 'inline-block',
                                    padding: '5px 15px',
                                    background: 'rgba(0, 240, 255, 0.1)',
                                    border: '1px solid var(--neon-cyan)',
                                    borderRadius: '20px',
                                    fontSize: '0.75rem',
                                    color: 'var(--neon-cyan)',
                                    fontFamily: 'JetBrains Mono',
                                }}>
                                    {asset.category}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Platform Stats Section */}
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '100px 20px 80px',
                }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="cyber-card"
                        style={{
                            padding: '60px 40px',
                            textAlign: 'center',
                            background: 'rgba(0, 240, 255, 0.05)',
                            borderColor: 'var(--neon-cyan)',
                        }}
                    >
                        <h2 className="glow-text" style={{
                            fontSize: 'clamp(2rem, 4vw, 3rem)',
                            marginBottom: '50px',
                            fontFamily: 'Rajdhani',
                        }}>
                            PLATFORM STATISTICS
                        </h2>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '40px',
                        }}>
                            <div>
                                <div style={{
                                    fontSize: '3rem',
                                    fontFamily: 'JetBrains Mono',
                                    color: 'var(--neon-cyan)',
                                    marginBottom: '10px',
                                    fontWeight: 'bold',
                                }}>
                                    6
                                </div>
                                <div style={{
                                    color: 'var(--text-dim)',
                                    fontSize: '0.9rem',
                                    fontFamily: 'JetBrains Mono',
                                }}>
                                    SUPPORTED ASSETS
                                </div>
                            </div>

                            <div>
                                <div style={{
                                    fontSize: '3rem',
                                    fontFamily: 'JetBrains Mono',
                                    color: 'var(--neon-purple)',
                                    marginBottom: '10px',
                                    fontWeight: 'bold',
                                }}>
                                    2
                                </div>
                                <div style={{
                                    color: 'var(--text-dim)',
                                    fontSize: '0.9rem',
                                    fontFamily: 'JetBrains Mono',
                                }}>
                                    ROUTING OPTIONS
                                </div>
                            </div>

                            <div>
                                <div style={{
                                    fontSize: '2rem',
                                    fontFamily: 'JetBrains Mono',
                                    color: 'var(--neon-cyan)',
                                    marginBottom: '10px',
                                    fontWeight: 'bold',
                                }}>
                                    RIALO
                                </div>
                                <div style={{
                                    color: 'var(--text-dim)',
                                    fontSize: '0.9rem',
                                    fontFamily: 'JetBrains Mono',
                                }}>
                                    SIMULATION (BASE SEPOLIA)
                                </div>
                            </div>

                            <div>
                                <div style={{
                                    fontSize: '2rem',
                                    fontFamily: 'JetBrains Mono',
                                    color: 'var(--neon-purple)',
                                    marginBottom: '10px',
                                }}>
                                    🔐
                                </div>
                                <div style={{
                                    color: 'var(--text-dim)',
                                    fontSize: '0.9rem',
                                    fontFamily: 'JetBrains Mono',
                                }}>
                                    ENCRYPTED VAULTS
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '60px' }}>
                            <button
                                className="btn-primary"
                                onClick={() => navigate('/app')}
                                style={{
                                    fontSize: '1.2rem',
                                    padding: '20px 60px',
                                }}
                            >
                                GET STARTED →
                            </button>
                        </div>
                    </motion.div>
                </div>

                <Footer />
            </div>
        </div>
    );
};

export default Landing;